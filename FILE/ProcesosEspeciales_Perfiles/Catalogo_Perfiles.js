var tipomov = "";
var Ancho = 60;
var Alto = 60;
var checkedRows = [];
var checkedRowsInd = [];
$(document).ready(function () {
    $.extend($.fn.datagrid.methods, {
        getChecked: function (jq) {
            var rr = [];
            var rows = jq.datagrid('getRows');
            jq.datagrid('getPanel').find('div.datagrid-cell-check input:checked').each(function () {
                var index = $(this).parents('tr:first').attr('datagrid-row-index');
                rr.push(rows[index]);
            });
            return rr;
        }
    });
    sessionStorage.setItem('condicion', "");
    CARGAR_GRID('#dglista', Ancho, Alto, "");
    CARGAR_CAMPOSBUSQUEDAS('#dglista', '#cbcampos', 'descripcion');

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); }
        }
    });
    $('#btnbuscar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnNuevo').bind('click', function () { NUEVO_PERFIL(); });
    $('#btnRegresar').bind('click', function () { REGRESAR_PERFIL(); });
    $('#btnModificar').bind('click', function () { MODIFICAR_PERFIL('#btnModificar'); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_PERFIL('#btnEliminar'); });
    $('#btnGuardar').bind('click', function () { GUARDAR_PERFIL(); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_PERFIL(); });
    $('#btnDiseño').bind('click', function () { DISEÑO_PERFIL('#btnDiseño'); });

    $('#btnModificarOrd').bind('click', function () { MODIFICAR_ORDENPERFIL('#btnModificarOrd'); });
    $('#btnRegresarO').bind('click', function () { REGRESAR_ORDENPERFIL(); });
    $('#btnGuardarO').bind('click', function () { GUARDAR_ORDENPERFIL(); });

    $('#btnConceptoP').bind('click', function () { cargaConceptos('P'); });
    $('#btnCancelarConceptos').bind('click', function () {
        $('#txtvalorind').textbox('setValue', '');
        cargaConceptos('P');
    });
    $('#btnLConceptoP').bind('click', function () { $('#txtConceptoP').textbox('setValue', ''); $('#txtDesConcepto').textbox('setValue', ''); });

    $('#txtvalorind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalorind').textbox('getValue');
            if (vvalor != "") {
                condicion = vvalor;
            }
            cargaConceptos('P');
        }
    });
    $('#btnbusarind').bind('click', function () { cargaConceptos('P'); });

    $('#dgorden').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });
    $('#dgorden').datagrid({
        checkOnSelect: false,
        selectOnCheck: false,
        singleSelect: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');

            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onLoadSuccess: onLoad,
        onEndEdit: onEndEdit,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $(this).datagrid('checkRow', index);
        },
        onBeginEdit: function (index, row) {
            var dg = $(this);
            var Orden = dg.datagrid('getEditor', { index: index, field: 'ordenperfil' });
            $(Orden.target).textbox('textbox').css('textAlign', 'center');
        }
    });

});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            return
        }
    }
    row.ordenperfil = row.ordenperfil;
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            checkedRows.splice(i, 1);
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
                if (checkedRows[i].id == row.id) {
                    dg.datagrid('checkRow', index);
                    row.ordenperfil = checkedRows[i].ordenperfil;
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}
function onEndEdit(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'ordenperfil'
    });
    if (ed != null) { row.ordenperfil = $(ed.target).numberbox('getText'); }
}


function onEndEditInd(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'Concepto'
    });
    if (ed != null) { row.concepto = $(ed.target).numberbox('getText'); }
}
function onLoadInd(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRowsInd.length; i++) {
                if (checkedRowsInd[i].Concepto == row.Concepto) {
                    dg.datagrid('checkRow', index);
                    row.Concepto = checkedRowsInd[i].Concepto;
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}
function onCheckInd(index, row) {
    for (var i = 0; i < checkedRowsInd.length; i++) {
        if (checkedRowsInd[i].Concepto == row.Concepto) {
            return
        }
    }
    row.Concepto = row.Concepto;
    checkedRowsInd.push(row);
}
function onUncheckInd(index, row) {
    for (var i = 0; i < checkedRowsInd.length; i++) {
        if (checkedRowsInd[i].Concepto == row.Concepto) {
            checkedRowsInd.splice(i, 1);
            return;
        }
    }
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

function AGREGAR_PERCEPCION(btnobj, tipoind) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        CARGAR_IND('#dgind', tipoind, 530, 220, '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 555, 630, false, 'Percepciones');
    }
}
function CARGAR_IND(dgcontrol, strtipo, ancho, alto, condicion) {

    $(dgcontrol).datagrid({
        url: "Listar_Indicadores.aspx?tipotbl='" + strtipo + "'&busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "px",
        heigth: alto + "px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                $('#txtConceptoP').textbox('setValue', rows.clave);
                $('#txtDesConcepto').textbox('setValue', rows.descripcion);
                $("#wind").window('close');
            }
        }
    });
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
    $('#txtConceptoP').textbox('setValue', conceptos + separa);
    $('#wind').window('close');
}

function cargaConceptos(tipo) {
    var parametros = {};
    parametros.tipo = tipo;
    parametros.conceptos = (tipo == 'P') ? $('#txtConceptoP').val() : $('#txtConceptoD').val();
    parametros.condicion = $('#txtvalorind').val();
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
                onCheck: onCheckInd,
                onUncheck: onUncheckInd,
                onEndEdit: onEndEditInd,
                onLoadSuccess: function (data) {
                    var rows = $('#dgConceptos').datagrid('getRows');
                    for (i = 0; i < rows.length; i++) {
                        if ($('#dgConceptos').datagrid('getRows')[i].Seleccion == 'True') { $('#dgConceptos').datagrid('checkRow', i); }
                    }
                },
            });
            $('#wind').window('open');
            $('#btnAceptarConceptos').unbind('click').click(function () { cadenaConceptosSeleccionados(tipo); });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
            $('#wind').window('close');
        }
    });
}


function CARGAR_GRID(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Perfiles.aspx?&busqueda=' + condicion,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                sessionStorage.setItem('index', $(dgcontrol).datagrid('getRowIndex', rows));
                sessionStorage.setItem('clave', rows[fields[0]]);
                sessionStorage.setItem('condicion', "Id=" + rows[fields[0]]);
                sessionStorage.setItem('descripcionperfil', rows[fields[2]]);
                $('#btnModificar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');
                $('#btnDiseño').linkbutton('enable');
            }
        }
    });
    //var total = $(dgcontrol).datagrid('getRows');
    //if (total.length > 0) { $('#btnModificarOrd').linkbutton({ disabled: false }); }
    //else
    //{ $('#btnModificarOrd').linkbutton({ disabled: true }); }
}

function CARGAR_GRID_ORDEN(dgcontrol, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Perfiles.aspx?&busqueda=' + condicion,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        pageSize: 20,
        width: "50%",
        heigth: "60%"
    });
    //var total = $(dgcontrol).datagrid('getRows');
    //var total = $(dgcontrol).datagrid('getData').total;
    //for (var c = 0; c < total; c++) {
    //$(dgcontrol).datagrid('beginEdit', c);
    //var edorden = $(dgcontrol).datagrid('getEditor', { index: c, field: 'ordenperfil' })
    //$(edorden.target).textbox('textbox').css('textAlign', 'center')       
    //}
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";
    var vvalor = $(objval).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(objcam).combobox('getValue');
        var vcondicion = $(objcon).combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_GRID('#dglista', Ancho, Alto, condicion);
}

function LIMPIAR() {
    $('#txtclave').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#chkactivo').attr("checked", true);
    $('#txtConceptoP').textbox('setValue', '');
    $('#txtDesConcepto').textbox('setValue', '');
    $('#txtproceso').textbox('setValue', '');
}

function HABILITAR_CONTROLES() {
    $('#txtclave').textbox({ readonly: false });
    $('#txtdescripcion').textbox({ readonly: false });
    $('#txtproceso').textbox({ readonly: false });
    $('#chkactivo').attr("disabled", false);
}

function DESHABILITAR_CONTROLES() {
    $('#txtclave').textbox({ readonly: true });
    $('#txtdescripcion').textbox({ readonly: true });
    $('#txtproceso').textbox({ readonly: true });
    $('#chkactivo').attr("disabled", true);
}

function NUEVO_PERFIL() {
    tipomov = "Guardar";
    $('#btnlimpiarcap').show();
    $('#dmenu').hide();
    $('#dcaptura').show();
    $('#btnGuardar').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
    HABILITAR_CONTROLES();
    document.getElementById('lblsubtitulo').innerHTML = "Agregar";
    $('#txtclave').textbox({ readonly: true });
    LIMPIAR();
}

function REGRESAR_PERFIL() {
    $('#dmenu').show();
    $('#dcaptura').hide();
    document.getElementById('lblsubtitulo').innerHTML = "";
    $('#btnModificar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    //if (sessionStorage.getItem('index') != null)
    //{ $('#dglista').datagrid('unselectRow', sessionStorage.getItem('index')); }
    //else {
    CARGAR_GRID('#dglista', Ancho, Alto, "");
}

function MODIFICAR_PERFIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        tipomov = "Modificar";
        $('#btnlimpiarcap').show();
        $('#btnGuardar').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
        $('#dmenu').hide();
        $('#dcaptura').show();
        document.getElementById('lblsubtitulo').innerHTML = "Modificar";
        HABILITAR_CONTROLES();
        $('#txtclave').textbox({ readonly: true });

        var filas = $('#dglista').datagrid('getSelected');

        $('#txtclave').textbox('setValue', filas.id);
        $('#txtdescripcion').textbox('setValue', filas.descripcion);
        $('#txtConceptoP').textbox('setValue', filas.cveind);
        $('#txtDesConcepto').textbox('setValue', filas.desind);
        $('#txtproceso').textbox('setValue', filas.procedimiento);

        if (filas.activo == "Si") { $('#chkactivo').attr("checked", true); }
        else { $('#chkactivo').attr("checked", false); }
    }
}

function ELIMINAR_PERFIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        tipomov = "Eliminar";
        $('#btnGuardar').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' });
        $('#btnlimpiarcap').hide();
        $('#dmenu').hide();
        $('#dcaptura').show();
        document.getElementById('lblsubtitulo').innerHTML = "Eliminar";
        DESHABILITAR_CONTROLES();
        var filas = $('#dglista').datagrid('getSelected');
        $('#txtclave').textbox('setValue', filas.id);
        $('#txtdescripcion').textbox('setValue', filas.descripcion);
        if (filas.activo == "Si") { $('#chkactivo').attr("checked", true); }
        else { $('#chkactivo').attr("checked", false); }
    }
}

function LIMPIAR_PERFIL() {
    $('#btnModificar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    if (sessionStorage.getItem('index') != null)
    { $('#dglista').datagrid('unselectRow', sessionStorage.getItem('index')); }
    else { CARGAR_GRID('#dglista', Ancho, Alto, ""); }
    FOCUS('#txtvalor', "#dglista");
}

function GUARDAR_PERFIL() {
    var valores = "", activo = "", clave = "";
    if ($('#chkactivo').is(":checked") == true) { activo = "1"; } else { activo = "0"; }
    if (tipomov == "Guardar") { clave = "0"; }
    else { clave = $('#txtclave').textbox('getValue') }

    valores = 'descripcion:' + $('#txtdescripcion').textbox('getValue') + '|estatus:' + activo + '|cveind:' + $('#txtConceptoP').textbox('getValue') + '|desind:' + $('#txtDesConcepto').textbox('getValue')+'|procedimiento:'+ $('#txtproceso').textbox('getValue');
    //valores = 'descripcion:' + $('#txtdescripcion').textbox('getValue') + '|estatus:' + activo;


    var parametros = {};
    parametros.strmov = tipomov
    parametros.strvalores = valores;
    parametros.strcondicion = sessionStorage.getItem('condicion');
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Perfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
                CARGAR_GRID('#dglista', Ancho, Alto, "");
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

function DISEÑO_PERFIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //document.location = "Diseñador_consulta.aspx?idperfil=" + sessionStorage.getItem('clave') + "&desperfil=" + sessionStorage.getItem('descripcionperfil');
        IR_PAGINA("Diseñador_Consultas.aspx", "idperfil=" + sessionStorage.getItem('clave') + "&desperfil=" + sessionStorage.getItem('descripcionperfil'));
    }
}

function MODIFICAR_ORDENPERFIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $('#dcaptura').hide();
        $('#dmenu').hide();
        $('#dorden').show();
        CARGAR_GRID_ORDEN('#dgorden', "");
    }
}
function REGRESAR_ORDENPERFIL() {
    $('#dcaptura').hide();
    $('#dmenu').show();
    $('#dorden').hide();
    CARGAR_GRID('#dglista', Ancho, Alto, "");
}
function GUARDAR_ORDENPERFIL() {

    var valores = "";
    $('#dgorden').datagrid('acceptChanges');
    var fields = $('#dgorden').datagrid('getColumnFields', true).concat($('#dgorden').datagrid('getColumnFields', false));
    if (checkedRows.length > 0) {
        for (var f = 0; f < checkedRows.length; f++) {
            valores += fields[2] + "=" + checkedRows[f].ordenperfil + ";" + fields[1] + "=" + checkedRows[f].id + "|";
        }
        valores = valores.substring(0, valores.length - 1);

        var parametros = {};
        parametros.strvalores = valores;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Guardar_OrdenPerfiles",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    CARGAR_GRID_ORDEN('#dgorden', "");
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