var condicion = "";
$(document).ready(function () {
    CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70);
    CARGAR_CAMPOSBUSQUEDAS('#dgProc', '#cbcampos', 'Procedimiento');
    FOCUS('#txtvalor', "#dgProc");

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_PROCEDIMIENTOS("#dgPerfiles", "#cbcampos", "#cbcondicion", "#txtvalor");
        }
    });
    $('#btnbuscar').bind('click', function () { FILTRO_PERFIL("#dgPerfiles", "#cbcampos", "#cbcondicion", "#txtvalor"); });

    $('#btnNuevo').bind('click', function () { NUEVO_PROCEDIMIENTO('#btnNuevo'); });
    $('#btnRegresar').bind('click', function () { REFRESAR_PROCEDIMIENTO(); });
    $('#btnlimpiar').bind('click', function () { LIMPIAR_PROCEDIMIENTO('#btnlimpiar'); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_PROCEDIMIENTO('#btnEliminar'); });
    $('#btnEditar').bind('click', function () { EDITAR_PROCEDIMIENTO('#btnEditar'); });

    $('#btnLimpiarCaptura').bind('click', function () { LIMPIAR_CAPTURA(); });
    $('#btnGuardar').bind('click', function () { GUARDAR_PROCEDIMIENTO(); });
});

function CARGAR_PROCEDIMIENTOS(dgcontrol, ancho, alto) {
    var con;
    if (condicion == null) { con = ""; } else { con = condicion; };
    $(dgcontrol).datagrid({
        url: 'Listar_CatalogoProcedimientos.aspx?busqueda=' + con,
        pagination: true,        
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        //width: ancho + "%",
        //heigth: alto + "%",
        onClickRow: function () {          
            $('#btnEditar').linkbutton('enable');
            $('#btnEliminar').linkbutton('enable');
            document.getElementById('lblnivel').innerHTML = "Perfil: " + $('#dgProc').datagrid('getSelected').Id + " - " + $('#dgProc').datagrid('getSelected').Descripcion
        }
    });
}

function FILTRO_PROCEDIMIENTOS(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }           
        }
        else { condicion = ""; }
    }
    else { condicion=""; }
    CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70);
}

function NUEVO_PROCEDIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide(); 
        $('#dcaptura').show();
        document.getElementById('lblnivel').innerHTML = "";
        document.getElementById('lblsubtitulo').innerHTML = "Agregar";
        $('#btnLimpiarCaptura').show();
        $('#btnGuardar').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
        $('#txtClave').textbox('setValue', '');
        $('#txtClave').textbox({ readonly: false });
        $('#txtProcedimiento').textbox('setValue', '');
        $('#txtProcedimiento').textbox({ readonly: false });
        $('#txtDescripcion').textbox('setValue', '');
        $('#txtDescripcion').textbox({ readonly: false });
        document.getElementById('chkProyecciones').checked = true;
        document.getElementById('chkActivo').checked = false;
        $('#chkActivo').attr("disabled", false);
        $('#btnLimpiarCaptura').show();
    }
}

function REFRESAR_PROCEDIMIENTO() {
    document.getElementById('lblsubtitulo').innerHTML = "";
    $('#dmenu').show();
    $('#dcaptura').hide();

    var bandera = DESMARCAR_FILA_GRID('#dgProc');
    if (bandera == false)
    { CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70); }
    FOCUS('#txtvalor', "#dgProc");
    $('#cbcondicion').combobox("setValue", "=");
    $('#txtClave').textbox('setValue', '');
    $('#txtProcedimiento').textbox('setValue', '');
    $('#txtDescripcion').textbox('setValue', '');
    document.getElementById('chkProyecciones').checked = true;
    document.getElementById('chkActivo').checked = false;
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
}

function LIMPIAR_PROCEDIMIENTO() {    
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    condicion = "";
    CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70);
    FOCUS('#txtvalor', "#dgProc");
    $('#cbcondicion').combobox("setValue", "=");
    $('#cbcampos').combobox("setValue", "Procedimiento");
}

function ELIMINAR_PROCEDIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows;
        try { rows = $('#dgProc').datagrid('getSelected'); }
        catch (err) { rows = null; }
        if (rows) {
            if (rows.EnUso == 'Si') {
                $.messager.alert('Error', 'Procedimiento actualmente en uso, elimine relaciones para continuar', 'error');
            }
            else {
                var parametros = {};
                parametros.clave = rows.Id;
                $.ajax({
                    type: "POST",
                    url: "Funciones.aspx/EliminarProcedimiento",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70);
                            $.messager.alert('Información', data.d[1], 'info');
                        }
                        else { $.messager.alert('Error', data.d[1], 'error'); }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); }
                });
            }

        }
        else {
            $.messager.alert('Error', 'Seleccione procedimiento a eliminar', 'error');
        }
    }
}

function EDITAR_PROCEDIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        document.getElementById('lblsubtitulo').innerHTML = "Modificar";
        $('#btnGuardar').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
        $('#dmenu').hide();
        $('#dcaptura').show();
        $('#btnLimpiarCaptura').show();
        var rows;
        try { rows = $('#dgProc').datagrid('getSelected'); }
        catch (err) { rows = null; }
        if (rows) {
            $('#txtClave').textbox('setValue', rows.Id);
            $('#txtClave').textbox({ readonly: false });
            $('#txtProcedimiento').textbox('setValue', rows.Procedimiento);
            $('#txtProcedimiento').textbox({ readonly: false });
            $('#txtDescripcion').textbox('setValue', rows.Descripcion);
            $('#txtDescripcion').textbox({ readonly: false });       
            document.getElementById('chkProyecciones').checked = (rows.Proyeccion == 'Si');
            document.getElementById('chkActivo').checked = (rows.Activo == 'Si');
            $('#chkActivo').attr("disabled", false);
        }
    }
}

function LIMPIAR_CAPTURA() {
    $('#txtClave').textbox('setValue', '');   
    $('#txtProcedimiento').textbox('setValue','');    
    $('#txtDescripcion').textbox('setValue', '');
    document.getElementById('chkProyecciones').checked = true;
    document.getElementById('chkActivo').checked = false;
}

function GUARDAR_PROCEDIMIENTO() {
    if ($('#txtProcedimiento').val().trim().length <= 0) {
        $.messager.alert('Error', 'Se requiere el nombre del procedimiento', 'error'); return 0;
    }
    else
        if ($('#txtDescripcion').val().trim().length <= 0) {
            $.messager.alert('Error', 'Se requiere la descripción del procedimiento', 'error'); return 0;
        }
        else
        {
            var activo = ((document.getElementById("chkActivo").checked) ? '1' : '0');
            var proyeccion = ((document.getElementById("chkProyecciones").checked) ? '1' : '0');
            var qry = $('#txtClave').val() + '|' + $('#txtProcedimiento').val() + '|' + $('#txtDescripcion').val() + '|' + activo + '|' + proyeccion;
            var parametros = {};
            parametros.valores = qry;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/GuardarProcedimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    document.getElementById('lblsubtitulo').innerHTML = "";
                    $('#dmenu').show();
                    $('#dcaptura').hide();
                    CARGAR_PROCEDIMIENTOS('#dgProc', 75, 70);
                    $('#cbcondicion').combobox("setValue", "=");
                    $('#txtClave').textbox('setValue', '');
                    $('#txtProcedimiento').textbox('setValue', '');
                    $('#txtDescripcion').textbox('setValue', '');                    
                    $('#btnEditar').linkbutton('disable');
                    $('#btnEliminar').linkbutton('disable');
                    FOCUS('#txtvalor', "#dgProc");
                }
                else { $.messager.alert('Error',  data.d[1], 'error'); }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
}





