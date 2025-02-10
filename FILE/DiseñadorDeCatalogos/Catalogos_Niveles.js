var tabla = "",modulo="";
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

    if ($_GET('tabla') != null) {
        tabla = $_GET('tabla');
    } else { tabla = ''; }
    if ($_GET('mod') != null) {
        modulo = $_GET('mod');
    } else { modulo = ''; }

    FILTRAR_TREE_TXT('#txtcatact', '#tvcatact');
    FILTRAR_TREE_TXT('#txtcatsig', '#tvcatsig');
    FILTRAR_TREE_TXT('#txtcatact', '#tvcatact');
    FILTRAR_TREE_TXT('#txtcatsig', '#tvcatsig');

    $('#btnLimpiar').bind('click', function () { LIMPIAR_SELECCION_CATALOGOS('#btnLimpiar'); });
    $('#btnARealacion').bind('click', function () { AGREGAR_RELACION('#btnARealacion'); });
    $('#btnERelacion').bind('click', function () { ELIMINAR_RELACION('#btnERelacion'); });
    $('#btnGuardar').bind('click', function () { GUARDAR_NIVELES_CATALOGOS('#btnGuardar'); });   

    $('#btnRegresar').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx?mod=" + modulo;
        IR_PAGINA("Catalogos_Menu.aspx","mod=" + modulo);
    });

    CARGAR_CATALOGOS();
    if (tabla != undefined) { CARGAR_NIVELES(); }

    $('#tvcatact').tree({
        onClick: function (node) {
            if (node.name != 0) {
                CARGAR_COLUMNAS_TABLAS_SELECCIONADAS('#tvcveact', node.name);
            }
        }
    });
    $('#tvcatsig').tree({
        onClick: function (node) {
            if (node.name != 0) {
                CARGAR_COLUMNAS_TABLAS_SELECCIONADAS('#tvcvesig', node.name);
            }
        }
    });

    $('#dgrelaciones').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
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

function CARGAR_CATALOGOS() {
    //var parametros = {};
    //parametros.idtabla = idtabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Catalogos',
       // data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $('#tvcatact').tree({
                data: obj
            });
            $('#tvcatsig').tree({
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
function CARGAR_NIVELES()
{
    var parametros = {};
    parametros.tabla = tabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Catalogos_Niveles',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            for (var t = 0; t < obj.length; t++) {
                $('#dgrelaciones').datagrid('insertRow', {
                    index: t,
                    row: {
                        NumNivel: obj[t].NumNivel,
                        NumNivelAnt: obj[t].NumNivelANT,
                        CatNivelAct: obj[t].CatNivelAct,
                        CveNivelAct: obj[t].CveNivelAct,
                        CatNivelSig: obj[t].CatNivelSig,
                        CveNivelSig: obj[t].CveNivelSig
                    }
                });
                $('#btnGuardar').linkbutton({ disabled: false });
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

function LIMPIAR_SELECCION_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcatact').textbox('setValue', '');
        var t = $('#tvcatact');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcatsig').textbox('setValue', '');
        var t = $('#tvcatsig');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcatact').textbox('setValue', '');
        $('#txtcatsig').textbox('setValue', '');
        $('#txtcveact').textbox('setValue', '');
        $('#txtcvesig').textbox('setValue', '');
        $('#tvcveact').tree('removeAll');
        $('#tvcvesig').tree('removeAll');
        $('#tvcatact').tree('doFilter', '');
        $('#tvcatsig').tree('doFilter', '');

        //$('#dgrelaciones').datagrid('loadData', { "total": 0, "rows": [] });
    }
}

function getCheckedName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].name);
    }
    return ss.join(',');
}

function AGREGAR_RELACION(btnobj)
{   
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var catact = "", catant = "", cveact = "",cvesig="",catrel="";

        catact = $('#tvcatact').tree('getSelected');
        cveact = getCheckedName('#tvcveact');
        catsig = $('#tvcatsig').tree('getSelected');
        cvesig = getCheckedName('#tvcvesig');

        if (catact == null) { $.messager.alert('Error', 'Falta seleccionar el Catálogo Actual', 'error'); return 0; }
        else
        {
            if (cveact == "") { $.messager.alert('Error', 'Faltan los valores del Catálogo Actual', 'error'); return 0; }
            else
            {
                if (catsig == null) {                    
                    $.messager.confirm('Confirm', 'Seguro de aregar el nivel sin Catálogo Siguiente', function (r) {
                        if (r) {
                            AGREGAR_NIVEL(catact.name, cveact, '', '');
                        }
                    });
                }
                else {
                    if (catsig == null) { $.messager.alert('Error', 'Falta seleccionar el catálogo Siguiente', 'error'); return 0; }
                    else {
                        if (cvesig == "") { $.messager.alert('Error', 'Faltan los valores del Catálogo Siguiente', 'error'); return 0; }
                        else
                        {
                            AGREGAR_NIVEL(catact.name, cveact, catsig.name, cvesig);
                        }
                    }
                }
            }
        }
    }
 }

function AGREGAR_NIVEL(catact, cveact, catsig, cvesig)
        {
            var total = $('#dgrelaciones').datagrid('getData').total - 1;
            if (total > -1)
            { total += 1; }
            else { total = 0; }

            $('#dgrelaciones').datagrid('insertRow', {
                index: total,
                row: {                   
                    NumNivel: total + 1,
                    NumNivelAnt:total,
                    CatNivelAct: catact,
                    CveNivelAct:cveact,
                    CatNivelSig: catsig,
                    CveNivelSig: cvesig
                }
            });
            $('#btnGuardar').linkbutton({ disabled: false });
            $('#btnEliminar').linkbutton({ disabled: false });
            LIMPIAR_SELECCION_CATALOGOS('#btnLimpiar');
        }

function ELIMINAR_RELACION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var dg = $('#dgrelaciones');
        var cell = dg.datagrid('cell');
        if (cell!=null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {     
                    $('#dgrelaciones').datagrid('deleteRow', cell.index);
                }
            })
        }
    }
}


function GUARDAR_NIVELES_CATALOGOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campos = "",tablarel="";
        var total = $('#dgrelaciones').datagrid('getData').total;
        for (var p = 0; p < total; p++) {
            if ($('#dgrelaciones').datagrid('getRows')[p].NumNivelAnt == 0) { tablarel = $('#dgrelaciones').datagrid('getRows')[p].CatNivelAct; }
            
            campos += "''" + tablarel + "''," + $('#dgrelaciones').datagrid('getRows')[p].NumNivel + "," + $('#dgrelaciones').datagrid('getRows')[p].NumNivelAnt + ",''" + $('#dgrelaciones').datagrid('getRows')[p].CatNivelAct + "'',''" + $('#dgrelaciones').datagrid('getRows')[p].CveNivelAct + "'',''" + $('#dgrelaciones').datagrid('getRows')[p].CatNivelSig + "'',''" + $('#dgrelaciones').datagrid('getRows')[p].CveNivelSig + "''|";
        }
        campos = campos.substring(0, campos.length - 1);
        INSERTAR_CATALOGOS_NIVELES(tablarel,campos)
        //update = "NumNivel=" + $('#dgrelaciones').datagrid('getRows')[p].NumNivelAnt + ",CatNivelAct='" + $('#dgrelaciones').datagrid('getRows')[p].CatAct + "',CveNivelAnt=" + $('#dgrelaciones').datagrid('getRows')[p].Niveles + ",CatNivelAnt='" + $('#dgrelaciones').datagrid('getRows')[p].CatAnt + "'";
        //insert = $('#dgrelaciones').datagrid('getRows')[p].NumNivelAnt + ",'" + $('#dgrelaciones').datagrid('getRows')[p].CatAct + "'," + $('#dgrelaciones').datagrid('getRows')[p].Niveles + ",'" + $('#dgrelaciones').datagrid('getRows')[p].CatAnt + "'";
        //INSERTAR_CATALOGOS_NIVELES(update, insert, "CatNivelAct=" + $('#dgrelaciones').datagrid('getRows')[p].CatAct, tablarel);
    }
}

function INSERTAR_CATALOGOS_NIVELES(tabla,campos) {
    var parametros = {};  
    parametros.tabla = tabla;
    parametros.campos = campos;
    parametros.tipo = 'G';
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Catalogos_Niveles',
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
            else { $.messager.alert('Inoformación', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

