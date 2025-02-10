var valnomina = "";
$(document).ready(function () {
    //CARGAR_FECHAS_HISTORIA();
    Listar_BloqueosDesbloqueos()
    $('#btnBloqueo').bind('click', function () { BloquearDesbloquearQuincena('#btnBloqueo', 1); });
    $('#btnDesbloqueo').bind('click', function () { BloquearDesbloquearQuincena('#btnDesbloqueo', 0); });

    //$('#tquincenas').tree({
    //    onClick: function (node) {
    //        if (node.name != 0) {
    //            quincena = node.text;
    //            if (node.attributes == "True")
    //            { $('#btnBloqueo').linkbutton({ selected: true }); }
    //            else { $('#btnDesbloqueo').linkbutton({ selected: true }); }
    //        }
    //    }
    //});
});
//$(window).load(function () {
//    SACAR_NOMINAS();
//});

function CARGAR_FECHAS_HISTORIA() {
    var parametros = {};
    parametros.bloqueo = '';
    parametros.año = '';
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Quincenas_Cancelacion',
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
                $('#btnDesbloqueo').linkbutton({ disabled: false });
                $('#btnBloqueo').linkbutton({ disabled: false });

                var obj = jQuery.parseJSON(data.d[0]);
                $('#tquincenas').tree({
                    data: obj
                });
            }
            else {
                $('#btnDesbloqueo').linkbutton({ disabled: true });
                $('#btnBloqueo').linkbutton({ disabled: true });
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

function BloquearDesbloquearQuincena(btnobj, valor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.valor = valor;
        parametros.quin = quincena;
        parametros.tipo = "C";
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Cancelaciones",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (valor == 1)
                { $.messager.alert('Información', 'Las Cancelaciones se han Bloqueado', 'info'); }
                else { $.messager.alert('Información', 'Las Cancelaciones se han Desbloqueado', 'info'); }
                //CARGAR_FECHAS_HISTORIA();
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
    parametros.modulo = 'Cancelacion';    
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos_Cancelaciones",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            if (data.d[0] == "No") {                            
                $('#btnDesbloqueo').linkbutton({ selected: true });
                $('#btnBloqueo').linkbutton({ selected: false });
            }
            else {
                $('#btnBloqueo').linkbutton({ selected: true });
                $('#btnDesbloqueo').linkbutton({ selected: false });
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

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
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
            //$('#loading').hide(100);
        }
    });
}

function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            //text: objm[b].nomquin,
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
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: true,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
            Listar_BloqueosDesbloqueos(this.name);
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            $nominasel = btn[0].text;
            valnomina = btn[0].name;
            Listar_BloqueosDesbloqueos(btn[0].name);
        }
    }
}

function BloquearDesbloquear(btnobj, valor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.valor = valor;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Cancelaciones",
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