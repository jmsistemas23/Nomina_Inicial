var cveconsulta;
var tablaseleccionada = false;

$(document).ready(function () {
    if ($_GET('consulta') != null) {
        cveconsulta = $_GET('consulta');
    } else { cveconsulta = '1'; }

    document.getElementById('lblconsulta').innerHTML = "Consulta Seleccionada: " + cveconsulta;

    $('#btnRegresar').bind('click', function () {
        document.location = "Catalogo_Consultas.aspx.aspx";
    });

    $('#tvtablas').tree({
        onCheck: function (node) {
            var ch = node.checked;
            if ((ch == true) && (tablaseleccionada == false)) {
                CARGAR_TABLA_SELECCIONADA(node);
                tablaseleccionada = false;
            }
            else {
                if ((ch == false) && (tablaseleccionada == false))
                { QUITAR_TABLA_SELECCIONADA(node); }
                tablaseleccionada = false;
            }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    CARGAR_TABLA_SELECCIONADA(node);
                }
                else
                    if (ch == true) { QUITAR_TABLA_SELECCIONADA(node); }
            }
        }
    });
});

function CARGAR_TABLA_SELECCIONADA(node) {
    $('#txtBTablas').textbox('setValue', '');
    $('#tvtablas').tree('doFilter', '');

    var vdraggable = $('<div id="dg' + node.name + '" class="easyui-draggable" data-options="onDrag:onDrag,handle:\'#' + node.name + '\'" style="width:20%;height:60%;background:#fafafa;border:1px solid #ccc;overflow:hidden;">');
    var title = $('<div id="' + node.name + '" style="padding:5px;background:#ccc;color:#fff">' + node.text + '</div>');
    $(vdraggable).append(title);
    var vdiv = $('<div id="d' + node.name + '" class="easyui-panel" style="width:100%;height:100%; overflow:scroll;"></div>');
    $(vdraggable).append(vdiv);
    var vtree = $('<ul id="tv' + node.name + '" class="easyui-tree" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false">');
    $(vdiv).append(vtree);

    $("#paneldrop").append(vdraggable);
    vdraggable.draggable().resizable();

    CARGAR_COLUMNAS_NOMBRE_TABLAS('#tv' + node.name, node.name);
    tablaseleccionada = true;
    $('#tvtablas').tree('check', node.target);

}
function QUITAR_TABLA_SELECCIONADA(node) {
    tablaseleccionada = true;
    var t = $('#tvtablas');
    var snode = t.tree('getSelected');
    if (snode != null) {
        t.tree('uncheck', snode.target);
        t.tree('unselect', snode.target);
    }

    var tri = $('#tv' + node.name).tree('getRoots');
    for (var n = 0; n < tri.length; n++) {
        if (tri[n].checked == true) {
            var rows = $('#dgcamsel').datagrid('getRows');
            for (var p = 0; p < $('#dgcamsel').datagrid('getData').total; p++) {
                if (tri[n].name == rows[p].Campo) {
                    $('#dgcamsel').datagrid('deleteRow', p);
                }
            }
        }
    }
    $('#tvcamtbl').tree('removeAll');
    $('#dg' + node.name).draggable().remove();
}

function CARGAR_COLUMNAS_NOMBRE_TABLAS(tvobj, tabla) {
    var makesArray = [];
    var parametros = {};
    parametros.tabla = tabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Columnas_NombreTabla',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj,
                onCheck: function (node) {
                    var tabla = tvobj.substring(3, tvobj.length);
                    var ch = node.checked;
                    if ((ch == true) && (camposeleccionado == false)) {
                        CARGAR_COLUMNAS_TABLA(tvobj, tabla, node);
                        camposeleccionado = false;
                    }
                    else
                        if ((ch == false) && (camposeleccionado == false)) {
                            QUITAR_COLUMNAS_TABLA(tvobj, node);
                            camposeleccionado = false;
                        }
                },
                onClick: function (node) {
                    var tabla = tvobj.substring(3, tvobj.length);
                    if (node.name != "") {
                        var ch = node.checked;
                        if ((ch == undefined) || (ch == false)) {
                            CARGAR_COLUMNAS_TABLA(tvobj, tabla, node);
                            camposeleccionado = false;
                        }
                        else
                            if (ch == true) { QUITAR_COLUMNAS_TABLA(tvobj, node); }
                    }
                },
                onLoadSuccess: function () {
                    //var tri = $(tvobj).tree('getRoots');
                    //for (var h = 0; h < tri.length; h++) {                       
                    //    $(tvobj).tree('uncheck', tri[h].target);
                    //    $(tvobj).tree('unselect', tri[h].target);
                    //}                                                            
                    var objdiseño = $.session.get('ocolumnas');
                    if (objdiseño != undefined) {
                        camposeleccionado = true;
                        var tri = $(tvobj).tree('getRoots');
                        var nomtabla = tvobj.substring(3, tvobj.length);
                        var strdiseño = objdiseño.split("|");
                        for (var t = 0; t < strdiseño.length; t++) {
                            var strtabla = strdiseño[t].split(":");
                            if (nomtabla == strtabla[0]) {
                                var strcol = strtabla[1].split(",");
                                for (var c = 0; c < strcol.length; c++) {
                                    for (var h = 0; h < tri.length; h++) {
                                        if (strcol[c] == tri[h].text) {
                                            $(tvobj).tree('check', tri[h].target)
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); camposeleccionado = false; }
    });
}

function LISTAR_TABLAS_SISTEMA(tobj, objdiseño) {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Tablas_Consulta',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);

            if (objdiseño != "") {
                var tablas = objdiseño.split(',');
            }
            $('#paneldrop').panel('clear');
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    if (objdiseño != "") {
                        var tri = $(tobj).tree('getRoots');
                        for (var t = 0; t < tablas.length; t++) {
                            var nomtabla = tablas[t].split(':');
                            for (var h = 0; h < tri.length; h++) {
                                if (nomtabla[0] == tri[h].name) {
                                    $(tobj).tree('check', tri[h].target);
                                    // CREAR_TABLAS(nomtabla[0], nomtabla[1], objcolumnas);
                                    break;
                                }
                            }
                        }
                    }
                }
            });
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
