var vplaza = "";
var movimiento = "";
var documento = "";
var desmov = "";
var vtipo = "";
var vnumemppl = "";
$(document).ready(function () {

   var plaza = $_GET('plaza');
    if (plaza != undefined) { vplaza = plaza; }
    else { plaza = ''; }
    var numemppl = $_GET('numemppl');
    if (numemppl != undefined) { vnumemppl = numemppl; }
    else { vnumemppl = ''; }
    
    var tipo = $_GET('tipo');
    if (tipo != undefined) { vtipo = tipo; }
    else { vtipo = ''; }

    LISTAR_NOMINA();
    
    $('#btnRMenu').bind('click', function () {        
        // document.location = "Consulta_Plazas.aspx?numemppl=" + vnumemppl + "&plaza=" + vplaza         
        IR_PAGINA("Consulta_Plazas.aspx", "numemppl=" + vnumemppl + "&plaza=" + vplaza);
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
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                //rows = $(dgcontrol).datagrid('getSelected');
                //documento = rows.numdocmp;
                //desmov = rows.desmovmp;
                //movimiento = rows.cvemovmp;
                //$('#btnMovimiento').linkbutton('enable');
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

function LISTAR_NOMINA() {
    var obj = "";
    var objhm = "";

    var parametros = {};
    parametros.valor = vplaza;
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
                 obj0= $.parseJSON(data.d[0]);
                obj1= $.parseJSON(data.d[1]);
                obj2 = $.parseJSON(data.d[2]);
                if (obj0[0].Error == 1) {
                    if (obj1.length > 0) {
                        $('#txtplaza').textbox('setValue', obj1[0].numplaza);
                        $('#txtrfc').textbox('setValue', obj1[0].rfccompl);
                        $('#txtnombre').textbox('setValue', obj1[0].nomcompl);
                        $('#txtestatus').textbox('setValue', obj1[0].cveesppl);
                        $('#txtcurp').textbox('setValue', obj1[0].curp);
                        $('#txtviginimov').textbox('setValue', obj1[0].movvigini);
                        $('#txtvigfinmov').textbox('setValue', obj1[0].movvigini);
                    }

                    if (obj2.length > 0) {
                        CARGAR_DG("#dghm", obj2);
                    }                                  
                }
                else
                { $.messager.alert('Error', obj0[0].Mensaje, 'error'); }
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
