$(document).ready(function () {
    $.extend($.fn.panel.methods, {
        showMask: function (jq, msg) {
            return jq.each(function () {
                var pal = $(this).panel('panel');
                if (pal.css('position').toLowerCase() != 'absolute') {
                    pal.css('position', 'relative');
                }
                var borderSize = parseInt(pal.css('padding')) + 1;
                var m = pal.children('div.panel-mask');
                if (!m.length) {
                    m = $('<div class="panel-mask"></div>').appendTo(pal);
                }
                m.css({
                    background: '#fff',
                    left: borderSize,
                    top: (borderSize + pal.children('.panel-header')._outerHeight()),
                    right: borderSize,
                    bottom: borderSize
                });
                m.children('div.panel-mask-msg').remove();
                var mm = $('<div class="panel-mask-msg"></div>').appendTo(m);
                mm.html(msg).css({ position: 'absolute' }).css({
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -mm._outerHeight() / 2,
                    marginLeft: -mm._outerWidth() / 2
                })
            });
        },
        hideMask: function (jq) {
            return jq.each(function () {
                $(this).panel('panel').children('div.panel-mask').remove();
            })
        }
    });
    $.fn.enterKey = function (fnc) {
        return this.each(function () {
            $(this).keypress(function (ev) {
                var keycode = (ev.keyCode ? ev.keyCode : ev.which);
                if (keycode == '13') {
                    fnc.call(this, ev);
                }
            })
        })
    }

    $("#txtusu").focus();

    $("#txtusu").keypress(function (event) {
        if (event.which == 13) {
            $("#txtpas").focus();
        }
    });

    $("#txtpas").keypress(function (event) {
        if (event.which == 13) {
            Entrar();
        }
    });

    $('#btnentrar').bind('click', function () { Entrar(); });

});

function Entrar() {
    var parametros = {};
    parametros.strusuario = $('#txtusu').val();
    parametros.strcontraseña = $('#txtpas').val();   
    $.ajax({
        type: "POST",
        url: 'Login.aspx/Iniciar_Sesion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //$('#loading').show();    
            $('#dlg').dialog('showMask', 'Cargando');  // display the loading message
        },
        success: function (data) {
            if (data.d[0] == "1") {
               $.messager.alert('Error', data.d[1], 'error');            
            }
            else {
                IR_PAGINA('file/sistema/menu.aspx', '');
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            //$('#loading').hide();   
            $('#dlg').dialog('hideMask');  // hide the loading message
            $.messager.alert('Error', jqXHR.responseText, 'error');            
        },
        complete: function () {
            //$('#loading').hide(100);
            $('#dlg').dialog('hideMask');  // hide the loading message
        }
    });
}


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