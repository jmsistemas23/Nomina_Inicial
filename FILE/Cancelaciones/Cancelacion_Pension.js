var checkedRows = [];
var error = "";
$(document).ready(function () {
   

    CARGAR_DG("#dgp", "");
    CARGAR_TIPO_CANCELACIONES('#cbmotivo');
    CARGAR_ESTATUS_CANCELACIONES('#cbestatus');
    CARGAR_QUINCENAS("#cboquin");

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dg', '');
        CARGAR_CAMPOSBUSQUEDAS('#dg', '#cbocam', 'rfccom');
        windows("#winemp", 800, 680,false, "Pensionadas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#brnABusqueda').bind('click', function () { ACEPTAR_CANCELADOS('#brnABusqueda'); });

    $('#btnCancelar').bind('click', function () { APLICAR_CANCELACION('#btnCancelar'); });

    $('#btnEliminar').bind('click', function () { ELIMINAR_SELECCION('#btnEliminar'); });
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function CARGAR_DG(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,

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

function CARGAR_QUINCENAS(ddlobj) {
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Quincenas',
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

function CARGAR_TIPO_CANCELACIONES(objddl) {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_TiposCancelaciones",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            if (obj.length > 0) {
                $(objddl).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                    editable: false
                });
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

function CARGAR_ESTATUS_CANCELACIONES(objddl) {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_EstatusCancelaciones",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            if (obj.length > 0) {
                $(objddl).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                    editable: false
                });
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

function CARGAR_DATOS(dgcontrol, condicion) {
    var quincena = "";
    if ($('#cboquin').combobox('getValue') == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }
    $(dgcontrol).datagrid({
        url: "Listar_Pensionadas.aspx?busqueda=" + condicion + "&quincena=" + quincena,
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        pageSize: 20,
        width: "100%",
        heigth: "100%",
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

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_DATOS('#dg', condicion);
}

function LIMPIAR_DATOS() {
    $('#cbmotivo').combobox('setValue', 'x');
    $('#cbestatus').combobox('setValue', 'x');
    $('#txtobservaciones').textbox('setValue', '');

    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
}

function ACEPTAR_CANCELADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (total = $('#dgp').datagrid('getData').total > 0)
        { total = $('#dgp').datagrid('getData').total + 1; }
        else { total = 0; }

        for (var f = 0; f < checkedRows.length; f++) {
            $('#dgp').datagrid('insertRow', {
                index: total,
                row: {
                    id: checkedRows[f].id,
                    numplaza: checkedRows[f].numplaza,
                    numemp: checkedRows[f].numemp,
                    rfccom: checkedRows[f].rfccom,
                    nomemp: checkedRows[f].nomemp,
                    nompen: checkedRows[f].nompen,
                    cvebanpen: checkedRows[f].cvebanpen,
                    nombanpen: checkedRows[f].nombanpen,
                    pagppen: checkedRows[f].pagppen,
                    despago: checkedRows[f].despago,
                    estpago: checkedRows[f].estpago,
                    imppen01: checkedRows[f].imppen01,
                }
            });
        }
        checkedRows = [];
        $("#winemp").window('close');
    }
}

function ELIMINAR_SELECCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgp').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la fila selccionada', function (r) {
                if (r) {
                    var rowIndex = $("#dgp").datagrid("getRowIndex", filas);
                    $('#dgp').datagrid('deleteRow', rowIndex);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar la fila a eliminar', 'error'); }
    }
}

function APLICAR_CANCELACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valor = ""; var cadena = "";
        if ($('#cbmotivo').combobox('getValue') == "x") { $.messager.alert('Error', 'Falta el motivo de la cancelación', 'error'); return 0; }
        else
            if ($('#cbestatus').combobox('getValue') == "x") { $.messager.alert('Error', 'Falta el estatus de cancelación', 'error'); return 0; }
            else
            {
                var rows = $('#dgp').datagrid('getRows');
                if (rows.length == 0) { $.messager.alert('Error', 'Faltan los registros de la pensionada a cancelar', 'error'); return 0; }
                else
                {
                    var fields = $('#dgp').datagrid('getColumnFields', true).concat($('#dgp').datagrid('getColumnFields', false));
                    for (var r = 0; r < rows.length; r++) {
                        if ((rows[r][fields[11]] == 'P') && ($('#cbestatus').combobox('getValue') == 'R')) { $.messager.alert('Error', 'La Plaza ' + rows[r][fields[0]] + ' no se puede Reexpedir, aun no se ha pagado', 'error'); return 0; }
                        else {
                            INSERTAR_REGISTRO(rows[r][fields[0]], rows[r][fields[1]], rows[r][fields[2]], $('#cbmotivo').combobox('getValue'), $('#cbestatus').combobox('getValue'), $('#txtobservaciones').textbox('getValue'));
                        }
                    }
                    //valor = valor.substring(0, valor.length - 1);
                    

                    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });                    
                }
            }
    }
}

function INSERTAR_REGISTRO(idpen,plaza,empleado, motivo, estatus,  observaciones) {

    var quincena = "";
    if ($('#cboquin').combobox('getValue') == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }
    var parametros = {};
    parametros.idpen = idpen;
    parametros.plaza = plaza;
    parametros.empleado = empleado;
    parametros.quincancelada = quincena;
    parametros.motivo = motivo;
    parametros.estatus = estatus;    
    parametros.observaciones = observaciones;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Aplicar_Cancelacion_Pensionadas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0")
            { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }
            else { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


