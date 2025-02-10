var idtabla = "",modulo="";
var destabla = "";
var checkedRowsCampos = [];
var checkedRowsVista = [];
var checkedRowsCol = [];
var tipomov = "", error = "";
var objcampos = "";
var objtbl = "";
var objvista = "";
var campofiltro = "";
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

    //idtabla = profes & tabla=PROFESION(profes) & mod=Mcat

    if ($_GET('idtabla') != null) {
        idtabla = $_GET('idtabla');
    } else { idtabla = ''; }

    if ($_GET('tabla') != null) {
        destabla = $_GET('tabla');
    } else { destabla = ''; }

    if ($_GET('mod') != null) {
        modulo = $_GET('mod');
    } else { modulo = ''; }

    document.getElementById('lblcat').innerHTML = "Catálogo Seleccionado: " + destabla;

    CARGAR_COLUMNAS_TABLAS_NAME('#tcamvista');
    CARGAR_COLUMNAS_TABLAS_NAME('#tcampos');
    CARGAR_CONFIGURACION();
   

    FILTRAR_TREE_TXT('#txtcamvista', '#tcamvista');
    FILTRAR_TREE_TXT('#txtcampos', '#tcampos');
    FILTRAR_TREE_TXT('#txttablas', '#tvtablas');
    FILTRAR_TREE_TXT('#txtcamvalor', '#tvcamvalor');
    FILTRAR_TREE_TXT('#txtcamtexto', '#tvcamtexto');
    FILTRAR_TREE_TXT('#txtBtblsist', '#tvtblsist');
    FILTRAR_TREE_TXT('#txttblsel', '#tvtblsel');
    FILTRAR_TREE_TXT('#txtcamfiltro', '#tvcamfiltro');
    FILTRAR_TREE_TXT('#txtcolizq', '#tcolizq');
    FILTRAR_TREE_TXT('#txtcolder', '#tcolder');
    FILTRAR_TREE_TXT('#txtcamcap', '#tvcamcap');
    FILTRAR_TREE_TXT('#txtcamcon', '#tvcamcon');

    FILTRAR_TREE_TXT('#txtcambusqueda', '#tvcambusqueda');
    FILTRAR_TREE_TXT('#txtcolconsulta', '#tvcolconsulta');
    FILTRAR_TREE_TXT('#txttbllist', '#tvtblsist');

  
    FILTRAR_TREE_TXT('#txtcampo', '#tvcampos');
    FILTRAR_TREE_TXT('#txtcondicion', '#tvcondicion');
    FILTRAR_TREE_TXT('#txtvalbuscar', '#tvvalor');

    FILTRAR_TREE_TXT('#txtcamcapvista', '#tcamcapvista');
    FILTRAR_TREE_TXT('#txtcamconvista', '#tcamconvista');


    $('#tvtablas').tree({
        onClick: function (node) {
            if (node.nombre != 0) {
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', node.text);
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', node.text);
            }
        }
    });

    $('#dgcondicion').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });


    $('#dgcampos').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });
    $('#dgcampos').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckCampos,
        onUncheck: onUncheckCampos,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRowsCampos = allRows;
        },
        onUncheckAll: function () {
            checkedRowsCampos = [];
        },
        onBeginEdit: function (index, row) {
            var dg = $(this);
            var TipoDato = dg.datagrid('getEditor', { index: index, field: 'TipoDato' });
            var long = dg.datagrid('getEditor', { index: index, field: 'Longitud' });
            var tam = dg.datagrid('getEditor', { index: index, field: 'Tamaño' });
            $(TipoDato.target).combobox({
                onChange: function (value) {                  
                    if (value == 's') {
                        $(long.target).textbox('setValue', '20');
                        $(tam.target).textbox('setValue', '20');
                    }
                    else
                        if (value == 'f'){
                            $(long.target).textbox('setValue', '15');
                            $(tam.target).textbox('setValue', '15');
                        }
                        else
                            if ((value == 'c') || (value == 'r')){
                                $(long.target).textbox('setValue', '1');
                                $(tam.target).textbox('setValue', '1');
                            }
                            else
                                if (value == 'tm') {
                                    $(long.target).textbox('setValue', '500');
                                    $(tam.target).textbox('setValue', '50');
                                }
                                else
                                    if ((value == 'd') || (value == 'n') || (value == 't')) {
                                        $(long.target).textbox('setValue', '10');
                                        $(tam.target).textbox('setValue', '10');
                                }                               
                }
            })
        },
        onBeforeCellEdit: function (index, field, value) {
            var rows = $(this).datagrid('getRows');            
            if (field == 'CampoLLave') {               
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].CampoLLave == 'Si') {
                        $(this).datagrid('updateRow', {
                            index: i,
                            row: { CampoLLave: '' }
                        });
                        $(this).datagrid('uncheckRow', i);                       
                    }
                }
            }
            $(this).datagrid('checkRow', index);
        },
        onBeforeEdit: function (index, row) {
                row.editing = true;               
            }             
    });  

    $('#tcampos').tree({       
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var dg = $('#dgcampos');
                var cellcampo = dg.datagrid('cell');
                if (cellcampo != null)
                { CARGAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); }
                else
                {
                    var ban = BUSCAR_CAMPOCAPTURA_GRID('#dgcampos', node);
                    if (ban == false) { CARGAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); }
                }
            }
            if (ch == false) { QUITAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    var dg = $('#dgcampos');
                    var cellcampo = dg.datagrid('cell');
                    if (cellcampo != null)
                    { CARGAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); cellcampo = ""; }
                    else {
                        var ban = BUSCAR_CAMPOCAPTURA_GRID('#dgcampos', node);
                        if (ban == false) { CARGAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); }
                    }
                }
            }
            if (ch == true) { QUITAR_CAMPOCAPTURA_SELECCIONADO('#dgcampos', node); }
        }
    });

    $('#dgvista').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgvista').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');           
            checkedRowsVista = allRows;
        },
        onUncheckAll: function () {            
            checkedRowsVista = [];
        },
        onCheck: onCheckVista,
        onUncheck: onUncheckVista,       
        onBeforeCellEdit: function (index, field, value)
        {
            var rows = $(this).datagrid('getRows');
            if (field == 'Clave')
            {                
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i].Clave == 'Si') {
                        $(this).datagrid('updateRow', {
                            index: i,
                            row: { Clave: '' }
                        });
                        $(this).datagrid('uncheckRow', i);
                    }
                }
            }        
            $(this).datagrid('checkRow', index);
        },
        onBeforeEdit: function (index, row) {
            row.editing = true;
           // $(this).datagrid('checkRow', index);
        }
    });

    $('#dgcamsel').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
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
    });

    $('#dgcolumnas').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });
    $('#dgcolumnas').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheckAll: function () {            
            checkedRows = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {            
            checkedRows = [];
        },
        onCheck: onCheck,
        onUncheck: onUncheck,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $('#dgcolumnas').datagrid('checkRow', index);
        },

    });

    $('#tcamvista').tree({       
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var dg = $('#dgvista');
                var cellcampo = dg.datagrid('cell');
                if (cellcampo != null)
                { CARGAR_CAMPOVISTA_SELECCIONADO('#dgvista',node); }
                else
                {
                    var ban = BUSCAR_CAMPOVISTA_GRID('#dgvista', node);
                    if (ban == false) { CARGAR_CAMPOVISTA_SELECCIONADO('#dgvista', node); }
                }
            }
            if (ch == false) { QUITAR_CAMPOVISTA_SELECCIONADO('#dgvista', node); }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    var dg = $('#dgvista');
                    var cellcampo = dg.datagrid('cell');
                    if (cellcampo != null)
                    { CARGAR_CAMPOVISTA_SELECCIONADO('#dgvista', node); cellcampo = ""; }
                    else {
                        var ban = BUSCAR_CAMPOVISTA_GRID('#dgvista', node);
                        if (ban == false) { CARGAR_CAMPOVISTA_SELECCIONADO('#dgvista', node); }
                    }
                }                                   
            }
            if (ch == true) { QUITAR_CAMPOVISTA_SELECCIONADO('#dgvista', node); }
        }
    });

    $('#tvcambusqueda').tree({
        onClick: function (node) {
            if (node.name != "") {                                
                $('#btnCamConfig').linkbutton('enable');
                $('#btnDisConsulta').linkbutton('enable');
                $('#btnGuardarCampos').linkbutton('enable');
                CARGAR_CAMPOS_CONSULTA(idtabla, node.name);
                LIMPIAR_DISEÑOCONSULTA();
                CARGAR_DISEÑO_CONSULTA(idtabla, node.name);
               
                CARGAR_CONDICIONES('#tvcondicion');
                CARGAR_VALOR('#tvvalor')
            }
        }
    });

    $('#tvtblsist').tree({
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    $('#tvtblsist').tree('check', node.target);
                    $('#txtBtblsist').textbox('setValue', '');
                    $('#tvtblsist').tree('doFilter', '');

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
                }
                else {

                    var t = $('#tvtblsist');
                    var snode = t.tree('getSelected');
                    t.tree('uncheck', snode.target);
                    t.tree('unselect', snode.target);

                    $('#tvcamtbl').tree('removeAll');

                    $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });

                    $('#dg' + node.name).draggable().remove();
                }
            }
        }
    });

    $('#tvcolconsulta').tree({     
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var dg = $('#dgcolumnas');
                var cellcampo = dg.datagrid('cell');
                if (cellcampo != null)
                { CARGAR_COLCONSULTAS_SELECCIONADO('#dgcolumnas', node); }
                else
                {
                    var ban = BUSCAR_COLCONSULTAS_GRID('#dgcolumnas', node);
                    if (ban == false) { CARGAR_COLCONSULTAS_SELECCIONADO('#dgcolumnas', node); }
                }
            }
            if (ch == false) { QUITAR_COLCONSULTAS_SELECCIONADO('#dgcolumnas', node); }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    var dg = $('#dgcolumnas');
                    var cellcampo = dg.datagrid('cell');
                    if (cellcampo != null)
                    { CARGAR_COLCONSULTAS_SELECCIONADO(node); cellcampo = ""; }
                    else {
                        var ban = BUSCAR_COLCONSULTAS_GRID('#dgcolumnas', node);
                        if (ban == false) { CARGAR_COLCONSULTAS_SELECCIONADO('#dgcolumnas', node); }
                    }
                }
            }
            if (ch == true) { QUITAR_COLCONSULTAS_SELECCIONADO('#dgcolumnas', node); }
        }
    });
  

    $('#btnGVista').bind('click', function () { $('#loading').show();  GUARDAR_VISTA('#btnGVista'); });
    $('#btnEVista').bind('click', function () { ELIMINAR_VISTA('#btnEVista'); });
    $('#btnGCampos').bind('click', function () { GUARDAR_CAMPOS('#btnGCampos'); });
    $('#btnECampos').bind('click', function () { ELIMINAR_CAMPOS('#btnECampos'); });
    $('#btnGuardarConsulta').bind('click', function () { GUARDAR_CAMPOS_BUSQUEDA('#btnGuardarConsulta'); });
    

    $('#btnCatalogo').bind('click', function () { VENTANA_CATALOGO('#btnCatalogo'); });
    $('#btnACatalogo').bind('click', function () { ACEPTAR_CATALOGO('#btnACatalogo'); });    
    $('#btnLCatalogo').bind('click', function () { LIMPIAR_CATALOGO('#btnLCatalogo'); });

    $('#btnDisConsulta').bind('click', function () { ABRIR_VENTANA_CONSULTA('#btnDisConsulta'); });
    $('#btnLconsulta').bind('click', function () { LIMPIAR_DISEÑO_CONSULTA(); });
    $('#btnAconsulta').bind('click', function () { ACEPTAR_DISEÑO_CONSULTA('#btnAconsulta'); });
    $('#btnEConsulta').bind('click', function () { ELIMINAR_DISEÑO_CONSULTA('#btnEConsulta'); });


    $('#btnECondicion').bind('click', function () { ELIMINAR_CONDICION('#btnECondicion'); });
    $('#btnACondicion').bind('click', function () { AGREGAR_CONDICION('#btnACondicion'); });
    
    $('#btnGenerarRelaciones').bind('click', function () { GENERAR_RELACIONES('#btnGenerarRelaciones'); });

    $('#btnLVista').bind('click', function () { LIMPIAR_DISEÑO_VISTA('#btnLVista'); });
    $('#btnLCampos').bind('click', function () { LIMPIAR_DISEÑO_CAMPOS('#btnLCampos'); });
    $('#btnLimpiarconsulta').bind('click', function () { LIMPIAR_DISEÑO_BUSQUEDA('#btnLimpiarconsulta'); });
    $('#btnLconsulta').bind('click', function () { LIMPIAR_DISEÑO_CONSULTA('#btnLconsulta'); });

    $('#btnCamposFiltros').bind('click', function () { ABRIR_CAMPOS_FILTROS('#btnCamposFiltros'); });
    
    $('#btnCatalogoaFiltrar').bind('click', function () { ABRIR_FILTRAR_CAMPO('#btnCatalogoaFiltrar'); });
    $('#btnACamFiltro').bind('click', function () { ACEPTAR_FILTRO_CAMPO('#btnACamFiltro'); });
    $('#btnLCamFiltro').bind('click', function () { LIMPIAR_FILTRO_CAMPO('#btnLCamFiltro'); });

    $('#btnAGFiltroCat').bind('click', function () { AGREGAR_CAMPOS_FILTRO('#btnAGFiltroCat'); });
    $('#btnEFiltroCat').bind('click', function () { ELIMINAR_CAMPOS_FILTRO('#btnEFiltroCat'); });
    $('#btnAFiltroCat').bind('click', function () { ACEPTAR_CAMPOS_FILTRO('#btnAFiltroCat'); });

    $('#btnCampoCaptura').bind('click', function () { ABRIR_CAMPOS_CAPTURA('#btnCampoCaptura'); });
    $('#btnAgregarCampos').bind('click', function () { AGREGAR_CAMPOS_CAPTURA('#btnAgregarCampos'); });
    $('#btnEliminarCampos').bind('click', function () { ELIMINAR_CAMPOS_CAPTURA('#btnEliminarCampos'); });
    $('#btnAcamcaptura').bind('click', function () { ACEPTAR_CAMPOS_CAPTURA('#btnAcamcaptura'); });
    $('#btnLcamcaptura').bind('click', function () { LIMPIAR_RELACION_CAMPOS_CAPTURA('#btnLcamcaptura'); });

    $('#btnVistaCaptura').bind('click', function () { RELACION_VISTA_CAMPOS_CAPTURA('#btnVistaCaptura'); });
    $('#btnACamVista').bind('click', function () { AGREGAR_CAMPOS_VISTACAPTURA('#btnACamVista'); });
    $('#btnECamVista').bind('click', function () { ELIMINAR_CAMPOS_VISTACAPTURA('#btnECamVista'); });
    $('#btnACamCapVista').bind('click', function () { ACEPTAR_CAMPOS_VISTACAPTURA('#btnACamCapVista'); });
    $('#btnLCamCapVista').bind('click', function () { LIMPIAR_CAMPOS_VISTACAPTURA('#btnLCamCapVista'); });

    $('#btnActualizarCam').bind('click', function () { CARGAR_GRID_CAMPOS('#dgcampos', objcampos); });

    $('#btnActualizarVista').bind('click', function () { RECARGAR_VISTAPREVIA('#btnActualizarVista'); });

    $('#btnOpciones').bind('click', function () { ABRIR_VENTANA_CAMPO_OPCIONES('#btnOpciones'); });
    $('#btnACamOpc').bind('click', function () { ACEPTAR_VENTANA_CAMPO_OPCIONES('#btnACamOpc'); });
    $('#btnLCamOpc').bind('click', function () { LIMPIAR_VENTANA_CAMPO_OPCIONES('#btnLCamOpc'); });

    

    $('#btnRegresar').bind('click', function () {
        if (modulo == "Mcat")
        {
            //document.location = "Catalogos_Menu.aspx?idtabla=" + idtabla + "&tabla=" + destabla + "&mod=" + modulo;
            IR_PAGINA("Catalogos_Menu.aspx","idtabla=" + idtabla + "&tabla=" + destabla + "&mod=" + modulo);
        }
        //if (modulo == "Ccat")
        //{ document.location = "Catalogos_Creacion.aspx?mod="+modulo; }
    });

    $('#btnVistaCat').bind('click', function () { MOSTRAR_CATALOGO('#btnVistaCat'); });

    $('#btnCamConfig').bind('click', function () { MOSTRAR_CONFIGURACION_CAMPO_BUSQUEDA('#btnCamConfig'); });
    
        
    $('#tcondicion').tabs({
        onSelect: function (title) {
            if (title == 'Condición Consulta') {
                CARGAR_TABLAS_SELECCIONADAS('#tvtblsel');
            }
        }
    });

    $('#wCampoFiltro').window({
        onBeforeClose: function () {
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                $('#dgcampos').datagrid('uncheckRow', cell.index);
            }
            return true;
        }
    });

    $('#wdescriptivo').window({
        onBeforeClose: function () {
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                $('#dgcampos').datagrid('uncheckRow', cell.index);
            }
            return true;
        }
    });

    $('#wcatalogo').window({
        onBeforeClose: function () {
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                $('#dgcampos').datagrid('uncheckRow', cell.index);
            }
            return true;
        }
    });

    $('#wcamcaptura').window({
        onBeforeClose: function () {
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                $('#dgcampos').datagrid('uncheckRow', cell.index);
            }
            return true;
        }
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

function CARGAR_CAMPOVISTA_SELECCIONADO(dgobj, node) {
    var dg = $('#dgvista');   
    var total = dg.datagrid('getData').total;   
    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                OrdenVista: total+1,
                Campo: node.name,
                Titulo:node.text,
                AlinearDato: 'Centro',
                AlinearTitulo: 'Centro',
                Longitud: '10'
            }
        });
        dg.datagrid('checkRow', total);        
       $('#tcamvista').tree('unselect', node.target);
       $('#tcamvista').tree('check', node.target);
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
                            CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo
                        }
                });
                dg.datagrid('endEdit', cellcampo.index);
                dg.datagrid('beginEdit', cellcampo.index);

                var nodes = $('#tcamvista').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].CampoAnt)
                    { $('#tcamvista').tree('uncheck', nodes[i].target); }
                }
                $('#tcamvista').tree('check', node.target);
                $('#tcamvista').tree('unselect', node.target);
            }
            else {
                dg.datagrid('uncheckAll', cellcampo.index);               
                $('#tcamvista').tree('uncheck', node.target);
                $('#tcamvista').tree('unselect', node.target);
            }
        });
    }

    $('#txtcamvista').textbox('setValue', '');
   
    total = dg.datagrid('getData').total;
    if (total > 0)
    {$('#btnGVista').linkbutton({ disabled: false });}
    else {$('#btnGVista').linkbutton({ disabled: true });}
}
function BUSCAR_CAMPOVISTA_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}
function QUITAR_CAMPOVISTA_SELECCIONADO(dgobj,node) {
    var rows = $(dgobj).datagrid('getRows');
    for (var p = 0; p < $(dgobj).datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $(dgobj).datagrid('deleteRow', p);
            var t = $('#tcamvista');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    total = $(dgobj).datagrid('getData').total;
    if (total > 0)
    { $('#btnGVista').linkbutton('enable');}
    else {
        $('#btnGVista').linkbutton('disable');        
        $(dgobj).datagrid('uncheckAll');
    }
}

function CARGAR_CAMPOCAPTURA_SELECCIONADO(dgobj, node) {
    var dg = $('#dgcampos');
    var total = dg.datagrid('getData').total;
    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                Orden: total+1,
                Campo: node.name,
                Descripcion:node.text,
                TipoDato: 'Texto',
                Longitud: '100',
                Tamaño: '10'
            }
        });
        dg.datagrid('checkRow', total);
        $('#tcampos').tree('unselect', node.target);
        $('#tcampos').tree('check', node.target);
        dg.datagrid('beginEdit', total);
        var varchar = dg.datagrid('getEditor', { index: total, field: 'TipoDato' });
        $(varchar.target).combobox('setValue', 't');
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[cellcampo.index].Campo, function (r) {
            if (r) {
                dg.datagrid('checkRow', cellcampo.index);

                dg.datagrid('updateRow', {
                    index: cellcampo.index,
                    row: {
                        Campo: node.name,
                        CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo,
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

    total = dg.datagrid('getData').total;
    if (total > 0)
    { $('#btnGCampos').linkbutton({ disabled: false }); }
    else { $('#btnGCampos').linkbutton({ disabled: true }); }
}
function BUSCAR_CAMPOCAPTURA_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}
function QUITAR_CAMPOCAPTURA_SELECCIONADO(dgobj, node) {
    var rows = $(dgobj).datagrid('getRows');
    for (var p = 0; p < $(dgobj).datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $(dgobj).datagrid('deleteRow', p);
            var t = $('#tcampos');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    total = $(dgobj).datagrid('getData').total;
    if (total > 0)
    { $('#btnGCampos').linkbutton('enable'); }
    else {
        $('#btnGCampos').linkbutton('disable');
        $(dgobj).datagrid('uncheckAll');
    }
}

function CARGAR_COLCONSULTAS_SELECCIONADO(dgobj, node) {
    var dg = $('#dgcolumnas');
    var total = dg.datagrid('getData').total;
    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                OrdColumnas: total,
                Campo: node.text,
                Titulo: node.text,
                AlinerDato: "Centro",
                AlinearTitulo: "Centro",
                Longitud:10,
                CampoAnt: ''
            }
        });
        dg.datagrid('checkRow', total);
        $('#tvcolconsulta').tree('unselect', node.target);
        $('#tvcolconsulta').tree('check', node.target);
        dg.datagrid('beginEdit', total);       
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[cellcampo.index].Campo, function (r) {
            if (r) {
                dg.datagrid('checkRow', cellcampo.index);

                dg.datagrid('updateRow', {
                    index: cellcampo.index,
                    row: {
                        campo: node.name,
                        CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo,
                    }
                });
                dg.datagrid('endEdit', cellcampo.index);
                dg.datagrid('beginEdit', cellcampo.index);

                var nodes = $('#tvcolconsulta').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].CampoAnt)
                    { $('#tvcolconsulta').tree('uncheck', nodes[i].target); }
                }
                $('#tvcolconsulta').tree('check', node.target);
                $('#tvcolconsulta').tree('unselect', node.target);
            }
            else {
                dg.datagrid('uncheckAll', cellcampo.index);
                $('#tvcolconsulta').tree('uncheck', node.target);
                $('#tvcolconsulta').tree('unselect', node.target);
            }
        });
    }

    $('#txtcolconsulta').textbox('setValue', '');
   
    total = dg.datagrid('getData').total;
    if (total > 0)
    { $('#btnGuardarConsulta').linkbutton({ disabled: false }); }
    else { $('#btnGuardarConsulta').linkbutton({ disabled: true }); }
}
function BUSCAR_COLCONSULTAS_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}
function QUITAR_COLCONSULTAS_SELECCIONADO(dgobj, node) {
    var rows = $(dgobj).datagrid('getRows');
    for (var p = 0; p < $(dgobj).datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $(dgobj).datagrid('deleteRow', p);
            var t = $('#tvcolconsulta');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    total = $(dgobj).datagrid('getData').total;
    if (total > 0)
    { $('#btnGuardarConsulta').linkbutton('enable'); }
    else {
        $('#btnGuardarConsulta').linkbutton('disable');
        $(dgobj).datagrid('uncheckAll');
    }
}

function CARGAR_COLTABLAS_SELECCIONADO(dgobj,tvobj, node,tabla) {
    var dg = $(dgobj);
    var total = dg.datagrid('getData').total;
    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                Tabla: tabla,
                Campo: node.name,
                Orden:total+1
            }
        });
        //dg.datagrid('checkRow', total);        
        $(tvobj).tree('check', node.target);
        dg.datagrid('beginEdit', total);
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el campo ' + dg.datagrid('getRows')[cellcampo.index].Campo, function (r) {
            if (r) {
                dg.datagrid('checkRow', cellcampo.index);

                dg.datagrid('updateRow', {
                    index: cellcampo.index,
                    row: {
                        campo: node.name,
                        CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo,
                    }
                });
                //dg.datagrid('endEdit', cellcampo.index);
                dg.datagrid('beginEdit', cellcampo.index);

                var nodes = $(tvobj).tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].CampoAnt)
                    { $(tvobj).tree('uncheck', nodes[i].target); }
                }
                $(tvobj).tree('check', node.target);
            }
            else {
                dg.datagrid('uncheckAll', cellcampo.index);
                $(tvobj).tree('uncheck', node.target);
            }
        });
    }

    $('#txttbllist').textbox('setValue', '');
    //$(tvobj).tree('unselect', node.target);
}
function BUSCAR_COLTABLAS_GRID(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}
function QUITAR_COLTABLAS_SELECCIONADO(dgobj, tvobj, node) {
    var rows = $(dgobj).datagrid('getRows');
    for (var p = 0; p < $(dgobj).datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $(dgobj).datagrid('deleteRow', p);
            var t = $(tvobj);
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }    
   $(dgobj).datagrid('uncheckAll');    
}


function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else if (i == key && obj[key] == val) {
            objects.push(obj);
        }
    }
    return objects;
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

function getCheckedTblSel(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].name + ":" + nodes[i].text);
        ss.join(',');
    }
    return ss;
}

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].campo == row.campo) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].campo == row.campo) {
            checkedRows.splice(i, 1);
            return;
        }
    }
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

function onCheckVista(index, row) {
    for (var i = 0; i < checkedRowsVista.length; i++) {
        if (checkedRowsVista[i].Campo == row.Campo) {
            return
        }
    }
    checkedRowsVista.push(row);
}
function onUncheckVista(index, row) {
    for (var i = 0; i < checkedRowsVista.length; i++) {
        if (checkedRowsVista[i].Campo == row.Campo) {
            checkedRowsVista.splice(i, 1);
            return;
        }
    }
}

function onCheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].Campo == row.Campo) {
            return
        }
    }
    checkedRowsCampos.push(row);
}
function onUncheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].Campo == row.Campo) {
            checkedRowsCampos.splice(i, 1);
            return;
        }
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

function CARGAR_COLUMNAS_TABLAS_NAME(tvobj) {  
    var parametros = {};
    parametros.idtabla = idtabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Columnas_Tablas_Name',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj               
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

function MOSTRAR_CATALOGO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //document.location = "CatalogosGenerales.aspx?idtabla=" + idtabla + "&tabla=" + destabla + "&mod=Ccat";
        IR_PAGINA("CatalogosGenerales.aspx","idtabla=" + idtabla + "&tabla=" + destabla + "&mod=Ccat");
    }
}

function CARGAR_CONFIGURACION()
{
    var parametros = {};
    parametros.idtabla = idtabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Configuracion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            objtbl = jQuery.parseJSON(data.d[0]);
            objvista = jQuery.parseJSON(data.d[1]);
            objcampos = jQuery.parseJSON(data.d[2]);
           
            if (objtbl.length > 0) {
                if (objtbl[0].CamposCaptura != undefined) {
                    if (objtbl[0].GenerarClave == true) { $('#dgcampos').datagrid('showColumn', 'GenerarClave'); /*$('#dgcampos').datagrid('showColumn', 'CampoLLave');*/ }
                    else { $('#dgcampos').datagrid('hideColumn', 'GenerarClave'); /*$('#dgcampos').datagrid('hideColumn', 'CampoLLave'); */}
                    $('#btnVistaCat').linkbutton({ disabled: false });
                   
                    CARGAR_GRID_VISTA('#dgvista', objvista);
                    $('#tcamvista').tree({
                        onLoadSuccess: function () {
                            if (objvista != undefined) {                              
                                var tri = $('#tcamvista').tree('getRoots');
                                for (var t = 0; t < objvista.length; t++) {
                                    for (var h = 0; h < tri.length; h++) {
                                        if (objvista[t].Campo == tri[h].name) {
                                            $('#tcamvista').tree('check', tri[h].target)
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    });                   

                    CARGAR_GRID_CAMPOS('#dgcampos', objcampos);
                    $('#tcampos').tree({
                        onLoadSuccess: function () {
                            if (objcampos != undefined) {
                                var tri = $('#tcampos').tree('getRoots');
                                for (var t = 0; t < objcampos.length; t++) {
                                    for (var h = 0; h < tri.length; h++) {
                                        if (objcampos[t].Campo == tri[h].name) {
                                            $('#tcampos').tree('check', tri[h].target)
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    });                   
                    CARGAR_CAMPOS_BUSQUEDA('#tvcambusqueda');
                }
                else {
                    $('#btnVistaCat').linkbutton({ disabled: true });
                }
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

function CARGAR_CONFIGURACION_CAMPOS() {
    var parametros = {};
    parametros.idtabla = idtabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Configuracion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
           // $('#loading').show();
        },
        success: function (data) {
            objtbl = jQuery.parseJSON(data.d[0]);            
            objcampos = jQuery.parseJSON(data.d[2]);

            if (objtbl.length > 0) {
                if (objtbl[0].CamposCaptura != undefined) {
                    if (objtbl[0].GenerarClave == true) { $('#dgcampos').datagrid('showColumn', 'GenerarClave');/* $('#dgcampos').datagrid('showColumn', 'CamposLlavesGuardar');*/ }
                    else { $('#dgcampos').datagrid('hideColumn', 'GenerarClave'); /*$('#dgcampos').datagrid('hideColumn', 'CamposLlavesGuardar');*/ }
                    
                    CARGAR_GRID_CAMPOS('#dgcampos', objcampos);
                    $('#tcampos').tree({
                        onLoadSuccess: function () {
                            if (objcampos != undefined) {
                                var tri = $('#tcampos').tree('getRoots');
                                for (var t = 0; t < objcampos.length; t++) {
                                    for (var h = 0; h < tri.length; h++) {
                                        if (objcampos[t].Campo == tri[h].name) {
                                            $('#tcampos').tree('check', tri[h].target)
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    });                    
                }                
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            //$('#loading').hide(100);
        }
    });
}

function CARGAR_CONFIGURACION_VISTA() {
    var parametros = {};
    parametros.idtabla = idtabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Configuracion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
         //   $('#loading').show();
        },
        success: function (data) {            
            objvista = jQuery.parseJSON(data.d[1]);            
            
            CARGAR_GRID_VISTA('#dgvista', objvista);
            $('#tcamvista').tree({
                onLoadSuccess: function () {
                    if (objvista != undefined) {
                        var tri = $('#tcamvista').tree('getRoots');
                        for (var t = 0; t < objvista.length; t++) {
                            for (var h = 0; h < tri.length; h++) {
                                if (objvista[t].Campo == tri[h].name) {
                                    $('#tcamvista').tree('check', tri[h].target)
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
        {
            //$('#loading').hide(100);
        }
    });
}

function CARGAR_GRID_VISTA(dgobj,strobj)
{
    var oculto = "", bloqueadas = "", columnas = "", orden = "", campollave = "", alineardato="",alineartitulo = "", CampoDescriptivo = "";
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    //strobj.sort(OrdenarVista)
    //for (var t = 0; t < strobj.length; t++) {
    //    //var strcampo = strdiseño[t].split(",");

    //    if (strobj[t].AlinearDato == "Left")  { alineardato = "Izquierda"; }
    //    if (strobj[t].AlinearDato == "Center") { alineardato = "Centro"; }
    //    if (strobj[t].AlinearDato == "Right") { alineardato = "Derecha"; }

    //    if (strobj[t].AlinearTitulo == "Left") { alineartitulo = "Izquierda"; }
    //    if (strobj[t].AlinearTitulo == "Center") { alineartitulo = "Centro"; }
    //    if (strobj[t].AlinearTitulo == "Right") { alineartitulo = "Derecha"; }

    //    if (strobj[t].Ocultar == true) { oculto = "Si"; } else { oculto = ""; }
    //    if (strobj[t].ColumnasBloqueadas == 1) { bloqueadas = "Si"; } else { bloqueadas = ""; }
    //    if (strobj[t].Clave == 1) { campollave = "Si"; } else { campollave = ""; }
    //    if (strobj[t].Descripcion == 1) { CampoDescriptivo = "Si"; } else { CampoDescriptivo = ""; }
    //    if (strobj[t].OrdenarDatos == 1) { orden = "Si"; } else { orden = ""; }

    //    $(dgobj).datagrid('insertRow', {
    //        index: t,
    //        row: {
    //            OrdenVista: strobj[t].OrdenVista,
    //            Campo: strobj[t].Campo,
    //            AlinearDato: alineardato,
    //            Titulo: strobj[t].Titulo,
    //            AlinearTitulo: alineartitulo,
    //            Longitud: strobj[t].Longitud,
    //            Ocultar: oculto,
    //            ColumnasBloqueadas: bloqueadas,
    //            Clave: campollave,
    //            Descripcion:CampoDescriptivo,
    //            OrdenarDatos: orden
    //        }
    //    });
    //    $(dgobj).datagrid('beginEdit', t);
    //}    

    $(dgobj).datagrid({
        data: strobj,       
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
    });

    var total = $(dgobj).datagrid('getData').total;
    for (var r = 0; r < total; r++) {
        $(dgobj).datagrid('beginEdit', r);
    }
    if (total > 0) { $('#btnGVista').linkbutton({ disabled: false }); $('#btnEVista').linkbutton({ disabled: false }); }
}

function CARGAR_GRID_CAMPOS(dgobj, strobj)
{     
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    var longitud = "", tipodato = "", tamaño = "", sololectura = "", validarnulo = "", habilitarcatalogo = "", habilitarBusqueda = "", campocaptura = "", campoconcatenar = "", genclave = "", campollave = "", llaveprimaria = "";

    for (var t = 0; t < strobj.length; t++)
    {       
        //if (strobj[t].TipoDato == "t") { tipodato = "Texto";}
        //if (strobj[t].TipoDato == "s") { tipodato = "Selección";}
        //if (strobj[t].TipoDato == "n") { tipodato = "Numerico";}
        //if (strobj[t].TipoDato == "c") { tipodato = "CheckBox";}
        //if (strobj[t].TipoDato == "r") { tipodato = "Radios";}
        //if (strobj[t].TipoDato == "tm") { tipodato = "Multilinea";}
        //if (strobj[t].TipoDato == "d") { tipodato = "Decimal";}
        //if (strobj[t].TipoDato == "f") { tipodato = "Fecha";}
       
        if (strobj[t].Tamaño != "") { tamaño = strobj[t].Tamaño / 10; }
        if (strobj[t].SoloLectura == "1") { sololectura = "Si"; } else { sololectura = ""; }
        if (strobj[t].ValidarNulo == "1") { validarnulo = "Si"; } else { validarnulo = ""; }
        if (strobj[t].HabilitarCatalogo == "1") { habilitarcatalogo = "Si"; } else { habilitarcatalogo = ""; }
        if (strobj[t].HabilitarBusqueda == "1") { habilitarBusqueda = "Si"; } else { habilitarBusqueda = ""; }
        if (strobj[t].ConfiguracionCamposCaptura != "") { campocaptura = "Si"; } else { campocaptura = ""; }
        if (strobj[t].Consulta_CamposConcatenar == "1") { campoconcatenar = "Si"; } else { campoconcatenar = ""; }
        if (strobj[t].GenerarClave == "1") { genclave = "Si"; } else { genclave = ""; }
        if (strobj[t].CampoLLave == "1") { campollave = "Si"; } else { campollave = ""; }
        if (strobj[t].CamposLlavesGuardar == "1") { llaveprimaria = "Si"; } else { llaveprimaria = ""; }
       
        $(dgobj).datagrid('insertRow', {
            index: t,
            row: {                
                Campo: strobj[t].Campo,
                Descripcion: strobj[t].Descripcion,
                Orden: strobj[t].Orden,                
                Longitud: strobj[t].Longitud,
                //Tamaño: tamaño,
                //TipoDato: strobj[t].TipoDato,
                CamposLlavesGuardar: llaveprimaria,
                CampoLLave:campollave,
                GenerarClave:genclave,
                SoloLectura: sololectura,
                ValidarNulo: validarnulo,
                HabilitarCatalogo: habilitarcatalogo,
                HabilitarBusqueda: habilitarBusqueda,
                Catalogo_Tabla: strobj[t].Catalogo_Tabla,
                Catalogo_Texto: strobj[t].Catalogo_Texto,
                Catalogo_Valor: strobj[t].Catalogo_Valor,
                Catalogo_Consulta: strobj[t].Catalogo_Consulta,
                CampoRelacion:strobj[t].CampoFiltro,
                CampoFiltro: strobj[t].CampoRelacion,
                CampoOpciones: strobj[t].CampoOpciones,
                CampoCaptura: campocaptura,
                Consulta_CamposConcatenar: campoconcatenar
            }
        });
        $(dgobj).datagrid('beginEdit', t);
        var TipoDato = $(dgobj).datagrid('getEditor', { index: t, field: 'TipoDato' });
        $(TipoDato.target).combobox('setValue', strobj[t].TipoDato);
        var tamaño = $(dgobj).datagrid('getEditor', { index: t, field: 'Tamaño' });
        $(tamaño.target).textbox('setValue', strobj[t].Tamaño/10);
    }

    //$(dgobj).datagrid({
    //    data: strobj,
    //    pagination: false,
    //    enableFilter: false,
    //    rownumbers: true,
    //    singleSelect: true,
    //    striped: true,
    //    pageSize: 20,
    //    checkOnSelect: false,
    //    selectOnCheck: false,
    //    onCheck: onCheckCampos,
    //    onUncheck: onUncheckCampos,
    //    // onEndEdit: onEndEdit,
    //    onBeginEdit: function (index, row) {
    //        var dg = $(this);
    //        var TipoDato = dg.datagrid('getEditor', { index: index, field: 'TipoDato' });
    //        var long = dg.datagrid('getEditor', { index: index, field: 'Longitud' });
    //        var tam = dg.datagrid('getEditor', { index: index, field: 'Tamaño' });
    //        $(TipoDato.target).combobox({
    //            onChange: function (value) {                  
    //                if (value == 's') {
    //                    $(long.target).textbox('setValue', '20');
    //                    $(tam.target).textbox('setValue', '20');
    //                }
    //                else
    //                    if (value == 'f'){
    //                        $(long.target).textbox('setValue', '15');
    //                        $(tam.target).textbox('setValue', '15');
    //                    }
    //                    else
    //                        if ((value == 'c') || (value == 'r')){
    //                            $(long.target).textbox('setValue', '1');
    //                            $(tam.target).textbox('setValue', '1');
    //                        }
    //                        else
    //                            if (value == 'tm') {
    //                                $(long.target).textbox('setValue', '500');
    //                                $(tam.target).textbox('setValue', '50');
    //                            }
    //                            else
    //                                if ((value == 'd') || (value == 'n') || (value == 't')) {
    //                                    $(long.target).textbox('setValue', '10');
    //                                    $(tam.target).textbox('setValue', '10');
    //                                }                               
    //            }
    //        })
    //    },
    //    onBeforeCellEdit: function (index, field, value) {
    //        var rows = $(this).datagrid('getRows');            
    //        if (field == 'CampoLLave') {               
    //            for (var i = 0; i < rows.length; i++) {
    //                if (rows[i].CampoLLave == 'Si') {
    //                    $(this).datagrid('updateRow', {
    //                        index: i,
    //                        row: { CampoLLave: '' }
    //                    });
    //                    $(this).datagrid('uncheckRow', i);                       
    //                }
    //            }
    //        }
    //        $(this).datagrid('checkRow', index);
    //    },
    //    //onBeforeEdit: function (index, row) {
    //    //    row.editing = true;               
    //    //},          
    //    beforeSend: function () {
    //        $('#loading').show();
    //    },
    //    error: function (err) {
    //        $('#loading').hide(100);
    //        $.messager.alert('Error', err.statusText, 'error');
    //    },
    //    complete: function () {
    //        $('#loading').hide(100);
    //    },
    //});
    var total = $(dgobj).datagrid('getData').total;
    //for (var r = 0; r < total; r++) {
    //    $(dgobj).datagrid('beginEdit', r);
    //    var TipoDato = $(dgobj).datagrid('getEditor', { index: t, field: 'TipoDato' });
    //    $(TipoDato.target).combobox('setValue', strobj[r].TipoDato);
    //}
    if (total > 0) { $('#btnGCampos').linkbutton({ disabled: false }); $('#btnECampos').linkbutton({ disabled: false }); }
}

function CARGAR_CAMPOS_BUSQUEDA(tvobj) {
    objlstcampos = [];
    var tdgcampos = $('#dgcampos').datagrid('getData').total;
    for (var p = 0; p < tdgcampos; p++) {
        if ($('#dgcampos').datagrid('getRows')[p].HabilitarBusqueda == 'Si') {

            listacampos = { id: "", name: "", text: "" };
            var name = $('#dgcampos').datagrid('getRows')[p].Campo;
            var text = $('#dgcampos').datagrid('getRows')[p].Descripcion;

            listacampos.id = p;
            listacampos.name = name;
            listacampos.text = text;
            objlstcampos.push(listacampos);
        }
    }
    $(tvobj).tree({
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
        onLoadSuccess: function () {
            //var tri = $('#rtvcamizq').tree('getRoots');
            //for (var h = 0; h < tri.length; h++) {
            //    if (row.cvecat == tri[h].name) {
            //        $('#rtvcamizq').tree('select', tri[h].target)
            //        break;
            //    }
            //}
        }
    });
}

function CARGAR_TABLAS_SELECCIONADAS(tvobj) {
    objlstcampos = [];
    //sacar las tablas seleccionadas
    var tablasseleccionadas = getCheckedTblSel(tvobj);
    for (var p = 0; p < tablasseleccionadas.length; p++) {
        var tbl = tablasseleccionadas[p].split(":");
        listacampos = { id: "", name: "", text: "" };
        var name = tbl[0];
        var text = tbl[1];

        listacampos.id = p;
        listacampos.name = name;
        listacampos.text = text;
        objlstcampos.push(listacampos);
    }
    $(tvobj).tree({
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
        onLoadSuccess: function () {
            //var tri = $('#rtvcamizq').tree('getRoots');
            //for (var h = 0; h < tri.length; h++) {
            //    if (row.cvecat == tri[h].name) {
            //        $('#rtvcamizq').tree('select', tri[h].target)
            //        break;
            //    }
            //}
        }
    });
}

function SortByName(a, b) {
    var aName = a.Ordvista;
    var bName = b.Ordvista;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function SortByOrden(a, b) {
    var aName = a.Orden;
    var bName = b.Orden;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function OrdenarCampos(a, b) {
    var aName = parseInt(a.Orden);
    var bName = parseInt(b.Orden);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function OrdenarColumnas(a, b) {
    var aName = parseInt(a.OrdColumnas);
    var bName = parseInt(b.OrdColumnas);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function OrdenarVista(a, b) {
    var aName = parseInt(a.Ordenvista);
    var bName = parseInt(b.Ordenvista);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}



function CARGAR_COLUMNAS_TABLAS_SELECCIONADAS(tvobj, tabla) {
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
                data: obj
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

function CARGAR_CONDICIONES(tobj) {
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };

    listacampos.name = "=";
    listacampos.text = "Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<>";
    listacampos.text = "Diferente";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Like";
    listacampos.text = "Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "In";
    listacampos.text = "En Valor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Not In"
    listacampos.text = "No en Valor";
    objlstcampos.push(listacampos);

    $(tobj).tree({
        data: objlstcampos
    });
}

function CARGAR_VALOR(tobj) {
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };

    listacampos.name = 'E';
    listacampos.text = "Espacio";
    objlstcampos.push(listacampos);
    
    $(tobj).tree({
        data: objlstcampos
    });
}



function CARGAR_COLUMNAS_TABLAS(tvobj, strcampo, id) {
    var parametros = {};
    parametros.idtabla = id;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Columnas_Tablas_Name',
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
                    var rows = $('#dgcampos').datagrid('getRows');
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

            $('#tvtablas').tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\''+ node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    var tri = $('#tvtablas').tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        if (catalogoseleccion == tri[h].text) {
                            $('#tvtablas').tree('select', tri[h].target)
                            break;
                        }
                    }
                }
            });
            var t = $('#tvtablas');
            var tabla = t.tree('getSelected');
            if (tabla != null) {               
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', tabla.name);               
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', tabla.name);
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

//guardar el diseño de la vista
function GUARDAR_VISTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var dg = $('#dgvista');
        var Valor = "0", condicion = "", campo = "";

        dg.datagrid('acceptChanges');
        var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));

        if (checkedRowsVista.length > 0) {
            checkedRowsVista.sort(OrdenarVista);
            for (var f = 0; f < checkedRowsVista.length; f++) {
                colinsert = ""; valores = ""; camupdate = "";
                if ((checkedRowsVista[f].CampoAnt != undefined) && (checkedRowsVista[f].CampoAnt != '')) {
                    condicion = fields[1] + "=''" + checkedRowsVista[f].CampoAnt + "''"; campo = checkedRowsVista[f].CampoAnt;
                    checkedRowsVista[f].CampoAnt = '';
                }
                else {
                    condicion = fields[1] + "=''" + checkedRowsVista[f][fields[1]] + "''"; campo = checkedRowsVista[f][fields[1]];
                }
             
                for (var c = 1; c < fields.length; c++) {
                    var strcam = fields[c];
                    if (strcam != 'CampoAnt') {
                        Valor = checkedRowsVista[f][fields[c]];
                        colinsert += fields[c] + ",";

                        if (Valor == 'Si') { Valor = 1; }
                        if (fields[c] == "Longitud") { Valor = Valor * 10; }
                        if ((fields[c] == 'AlinearDato') || (fields[c] == 'AlinearTitulo')) {
                            if (Valor == 'Izquierda') { Valor = 'Left'; }
                            if (Valor == 'Centro') { Valor = 'Center'; }
                            if (Valor == 'Derecha') { Valor = 'Right'; }
                        }
                        if (Valor != undefined) {
                            valores += "''" + Valor + "'',";
                            camupdate += fields[c] + "=''" + Valor + "'',";
                        } else {
                            valores += "'''',";
                            camupdate += fields[c] + "='''',";
                        }
                    }
                  
                }
                colinsert = colinsert.substring(0, colinsert.length - 1);
                valores = valores.substring(0, valores.length - 1);
                camupdate = camupdate.substring(0, camupdate.length - 1);

                INSERTAR_CONFIGURACION_VISTA(campo, condicion, colinsert, valores, camupdate);
            }

            if (error == "0") {                              
                $.messager.alert('Información', "Campos Guardados Correctamente", 'info');
                checkedRowsVista = [];                                
                CARGAR_CONFIGURACION_VISTA();

               
                //var cell = dg.datagrid('cell');
                //dg.datagrid('uncheckAll');
                //total = dg.datagrid('getData').total;
                //for (var r = 0; r < total; r++) {
                //    dg.datagrid('beginEdit', r);
                //}
                
            }           
        }
        else {        
            $('#loading').hide(100); $.messager.alert('Error', "Falta seleccionar el campo a guardar", 'error');
        }

        var total = dg.datagrid('getData').total;
        for (var r = 0; r < total; r++) {
            dg.datagrid('beginEdit', r);
        }
        $('#loading').hide(100);
    }
}
function INSERTAR_CONFIGURACION_VISTA(campo, condicion, colinsert, valores, camupdate) {
    var parametros = {};
    parametros.idtabla = idtabla;
    parametros.campo = campo,
    parametros.condicion = condicion,
    parametros.colinsert = colinsert,
    parametros.valores = valores,
    parametros.camupdate = camupdate,
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Configuracion_Vista',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          //  $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else { error = "0"; }            
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            //$('#loading').hide(100);
        }
    });
}

//eliminar el campo del diseño de la configuracion de la VISTA
function ELIMINAR_VISTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgvista');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {                     
                    ELIMINAR_CAMPO_VISTA($('#dgvista').datagrid('getRows')[cell.index].Campo, $('#dgvista').datagrid('getRows')[cell.index].OrdenVista);
                    var tri = $('#tcamvista').tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        if ($('#dgvista').datagrid('getRows')[cell.index].Campo == tri[h].name) {                            
                            $('#tcamvista').tree('uncheck', tri[h].target)
                            break;
                        }
                    }                   
                    $('#dgvista').datagrid('deleteRow', cell.index);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function ELIMINAR_CAMPO_VISTA(campo, orden) {
    //if (movconfig == "") { movconfig = mov;}
    var parametros = {};
    parametros.tabla = idtabla;
    parametros.campo = campo;
    parametros.orden = orden;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Eliminar_CamposVista',
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
            else { $.messager.alert('Información', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


//guardar el diseño de la configuracion de la captura
function GUARDAR_CAMPOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var dg = $('#dgcampos');
        var nollave = 0;
        dg.datagrid('acceptChanges');
        var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));

        if (checkedRowsCampos.length > 0) {
        checkedRowsCampos.sort(OrdenarCampos);
        for (var f = 0; f < checkedRowsCampos.length; f++) {
            var valores = "", Valor = "0", condicion = "", campo = "", camupdate = "", colinsert = "";
          
            if ((checkedRowsCampos[f].CampoAnt != undefined) && (checkedRowsCampos[f].CampoAnt != '')) {
                condicion = fields[1] + "=''" + checkedRowsCampos[f].CampoAnt + "''"; campo = checkedRowsCampos[f].CampoAnt;
                checkedRowsCampos[f].CampoAnt = '';
            }
            else { condicion = fields[1] + "=''" + checkedRowsCampos[f][fields[1]] + "''"; campo = checkedRowsCampos[f][fields[1]]; }
                      
            for (var c = 1; c < fields.length; c++) {               
                if ((fields[c] != "CampoRelacion") && (fields[c] != "CampoFiltro") && (fields[c] != "CampoCaptura") && (fields[c] != "Catalogo_Tabla") && (fields[c] != "Catalogo_Texto") && (fields[c] != "Catalogo_Valor") && (fields[c] != "Catalogo_Consulta") && (fields[c] != "CampoAnt") && (fields[c] != "CampoCap")) {
                    Valor = checkedRowsCampos[f][fields[c]];
                    colinsert += fields[c] + ",";

                    if (Valor == 'Si') { Valor = 1; } 
                    if (fields[c] == "Tamaño") { Valor = Valor*10; }
                    //if (fields[c] == 'Descripcion') {                        
                    //    Valor = Valor;
                    //}

                    if (Valor != undefined) {
                        valores += "''" + Valor + "'',";
                        camupdate += fields[c] + "=''" + Valor + "'',";
                    } else {
                        valores += "'''',";
                        camupdate += fields[c] + "='''',";
                    }
                }
            }
            //if (nollave == 0) {
                colinsert = colinsert.substring(0, colinsert.length - 1);
                valores = valores.substring(0, valores.length - 1);
                camupdate = camupdate.substring(0, camupdate.length - 1);

                INSERTAR_CONFIGURACION_CAMPOS(campo, condicion, colinsert, valores, camupdate);
            //}
            //else { $.messager.alert('Error', "Falta seleccionar por lo menos una llave primaria", 'Error'); return 0;}
        }
       
            if (error == "0")
            {
                checkedRowsCampos = [];          
                $.messager.alert('Información', "Campos Guardados Correctamente", 'info');

                CARGAR_CONFIGURACION_CAMPOS();

                CARGAR_CAMPOS_BUSQUEDA('#tvcambusqueda');
               
                //var cell = dg.datagrid('cell');            
                //dg.datagrid('uncheckAll');                      
            }
        }
        else {         
            $('#loading').hide(100); $.messager.alert('Error', "Falta seleccionar el campo a guardar", 'error');
        }

        var total = dg.datagrid('getData').total;
        for (var r = 0; r < total; r++) {
            dg.datagrid('beginEdit', r);
        }

        $('#loading').hide(100);
    }
}
function INSERTAR_CONFIGURACION_CAMPOS(campo, condicion, colinsert, valores, camupdate) {
    var parametros = {};
    parametros.idtabla = idtabla;
    parametros.campo = campo,
    parametros.condicion = condicion,
    parametros.colinsert = colinsert,
    parametros.valores = valores,
    parametros.camupdate = camupdate,
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Configuracion_Campos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
           // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else { error = "0"; }           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            //$('#loading').hide(100);
        }
    });
}

//eliminar el campo del diseño de la configuracion de la captura
function ELIMINAR_CAMPOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {                  
                    ELIMINAR_CAMPO_CAPTURA($('#dgcampos').datagrid('getRows')[cell.index].Campo,$('#dgcampos').datagrid('getRows')[cell.index].Orden);
                    var tri = $('#tcampos').tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        if ($('#dgcampos').datagrid('getRows')[cell.index].Campo == tri[h].name) {
                            $('#tcampos').tree('uncheck', tri[h].target)
                            break;
                        }
                    }
                   // var rows = $('#dgcampos').datagrid('getSelected');
                   // if (rows) {
                       // var rowIndex = $("#dgcampos").datagrid("getRowIndex", rows);
                        $('#dgcampos').datagrid('deleteRow', cell.index);
                    //}
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function ELIMINAR_CAMPO_CAPTURA(campo,orden) {
    //if (movconfig == "") { movconfig = mov;}
    var parametros = {};
    parametros.tabla = idtabla;
    parametros.campo = campo;
    parametros.orden = orden;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Eliminar_CamposCaptura',
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
            else { $.messager.alert('Información', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

//guardar el diseño de la configuracion de la consulta
function GUARDAR_CAMPOS_BUSQUEDA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var colvista = "", colregistro = ""; var Registros = ""; var DisConfiguracion = "", DisVista = "", Bdirecta = "";
        var valor = "";

        $('#dgcolumnas').datagrid('acceptChanges');
        var fields = $('#dgcolumnas').datagrid('getColumnFields', true).concat($('#dgcolumnas').datagrid('getColumnFields', false));
       
        var total = $('#dgcolumnas').datagrid('getData').total;
        if (total > 0) {
            var rows = $('#dgcolumnas').datagrid('getRows');
            rows.sort(OrdenarColumnas);
            for (var f = 0; f < rows.length; f++) {
                for (var c = 1; c < fields.length-1; c++) {
                    valor = rows[f][fields[c]];
                    //if (valor != undefined) {
                        if (fields[c] == 'OrdColumnas') { colregistro += valor + ","; }
                        else
                        {
                            if ((fields[c] == 'AlinerDato') || (fields[c] == 'AlinerTitulo')) {
                                if (valor == 'Izquierda') { valor = 'Left'; }
                                if (valor == 'Centro') { valor = 'Center'; }
                                if (valor == 'Derecha') { valor = 'Right'; }
                            }

                            if (fields[c] == 'Ocultar') {
                                if (valor == "Si") { colregistro += 1 + ","; colvista += true + ","; }
                                else { colregistro += 0 + ","; colvista += false + ","; }
                            }
                            else
                                if (fields[c] == "Longitud")
                                { colvista += valor * 10 + ","; colregistro += valor + ","; }
                                else
                                { colvista += valor + ","; colregistro += valor + ","; }

                            if (fields[c] == 'CampoAnt') {
                                if ((valor != undefined) || (valor != ""))
                                { colvista += "'',"; colregistro += "'',"; }
                                else { colvista += valor + ","; colregistro += valor + ","; }
                            }
                        }
                    //}                   
                }
                colvista = colvista.substring(0, colvista.length - 1);
                colregistro = colregistro.substring(0, colregistro.length - 1);
                colvista = colvista + "|";
                colregistro = colregistro + "|";
            }
            colvista = colvista.substring(0, colvista.length - 1);
            colregistro = colregistro.substring(0, colregistro.length - 1);

            //seleccionar el campo de busqueda de la configuracion
            var campo = $('#tvcambusqueda').tree('getSelected');
            var campos = "Consulta_Longitudcolumnas=''" + colvista + "'',ConfiguracionConsulta=''" + colregistro + "''";
            var condicion = "idtabla=''" + idtabla + "'' and campo=''" + campo.name + "''";

            
            INSERTAR_CONFIGURACION_CAMPOS(campo.name, condicion, '\'\'', '\'\'', campos);

            var total = $('#dgcolumnas').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcolumnas').datagrid('beginEdit', r);
            }


           
            if (error == "0") {
                $.messager.alert('Información', "El diseño de la consulta del campo " + campo.name + " se ha guardado", 'info');
            }
        }
        else { $.messager.alert('Error', "No se ha seleccionado ninguna fila a guardar", 'error'); }

       
    }

}

function CARGAR_LISTA_CAMPOS_CONSULTA(tobj, objcolumnas) {
    var objlstcampos = [];
    var strcolumnas = objcolumnas.split(",");
    for (var c = 0; c < strcolumnas.length; c++) {
        var columnas = strcolumnas[c].split(".");
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.name = columnas[1];
        lstcampos.text = columnas[1];
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
function CARGAR_CONFIGURACION_CONSULTA(dgobj, objdiseño) {
    var ocultar = "", alinear = "";
    var strdiseño = objdiseño.split("|");
    for (var c = 0; c < strdiseño.length; c++) {
        var strdatos = strdiseño[c].split(",");
        
        if ((strdatos[2] == "Left") || (strdatos[4] == "Left")) { alinear = "Izquierda"; }
        if ((strdatos[2] == "Center")|| (strdatos[4] == "Centro")) { alinear = "Centro"; }
        if ((strdatos[2] == "Right") || (strdatos[4] == "Derecha")) { alinear = "Derecha"; }
        if (strdatos[6] == 1) { ocultar = "Si"; } else { ocultar = ""; }

        $(dgobj).datagrid('insertRow', {
            index: c,
            row: {
                OrdColumnas: strdatos[0],
                campo: strdatos[1],
                AlinerDato:alinear,
                Titulo: strdatos[3],                
                AlinearTitulo: alinear,
                Longitud: strdatos[5],
                Ocultar: ocultar,
            }
        });
        $(dgobj).datagrid('beginEdit', c);
    }
    $('#btnGuardarConsulta').linkbutton({ disabled: false });
}
function CARGAR_COLUMNAS_CONSULTA(dgobj, objdiseño) {
    var orden = "";
    var strdiseño = objdiseño.split(";");
    if (strdiseño != "") {
        var campos = strdiseño[2].split("|");
        for (var c = 0; c < campos.length; c++) {
            var columnas = campos[c].split(",");
            if (columnas[2] == '1') { orden = 'Si'; }
            else { orden = ''; }
            $(dgobj).datagrid('insertRow', {
                index: c,
                row: {
                    Tabla: columnas[0],
                    Campo: columnas[1],
                    Orden: orden,
                    Tipo: columnas[3]
                }
            });
            $(dgobj).datagrid('beginEdit', c);
        }
    }
}
function CARGAR_CONDICION(dgobj, objcondicion) {
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    var strdiseño = objcondicion.split(";");
    var strcondicion = strdiseño[3].split(",");
    for (var c = 0; c < strcondicion.length; c++) {
        $(dgobj).datagrid('insertRow', {
            index: c,
            row: {
                Condicion: strcondicion[c]
            }
        });
    }
    var strtabla = strdiseño[0].split(":");   
}
function CREAR_TABLAS(nomtabla, destabla, objdiseño) {
    var vdraggable = $('<div class="easyui-draggable" data-options="onDrag:onDrag,handle:\'#' + nomtabla + '\'" style="width:20%;height:60%;background:#fafafa;border:1px solid #ccc;overflow:hidden;">');
    var title = $('<div id="' + nomtabla + '" style="padding:5px;background:#ccc;color:#fff">' + destabla + '</div>');
    $(vdraggable).append(title);
    var vdiv = $('<div id="d' + nomtabla + '" class="easyui-panel" style="width:100%;height:100%; overflow:scroll;"></div>');
    $(vdraggable).append(vdiv);
    var vtree = $('<ul id="tv' + nomtabla + '" class="easyui-tree" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false">');
    $(vdiv).append(vtree);

    $("#paneldrop").append(vdraggable);
    vdraggable.draggable().resizable();

    CARGAR_COLUMNAS_NOMBRE_TABLAS('#tv' + nomtabla, nomtabla, objdiseño);
}
function CARGAR_COLUMNAS_NOMBRE_TABLAS(tvobj, tabla, objdiseño) {
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
            var tabla = tvobj.substring(3, tvobj.length)
            $(tvobj).tree({
                data: obj,
                onCheck: function (node) {
                    var ch = node.checked;
                    if (ch == true) {
                        var dg = $('#dgcamsel');
                        var cellcampo = dg.datagrid('cell');
                        if (cellcampo != null)
                        { CARGAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node, tabla); }
                        else
                        {
                            var ban = BUSCAR_COLTABLAS_GRID('#dgcamsel', node);
                            if (ban == false) { CARGAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node,tabla); }
                        }
                    }
                    if (ch == false) { QUITAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node); }
                },
                onClick: function (node) {
                    //if (node.name != "") {
                    //    var tabla = tvobj.substring(3, tvobj.length)
                    //    if ((node.checked == undefined) || (node.checked == false)) {
                    //        $(tvobj).tree('check', node.target);

                    //        if (total = $('#dgcamsel').datagrid('getData').total > 0)
                    //        { total = $('#dgcamsel').datagrid('getData').total + 1; }
                    //        else { total = 0; }

                    //        $('#dgcamsel').datagrid('insertRow', {
                    //            index: total,
                    //            row: {
                    //                Tabla: tabla,
                    //                Campo: node.name
                    //            }
                    //        });
                    //    }
                    //    else {
                    //        var rows = $('#dgcamsel').datagrid('getRows');
                    //        for (var p = 0; p < $('#dgcamsel').datagrid('getData').total; p++) {
                    //            if (node.name == rows[p].Campo) {
                    //                $('#dgcamsel').datagrid('deleteRow', p);
                    //                var t = $(tvobj);
                    //                var snode = t.tree('getSelected');
                    //                t.tree('uncheck', snode.target);
                    //                t.tree('unselect', snode.target);
                    //            }
                    //        }
                    //    }
                    //}
                    if (node.name != "") {                                      
                        var ch = node.checked;
                        if ((ch == undefined) || (ch == false)) {
                            var dg = $('#dgcamsel');
                            var cellcampo = dg.datagrid('cell');
                            if (cellcampo != null)
                            { CARGAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node, tabla); cellcampo = ""; }
                            else {
                                var ban = BUSCAR_COLTABLAS_GRID('#dgcamsel', node);
                                if (ban == false) { CARGAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node, tabla); }
                            }
                        }
                    }
                    if (ch == true) { QUITAR_COLTABLAS_SELECCIONADO('#dgcamsel', tvobj, node); }
                },
                onLoadSuccess: function () {
                    if (objdiseño != undefined) {
                        var strdiseño = objdiseño.split("|");
                        var tri = $(tvobj).tree('getRoots');
                        var nomtabla = tvobj.substring(3, tvobj.length);

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
        { $('#loading').hide(100); }
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

            if (objdiseño.length > 0) {
                var strdiseño = objdiseño[0].DiseñoConsulta.split(";");
                var tablas = strdiseño[0].split(',');
            }
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    if (objdiseño.length>0) {
                        var tri = $(tobj).tree('getRoots');
                        for (var t = 0; t < tablas.length; t++) {
                            for (var h = 0; h < tri.length; h++) {
                                var nomtabla = tablas[t].split(':');
                                if (nomtabla[0] == tri[h].name) {
                                    $(tobj).tree('check', tri[h].target);
                                    CREAR_TABLAS(nomtabla[0], nomtabla[1], strdiseño[1]);
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


function CARGAR_DISEÑO_CONSULTA(tabla,campobusqueda) {
    var ojdiseño = "";
    
    var parametros = {};
    parametros.idtabla = tabla;
    parametros.campo = campobusqueda;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_DiseñoConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            ojdiseño = jQuery.parseJSON(data.d[0]);
            if (ojdiseño.length > 0) {
                $('#btnAconsulta').linkbutton('enable');
              
                LIMPIAR_NODECHK_TREE('#tvtblsist', '');
                $('#paneldrop').panel('clear');
                $('#txtrelacion').textbox('setValue', '');
                $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
                $('#tvtblsist').tree('removeAll');
                $('#dgcondicion').datagrid('loadData', { "total": 0, "rows": [] });
                
                
                LISTAR_TABLAS_SISTEMA('#tvtblsist', ojdiseño);

                $('#txtrelacion').textbox('setValue', ojdiseño[0].Consulta_Tabla);

                CARGAR_COLUMNAS_CONSULTA('#dgcamsel', ojdiseño[0].DiseñoConsulta);
                CARGAR_LISTA_CAMPOS_CONSULTA('#tvcampos', ojdiseño[0].Consulta_Columnas);

                if (ojdiseño[0].Consulta_Condicion != "")
                    { CARGAR_CONDICION('#dgcondicion', ojdiseño[0].DiseñoConsulta); }
                                  
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
function CARGAR_CAMPOS_CONSULTA(tabla, campobusqueda) {
    var ojdiseño = "";
    var ocolumnas = "";
    var parametros = {};
    parametros.idtabla = tabla;
    parametros.campo = campobusqueda;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_DiseñoConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
             ocolumnas = $.parseJSON(data.d[0]);
             odiseño = $.parseJSON(data.d[1]);
            
             if (odiseño.length > 0) {
                 $('#btnGuardarConsulta').linkbutton('enable');                 
                 $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });             
                $('#dgcolumnas').datagrid({
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
                        $('#dgcolumnas').datagrid('checkRow', index);
                    },
                });
                var total = $('#dgcolumnas').datagrid('getData').total;
                for (var r = 0; r < total; r++) {
                    $('#dgcolumnas').datagrid('beginEdit', r);
                }
            }

            $('#tvcolconsulta').tree('removeAll');
            if (ocolumnas[0].Consulta_Columnas != "") {
                CARGAR_LISTA_CAMPOS_CONSULTA('#tvcolconsulta', ocolumnas[0].Consulta_Columnas);

                var $datagrid = {};
                var columns = new Array();
                var columnas = ocolumnas[0].Consulta_LongitudColumnas.split('|');
                if (columnas[0] != "") {
                    columnasvista = true;
                   
                    for (var col = 0; col < columnas.length; col++) {
                        datos = columnas[col].split(',');
                        var valor = datos[0];                        
                        var alinearDatos = datos[1];
                        var titulo = datos[2];
                        var alinearTitulo = datos[3];
                        var ancho = datos[4] + "px";
                        
                        columns.push({ "field": valor, "title": titulo, "align": alinearDatos, "halign": alinearTitulo });
                    }
                    $datagrid.columns = new Array(columns);
                    $('#dgvistaprevia').datagrid({ columns: "", url: "" });
                    $('#dgvistaprevia').datagrid($datagrid);
                }
                else { columnasvista = false; }
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

//abrir la ventana de consulta
function ABRIR_VENTANA_CONSULTA() {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var node = $('#tvcambusqueda').tree('getSelected');
        if (node != null) {
           
            LIMPIAR_NODECHK_TREE('#tvtblsist', '');
            $('#paneldrop').panel('clear');
            $('#txtrelacion').textbox('setValue', '');
            $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
            $('#tvtblsel').tree('removeAll');
            $('#dgcondicion').datagrid('loadData', { "total": 0, "rows": [] });
                  
            document.getElementById('lblcampo').innerHTML = "Campo Seleccionado: " + node.name + " = " + node.text;
            CARGAR_DISEÑO_CONSULTA(idtabla, node.name);
            CARGAR_TABLAS_SELECCIONADAS('#tvtblsel');
            windows("#wdisconsulta", 1000, 700, 'Diseño de la Consulta');
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo de busqueda', 'error'); }
    }
}
function LIMPIAR_DISEÑOCONSULTA() {
    LIMPIAR_NODECHK_TREE('#tvtblsist', '');
    $('#paneldrop').panel('clear');
    $('#txtrelacion').textbox('setValue', '');
    $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
}
function ACEPTAR_DISEÑO_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var objlstcampos = [];
        var camposeleccionados = "", campoconsulta = ""; var campoorden = ""; var campocondicion = "",diseñocondicion="", campoconfiguracion = "", diccamcon = "";
        var tablasseleccionadas = ""; var tbl = "";
        //sacar las tablas seleccionadas
        tablasseleccionadas = getCheckedTbl('#tvtblsist');
        if (tablasseleccionadas.length == 0) { $.messager.alert('Error', "Falta seleccionar por lo menos una tabla", 'error'); return 0; }
        else
        if ($('#txtrelacion').textbox('getValue') == "")
        { $.messager.alert('Error', "Falta las relaciones de las tablas", 'error'); return 0;}
        else
        {            
            //cerrar la edicion del grid
            $('#dgcamsel').datagrid('acceptChanges');

            //sacar los campos seleccionados
            var total = $('#dgcamsel').datagrid('getData').total;
            tbl = $('#dgcamsel').datagrid('getRows')[0].Tabla;
            for (var c = 0; c < total; c++) {
                //llenar el objeto de los campos seleccionados de las tablas para la configuracion de la consulta
                var lstcampos = { id: "", name: "", text: "" };
                lstcampos.id = c;
                lstcampos.name = $('#dgcamsel').datagrid('getRows')[c].Campo;
                lstcampos.text = $('#dgcamsel').datagrid('getRows')[c].Campo;
                objlstcampos.push(lstcampos);

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
                var orden = 0; var tipoorden = "";
                if ($('#dgcamsel').datagrid('getRows')[c].Orden == "Si") { orden = 1; }
                if ($('#dgcamsel').datagrid('getRows')[c].Tipo != undefined) { tipoorden = $('#dgcamsel').datagrid('getRows')[c].Tipo; }
                campoconfiguracion += $('#dgcamsel').datagrid('getRows')[c].Tabla + "," + $('#dgcamsel').datagrid('getRows')[c].Campo + "," + orden + "," + tipoorden + "|";

                //sacar el orden de los campos
                if ($('#dgcamsel').datagrid('getRows')[c].Orden != undefined) {
                    if ($('#dgcamsel').datagrid('getRows')[c].Orden == "Si")
                    { campoorden += $('#dgcamsel').datagrid('getRows')[c].Tabla + "." + $('#dgcamsel').datagrid('getRows')[c].Campo + " " + $('#dgcamsel').datagrid('getRows')[c].Tipo + ","; }
                }
            }

            if (camposeleccionados.length > 0) {
                camposeleccionados = camposeleccionados.substring(0, camposeleccionados.length - 1);
                campoconsulta = campoconsulta.substring(0, campoconsulta.length - 1);
                campoconfiguracion = campoconfiguracion.substring(0, campoconfiguracion.length - 1);
            }

            if (campoorden.length > 0)
            { campoorden = campoorden.substring(0, campoorden.length - 1); }


            //sacar las condiciones de la consulta
            var rows = $('#dgcondicion').datagrid('getRows');
            for (i = 0; i < $('#dgcondicion').datagrid('getData').total; i++) {
                campocondicion += rows[i].Condicion.replace(/'/g, "''''") + ' ';
                diseñocondicion += rows[i].Condicion.replace(/'/g, "''''") + ",";
            }
            if (campocondicion.length > 0) {
                diseñocondicion = diseñocondicion.substring(0, diseñocondicion.length - 1);
                campocondicion = campocondicion.substring(0, campocondicion.length - 1);
            }

            //seleccionar el campo de busqueda de la configuracion
            var campo = $('#tvcambusqueda').tree('getSelected');


            var campos = "Consulta_Tabla=''" + $('#txtrelacion').textbox('getValue') + "'',Consulta_Columnas=''" + campoconsulta + "'',Consulta_Condicion=''" + campocondicion+ "'',Consulta_Orden=''" + campoorden + "'',DiseñoConsulta=''" + tablasseleccionadas + ";" + camposeleccionados + ";" + campoconfiguracion +";"+diseñocondicion+ "''";
            var condicion = "idtabla=''" + idtabla + "'' and campo=''" + campo.name + "''";

            //insertar el diseño de la consulta en la tabla        
            INSERTAR_CONFIGURACION_CAMPOS(campo.name, condicion, '\'\'', '\'\'', campos);

            //sacar la lista de los campos seleccionados para la configuracion de la consulta                          
            $('#tvcolconsulta').tree({
                data: objlstcampos
            });

            $("#wdisconsulta").window('close');

            if (error == "0")
            { $.messager.alert('Información', "Consulta guardada correctamente", 'info'); }
        }
    }
}
function ELIMINAR_DISEÑO_CONSULTA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = $('#tvcambusqueda').tree('getSelected');

        $.messager.confirm('Confirm', 'Seguro de eliminar el diseño de la consulta del campos '+campo.name, function (r) {
            if (r) {
                LIMPIAR_NODECHK_TREE('#tvtblsist', '');
                $('#paneldrop').panel('clear');
                $('#txtrelacion').textbox('setValue', '');
                $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });

                var campos = "Consulta_Tabla=''" + $('#txtrelacion').textbox('getValue') + "'',Consulta_Tabla='''',Consulta_Columnas='''',Consulta_Condicion='''',Consulta_Orden='''',Consulta_Longitudcolumnas='''',Consulta_busquedaDirecta='''',Consulta_CamposCaptura='''',DiseñoConsulta='''',ConfiguracionConsulta='''',ConfiguracionCamposCaptura=''''";
                var condicion = "idtabla=" + idtabla + " and campo=''" + campo.name + "''";
                INSERTAR_CONFIGURACION_CAMPOS(campo.name, condicion, '\'\'', '\'\'', campos);

                if (error == "0")
                {
                    var t = $('#tvcambusqueda');
                    var snode = t.tree('getSelected');                   
                    t.tree('unselect', snode.target);
                    $('#tvcolconsulta').tree('removeAll');
                    $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });

                    $.messager.alert('Información', "El diseño de la consulta ha sido eliminada", 'info');
                }
            }
        })
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
        vtvalor = getCheckedName('#tvvalor');
        if (vtvalor == "")
        { vtvalor = $('#txtvalbuscar').textbox('getValue'); }

        if (vtcampos.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else
            if (vtcondicion.name == null) { $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return 0; }
            else
                //if (vtvalor == "") { $.messager.alert('Error', 'Falta el valor a buscar', 'error'); return 0; }
                //else
            {                
            if (vtcondicion.name == 'Like') {                  
                        condicion = vttabla.name + "." + vtcampos.name + " " + vtcondicion.name + " " +'|' + vtvalor + '|';
                }
                else
                 if (vtcondicion.name == '=') {
                     if (vtvalor == "''E''") { condicion = vttabla.name + "." + vtcampos.name + " " + vtcondicion.name + " " + "' '"; }
                        else
                        { condicion = vtcampos.name + " " + vtcondicion.name + " " + "'" + vtvalor + "'"; }
                    }
                    else
                      if ((vtcondicion.name == 'In') || (vtcondicion.name == "Not In")) {
                                condicion =vtcampos.name + " " + vtcondicion.name + "('" + vtvalor + "')";
                            } else {
                                if (vtvalor == "''E''") { condicion = vttabla.name + "." + vtcampos.name + " " + vtcondicion.name + " " + "' '"; }
                                else
                                { condicion =vtcampos.name + " " + vtcondicion.name + " " + "'" + vtvalor + "'"; }
                            }                    
                    
                    if ($('#opcY').linkbutton('options').selected) { logico = 'and'; }
                    if ($('#opcO').linkbutton('options').selected) { logico = 'or'; }

                    if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el operador lógico', 'error'); return 0; }
                    else { condicion = logico + " " + condicion; }


                    $('#dgcondicion').datagrid('insertRow', {
                        index: 1,
                        row: {
                            Condicion: condicion,
                        }
                    });
                    $('#opcY').linkbutton({ selected: false });
                    $('#opcO').linkbutton({ selected: false });
                    var t = $('#tvcampos');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                     t.tree('doFilter', '');
                    var t = $('#tvcondicion');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                    t.tree('doFilter', '');
                   // $('#tvvalor').tree('removeAll');
                    $('#txtcampo').textbox('setValue', '');
                    $('#txtcondicion').textbox('setValue', '');
                    $('#txtvalbuscar').textbox('setValue', '');
                    
                }
    }
}
function ELIMINAR_CONDICION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //rows = $('#dgcondicion').datagrid('getSelected');
        //if (rows) {
        //    $.messager.confirm('Confirm', 'Seguro de eliminar la condición', function (r) {
        //        if (r) {
        //            var rowIndex = $("#dgcondicion").datagrid("getRowIndex", rows);
        //            $('#dgcondicion').datagrid('deleteRow', rowIndex);
        //        }
        //    })
        //}
        $('#dgcondicion').datagrid('acceptChanges');
        //rows = $('#dgcondicion').datagrid('getSelected');
        //if (rows) {
        var dg = $('#dgcondicion');
        var cell = dg.datagrid('cell');
        var indice = cell.index;
        if (cell != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la condición', function (r) {
                if (r) {
                    var rows = dg.datagrid('getRows')[indice];
                    var rowIndex = $("#dgcondicion").datagrid("getRowIndex", rows);
                    $('#dgcondicion').datagrid('deleteRow', rowIndex);
                }
            })
        }
    }
}


function GENERAR_RELACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tablasseleccionadas = "";
        //sacar las tablas seleccionadas
        tablasseleccionadas = getCheckedName('#tvtblsist');

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

function LIMPIAR_DISEÑO_VISTA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#tcamvista').tree({
            onLoadSuccess: function () {
                if (objvista != undefined) {
                    //var strdiseño = obj.split("|");
                    var tri = $('#tcamvista').tree('getRoots');
                    for (var t = 0; t < objvista.length; t++) {
                       // var strcampo = strdiseño[t].split(",");
                        for (var h = 0; h < tri.length; h++) {
                            if (objvista[t].Campo == tri[h].name) {
                                $('#tcamvista').tree('check', tri[h].target)
                                break;
                            }
                        }
                    }
                }
            }
        });
        $('#dgvista').datagrid('loadData', { "total": 0, "rows": [] });
        CARGAR_GRID_VISTA('#dgvista', objvista);
    }
}
function LIMPIAR_DISEÑO_CAMPOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
        $('#tcampos').tree({
            onLoadSuccess: function () {
                if (objcampos != undefined) {
                    var tri = $('#tcampos').tree('getRoots');
                    for (var t = 0; t < objcampos.length; t++) {
                        for (var h = 0; h < tri.length; h++) {
                            if (objcampos[t].Campo == tri[h].name) {
                                $('#tcampos').tree('check', tri[h].target)
                                break;
                            }
                        }
                    }
                }
            }
        });
        $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });
        CARGAR_GRID_CAMPOS('#dgcampos', objcampos);
    }
}
function LIMPIAR_DISEÑO_BUSQUEDA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcambusqueda');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#tvcolconsulta').tree('removeAll');
        $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });

        CARGAR_CAMPOS_BUSQUEDA('#tvcambusqueda');
    }
}
function LIMPIAR_DISEÑO_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        LIMPIAR_NODECHK_TREE('#tvtablas', '');
        $('#paneldrop').panel('clear');
        $('#dgcamsel').datagrid('loadData', { "total": 0, "rows": [] });
    }
}

//ventana de relacion campo catalogo
function VENTANA_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvtablas');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#tvcamvalor').tree('removeAll');
        $('#tvcamtexto').tree('removeAll');
        
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
           // dg.datagrid('acceptChanges');
            var indice = cell.index;
            dg.datagrid('checkRow', indice);
            var row = dg.datagrid('getRows')[indice];
            if (objcampos[cell.index].TipoDato == "s") {
                if (objcampos[cell.index].Catalogo_Tabla != "") {
                    $('#txttablas').textbox('setValue', objcampos[cell.index].Catalogo_Tabla);
                    $('#lblcatalogo').text('Campo Seleccionado: ' + row.Campo);                    
                }
                CARGAR_TABLAS_SISTEMAS(objcampos[cell.index].Catalogo_Tabla, objcampos[cell.index].Catalogo_Valor, objcampos[cell.index].Catalogo_Texto);               
                windows("#wcatalogo", 700, 350, 'Relación del Campos Catálogo');
            }
            else { $.messager.alert('Error', 'Para relacionar el catálogo, se tiene que tener tipo de dato "SELECCON"', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}
function ACEPTAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var relacion = "";
        var t = $('#tvtablas');
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
            var indice = "";
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                indice = cell.index;
                var row = dg.datagrid('getRows')[cell.index];
                var campos = "Habilitarcatalogo=1,Catalogo_tabla=''" + tabla.text + "'',catalogo_Texto=''" + camtexto.text + "'',catalogo_valor=''" + camvalor.text + "'',catalogo_consulta=''Select * From " + tabla.text + " Order by " + camtexto.name + "''";
                var condicion = "idtabla=''" + idtabla + "'' and campo=''" + row.Campo + "''";
                INSERTAR_CONFIGURACION_CAMPOS(row.Campo, condicion, '', '', campos);
                dg.datagrid('beginEdit', indice);
               
                if (error == "0") {
                    dg.datagrid('updateRow', {
                        index: indice,
                        row: {
                            HabilitarCatalogo: "Si"
                        }
                    });
                    $.messager.alert('Informacion', 'Se ha guardado la relación del catálogo con el campo ' + row.Campo, 'info');                    
                }
                else {
                    dg.datagrid('updateRow', {
                        index: indice,
                        row: {
                            HabilitarCatalogo: ""
                        }
                    });
                }                
                $("#wcatalogo").window('close');
                dg.datagrid('uncheckRow', indice);
            }
        }
    }
}
function LIMPIAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvtablas');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#tvtablas').tree('doFilter', '');
        $('#txttablas').textbox('setValue', '');
        $('#txtcamvalor').textbox('setValue', '');
        $('#txtcamtexto').textbox('setValue', '');

        $('#tvcamvalor').tree('removeAll');
        $('#tvcamtexto').tree('removeAll');
    }
}

function CARGAR_COLUMNAS_TABLA_RELCION(tvobj, tabla,camposrelacion) {
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
                onClick: function (node) {
                    if (node.name != "") {
                        var tabla = tvobj.substring(3, tvobj.length)
                        if ((node.checked == undefined) || (node.checked == false)) {
                            $(tvobj).tree('check', node.target);

                            if (total = $('#dgcamsel').datagrid('getData').total > 0)
                            { total = $('#dgcamsel').datagrid('getData').total + 1; }
                            else { total = 0; }

                            $('#dgcamsel').datagrid('insertRow', {
                                index: total,
                                row: {
                                    tabla: tabla,
                                    campo: node.name
                                }
                            });
                        }
                        else {
                            var rows = $('#dgcamsel').datagrid('getRows');
                            for (var p = 0; p < $('#dgcamsel').datagrid('getData').total; p++) {
                                if (node.name == rows[p].campo) {
                                    $('#dgcamsel').datagrid('deleteRow', p);
                                    var t = $(tvobj);
                                    var snode = t.tree('getSelected');
                                    t.tree('uncheck', snode.target);
                                    t.tree('unselect', snode.target);
                                }
                            }
                        }
                    }
                },
                onLoadSuccess: function () {
                    //var campos = camposrelacion.split(',');
                    //var tri = $(tvobj).tree('getRoots');
                    //for (var c = 0; c < campos.length; c++) {
                    //        for (var h = 0; h < tri.length; h++) {
                    //            if (campos[c] == tri[h].text) {
                    //                $(tvobj).tree('select', tri[h].target)
                    //                break;
                    //            }
                    //        }
                    //    }                            
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
function CARGAR_CAMPOS_RELACION(tvobj, camporelacion) {
    var listacampos = {};
    var objlistas = [];

    $('#dgcampos').datagrid('acceptChanges');
    tdgtablas = $('#dgcampos').datagrid('getData').total;
    for (var p = 0; p < tdgtablas; p++) {
        if ($('#dgcampos').datagrid('getRows')[p].tipodato == "s");
        {
            listacampos = { id: "", name: "", text: "", attributes: "" };
            listacampos.id = p;
            listacampos.name = $('#dgcampos').datagrid('getRows')[p].campo;
            listacampos.text = $('#dgcampos').datagrid('getRows')[p].descripcionCampo;
            objlistas.push(listacampos);
        }
    }
    $(tvobj).tree({
        data: objlistas,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
        onLoadSuccess: function () {
            var tri = $(tvobj).tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                if (camporelacion == tri[h].name) {
                    $(tvobj).tree('select', tri[h].target)
                    break;
                }
            }
        }
    });
}

//ventana de relacion de campos filtros
function ABRIR_CAMPOS_FILTROS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {           
            var indice = cell.index;
            dg.datagrid('checkRow', cell.index);
            var row = dg.datagrid('getRows')[cell.index];
            if (dg.datagrid('getRows')[cell.index].HabilitarCatalogo == "Si") {
                CARGAR_COLUMNAS_TABLA_RELCION('#tcolizq', row.Catalogo_Tabla,row.CampoRelacion);
                //CARGAR_CAMPOS_RELACION('#tcolder', objcampos[cell.index].Campo);
                CARGAR_CAMPOS('#tcolder', indice);                
                $('#txtfiltro').textbox('setValue', row.Catalogo_Consulta);
                $('#lblcamrelacion').text('Campo Seleccionado: ' + row.Campo);
                windows("#wCampoFiltro", 700, 400, 'Filtro del Catálogo');
            }
            else { $.messager.alert('Error', 'Falta relacionar el campo con el catálogo', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}
function ELIMINAR_CAMPOS_FILTRO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfiltro').textbox('setValue', filtrocat);
    }
}
function AGREGAR_CAMPOS_FILTRO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var logico = ""; var query = "";
        var t = $('#tcolizq');
        var valor = t.tree('getSelected');
        if (valor.text == "") { $.messager.alert('Error', 'Falta seleccionar la columna del catálogo', 'error'); return 0; }
        else
            var t = $('#tcolder');
        var texto = t.tree('getSelected');
        if (texto.text == "") { $.messager.alert('Error', 'Falta seleccionar el campo del filtro', 'error'); return 0; }
        else
        {
            if ($('#btnY').linkbutton('options').selected) { logico = 'and'; }
            if ($('#btnO').linkbutton('options').selected) { logico = 'or'; }

            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            var row = dg.datagrid('getRows')[cell.index];

            campofiltro += texto.name + ",";
            if (logico == "") {
                query = 'Select * From ' + row.Catalogo_Tabla + ' where ' + valor.text + '=' + '@' + texto.name + ' Order by ' + row.Catalogo_Texto;
                sessionStorage.setItem('condicion', 'Select * From ' + row.Catalogo_Tabla + ' where ' + valor.text + '=' + '@' + texto.name);
            }
            else {
                query = sessionStorage.getItem('condicion') + ' ' + logico + ' ' + valor.text + '=' + '@' + texto.name + ' Order by ' + row.Catalogo_Texto
            }
            $('#txtfiltro').textbox('setValue', '');
            $('#txtfiltro').textbox('setValue', query);

            var t = $('#tcolizq');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }
            var t = $('#tcolder');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
                t.tree('doFilter', '');
            }
            $('#txtcolizq').textbox('setValue', '');
            $('#txtcolder').textbox('setValue', '');

            $('#btnY').linkbutton({ selected: false });
            $('#btnO').linkbutton({ selected: false });
        }
    }
}
function ACEPTAR_CAMPOS_FILTRO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            var row = dg.datagrid('getRows')[cell.index];
            var campos = "Catalogo_Consulta=''" + $('#txtfiltro').textbox('getValue') + "'',CampoRelacion=''" + campofiltro.substring(0, campofiltro.length - 1) + "''";
            var condicion = "idtabla=''" + idtabla + "'' and campo=''" + row.Campo + "''";
            INSERTAR_CONFIGURACION_CAMPOS(row.Campo, condicion, '', '', campos);

            $('#dgcampos').datagrid('updateRow', {
                index: indice,
                row: {CampoFiltro: campofiltro.substring(0, campofiltro.length - 1)}
            });
            campofiltro = "";
            $('#dgcampos').datagrid('uncheckRow', cell.index);
            $("#wCampoFiltro").window('close');
        }
    }
}


function CARGAR_CAMPOS(tvobj,index) {
    objlstcampos = [];
    var tdgcampos = $('#dgcampos').datagrid('getData').total;
    for (var p = 0; p < tdgcampos; p++) {
        if (objcampos[p].TipoDato == 's') {

            listacampos = { id: "", name: "", text: "" };
            //var name = $('#dgcampos').datagrid('getRows')[p].Campo;
            //var text = $('#dgcampos').datagrid('getRows')[p].Descripcion;

            var name = objcampos[p].Campo;
            var text = objcampos[p].Descripcion;

            listacampos.id = p;
            listacampos.name = name;
            listacampos.text = text;
            objlstcampos.push(listacampos);
        }
    }
    $(tvobj).tree({
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        },
        onLoadSuccess: function () {
            var tri = $(tvobj).tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                if (objcampos[index].CampoRelacion == tri[h].name) {
                    $(tvobj).tree('select', tri[h].target)
                    break;
                }
            }
        }
    });       
}

//ventana de los campoas a relacionar 
function ABRIR_FILTRAR_CAMPO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var row = dg.datagrid('getRows')[cell.indice];
            if (objcampos[cell.index].TipoDato == "s") {             
                dg.datagrid('checkRow', cell.index);
                CARGAR_CAMPOS('#tvcamfiltro', cell.index);
                windows("#wcamfiltrar", 300, 500, 'Campo a Relacionar');
            }
            else { $.messager.alert('Error', 'El campo '+row.Campo+' no es tipo seleccion', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}
function ACEPTAR_FILTRO_CAMPO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        var row = dg.datagrid('getRows')[cell.index];

        var t = $('#tvcamfiltro');
        var campo = t.tree('getSelected');
        if (campo.text == "") { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else {
          
            var campos = "CampoFiltro=''" + campo.name + "''";
            var condicion = "idtabla=''" + idtabla + "'' and campo=''" + row.Campo + "''";
            INSERTAR_CONFIGURACION_CAMPOS(row.Campo, condicion, '', '', campos);
            if (error == "0") {
                $('#dgcampos').datagrid('updateRow', {
                    index: cell.index,
                    row: {
                        CampoRelacion: campo.name
                    }
                });
                $.messager.alert('Informacion', 'Se ha guardado el campo a filtrar por el campo ' + row.Campo, 'info');
            }
            else {
                $('#dgcampos').datagrid('updateRow', {
                    index: celL.index,
                    row: {
                        CampoRelacion: ""
                    }
                });
            }
            $('#dgcampos').datagrid('uncheckRow', cell.index);
            $("#wcamfiltrar").window('close');
        }
    }
}
function LIMPIAR_FILTRO_CAMPO()
{
    var t = $('#tvcamfiltro');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('txtcamfiltro').textbox('setValue', '');
}

function CARGAR_CONFIGURACION_CAMPOS_CONSULTA(tobj, objcolumnas) {
    var objlstcampos = [];
    var strcolumnas = objcolumnas.split(",");
    for (var c = 0; c < strcolumnas.length; c++) {
        var columnas = strcolumnas[c].split(".");
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.name = columnas[1];
        lstcampos.text = columnas[1];
        objlstcampos.push(lstcampos);
    }
    $(tobj).tree({
        data: objlstcampos
    });
}
function CARGAR_RELACION_CAMPOSCAPTURA(oconfigcam) {
    var campos = oconfigcam.split("|");
    $('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });
    for (var c = 0; c < campos.length; c++) {
        var col = campos[c].split('/');
        $('#dgcamcaptura').datagrid('insertRow', {
            index: c,
            row:
                {
                    camconsulta: col[0],
                    namecamcap: col[1],
                    camcaptura: col[2]
                }
        });
    }
}
function CARGAR_LISTA_CAMPOS_CAPTURA(tobj) {    
    var dg = $('#dgcampos');   
    var objlstcampos = [];        
        for (var c = 0; c < dg.datagrid('getData').total ; c++) {
            var objTipoDato = dg.datagrid('getEditor', { index: c, field: 'TipoDato'});
            var tipodato = $(objTipoDato.target).combobox('getValue');
            var lstcampos = { id: "", name: "", text: "", attributes: "" };
            lstcampos.id = c;
            lstcampos.name = dg.datagrid('getRows')[c].Campo;
            lstcampos.attributes = tipodato + "," + dg.datagrid('getRows')[c].Campo;
            lstcampos.text = dg.datagrid('getRows')[c].Descripcion;
            objlstcampos.push(lstcampos);
        }
        $(tobj).tree({
            data: objlstcampos
        });


        var total = dg.datagrid('getData').total;
        for (var r = 0; r < total; r++) {
            dg.datagrid('beginEdit', r);
        }    
}

function CARGAR_LISTA_CAMPOS_VISTA(tobj) {
    var objlstcampos = [];
    for (var c = 0; c < $('#dgvista').datagrid('getData').total ; c++) {
        var lstcampos = { id: "", name: "", text: "", attributes: "" };
        lstcampos.id = c;
        lstcampos.name = $('#dgvista').datagrid('getRows')[c].Campo;
        lstcampos.attributes = $('#dgvista').datagrid('getRows')[c].TipoDato + "," + $('#dgvista').datagrid('getRows')[c].Campo;
        lstcampos.text = $('#dgvista').datagrid('getRows')[c].Titulo;
        objlstcampos.push(lstcampos);
    }
    $(tobj).tree({
        data: objlstcampos
    });
}
function CARGAR_LISTA_CAMPOSCONSULTA(tobj, campobusqueda) {
    
    var ocolumnas = "", oconfigcam;
    var parametros = {};
    parametros.idtabla = idtabla;    
    parametros.campo = campobusqueda;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_DiseñoConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            ocolumnas =obj[0].Consulta_Columnas;
            oconfigcam = obj[0].ConfiguracionCamposCaptura;
            if (ocolumnas != "") {
                CARGAR_CONFIGURACION_CAMPOS_CONSULTA(tobj, ocolumnas);
            }
            if (oconfigcam != "") {
                CARGAR_RELACION_CAMPOSCAPTURA(oconfigcam);
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

//ventana de la relacion de campos captura
function ABRIR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
       // $('#dgcampos').datagrid('acceptChanges');
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {            
            if (dg.datagrid('getRows')[cell.index].HabilitarBusqueda == "Si") {
                $('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });
                $('#txtcamcon').textbox('setValue', '');
                var t = $('#tvcamcon');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                }
                $('#txtcamcap').textbox('setValue', '');
                var t = $('#tvcamcap');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                }
                CARGAR_LISTA_CAMPOS_CAPTURA('#tvcamcap');
                CARGAR_LISTA_CAMPOSCONSULTA('#tvcamcon', $('#dgcampos').datagrid('getRows')[cell.index].Campo);
                   
                windows("#wcamcaptura", 510, 600, false,"Relación del campo captura con la consulta");
            }
            else { $.messager.alert('Error', 'El Campo ' + $('#dgcampos').datagrid('getRows')[cell.index].Campo + ' no esta habilitada la busqueda', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar para la captura', 'error'); }
    }
}
function AGREGAR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamcon');
        var campoconsulta = t.tree('getSelected');
        if (campoconsulta == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la consulta', 'error'); return 0; }
        else
        {
            var t = $('#tvcamcap');
            var campocaptura = t.tree('getSelected');
            if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la captura', 'error'); return 0; }
            else
            {
                var filas = $('#dgcamcaptura').datagrid('getSelected');
                if (filas == null) {
                    if (total = $('#dgcamcaptura').datagrid('getData').total > 0)
                    { total = $('#dgcamcaptura').datagrid('getData').total + 1; }
                    else { total = 0; }
                    $('#dgcamcaptura').datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                camcaptura: campocaptura.name,
                                namecamcap: campocaptura.attributes,
                                camconsulta: campoconsulta.text
                            }
                    });
                }
                else {
                    var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
                    $('#dgcamcaptura').datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                camcaptura: campocaptura.name,
                                namecamcap: campocaptura.attributes,                                
                                camconsulta: campoconsulta.text
                            }
                    });
                    $('#dgcamcaptura').datagrid('unselectRow');
                }

                $('#txtcamcon').textbox('setValue', '');
                var t = $('#tvcamcon');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }

                $('#txtcamcap').textbox('setValue', '');
                var t = $('#tvcamcap');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }
            }
        }

    }
}
function ELIMINAR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgcamcaptura').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
                    $('#dgcamcaptura').datagrid('deleteRow', rowIndex);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamcon').textbox('setValue', '');
        var t = $('#tvcamcon');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcamcap').textbox('setValue', '');
        var t = $('#tvcamcap');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        CARGAR_LISTA_CAMPOSCONSULTA('#tvcamcon', $('#dgcampos').datagrid('getRows')[cell.index].Campo);
    }
}
function ACEPTAR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cadcaptura = "", cadconfiguracion = "";
        var total = $('#dgcamcaptura').datagrid('getData').total;
        for (var p = 0; p < total; p++) {

            cadcaptura += $('#dgcamcaptura').datagrid('getRows')[p].namecamcap + "|";
            cadconfiguracion += $('#dgcamcaptura').datagrid('getRows')[p].camconsulta + "/" + $('#dgcamcaptura').datagrid('getRows')[p].namecamcap + "/" + $('#dgcamcaptura').datagrid('getRows')[p].camcaptura + "|";
        }
        cadcaptura = cadcaptura.substring(0, cadcaptura.length - 1);
        cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);
        
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        var row = dg.datagrid('getRows')[cell.index];
        var condicion = "idtabla=''" + idtabla + "'' and campo=''" + row.Campo + "''";
        var campos = "configuracionCamposcaptura=''" + cadconfiguracion + "'',consulta_CamposCaptura=''" + cadcaptura + "''";
        INSERTAR_CONFIGURACION_CAMPOS(row.Campo, condicion, '', '', campos);

        if (error == "0") {
            $.messager.alert('Información', 'La relación de los campos captura-consulta se ha guardado', 'info');
            $('#dgcampos').datagrid('updateRow', {
                index: cell.index,
                row: { CampoCaptura: "Si" }
            });
            $("#wcamcaptura").window('close');
            $('#dgcampos').datagrid('uncheckAll', cell.index);

            //$('#dgcampos').datagrid('beginEdit', cell.index);

        }
    }
}

//ventana de la relacion de la vista con campos captura
function AGREGAR_CAMPOS_VISTACAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tcamconvista');
        var campoconsulta = t.tree('getSelected');
        if (campoconsulta == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la consulta', 'error'); return 0; }
        else
        {
            var t = $('#tcamcapvista');
            var campocaptura = t.tree('getSelected');
            if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la captura', 'error'); return 0; }
            else
            {
                var filas = $('#dgcamvista').datagrid('getSelected');
                if (filas == null) {
                    if (total = $('#dgcamvista').datagrid('getData').total > 0)
                    { total = $('#dgcamvista').datagrid('getData').total + 1; }
                    else { total = 0; }
                    $('#dgcamvista').datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                camcaptura: campocaptura.name,                                
                                namecamcap: campocaptura.attributes,
                                camconsulta: campoconsulta.name,
                            }
                    });
                }
                else {
                    var rowIndex = $("#dgcamvista").datagrid("getRowIndex", filas);
                    $('#dgcamvista').datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                camcaptura: campocaptura.name,
                                namecamcap: campocaptura.attributes,
                                camconsulta: campoconsulta.name,
                            }
                    });
                    $('#dgcamvista').datagrid('unselectRow');
                }

                $('#txtcamconvista').textbox('setValue', '');
                var t = $('#tcamconvista');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }

                $('#txtcamcapvista').textbox('setValue', '');
                var t = $('#tcamcapvista');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }
            }
        }

    }
}
function ELIMINAR_CAMPOS_VISTACAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgcamvista').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = $("#dgcamvista").datagrid("getRowIndex", filas);
                    $('#dgcamvista').datagrid('deleteRow', rowIndex);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPOS_VISTACAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamconvista').textbox('setValue', '');
        var t = $('#tcamconvista');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcamcapvista').textbox('setValue', '');
        var t = $('#tcamcapvista');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#dgcamvista').datagrid('loadData', { "total": 0, "rows": [] });       
    }
}
function ACEPTAR_CAMPOS_VISTACAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cadcaptura = "", cadconfiguracion = "";
        var total = $('#dgcamvista').datagrid('getData').total;
        for (var p = 0; p < total; p++) {
           
            cadconfiguracion += $('#dgcamvista').datagrid('getRows')[p].camcaptura + "/" + $('#dgcamvista').datagrid('getRows')[p].namecamcap + "/" + $('#dgcamvista').datagrid('getRows')[p].camconsulta + "|";
        }       
        cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);
              
        var campos = "Camposcaptura=''" + cadconfiguracion + "''";
        INSERTAR_CAMPOS_VISTACAPTURA(campos);

        if (error == "0") {
            $.messager.alert('Información', 'La relación de los campos vista-captura se han guardado', 'info');            
            $("#wvistacaptura").window('close');           
        }
    }
}
function INSERTAR_CAMPOS_VISTACAPTURA(campos, condicion) {
    var parametros = {};
    parametros.idtabla = idtabla;
    parametros.campos = campos,    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Campos_Vista_Captura',
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
            else { error = "0"; }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function RELACION_VISTA_CAMPOS_CAPTURA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
            if ($('#dgvista').datagrid('getRows') == 0) { $.messager.alert('Error', 'Falta la configuración de la vista del catálogo', 'error'); return 0;}
            else
                if ($('#dgcampos').datagrid('getRows') == 0) { $.messager.alert('Error', 'Falta la configuración de los campos del catálogo', 'error'); return 0;}
                else
                {
                    $('#txtcamcapvista').textbox('setValue', '');
                    var t = $('#tcamcapvista');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                    $('#txtcamconvista').textbox('setValue', '');
                    var t = $('#tcamconvista');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                    CARGAR_LISTA_CAMPOS_CAPTURA('#tcamcapvista');
                    CARGAR_LISTA_CAMPOS_VISTA('#tcamconvista');
                    CARGAR_CONFIGURACION_CAPTURA_VISTA();
                    windows("#wvistacaptura", 510, 600,false, "Relación del campo captura con la vista");
                }       
    }
}
function CARGAR_CONFIGURACION_CAPTURA_VISTA()
{
    if (objtbl[0].CamposCaptura != "") {
        var valores = objtbl[0].CamposCaptura.split("|");
        for (var i = 0; i < valores.length; i++) {
            var datos = valores[i].split("/");
            $('#dgcamvista').datagrid('insertRow', {
                index: i,
                row:
                    {
                        camcaptura: datos[0],
                        namecamcap: datos[1],
                        camconsulta: datos[2]
                    }
            });
        }
    }
}


function MOSTRAR_CONFIGURACION_CAMPO_BUSQUEDA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Listar_CamposBusqueda',           
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                objcampos = jQuery.parseJSON(data.d[0]);
                $('#dgcambusqueda').datagrid({
                    data: objcampos,
                    onClickRow: function () {
                        rows = $('#dgcambusqueda').datagrid('getSelected');
                        if (rows) {
                            $.session.set('tabla', rows.idtabla);
                            $.session.set('campo', rows.campo);
                            CARGAR_CAMPOS_CONSULTA(rows.idtabla, rows.campo);
                            $("#wcambusqueda").window('close');
                        }
                    },                
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); },
                    onBeforeEdit: function (index, row) {
                        row.editing = true;
                        $('#dgcampos').datagrid('checkRow', index);
                    },
                });

                windows("#wcambusqueda", 500, 498, 'Campos Busqueda');
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

function ABRIR_VENTANA_CAMPO_OPCIONES(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcampos').datagrid('checkRow', indice);
            $('#txtopcV').textbox('setValue', '');
            $('#txtopcF').textbox('setValue', '');
            $('#txtvalV').textbox('setValue', '');
            $('#txtvalF').textbox('setValue', '');

            var row = dg.datagrid('getRows')[indice];
            var index = row.CampoOpciones.indexOf("|");
            if (index > 0) {
                var opc = row.CampoOpciones.split("|");
                var valores = opc[0].split(",");
                $('#txtopcV').textbox('setValue', valores[0]);
                $('#txtvalV').textbox('setValue', valores[1]);

                var valores = opc[1].split(",");
                $('#txtopcF').textbox('setValue', valores[0]);
                $('#txtvalF').textbox('setValue', valores[1]);
            }
            windows("#wcampoopciones", 500, 150, false, 'Opciones del Campos');
        }
    }
}

function ACEPTAR_VENTANA_CAMPO_OPCIONES(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var opciones = "";      
        opciones = $('#txtopcV').textbox('getValue') + "," + $('#txtvalV').textbox('getValue') + "|" + $('#txtopcF').textbox('getValue') + "," + $('#txtvalF').textbox('getValue');
        if (opciones == ",|,") { opciones = ""; }
                
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {              
                var row = dg.datagrid('getRows')[cell.index];
                var campos = "CampoOpciones=''" + opciones + "''";
                var condicion = "idtabla=''" + idtabla + "'' and campo=''" + row.Campo + "''";
                INSERTAR_CONFIGURACION_CAMPOS(row.Campo, condicion, '', '', campos);
                if (error == "0") {
                    $('#dgcampos').datagrid('updateRow', {
                        index: cell.index,
                        row: {
                            CampoOpciones: opciones,
                        }
                    });
                    $.messager.alert('Informacion', 'Se han guardado las opciones del campo ' + row.Campo, 'info');
                }
                else {
                    $('#dgcampos').datagrid('updateRow', {
                        index: cell.index,
                        row: {
                            CampoOpciones: ""
                        }
                    });
                }
                $("#wcampoopciones").window('close');
                $('#dgcampos').datagrid('uncheckRow', cell.index);
            }                    
    }
}

function LIMPIAR_VENTANA_CAMPO_OPCIONES(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtopcV').textbox('setValue', '');
        $('#txtopcF').textbox('setValue', '');
        $('#txtvalV').textbox('setValue', '');
        $('#txtvalF').textbox('setValue', '');
    }
}

function CARGAR_CAT(dgcontrol, strcampo) {
    var con = "";  
    $(dgcontrol).datagrid({
        url: "Listar_Catalogo.aspx?tabla=" + idtabla + "&campo=" + strcampo + "&busqueda=" + con
    });    
}

function RECARGAR_VISTAPREVIA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tcambusqueda = $('#tvcambusqueda').tree('getSelected');
        if (tcambusqueda != null) {
            CARGAR_CAT('#dgvistaprevia', tcambusqueda.name);
        }

    }
}
