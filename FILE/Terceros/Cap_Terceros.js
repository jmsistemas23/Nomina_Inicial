var tipomovimiento = "", tipocaptura, valnomina="",selnomina="",modulo="";
var tipobloqueo = "";
$(document).ready(function () { 

    $('#btnNuevaCaptura').bind('click', function () { NUEVA_CAPTRUA('#btnNuevaCaptura'); });
    $('#btnModificarCaptura').bind('click', function () { MODIFICAR_CAPTRUA('#btnModificarCaptura'); });

    $('#btnBajaTerceros').bind('click', function () { BAJA_TERCEROS('#btnBajaTerceros'); });
    $('#btnCambioTerceros').bind('click', function () { CAMBIOS_TERCEROS('#btnCambioTerceros'); });

   
});
$(window).load(function () {   
    SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'TR';
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
            }
            else {
                $('#lblbloqueada').show();                
            }

            if (data.d[0] == "C") {
                $('#btnNuevaCaptura').linkbutton({ disabled: false });
                $('#btnModificarCaptura').linkbutton({ disabled: false });
                $('#btnBajaTerceros').linkbutton({ disabled: false });
                $('#btnCambioTerceros').linkbutton({ disabled: false });
            }
            else {
                $('#btnNuevaCaptura').linkbutton({ disabled: true });
                $('#btnModificarCaptura').linkbutton({ disabled: true });
                $('#btnBajaTerceros').linkbutton({ disabled: true });
                $('#btnCambioTerceros').linkbutton({ disabled: true });
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

function NUEVA_CAPTRUA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        modulo = "Capter"; tipomovimiento = "Guardar"; tipocaptura = 'A'; VALIDAR_MULTINOMINA('A');
    }
}
function MODIFICAR_CAPTRUA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        modulo = "Capter"; tipomovimiento = "Modificar"; tipocaptura = 'MC'; VALIDAR_MULTINOMINA('MC');
    }
}
function BAJA_TERCEROS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        modulo = "Terceros"; tipomovimiento = "Guardar"; tipocaptura = 'B'; VALIDAR_MULTINOMINA('B');
    }
}
function CAMBIOS_TERCEROS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        modulo = "Terceros"; tipomovimiento = "Guardar"; tipocaptura = 'C'; VALIDAR_MULTINOMINA('C');
    }
}

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#lblnominas').hide();
                $('#dextras').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);                
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();               
                valnomina = '';
                nominasel = '';
            }
          
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}
function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            // text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
        });

        tr = $(tr).append(
          $(td).append(btn)
        );
        table.append(tr);


        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            width: 70 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
        }).bind('click', function () {
            selnomina = this.text;
            valnomina = this.name;
        });
        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            selnomina = btn[0].text;
            valnomina = btn[0].name;
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {

        document.getElementById('lblquinperfil').innerHTML = "";
        document.getElementById('lblquinperfil').innerHTML = nominasel;
        document.getElementById('lblnuevacap').innerHTML = "";
        document.getElementById('lblnuevacap').innerHTML = nominasel;
        document.getElementById('lblquindoc').innerHTML = "";
        document.getElementById('lblquindoc').innerHTML = nominasel;
        document.getElementById('lblquinter').innerHTML = "";
        document.getElementById('lblquinter').innerHTML = nominasel;


        $.session.set('valnomina', '');
    }
}

function VALIDAR_MULTINOMINA(tipo) {
    var parametros = {};
    if ((valnomina != undefined) && (valnomina != '')) {
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Validacion_Multinomina",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") {
                    if (modulo == "Capter")
                    { document.location = "Movimientos_Captura.aspx?tipomov="+tipomovimiento+"&tipocap=" + tipocaptura + "&nomina=" + valnomina + "&selnomina=" + selnomina; }
                    else { document.location = "Movimientos_Terceros.aspx?tipomov=" + tipomovimiento + "&tipocap=" + tipocaptura + "&nomina=" + valnomina + "&selnomina=" + selnomina; }
                }
                else {
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');

                    SACAR_NOMINAS();
                }
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    }
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a capturar', 'error'); }
}