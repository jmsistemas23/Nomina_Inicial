var quincena = "";
$(document).ready(function () {
    quincena = $_GET('quin');
    if (quincena != undefined) { quincena = quincena; }
    else { quincena = ''; }

    CARGAR_QUINCENAS("#cboquin");
  
   
    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dgplaza', 800, 215, '');
        CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
        windows("#winemp", 820, 630, "Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });
   
    //LISTAR_POLIZA();

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    //$('#cboquin').combobox({
    //    onSelect: function (rec) {
    //        if (rec) {
    //            $('#cboquin').combobox('setValue', rec.valor);
    //        }
    //        $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
    //        $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
    //        $('#dga').datagrid('loadData', { "total": 0, "rows": [] });
    //        $('#dgt').datagrid('loadData', { "total": 0, "rows": [] });
    //        quincena = rec.valor;
    //        LISTAR_POLIZA();            
    //    },
    //});

    $('#btnReporte').bind('click', function () {
        if ($('#btnReporte').linkbutton('options').disabled) { return false; }
        else
        {           
            IR_PAGINA("Reporte_Poliza.aspx", "quin=" + $('#cboquin').combobox('getValue'));
        }
    });
});

function LISTAR_POLIZA(quin) {
    var objT = "";
    var objP = "";
    var objD = "";
    var objA = "";
    //var quincena = $('#cboquin').combobox('getValue');
    //if (quincena == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }

    var parametros = {};    
    parametros.quincena = quin;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Poliza',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                $('#btnReporte').linkbutton({ disabled: false });                                                
                objP = $.parseJSON(data.d[0]);
                objD = $.parseJSON(data.d[1]);
                objA = $.parseJSON(data.d[2]);
                objT = $.parseJSON(data.d[3]);
            }
            else { $('#btnReporte').linkbutton({ disabled: true }); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            if (objP.length > 0) {
                CARGAR_INDICADORES("#dgp", objP, 70);
            }
            if (objD.length > 0) {
                CARGAR_INDICADORES("#dgd", objD, 70);
            }
            if (objA.length > 0) {
                CARGAR_INDICADORES("#dga", objA, 70);
            }
            if (objT.length > 0) {
                CARGAR_INDICADORES("#dgt", objT, 50);
            }

            $('#loading').hide(100);
        }
    });
}

function CARGAR_INDICADORES(dgcontrol,objdato, anchodg) {    
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

function CARGAR_DATOS(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: "Listar_Plazas.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "px",
        heigth: alto + "px",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {               
                rows = $(dgcontrol).datagrid('getSelected');
                LISTAR_NOMINA(rows.numplaza);
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
    CARGAR_DATOS('#dgplaza', 800, 215, condicion);
}

function LIMPIAR_DATOS()
{
    $('#txtplaza').textbox('setValue', '');
    $('#txtempleado').textbox('setValue', '');
    $('#txtrfc').textbox('setValue', '');
    $('#txtcurp').textbox('setValue', '');
    $('#txtnombre').textbox('setValue', '');
    $('#txtadscripcion').textbox('setValue', '');
    $('#txtpagaduria').textbox('setValue', '');
    $('#txtestprog').textbox('setValue', '');
    $('#txtpuesto').textbox('setValue', '');

    $('#txtestatus').textbox('setValue', '');
    $('#txthrplaza').textbox('setValue', '');
    $('#txtquinquenio').textbox('setValue', '');
    $('#txtnivsal').textbox('setValue', '');
    $('#txttipopue').textbox('setValue', '');
    $('#txtnivant').textbox('setValue', '');
    $('#txttippago').textbox('setValue', '');
    $('#txtbanco').textbox('setValue', '');
    $('#txtcuenta').textbox('setValue', '');
    $('#txttipocta').textbox('setValue', '');
    $('#txtsucursal').textbox('setValue', '');
    $('#txtctaclabe').textbox('setValue', '');
    $('#txtdiaspago').textbox('setValue', '');
    $('#txtdiasretro').textbox('setValue', '');
    $('#txtrecibo').textbox('setValue', '');
    $('#txtcheque').textbox('setValue', '');
    $('#txtbasegrab').textbox('setValue', '');
    $('#txtnss').textbox('setValue', '');
    $('#txtgpojer').textbox('setValue', '');
    $('#txtestatuspag').textbox('setValue', '');
    $('#txtperpag').textbox('setValue', '');
    $('#txtperret').textbox('setValue', '');

    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dga').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgt').datagrid('loadData', { "total": 0, "rows": [] });

}

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
                    onSelect: function (rec) {                       
                        $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
                        $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
                        $('#dga').datagrid('loadData', { "total": 0, "rows": [] });
                        $('#dgt').datagrid('loadData', { "total": 0, "rows": [] });
                      
                        if (rec.valor != quincena) {
                            LISTAR_POLIZA(rec.valor);
                        }
                    },
                });
                if (quincena != "")
                { $("#cboquin").combobox('setValue', quincena); }
            }
           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}