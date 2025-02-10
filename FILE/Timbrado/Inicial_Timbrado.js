var TipoNom = "";
var Quin = "";

$(document).ready(function () {
    var quin = $_GET('Quin');
    if (quin != undefined) { Quin = quin; }
    else { Quin = ''; }
    var tiponom = $_GET('TN');
    if (tiponom != undefined) { TipoNom = tiponom; }
    else { TipoNom = ''; }

    $.extend($.fn.tree.methods, {
        removeAll: function (jq) {
            return jq.each(function () {
                var roots = $(this).tree('getRoots');
                for (var i = roots.length - 1; i >= 0; i--) {
                    $(this).tree('remove', roots[i].target);
                }
            })
        },
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        }
    })
    $.extend($.fn.datagrid.methods, {
        getChecked: function (jq) {
            var rr = [];
            var rows = jq.datagrid('getRows');
            jq.datagrid('getPanel').find('div.datagrid-cell-check input:checked').each(function () {
                var index = $(this).parents('tr:first').attr('datagrid-row-index');
                rr.push(rows[index]);
            });
            return rr;
        }
    });

    if (TipoNom != "") {
        $('#dquincenas').hide();
        $('#dnomina').show();

        document.getElementById('lblquin').innerHTML = "Quincena " + Quin + " Seleccionada"
    }
    else {
        Quin = "";
        TipoNom = "";
        $('#dquincenas').show();
        $('#dnomina').hide();
        document.getElementById('lblquin').innerHTML = "";
    }
    
    CARGAR_FECHAS_HISTORIA();
   
    TXTFOCUS('#txtquincenas');

    $('#tquincenas').tree({
        onClick: function (node) {
            if (node.name != 0) {
                $('#loading').show();
                $('#dquincenas').hide();
                $('#dnomina').show();                  
                $('#loading').hide();
                document.getElementById('lblquin').innerHTML = "Quincena " + node.text + " Seleccionada"
            }
        }
    });

    $('#btnNomina').bind('click', function () {
        Quin = (SELCCIONAR_NODO_TREE('#tquincenas') != null) ? SELCCIONAR_NODO_TREE('#tquincenas') : Quin;
        IR_PAGINA('Procesar_Nomina.aspx', 'Quin=' + Quin +'&TN=Nom');
    });
    $('#btnAsimilados').bind('click', function () {
        Quin = (SELCCIONAR_NODO_TREE('#tquincenas') != null) ? SELCCIONAR_NODO_TREE('#tquincenas') : Quin;
        IR_PAGINA('Procesar_Nomina_Externa.aspx', 'Quin=' + Quin +'&TN=Ind');
    });

    $('#btnRegresar').bind('click', function () {
        Quin = "";
        TipoNom = "";
        $('#dquincenas').show();
        $('#dnomina').hide();  
        LIMPIAR_NODE_TREE('#tquincenas','No');        
    });
});


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

function CARGAR_FECHAS_HISTORIA() {
    //var parametros = {};
    //parametros.bloqueo = "0";
    //parametros.ano = '';
    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Listar_Quincenas',
        //data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                var obj = jQuery.parseJSON(data.d[1]);
                $('#tquincenas').tree({
                    data: obj,
                    formatter: function (node) {
                        return '<span title=\'' + node.name + '-' + node.attributes + '\' class=\'easyui-tooltip\'>' + node.name + '</span>';
                    },
                });
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    //  .fail(function (jqXHR, textStatus, errorThrown) {
    //if (jqXHR.status === 0) {

    //    alert('Not connect: Verify Network.');

    //} else if (jqXHR.status == 404) {

    //    alert('Requested page not found [404]');

    //} else if (jqXHR.status == 500) {

    //    alert('Internal Server Error [500].', +jqXHR.errorThrown + ' ' + jqXHR.textStatus);

    //} else if (textStatus === 'parsererror') {

    //    alert('Requested JSON parse failed.');

    //} else if (textStatus === 'timeout') {

    //    alert('Time out error.');

    //} else if (textStatus === 'abort') {

    //    alert('Ajax request aborted.');

    //} else {
    //    alert('Uncaught Error: ' + jqXHR.responseText);

    //}
    // });

}
