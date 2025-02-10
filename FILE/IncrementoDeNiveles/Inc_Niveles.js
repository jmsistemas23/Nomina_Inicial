var gpojer = "";
var gpolab = "";
var cvepue = "";
var cveniv = "";
var cvecon="";
var checkedRows = [];
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
    $.extend($.fn.treegrid.methods, {
        getChecked: function (jq) {
            var rows = [];
            var target = jq[0];
            var opts = jq.treegrid('options');
            opts.finder.getTr(target, '', 'checked').has('div.datagrid-cell-check input[type=checkbox]').each(function () {
                var row = opts.finder.getRow(target, $(this));
                rows.push(row);
            });
            return rows;
        }
    });

    CARGAR_LISTA('#tgpojer', 'gj', '');
    CARGAR_LISTA('#tgpolab', 'gl', '');
    

    $('#tgpojer').tree({
        onClick: function (node) {
            if (node.name != "") {
                gpojer = node.name;
            }
        }
    });
    $('#tgpolab').tree({
        onClick: function (node) {
            if (node.name != "") {
                gpolab = node.name;
                CARGAR_LISTA('#tpuestos', 'pu', "cvejerpu=''" + gpojer + "'' and cvelabpu=''" + gpolab + "''");
                CARGAR_LISTA('#tconceptos', 'con', '');
                $('#btnBuscarNiv').linkbutton({ disabled: false });
                $('#btnLimpiarNiv').linkbutton({ disabled: false });
                $('#btnimporte').linkbutton({ disabled: false });
                $('#btnporcentaje').linkbutton({ disabled: false });
                $('#btnLimpiarCon').linkbutton({ disabled: false });
                $('#btnCargarCon').linkbutton({ disabled: false });
                $('#txtimporte').numberbox({ disabled: false });
                $('#dvigenciainicial').datebox({ disabled: false })
                $('#dvigenciafinal').datebox({ disabled: false })
            }
        }
    });
    $('#tpuestos').tree({
        onClick: function (node) {
            MARCAR_DESMARCAR_NODE('#tpuestos', node);
        }
    });
    $('#tconceptos').tree({
        onClick: function (node) {          
            MARCAR_DESMARCAR_NODE('#tconceptos', node);          
        }
    });
    $('#tniveles').tree({
        onClick: function (node) {            
            MARCAR_DESMARCAR_NODE('#tniveles', node);
        }
    });

    $('#btnBuscarNiv').bind('click', function () {
        cvepue = getChkName('#tpuestos');
        if (cvepue != "")
        { CARGAR_LISTA('#tniveles', 'niv', "cvejerpu=''" + gpojer + "'' and cvelabpu=''" + gpolab + "'' and cvepue in (" + cvepue + ")"); }
        else { CARGAR_LISTA('#tniveles', 'niv', "cvejerpu=''" + gpojer + "'' and cvelabpu=''" + gpolab + "''"); }
    });
    $('#btnLimpiarNiv').bind('click', function () {
        LIMPIAR_NIVELES('#btnLimpiarNiv');
    });
    $('#btnCargarCon').bind('click', function () {
        CARGAR_CAPTURA('#btnCargarCon', '#dgcaptura');
    });
    

    TXT_FILTRO_TREE('#txtpuestos', '#tpuestos');
    TXT_FILTRO_TREE('#txtniveles', '#tniveles');
    TXT_FILTRO_TREE('#txtconceptos', '#tconceptos');

    $('#chkpuestos').bind('click', function () {
        if ($('#chkpuestos').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#tpuestos', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#tpuestos', 'uncheck'); }
    });

    $('#chkniveles').bind('click', function () {
        if ($('#chkniveles').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#tniveles', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#tniveles', 'uncheck'); }
    });

    $('#chkconceptos').bind('click', function () {
        if ($('#chkconceptos').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#tconceptos', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#tconceptos', 'uncheck'); }
    });

    $('#btnAplicar').bind('click', function () {
        APLICAR_IMPORTE('#btnAplicar');
    });


    $('#btnLimpiarCon').bind('click', function () {
        LIMPIAR_IMPORTE();        
        $('#btnimporte').linkbutton({ selected: false });
        $('#btnporcentaje').linkbutton({ selected: false });
        $('#txtimporte').numberbox('setValue', '');        
        $('#dvigenciainicial').datebox('setValue', '');
        $('#dvigenciafinal').datebox('setValue', '');
    });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_IMPORTE();
        $('#btnBuscarNiv').linkbutton({ disabled: true });
        $('#btnCargarCon').linkbutton({ disabled: true });
        $('#btnAplicar').linkbutton({ disabled: true });
        $('#btnLimpiarCon').linkbutton({ disabled: true });
        $('#btnLimpiarNiv').linkbutton({ disabled: true });
        $('#btnimporte').linkbutton({ disabled: true });
        $('#btnporcentaje').linkbutton({ disabled: true });
        $('#txtimporte').numberbox('setValue', '');
        $('#txtimporte').numberbox({ disabled: true });
        $('#dvigenciainicial').datebox('setValue', '');
        $('#dvigenciainicial').datebox({disabled:true})
        $('#dvigenciafinal').datebox('setValue', '');
        $('#dvigenciafinal').datebox({ disabled: true })
        LIMPIAR_TREE('#tgpojer', 'Si', '', '');
        LIMPIAR_TREE('#tgpolab', 'Si', '', '');
        LIMPIAR_TREE('#tpuestos', '', '', 'Si');
        LIMPIAR_TREE('#tconceptos', '', '', 'Si');
        LIMPIAR_TREE('#tniveles', '', '', 'Si');
        $('#btnAplicar').linkbutton({ disabled: true });
        $('#dgcaptura').datagrid('loadData', { "total": 0, "rows": [] });
    });

    $('#btnAplicarIncremento').bind('click', function () {
        ALICAR_INCREMENTO('#btnAplicarIncremento');
    });
});

function MARCAR_DESMARCAR_NODE(tobj,nodo)
{
    var ch = nodo.checked;
    if ((ch == undefined) || (ch == false)) { $(tobj).tree('check', nodo.target); }
    else if (ch == true) { $(tobj).tree('uncheck', nodo.target); }
}

function LIMPIAR_TREE(tobj,quitarseleccion,quitarfiltro,eliminar)
{
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
    if (quitarfiltro=='Si')
    { t.tree('doFilter', ''); }
}

function getChkName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push("''" + nodes[i].name + "''");
    }
    return ss.join(',');
}

function getChk(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].name);
    }
    return ss.join(',');
}

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].cveniv == row.cveniv) {
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

function MARCAR_DESMARCAR_TREE(tobj, accion) {
    var tri = $(tobj).tree('getRoots');
    for (var h = 0; h < tri.length; h++) {
        $(tobj).tree(accion, tri[h].target)
        var tree = $(tobj).tree('getChildren', tri[h].target);
        for (var i = 0; i < tree.length; i++) {
            $(tobj).tree(accion, tree[i].target)
        }
    }
}

function CARGAR_LISTA(tobj, tipocat, condicion) {
    var parametros = {};
    parametros.tipo = tipocat;
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Cargar_Lista',
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
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function LIMPIAR_NIVELES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        LIMPIAR_TREE('#tniveles', '', '', 'Si');
    }
}

function CARGAR_CAPTURA(btnobj, dgobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var condicion = "",niveles="",puestos="";
        cveniv = getChk('#tniveles');
        cvepue = getChkName('#tpuestos');
        cvecon = getChk('#tconceptos');


        if (cvepue != "") { cvepue = "and cvepue in (" + cvepue + ")"; }        
              
        condicion = "cvejerpu=''" + gpojer + "'' and cvelabpu=''" + gpolab + "'' " + cvepue; 
                
        var parametros = {};
        parametros.strcondicion = condicion;
        parametros.strconceptos = cvecon;
        parametros.strniveles = cveniv;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Cargar_Lista_NS",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
               // $('#loading').show();
            },
            success: function (data) {
                var obj = $.parseJSON(data.d[0]);
                var $datagrid = {};
                var columns = new Array();
                var strdiseño = data.d[1];
                var columnas = strdiseño.split('|');
                for (var col = 0; col < columnas.length; col++) {                    
                    datos = columnas[col].split(',');                    
                    var valor = datos[0];
                    var titulo = datos[1];
                    if (valor == "chk") { columns.push({ "field": valor, "checkbox": titulo}); }
                    else {
                        var ancho = parseInt(datos[2]) * 10 + "px";
                        var valinear = datos[3];
                        var halinear = datos[4];
                        var tipodato = datos[5];
                        var decimal = datos[6];
                        if (tipodato == "") { columns.push({ "field": valor, "title": titulo, "width": ancho, "align": valinear, "halign": halinear }); }
                        else {
                            columns.push({
                                "field": valor, "title": titulo, "width": ancho, "align": valinear, "halign": halinear, "editor": {
                                    type: tipodato, options: {
                                        precision: decimal                                        
                                        ,formatter:function(v){
                                            return v;
                                        },
                                        parser:function(s){
                                            var v = parseFloat(s);
                                            return isNaN(v)?'':Math.abs(v);
                                        }
                                    }
                                }
                            });
                        }
                    }
                }
                $datagrid.columns = new Array(columns);
                $(dgobj).datagrid({ columns: "", url: "" });
                $(dgobj).datagrid($datagrid);


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

                var total = $(dgobj).datagrid('getData').total;
                var fields = $(dgobj).datagrid('getColumnFields', true).concat($(dgobj).datagrid('getColumnFields', false));
                for (var r = 0; r < total; r++) {                   
                    for (var c = 1; c < fields.length; c++) {
                        var f = r % 2;
                        if (f != 0)
                        { $(dgobj).datagrid('beginEdit', r); }
                        else {
                            var opts = $(dgobj).datagrid('options');
                            var tr = opts.finder.getTr($(dgobj)[0], r);                           
                                tr.find('input[type=checkbox]').attr('disabled', 'disabled');
                            }
                        }
                        //var ed = $(dgobj).datagrid('getEditor', { index: r, field: fields[c] });
                        //var f = r % 2;
                        //if (f != 0) { $(ed.target).numberbox({ disabled: false }); }
                        //else {
                        //    $(dgobj).datagrid('beginEdit', r);
                        //    $(ed.target).numberbox({ disabled: true });
                        //}                    
                }

                //$('#btnporcentaje').linkbutton({ disabled: false });
                //$('#btnimporte').linkbutton({ disabled: false });
                //$('#txtimporte').numberbox({ disabled: false });
                //$('#btnLImporte').linkbutton({ disabled: false });
                $('#btnAplicar').linkbutton({ disabled: false });
                
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
}

function round_nearest(value, decPlaces) {
    return Math.round(value * Math.pow(10, decPlaces)) / Math.pow(10, decPlaces);
}

function round_up(value, decPlaces) {
    return Math.ceil(value * Math.pow(10, decPlaces)) / Math.pow(10, decPlaces);
}

function round_down(value, decPlaces) {
    return Math.floor(value * Math.pow(10, decPlaces)) / Math.pow(10, decPlaces);
}

function APLICAR_IMPORTE(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (($('#btnimporte').linkbutton('options').selected == false) && ($('#btnporcentaje').linkbutton('options').selected == false)) { $.messager.alert('Error', 'Falta seleccionar el tipo de importe a aplicar', 'error'); }
        else {
            $('#loading').show();
            if (($('#txtimporte').numberbox('getValue') > 100) && ($('#btnporcentaje').linkbutton('options').selected == true)) { $.messager.alert('Error', 'El importe a incrementar no puede ser mayor a 100', 'error'); }
            else
            {
                var dg = $('#dgcaptura').datagrid();
                var total = dg.datagrid('getData').total;
                var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
                for (var r = 0; r < total; r++) {
                    for (var c = 2; c < fields.length; c++) {
                        var f = r % 2;
                        if (f != 0) {
                            var row = dg.datagrid('getRows')[r - 1];
                            if ($('#btnimporte').linkbutton('options').selected == true) {
                                var valor1 = row[fields[c]];
                                importe = parseFloat(valor1) + parseFloat($('#txtimporte').numberbox('getValue'));
                            }
                            else {
                                var valor1 =parseFloat(row[fields[c]]);
                                var valor2 =parseFloat($('#txtimporte').numberbox('getValue'));
                                importe = valor1 * (1 + (valor2 / 100));
                            }
                          
                            dg.datagrid('beginEdit', r);
                            var edn = dg.datagrid('getEditor', { index: r, field: fields[c] });
                            $(edn.target).numberbox('setValue', round_down(importe, 2));
                            dg.datagrid('checkRow', r);
                        }
                        else {
                            var opts = dg.datagrid('options');
                            var tr = opts.finder.getTr(dg[0], r);
                            tr.find('input[type=checkbox]').attr('disabled', 'disabled');
                        }
                    }
                }
                $('#loading').hide(100);
                $('#btnAplicarIncremento').linkbutton({ disabled: false });
            }
        }
    }
}

function LIMPIAR_IMPORTE() {
    var dg = $('#dgcaptura').datagrid();
    var total = dg.datagrid('getData').total;
    var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
    for (var r = 0; r < total; r++) {        
        for (var c = 2; c < fields.length; c++) {            
            var f = r % 2;
            if (f != 0) {
                dg.datagrid('beginEdit', r);
                var ed = dg.datagrid('getEditor', { index: r, field: fields[c] });
                $(ed.target).numberbox({ disabled: false });
                $(ed.target).numberbox('setValue', '');
            }
            else {
                var opts = dg.datagrid('options');
                var tr = opts.finder.getTr(dg[0], r);
                tr.find('input[type=checkbox]').attr('disabled', 'disabled');
            }
        }
    }
}

function ALICAR_INCREMENTO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        if ($('#dvigenciainicial').datebox('getValue', '') == "") { $.messager.alert('Error', 'Falta la vigencia inicial', 'error'); $('#loading').hide(100); }
        else
            if ($('#dvigenciafinal').datebox('getValue', '') == "") { $.messager.alert('Error', 'Falta la vigencia final', 'error'); $('#loading').hide(100); }
            else
            {
                var columnas = "", valores="",nivel="";
                var dg = $('#dgcaptura');
                dg.datagrid('acceptChanges');
                var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
                if (checkedRows.length > 0) {
                    for (var f = 0; f < checkedRows.length; f++) {                       
                        columnas = "";
                        nivel = checkedRows[f][fields[1]];
                        for (var c = 2; c < fields.length; c++) {                            
                            columnas += fields[c] + "=" + checkedRows[f][fields[c]] + ",";
                        }
                        valores += nivel + ":" + columnas.substring(0, columnas.length - 1) + "|";
                    }
                    valores = valores.substring(0, valores.length - 1);
                }
                GUARDAR_INCREMENTO($('#dvigenciainicial').datebox('getValue'), $('#dvigenciafinal').datebox('getValue'), valores);
            }
        $('#loading').hide(100);
    }
}

function GUARDAR_INCREMENTO(vigini, vigfin, valor)
{
    var parametros = {};    
    parametros.vigini = vigini;
    parametros.vigfin = vigfin;  
    parametros.valores = valor;  
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Incremento',
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
            if (obj[0].Error == "1") { $.messager.alert('Error', obj[0].Mensaje, 'error'); }
            else {
                $.messager.alert('Información', obj[0].Mensaje, 'info');
                var dg = $('#dgcaptura');
                var total = dg.datagrid('getData').total;                
                for (var r = 0; r < total; r++) {                   
                        var f = r % 2;
                        if (f != 0)
                        {dg.datagrid('beginEdit', r); }
                  
                }
            }
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


