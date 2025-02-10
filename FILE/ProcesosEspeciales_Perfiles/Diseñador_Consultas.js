var idperfil = 0;
var desperfil = "";
var tablaseleccionada = false;
var camposeleccionado = false;
var checkedRowsCol = [];
var editIndex = undefined;

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

    if ($_GET('idperfil') != null) {
        idperfil = $_GET('idperfil');
    } else { idperfil = ''; }


    if ($_GET('desperfil') != null) {
        desperfil = $_GET('desperfil');
    } else { desperfil = ''; }

   

    //cargar el diseño general de la consulta
    CARGAR_DISEÑO_GENERAL();

    document.getElementById('lblperfil').innerHTML = "Perfil Seleccionado: " + desperfil;

    $('#btnRegresar').bind('click', function () {
       // document.location = "Catalogo_Perfiles.aspx";
        IR_PAGINA("Catalogo_Perfiles.aspx", "");
    });

    FILTRAR_TREE_TXT('#txtBTablas', '#tvtablas');
    FILTRAR_TREE_TXT('#txttablas', '#ttblsistemas');
    FILTRAR_TREE_TXT('#txtcamvalor', '#tvcamvalor');
    FILTRAR_TREE_TXT('#txtcamtexto', '#tvcamtexto');

    FILTRAR_TREE_TXT('#txtcampo', '#tvcampos');
    FILTRAR_TREE_TXT('#txtcondicion', '#tvcondicion');
    FILTRAR_TREE_TXT('#txtvalbuscar', '#tvvalor');

    $('#tvcampos').tree({
        onClick: function (node) {
            if (node.name != "") {
                if (node.attributes != "")
                { CARGAR_CATALOGO('#tvvalor', node.attributes); }
            }
        }
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

    //$('#tcampos').tree({
    //    onCheck: function (node) {
    //        var ch = node.checked;
    //        if (ch == true) {
    //            var dg = $('#dgcolumnas');
    //            var cellcampo = dg.datagrid('cell');
    //            if (cellcampo != null)
    //            { CARGAR_CAMPO_SELECCIONADO(node); }
    //            else
    //            {
    //                var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcolumnas', node);
    //                if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
    //            }
    //        }
    //        if (ch == false) { QUITAR_CAMPO_SELECCIONADO(node); }
    //    },
    //    onClick: function (node) {
    //        if (node.name != "") {
    //            var ch = node.checked;
    //            if ((ch == undefined) || (ch == false)) {
    //                var dg = $('#dgcolumnas');
    //                var cellcampo = dg.datagrid('cell');
    //                if (cellcampo != null)
    //                { CARGAR_CAMPO_SELECCIONADO(node); cellcampo = ""; }
    //                else {
    //                    var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcolumnas', node);
    //                    if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
    //                }
    //            }
    //            if (ch == true) { QUITAR_CAMPO_SELECCIONADO(node); }
    //        }
    //    }
    //});

    $('#btnGenerarRelaciones').bind('click', function () { GENERAR_RELACIONES('#btnGenerarRelaciones'); });

    $('#btnCatalogo').bind('click', function () { VENTANA_CATALOGO('#btnCatalogo'); });
    $('#btnACatalogo').bind('click', function () { ACEPTAR_CATALOGO('#btnACatalogo'); });
    $('#btnLCatalogo').bind('click', function () { LIMPIAR_CATALOGO('#btnLCatalogo'); });
    $('#btnECatalogo').bind('click', function () { ELIMINAR_CATALOGO('#btnECatalogo'); });

    //$('#btnActualizarVista').bind('click', function () { VISTA_PREVIA('#dgvista'); });

    $('#dgcamsel').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgcondicion').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgcondicion').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            editIndex = index;
        }
        //onEndEdit: onEndEdit,
    });

    $('#dgcamsel').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false
        //onBeforeEdit: function (index, row) {
        //    $('#dgcamsel').datagrid('beginEdit', index);  
        //}
    });

    //$('#dgcolumnas').datagrid({
    //    pagination: false,
    //    enableFilter: false,
    //    rownumbers: true,
    //    singleSelect: true,
    //    striped: true,
    //    checkOnSelect: false,
    //    selectOnCheck: false,
    //    onBeforeEdit: function (index, row) {
    //        row.editing = true;
    //        $('#dgcolumnas').datagrid('checkRow', index);
    //    },
    //});

    $('#ttblsistemas').tree({
        onClick: function (node) {
            if (node.text != 0) {
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', node.text);
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', node.text);
            }
        }
    });

    $('#btnGuardarConsulta').bind('click', function () {
        ACEPTAR_DISEÑO_CONSULTA('#btnGuardarConsulta');
    });

    $('#btnLconsulta').bind('click', function () {
        LIMPIAR_DISEÑO_CONSULTA();
        CARGAR_DISEÑO_GENERAL();
    });


    //$('#btnLVistaPrevia').bind('click', function () {
    //    LIMPIAR_VISTAPREVIA();
    //});

   

    $('#btnLRelacion').bind('click', function () {
        LIMPIAR_CONFIGURACION_CONSULTA();
        CARGAR_CONFIGURACION_CONSULTA();
    });

    $('#btnLCondicion').bind('click', function () {
        LIMPIAR_CONDICION();
        CARGAR_DISEÑO_CONDICION();
    });

    //$('#btnLimpiarProceso').bind('click', function () {
    //    LIMPIAR_CONSULTA_PROCESO();
    //    CARGAR_DISEÑO_PROCESO();
    //});
    //$('#btnGuardarProceso').bind('click', function () { ACEPTAR_DISEÑO_PROCESO('#btnGuardarProceso'); });

    $('#btnEDiseño').bind('click', function () { ELIMINAR_DISEÑO_PROCESO('#btnEDiseño'); });

    $('#btnECondicion').bind('click', function () { ELIMINAR_CONDICION('#btnECondicion'); });
    $('#btnACondicion').bind('click', function () { AGREGAR_CONDICION('#btnACondicion'); });

    //$('#btnVistaPrevia').bind('click', function () { VISTA_PREVIA('#dgvista'); });

});

$(window).load(function () {
    //cargar las condiciones de busqueda
    CARGAR_CONDICIONES('#tvcondicion');
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

function OrdenarColumnas(a, b) {
    var aName = parseInt(a.Orden);
    var bName = parseInt(b.Orden);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function onCheckCol(index, row) {
    for (var i = 0; i < checkedRowsCol.length; i++) {
        if (checkedRowsCol[i].Campo == row.Campo) {
            return
        }
    }
    checkedRowsCol.push(row);
}
function onUncheckCol(index, row) {
    for (var i = 0; i < checkedRowsCol.length; i++) {
        if (checkedRowsCol[i].Campo == row.Campo) {
            checkedRowsCol.splice(i, 1);
            return;
        }
    }
}

function onClickCell(index, field) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#dgcondicion').datagrid('selectRow', index)
                .datagrid('beginEdit', index);
            var ed = $('#dgcondicion').datagrid('getEditor', { index: index, field: field });
            if (ed) {
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            editIndex = index;
        } else {
            setTimeout(function () {
                $('#dgcondicion').datagrid('selectRow', editIndex);
            }, 0);
        }
    }
}



function BUSCAR_ELEMENTROAGREGADO_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}
function CARGAR_CAMPO_SELECCIONADO(node) {
    var total = $('#dgcolumnas').datagrid('getData').total;

    var dg = $('#dgcolumnas');
    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                Campo: node.name,
                Titulo: node.text,
                Orden: total + 1,
                CampoCap: node.attributes + "," + node.name
            }
        });
        dg.datagrid('checkRow', total);
        $('#tcampos').tree('unselect', node.target);
        $('#tcampos').tree('check', node.target);
        dg.datagrid('beginEdit', total);
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[cellcampo.index].Campo, function (r) {
            if (r) {
                dg.datagrid('checkRow', cellcampo.index);

                dg.datagrid('updateRow', {
                    index: cellcampo.index,
                    row: {
                        Campo: node.name,
                        Titulo: node.text,
                        CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo,
                        CamposCap: node.attributes + "," + node.name
                    }
                });
                dg.datagrid('endEdit', cellcampo.index);
                dg.datagrid('beginEdit', cellcampo.index);

                var nodes = $('#tcampos').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].CampoAnt)
                    { $('#tcampos').tree('uncheck', nodes[i].target); }
                }
                $('#tcampos').tree('check', node.target);
                $('#tcampos').tree('unselect', node.target);
            }
            else {
                dg.datagrid('uncheckAll', cellcampo.index);
                $('#tcampos').tree('uncheck', node.target);
                $('#tcampos').tree('unselect', node.target);
            }
        });
    }

    $('#txtcampos').textbox('setValue', '');
    $('#tcampos').tree('unselect', node.target);

    if ($('#dgcolumnas').datagrid('getData').total > 0) { $('#btnGuardarProceso').linkbutton({ disabled: false }); }

}
function QUITAR_CAMPO_SELECCIONADO(node) {
    var dg = $('#dgcolumnas');
    var rows = dg.datagrid('getRows');
    for (var p = 0; p < dg.datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            dg.datagrid('deleteRow', p);
            var t = $('#tcampos');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    if ($('#dgcolumnas').datagrid('getData').total == 0) { $('#btnGuardarProceso').linkbutton({ disabled: true }); dg.datagrid('uncheckAll', dg.datagrid('getData').total); }
}


function CARGAR_CONDICIONES(tobj) {
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };

    listacampos.name = "=";
    listacampos.text = "Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "!=";
    listacampos.text = "Diferente";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Like";
    listacampos.text = "Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Not Like";
    listacampos.text = "No Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "LikeIni";
    listacampos.text = "Inicie con";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "In";
    listacampos.text = "En Valor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Not In"
    listacampos.text = "No en Valor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = ">"
    listacampos.text = "Mayor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = ">="
    listacampos.text = "Mayor Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<"
    listacampos.text = "Menor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<="
    listacampos.text = "Menor Igual";
    objlstcampos.push(listacampos);


    $(tobj).tree({
        data: objlstcampos
    });
}

function CARGAR_LISTA_CAMPOS_CONSULTA(tobj, objcolumnas) {
    var objlstcampos = [];
    for (var c = 0; c < objcolumnas.length; c++) {
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.name = objcolumnas[c].Campo;
        lstcampos.text = objcolumnas[c].Campo;
        objlstcampos.push(lstcampos);
    }
    $(tobj).tree({
        data: objlstcampos,
        onLoadSuccess: function () {
            var rows = $('#dgcolumnas').datagrid('getRows');
            var tri = $(tobj).tree('getRoots');
            for (var t = 0; t < rows.length; t++) {
                for (var h = 0; h < tri.length; h++) {
                    if (rows[t].Campo == tri[h].text) {
                        $(tobj).tree('check', tri[h].target);
                        break;
                    }
                }
            }
        }
    });
}

function CARGAR_LISTA_CAMPOS_SELECCIONADOS(dgobj, objcolumnas) {
    var objlstcampos = [];
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });

    var total = $(dgobj).datagrid('getData').total;
    var strcolumnas = objcolumnas.split(",");
    for (var c = 0; c < strcolumnas.length; c++) {
        var columnas = strcolumnas[c].split(".");
        $(dgobj).datagrid('insertRow', {
            index: c,
            row: {
                Orden: c + 1,
                Campo: columnas[1],
                Titulo: columnas[1],
                CampoAnt: ''
            }
        });
        $(dgobj).datagrid('beginEdit', c);

        var edorden = $(dgobj).datagrid('getEditor', { index: c, field: 'Orden' })
        $(edorden.target).textbox('textbox').css('textAlign', 'center')
        //var OrdVista = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdVista' })
        //$(OrdVista.target).textbox('textbox').css('textAlign', 'center')
        //var OrdProceso = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdProceso' })
        //$(OrdProceso.target).textbox('textbox').css('textAlign', 'center')
    }
}

function DISEÑO_PROCESO(dgobj, objproceso) {
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    $(dgobj).datagrid({
        data: objproceso,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        //onCheck: onCheckCol,
        //onUncheck: onUncheckCol,
        beforeSend: function () {
            // $('#loading').show();
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            // $('#loading').hide(100);
        }
    });
    for (var c = 0; c < objproceso.length; c++) {
        $(dgobj).datagrid('beginEdit', c);

        var edorden = $(dgobj).datagrid('getEditor', { index: c, field: 'Orden' })
        $(edorden.target).textbox('textbox').css('textAlign', 'center')
        //var OrdVista = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdVista' })
        //$(OrdVista.target).textbox('textbox').css('textAlign', 'center')
        //var OrdProceso = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdProceso' })
        //$(OrdProceso.target).textbox('textbox').css('textAlign', 'center')
    }
}

function DISEÑO_VISTAPREVIA(dgobj, objproceso) {
    var colStruct = [];
    var colItems = [];
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    for (var c = 0; c < objproceso.length; c++) {

        var menuItem = {
            field: objproceso[c].Campo,
            title: objproceso[c].Titulo,
            //width: objproceso[2],
            //align: objproceso[3],
            //halign: objproceso[4],
        }
        colItems.push(menuItem);
    }
    colStruct.push(colItems);

    $(dgobj).datagrid({
        columns: colStruct,
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        pagination: true,
        striped: true,
        pageSize: 20,
    });

}

function CARGAR_CAMPOS_CONSULTA() {
    var ocolumnas = "";
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var ocolumnas = $.parseJSON(data.d[0]);
            var odiseño = $.parseJSON(data.d[1]);

            odiseño.sort(OrdenarColumnas);
            if (odiseño.length > 0) {
                //$('#btnGuardarConsulta').linkbutton({ disabled: false });
                $('#btnOrdCondicion').linkbutton({ disabled: false });
            }
            else {
                //$('#btnGuardarConsulta').linkbutton({ disabled: true });
                $('#btnOrdCondicion').linkbutton({ disabled: true });
            }

            $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
            $('#dgcamsel').datagrid({
                data: odiseño,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
                checkOnSelect: false,
                selectOnCheck: false,
                onCheck: onCheckCol,
                onUncheck: onUncheckCol,
                beforeSend: function () {
                    $('#loading').show();
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () {
                    $('#loading').hide(100);
                },
                onBeforeEdit: function (index, row) {
                    row.editing = true;
                    $('#dgcamsel').datagrid('checkRow', index);
                },
            });
            var total = $('#dgcamsel').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcamsel').datagrid('beginEdit', r);
                var edorden = $('#dgcolumnas').datagrid('getEditor', { index: r, field: 'Orden' })
                $(edorden.target).textbox('textbox').css('textAlign', 'center')
                var edlong = $('#dgcolumnas').datagrid('getEditor', { index: r, field: 'Longitud' })
                $(edlong.target).textbox('textbox').css('textAlign', 'center')
                var edordbus = $('#dgcolumnas').datagrid('getEditor', { index: r, field: 'OrdenBusqueda' })
                $(edordbus.target).textbox('textbox').css('textAlign', 'center')
            }
            $('#tvcolconsulta').tree('removeAll');
            if (ocolumnas.length > 0) {

                //cargar la lista de los campos seleccionados 
                if (ocolumnas[0].consultabusqueda_columnas != "") {
                    CARGAR_LISTA_CAMPOS_CONSULTA('#tvcolconsulta', ocolumnas[0].consultabusqueda_columnas);
                }

                //var $datagrid = {};
                //var columns = new Array();
                //var columnas = ocolumnas[0].consultabusqueda_longitudcolumnas.split('|');
                //if (columnas[0] != "") {
                //    columnasvista = true;
                //    for (var col = 0; col < columnas.length; col++) {
                //        datos = columnas[col].split(',');
                //        var valor = datos[0];
                //        var titulo = datos[1];
                //        var alinear = datos[2];
                //        var ancho = datos[3] + "px";

                //        //columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                //        columns.push({ "field": valor, "title": titulo, "align": alinear });
                //    }
                //    $datagrid.columns = new Array(columns);
                //    $('#dgvista').datagrid({ columns: "", url: "" });
                //    $('#dgvista').datagrid($datagrid);
                //}
                //else { columnasvista = false; }
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

function CARGAR_CONDICION(dgobj, objdiseño) {
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });

    var strcondicion = objdiseño.split("|");
    if (strcondicion[0] != "") {
        for (var c = 0; c < strcondicion.length; c++) {
            $(dgobj).datagrid('insertRow', {
                index: c,
                row: {
                    Condicion: strcondicion[c]
                }
            });
        }
        // $(dgobj).datagrid('beginEdit', c);
    }
}

function CARGAR_COLUMNAS_CONSULTA(dgobj) {

    var objlstcampos = [];
    var total = $(dgobj).datagrid('getData').total;
    for (var c = 0; c < total; c++) {
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.text = $(dgobj).datagrid('getRows')[c].Campo;
        lstcampos.name = $(dgobj).datagrid('getRows')[c].Tabla + "." + $(dgobj).datagrid('getRows')[c].Campo;
        if ($(dgobj).datagrid('getRows')[c].Query != "")
        { lstcampos.attributes = $(dgobj).datagrid('getRows')[c].CatTexto + "|" + $(dgobj).datagrid('getRows')[c].CatValor + "|" + $(dgobj).datagrid('getRows')[c].Query; }
        else { lstcampos.attributes = ""; }
        objlstcampos.push(lstcampos);
    }
    var t = $('#tvcampos');
    t.tree('removeAll');

    $('#tvcampos').tree({
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
    });
}

function LIMPIAR_DISEÑO_CONSULTA() {
    LIMPIAR_NODECHK_TREE('#tvtablas', '');
    $('#paneldrop').panel('clear');
    $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgcondicion').datagrid('loadData', { "total": 0, "rows": [] });
    $('#txtrelacion').textbox('setValue', '');
    $('#dgvista').datagrid('loadData', { "total": 0, "rows": [] });
    $('#txtcampo').textbox('setValue', '');
    $('#txtcondicion').textbox('setValue', '');
    $('#txtvalbuscar').textbox('setValue', '');
    var t = $('#tvcampos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tvcondicion');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tvvalor');
    t.tree('removeAll');
}

function LIMPIAR_CONFIGURACION_CONSULTA() {
    LIMPIAR_NODECHK_TREE('#tvtablas', '');
    $('#paneldrop').panel('clear');
    $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
    $('#txtrelacion').textbox('setValue', '');
}

function LIMPIAR_CONDICION() {
    $('#dgcondicion').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgvista').datagrid('loadData', { "total": 0, "rows": [] });
    $('#txtcampo').textbox('setValue', '');
    $('#txtcondicion').textbox('setValue', '');
    $('#txtvalbuscar').textbox('setValue', '');
    var t = $('#tvcampos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tvcondicion');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tvvalor');
    t.tree('removeAll');
}

function LIMPIAR_CONSULTA_PROCESO() {
    LIMPIAR_NODECHK_TREE('#tcampos', '');
    $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });
}

function LIMPIAR_VISTAPREVIA() {
    $('#dgvista').datagrid('loadData', { "total": 0, "rows": [] });
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
            // $('#loading').show();
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
            //$('#loading').hide(100);
        }
    });
}

//CARGAR EL DISEÑO GENERAR DEL CONSULTA Y PROCESO
function CARGAR_DISEÑO_GENERAL() {
    var odiseño = "";
    var ocolumnas = "";
    var oproceso = "";
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            odiseño = $.parseJSON(data.d[0]);
            ocolumnas = $.parseJSON(data.d[1]);
            oproceso = $.parseJSON(data.d[2]);

            //cargar las tablas del sistemas y marcar las usadas para el diseño de la consulta
            LISTAR_TABLAS_SISTEMA('#tvtablas', odiseño[0].DiseñoConsulta_Tablas);

            if (ocolumnas.length > 0) {
                consulta_cargada = true;


                //cargar el diseño de la condicion
                CARGAR_CONDICION('#dgcondicion', odiseño[0].DiseñoConsulta_Condiciones);

                $.session.set('ocolumnas', odiseño[0].DiseñoConsulta_ColumnasTablas);

                $('#txtrelacion').textbox('setValue', odiseño[0].consultabusqueda_tabla);

                camposeleccionado = true;
                $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
                $('#dgcamsel').datagrid({
                    data: ocolumnas,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    pageSize: 20,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    onCheck: onCheckCol,
                    onUncheck: onUncheckCol,
                });


                //cargar la lista de campos seleccionados para la condicion
                CARGAR_COLUMNAS_CONSULTA('#dgcamsel');

                var total = $('#dgcamsel').datagrid('getData').total;
                for (var r = 0; r < total; r++) {
                    $('#dgcamsel').datagrid('beginEdit', r);
                }

                $('#tvcolconsulta').tree('removeAll');

                //if (oproceso.length != "") {
                //    DISEÑO_PROCESO('#dgcolumnas', oproceso);
                //    DISEÑO_VISTAPREVIA('#dgvista', oproceso);
                //    $('#btnGuardarProceso').linkbutton({ disabled: false });
                //}
                //else { $('#btnGuardarProceso').linkbutton({ disabled: true }); }

                //CARGAR_LISTA_CAMPOS_CONSULTA('#tcampos', ocolumnas);

                // $('#btnGuardarConsulta').linkbutton({ disabled: false });
            }
            // else { $('#btnGuardarConsulta').linkbutton({ disabled: true }); }


        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function CARGAR_DISEÑO_VISTAPREVIA() {
    var odiseño = "";
    var ocolumnas = "";
    var oproceso = "";
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            oproceso = $.parseJSON(data.d[2]);
            if (oproceso.length != "") {
                DISEÑO_VISTAPREVIA('#dgvista', oproceso)
            }
            $('#dgvista').datagrid({
                url: "Vista_Previa.aspx?idperfil=" + idperfil
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

//CARGAR DISEÑO DEL PROCESO
function CARGAR_DISEÑO_PROCESO() {
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //$('#loading').show();
        },
        success: function (data) {
            var oproceso = $.parseJSON(data.d[2]);
            var ocolumnas = $.parseJSON(data.d[1]);

            if (oproceso.length > 0) {
                DISEÑO_PROCESO('#dgcolumnas', oproceso);

                CARGAR_LISTA_CAMPOS_CONSULTA('#tcampos', ocolumnas);

                $('#btnGuardarProceso').linkbutton({ disabled: true });
            }
            else { $('#btnGuardarProceso').linkbutton({ disabled: false }); }

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            // $('#loading').hide(100);
        }
    });
}

//CARGAR DISEÑO DE CONSULTA
function CARGAR_CONFIGURACION_CONSULTA() {
    var odiseño = "";
    var ocolumnas = "";
    var oproceso = "";
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            odiseño = $.parseJSON(data.d[0]);
            ocolumnas = $.parseJSON(data.d[1]);

            //cargar las tablas del sistemas y marcar las usadas para el diseño de la consulta
            LISTAR_TABLAS_SISTEMA('#tvtablas', odiseño[0].DiseñoConsulta_Tablas);

            if (ocolumnas.length > 0) {
                $.session.set('ocolumnas', odiseño[0].DiseñoConsulta_ColumnasTablas);

                $('#txtrelacion').textbox('setValue', odiseño[0].consultabusqueda_tabla);


                $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
                $('#dgcamsel').datagrid({
                    data: ocolumnas,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    pageSize: 20,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    onCheck: onCheckCol,
                    onUncheck: onUncheckCol,
                });


                //cargar la lista de campos seleccionados para la condicion
                CARGAR_COLUMNAS_CONSULTA('#dgcamsel');

                var total = $('#dgcamsel').datagrid('getData').total;
                for (var r = 0; r < total; r++) {
                    $('#dgcamsel').datagrid('beginEdit', r);
                }

                $('#tvcolconsulta').tree('removeAll');

                CARGAR_LISTA_CAMPOS_CONSULTA('#tcampos', ocolumnas);

                $('#btnGuardarConsulta').linkbutton({ disabled: false });
            }
            else { $('#btnGuardarConsulta').linkbutton({ disabled: true }); }


        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

//CARGAR DISEÑO CONDICION
function CARGAR_DISEÑO_CONDICION() {
    var odiseño = "";
    var ocolumnas = "";
    var oproceso = "";
    var parametros = {};
    parametros.idperfil = idperfil;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            odiseño = $.parseJSON(data.d[0]);

            if (odiseño.length > 0) {
                //cargar el diseño de la condicion
                CARGAR_CONDICION('#dgcondicion', odiseño[0].DiseñoConsulta_Condiciones);

                //cargar la lista de campos seleccionados para la condicion
                CARGAR_COLUMNAS_CONSULTA('#dgcamsel');

                //$('#btnGuardarConsulta').linkbutton({ disabled: false });
            }
            //else { $('#btnGuardarConsulta').linkbutton({ disabled: true }); }

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}



function onDrag(e) {
    var d = e.data;
    if (d.left < 0) { d.left = 0 }
    if (d.top < 0) { d.top = 0 }
    if (d.left + $(d.target).outerWidth() > $(d.parent).width()) {
        d.left = $(d.parent).width() - $(d.target).outerWidth();
    }
    if (d.top + $(d.target).outerHeight() > $(d.parent).height()) {
        d.top = $(d.parent).height() - $(d.target).outerHeight();
    }
}

function getCheckedTbl(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].name + ':' + nodes[i].text);
        ss.join(',');
    }
    return ss;
}

function CARGAR_COLUMNAS_TABLAS(tvobj, strcampo, id) {
    var parametros = {};
    parametros.strtabla = id;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Columnas_Tablas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj,
                onLoadSuccess: function () {
                    var rows = $('#dgcamsel').datagrid('getRows');
                    var tri = $(tvobj).tree('getRoots');
                    for (var t = 0; t < rows.length; t++) {
                        for (var h = 0; h < tri.length; h++) {
                            if (strcampo == 'valor') {
                                if (rows[t].catalogoseleccionvalor == tri[h].text) {
                                    $(tvobj).tree('select', tri[h].target)
                                    break;
                                }
                            }
                            else {
                                if (rows[t].catalogoselecciontexto == tri[h].text) {
                                    $(tvobj).tree('select', tri[h].target)
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
        complete: function ()
        { $('#loading').hide(100); }
    });
}
function CARGAR_TABLAS_SISTEMAS(catalogoseleccion, cvecat, txtcat) {
    var obj = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Tablas_Sistema',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);

            $('#ttblsistemas').tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    var tri = $('#ttblsistemas').tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        if (catalogoseleccion == tri[h].text) {
                            $('#ttblsistemas').tree('select', tri[h].target)
                            break;
                        }
                    }
                }
            });
            $('#tvcamvalor').tree('removeAll');
            $('#tvcamtexto').tree('removeAll');

            var t = $('#ttblsistemas');
            var tabla = t.tree('getSelected');
            if (tabla != null) {
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', tabla.text);
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', tabla.text);
            }
            var tri = $('#tvcamvalor').tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                if (cvecat == tri[h].text) {
                    $('#tvcamvalor').tree('select', tri[h].target)
                    break;
                }
            }
            var tri = $('#tvcamtexto').tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                if (txtcat == tri[h].text) {
                    $('#tvcamtexto').tree('select', tri[h].target)
                    break;
                }
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

function CARGAR_COLUMNAS_TABLA(tvobj, tabla, node) {
    var total = -1;
    camposeleccionado = true;
    $(tvobj).tree('check', node.target);
    total = $('#dgcamsel').datagrid('getData').total;
    if ($('#dgcamsel').datagrid('getData').total > 0)
    { total + 1; }
    else { total = 0; }

    $('#dgcamsel').datagrid('insertRow', {
        index: total,
        row: {
            Tabla: tabla,
            Campo: node.name
        }
    });
    $('#dgcamsel').datagrid('beginEdit', total);
}
function QUITAR_COLUMNAS_TABLA(tvobj, node) {
    var rows = $('#dgcamsel').datagrid('getRows');
    for (var p = 0; p < $('#dgcamsel').datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $('#dgcamsel').datagrid('deleteRow', p);
            var t = $(tvobj);
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
}


function CARGAR_TABLA_SELECCIONADA(node) {
    $.session.set('ocolumnas', '');
    $('#txtBTablas').textbox('setValue', '');
    $('#tvtablas').tree('doFilter', '');

    var vdraggable = $('<div id="dg' + node.name + '" class="easyui-draggable" data-options="onDrag:onDrag,handle:\'#' + node.name + '\'" style="width:20%;height:60%;background:#fafafa;border:2px solid #ccc;overflow:hidden;">');
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

function CARGAR_COLUMNA_SELECCIONADA(node) {

    var total = $('#dgcolumnas').datagrid('getData').total;

    var dg = $('#dgcolumnas');
    var cell = dg.datagrid('cell');
    if (cell == null) {
        $('#dgcolumnas').datagrid('insertRow', {
            index: total,
            row: {
                Campo: node.text,
                Orden: total + 1,
                Titulo: node.text,
                Alineacion: 'Centro',
                Longitud: 15,
                Visible: true,
                OrdenBusqueda: total + 1
            }
        });
        $('#tvcolconsulta').tree('unselect', node.target);
        $('#tvcolconsulta').tree('check', node.target);
        dg.datagrid('beginEdit', total);
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[cell.index].Campo, function (r) {
            if (r) {
                dg.datagrid('checkRow', cell.index);

                dg.datagrid('updateRow', {
                    index: cell.index,
                    row: {
                        Campo: node.name,
                        Titulo: node.text,
                        CampoAnt: dg.datagrid('getRows')[cell.index].Campo,
                    }
                });
                dg.datagrid('endEdit', cell.index);
                dg.datagrid('beginEdit', cell.index);

                var nodes = $('#tvcolconsulta').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cell.index].CampoAnt)
                    { $('#tvcolconsulta').tree('uncheck', nodes[i].target); }
                }
                $('#tvcolconsulta').tree('check', node.target);
                $('#tvcolconsulta').tree('unselect', node.target);
            }
            else {
                dg.datagrid('uncheckAll', cell.index);
                $('#tvcolconsulta').tree('uncheck', node.target);
                $('#tvcolconsulta').tree('unselect', node.target);
            }
        });
    }
    $('#txtcolconsulta').textbox('setValue', '');
    $('#tvcolconsulta').tree('unselect', node.target);



}
function QUITAR_COLUMNA_SELECCIONADA(node) {
    var rows = $('#dgcolumnas').datagrid('getRows');
    for (var p = 0; p < $('#dgcolumnas').datagrid('getData').total; p++) {
        if (node.text == rows[p].Campo) {
            $('#dgcolumnas').datagrid('deleteRow', p);
            var t = $('#tvcolconsulta');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
}

function CARGAR_CAMPOTABLA_SELECCIONADO(node) {
    $('#tvcamtbl').tree('check', node.target);

    if (total = $('#dgcamsel').datagrid('getData').total > 0)
    { total = $('#dgcamsel').datagrid('getData').total + 1; }
    else { total = 0; }

    $('#dgcamsel').datagrid('insertRow', {
        index: total,
        row: {
            campo: node.name
        }
    });
    $('#txtcamtbl').textbox('setValue', '');
    $('#tvcamtbl').tree('doFilter', '');


}
function QUITAR_CAMPOTABLA_SELECCIONADO(node) {
    var rows = $('#dgcamsel').datagrid('getRows');
    for (var p = 0; p < $('#dgcamsel').datagrid('getData').total; p++) {
        if (node.name == rows[p].campo) {
            $('#dgcamsel').datagrid('deleteRow', p);
            var t = $('#tvcamtbl');
            var snode = t.tree('getSelected');
            t.tree('uncheck', snode.target);
            t.tree('unselect', snode.target);
        }
    }
}


function GENERAR_RELACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tablasseleccionadas = "";
        //sacar las tablas seleccionadas
        tablasseleccionadas = getCheckedName('#tvtablas');

        var parametros = {};
        parametros.tablasseleccionadas = tablasseleccionadas;
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Generar_Relaciones',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
                else
                {
                    $('#txtrelacion').textbox('setValue', '');
                    $('#txtrelacion').textbox('setValue', data.d[1]);
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

function VENTANA_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamsel');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            LIMPIAR_CATALOGO('#btnLCatalogo');

            var indice = cell.index;
            var row = dg.datagrid('getRows')[indice];
            $('#txttablas').textbox('setValue', row.Catalogo);
            $('#lblcatalogo').text('Campo Seleccionado: ' + row.Campo);
            CARGAR_TABLAS_SISTEMAS(row.Catalogo, row.CatValor, row.CatTexto);
            windows("#wcatalogo", 700, 350, false, 'Relación del Campos Catálogo');
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}

function ACEPTAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var relacion = "";
        var t = $('#ttblsistemas');
        var tabla = t.tree('getSelected');
        if (tabla.text == "") { $.messager.alert('Error', 'Falta seleccionar la tabla', 'error'); return 0; }
        else
            var t = $('#tvcamvalor');
        var camvalor = t.tree('getSelected');
        if (camvalor.text == "") { $.messager.alert('Error', 'Falta seleccionar el campo valor', 'error'); return 0; }
        else
            var t = $('#tvcamtexto');
        var camtexto = t.tree('getSelected');
        if (camtexto.text == "") { $.messager.alert('Error', 'Falta seleccionar el campor texto', 'error'); return 0; }
        else
        {
            var dg = $('#dgcamsel');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                var indice = cell.index;
                $('#dgcamsel').datagrid('updateRow', {
                    index: indice,
                    row: {
                        Catalogo: tabla.text,
                        CatTexto: camtexto.text,
                        CatValor: camvalor.text,
                        Query: "Select * From " + tabla.text + " where " + camtexto.text + "!='' and " + camvalor.text + "!= '' Order by " + camtexto.name
                    }
                });
                $('#dgcamsel').datagrid('endEdit', indice);
                $('#dgcamsel').datagrid('beginEdit', indice);
                $("#wcatalogo").window('close');
            }
        }
    }
}

function LIMPIAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#ttblsistemas');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#ttblsistemas').tree('doFilter', '');

        $('#txttablas').textbox('setValue', '');
        $('#txtcamvalor').textbox('setValue', '');
        $('#txtcamtexto').textbox('setValue', '');

        $('#tvcamvalor').tree('removeAll');
        $('#tvcamtexto').tree('removeAll');
    }
}

function ELIMINAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamsel');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcamsel').datagrid('updateRow', {
                index: indice,
                row: {
                    Catalogo: "",
                    CatTexto: "",
                    CatValor: "",
                    Query: ""
                }
            });
            $('#dgcamsel').datagrid('endEdit', indice);
            $('#dgcamsel').datagrid('beginEdit', indice);
        }
    }
}

//GUARDAR EL DISEÑO DE LA CONSULTA
function ACEPTAR_DISEÑO_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var objlstcampos = [];
        var camposeleccionados = "", campoconsulta = ""; var campoorden = ""; var campocondicion = "", campoconfiguracion = "", diccamcon = "";
        var tablasseleccionadas = ""; var tbl = "", diseñocondicion = "";

        //sacar las tablas seleccionadas
        tablasseleccionadas = getCheckedTbl('#tvtablas');

        //cerrar la edicion del grid
        $('#dgcamsel').datagrid('acceptChanges');



        var total = $('#dgcamsel').datagrid('getData').total;
        if (total > 0) {
            tbl = $('#dgcamsel').datagrid('getRows')[0].Tabla;
            for (var c = 0; c < total; c++) {

                //sacar la lista de los campos de cada tabla seleccionada
                if (c == 0) { camposeleccionados += tbl + ":" }
                if (tbl != $('#dgcamsel').datagrid('getRows')[c].Tabla) {
                    tbl = $('#dgcamsel').datagrid('getRows')[c].Tabla;
                    camposeleccionados = camposeleccionados.substring(0, camposeleccionados.length - 1);
                    camposeleccionados += "|" + tbl + ":";
                }
                campoconsulta += $('#dgcamsel').datagrid('getRows')[c].Tabla + "." + $('#dgcamsel').datagrid('getRows')[c].Campo + ",";
                //discamcon += $('#dgcamsel').datagrid('getRows')[c].campo + ",";
                camposeleccionados += $('#dgcamsel').datagrid('getRows')[c].Campo + ",";


                //sacar la configuracion de la consulta
                var orden = ""; var tipoorden = "", catalogo = "", catvalor = "", cattexto = "", catquery = "";
                if ($('#dgcamsel').datagrid('getRows')[c].Orden == "Si") { orden = 'Si'; }
                if ($('#dgcamsel').datagrid('getRows')[c].Tipo != undefined) { tipoorden = $('#dgcamsel').datagrid('getRows')[c].Tipo; }
                if ($('#dgcamsel').datagrid('getRows')[c].Catalogo != undefined) { catalogo = $('#dgcamsel').datagrid('getRows')[c].Catalogo; }
                if ($('#dgcamsel').datagrid('getRows')[c].CatTexto != undefined) { cattexto = $('#dgcamsel').datagrid('getRows')[c].CatTexto; }
                if ($('#dgcamsel').datagrid('getRows')[c].CatValor != undefined) { catvalor = $('#dgcamsel').datagrid('getRows')[c].CatValor; }
                if ($('#dgcamsel').datagrid('getRows')[c].Query != undefined) { catquery = $('#dgcamsel').datagrid('getRows')[c].Query.replace(/'/g, "''''''''"); }

                campoconfiguracion += $('#dgcamsel').datagrid('getRows')[c].Tabla + "," + $('#dgcamsel').datagrid('getRows')[c].Campo + "," + orden + "," + tipoorden + "," + catalogo + "," + cattexto + "," + catvalor + "," + catquery + "|";

                //sacar el orden de los campos
                if ($('#dgcamsel').datagrid('getRows')[c].Orden != undefined) {
                    if ($('#dgcamsel').datagrid('getRows')[c].Orden == "Si")
                    { campoorden += $('#dgcamsel').datagrid('getRows')[c].Tabla + "." + $('#dgcamsel').datagrid('getRows')[c].Campo + " " + $('#dgcamsel').datagrid('getRows')[c].Tipo + ","; }
                }
            }
        }
        //else { $.messager.alert('Error', 'Falta seleccionar los campos de la tabla seleccionada', 'error'); }

        if (camposeleccionados.length > 0) {
            camposeleccionados = camposeleccionados.substring(0, camposeleccionados.length - 1);
            campoconsulta = campoconsulta.substring(0, campoconsulta.length - 1);
            campoconfiguracion = campoconfiguracion.substring(0, campoconfiguracion.length - 1);
        }

        //sacar las condiciones de la consulta
        var rows = $('#dgcondicion').datagrid('getRows');
        var total = $('#dgcondicion').datagrid('getData').total;
        for (i = 0; i < total; i++) {
            var encontrado = rows[i].Condicion.indexOf("'");
            if (encontrado > 0) {
                campocondicion += ReplaceAll(rows[i].Condicion, "'", "''''") + " ";
                diseñocondicion += rows[i].Condicion.replace(/'/g, "''''") + "|";
            }
            else {
                campocondicion += rows[i].Condicion + " ";
                diseñocondicion += rows[i].Condicion + "|";
            }
        }
        if (campocondicion.length > 0) {
            campocondicion = campocondicion.substring(0, campocondicion.length - 1);
            diseñocondicion = diseñocondicion.substring(0, diseñocondicion.length - 1);
        }

        //seleccionar el campo de busqueda de la configuracion
        var campo = $('#tvcambusqueda').tree('getSelected');

        if ($('#txtrelacion').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta generar las relaciones de las tablas', 'error'); }
        else
        {
            if (campoorden.length > 0) {
                campoorden = campoorden.substring(0, campoorden.length - 1);

                //insertar el diseño de la consulta en la tabla
                INSERTAR_DISEÑO_CONSULTA(campoconsulta, $('#txtrelacion').textbox('getValue'), campocondicion, campoorden, tablasseleccionadas.toString(), camposeleccionados, campoconfiguracion, diseñocondicion);
            }
            else { $.messager.alert('Error', 'Falta seleccionar el campo de orden de la consulta', 'error'); $('#loading').hide(); }
        }

        total = $('#dgcamsel').datagrid('getData').total;
        for (var r = 0; r < total; r++) {
            $('#dgcamsel').datagrid('beginEdit', r);
        }
    }
}

//guardar el diseño de la consulta
function INSERTAR_DISEÑO_CONSULTA(CampoConsulta, RelacionConsulta, CampoCondicion, CampoOrden, DisTablas, ColTablas, ColConfig, Condiciones) {
    var parametros = {};
    parametros.idperfil = idperfil;
    parametros.consulta = CampoConsulta;
    parametros.relaciones = RelacionConsulta;
    parametros.condicion = CampoCondicion;
    parametros.orden = CampoOrden;
    parametros.tablas = DisTablas;
    parametros.columnas = ColTablas;
    parametros.configuracion = ColConfig;
    parametros.condiciones = Condiciones;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Consulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else {
                error = "0"; $.messager.alert('Información', data.d[1], 'info');

                CARGAR_DISEÑO_PROCESO();

                $('#loading').hide(100);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#loading').hide(100);
            $.messager.alert('Error', xhr.statusText, 'error');
        },
        complete: function () {
            //$('#loading').hide(100);
        }
    });
}

//GUARDAR EL DISEÑO DEL PROCESO
function ACEPTAR_DISEÑO_PROCESO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var configuracion = "", Orden = "", Campo = "";
        //cerrar la edicion del grid
        $('#dgcolumnas').datagrid('acceptChanges');
        var total = $('#dgcolumnas').datagrid('getData').total;
        if (total > 0) {
            for (var c = 0; c < total; c++) {
                Orden = $('#dgcolumnas').datagrid('getRows')[c].Orden;
                Campo = $('#dgcolumnas').datagrid('getRows')[c].Campo;
                Titulo = $('#dgcolumnas').datagrid('getRows')[c].Titulo;
                //Vista = $('#dgcolumnas').datagrid('getRows')[c].Vista;
                //OrdVista = $('#dgcolumnas').datagrid('getRows')[c].OrdVista;
                //Proceso = $('#dgcolumnas').datagrid('getRows')[c].Proceso;
                //OrdProceso = $('#dgcolumnas').datagrid('getRows')[c].OrdProceso;
                CampoAnt = $('#dgcolumnas').datagrid('getRows')[c].CampoAnt;

                //configuracion += Orden + "," + Campo + "," + Titulo + "," + Vista + "," + OrdVista + "," + Proceso + "," + OrdProceso + "," + CampoAnt + "|";
                configuracion += Orden + "," + Campo + "," + Titulo + "|";
            }
            configuracion = configuracion.substring(0, configuracion.length - 1);

            INSERTAR_DISEÑO_PROCESO(configuracion)
            $('#loading').hide(100);

            total = $('#dgcolumnas').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcolumnas').datagrid('beginEdit', r);
            }
        }
    }
}

//guardar el diseño de la consulta
function INSERTAR_DISEÑO_PROCESO(configuracion) {
    var parametros = {};
    parametros.idperfil = idperfil;
    parametros.proceso = configuracion;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Proceso',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }

            var dgobj = $('#dgcolumnas').datagrid();
            var total = $(dgobj).datagrid('getData').total;
            for (var c = 0; c < total; c++) {
                $(dgobj).datagrid('beginEdit', c);
                var edorden = $(dgobj).datagrid('getEditor', { index: c, field: 'Orden' })
                $(edorden.target).textbox('textbox').css('textAlign', 'center')
                //var OrdVista = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdVista' })
                //$(OrdVista.target).textbox('textbox').css('textAlign', 'center')
                //var OrdProceso = $(dgobj).datagrid('getEditor', { index: c, field: 'OrdProceso' })
                //$(OrdProceso.target).textbox('textbox').css('textAlign', 'center')
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $('#loading').hide(100);
            $.messager.alert('Error', xhr.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


function VISTA_PREVIA(dgcontrol) {
    CARGAR_DISEÑO_VISTAPREVIA();
}

//eliminar el diseño del perfil de proceso
function ELIMINAR_DISEÑO_PROCESO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.idperfil = idperfil;
        parametros.tipo = 'D'
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Eliminar_Proceso',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
                else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                $('#loading').hide(100);
                $.messager.alert('Error', xhr.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
}

function getChkName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push("'" + nodes[i].name + "'");
    }
    return ss.join(',');
}


function onEndEdit(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'Condicion'
    });
    //row.importe = $(ed.target).numberbox('getText');
}

function endEditing(dgobj) {
    if (editIndex == undefined) { return true }
    if ($(dgobj).datagrid('validateRow', editIndex)) {
        $(dgobj).datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function AGREGAR_CONDICION(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var condicion = "", logico = "", vtcampos = "", vtcondicion = "", vtvalor = "", vttabla = "";

        vtcampos = $('#tvcampos').tree('getSelected');
        vtcondicion = $('#tvcondicion').tree('getSelected');
        vttabla = $('#tvtblsel').tree('getSelected');
        vtvalor = getChkName('#tvvalor');
        if (vtvalor == "")
        { vtvalor = $('#txtvalbuscar').textbox('getValue'); }

        //if (vttabla == null) { $.messager.alert('Error', 'Falta seleccionar la tabla', 'error'); return 0; }
        //else
        if (vtcampos == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else
            if (vtcondicion == null) { $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return 0; }
            else
                if (vtvalor == "") { $.messager.alert('Error', 'Falta el valor a buscar', 'error'); return 0; }
                else
                {
                    if (vtcondicion.name == 'LikeIni') {
                        condicion = vtcampos.name + ' Like \'' + vtvalor + '%\'';
                    }
                    else
                        if (vtcondicion.name == 'NoLikeIni') {
                            condicion = vtcampos.name + 'Not Like \'' + vtvalor + '%\'';
                        }
                        else
                            if (vtcondicion.name == 'Not Like') {
                                condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'%' + vtvalor + '%\'';
                            }
                            else
                                if (vtcondicion.name == 'Like') {
                                    condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'%' + vtvalor + '%\'';
                                } else
                                    if (vtcondicion.name == '=') {
                                        condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor + '';
                                    } else
                                        if (vtcondicion.name == '!=') {
                                            condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'' + vtvalor + '\'';
                                        } else
                                            if ((vtcondicion.name == 'In') || (vtcondicion.name == 'Not In')) {
                                                condicion = vtcampos.name + ' ' + vtcondicion.name + ' (' + vtvalor + ')';
                                            } else
                                                if ((vtcondicion.name == '>') || (vtcondicion.name == '<') || (vtcondicion.name == '>=') || (vtcondicion.name == '<=')) {
                                                    condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor + '';
                                                }

                    if ($('#opcY').linkbutton('options').selected) { logico = 'and'; }
                    if ($('#opcO').linkbutton('options').selected) { logico = 'or'; }

                    //$('#dgcondicion').datagrid('acceptChanges');
                    //var filas = $('#dgcondicion').datagrid('getSelected');
                    //if (filas == null) {
                    var dg = $('#dgcondicion');
                    var cell = dg.datagrid('cell');
                    if (cell == null) {
                        if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        else { condicion = logico + " " + condicion; }

                        var total = $('#dgcondicion').datagrid('getData').total;
                        $('#dgcondicion').datagrid('insertRow', {
                            index: total + 1,
                            row: {
                                Condicion: condicion,
                            }
                        });
                    }
                    else {
                        //if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        condicion = logico + " " + condicion;

                        //var rowIndex = $("#dgcondicion").datagrid("getRowIndex", filas);
                        $('#dgcondicion').datagrid('updateRow', {
                            index: cell.index,
                            row:
                                {
                                    Condicion: condicion,
                                }
                        });
                        $('#dgcondicion').datagrid('unselectRow', cell.index);
                    }

                    $('#opcY').linkbutton({ selected: false });
                    $('#opcO').linkbutton({ selected: false });
                    var t = $('#tvcampos');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                    var t = $('#tvcondicion');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                    $('#tvvalor').tree('removeAll');
                    $('#txtvalbuscar').textbox('setValue', '');
                    $('#txtcampo').textbox('setValue', '');
                    $('#txtcondicion').textbox('setValue', '');
                    $('#tvcampos').tree('doFilter', '');
                    $('#tvcondicion').tree('doFilter', '');
                    $('#tvvalor').tree('doFilter', '');
                }
    }
}

function ELIMINAR_CONDICION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //if (endEditing('#dgcondicion')) {
        //$('#dgcondicion').datagrid('endEdit', editIndex);
        //$('#dgcondicion').datagrid('acceptChanges');
        //}
        //var cell = $('#dgcondicion').datagrid('cell');
        //var indice = cell.index;
        if (editIndex != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la condición', function (r) {
                if (r) {
                    var rows = $('#dgcondicion').datagrid('getRows')[editIndex];
                    var rowIndex = $("#dgcondicion").datagrid("getRowIndex", rows);
                    $('#dgcondicion').datagrid('deleteRow', rowIndex);
                    editIndex = undefined;
                }
            })
        }
    }
}

function CARGAR_CATALOGO(tvobj, query) {
    var valores = query.split("|");
    var parametros = {};
    parametros.strquery = valores[2];
    parametros.strvalor = valores[1];
    parametros.strtexto = valores[0];
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Catalogo',
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
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_DISEÑO_CONSULTA(campobusqueda) {
    var otablas = "", ocolumnas = "", ocondicion = "", oorden = "", odiseño = "";
    if (movconfig == "") { movconfig = mov; }
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;
    parametros.campo = campobusqueda;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var odiseño = $.parseJSON(data.d[0]);
            var ocolumnas = $.parseJSON(data.d[2]);

            LISTAR_TABLAS_SISTEMA('#tvtablas', odiseño[0].DiseñoConsulta_Tablas);
            CARGAR_CONDICIONES('#tvcondicion');

            if (ocolumnas.length > 0) {
                consulta_cargada = true;
                CARGAR_CONDICION('#dgcondicion', odiseño[0].DiseñoConsulta_Condiciones);
                $.session.set('ocolumnas', odiseño[0].DiseñoConsulta_ColumnasTablas);
                $('#txtrelacion').textbox('setValue', odiseño[0].consultabusqueda_tabla);

                camposeleccionado = true;
                $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
                $('#dgcamsel').datagrid({
                    data: ocolumnas,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    pageSize: 20,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    onCheck: onCheckCol,
                    onUncheck: onUncheckCol,
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function () {
                        $('#loading').hide(100);
                    }
                });
                CARGAR_COLUMNAS_CONSULTA('#dgcamsel');
            }

            var total = $('#dgcamsel').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcamsel').datagrid('beginEdit', r);
            }

            //windows_porcentaje("#wdisconsulta", 1000, 700,true, 'Diseño de la Consulta');
            // windows_porcentaje("#wdisconsulta", 60, 80, true,true,false, 'Diseño de la Consulta');
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