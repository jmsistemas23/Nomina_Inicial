var clave = "";
var nombre = "";
var objformatos = "";
var reporte = "";
var idusuario = "";

$(document).ready(function () {
    idusuario = 6;//localStorage.getItem('idusuario');

    $.extend($.fn.tree.methods, {
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        },
        removeAll: function (jq) {
            return jq.each(function () {
                var roots = $(this).tree('getRoots');
                for (var i = roots.length - 1; i >= 0; i--) {
                    $(this).tree('remove', roots[i].target);
                }
            })
        }
    });

    LISTAR_FORMATOS();

    $('#btnLimpiar').bind('click', function () { LIMPIAR(); });

    $('#lstformatos').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                clave = node.Id;
                nombre = node.text;
                reporte=node.target.innerText;                            
                CARGAR_REPORTE(reporte);               
            }
        }
    });
    
});


function LISTAR_FORMATOS() {
    var parametros = {};
    parametros.idusuario = idusuario;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Reportes',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            objformatos = jQuery.parseJSON(data.d[0]);            
            $('#lstformatos').tree({
                data: objformatos
            });
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_REPORTE(reporte)
{
   
        $('#btnImprimir').linkbutton({ disabled: false });
       
        var parametros = {};
        parametros.nomreporte = reporte;
        $.ajax({
            type: "POST",
            url: "Visor_ReportesGrupal.aspx/Cargar_Reportes",
            data: JSON.stringify(parametros),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                alert('good');
            }
        });
   
}



function LIMPIAR() {
    var t = $('#lstformatos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }

    $('#btnImprimir').linkbutton({ disabled: true });
}
