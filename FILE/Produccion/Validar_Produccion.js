var quin="",tipoquin="";
$(document).ready(function () {
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

    $('#dgerrores').hide();

    $('#btnActualizar').bind('click', function () { VALIDAR_PRODUCCION(); });

    FILTRAR_TREE_TXT('#txtquincenas', '#tquincenas');

    $('#btnHistoria').bind('click', function () { tipoquin = "H"; CARGAR_FECHAS_HISTORIA('#btnHistoria'); });
    $('#btnActual').bind('click', function () {
        tipoquin = "A"; $('#tquincenas').tree('removeAll');
        VALIDAR_PRODUCCION();
        //document.location = "Generar_Produccion.aspx?quin=" + quin + "&tipoquin=" + tipoquin;
    });

    $('#tquincenas').tree({
        onClick: function (node) {
            if (node.name != 0) {
                quin=node.name;
                VALIDAR_PRODUCCION();
            }
        }
    });
});

function VALIDAR_PRODUCCION() {
    if (quin == "") { quin = 'Actual'; }
    var parametros = {};
    parametros.quincena = quin;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Validar',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[1] != "0") {
                obj = $.parseJSON(data.d[0]);
                
                $('#dvalidaciones').show();
                $('#dmenu').hide();

                LISTAR_VALIDACIONES(obj);
            }
            else {                
                document.location = "Generar_Produccion.aspx?quin="+quin+"&tipoquin="+tipoquin;
            }
            //document.location = "Generar_Produccion.aspx?quin=" + quin + "&tipoquin=" + tipoquin;
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

function LISTAR_VALIDACIONES() {
    $('#dgvalidaciones').datagrid({
        data: obj,        
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        onClickRow: function () {
            var rows = $('#dgvalidaciones').datagrid('getSelected');
            MOSTRAR_LISTA_ERRORES(rows.id);
        }
    });
}

function MOSTRAR_LISTA_ERRORES(id) {
    var parametros = {};
    parametros.strid = id;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Errores',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[1] != "0") {
                obj = $.parseJSON(data.d[0]);
                CREAR_GRID_ERRORES(obj, data.d[1]);
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

function CREAR_GRID_ERRORES(obj, strcolumnas) {
    var colStruct = [];
    var colItems = [];

    var columnas = strcolumnas.split('|');
    for (var c = 0; c < columnas.length; c++) {
        var valores = columnas[c].split(',');
        var menuItem = {
            field: valores[0],
            align: valores[1],
            title: valores[2],
            halign: valores[3],
            width: valores[4],
        }
        colItems.push(menuItem);
    }
    colStruct.push(colItems);

    $('#dgerrores').show();

    $('#dgerrores').datagrid({
        columns: colStruct,
        data: obj,        
        scrollbar: true,
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10       
    });


}

function CARGAR_FECHAS_HISTORIA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.bloqueo = "0";
        parametros.año = '';
        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Listar_Quincenas',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != 'No') {
                    var obj = jQuery.parseJSON(data.d[0]);
                    $('#tquincenas').tree({
                        data: obj,
                        formatter: function (node) {
                            return '<span title=\'' + node.name+'-'+node.attributes + '\' class=\'easyui-tooltip\'>' + node.name + '</span>';
                        },
                    });
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
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