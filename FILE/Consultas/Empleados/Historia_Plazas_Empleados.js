
var movimiento = "";
var documento = "";
var desmov = "";
var vtipo = "";
var vempleado = "";
$(document).ready(function () {
   var  empleado = $_GET('empleado');
    if (empleado != undefined) { vempleado = empleado; }
    else { vempleado = ''; }
    
    var tipo = $_GET('tipo');
    if (tipo != undefined) { vtipo = tipo; }
    else { vtipo = ''; }

    LISTAR_PLAZAS_EMPLEADOS();
    
    $('#btnRMenu').bind('click', function () {     
        //document.location = "Consulta_Empleados.aspx?empleado=" + empleado;
        IR_PAGINA("Consulta_Empleados.aspx", "numplaza=&empleado=" + empleado);
    });

    $('#dgpe').datagrid({       
        onClickRow: function () {
            rows = $('#dgpe').datagrid('getSelected');
            if (rows) {                
                LISTAR_EMPLEADOS_PLAZAS(rows.numplaza);              
            }
        },
    });
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

function CARGAR_DG(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
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

function LISTAR_PLAZAS_EMPLEADOS() {
    var obj = "";
    var objhm = "";

    var parametros = {};
    parametros.valor = vempleado;
    parametros.tipo = vtipo;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_HistoriaPlazas',
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
                obj = $.parseJSON(data.d[1]);
                objhm = $.parseJSON(data.d[2]);
                if (obj.length > 0) {
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);                    
                    $('#txtcurp').textbox('setValue', obj[0].curpemp);                    
                }

                if (objhm.length > 0) {
                    CARGAR_DG("#dgpe", objhm);
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

function LISTAR_EMPLEADOS_PLAZAS(plaza) {
    var obj = "";
    var objhm = "";

    var parametros = {};
    parametros.valor = plaza;
    parametros.tipo = 'P';
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_HistoriaPlazas',
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
                objhm = $.parseJSON(data.d[1]);

                if (objhm.length > 0) {
                    CARGAR_DG("#dgep", objhm);
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
