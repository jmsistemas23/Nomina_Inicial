var editIndex = undefined;
var total = 0;
var aliastblizq = "";
var aliastblder = "";
var contrelacion = 0;
var conttabla = 0;
var alias = "";
var contador = 0;
var tdgtablas = 0;
var objlistas = [];
var objlstcampos = [];
var lista = {};
var listaCampos = {};
var baneliminar = false;
var strmov = "G";
var idformato = "";
var desformato = "";
var objlstTablas = [];
var listaTablas = {};

$(document).ready(function () {
    idformato = '1';//$_GET('idperfil');
    if (idformato != undefined) { idformato= idformato; }
    else { idformato=''; }

     desformato = "Recibo Nomina BP";//$_GET('desperfil');
    if (desformato != undefined) { desformato = desformato; }
    else { desformato=''; }

    document.getElementById('lblperfil').innerHTML = "Formato Seleccionado: " + idformato + "=" + desformato;

    MOSTRAR_VALORES_GUARDADOS();
    LISTAR_TABLAS_SISTEMA('#lsttablas', '#dgtablas');

    FILTRAR_TREE_TXT('#txttablas', '#lsttablas');
    FILTRAR_TREE_TXT('#txtcampos', '#trvcampos');
    FILTRAR_TREE_TXT('#txtcolizq', '#tcolizq');
    FILTRAR_TREE_TXT('#txtcolder', '#tcolder');
    FILTRAR_TREE_TXT('#txtcamizq', '#rtvcamizq');
    FILTRAR_TREE_TXT('#txtcamder', '#rtvcamder');
               
    $('#lsttablas').tree({       
        onClick: function (node) {
            if (node.IdPadre != 0) {
                var ch = node.checked;
                if ((ch == undefined) ||(ch==false))
                {
                  $('#lsttablas').tree('check', node.target);
                  
                  //conttabla += 1;
                  $('#dgtablas').datagrid('insertRow', {
                      index: 1,
                      row: {
                          id: node.clave,
                          descripcion: node.text,                          
                      }
                  });                  
                  $('#txttablas').textbox('setValue', '');
                  $('#lsttablas').tree('doFilter', '');
                }
                else {                   
                    var rows = $('#dgtablas').datagrid('getRows');
                    for (var p = 0; p < $('#dgtablas').datagrid('getData').total; p++) {                        
                        if (node.clave == rows[p].id)
                        {
                            $('#dgtablas').datagrid('deleteRow', p);                           
                            var t = $('#lsttablas');
                            var snode = t.tree('getSelected');
                            t.tree('uncheck', snode.target);
                            t.tree('unselect', snode.target);
                            //conttabla -= 1;
                        }
                    }                   
                }
                total = $('#dgtablas').datagrid('getData').total;
                if (total > 0)
                { $('#btnRelacion').linkbutton('enable');  }
                else { $('#btnRelacion').linkbutton('disable'); }
            }           
        }
    });

    $('#trvcampos').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    $('#trvcampos').tree('check', node.target);

                    conttabla += 1;
                    $('#dgconfig').datagrid('insertRow', {
                        index: conttabla,
                        row: {                            
                            alias:node.attributes,
                            campo: node.name,
                            descripcion:node.text
                        }
                    });
                    $('#txtcampos').textbox('setValue', '');
                    $('#trvcampos').tree('doFilter', '');
                }
                else {                    
                    var rows = $('#dgconfig').datagrid('getRows');
                    for (var p = 0; p < $('#dgconfig').datagrid('getData').total; p++) {
                        if (node.Id == rows[p].id) {
                            $('#dgconfig').datagrid('deleteRow', p);
                            var t = $('#trvcampos');
                            var snode = t.tree('getSelected');
                            t.tree('uncheck', snode.target);
                            t.tree('unselect', snode.target);
                            conttabla -= 1;
                        }
                    }
                }
                total = $('#dgconfig').datagrid('getData').total;
                if (total > 0)
                { $('#btnECampos').linkbutton('enable'); $('#btnCatalogo').linkbutton('enable'); }
                else { $('#btnECampos').linkbutton('disable'); $('#btnCatalogo').linkbutton('disable'); }
            }
        }
    });

    $('#rtvlsttbl').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                CARGAR_COLUMNAS_CATALOGO('#rtvcamizq', node.clave, '');
                CARGAR_COLUMNAS_CATALOGO('#rtvcamder', node.clave, '');
            }
        }
    });

    $('#dgtablas').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });
    $('#dgrelacion').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });
    $('#dgconfig').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });
    
    $('#btnRelacion').bind('click', function () { ABRIR_VENTANA_RELACIONES('#btnRelacion'); });
    $('#btnAgregar').bind('click', function () { AGREGAR_RELACION('#btnAgregar'); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_RELACION('#btnEliminar'); });
    $('#btnGRelacion').bind('click', function () { ACEPTAR_RELACION('#btnGRelacion'); });
    $('#btnGuardar').bind('click', function () { GUARDAR_SELECCION_TABLAS('#btnGuardar'); });
    $('#btnEDiseño').bind('click', function () { ELIMINAR_DISEÑO('#btnEDiseño'); });
    
    $('#btnCatalogo').bind('click', function () { ABRIR_VENTANA_CATALOGOS('#btnCatalogo'); });
    $('#btnECampos').bind('click', function () { ELIMINAR_RELACION_CATALOGOS('#btnECampos'); });
    $('#btnGRelCat').bind('click', function () { ACEPTAR_RELACION_CATALOGO('#btnGRelCat'); });
    $('#btnLRelCat').bind('click', function () { LIMPIAR_RELACION_CATALOGO('#btnLRelCat'); });
    
    $('#btnregresar').bind('click', function () { document.location = "Diseñador_Filtros.aspx"; });
    //$('input[type=radio]').prop('checked', false);
    //$('input[type=radio]').on('change', function () {
    //    $('input[type=radio]').not(this).prop('checked', false);
    //});
  
  
    $('#tt').tabs({    
        onSelect:function(title){
            if (title == 'Configuración de Campos') {              
                SELECCIONAR_TABLAS_CAMPOS();
                CARGAR_LISTATABLAS('#cbotablas', objlistas);
            }
         }
    });

    $.extend($.fn.tree.methods, {
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        }
    });
});



function MOSTRAR_VALORES_GUARDADOS()
{
    var parametros = {};   
    parametros.idperfil = idformato;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/mostrar_valores_guardados',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            if (data.d[0] == "1") {
                strmov = "M";                
                var objtablas = $.parseJSON(data.d[1]);
                var objcampos = $.parseJSON(data.d[2]);

                objtablas = objtablas.sort(function (a, b) { return a.id - b.id });
                objcampos = objcampos.sort(function (a, b) { return a.orden - b.orden });

                CARGAR_DISEÑO_TABLAS(objtablas, objcampos);
                sessionStorage.setItem('condicion', 'idformato=' + idformato);
            }
            else { strmov = "G"; sessionStorage.setItem('condicion', ''); }
           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_DISEÑO_TABLAS(strablas,strcampos)
{   
    for (var i = 0; i < strablas.length; i++) {        
            $('#dgtablas').datagrid('insertRow', {
                index: i,
                row: {
                    id: strablas[i].id,
                    descripcion: strablas[i].descripcion,
                    alias: strablas[i].alias,
                    inicial: strablas[i].inicial,
                    relacionada: strablas[i].relacionada,
                    relacion: strablas[i].relacion
                }
            });           
    }
           
        for (var i = 0; i < strcampos.length; i++) {           
            $('#dgconfig').datagrid('insertRow', {
                index: i,
                row: {
                    orden: strcampos[i].orden,
                    alias: strcampos[i].alias,
                    campo: strcampos[i].campo,
                    descripcion: strcampos[i].descripcion,
                    consulta: strcampos[i].consulta,
                    filtro: strcampos[i].filtro,
                    relcat: strcampos[i].relcat,
                    cvecat: strcampos[i].cvecat,
                    descat: strcampos[i].descat,
                    nulos: strcampos[i].nulos,
                    repetidos: strcampos[i].repetidos,
                    query: strcampos[i].query
                }
            });        
    }
}

function ACEPTAR_ALIAS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (endEditing()) {
            $('#dgtablas').datagrid('acceptChanges');
        }

    }
}

function LISTAR_TABLAS_SISTEMA(tobj,dgobj) {
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
                    return '<span title=\'' + node.clave + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    var rows = $(dgobj).datagrid('getRows');
                    var tri = $(tobj).tree('getRoots');
                    for (var t = 0; t < rows.length; t++) {
                        for (var h = 0; h < tri.length; h++) {
                            if (rows[t].id == tri[h].clave) {
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
        complete: function ()
        {           
            $('#loading').hide(100);
        }
    });
}

function LISTAR_CATALOGOS(tobj) {
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
                    return '<span title=\'' + node.clave + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
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

function LIMPIAR_RELACION()
{
    $('#cbocamizq').combobox('setValue','X');
    $('#cbocamder').combobox('setValue', 'X');    
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
    $('#btny').linkbutton({ selected: false });
    $('#btno').linkbutton({ selected: false });
    $('#btnleft').linkbutton({ selected: false });
    $('#btnright').linkbutton({ selected: false });
    $('#btnunion').linkbutton({ selected: false });    
    $('#dgrelacion').datagrid('loadData', { "total": 0, "rows": [] });
}

function CARGAR_TABLAS_RELACIONAR()
{
    contador = 0;
    objlistas = [];
    tdgtablas = $('#dgtablas').datagrid('getData').total;
    lista = { clave: "", descripcion: "", alias: "", selected: false };
    lista.clave = "X";
    lista.descripcion = "Seleccione una Tabla";
    lista.alias = "";
    lista.selected = true;
    objlistas.push(lista);
    if (tdgtablas > 1) {
        for (var p = 0; p < tdgtablas; p++) {
            lista = { clave: "", descripcion: "" };
            var clave = $('#dgtablas').datagrid('getRows')[p].id;
            var descripcion = $('#dgtablas').datagrid('getRows')[p].descripcion;
            alias = $('#dgtablas').datagrid('getRows')[p].alias;
            var inicial = $('#dgtablas').datagrid('getRows')[p].inicial;

            if (inicial == "Si") { contador += 1; }
            if ((alias == undefined) && (tdgtablas > 1)) { $.messager.alert('Advertencia', 'Falta el ALIAS de la tabla ' + descripcion, 'warning'); break; }
            else
            {if ((alias == undefined) && (tdgtablas == 1)) { alias = ""; }}

            lista.clave = clave;
            lista.descripcion = descripcion;
            lista.alias = alias;
            objlistas.push(lista);
        }
        if (contador > 1) { $.messager.alert('Advertencia', 'Sólo debe existir una TABLA INICIAL', 'warning'); return 0; }       
    }
    else { $.messager.alert('Advertencia', 'Se necesita más de una tabla a RELACIONAR', 'warning'); return 0; }
}

function SELECCIONAR_TABLAS_CAMPOS() {
    contador = 0;
    objlistas = [];
    $('#dgtablas').datagrid('acceptChanges');
    tdgtablas = $('#dgtablas').datagrid('getData').total;
    lista = { clave: "", descripcion: "", alias: "", selected: false };
    lista.clave = "X";
    lista.descripcion = "Seleccione una Tabla";
    lista.alias = "";
    lista.selected = true;
    objlistas.push(lista);
   
        for (var p = 0; p < tdgtablas; p++) {           
            lista = { clave: "", descripcion: "", alias: "", selected: false };
                var clave = $('#dgtablas').datagrid('getRows')[p].id;
                var descripcion = $('#dgtablas').datagrid('getRows')[p].descripcion;
                alias = $('#dgtablas').datagrid('getRows')[p].alias;
                var inicial = $('#dgtablas').datagrid('getRows')[p].inicial;

                if (inicial == "Si") { contador += 1; }
                if ((alias == undefined) && (tdgtablas > 1)) { $.messager.alert('Advertencia', 'Falta el ALIAS de la tabla ' + descripcion, 'warning'); break; }
                else
                { if ((alias == undefined) && (tdgtablas == 1)) { alias = ""; } }
                
                if (($('#dgtablas').datagrid('getRows')[p].relacionada == "Si") || (inicial=="Si")) {
                    lista.clave = clave;
                    lista.descripcion = descripcion;
                    lista.alias = alias;
                    objlistas.push(lista);
                }            
        }
        if (contador > 1) { $.messager.alert('Advertencia', 'Sólo debe existir una TABLA INICIAL', 'warning'); return 0; }
}

function ABRIR_VENTANA_RELACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        $('#dgtablas').datagrid('acceptChanges');
       
        LIMPIAR_RELACION();

        var dg = $('#dgtablas');
        var cell = dg.datagrid('cell');  // current cell
        if (cell!=null)
         {
            var row = dg.datagrid('getRows')[cell.index];  // current row            
            sessionStorage.setItem('indextbl', cell.index);
            if (row.inicial != "Si") {
                CARGAR_TABLAS_RELACIONAR();
                if ((tdgtablas > 0) && (alias != undefined)) {
                    CARGAR_LISTATABLAS('#cbocamizq', objlistas);
                    CARGAR_LISTATABLAS('#cbocamder', objlistas);
                    if (row.relacionada == "Si") {
                        contrelacion += 1;
                        sessionStorage.setItem('relacionguardad', row.relacion);
                        $('#dgrelacion').datagrid('insertRow', {
                            index: 1,
                            row: {
                                id: contrelacion,
                                relacion: row.relacion
                            }
                        });
                    }
                    windows("#winr", 650, 650, 'Relaciones');
                }            
            //    var tdgtablas = $('#dgtablas').datagrid('getData').total;
            //    if (tdgtablas > 1) {
            //        lista = { clave: "", descripcion: "", alias: "", selected: false };
            //        lista.clave = "X";
            //        lista.descripcion = "Seleccione una Tabla";
            //        lista.alias = "";
            //        lista.selected = true;
            //        objlistas.push(lista);
                  
            //        for (var p = 0; p < tdgtablas; p++) {
            //            lista = { clave: "", descripcion: "" };
            //            var clave = $('#dgtablas').datagrid('getRows')[p].Id;
            //            var descripcion = $('#dgtablas').datagrid('getRows')[p].descripcion;
            //            alias = $('#dgtablas').datagrid('getRows')[p].alias;
            //            var inicial = $('#dgtablas').datagrid('getRows')[p].inicial;
            //            if (inicial == "Si") { contador += 1; }

            //            if ((alias == undefined) && (tdgtablas > 1)) { $.messager.alert('Advertencia', 'Falta el ALIAS de la tabla ' + descripcion, 'warning'); break; }
            //            else { if ((alias == undefined) && (tdgtablas == 1)) { alias = ""; } }

            //            lista.clave = clave;
            //            lista.descripcion = descripcion;
            //            lista.alias = alias;
            //            objlistas.push(lista);
            //        }

            //       if (contador > 1) { $.messager.alert('Advertencia', 'Sólo debe existir una TABLA INICIAL', 'warning'); return 0; }
            //       else
            //        {
            //           if ((tdgtablas > 0) && (alias != undefined)) {
            //               CARGAR_LISTATABLAS('#cbocamizq', objlistas);
            //               CARGAR_LISTATABLAS('#cbocamder', objlistas);
            //               if (row.relacionada == "Si") {
            //                   contrelacion += 1;
            //                   sessionStorage.setItem('relacionguardad', row.relacion);
            //                   $('#dgrelacion').datagrid('insertRow', {
            //                       index: 1,
            //                       row: {
            //                           id: contrelacion,
            //                           relacion: row.relacion
            //                       }
            //                   });
            //               }
            //               windows("#winr", 650, 650, 'Relaciones');
            //           }
            //       }
            //        }
            //        else { $.messager.alert('Advertencia', 'Se necesita más de una tabla a RELACIONAR', 'warning'); return 0; }                
            }
            else { $.messager.alert('Advertencia', 'No se puede crear relación a la TABLA INICIAL', 'warning'); return 0; }
        }
        else { $.messager.alert('Advertencia', 'Falta seleccionar la tabla a RELACIONAR', 'warning'); return 0; }
    }
}

function CARGAR_LISTATABLAS(objcbo,objson)
{
    $(objcbo).combobox({
        data: objson,
        valueField: 'clave',
        textField: 'descripcion',
        editable: false,
        onSelect: function (rec) {
            if (rec.clave != 'X')
            {
                if (objcbo == '#cbocamizq')
                { CARGAR_COLUMNAS_TABLA('#tcolizq','', rec.clave, rec.alias); }
                if (objcbo == '#cbocamder')
                { CARGAR_COLUMNAS_TABLA('#tcolder','', rec.clave, rec.alias); }

                if (objcbo == '#cbotablas')
                { CARGAR_COLUMNAS_TABLA('#trvcampos','#dgconfig', rec.clave, rec.alias); }
            }
        }
    });
}

function CARGAR_COLUMNAS_TABLA(objrtv, dgobj, id, alias)
{
    var parametros = {};
    parametros.id = id;
    parametros.alias = alias;
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
            if (dgobj == '')
            {
                $(objrtv).tree({
                    data: obj
                });
            }
            else
            {
                $(objrtv).tree({
                    data: obj,
                    onLoadSuccess: function () {
                        var rows = $(dgobj).datagrid('getRows');
                        var tri = $(objrtv).tree('getRoots');
                        for (var t = 0; t < rows.length; t++) {
                            for (var h = 0; h < tri.length; h++) {
                                if (rows[t].campo == tri[h].text) {
                                    $(objrtv).tree('check', tri[h].target)
                                    break;
                                }
                            }
                        }
                    }
                });
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

function CARGAR_COLUMNAS_CATALOGO(objrtv, id, alias) {
    var parametros = {};
    parametros.id = id;
    parametros.alias = alias;
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
            
             $(objrtv).tree({
                    data: obj,
                    onLoadSuccess: function () {
                        if (strvalor != "") {
                            var tri = $(objrtv).tree('getRoots');
                            for (var h = 0; h < tri.length; h++) {
                                if (strvalor == tri[h].name) {
                                    $(objrtv).tree('select', tri[h].target)
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
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function AGREGAR_RELACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tiporelacion = "", queryrelacion = "";
        var nododer = "", nodoizq="",logico="";
        baneliminar = false;

        if ($('#cbocamizq').combobox('getValue') == 'X') { $.messager.alert('Error', 'Falta seleccionar la tabla izquierda', 'error'); return 0; }
        else
            if ($('#cbocamder').combobox('getValue') == 'X') { $.messager.alert('Error', 'Falta seleccionar la tabla derecha', 'error'); return 0; }         
            else
                nodoizq = $('#tcolizq').tree('getSelected');
        if (nodoizq==null) { $.messager.alert('Error', 'Falta seleccionar la culumna izquierda de la tabla', 'error'); return 0; }       
        else
            nododer = $('#tcolder').tree('getSelected');
        if (nododer == null) { $.messager.alert('Error', 'Falta seleccionar la culumna derecha de la tabla', 'error'); return 0; }
        else                                             
        var tblizq = $('#cbocamizq').combobox('getText');
        var tblder = $('#cbocamder').combobox('getText');

        if ($('#btnleft').linkbutton('options').selected) { tiporelacion = 'Left Join'; }
        if ($('#btnright').linkbutton('options').selected) { tiporelacion = 'Right Join'; }
        if ($('#btnunion').linkbutton('options').selected) { tiporelacion = 'Inner Join'; }

        if (($('#btnleft').linkbutton('options').unselect) && ($('#btnright').linkbutton('options').unselect) && ($('#btnunion').linkbutton('options').unselect))
        { $.messager.alert('Error', 'Falta seleccionar el tipo de relación', 'error'); return 0; }

        if ($('#btny').linkbutton('options').selected) { logico = 'and'; }
        if ($('#btno').linkbutton('options').selected) { logico = 'or'; }

        var dg = $('#dgrelacion');
        var cell = dg.datagrid('cell');        
        if (cell==null)                
        {
            var tdgrelacion = $('#dgrelacion').datagrid('getData').total;
            if (tdgrelacion == 0) {
                queryrelacion = tiporelacion + " " + tblder + " as " + nododer.attributes + " on " + nodoizq.attributes + "." + nodoizq.name + "=" + nododer.attributes + "." + nododer.name;
                contrelacion += 1;
                $('#dgrelacion').datagrid('insertRow', {
                    index: 1,
                    row: {
                        id: contrelacion,
                        relacion: queryrelacion
                    }
                });
            }
            else { $.messager.alert('Error', 'No se puede agregar más de una relación a la tabla '+tblizq, 'error'); return 0; }
        }
        else
        {            
            if (logico == "")
            {                
                $.messager.confirm('Información','Desea modificar la condición seleccionada', function(r){
                if (r) {                       
                    queryrelacion = tiporelacion + " " + tblder + " as " + nododer.attributes + " on " + nodoizq.attributes + "." + nodoizq.name + "=" + nododer.attributes + "." + nododer.name;
                    $('#dgrelacion').datagrid('updateRow', {
                        index: cell.index,
                        row: {relacion: queryrelacion}
                    });
                  }
               });
            }
            else
            {
                var row = dg.datagrid('getRows')[cell.index]; 
                queryrelacion = tiporelacion + " " + tblder + " as " + nododer.attributes + " on " + nodoizq.attributes + "." + nodoizq.name + "=" + nododer.attributes + "." + nododer.name;
                $('#dgrelacion').datagrid('updateRow', {
                    index: cell.index,
                    row: {relacion: queryrelacion}
                });
            }           
        }
        $('#btny').linkbutton({ selected: false });
        $('#btno').linkbutton({ selected: false });

        $('#btnleft').linkbutton({ selected: false });
        $('#btnright').linkbutton({ selected: false });
        $('#btnunion').linkbutton({ selected: false });

        var tizq = $('#tcolizq');  // the tree object
        var node = tizq.tree('getSelected');
        tizq.tree('unselect', node.target);

        var tder = $('#tcolder');  // the tree object
        var node = tder.tree('getSelected');
        tder.tree('unselect', node.target);
       
    }
}

function ELIMINAR_RELACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgrelacion');
        var cell = dg.datagrid('cell');
        if (cell != null) {            
            $('#dgrelacion').datagrid('cancelEdit', cell.index)
             .datagrid('deleteRow', cell.index);
            baneliminar = true;
        }
        else
        { $.messager.alert('Error', 'Falta seleccionar la fila a eliminar', 'error'); }       
    }
}

function ACEPTAR_RELACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var relacion = "",relacionada="";
        var tdgrelacion = $('#dgrelacion').datagrid('getData').total;
        for (var r = 0; r < tdgrelacion; r++)
        {
            var rows = $('#dgrelacion').datagrid('getRows');
            relacion += rows[0].relacion + " ";
        }
    
        var filatbl = sessionStorage.getItem('indextbl');
        if (baneliminar == true) {relacionada = " ";}
        else { relacionada = "Si"; }

        $('#dgtablas').datagrid('updateRow', {
            index: filatbl,
            row: { relacionada: relacionada, relacion: relacion }
        });
        $("#winr").window('close');

        contrelacion = 0;

    }
}

function CARGAR_LISTA_CAMPOS()
{
    objlstcampos = [];
    var tdgcampos = $('#dgconfig').datagrid('getData').total;
    if (tdgcampos > 1) {
        for (var p = 0; p < tdgcampos; p++) {
            listacampos = { id: "", name: "", text: "", attributes:"" };
            var alias = $('#dgconfig').datagrid('getRows')[p].alias;
            var campo = $('#dgconfig').datagrid('getRows')[p].campo;
            var descripcion = $('#dgconfig').datagrid('getRows')[p].descripcion;

            listacampos.id = p;
            listacampos.attributes = alias;
            listacampos.name = campo;
            listacampos.text = descripcion;            
            objlstcampos.push(listacampos);
        }        
    }
    else { $.messager.alert('Advertencia', 'No existen campos seleccionados', 'warning'); return 0; }
}

function ABRIR_VENTANA_CATALOGOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dgconfig').datagrid('endEdit');
      
        var dg = $('#dgconfig');
        var cell = dg.datagrid('cell');
        if (cell != null) {           
            var indice=cell.index;
            sessionStorage.setItem('indexcam', indice);
            $('#dgconfig').datagrid('acceptChanges');
            var row = dg.datagrid('getRows')[indice];
            if (row.filtro == "Si") {
                document.getElementById('lblrelcampo').innerHTML = "Campo a Relacionar= " + row.campo;
                //LISTAR_CATALOGOS('#rtvlsttbl');

              
                if (row.repetidos == "Si") { $('#btnrepetidos').linkbutton({ selected: true }); } else { $('#btnrepetidos').linkbutton({ selected: false }); }
                if (row.nulos == "Si") { $('#btnnulos').linkbutton({ selected: true }); } else { $('#btnnulos').linkbutton({ selected: false }); }

                CARGAR_LISTA_CAMPOS();
                if (objlstcampos.length > 1)
                {                   
                    $('#rtvcamizq').tree({
                        data: objlstcampos,
                        formatter: function (node) {
                            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                        },
                        onLoadSuccess: function () {                            
                            var tri = $('#rtvcamizq').tree('getRoots');                         
                                for (var h = 0; h < tri.length; h++) {
                                    if (row.cvecat == tri[h].name) {
                                        $('#rtvcamizq').tree('select', tri[h].target)
                                        break;
                                    }
                                }                         
                           }                          
                      });
                    $('#rtvcamder').tree({
                        data: objlstcampos,
                        formatter: function (node) {
                            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                        },
                        onLoadSuccess: function () {
                            var tri = $('#rtvcamder').tree('getRoots');
                            for (var h = 0; h < tri.length; h++) {
                                if (row.descat == tri[h].name) {
                                    $('#rtvcamder').tree('select', tri[h].target)
                                    break;
                                }
                            }
                        }
                    });
                    windows("#wincatalogo", 500, 500, 'Relación del Catálogo');
                }                
            }            
        }
        else { $.messager.alert('Advertencia', 'Falta seleccionar el campo a RELACIONAR', 'warning'); return 0; }
    }
}

function ACEPTAR_RELACION_CATALOGO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var relcat = "", cvecat = "", nulos = "", descat = "", condicion = "", repetidos = "", query = "", relacion = "",tablainicial="";
        
            var indexcam = sessionStorage.getItem('indexcam');

            var t = $('#rtvcamizq');
            var snodeizq = t.tree('getSelected');                
            var t = $('#rtvcamder');
            var snodeder = t.tree('getSelected');

            if (snodeizq == null) {$.messager.alert('Advertencia', 'Falta seleccionar el campo clave', 'warning'); return 0;}
            if (snodeder == null) {$.messager.alert('Advertencia', 'Falta seleccionar el campo descripcion', 'warning'); return 0;}

            if (baneliminar == true) { relcat = " "; cvecat=" ";descat="",nulos="",repetidos=""}
            else {
                    relcat = "Si";
                    cvecat = snodeizq.name;
                    descat = snodeder.name;

                    if ($('#btnnulos').linkbutton('options').selected)
                    { nulos = "Si"; condicion = " where " + snodeizq.attributes + "." + cvecat + " IS NOT NULL or " + snodeder.attributes + "." + descat + " IS NOT NULL"; }

                    if ($('#btnrepetidos').linkbutton('options').selected)
                    { repetidos = "Si"; query = "select distinct " + snodeizq.attributes + "." + cvecat + "," + snodeder.attributes + "." + descat; }
                    else { query = "select " + snodeizq.attributes + "." + cvecat + "," + snodeder.attributes + "." + descat; }

                    var tdgtablas = $('#dgtablas').datagrid('getRows');
                    for (var t = 0; t < tdgtablas.length; t++) {
                        if (tdgtablas[t].inicial == "Si")
                        { tablainicial = tdgtablas[t].descripcion + " as " + tdgtablas[t].alias; }

                        if (tdgtablas[t].relacionada == "Si")
                        { relacion += tdgtablas[t].relacion + " "; }
                    }
                    query = query + " from " + tablainicial + " " + relacion + condicion + " order by " + snodeizq.attributes + "." + cvecat;

                    $('#dgconfig').datagrid('updateRow', {
                        index: indexcam,
                        row: { relcat: relcat, cvecat: cvecat, descat: descat, nulos: nulos, repetidos: repetidos, query: query }
                    });
                    $("#wincatalogo").window('close');
                }
    }
}

function ELIMINAR_RELACION_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgconfig');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $('#dgconfig').datagrid('cancelEdit', cell.index)
            $('#dgconfig').datagrid('updateRow', {
                index: cell.index,
                row: { relcat: "", cvecat: "", descat: "", nulos: "", repetidos: "" }
            });
            baneliminar = true;
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo de la relación a eliminar', 'error'); }
    }
}

function LIMPIAR_RELACION_CATALOGO(btnobj)
{
    $('#txtcamizq').textbox('setValue', '');
    $('#txtcamder').textbox('setValue', '')
    $('#btnnulos').linkbutton({ selected: false });
    $('#btnrepetidos').linkbutton({ selected: false });   
    var t = $('#rtvcamizq');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#rtvcamder');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
}

function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}

function SACAR_VALORES()
{
    $('#dgconfig').datagrid('endEdit');
    $('#dgtablas').datagrid('endEdit');
  
    var distabla = "",discampos="",campos="";
    var tdgtablas = $('#dgtablas').datagrid('getData').total;
    $('#dgtablas').datagrid('acceptChanges');
    var rtabla = $('#dgtablas').datagrid('getRows');

    objlstTablas = [];
    if (tdgtablas > 0) {
        var relacionadas = "", relacion = "", inicial = "", alias = "";
        for (var t = 0; t < tdgtablas; t++) {
            listaTablas = { id: "", descripcion: "", alias: "", inicial: "", relacionadas: "", relacion: "" };
            if (rtabla[t].relacionada != undefined) { relacionadas = rtabla[t].relacionada; }
            if (rtabla[t].relacion != undefined) { relacion += rtabla[t].relacion + ' '; }
            if (rtabla[t].alias != undefined) { alias += rtabla[t].alias + ' '; }
            if (rtabla[t].inicial == "Si") { inicial = rtabla[t].inicial; sessionStorage.setItem('from', rtabla[t].descripcion + " as " + rtabla[t].alias); } else { inicial = ""; }

            //distabla += rtabla[t].id + "," + rtabla[t].descripcion + "," + rtabla[t].alias + "," + inicial + "," + relacionadas + "," + myTrim(relacion) + "|";
            listaTablas.id = rtabla[t].id;
            listaTablas.descripcion = rtabla[t].descripcion;
            listaTablas.alias = alias;
            listaTablas.inicial = inicial;
            listaTablas.relacionadas = relacionadas;
            listaTablas.relacion = myTrim(relacion);
            objlstTablas.push(listaTablas);
        }
        var r = myTrim(relacion).substring(0, myTrim(relacion).length);
        sessionStorage.setItem('relaciones', r);

        // distabla = distabla.substring(0, distabla.length - 1);

        var stablas = JSON.stringify(objlstTablas);
        sessionStorage.setItem('distabla', stablas);
    }
    else { sessionStorage.setItem('distabla', ''); }

    var tdgconfig = $('#dgconfig').datagrid('getData').total;
    $('#dgconfig').datagrid('acceptChanges');
    var rtblconfig = $('#dgconfig').datagrid('getRows');
    if (tdgconfig > 0) {
        var consulta = "", filtro = "", relcat = "", cvecat = "", descat = "", nulos = "", repetidos = "", orden = "", query = "", alias = "";

        objlstcampos = [];
        for (var c = 0; c < tdgconfig; c++) {
            listacampos = { orden: "", alias: "",campo:"",descripcion:"", consulta: "", filtro: "",relcat:"",cvecat:"",descat:"",nulos:"",repetidos:"",query:"" };

            if (rtblconfig[c].orden != undefined) { orden = rtblconfig[c].orden; } else { orden = ""; }
            if (rtblconfig[c].alias != undefined) { alias = rtblconfig[c].alias; } else { alias = ""; }
            if (rtblconfig[c].consulta != undefined) { consulta = rtblconfig[c].consulta; } else { consulta = ""; }
            if (rtblconfig[c].filtro != undefined) { filtro = rtblconfig[c].filtro; } else { filtro = ""; }            
            if (rtblconfig[c].relcat != undefined) { relcat = rtblconfig[c].relcat; } else { relcat = ""; }
            if (rtblconfig[c].cvecat != undefined) { cvecat = rtblconfig[c].cvecat; } else { cvecat = ""; }
            if (rtblconfig[c].descat != undefined) { descat = rtblconfig[c].descat; } else { descat = ""; }
            if (rtblconfig[c].nulos != undefined) { nulos = rtblconfig[c].nulos; } else { nulos = ""; }
            if (rtblconfig[c].repetidos != undefined) { repetidos = rtblconfig[c].repetidos; } else { reptidos = ""; }
            if (rtblconfig[c].query != undefined) { query = rtblconfig[c].query; } else { query = ""; }
            //discampos += orden + "/" + alias + "/" + rtblconfig[c].campo + "/" + rtblconfig[c].descripcion + "/" + consulta + "/" + filtro + "/" + relcat + "/" + cvecat + "/" + descat + "/" + nulos + "/" + repetidos + "/" + query + "|";           

            listacampos.orden = orden;
            listacampos.alias = alias;
            listacampos.campo = rtblconfig[c].campo;
            listacampos.descripcion = rtblconfig[c].descripcion;
            listacampos.consulta = consulta;
            listacampos.filtro = filtro;
            listacampos.relcat = relcat;
            listacampos.cvecat=cvecat;
            listacampos.descat=descat;
            listacampos.nulos=nulos;
            listacampos.repetidos=repetidos;
            listacampos.query=query;
            objlstcampos.push(listacampos);         
        }
        //sessionStorage.setItem('campos', campos.substring(0, campos.length - 1));
        //discampos = discampos.substring(0, discampos.length - 1);
        var scampos = JSON.stringify(objlstcampos);
        sessionStorage.setItem('discampos', scampos);
    }
    else { sessionStorage.setItem('discampos', ''); }
 
}

function GUARDAR_SELECCION_TABLAS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        SACAR_VALORES();

        //sessionStorage.setItem('distabla', "649807610,plazas,1,Si,,|2051849651,adscri,2,,Si,Left Join adscri as 2 on 1.cveadspl=2.cveads ");
        //sessionStorage.setItem('discampos', "0,numplaza,Plaza,1,,Si,Si,cveesppl,Adscripcion,Si,Si|1,desads,Adscripcion,,,Si,Si,cveesppl,Adscripcion,Si,Si|2,cveesppl,cveesppl,5,,Si,Si,cveesppl,Adscripcion,Si,Si|9,nomcompl,Nombre,4,,Si,Si,cveesppl,Adscripcion,Si,Si|8,rfccompl,RFC,3,,Si,Si,cveesppl,Adscripcion,Si,Si|6,numemppl,Empleado,2,,Si,Si,cveesppl,Adscripcion,Si,Si");

        var parametros = {};
        parametros.strmov = strmov;
        parametros.idperfil = idformato;
        parametros.distablas = sessionStorage.getItem('distabla');
        parametros.discampos = sessionStorage.getItem('discampos');        
        parametros.strfrom = sessionStorage.getItem('from');        
        parametros.strrelaciones = sessionStorage.getItem('relaciones');                
        parametros.strcondicion = sessionStorage.getItem('condicion');
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Guardar_Filtros',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
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

function ELIMINAR_DISEÑO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.messager.confirm('Información', 'Desea Eliminar el diseño del perfil', function (r) {
            if (r) {
                var parametros = {};
                parametros.strmov = "E";
                parametros.idperfil = idformato;
                parametros.distablas = '';
                parametros.discampos = '';
                parametros.strcondicion = sessionStorage.getItem('condicion');
                $.ajax({
                    type: "POST",
                    url: 'Funciones.aspx/Guardar_Seleccion_Tablas',
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');
                            LIMPIAR_DISEÑO();
                        }
                        else { $.messager.alert('Error', data.d[1], 'error'); }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); }
                });
            }
        });
    }
}

function LIMPIAR_DISEÑO()
{
    $('#txttablas').textbox('setValue', '');
    var t = $('#lsttablas');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#dgtablas').datagrid('loadData', { "total": 0, "rows": [] });
    $('#cbotablas').combobox('setValue', 'X');
    $('#txtcampos').textbox('setValue', '');
    var t = $('#trvcampos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#dgconfig').datagrid('loadData', { "total": 0, "rows": [] });
    
}



