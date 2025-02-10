var tipo = '';
var contador = 1;
var movimiento = ''
var titulo;
var objtree;
var objm;
var makesArray = [];
var checkedRows = [];
var checkedRowsCampos = [];

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
         

    document.getElementById('lbltitulo').innerHTML = "";
    
    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');

        if (tipo == "MP"){
            $('#btnMP').linkbutton({ selected: true });
            $('#btnmovconfig').linkbutton({ disabled: false });
            $('#btnReplicarMovConfig').linkbutton({ disabled: false });
            $('#btnReplicarCampoMov').linkbutton({ disabled: false });            
            $('#btnEliminarMovConfig').linkbutton({ disabled: false });
        }
        if (tipo == "MC") {
            $('#btnMC').linkbutton({ selected: true });
            $('#btnmovconfig').linkbutton({ disabled: false });
            $('#btnReplicarMovConfig').linkbutton({ disabled: false });
            $('#btnReplicarCampoMov').linkbutton({ disabled: false });
            $('#btnEliminarMovConfig').linkbutton({ disabled: false });
        }
        if (tipo == "DP") {
            $('#btnDP').linkbutton({ selected: true });
            $('#btnmovconfig').linkbutton({ disabled: false });
            $('#btnReplicarMovConfig').linkbutton({ disabled: false });
            $('#btnReplicarCampoMov').linkbutton({ disabled: false });
            $('#btnEliminarMovConfig').linkbutton({ disabled: false });
        }
        if (tipo == "IL") {
            $('#btnIL').linkbutton({ selected: true });
            $('#btnmovconfig').linkbutton({ disabled: false });
            $('#btnReplicarMovConfig').linkbutton({ disabled: false });
            $('#btnReplicarCampoMov').linkbutton({ disabled: false });
            $('#btnEliminarMovConfig').linkbutton({ disabled: false });
        }
        if (tipo == "RF") {
            $('#btnRF').linkbutton({ selected: true });
            $('#btnmovconfig').linkbutton({ disabled: false });
            $('#btnReplicarMovConfig').linkbutton({ disabled: false });
            $('#btnReplicarCampoMov').linkbutton({ disabled: false });
            $('#btnEliminarMovConfig').linkbutton({ disabled: false });
        }

        cargar_movimientos('#lstmod', tipo);
        $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    }   
   
    var texts = $('#txtmovimientos');
    texts.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if (objtree != undefined) {
                if (texts.val() != "") {
                    $('#tvmovimientos').tree('doFilter', texts.val());
                    $('#tvmovimientos').tree('expandAll');
                }
                else { $('#tvmovimientos').tree('doFilter', ''); $('#tvmovimientos').tree('collapseAll'); }
            }
        }
    });

    var text = $('#txtmovimiento');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if (objtree != undefined) {
                if ($('#cboopciones').combobox('getValue') == "Doc") {

                    makesArray = jQuery.grep(objm, function (menus, i) {
                        return menus.Id == text.val();
                    });
                    if (makesArray.length > 0) {
                        Buscar_documento(makesArray[0].Id);
                    }
                }
                else {
                    if (text.val() != "") {
                        $('#lstmod').tree('doFilter', text.val());
                        $('#lstmod').tree('expandAll');
                    }
                    else { $('#lstmod').tree('doFilter', ''); $('#lstmod').tree('collapseAll'); }
                }
            }
        }
    });

    $('#btnBuscarMov').bind('click', function () {
        if (objtree != undefined) {           
            Buscar_documento($('#txtmovimiento').textbox('getValue'));
        }
    });
   
    $('#lstmod').tree({
        filter: function (q, node) {
            return node.text.toLowerCase().indexOf(q.toLowerCase()) >= 0;
        },
        onClick: function (node) {
            if (node.children.length <= 0) {
                makesArray = jQuery.grep(objm, function (menus, i) {
                    return menus.Id == node.Id;
                });
                cvemov = makesArray[0].Id;
                Buscar_documento(makesArray[0].Id);
            }
        }
    });
    $('#lstmod').tree('collapseAll');

    $('#tvmovimientos').tree({
        onClick: function (node) {
            if (node.nombre != "") {
                movconfig = node.nombre;
                $('#dgcamposconfig').datagrid('loadData', { "total": 0, "rows": [] });
                CARGAR_CAMPOS_MOVIMIENTOS_CONFIGURADOS('#dgcamposconfig', node.nombre);
            }
        }
    });
    $('#tmovconfig').tree({
        onClick: function (node) {           
            if (node.nombre.length > 4) {
                $('#btnGReplica').linkbutton({ disabled: false });
                CARGAR_MOVIMIENTOS_CONFIGURADOS('#tmovmod',node.nombre,"0" + node.IdPadre);
                $('#tmovmod').tree({ onlyLeafCheck: true });
            }
        }
    });

    $('#tmovactuales').tree({
        onClick: function (node) {
            if (node.nombre.length > 4) {
                $('#btnGRCampoMov').linkbutton({ disabled: false });
                CARGAR_CAMPOS_MOVIMIENTO('#dgcampos','#dgmovimientos', node.nombre);
            }
        }
    });


    $('#tmovmod').tree({
        onClick: function (node) {
            if (node.nombre != "") {
                $('#tmovmod').tree('check', node.target);
            }
        }
    });

    $('#tmoveliminar').tree({
        onClick: function (node) {
            if ((tipo == "IL")|| (tipo == "RF"))
            {
                if (node.nombre.length == 4) {
                    $('#tmoveliminar').tree('check', node.target);
                    $('#btnEMov').linkbutton({ disabled: false });
                }
            }
            if (node.nombre.length > 4) {
                $('#tmoveliminar').tree('check', node.target);
                $('#btnEMov').linkbutton({ disabled: false });
            }
        }
    });

    FILTRAR_TREE_TXT('#txtmovconfig', '#tmovconfig');
    FILTRAR_TREE_TXT('#txtmovmod', '#tmovmod');
    FILTRAR_TREE_TXT('#txtmoveliminar', '#tmoveliminar');

    FILTRAR_TREE_TXT('#txtmovactuales', '#tmovactuales');

    $('#btnMP').bind('click', function () { tipo = 'MP'; CARGAR_CONFIGURACION('#btnMP'); });
    $('#btnMC').bind('click', function () { tipo = 'MC'; CARGAR_CONFIGURACION('#btnMC'); });
    $('#btnDP').bind('click', function () { tipo = 'DP'; CARGAR_CONFIGURACION('#btnDP'); });
    $('#btnIL').bind('click', function () { tipo = 'IL'; CARGAR_CONFIGURACION('#btnIL'); });
    $('#btnRF').bind('click', function () { tipo = 'RF'; CARGAR_CONFIGURACION('#btnRF'); });
    $('#btnPA').bind('click', function () {        
        document.location = "Configuracion_Captura_Movimientos.aspx?tipo=PA&mov=01&des=PENSION ALIMENTICIA";
    });

    $('#btnmovconfig').bind('click', function () { VENTANA_MOVIMIENTOS_CONFIGURADOS('#btnmovconfig'); });
    $('#btnReplicarMovConfig').bind('click', function () { VENTANA_REPLICAR_MOVIMIENTO('#btnReplicarMovConfig'); });
    $('#btnReplicarCampoMov').bind('click', function () { VENTANA_REPLICAR_CAMPO_MOVIMIENTO('#btnReplicarCampoMov'); });

    $('#btnEliminarMovConfig').bind('click', function () { VENTANA_ELIMINAR_MOVIMIENTO('#btnEliminarMovConfig'); });

    $('#btnGReplica').bind('click', function () { GUARDAR_MOVIMIENTOS_COPIAS('#btnGReplica'); });
    $('#btnEMov').bind('click', function () { ELIMINAR_MOVIMIENTOS('#btnEMov'); });

    $('#btnGRCampoMov').bind('click', function () { GUARDAR_CAMPO_MOVIMIENTOS('#btnGRCampoMov'); });
    

    $('#btnLConfiguracion').bind('click', function () {
        LIMPIAR_MOVIMIENTOS_CONFIGURADOS();
    });
    $('#btnLReplica').bind('click', function () { LIMPIAR_REPLICA_MOVIMIENTOS(); });
    $('#btnLMov').bind('click', function () { LIMPIAR_ELIMINAR_MOVIMIENTOS(); });
    

    $('#btnLimpiar').bind('click', function () { LIMPIAR_CONFIGURACION('#btnLimpiar'); });

    //$('#dgcampos').datagrid('enableCellEditing').datagrid('gotoCell', {
    //    index: 1,
    //    field: 'id',
    //});
});

function COMPARAR_FECHAS() {
    var startDt = '19/06/2018';
    var date = new Date("15-05-2018".replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"))
    var f1 = new Date(startDt);
    var f2 = new Date(endDt).getDate();
    if (f1 > f2){
        alert(startDt + " Es Mayor que " + endDt);
    }
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

function cargar_movimientos(tobj,tipo) {
    var parametros = {};
    parametros.tipo = tipo;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Movimientos_Visibles',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
             objtree = jQuery.parseJSON(data.d[0]);
              objm = jQuery.parseJSON(data.d[1]);

            $(tobj).tree({
                data: objtree,
                formatter: function (node) {
                    return '<span title=\'' + node.nombre + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
            });
            $(tobj).tree('collapseAll');
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        {           
            $('#loading').hide(100);
        }
    });
}

function Buscar_documento(valor) {
    //buscar el movimiento en la lista de movimientos para sacar la descripción
    var des = getObjects(objtree, 'Id', valor);
    if (des.length == 0) { $.messager.alert('Informacion', 'No existe el movimiento a buscar - ' + valor, 'error'); $('#txtvalor').textbox('setValue', ''); }
    else
    {       
        document.location = "Configuracion_Captura_Movimientos.aspx?tipo=" + tipo+"&mov="+valor+"&des="+des[0].text;
    }
}

function CARGAR_CONFIGURACION(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#btnmovconfig').linkbutton({ disabled: false });
        $('#btnReplicarMovConfig').linkbutton({ disabled: false });
        $('#btnReplicarCampoMov').linkbutton({ disabled: false });
        $('#btnEliminarMovConfig').linkbutton({ disabled: false });
      
        cargar_movimientos('#lstmod', tipo);
        $('#lstmod').tree('collapseAll');

        if (tipo == 'MC') { document.getElementById('lbltitulo').innerHTML = "PAGOS Y DESCUENTOS DIVERSOS"; }
        if (tipo == 'MP') { document.getElementById('lbltitulo').innerHTML = "MOVIMIENTOS DE PERSONAL"; }
        if (tipo == 'DP') { document.getElementById('lbltitulo').innerHTML = "DATOS PERSONALES"; }
        if (tipo == 'IL') { document.getElementById('lbltitulo').innerHTML = "INCIDENCIAS LABORALES"; }       

        $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
        $('#btnActualizar').bind('click', function () { ACTUALIZA_MOVIMIENTOS_CONFIGURADOS('#btnActualizar'); });

        //$('#txtmovimiento').textbox({ disabled: false });
        //$('#cboopciones').combobox({ disabled: false });
        //$('#btnBuscarMov').linkbutton({ disabled: false });
    }
}

function ACTUALIZA_MOVIMIENTOS_CONFIGURADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        LIMPIAR_MOVIMIENTOS_CONFIGURADOS();
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tvmovimientos');        
    }
}

function LIMPIAR_CONFIGURACION(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        document.getElementById('lbltitulo').innerHTML = "";
        $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
        //$('#txtmovimiento').textbox({ disabled: true });
        //$('#cboopciones').combobox({ disabled: true });
        //$('#btnBuscarMov').linkbutton({ disabled: true });
        $('#lstmod').tree('removeAll');

        $('#btnMP').linkbutton({ selected: false });
        $('#btnMC').linkbutton({ selected: false });
        $('#btnDP').linkbutton({ selected: false });
        $('#btnIL').linkbutton({ selected: false });
    }
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
function CARGAR_MOVIMIENTOS_CONFIGURADOS(tvobj,movact,mov) {
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
        complete: function ()
        {
            $('#loading').hide(100);
            if (obj.length > 0) { $('#btnActualizar').linkbutton({ disabled: false }); }
            else { $('#btnActualizar').linkbutton({ disabled: true }); }
        }
    });
}
function VENTANA_MOVIMIENTOS_CONFIGURADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tvmovimientos',"", "");
        windows("#wconfiguraciones", 1000, 600,false, 'Lista de Movimientos Configurados');
    }
}
function LIMPIAR_MOVIMIENTOS_CONFIGURADOS() {
    var t = $('#tvmovimientos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#dgcamposconfig').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnmovconfig').linkbutton({ disabled: true });
    $('#btnReplicarMovConfig').linkbutton({ disabled: true });
    $('#btnReplicarCampoMov').linkbutton({ disabled: true });
    
    $('#btnEliminarMovConfig').linkbutton({ disabled: true });
}
function ACEPTAR_MOVIMIENTOS_CONFIGURADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campo = $('#tvmovimientos').tree('getSelected');
        if (campo != null) {
            CAMPOS_CONFIGURACION_MOVIMIENTOS('#dgcampos', campo.name);
            $('#btnGuardarMovConfig').linkbutton({ disabled: false });
            $("#wconfiguraciones").window('close');
        }
    }
}

function VENTANA_REPLICAR_MOVIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        LIMPIAR_REPLICA_MOVIMIENTOS();
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tmovconfig',"", "");
        windows("#wreplicamov", 900, 600,false, 'Replicar Movimientos');
    }
}
function LIMPIAR_REPLICA_MOVIMIENTOS() {
    var t = $('#tmovconfig');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }   
    $('#tmovmod').tree('removeAll');
    
    $('#btnGReplica').linkbutton({ disabled: true });
}

function VENTANA_REPLICAR_CAMPO_MOVIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        LIMPIAR_REPLICA_CAMPO_MOVIMIENTOS();
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tmovactuales', "", "");
        
        windows("#wreplicacampomov", 900, 600, false, 'Replicar Campo a Movimientos');
    }
}

function LIMPIAR_REPLICA_CAMPO_MOVIMIENTOS() {
    var t = $('#tmovactuales');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tmovcopia');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    //$('#tmovmod').tree('removeAll');

    $('#btnGRCampoMov').linkbutton({ disabled: true });
}


function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].movimiento == row.movimiento) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].movimiento == row.movimiento) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}


function onCheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].campo == row.campo) {
            return
        }
    }
    checkedRowsCampos.push(row);
}
function onUncheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].campo == row.campo) {
            checkedRowsCampos.splice(i, 1);
            return;
        }
    }
}

function CARGAR_CAMPOS_MOVIMIENTO(dgobj, dgobjnuevo, mov) {   
    var parametros = {};
    parametros.tipo = tipo,
    parametros.movimiento = mov    
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Campos_Movimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[1]);
            $(dgobj).datagrid({
                data: obj,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: false,
                striped: true,
                pageSize: 20,
                checkOnSelect: false,
                selectOnCheck: false,
                onCheckAll: function () {
                    var allRows = $(this).datagrid('getRows');
                    checkedRowsCampos = allRows;
                },
                onUncheckAll: function () {
                    checkedRowsCampos = [];
                },
                onCheck: onCheckCampos,
                onUncheck: onUncheckCampos,
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

            var objnuevo = jQuery.parseJSON(data.d[0]);
            $(dgobjnuevo).datagrid({
                data: objnuevo,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: false,
                striped: true,
                pageSize: 20,
                checkOnSelect: false,
                selectOnCheck: false,
                onCheckAll: function () {
                    var allRows = $(this).datagrid('getRows');                   
                    checkedRows = allRows;
                },
                onUncheckAll: function () {                    
                    checkedRows = [];
                },
                onCheck: onCheck,
                onUncheck: onUncheck,
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
        complete: function () { $('#loading').hide(100); }
    });
}



function getChkName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].nombre);
    }
    return ss.join(',');
}

function GUARDAR_MOVIMIENTOS_COPIAS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        var t = $('#tmovconfig');
        var node = t.tree('getSelected');
        if (node != undefined) {
            var parametros = {};
            parametros.tipo = tipo;
            parametros.movimiento = node.nombre;
            parametros.movnuevo = getChkName('#tmovmod');
            $.ajax({
                type: "POST",
                url: 'Funciones.aspx/Guardar_Configuracion_Movimientos',
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
                    else {
                        $.messager.alert('Información', data.d[1], 'info');
                        LIMPIAR_REPLICA_MOVIMIENTOS();
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
    }
}


function VENTANA_ELIMINAR_MOVIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tmoveliminar', "", "");
        $('#tmoveliminar').tree({ onlyLeafCheck: true });
        windows("#weliminarmov", 600, 600, false, 'Eliminar Movimientos');
    }
}
function LIMPIAR_ELIMINAR_MOVIMIENTOS() {
    var t = $('#tmoveliminar');
    var nodes = t.tree('getChecked', ['checked', 'indeterminate']);
    for (var i = 0; i < nodes.length; i++) {
        t.tree('unselect', nodes[i].target);
        t.tree('uncheck', nodes[i].target);
    }
    $('#btnEMov').linkbutton({ disabled: true });
}

function ELIMINAR_MOVIMIENTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {            
            var parametros = {};
            parametros.tipo = tipo;            
            parametros.movimiento = getChkName('#tmoveliminar');
            $.ajax({
                type: "POST",
                url: 'Funciones.aspx/Eliminar_Configuracion_Movimientos',
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
                    else {
                        $.messager.alert('Información', data.d[1], 'info');
                        CARGAR_MOVIMIENTOS_CONFIGURADOS('#tmoveliminar', "", "");
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
}



function GUARDAR_CAMPO_MOVIMIENTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var campo = ""; movnuevos = "";
        var t = $('#tmovactuales');
        var node = t.tree('getSelected');
        if (node != undefined) {
            $('#dgmovimientos').datagrid('acceptChanges');
            var fields = $('#dgmovimientos').datagrid('getColumnFields', true).concat($('#dgmovimientos').datagrid('getColumnFields', false));
            if (checkedRows.length > 0) {                
                for (var f = 0; f < checkedRows.length; f++) {
                    movnuevos += "''" + checkedRows[f].movimiento + "'',"
                }
                movnuevos = movnuevos.substring(0, movnuevos.length - 1);
            }
            else { $.messager.alert('Error', 'Falta Seleccionar los Movimientos a Modificar', 'error'); return; }

            $('#dgcampos').datagrid('acceptChanges');
            var fields = $('#dgcampos').datagrid('getColumnFields', true).concat($('#dgcampos').datagrid('getColumnFields', false));
            if (checkedRowsCampos.length > 0) {
                for (var f = 0; f < checkedRowsCampos.length; f++) {
                    campo += "''" + checkedRowsCampos[f].campo + "'',"
                }
                campo = campo.substring(0, campo.length - 1);
            }
            else { $.messager.alert('Error', 'Falta Seleccionar los Campos a Modificar', 'error'); return; }

            //var filas = $('#dgcampos').datagrid('getSelected');
            //if (filas != null) {
            //    var rowIndex = $("#dgcampos").datagrid("getRowIndex", filas);
            //    campo: $('#dgcampos').datagrid('getRows')[rowIndex].campo;
            //}
            //else { $.messager.alert('Error', 'Falta Seleccionar el Campo a Agregar', 'error'); return; }

            var parametros = {};
            parametros.tipo = tipo;
            parametros.movimiento = node.nombre;
            parametros.movnuevo = movnuevos;
            parametros.campo = campo;
            $.ajax({
                type: "POST",
                url: 'Funciones.aspx/Guardar_Campos_Movimientos_Modificados',
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
                    else {
                        $.messager.alert('Información', data.d[1], 'info');
                       
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
        else { $.messager.alert('Error', 'Falta Seleccionar el Movimiento', 'error'); }
    }
}


