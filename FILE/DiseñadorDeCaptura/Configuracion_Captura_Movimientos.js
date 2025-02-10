var tipo = "", mov = "", des = "", error = "", movconfig = "", consulta_cargada = false;
var tipomov = "G", condicion = "",tabla="";
var checkedRows = [];
var checkedRowsCol = [];
var checkedCamFil = [];
var tablaseleccionada = false;
var camposeleccionado = false;
var columnasvista = false;
var cargarcamsel = false;
var condicion = "";
var objcamposcaptura = "";
var editIndex = undefined;
var campofiltro = "";

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

  
    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = 'MP'; }

    if ($_GET('mov') != null) {
        mov = $_GET('mov');
    } else { mov = '090103'; }
   

    if ($_GET('des') != null) {
        des = $_GET('des');
    } else { des = 'CAMBIO DE GRUPO NOMINAL'; }

       
    document.getElementById('lblmov').innerHTML = "Movimiento Seleccionado: " + des;

    $('#btnRegresar').bind('click', function () {
        document.location = "Catalogo_Rubros.aspx?tipo=" + tipo
    });
         

    FILTRAR_TREE_TXT('#txtcampos', '#tcampos');
    FILTRAR_TREE_TXT('#txtcambusqueda', '#tvcambusqueda');
    FILTRAR_TREE_TXT('#txtBTablas', '#tvtablas');
    FILTRAR_TREE_TXT('#txtcolconsulta', '#tvcolconsulta');

   // FILTRAR_TREE_TXT('#txttblsel', '#tvtblsel');
    FILTRAR_TREE_TXT('#txtcampo', '#tvcampos');
    FILTRAR_TREE_TXT('#txtcondicion', '#tvcondicion');
    FILTRAR_TREE_TXT('#txtvalbuscar', '#tvvalor');

    FILTRAR_TREE_TXT('#txtcamdirectos', '#tvcamdirectos');

    FILTRAR_TREE_TXT('#txtcamcon', '#tvcamcon');
    FILTRAR_TREE_TXT('#txtcamcap', '#tvcamcap');

    FILTRAR_TREE_TXT('#txtmovimientos', '#tvmovimientos');

    FILTRAR_TREE_TXT('#txttablas', '#ttblsistemas');
    FILTRAR_TREE_TXT('#txtcamvalor', '#tvcamvalor');
    FILTRAR_TREE_TXT('#txtcamtexto', '#tvcamtexto');
    
   
    $('#tvcamcap').tree({
        onClick: function (node) {
            if (node.name != 0) {
                for (var i = 0; i < $('#dgcamcaptura').datagrid('getData').total; i++) {
                    if (node.name == $('#dgcamcaptura').datagrid('getRows')[i].camcaptura) {
                        $('#dgcamcaptura').datagrid('selectRow', i);
                    }
                    else { $('#dgcamcaptura').datagrid('unselectRow', i); }
                }
            }
        }
    });

    $('#ttblsistemas').tree({
        onClick: function (node) {
            if (node.text != 0) {
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', node.text);
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', node.text);
            }
        }
    });

    $('#tcampos').tree({
        onCheck: function (node)
        {                    
           var ch = node.checked;           
           if (ch == true) {               
               var dg = $('#dgcampos');
               var cellcampo = dg.datagrid('cell');
               if (cellcampo != null) 
               { CARGAR_CAMPO_SELECCIONADO(node); }
               else
               {
                 var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcampos', node);
                 if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
               }
           }
           if (ch == false) { QUITAR_CAMPO_SELECCIONADO(node); }          
        },
        onClick: function (node)
        {            
           if (node.name != "") {
              var ch = node.checked;
              if ((ch == undefined) || (ch == false)) {                 
                  var dg = $('#dgcampos');
                 var cellcampo = dg.datagrid('cell');
                  if (cellcampo != null) 
                  { CARGAR_CAMPO_SELECCIONADO(node); cellcampo = "";}
                  else{
                      var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcampos', node);
                      if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
                    }
                }               
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

    $('#tvcampos').tree({
        onClick: function (node) {
            if (node.name != "") {
                if (node.attributes != "")
                { CARGAR_CATALOGO('#tvvalor', node.attributes); }
            }
        }
    });

    $('#tvcamtbl').tree({
        onCheck: function (node) {
            var ch = node.checked;
            var SelCamtbl = $.session.get('SelCamtbl');
            if ((ch == true) && (SelCamtbl == "false")) {
                CARGAR_CAMPOTABLA_SELECCIONADO(node);
            }
            else
                if (ch == false) { QUITAR_CAMPOTABLA_SELECCIONADO(node); }
            $.session.set('SelCamtbl', false);
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    $.session.set('SelCamtbl', true);
                    CARGAR_CAMPOTABLA_SELECCIONADO(node);
                }
                else
                    if (ch == false) { QUITAR_CAMPOTABLA_SELECCIONADO(node); }
                $.session.set('SelCamtbl', false);
            }
        }
    });

   
    $('#tvcambusqueda').tree({
        onClick: function (node) {
            if (node.name != "") {
                //$('#btnDisConsulta').linkbutton({ disabled: false });
                $.session.set('ocolumnas', '');
                checkedRowsCol = [];               
                CARGAR_CAMPOS_CONSULTA(node.name);
                LIMPIAR_DISEÑO_CONSULTA();
                CARGAR_DISEÑO_CONSULTA(node.name);

                //CARGAR_CAT('#dgvista', node.name);
            }
        }
    });

    $('#tvcolconsulta').tree({
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var dg = $('#dgcolumnas');
                var cellcolumnas = dg.datagrid('cell');
                if (cellcolumnas != null)
                { CARGAR_COLUMNA_SELECCIONADA(node); }
                else
                {
                    var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcolumnas', node);
                    if (ban == false) { CARGAR_COLUMNA_SELECCIONADA(node); }
                }
            }
            if (ch == false) { QUITAR_COLUMNA_SELECCIONADA(node); }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    var dg = $('#dgcolumnas');
                    var cellcolumnas = dg.datagrid('cell');
                    if (cellcolumnas != null)
                    { CARGAR_COLUMNA_SELECCIONADA(node); cellcolumnas = ""; }
                    else {
                        var ban = BUSCAR_ELEMENTROAGREGADO_GRID('#dgcolumnas', node);
                        if (ban == false) { CARGAR_COLUMNA_SELECCIONADA(node); }
                    }
                }
            }
        }
    });

    $('#tvmovimientos').tree({
        onClick: function (node) {
            if (node.nombre != "") {
                movconfig = node.nombre;
                $('#dgcamposconfig').datagrid('loadData', { "total": 0, "rows": [] });
                CARGAR_CAMPOS_MOVIMIENTOS_CONFIGURADOS('#dgcamposconfig', node.nombre);
                }            
        }
    });
   
    
    $('#dgcampos').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',       
    });
    $('#dgcolumnas').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });
    $('#dgcamsel').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgcondicion').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

   
    $('#dgcoltbl').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false
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

   

    $('#tpconsultasql').tabs({
        onSelect: function (title) {           
            if (title == 'Diseño Consulta Sql') {
                var node = $('#tvcambusqueda').tree('getSelected');
                if (node != null) {
                    document.getElementById('lblcampo').innerHTML = "Campo Seleccionado: " + node.name + " = " + node.text;
                    if (consulta_cargada == false) {
                        LIMPIAR_DISEÑO_CONSULTA();
                        CARGAR_DISEÑO_CONSULTA(node.name);
                    }
                    $('#btnAconsulta').linkbutton({ disabled: false });                
                }
                else {
                    consulta_cargada = false;
                    $('#tpconsultasql').tabs('select', 'Configuración Busqueda');
                    $.messager.alert('Error', 'Falta seleccionar el campo de busqueda', 'error');
                }
            }
        }
    });

   

    $('#tcondicion').tabs({
        onSelect: function (title) {
            if (title == 'Condición') {              
                CARGAR_COLUMNAS_CONSULTA('#dgcamsel');
            }
        }
    });
    
    $('#tconfig').tabs({
        onSelect: function (title) {
            if (title == 'Configuración de la Consulta') {
                BUSCAR_CAMPOS_BUSQUEDA();
            }
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

    $('#wbdirecta').window({
        onBeforeClose: function () {
            //var dg = $('#dgcampos');
            //var cell = dg.datagrid('cell');
            //if (cell != null)
            //{ $('#dgcampos').datagrid('uncheckRow', cell.index); }
            // $('#dgcampos').datagrid('rejectsges');
            return true;
        }
    });

    
    $('#btnMovConfig').bind('click', function () { VENTANA_MOVIMIENTOS_CONFIGURADOS('#btnMovConfig'); });
    $('#btnLConfiguracion').bind('click', function () { LIMPIAR_MOVIMIENTOS_CONFIGURADOS(); });
    $('#btnAConfiguracion').bind('click', function () { ACEPTAR_MOVIMIENTOS_CONFIGURADOS('#btnAConfiguracion'); });

       
    $('#btnLconsulta').bind('click', function () {
        LIMPIAR_DISEÑO_CONSULTA();
        var node = $('#tvcambusqueda').tree('getSelected');
        if (node != null) {     
            CARGAR_DISEÑO_CONSULTA(node.name);
        }
    });

    $('#btnAconsulta').bind('click', function () { ACEPTAR_DISEÑO_CONSULTA('#btnAconsulta'); });

    //$('#btnDisConsulta').bind('click', function () { ABRIR_VENTANA_CONSULTA('#btnDisConsulta'); });

    $('#btnGuardarCampos').bind('click', function () {  GUARDAR_CONFIGURACION('#btnGuardarCampos'); });
    $('#btnECamposMov').bind('click', function () { ELIMINAR_CONFIGURACION('#btnECamposMov'); });
    

    $('#btnGuardarConsulta').bind('click', function () { $('#loading').show(); GUARDAR_CONSULTA('#btnGuardarConsulta'); });

    $('#btnActualizarVista').bind('click', function () {RECARGAR_VISTAPREVIA('#btnActualizarVista'); });
    

    $('#btnECondicion').bind('click', function () { ELIMINAR_CONDICION('#btnECondicion'); });
    $('#btnACondicion').bind('click', function () { AGREGAR_CONDICION('#btnACondicion'); });

    $('#btnGenerarRelaciones').bind('click', function () { GENERAR_RELACIONES('#btnGenerarRelaciones'); });

    $('#btnBDirecta').bind('click', function () { VENTANA_CAMPOS_BUSQUEDADIRECTA('#btnBDirecta', "#tvcamdirectos"); });
    $('#btnAdirecta').bind('click', function () { ACEPTAR_CAMPO_BUSQUEDADIRECTA('#btnAdirecta'); });
    $('#btnLdirecta').bind('click', function () { LIMPIAR_CAMPO_BUSQUEDADIRECTA('#btnLdirecta'); });

    $('#btnCamFiltro').bind('click', function () { VENTANA_FILTRO_BUSQUEDA('#btnCamFiltro', "#tvcamfiltros"); });
    $('#btnAfiltro').bind('click', function () { ACEPTAR_FILTRO_BUSQUEDA('#btnAfiltro'); });
    $('#btnLfiltro').bind('click', function () { LIMPIAR_FILTRO_BUSQUEDA('#btnLfiltro'); });
    

    $('#btnCamCaptura').bind('click', function () { VENTANA_CAMPOS_CAPTURA('#btnCamCaptura'); });
    $('#btnAgregarCampos').bind('click', function () { AGREGAR_RELACION_CAMPOS_CAPTURA('#btnAgregarCampos'); });
    //$('#btnECamposMov').bind('click', function () { ELIMINAR_CAMPOS_CAPTURA('#btnECamposMov'); });
    $('#btnEliminarCampos').bind('click', function () { ELIMINAR_RELACION_CAMPOS_CAPTURA('#btnEliminarCampos'); });
    
    $('#btnAcamcaptura').bind('click', function () { ACEPTAR_RELACION_CAMPOS_CAPTURA('#btnAcamcaptura'); });
    $('#btnLcamcaptura').bind('click', function () { LIMPIAR_RELACION_CAMPOS_CAPTURA('#btnLcamcaptura'); });

    $('#btnLimpiarCampos').bind('click', function () { LIMPIAR_CAMPOS_CAPTURA('#btnLimpiarCampos'); });
    $('#btnLimpiarconsulta').bind('click', function () { LIMPIAR_CONFIGURACION_CAMPO_BUSQUEDA('#btnLimpiarconsulta'); });
        
    $('#btnGuardarMovConfig').bind('click', function () {  GUARDAR_CONFIGURACION_MOVIMIENTOS('#btnGuardarMovConfig'); });
    $('#btnLimpiarMovConf').bind('click', function () { LIMPIAR_CONFIGURACION_MOVIMIENTOS(); });

    $('#btnCatalogo').bind('click', function () { VENTANA_CATALOGO('#btnCatalogo'); });
    $('#btnACatalogo').bind('click', function () { ACEPTAR_CATALOGO('#btnACatalogo'); });
    $('#btnLCatalogo').bind('click', function () { LIMPIAR_CATALOGO('#btnLCatalogo'); });
    $('#btnECatalogo').bind('click', function () { ELIMINAR_CATALOGO('#btnECatalogo'); });


    $('#btnOrdCondicion').bind('click', function () { VENTANA_CONDICION('#btnOrdCondicion'); });
    $('#btnGOrden').bind('click', function () { GUARDAR_CONDICION('#btnGOrden'); });
    
    $('#btnAGFiltroCat').bind('click', function () { AGREGAR_FILTRO_CATALOGOS('#btnAGFiltroCat'); });
    $('#btnEFiltroCat').bind('click', function () { ELIMINAR_FILTRO_CATALOGOS('#btnEFiltroCat'); });
    $('#btnAFiltroCat').bind('click', function () { ACEPTAR_FILTRO_CATALOGOS('#btnAFiltroCat'); });
    $('#btnLFiltroCat').bind('click', function () { LIMPIAR_FILTRO_CATALOGOS('#btnLFiltroCat'); });
    
    CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos', mov);

    var filas = $('#dgcamcaptura').datagrid('getSelected');
    if (filas == null) {
        $('#btnOrigen').linkbutton({ disabled: false });
    }
    $('#btnOrigen').bind('click', function () {
        MODIFICAR_ORIGEN_CAPTURA('#btnOrigen');
        var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
        $('#dgcamcaptura').datagrid('unselectRow', rowIndex);
    });
    
    $('#btnLimpiaRelacion').bind('click', function () {
        var filas = $('#dgcamcaptura').datagrid('getSelected');
        if (filas != null) {
            var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
            $('#dgcamcaptura').datagrid('unselectRow', rowIndex);

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
        }
    });
    
});


function BUSCAR_ELEMENTROAGREGADO_GRID(dgobj,node)
{
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total=$(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++)
    {
        if (node.name == rows[n].Campo) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) {ban=false; }
    return ban;
}

function CARGAR_CAMPO_SELECCIONADO(node)
{     
    var total = $('#dgcampos').datagrid('getData').total;
 
        var dg = $('#dgcampos');
       var cellcampo = dg.datagrid('cell');
        if (cellcampo == null) {
            dg.datagrid('insertRow', {
                index: total,
                row: {
                    Campo: node.name,
                    DescripcionCampo: node.text,
                    Orden:total+1,
                    CampoCap: node.attributes + "," + node.name                    
                }
            });
            $('#dgcampos').datagrid('checkRow', total);
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
                            DescripcionCampo: node.text,
                            CampoAnt: dg.datagrid('getRows')[cellcampo.index].Campo,
                            CamposCap: node.attributes + "," + node.name
                        }
                    });                  
                    dg.datagrid('endEdit', cellcampo.index);
                    dg.datagrid('beginEdit', cellcampo.index);
                                      
                    var nodes = $('#tcampos').tree('getChecked', ['checked']);
                    for (var i = 0; i < nodes.length; i++)
                    { 
                        if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].CampoAnt)
                        {$('#tcampos').tree('uncheck', nodes[i].target);}
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

        total = $('#dgcampos').datagrid('getData').total;
        if (total > 0)
        {  $('#btnGuardarCampos').linkbutton('enable'); $('#btnECamposMov').linkbutton('enable'); }
        else {$('#btnGuardarCampos').linkbutton('disable'); $('#btnECamposMov').linkbutton('disable'); }
   // }
}
function QUITAR_CAMPO_SELECCIONADO(node)
{
    var rows = $('#dgcampos').datagrid('getRows');
    for (var p = 0; p < $('#dgcampos').datagrid('getData').total; p++) {
        if (node.name == rows[p].Campo) {
            $('#dgcampos').datagrid('deleteRow', p);
            var t = $('#tcampos');           
            var snode = t.tree('getSelected');
            if (snode != null) {                
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
    total = $('#dgcampos').datagrid('getData').total;
    if (total > 0)
    { $('#btnECamposMov').linkbutton('enable'); $('#btnGuardarCampos').linkbutton('enable'); }
    else { $('#btnECamposMov').linkbutton('disable'); $('#btnGuardarCampos').linkbutton('disable'); }
}

function CARGAR_TABLA_SELECCIONADA(node)
{    
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
function QUITAR_TABLA_SELECCIONADA(node)
{
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

function CARGAR_COLUMNA_SELECCIONADA(node)
{
  
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
    else{      
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

    total = $('#dgcolumnas').datagrid('getData').total;
    if (total > 0)
    { $('#btnGuardarConsulta').linkbutton('enable'); }
    else { $('#btnGuardarConsulta').linkbutton('disable'); }

}
function QUITAR_COLUMNA_SELECCIONADA(node)
{
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
            checkedRowsCol.splice(p, 1);                         
        }
    }
}

function CARGAR_CAMPOTABLA_SELECCIONADO(node)
{
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
function QUITAR_CAMPOTABLA_SELECCIONADO(node)
{
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

function getCheckedTbl(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].name + ':' + nodes[i].text);
        ss.join(',');
    }
    return ss;
}

function getCheckedCamFil(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].text);
        ss.join(',');
    }
    return ss;
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

function CARGAR_CAMPOS_MOVIMIENTOS(tobj, dgobj) {    
    var parametros = {};
    parametros.tipo = tipo;        

    var obj = "";      
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Lista_CamposMovimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    var rows = $(dgobj).datagrid('getRows');
                    var tri = $(tobj).tree('getRoots');
                    for (var t = 0; t < rows.length; t++) {
                        for (var h = 0; h < tri.length; h++) {
                            if (rows[t].Campo == tri[h].name) {
                                $(tobj).tree('check', tri[h].target)
                                break;
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

function CAMPOS_CONFIGURACION_MOVIMIENTOS(dgobj, movimiento) {   
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movimiento;
    parametros.condicion = '';
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Listar_Configuracion_Campos_Movimientos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
           
            if (obj.length > 0) {
                $.session.set('CamposCargados', true);                
                $('#btnMovConfig').linkbutton({ disabled: true });
                $('#btnGuardarCampos').linkbutton({ disabled: false });
                $('#btnECamposMov').linkbutton({ disabled: false });
            }
            else {
                $.session.set('CamposCargados', false);
                $('#btnMovConfig').linkbutton({ disabled: false });
                $('#btnGuardarCampos').linkbutton({ disabled: true });
                $('#btnECamposMov').linkbutton({ disabled: true });
            }
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
            onCheckAll: function() {
                var allRows = $(this).datagrid('getRows');
                //checkedRows = $(this).data('datagrid');
                
                //state.checkedRows = allRows;
                checkedRows = allRows;
            },
            onUncheckAll: function() {
                //var state = $(this).data('datagrid');
                //state.checkedRows = [];
                checkedRows = [];
            },
            onCheck: onCheck,
            onUncheck: onUncheck,
            onClickRow: function () {
                //$.session.set('SelNode', true);               
            },
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
             var edorden = $('#dgcampos').datagrid('getEditor', { index: r, field: 'Orden' })
             $(edorden.target).textbox('textbox').css('textAlign', 'center')
         }         
         CARGAR_CAMPOS_BUSQUEDA('#tvcambusqueda');
         CARGAR_CAMPOS_MOVIMIENTOS('#tcampos', '#dgcampos');         
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

function CARGAR_CAMPOS_BUSQUEDA(tvobj) {
    objlstcampos = [];       
    var tdgcampos = $('#dgcampos').datagrid('getData').total;
    for (var p = 0; p < tdgcampos; p++) {      
        if ($('#dgcampos').datagrid('getRows')[p].HabilitarBusqueda == 'Si') {

            listacampos = { id: "", name: "", text: "" };
            var name = $('#dgcampos').datagrid('getRows')[p].Campo;
            var text = $('#dgcampos').datagrid('getRows')[p].DescripcionCampo;

            listacampos.id = p;
            listacampos.name = name;
            listacampos.text = text;
            objlstcampos.push(listacampos);
        }
        //var buscar = $('#dgcampos').datagrid('getEditor', {
        //    index: p, field: 'HabilitarBusqueda'
        //});
        //if (buscar != null) {
        //    var val = $(buscar.target).is(":checked");
        //    if (val == true)
        //    {
        //            listacampos = { id: "", name: "", text: "" };
        //            var name = $('#dgcampos').datagrid('getRows')[p].Campo;
        //            var text = $('#dgcampos').datagrid('getRows')[p].DescripcionCampo;

        //            listacampos.id = p;
        //            listacampos.name = name;
        //            listacampos.text = text;
        //            objlstcampos.push(listacampos);
        //    }
        //}
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

function CARGAR_TABLAS_SELECCIONADAS(tvobj)
{
    objlstcampos = [];
    //sacar las tablas seleccionadas
    var tablasseleccionadas = getCheckedTblSel('#tvtablas');   
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

function LIMPIAR_CAMPOS_CAPTURA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos',mov);
    }
}

function LIMPIAR_CONFIGURACION_CAMPO_BUSQUEDA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        checkedRowsCol = [];
        var t = $('#tvcambusqueda');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#tvcolconsulta').tree('removeAll');
        $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });       

        $('#btnGuardarConsulta').linkbutton('disable');
    }
}

//abrir ventana de busqueda directa
function VENTANA_CAMPOS_BUSQUEDADIRECTA(btnobj, tvobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var objlstcampos = [];
        var parametros = {};

        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {    
        //var selectedrow = $('#dgcampos').datagrid("getSelected");
        //var rowIndex = $('#dgcampos').datagrid("getRowIndex", selectedrow);
        //if (rowIndex>-1) {
            if ($('#dgcampos').datagrid('getRows')[cell.index].HabilitarBusqueda == "Si") {

                if (movconfig == "") { movconfig = mov; }
                parametros.tipo = tipo;
                parametros.movimiento = movconfig;
                parametros.campo = $('#dgcampos').datagrid('getRows')[cell.index].Campo;
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
                        var ocamconsulta = $.parseJSON(data.d[2]);                         
                        if (ocamconsulta.length > 0) {
                            for (var c = 0; c < ocamconsulta.length; c++) {
                                    var lstcampos = { id: "", name: "", text: "" };
                                    lstcampos.id = c;
                                    lstcampos.name = ocamconsulta[c].Campo;
                                    lstcampos.text = ocamconsulta[c].Campo;
                                    objlstcampos.push(lstcampos);
                                }
                                $(tvobj).tree({
                                    data: objlstcampos,
                                    onLoadSuccess: function () {
                                        var tri = $(tvobj).tree('getRoots');
                                        var dg = $('#dgcampos');
                                        if (cell != null) {
                                            var row = dg.datagrid('getRows')[cell.index];
                                            for (var h = 0; h < tri.length; h++) {
                                                if (row.consultaBusqueda_BusquedaDirecta == tri[h].text) {
                                                    $('#tvcampos').tree('select', tri[h].target)
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                });

                                //$('#dgcampos').datagrid('checkRow', cell.index);
                                windows("#wbdirecta", 300, 500,false, "Campos de Busqueda Directa");
                        }
                        else { $.messager.alert('Error', 'Falta el diseño de la ventana de consulta', 'error'); }                        
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
            else { $.messager.alert('Error', 'El Campo ' + $('#dgcampos').datagrid('getRows')[cell.index].Campo + ' no esta habilitada la busqueda', 'error'); }
        }        
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar para busqueda directa', 'error'); }             
    }
}
function ACEPTAR_CAMPO_BUSQUEDADIRECTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campos = "";
        var t = $('#tvcamdirectos');
        var campo = t.tree('getSelected');

        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            if (campo != null)
            {  campos = "consultaBusqueda_BusquedaDirecta=''" + campo.name + "''"; }
            else { campos = "consultaBusqueda_BusquedaDirecta=''''"; }
            INSERTAR_CAMPOS_CAPTURA(campos, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

            var valorcampo="";
            if (campo != null) { valorcampo = campo.name; }
            
            $('#dgcampos').datagrid('updateRow', {
                 index: indice,
                 row: { consultaBusqueda_BusquedaDirecta: valorcampo }
            });            
            $("#wbdirecta").window('close');
            $('#dgcampos').datagrid('uncheckAll', cell.index);
            //$('#dgcampos').datagrid('checkRow', indice);
            $('#dgcampos').datagrid('endEdit', indice);
            $('#dgcampos').datagrid('beginEdit', indice);
          
        }
    }
}
function LIMPIAR_CAMPO_BUSQUEDADIRECTA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamdirectos');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
    }
}

function CARGAR_DISEÑO_FILTRO(campo)
{
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = mov;
    parametros.strcampo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_CamposFiltrosConsultas',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var ocoltabla = $.parseJSON(data.d[0]);
            var ocambusquedas = $.parseJSON(data.d[1]);       
            $('#tcolizq').tree({
                data: ocoltabla              
            });
            $('#tcolder').tree({
                data: ocambusquedas              
            });
            $('#txtfiltro').textbox('setValue', data.d[2]);
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

//abrir ventana de filtro para busqueda
function VENTANA_FILTRO_BUSQUEDA(btnobj, tvobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcampos').datagrid('checkRow', indice);
            var row = dg.datagrid('getRows')[indice];
            if ($('#dgcampos').datagrid('getRows')[cell.index].HabilitarBusqueda == "Si") {
                //CARGAR_COLUMNAS_NOMBRE_TABLAS('#tcolizq', row.catalogoseleccion);
                //CARGAR_CAMPOS_RELACION('#tcolder', row.campofiltro);
                CARGAR_DISEÑO_FILTRO(row.Campo);

                //$('#txtfiltro').textbox('setValue', row.catalogoSeleccionFiltro);
                $('#lblcamrelacion').text('Campo Seleccionado: ' + row.Campo);
                windows("#wcamrelacion", 700, 400, false, 'Filtro del Catálogo');
            }
            else { $.messager.alert('Error', 'Falta seleccionar el catálogo a filtrar', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
        //var parametros = {};
        //var objlstcamposfil = [];
        //var dg = $('#dgcampos');
        //var cell = dg.datagrid('cell');
        //if (cell != null) {
        //    if ($('#dgcampos').datagrid('getRows')[cell.index].HabilitarBusqueda == "Si") {

        //        if (movconfig == "") { movconfig = mov; }
        //        parametros.tipo = tipo;
        //        parametros.movimiento = movconfig;              
        //        $.ajax({
        //            type: "POST",
        //            url: 'Funciones.aspx/Listar_CamposFiltros',
        //            data: JSON.stringify(parametros),
        //            dataType: "json",
        //            contentType: "application/json; charset=utf-8",
        //            beforeSend: function () {
        //                $('#loading').show();
        //            },
        //            success: function (data) {
        //                var ocamconsulta = $.parseJSON(data.d[0]);
        //                if (ocamconsulta.length > 0) {
        //                    for (var c = 0; c < ocamconsulta.length; c++) {
        //                        var lstcampos = { id: "", name: "", text: "" };
        //                        lstcampos.id = c;
        //                        lstcampos.name = ocamconsulta[c].Campo;
        //                        lstcampos.text = ocamconsulta[c].Campo;
        //                        objlstcamposfil.push(lstcampos);
        //                    }
        //                    $(tvobj).tree({
        //                        data: objlstcamposfil,
        //                        onLoadSuccess: function () {                                    
        //                            var dg = $('#dgcampos');                                  
        //                            var row = dg.datagrid('getRows')[cell.index];                                      
        //                            var tri = $(tvobj).tree('getRoots');
        //                            var camfil = row.consultaBusqueda_AliasColumnas.split(',');
        //                                for (var f = 0; f < camfil.length; f++) {
        //                                    for (var h = 0; h < tri.length; h++) {
        //                                        if (camfil[f] == tri[h].text) {
        //                                            $(tvobj).tree('check', tri[h].target)
        //                                               break;
        //                                           }
        //                                    }
                                           
        //                                }                                      
        //                        }
        //                    });                         
        //                    windows("#wfiltro", 300, 500, false, "Campos de Filtro de Consulta");
        //                }
        //                else { $.messager.alert('Error', 'Falta el diseño de la ventana de consulta', 'error'); }
        //            },
        //            error: function (err) {
        //                $('#loading').hide(100);
        //                $.messager.alert('Error', err.statusText, 'error');
        //            },
        //            complete: function () {
        //                $('#loading').hide(100);
        //            }
        //        });
        //    }
        //    else { $.messager.alert('Error', 'El Campo ' + $('#dgcampos').datagrid('getRows')[cell.index].Campo + ' no esta habilitada la busqueda', 'error'); }
        //}
    }
}
function ACEPTAR_FILTRO_BUSQUEDA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = "";
        var Filtros = getCheckedCamFil('#tvcamfiltros');
       
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            if (campo != null)
            { campo = "consultaBusqueda_AliasColumnas=''" + Filtros + "''"; }
            else { campo = "consultaBusqueda_AliasColumnas=''''"; }
            INSERTAR_CAMPOS_CAPTURA(campo, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

            var valorcampo = "";
            if (campo != null) { valorcampo = campo.name; }

            $('#dgcampos').datagrid('updateRow', {
                index: indice,
                row: { consultaBusqueda_AliasColumnas: valorcampo }
            });
            $("#wfiltro").window('close');
            $('#dgcampos').datagrid('uncheckAll', cell.index);
            //$('#dgcampos').datagrid('checkRow', indice);
            $('#dgcampos').datagrid('endEdit', indice);
            $('#dgcampos').datagrid('beginEdit', indice);

        }
    }
}
function LIMPIAR_FILTRO_BUSQUEDA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamfiltros');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
    }
}



function CARGAR_RELACION_CAMPOSCAPTURA(oconfigcam) {
    if (oconfigcam != "") {
        var camorigen = "";
        var campos = oconfigcam.split("|");
        $('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });
        for (var c = 0; c < campos.length; c++) {
            var col = campos[c].split('/');
            if (col[2].toString() != "undefined") { camorigen = col[2]; }

            $('#dgcamcaptura').datagrid('insertRow', {
                index: c,
                row:
                    {
                        camconsulta: col[0],
                        namecamcap: col[1],
                        camcaptura: col[2],
                        camorigen: camorigen
                    }
            });
        }
    }
}
function CARGAR_LISTA_CAMPOS_CAPTURA(tobj) {
    
    if (movconfig == "") { movconfig = mov; }
    var ocolumnas = "", oconfigcam;
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Lista_CamposCaptura',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            objcamposcaptura = data.d[1];
            $(tobj).tree({
                data: obj
                //formatter: function (node) {
                //    return '<span title=\'' + node.attributes + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                //}
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
function CARGAR_CONFIGURACION_CAMPOS_CONSULTA(tobj, objcolumnas)
{
    var objlstcampos = [];    
    for (var c = 0; c < objcolumnas.length; c++) {        
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.name = objcolumnas[c].Campo;
        lstcampos.text = objcolumnas[c].Campo;
        objlstcampos.push(lstcampos);        
    }
    $(tobj).tree({
        data: objlstcampos     
    });
}
function CARGAR_LISTA_CAMPOSCONSULTA(tobj, campobusqueda)
{
    if (movconfig == "") { movconfig = mov; }
    var ocolumnas = "",oconfigcam;
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
            if (ocolumnas.length>0) {
                CARGAR_CONFIGURACION_CAMPOS_CONSULTA(tobj, ocolumnas);
                if (oconfigcam != "") {
                    CARGAR_RELACION_CAMPOSCAPTURA(odiseño[0].ConfiguracionCamposCaptura);
                }               
                windows("#wcamcaptura", 510, 700,false, "Relación del campo captura con la consulta");
            }
            else { $.messager.alert('Error', 'Falta el diseño de la consulta', 'error'); }            
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

//abrir ventana de campos captura
function VENTANA_CAMPOS_CAPTURA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            if ($('#dgcampos').datagrid('getRows')[cell.index].HabilitarBusqueda == "Si") {
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
                //$('#dgcampos').datagrid('checkRow', cell.index);
                CARGAR_LISTA_CAMPOS_CAPTURA('#tvcamcap');
                CARGAR_LISTA_CAMPOSCONSULTA('#tvcamcon', $('#dgcampos').datagrid('getRows')[cell.index].Campo);                
            }        
           else { $.messager.alert('Error', 'El Campo ' + $('#dgcampos').datagrid('getRows')[cell.index].Campo+ ' no esta habilitada la busqueda', 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar para la captura', 'error'); }
    }
}
function AGREGAR_RELACION_CAMPOS_CAPTURA(btnobj)
{
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
                var camorigen = "";
                var filas = $('#dgcamcaptura').datagrid('getSelected');
                if (filas == null) {
                    if (total = $('#dgcamcaptura').datagrid('getData').total > 0)
                    { total = $('#dgcamcaptura').datagrid('getData').total + 1; }
                    else { total = 0; }

                    var campos = campocaptura.attributes.split('|');                   
                    if (campos[1] != undefined) { camorigen = campos[1]; }

                    $('#dgcamcaptura').datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                camconsulta: campoconsulta.text,
                                namecamcap: campos[0],
                                camcaptura: campocaptura.name,
                                camorigen:camorigen
                            }
                    });
                }
                else
                {
                    var campos = campocaptura.attributes.split('|');                   
                    if (campos[1] != undefined) { camorigen = campos[1]; }

                    var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
                    $('#dgcamcaptura').datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                camconsulta: campoconsulta.text,
                                namecamcap: campos[0],
                                camcaptura: campocaptura.name,
                                camorigen: camorigen
                            }
                    });                                        
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
function ELIMINAR_RELACION_CAMPOS_CAPTURA(btnobj)
{
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
function ELIMINAR_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {                    
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo ' + $('#dgcampos').datagrid('getRows')[cell.index].descripcionCampo, function (r) {
                if (r) {
                    ELIMINAR_CAMPO_CAPTURA($('#dgcampos').datagrid('getRows')[cell.index].Campo);
                    //var rowIndex = $("#dgcampos").datagrid("getRowIndex", rows);
                    $('#dgcampos').datagrid('deleteRow', cell.index);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_RELACION_CAMPOS_CAPTURA(btnobj) {
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
function ACEPTAR_RELACION_CAMPOS_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var cadcaptura = "",cadconfiguracion="",camorigen="";
        var total = $('#dgcamcaptura').datagrid('getData').total;
        for (var p = 0; p < total; p++) {
          
            if ($('#dgcamcaptura').datagrid('getRows')[p].camorigen != undefined) { camorigen = $('#dgcamcaptura').datagrid('getRows')[p].camorigen; }

            cadcaptura += $('#dgcamcaptura').datagrid('getRows')[p].namecamcap + "|";
            cadconfiguracion += $('#dgcamcaptura').datagrid('getRows')[p].camconsulta + "/" + $('#dgcamcaptura').datagrid('getRows')[p].namecamcap + "/" + $('#dgcamcaptura').datagrid('getRows')[p].camcaptura + "/" + camorigen + "|";
        }
        cadcaptura = cadcaptura.substring(0, cadcaptura.length - 1);
        cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);
       
        var campos = "configuracionCamposcaptura=''" + cadconfiguracion + "'',consultaBusqueda_CamposCaptura=''"+cadcaptura+"''";
        
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');

        INSERTAR_CAMPOS_CAPTURA(campos, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo+"''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);
       
        if (error == "0") {
            $.messager.alert('Información', 'La relación de los campos captura-consulta se ha guardado', 'info');

            var campocap = "";
            if (cadconfiguracion != "") { campocap = "Si"; }
            $('#dgcampos').datagrid('updateRow', {
                index: cell.index,
                row: { CampoCaptura: campocap }
            });
           // $('#dgcampos').datagrid('checkRow', cell.index);
            $('#dgcampos').datagrid('endEdit', cell.index);
            $('#dgcampos').datagrid('beginEdit', cell.index);
            $("#wcamcaptura").window('close');            
        }        
    }
}
function ELIMINAR_CAMPO_CAPTURA(campo)
{
    if (movconfig == "") { movconfig = mov; }
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;
    parametros.campo = campo;    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Eliminar_CamposCapturaMovimientos',
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
            else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_COLUMNAS_TABLA(tvobj, tabla,node)
{
    camposeleccionado = true;
    $(tvobj).tree('check', node.target);   
    total = $('#dgcamsel').datagrid('getData').total;   
    $('#dgcamsel').datagrid('insertRow', {
        index: total+1,
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

function CARGAR_CATALOGO(tvobj,query)
{
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
                    if ((ch == true) && (camposeleccionado==false)) {                        
                        CARGAR_COLUMNAS_TABLA(tvobj, tabla, node);
                        camposeleccionado = false;
                    }                                       
                    else 
                    if ((ch == false) && (camposeleccionado == false))
                        {
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
function CARGAR_COLUMNAS_CONSULTA(dgobj)
{
    
    var objlstcampos = [];   
//    for (var c = 0; c < objcampos.length; c++) {                        
//            var lstcampos = { id: "", name: "", text: "" };
//            lstcampos.id = c;            
//            lstcampos.text = objcampos[c].Campo;
//            lstcampos.name = objcampos[c].Tabla + "." + objcampos[c].Campo;
//            if (objcampos[c].Query != "")
//            { lstcampos.attributes = objcampos[c].CatTexto + "|" + objcampos[c].CatValor + "|" + objcampos[c].Query }
//            else { lstcampos.attributes = ""; }
//            objlstcampos.push(lstcampos);
//    }
//    var t = $('#tvcampos');
//    t.tree('removeAll');

//        $('#tvcampos').tree({
//            data: objlstcampos,
//            formatter: function (node) {
//                return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
//            },
    //        });
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
            $('#loading').hide(100);
}

function onClickCell(index, field){
   if (editIndex != index){
       if (endEditing()){
           $('#dgcondicion').datagrid('selectRow', index)
               .datagrid('beginEdit', index);
            var ed = $('#dgcondicion').datagrid('getEditor', { index: index, field: field });
            if (ed){
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                }
          editIndex = index;
           } else {
           setTimeout(function(){
               $('#dgcondicion').datagrid('selectRow', editIndex);
                },0);
            }
   }
}

function CARGAR_CONDICION(dgobj, objdiseño)
{
    $(dgobj).datagrid('loadData', { "total": 0, "rows": [] });
    
    var strcondicion = objdiseño.split("|");
    if (strcondicion[0] != "")
        {
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
function CARGAR_DISEÑO_CONSULTA(campobusqueda)
{
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
        complete: function ()
        {           
           $('#loading').hide(100);
        }
    });
}


//abrir ventana del diseño de consulta
function ABRIR_VENTANA_CONSULTA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        LIMPIAR_DISEÑO_CONSULTA();
        var node = $('#tvcambusqueda').tree('getSelected');
        if (node != null) {
            document.getElementById('lblcampo').innerHTML = "Campo Seleccionado: " + node.name+" = "+node.text;            
            CARGAR_DISEÑO_CONSULTA(node.name);                   
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo de busqueda', 'error'); }
    }
}
function LIMPIAR_DISEÑO_CONSULTA()
{   
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

function getChkName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push("'" + nodes[i].name + "'");
    }
    return ss.join(',');
}


function AGREGAR_CONDICION(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var condicion = "", logico = "", vtcampos = "", vtcondicion = "", vtvalor = "",vttabla="";

        vtcampos = $('#tvcampos').tree('getSelected');
        vtcondicion = $('#tvcondicion').tree('getSelected');
        vttabla = $('#tvtblsel').tree('getSelected'); 
        vtvalor = getChkName('#tvvalor');
        if (vtvalor=="")
        {vtvalor=$('#txtvalbuscar').textbox('getValue');}

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
                                if ((vtcondicion.name == 'In') || (vtcondicion.name == 'Not In')) {
                                    condicion = vtcampos.name + ' ' + vtcondicion.name + ' (' + vtvalor + ')';
                                } else
                                    if ((vtcondicion.name == '>') || (vtcondicion.name == '<') || (vtcondicion.name == '>=') || (vtcondicion.name == '<=')) {
                                        condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor + '';
                                    }

                    if ($('#opcY').linkbutton('options').selected) { logico = 'and'; }
                    if ($('#opcO').linkbutton('options').selected) { logico = 'or'; }
                    
                    var filas = $('#dgcondicion').datagrid('getSelected');
                    if (filas == null) {

                        if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        else { condicion = logico + " " + condicion; }

                        var total = $('#dgcondicion').datagrid('getData').total;
                        $('#dgcondicion').datagrid('insertRow', {
                            index: total+1,
                            row: {
                                Condicion: condicion,
                            }
                        });
                    }
                    else
                    {
                        //if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        condicion = logico + " " + condicion;

                        var rowIndex = $("#dgcondicion").datagrid("getRowIndex", filas);
                        $('#dgcondicion').datagrid('updateRow', {
                            index: rowIndex,
                            row:
                                {
                                    Condicion: condicion,
                                }
                        });                      
                        $('#dgcondicion').datagrid('unselectRow', rowIndex);
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

function GENERAR_RELACIONES(btnobj)
{
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

//GUARDAR EL DISEÑO DE LA CONSULTA
function ACEPTAR_DISEÑO_CONSULTA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var objlstcampos = [];
        var camposeleccionados = "",campoconsulta=""; var campoorden = ""; var campocondicion = "",campoconfiguracion="",diccamcon="";
        var tablasseleccionadas = ""; var tbl = "", diseñocondicion = "";

        //sacar las tablas seleccionadas
        tablasseleccionadas = getCheckedTbl('#tvtablas');
                
        //cerrar la edicion del grid
        $('#dgcamsel').datagrid('acceptChanges');

        //sacar los campos seleccionados
       
        var total = $('#dgcamsel').datagrid('getData').total;
        if (total > 0) {
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

            if (campoorden.length > 0)
            { campoorden = campoorden.substring(0, campoorden.length - 1); }


            //sacar las condiciones de la consulta
            var rows = $('#dgcondicion').datagrid('getRows');
            var total = $('#dgcondicion').datagrid('getData').total;
            for (i = 0; i < total; i++) {
                var encontrado = rows[i].Condicion.indexOf("'");
                if (encontrado > 0) {
                    //campocondicion += ReplaceAll(rows[i].Condicion, "'", "''''") + " ";
                    campocondicion += rows[i].Condicion.replace(/'/g, "''''") + " ";
                    diseñocondicion += rows[i].Condicion.replace(/'/g, "''''") + "|";
                }
                else {
                    campocondicion += rows[i].Condicion + " ";
                    diseñocondicion += rows[i].Condicion + "|";
                }
            }
            if (campocondicion.length > 0) {
                //campocondicion = campocondicion.substring(0, campocondicion.length - 1);
                diseñocondicion = diseñocondicion.substring(0, diseñocondicion.length - 1);
            }

            //seleccionar el campo de busqueda de la configuracion
            var campo = $('#tvcambusqueda').tree('getSelected');

            if ($('#txtrelacion').textbox('getValue') == "") { $('#loading').hide(100); $.messager.alert('Error', 'Falta generar las relaciones de las tablas', 'error'); }
            else
            {
                //insertar el diseño de la consulta en la tabla
                INSERTAR_DISEÑO_CONSULTA(campo.name, campoconsulta, $('#txtrelacion').textbox('getValue'), campocondicion, campoorden, tablasseleccionadas.toString(), camposeleccionados, campoconfiguracion, diseñocondicion);

                //sacar la lista de los campos seleccionados para la configuracion de la consulta 
                $('#tvcolconsulta').tree('removeAll');
                $('#tvcolconsulta').tree({
                    data: objlstcampos
                });

                $('#loading').hide(100);
                //$.session.set('SelCol', false);
                //$.session.set('GridColConsulta', false);

                //$("#wdisconsulta").window('close');

            }
            total = $('#dgcamsel').datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcamsel').datagrid('beginEdit', r);
            }        
    }
}
//guardar el diseño de la consulta
function INSERTAR_DISEÑO_CONSULTA(CampoSel, CampoConsulta, RelacionConsulta, CampoCondicion, CampoOrden, DisTablas, ColTablas, ColConfig, Condiciones) {
    if (movconfig == "") { movconfig = mov; }

    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;
    parametros.campo = CampoSel;
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


function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Campo == row.Campo) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Campo == row.Campo) {
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

function OrdenarCampos(a, b) {
    var aName = a.Orden;
    var bName = b.Orden;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function OrdenarColumnas(a, b) {
    var aName = parseInt(a.Orden);
    var bName = parseInt(b.Orden);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function OrdenarBusqueda(a, b) {
    var aName = parseInt(a.OrdenBusqueda);
    var bName = parseInt(b.OrdenBusqueda);
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
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
            $.session.set('GridColConsulta', false);
        }
    });
}

function CARGAR_CONFIGURACION_CONSULTA(dgobj, objdiseño)
{
    var Bdirecta="",alinear="";
    var strdiseño = objdiseño.split("|");
    for (var c = 0; c < strdiseño.length; c++) {
        var strdatos = strdiseño[c].split(",");

        //if (strdatos[1] == "1") { Bdirecta = "Si"; } else { Bdirecta = ""; }

        if (strdatos[2] == "Left") { alinear = "Izquierda"; }
        if (strdatos[2] == "Center") { alinear = "Centro"; }
        if (strdatos[2] == "Right") { alinear = "Derecha"; }
                     
        $(dgobj).datagrid('insertRow', {
            index: c,           
            row: {
                Campo: strdatos[0],
                Orden:c+1,
                Titulo: strdatos[1],
                Alineacion: alinear,
                Longitud: strdatos[3],
            }
        });
        $(dgobj).datagrid('checkRow', c);
        $(dgobj).datagrid('beginEdit', c);
    }
    if (objdiseño.length > 0)
    {$('#btnGuardarConsulta').linkbutton({ disabled: false });}
}
function CARGAR_CAMPOS_CONSULTA(campobusqueda) {
    if (movconfig == "") { movconfig = mov;}
    var ocolumnas = "";
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
            var ocolumnas = $.parseJSON(data.d[0]);
            var odiseño = $.parseJSON(data.d[1]);            

           odiseño.sort(OrdenarColumnas);
           if (odiseño.length > 0) { $('#btnGuardarConsulta').linkbutton({ disabled: false }); $('#btnOrdCondicion').linkbutton({ disabled: false }); }
           else { $('#btnGuardarConsulta').linkbutton({ disabled: true }); $('#btnOrdCondicion').linkbutton({ disabled: true }); }

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
                    //onCheckAll: function () {
                    //    checkedRowsCol = $(this).datagrid('getRows');                       
                    //},
                    //onUncheckAll: function () {                       
                    //    checkedRowsCol = [];
                    //},
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
               var  total = $('#dgcolumnas').datagrid('getData').total;
                for (var r = 0; r < total; r++) {
                    $('#dgcolumnas').datagrid('beginEdit', r);
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

                var $datagrid = {};
                var columns = new Array();
                var columnas = ocolumnas[0].consultabusqueda_longitudcolumnas.split('|');                
                if (columnas[0] != "") {
                    columnasvista = true;
                    for (var col = 0; col < columnas.length; col++) {
                        datos = columnas[col].split(',');
                        var valor = datos[0];
                        var titulo = datos[1];
                        var alinear = datos[2];
                        var ancho = datos[3] + "px";

                        //columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                        columns.push({ "field": valor, "title": titulo, "align": alinear });
                    }
                    $datagrid.columns = new Array(columns);
                    $('#dgvista').datagrid({ columns: "", url: "" });
                    $('#dgvista').datagrid($datagrid);
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
function BUSCAR_CAMPOS_BUSQUEDA() {
    if (movconfig == "") { movconfig = mov; }
    var ocolumnas = "";
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Buscar_Campos_Busqueda',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == 0) { $.messager.alert('Error', 'No existen campos con la opción de habilitar busqueda', 'error'); }
            else { CARGAR_CAMPOS_BUSQUEDA('#tvcambusqueda'); }
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


//guardar la configuracion de los campos de captura
function ELIMINAR_CONFIGURACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {
                    // var rowIndex = $("#dgcampos").datagrid("getRowIndex", rows);
                    ELIMINAR_CAMPO_MOVIMIENTOS($('#dgcampos').datagrid('getRows')[cell.index].Campo);
                    var tri = $('#tcampos').tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        if ($('#dgcampos').datagrid('getRows')[cell.index].Campo == tri[h].name) {
                            $('#tcampos').tree('uncheck', tri[h].target)
                            break;
                        }
                    }
                    //$('#dgcampos').datagrid('deleteRow', cell.index);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function ELIMINAR_CAMPO_MOVIMIENTOS(campo)
{
    //if (movconfig == "") { movconfig = mov;}
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = mov;
    parametros.campo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Eliminar_CamposCapturaMovimientos',
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
            //else { $.messager.alert('Información', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}
function VALIDAR_CAMPOS_CAPTURA()
{
   var ban = false;
   var total = $('#dgcampos').datagrid('getData').total;
    for (var r = 0; r < total; r++) {
        if ($('#dgcampos').datagrid('getRows')[r].CampoCaptura == "Si") {
            ban = true;          
        }
    }
    return ban;
}
function GUARDAR_CONFIGURACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var campos = ""; var lstcampos = "", columnas = "", valores = "";
        //var encontrado=VALIDAR_CAMPOS_CAPTURA();
        //if (encontrado == true) {
            $('#dgcampos').datagrid('acceptChanges');
            var fields = $('#dgcampos').datagrid('getColumnFields', true).concat($('#dgcampos').datagrid('getColumnFields', false));

            if (checkedRows.length > 0) {
                checkedRows.sort(OrdenarCampos);
                for (var f = 0; f < checkedRows.length; f++) {
                    if ((checkedRows[f].CampoAnt != undefined) && (checkedRows[f].CampoAnt != ""))
                    { condicion = fields[1] + "=''" + checkedRows[f].CampoAnt + "''"; campo = checkedRows[f].CampoAnt; }
                    else
                    { condicion = fields[1] + "=''" + checkedRows[f][fields[1]] + "''"; campo = checkedRows[f][fields[1]]; }

                    campos = ""; columnas = ""; valores = "";
                    for (var c = 1; c < fields.length; c++) {
                        var strcam = fields[c];
                        if ((strcam != 'DescripcionCampo') && (strcam != 'CampoCaptura') && (strcam != 'CampoAnt') && (strcam != 'CampoCap')) {
                            columnas += fields[c] + ",";
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
                    columnas = columnas.substring(0, columnas.length - 1);
                    valores = valores.substring(0, valores.length - 1);
                    campos = campos.substring(0, campos.length - 1);
                    INSERTAR_CAMPOS_CAPTURA(campos, columnas, valores, condicion, campo);                   
                }

                if (error == "0") {
                    movconfig = "";
                    $.messager.alert('Información', "Campos Guardado Correctamente", 'info');
                    checkedRows = [];
                    CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos', mov);
                    $('#loading').hide(100);                   
                }
            }
            else { $('#loading').hide(100); $.messager.alert('Error', "Falta seleccionar el campo a guardar", 'error'); }

            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            dg.datagrid('uncheckAll');
            total = dg.datagrid('getData').total;
            for (var r = 0; r < total; r++) {
                $('#dgcampos').datagrid('beginEdit', r);
            }
            
        //}
        //else { $.messager.alert('Error', "Falta la relación de los campos con la consulta para su captura", 'error'); }
    }
}
function INSERTAR_CAMPOS_CAPTURA(campos, columnas, valores, condicion, campo) {

   // if (movconfig == "") { movconfig = mov; }
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = mov;
    parametros.columnas = columnas;
    parametros.valores = valores;
    parametros.campos = campos;
    parametros.condicion = condicion;
    parametros.campo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_CamposCapturaMovimientos',
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
        { //$('#loading').hide(100); 
        }
    });
}



//guardar el diseño de la configuracion de la consulta
function GUARDAR_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var colvista = "", colregistro = ""; var Registros = ""; var DisConfiguracion = "", DisVista = "", Bdirecta = "";
        var valor = "";
        var campo = $('#tvcambusqueda').tree('getSelected');
        if (campo != null) {
            $('#dgcolumnas').datagrid('acceptChanges');
            var fields = $('#dgcolumnas').datagrid('getColumnFields', true).concat($('#dgcolumnas').datagrid('getColumnFields', false));
            
            if (checkedRowsCol.length > 0) {                
                checkedRowsCol.sort(OrdenarColumnas);
                for (var f = 0; f < checkedRowsCol.length; f++) {
                    for (var c = 1; c < fields.length; c++) {
                        if (fields[c] != 'CampoAnt') {
                            valor = checkedRowsCol[f][fields[c]];
                            if (valor == 'Si') { valor = 1; }
                            if (fields[c] == 'Alineacion') {
                                if (valor == 'Izquierda') { valor = 'Left'; }
                                if (valor == 'Centro') { valor = 'Center'; }
                                if (valor == 'Derecha') { valor = 'Right'; }
                            }
                            if (fields[c] != 'Orden') {
                                if (fields[c] == "Longitud") { colvista += checkedRowsCol[f][fields[c]]+","; }
                                else { colvista += valor + ","; }
                            }
                            colregistro += valor + ",";
                        }
                    }
                    colvista = colvista.substring(0, colvista.length - 1);
                    colregistro = colregistro.substring(0, colregistro.length - 1);
                    colvista = colvista + "|";
                    colregistro = colregistro + "|";
                }                
                columnasvista = true;
                colvista = colvista.substring(0, colvista.length - 1);
                colregistro = colregistro.substring(0, colregistro.length - 1);
                //seleccionar el campo de busqueda de la configuracion

                INSERTAR_CONFIGURACION_CONSULTA(campo.name, colvista, colregistro);

                $('#btnOrdCondicion').linkbutton({ disabled: false });

                total = $('#dgcolumnas').datagrid('getData').total;
                for (var r = 0; r < total; r++) {
                    $('#dgcolumnas').datagrid('beginEdit', r);
                }
                $('#loading').hide(100);
            }
            else { $('#loading').hide(100); $.messager.alert('Error', 'Falta seleccionar los campos a guardar', 'error'); }
        }
        else { $('#loading').hide(100); $.messager.alert('Error', 'Falta seleccionar el campo relacionado a la consulta', 'error'); }
       
    }
    
}
function INSERTAR_CONFIGURACION_CONSULTA(campo, colvista, colregistro)
{
    if (movconfig == "") { movconfig = mov; }
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = movconfig;
    parametros.campo = campo;    
    parametros.colvista = colvista;    
    parametros.colregistro = colregistro;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_ConfiguracionConsulta',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //$('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); checkedRowsCol = [];}
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


function CARGAR_MOVIMIENTOS_CONFIGURADOS(tvobj, movact, mov) {
    var obj = "";
    var parametros = {};
    parametros.tipo = tipo;
    parametros.strmovact = movact
    parametros.strmov = mov;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Movimientos_Configurados',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);

            $(tvobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
            });
            $(tvobj).tree('collapseAll');
            $('#dgcamposconfig').datagrid('loadData', { "total": 0, "rows": [] });

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
            if (obj.length > 0) { $('#btnActualizar').linkbutton({ disabled: false }); }
            else { $('#btnActualizar').linkbutton({ disabled: true }); }
        }
    });
}
function CARGAR_CAMPOS_MOVIMIENTOS_CONFIGURADOS(dgobj, valor) {
    var parametros = {};
    parametros.tipo = tipo;
    parametros.movimiento = valor;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Campos_Movimientos_Configurados',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(dgobj).datagrid({
                data: obj,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
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
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}
function VENTANA_MOVIMIENTOS_CONFIGURADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tvmovimientos',"","");       
        windows("#wconfiguraciones", 1000, 550,true, 'Lista de Movimientos Configurados');
    }
}
function LIMPIAR_MOVIMIENTOS_CONFIGURADOS()
{  
    var t = $('#tvmovimientos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#dgcamposconfig').datagrid('loadData', { "total": 0, "rows": [] });
 
}
function ACEPTAR_MOVIMIENTOS_CONFIGURADOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = $('#tvmovimientos').tree('getSelected');
        if (campo != null)
        {          
            CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos', campo.nombre);
            GUARDAR_CONFIGURACION_MOVIMIENTOS();
            //$('#btnGuardarMovConfig').linkbutton({ disabled: false });

            $("#wconfiguraciones").window('close');
        }
    }
}

function GUARDAR_CONFIGURACION_MOVIMIENTOS()
{
    //if ($(btnobj).linkbutton('options').disabled) { return false; }
    //else
    //{
        //$('#loading').show();
        var parametros = {};
        parametros.tipo = tipo;
        parametros.movimiento = movconfig;
        parametros.movnuevo = mov;
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Guardar_Configuracion_Movimientos',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                //$('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
                else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
   // }
}

function LIMPIAR_CONFIGURACION_MOVIMIENTOS()
{ 
   
    LIMPIAR_NODECHK_TREE('#tcampos','');

    $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });

    $('#tvcambusqueda').tree('removeAll');
    $('#tvcolconsulta').tree('removeAll');

    $('#dgcolumnas').datagrid('loadData', { "total": 0, "rows": [] });

    $('#btnGuardarMovConfig').linkbutton({ disabled: true });

    LIMPIAR_DISEÑO_CONSULTA();
   
    CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos', mov);

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
            $('#txttablas').textbox('setValue', row.catalogoseleccion);
            $('#lblcatalogo').text('Campo Seleccionado: ' + row.campo);
            CARGAR_TABLAS_SISTEMAS(row.catalogoseleccion, row.catalogoSeleccionValor, row.catalogoSeleccionTexto);         
            windows("#wcatalogo", 700, 350,false, 'Relación del Campos Catálogo');
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}

function VENTANA_CONDICION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
      windows("#wordcondicion", 200, 130, false, 'Orden del Tipo de Condición');     
    }
}

function GUARDAR_CONDICION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = $('#tvcambusqueda').tree('getSelected');
        if (campo != null) {
            var valores = "";
            if ($('#btnexacta').linkbutton('options').selected) { valores = "="; }
            if ($('#btnaproximada').linkbutton('options').selected) { valores = "like"; }
            var parametros = {};
            parametros.tipo = tipo;
            parametros.movimiento = mov;
            parametros.campo = campo.name;
            parametros.campos = "consultaBusqueda_OrdenCondicion=''" + valores + "''";
            
            $.ajax({
                type: "POST",
                url: 'Funciones.aspx/Guardar_ValoresConsulta',
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
                    else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }
                   
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function ()
                { $('#loading').hide(100); }
            });           
        }
        $("#wconfiguraciones").window('close');
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

function ELIMINAR_CATALOGO(btnobj)
{
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

function CARGAR_CAT(dgcontrol, strcampo) {
    var con = "";
    //if (columnasvista == true) {
        $(dgcontrol).datagrid({
            url: "Listar_Catalogo.aspx?tipo=" + tipo + "&campo=" + strcampo + "&mov=" + mov + "&busqueda=" + con
        });
    //} else { $.messager.alert('Error', 'Falta la configuración de los campos para la vista', 'error'); }
}

function RECARGAR_VISTAPREVIA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var tcambusqueda = $('#tvcambusqueda').tree('getSelected');
        if (tcambusqueda != null) {
            CARGAR_CAT('#dgvista', tcambusqueda.name);
        }         

    }
}

function MODIFICAR_ORIGEN_CAPTURA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgcamcaptura').datagrid('getSelected');
        if (filas != null) {
            var rowIndex = $("#dgcamcaptura").datagrid("getRowIndex", filas);
            $('#dgcamcaptura').datagrid('updateRow', {
                index: rowIndex,
                row:
                    {                       
                        namecamcap: $('#dgcamcaptura').datagrid('getRows')[rowIndex].camorigen,
                        camorigen: $('#dgcamcaptura').datagrid('getRows')[rowIndex].namecamcap
                    }
            });           
            $('#dgcamcaptura').datagrid('unselectRow', rowIndex);
        }
    }
}

function ELIMINAR_FILTRO_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfiltro').textbox('setValue', filtrocat);
    }
}
function AGREGAR_FILTRO_CATALOGOS(btnobj) {
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
                query = valor.text + '=' + '@' + texto.name;
                sessionStorage.setItem('condicion',valor.text + '=' + '@' + texto.name)
            }
            else {
                query = sessionStorage.getItem('condicion') + ' ' + logico + ' ' + valor.text + '=' + '@' + texto.name;
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
function ACEPTAR_FILTRO_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = "";
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcampos').datagrid('updateRow', {
                index: indice,
                row: {
                    consultaBusqueda_AliasColumnas: campofiltro.substring(0, campofiltro.length - 1),
                    consultaBusqueda_CamposCaptura_Oculto: $('#txtfiltro').textbox('getValue'),
                }
            });

            if (campo != null)
            { campo = "consultaBusqueda_AliasColumnas=''" + $('#dgcampos').datagrid('getRows')[cell.index].consultaBusqueda_AliasColumnas + "'',consultaBusqueda_CamposCaptura_Oculto=''" + $('#dgcampos').datagrid('getRows')[cell.index].consultaBusqueda_CamposCaptura_Oculto + "''"; }
            else { campo = "consultaBusqueda_AliasColumnas=''''"; }
            INSERTAR_CAMPOS_CAPTURA(campo, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

            campofiltro = "";
            $("#wcamrelacion").window('close');
        }
    }
}
function LIMPIAR_FILTRO_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tcolizq');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        var t = $('#tcolder');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcolizq').textbox('setValue', '');
        $('#txtcolder').textbox('setValue', '');
        $('#txtfiltro').textbox('setValue', '');

    }
}




