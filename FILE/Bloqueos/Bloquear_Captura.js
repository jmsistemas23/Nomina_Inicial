$(document).ready(function () {
    $('#btnDMP').bind('click', function () { BloquearDesbloquear('#btnDMP', 'C', 'MP'); });
    $('#btnBMP').bind('click', function () { BloquearDesbloquear('#btnBMP', 'F', 'MP'); });
    $('#btnDMC').bind('click', function () { BloquearDesbloquear('#btnDMC', 'C', 'MC'); });
    $('#btnBMC').bind('click', function () { BloquearDesbloquear('#btnBMC', 'F', 'MC'); });
    $('#btnDDP').bind('click', function () { BloquearDesbloquear('#btnDDP', 'C', 'DP'); });
    $('#btnBDP').bind('click', function () { BloquearDesbloquear('#btnBDP', 'F', 'DP'); });
    $('#btnDIL').bind('click', function () { BloquearDesbloquear('#btnDIL', 'C', 'IL'); });
    $('#btnBIL').bind('click', function () { BloquearDesbloquear('#btnBIL', 'F', 'IL'); });
    $('#btnDME').bind('click', function () { BloquearDesbloquear('#btnDME', 'C', 'ME'); });
    $('#btnBME').bind('click', function () { BloquearDesbloquear('#btnBME', 'F', 'ME'); });
    $('#btnDTR').bind('click', function () { BloquearDesbloquear('#btnDTR', 'C', 'TR'); });
    $('#btnBTR').bind('click', function () { BloquearDesbloquear('#btnBTR', 'F', 'TR'); });
    $('#btnDRF').bind('click', function () { BloquearDesbloquear('#btnDRF', 'C', 'RF'); });
    $('#btnBRF').bind('click', function () { BloquearDesbloquear('#btnBRF', 'F', 'RF'); });
    $('#btnDPE').bind('click', function () { BloquearDesbloquear('#btnDPE', 'C', 'PE'); });
    $('#btnBPE').bind('click', function () { BloquearDesbloquear('#btnBPE', 'F', 'PE'); });
    $('#btnDPA').bind('click', function () { BloquearDesbloquear('#btnDPA', 'C', 'PA'); });
    $('#btnBPA').bind('click', function () { BloquearDesbloquear('#btnBPA', 'F', 'PA'); });
    $('#btnDCAP').bind('click', function () {BloquearDesbloquear('#btnDCAP', 'C', 'CAP');}); 
    $('#btnBCAP').bind('click', function () {BloquearDesbloquear('#btnBCAP', 'F', 'CAP');});
       
});
$(window).load(function () {
    Listar_BloqueosDesbloqueos();
});

function BloquearDesbloquear(btnobj, valor,mov) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.tipo = valor;
        parametros.modulo = mov;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Captura",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == 0)
                { $.messager.alert('Información', data.d[1], 'info'); }
                else { $.messager.alert('Información', data.d[1], 'info'); }

                if (mov == 'CAP') { Listar_BloqueosDesbloqueos(); }
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
}

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
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
            var obj = jQuery.parseJSON(data.d[0]);
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].Tipmov == 'MP') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDMP').linkbutton({ selected: true }); }
                    else { $('#btnBMP').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'MC') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDMC').linkbutton({ selected: true }); }
                    else { $('#btnBMC').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'DP') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDDP').linkbutton({ selected: true }); }
                    else { $('#btnBDP').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'IL') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDIL').linkbutton({ selected: true }); }
                    else { $('#btnBIL').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'ME') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDME').linkbutton({ selected: true }); }
                    else { $('#btnBME').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'TR') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDTR').linkbutton({ selected: true }); }
                    else { $('#btnBTR').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'RF') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDRF').linkbutton({ selected: true }); }
                    else { $('#btnBRF').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'PE') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDPE').linkbutton({ selected: true }); }
                    else { $('#btnBPE').linkbutton({ selected: true }); }
                }
                if (obj[i].Tipmov == 'PA') {
                    if (obj[i].BloqueoCaptura == 'C') { $('#btnDPA').linkbutton({ selected: true }); }
                    else { $('#btnBPA').linkbutton({ selected: true }); }
                }
                if (data.d[1] > "0") {
                    $('#btnDCAP').linkbutton({ selected: true });
                }
                else { $('#btnBPA').linkbutton({ selected: true }); }
               
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}