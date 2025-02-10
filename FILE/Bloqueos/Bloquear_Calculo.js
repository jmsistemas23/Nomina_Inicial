var quincena = "";
$(document).ready(function () {
    VALIDAR_CALCULO();
  
    $('#btnCerrado').bind('click', function () { BloquearDesbloquear_Calculo('#btnCerrado',1); });
    $('#btnAbierto').bind('click', function () { BloquearDesbloquear_Calculo('#btnAbierto',0); });
   
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
            if (data.d[2] != "") {
                //var objnom = jQuery.parseJSON(data.d[2]);
                document.getElementById('lblnomina').innerHTML = data.d[2];
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

function BloquearDesbloquear_Calculo(btnobj,valor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.valor = valor;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Calculo",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (valor == 1)
                { $.messager.alert('Información', 'El calculo se ha Bloqueado', 'info'); }
                else { $.messager.alert('Información', 'El calculo se ha Desbloqueado', 'info'); }
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

