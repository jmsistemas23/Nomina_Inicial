$(document).ready(function () {  
    document.getElementById('lblPerfil').innerHTML = 'Campos Disponibles Para Captura/Carga';

    CARGAR_CAMPOS('#dglista',60,50,'');
    CARGAR_CAMPOSBUSQUEDA('#dglista', '#cbocam');
    $('#txtval').textbox('clear').textbox('textbox').focus();

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_CAMPOS($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });
    $('#btnBuscar').bind('click', function () { FILTRO_PERFIL_TERCERO($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_CAMPOS(); });
    $('#btnModificar').bind('click', function () { MODIFICAR_CAMPOS('#btnModificar'); });
    $('#btnRegresar').bind('click', function () { REGRESAR_CAPTURA(); });
    $('#btnNuevo').bind('click', function () { NUEVO_CAMPO(); });
    $('#btnGuardar').bind('click', function () { GUARDAR_CAMPOS(); });
    $('#btnLimpiarCap').bind('click', function () { LIMPIAR_CAPTURA(); });
});


function CARGAR_CAMPOS(dgcontrol, ancho, alto,condicion) {
    $(dgcontrol).datagrid({
        url: "Listar_Campos.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                $('#btnModificar').linkbutton('enable');                           
            }
        }
    });
}

function FILTRO_CAMPOS(cbocampo, cbcondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    else { condicion = ""; }
    CARGAR_CAMPOS('#dglista', 60, 50, condicion);
}

function LIMPIAR_CAMPOS() {
    $('#btnModificar').linkbutton('disable');  
    $('#dglista').datagrid('unselectRow');
  
    CARGAR_CAMPOS('#dglista', 60, 500, '');
    CARGAR_CAMPOSBUSQUEDA('#dglista', '#cbocam');
    FOCUS('#txtval', "#dglista");
    $('#cbocon').combobox("setValue", "=");
}

function LIMPIAR_CAPTURA()
{
    $('#txtclave').textbox('setValue', '0');
    $('#txtcampo').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#txttipo').textbox('setValue', '');
    $('#txttamaño').textbox('setValue', '');
    $('#txtcampo').textbox({ readonly: false });
    $('#txtclave').textbox({ readonly: true });
    $('#txtcampo').focus();
}

function REGRESAR_CAPTURA()
{
    $('#dmenu').show();
    $('#dcaptura').hide();
    LIMPIAR_CAMPOS();
}

function MODIFICAR_CAMPOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        document.getElementById('lblmov').innerHTML = "Modificar";
        document.getElementById('lblnivel').innerHTML = "Campo: " + $('#dglista').datagrid('getSelected').cvecamtr + " - " + $('#dglista').datagrid('getSelected').nomcamtr;
        $('#dmenu').hide();
        $('#dcaptura').show();

        $('#txtclave').textbox('setValue', $('#dglista').datagrid('getSelected').cvecamtr);
        $('#txtcampo').textbox('setValue', $('#dglista').datagrid('getSelected').nomcamtr);
        $('#txtdescripcion').textbox('setValue', $('#dglista').datagrid('getSelected').descamtr);
        $('#txttipo').textbox('setValue', $('#dglista').datagrid('getSelected').tipcamtr);
        $('#txttamaño').textbox('setValue', $('#dglista').datagrid('getSelected').camsizetr);
        $('#txtcampo').textbox({ readonly: true });
        $('#txtclave').textbox({ readonly: true });
        $('#txtdescripcion').focus()
    }
}

function NUEVO_CAMPO()
{
    document.getElementById('lblmov').innerHTML = "Nuevo";
    $('#dmenu').hide();
    $('#dcaptura').show();

    $('#txtclave').textbox('setValue', '0');
    $('#txtcampo').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#txttipo').textbox('setValue', '');
    $('#txttamaño').textbox('setValue', '');
    $('#txtcampo').textbox({ readonly: false });
    $('#txtclave').textbox({ readonly: true });
    $('#txtcampo').focus();
}

function GUARDAR_CAMPOS() {
    if ($('#txtcampo').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere nombre de campo', 'warning');
        $('#txtcampo').focus();
    } else if ($('#txtdescripcion').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere descripcion de campo', 'warning');
        $('#txtdescripcion').focus();
    } else if ($('#txtTipoDato').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere tipo de dato del campo para captura', 'warning');
        $('#txtTipoDato').focus();
    } else if ($('#txttamaño').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere tamaño del valor a capturar', 'warning');
        $('#txttamaño').focus();
    } else {
        var qry = $('#txtclave').textbox('getValue') + '|' + $('#txtcampo').textbox('getValue') + '|' + $('#txtdescripcion').textbox('getValue') + '|' + $('#txtTipoDato').textbox('getValue') + '|' + $('#txttamaño').textbox('getValue');
        var parametros = {};
        parametros.valores = qry;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/GuardarCampos",
            data: JSON.stringify(parametros),
            dataType: "json",          
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d == "0") {
                    $('#dmenu').show();
                    $('#dcaptura').hide();
                    CARGAR_CAMPOS('#dglista', 60, 50, '');                   
                }
                else { $.messager.alert('Error', 'Error al guardar el campo', 'error'); }
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
