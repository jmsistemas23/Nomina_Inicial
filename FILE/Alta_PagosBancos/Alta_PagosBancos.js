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
    CARGAR_BANCOS('#tbancos');
    CARGAR_ORGANISMOS('#torganismos');

    $('#txtnombrearchivo').textbox('setValue', '');
    $('#dfechapago').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
  
    $('#dfechapago').datebox({
        onSelect: function (date) {
            if (!date) { return ' '; }
            var y = date.getFullYear();
            var m = date.getMonth() + 3;
            var d = date.getDate();
            var strfecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y          
        },
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
                if ($('#txtnombrearchivo').textbox('getValue') != "") {
                    var fecha = $('#dfechapago').datebox('getValue');
                    fecha = ReplaceAll(fecha, "/", '');
                    $('#txtnombrearchivo').textbox('setValue', "");
                    var t = $('#torganismos');
                    var nodeorg = t.tree('getSelected');
                    atr = node.attributes.split('|');
                    $('#txtnombrearchivo').textbox('setValue', nodeorg.name + '-' + atr[0] + "-" + fecha);
                    if (atr[1] == "Si") { $("#chklinea").removeAttr("disabled"); }
                    else { $("#chklinea").prop("disabled", true); }
                }
                else {
                    $.messager.alert('Error', 'Falta el nombre del organismo', 'error');
                    var t = $('#tbancos');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                }
            }
        }
    });

    $('#btnGenerar').bind('click', function () {
        GENERAR_SALIDA('#btnGenerar');
    });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_SELECCION();
    });

    $('#btnDescargar').click(function (e) {
        window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));
        $('#txtnombrearchivo').textbox('setValue', 'AltaPagos');
    });

    Fecha();
    $('#dfechapago').datebox('setValue', currentDate);
});

function Fecha() {
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
  
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

function CARGAR_BANCOS(tvobj) {
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

function LIMPIAR_SELECCION() {   
    var t = $('#torganismos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tbancos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#dfechapago').datebox('setValue', currentDate);    

    $('#txtnombrearchivo').textbox('setValue', '');
}

function GENERAR_SALIDA(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var quin = "", vtbacnos = "", vtquin = "", vtorganismos = "", org = "";
        vtbancos = $('#tbancos').tree('getSelected');        
        vtorganismos = $('#torganismos').tree('getSelected');

        
        if ($('#txtnombrearchivo').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta el nombre del archivo', 'error'); }
        else
            if (vtbancos == null) { $.messager.alert('Error', 'Falta seleccionar el banco', 'error'); return 0; }
            else
                if (vtorganismos == null) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
                else                    
                    {                    
                        GENERAR_ARCHIVO($('#txtnombrearchivo').textbox('getValue'), vtorganismos.name , vtbancos.name, $('#dfechapago').datebox('getValue'));
                    }
    }
}

function GENERAR_ARCHIVO(archivo, organismos, banco, fechapago) {
    var parametros = {};
    parametros.archivo = archivo,
    parametros.organismos = organismos,    
    parametros.banco = banco,
    parametros.fechapago = fechapago,    
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

                    window.open('Descargar.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue'));

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

