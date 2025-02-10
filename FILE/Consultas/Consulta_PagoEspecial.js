var tipo = "";
var quincena = "";
$(document).ready(function () {
    
    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dgplaza', '');
        CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
        windows("#winemp", 870, 625, "Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });
    CARGAR_INDICADORES("#dgp", "", 50);
    CARGAR_INDICADORES("#dgd", "", 50);
    CARGAR_INDICADORES("#dga", "", 50);
    CARGAR_INDICADORES("#dgt", "", 40);

    CARGAR_QUINCENAS("#cboquin");

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });
    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $("#cboquin").combobox({
        onSelect: function (rec) {
            if (rec.valor == "x") { quincena = ""; }
            else { quincena = rec.valor; }           
        },
    });
});

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

function LISTAR_NOMINA(plaza) {
    var parametros = {};
    parametros.plaza = plaza;
    parametros.quincena = quincena;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Buscar_PagoEspecial',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                var obj = $.parseJSON(data.d[0]);
                if (obj.length > 0) {
                    $('#txtplaza').textbox('setValue', obj[0].numplame);
                    $('#txtempleado').textbox('setValue', obj[0].numempme);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);
                    $('#txtpagaduria').textbox('setValue', obj[0].cvepagme + "-" + obj[0].despag);
                    $('#txtpuesto').textbox('setValue', obj[0].cvepuepl + "-" + obj[0].despue);

                    $('#txtestatus').textbox('setValue', obj[0].cveesppl);
                    $('#txthrplaza').textbox('setValue', obj[0].hrspla);
                    //$('#txtquinquenio').textbox('setValue', obj[0].quinque);
                    $('#txtnivsal').textbox('setValue', obj[0].cvenivpl);
                    $('#txttipopue').textbox('setValue', obj[0].cvpuespu);
                    $('#txtnivant').textbox('setValue', obj[0].cvenivpl);
                    $('#txttippago').textbox('setValue', obj[0].pagplaor);
                    $('#txtbanco').textbox('setValue', obj[0].cvebanme + "-" + obj[0].desbanme);
                    $('#txtcheque').textbox('setValue', obj[0].no_cheque);
                    //$('#txtcuenta').textbox('setValue', obj[0].cuepagor);
                    //$('#txttipocta').textbox('setValue', obj[0].tipcueor);
                    //$('#txtsucursal').textbox('setValue', obj[0].sucurpl);
                    //$('#txtctaclabe').textbox('setValue', obj[0].ctacbepl);
                    //$('#txtdiaspago').textbox('setValue', obj[0]);
                    //$('#txtdiasretro').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtrecibo').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtcheque').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtbasegrab').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtnss').textbox('setValue', obj[0].cvepuepl);
                    $('#txtgpojer').textbox('setValue', obj[0].cvejerpu);
                    //$('#txtestatuspag').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtperpag').textbox('setValue', obj[0].cvepuepl);
                    //$('#txtperret').textbox('setValue', obj[0].cvepuepl);
                }
                var objP = $.parseJSON(data.d[1]);
                if (objP.length > 0) {
                    CARGAR_INDICADORES("#dgp", objP, 50);
                }
                var objD = $.parseJSON(data.d[2]);
                if (objD.length > 0) {
                    CARGAR_INDICADORES("#dgd", objD, 50);
                }
                var objA = $.parseJSON(data.d[3]);
                if (objA.length > 0) {
                    CARGAR_INDICADORES("#dga", objA, 50);
                }
                var objT = $.parseJSON(data.d[4]);
                if (objT.length > 0) {
                    CARGAR_INDICADORES("#dgt", objT, 40);
                }
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

function CARGAR_INDICADORES(dgcontrol,objdato, anchodg, altodg) {    
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: anchodg + "%",
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

function CARGAR_DATOS(dgcontrol, condicion) {
    $(dgcontrol).datagrid({
        url: "Listar_PagosEspeciales.aspx?busqueda=" + condicion + "&quin=" + quincena,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "100%",
        heigth:"100%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {               
                rows = $(dgcontrol).datagrid('getSelected');
               // sessionStorage.setItem('plaza', rows.numplame);
                LISTAR_NOMINA(rows.numplame);
                $("#winemp").window('close');                    
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

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";    
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_DATOS('#dgplaza',  condicion);

}

function LIMPIAR_DATOS()
{
    $("#cboquin").combobox('setValue','x');
    $('#txtplaza').textbox('setValue', '');
    $('#txtempleado').textbox('setValue', '');
    $('#txtrfc').textbox('setValue', '');
    $('#txtcurp').textbox('setValue', '');
    $('#txtnombre').textbox('setValue', '');
    //$('#txtadscripcion').textbox('setValue', '');
    $('#txtpagaduria').textbox('setValue', '');
    //$('#txtestprog').textbox('setValue', '');
    $('#txtpuesto').textbox('setValue', '');

    $('#txtestatus').textbox('setValue', '');
    $('#txthrplaza').textbox('setValue', '');
    //$('#txtquinquenio').textbox('setValue', '');
    $('#txtnivsal').textbox('setValue', '');
    $('#txttipopue').textbox('setValue', '');
    $('#txtnivant').textbox('setValue', '');
    $('#txttippago').textbox('setValue', '');
    $('#txtbanco').textbox('setValue', '');
    //$('#txtcuenta').textbox('setValue', '');
    //$('#txttipocta').textbox('setValue', '');
    //$('#txtsucursal').textbox('setValue', '');
    //$('#txtctaclabe').textbox('setValue', '');
    //$('#txtdiaspago').textbox('setValue', '');
    //$('#txtdiasretro').textbox('setValue', '');
    //$('#txtrecibo').textbox('setValue', '');
    //$('#txtcheque').textbox('setValue', '');
    //$('#txtbasegrab').textbox('setValue', '');
    //$('#txtnss').textbox('setValue', '');
    $('#txtgpojer').textbox('setValue', '');
    //$('#txtestatuspag').textbox('setValue', '');
    //$('#txtperpag').textbox('setValue', '');
    //$('#txtperret').textbox('setValue', '');

    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dga').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgt').datagrid('loadData', { "total": 0, "rows": [] });

}