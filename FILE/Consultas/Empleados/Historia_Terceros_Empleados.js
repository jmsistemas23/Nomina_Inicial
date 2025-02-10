$(document).ready(function () {
    empleado = $_GET('empleado');
    if (empleado != undefined) { empleado = empleado; }
    else { empleado = ''; }


    tipo = $_GET('tipo');
    if (tipo != undefined) { tipo = tipo; }
    else { tipo = ''; }

    tipomov = $_GET('tipomov');
    if (tipomov != undefined) { tipomov = tipomov; }
    else { tipomov = ''; }


    LISTAR_TERCEROS();

    //$('#btnInicio').bind('click', function () {
    //    document.location = "Consulta_Empleados.aspx?numplaza=&empleado=" + empleado;
    //});
    $('#btnRMenu').bind('click', function () {
        //document.location = "Consulta_Empleados.aspx?numplaza=&empleado=" + empleado;
        IR_PAGINA("Consulta_Empleados.aspx", "numplaza=&empleado=" + empleado);
    });

    //$('#btnRcaptura').bind('click', function () {
    //    $('#dmenu').show();
    //    $('#dcaptura').hide();
    //    LISTAR_NOMINA();
    //});

    //$('#btnMovimiento').bind('click', function () { EDITAR_MOVIMIENTO('#btnMovimiento'); });
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

function LISTAR_TERCEROS() {
    var obj = "";
    var objhm = "";
    var objdis = "";

    var parametros = {};
    parametros.tipo = tipo;    
    parametros.tipomov = tipomov;
    parametros.valor = empleado;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_HistoriaMovimientos',
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
                if (obj.length > 0) {
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);                    
                }
            }
            //objhm = $.parseJSON(data.d[1]);
            //objdis = "";//data.d[2];
            //if (objhm.length > 0) {
            //    CARGAR_DG("#dght", objhm, objdis);
            //}
            objhe = $.parseJSON(data.d[1]);
            if (objhe[0].Error == 0) {
                $.messager.alert('Error', objhe[0].Mensaje, 'error');
            }
            else {
                if (data.d[2] != "") {
                    objhm = $.parseJSON(data.d[2]);
                    if (objhm.length > 0) {
                        objdis = data.d[3];
                        CARGAR_DG("#dght", objhm, objdis);
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

function CARGAR_DG(dgcontrol, objdato, objdis) {
   // var col = $.parseJSON(objdis);
    $(dgcontrol).datagrid({
        data: objdato,
        //columns: col.columns,
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
               // $('#btnMovimiento').linkbutton('enable');
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

