var tabla = "";
var ancho = "";
var alto = "";
$(document).ready(function () {   
     tabla = 'OrdenTerceros'; 

    $(function () {
        $('#btnNuevo').bind('click', function () { NUEVA_CAPTURA('#btnNuevo'); });
        $('#btnLimpiar').bind('click', function () { LIMPIAR_GRID(); });
        $('#btnfiltrar').bind('click', function () { FILTRO_GRID($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });        
    });
    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_GRID($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });

    $('#btnSubirOrden').bind('click', function () {
        if ($('#dg').datagrid('getSelected') == null) {
            $.messager.alert('Información', 'Seleccione concepto de perfil', 'info');
        } else { ordenaProcedimientoPerfil('-'); }
    });

    $('#btnBajarOrden').bind('click', function () {
        if ($('#dg').datagrid('getSelected') == null) {
            $.messager.alert('Información', 'Seleccione concepto de perfil', 'info');
        } else { ordenaProcedimientoPerfil('+'); }
    });

    DISEÑO_GRID('#dg');   
    $('#txtval').textbox('clear').textbox('textbox').focus();
});

function DISEÑO_GRID(dgcontrol) {
    var parametros = {};
    parametros.strtabla = tabla;

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConfiguracionGrid",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                if (data.d[1] != "")
                { ancho = data.d[1]; }
                else { ancho = 100; }

                if (data.d[2] != "")
                { alto = data.d[2]; }
                else { alto = 100; }

                CARGAR_GRID("#dg");                
                var campos = data.d[11].split(',');
                CAMPOS_BUSQUEDA_CONSULTA('#dg', '#cbocam', campos);
            }
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
function CARGAR_GRID(dgcontrol) {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?tabla=' + tabla + '&busqueda=' + con+"&multi=''",
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
                sessionStorage.setItem('clave', rows[fields[0]]);
                sessionStorage.setItem('descripcionperfil', rows[fields[1]]);
                $('#btnOrdenar').linkbutton('enable');
                $('#btnEditar').linkbutton('enable');

            }
        }
    });
}
function FILTRO_GRID(cbocampo, cbcondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
        sessionStorage.setItem('condicion', condicion);
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_GRID("#dg");
}


function LIMPIAR_GRID() {
    $("#dg").datagrid('unselectAll');
    $('#txtval').textbox('clear').textbox('textbox').focus();
    $('#cbocon').combobox('setValue', '=');
    $('#btnOrdenar').linkbutton('disable');
    $('#btnEditar').linkbutton('disable');
}

function ordenaProcedimientoPerfil(signo) {
    if (signo == '+') { signo = ''; }
    var parametros = {};
    parametros.clave = $('#dg').datagrid('getSelected').cveter;
    parametros.concepto = $('#dg').datagrid('getSelected').camdes;
    parametros.posiciones = signo + $('#txtmodOrden').val();
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/OrdenarConceptoPerfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == "0") {
                DISEÑO_GRID('#dg');
            }
            else { $.messager.alert('Error', 'Error al ordenar procedimiento del perfil', 'error'); }
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
