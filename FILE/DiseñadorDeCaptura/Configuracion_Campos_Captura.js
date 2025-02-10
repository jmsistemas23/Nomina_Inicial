var tipo = "", cvemov, descripcion = "", tipocampo="", campofiltro="",filtrocat="",tipomov="";
var contadorNivel = 0;
var objtipodatos = [];
var listacampos = [];
var tabla = "";
var modulo = "";
var chkRowsCol = [];
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
   
    //if ($_GET('tipo') != null) {
    //    tipo = $_GET('tipo');
    //} else { tipo = 'mp'; }
    
    $('#dgcampos').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });

    $('#dgcolnuevas').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });

    $('#tvtablas').tree({
        onClick: function (node) {
            if (node.clave != 0) {
                CARGAR_COLUMNAS_TABLAS('#tvcamvalor', 'valor', node.text);
                CARGAR_COLUMNAS_TABLAS('#tvcamtexto', 'texto', node.text);
            }
        }
    });

    $('#tcampos').tree({
        onClick: function (node) {
            if (node.name != "") {                
                SACAR_VALORES_CAMPOS('#tvalor', node.name);                
            }
        }
    });

    //$('#tlistacampos').tree({
    //    onClick: function (node) {
    //        if (node.name != "") {
    //            $('#txtnomcampo').textbox('setValue', node.name);
    //            TXTFOCUS('#txtdescampo');
    //        }
    //    }
    //});


    FILTRAR_TREE_TXT('#txtcampo', '#tcampos');
    FILTRAR_TREE_TXT('#txtcondicion', '#tcondicion');
    FILTRAR_TREE_TXT('#txtvalbuscar', '#tvalor');

    FILTRAR_TREE_TXT('#txtcolizq', '#tcolizq');
    FILTRAR_TREE_TXT('#txtcolder', '#tcolder');

    FILTRAR_TREE_TXT('#txtcampos', '#tvcampos');
    FILTRAR_TREE_TXT('#txttablas', '#tvtablas');
    FILTRAR_TREE_TXT('#txtcamvalor', '#tvcamvalor');
    FILTRAR_TREE_TXT('#txtcamtexto', '#tvcamtexto');

    //FILTRAR_TREE_TXT('#txtfilcampos', '#tlistacampos');

        
    $('#btnLimpiar').bind('click', function () { LIMPIAR_CONFIGURACION(); });
    
    $('#btnAgregarCampo').bind('click', function () { AGREGAR_CAMPO('#btnAgregarCampo'); });
    $('#btnLCampo').bind('click', function () { LIMPIAR_CAMPO(); });
    $('#btnGCampo').bind('click', function () { GUARDAR_CAMPO('#btnGCampo'); });
    
    $('#btnDescriptivo').bind('click', function () { sessionStorage.setItem('tipoboton', 'D'); VENTANA_CAMPOS_DESCRIPTIVOS('#btnDescriptivo', 'D'); });
    $('#btnAdescriptivo').bind('click', function () { ACEPTAR_CAMPO_DESCRIPTIVO('#btnAdescriptivo'); });
    $('#btnLDescriptivo').bind('click', function () { LIMPIAR_CAMPO_DESCRIPTIVO('#btnLDescriptivo'); });

    $('#btnOrigen').bind('click', function () { sessionStorage.setItem('tipoboton', 'O'); VENTANA_CAMPOS_DESCRIPTIVOS('#btnOrigen', 'O'); });
    $('#btnAOrigen').bind('click', function () { ACEPTAR_CAMPO_DESCRIPTIVO('#btnAOrigen'); });

    $('#btnOpciones').bind('click', function () { ABRIR_VENTANA_CAMPO_OPCIONES('#btnOpciones'); });
    $('#btnACamOpc').bind('click', function () { ACEPTAR_VENTANA_CAMPO_OPCIONES('#btnACamOpc'); });
    $('#btnLCamOpc').bind('click', function () { LIMPIAR_VENTANA_CAMPO_OPCIONES('#btnLCamOpc'); });

    $('#btnCatalogo').bind('click', function () { VENTANA_CATALOGO('#btnCatalogo'); });
    $('#btnACatalogo').bind('click', function () { ACEPTAR_CATALOGO('#btnACatalogo'); });
    $('#btnLCatalogo').bind('click', function () { LIMPIAR_CATALOGO('#btnLCatalogo'); });

    $('#btnWFiltroCat').bind('click', function () { ABRIR_FILTROS_CATALOGOS('#btnWFiltroCat'); });
    $('#btnAGFiltroCat').bind('click', function () { AGREGAR_FILTRO_CATALOGOS('#btnAGFiltroCat'); });
    $('#btnEFiltroCat').bind('click', function () { ELIMINAR_FILTRO_CATALOGOS('#btnEFiltroCat'); });
    $('#btnAFiltroCat').bind('click', function () { ACEPTAR_FILTRO_CATALOGOS('#btnAFiltroCat'); });
    $('#btnLFiltroCat').bind('click', function () { LIMPIAR_FILTRO_CATALOGOS('#btnLFiltroCat'); });
    
    $('#btnCampoFiltro').bind('click', function () { sessionStorage.setItem('tipoboton', 'F'); VENTANA_CAMPOS_DESCRIPTIVOS('#btnCampoFiltro', 'F'); });

    $('#btnValidaciones').bind('click', function () { ABRIR_VENTANA_VALIDACIONES('#btnValidaciones'); });

    $('#btnFiltro').bind('click', function () { ABRIR_VENTANA_FILTROS('#btnFiltro'); });
   
    $('#btnECondicion').bind('click', function () { ELIMINAR_CONDICION('#btnECondicion'); });
    $('#btnACondicion').bind('click', function () { AGREGAR_CONDICION('#btnACondicion'); });
    
    $('#btnConsultar').bind('click', function () { FILTRAR_CONSULTA('#btnConsultar'); });
    $('#btnLConsulta').bind('click', function () { LIMPIAR_CONSULTA('#btnLConsulta'); });

    $('#btnGuardar').bind('click', function () { GUARDAR_CONFIGURACION('#btnGuardar'); });

    $('#btnMP').bind('click', function () { CARGAR_CONFIGURACION('#btnMP','MP'); tabla="capmov"; modulo='MP'});
    $('#btnMC').bind('click', function () { CARGAR_CONFIGURACION('#btnMC', 'MC'); tabla = "capmovc"; modulo = 'MC' });
    $('#btnDP').bind('click', function () { CARGAR_CONFIGURACION('#btnDP', 'DP'); tabla = "capdatper"; modulo = 'DP' });
    $('#btnRF').bind('click', function () { CARGAR_CONFIGURACION('#btnRF', 'RF'); tabla = "capfamref"; modulo = 'RF' });
    $('#btnIL').bind('click', function () { CARGAR_CONFIGURACION('#btnIL', 'IL'); tabla = "capinc"; modulo = 'IL' });
    $('#btnPA').bind('click', function () { CARGAR_CONFIGURACION('#btnPA', 'PA'); tabla = "pensionadas"; modulo = 'pa' });
    
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
            if (cell != null)
            { $('#dgcampos').datagrid('uncheckRow', cell.index); }
            return true;
        }
    });

    $('#wcamrelacion').window({
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

function CARGAR_CONFIGURACION(objbtn,tipomov)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        tipo = tipomov;
        $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });
        Cargar_Configuracion('');
        CARGAR_CAMPOSBUSQUEDA('#dgcampos', '#cbocam');       
        $('#btnLimpiar').linkbutton({ disabled: false });
        $('#btnGuardar').linkbutton({ disabled: false });
        $('#btnFiltro').linkbutton({ disabled: false });

        $('#btnAgregarCampo').linkbutton({ disabled: false });
        $('#btnDescriptivo').linkbutton({ disabled: false });
        $('#btnOrigen').linkbutton({ disabled: false });
        $('#btnCatalogo').linkbutton({ disabled: false });
        $('#btnWFiltroCat').linkbutton({ disabled: false });
        $('#btnCampoFiltro').linkbutton({ disabled: false });
        $('#btnOpciones').linkbutton({ disabled: false });
        $('#btnValidaciones').linkbutton({ disabled: false });
    }
}

function LIMPIAR_CONFIGURACION()
{
    $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnLimpiar').linkbutton({ disabled: true });
    $('#btnGuardar').linkbutton({ disabled: true });
    $('#btnFiltro').linkbutton({ disabled: true });

    $('#btnMP').linkbutton({ selected: false });
    $('#btnMC').linkbutton({ selected: false });
    $('#btnDP').linkbutton({ selected: false });
    $('#btnIL').linkbutton({ selected: false });
    $('#btnAP').linkbutton({ selected: false });

    $('#btnAgregarCampo').linkbutton({ disabled: true });
    $('#btnDescriptivo').linkbutton({ disabled: true });
    $('#btnOrigen').linkbutton({ disabled: true });
    $('#btnCatalogo').linkbutton({ disabled: true });
    $('#btnWFiltroCat').linkbutton({ disabled: true });
    $('#btnCampoFiltro').linkbutton({ disabled: true });
    $('#btnOpciones').linkbutton({ disabled: true });
    $('#btnValidaciones').linkbutton({ disabled: true });


}

function Cargar_Configuracion(condicion) {
    var obj;
    var parametros = {};
    parametros.tipo = tipo;
    parametros.tipocampo = '';
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Configuracion_Campos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = $.parseJSON(data.d);           
            $('#dgcampos').datagrid({
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
                    checkedRows = $(this).datagrid('getRows');                   
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
                complete: function ()
                { $('#loading').hide(100); },
                onBeforeEdit:function(index,row){
                    row.editing = true;                   
                    $('#dgcampos').datagrid('checkRow', index);
                },                
            });
            //var total = $('#dgcampos').datagrid('getData').total;
            //for (var r = 0; r < total; r++) {
            //    $('#dgcampos').datagrid('beginEdit', r);
            //}
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

function CARGAR_CAMPOS(tipocampo,condicion)
{
    var obj = "";
    var parametros = {};
    parametros.tipo = tipo;
    parametros.tipocampo = tipocampo;
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Lista_CamposDestino',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            $('#tvcampos').tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
                onLoadSuccess: function () {
                    var tri = $('#tvcampos').tree('getRoots');
                    var dg = $('#dgcampos');
                    var cell = dg.datagrid('cell');
                    if (cell != null) {
                        var indice = cell.index;
                        var row = dg.datagrid('getRows')[indice];                        
                        for (var h = 0; h < tri.length; h++) {
                            if (sessionStorage.getItem('tipoboton') == "D") {
                                if (row.campoDescriptivo == tri[h].text) {
                                    $('#tvcampos').tree('select', tri[h].target)
                                    break;
                                }
                            }
                            if (sessionStorage.getItem('tipoboton') == "I") {
                                if (row.usoInterno == tri[h].text) {
                                    $('#tvcampos').tree('select', tri[h].target)
                                    break;
                                }
                            }
                            if (sessionStorage.getItem('tipoboton') == "O") {
                                if (row.campo_GuardaOrigen == tri[h].text) {
                                    $('#tvcampos').tree('select', tri[h].target)
                                    break;
                                }
                            }
                            if (sessionStorage.getItem('tipoboton') == "F") {
                                if (row.campoRelacion == tri[h].text) {
                                    $('#tvcampos').tree('select', tri[h].target)
                                    break;
                                }
                            }
                        }
                    }
                }
            });
            var titulo = "";
            if (sessionStorage.getItem('tipoboton') == 'D') { titulo = "Relación del Campo Descriptivo"; }
            if (sessionStorage.getItem('tipoboton') == 'I') { titulo = "Relación del Campo Interno"; }
            if (sessionStorage.getItem('tipoboton') == 'O') { titulo = "Relación del Campo Origen"; }
            if (sessionStorage.getItem('tipoboton') == 'F') { titulo = "Relación del Campo a Filtrar"; }
            windows("#wdescriptivo", 430, 580,false, titulo);
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

function CARGAR_CAMPOS_CONDICION(tobj, condicion) {
    var obj = "";
    var parametros = {};
    parametros.tipo = tipo;
    parametros.tipocampo = '';
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Lista_CamposDestino',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            $(tobj).tree({
                data: obj                
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

function LISTA_CAMPOS_CONDICION(tobj) {
    var listacampos = {};
    var objlstcampos = [];

    listacampos = { name: "", text: "" };
    listacampos.name = "campo";
    listacampos.text = "Campo";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "tipodato";
    listacampos.text = "Tipo de Dato";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "campoDescriptivo";
    listacampos.text = "Campo Descriptivo";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "campo_GuardarOrigen";
    listacampos.text = "Campo Origen";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "catalogoseleccion";
    listacampos.text = "Catálogo";
    objlstcampos.push(listacampos);

    $(tobj).tree({
        data: objlstcampos
    });
}

function SACAR_VALORES_CAMPOS(tobj, campofiltro) {
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };


    $('#dgcampos').datagrid('acceptChanges');
    dgcampos = $('#dgcampos').datagrid('getData').total;
    if (campofiltro != 'tipodato') {
        for (var p = 0; p < dgcampos; p++) {
            if (campofiltro == 'campo') {
                listacampos = { name: "", text: "" };
                listacampos.name = $('#dgcampos').datagrid('getRows')[p].campo;
                listacampos.text = $('#dgcampos').datagrid('getRows')[p].campo;
                objlstcampos.push(listacampos);
            }
            else
                if (campofiltro == 'campoDescriptivo') {
                    if ($('#dgcampos').datagrid('getRows')[p].campoDescriptivo != "") {
                        listacampos = { name: "", text: "" };
                        listacampos.name = $('#dgcampos').datagrid('getRows')[p].campoDescriptivo;
                        listacampos.text = $('#dgcampos').datagrid('getRows')[p].campoDescriptivo;
                        objlstcampos.push(listacampos);
                    }
                }
                else
                    if (campofiltro == 'campo_GuardaOrigen') {
                        if ($('#dgcampos').datagrid('getRows')[p].campo_GuardarOrigen != "") {
                            listacampos = { name: "", text: "" };
                            listacampos.name = $('#dgcampos').datagrid('getRows')[p].campo_GuardaOrigen;
                            listacampos.text = $('#dgcampos').datagrid('getRows')[p].campo_GuardaOrigen;
                            objlstcampos.push(listacampos);
                        }
                    }
                    else
                        if (campofiltro == 'catalogoseleccion') {
                            if ($('#dgcampos').datagrid('getRows')[p].catalogoseleccion != "") {
                                listacampos = { name: "", text: "" };
                                listacampos.name = $('#dgcampos').datagrid('getRows')[p].catalogoseleccion;
                                listacampos.text = $('#dgcampos').datagrid('getRows')[p].catalogoseleccion;
                                objlstcampos.push(listacampos);
                            }
                        }
        }
        $(tobj).tree({
            data: objlstcampos
        });
    }
    else
        if (campofiltro == 'tipodato') {
            listacampos = { name: "", text: "" };
            listacampos.name = "t";
            listacampos.text = "Texto";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "s";
            listacampos.text = "Selección";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "n";
            listacampos.text = "Numerico";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "c";
            listacampos.text = "CheckBox";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "r";
            listacampos.text = "RadioButton";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "tm";
            listacampos.text = "Multilinea";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "d";
            listacampos.text = "Decimal";
            objlstcampos.push(listacampos);
            listacampos = { name: "", text: "" };
            listacampos.name = "f";
            listacampos.text = "Fecha";
            objlstcampos.push(listacampos);

            $(tobj).tree({
                data: objlstcampos
            });
        }
}

function CARGAR_CAMPOS_TABLA()
{
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.modulo = modulo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Columnas_Tablas',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            $('#dgcolnuevas').datagrid({
                data: obj,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                checkOnSelect: false,
                selectOnCheck: false,
                onCheckAll: function () {
                    chkRowsCol = $(this).datagrid('getRows');
                },
                onUncheckAll: function () {
                    chkRowsCol = [];
                },
                onCheck: onCheckCol,
                onUncheck: onUncheckCol,
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
                },
            });
            var total = $('#dgcolnuevas').datagrid('getData').total;           
            for (var r = 0; r < total; r++) {
                $('#dgcolnuevas').datagrid('beginEdit', r);
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
function LIMPIAR_CAMPO()
{
    $('#txtnomcampo').textbox('setValue', '');
    $('#txtdescampo').textbox('setValue', '');
    $('#txtfilcampos').textbox('setValue', '');
    
    var t = $('#tlistacampos');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    $('#tlistacampos').tree('doFilter', '');    
}
function AGREGAR_CAMPO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        chkRowsCol = [];
        CARGAR_CAMPOS_TABLA();
        windows("#wAgregarCampos", 550, 400, false, 'Agregar Campos');
    }
}
function GUARDAR_CAMPO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campos = "";
        var dg = $('#dgcampos');
        $('#dgcolnuevas').datagrid('acceptChanges');
        if (chkRowsCol.length > 0) {
            var contador = dg.datagrid('getData').total + 1;           
            for (var r = 0; r < chkRowsCol.length; r++) {
                dg.datagrid('insertRow', {
                    index: contador,
                    row: {
                        chk: true,
                        campo: chkRowsCol[r].campo,
                        descripcionCampo: chkRowsCol[r].descripcionCampo                        
                    }
                });
                campos += "''" + chkRowsCol[r].campo + "'',''" + chkRowsCol[r].descripcionCampo + "''|";
            }
            campos = campos.substring(0, campos.length - 1);
            INSERTAR_COLUMNAS_NUEVAS(campos);

            $("#wAgregarCampos").window('close');
        }
        else { $.messager.alert('Error', 'No se ha seleccionado ninguna columna', 'error'); }
    }
}
function INSERTAR_COLUMNAS_NUEVAS(campos)
{
    var parametros = {};
    parametros.tipo = tipo;
    parametros.campos = campos;   
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_ColumnasNuevas',
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

function VENTANA_CAMPOS_DESCRIPTIVOS(btnobj, tipocampo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            $('#dgcampos').datagrid('checkRow', cell.index);
            CARGAR_CAMPOS(tipocampo, '');
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a relacionar', 'error'); }
    }
}
function ACEPTAR_CAMPO_DESCRIPTIVO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valor = "";
        var t = $('#tvcampos');
        var campo = t.tree('getSelected');

        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {           
            var indice = cell.index;

            if (sessionStorage.getItem('tipoboton') == 'D') {
                if (campo != null) {
                    valor = campo.name
                }
                $('#dgcampos').datagrid('updateRow', {
                    index: indice,
                    row: { campoDescriptivo: campo.name }
                });
            }            
            if (sessionStorage.getItem('tipoboton') == 'O') {
                if (campo != null) {
                    valor = campo.text
                }
                $('#dgcampos').datagrid('updateRow', {
                    index: indice,
                    row: { campo_GuardaOrigen: campo.text }
                });
            }
            if (sessionStorage.getItem('tipoboton') == 'F') {
                if (campo != null) {
                    valor = campo.text
                }
                 $('#dgcampos').datagrid('updateRow', {
                        index: indice,
                        row: { campoRelacion: valor }
                    });
                
            }
            $("#wdescriptivo").window('close');
        }       
    }
}
function LIMPIAR_CAMPO_DESCRIPTIVO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcampos');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#txtcampos').textbox('setValue', '');
    }
}

function CARGAR_TABLAS_SISTEMAS(catalogoseleccion,cvecat,txtcat)
{
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
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
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
            $('#tvcamvalor').tree('removeAll');
            $('#tvcamtexto').tree('removeAll');

            var t = $('#tvtablas');
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

function CARGAR_COLUMNAS_TABLAS(tvobj,strcampo, id)
{  
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
                    var rows = $('#dgcampos').datagrid('getRows');
                    var tri = $(tvobj).tree('getRoots');
                    for (var t = 0; t < rows.length; t++) {
                        for (var h = 0; h < tri.length; h++) {
                            if (strcampo=='valor')
                            {
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

function CARGAR_COLUMNAS_NOMBRE_TABLAS(tvobj,tabla)
{
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
                onLoadSuccess: function () {
                    //var rows = $('#dgcamposO').datagrid('getRows');
                    //var tri = $(tvobj).tree('getRoots');
                    //for (var t = 0; t < rows.length; t++) {
                    //    for (var h = 0; h < tri.length; h++) {
                    //        if (strcampo == 'valor') {
                    //            if (rows[t].catalogoseleccionvalor == tri[h].text) {
                    //                $(tvobj).tree('select', tri[h].target)
                    //                break;
                    //            }
                    //        }
                    //        else {
                    //            if (rows[t].catalogoselecciontexto == tri[h].text) {
                    //                $(tvobj).tree('select', tri[h].target)
                    //                break;
                    //            }
                    //        }
                    //    }
                    //}
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

function CARGAR_LISTATABLAS(objcbo, objson) {
    //$(objcbo).combobox({
    //    data: objson,
    //    valueField: 'clave',
    //    textField: 'descripcion',
    //    editable: false,
    //    onSelect: function (rec) {
    //        if (rec.clave != 'X') {
    //            if (objcbo == '#cbocamizq')
    //            { CARGAR_COLUMNAS_TABLAS('#tcolizq','valor',rec.clave); }
    //            if (objcbo == '#cbocamder')
    //            { CARGAR_COLUMNAS_TABLAS('#tcolder','valor',rec.clave); }
    //        }
    //    }
    //});
}

function CARGAR_CAMPOS_RELACION(tvobj,camporelacion)
{    
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

function CARGAR_TABLAS_SELECCIONADAS(tvobj)
{
    var listatablas = {};
    var objlsttablas = [];

    listatablas = { clave: "", descripcion: "", selected: false };
    listatablas.clave = "X";
    listatablas.descripcion = "Seleccione una Tabla";
    listatablas.selected = true;
    objlsttablas.push(listatablas);

    $('#dgcampos').datagrid('acceptChanges');
    tdgtablas = $('#dgcampos').datagrid('getData').total;        
    for (var p = 0; p < tdgtablas; p++) {
        if ($('#dgcampos').datagrid('getRows')[p].catalogoseleccion != '') {
            listatablas = { clave: "", descripcion: "", selected: false };
            listatablas.clave = $('#dgcampos').datagrid('getRows')[p].catalogoseleccion;
            listatablas.descripcion = $('#dgcampos').datagrid('getRows')[p].catalogoseleccion;
            objlsttablas.push(listatablas);
        }
    }

    $(tvobj).combobox({
        data: objlsttablas,
        valueField: 'clave',
        textField: 'descripcion',
        editable: false,
        onSelect: function (rec) {
            if (rec.clave != 'X') {
                if (tvobj == '#cbocamizq')
                { CARGAR_COLUMNAS_NOMBRE_TABLAS('#tcolizq', rec.clave); }
                if (tvobj == '#cbocamder')
                { CARGAR_COLUMNAS_NOMBRE_TABLAS('#tcolder', rec.clave); }
            }
            else {
                if (tvobj == '#cbocamizq') {
                    var t = $('#tcolizq');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                }
                if (tvobj == '#cbocamder') {
                    var t = $('#tcolder');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }
                }
                t.tree('removeAll');
            }
        }
    });
}

function VENTANA_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcampos').datagrid('checkRow', indice);
            var row = dg.datagrid('getRows')[indice];
            $('#txttablas').textbox('setValue', row.catalogoseleccion);
           
            $('#lblcatalogo').text('Campo Seleccionado: ' + row.campo);
            CARGAR_TABLAS_SISTEMAS(row.catalogoseleccion, row.catalogoSeleccionValor, row.catalogoSeleccionTexto);
            //CARGAR_CAMPOS_RELACION('#tvcamrelacion',row.camporelacion);
            //CARGAR_TABLAS_SELECCIONADAS('#cbocamizq');
            //CARGAR_TABLAS_SELECCIONADAS('#cbocamder');
            windows("#wcatalogo", 700, 350,false, 'Relación del Campos Catálogo');       
        }
        else
        { $.messager.alert('Error','Falta seleccionar el campo a relacionar', 'error'); }
    }
}

function ACEPTAR_CATALOGO(btnobj)
{
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
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {                
                var indice = cell.index;
                $('#dgcampos').datagrid('updateRow', {
                    index: indice,
                    row: {
                        catalogoseleccion: tabla.text,
                        catalogoSeleccionTexto: camtexto.text,
                        catalogoSeleccionValor: camvalor.text,
                        catalogoSeleccionfiltro: 'Select * From ' + tabla.text + ' Order by ' + camtexto.name,                       
                    }
                });
                $("#wcatalogo").window('close');
            }
        }
    }
}

function LIMPIAR_CATALOGO(btnobj)
{
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

function ABRIR_FILTROS_CATALOGOS(btnobj)
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
            if (row.catalogoseleccion != "") {
                CARGAR_COLUMNAS_NOMBRE_TABLAS('#tcolizq', row.catalogoseleccion);
                CARGAR_CAMPOS_RELACION('#tcolder', row.campofiltro);
                filtrocat = row.catalogoSeleccionFiltro;
                $('#txtfiltro').textbox('setValue', row.catalogoSeleccionFiltro);
                $('#lblcamrelacion').text('Campo Seleccionado: ' + row.campo);
                windows("#wcamrelacion", 700, 400,false, 'Filtro del Catálogo');
            }
            else
            { $.messager.alert('Error', 'Falta seleccionar el catálogo a filtrar', 'error'); }
        } 
        else
           { $.messager.alert('Error','Falta seleccionar el campo a relacionar', 'error'); }
    }
}
function ELIMINAR_FILTRO_CATALOGOS(btnobj)
{
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
                   if (logico == "")
                        {                                       
                           query = 'Select * From ' + row.catalogoseleccion + ' where ' + valor.text + '=' + '@' + texto.name+ ' Order by ' + row.catalogoSeleccionTexto;
                           sessionStorage.setItem('condicion', 'Select * From ' + row.catalogoseleccion + ' where ' + valor.text + '=' + '@' + texto.name)
                        }
                        else {                           
                             query = sessionStorage.getItem('condicion') + ' ' + logico + ' ' + valor.text + '=' + '@' + texto.name + ' Order by ' + row.catalogoSeleccionTexto
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
function ACEPTAR_FILTRO_CATALOGOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcampos');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var indice = cell.index;
            $('#dgcampos').datagrid('updateRow', {
                index: indice,
                row: {
                    campoFiltro: campofiltro.substring(0,campofiltro.length-1),
                    catalogoSeleccionfiltro: $('#txtfiltro').textbox('getValue'),
                }
            });
            campofiltro = "";
            $("#wcamrelacion").window('close');
        }
    }
}
function LIMPIAR_FILTRO_CATALOGOS(btnobj)
{
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

function ABRIR_VENTANA_FILTROS(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {        
        $('#tvalor').tree('removeAll');
        LISTA_CAMPOS_CONDICION('#tcampos');
        CARGAR_CONDICIONES('#tcondicion');
        windows("#wfilavanzado", 730, 550,false, 'Busqueda Avanzada');      
    }
}

function AGREGAR_CONDICION(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var condicion = "", logico = "", vtcampos = "", vtcondicion = "", vtvalor="";

        vtcampos = $('#tcampos').tree('getSelected');
        vtcondicion = $('#tcondicion').tree('getSelected');
        vtvalor = getCheckedName('#tvalor');

        if (vtcampos.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else           
            if (vtcondicion.name == null) { $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return 0; }
            else
                if (vtvalor=="") { $.messager.alert('Error', 'Falta seleccionar el valor', 'error'); return 0; }
        else
        {            
            if (vtcondicion.name == 'Like') {
                condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'\'|' + vtvalor + '|\'\'';
            } else
                if (vtcondicion.name == '=') {
                 condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor ;
             }else
                 if ((vtcondicion.name == 'In') || (vtcondicion.name == 'Not In')) {
                     condicion = vtcampos.name + ' ' + vtcondicion.name + ' (' + vtvalor + ')';
                 } else {
                     condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor ;
                 }

            if ($('#opcY').linkbutton('options').selected) { logico = 'and'; }
            if ($('#opcO').linkbutton('options').selected) { logico = 'or'; }

            if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
            else { condicion = logico + " " + condicion; }

            
            $('#dgcondicion').datagrid('insertRow', {
                index: 1,
                row: {
                    Condicion: condicion,
                }
            });
            $('#opcY').linkbutton({ selected: false });
            $('#opcO').linkbutton({ selected: false });
            var t = $('#tcampos');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }
            var t = $('#tcondicion');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }
            $('#tvalor').tree('removeAll');
        }        
    }
}

function FILTRAR_CONSULTA(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {       
        var condicion = "";
        var rows = $('#dgcondicion').datagrid('getRows');
        for (i = 0; i < $('#dgcondicion').datagrid('getData').total; i++) {
            condicion += rows[i].Condicion + " ";           
        }       
        if (condicion.length > 0) {
            condicion = condicion.substring(0, condicion.length - 1);           
        }        
        Cargar_Configuracion(condicion);
        $("#winfiltro").window('close');
    }
}

function LIMPIAR_CONSULTA(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {       
        var t = $('#tcampos');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }     
        var t = $('#tcondicion');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        $('#tvalor').tree('removeAll');

        $('#dgcondicion').datagrid('loadData', { "total": 0, "rows": [] });


        $('#opcY').linkbutton({ selected: false });
        $('#opcO').linkbutton({ selected: false });
    }
}

function ELIMINAR_CONDICION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        rows = $('#dgcondicion').datagrid('getSelected');
        if (rows){
            $.messager.confirm('Confirm','Seguro de eliminar la condición',function(r){
                if (r){
                    var rowIndex = $("#dgcondicion").datagrid("getRowIndex", rows);
                    $('#dgcondicion').datagrid('deleteRow', rowIndex);
                }
            })
        }     
    }
}


var checkedRows = [];
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
    for (var i = 0; i < checkedRows.length; i++) {
        if (chkRowsCol[i].campo == row.campo) {
            return
        }
    }
    chkRowsCol.push(row);
}
function onUncheckCol(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (chkRowsCol[i].campo == row.campo) {
            chkRowsCol.splice(i, 1);
            return;
        }
    }
}


function OrdenarCampos(a, b) {
    var aName = a.Orden;
    var bName = b.Orden;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function GUARDAR_CONFIGURACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var campos = ""; var condicion = ""; var lstcampos = "";
        $('#dgcampos').datagrid('acceptChanges');        
        var fields = $('#dgcampos').datagrid('getColumnFields', true).concat($('#dgcampos').datagrid('getColumnFields', false));
        
        if (checkedRows.length > 0) {
            checkedRows.sort(OrdenarCampos);
            for (var f = 0; f < checkedRows.length; f++) {

            campo = checkedRows[f][fields[1]];
            condicion = fields[1]+"=''" + checkedRows[f][fields[1]] + "''";

            campos = "";
            for (var c = 1; c < fields.length; c++) {
                var valor = checkedRows[f][fields[c]];
                    //if (valor != "") {
                        if (valor == 'Si') { valor = 1; }                        
                            if (valor != undefined)
                            { campos += fields[c] + "=''" + valor + "'',"; }
                    //}
                }
            campos = campos.substring(0, campos.length - 1);
            INSERTAR_DATOS(campos, condicion, campo);
           }
      
            var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            $('#dgcampos').datagrid('uncheckAll');
            $.messager.alert('Información', "Campos Modificados Correctamente", 'info');
            //total = $('#dgcampos').datagrid('getData').total;
            //for (var r = 0; r < total; r++) {
            //    $('#dgcampos').datagrid('beginEdit', r);
            //}
        }
        else { $.messager.alert('Error', 'Falta seleccionar los campos a guardar', 'error'); }
    }
}

function INSERTAR_DATOS(campos,condicion,campo)
{
    var parametros = {};
    parametros.tipo = tipo;
    parametros.campos = campos;
    parametros.condicion = condicion;
    parametros.campo = campo;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_CamposCaptura',
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
                // $.messager.alert('Información', data.d[1], 'info');                
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

function ABRIR_VENTANA_CAMPO_OPCIONES(objbtn)
{
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
            var index = row.catalogoseleccion.indexOf("|");
            if (index > 0) {
                var opciones = row.catalogoseleccion.split("|");             
                    var valores = opciones[0].split(",");
                    $('#txtopcV').textbox('setValue', valores[0]);
                    $('#txtvalV').textbox('setValue', valores[1]);

                    var valores = opciones[1].split(",");
                    $('#txtopcF').textbox('setValue', valores[0]);
                    $('#txtvalF').textbox('setValue', valores[1]);             
            }
            windows("#wcampoopciones", 500, 150,false, 'Opciones del Campos');
        }
    }
}

function ACEPTAR_VENTANA_CAMPO_OPCIONES(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var opciones="";
        //if ($('#txtopcV').textbox('getValue') == "")
        //else
        //    if ($('#txtopcF').textbox('getValue') == "") { $.messager.alert('Error', "Falta el texto de la opcion falsa", 'error'); return 0 }
        //else
        //        if ($('#txtvalV').textbox('getValue') == "") { $.messager.alert('Error', "Falta el valor de la opcion verdadera", 'error'); return 0 }
        //else
        //   if ($('#txtvalF').textbox('getValue') == "") { $.messager.alert('Error', "Falta el valor de la opcion falsa", 'error'); return 0 }
        //else
        //{
        opciones = $('#txtopcV').textbox('getValue') + "," + $('#txtvalV').textbox('getValue') + "|" + $('#txtopcF').textbox('getValue') + "," + $('#txtvalF').textbox('getValue');
        if (opciones == ",|,") { opciones = ""; }

        var dg = $('#dgcampos');
            var cell = dg.datagrid('cell');
            if (cell != null) {
                var indice = cell.index;
                $('#dgcampos').datagrid('updateRow', {
                    index: indice,
                    row: {
                        catalogoseleccion: opciones,
                    }
                });
                $("#wcampoopciones").window('close');
            }
        //}
    }
}

function LIMPIAR_VENTANA_CAMPO_OPCIONES(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtopcV').textbox('setValue', '');
        $('#txtopcF').textbox('setValue', '');
        $('#txtvalV').textbox('setValue', '');
        $('#txtvalF').textbox('setValue', '');
    }
}

function ABRIR_VENTANA_VALIDACIONES(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        windows("#dvalidaciones", 500, 200, false, 'Validaciones Especiales');
    }
}

