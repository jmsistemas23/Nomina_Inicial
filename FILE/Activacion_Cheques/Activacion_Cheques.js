var currentDate = "", vigencia = "";
var extension = "";
$(document).ready(function () {
    $.extend($.fn.tree.methods, {
        removeAll: function (jq) {
            return jq.each(function () {
                var roots = $(this).tree('getRoots');
                for (var i = roots.length - 1; i >= 0; i--) {
                    $(this).tree('remove', roots[i].target);
                }
            })
        },
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        }
    });


    $('#txtnombrearchivo').textbox('setValue', '');

    $('#dfechapago').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#dvigencia').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
  
    $('#dfechapago').datebox({
        onSelect: function (date) {
            if (!date) { return ' '; }
            var y = date.getFullYear();
            var m = date.getMonth() + 3;
            var d = date.getDate();
            var strfecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
            $('#dvigencia').datebox('setValue', strfecha);
        },
    });

    Fecha();
    $('#dfechapago').datebox('setValue', currentDate);
    $('#dvigencia').datebox('setValue', vigencia);


    CARGAR_BANCOS('#tbancos');    
    CARGAR_ORGANISMOS('#torganismos');

    $('#btnActual').bind('click', function () {
        $('#tquincenas').tree('removeAll');
    });


    $('#btnHistoria').bind('click', function () {
        CARGAR_QUINCENAS('#tquincenas');
    });

    $('#btnGenerar').bind('click', function () {
        GENERAR_SALIDA('#btnGenerar');
    });

    $('#btnGenerarXls').bind('click', function () {
        GENERAR_EXCEL('#btnGenerarXls');
    });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_SELECCION();
    });

    $('#btnContador').bind('click', function () {
        ABRIR_VENTANA_CONTADOR();
    });

    $('#btnActualizar').bind('click', function () {
        ACTUALIZAR_CONTADOR();
    });

    $('#torganismos').tree({
        onClick: function (node) {
            if (node.name != 0) {               
             
                    var fecha = $('#dfechapago').datebox('getValue');
                    fecha = ReplaceAll(fecha, "/", '');
                   
                var t = $('#tbancos');
                var nodeBANCO = t.tree('getSelected');
                var cveban = nodeBANCO.attributes.split('|');

                $('#txtnombrearchivo').textbox('setValue', "");                        
                if (cveban[0] == 'BNT') {
                   
                    var año = fecha.substring(fecha.length - 2)
                    var mes = fecha.substr(2, 2);
                    var quin = fecha.substr(0, 2);

                    var archivo = node.attributes.split('|');

                    $('#txtnombrearchivo').textbox('setValue', archivo[0]+año + mes + quin+archivo[1]);                    
                }
                else {                                            
                   $('#txtnombrearchivo').textbox('setValue', node.name + '-' + cveban[0] + "-" + fecha);                 
                }
            }
        }
    });
    $('#tbancos').tree({
        onClick: function (node) {
            if (node.name != 0) {              
                var cveban = node.attributes.split('|');
                extension = cveban[2];
                if (cveban[1] == "Normal") { $('#btnNormal').linkbutton({ selected: true }); }
                if (cveban[1] == "Archivos") { $('#btnArchivos').linkbutton({ selected: true }); }
                if (cveban[1] == "siguiente") { $('#btnSigueinte').linkbutton({ selected: true }); }                
            }
        }
    });

    $('#btnDescargar').click(function (e) {
        window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));
        $('#txtnombrearchivo').textbox('setValue', 'Activacion');
    });
    
});

function datosValidacion(datos,obj) {
    $('#loading').hide();
    if (datos == "No") {
        // $.session.set('Validacion', datos);
    }
    else {
       // alert(obj.Usuario);
        $.messager.alert('Error', 'La seccion se ha cerrado', 'error');
    }
}


function Fecha() {
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
    var vigMes = (fullDate.getMonth() + 1)+2;
    vigencia = twoDigitDate + "/" + vigMes + "/" + fullDate.getFullYear();
}

function CARGAR_BANCOS(tvobj)
{    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Bancos',        
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {           
            var obj = jQuery.parseJSON(data.d[0]);            
            $(tvobj).tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_QUINCENAS(tvobj) {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Quincenas',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_ORGANISMOS(tvobj) {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Organismos',
        
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function GENERAR_SALIDA(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var quin = "", vtbacnos = "", vtquin = "", vtorganismos = "", org = "", tiposalida = "";
        vtbancos = $('#tbancos').tree('getSelected');
        var cveban = vtbancos.attributes.split('|');
        vtquin = $('#tquincenas').tree('getSelected');
        vtorganismos = $('#torganismos').tree('getSelected');
       // vtorganismos = $('#torganismos').tree('getRoots');

        if ($('#btnSiguiente').linkbutton('options').selected) { tiposalida = 'SIGUIENTE'; }
        if ($('#btnNormal').linkbutton('options').selected) { tiposalida = 'NORMAL'; }
        if ($('#btnArchivos').linkbutton('options').selected) { tiposalida = 'ARCHIVOS'; }

        if ($('#btnActual').linkbutton('options').selected) { quin = 'Actual'; } else {
            var valor = $('#tquincenas').tree('getSelected');
            quin = valor.name;
        }      
        if ($('#txtnombrearchivo').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta el nombre del archivo', 'error'); }
        else
            if (vtbancos == null) { $.messager.alert('Error', 'Falta seleccionar el banco', 'error'); return 0; }
            else
                if (vtorganismos == null) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
                else
                    if ((vtquin == null) && (quin != 'Actual')) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
                    else {
                        //var roots = $('#torganismos').tree('getRoots');  // because it can be more roots
                        //for (var i = 0; i < roots.length; i++) {
                        //    if (roots[i].checked == true) {
                        //        org += "''" + roots[i].name + "'',";
                        //    }
                        //}
                        //org = org.substring(0, org.length - 1);
                        // GENERAR_ARCHIVO($('#txtnombrearchivo').textbox('getValue'), org, quin, vtbancos.name, $('#dfechapago').datebox('getValue'), $('#dvigencia').datebox('getValue'));
                      
                        GENERAR_ARCHIVO($('#txtnombrearchivo').textbox('getValue'), vtorganismos.name, quin, vtbancos.name, $('#dfechapago').datebox('getValue'), $('#dvigencia').datebox('getValue'), tiposalida);
                    }
    }
}

function GENERAR_ARCHIVO(archivo, organismos, quin, banco, fechapago, vigencia, tiposalida)
{
    var parametros = {};
    parametros.archivo=archivo,
    parametros.organismos = organismos,
    parametros.quincena = quin;
    parametros.banco = banco,
    parametros.fechapago = fechapago,
    parametros.vigencia = vigencia,
        parametros.tiposalida = tiposalida,
        parametros.extension = extension
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Crear_Archivo',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") { $.messager.alert('Error', 'No Existe informacion a generar', 'error'); }
            else
                if (data.d[0] == "E") { $.messager.alert('Error', data.d, 'error'); }
                else {
                    $.messager.alert('Información', 'Archivo Generado', 'info');
                    //$('#btnDescargar').linkbutton({ disabled: false });

                    //window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));
                    if (tiposalida != "ARCHIVOS") {
                        window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue')+"&ext="+extension);
                    }
                    else {
                        var contador = data.d[2];
                        for (var t = 1; t < contador; t++) {
                            var archivo = $('#txtnombrearchivo').textbox('getValue') + "-" + t;
                            window.open('Descargar.aspx?Fileid=' + archivo + "&ext=" + extension);
                        }
                    }

                    LIMPIAR_SELECCION();
                }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responsetext, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LIMPIAR_SELECCION() {
    $('#tquincenas').tree('removeAll');
    var t = $('#tbancos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#torganismos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    //var nodes = $('#torganismos').tree('getChecked', ['checked']);
    //for (var i = 0; i < nodes.length; i++) {
    //    if (nodes[i].checked == true) {
    //        $('#torganismos').tree('uncheck', nodes[i].target);
    //    }
    //}  

    Fecha();
    $('#dfechapago').datebox('setValue', currentDate);
    $('#dvigencia').datebox('setValue', vigencia);

    $('#txtnombrearchivo').textbox('setValue', '');
}

function GENERAR_EXCEL(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var quin = "", vtbacnos = "", vtquin = "", vtorganismos = "", org = "";
        vtbancos = $('#tbancos').tree('getSelected');
        vtquin = $('#tquincenas').tree('getSelected');
        vtorganismos = $('#torganismos').tree('getSelected');        

        if ($('#btnActual').linkbutton('options').selected) { quin = 'Actual'; } else {
            var valor = $('#tquincenas').tree('getSelected');
            quin = valor.name;
        }
        if ($('#txtnombrearchivo').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta el nombre del archivo', 'error'); }
        else
            if (vtbancos == null) { $.messager.alert('Error', 'Falta seleccionar el banco', 'error'); return 0; }
            else
                if (vtorganismos == null) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
                else
                    if ((vtquin == null) && (quin != 'Actual')) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
                    else {

                       // window.open('Descargar_Excel.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue') + "&org=" + vtorganismos.name + "&quin=" + quin + "&ban=" + vtbancos.name + "&fecha=" + $('#dfechapago').datebox('getValue') + "&vig=" + $('#dvigencia').datebox('getValue'));
                        var parametros = {};
                        parametros.archivo = $('#txtnombrearchivo').textbox('getValue'),
                        parametros.organismos = vtorganismos.name,
                        parametros.quincena = quin;
                        parametros.banco = vtbancos.name,
                        parametros.fechapago = $('#dfechapago').datebox('getValue'),
                        parametros.vigencia = $('#dvigencia').datebox('getValue'),
                         parametros.tiposalida = 'Normal',
                        $.ajax({
                            type: "POST",
                            url: 'Funciones.aspx/Generar_Excel',
                            data: JSON.stringify(parametros),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            beforeSend: function () {
                                $('#loading').show();
                            },
                            success: function (data) {                              
                                if (data.d[0] == "0") { $.messager.alert('Error', 'No Existe información a generar', 'error'); }
                                else
                                    if (data.d[0] == "E") { $.messager.alert('Error', data.d, 'error'); }
                                    else {
                                        $.messager.alert('Información', 'Archivo Generado', 'info');
                                        
                                        window.open('Descargar_Excel.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));                                      
                                       
                                        LIMPIAR_SELECCION();
                                    }
                            },
                            error: function (err) {
                                $('#loading').hide(100);
                                $.messager.alert('Error', err.responseText, 'error');
                            },
                            complete: function ()
                            { $('#loading').hide(100); }
                        });
                        
                    }        
    }
}

function ABRIR_VENTANA_CONTADOR() { 
    var parametros = {};
    parametros.movimiento = 'S',
    parametros.contador=0
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Contador',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //var obj = jQuery.parseJSON(data.d[0]);
            $('#loading').hide(100);
            windows_porcentaje("#wcontador", 20, 16, false, false, false, "Actualizar Contador");
            TXTFOCUS('#txtcontador', 'numberbox');
            TXTALILCEACION('#txtcontador', 'center', 'numberbox');
            $('#txtcontador').numberbox('setValue', data.d[0]);
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
    

}

function ACTUALIZAR_CONTADOR() {
    var parametros = {};
    parametros.movimiento = 'A',
        parametros.contador = $('#txtcontador').numberbox('getValue') <= 0 ? 1 : $('#txtcontador').numberbox('getValue');
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Contador',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //var obj = jQuery.parseJSON(data.d[0]);
            if (data.d[0] == 0) { $.messager.alert('Información', data.d[1], 'info'); }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}