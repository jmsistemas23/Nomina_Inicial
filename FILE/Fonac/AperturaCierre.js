var tipo = "";
$(document).ready(function () {
    CARGA_CICLO();
    $('#btnCerrar').bind('click', function () { CERRAR_CICLO('#btnCerrar'); });
});

function CERRAR_CICLO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.tipo = tipo;
        $.ajax({
            type: "POST",
            url: 'Funsiones.aspx/Cerrar_Apertura_Ciclo',
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
                var objdat = $.parseJSON(data.d[1]);
                if (objmsg[0].Error == "1") { $.messager.alert('Error', objmsg[0].Mensaje, 'error'); }
                else {
                    $.messager.alert('Información', objmsg[0].Mensaje, 'info');
                    if (tipo == "C") {
                        $('#btnCerrar').linkbutton({ text: 'Apertura', iconCls: 'icon-ok' });
                        document.getElementById('lblciclo').innerHTML = '';
                        tipo = "A";
                    }
                    else {
                        document.getElementById('lblciclo').innerHTML = objdat[0].ciclo_actual;
                        $('#btnCerrar').linkbutton({ text: 'Cerrar', iconCls: 'cerrar2' });
                        tipo = "C";                       
                    }
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

function CARGA_CICLO()
{
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/Cargar_Ciclo',      
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var objmsg = $.parseJSON(data.d[0]);
            document.getElementById('lblciclo').innerHTML = objmsg[0].ciclo_actual;
            if (objmsg[0].Estatus_actual == "C") {
                $('#btnCerrar').linkbutton({ text: 'Apertura', iconCls: 'icon-ok' });                
                tipo = "A";
            }
            else {               
                $('#btnCerrar').linkbutton({ text: 'Cerrar', iconCls: 'cerrar2' });
                tipo = "C";
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
