var checkedRows = [];
var error = "";
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

    $('#ttblsistema').tree({       
        onClick: function (node) {            
            CARGAR_COLUMNAS_TABLAS('#tcampos', node);           
            CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos');           
        }
    });
    
    FILTRAR_TREE_TXT('#txttblsistema', '#ttblsistema');
    FILTRAR_TREE_TXT('#txtcampos', '#tcampos');
    LISTAR_TABLAS_SISTEMA('#ttblsistema');

    $('#tcampos').tree({
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcampos', node);
                if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
            }
            else
                if (ch == false) { QUITAR_CAMPO_SELECCIONADO(node); }
        },
        onClick: function (node) {         
            var ch = node.checked;           
            if ((ch == undefined) || (ch == false)) {
                var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcampos', node);
                if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
            }
        }
    });

    $('#btnGuardar').bind('click', function () {
        GUARDAR_CONFIGURACION('#btnGuardar');
        CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos');
    });
    $('#btnEliminar').bind('click', function () { ELIMINAR_CONFIGURACION('#btnEliminar'); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_CONFIGURACION('#btnLimpiar'); });
    

    $('#dgcampos').datagrid({       
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: true,
        selectOnCheck: true,
        onCheckAll: function () {
            checkedRows = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onCheck: onCheck,
        onUncheck: onUncheck       
    });
   

});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].nom_camp == row.nom_camp) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].nom_camp == row.nom_camp) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function LIMPIAR_TREE(tobj, quitarseleccion, quitarfiltro, eliminar) {
    var t = $(tobj);
    if (quitarseleccion == 'Si') {
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
    }
    else
        if (eliminar == 'Si')
        { t.tree('removeAll'); }
        else
            if (quitarfiltro == 'Si')
            { t.tree('doFilter', ''); }
}

function MARCAR_DESMARCAR_NODE(tobj, nodo) {
    var ch = nodo.checked;
    if ((ch == undefined) || (ch == false)) { $(tobj).tree('check', nodo.target); }
    else if (ch == true) { $(tobj).tree('uncheck', nodo.target); }
}

function LISTAR_TABLAS_SISTEMA(tobj) {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Tablas_Sistema',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' +  node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {                   
                    //    var tri = $(tobj).tree('getRoots');                       
                    //        for (var h = 0; h < tri.length; h++) {
                    //            if (nomtabla[0] == tri[h].name) {
                    //                $(tobj).tree('check', tri[h].target);                                    
                    //                break;
                    //            }                            
                    //    }
                    //}
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

function CARGAR_CAMPOS(dgobj,nodo) {    
        $('#loading').show();       
        var parametros = {};
        parametros.strcondicion = nodo.text;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Cargar_Lista_Campos",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                // $('#loading').show();
            },
            success: function (data) {
                var obj = $.parseJSON(data.d[0]);                
                $(dgobj).datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    pageSize: 20,
                    checkOnSelect: false,
                    selectOnCheck: false,                   
                    beforeSend: function () {
                        // $('#loading').show();
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function () {
                        //   $('#loading').hide(100);                       
                    }
                });
                MARCAR_NODO_GRID('#tcampos', '#dgcampos');
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () {
                //  $('#loading').hide(100);
            }
        });
        $('#loading').hide(100);
  
}

function AGREGAR_NODO_TREE(tobj,nodo)
{
    objlstcampos = [];
    listacampos = { id: "", name: "", text: "" };
    var tri = $(tobj).tree('getRoots');
   
    listacampos.id = tri.length + 1;
    listacampos.name = nodo.text;
    listacampos.text = nodo.text;
    objlstcampos.push(listacampos);
   
    $(tobj).tree('insert', {
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\''  + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
    });
    $('#ttblsistema').tree('check', nodo.target);
}

function ELIMINAR_NODO_SELECCIONADO(tobj, nodo)
{
    var tri = $(tobj).tree('getRoots');                       
        for (var h = 0; h < tri.length; h++) {
            if (nodo.text == tri[h].name) {
                $(tobj).tree('remove', tri[h].target);
                break;
            }
        }
     $('#ttblsistema').tree('uncheck', nodo.target);
}

function BUSCAR_NODO_TREE(tobj, nodo)
{
    var tri = $(tobj).tree('getRoots');
    if (tri.length != 0) {

        var NivelesArray = jQuery.grep(tri, function (nodos, i) {
            return nodos.text == nodo.text;
        });
        if (NivelesArray.length == 0) {
            AGREGAR_NODO_TREE(tobj, nodo);
        }        
    }
    else { AGREGAR_NODO_TREE(tobj, nodo); }
}

function MARCAR_NODO_GRID(tvobj,dgobj) {
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    var tri = $(tvobj).tree('getRoots');
    for (var t = 0; t < total; t++) {
        for (var h = 0; h < tri.length; h++) {
            if (rows[t].nom_camp == tri[h].text) {
                $(tvobj).tree('check', tri[h].target)
                break;
            }
        }
    }
}

function CARGAR_COLUMNAS_TABLAS(tvobj, nodo) {
    var parametros = {};
    parametros.strtabla = nodo.text;
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
                data: obj
                //onLoadSuccess: function () {
                //    var rows = $('#dgcampos').datagrid('getRows');
                //    var tri = $(tvobj).tree('getRoots');
                //    for (var t = 0; t < rows.length; t++) {
                //        for (var h = 0; h < tri.length; h++) {
                //            if (rows[t].Campo == tri[h].name) {
                //                $(tvobj).tree('check', tri[h].target)
                //                break;
                //            }
                //        }
                //    }
                //}
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

function BUSCAR_ELEMENTROAGREGADO_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].nom_camp) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}

function CARGAR_CAMPO_SELECCIONADO(node) {
    var dg = $('#dgcampos');
    var total = dg.datagrid('getData').total;
    var rowIndex = "";
    var row = dg.datagrid('getSelected');
    rowIndex = dg.datagrid("getRowIndex", row);
    if (row==null)
    {        
       dg.datagrid('insertRow', {
            index: total,
              row: {
                    nom_camp: node.name,
                    desc_camp: node.text,
                    CampoAnt: ''
                }
            });
            dg.datagrid('endEdit', total);
            dg.datagrid('beginEdit', total);
            dg.datagrid('checkRow', total);
            $('#tcampos').tree('unselect', node.target);
            $('#tcampos').tree('check', node.target);     
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[rowIndex].des_cam, function (r) {
            if (r) {
               
                dg.datagrid('checkRow', rowIndex);

                dg.datagrid('updateRow', {
                    index: rowIndex,
                    row: {
                        nom_camp: node.name,
                        desc_camp: node.text,
                        CampoAnt: dg.datagrid('getRows')[rowIndex].nom_camp
                    }
                });
                dg.datagrid('endEdit', rowIndex);
                dg.datagrid('beginEdit', rowIndex);                

                var nodes = $('#tcampos').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[rowIndex].CampoAnt)
                    { $('#tcampos').tree('uncheck', nodes[i].target); }
                }               
                $('#tcampos').tree('check', node.target);
                $('#tcampos').tree('unselect', node.target);
            }
            else {
                dg.datagrid('uncheckAll', rowIndex);
                $('#tcampos').tree('uncheck', node.target);
                $('#tcampos').tree('unselect', node.target);
            }          
            //$('#dgcampos').datagrid('unselectAll');
            //$('#dgcampos').datagrid('unselectRow', rowIndex);
        });
    }

    $('#txtcampos').textbox('setValue', '');
    //$('#tcampos').tree('unselect', node.target);

    if (dg.datagrid('getData').total == 0) {
        $('#btnGuardar').linkbutton({ disabled: true });
        dg.datagrid({ checkOnSelect: false, selectOnCheck: false });
    }
    else {
        $('#btnGuardar').linkbutton({ disabled: false });
    }
   
}
function QUITAR_CAMPO_SELECCIONADO(node) {
    var dg = $('#dgcampos');
    var rows = dg.datagrid('getRows');
    for (var p = 0; p < dg.datagrid('getData').total; p++) {
        if (node.name == rows[p].nom_camp) {
            dg.datagrid('deleteRow', p);
            var t = $('#tcampos');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    
}

function CAMPOS_CONFIGURACION_MOVIMIENTOS(dgobj) {
    var t = $('#ttblsistema');
    var node = t.tree('getSelected');
    var parametros = {};
    parametros.tabla = node.name; 
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_Lista_Campos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);

            if (obj.length > 0) {              
                $('#btnGuardar').linkbutton({ disabled: false });
                $('#btnEliminar').linkbutton({ disabled: false });
                $('#dgcampos').datagrid({ checkOnSelect: true, selectOnCheck: true });
            }
            else {                               
                $('#btnGuardar').linkbutton({ disabled: true });
                $('#btnEliminar').linkbutton({ disabled: true });
                $('#dgcampos').datagrid({ checkOnSelect: false, selectOnCheck: false });
            }
            $(dgobj).datagrid({
                data: obj,               
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
                    //$('#dgcampos').datagrid('checkRow', index);
                },
            });

            total = $('#dgcampos').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcampos').datagrid('beginEdit', r);
            }                    
            var rows = $(dgobj).datagrid('getRows');
            var tri = $('#tcampos').tree('getRoots');
            for (var t = 0; t < rows.length; t++) {
                for (var h = 0; h < tri.length; h++) {
                    if (rows[t].nom_camp == tri[h].name) {
                        $('#tcampos').tree('check', tri[h].target)
                        break;
                    }
                }
            }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function GUARDAR_CONFIGURACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var campos = ""; var lstcampos = "", columnas = "", valores = "";
        $('#btnEliminar').linkbutton({ disabled: false });       

        var t = $('#ttblsistema');
        var node = t.tree('getSelected');
        $('#dgcampos').datagrid('acceptChanges');

        var fields = $('#dgcampos').datagrid('getColumnFields', true).concat($('#dgcampos').datagrid('getColumnFields', false));

        if (checkedRows.length > 0) {
           
            for (var f = 0; f < checkedRows.length; f++) {
                if ((checkedRows[f].CampoAnt != undefined) && (checkedRows[f].CampoAnt != ""))
                { campo = checkedRows[f].CampoAnt; }
                else
                { campo = checkedRows[f].nom_camp; }

                campos = ""; columnas = ""; valores = "";
                for (var c = 1; c < fields.length; c++) {
                    var strcam = fields[c];
                    if ((strcam != 'CampoAnt') && (strcam != 'id')) {
                        var valor = checkedRows[f][fields[c]];
                        if (valor == 'Si') { valor = 1; }
                        if (valor != undefined) {
                            valores += "''" + valor + "'',";
                            campos += fields[c] + "=''" + valor + "'',";
                        }
                        else {
                            valores += "'''',";
                            campos += fields[c] + "='''',";
                        }
                    }
                }
                valores = valores.substring(0, valores.length - 1);
                campos = campos.substring(0, campos.length - 1);
                INSERTAR_CAMPOS_CAPTURA(node.name, valores, campos, campo);                
            }

            if (error == "0") {
                $.messager.alert('Información', "Campos Guardado Correctamente", 'info');
                checkedRows = [];
                $('#loading').hide(100);
            }           
        }
        else { $.messager.alert('Error', "Falta seleccionar el registro a guardar", 'error'); }

        var dg = $('#dgcampos');
        total = dg.datagrid('getData').total;
        for (var r = 0; r < total; r++) {
            $('#dgcampos').datagrid('beginEdit', r);
            $('#dgcampos').datagrid('uncheckAll', f);
        }        
    }
}
function INSERTAR_CAMPOS_CAPTURA(tabla,valores, campos, campo) {    
    var parametros = {};
    parametros.tabla = tabla;    
    parametros.valores = valores;
    parametros.campos = campos;    
    parametros.campo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Campos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {               
                error = "1"; $.messager.alert('Error', data.d[1], 'error');
            }
            else { error = "0"; }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () { //$('#loading').hide(100); 
        }
    });

    //if (error == "0") { $('#dgcampos').datagrid({ checkOnSelect: true, selectOnCheck: true }); }
}

//guardar la configuracion de los campos de captura
function ELIMINAR_CONFIGURACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {               
        $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
            if (r) {
                var rows = $('#dgcampos').datagrid('getSelections');            
                if (rows.length > 0) {
                    var t = $('#ttblsistema');
                    var node = t.tree('getSelected');
                    var tri = $('#tcampos').tree('getRoots');
                    for (var f = 0; f < rows.length; f++) {
                            for (var h = 0; h < tri.length; h++) {
                                if (rows[f].nom_camp == tri[h].name) {
                                    var rowIndex = $('#dgcampos').datagrid("getRowIndex", rows[f]);
                                    $('#dgcampos').datagrid('deleteRow', rowIndex);
                                    ELIMINAR_CAMPO_MOVIMIENTOS(rows[f].nom_camp, node.name);
                                    $('#tcampos').tree('uncheck', tri[h].target)                                    
                                    break;
                                }
                            }                                               
                    }
                    if ($('#dgcampos').datagrid('getData').total == 0)
                    {
                        $('#dgcampos').datagrid('unselectAll');
                        $('#btnGuardar').linkbutton({ disabled: true });
                        $('#btnEliminar').linkbutton({ disabled: true });
                        $('#dgcampos').datagrid({ checkOnSelect: false, selectOnCheck: false })
                    }
                    else{
                        $('#btnGuardar').linkbutton({ disabled: false });
                        $('#btnEliminar').linkbutton({ disabled: false });
                        $('#dgcampos').datagrid({ checkOnSelect: true, selectOnCheck: true })
                    }                    
                }
                else {
                    total = dg.datagrid('getData').total;
                    for (var r = 0; r < total; r++) {
                        dg.datagrid('beginEdit', r);
                    }
                    $.messager.alert('Error', 'Falta marcar el campo a eliminar', 'error');
                }
            }
        });
    }
}
function ELIMINAR_CAMPO_MOVIMIENTOS(campo,tabla) {   
    var parametros = {};
    parametros.tabla = tabla;    
    parametros.campo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Eliminar_Campos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LIMPIAR_CONFIGURACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#tcampos').tree('removeAll');
        $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });
        $('#btnGuardar').linkbutton('disable');
        $('#btnEliminar').linkbutton('disable');

        var t = $('#ttblsistema');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
    }
}


