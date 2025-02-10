var tipomov = "";
$(document).ready(function () {
    sessionStorage.setItem('condicion', "");
    CARGAR_GRID('#dglista', 70, 50, "");
    CARGAR_CAMPOSBUSQUEDA('#dglista', '#cbcampos');

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbcondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); }
        }
    });
    $('#btnbuscar').bind('click', function () { FORMAR_CONDICION($("#cbcampos").combobox('getValue'), $("#cbcondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); });

    $('#btnNuevo').bind('click', function () { NUEVO_PERFIL(); });
    $('#btnRegresar').bind('click', function () { REGRESAR_PERFIL(); });
    $('#btnModificar').bind('click', function () { MODIFICAR_PERFIL('#btnModificar'); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_PERFIL('#btnEliminar'); });
    $('#btnGuardar').bind('click', function () { GUARDAR_PERFIL('#btnGuardar'); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_PERFIL(); });
    $('#btnDiseño').bind('click', function () { DISEÑO_PERFIL('#btnDiseño'); });
   
});

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

function CARGAR_GRID(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Cat_Perfiles_Excel.aspx?&busqueda=' + condicion,
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
                sessionStorage.setItem('descripcionperfil', rows[fields[1]]);
                $('#btnModificar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');
                $('#btnDiseño').linkbutton('enable');
            }
        }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";    
    if (objval != "") {
        if (objcon == 'like') { condicion = objcam + ' ' + objcon + ' \'\'|' + objval + '|\'\''; }
        else { condicion = objcam + ' ' + objcon + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_GRID('#dglista', 70, 50, condicion);
}

function LIMPIAR() {
    $('#txtclave').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#txtprocedimiento').textbox('setValue', '');
    $('#chkactivo').attr("checked", true);
}

function HABILITAR_CONTROLES() {
    $('#txtclave').textbox({ readonly: false });
    $('#txtdescripcion').textbox({ readonly: false });
    $('#chkactivo').attr("disabled", false);
}

function DESHABILITAR_CONTROLES() {
    $('#txtclave').textbox({ readonly: true });
    $('#txtdescripcion').textbox({ readonly: true });
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
    document.getElementById('chkactivo').checked = true;
}

function REGRESAR_PERFIL() {
    $('#dmenu').show();
    $('#dcaptura').hide();
    document.getElementById('lblsubtitulo').innerHTML = "";
    $('#btnModificar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');    
    CARGAR_GRID('#dglista', 70, 50, "");
}

function MODIFICAR_PERFIL(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {
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
        $('#txtprocedimiento').textbox('setValue', filas.procedimiento);
        if (filas.activo == "Si") { $('#chkactivo').attr("checked", true); }
        else { $('#chkactivo').attr("checked", false); }
    }
}

function ELIMINAR_PERFIL(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {
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
    else { CARGAR_GRID('#dglista', 70, 50, ""); }
    FOCUS('#txtvalor', "#dglista");
}

function DISEÑO_PERFIL(btn)
{
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {
        IR_PAGINA("Diseñador_Perfil_Excel.aspx", "Id=" + sessionStorage.getItem('clave')+"&perfil="+sessionStorage.getItem('descripcionperfil'));
    }
}

function GUARDAR_PERFIL() {
    var valores = "", activo = "", clave = "";
    if ($('#chkactivo').is(":checked") == true) { activo = "1"; } else { activo = "0"; }
    if (tipomov == "Guardar") { clave = "0"; }
    else { clave = $('#txtclave').textbox('getValue') }

    valores = 'descripcion:' + $('#txtdescripcion').textbox('getValue') + '|Procedimiento:' + $('#txtprocedimiento').textbox('getValue') + '|estatus:' + activo;

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

