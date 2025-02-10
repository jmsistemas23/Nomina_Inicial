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

var cveind,strindice;

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

    $('#btnNuevo').bind('click', function () { NUEVO(); });
    $('#btnRegresarCap').bind('click', function () { REGRESAR_CAPTURA(); });
    $('#btnGuardarCap').bind('click', function () { GUARDAR_CAPTURA(); });
    $('#btnLimpiarInd').bind('click', function () { LIMPIAR_CAPTURA(); });


    $('#btnfiltrar').bind('click', function () { FILTRO_DOC("#dg", "#cbocam", "#cbocon", "#txtval"); });
    
    $('#btnEditar').bind('click', function () { EDITAR(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR(); });
    $('#btnDiseño').bind('click', function () { DISEÑO(); });
    
    $('#btnRegresarInd').bind('click', function () { REGRESAR_INDICES(); });
    $('#btnGuardarInd').bind('click', function () { GUARDAR_CAMPOS_INDICE(); });    
    $('#btnLimpiarInd').bind('click', function () { LIMPIAR_INDICES(); });


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

function DISEÑO_DOC(dgcontrol, strtabla) {
    var parametros = {};
    parametros.strtabla = strtabla;

    $.ajax({
        type: "POST",
        url: "IndicesMP.aspx/ConfiguracionGrid",
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
                cveind=rows[fields[0]];
                document.getElementById('lblnivel').innerHTML = "Indice: " + rows[fields[0]] + "-" + rows[fields[1]];
                strindice= rows[fields[0]] + "-" + rows[fields[1]];
                $('#txtclave').textbox('setValue', rows[fields[0]]);
                $('#txtdescripcion').textbox('setValue', rows[fields[1]]);
                $('#txtorden').textbox('setValue', rows[fields[2]]);

                $('#btnEditar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');
                $('#btnDiseño').linkbutton('enable');

                claveIndiceAfectacion = rows[fields[0]];
                //tipoModificacionIndicadores = listarTipoDeModificacionDeIndicadores(rows[fields[0]]);
                //indicadoresPorIndice = listarIndicadoresPorIndice(rows[fields[0]]);
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
    cveind = "0";
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
    $.messager.confirm('Confirm', 'Seguro de eliminar el índice ' + cveind, function (r) {
        if (r) {
            GRABAR_DATOS_INDICE();
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
    //$('#dmenu').hide();
    //$('#ddiseño').show();

    //window.location = 'Diseño_indicesMP.aspx?indice=' + cveind + '&strindice=' + strindice;
    IR_PAGINA('Diseño_indicesMP.aspx', 'indice=' + cveind + '&strindice=' + strindice);
    

    //cargarColumnasDelTipo1(false);

    //cargarColumnasDelTipo0(false);

    //cargarColumnasDelTipo2(false);

    //cargarColumnasDelTipo3(false);

    //cargarColumnasDelTipo4(false);

    //cargarColumnasDelTipo7(false);

    //var row = $('#dg').datagrid('getSelected');
    //if ($('#dg').datagrid('getRowIndex', row) != null)
    //{ $('#dg').datagrid('unselectRow', $('#dg').datagrid('getRowIndex', row)); }
}

function REGRESAR_INDICES() {
    $('#dmenu').show();
    $('#ddiseño').hide();
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    $('#dg').datagrid('unselectAll');
}

function GRABAR_DATOS_INDICE() {
    //var che = checar();
    //if (che == "") {
        var parametros = {};
        parametros.clave = $('#txtclave').textbox("getValue");
        parametros.descripcion = $('#txtdescripcion').textbox("getValue").toUpperCase();;
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
                var dat = JSON.parse(data.d);
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
    //} else {
    //    $.messager.alert('Error', che, 'error');
    //}
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

function LIMPIAR_CAPTURA()
{
    $('#txtclave').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#txtorden').numberbox('setValue', '');

}

function GUARDAR_CAPTURA() {
    GRABAR_DATOS_INDICE();
    REGRESAR_CAPTURA();
}