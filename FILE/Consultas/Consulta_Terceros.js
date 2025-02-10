var tabla = "ConTerceros";
$(document).ready(function () {
    //tabla = $_GET('tabla');
    //if (tabla != undefined) { tabla = tabla; }
    //else { tabla = 'ConTerceros'; }//'ConCapTR'

    $('#txtval').textbox('setValue', '');
    $('#txtval').textbox('clear').textbox('textbox').focus();
    sessionStorage.setItem('condicion', "");

    DISEÑO_DOC('#dglista');

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_DOC("#dglista", "#cbocam", "#cbocon", "#txtval");
        }
    });
    $('#btnbuscar').bind('click', function () { FILTRO_DOC("#dglista", "#cbocam", "#cbocon", "#txtval"); });
    $('#btnLimpiarLista').bind('click', function () { LIMPIAR_LISTA(); });
});


function DISEÑO_DOC(dgcontrol) {
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

                CARGAR_DOC("#dglista", ancho, alto);
                CARGAR_CAMPOSBUSQUEDA('#dglista', '#cbocam');
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
function CARGAR_DOC(dgcontrol, ancho, alto) {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Documentos.aspx?tabla=' + tabla + '&busqueda=' + con,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        //width: ancho + "%",
        heigth: alto + "%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            //var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            //rows = $(dgcontrol).datagrid('getSelected');
            //if (rows) {
            //    sessionStorage.setItem('cvedoc', rows[fields[0]]);
            //    sessionStorage.setItem('cvemov', rows[fields[1]]);
            //    EDITAR_DOCUMENTO();
            //}
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
function FILTRO_DOC(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            sessionStorage.setItem('condicion', condicion);
        }
        else { sessionStorage.setItem('condicion', ""); }
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_DOC(dgcontrol, ancho, alto);
}


function LIMPIAR_LISTA() {
    $('#txtval').textbox('clear').textbox('textbox').focus();
    $('#cbocon').combobox('setValue', '=');
    sessionStorage.setItem('condicion', '');
    CARGAR_DOC("#dglista", ancho, alto);
    CARGAR_CAMPOSBUSQUEDA('#dglista', '#cbocam');
}