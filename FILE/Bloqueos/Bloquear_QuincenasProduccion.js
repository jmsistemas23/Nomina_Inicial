var quincena = "";
$(document).ready(function () {   
    CARGAR_FECHAS_HISTORIA();
  
    $('#btnQuinBloqueo').bind('click', function () { Listar_Quincenas_Bloquedas('#btnQuinBloqueo', 1); });
    $('#btnQuinDesbloqueo').bind('click', function () { Listar_Quincenas_Bloquedas('#btnQuinDesbloqueo', 0); });

    FILTRAR_TREE_TXT('#txtquincenas', '#tquincenas');


    $('#tquincenas').tree({
        onClick: function (node) {
            if (node.name != 0) {
                quincena = node.text;
                if (node.attributes == "True")
                { $('#btnQuinBloqueo').linkbutton({ selected: true }); }
            else { $('#btnQuinDesbloqueo').linkbutton({ selected: true }); }
            }
        }
    });
});


function Listar_Quincenas_Bloquedas(btnobj,valor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.valor = valor;
        parametros.quin = quincena;
        parametros.tipo = "P";
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Quincena",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (valor == 1)
                { $.messager.alert('Información', 'La Quincena se ha Bloqueado', 'info'); }
                else { $.messager.alert('Información', 'La Quincena se ha Desbloqueado', 'info'); }
                CARGAR_FECHAS_HISTORIA();
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


function CARGAR_FECHAS_HISTORIA() {
    var parametros = {};
    parametros.bloqueo = '';
    parametros.año = '';
        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Listar_Quincenas_Bloquedas',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "") {
                    $('#btnQuinDesbloqueo').linkbutton({ disabled: false });
                    $('#btnQuinBloqueo').linkbutton({ disabled: false });

                    var obj = jQuery.parseJSON(data.d[0]);                  
                        $('#tquincenas').tree({
                            data: obj
                        });                    
                }
                else {
                    $('#btnQuinDesbloqueo').linkbutton({ disabled: true });
                    $('#btnQuinBloqueo').linkbutton({ disabled: true });
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