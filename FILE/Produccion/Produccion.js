$(document).ready(function () {
    VALIDAR_CALCULO();

    $('#btnHistoria').bind('click', function () { BLOQUEAR_CALCULO('#btnCerrado'); });
    $('#btnActual').bind('click', function () { DESBLOQUEAR_CALCULO('#btnAbierto'); });
});

function VALIDAR_CALCULO()
{
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ValidarProduccion",
        //data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                document.getElementById('lblmensaje').innerHTML = data.d[0];
            }
            else { document.getElementById('lblmensaje').innerHTML = ""; }

            if (data.d[1] == 0) {                
                // if ($('#btnAbierto').linkbutton('options').selected) 
                $('#btnAbierto').linkbutton({ selected: true });
                $('#btnCerrado').linkbutton({ selected: false });
            }
            else {
                $('#btnAbierto').linkbutton({ selected: false });
                $('#btnCerrado').linkbutton({ selected: true });
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

function BLOQUEAR_CALCULO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Bloquear_Calculo",           
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                $.messager.alert('Información', data.d[0], 'info');
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
}

function DESBLOQUEAR_CALCULO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/DesBloquear_Calculo",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                $.messager.alert('Información', data.d[0], 'info');
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
}