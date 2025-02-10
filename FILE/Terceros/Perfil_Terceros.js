var tabla = "";
var ancho = "";
var alto = "";
var RelacionesGlobal;
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
    });

    tabla = 'ListaTerceros';
    DISEÑO_GRID('#dg','');
    $('#txtval').textbox('clear').textbox('textbox').focus();

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_GRID($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });
    $('#btnfiltrar').bind('click', function () { FILTRO_GRID($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });

    $('#txtvalcat').textbox('clear').textbox('textbox').focus();

    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_PERFIL('#dgmperfil',$('#cbocamcat').combobox('getValue'), $('#cboconcat').combobox('getValue'), $('#txtvalcat').textbox('getValue'));
        }
    });
    $('#btnfilcat').bind('click', function () { FILTRO_PERFIL('#dgmperfil', $('#cbocamcat').combobox('getValue'), $('#cboconcat').combobox('getValue'), $('#txtvalcat').textbox('getValue')); });
   

    $('#txtvalind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_GRID_CAT('#dgind', $('#cbocamind').combobox('getValue'), $('#cboconind').combobox('getValue'), $('#txtvalind').textbox('getValue'));
        }
    });
    $('#btnfiltrarind').bind('click', function () {
        FILTRO_GRID_CAT('#dgind', $('#cbocamind').combobox('getValue'), $('#cboconind').combobox('getValue'), $('#txtvalind').textbox('getValue'));
    });

    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_PERFIL('#dgmperfil', $('#cbocamcat').combobox('getValue'), $('#cboconcat').combobox('getValue'), $('#txtvalcat').textbox('getValue'));
        }
    });
    $('#btnfilcat').bind('click', function () {
        FILTRO_PERFIL('#dgmperfil', $('#cbocamcat').combobox('getValue'), $('#cboconcat').combobox('getValue'), $('#txtvalcat').textbox('getValue'));
    });

    $('#btnNuevo').bind('click', function () { NUEVO_PERFIL('#btnNuevo'); });
    $('#btnDiseño').bind('click', function () { DISEÑO_PERFIL('#btnDiseño'); });
    $('#btnCatTerceros').bind('click', function () { EDITAR_CATALOGO('#btnCatTerceros'); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_GRID(); });

    $('#btnRegresar').bind('click', function () { REGRESARCARGA(); });
    $('#btnRegresarInfo').bind('click', function () { REGRESARINFO(); });
    $('#btnRegresarCat').bind('click', function () { REGRESARCAT(); });
    $('#btnModificarCat').bind('click', function () { MODIFICAR_CATALOGO(); });
    

    $('#btnAIndicador').bind('click', function () { VENTANA_INDICADORES(); });
    $('#btnEIndicador').bind('click', function () { ELIMINAR_INDICADORES(); });
    $('#btnLIndicador').bind('click', function () { LIMPIAR_INDICADORES(); });

    $('#btnACampos').bind('click', function () { VENTANA_CAMPOS(); });
    $('#btnECampos').bind('click', function () { ELIMINAR_CAMPOS(); });

    $('#btnAGRelCam').bind('click', function () { AGREGAR_RELACION_CAMPOS(); });
    $('#btnERelCam').bind('click', function () { ELIMINAR_RELACION_CAMPOS(); });
    $('#btnLRelCam').bind('click', function () { LIMPIAR_RELACION_CAMPOS(); });
    $('#btnARelCam').bind('click', function () { ACEPTAR_RELACION_CAMPOS(); });

    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });

    $('#btnGuardar').bind('click', function () { GUARDAR_PERFIL(); });
    

    $('#dgconceptos').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgcampos').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgmperfil').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgmperfil').datagrid({        
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckPerfil,
        onUncheck: onUncheckPerfil,
        onLoadSuccess: onLoadPERFIL,
        onEndEdit: onEndEditPerfil,
        onBeginEdit: function (index, row) {
            row.editing = true;
            $('#dgmperfil').datagrid('checkRow', index);           
        }
    });

    $('#dgcampos').datagrid({
        pageSize: 20,       
        onBeginEdit: function (index, row) {
            var dg = $(this);           
            var orden = dg.datagrid('getEditor', { index: index, field: 'ordcam' });
            $(orden.target).textbox('textbox').css('textAlign', 'center');
        }
    //    onEndEdit: function (index, row) {
    //        var dg = $(this);
    //        var orden = dg.datagrid('getEditor', { index: index, field: 'camorden' });
    //        $(orden.target).textbox('textbox').css('textAlign', 'center');
    //    }
    });
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].indcod == row.indcod) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].indcod == row.indcod) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}
function onLoadSuccess(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].indcod == row.indcod) {
                    dg.datagrid('checkRow', index);
                    return;
                }
            }
        })();
    }
}

function onCheckPerfil(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].cveter == row.cveter) {
            return
        }
    }
    row.dester = row.dester.toUpperCase();
    row.activo=row.activo;
    checkedRows.push(row);
}
function onUncheckPerfil(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].cveter == row.cveter) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}
function onLoadPERFIL(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].cveter == row.cveter) {
                    dg.datagrid('checkRow', index);
                    row.dester = checkedRows[i].dester;
                    row.activo = checkedRows[i].activo;
                    return;
                }
            }
        })();
    }
}
function onEndEditPerfil(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'dester'
    });
    if (ed != null)
    { row.dester = $(ed.target).numberbox('getText').toUpperCase(); }
}



function DISEÑO_GRID(dgcontrol) {
    var parametros = {};
    parametros.strtabla = tabla;

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConfiguracionGrid",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                if (data.d[1] != "")
                { ancho = data.d[1]; }
                else { ancho = 100; }

                if (data.d[2] != "")
                { alto = data.d[2]; }
                else { alto = 100; }

                CARGAR_GRID("#dg",'');
                CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
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
function CARGAR_GRID(dgcontrol,condicion) {
    //var con;
    //if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?tabla=' + tabla + '&busqueda=' + condicion + "&multi=''",
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        //width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                sessionStorage.setItem('clave', rows[fields[0]]);
                sessionStorage.setItem('descripcionperfil', rows[fields[1]]);               
                $('#btnDiseño').linkbutton('enable');
            }
        }
    });
}
function FILTRO_GRID(cbocampo, cbcondicion, txtvalor) {
    var condicion="";
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }   
    }    
    CARGAR_GRID("#dg", condicion);
}

function LIMPIAR_GRID() {
    DISEÑO_GRID('#dg');
    $('#txtval').textbox('clear').textbox('textbox').focus();
    $('#cbocon').combobox('setValue', '=');
    $('#btnOrdenar').linkbutton('disable');
    $('#btnEditar').linkbutton('disable');
}
function NUEVO_PERFIL(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {        
        $('#txtarchivos').textbox('setValue', '');
        $('#dmenu').hide();
        $('#dInformacion').hide();
        $('#dCarga').show();
        $('#dCatalogo').hide();      
    }
}
function DISEÑO_PERFIL(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {      
        document.getElementById('lblPerfil').innerHTML = 'Editar';       
        $('#dmenu').hide();
        $('#dInformacion').show();
        $('#dCarga').hide();
        $('#dCatalogo').hide();
        BUSCAR_PERFIL($('#dg').datagrid('getSelected').cveter, $('#dg').datagrid('getSelected').dester, $('#dg').datagrid('getSelected').tiparc, '', true);
    }
}
function FILTRO_PERFIL(dgobj,cbocampo, cbcondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    else { condicion = ""; }
    MODIFICAR_PERFIL_GRID(dgobj,condicion);
}
function MODIFICAR_PERFIL_GRID(dgobj, consulta) {        
    $(dgobj).datagrid({
        //url: 'Listar_Perfiles.aspx?busqueda=' + consulta + "&idusuario=" + $.session.get('idusuario') + "&multi=''&tabla=EditarListaTer",
        url: 'Listar_Datos.aspx?tabla=EditarListaTer&busqueda=' + consulta + "&multi=''",
    });
    CARGAR_CAMPOSBUSQUEDAS(dgobj, '#cbocamcat', 'cveter');   
}
function EDITAR_CATALOGO(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else
    {
        document.getElementById('lblMPerfil').innerHTML = 'Modificar Catálogo';
        $('#dmenu').hide();
        $('#dInformacion').hide();
        $('#dCatalogo').show();
        $('#dCarga').hide();
        MODIFICAR_PERFIL_GRID('#dgmperfil', '');       
      
    }
}
function REGRESARCARGA() {
    document.getElementById('lblPerfil').innerHTML = '';
    $('#dCarga').hide();
    $('#dInformacion').hide();
    $('#dmenu').show();
    $('#btnEditar').linkbutton({ disabled: true });
}

function REGRESARINFO() {
    document.getElementById('lblPerfil').innerHTML = '';
    $('#dCarga').hide();
    $('#dInformacion').hide();
    $('#btnCatTerceros').linkbutton({ disabled: false });
    $('#dmenu').show();
    $('#dCatalogo').hide();
    $('#btnDiseño').linkbutton('disable');
    var boton = sessionStorage.getItem('boton');
    if (boton == "Nuevo") {
        DISEÑO_GRID('#dg');
    }
    else {
        $("#dg").datagrid('unselectAll');
    }
}
function REGRESARCAT() {
    document.getElementById('lblMPerfil').innerHTML = '';
    $('#dCarga').hide();
    $('#dInformacion').hide();    
    $('#dmenu').show();
    $('#dCatalogo').hide();
    $('#btnDiseño').linkbutton('disable');    
    DISEÑO_GRID('#dg');   
}

function MOSTRAR_PERFIL() {
    if (sessionStorage.getItem('Perfil') != "0") {
        $('#txtPerfil').textbox('setValue', sessionStorage.getItem('Perfil'));
        $('#txtPerfil').textbox({ disabled: true });
        $('#txtDescripcion').textbox('setValue', sessionStorage.getItem('Descripcion'));
        $('#txtDescripcion').textbox({ disabled: true });
        $('#txtExtension').textbox('setValue', sessionStorage.getItem('Extension'));
        $('#txtExtension').textbox({ disabled: true });
       
        $('#dgconceptos').datagrid('loadData', { "total": 0, "rows": [] });
        var conceptos = sessionStorage.getItem('Conceptos');
        conceptos = conceptos.split('|');
        for (var c = 0; c < conceptos.length; c++)
        {
           var strconceptos = conceptos[c].split(',');
            $('#dgconceptos').datagrid('insertRow', {
                index: i,
                row: {                    
                    conarchivo: strconceptos[0],
                    conactual: strconceptos[1],
                    numdescuento: strconceptos[3],
                    parcial: strconceptos[4],
                    ordter: strconceptos[2],
                }
            });
            $('#dgconceptos').datagrid('beginEdit', c);
            var ednumdescuento = $('#dgconceptos').datagrid('getEditor', { index: c, field: 'numdescuento' });
            $(ednumdescuento.target).textbox('textbox').css('textAlign', 'center');
            var edconactual = $('#dgconceptos').datagrid('getEditor', { index: c, field: 'conactual' });
            $(edconactual.target).textbox('textbox').css('textAlign', 'center');
        }

        /** Genera Campos De Conceptos **/
        //$("#divConceptos").html("");
        //var con = sessionStorage.getItem('Conceptos');
        //if (con.toString().length > 0) {
        //    var arrayConceptos = sessionStorage.getItem('Conceptos').split("|");
        //    var arrayRelacion, control;
        //    for (var i = 0; i < arrayConceptos.length; i++) {
        //        arrayRelacion = arrayConceptos[i].split(",");
        //        var newdiv = document.createElement('div');
        //        newdiv.id = "divConceptoRelacion" + i;

        //        control = document.createElement('input');
        //        control.type = 'text';
        //        control.id = 'txtConceptoRelacionArchivo' + i;
        //        control.name = 'txtConceptoRelacionArchivo' + i;
        //        control.value = arrayRelacion[0];
        //        control.size = '5';
        //        newdiv.appendChild(control);

        //        control = document.createElement('input');
        //        control.type = 'text';
        //        control.id = 'txtConceptoRelacionCatalogo' + i;
        //        control.name = 'txtConceptoRelacionCatalogo' + i;
        //        control.value = arrayRelacion[1];
        //        control.size = '5';
        //        newdiv.appendChild(control);

        //        control = document.createElement('input');
        //        control.type = 'button';
        //        control.id = 'btnEliminaConcepto' + i;
        //        control.name = 'btnEliminaConcepto' + i;
        //        control.value = 'Eliminar';
        //        control.width = '80';
        //        control.setAttribute("onclick", "eliminaConcepto(" + i + ")");
        //        newdiv.appendChild(control);
        //        document.getElementById('divConceptos').appendChild(newdiv);
        //    }
        //}

        /** Tipo de movimiento **/
        document.getElementById('chkAlta').checked = false;
        document.getElementById('chkBaja').checked = false;
        document.getElementById('chkCambio').checked = false;
        var arrayTipoMov = sessionStorage.getItem('Movimientos').split("|");
        for (var i = 0; i < arrayTipoMov.length; i++) {
            if (arrayTipoMov[i] == 'A') { document.getElementById('chkAlta').checked = true; }
            if (arrayTipoMov[i] == 'B') { document.getElementById('chkBaja').checked = true; }
            if (arrayTipoMov[i] == 'C') { document.getElementById('chkCambio').checked = true; }
        }

        /** Tipo de afectacion **/
        if (sessionStorage.getItem('Afectacion').toString().length > 0) {
            //document.getElementById('cbAfectacion').value = sessionStorage.getItem('Afectacion');
            $('#cbotipoafectacion').combobox('setValue', sessionStorage.getItem('Afectacion'));
        } else {
            //document.getElementById('cbAfectacion').value = 0;
            $('#cbotipoafectacion').combobox('setValue', 0);
        }

        $('#dgcampos').datagrid('loadData', { "total": 0, "rows": [] });
        var campos = sessionStorage.getItem('Campos');
        campos = campos.split('|');
        for (var c = 0; c < campos.length; c++) {
            var strcampos = campos[c].split(',');
            $('#dgcampos').datagrid('insertRow', {
                index: c,
                row: {
                    camarchivo: strcampos[0],
                    camtabla: strcampos[1],
                    ordcam: strcampos[2]
                }
            });
            $('#dgcampos').datagrid('beginEdit', c);
            var ordcam = $('#dgcampos').datagrid('getEditor', { index: c, field: 'ordcam' });
            $(ordcam.target).textbox('textbox').css('textAlign', 'center');
        }

        ///** Campos de captura y relacion **/
        //$("#chkCampos").html("");
        //if (sessionStorage.getItem('Campos').toString().length > 0) {
        //    $('<tr />', { id: 'trEncabezado' }).appendTo($('#chkCampos'));
        //    var Encabezado = $('#trEncabezado');
        //    if ($('#txtExtension').val() == 'TXT') {
        //        $('<th />', { id: 'thCamposDesde', align: 'left', text: 'Desde Posicion' }).appendTo(Encabezado);
        //        $('<th />', { id: 'thCamposHasta', align: 'left', text: 'Hasta Posicion' }).appendTo(Encabezado);
        //    }
        //    else {
        //        $('<th />', { id: 'thCampos', align: 'left', text: 'Campos Origen' }).appendTo(Encabezado);
        //    }
        //    $('<th />', { id: 'thRelacion', align: 'Center', text: 'Campos Destino' }).appendTo(Encabezado);

        //    var arrayColumnas = sessionStorage.getItem('Campos').split("|");
        //    for (var i = 0; i < arrayColumnas.length; i++) {
        //        var arrayColumnasRelacion = arrayColumnas[i].split(",");
        //        $('<tr />', { id: 'tr' + i }).appendTo($('#chkCampos'));
        //        var FilaNueva = $('#tr' + i);

        //        if ($('#txtExtension').val() == 'TXT') {
        //            var arrayPosiciones = arrayColumnasRelacion[0].split("-");
        //            $('<td />', { id: 'tdCamposDesde' + i, align: 'left', text: '', tag: '' }).appendTo(FilaNueva);
        //            $('<td />', { id: 'tdCamposHasta' + i, align: 'left', text: '', tag: '' }).appendTo(FilaNueva);
        //            var desde = document.createElement("input");
        //            desde.id = 'txtCampoOrigenIni' + i;
        //            desde.type = 'text';
        //            desde.value = arrayPosiciones[0];
        //            var hasta = document.createElement("input");
        //            hasta.id = 'txtCampoOrigenFin' + i;
        //            hasta.type = 'text';
        //            hasta.value = arrayPosiciones[1];
        //            document.getElementById('tdCamposDesde' + i).appendChild(desde);
        //            document.getElementById('tdCamposHasta' + i).appendChild(hasta);
        //        } else {
        //            $('<td />', { id: 'tdCampos' + i, align: 'left', text: arrayColumnasRelacion[0], tag: arrayColumnasRelacion[0] }).appendTo(FilaNueva);
        //        }
        //        $('<td />', { id: 'tdRelacion' + i, align: 'center', }).appendTo(FilaNueva);

        //        var select = document.createElement("select");
        //        select.id = 'cboRelacion' + i;


        //        var arrayRelaciones = sessionStorage.getItem('RelacionesGlobal').split("|");
        //        var option = document.createElement("option");
        //        option.value = '0';
        //        option.text = 'Seleccione Campo';
        //        select.appendChild(option);
        //        var option = document.createElement("option");
        //        option.value = '-1';
        //        option.text = 'Omitir';
        //        select.appendChild(option);
        //        for (var j = 0; j < arrayRelaciones.length; j++) {
        //            var arrayRelacionCampo = arrayRelaciones[j].split(",");
        //            var option = document.createElement("option");
        //            option.value = arrayRelacionCampo[0];
        //            option.text = arrayRelacionCampo[1];
        //            select.appendChild(option);
        //        }

        //        select.value = arrayColumnasRelacion[1];
        //        document.getElementById('tdRelacion' + i).appendChild(select);
        //    }
        //}
    }
    else {       
        $('#txtDescripcion').textbox('setValue', sessionStorage.getItem('Descripcion'));
        $('#txtDescripcion').textbox({ disabled: true });
        $('#txtExtension').textbox('setValue', sessionStorage.getItem('Extension'));
        $('#txtExtension').textbox({ disabled: true });
    }
}
function BUSCAR_PERFIL(clave, nombre, extension, columnas, mostrardatos) {
    var parametros = {};
    parametros.perfil = clave;
    parametros.nombre = nombre;
    parametros.extension = extension;
    parametros.columnas = columnas;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConsultarPerfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            sessionStorage.setItem('Perfil', obj[0]);
            sessionStorage.setItem('Descripcion', obj[1]);
            sessionStorage.setItem('Extension', obj[2]);
            sessionStorage.setItem('Conceptos', obj[3]);
            sessionStorage.setItem('Campos', obj[4]);
            sessionStorage.setItem('Movimientos', obj[5]);
            sessionStorage.setItem('Afectacion', obj[6]);
            MOSTRAR_PERFIL();
            sessionStorage.setItem('boton', "Nuevo");
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
function CARGAR_NUEVO_PERFIL(clave, nombre, extension, columnas, mostrardatos) {
    BUSCAR_PERFIL(clave, nombre, extension, columnas, mostrardatos);
    $('#dmenu').hide();
    $('#dInformacion').show();
    $('#dCarga').hide();
    document.getElementById('lblPerfil').innerHTML = 'Nuevo';
}

function VENTANA_INDICADORES()
{
    checkedRows = [];
    //$('#dgind').datagrid('uncheckAll');
    sessionStorage.setItem('condicion', "");
    sessionStorage.setItem('tblcat', 'deduccion');
    CARGAR_GRID_CAT('#dgind');
    CARGAR_CAMPOSBUSQUEDAS('#dgind', "#cbocamind", "indcod");
    $('#txtvalind').textbox('clear').textbox('textbox').focus();
    windows("#wind", 750, 660, "Indicadores de Deducción");
}
function ELIMINAR_INDICADORES() {
    var dg = $('#dgconceptos');
    var cell = dg.datagrid('cell');
    if (cell != null) {
        $.messager.confirm('Confirm', 'Seguro de eliminar el indicador', function (r) {
            if (r) {              
                $('#dgconceptos').datagrid('deleteRow', cell.index);
                if ($('#dgconceptos').datagrid('getData').total == 0) { $('#btnEIndicador').linkbutton({ disabled: true }); }
            }
        })
    }
    else { $.messager.alert('Error', 'Falta seleccionar el indicador a eliminar', 'error'); }
}
function LIMPIAR_INDICADORES()
{
    $('#dgind').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnEIndicador').linkbutton({ disabled: true }); 
}

function CARGAR_GRID_CAT(dgcontrol) {
    var con = "";
    var cont = checkedRows.length;
    if (sessionStorage.getItem('condicion') != null) { con = sessionStorage.getItem('condicion'); }
    else { con = ""; }
    $(dgcontrol).datagrid({
        url: "Listar_Datos.aspx?tabla=" + sessionStorage.getItem('tblcat') + "&busqueda=" + con+"&multi=''",
        pagination: true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onLoadSuccess: onLoadSuccess,
        pageSize: 20,
        width: "100%",
        heigth: "100%",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var rowIndex = $(dgcontrol).datagrid("getRowIndex", rows);
                $(dgcontrol).datagrid('checkRow', rowIndex);
            }
        }
    });
}
function FILTRO_GRID_CAT(dgcontrol, cbocampo, cbocondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }
        sessionStorage.setItem('condicion', condicion);
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_GRID_CAT(dgcontrol);
}

function LIMPIAR_IND_SEL()
{
    CARGAR_GRID_CAT('#dgind');
    $('#cbocamind').combobox('setValue', 'x');
    $('#cboconind').combobox('setValue', '=');
    $('#txtvaind').textbox('setValue', '');
    $('#txtvaind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');
    
}
function ACEPTAR_IND_SEL()
{
    $('#dgind').datagrid('acceptChanges');
    for (var i = 0; i < checkedRows.length; i++)
    {
        $('#dgconceptos').datagrid('insertRow', {
            index: i,
            row: {              
                conactual: checkedRows[i].indcod
            }
        });
    }
    $('#btnEIndicador').linkbutton({ disabled: false });
    $("#wind").window('close');
}

function CARGAR_CAMPOS_DESTINO(tvobj) {
    objlstcampos = [];
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/BuscarCamposDisponiblesParaRelacion",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //sessionStorage.setItem('RelacionesGlobal', data.d);
            var strcolumnas = data.d.split('|');            
            for (var p = 0; p < strcolumnas.length; p++) {
                var campos = strcolumnas[p].split(',');
                listacampos = { id: "", name: "", text: "" };
                var name = campos[0];
                var text = campos[1];

                listacampos.id = p;
                listacampos.name = name;
                listacampos.text = text;
                objlstcampos.push(listacampos);

            }
            $(tvobj).tree({
                data: objlstcampos,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                }
            });
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
function CARGAR_CAMPOS_ORIGEN(tvobj, strcampos)
{
    objlstcampos = [];
    for (var p = 0; p < strcampos.length; p++) {
        var campos = strcampos[p].split(',');        
        listacampos = { id: "", name: "", text: "" };
        var name = campos[0];
        var text = campos[0];

            listacampos.id = p;
            listacampos.name = name;
            listacampos.text = text;
            objlstcampos.push(listacampos);
        
    }
    $(tvobj).tree({
        data: objlstcampos,
        formatter: function (node) {
            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        }        
    });
}
function VENTANA_CAMPOS() {
    var strcampos = sessionStorage.getItem('Campos');
    var campoarchivo = strcampos.split('|');    
    CARGAR_CAMPOS_ORIGEN('#tcamorigen', campoarchivo);
    CARGAR_CAMPOS_DESTINO('#tcamdestino');
    windows("#wcampos", 500, 660,false, "Relación Campo Captura");
}
function ELIMINAR_CAMPOS() {
    rows = $('#dgcampos').datagrid('getSelected');
    if (rows) {
        $.messager.confirm('Confirm', 'Seguro de eliminar el campo seleccionado', function (r) {
            if (r) {
                var rowIndex = $("#dgcampos").datagrid("getRowIndex", rows);
                $('#dgcampos').datagrid('deleteRow', rowIndex);
                if ($('#dgcampos').datagrid('getData').total == 0) { $('#btnECampos').linkbutton({ disabled: true }); }
            }
        })
    }
    else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
}

function AGREGAR_RELACION_CAMPOS()
{
    vtcamorigen = $('#tcamorigen').tree('getSelected');
    vtcamdestino = $('#tcamdestino').tree('getSelected');
    if (vtcamorigen.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo origen', 'error'); return 0; }
    else
        if (vtcamdestino.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo destino', 'error'); return 0; }
        else
        {
            if ($('#dgCamRel').datagrid('getData').total > 0) { r += 1; } else { r = 0; }
            $('#dgCamRel').datagrid('insertRow', {
                index: r,
                row: {
                    camrelo: vtcamorigen.name,
                    camreld: vtcamdestino.name
                }
            });
            var t = $('#tcamorigen');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }
            var t = $('#tcamdestino');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }

            $('#btnERelCam').linkbutton({ disabled: false });
        }
}
function ELIMINAR_RELACION_CAMPOS()
{
    rows = $('#dgCamRel').datagrid('getSelected');
    if (rows) {
        $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
            if (r) {
                var rowIndex = $("#dgCamRel").datagrid("getRowIndex", rows);
                $('#dgCamRel').datagrid('deleteRow', rowIndex);
                if ($('#dgCamRel').datagrid('getData').total == 0) { $('#btnERelCam').linkbutton({ disabled: true }); }
            }
        })
    }
    else { $.messager.alert('Error', 'Falta seleccionar la relación a eliminar', 'error'); }
}
function LIMPIAR_RELACION_CAMPOS()
{
    $('#dgCamRel').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnERelCam').linkbutton({ disabled: true });
}
function ACEPTAR_RELACION_CAMPOS()
{
    for (var r = 0; r < $('#dgCamRel').datagrid('getData').total; r++)
    {
        $('#dgcampos').datagrid('insertRow', {
            index: r,
            row: {
                camarchivo: $('#dgCamRel').datagrid('getRows')[r].camrelo,
                camtabla: $('#dgCamRel').datagrid('getRows')[r].camreld
                //ordcam: $('#dgCamRel').datagrid('getRows')[r].ordcam
            }
        });
    }
    $("#wcampos").window('close');
    $('#btnECampos').linkbutton({ disabled: false });
}

function GUARDAR_PERFIL() {
    var conceptos = "", camposRelacion = "";
    var perfil = "";
   // if ($('#txtPerfil').textbox('getValue').trim().length <= 0) {
        //$.messager.alert('Advertencia', 'Se requiere clave de perfil', 'warning');
     //   perfil = 0;
    // } else   
    if ($('#txtDescripcion').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere descripción de perfil', 'warning');
    } else if ($('#txtExtension').textbox('getValue').trim().length <= 0) {
        $.messager.alert('Advertencia', 'Se requiere extensión de archivo de perfil', 'warning');
    } else if (!document.getElementById("chkAlta").checked && !document.getElementById("chkBaja").checked && !document.getElementById("chkCambio").checked) {
        $.messager.alert('Advertencia', 'Se requiere por lo menos un tipo de movimiento', 'warning');
    } else if ($('#cbotipoafectacion').combobox('getValue') == 0) {
        $.messager.alert('Advertencia', 'Se requiere tipo de afectación', 'warning');
    } else
        if ($('#dgcampos').datagrid('getData').total == 0) {
        $.messager.alert('Advertencia', 'Se requieren los campos de relación', 'warning');
    } else if ($('#dgconceptos').datagrid('getData').total == 0) {
        $.messager.alert('Advertencia', 'Se requieren por lo menos un indicador', 'warning');
        } else {
            $('#dgconceptos').datagrid('acceptChanges');
        //sacar la cadena de los conceptos
        for (var r = 0; r < $('#dgconceptos').datagrid('getData').total; r++) {            
            if (conceptos.length <= 0) { conceptos = $('#dgconceptos').datagrid('getRows')[r].conarchivo + "," + $('#dgconceptos').datagrid('getRows')[r].conactual + "," + $('#dgconceptos').datagrid('getRows')[r].ordter  + "," + ($('#dgconceptos').datagrid('getRows')[r].numdescuento != undefined ? $('#dgconceptos').datagrid('getRows')[r].numdescuento : 9999) + "," + ($('#dgconceptos').datagrid('getRows')[r].parcial != undefined ? $('#dgconceptos').datagrid('getRows')[r].parcial : 0); }
            else { conceptos += '|' + $('#dgconceptos').datagrid('getRows')[r].conarchivo + "," + $('#dgconceptos').datagrid('getRows')[r].conactual + "," + $('#dgconceptos').datagrid('getRows')[r].ordter +"," + ($('#dgconceptos').datagrid('getRows')[r].numdescuento != undefined ? $('#dgconceptos').datagrid('getRows')[r].numdescuento : 9999) + "," + ($('#dgconceptos').datagrid('getRows')[r].parcial != undefined ? $('#dgconceptos').datagrid('getRows')[r].parcial : 0); }
        }

            $('#dgcampos').datagrid('acceptChanges');
        //sacar la cadena de los campos relacionados
        for (var r = 0; r < $('#dgcampos').datagrid('getData').total; r++) {
            if (camposRelacion.length <= 0) { camposRelacion = $('#dgcampos').datagrid('getRows')[r].camarchivo + "," + $('#dgcampos').datagrid('getRows')[r].camtabla + "," + ($('#dgcampos').datagrid('getRows')[r].ordcam!=0 ? $('#dgcampos').datagrid('getRows')[r].ordcam:0); }
            else { camposRelacion += '|' + $('#dgcampos').datagrid('getRows')[r].camarchivo + "," + $('#dgcampos').datagrid('getRows')[r].camtabla + "," + ($('#dgcampos').datagrid('getRows')[r].ordcam != 0 ? $('#dgcampos').datagrid('getRows')[r].ordcam : 0); }
        }

        if ($('#txtPerfil').textbox('getValue').trim().length > 0) {
            perfil = $('#txtPerfil').textbox('getValue');
        }
        else { perfil = 0; }

        var descripcion = $('#txtDescripcion').val();
        var extension = $('#txtExtension').val();
        var tipoMov = ((document.getElementById("chkAlta").checked) ? 'A' : '0') + '|' + ((document.getElementById("chkBaja").checked) ? 'B' : '0') + '|' + ((document.getElementById("chkCambio").checked) ? 'C' : '0');
        var tipoAfec = $('#cbotipoafectacion').combobox('getValue');
       // var activo = (document.getElementById("chkActivo").checked) ? '0' : '1';

        var parametros = {};
        parametros.perfil = perfil;
        parametros.descripcion = descripcion;
        parametros.extension = extension;
        parametros.relacionconceptos = conceptos;
        parametros.relacioncampos = camposRelacion;
        parametros.tipomovimiento = tipoMov;
        parametros.tipoafectacion = tipoAfec;
        parametros.activo = '1';
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/GuardarPerfil",
            data: JSON.stringify(parametros),
            dataType: "json",           
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d == "0") {
                    $.messager.alert('Información', 'Perfil configurado correctamente', 'info');
                    //document.getElementById('lblsubtitulo').innerHTML = '';
                    $('#dCarga').hide();
                    $('#dInformacion').hide();
                    $('#btnEditar').linkbutton({ disabled: true });
                    $('#dmenu').show();
                                    
                    DISEÑO_GRID('#dg','');
                }
                else { $.messager.alert('Error', 'Error al configurar el perfil', 'error'); }
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
function MODIFICAR_CATALOGO()
{
    var valores = "",activo="",eliter="";
    
    $('#dgmperfil').datagrid('acceptChanges');

    for (var r = 0; r < checkedRows.length; r++)
    {
        if (checkedRows[r].activo == "1") { activo = 1 } else { activo = 0; }
        if (checkedRows[r].eliter == "1") { eliter = 1 } else { eliter = 0; }
        valores += checkedRows[r].cveter+ "," + checkedRows[r].dester + ","+eliter+"," + activo + "|";
    }
    valores = valores.substring(0, valores.length - 1);


    var parametros = {};
    parametros.valores = valores;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ModificarPerfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', 'El perfil ha sido modificado', 'info');                
                MODIFICAR_PERFIL_GRID('#dgmperfil', '');
               
                for (var r=0; r< checkedRows.length;r++)
                {                   
                    var rows = $('#dgmperfil').datagrid('getData').total;
                    for (var p = 0; p < $('#dgmperfil').datagrid('getData').total; p++) {
                        if ($('#dgmperfil').datagrid('getRows')[p].cveter == checkedRows[r].cveter);
                        {
                            $('#dgmperfil').datagrid('uncheckRow', p);
                            break;
                        }
                    }                  
                }
            }
            else { $.messager.alert('Error', 'Error al modificar el perfil', 'error'); }
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



