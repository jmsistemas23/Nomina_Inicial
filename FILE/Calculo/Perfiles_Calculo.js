var tipomov = "";
var condicion = "";
$(document).ready(function () {
    CARGAR_PERFILES('#dgPerfiles', 60, 70);
    CARGAR_CAMPOSBUSQUEDAS('#dgPerfiles', '#cbcampos', 'perfil');
    FOCUS('#txtvalor', "#dgPerfiles");

    $('#btnNuevoPerfil').bind('click', function () { NUEVO_PERFIL('#btnNuevoPerfil'); });
    $('#btnRegresarPerfil').bind('click', function () { REFRESAR_PERFIL(); });
    $('#btnRegresarLista').bind('click', function () { REFRESAR_LISTA(); });
    $('#btnlimpiar').bind('click', function () { LIMPIAR_PERFIL('#btnlimpiar'); });
    $('#btnEditar').bind('click', function () { EDITAR_PERFIL('#btnEditar'); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_PERFIL('#btnEliminar'); });
    $('#btnLimpiarCaptura').bind('click', function () { LIMPIAR_CAPTURA(); });
    $('#btnGuardarPerfil').bind('click', function () { GUARDAR_PERFIL(); });
    $('#btnProcedimientos').bind('click', function () { LISTAR_PROCEDIMIENTOS('#btnProcedimientos'); });

    $('#btnSubirOrden').bind('click', function () { ORDENAR_PROCEDIMIENTOS('-'); });
    $('#btnBajarOrden').bind('click', function () { ORDENAR_PROCEDIMIENTOS('+'); });

    $('#btnDesactivaProcedimiento').bind('click', function () {ESTATUS_PROCEDIMIENTO('#btnDesactivaProcedimiento'); });

    $('#btnEliminarProcedimiento').bind('click', function () { ELIMINAR_PROCEDIMIENTO_PERFIL('#btnEliminarProcedimiento'); });

    $('#btnAgregarProcedimiento').bind('click', function () { LISTAR_PROCEDIMIENTOS_DISPONIBLES(); });

    $('#btnAceptarProcedimientos').bind('click', function () { GUARDAR_PROCEDIMIENTOS_PERFIL(); });

    $('#btnCancelarProcedimientos').bind('click', function () { $("#modalProcedimientos").window('close'); });
    
    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_PERFIL("#dgPerfiles", "#cbcampos", "#cbcondicion", "#txtvalor");
        }
    });
    $('#btnbuscar').bind('click', function () { FILTRO_PERFIL("#dgPerfiles", "#cbcampos", "#cbcondicion", "#txtvalor"); });


});

function CARGAR_PERFILES(dgcontrol,ancho, alto) {
    var con;
    if (condicion == null) { con = ""; } else { con = condicion; };
    $(dgcontrol).datagrid({
        url: 'Listar_Perfiles.aspx?busqueda=' + con,
        pagination: true,        
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            $('#btnProcedimientos').linkbutton('enable');
            $('#btnEditar').linkbutton('enable');
            $('#btnEliminar').linkbutton('enable');
            document.getElementById('lblnivel').innerHTML = "Perfil: "+ $('#dgPerfiles').datagrid('getSelected').id + " - " + $('#dgPerfiles').datagrid('getSelected').perfil
        }
    });
}

function NUEVO_PERFIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        tipomov = 'Nuevo';
        $('#dmenu').hide();
        $('#dcaptura').show();
        document.getElementById('lblsubtitulo').innerHTML = "Agregar";
        $('#btnLimpiarCaptura').show();
        $('#btnGuardarPerfil').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });       
        document.getElementById('chkActivo').checked = false; 
        $('#chkActivo').attr("disabled", false);
    }
}

function REFRESAR_PERFIL()
{  
        document.getElementById('lblsubtitulo').innerHTML = "";
        $('#dmenu').show();
        $('#dcaptura').hide();

        var bandera = DESMARCAR_FILA_GRID('#dgPerfiles');
        if (bandera == false)
        { CARGAR_PERFILES('#dgPerfiles', 60, 70); }
        FOCUS('#txtvalor', "#dgPerfiles");
        $('#cbcondicion').combobox("setValue", "=");
        $('#txtClave').textbox('setValue', '');
        $('#txtNombre').textbox('setValue', '');
        document.getElementById('chkActivo').checked = false;
        $('#btnProcedimientos').linkbutton('disable');
        $('#btnEditar').linkbutton('disable');
        $('#btnEliminar').linkbutton('disable');  
}

function REFRESAR_LISTA() {
   
    $('#dmenu').show();    
    $('#dlista').hide();

    var bandera = DESMARCAR_FILA_GRID('#dgPerfiles');
    if (bandera == false)
    { CARGAR_PERFILES('#dgPerfiles', 60, 70); }
    FOCUS('#txtvalor', "#dgPerfiles");
    $('#cbcondicion').combobox("setValue", "=");
    $('#txtClave').textbox('setValue', '');
    $('#txtNombre').textbox('setValue', '');
    document.getElementById('chkActivo').checked = false;
    $('#btnProcedimientos').linkbutton('disable');
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
}

function LIMPIAR_PERFIL()
{
    $('#btnProcedimientos').linkbutton('disable');
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');       
    condicion = "";
    CARGAR_PERFILES('#dgPerfiles', 60, 70);    
    FOCUS('#txtvalor', "#dgPerfiles");
    $('#cbcondicion').combobox("setValue", "like");
    $('#cbcampos').combobox('setValue','perfil');    
}

function EDITAR_PERFIL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        document.getElementById('lblsubtitulo').innerHTML = "Modificar";
        $('#btnGuardarPerfil').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
        tipomov = 'Modificar';
        $('#dmenu').hide();
        $('#dcaptura').show();
        $('#btnLimpiarCaptura').show();
        var rows;
        try { rows = $('#dgPerfiles').datagrid('getSelected'); }
        catch (err) { rows = null; }
        if (rows) {            
            $('#txtClave').textbox('setValue', rows.id);
            $('#txtClave').textbox({ readonly: false });
            $('#txtNombre').textbox('setValue', rows.perfil);
            $('#txtNombre').textbox({ readonly: false });
            if (rows.activo == 'Si')
            { document.getElementById('chkActivo').checked = true; }
            else { document.getElementById('chkActivo').checked = false; }
            $('#chkActivo').attr("disabled", false);
        }
    }
}

function ELIMINAR_PERFIL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
        $('#btnGuardarPerfil').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' })
        tipomov = 'Eliminar';
        document.getElementById('lblsubtitulo').innerHTML = "Eliminar";
        $('#dmenu').hide();
        $('#dcaptura').show();

        var rows;
        try { rows = $('#dgPerfiles').datagrid('getSelected'); }
        catch (err) { rows = null; }
        if (rows) {
            $('#txtClave').textbox('setValue', rows.id);
            $('#txtClave').textbox({ readonly: true });
            $('#txtNombre').textbox('setValue', rows.perfil);
            $('#txtNombre').textbox({ readonly: true });
            if (rows.activo == 'Si')
            { document.getElementById('chkActivo').checked = true; }
            else { document.getElementById('chkActivo').checked = false; }
            $('#chkActivo').attr("disabled", true);
            $('#btnLimpiarCaptura').hide();
        }
    }
}

function LIMPIAR_CAPTURA()
{
    $('#txtClave').textbox('setValue', '');
    $('#txtNombre').textbox('setValue', '');
    document.getElementById('chkActivo').checked = false;
}

function GUARDAR_PERFIL() {    
    if ($('#txtNombre').val().trim().length <= 0) {        
        $.messager.alert('Error', 'Se requiere nombre de perfil', 'error'); return 0;
    } else {
        var qry = $('#txtClave').val() + '|' + $('#txtNombre').val() + '|' + ((document.getElementById("chkActivo").checked) ? '1' : '0');

        var parametros = {};
        parametros.tipomov = tipomov;
        parametros.valores = qry;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/GuardarPerfil",
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
                    document.getElementById('lblsubtitulo').innerHTML = "";
                    $('#dmenu').show();
                    $('#dcaptura').hide();
                    CARGAR_PERFILES('#dgPerfiles', 50, 70);
                    FOCUS('#txtvalor', "#dgPerfiles");
                    $('#cbcondicion').combobox("setValue", "=");
                    $('#txtClave').textbox('setValue', '');
                    $('#txtNombre').textbox('setValue', '');
                    document.getElementById('chkActivo').checked = false;
                    $('#btnProcedimientos').linkbutton('disable');
                    $('#btnEditar').linkbutton('disable');
                    $('#btnEliminar').linkbutton('disable');
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

function LISTAR_PROCEDIMIENTOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide();
        $('#dlista').show();
        CARGAR_PROCEDIMIENTOS_ASIGNADOS();
    }
}

function CARGAR_PROCEDIMIENTOS_ASIGNADOS() {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $('#dgProcedimientosAsignados').datagrid({
        url: 'Listar_ProcedimientosAsignados.aspx?clave=' + $('#dgPerfiles').datagrid('getSelected').id + '&busqueda=' + con,
        rownumbers: true,
        singleSelect: true,
        striped: true,        
        //width: "95%",
        //heigth: "95%",
        onClickRow: function () {
            $('#btnEliminarProcedimiento').linkbutton('enable');
            $('#btnModificarOrden').linkbutton('enable');
            $('#btnDesactivaProcedimiento').linkbutton('enable');
            $('#btnSubirOrden').linkbutton('enable');
            $('#btnBajarOrden').linkbutton('enable');
            $('#txtmodOrden').textbox('enable');
        }
    });
}

function ORDENAR_PROCEDIMIENTOS(signo) {
    if (signo == '+') { signo = ''; }
    var parametros = {};
    parametros.clave = $('#dgPerfiles').datagrid('getSelected').id;
    parametros.procedimiento = $('#dgProcedimientosAsignados').datagrid('getSelected').fkProcedimiento;
    parametros.posiciones = signo + $('#txtmodOrden').val();
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/OrdenarProcedimientoPerfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == "0") {
                CARGAR_PROCEDIMIENTOS_ASIGNADOS();

                $('#btnEliminarProcedimiento').linkbutton('disable');
                $('#btnModificarOrden').linkbutton('disable');
                $('#btnDesactivaProcedimiento').linkbutton('disable');
                $('#btnSubirOrden').linkbutton('disable');
                $('#btnBajarOrden').linkbutton('disable');
                $('#txtmodOrden').textbox('disable');

            }
            else {$.messager.alert('Error', 'Error al ordenar procedimiento del perfil', 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function ESTATUS_PROCEDIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
     {
            var parametros = {};
            parametros.clave = $('#dgPerfiles').datagrid('getSelected').id;
            parametros.procedimiento = $('#dgProcedimientosAsignados').datagrid('getSelected').fkProcedimiento;
            $.ajax({
                type: "POST",
                url: "Funciones.aspx/ActivaDesactivaProcedimientoPerfil",
                data: JSON.stringify(parametros),
                dataType: "json",
                async: false,
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d == "0") {
                        CARGAR_PROCEDIMIENTOS_ASIGNADOS();

                        $('#btnEliminarProcedimiento').linkbutton('disable');
                        $('#btnModificarOrden').linkbutton('disable');
                        $('#btnDesactivaProcedimiento').linkbutton('disable');
                        $('#btnSubirOrden').linkbutton('disable');
                        $('#btnBajarOrden').linkbutton('disable');
                        $('#txtmodOrden').textbox('disable');
                    }
                    else { $.messager.alert('Error', 'Error al cambiar estatus de procedimiento del perfil', 'error'); }
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

function ELIMINAR_PROCEDIMIENTO_PERFIL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {             
            var parametros = {};
            parametros.clave = $('#dgPerfiles').datagrid('getSelected').id;
            parametros.procedimiento = $('#dgProcedimientosAsignados').datagrid('getSelected').fkProcedimiento;
            $.ajax({
                type: "POST",
                url: "Funciones.aspx/QuitarProcedimientoPerfil",
                data: JSON.stringify(parametros),
                dataType: "json",
                async: false,
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d == "0") {
                        CARGAR_PROCEDIMIENTOS_ASIGNADOS();

                        $('#btnEliminarProcedimiento').linkbutton('disable');
                        $('#btnModificarOrden').linkbutton('disable');
                        $('#btnDesactivaProcedimiento').linkbutton('disable');
                        $('#btnSubirOrden').linkbutton('disable');
                        $('#btnBajarOrden').linkbutton('disable');
                        $('#txtmodOrden').textbox('disable');
                    }
                    else { $.messager.alert('Error', 'Error al eliminar procedimiento del perfil', 'error'); }
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

function LISTAR_PROCEDIMIENTOS_DISPONIBLES() {    
    var procs = '';
    var rows = $('#dgProcedimientosAsignados').datagrid('getRows');
    for (i = 0; i < rows.length; i++) {
        if (procs.length <= 0) { procs += $('#dgProcedimientosAsignados').datagrid('getRows')[i].fkProcedimiento; }
        else { procs += '|' + $('#dgProcedimientosAsignados').datagrid('getRows')[i].fkProcedimiento; }
    }
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $('#dgAsignaProcedimientos').datagrid({
        url: 'Listar_ProcedimientosParaAsignar.aspx?clave=' + $('#dgPerfiles').datagrid('getSelected').id + '&procs=' + procs + '&busqueda=' + con,
        checkOnSelect: true,
        //checkOnSelect:true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        //width: "100%",
        //heigth: "50%"       
    });
    $('#dgAsignaProcedimientos').datagrid({       
        onLoadSuccess: function (data) {
            var rows = $('#dgAsignaProcedimientos').datagrid('getRows');
            for (i = 0; i < rows.length; i++) {
                if ($('#dgAsignaProcedimientos').datagrid('getRows')[i].seleccion == true)
                {$(this).datagrid('checkRow', i);}
            }           
        }
    });
    windows("#modalProcedimientos", 900, 630,false, 'Buscar Procedimientos');
}

function GUARDAR_PROCEDIMIENTOS_PERFIL() {
    var valores = '';
    var checkedItems = $('#dgAsignaProcedimientos').datagrid('getChecked');
    $.each(checkedItems, function (index, item) {
        if (valores.length <= 0) { valores += $('#dgPerfiles').datagrid('getSelected').id + ',' + item.fkprocedimiento + ',0,1'; }
        else { valores += '|' + $('#dgPerfiles').datagrid('getSelected').id + ',' + item.fkprocedimiento + ',0,1'; }
    });

    var parametros = {};
    parametros.clave = $('#dgPerfiles').datagrid('getSelected').id;
    parametros.valores = valores;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/GuardarProcedimientosPerfil",
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
                //$('#dcaptura').hide();
                //$('#dlista').hide();
                //$('#dmenu').show();

                CARGAR_PROCEDIMIENTOS_ASIGNADOS();

                $('#btnEliminarProcedimiento').linkbutton('disable');
                $('#btnModificarOrden').linkbutton('disable');
                $('#btnDesactivaProcedimiento').linkbutton('disable');
                $('#btnSubirOrden').linkbutton('disable');
                $('#btnBajarOrden').linkbutton('disable');
                $('#txtmodOrden').textbox('disable');
                
                $("#modalProcedimientos").window('close');

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

function FILTRO_PERFIL(dgcontrol, cbocampo, cbcondicion, txtvalor) {
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
    else { condicion = ""; }
    CARGAR_PERFILES('#dgPerfiles', 60, 70);
}

