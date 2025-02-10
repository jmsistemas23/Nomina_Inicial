var currentDate = "", vigencia = "";
var checkedRows = [];

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
    })

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

    $('#btnActual').bind('click', function () {
        $('#tquincenas').tree('removeAll');
    });

    $('#btnActual').bind('click', function () {
        $('#tquincenas').tree('removeAll');
    });

    CARGAR_QUINCENAS('#tquincenas');
    CARGAR_BANCOS('#tbancos');   

    $('#tbancos').tree({
        onClick: function (node) {
            if (node.name != 0) {
                var valor = node.attributes.split('|');

                var fecha = $('#dfechapago').datebox('getValue');
                fecha = ReplaceAll(fecha, "/", '');
                var año = fecha.substring(fecha.length - 2)
                var mes = fecha.substr(2, 2);
                var dia = fecha.substr(0, 2);

                fecha = año + mes + dia;   
                var archivo = valor[0];
                archivo = archivo.replace("fecha",fecha);
                $('#txtnombrearchivo').textbox('setValue', archivo );    
            }
        }
    });

    $('#btnBuscar').bind('click', function () {      
            CARGAR_DATOS('#dg','');                   
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () {
        FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue'));
    });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#btnGenerar').bind('click', function () { GENERAR_ARCHIVO(); });

    $('#btnContador').bind('click', function () {
        ABRIR_VENTANA_CONTADOR();
    });

    $('#btnActualizar').bind('click', function () {
        ACTUALIZAR_CONTADOR();
    });

   
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].empleado == row.empleado) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].empleado == row.Idempleado) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}


function Fecha() {
    var fullDate = new Date();
    var twoDigitMonth = ((fullDate.getMonth().length + 1) === 1) ? (fullDate.getMonth() + 1) : '0' + (fullDate.getMonth() + 1);
    var twoDigitDate = fullDate.getDate() + ""; if (twoDigitDate.length == 1) twoDigitDate = "0" + twoDigitDate;
    currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
    var vigMes = (fullDate.getMonth() + 1) + 2;
    vigencia = twoDigitDate + "/" + vigMes + "/" + fullDate.getFullYear();
}

function CARGAR_BANCOS(tvobj) {
    $.ajax({
        type: "POST",
        url: 'Fun_Foseg.aspx/Cargar_Bancos',
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
        complete: function () { $('#loading').hide(100); }
    });
}

function CARGAR_QUINCENAS(tvobj) {
    $.ajax({
        type: "POST",
        url: 'Fun_Foseg.aspx/Cargar_Quincenas',
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
        complete: function () { $('#loading').hide(100); }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var strconemp = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            strconemp = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { strconemp = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strconemp = " "; }
    CARGAR_DATOS('#dg', strconemp);
}

function CARGAR_DATOS(objdg,filtro) {
    var t = $('#tquincenas');
    var nodoquin = t.tree('getSelected');
    if (nodoquin !=null) {
        var parametros = {};
        parametros.quincena = nodoquin.name;
        parametros.filtro=filtro
        $.ajax({
            type: "POST",
            url: 'Fun_Foseg.aspx/Cargar_Empleados',
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    var obj = jQuery.parseJSON(data.d[2]);
                    $(objdg).datagrid({
                        data: obj,
                        pagination: false,
                        rownumbers: true,
                        singleSelect: false,
                        striped: true,
                        multiSort: false,
                        remoteSort: false,                           
                        pageSize: 100000,
                        width: "100%",
                        heigth: "100%",
                        onCheck: onCheck,
                        onUncheck: onUncheck,
                        onCheckAll: function () {
                            var allRows = $(this).datagrid('getRows');
                            checkedRows = allRows;
                        },
                        onUncheckAll: function () {
                            checkedRows = [];
                        },                         
                        beforeSend: function () {
                            $('#loading').show();
                        },
                        onClickRow: function () {
                            //rows = $(objdg).datagrid('getSelected');
                            //if (rows) {
                            //    empleado = rows.numemp;
                                //$("#winemp").window('close');
                            //}
                        },                      
                        error: function (err) {
                            $('#loading').hide(100);
                            $.messager.alert('Error', err.responsetext, 'error');
                        },
                        complete: function () { $('#loading').hide(100); }
                    });
                }
                else { $.messager.alert('Error', data.d[2], 'error'); }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.responseText, 'error');
            },
            complete: function () { $('#loading').hide(100); }
        });

        CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
        windows("#winemp", 750, 600, false, "Empleados");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();      
    }
    else { $.messager.alert('Error', 'Falta seleccioanr la quincena a cargar', 'error'); }
}

function LIMPIAR_DATOS() {
    Fecha();
    $('#dfechapago').datebox('setValue', currentDate);
    $('#dvigencia').datebox('setValue', vigencia);
    $("#txtnombrearchivo").textbox('setValue','');

    LIMPIAR_NODE_TREE('#tbancos', false);
    LIMPIAR_NODE_TREE('#tquincenas', false);
   
}

function GENERAR_ARCHIVO() {
    var vtbancos = "", vtquin = "", filtro = "";
    var seleccion = 0;
    vtbancos = $('#tbancos').tree('getSelected');
    vtquin = $('#tquincenas').tree('getSelected');

    if ($('#txtnombrearchivo').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta el nombre del archivo', 'error'); }
    else
        if (vtbancos == null) { $.messager.alert('Error', 'Falta seleccionar el banco', 'error'); return 0; }
        else
            if ((vtquin == null) && (quin != 'Actual')) { $.messager.alert('Error', 'Falta seleccionar el organismo', 'error'); return 0; }
            else {

                var dg = $('#dg');  
                var rows = dg.datagrid('getRows');                
                for (var r = 0; r < rows.length; r++) {
                    for (var s = 0; s < checkedRows.length; s++) {
                        if (rows[r].empleado == checkedRows[s].empleado) {
                            filtro += checkedRows[s].empleado + ",";     
                            seleccion += 1;
                        }
                    }                    
                }
                if (seleccion > 0) { filtro = filtro.substring(0, filtro.length - 1); }

                var parametros = {};
                parametros.archivo = $('#txtnombrearchivo').textbox('getValue'),                    
                parametros.quincena = vtquin.name;
                parametros.banco = vtbancos.name,
                parametros.fechapago = $('#dfechapago').datebox('getValue'),
                parametros.vigencia = $('#dvigencia').datebox('getValue'),
                parametros.tiposalida = 'ARCHIVO',
                parametros.extension = 'chp'
                parametros.filtro = filtro,
                $.ajax({
                    type: "POST",
                    url: 'Fun_Foseg.aspx/Crear_Archivo',
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "1") { $.messager.alert('Error', data.d, 'error'); }
                        else {

                                $.messager.alert('Información', 'Archivo Generado', 'info');
                               
                               
                                window.open('Descargar_Foseg.aspx?Fileid=' + $('#txtnombrearchivo').textbox('getValue') + "&ext=chp");
                               

                            LIMPIAR_DATOS();
                            }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.responsetext, 'error');
                    },
                    complete: function () { $('#loading').hide(100); }
                });

            }
}


function ABRIR_VENTANA_CONTADOR() {
    var parametros = {};
    parametros.movimiento = 'S',
        parametros.contador = 0
    $.ajax({
        type: "POST",
        url: 'Fun_Foseg.aspx/Contador',
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
        url: 'Fun_Foseg.aspx/Contador',
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
