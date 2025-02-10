var columnasMov;
var columnasPlaza;
var columnasEmp;
var indicadoresP;
var indicadoresA;
var indicadoresD;
var claveIndiceAfectacion;

var tipoIndicadorSeleccionado;
var tipoModificacionIndicadores;
var indicadoresPorIndice;

var tipoIndicador;
var tipoMovimiento;

var alto;
var ancho;
var tabla


$(document).ready(function () {
    tabla = $_GET('tabla');
    if (tabla == undefined) {
        tabla = 'CatIndicesMP';
    }
    DISEÑO_DOC('#dg', tabla);

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_DOC("#dg", "#cbocam", "#cbocon", "#txtval");
        }
    });

    $('#btnfiltrar').bind('click', function () { FILTRO_DOC("#dg", "#cbocam", "#cbocon", "#txtval"); });
    $('#btnNuevo').bind('click', function () { NUEVO(); });
    $('#btnEditar').bind('click', function () { EDITAR(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR(); });
    $('#btnDiseño').bind('click', function () { DISEÑO(); });
    $('#btnRegresarCap').bind('click', function () { REGRESAR_CAPTURA(); });
    $('#btnRegresarInd').bind('click', function () { REGRESAR_INDICES(); });
    $('#btnGuardarCap').bind('click', function () { GUARDAR_CAPTURA(); });
    $('#btnGuardarInd').bind('click', function () { GUARDAR_CAMPOS_INDICE(); });
    $('#btnLimpiarInd').bind('click', function () { LIMPIAR_CAPTURA(); });
    $('#btnLimpiarInd').bind('click', function () { LIMPIAR_INDICES(); });
   
    llenarNumeroDeColumnas();
    columnasMov = listarCamposMovimientosParaIndices('capmov');
    columnasPlaza = listarCamposMovimientosParaIndices('plazas');  //listarCamposPlazasParaIndices();
    columnasEmp = listarCamposMovimientosParaIndices('empleados'); //listarCamposEmpleadosParaIndices();

    indicadoresP = listarTodosLosIndicesPorTipo('P');
    indicadoresA = listarTodosLosIndicesPorTipo('A');
    indicadoresD = listarTodosLosIndicesPorTipo('D');
});

function DISEÑO_DOC(dgcontrol, strtabla) {
    var parametros = {};
    parametros.strtabla = strtabla;

    $.ajax({
        type: "POST",
        url: "DIndicesMP.aspx/ConfiguracionGrid",
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

                CARGAR_DOC("#dg", strtabla, ancho, alto);
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
function CARGAR_DOC(dgcontrol, strtabla) {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?tabla=' + strtabla + '&busqueda=' + con,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                sessionStorage.setItem('cveind', rows[fields[0]]);
                document.getElementById('lblnivel').innerHTML = "Indice: " + rows[fields[0]] + "-" + rows[fields[1]];
                document.getElementById('lblindice').innerHTML = "Indice: " + rows[fields[0]] + "-" + rows[fields[1]];
                $('#txtclave').textbox('setValue', rows[fields[0]]);
                $('#txtdescripcion').textbox('setValue', rows[fields[1]]);
                $('#txtorden').textbox('setValue', rows[fields[2]]);

                $('#btnEditar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');
                $('#btnDiseño').linkbutton('enable');
               
                claveIndiceAfectacion = rows[fields[0]];
                tipoModificacionIndicadores = listarTipoDeModificacionDeIndicadores(rows[fields[0]]);
                indicadoresPorIndice = listarIndicadoresPorIndice(rows[fields[0]]);
            }
        }
    });
}
function FILTRO_DOC(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            sessionStorage.setItem('condicion', condicion);
        }
        else { sessionStorage.setItem('condicion', ""); }
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_DOC(dgcontrol, tabla);
}


function NUEVO() {
    tipoMovimiento = 'G';
    document.getElementById('lblmov').innerHTML = "";
    sessionStorage.setItem('cveind', "0");
    $('#dmenu').hide();
    $('#dcaptura').show();
    $('#txtclave').textbox('clear').textbox('textbox').focus();
    $('#txtdescripcion').textbox('clear');
    $('#txtorden').textbox('clear');
}
function EDITAR() {
    tipoMovimiento = 'M';
    $('#dmenu').hide();
    $('#dcaptura').show();
    document.getElementById('lblmov').innerHTML = "Modificar";
    $('#txtclave').textbox({ readonly: false });
    $('#txtdescripcion').textbox({ readonly: false });
    $('#txtorden').textbox({ readonly: false });
}
function ELIMINAR() {
    tipoMovimiento = 'E';
    document.getElementById('lblmov').innerHTML = "Eliminar";
    $.messager.confirm('Confirm', 'Seguro de eliminar el índice' + sessionStorage.getItem('cveind'), function (r) {
        if (r) {
           
            grabarDatoIndice();
        }
        else {
            $("#dgdoc").datagrid('unselectAll');
            $('#btnEditar').linkbutton('disable');
            $('#btnEliminar').linkbutton('disable');
            $('#btnDiseño').linkbutton('disable');
        }
    });
}
function DISEÑO() {
    $('#dmenu').hide();
    $('#ddiseño').show();

    var checks = listarChecksPorIndice();
    document.getElementById('chkRetroactivo').checked = (checks[0].retro == 'on') ? true : false;
    document.getElementById('chkResponsabilidad').checked = (checks[0].respo == 'on') ? true : false;
    document.getElementById('chkDiferencias').checked = (checks[0].difer == 'on') ? true : false;
    document.getElementById('chkDiasDeAgui').checked = (checks[0].diasa == 'on') ? true : false;
    document.getElementById('chkBajas').checked = (checks[0].bajas == 'on') ? true : false;
    document.getElementById('chkEliconceper').checked = (checks[0].eliconceper == 'on') ? true : false;
    document.getElementById('chkActuConceper').checked = (checks[0].actuconceper == 'on') ? true : false;
    document.getElementById('chkEliPension').checked = (checks[0].elipension == 'on') ? true : false;
    document.getElementById('chkActuConceper2').checked = (checks[0].actuconceper2 == 'on') ? true : false;
    document.getElementById('chkBajaFonac').checked = (checks[0].bajafonac == 'on') ? true : false;
    document.getElementById('chkActualizarFonac').checked = (checks[0].actufonac == 'on') ? true : false;
    document.getElementById('chkCancelarPago').checked = (checks[0].cancpag == 'on') ? true : false;

    cargarColumnasDelTipo1(false);

    cargarColumnasDelTipo0(false);

    cargarColumnasDelTipo2(false);

    cargarColumnasDelTipo3(false);

    cargarColumnasDelTipo4(false);

    cargarColumnasDelTipo7(false);

    var row = $('#dg').datagrid('getSelected');
    if ($('#dg').datagrid('getRowIndex', row) != null)
    { $('#dg').datagrid('unselectRow', $('#dg').datagrid('getRowIndex', row)); }
}

function REGRESAR_CAPTURA() {
    $('#dmenu').show();
    $('#dcaptura').hide();
    $('#dg').datagrid('unselectAll');
    $('#txtval').textbox('clear')
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    sessionStorage.setItem('condicion', "");
    CARGAR_DOC('#dg', tabla);
}
function REGRESAR_INDICES() {
    $('#dmenu').show();
    $('#ddiseño').hide();
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    $('#dg').datagrid('unselectAll');
}
function GUARDAR_CAPTURA() {
    //var orden;
    //if ($('#txtorden').textbox('getValue') == "") { orden = 0; } else { orden = $('#txtorden').textbox('getValue'); }
    //var valores = "cve:" + sessionStorage.getItem('cveind') + "|des:" + $('#txtdescripcion').textbox('getValue') + "|ord:" + orden;
    //sessionStorage.setItem('campos', valores);
    //GUARDAR_DATOS('Captura');
    GRABAR_DATOS_INDICE();
    REGRESAR_CAPTURA();
}

function checar() {
    if ($('#txtclave').textbox("getValue") == "") return "La clave del indice no debe ser vacia";
    if ($('#txtdescripcion').textbox("getValue") == "") return "La descripción del indice no debe ser vacia";
    if ($('#txtorden').textbox("getValue") == "") return "Debe espesificar el orden para el indice";
    return "";
}

function GRABAR_DATOS_INDICE() {
    var che = checar();
    if (che == "") {
        var parametros = {};
        parametros.clave = $('#txtclave').textbox("getValue");
        parametros.descripcion = $('#txtdescripcion').textbox("getValue");
        parametros.orden = $('#txtorden').textbox("getValue");
        parametros.movimiento = tipoMovimiento;
        $.ajax({
            type: "POST",
            url: "utileriaDeIndices.aspx/guardarIndice",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
               var  dat = JSON.parse(data.d);
               $.messager.alert('Información', dat[0].nombre, 'info');
                REGRESAR_CAPTURA();
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    } else {
        $.messager.alert('Error', che, 'error');
    }
}

function llenarCombosConColumnas(sel) {
    sel = document.getElementById(sel);
    for (var i = 0; i < 51; i++) {
        var option = document.createElement("option");
        option.text = i.toString();
        option.value = i.toString();
        sel.add(option);
    }
}


function listarChecksPorIndice() {
    var parametros = {};
    var dat;
    var row = $('#dg').datagrid('getSelected');

    parametros.clave = row.cve;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarChecksPorIndice",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function llenarNumeroDeColumnas() {
    //$('#selBorrarCamposPlazaOrigen')    
    llenarCombosConColumnas("selNumColCapturaAPlazas");
    llenarCombosConColumnas("selBorrarCamposPlazaOrigen");
    llenarCombosConColumnas("selCapturaAPlazaDestino");
    llenarCombosConColumnas("selPlazaOrigenAPlazaDestino");
    llenarCombosConColumnas("selCapturaAEmpleado");
    llenarCombosConColumnas("selBorrarDeEmpleado");
}
function listarCamposPorIndiceYTipo(tipo) {
    var parametros = {};
    var dat;    
    parametros.clave = sessionStorage.getItem('cveind');
    parametros.indice = tipo;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposPorIndiceYTipo",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarCamposMovimientosParaIndices(tabla) {
    var dat;
    var parametros = {};
    parametros.tabla = tabla;
    
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposMovimientosParaIndices",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarCamposPlazasParaIndices() {
    /*var parametros = {};
    parametros.clave = $('#txtClave').textbox("getValue");
    parametros.descripcion = $('#txtDescripcion').textbox("getValue");
    parametros.orden = $('#txtOrden').textbox("getValue");*/
    var dat
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposPlazasParaIndices",
        //data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarCamposEmpleadosParaIndices() {
    var dat;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposEmpleadosParaIndices",
        //data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarTodosLosIndicesPorTipo(tipo) {
    var dat;
    var parametros = {};
    parametros.tipo = tipo;
    /*parametros.descripcion = $('#txtDescripcion').textbox("getValue");
    parametros.orden = $('#txtOrden').textbox("getValue");*/
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarIndicadoresExistentes",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarTipoDeModificacionDeIndicadores(clave) {
    var dat;
    var parametros = {};
    parametros.clave = clave;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarTipoModificacionIndicadores",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //oricadper,oricadded,oricadapo,descadper,descadded,descadapo
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}
function listarIndicadoresPorIndice(clave) {
    var dat;
    var parametros = {};
    parametros.clave = clave;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarIndicadoresPorIndiice",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //oricadper,oricadded,oricadapo,descadper,descadded,descadapo
            dat = JSON.parse(data.d);
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    return dat;
}

function cargarColumnasDelTipo1(numColumnas) {
    columnasTipo0 = listarCamposPorIndiceYTipo(1);
    var numCols = (numColumnas) ? document.getElementById('selNumColCapturaAPlazas').value : columnasTipo0.length;
    var tbl = document.getElementById("tblCapturaAOrigen");

    $("#tblCapturaAOrigen").find("tr:gt(0)").remove();

    if (document.getElementById('selNumColCapturaAPlazas').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selNumColCapturaAPlazas').val(columnasTipo0.length);

    for (var i = 0; i < columnasTipo0.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColOriTipo0_" + i;
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);
        $('#' + "selColOriTipo0_" + i).val(columnasTipo0[i].clave);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColDesTipo0_" + i;
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
        $('#' + "selColDesTipo0_" + i).val(columnasTipo0[i].nombre);
        if (numCols - 1 == i) break;
    }

    var diferencia = numCols - columnasTipo0.length;
    for (var i = 0; i < diferencia; i++) {

        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = ((i + columnasTipo0.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColOriTipo0_" + (i + columnasTipo0.length);
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColDesTipo0_" + (i + columnasTipo0.length);
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
    }
}

function cargarColumnasDelTipo0(numColumnas) {
    columnasTipo1 = listarCamposPorIndiceYTipo(0);

    var numCols = (numColumnas) ? document.getElementById('selBorrarCamposPlazaOrigen').value : columnasTipo1.length;
    var tbl = document.getElementById("tblBorrarOrigen");

    $("#tblBorrarOrigen").find("tr:gt(0)").remove();

    if (document.getElementById('selBorrarCamposPlazaOrigen').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selBorrarCamposPlazaOrigen').val(columnasTipo1.length);

    for (var i = 0; i < columnasTipo1.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");

        selectList.id = "selColDesTipo1_" + i;
        /*att = document.createAttribute("infoExtraDesTipo1_" + i);
        selectList.setAttributeNode(att);*/
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList.appendChild(option);
        }
        selectList.value = columnasTipo1[i].nombre;
        var tipind_Aux = (columnasTipo1[i].nombre == 'cadperper') ? 'P' : ((columnasTipo1[i].nombre == 'caddedper') ? 'D' : 'A');
        selectList.onchange = function (event) { selectColumnaChange(event, ''); }
        cel2.appendChild(selectList);

        if (document.getElementById("selColDesTipo1_" + i).value == 'cadperper' || document.getElementById("selColDesTipo1_" + i).value == 'caddedper' || document.getElementById("selColDesTipo1_" + i).value == 'cadaportper') {
            var selectListTipoIndcadores = document.createElement("select");
            var option = document.createElement("option");
            option.value = "T";
            option.text = "T";
            selectListTipoIndcadores.appendChild(option);
            var option = document.createElement("option");
            option.value = "E";
            option.text = "E";
            selectListTipoIndcadores.appendChild(option);
            cel2.appendChild(selectListTipoIndcadores);

            var modificacionTipo = (document.getElementById("selColDesTipo1_" + i).value == 'cadperper') ? tipoModificacionIndicadores.oricadper : ((document.getElementById("selColDesTipo1_" + i).value == 'caddedper') ? tipoModificacionIndicadores.oricadded : tipoModificacionIndicadores.oricadapo);

            if (modificacionTipo.trim() == 'E') {
                var tip_Ind = (document.getElementById("selColDesTipo1_" + i).value == 'cadperper') ? 'P' : (((document.getElementById("selColDesTipo1_" + i).value == 'caddedper')) ? 'D' : 'A');
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'E';
                var butt = document.createElement('input');
                butt.type = 'button';
                butt.value = 'Ver';
                butt.text = "Ver";              
                butt.target = tip_Ind;
                butt.onclick = function () {
                    var tip = this.target;
                    mostrarBuscadorDeIndicadores("selColDesTipo1_" + i, tip, 0);
                }
                cel2.appendChild(butt);
                //aqui faltan los indicadores que ya tenga.
            } else {
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'T';
            }

            selectListTipoIndcadores.onchange = function (event2) {
                if (event2.target.value == 'E' && (event2.target.parentElement.childNodes[0].value == 'cadperper' || event2.target.parentElement.childNodes[0].value == 'caddedper' || event2.target.parentElement.childNodes[0].value == 'cadaportper')) {
                    var tip_Ind = (event2.target.parentElement.childNodes[0].value == 'cadperper') ? 'P' : (((event2.target.parentElement.childNodes[0].value == 'caddedper')) ? 'D' : 'A');
                    var butt = document.createElement('input');
                    if (event2.target.parentElement.childNodes.length > 2)
                        event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    butt.type = 'button';
                    butt.value = "Ver";
                    butt.text = "Ver";
                    butt.target = tip_Ind;
                    butt.onclick = function () {
                        var tip = this.target;
                        mostrarBuscadorDeIndicadores("selColDesTipo1_" + i, tip, 0);
                    }
                    event2.target.parentElement.appendChild(butt);
                }
                else {

                    if (event2.target.parentElement.childNodes.length > 2)
                        event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    //if (cel2.childNodes.length > 2)
                    //cel2.removeChild(cel2.childNodes[2]);
                }
            }
        }
    }

    var diferencia = numCols - columnasTipo1.length;

    for (var i = 0; i < diferencia; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = ((i + columnasTipo1.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColDesTipo1_" + (i + columnasTipo1.length);
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList.appendChild(option);
        }

        //var tipind_Aux = (document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'cadperper') ? 'P' : ((document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'caddedper') ? 'D' : 'A');
        selectList.onchange = function (event) { selectColumnaChange(event, ''); }
        cel2.appendChild(selectList);
        //$('#' + "selColDesTipo1_" + (i + columnasTipo1.length)).val(columnasTipo1[i].nombre);

        if (document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'cadperper' || document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'caddedper' || document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'cadaportper') {
            var selectListTipoIndcadores = document.createElement("select");

            if (cel2.childNodes.length > 2)
                cel2.removeChild(cel2.childNodes[2]);

            var option = document.createElement("option");
            option.value = "T";
            option.text = "T";
            selectListTipoIndcadores.appendChild(option);
            var option = document.createElement("option");
            option.value = "E";
            option.text = "E";
            selectListTipoIndcadores.appendChild(option);
            cel2.appendChild(selectListTipoIndcadores);

            var modificacionTipo = (document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'cadperper') ? tipoModificacionIndicadores.oricadper : ((document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'caddedper') ? tipoModificacionIndicadores.oricadded : tipoModificacionIndicadores.oricadapo);

            if (modificacionTipo.trim() == 'E') {
                var tip_Ind = (document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'cadperper') ? 'P' : (((document.getElementById("selColDesTipo1_" + (i + columnasTipo1.length)).value == 'caddedper')) ? 'D' : 'A');
                var butt = document.createElement('input');
                butt.type = 'button'
                butt.value = "Ver";
                butt.text = "Ver";
                butt.target = tip_Ind;
                butt.onclick = function () {
                    var tip = this.target;
                    mostrarBuscadorDeIndicadores("selColDesTipo1_" + i, tip, 0);
                }
                selectListTipoIndcadores.value = 'E';
                //aqui faltan los indicadores que ya tenga.
            } else {
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'T';
            }

            selectListTipoIndcadores.onchange = function (event) {
                if (event.target.value.trim() == 'E' && (event.target.parentElement.childNodes[0].value == 'cadperper' || event.target.parentElement.childNodes[0].value == 'caddedper' || event.target.parentElement.childNodes[0].value == 'cadaportper')) {
                    var tip_Ind = (event.target.parentElement.childNodes[0].value == 'cadperper') ? 'P' : (((event.target.parentElement.childNodes[0].value == 'caddedper')) ? 'D' : 'A');
                    /*if (cel2.childNodes.length > 2)
                        cel2.removeChild(cel2.childNodes[2]);*/
                    if (event.target.parentElement.childNodes.length > 2)
                        event.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    var butt = document.createElement('input');
                    butt.type = 'button';
                    butt.value = "Ver";
                    butt.text = "Ver";
                    butt.target = tip_Ind;
                    butt.onclick = function () {
                        var tip = this.target;
                        mostrarBuscadorDeIndicadores("selColDesTipo1_" + i, tip, 0);
                    }
                    event.target.parentElement.appendChild(butt);
                }
                else {
                    if (event.target.parentElement.childNodes.length > 2)
                        event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
                    /*if (cel2.childNodes.length > 2)
                        cel2.removeChild(cel2.childNodes[2]);*/
                }
            }
        }
    }

}

function selectColumnaChange(event, tipo) {
    /*if (document.getElementById(event.target.id).value == 'cadperper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    } else if (document.getElementById(event.target.id).value == 'caddedper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    } else if (document.getElementById(event.target.id).value == 'cadaportper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    }*/
    tipo = (event.target.value == 'cadperper') ? 'P' : ((event.target.value == 'caddedper') ? 'D' : 'A');

    if (document.getElementById(event.target.id).value == 'cadperper' || document.getElementById(event.target.id).value == 'caddedper' || document.getElementById(event.target.id).value == 'cadaportper') {

        while (event.target.parentElement.childNodes.length > 1) {
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
        }

        var selectListTipoIndcadores = document.createElement("select");
        var option = document.createElement("option");
        option.value = "T";
        option.text = "T";
        selectListTipoIndcadores.appendChild(option);
        var option = document.createElement("option");
        option.value = "E";
        option.text = "E";
        selectListTipoIndcadores.appendChild(option);
        event.target.parentElement.appendChild(selectListTipoIndcadores);

        var movificador = (tipo == 'P') ? tipoModificacionIndicadores.oricadper : ((tipo == 'D') ? tipoModificacionIndicadores.oricadded : tipoModificacionIndicadores.oricadapo);

        if (movificador.trim() == 'E') {
            //var tip_Ind = (document.getElementById(event.target.id).value == 'cadperper') ? 'P' : (((document.getElementById(event.target.id).value == 'caddedper')) ? 'D' : 'A');
            selectListTipoIndcadores.value = 'E';

            if (event.target.parentElement.childNodes.length > 2)
                event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);

            var butt = document.createElement('input');
            butt.type = 'button'
            butt.value = "Ver";
            butt.text = "Ver";
            butt.target = tip_Ind;
            butt.onclick = function () {
                var tip = this.target;
                mostrarBuscadorDeIndicadores(event.target.id, tip, 0);
            }
            event.target.parentElement.appendChild(butt);
            //aqui faltan los indicadores que ya tenga.
        } else {
            if (event.target.parentElement.childNodes.length > 2)
                event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
            selectListTipoIndcadores.value = 'T';
        }

        selectListTipoIndcadores.onchange = function (event2) {
            if (event2.target.value.trim() == 'E' && (event2.target.parentElement.childNodes[0].value == 'cadperper' || event2.target.parentElement.childNodes[0].value == 'caddedper' || event2.target.parentElement.childNodes[0].value == 'cadaportper')) {
                if (event.target.parentElement.childNodes.length > 2)
                    event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
                var butt = document.createElement('input');
                butt.type = 'button'
                butt.value = "Ver";
                butt.text = "Ver";
                butt.target = tip_Ind;
                butt.onclick = function () {
                    var tip = this.target;
                    mostrarBuscadorDeIndicadores(event.target.id, tip, 0);
                }
                event2.target.parentElement.appendChild(butt);
            }
            else {
                if (event2.target.parentElement.childNodes.length > 2)
                    event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
            }
        }
    } else {
        while (event.target.parentElement.childNodes.length > 1) {
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
        }
        /*if (event.target.parentElement.childNodes.length > 2)
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);*/
        //event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
    }
}

function cargarColumnasDelTipo2(numColumnas) {

    columnasTipo2 = listarCamposPorIndiceYTipo(2);

    var numCols = (numColumnas) ? document.getElementById('selCapturaAPlazaDestino').value : columnasTipo2.length;
    var tbl = document.getElementById("tblCapturaADestino");

    $("#tblCapturaADestino").find("tr:gt(0)").remove();

    if (document.getElementById('selCapturaAPlazaDestino').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selCapturaAPlazaDestino').val(columnasTipo2.length);

    /*var tbl = document.getElementById("tblCapturaADestino");
    $('#selCapturaAPlazaDestino').val(columnasTipo2.length);*/
    for (var i = 0; i < columnasTipo2.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColCapTipo2_" + i;
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);
        $('#' + "selColCapTipo2_" + i).val(columnasTipo2[i].clave);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColDesTipo2_" + i;
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
        $('#' + "selColDesTipo2_" + i).val(columnasTipo2[i].nombre);
        if (numCols - 1 == i) break;
    }

    var diferencia = numCols - columnasTipo2.length;

    for (var i = 0; i < diferencia; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = ((i + columnasTipo2.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColCapTipo2_" + (i + columnasTipo2.length);
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColDesTipo2_" + (i + columnasTipo2.length);
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
    }
}

function cargarColumnasDelTipo3(numColumnas) {
    //plaza origen a destino.
    columnasTipo3 = listarCamposPorIndiceYTipo(3);

    var numCols = (numColumnas) ? document.getElementById('selPlazaOrigenAPlazaDestino').value : columnasTipo3.length;
    var tbl = document.getElementById("tblOrigenADestino");

    $("#tblOrigenADestino").find("tr:gt(0)").remove();

    if (document.getElementById('selPlazaOrigenAPlazaDestino').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selPlazaOrigenAPlazaDestino').val(columnasTipo3.length);

    /*columnasTipo3 = listarCamposPorIndiceYTipo(3);
    var tbl = document.getElementById("tblOrigenADestino");*/
    //$('#selPlazaOrigenAPlazaDestino').val(columnasTipo3.length);
    for (var i = 0; i < columnasTipo3.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColOriADesTipo3_" + i;
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList.appendChild(option);
        }

        /*nuevo***************************************/
        selectList.value = columnasTipo3[i].nombre;
        var tipind_Aux = (columnasTipo3[i].nombre == 'cadperper') ? 'P' : ((columnasTipo3[i].nombre == 'caddedper') ? 'D' : 'A');
        selectList.onchange = function (event) { selectColumnaChange_Tipo3(event, ''); }
        /********************************************/
        cel2.appendChild(selectList);

        /*nuevo********************************************/
        if (document.getElementById("selColOriADesTipo3_" + i).value == 'cadperper' || document.getElementById("selColOriADesTipo3_" + i).value == 'caddedper' || document.getElementById("selColOriADesTipo3_" + i).value == 'cadaportper') {
            var selectListTipoIndcadores = document.createElement("select");
            var option = document.createElement("option");
            option.value = "T";
            option.text = "T";
            selectListTipoIndcadores.appendChild(option);
            var option = document.createElement("option");
            option.value = "E";
            option.text = "E";
            selectListTipoIndcadores.appendChild(option);
            cel2.appendChild(selectListTipoIndcadores);

            var modificacionTipo = (document.getElementById("selColOriADesTipo3_" + i).value == 'cadperper') ? tipoModificacionIndicadores.descadper : ((document.getElementById("selColOriADesTipo3_" + i).value == 'caddedper') ? tipoModificacionIndicadores.descadded : tipoModificacionIndicadores.descadapo);
            if (modificacionTipo.trim() == 'E') {
                var tip_Ind = (document.getElementById("selColOriADesTipo3_" + i).value == 'cadperper') ? 'P' : (((document.getElementById("selColOriADesTipo3_" + i).value == 'caddedper')) ? 'D' : 'A');
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'E';
                var butt = document.createElement('input');
                butt.type = 'button';
                butt.value = "Ver";
                butt.text = "Ver";
                butt.onclick = function () {
                    mostrarBuscadorDeIndicadores("selColOriADesTipo3_" + i, tip_Ind, 2);
                }
                cel2.appendChild(butt);
                //aqui faltan los indicadores que ya tenga.
            } else {
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'T';
            }

            selectListTipoIndcadores.onchange = function (event2) {
                if (event2.target.value.trim() == 'E' && (event2.target.parentElement.childNodes[0].value == 'cadperper' || event2.target.parentElement.childNodes[0].value == 'caddedper' || event2.target.parentElement.childNodes[0].value == 'cadaportper')) {
                    var tip_Ind = (event2.target.parentElement.childNodes[0].value == 'cadperper') ? 'P' : (((event2.target.parentElement.childNodes[0].value == 'caddedper')) ? 'D' : 'A');
                    var butt = document.createElement('input');
                    if (event2.target.parentElement.childNodes.length > 2)
                        event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    butt.type = 'button';
                    butt.value = "Ver";
                    butt.text = "Ver";
                    butt.onclick = function () {
                        mostrarBuscadorDeIndicadores("selColOriADesTipo3_" + i, tip_Ind, 2);
                    }
                    event2.target.parentElement.appendChild(butt);
                }
                else {

                    if (event2.target.parentElement.childNodes.length > 2)
                        event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    //if (cel2.childNodes.length > 2)
                    //cel2.removeChild(cel2.childNodes[2]);
                }
            }
        }
        /**************************************************/

        if (numCols - 1 == i) break;
    }

    var diferencia = numCols - columnasTipo3.length;

    for (var i = 0; i < diferencia; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        cel.innerHTML = ((i + columnasTipo2.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColOriADesTipo3_" + (i + columnasTipo2.length);
        for (var j = 0; j < columnasPlaza.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasPlaza[j].clave;
            option.text = columnasPlaza[j].nombre;
            selectList.appendChild(option);
        }
        selectList.onchange = function (event) { selectColumnaChange_Tipo3(event, ''); }
        cel2.appendChild(selectList);

        /*nuevo*****************************/
        if (document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'cadperper' || document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'caddedper' || document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'cadaportper') {
            var selectListTipoIndcadores = document.createElement("select");

            if (cel2.childNodes.length > 2)
                cel2.removeChild(cel2.childNodes[2]);

            var option = document.createElement("option");
            option.value = "T";
            option.text = "T";
            selectListTipoIndcadores.appendChild(option);
            var option = document.createElement("option");
            option.value = "E";
            option.text = "E";
            selectListTipoIndcadores.appendChild(option);
            cel2.appendChild(selectListTipoIndcadores);

            var modificacionTipo = (document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'cadperper') ? tipoModificacionIndicadores.descadper : ((document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'caddedper') ? tipoModificacionIndicadores.descadded : tipoModificacionIndicadores.descadapo);

            if (modificacionTipo.trim() == 'E') {
                var tip_Ind = (document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'cadperper') ? 'P' : (((document.getElementById("selColOriADesTipo3_" + (i + columnasTipo1.length)).value == 'caddedper')) ? 'D' : 'A');
                var butt = document.createElement('input');
                butt.type = 'button'
                butt.value = "Ver";
                butt.text = "Ver";
                butt.onclick = function () {
                    mostrarBuscadorDeIndicadores("selColOriADesTipo3_" + i, tip_Ind, 2);
                }
                selectListTipoIndcadores.value = 'E';
                //aqui faltan los indicadores que ya tenga.
            } else {
                if (cel2.childNodes.length > 2)
                    cel2.removeChild(cel2.childNodes[2]);
                selectListTipoIndcadores.value = 'T';
            }

            selectListTipoIndcadores.onchange = function (event) {
                if (event.target.value.trim() == 'E' && (event.target.parentElement.childNodes[0].value == 'cadperper' || event.target.parentElement.childNodes[0].value == 'caddedper' || event.target.parentElement.childNodes[0].value == 'cadaportper')) {
                    var tip_Ind = (event.target.parentElement.childNodes[0].value == 'cadperper') ? 'P' : (((event.target.parentElement.childNodes[0].value == 'caddedper')) ? 'D' : 'A');
                    /*if (cel2.childNodes.length > 2)
                        cel2.removeChild(cel2.childNodes[2]);*/
                    if (event.target.parentElement.childNodes.length > 2)
                        event.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
                    var butt = document.createElement('input');
                    butt.type = 'button';
                    butt.value = "Ver";
                    butt.text = "Ver";
                    butt.onclick = function () {
                        mostrarBuscadorDeIndicadores("selColOriADesTipo3_" + i, tip_Ind, 2);
                    }
                    event.target.parentElement.appendChild(butt);
                }
                else {
                    if (event.target.parentElement.childNodes.length > 2)
                        event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
                    /*if (cel2.childNodes.length > 2)
                        cel2.removeChild(cel2.childNodes[2]);*/
                }
            }
        }
        /***********************************/
    }
}

function selectColumnaChange_Tipo3(event) {
    /*if (document.getElementById(event.target.id).value == 'cadperper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    } else if (document.getElementById(event.target.id).value == 'caddedper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    } else if (document.getElementById(event.target.id).value == 'cadaportper') {
        mostrarBuscadorDeIndicadores(event.target.id);
    }*/
    var tipo = (event.target.value == 'cadperper') ? 'P' : ((event.target.value == 'caddedper') ? 'D' : 'A');

    if (document.getElementById(event.target.id).value == 'cadperper' || document.getElementById(event.target.id).value == 'caddedper' || document.getElementById(event.target.id).value == 'cadaportper') {

        while (event.target.parentElement.childNodes.length > 1) {
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
        }

        var selectListTipoIndcadores = document.createElement("select");
        var option = document.createElement("option");
        option.value = "T";
        option.text = "T";
        selectListTipoIndcadores.appendChild(option);
        var option = document.createElement("option");
        option.value = "E";
        option.text = "E";
        selectListTipoIndcadores.appendChild(option);
        event.target.parentElement.appendChild(selectListTipoIndcadores);

        var movificador = (tipo == 'P') ? tipoModificacionIndicadores.descadper : ((tipo == 'D') ? tipoModificacionIndicadores.descadded : tipoModificacionIndicadores.descadapo);

        if (movificador.trim() == 'E') {
            //var tip_Ind = (document.getElementById(event.target.id).value == 'cadperper') ? 'P' : (((document.getElementById(event.target.id).value == 'caddedper')) ? 'D' : 'A');
            selectListTipoIndcadores.value = 'E';

            if (event.target.parentElement.childNodes.length > 2)
                event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);

            var butt = document.createElement('input');
            butt.type = 'button'
            butt.value = "Ver";
            butt.text = "Ver";
            butt.onclick = function () {
                mostrarBuscadorDeIndicadores(event.target.id, tipo, 2);
            }
            event.target.parentElement.appendChild(butt);
            //aqui faltan los indicadores que ya tenga.
        } else {
            if (event.target.parentElement.childNodes.length > 2)
                event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
            selectListTipoIndcadores.value = 'T';
        }

        selectListTipoIndcadores.onchange = function (event2) {
            if (event2.target.value.trim() == 'E' && (event2.target.parentElement.childNodes[0].value == 'cadperper' || event2.target.parentElement.childNodes[0].value == 'caddedper' || event2.target.parentElement.childNodes[0].value == 'cadaportper')) {
                if (event.target.parentElement.childNodes.length > 2)
                    event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
                var butt = document.createElement('input');
                butt.type = 'button'
                butt.value = "Ver";
                butt.text = "Ver";
                butt.onclick = function () {
                    mostrarBuscadorDeIndicadores(event.target.id, tipo, 2);
                }
                event2.target.parentElement.appendChild(butt);
            }
            else {
                if (event2.target.parentElement.childNodes.length > 2)
                    event2.target.parentElement.removeChild(event2.target.parentElement.childNodes[2]);
            }
        }
    } else {
        while (event.target.parentElement.childNodes.length > 1) {
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[1]);
        }
        /*if (event.target.parentElement.childNodes.length > 2)
            event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);*/
        //event.target.parentElement.removeChild(event.target.parentElement.childNodes[2]);
    }
}

function cargarColumnasDelTipo4(numColumnas) {
    columnasTipo4 = listarCamposPorIndiceYTipo(4);

    var numCols = (numColumnas) ? document.getElementById('selCapturaAEmpleado').value : columnasTipo4.length;
    var tbl = document.getElementById("tblCapturaAEmpleado");

    $("#tblCapturaAEmpleado").find("tr:gt(0)").remove();

    if (document.getElementById('selCapturaAEmpleado').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selCapturaAEmpleado').val(columnasTipo4.length);

    /*var tbl = document.getElementById("tblCapturaAEmpleado");
    $('#selCapturaAEmpleado').val(columnasTipo4.length);*/
    for (var i = 0; i < columnasTipo4.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColCapAEmp4_" + i;
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);
        $('#' + "selColCapAEmp4_" + i).val(columnasTipo4[i].clave);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColEmpleados4_" + i;
        for (var j = 0; j < columnasEmp.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasEmp[j].clave;
            option.text = columnasEmp[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
        $('#' + "selColEmpleados4_" + i).val(columnasTipo4[i].nombre);
        if (numCols - 1 == i) break;
    }

    var diferencia = numCols - columnasTipo4.length;

    for (var i = 0; i < diferencia; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = ((i + columnasTipo4.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColCapAEmp4_" + (i + columnasTipo4.length);
        for (var j = 0; j < columnasMov.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasMov[j].clave;
            option.text = columnasMov[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);

        var selectList2 = document.createElement("select");
        selectList2.id = "selColEmpleados4_" + (i + columnasTipo4.length);
        for (var j = 0; j < columnasEmp.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasEmp[j].clave;
            option.text = columnasEmp[j].nombre;
            selectList2.appendChild(option);
        }
        cel3.appendChild(selectList2);
    }
}

function cargarColumnasDelTipo7(numColumnas) {
    columnasTipo7 = listarCamposPorIndiceYTipo(7);

    var numCols = (numColumnas) ? document.getElementById('selBorrarDeEmpleado').value : columnasTipo7.length;
    var tbl = document.getElementById("tblBorrarDeEmpleado");

    $("#tblBorrarDeEmpleado").find("tr:gt(0)").remove();

    if (document.getElementById('selBorrarDeEmpleado').value == '0' && numColumnas) { return; };

    if (!numColumnas)
        $('#selBorrarDeEmpleado').val(columnasTipo7.length);

    for (var i = 0; i < columnasTipo7.length; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = (i + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColDesTipo7_" + i;
        for (var j = 0; j < columnasEmp.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasEmp[j].clave;
            option.text = columnasEmp[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);
        $('#' + "selColDesTipo7_" + i).val(columnasTipo7[i].nombre);
        if (numCols - 1 == i) break;
    }

    var diferencia = numCols - columnasTipo7.length;

    for (var i = 0; i < diferencia; i++) {
        var row = tbl.insertRow(tbl.rows.length);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        cel.innerHTML = ((i + columnasTipo7.length) + 1).toString();
        var selectList = document.createElement("select");
        selectList.id = "selColDesTipo7_" + (i + columnasTipo4.length);
        for (var j = 0; j < columnasEmp.length ; j++) {
            cel.innerHtml = selectList;
            var option = document.createElement("option");
            option.value = columnasEmp[j].clave;
            option.text = columnasEmp[j].nombre;
            selectList.appendChild(option);
        }
        cel2.appendChild(selectList);
    }
}

function seleccionaNumColumnasCapturaYOrigen() {
    /*var tbl = document.getElementById("tblCapturaAOrigen");
    var numCol = document.getElementById("selNumColCapturaAPlazas").value;
    for (var i = 0; i < numCol; i++) {
        var row = tbl.insertRow(tbl.length - 1);
        var cel = row.insertCell(0);
        var cel2 = row.insertCell(1);
    }*/
}

function seleccionaNumColumnasBorrarOrigen() {
    document.getElementById("selBorrarCamposPlazaOrigen");
}

function mostrarBuscadorDeIndicadores(selActivo, tipind, tipo) {
    //indicadoresPorIndice        
    $("#idBuscadorIndicadores").css({ top: (($(window).height() / 2) - ($("#idBuscadorIndicadores").height() / 2)) + 'px' });
    $("#idBuscadorIndicadores").css({ left: (($(window).width() / 2) - ($("#idBuscadorIndicadores").width() / 2)) + 'px' });

    //var IndicadoresAct = (tipo == '0')?indicadoresPorIndice.:;
    tipoIndicador = tipind;
    tipoMovimiento = tipo;

    if (tipind == 'P') {
        jsonOb = indicadoresP;
        IndicadoresAct = (tipo == '0') ? indicadoresPorIndice.indoriper : indicadoresPorIndice.inddesper;
    } else if (tipind == 'A') {
        jsonOb = indicadoresA;
        IndicadoresAct = (tipo == '0') ? indicadoresPorIndice.indoriapo : indicadoresPorIndice.inddesapo;
    } else {
        jsonOb = indicadoresD;
        IndicadoresAct = (tipo == '0') ? indicadoresPorIndice.indorided : indicadoresPorIndice.inddesded;
    }

    if (IndicadoresAct != undefined) {
        var splitRes = IndicadoresAct.split("+");
        var selSeleccionado = document.getElementById('selIndicadoresSeleccionados');
        selSeleccionado.options.length = 0;
        for (var j = 0; j < splitRes.length; j++) {
            if (splitRes[j] == '') continue;
            var opt = document.createElement('option');
            opt.value = splitRes[j];
            opt.text = splitRes[j];
            selSeleccionado.appendChild(opt);
        }
    }

    tipoIndicadorSeleccionado = tipind;
    //var jsonOb = (tipind == 'P') ? indicadoresP : ((tipind == 'A') ? indicadoresA : indicadoresD);
    var sel = document.getElementById('selBuscarIndicador');
    sel.options.length = 0;
    for (var i = 0; i < jsonOb.length; i++) {
        var opt = document.createElement('option');
        opt.value = jsonOb[i].clave;
        opt.text = '(' + jsonOb[i].clave + ') ' + jsonOb[i].nombre;
        sel.appendChild(opt);
    }

    $('#txtBuscarIndicador').val("Buscar...");
    $('#txtBuscarIndicador').addClass("letrasGrices");
    $('#idBuscadorIndicadores').show();
}


function CerrarBuscadorIndicadores() {
    $('#idBuscadorIndicadores').hide();
}
function AceptarBuscadorIndicadores() {
    var sel = document.getElementById('selIndicadoresSeleccionados');
    var res = '';
    for (var i = 0; i < sel.options.length; i++) {
        res += sel.options[i].value + '+';
    }
    //tipoMovimiento
    if (tipoIndicador == 'P') {
        if (tipoMovimiento == 0) {
            indicadoresPorIndice.indoriper = res;
        } else {
            indicadoresPorIndice.inddesper = res;
        }
    } else if (tipoIndicador == 'A') {
        if (tipoMovimiento == 0) {
            indicadoresPorIndice.indoriapo = res;
        } else {
            indicadoresPorIndice.inddesapo = res;
        }
    } else {
        if (tipoMovimiento == 0) {
            indicadoresPorIndice.indorided = res;
        } else {
            indicadoresPorIndice.inddesded = res;
        }
    }
    $('#idBuscadorIndicadores').hide();
}

function txtBuscarIndicador_OnFocus() {
    if ($('#txtBuscarIndicador').val() == 'Buscar...') {
        $('#txtBuscarIndicador').val("");
        $('#txtBuscarIndicador').removeClass("letrasGrices");
    }
}

function txtBuscarIndicador_OnChange() {
    var jsonOb = (tipoIndicadorSeleccionado == 'P') ? indicadoresP : ((tipoIndicadorSeleccionado == 'A') ? indicadoresA : indicadoresD);
    var bus = document.getElementById('txtBuscarIndicador').value.toUpperCase();
    var sel = document.getElementById('selBuscarIndicador');
    sel.options.length = 0;
    for (var i = 0; i < jsonOb.length; i++) {
        if (('(' + jsonOb[i].clave + ') ' + jsonOb[i].nombre).includes(bus)) {
            var opt = document.createElement('option');
            opt.value = jsonOb[i].clave;
            opt.text = '(' + jsonOb[i].clave + ') ' + jsonOb[i].nombre;
            sel.appendChild(opt);
        }
    }
}

function selBuscarIndicador_ondblClick() {
    var selBus = document.getElementById('selBuscarIndicador');
    var sel = document.getElementById('selIndicadoresSeleccionados');
    if ($("#selIndicadoresSeleccionados option[value='" + selBus.value + "']").length == 0) {
        var opt = document.createElement('option');
        opt.value = selBus.value;
        opt.text = selBus.value;
        sel.appendChild(opt);
    }
}

function selIndicadoresSeleccionados_ondblClick() {
    var selBus = document.getElementById('selIndicadoresSeleccionados');
    selBus.remove(selBus.selectedIndex);
}


function chkRetroactivo_Onchange() {
    if (document.getElementById('chkRetroactivo').checked) {
        document.getElementById('chkResponsabilidad').checked = false;
        document.getElementById('chkDiferencias').checked = false;
    }
}
function chkResponsabilidad_Onchange() {
    if (document.getElementById('chkResponsabilidad').checked) {
        document.getElementById('chkRetroactivo').checked = false;
        document.getElementById('chkDiferencias').checked = false;
    }
}
function chkDiferencias_Onchange() {
    if (document.getElementById('chkDiferencias').checked) {
        document.getElementById('chkRetroactivo').checked = false;
        document.getElementById('chkResponsabilidad').checked = false;
    }
}

function chkEliconceper_Onchange() {
    if (document.getElementById('chkEliconceper').checked) {
        document.getElementById('chkActuConceper').checked = false;
        document.getElementById('chkActuConceper2').checked = false;
        /*******************************************************************/
        var quitarRenglon = new Array();
        var tablaBorraOrigen = document.getElementById('tblBorrarOrigen');
        for (var i = 1; i < tablaBorraOrigen.rows.length; i++) {
            var row = tablaBorraOrigen.rows[i];
            if (row.cells[1].childNodes[0].value == 'cadperper' || row.cells[1].childNodes[0].value == 'caddedper' || row.cells[1].childNodes[0].value == 'cadaportper') {
                quitarRenglon.push(i);
            }
        }
        var selNumRows = document.getElementById('selBorrarCamposPlazaOrigen');
        selNumRows.value = selNumRows.value - quitarRenglon.length;
        for (var i = quitarRenglon.length - 1 ; i > -1 ; i--) {
            tablaBorraOrigen.deleteRow(quitarRenglon[i]);
        }
        for (var i = 1; i < tablaBorraOrigen.rows.length; i++) {
            var row = tablaBorraOrigen.rows[i];
            row.cells[0].innerHTML = i;
        }
        /*******************************************************************/
        quitarRenglon = new Array();
        var tablaOrigenADestino = document.getElementById('tblOrigenADestino');
        for (var i = 1; i < tablaOrigenADestino.rows.length; i++) {
            var row = tablaOrigenADestino.rows[i];
            if (row.cells[1].childNodes[0].value == 'cadperper' || row.cells[1].childNodes[0].value == 'caddedper' || row.cells[1].childNodes[0].value == 'cadaportper') {
                quitarRenglon.push(i);
            }
        }
        var selNumRows = document.getElementById('selPlazaOrigenAPlazaDestino');
        selNumRows.value = selNumRows.value - quitarRenglon.length;
        for (var i = quitarRenglon.length - 1 ; i > -1 ; i--) {
            tablaOrigenADestino.deleteRow(quitarRenglon[i]);
        }
        for (var i = 1; i < tablaOrigenADestino.rows.length; i++) {
            var row = tablaOrigenADestino.rows[i];
            row.cells[0].innerHTML = i;
        }
    }
}
function chkActuConceper_Onchange() {
    if (document.getElementById('chkActuConceper').checked) {
        document.getElementById('chkEliconceper').checked = false;
        document.getElementById('chkActuConceper2').checked = false;
    }
}
function chkActuConceper2_Onchange() {
    if (document.getElementById('chkActuConceper2').checked) {
        document.getElementById('chkEliconceper').checked = false;
        document.getElementById('chkActuConceper').checked = false;
    }
}
function chkBajaFonacot_Onchange() {
    if (document.getElementById('chkBajaFonac').checked) {
        document.getElementById('chkActualizarFonac').checked = false;
    }
}
function chkActuFonacot_Onchange() {
    if (document.getElementById('chkActualizarFonac').checked) {
        document.getElementById('chkBajaFonac').checked = false;
    }
}
function checarCamposRepetidos() {
    var res = "";
    /*Tabla captura a origen******************************/
    var tablaCapAOri = document.getElementById('tblCapturaAOrigen');
    var arregloAux = new Array();
    var arregloAux2 = new Array();
    for (var i = 1; i < tablaCapAOri.rows.length; i++) {
        var row = tablaCapAOri.rows[i];
        if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de captura a plaza origen (" + row.cells[1].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux.push(row.cells[1].childNodes[0].value);
        }
        if (arregloAux2.indexOf(row.cells[2].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de captura a plaza origen (" + row.cells[2].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux2.push(row.cells[2].childNodes[0].value);
        }
    }
    /*************************************************/

    /*Tabla borrar de origen******************************/
    var tablaBorrarOrigen = document.getElementById('tblBorrarOrigen');
    arregloAux = new Array();
    arregloAux2 = new Array();
    for (var i = 1; i < tablaBorrarOrigen.rows.length; i++) {
        var row = tablaBorrarOrigen.rows[i];
        if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
            res = "Elemento repetido en Borrar campos de plaza origen ( " + row.cells[1].childNodes[0].value + " ) en la posicion " + i;
            break;
        } else {
            arregloAux.push(row.cells[1].childNodes[0].value);
        }
    }
    /*************************************************/

    /*Tabla captura a origen******************************/
    var tablaCapADes = document.getElementById('tblCapturaADestino');
    var arregloAux = new Array();
    var arregloAux2 = new Array();
    for (var i = 1; i < tablaCapADes.rows.length; i++) {
        var row = tablaCapADes.rows[i];
        if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de captura a plaza destino (" + row.cells[1].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux.push(row.cells[1].childNodes[0].value);
        }
        if (arregloAux2.indexOf(row.cells[2].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de captura a plaza destino (" + row.cells[2].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux2.push(row.cells[2].childNodes[0].value);
        }
    }
    /*************************************************/

    /*Tabla captura a origen******************************/
    var tablaOriADes = document.getElementById('tblOrigenADestino');
    var arregloAux = new Array();
    var arregloAux2 = new Array();
    for (var i = 1; i < tablaOriADes.rows.length; i++) {
        var row = tablaOriADes.rows[i];
        if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de plaza origen a plaza destino (" + row.cells[1].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux.push(row.cells[1].childNodes[0].value);
        }
        /*if (arregloAux2.indexOf(row.cells[2].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de plaza origen a plaza destino (" + row.cells[2].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux2.push(row.cells[2].childNodes[0].value);
        }*/
    }
    /*************************************************/

    /*Tabla captura a empleado******************************/
    var tablaCapAEmp = document.getElementById('tblCapturaAEmpleado');
    var arregloAux = new Array();
    var arregloAux2 = new Array();
    for (var i = 1; i < tablaCapAEmp.rows.length; i++) {
        var row = tablaCapAEmp.rows[i];
        //if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
        //    res = "Elemento repetido en Campos de captura a catalogo empleado (" + row.cells[1].childNodes[0].value + ") en la posicion " + i;
        //    break;
        //} else {
            arregloAux.push(row.cells[1].childNodes[0].value);
       // }
        if (arregloAux2.indexOf(row.cells[2].childNodes[0].value) > -1) {
            res = "Elemento repetido en Campos de captura a catalogo empleado (" + row.cells[2].childNodes[0].value + ") en la posicion " + i;
            break;
        } else {
            arregloAux2.push(row.cells[2].childNodes[0].value);
        }
    }
    /*************************************************/

    /*Tabla borrar de origen******************************/
    var tablaBorrarEmpleado = document.getElementById('tblBorrarDeEmpleado');
    arregloAux = new Array();
    arregloAux2 = new Array();
    for (var i = 1; i < tablaBorrarEmpleado.rows.length; i++) {
        var row = tablaBorrarEmpleado.rows[i];
        if (arregloAux.indexOf(row.cells[1].childNodes[0].value) > -1) {
            res = "Elemento repetido en Borrar campos de Empleado( " + row.cells[1].childNodes[0].value + " ) en la posicion " + i;
            break;
        } else {
            arregloAux.push(row.cells[1].childNodes[0].value);
        }
    }
    /*************************************************/
    return res;
}

function sacarCamposAGrabar() {
    var resultadoCompleto = "";
    var tablaCapAOri = document.getElementById('tblCapturaAOrigen');
    var resultadoCapAOri = "";

    tipoModificacionIndicadores.oricadper = "";
    tipoModificacionIndicadores.oricadded = "";
    tipoModificacionIndicadores.oricadapo = "";
    tipoModificacionIndicadores.descadper = "";
    tipoModificacionIndicadores.descadded = "";
    tipoModificacionIndicadores.descadapo = "";

    for (var i = 1; i < tablaCapAOri.rows.length; i++) {
        var row = tablaCapAOri.rows[i];
        resultadoCapAOri += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",1,''" + row.cells[1].childNodes[0].value + "'',''" + row.cells[2].childNodes[0].value + "''),";
    }
    resultadoCompleto += (resultadoCapAOri != '') ? resultadoCapAOri : "";
    var tablaBorrarOrigen = document.getElementById('tblBorrarOrigen');
    var resultadoBorraOrigen = "";
    for (var i = 1; i < tablaBorrarOrigen.rows.length; i++) {
        var row = tablaBorrarOrigen.rows[i];
        resultadoBorraOrigen += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",0,'''',''" + row.cells[1].childNodes[0].value + "''),";
        if (row.cells[1].childNodes[0].value == 'cadperper') {
            tipoModificacionIndicadores.oricadper = row.cells[1].childNodes[1].value;
        } else if (row.cells[1].childNodes[0].value == 'caddedper') {
            tipoModificacionIndicadores.oricadded = row.cells[1].childNodes[1].value;
        } else if (row.cells[1].childNodes[0].value == 'cadaportper') {
            tipoModificacionIndicadores.oricadapo = row.cells[1].childNodes[1].value;
        }
    }
    resultadoCompleto += (resultadoBorraOrigen != '') ? resultadoBorraOrigen : "";
    var tablaCapADes = document.getElementById('tblCapturaADestino');
    var resultadoCapADes = "";
    for (var i = 1; i < tablaCapADes.rows.length; i++) {
        var row = tablaCapADes.rows[i];
        resultadoCapADes += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",2,''" + row.cells[1].childNodes[0].value + "'',''" + row.cells[2].childNodes[0].value + "''),";
    }
    resultadoCompleto += (resultadoCapADes != '') ? resultadoCapADes : "";
    var tablaOriADes = document.getElementById('tblOrigenADestino');
    var resultadoOriADes = "";
    for (var i = 1; i < tablaOriADes.rows.length; i++) {
        var row = tablaOriADes.rows[i];
        resultadoOriADes += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",3,''" + row.cells[1].childNodes[0].value + "'',''" + row.cells[1].childNodes[0].value + "''),";

        if (row.cells[1].childNodes[0].value == 'cadperper') {
            tipoModificacionIndicadores.descadper = row.cells[1].childNodes[1].value;
        } else if (row.cells[1].childNodes[0].value == 'caddedper') {
            tipoModificacionIndicadores.descadded = row.cells[1].childNodes[1].value;
        } else if (row.cells[1].childNodes[0].value == 'cadaportper') {
            tipoModificacionIndicadores.descadapo = row.cells[1].childNodes[1].value;
        }
    }
    resultadoCompleto += (resultadoOriADes != '') ? resultadoOriADes : "";
    var tablaCapAEmp = document.getElementById('tblCapturaAEmpleado');
    var resultadoCapAEmp = "";
    for (var i = 1; i < tablaCapAEmp.rows.length; i++) {
        var row = tablaCapAEmp.rows[i];
        resultadoCapAEmp += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",4,''" + row.cells[1].childNodes[0].value + "'',''" + row.cells[2].childNodes[0].value + "''),";
    }
    resultadoCompleto += (resultadoCapAEmp != '') ? resultadoCapAEmp : "";
    var tablaBorrarEmpleado = document.getElementById('tblBorrarDeEmpleado');
    var resultadoBorrarEmp = "";
    for (var i = 1; i < tablaBorrarEmpleado.rows.length; i++) {
        var row = tablaBorrarEmpleado.rows[i];
        resultadoBorrarEmp += "( ''" + claveIndiceAfectacion + "''," + row.cells[0].innerHTML + ",7,''" + row.cells[1].childNodes[0].value + "'',''" + row.cells[2].childNodes[0].value + "''),";
    }
    resultadoCompleto += (resultadoBorrarEmp != '') ? resultadoBorrarEmp : "";
    return resultadoCompleto.substring(0, resultadoCompleto.length - 1);
}
function actualizarModificadoresDeIndicadores() {
    //Borrar de plaza origen
    var tablaBorrarOrigen = document.getElementById('tblBorrarOrigen');
    var resultadoBorraOrigen = "";
    for (var i = 1; i < tablaBorrarOrigen.rows.length; i++) {
        var row = tablaBorrarOrigen.rows[i];
        if (row.cells[1].childNodes[0].value == 'cadperper') {
            tipoModificacionIndicadores.oricadper = row.cells[1].childNodes[1].value;
        }
        if (row.cells[1].childNodes[0].value == 'caddedper') {
            tipoModificacionIndicadores.oricadded = row.cells[1].childNodes[1].value;
        }
        if (row.cells[1].childNodes[0].value == 'cadaportper') {
            tipoModificacionIndicadores.oricadapo = row.cells[1].childNodes[1].value;
        }
    }

    //Elementos de plaza origen a destino
    var tablaBorrarOrigen = document.getElementById('tblOrigenADestino');
    var resultadoBorraOrigen = "";
    for (var i = 1; i < tablaBorrarOrigen.rows.length; i++) {
        var row = tablaBorrarOrigen.rows[i];
        if (row.cells[1].childNodes[0].value == 'cadperper') {
            tipoModificacionIndicadores.descadper = row.cells[1].childNodes[1].value;
        }
        if (row.cells[1].childNodes[0].value == 'caddedper') {
            tipoModificacionIndicadores.descadded = row.cells[1].childNodes[1].value;
        }
        if (row.cells[1].childNodes[0].value == 'cadaportper') {
            tipoModificacionIndicadores.descadapo = row.cells[1].childNodes[1].value;
        }
    }
}

function separarChecksDelIndice() {
    var res = "";
    res += ((document.getElementById('chkRetroactivo').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkResponsabilidad').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkDiferencias').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkDiasDeAgui').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkBajas').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkEliconceper').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkActuConceper').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkEliPension').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkActuConceper2').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkBajaFonac').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkActualizarFonac').checked) ? "on" : "") + "|";
    res += ((document.getElementById('chkCancelarPago').checked) ? "on" : "") + "|";
    return res;
}

function GUARDAR_CAMPOS_INDICE() {
    var che = checarCamposRepetidos();
    if (che == '') {
        var resCampos = sacarCamposAGrabar();
        actualizarModificadoresDeIndicadores();
        var indicamp = indicadoresPorIndice.indoriper + "|" + indicadoresPorIndice.indorided + "|" + indicadoresPorIndice.indoriapo + "|" + indicadoresPorIndice.inddesper + "|" + indicadoresPorIndice.inddesded + "|" + indicadoresPorIndice.inddesapo
        var modificadores = tipoModificacionIndicadores.oricadper + "|" + tipoModificacionIndicadores.oricadded + "|" + tipoModificacionIndicadores.oricadapo + "|" + tipoModificacionIndicadores.descadper + "|" + tipoModificacionIndicadores.descadded + "|" + tipoModificacionIndicadores.descadapo;
        var checksDelIndice = separarChecksDelIndice();
        var parametros = {};
        parametros.resCampos = resCampos;
        parametros.indicamp = indicamp;
        parametros.modificadores = modificadores;
        parametros.checksDelIndice = checksDelIndice;
        parametros.cveInd = claveIndiceAfectacion;
        $.ajax({
            type: "POST",
            url: "utileriaDeIndices.aspx/grabarIndiceDeAfectacion",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                //alert(JSON.parse(data.d)[0].nombre);
                $.messager.alert('Información', JSON.parse(data.d)[0].nombre, 'info');
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    } else {
        alert(che);
    }
}




