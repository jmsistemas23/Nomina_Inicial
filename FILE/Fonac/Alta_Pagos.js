var objdetalle;
$(document).ready(function () {
    $.session.set('usuario', 'miguel');
    //if ($.session.get('idusuario') == null)
    //{ window.location.href = '../../Login.aspx'; }

    CARGAR_QUINCENAS('#cboquin');

    CARGAR_CONFIGURACION();

    $('#btnLBusqueda').bind('click', function () {
        $('#txtval').textbox('setValue', '');
        $("#cbocam").combobox('setValue', '=');
        $("#cbocam").combobox('setValue', 'numemppl');
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dg', '');
        CARGAR_CAMPOSBUSQUEDAS('#dg', '#cbocam', 'numemppl');
        windows("#winemp", 779, 661,false, "Empleados");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });
    $('#btnfiltrar').bind('click', function () {
        FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue'));
    });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_CAPTURA() });
    $('#btnDetalle').bind('click', function () { DETALLE_PAGOS('#btnDetalle') });

    $('#btnGuardar').bind('click', function () { GUARDAR_CAPTURA('#btnGuardar') });
    
});

function LIMPIAR_CAPTURA()
{
    $('#empleado').textbox('setValue', '');
    $('#nombre').textbox('setValue','');
    $('#rfc').textbox('setValue', '');
    $('#curp').textbox('setValue', '');
    $('#plaza').textbox('setValue', '');
    $('#estatuspla').textbox('setValue','');
    $('#puesto').textbox('setValue', '');
    $('#txtplaza').textbox('setValue','');
    $('#txtpuesto').textbox('setValue', '');
    $('#estatusfonac').textbox('setValue', '');

    $('#txtmonto').textbox('setValue', '');
    $('#txtapo1').textbox('setValue', '');
    $('#txtapo2').textbox('setValue', '');
    $('#txtapo3').textbox('setValue', '');
    $('#txtobservaciones').textbox('setValue', '');
    $('#cbotipquin').combobox('setValue', 'Ordinaria');
    $('#cboquin').combobox('setValue', 'Actual');

    $('#total').textbox('setValue', '');
    $('#contadorfonac').textbox('setValue', '');
    $('#tot1').textbox('setValue', '');
    $('#cont1').textbox('setValue', '');
    $('#tot2').textbox('setValue', '');
    $('#cont2').textbox('setValue', '');
    $('#tot3').textbox('setValue', '');
    $('#cont3').textbox('setValue','');

    $('lblmensaje').hide();
    document.getElementById('lblmensaje').innerHTML = "";
}

function CARGAR_DATOS(dgcontrol, condicion) {
    var quincena = "";    
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + condicion + "&quincena=",
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,        
        pageSize: 20,
        width: "100%",
        heigth: "100%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                rows = $(dgcontrol).datagrid('getSelected');                              
                $("#winemp").window('close');
                $('#empleado').textbox('setValue', rows.numemppl);
                $('#nombre').textbox('setValue', rows.nomcompl);
                $('#rfc').textbox('setValue', rows.rfccompl);
                $('#curp').textbox('setValue', rows.curpemp);
                $('#plaza').textbox('setValue', rows.numplaza);
                $('#estatuspla').textbox('setValue', rows.cveesppl);
                $('#puesto').textbox('setValue', rows.cvepuepl);
              
                $('#txtplaza').textbox('setValue', rows.numplaza);
                $('#txtpuesto').textbox('setValue', rows.cvepuepl);

                MOSTRAR_DETALLE(rows.numemppl);
                $('#btnLimpiar').linkbutton({ disabled: false });
                $('#btnDetalle').linkbutton({ disabled: false });
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

function MOSTRAR_DETALLE(valor)
{
    var parametros = {};
    parametros.empleado = valor;
    $.ajax({
        type: "POST",
        url: 'funsiones.aspx/Mostrar_Detalle',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var objestatus = $.parseJSON(data.d[0]);
            if (objestatus[0].Encontrado == "1") {
                var objciclos = $.parseJSON(data.d[1]);
               // objdetalle = $.parseJSON(data.d[2]);               
                $('#btnGuardar').linkbutton({ disabled: false });
                $('#estatusfonac').textbox('setValue', objciclos[0].estatus);

                if (objciclos.length > 0)
                {                    
                    $('#total').textbox('setValue', objciclos[0].total);
                    $('#contadorfonac').textbox('setValue', objciclos[0].contador);
                    $('#tot1').textbox('setValue', objciclos[0].total_apo1);
                    $('#cont1').textbox('setValue', objciclos[0].Contador_apo1);
                    $('#tot2').textbox('setValue', objciclos[0].total_apo2);
                    $('#cont2').textbox('setValue', objciclos[0].Contador_apo2);
                    $('#tot3').textbox('setValue', objciclos[0].total_apo3);
                    $('#cont3').textbox('setValue', objciclos[0].Contador_apo3);
                }               
            }
            else {               
                $('#estatusfonac').textbox('setValue', objestatus[0].Estatus);                              
                $('#btnGuardar').linkbutton({ disabled: true });               

            }
            document.getElementById('lblmensaje').innerHTML = objestatus[0].Mensaje;
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

function DETALLE_PAGOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
       // if (objdetalle.length > 0) {                   
        $('#dgdetpago').datagrid({
                url: "Listar_DetallePagos.aspx?busqueda=" + $('#empleado').textbox('getValue'),
                pagination: false,
                rownumbers: true,
                singleSelect: false,
                striped: true,
                showFooter: true,
                pageSize: 20,
                width: "100%",
                heigth: "100%",
                beforeSend: function () {
                    $('#loading').show();
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () {
                    $('#loading').hide(100);

                }
            });
            windows("#windetallepago", 800, 600, false, "Detalle de Pago");
       // }     
    }
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
    CARGAR_DATOS('#dg', condicion);
}

function CARGAR_QUINCENAS(ddlobj) {
    $.ajax({
        type: "POST",
        url: 'funsiones.aspx/Listar_Quincenas',
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

function CARGAR_CONFIGURACION() {
    var obj = "";   
    $.ajax({
        type: "POST",
        url: 'funsiones.aspx/Cargar_Configuracion',
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
                document.getElementById('lbltotaldecuento').innerHTML = "Total de Descuentos Fonac, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lblcontadorfonac').innerHTML = "Contador Fonac, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lbltotapo1').innerHTML = "Total de Apo. 1, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lblcontapo1').innerHTML = "Contador Apo. 1, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lbltotapo2').innerHTML = "Total de Apo. 2, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lblcontapo2').innerHTML = "Contador Apo. 2, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lbltotapo3').innerHTML = "Total de Apo. 3, Ciclo " + obj[0].ciclo_actual;
                document.getElementById('lblcontapo3').innerHTML = "Contador Apo. 3, Ciclo " + obj[0].ciclo_actual;
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

function GUARDAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
        var quincena = "", año = "", extraordinaria = 0;
        if ($('#cboquin').combobox('getValue') != 'x') {
           var valores = $('#cboquin').combobox('getValue');           
           valores = valores.split('|');         
           quincena = valores[0];
           año = valores[1];
           extraordinaria = valores[2];
        }
        else {
            quincena = $.session.get("quiact");
            año = $.session.get("añoact");
            extraordinaria = 0;
        }

        var parametros = {};     
        parametros.numemp = $('#empleado').textbox('getValue');
        parametros.plaza = $('#plaza').textbox('getValue');
        parametros.quincena = quincena;
        parametros.año = año;
        parametros.descuento = $('#txtmonto').textbox('getValue');
        parametros.apo1 = $('#txtapo1').textbox('getValue');
        parametros.apo2 = $('#txtapo2').textbox('getValue');
        parametros.apo3 = $('#txtapo3').textbox('getValue');
        parametros.tipoquin = $('#cbotipquin').combobox('getValue');
        parametros.numext = extraordinaria;
        parametros.observaciones = $('#txtobservaciones').textbox('getValue');
        parametros.usu = $.session.get('usuario');
        $.ajax({
            type: "POST",
            url: 'Funsiones.aspx/Guadar_AltaPago',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                var objmsg = $.parseJSON(data.d[0]);                
                if (objmsg[0].Error == "1") { $.messager.alert('Error', objmsg[0].Mensaje, 'error'); }
                else {
                    $.messager.alert('Información', objmsg[0].Mensaje, 'info');                  
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
}



