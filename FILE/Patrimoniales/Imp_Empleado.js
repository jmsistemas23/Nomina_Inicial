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
    CARGAR_DATOS('#dgimportes');

    $('#btnCerrar').bind('click', function () { IR_PAGINA('Entrar.aspx', ''); });
});

function CARGAR_DATOS(dgobj)
{  
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Cargar_Datos',
       // data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {            
            $('#dlg').dialog('showMask', 'Cargando');  
        },
        success: function (data) {
            var objemp = $.parseJSON(data.d[0]);
            var objdg = $.parseJSON(data.d[1]);
            var objcolumnas = $.parseJSON(data.d[2]);

            $('#txtempleado').textbox('setValue',objemp[0].empleado);
            $('#txtrfc').textbox('setValue', objemp[0].rfc_empleado);
            $('#txtnombre').textbox('setValue', objemp[0].nomemp);

            $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
            $(dgobj).datagrid({
                data: objdg,
                columns: objcolumnas.columns,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,                                       
                beforeSend: function () {
                    // $('#loading').show();
                    $('#dlg').dialog('showMask', 'Cargando'); 
                },
                error: function (err) {
                    //$('#loading').hide(100);
                    $('#dlg').dialog('hideMask'); 
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () {
                    //  $('#loading').hide(100);
                    $('#dlg').dialog('hideMask'); 
                },
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {            
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