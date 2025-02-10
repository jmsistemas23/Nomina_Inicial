var idsel = "";
var idrol = "";
var jsonind = "";
var checkedRows = [];
var checkedRowsCon = [];
var checkedRowsPLa = [];
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

    $('#tpermisos').tabs('disableTab', 'Lista de Menus');
    $('#tpermisos').tabs('disableTab', 'Lista de Usuarios');
    $('#tpermisos').tabs('disableTab', 'Lista de Catálogos');
    $('#tpermisos').tabs('disableTab', 'Lista de Consultas');
    $('#tpermisos').tabs('disableTab', 'Creación de Plazas');
    $('#chkArolMenu').attr("disabled", true);

    $('#tmovimientos').tabs('disableTab', 'Movimientos');    
    $('#tmovimientos').tabs('disableTab', 'Indicadores por Movimiento');
    $('#tmovimientos').tabs('disableTab', 'Lista de Usuarios');
    $('#chkpermov').attr("disabled", true);
   
    $('#tterceros').tabs('disableTab', 'Lista de Terceros');
    $('#tterceros').tabs('disableTab', 'Lista de Usuarios');
    $('#chkAter').attr("disabled", true);

    $('#tproesp').tabs('disableTab', 'Procesos Especiales');
    $('#tproesp').tabs('disableTab', 'Lista de Usuarios');
    $('#chkAproesp').attr("disabled", true);

    $('#treportes').tabs('disableTab', 'Lista de Reportes');
    $('#treportes').tabs('disableTab', 'Lista de Usuarios');
    $('#chkArep').attr("disabled", true);

    $('#tfiltros').tabs('disableTab', 'Filtros');
    $('#tfiltros').tabs('disableTab', 'Lista de Usuarios');
    $('#chkAfil').attr("disabled", true);
    

    LISTAR_ROLES('#lstRMenus','menu');
    LISTAR_ROLES('#lstRmov', 'mov');
    LISTAR_ROLES('#lstRRep', 'rep');
    LISTAR_ROLES('#lstRter', 'ter');
    LISTAR_ROLES('#lstRFil', 'fil');
    LISTAR_ROLES('#lstRproesp', 'pe');

    CARGAR_MENUS_TREE('#lstmenu');  
    CARGAR_MOVIMIENTOS_TREE('#lstmp','MP');
    CARGAR_MOVIMIENTOS_TREE('#lstmc','MC');
    CARGAR_MOVIMIENTOS_TREE('#lstdp', 'DP');
    CARGAR_MOVIMIENTOS_TREE('#lstrf', 'RF');
    CARGAR_MOVIMIENTOS_TREE('#lstil', 'IL');
   
    
    LISTAR_FORMATOS('#lstrp');
    LISTAR_TERCEROS('#lsttr');

    CARGAR_PROCESOS_ESPECIALES();

   
   
    TXT_FILTRO_TREE('#txtfmenu', '#lstmenu');

    TXT_FILTRO_TREE('#txtFrolmenu', '#lstRMenus');
 
    TXT_FILTRO_TREE('#txtfmp', '#lstmp');

    TXT_FILTRO_TREE('#txtfmc', '#lstmc');

    TXT_FILTRO_TREE('#txtfdp', '#lstdp');

    TXT_FILTRO_TREE('#txtfrf', '#lstrf');

    TXT_FILTRO_TREE('#txtfil', '#lstil');

    TXT_FILTRO_TREE('#txtfind', '#lstind');

    TXT_FILTRO_TREE('#txtfmov', '#lstRmov');

    TXT_FILTRO_TREE('#txtfmovimientos', '#lstmovimientos');
    
    TXT_FILTRO_TREE('#txtfrolter', '#lstRter');

    TXT_FILTRO_TREE('#txtfter', '#lsttr');

    TXT_FILTRO_TREE('#txtfrolRep', '#lstRRep');

    TXT_FILTRO_TREE('#txtfrep', '#lstrp');

    TXT_FILTRO_TREE('#txtfrolFil', '#lstRFil');

    TXT_FILTRO_TREE('#txtfrolproesp', '#lstRproesp');

    TXT_FILTRO_TREE('#txtfxls', '#lstxls');

    TXT_FILTRO_TREE('#txtfpe', '#lstpe');


    $('#lstRMenus').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkArolMenu').attr("disabled", false);
            $('#btnLRMenu').linkbutton({ disabled: false });
            $('#btnGRMenu').linkbutton({ disabled: false });
           // $('#btnNRMenu').linkbutton('disable');
            $('#btnERMenu').linkbutton({disabled:false});
            $('#txtnomrollmenu').textbox('setValue', node.text);
            $('#tpermisos').tabs('enableTab', 'Lista de Menus');
            $('#tpermisos').tabs('enableTab', 'Lista de Usuarios');
            $('#tpermisos').tabs('enableTab', 'Lista de Catálogos');
            $('#tpermisos').tabs('enableTab', 'Lista de Consultas');
            $('#tpermisos').tabs('enableTab', 'Creación de Plazas');

            $('#txtnomrollmenu').textbox({ readonly: false });
            LIMPIAR_NODE_TREE('#lstmenu');
            SACAR_PERMISOS_MENUS('#lstmenu', node.clave, 'P');
            LISTAR_USUARIOS('#dgusumenu', idrol, 'menu', 90, 80);
            LISTAR_CATALOGOS('#dgcat', idrol);
            LISTAR_CONSULTAS('#dgcon', idrol);
            LISTAR_CREACIONPLAZAS('#dgcreacionpla', idrol);
        }
    });

    $('#lstRmov').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkpermov').attr("disabled", false);
            $('#btnLDoc').linkbutton({ disabled: false });
            $('#btnGDoc').linkbutton({ disabled: false });
            //$('#btnNDoc').linkbutton({ disabled: false });
            $('#btnEDoc').linkbutton({ disabled: false });
           
            $('#txtpmov').textbox('setValue', node.text);
            $('#tmovimientos').tabs('enableTab', 'Movimientos');
            $('#tmovimientos').tabs('enableTab', 'Lista de Usuarios');

            $('#txtpmov').textbox({ readonly: false });
            LIMPIAR_NODE_TREE('#lstmp');
            LIMPIAR_NODE_TREE('#lstmc');
            LIMPIAR_NODE_TREE('#lstdp');
            LIMPIAR_NODE_TREE('#lstrf');
            LIMPIAR_NODE_TREE('#lstil');
            SACAR_PERMISOS_MOVIMIENTOS(node.clave, 'M');
            LISTAR_USUARIOS('#dgusumov', idrol, 'mov', 90, 80);
        }
    });

    
    $('#lstRproesp').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkAproesp').attr("disabled", false);
            $('#btnLProEsp').linkbutton({ disabled: false });
            $('#btnGProEsp').linkbutton({ disabled: false });           
            $('#btnEProEsp').linkbutton({ disabled: false });

            $('#txtpproesp').textbox('setValue', node.text);
            $('#txtpproesp').textbox({ readonly: false });
            $('#tproesp').tabs('enableTab', 'Procesos Especiales');
            $('#tproesp').tabs('enableTab', 'Lista de Usuarios');            
            LISTAR_USUARIOS('#dgusuproesp', idrol, 'pe', 90, 80);            
            LIMPIAR_NODE_TREE('#lstxls');
            LIMPIAR_NODE_TREE('#lstpe');
            SACAR_PERMISOS_PROCESOSESPECIALES(node.clave,'PE');
        }
     });


    $('#lstmovimientos').tree({
        onClick: function (node) {
            CARGAR_INDICADORES('#lstind',node.clave);
        }
    });

    $('#lstRRep').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkArep').attr("disabled", false);
            $('#btnLRep').linkbutton({ disabled: false });
            $('#btnGRep').linkbutton({ disabled: false });
           // $('#btnNRep').linkbutton('disable');
            $('#btnERep').linkbutton({ disabled: false });
            $('#txtprep').textbox('setValue', node.text);
            $('#treportes').tabs('enableTab', 'Rol de Reportes');
            $('#treportes').tabs('enableTab', 'Lista de Reportes');
            $('#treportes').tabs('enableTab', 'Lista de Usuarios');

            $('#txtprep').textbox({ readonly: false });
            LIMPIAR_NODE_TREE('#lstrp');
            SACAR_PERMISOS_REPORTES('#lstrp',node.clave, 'R');
            LISTAR_USUARIOS('#dgusurep', idrol, 'rep', 90, 80);
        }
    });

    $('#lstRter').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkAter').attr("disabled", false);
            $('#btnLTer').linkbutton({ disabled: false });
            $('#btnGTer').linkbutton({ disabled: false });
           // $('#btnNTer').linkbutton('disable');
            $('#btnETer').linkbutton({ disabled: false });
            $('#txtpter').textbox('setValue', node.text);
            $('#tterceros').tabs('enableTab', 'Rol de Terceros');
            $('#tterceros').tabs('enableTab', 'Lista de Terceros');
            $('#tterceros').tabs('enableTab', 'Lista de Usuarios');

            $('#txtpter').textbox({ readonly: false });
            LIMPIAR_NODE_TREE('#lsttr');
            SACAR_PERMISOS_TERCEROS('#lsttr', node.clave, 'T');
            LISTAR_USUARIOS('#dgusuter', idrol, 'ter', 90, 80);
            //LISTAR_CATALOGOS('#lstcat', node.clave);
        }
    });

    $('#lstRFil').tree({
        onClick: function (node) {
            idrol = node.clave;
            $('#chkAFil').attr("disabled", false);
            $('#btnLFil').linkbutton({ disabled: false });
            $('#btnGFil').linkbutton({ disabled: false });            
            $('#txtpfil').linkbutton({ disabled: false });
            $('#btnEFil').linkbutton({ disabled: false });
            $('#btnEfi').linkbutton({ disabled: false });
            $('#txtpfil').textbox('setValue', node.text);
            $('#txtquery').textbox('setValue', node.nombre.replace(/''/g, "'"));
            $('#tfiltros').tabs('enableTab', 'Rol de Filtros');
            $('#tfiltros').tabs('enableTab', 'Filtros');
            $('#tfiltros').tabs('enableTab', 'Lista de Usuarios');            
            $('#txtpfil').textbox({ readonly: false });
            
            LISTAR_USUARIOS('#dgfil', idrol, 'fil', 90, 80);
        }
    });



    $('#btnLRMenu').bind('click', function () { LIMPIAR_RM('#btnLRMenu'); });
    $('#btnGRMenu').bind('click', function () { GUARDAR_RM('#btnGRMenu'); });
    $('#btnNRMenu').bind('click', function () { NUEVO_RM('#btnNRMenu'); });
    $('#btnERMenu').bind('click', function () { ELIMINAR_ROL('#btnERMenu', 'M'); });

    $('#btnEcata').bind('click', function () { ELIMINAR_ROL_CATALOGO('#btnEcata'); });
    $('#btnEcon').bind('click', function () { ELIMINAR_ROL_CONSULTA('#btnEcon'); });
    $('#btnECreacionPLA').bind('click', function () { ELIMINAR_CREACIONPLA_INDIVIDUALES('#btnECreacionPLA'); });

    $('#btnLDoc').bind('click', function () { LIMPIAR_MOV('#btnLDoc'); });
    $('#btnGDoc').bind('click', function () { GUARDAR_MOV('#btnGDoc'); });
    $('#btnNDoc').bind('click', function () { NUEVO_MOV('#btnNDoc'); });
    $('#btnEDoc').bind('click', function () { ELIMINAR_ROL('#btnEDoc', 'D'); });

    $('#btnLProEsp').bind('click', function () { LIMPIAR_PROESP('#btnLProEsp'); });
    $('#btnGProEsp').bind('click', function () { GUARDAR_PROESP('#btnGProEsp'); });
    $('#btnNProEsp').bind('click', function () { NUEVO_PROESP('#btnNProEsp'); });
    $('#btnEProEsp').bind('click', function () { ELIMINAR_ROL('#btnEProEsp', 'P'); });

    $('#btnLRep').bind('click', function () { LIMPIAR_REP('#btnLRep'); });
    $('#btnGRep').bind('click', function () { GUARDAR_REP('#btnGRep'); });
    $('#btnNRep').bind('click', function () { NUEVO_REP('#btnNRep'); });
    $('#btnERep').bind('click', function () { ELIMINAR_ROL('#btnERep', 'R'); });

    $('#btnLTer').bind('click', function () { LIMPIAR_TER('#btnLTer'); });
    $('#btnGTer').bind('click', function () { GUARDAR_TER('#btnGTer'); });
    $('#btnNTer').bind('click', function () { NUEVO_TER('#btnNTer'); });
    $('#btnETer').bind('click', function () { ELIMINAR_ROL('#btnETer', 'T'); });
    
    $('#btnNFil').bind('click', function () { NUEVO_FIL('#btnNFil'); });
    $('#btnLFil').bind('click', function () { LIMPIAR_FIL('#btnLFil'); });
    $('#btnGFil').bind('click', function () { GUARDAR_FIL('#btnGFil'); });
    $('#btnEFil').bind('click', function () { ELIMINAR_ROL('#btnEFil', 'F'); });

    $('#btnEmenu').bind('click', function () { ELIMINAR_PERMISOS('#btnEmenu', 'menu', 'M'); });    
    $('#btnEmp').bind('click', function () { ELIMINAR_PERMISOS('#btnEmp', 'mp', 'D'); });
    $('#btnEmc').bind('click', function () { ELIMINAR_PERMISOS('#btnEmc', 'mc', 'D'); });
    $('#btnEdp').bind('click', function () { ELIMINAR_PERMISOS('#btnEdp', 'dp', 'D'); });
    $('#btnErf').bind('click', function () { ELIMINAR_PERMISOS('#btnErf', 'rf', 'D'); });
    $('#btnEil').bind('click', function () { ELIMINAR_PERMISOS('#btnEil', 'il', 'D'); });
    $('#btnEtr').bind('click', function () { ELIMINAR_PERMISOS('#btnEtr', 'tr', 'T'); });
    $('#btnErp').bind('click', function () { ELIMINAR_PERMISOS('#btnErp', 'rp', 'R'); });
    $('#btnEfi').bind('click', function () { ELIMINAR_PERMISOS('#btnEfi', 'fi', 'F'); });

    $('#btnExls').bind('click', function () { ELIMINAR_PERMISOS('#btnExls', 'xls', 'P'); });
    $('#btnPE').bind('click', function () { ELIMINAR_PERMISOS('#btnPE', 'PE', 'P'); });

   


    $('#chkmenu').bind('click', function () {
        if ($('#chkmenu').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstmenu', 'check');}
        else { MARCAR_DESMARCAR_TREE('#lstmenu', 'uncheck'); }
    });

    $('#chkmp').bind('click', function () {
        if ($('#chkmp').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstmp', 'check');}
        else { MARCAR_DESMARCAR_TREE('#lstmp', 'uncheck'); }
    });

    $('#chkmc').bind('click', function () {
        if ($('#chkmc').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstmc', 'check');}
        else { MARCAR_DESMARCAR_TREE('#lstmc', 'uncheck'); }
    });

    $('#chkdp').bind('click', function () {
        if ($('#chkdp').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstdp', 'check');}
        else { MARCAR_DESMARCAR_TREE('#lstdp', 'uncheck'); }
    });

    $('#chkrf').bind('click', function () {
        if ($('#chkrf').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstrf', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#lstrf', 'uncheck'); }
    });

    $('#chkil').bind('click', function () {
        if ($('#chkil').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstil', 'check');}
        else { MARCAR_DESMARCAR_TREE('#lstil', 'uncheck'); }
    });

    $('#chktr').bind('click', function () {
        if ($('#chktr').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lsttr', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#lsttr', 'uncheck'); }
    });

    $('#chkrp').bind('click', function () {
        if ($('#chkrp').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstrp', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#lstrp', 'uncheck'); }
    });

    $('#chkxls').bind('click', function () {
        if ($('#chkxls').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstxls', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#lstxls', 'uncheck'); }
    });

    $('#chkpe').bind('click', function () {
        if ($('#chkpe').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#lstpe', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#lstpe', 'uncheck'); }
    });

  
    $('#dgcat').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 0,
        field: 'id',
    });

    $('#dgcat').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onLoadSuccess: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                $(this).datagrid('beginEdit', i);
            }
            if (data.rows.length > 0)
            { $('#btnEcata').linkbutton({ disabled: false }); }
            else { $('#btnEcata').linkbutton({ disabled: true }); }

          
        }
    });

    $('#dgcon').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 0,
        field: 'id',
    });

    $('#dgcon').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckCon,
        onUncheck: onUncheckCon,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRowsCon = allRows;
        },
        onUncheckAll: function () {
            checkedRowsCon = [];
        },
        onLoadSuccess: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                $(this).datagrid('beginEdit', i);
            }
            if (data.rows.length > 0)
            { $('#btnEcon').linkbutton({ disabled: false }); }
            else { $('#btnEcon').linkbutton({ disabled: true }); }
        }
    });

    $('#dgcreacionpla').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 0,
        field: 'id',
    });
    $('#dgcreacionpla').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckPLa,
        onUncheck: onUncheckPla,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRowsPLa = allRows;
        },
        onUncheckAll: function () {
            checkedRowsPLa = [];
        },
        onLoadSuccess: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
                $(this).datagrid('beginEdit', i);
            }
            if (data.rows.length > 0)
            { $('#btnECreacionPLA').linkbutton({ disabled: false }); }
            else { $('#btnECreacionPLA').linkbutton({ disabled: true }); }
        }
    });
   
});


function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function onCheckCon(index, row) {
    for (var i = 0; i < checkedRowsCon.length; i++) {
        if (checkedRowsCon[i].id == row.id) {
            return
        }
    }
    checkedRowsCon.push(row);
}
function onUncheckCon(index, row) {
    for (var i = 0; i < checkedRowsCon.length; i++) {
        if (checkedRowsCon[i].id == row.id) {
            checkedRowsCon.splice(i, 1);
            return;
        }
    }
}


function onCheckPLa(index, row) {
    for (var i = 0; i < checkedRowsPLa.length; i++) {
        if (checkedRowsPLa[i].id == row.id) {
            return
        }
    }
    checkedRowsPLa.push(row);
}
function onUncheckPla(index, row) {
    for (var i = 0; i < checkedRowsPLa.length; i++) {
        if (checkedRowsPLa[i].id == row.id) {
            checkedRowsPLa.splice(i, 1);
            return;
        }
    }
}


function MARCAR_DESMARCAR_TREE(tobj,accion) {
    var tri = $(tobj).tree('getRoots');
    for (var h = 0; h < tri.length; h++) {
        $(tobj).tree(accion, tri[h].target)
        var tree = $(tobj).tree('getChildren', tri[h].target);
        for (var i = 0; i < tree.length; i++) {
            $(tobj).tree(accion, tree[i].target)
        }
    }
}

function CARGAR_MOVIMIENTOS_TREE(tobj,tipo) {
    var parametros = {};
    parametros.strtipo = tipo;   
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_Movimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.nombre + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
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

function CARGAR_MOVIMIENTOS_TREE_ASIGNADOS(tobj) {
    var parametros = {};
    parametros.idroll = idrol;
    parametros.strclave = "";

    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/ListarMovimintos_Asignados',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.clave + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
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

function LISTAR_INDICADORES(tobj) {
    var parametros = {};
    parametros.strclave = "";
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/ListarIndicadores',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.clave + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
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

function CARGAR_MENUS_TREE(tobj) {
    $.ajax({
        type: "POST",
        url: "PermisosDeUsuarios.aspx/Listar_Menus",        
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj
            });
            $(tobj).tree('collapseAll');
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

function LISTAR_ROLES(tobj, tipo) {
    var parametros = {};
    parametros.tiporol = tipo;
    parametros.idusuario = 0;
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Lista_de_Roles',
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

            $(tobj).tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_PROCESOS_ESPECIALES() {   
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Lista_ProcesosEspeciales',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var objxls = $.parseJSON(data.d[0]);
            var objpe = $.parseJSON(data.d[1]);
            $('#lstxls').tree({
                data: objxls
                //formatter: function (node) {
                //    return '<span title=\'' + node.nombre + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                //},
            });
            $('#lstpe').tree({
                data: objpe
                //formatter: function (node) {
                //    return '<span title=\'' + node.nombre + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                //},
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



function SACAR_PERMISOS_MENUS(tobj, id, tipopermisos) {
    var parametros = {};
    parametros.idroll = id;
    parametros.tipopermisos = tipopermisos;    
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_PermisosMenus',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            var json = jQuery.parseJSON(data.d[0]);

            if (json.length > 0) {
                document.getElementById('chkmenu').checked = true;
                $('#btnEmenu').linkbutton({ disabled: false });
            }
            else
            {
                document.getElementById('chkmenu').checked = false;
                $('#btnEmenu').linkbutton({ disabled: true });
            }
            var tri = $(tobj).tree('getRoots');
            for (var h = 0; h < tri.length; h++) {               
                var tree = $(tobj).tree('getChildren', tri[h].target);
                if (tree.length == 0) {
                    for (var j = 0; j < json.length; j++) {
                        if (json[j].fkMenu == tri[h].Id) {
                            $(tobj).tree('check', tri[h].target);
                        }
                    }
                }
                else {
                    for (var i = 0; i < tree.length; i++) {
                        for (var j = 0; j < json.length; j++) {
                            if (json[j].fkMenu == tree[i].Id) {
                                $(tobj).tree('check', tree[i].target)
                                //break;
                            }

                            if (json[j].fkMenu == tri[h].Id) {
                                $(tobj).tree('check', tri[h].target);
                            }
                        }
                    }
                }
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });

}

function SACAR_PERMISOS_MOVIMIENTOS(id, tipopermisos) {
    var parametros = {};
    parametros.idroll = id;
    parametros.tipopermisos = tipopermisos;  
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_PermisosMenus',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var jsonmov = jQuery.parseJSON(data.d[0]);           
            jsonind=data.d[1];

            CARGAR_MOVIMIENTOS('#lstmp', 'chkmp', '#btnEmp', jsonmov, 'MP');
            CARGAR_MOVIMIENTOS('#lstmc', 'chkmc', '#btnEmc', jsonmov, 'MC');
            CARGAR_MOVIMIENTOS('#lstdp', 'chkdp', '#btnEdp', jsonmov, 'DP');
            CARGAR_MOVIMIENTOS('#lstrf', 'chkrf', '#btnErf', jsonmov, 'RF');
            CARGAR_MOVIMIENTOS('#lstil', 'chkil', '#btnEil', jsonmov, 'IL');
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });

}

function SACAR_PERMISOS_REPORTES(tobj, id, tipopermisos) {
    var parametros = {};
    parametros.idroll = id;
    parametros.tipopermisos = tipopermisos;
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_PermisosMenus',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var json = jQuery.parseJSON(data.d[0]);

            if (json.length > 0) {
                document.getElementById('chkrp').checked = true;
                $('#btnErp').linkbutton({ disabled: false });
            }
            else {
                document.getElementById('chkrp').checked = false;
                $('#btnErp').linkbutton({ disabled: true });
            }

            var tri = $(tobj).tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                var tree = $(tobj).tree('getChildren', tri[h].target);
                if (tree.length == 0) {
                    for (var j = 0; j < json.length; j++) {
                        if (json[j].fkReporte == tri[h].Id) {
                            $(tobj).tree('check', tri[h].target);
                        }
                    }
                }
                else {
                    for (var i = 0; i < tree.length; i++) {
                        for (var j = 0; j < json.length; j++) {
                            if (json[j].fkReporte == tree[i].Id) {
                                $(tobj).tree('check', tree[i].target)
                                //break;
                            }

                            if (json[j].fkReporte == tri[h].Id) {
                                $(tobj).tree('check', tri[h].target);
                            }
                        }
                    }
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

function SACAR_PERMISOS_TERCEROS(tobj, id, tipopermisos) {
    var parametros = {};
    parametros.idroll = id;
    parametros.tipopermisos = tipopermisos;
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_PermisosMenus',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var json = jQuery.parseJSON(data.d[0]);

            if (json.length > 0) {
                document.getElementById('chktr').checked = true;
                $('#btnEtr').linkbutton({ disabled: false });
            }
            else {
                document.getElementById('chktr').checked = false;
                $('#btnEtr').linkbutton({ disabled: true });
            }

            var tri = $(tobj).tree('getRoots');
            for (var h = 0; h < tri.length; h++) {
                var tree = $(tobj).tree('getChildren', tri[h].target);
                if (tree.length == 0) {
                    for (var j = 0; j < json.length; j++) {
                        if (json[j].fkTerceros == tri[h].clave) {
                            $(tobj).tree('check', tri[h].target);
                        }
                    }
                }
                else {
                    for (var i = 0; i < tree.length; i++) {
                        for (var j = 0; j < json.length; j++) {
                            if (json[j].fkTerceros == tree[i].clave) {
                                $(tobj).tree('check', tree[i].target)
                                //break;
                            }

                            if (json[j].fkTerceros == tri[h].clave) {
                                $(tobj).tree('check', tri[h].target);
                            }
                        }
                    }
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

function SACAR_PERMISOS_PROCESOSESPECIALES(id, tipopermisos) {
    var parametros = {};
    parametros.idroll = id;
    parametros.tipopermisos = tipopermisos;
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_PermisosMenus',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var jsonxls = jQuery.parseJSON(data.d[0]);            
            var jsonpe = jQuery.parseJSON(data.d[1]);
            CARGAR_PROCESO_ESPECIALES('#lstxls', jsonxls, '#btnExls', 'chkxls');
            CARGAR_PROCESO_ESPECIALES('#lstpe', jsonpe, '#btnPE', 'chkpe');
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_PROCESO_ESPECIALES(tobj, objson,objbtn,objchk)
{
    var tri = $(tobj).tree('getRoots');
    if (objson.length > 0) {
        document.getElementById(objchk).checked = true;
        $(objbtn).linkbutton({ disabled: false });
    }
    else {
        document.getElementById(objchk).checked = false;
        $(objbtn).linkbutton({ disabled: true });
    }
    
    for (var h = 0; h < tri.length; h++) {
        //var tree = $(tobj).tree('getChildren', tri[h].target);
        //for (var i = 0; i < tree.length; i++) {
            for (var j = 0; j < objson.length; j++) {
                if (objson[j].fkProEsp == tri[h].clave) {
                    $(tobj).tree('check', tri[h].target)
                    break;
                }

                if (objson[j].fkProEsp == tri[h].clave) {
                    $(tobj).tree('check', tri[h].target);
                }
            }
        //}
    }

}

function CARGAR_MOVIMIENTOS(tobj,chkobj,btnobj, objson, tipo) {
    if (objson != null)
    {
        makesArray = jQuery.grep(objson, function (Permisos, i) {
            return Permisos.tipo == tipo;
        });
        if (makesArray.length > 0) {
            var tri = $(tobj).tree('getRoots');

            if (tri.length > 0) {
                document.getElementById(chkobj).checked = true;
                $(btnobj).linkbutton({ disabled: false });
            } else {
                document.getElementById(chkobj).checked = false;
                $(btnobj).linkbutton({ disabled: true });
            }

            for (var h = 0; h < tri.length; h++) {
                var tree = $(tobj).tree('getChildren', tri[h].target);
                for (var i = 0; i < tree.length; i++) {
                    for (var j = 0; j < objson.length; j++) {
                        if (objson[j].fkMovimiento == tree[i].Id) {
                            $(tobj).tree('check', tree[i].target)
                            break;
                        }

                        if (objson[j].fkMovimiento == tri[h].Id) {
                            $(tobj).tree('check', tri[h].target);
                        }
                    }
                }
            }
        }
        if (tipo == 'MC')
        {
            $('#tmovimientos').tabs('enableTab', 'Indicadores por Movimiento');
            CARGAR_MOVIMIENTOS_TREE_ASIGNADOS('#lstmovimientos');            
            LISTAR_INDICADORES('#lstind');
        }
    }
    else
    if (tipo == 'MC')
    {$('#tt').tabs('enableTab', 'Indicadores por Movimiento');}    
}

function CARGAR_INDICADORES(tobj, idmov) {
    var objjsonind = jQuery.parseJSON(jsonind);
    if (objjsonind != null) {
        var makesArray = jQuery.grep(objjsonind, function (Indicadores, i) {
            return Indicadores.fkmovimiento == idmov;
        });
        if (makesArray.length > 0) {
            var tri = $(tobj).tree('getRoots');
            for (var j = 0; j < makesArray.length; j++) {
                for (var h = 0; h < tri.length; h++) {
                    if (makesArray[j].indicador == tri[h].clave) {
                        $(tobj).tree('check', tri[h].target)
                        break;
                    }                    
                }
            }
        }
    }
}


function LIMPIAR_RM(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtnomrollmenu').textbox('setValue', '');      
        document.getElementById('chkArolMenu').checked = true;
       
        $('#txtnomrollmenu').textbox({ readonly: true });
        $('#chkArolMenu').attr("disabled", true);
       
        $('#btnGRMenu').linkbutton({ disabled: true });
        $('#btnNRMenu').linkbutton({ disabled: false });
        $('#btnERMenu').linkbutton({ disabled: true });
               
        CARGAR_MENUS_TREE('#lstmenu');
        $('#tpermisos').tabs('select', 'Rol de Menus');
        $('#txtfmenu').textbox('setValue', '');

        $('#tpermisos').tabs('disableTab', 'Lista de Menus');
        $('#tpermisos').tabs('disableTab', 'Lista de Usuarios');
        $('#tpermisos').tabs('disableTab', 'Lista de Catálogos');
        $('#tpermisos').tabs('disableTab', 'Lista de Consultas');
        $('#tpermisos').tabs('disableTab', 'Creación de Plazas');

        LIMPIAR_NODE_TREE('#lstRMenus');

        idrol = "";
    }
}

function NUEVO_RM(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtnomrollmenu').textbox({ readonly: false });
        $('#chkArolMenu').attr("disabled", false);
       
        $('#btnGRMenu').linkbutton('enable');

        $('#txtnomrollmenu').textbox('clear').textbox('textbox').focus();              
    }
}

function getPermisosCatalosos()
{
    var percatalogos="";
    $('#dgcat').datagrid('acceptChanges');
    if (checkedRows.length > 0) {
        for (var i = 0; i < checkedRows.length; i++) {
            var Agregar = 0, Modificar = 0, Eliminar = 0, Exportar = 0, Reportes = 0, Historia = 0;
            if (checkedRows[i].Agregar == "Si") { Agregar = 1; }
            if (checkedRows[i].Modificar == "Si") { Modificar = 1; }
            if (checkedRows[i].Eliminar == "Si") { Eliminar = 1; }
            if (checkedRows[i].Exportar == "Si") { Exportar = 1; }
            if (checkedRows[i].Reportes == "Si") { Reportes = 1; }
            if (checkedRows[i].Historia == "Si") { Historia = 1; }
            percatalogos += idrol + "," + checkedRows[i].id + "," + Agregar + "," + Modificar + "," + Eliminar + "," + Historia + "," + Exportar + "," + Reportes + "|";
        }
        percatalogos = percatalogos.substring(0, percatalogos.length - 1);     
    }
    else {
        percatalogos = "";
        //$.messager.alert('Error', 'Falta Seleccionar el catálogo guardar', 'error');
    }
    return percatalogos;
}

function getEliminarCatalosos() {
    var percatalogos = "";
    $('#dgcat').datagrid('acceptChanges');
    if (checkedRows.length > 0) {
        for (var i = 0; i < checkedRows.length; i++) {            
            percatalogos += checkedRows[i].id+ ",";
        }
        percatalogos = percatalogos.substring(0, percatalogos.length - 1);

        return percatalogos;
    }
    else { $.messager.alert('Error', 'Falta Seleccionar el catálogo a guardar', 'error'); }
}

function getEliminarConsultas() {
    var perconsultas = "";   
    if (checkedRowsCon.length > 0) {
        $('#dgcon').datagrid('acceptChanges');
        for (var i = 0; i < checkedRowsCon.length; i++) {
            perconsultas += idrol + ";" + checkedRowsCon[i].id + ';histmovper=' + ((checkedRowsCon[i].histmovper == 'Si') ? 1 : 0) + ',histmovcon=' + ((checkedRowsCon[i].histmovcon == 'Si') ? 1 : 0) +
                ',histdatper=' + ((checkedRowsCon[i].histdatper == 'Si') ? 1 : 0) + ',histreffam=' + ((checkedRowsCon[i].histreffam == 'Si') ? 1 : 0) +
                ',histmovesp=' + ((checkedRowsCon[i].histmovesp == 'Si') ? 1 : 0) + ',histinclab=' + ((checkedRowsCon[i].histinclab == 'Si') ? 1 : 0) +
                ',histcapter=' + ((checkedRowsCon[i].histcapter == 'Si') ? 1 : 0) + ',histplazas=' + ((checkedRowsCon[i].histplazas == 'Si') ? 1 : 0) +
                ',histdetnom=' + ((checkedRowsCon[i].histdetnom == 'Si') ? 1 : 0) + ',histimgexp=' + ((checkedRowsCon[i].histimgexp == 'Si') ? 1 : 0) + '|';
        }
        perconsultas = perconsultas.substring(0, perconsultas.length - 1);

        return perconsultas;
    }
    else { $.messager.alert('Error', 'Falta Seleccionar la consulta de historia a guardar', 'error'); }
}

function getEliminarCreacionPla() {
    var perplazas = "";
    if (checkedRowsPLa.length > 0) {
        $('#dgcreacionpla').datagrid('acceptChanges');
        for (var i = 0; i < checkedRowsPLa.length; i++) {
            perplazas += idrol + ";" + checkedRowsPLa[i].id + ';btnnormal=' + ((checkedRowsPLa[i].PlaNormales == 'Si') ? 1 : 0) + ',btninterinos=' + ((checkedRowsPLa[i].PlaInterinos == 'Si') ? 1 : 0) +
                ',btnjubpen=' + ((checkedRowsPLa[i].PlaJubPen == 'Si') ? 1 : 0) + ',btnnoemp=' + ((checkedRowsPLa[i].PlaNoEmp == 'Si') ? 1 : 0)
        }
        // perplazas = perplazas.substring(0, perplazas.length - 1);

        return perplazas;
    }
    else { $.messager.alert('Error', 'Falta Seleccionar el menu a eliminar', 'error'); }
}


function getPermisosConsultas() {
    var perconsultas = "";
    $('#dgcon').datagrid('acceptChanges');
    if (checkedRowsCon.length > 0) {
        for (var i = 0; i < checkedRowsCon.length; i++) {
            var histmovper = 0, histmovcon = 0,histdatper=0, histreffam=0,histmovesp = 0, histinclab = 0, histcapter = 0, histplazas = 0, histdetnom = 0, histimgexp = 0;
            if (checkedRowsCon[i].histmovper == "Si") { histmovper = 1; }
            if (checkedRowsCon[i].histmovcon == "Si") { histmovcon = 1; }
            if (checkedRowsCon[i].histdatper == "Si") { histdatper = 1; }
            if (checkedRowsCon[i].histreffam == "Si") { histreffam = 1; }
            if (checkedRowsCon[i].histmovesp == "Si") { histmovesp = 1; }
            if (checkedRowsCon[i].histinclab == "Si") { histinclab = 1; }
            if (checkedRowsCon[i].histcapter == "Si") { histcapter = 1; }
            if (checkedRowsCon[i].histplazas == "Si") { histplazas = 1; }
            if (checkedRowsCon[i].histdetnom == "Si") { histdetnom = 1; }
            if (checkedRowsCon[i].histimgexp == "Si") { histimgexp = 1; } 
            perconsultas += idrol + "," + checkedRowsCon[i].id + "," + histmovper + "," + histmovcon + "," + histdatper + "," + histreffam + "," + histmovesp + "," + histinclab + "," + histcapter + "," + histplazas + "," + histdetnom + "," + histimgexp + "|";
        }
        perconsultas = perconsultas.substring(0, perconsultas.length - 1);
    }
    else {
        perconsultas = "";
        //$.messager.alert('Error', 'Falta Seleccionar el catálogo guardar', 'error');
    }
    return perconsultas;
}

function getPermisosPlazas() {
    var perplazas = "";
    $('#dgcreacionpla').datagrid('acceptChanges');
    if (checkedRowsPLa.length > 0) {
        for (var i = 0; i < checkedRowsPLa.length; i++) {
            var PlaNormales = 0, PlaInterinos = 0, PlaJubPen = 0, PlaNoEmp = 0;
            if (checkedRowsPLa[i].PlaNormales == "Si") { PlaNormales = 1; }
            if (checkedRowsPLa[i].PlaInterinos == "Si") { PlaInterinos = 1; }
            if (checkedRowsPLa[i].PlaJubPen == "Si") { PlaJubPen = 1; }
            if (checkedRowsPLa[i].PlaNoEmp == "Si") { PlaNoEmp = 1; }
            perplazas = idrol + "," + checkedRowsPLa[i].id + "," + PlaNormales + "," + PlaInterinos + "," + PlaJubPen + "," + PlaNoEmp;
        }
        
    }
    else {
        perplazas = "";
    }
    return perplazas;
}



function GUARDAR_RM(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if ($('#txtnomrollmenu').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del roll de menus", 'error'); }
        else            
            {
            if (idrol == "") { idrol = 0; }
            
                var parametros = {};
                parametros.id = idrol;
                parametros.descripcion = $('#txtnomrollmenu').textbox('getValue');              
                parametros.activo = $('#chkArolMenu').is(":checked");
                parametros.fkpermisosmenus = getChecked('#lstmenu');
                parametros.fkpermisoscatalogos = getPermisosCatalosos();
                parametros.fkpermisosconsultas = getPermisosConsultas();
                parametros.fkpermisosplazas = getPermisosPlazas();
                $.ajax({
                    type: "POST",
                    url: "PermisosDeUsuarios.aspx/Guardar_PermisosMenus",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');
                            CARGAR_MENUS_TREE('#lstRMenu');
                            LIMPIAR_RM('#btnLRMenu');
                            LISTAR_ROLES('#lstRMenus', 'menu');                           
                        }
                        else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}


function LIMPIAR_MOV(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtpmov').textbox('setValue', '');
        document.getElementById('chkpermov').checked = true;

        $('#txtpmov').textbox({ readonly: true });
        $('#chkpermov').attr("disabled", true);

        $('#btnGDoc').linkbutton({ disabled: true });
        $('#btnNDoc').linkbutton({ disabled: false });
        $('#btnEDoc').linkbutton({ disabled: true });

        CARGAR_MOVIMIENTOS_TREE('#lstmp', 'MP');
        CARGAR_MOVIMIENTOS_TREE('#lstmc', 'MC');
        CARGAR_MOVIMIENTOS_TREE('#lstdp', 'DP');
        CARGAR_MOVIMIENTOS_TREE('#lstrf', 'RF');

        $('#tmovimientos').tabs('select', 'Rol de Movimientos');
        $('#txtfmp').textbox('setValue', '');
        $('#txtfmc').textbox('setValue', '');
        $('#txtfdp').textbox('setValue', '');
        $('#txtfrf').textbox('setValue', '');
       
        $('#tmovimientos').tabs('disableTab', 'Movimientos');
        $('#tmovimientos').tabs('disableTab', 'Lista de Usuarios');
        $('#tmovimientos').tabs('disableTab', 'Indicadores por Movimiento');
     
        LIMPIAR_NODE_TREE('#lstmov');
        LIMPIAR_NODE_TREE('#lstRmov');

        idsel = "";
        idrol = "";
    }
}

function NUEVO_MOV(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtpmov').textbox({ readonly: false });
        $('#chkpermov').attr("disabled", false);
        
        $('#btnGDoc').linkbutton('enable');

        $('#txtpmov').textbox('clear').textbox('textbox').focus();
       
    }
}

function getChkMov(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].nombre);
    }
    return ss.join(',');
}

function GUARDAR_MOV(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var movsel = "";
        if ($('#txtpmov').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del roll de movimiento", 'error'); }
        else
        {          
            var movsel = $('#lstmovimientos').tree('getSelected');
            if (movsel == null) { movsel = ""; } else { movsel = movsel.clave; }

            if (idrol == "") { idrol = 0; }

            var parametros = {};
            parametros.id = idrol;
            parametros.descripcion = $('#txtpmov').textbox('getValue');
            parametros.activo = $('#chkpermov').is(":checked");
            parametros.fkmovimiento = movsel;
            parametros.fkmovPersonales = getChkMov('#lstmp');
            parametros.fkmovConceptos = getChkMov('#lstmc');
            parametros.fkmovDatPer = getChkMov('#lstdp');
            parametros.fkmovRefFam = getChkMov('#lstrf');
            parametros.fkmovIncLab = getChkMov('#lstil');
            parametros.movind = getCheckedMov('#lstind');
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Guardar_PermisosMov",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_ROLES('#lstRmov', 'mov');
                        LIMPIAR_MOV('#btnLDoc');                      
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}


function LIMPIAR_PROESP(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtpproesp').textbox('setValue', '');        
        $('#txtpproesp').textbox({ readonly: true });
        $('#chkAproesp').attr("disabled", true);
        document.getElementById('chkAproesp').checked = true;

        $('#btnGProEsp').linkbutton({ disabled: true });
        $('#btnNProEsp').linkbutton({ disabled: false });
        $('#btnEProEsp').linkbutton({ disabled: true });

        $('#tproesp').tabs('select', 'Rol de Procesos Especiales');
        $('#tproesp').tabs('disableTab', 'Procesos Especiales');
        $('#tproesp').tabs('disableTab', 'Lista de Usuarios');

        LIMPIAR_NODE_TREE('#lstRproesp');
    }
}

function NUEVO_PROESP(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtpproesp').textbox({ readonly: false });
        $('#txtpproesp').textbox('clear').textbox('textbox').focus();
        $('#chkAproesp').attr("disabled", false);
        $('#btnGProEsp').linkbutton('enable');
    }
}

function getChkProEsp(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].clave);
    }
    return ss.join(',');
}

function GUARDAR_PROESP(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var movsel = "";
        if ($('#txtpproesp').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del roll de proceso especial", 'error'); }
        else
        {           
            if (idrol == "") { idrol = 0; }

            var parametros = {};
            parametros.id = idrol;
            parametros.descripcion = $('#txtpproesp').textbox('getValue');
            parametros.activo = $('#chkAproesp').is(":checked");
            parametros.fkperxls = getChkProEsp('#lstxls');
            parametros.fkperproesp = getChkProEsp('#lstpe');
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Guardar_PermisosProEsp",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_ROLES('#lstRproesp', 'pe');
                        LIMPIAR_PROESP('#btnLProEsp');
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}


function LISTAR_USUARIOS(dgcontrol, fkroll, tipo, dgancho, dgalto) {
    $(dgcontrol).datagrid({
        url: 'Listar_Usuarios.aspx?fkroll=' + fkroll + '&tipo=' + tipo,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: dgancho + "%",
        heigth: dgalto + "%",        
    });
}

function LISTAR_CATALOGOS(dgcontrol, fkroll) {
    $(dgcontrol).datagrid({
        url: 'Listar_Catalogos.aspx?fkroll=' + fkroll + '&tipo=R',
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20       
    });    
}

function LISTAR_CONSULTAS(dgcontrol, fkroll) {
    $(dgcontrol).datagrid({
        url: 'Listar_HistorialConsultas.aspx?fkroll=' + fkroll + '&tipo=R',
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20
    });
}


function LISTAR_CREACIONPLAZAS(dgcontrol, fkroll) {
    var parametros = {};
    parametros.idusuario = fkroll;
    $.ajax({
        type: "POST",
        url: 'PermisosdeUsuarios.aspx/Listar_CreacionPlazas',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //   $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            if (data.d[1] == "0") { $('#btnECreacionPLA').linkbutton({ disabled: true }); } else { $('#btnECreacionPLA').linkbutton({ disabled: false }); }

            $(dgcontrol).datagrid({
                data: obj,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20
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

function LISTAR_FORMATOS(tobjeto) {
    var parametros = {};
    parametros.idformatos = '';
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Listar_Reportes',
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
            objformatos = jQuery.parseJSON(data.d[1]);

            $(tobjeto).tree({
                data: obj
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

function LIMPIAR_REP(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtprep').textbox('setValue', '');
        document.getElementById('chkArep').checked = true;

        $('#txtprep').textbox({ readonly: true });
        $('#chkArep').attr("disabled", true);

        $('#btnGRep').linkbutton({ disabled: true });
        $('#btnNRep').linkbutton({ disabled: false });
        $('#btnERep').linkbutton({ disabled: true });
               
        LIMPIAR_NODE_TREE('#lstreportes');
        LIMPIAR_NODE_TREE('#lstRRep');

        $('#treportes').tabs('select', 'Rol de Reportes');

        $('#treportes').tabs('disableTab', 'Rol de Reportes');
        $('#treportes').tabs('disableTab', 'Lista de Reportes');
        $('#treportes').tabs('disableTab', 'Lista de Usuarios');

        idrol = "";
    }
}

function NUEVO_REP(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtprep').textbox({ readonly: false });
        $('#chkArep').attr("disabled", false);

        $('#btnGRep').linkbutton('enable');

        $('#txtprep').textbox('clear').textbox('textbox').focus();
    }
}

function GUARDAR_REP(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var repsel = "";
        if ($('#txtprep').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del rol de reportes", 'error'); }
        else
        {
            var repsel = $('#tpreportes').tree('getSelected');
            if (repsel == null) { repsel = ""; } else { repsel = repsel.clave; }

            if (idrol == "") { idrol = 0; }

            var parametros = {};
            parametros.id = idrol;
            parametros.descripcion = $('#txtprep').textbox('getValue');
            parametros.activo = $('#chkArep').is(":checked");            
            parametros.fkpermisosrep = getChecked('#lstrp');
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Guardar_PermisosReportes",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');                      
                        LISTAR_ROLES('#lstRRep', 'Rep');
                        LIMPIAR_REP('#btnLRep');
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}


function LISTAR_TERCEROS(tobj) {
    $.ajax({
        type: "POST",
        url: 'PermisosDeUsuarios.aspx/Lista_Terceros',
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
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LIMPIAR_TER(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtpter').textbox('setValue', '');
        document.getElementById('chkAter').checked = true;

        $('#txtpter').textbox({ readonly: true });
        $('#chkAter').attr("disabled", true);

        $('#btnGTer').linkbutton({ disabled: true });
        $('#btnNTer').linkbutton({ disabled: false });
        $('#btnETer').linkbutton({ disabled: true });

        LIMPIAR_NODE_TREE('#lstterceros');
        LIMPIAR_NODE_TREE('#lstRter');

        $('#tterceros').tabs('select', 'Rol de Terceros');

        $('#tterceros').tabs('disableTab', 'Rol de Terceros');
        $('#tterceros').tabs('disableTab', 'Lista de Terceros');
        $('#tterceros').tabs('disableTab', 'Lista de Usuarios');

        idrol = "";
    }
}

function NUEVO_TER(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtpter').textbox({ readonly: false });
        $('#chkAter').attr("disabled", false);

        $('#btnGTer').linkbutton('enable');

        $('#txtpter').textbox('clear').textbox('textbox').focus();
    }
}

function GUARDAR_TER(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var repsel = "";
        if ($('#txtpter').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del rol del tercero", 'error'); }
        else
        {
            var repsel = $('#tpterceros').tree('getSelected');
            if (repsel == null) { repsel = ""; } else { repsel = repsel.clave; }

            if (idrol == "") { idrol = 0; }

            var parametros = {};
            parametros.id = idrol;
            parametros.descripcion = $('#txtpter').textbox('getValue');
            parametros.activo = $('#chkAter').is(":checked");
            parametros.fkpermisoster = getCheckedMov('#lsttr');
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Guardar_PermisosTerceros",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_ROLES('#lstRter', 'ter');
                        LIMPIAR_TER('#btnLTer');
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}



function ELIMINAR_ROL(btnobj,tipo)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.tipo = tipo;
        parametros.idrol = idrol;
        $.ajax({
            type: "POST",
            url: "PermisosDeUsuarios.aspx/Elininar_Roles",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    if (tipo == 'M')
                    {
                        LIMPIAR_RM('#btnLRMenu');
                        LISTAR_ROLES('#lstRMenus', 'menu');                        
                    }
                    if (tipo == 'D')
                    {
                        LIMPIAR_MOV('#btnLDoc');
                        LISTAR_ROLES('#lstRmov', 'mov');                        
                    }
                    if (tipo == 'R')
                    {
                        LIMPIAR_REP('#btnLRep');
                        LISTAR_ROLES('#lstRRep', 'rep');                        
                    }
                    if (tipo == 'T')
                    {
                        LIMPIAR_TER('#btnLTer');
                        LISTAR_ROLES('#lstRter', 'ter');                        
                    }
                    if (tipo == 'P') {
                        LIMPIAR_PROESP('#btnLProEsp');
                        LISTAR_ROLES('#lstRproesp', 'pe');
                    }
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
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
}

function ELIMINAR_PERMISOS(btnobj,lstobj, tipo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var permisos = "";
        if (tipo == 'D') { permisos = getChkMov('#lst' + lstobj); }
        else
            if (tipo == 'M') { permisos = getChecked('#lst' + lstobj); }
        else
                if (tipo == 'T') { permisos = getCheckedMov('#lst' + lstobj); }
        else
                    if (tipo == 'R') { permisos = getChecked('#lst' + lstobj); }
        else
                        if (tipo == 'F') { permisos = $('#txtquery').textbox('getValue'); }
                        else
                            if (tipo == 'P') { permisos = getChkProEsp('#lst' + lstobj); }

                    
        
        var parametros = {};
        parametros.modulo = lstobj;
        parametros.tipo = tipo;
        parametros.idrol = idrol;
        parametros.permisos = permisos;
        $.ajax({
            type: "POST",
            url: "PermisosDeUsuarios.aspx/Elininar_Permisos",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    if (tipo == 'M') {                        
                        LIMPIAR_NODE_TREE('#lstmenu');
                        SACAR_PERMISOS_MENUS('#lstmenu', idrol, 'P');
                    }

                    if (tipo == 'D') {
                        if (lstobj == 'mp')
                        { CARGAR_MOVIMIENTOS_TREE('#lst' + lstobj, 'MP'); }
                        else
                            if (lstobj == 'mc')
                            { CARGAR_MOVIMIENTOS_TREE('#lst' + lstobj, 'MC'); }
                            else
                                if (lstobj == 'dp')
                                { CARGAR_MOVIMIENTOS_TREE('#lst' + lstobj, 'DP'); }
                                else
                                if (lstobj == 'rf')
                                    { CARGAR_MOVIMIENTOS_TREE('#lst' + lstobj, 'RF'); }                       
                                    else
                                    if (lstobj == 'il')
                                    { CARGAR_MOVIMIENTOS_TREE('#lst' + lstobj, 'IL'); }
                    }

                    if (tipo == 'R') {
                        LIMPIAR_NODE_TREE('#lstrp');
                        SACAR_PERMISOS_REPORTES('#lstrp', idrol, 'R');
                    }

                    if (tipo == 'T') {
                        LIMPIAR_NODE_TREE('#lsttr');
                        SACAR_PERMISOS_TERCEROS('#lsttr', idrol, 'T');
                    }

                    if (tipo == 'P') {
                        LIMPIAR_NODE_TREE('#lstxls');
                        LIMPIAR_NODE_TREE('#lstpe');
                        SACAR_PERMISOS_PROCESOSESPECIALES(idrol, 'PE');
                    }
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
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
}

function ELIMINAR_ROL_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = getEliminarCatalosos();
        if (valores != undefined) {
            var parametros = {};
            parametros.tipo = "R";
            parametros.idrol = idrol;
            parametros.fkpermisoscatalogos = getEliminarCatalosos();
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Elininar_Permisos_Catalogos",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_CATALOGOS('#dgcat', idrol);

                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}

function ELIMINAR_ROL_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = getEliminarConsultas();
        if (valores !=undefined) {
            var parametros = {};
            parametros.tipo = "R";
            parametros.fkpermisosconsultas = valores;
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Elininar_Permisos_Consultas",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_CONSULTAS('#dgcon', idrol);
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}


function ELIMINAR_CREACIONPLA_INDIVIDUALES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = getEliminarCreacionPla();
        if (valores != undefined) {
            var parametros = {};
            parametros.tipo = "R";
            parametros.idusuario = idrol;
            parametros.fkpermisoscreacionpla = getEliminarCreacionPla();
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Elininar_Permisos_CreacionPLA",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_CREACIONPLAZAS('#dgcreacionpla', idrol);

                        if (data.d[2] == "0") { $('#btnECreacionPLA').linkbutton({ disabled: true }); }
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}



function NUEVO_FIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        idrol = "";
        $('#txtpfil').textbox({ readonly: false });
        $('#chkAfil').attr("disabled", false);

        $('#btnGFil').linkbutton('enable');

        $('#txtpfil').textbox('clear').textbox('textbox').focus();
    }
}
function LIMPIAR_FIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtquery').textbox('setValue', '');
        $('#txtpfil').textbox('setValue', '');
        document.getElementById('chkAfil').checked = true;

        $('#txtpfil').textbox({ readonly: true });
        $('#chkAfil').attr("disabled", true);

        $('#btnGFil').linkbutton({ disabled: true });
        $('#btnNFil').linkbutton({ disabled: false });
        $('#btnEFil').linkbutton({ disabled: true });

        CARGAR_MENUS_TREE('#lstmenu');
        $('#tfiltros').tabs('select', 'Rol de Filtros');
        $('#txtfrolFil').textbox('setValue', '');

        $('#tfiltros').tabs('disableTab', 'Rol de Filtros');
        $('#tfiltros').tabs('disableTab', 'Lista de Usuarios');
        $('#tfiltros').tabs('disableTab', 'Filtros');

        //LIMPIAR_NODE_TREE('#lstRMenus');

        idrol = "";
    }
}
function GUARDAR_FIL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var repsel = "";
        if ($('#txtpfil').textbox('getValue') == "") { $.messager.alert('Error', "Falta la descripción del rol de filtros", 'error'); }
        else
        {
            //var repsel = $('#tpreportes').tree('getSelected');
            //if (repsel == null) { repsel = ""; } else { repsel = repsel.clave; }

            if (idrol == "") { idrol = 0; }

            var parametros = {};
            parametros.id = idrol;
            parametros.descripcion = $('#txtpfil').textbox('getValue');
            parametros.activo = $('#chkArep').is(":checked");
            parametros.fkpermisosfil = $('#txtquery').textbox('getValue').replace(/'/g, "''");
            $.ajax({
                type: "POST",
                url: "PermisosDeUsuarios.aspx/Guardar_PermisosFiltros",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LISTAR_ROLES('#lstRFil', 'fil');
                        LIMPIAR_FIL('#btnLFil');
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
    }
}
