var vnumemppl = "";
var vplaza = "";
var vtipobusqueda = "";
var viewer;
var image;
$(document).ready(function () {
    var plaza = $_GET('plaza');
    if (plaza != undefined) { vplaza = plaza; }
    else { vplaza = ''; }
    var numemppl = $_GET('empleado');
    if (numemppl != undefined) { vnumemppl = numemppl; }
    else { vnumemppl = '27881'; }
    var tipobusqueda = $_GET('tipo');
    if (tipobusqueda != undefined) { vtipobusqueda = tipobusqueda; }
    else { vtipobusqueda ='E'; }

    image = new Image();
    viewer = new Viewer(image, {});
    viewer.destroy();

    LIMPIAR_VISTAPREVIA();
    BUSCAR_EMPLEADO();
    BUSCAR_EXPEDIENTE();
    HABILITAR_BOTONES();
   
    $('#btnInicio').bind('click', function () {
        BTN_INICIO('#btnInicio');         
    });
    $('#btnSiguiente').bind('click', function () {        
        BTN_SIGUIENTE('#btnSiguiente');               
    });

    $('#btnAnterior').bind('click', function () {
        BTN_ANTERIOR('#btnAnterior');              
    });
    $('#btnUltimo').bind('click', function () {
        BTN_ULTIMO('#btnUltimo');       
    });

    $('#btnRegresar').bind('click', function () {        
        if (vtipobusqueda == 'P')
        { IR_PAGINA("plazas/Consulta_Plazas.aspx", "numemppl=" + vnumemppl + "&plaza=" + vplaza); }
        else { IR_PAGINA("empleados/Consulta_Empleados.aspx", "empleado=" + vnumemppl + "&numplaza=" + vplaza); }
    });

});


function PrintImage(source, nombre) {
    var pwa = window.open(nombre, "_new");
    pwa.document.open();
    pwa.document.write(ImagetoPrint(source));
    pwa.document.close();
}

function ImagetoPrint(source) {
    return "<html><head><script>function step1(){\n" +
        "setTimeout('step2()', 10);}\n" +
        "function step2(){window.print();window.close()}\n" +
        "</scri" + "pt></head><body onload='step1()'>\n" +
        "<img src='" + source + "' width=30%; /></body></html>";
}


function IR_PAGINA(url, parametros) {
    var strpagina = "";
    if (parametros != "") { strpagina = url + "?" + parametros; } else { strpagina = url; }
    $.ajax({
        url: url + "/GetResponse",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == true) {
                window.location = strpagina;
            }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c, 'error');
        }
    });
}


function LIMPIAR_VISTAPREVIA()
{   
    //viewer = new Viewer(image, {});
    viewer.destroy();
    $("#ulimg").empty();
    $("#galley").empty();
}

function CARGAR_IMAGENES(objimg)
{
    LIMPIAR_VISTAPREVIA();
    var ul = $("<ul id='ulimg' class=\"pictures\"/>").appendTo('#galley');
    for (var i = 0; i < objimg.length; i++) {
        var li = $("<li/>").appendTo(ul);
        var base64 = base64js.fromByteArray(objimg[i].Imagen);
        var img = $("<img  alt=" + "Imagen_"+objimg[i].Orden + " data-original=data:image/jpg;base64," + base64 + " src=data:image/jpg;base64," + base64 + ">").appendTo(li);
    }
    $('#loading').hide(100);

    image = new Image();
    image = document.getElementById('galley');
    viewer = new Viewer(image, {
        hidden: function () {
            viewer.hide();
        },
        url: 'data-original',
        toolbar: {
            //oneToOne: true,       
            zoomIn: function () {
                viewer.zoom(0.5, true, 0);
            },
            zoomOut: function () {
                viewer.zoom(-0.5, true, 0);
            },

            prev: function () {
                viewer.prev(true);
            },
            next: function () {
                viewer.next(true);
            },
            rotateLeft: function () {
                viewer.rotate(-90);
            },
            rotateRight: function () {
                viewer.rotate(90);
            },
            reset: function () {
                viewer.reset();
            },
            download: function () {
                var a = document.createElement('a');

                a.href = viewer.image.src;
                a.download = viewer.image.alt;
                document.body.appendChild(a);
                //a.click();
                document.body.removeChild(a);

                PrintImage(viewer.image.src, viewer.image.alt); return false;
            },
        },
    });
    $('#loading').hide(100);
}

function BUSCAR_EMPLEADO()
{
    var parametros = {};
    parametros.numempleado = vnumemppl;
    parametros.numimagen = $('#txtimagenes').textbox('getValue');
    parametros.pagina = $('#txtnopagina').textbox('getValue');
    parametros.conexion = "E";
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Buscar_ExpedienteEmpleado",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",       
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                var objempleado = $.parseJSON(data.d[1]);
                var objpaginas = $.parseJSON(data.d[2]);
             
                $("#hfexpediente").val(objempleado[0].folio);

                $('#txtexpediente').textbox('setValue', objempleado[0].folio);
                $('#txtempleado').textbox('setValue', objempleado[0].numempleado);
                $('#txtnombre').textbox('setValue', objempleado[0].apepaterno + " " + objempleado[0].apematerno + " " + objempleado[0].nombre);
                $('#txtcurp').textbox('setValue', objempleado[0].curp);

                $('#txtnopagina').textbox('setValue', objpaginas[0].pagactual);
                $('#txttotpagina').textbox('setValue', objpaginas[0].Paginas);
                $('#txttotimagenes').textbox('setValue', objpaginas[0].Conteo);
               
            } else { $.messager.alert('Error', 'No se encontro expediente del empleado ' + $('#txtempleado').textbox('getValue'), 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
           
        },
        complete: function ()
        {
            //$('#loading').hide(100);     
           
        }
    });   
}

function BUSCAR_EXPEDIENTE() {
    var parametros = {};
    parametros.numempleado = vnumemppl;
    parametros.numimagen = $('#txtimagenes').textbox('getValue');
    parametros.pagina = $('#txtnopagina').textbox('getValue');
    parametros.conexion = "E";
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Buscar_Expediente",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        timeout: 50000, // sets timeout to 20 seconds  
        async: false,
        cache: false,
        beforeSend: function () {
           // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                var objpaginas = $.parseJSON(data.d[1]);

                $('#txtnopagina').textbox('setValue', objpaginas[0].pagactual);
                $('#txttotpagina').textbox('setValue', objpaginas[0].Paginas);
                $('#txttotimagenes').textbox('setValue', objpaginas[0].Conteo);

                if (data.d[2] != "") {
                    var jsonimg = jQuery.parseJSON(data.d[2]);
                    CARGAR_IMAGENES(jsonimg);                  
                }
                else { jsonimg = ""; $('#loading').hide(100); }

            } else { $.messager.alert('Error', 'No se encontro expediente del empleado ' + $('#txtempleado').textbox('getValue'), 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            alert(err.responseText);
            //$.messager.alert('Error', err.responseText, 'error');
            //$.messager.alert({
            //    title: 'Información',
            //    msg: '<div style="height:100%">' + err.responseText + '</div>',
            //    icon: ((esError) ? 'error' : 'info'),
            //    width: 50 + "%"
            //})
        },
        complete: function ()
        {       
           // $('#loading').hide(100);           
        }
    });    
}

function HABILITAR_BOTONES()
{
    var pagant = parseInt($('#txtnopagina').textbox('getValue'));
    var pagsig = parseInt($('#txttotpagina').textbox('getValue'));
    if (pagant == pagsig) {
        $('#btnSiguiente').linkbutton({ disabled: true });
        $('#btnUltimo').linkbutton({ disabled: true });
    } else {
        $('#btnSiguiente').linkbutton({ disabled: false });
        $('#btnUltimo').linkbutton({ disabled: false });
        $('#btnAnterior').linkbutton({ disabled: true });
        $('#btnInicio').linkbutton({ disabled: true });
    }
}



function BTN_SIGUIENTE(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var pagant = parseInt($('#txtnopagina').textbox('getValue'));
        var pagsig = parseInt($('#txttotpagina').textbox('getValue'));
        if (pagant <= pagsig) {
            ++pagant;
            $('#txtnopagina').textbox('setValue', pagant);
            $('#btnAnterior').linkbutton({ disabled: false });
            $('#btnInicio').linkbutton({ disabled: false });

            if (pagant == pagsig) {
                $('#btnSiguiente').linkbutton({ disabled: true });
                $('#btnUltimo').linkbutton({ disabled: true });
            }
        }
        BUSCAR_EXPEDIENTE();
    }
}

function BTN_ANTERIOR(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var pagant = parseInt($('#txtnopagina').textbox('getValue')) - 1;
        if (pagant >= 1) {
            if (pagant == 1)
            {
                $('#btnInicio').linkbutton({ disabled: true });
                $('#btnAnterior').linkbutton({ disabled: true });
            }
            $('#txtnopagina').textbox('setValue', pagant);
            $('#btnSiguiente').linkbutton({ disabled: false });
            $('#btnUltimo').linkbutton({ disabled: false });
        }
        BUSCAR_EXPEDIENTE();
    }
}

function BTN_ULTIMO(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtnopagina').textbox('setValue', $('#txttotpagina').textbox('getValue'));
        var pagant = parseInt($('#txtnopagina').textbox('getValue'));
        var pagsig = parseInt($('#txttotpagina').textbox('getValue'));
        if (pagant == pagsig) {
            $('#btnInicio').linkbutton({ disabled: false });
            $('#btnAnterior').linkbutton({ disabled: false });            
            $('#btnSiguiente').linkbutton({ disabled: true });
            $('#btnUltimo').linkbutton({ disabled: true });
        }
        BUSCAR_EXPEDIENTE();
    }
};

function BTN_INICIO(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtnopagina').textbox('setValue', 1);
        $('#btnInicio').linkbutton({ disabled: true });
        $('#btnAnterior').linkbutton({ disabled: true });        
        $('#btnSiguiente').linkbutton({ disabled: false });
        $('#btnUltimo').linkbutton({ disabled: false });

        BUSCAR_EXPEDIENTE();
    }
}