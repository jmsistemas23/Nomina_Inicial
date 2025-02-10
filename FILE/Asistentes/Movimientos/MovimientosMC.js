var Id = "";
var objm = "";
var makesArray = [];
var tipo = 'MC';
var tipoind = "";
var condicionInd = "";
var chkRowsDoc = [];
$(document).ready(function () {
    $('#btnLimpiar').bind('click', function () { LIMPIAR(0); });
    $('#btnLConceptoP').bind('click', function () { $('#txtConceptoP').textbox('setValue', ''); });
    $('#btnLConceptoD').bind('click', function () { $('#txtConceptoD').textbox('setValue', ''); });
    $('#btnGuardar').bind('click', function () { GUARDAR(); });
    $('#btnConceptoP').bind('click', function () { tipoind = "P"; cargaConceptos(tipoind, ''); $('#modalConceptos').window('open'); });
    $('#btnConceptoD').bind('click', function () { tipoind = "D"; cargaConceptos(tipoind, ''); $('#modalConceptos').window('open'); });
    $('#btnCancelarConceptos').bind('click', function () {
        $('#txtvalorind').textbox('setValue','');
        cargaConceptos(tipoind, '');

    });

    LISTAR_MOVIMIENTOS('#lstMenus');
    CARGAR_INDICES('#cboInd');
    LIMPIAR(0);
    document.getElementById('chkvisible').checked = true;
    $('#btnNuevo').bind('click', function () { NUEVO(); });

    $('#lstMenus').tree({
        onClick: function (node) {
            makesArray = jQuery.grep(objm, function (menus, i) {
                return menus.Id == node.Id;
            });
            if (makesArray.length > 0) {
                $('#txtpropietario').textbox('setValue', makesArray[0].Propietario);
                $('#txtId').textbox('setValue', makesArray[0].Id);
                $('#txtnombremenu').textbox('setValue', makesArray[0].Nombre);
                $('#txtNomPropietario').textbox('setValue', makesArray[0].NomPropietario);
                //document.getElementById('cbIndice').value = makesArray[0].Indice;
                $('#cboInd').combobox('setValue', makesArray[0].Indice);
                $('#txtConceptoP').textbox('setValue', makesArray[0].Percepciones);
                $('#txtConceptoD').textbox('setValue', makesArray[0].Deducciones);
                document.getElementById('chkvisible').checked = ((makesArray[0].Visible == 1) ? true : false);
            }
            LISTAR_SUBMOVIMIENTOS('#dg', node.Id);
        }
    });

    var text = $('#txtFmenu');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var valor = text.val();
            if (valor != "") {
                $('#lstMenus').tree('doFilter', valor);
                $('#lstMenus').tree('expandAll');
            }
            else { $('#lstMenus').tree('doFilter', ''); }
        }
    });

    $('#txtvalorind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {           
            var vvalor = $('#txtvalorind').textbox('getValue');
            if (vvalor != "") {
                condicionInd = vvalor;
            }
            else { condicionInd = ''; }
            cargaConceptos(tipoind, condicionInd);
        }
    });
    $('#btnbusarind').bind('click', function () {
        var vvalor = $('#txtvalorind').textbox('getValue');
        if (vvalor != "") {
            condicionInd = vvalor;
        }
        else { condicionind = ''; }
        cargaConceptos(tipoind, condicionInd);
    });
});

function LISTAR_MOVIMIENTOS(tobj) {
    var parametros = {};
    parametros.tipo=tipo;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Movimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            objm = jQuery.parseJSON(data.d[1]);

            $(tobj).tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LISTAR_INDICES() {

    var select = document.getElementById("cbIndice"), length = select.options.length;
    while (length--) { select.remove(length); }
    var parametros = {};
    parametros.tipo = tipo;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/LISTAR_INDICES",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $.each($.parseJSON(data.d), function () {
                var option = document.createElement("option");
                option.text = this.nombre;
                option.value = this.clave;
                document.getElementById('cbIndice').add(option);
            });
            document.getElementById('cbIndice').value = '';
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }
    });
}


function CARGAR_INDICES(ddlobj) {
    var parametros = {};
    parametros.tipo = tipo;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Cargar_Indices',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d != "") {
                obj = $.parseJSON(data.d);
                $(ddlobj).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                });
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function cargaConceptos(tipo,condicion) {
    var parametros = {};
    parametros.tipo = tipo;
    parametros.conceptos = (tipo == 'P') ? $('#txtConceptoP').val() : $('#txtConceptoD').val();
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarConceptos",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {           
            var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgConceptos').datagrid({
                rownumbers: true,                
                data: obj,
                columns: columnas,
                onCheck: onCheckDoc,
                onUncheck: onUncheckDoc,             
                onLoadSuccess: function (data) {
                    var dg = $(this);
                    var rows = dg.datagrid('getRows');
                    for (i = 0; i < rows.length; i++) {
                        if (dg.datagrid('getRows')[i].Seleccion == 'True') {
                            dg.datagrid('checkRow', i);
                        }
                    }
                    for (var i = 0; i < rows.length; i++) {
                        var index = i;
                        var row = rows[i];
                        (function () {
                            for (var i = 0; i < chkRowsDoc.length; i++) {
                                if (chkRowsDoc[i].Concepto == row.Concepto) {
                                    dg.datagrid('checkRow', index);
                                    dg.datagrid('beginEdit', index);
                                    dg.datagrid('endEdit', index);
                                    return;
                                }
                            }
                        })();
                    }
                }
            });
            $('#btnAceptarConceptos').unbind('click').click(function () { cadenaConceptosSeleccionados(tipo); });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
            $('#modalConceptos').window('close');
        }
    });
}

function onCheckDoc(index, row) {
    for (var i = 0; i < chkRowsDoc.length; i++) {
        if (chkRowsDoc[i].Concepto == row.Concepto) {
            return
        }
    }
    chkRowsDoc.push(row);
}
function onUncheckDoc(index, row) {
    var dg = $(this);
    for (var i = 0; i < chkRowsDoc.length; i++) {
        if (chkRowsDoc[i].Concepto == row.Concepto) {
            chkRowsDoc.splice(i, 1);
            dg.datagrid('unselectRow', index);
            return;
        }
    }
}
function onLoad(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].Concepto == row.Concepto) {
                    dg.datagrid('checkRow', index);                    
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}



function cadenaConceptosSeleccionados(tipo) {
    var conceptos = '';
    var separa = (tipo == 'P') ? '+' : '-';
    var checkedItems = $('#dgConceptos').datagrid('getChecked');
    var names = [];
    $.each(checkedItems, function (index, item) {
        if (conceptos.length <= 0) { conceptos = item.Concepto; }
        else { conceptos += separa + item.Concepto; }
    });

    if (conceptos.length <= 0) { separa = ''; }
    $('#txtConcepto' + tipo).textbox('setValue',conceptos + separa);
    $('#modalConceptos').window('close');
}

function NUEVO() {
    if ($('#lstMenus').tree('getSelected') != null) {
        if ($('#lstMenus').tree('getSelected').Id.toString().length > 4) {
            $.messager.alert('Error', 'Nivel máximo alcanzado, no puede generar nivel dentro del elemento seleccionado', 'error');
        } else {
            LIMPIAR(1);
        }
    }
    else { LIMPIAR(1); }
}

function LIMPIAR(nuevo) {
    condicionInd = "";
    if (nuevo == 1 && $('#lstMenus').tree('getSelected') == null) { nuevo = 0; }
    $('#txtpropietario').textbox('setValue', $('#txtId').val());
    $('#txtNomPropietario').textbox('setValue', $('#txtnombremenu').val());
    $('#txtId').textbox('setValue', '0');
    $('#cboInd').combobox('setValue', 'x');
    $('#txtConceptoP').textbox('setValue', '');
    $('#txtConceptoD').textbox('setValue', '');
    document.getElementById('chkvisible').checked = true;
    if (nuevo == 0) {
        $('#dg').datagrid('loadData', { "total": 0, "rows": [] });
        $('#txtpropietario').textbox('setValue', '0');
        $('#txtNomPropietario').textbox('setValue', 'SIN NIVEL SUPERIOR');
        LISTAR_MOVIMIENTOS('#lstMenus');
        CARGAR_INDICES('#cboInd');
    }
    $('#txtnombremenu').textbox('clear').textbox('textbox').focus();
}

function GUARDAR() {
    if ($('#txtnombremenu').textbox('getValue') == "") { $.messager.alert('Error', "Falta nombre del movimiento", 'error'); }
    else
    {
        var qry = $('#txtId').val() + '|' + $('#txtnombremenu').val().toUpperCase() + '|' + $('#txtpropietario').val() + '|' + ((document.getElementById('chkvisible').checked) ? '1' : '0') + '|' + $('#cboInd').combobox('getValue') + '|' + $('#txtConceptoP').val() + '|' + $('#txtConceptoD').val() + "||" + ((document.getElementById('chkproyeccion').checked) ? '1' : '0');
        var parametros = {};
        parametros.tipo = tipo;
        parametros.valores = qry;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Guardar_Movimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    //LIMPIAR(0);
                    LISTAR_MOVIMIENTOS('#lstMenus');
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    }
}


function LISTAR_SUBMOVIMIENTOS(dgcontrol, id) {
    $(dgcontrol).datagrid({
        url: "Listar_SubMovimientos.aspx?tipo=" + tipo + "&busqueda=" + id,
        //pagination: true,
        //rownumbers: true,
        //singleSelect: true,
        //striped: true,
        //pageSize: 10,
        height: "300px",
        beforeSend: function () {
            $('#loading').show();
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}
