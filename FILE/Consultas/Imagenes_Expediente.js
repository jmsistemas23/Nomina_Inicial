$(document).ready(function () {   
    var numemppl = $_GET('empleado');
    if (numemppl != undefined) { vnumemppl = numemppl; }
    else { vnumemppl = '27881'; }   

    BUSCAR_EMPLEADO();

    //function llamarServidor() {
    //    __doPostBack("CargarExpediente", "");
    //}
  
    //$('#btnVista').bind('click', function () {
    //    CARGAR_IMAGENES('#btnVista');        
    //});
});

function BUSCAR_EMPLEADO() {
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

                $("#hfexpediente").val(objempleado[0].folio + "|" + objpaginas[0].pagactual + "|" + objpaginas[0].Conteo+"|1");

                $('#txtexpediente').textbox('setValue', objempleado[0].folio);
                $('#txtempleado').textbox('setValue', objempleado[0].numempleado);
                $('#txtnombre').textbox('setValue', objempleado[0].apepaterno + " " + objempleado[0].apematerno + " " + objempleado[0].nombre);
                $('#txtcurp').textbox('setValue', objempleado[0].curp);

                $('#txtnopagina').textbox('setValue', objpaginas[0].pagactual);
                $('#txttotpagina').textbox('setValue', objpaginas[0].Paginas);
                $('#txttotimagenes').textbox('setValue', objpaginas[0].Conteo);

                $('#btnVista').linkbutton({ disabled: false });
              
            } else { $.messager.alert('Error', 'No se encontro expediente del empleado ' + $('#txtempleado').textbox('getValue'), 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');

        },
        complete: function () {
            $('#loading').hide(100);                
        }
    });
}

function BUSCAR_EXPEDIENTE() {       
    var parametros = {};   
    parametros.empleado = vnumemppl;
    parametros.numimagen = $('#txtimagenes').textbox('getValue');
    parametros.pagina = $('#txtnopagina').textbox('getValue');
    parametros.conexion = "E";
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Buscar_Expediente",
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
           
            $('#txtexpediente').textbox('setValue', objempleado[0].folio);
            $('#txtempleado').textbox('setValue', objempleado[0].numempleado);
            $('#txtnombre').textbox('setValue', objempleado[0].apepaterno + " " + objempleado[0].apematerno + " " + objempleado[0].nombre);
            $('#txtcurp').textbox('setValue', objempleado[0].curp);

            $('#txtnopagina').textbox('setValue', objpaginas[0].pagactual);
            $('#txttotpagina').textbox('setValue', objpaginas[0].Paginas);
            $('#txttotimagenes').textbox('setValue', objpaginas[0].Conteo);

            $('#txtnopagina').textbox({ disabled: false });
            $('#txtimagenes').textbox({ disabled: false });
            $('#btnVista').linkbutton({ disabled: false });
            
            }else
            { $.messager.alert('Error', 'No se encontro expediente del empleado ' + $('#txtimagenes').textbox('getValue'), 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_IMAGENES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        $.ajax({
            type: "POST",
            url: "Imagenes_Expediente.aspx/Expediente",     
            data: "{}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",            
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
              
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
}
