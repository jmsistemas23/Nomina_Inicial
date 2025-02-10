var numplaza = "";
var quincena = "";
var empleado = "";
var tipo = "";
var tipocon = "";
$(document).ready(function () {
    
    empleado = $_GET('empleado');
    if (empleado != undefined) { empleado = empleado; }
    else { empleado = ''; }

    numplaza = $_GET('numplaza');
    if (numplaza != undefined) { numplaza = numplaza; }
    else { numplaza = ''; }

    quincena = $_GET('quin');
    if (quincena != undefined) { quincena = quincena; }
    else { quincena = ''; }
       

    $('#btnRegresar').show();     

    CARGAR_QUINCENAS("#tvquincenas");      
    CARGAR_CONCEPTOS('#cboconceptos')
  
   

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dgplaza', 800, 215, '');
        CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
        windows("#winemp", 820, 630,false, "Busqueda de Empleado");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });
   
   
   $("#cboconceptos").combobox({
       onSelect: function (rec) {
           if (rec.valor == "x") { tipocon = ""; }
           else {
               tipocon = rec.valor;
               if (empleado != "") {
                   LISTAR_NOMINA();
               }
           }
          
       },
   });

   $('#btnRegresar').bind('click', function () {             
       //document.location = "Consulta_Empleados.aspx?numplaza=&empleado=" + empleado;
       IR_PAGINA("Consulta_Empleados.aspx", "numplaza=&empleado=" + empleado);
   });

   $('#btnReporte').bind('click', function () {
       if ($('#btnReporte').linkbutton('options').disabled) { return false; }
       else
       {
           var t = $('#tvquincenas');
           var quin = t.tree('getSelected');
           IR_PAGINA("../Reporte_Nomina.aspx", "numplaza=" + numplaza + "&empleado=" + empleado + "&quin=" + quin.text + "&mod=NE");
       }
   });

    LISTAR_NOMINA();
});

function IR_PAGINA(url, parametros) {
    var strpagina = "";
    if (parametros != "") { strpagina = url + "?" + parametros; } else { strpagina = url; }
    $.ajax({
        url: url + "/GetResponse",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == true) {
                window.location = strpagina;
            }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c, 'error');
        }
    });
}

function LISTAR_NOMINA() {   
    var obj = "";
    var objP = "";
    var objD = "";
    var objA = "";
    var objT = "";
    var bg="",objplazas="";
    var parametros = {};
    parametros.plaza = numplaza;
    parametros.empleado = empleado;
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
                objplazas = $.parseJSON(data.d[7]);
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText +" al Listar Nomina", 'error');
        },
        complete: function ()
        {
            if (obj.length > 0) {
               // $('#txtplaza').textbox('setValue', obj[0].numplaza);
                $('#txtempleado').textbox('setValue', obj[0].numemp);
                $('#txtrfc').textbox('setValue', obj[0].rfc);
                $('#txtcurp').textbox('setValue', obj[0].curp);
                $('#txtnombre').textbox('setValue', obj[0].nomcom);
                $('#txtadscripcion').textbox('setValue', obj[0].adscripcion);
                $('#txtpagaduria').textbox('setValue', obj[0].pagaduria);
                $('#txtcvetpl').textbox('setValue', obj[0].tipoplaza);
                $('#txtpuesto').textbox('setValue', obj[0].puesto);
                $('#txtbanco').textbox('setValue', obj[0].banco);
                $('#txttipopago').textbox('setValue', obj[0].tipopago );

                //$('#txtestatus').textbox('setValue', obj[0].estatuspl);
                //$('#txthrplaza').textbox('setValue', obj[0].hrspla);
                //$('#txtquinquenio').textbox('setValue', obj[0].quinque);
                //$('#txtnivsal').textbox('setValue', obj[0].cvenivsal);
                //$('#txttipopue').textbox('setValue', obj[0].tipopue + "-" + obj[0].descpu);
               
               
                //$('#txtcuenta').textbox('setValue', obj[0].nocuenta);
                //$('#txttipocta').textbox('setValue', obj[0].tipcueor);
                //$('#txtsucursal').textbox('setValue', obj[0].sucurpl);
                //$('#txtctaclabe').textbox('setValue', obj[0].ctacbepl);
                //$('#txtestatuspag').textbox('setValue', obj[0].estpago);
                //$('#txtdiaspago').textbox('setValue', obj[0].diaspag);
                //$('#txtdiasretro').textbox('setValue', obj[0].diasret);
                //$('#txtrecibo').textbox('setValue', obj[0].no_recibo);
                //$('#txtcheque').textbox('setValue', obj[0].no_cheque);
                //$('#txtnss').textbox('setValue', obj[0].nss);
                //$('#txtgpojer').textbox('setValue', obj[0].gpojer);
                //$('#txtperpag').textbox('setValue', obj[0].periodo);
            }
            else { LIMPIAR_DATOS(); }

            if (objbg.length > 0) {
                for (var i = 0; i < objbg.length; i++) {
                    if (i == 0)
                    { $('#txtbasegrab').textbox('setValue', objbg[i].Valor); }
                    else
                    { $('#txtbasegrabretro').textbox('setValue', objbg[i].Valor); }
                }
            }

            if (objP.length > 0) {
                CARGAR_INDICADORES("#dgp", objP, 80);
            }
            else { $('#dgp').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objD.length > 0) {
                CARGAR_INDICADORES("#dgd", objD, 80);
            }
            else { $('#dgd').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objA.length > 0) {
                CARGAR_INDICADORES("#dga", objA, 80);
            }
            else { $('#dga').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objT.length > 0) {
                CARGAR_INDICADORES("#dgt", objT, 80);
            }
            else { $('#dgt').datagrid('loadData', { "total": 0, "rows": [] }); }

            if (objplazas.length > 0)
            {
                $('#cboplaza').combobox({
                    data: objplazas,
                    valueField: 'name',
                    textField: 'text',
                    editable: false               
                });
                if (objplazas.length == 1) { $("#cboplaza").combobox({ readonly: true }); }
                else { $("#cboplaza").combobox({ readonly: false }); }
                $("#cboplaza").combobox('setValue', objplazas[0].name);
            }


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

function CARGAR_DATOS(dgcontrol, ancho, alto, strnomemp) {
    var rows
    $(dgcontrol).datagrid({
        url: "Listar_empleados.aspx?busqueda=" + strnomemp,
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
                numplaza = rows.numplaza;
                empleado = rows.numemppl;
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
    var strnomemp = "";    
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { strnomemp = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { strnomemp = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strnomemp = " "; }
    CARGAR_DATOS('#dgplaza', 800, 215, strnomemp);
}

function LIMPIAR_DATOS()
{
   // $("#cboconceptos").combobox('setValue', 'x');
   // $("#cboquin").combobox('setValue', 'x');
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

function CARGAR_QUINCENAS(tobj) {
    var parametros = {};
    parametros.empleado = empleado;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_Quincenastv',
        data: JSON.stringify(parametros),
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
                var obj = jQuery.parseJSON(data.d[0]);
                $(tobj).tree({
                    data: obj,
                    onClick: function (node) {
                        quincena = node.name;
                        LISTAR_NOMINA();
                    }                   
                });                
                var tri = $(tobj).tree('getRoots');
                for (var h = 0; h < tri.length; h++) {
                    if (quincena == tri[h].text) {
                        $(tobj).tree('select', tri[h].target)
                        break;
                    }
                }
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
                if (quincena != 'Actual') {
                    $("#cboquin").combobox('setValue', quincena);
                }
                else { $("#cboquin").combobox('setValue', 'Actual'); }
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