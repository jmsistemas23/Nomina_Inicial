$(document).ready(function () {  
    CARGAR_GRID('#dg', 40, 50, "");
    CARGAR_CAMPOSBUSQUEDA('#dg', '#cbcampos');

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); }
        }
    });
    $('#btnbuscar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnNuevo').bind('click', function () { NUEVO_PERFIL(); });
    $('#btnRegresar').bind('click', function () { REGRESAR_PERFIL(); });
    $('#btnModificar').bind('click', function () { MODIFICAR_PERFIL(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_PERFIL(); });
    $('#btnGuardar').bind('click', function () { GUARDAR_PERFIL(); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_PERFIL(); });
   // $('#btnDiseño').bind('click', function () { DISEÑO_PERFIL('#btnDiseño'); });
});

function CARGAR_GRID(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Formatos.aspx?&busqueda=' + condicion,
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
               // $('#btnDiseño').linkbutton('enable');
            }
        }
    });
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
    CARGAR_GRID('#dg', 40, 50, condicion);
}

function NUEVO_PERFIL() {
    tipomov = "Guardar";
    $('#btnLimpiarcap').show();
    $('#dmenu').hide();
    $('#dcaptura').show();
    $('#btnGuardar').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
    HABILITAR_CONTROLES();
    document.getElementById('lblsubtitulo').innerHTML = "Agregar";
    $('#txtclave').textbox({ readonly: true });
    LIMPIAR();
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

function LIMPIAR() {
    $('#txtclave').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#chkactivo').attr("checked", false);
}

function REGRESAR_PERFIL()
{
    $('#dmenu').show();
    $('#dcaptura').hide();
    document.getElementById('lblsubtitulo').innerHTML = "";
    $('#btnModificar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
   // $('#btnDiseño').linkbutton('disable');
    if (sessionStorage.getItem('index') != null)
    { $('#dg').datagrid('unselectRow', sessionStorage.getItem('index')); }    
}

function MODIFICAR_PERFIL()
{
    tipomov = "Modificar";
    $('#btnLimpiarcap').hide();
    $('#btnGuardar').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
    $('#dmenu').hide();
    $('#dcaptura').show();
    document.getElementById('lblsubtitulo').innerHTML = "Modificar";    
    HABILITAR_CONTROLES();
    $('#txtclave').textbox({ readonly: true });
   
    var filas = $('#dg').datagrid('getSelected');

    $('#txtclave').textbox('setValue', filas.id);
    $('#txtdescripcion').textbox('setValue', filas.nombre);
    if (filas.visible == "1") { $('#chkactivo').attr("checked", true); }
    else { $('#chkactivo').attr("checked", false); }
}

function ELIMINAR_PERFIL()
{
    tipomov = "Eliminar";
    $('#btnGuardar').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' });
    $('#btnLimpiarcap').hide();
    $('#dmenu').hide();
    $('#dcaptura').show();
    document.getElementById('lblsubtitulo').innerHTML = "Eliminar";    
    DESHABILITAR_CONTROLES();    
    var filas = $('#dg').datagrid('getSelected');
    $('#txtclave').textbox('setValue', filas.id);
    $('#txtdescripcion').textbox('setValue', filas.nombre);
    if (filas.visible == "1") { $('#chkactivo').attr("checked", true); }
    else { $('#chkactivo').attr("checked", false); }
}

function LIMPIAR_PERFIL() {
    $('#btnModificar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    //$('#btnDiseño').linkbutton('disable');    
    if (sessionStorage.getItem('index') != null)
    { $('#dglista').datagrid('unselectRow', sessionStorage.getItem('index')); }
    else { CARGAR_GRID('#dg', 40, 50, ""); }
    FOCUS('#txtvalor', "#dg");
}

function GUARDAR_PERFIL()
{
    var valores = "",activo="",clave="";
    if ($('#chkactivo').is(":checked") == true) { activo = "1"; } else { activo = "0"; }
    if (tipomov == "Guardar") { clave = "0"; }
    else { clave = $('#txtclave').textbox('getValue') }

    valores = 'nombre:' + $('#txtdescripcion').textbox('getValue') + '|visible:' + activo;
   
    var parametros = {};
    parametros.strmov=tipomov
    parametros.strvalores = valores;
    parametros.strcondicion = sessionStorage.getItem('condicion');
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Formato",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
                REGRESAR_PERFIL();
                CARGAR_GRID('#dg', 40, 50, "");
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

function DISEÑO_PERFIL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        document.location = "Diseñador_FiltroFormatos.aspx?id=" + sessionStorage.getItem('clave') + "&nombre=" + sessionStorage.getItem('descripcionperfil');
    }
}
