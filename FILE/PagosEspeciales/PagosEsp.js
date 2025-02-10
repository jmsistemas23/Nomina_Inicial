var boton = "";
$(document).ready(function () {
    $('#btnNuevaCap').bind('click', function () { NUEVA_CAPTURA('#btnNuevaCap'); });
    $('#btnEliModCap').bind('click', function () { MODELI_CAPTURA('#btnEliModCap'); });

    $('#dgp').datagrid({
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
    });
    $('#dgp').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    //Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'ME';
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == 'C') {
                $('#lblbloqueada').hide();
                $('#btnNuevaCap').linkbutton({ disabled: false });
                $('#btnEliModCap').linkbutton({ disabled: false });                
            }
            else {
                $('#lblbloqueada').show();
                $('#btnNuevaCap').linkbutton({ disabled: true });
                $('#btnEliModCap').linkbutton({ disabled: true });               
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


function DDLLISTACAMPOS(objddl, tabla, condicion) {
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strcondicion = condicion;

    $.ajax({
        type: "POST",
        url: 'funciones.aspx/LlenarDropList',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'campo',
                textField: 'descripcion'
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function NUEVA_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        tipomov = "G";
        boton = 'Nuevo';

        DDLLISTACAMPOS('#cbotipopago', 'tippago', '');
        DDLLISTACAMPOS('#cbobancos', 'bancos', '');

        $('#dmenu').hide();
        //$('#dmodeli').hide();
        $('#dcaptura').show();

    }
}
