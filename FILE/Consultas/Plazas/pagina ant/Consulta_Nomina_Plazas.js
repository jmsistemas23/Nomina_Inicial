var plaza = "";
var quincena = "";
var numemppl = "";
var tipo = "";
var tipocon = "";
var quincena = "";
$(document).ready(function () {
    numemppl = $_GET('numemppl');
    if (numemppl != undefined) { numemppl = numemppl; }
    else { numemppl = ''; }

    plaza = $_GET('plaza');
    if (plaza != undefined) { plaza = plaza; }
    else { plaza = ''; }
  
    tipo = $_GET('tipo');
    if (tipo != undefined) { tipo = tipo;  }
    else { tipo = ''; }

    $('#btnRegresar').show();    

    CARGAR_QUINCENAS("#cboquin");    
    
    CARGAR_CONCEPTOS('#cboconceptos')
  
    LISTAR_NOMINA();
    //CARGAR_INDICADORES("#dgp", "", 50);
    //CARGAR_INDICADORES("#dgd", "", 50);
    //CARGAR_INDICADORES("#dga", "", 50);
    //CARGAR_INDICADORES("#dgt", "", 40);

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dgplaza', 800, 215, '');
        CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', "rfccompl");
        windows("#winemp", 820, 630, "Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_DATOS(); $("#cboconceptos").combobox('setValue', 'x');
        $("#cboquin").combobox('setValue', 'x');
    });
   
   $("#cboquin").combobox({
       onSelect: function (rec) {
           if (rec.valor =="x") { quincena = ""; }
           else { quincena = rec.valor; }
           if (numemppl != "")
           { LISTAR_NOMINA(); }
       },
   });

   $("#cboconceptos").combobox({
       onSelect: function (rec) {
           if (rec.valor == "x") { tipocon = ""; }
           else { tipocon = rec.valor; }
           if (numemppl != "")
           { LISTAR_NOMINA(); }
       },
   });

   $('#btnRegresar').bind('click', function () {             
       document.location = "Consulta_Plazas.aspx?plaza=" + plaza + "&numemppl=" + numemppl;
   });
});

function LISTAR_NOMINA() {
    var obj = "";
    var objP = "";
    var objD = "";
    var objA = "";
    var objT = "";
    var bg = "";
    var objbg = "";
    var parametros = {};
    parametros.plaza = plaza;
    parametros.empleado = numemppl;
    parametros.quincena = quincena;
    parametros.tipo = tipocon;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_Nomina',
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
                obj = $.parseJSON(data.d[0]);
                objP = $.parseJSON(data.d[1]);
                objD = $.parseJSON(data.d[2]);
                objA = $.parseJSON(data.d[3]);
                objT = $.parseJSON(data.d[4]);
                objbg = $.parseJSON(data.d[5]);
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            if (obj.length > 0) {
                $('#txtplaza').textbox('setValue', obj[0].numplaza);
                $('#txtempleado').textbox('setValue', obj[0].numemp);
                $('#txtrfc').textbox('setValue', obj[0].rfc);
                $('#txtcurp').textbox('setValue', obj[0].curp);
                $('#txtnombre').textbox('setValue', obj[0].nomcom);
                $('#txtadscripcion').textbox('setValue', obj[0].cveads + "-" + obj[0].descads);
                $('#txtpagaduria').textbox('setValue', obj[0].cvepagad + "-" + obj[0].descpagad + " / " + obj[0].municipio + " - " + obj[0].localidad);
                $('#txtestprog').textbox('setValue', obj[0].estrucprog + "-" + obj[0].descestrucprog);
                $('#txtpuesto').textbox('setValue', obj[0].cvepue + "-" + obj[0].descpue);

                $('#txtestatus').textbox('setValue', obj[0].estatuspl);
                $('#txthrplaza').textbox('setValue', obj[0].hrspla);
                $('#txtquinquenio').textbox('setValue', obj[0].quinque);
                $('#txtnivsal').textbox('setValue', obj[0].cvenivsal);
                $('#txttipopue').textbox('setValue', obj[0].tipopue);
                $('#txttippago').textbox('setValue', obj[0].tipopago);
                $('#txtbanco').textbox('setValue', obj[0].cvebanor);
                $('#txtcuenta').textbox('setValue', obj[0].nocuenta);
                $('#txttipocta').textbox('setValue', obj[0].tipcueor);
                $('#txtsucursal').textbox('setValue', obj[0].sucurpl);
                $('#txtctaclabe').textbox('setValue', obj[0].ctacbe);
              
                $('#txtdiaspago').textbox('setValue', obj[0].diaspag);
                $('#txtdiasretro').textbox('setValue', obj[0].diasret);
                $('#txtrecibo').textbox('setValue', obj[0].no_recibo);
                $('#txtcheque').textbox('setValue', obj[0].no_cheque);
                $('#txtnss').textbox('setValue', obj[0].nss);
                $('#txtgpojer').textbox('setValue', obj[0].gpojer);
                $('#txtperpag').textbox('setValue', obj[0].periodo);
                $('#txtestatuspag').textbox('setValue', obj[0].estpago + "-" + obj[0].desestp);
            }
            else { LIMPIAR_DATOS();}

            if (objbg.length > 0) {
                for (var i = 0; i < objbg.length; i++) {
                    if (i == 0)
                    { $('#txtbasegrab').textbox('setValue', objbg[i].Valor); }
                    else
                    { $('#txtbasegrabretro').textbox('setValue', objbg[i].Valor); }
                }
            }

            if (objP.length > 0) {
                CARGAR_INDICADORES("#dgp", objP, 50);
            }
            else { $('#dgp').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objD.length > 0) {
                CARGAR_INDICADORES("#dgd", objD, 50);
            }
            else { $('#dgd').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objA.length > 0) {
                CARGAR_INDICADORES("#dga", objA, 50);
            }
            else { $('#dga').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objT.length > 0) {
                CARGAR_INDICADORES("#dgt", objT, 40);
            }
            else { $('#dgt').datagrid('loadData', { "total": 0, "rows": [] }); }

            $('#loading').hide(100);
            $("#winemp").window('close');
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
    var rows
    $(dgcontrol).datagrid({
        url: "../Listar_Plazas.aspx?busqueda=" + condicion,
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
                plaza = rows.numplaza;
                numemppl = rows.numemppl;
                LISTAR_NOMINA();
               }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {           
            $('#loading').hide(100);
        }
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
    else { condicion = ""; }
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
    $('#txtbasegrabretro').textbox('setValue', '');
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
        url: '../funciones.aspx/Listar_Quincenas',
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

function CARGAR_CONCEPTOS(ddlobj) {
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_Conceptos',
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