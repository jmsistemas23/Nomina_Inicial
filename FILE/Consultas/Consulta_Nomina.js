
var tipo = "";
var tipocon = "";
var quincena = "Actual";
var empleado = "";
$(document).ready(function () {
    
    CARGAR_QUINCENAS("#cboquin");    
    CARGAR_CONCEPTOS('#cboconceptos')

  
    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dgplaza', 800, 215, '');
        if ($('#chkmantener').is(":checked") == false) {
          
            CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
            $("#cbocon").combobox('setValue', '=');
        }      
        windows("#winemp", 820, 600,false, "Busqueda de Plazas");
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
   
   $("#cboquin").combobox({
       onSelect: function (rec) {          
            quincena = rec.valor; 
           if (empleado != "")
           { LISTAR_NOMINA(); }
       },
   });

   $("#cboconceptos").combobox({
       onSelect: function (rec) {
           if (rec.valor == "x") { tipocon = ""; }
           else { tipocon = rec.valor; }
           if (empleado != "")
           { LISTAR_NOMINA(); }
       },
   });

   $('#btnReporte').bind('click', function () {
       if ($('#btnReporte').linkbutton('options').disabled) { return false; }
       else
       {
           IR_PAGINA("Reporte_Nomina.aspx", "numplaza=" + plaza + "&empleado=" + empleado + "&quin=" + quincena + "&mod=N");
       }
   });

   $('#chkmantener').bind('click', function () {
       if ($('#chkmantener').is(":checked") == false) {
          
           CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
           $("#cbocon").combobox('setValue', '=');
       }
   });
  
});

function LISTAR_NOMINA() {
    var obj = "";
    var objP = "";
    var objD = "";
    var objA = "";
    var objT = "";
    var bg = "";
    var objplaza = "";
    var parametros = {};
    parametros.plaza = plaza;
    parametros.empleado = empleado;
    parametros.quincena = quincena;
    parametros.tipo = tipocon;
   // parametros.usupc = document.getElementById('HiddenField1').value;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Nomina',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "1") {
                obj = $.parseJSON(data.d[0]);
                objP = $.parseJSON(data.d[1]);
                objD = $.parseJSON(data.d[2]);
                objA = $.parseJSON(data.d[3]);
                objT = $.parseJSON(data.d[4]);
                bg = data.d[5];
                if (data.d[6] != "") {
                    objplaza = $.parseJSON(data.d[6]);
                }
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
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

                $('#txtestatus').textbox('setValue', obj[0].estatuspl);
                $('#txttipoplaza').textbox('setValue', obj[0].tipoplaza);
                $('#txtadscripcion').textbox('setValue', obj[0].adscripcion);
                $('#txtpagaduria').textbox('setValue', obj[0].pagaduria);                
                $('#txtpuesto').textbox('setValue', obj[0].puesto);
                $('#txttipopue').textbox('setValue', obj[0].tipopuesto);

                $('#txttippago').textbox('setValue', obj[0].tipopago);
                $('#txtbanco').textbox('setValue', obj[0].banco);
                $('#txtquinquenio').textbox('setValue', obj[0].quinque);
                $('#txtestatuspag').textbox('setValue', obj[0].estpago);
                $('#txtperpag').textbox('setValue', obj[0].periodo);
                $('#txtgpojer').textbox('setValue', obj[0].gpojer);                
                $('#txtcuenta').textbox('setValue', obj[0].nocuenta);
                $('#txtnss').textbox('setValue', obj[0].nss);
                $('#txtrecibo').textbox('setValue', obj[0].no_recibo);
                $('#txtcheque').textbox('setValue', obj[0].no_cheque);
                $('#txtdiaspago').textbox('setValue', obj[0].diaspag);
                $('#txtdiasretro').textbox('setValue', obj[0].diasret);
                $('#txtbasegrab').textbox('setValue', bg);
            }
            //else {  }

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

            if (objplaza.length > 0) {
                $('#txtviginicialmov').textbox('setValue', objplaza[0].movvigini);
                $('#txtvigfinalmov').textbox('setValue', objplaza[0].movvigfin);
                $('#txtmovimiento').textbox('setValue', objplaza[0].movimiento);                
               
                $('#txtviginipla').textbox('setValue', objplaza[0].vigini);
                $('#txtvigfinpla').textbox('setValue', objplaza[0].vigfin);

                $('#txttipoinc').textbox('setValue', objplaza[0].motspd);
                $('#txtpuestoant').textbox('setValue', objplaza[0].cvepueant);
                $('#txtbenef').textbox('setValue', objplaza[0].nombenef);
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
       // heigth: "100%",
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
    var colsort = "numplaza asc";
    $(dgcontrol).datagrid({
        url: "Listar_Plazas.aspx?busqueda=" + condicion + "&colord=" + colsort,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,
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
                empleado = rows.numemp;
                $('#btnReporte').linkbutton({ disabled: false });
                LIMPIAR_DATOS();
                LISTAR_NOMINA();
               }
        },
        onSortColumn: function (sort, order) {
            colsort = "";
            colsort += sort + ' ' + order + "|";
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
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_DATOS('#dgplaza', 800, 215, condicion);
}

function LIMPIAR_DATOS()
{
    $("#cboconceptos").combobox('setValue', 'x');

    $('#txtplaza').textbox('setValue', '');
    $('#txtempleado').textbox('setValue', '');
    $('#txtrfc').textbox('setValue', '');
    $('#txtcurp').textbox('setValue', '');
    $('#txtnombre').textbox('setValue', '');
    $('#txtviginipla').textbox('setValue', '');
    $('#txtvigfinpla').textbox('setValue', '');

    $('#txtestatus').textbox('setValue', '');
    $("#txttipoplaza").textbox('setValue', '');
    $('#txtadscripcion').textbox('setValue', '');
    $('#txtpagaduria').textbox('setValue', '');
    $('#txtpuesto').textbox('setValue', '');
    $('#txttipopue').textbox('setValue', '');
    $('#txtpuestoant').textbox('setValue', '');
    
    $('#txttippago').textbox('setValue', '');
    $('#txtbanco').textbox('setValue', '');
    $('#txtquinquenio').textbox('setValue', '');
    $('#txtestatuspag').textbox('setValue', '');
    $('#txtperpag').textbox('setValue', '');
    $('#txttipoinc').textbox('setValue', '');
    $('#txtgpojer').textbox('setValue', '');
    $('#txtcuenta').textbox('setValue', '');
    $('#txtnss').textbox('setValue', '');
    $('#txtrecibo').textbox('setValue', '');
    $('#txtcheque').textbox('setValue', '');
    $('#txtdiaspago').textbox('setValue', '');
    $('#txtdiasretro').textbox('setValue', '');
    $('#txtbasegrab').textbox('setValue', '');
    $('#txtanojub').textbox('setValue', '');
    $('#txtporjub').textbox('setValue', '');
    $('#txttipoinc').textbox('setValue', '');
    $('#txtbenef').textbox('setValue', '');
    
    $('#txtmovimiento').textbox('setValue', '');
    $('#txtviginicialmov').textbox('setValue', '');
    $('#txtvigfinalmov').textbox('setValue', '');

    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dga').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgt').datagrid('loadData', { "total": 0, "rows": [] });

    $('btnReporte').linkbutton({ disabled: true });

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
        url: 'funciones.aspx/Listar_Conceptos',
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