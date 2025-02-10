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

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_SELECCION();
    });

    $('#torganismos').tree({
        onClick: function (node) {
            if (node.name != 0) {
                $('#txtnombrearchivo').textbox('setValue', node.name);
            }
        }
    });

    $('#tbancos').tree({
        onClick: function (node) {
            if (node.name != 0) {
                var atr = "";                                  
                    atr = node.attributes.split('|');
              
                    if (atr[1] == "Si") { $("#chklinea").removeAttr("disabled"); }
                    else { $("#chklinea").prop("disabled", true); }                
            }
        }
    });
    $('#torganismos').tree({
        onClick: function (node) {
            if (node.name != 0) {

                var fecha = $('#dfechapago').datebox('getValue');
                fecha = ReplaceAll(fecha, "/", '');

                var t = $('#tbancos');
                var nodeBANCO = t.tree('getSelected');
                var cveban = nodeBANCO.attributes.split('|');
                extension = cveban[2];

                $('#txtnombrearchivo').textbox('setValue', "");
                if (cveban[0] == 'BNT') {

                    var año = fecha.substring(fecha.length - 2)
                    var mes = fecha.substr(2, 2);
                    var quin = fecha.substr(0, 2);

                    var archivo = node.attributes.split('|');

                    $('#txtnombrearchivo').textbox('setValue', "N"+archivo[0] +  archivo[1]);
                }
                else {
                    $('#txtnombrearchivo').textbox('setValue', node.name + '-' + cveban[0] + "-" + fecha);
                }
            }
        }
    });

    $('#btnDescargar').click(function (e) {
        window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));
        $('#txtnombrearchivo').textbox('setValue', 'Activacion');
    });
    
});

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
            $.messager.alert('Error', err.statusText, 'error');
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
            $.messager.alert('Error', err.statusText, 'error');
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
        var quin = "",vtbacnos="",vtquin="",vtorganismos="",org="";
        vtbancos = $('#tbancos').tree('getSelected');
        vtquin = $('#tquincenas').tree('getSelected');
        vtorganismos = $('#torganismos').tree('getSelected');
        vatributo = vtbancos.attributes.split("|");
        vtipo = vatributo[0];

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
                        // org += "''" + roots[i].name + "''";                                                                         
                        var pagolinea = 0;
                        if ($('#chklinea').is(':checked') == true) { pagolinea = 1; }
                        GENERAR_ARCHIVO($('#txtnombrearchivo').textbox('getValue'), "''" + vtorganismos.name + "''", quin, vtbancos.name, $('#dfechapago').datebox('getValue'), $('#dvigencia').datebox('getValue'), pagolinea, vtipo);
                    }
    }
}

function GENERAR_ARCHIVO(archivo,organismos,quin,banco,fechapago,vigencia,pagolinea,vtipo)
{
    var parametros = {};
    parametros.archivo=archivo,
    parametros.organismos = organismos,
    parametros.quincena = quin,
    parametros.banco = banco,
    parametros.fechapago=fechapago,
    parametros.vigencia = vigencia
    parametros.pagolinea = pagolinea
    parametros.tipo = vtipo,
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
                    $("#chklinea").prop("disabled", true);
                    $("#chklinea").prop("checked", false);

                    window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue') + "&ext=" + extension);

                    LIMPIAR_SELECCION();
                }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
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
    //        $('#torganismos').tree('unselect', nodes[i].target);
    //    }
    //}  

    Fecha();
    $('#dfechapago').datebox('setValue', currentDate);
    $('#dvigencia').datebox('setValue', vigencia);

    $('#txtnombrearchivo').textbox('setValue', '');
}