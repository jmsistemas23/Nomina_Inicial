var Id = "";
var objm = "";
var makesArray = [];
var tipo = 'IL';
var chkRowsDoc = [];
$(document).ready(function () {
    $('#btnLimpiar').bind('click', function () { BTNLIMPIAR('#btnLimpiar'); });    
    $('#btnGuardar').bind('click', function () { GUARDAR(); });

    $('#btnConceptoP').bind('click', function () { tipoind = "P"; CARGAR_INDICADORES('#btnConcepto' + tipoind, '#txtConcepto' + tipoind); });
    $('#btnConceptoD').bind('click', function () { tipoind = "D"; CARGAR_INDICADORES('#btnConcepto' + tipoind, '#txtConcepto' + tipoind); });
    $('#btnLConceptoD').bind('click', function () { $('#txtConceptoD').textbox('setValue', ''); });

    $('#btnDmediosueldo').bind('click', function () { tipoind = "D"; CARGAR_INDICADORES('#btnDmediosueldo', '#txtmediosueldo'); });
    $('#btnLmediosueldo').bind('click', function () { $('#txtmediosueldo').textbox('setValue', ''); });

    $('#btnDsinsueldo').bind('click', function () { tipoind = "D"; CARGAR_INDICADORES('#btnDsinsueldo', '#txtsinsueldo'); });
    $('#btnLsinsueldo').bind('click', function () { $('#txtsinsueldo').textbox('setValue', ''); });

    $('#btnCancelarConceptos').bind('click', function () {
        $('#txtvalorind').textbox('setValue', '');
        cargaConceptos(tipoind, '');
    });

    LISTAR_MOVIMIENTOS('#lstMenus');
    LIMPIAR('#btnLimpiar',0);
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
                document.getElementById('chkAplicaDescuento').checked = ((makesArray[0].AplicaDescuentoDirecto == 1) ? true : false);
                document.getElementById('chkgenrectemp').checked = ((makesArray[0].GeneraRecursoTemporal == 1) ? true : false);
                document.getElementById('chkrestadias').checked = ((makesArray[0].RestaDias == 1) ? true : false);
                $('#txtConceptoD').textbox('setValue', makesArray[0].ClaveDescuentoDirecto);
                $('#txtFactor').textbox('setValue', makesArray[0].FactorIncidencia);

                document.getElementById('chkantiguedad').checked = ((makesArray[0].forzaAfectacion_ErrorAntiguedad == 1) ? true : false);
                document.getElementById('chkempinactivo').checked = ((makesArray[0].forzaAfectacion_ErrorEmpleadoInactivo == 1) ? true : false);

                document.getElementById('chkvisible').checked = ((makesArray[0].Visible == 1) ? true : false);

                if ($('#chkAplicaDescuento').is(':checked') == true) {
                    $('#btnConceptoD').linkbutton({ disabled: false });
                    $('#btnLConceptoD').linkbutton({ disabled: false });
                }
                else {
                    $('#btnConceptoD').linkbutton({ disabled: true });
                    $('#btnLConceptoD').linkbutton({ disabled: true });
                }
                document.getElementById('chkADesValidacion').checked = ((makesArray[0].AplicaDescuentoConValidacion == 1) ? true : false);
                $('#txtmediosueldo').textbox('setValue', makesArray[0].ClaveDescuentoValidacion_MedioSueldo);
                $('#txtsinsueldo').textbox('setValue', makesArray[0].ClaveDescuentoValidacion_SinSueldo);

                if ($('#chkADesValidacion').is(':checked') == true) {
                    $('#btnDmediosueldo').linkbutton({ disabled: false });
                    $('#btnLmediosueldo').linkbutton({ disabled: false });

                    $('#btnDsinsueldo').linkbutton({ disabled: false });
                    $('#btnLsinsueldo').linkbutton({ disabled: false });
                }
                else {
                    $('#btnDmediosueldo').linkbutton({ disabled: true });
                    $('#btnLmediosueldo').linkbutton({ disabled: true });

                    $('#btnDsinsueldo').linkbutton({ disabled: true });
                    $('#btnLsinsueldo').linkbutton({ disabled: true });
                }
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
  
    $('#chkAplicaDescuento').bind('click', function () {
        if ($('#chkAplicaDescuento').is(':checked') == true) {
            $('#btnConceptoD').linkbutton({ disabled: false });
            $('#btnLConceptoD').linkbutton({ disabled: false });
        }
        else {
            $('#btnConceptoD').linkbutton({ disabled: true });
            $('#btnLConceptoD').linkbutton({ disabled: true });
        }
    });

    $('#chkADesValidacion').bind('click', function () {
        if ($('#chkADesValidacion').is(':checked') == true) {
            $('#btnDmediosueldo').linkbutton({ disabled: false });
            $('#btnLmediosueldo').linkbutton({ disabled: false });

            $('#btnDsinsueldo').linkbutton({ disabled: false });
            $('#btnLsinsueldo').linkbutton({ disabled: false });
        }
        else {
            $('#btnDmediosueldo').linkbutton({ disabled: true });
            $('#btnLmediosueldo').linkbutton({ disabled: true });

            $('#btnDsinsueldo').linkbutton({ disabled: true });
            $('#btnLsinsueldo').linkbutton({ disabled: true });
        }
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

function cargaConceptos(tipo, condicion, objtxt) {
    chkRowsDoc=[];
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
            $('#btnAceptarConceptos').unbind('click').click(function () { cadenaConceptosSeleccionados(tipo, objtxt); });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
            $('#modalConceptos').window('close');
        }
    });
}

function cadenaConceptosSeleccionados(tipo, objtxt) {
    var conceptos = '';
    var separa = (tipo == 'P') ? '+' : '-';
    var checkedItems = $('#dgConceptos').datagrid('getChecked');
    var names = [];
    var conteo = 0;
    $.each(checkedItems, function (index, item) {
        conteo++;
        if (conceptos.length <= 0) { conceptos = item.Concepto; }
       // else { conceptos += separa + item.Concepto; }
    });

    if (conteo > 1) {
        $.messager.alert('Error', 'Solo se permite una clave, verifique selección', 'error');
    }
    else {
        if (conceptos.length <= 0) { separa = ''; }
        $(objtxt).textbox('setValue', conceptos);
        $('#modalConceptos').window('close');
    }
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

function LIMPIAR(nuevo)
{
    if (nuevo == 1 && $('#lstMenus').tree('getSelected') == null) { nuevo = 0; }
    $('#txtpropietario').textbox('setValue', $('#txtId').val());
    $('#txtNomPropietario').textbox('setValue', $('#txtnombremenu').val());
    $('#txtId').textbox('setValue', '0');
    document.getElementById('chkAplicaDescuento').checked = false;
    document.getElementById('chkgenrectemp').checked = false;
    document.getElementById('chkrestadias').checked = false;
    document.getElementById('chkADesValidacion').checked = false;
    $('#txtConceptoD').textbox('setValue', '');
    $('#txtFactor').textbox('setValue', '');
    $('#txtmediosueldo').textbox('setValue', '');
    $('#txtsinsueldo').textbox('setValue', '');
    document.getElementById('chkantiguedad').checked = false;
    document.getElementById('chkempinactivo').checked = false;
    document.getElementById('chkvisible').checked = true;
    if (nuevo == 0) {
        $('#dg').datagrid('loadData', { "total": 0, "rows": [] });
        $('#txtpropietario').textbox('setValue', '0');
        $('#txtNomPropietario').textbox('setValue', 'SIN NIVEL SUPERIOR');
        LISTAR_MOVIMIENTOS('#lstMenus');
    }
    $('#txtnombremenu').textbox('clear').textbox('textbox').focus();

    if ($('#chkAplicaDescuento').is(':checked') == true) {
        $('#btnConceptoD').linkbutton({ disabled: false });
        $('#btnLConceptoD').linkbutton({ disabled: false });
    }
    else {
        $('#btnConceptoD').linkbutton({ disabled: true });
        $('#btnLConceptoD').linkbutton({ disabled: true });
    }

    if ($('#chkADesValidacion').is(':checked') == true) {
        $('#btnDmediosueldo').linkbutton({ disabled: false });
        $('#btnLmediosueldo').linkbutton({ disabled: false });

        $('#btnDsinsueldo').linkbutton({ disabled: false });
        $('#btnLsinsueldo').linkbutton({ disabled: false });
    }
    else {
        $('#btnDmediosueldo').linkbutton({ disabled: true });
        $('#btnLmediosueldo').linkbutton({ disabled: true });

        $('#btnDsinsueldo').linkbutton({ disabled: true });
        $('#btnLsinsueldo').linkbutton({ disabled: true });
    }
}

function BTNLIMPIAR(btnobj, nuevo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        LIMPIAR(0);
    }
}

function GUARDAR() {
    if ($('#txtnombremenu').textbox('getValue') == "") { $.messager.alert('Error', "Falta nombre del movimiento", 'error'); }
    else if (document.getElementById('chkAplicaDescuento').checked && $('#txtConceptoD').textbox('getValue') == "") { $.messager.alert('Error', "Debe especificar clave para descuento", 'error'); }
    else if (document.getElementById('chkADesValidacion').checked && $('#txtmediosueldo').textbox('getValue') == "") { $.messager.alert('Error', "Debe especificar el indicador de medio sueldo", 'error'); }
    else if (document.getElementById('chkADesValidacion').checked && $('#txtsinsueldo').textbox('getValue') == "") { $.messager.alert('Error', "Debe especificar el indicador de sin sueldo", 'error'); }
    else
    {
        //0 | DESCUENTOS | 0 |
        //1 | 0 ||| 0 | 0 ||
        var qry = $('#txtId').textbox('getValue') + '|' + $('#txtnombremenu').textbox('getValue').toUpperCase() + '|' + $('#txtpropietario').textbox('getValue') + '|'
            + ((document.getElementById('chkvisible').checked) ? '1' : '0') + '|'
            + ((document.getElementById('chkAplicaDescuento').checked) ? '1' : '0') + '|'
            + (($('#txtConceptoD').textbox('getValue') == '') ? '' : $('#txtConceptoD').textbox('getValue')) + '|'
            + (($('#txtFactor').textbox('getValue') == '') ? '' : $('#txtFactor').textbox('getValue')) + '|'
            + ((document.getElementById('chkgenrectemp').checked) ? '1' : '0') + '|'
            + ((document.getElementById('chkADesValidacion').checked) ? '1' : '0') + '|'
            + (($('#txtmediosueldo').textbox('getValue') == '') ? '' : $('#txtmediosueldo').textbox('getValue')) + '|'
            + (($('#txtsinsueldo').textbox('getValue') == '') ? '' : $('#txtsinsueldo').textbox('getValue')) + '|'
            + ((document.getElementById('chkrestadias').checked) ? '1' : '0') + '|'
            + ((document.getElementById('chkexpediente').checked) ? '1' : '0');
            + ((document.getElementById('chkantiguedad').checked) ? '1' : '0');
            + ((document.getElementById('chkempinactivo').checked) ? '1' : '0');
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

function CARGAR_INDICADORES(btnobj,objtxt)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        cargaConceptos(tipoind, '', objtxt);
        $('#modalConceptos').window('open');
    }
}
