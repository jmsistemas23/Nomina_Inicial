var codnivel = "";
var secretaria = "";
var checkedRows = [];
var checkedRowsInd = [];
var tipocosteo = "";
var strconplaza = "";
var cadena = "";
var obj = [];
var lstvalores = [];
var cargado = false;
$(document).ready(function () {
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = '' }
    if (filtro == "") {
        localStorage.setItem('Filtros', null);   
    }

        $('#btnRegresar').bind('click', function () {
            IR_PAGINA("Menu_Costeo.aspx", "");
        });
       

    var txtsec = $('#txtcvesecretaria');
           txtsec.textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                listarSecretarias(txtsec[0].value)
                $('#modalBuscarSecretarias').window('open');
            }
        });
    var txtcvesecretaria = $('#txtBusquedaSecretarias');
        txtcvesecretaria.textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                listarSecretarias(txtcvesecretaria[0].value)
            }
        });

    var txtcveur = $('#txtcveur');
        txtcveur.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if ($('#txtcvesecretaria').textbox('getValue') != "") {
                listarCentroCosto(txtcveur[0].value, $('#txtcvesecretaria').textbox('getValue'));
                $('#modalBuscarCentroCosto').window('open');
            }
            else { $.messager.alert('Error', 'Falta seleccionar la secretaria', 'error'); }
        }
    });
    var txtbcveur = $('#txtBusquedaCentroCosto');
        txtbcveur.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarCentroCosto(txtbcveur[0].value, $('#txtcvesecretaria').textbox('getValue'))
        }
    });

    var txtcvepuesto = $('#txtcvepuesto');
        txtcvepuesto.textbox('textbox').bind('keydown', function (e) {
       if (e.keyCode == 13) {
            listarPuestos(txtcvepuesto[0].value)
            $('#modalBuscarPuesto').window('open');
        }
    });
    var txtbcvepuesto = $('#txtBusquedaPuesto');
        txtbcvepuesto.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarPuestos(txtbcvepuesto[0].value)          
        }
    });

    //var txtcveestpl = $('#txtcveestpl');
    //    txtcveestpl.textbox('textbox').bind('keydown', function (e) {
    //    if (e.keyCode == 13) {
    //        var estpla="";
    //        if ($('#cbocalpla').combobox('getValue') != "x") {estpla= $('#cbocalpla').combobox('getValue');}
    //        listarEstatusPla(txtcveestpl[0].value, estpla);
    //        $('#modalBuscarEstatusPla').window('open');
    //        //}
    //        //else { $.messager.alert('Error', 'Falta el tipo de plaza activa/inactiva', 'error'); }
    //    }
    //});

    var cvenivel = $('#txtnivel');
       cvenivel.textbox('textbox').bind('keydown', function (e) {
           if (e.keyCode == 13) {                             
                   listarNivelSalarial(cvenivel[0].value);
                              
            }
    });
    var txtcvenivel = $('#txtBusquedaForSubNivel');
        txtcvenivel.textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {             
                FILTRAR_NIVEL($("#cbocolumnas").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtBusquedaForSubNivel").textbox('getValue'));
            }
        });
   
   
    LISTA_REGIMENIPES('#cboTipoRegimen', "funsiones.aspx/Lista_RegimenIPES");      
    LISTA_COMBOBOX('#cbovolRegimen', "funsiones.aspx/Lista_RegimenIPESVOL");
    LISTA_REGIMENIPESPORC('#cboPorcRegimen', "funsiones.aspx/Lista_RegimenIPESPORC", "I");

    LISTA_COMBOBOX('#cboquinquenio', "funsiones.aspx/Lista_Quinquenios");

    //AGEGAR_CALPLA('#cbocalpla');

    $('#btnbind').bind('click', function () { AGREGAR_PERCEPCION('#btnbind'); });
    $('#btnlimpiarind').bind('click', function () { $('#txtconceptos').textbox('setValue', ""); });
    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });


    $('#btnadscripcion').bind('click', function () {
        if ($('#txtcvesecretaria').textbox('getValue') != "") {
            MostrarBuscadorDeCentroCosto('#btnadscripcion');
        }
        else { $.messager.alert('Error', 'Falta seleccionar la secretaria', 'error'); }
    });
    $('#btnlimpiarads').bind('click', function () {
        LimpiarValores('ur', '#btnlimpiarads')
    });
    $('#btnbcentrotrabajo').bind('click', function () {
        listarCentroCosto("");
    });

    $('#btnLcentro').bind('click', function () { LIMPIAR_CENTROCOSTO(); });
    $('#btnAcentro').bind('click', function () { ACEPTAR_CENTROCOSTO(); });

    $('#btnpuesto').bind('click', function () {
        MostrarBuscadorDePuesto('#btnpuesto');
    });
    $('#btnlimpiarpuesto').bind('click', function () {
        LimpiarValores('pue', '#btnlimpiarpuesto')
    });
    $('#btnbpuesto').bind('click', function () {
        listarPuestos("");
    });

    $('#btnLpuesto').bind('click', function () { LIMPIAR_PUESTO(); });
    $('#btnApuesto').bind('click', function () { ACEPTAR_PUESTO(); });

    $('#btnsecretaria').bind('click', function () {
        MostrarBuscadorDeSecretarias('#btnsecretaria');
    });
    $('#btnlsecretaria').bind('click', function () {
        LimpiarValores('sec', '#btnlsecretaria')
    });
    $('#btnbSec').bind('click', function () {
        listarSecretarias("");
    });

    $('#btnLsec').bind('click', function () { LIMPIAR_SECRETARIA(); });
    $('#btnAsec').bind('click', function () { ACEPTAR_SECRETARIA(); });

    //$('#btnestatuspl').bind('click', function () {
    //    MostrarBuscadorDeEstatusPla('#btnestatuspl');
    //});
    //$('#btnlimpiarestpl').bind('click', function () {
    //    LimpiarValores('estpla', '#btnlimpiarestpl')
    //});
    //$('#btnbEstpl').bind('click', function () {
    //    listarEstatusPla("");
    //});

    //$('#btnLestpl').bind('click', function () { LIMPIAR_ESTATUSPLAZA(); });
    //$('#btnAestpl').bind('click', function () { ACEPTAR_ESTATUSPLAZA(); });

    $('#btnnivel').bind('click', function () {
        MostrarNivelSalarial('#btnnivel');
    });
    $('#btnbnivel').bind('click', function () {
        FILTRAR_NIVEL($("#cbocolumnas").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtBusquedaForSubNivel").textbox('getValue'));
    });
    
    $('#btnAgregar').bind('click', function () {
        AGREGAR_VALORES_FILTRO();
    });

    $('#dgind').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckInd,
        onUncheck: onUncheckInd,
        onLoadSuccess: onLoadInd,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },    
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $(this).datagrid('checkRow', index);
        }
    });
    $('#dgind').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#btnRresultado').bind('click', function () {
        $('#pcosteo').show();
        $('#presultado').hide();
        LIMPIAR();
    });
    $('#btnLimpiar').bind('click', function () {
        LIMPIAR();
    });
  
    $('#btnBuscar').bind('click', function () {
        CARGAR_PLAZAS('#dgplaza', 100, 200, "");
        CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'numplaza');
        windows("#winemp", 820, 679, false, "Busqueda de Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#pg').pivotgrid({
        data: obj,
        valuePrecision: 0,
        toolbar: [{
            handler: function () {
                $('#pg').pivotgrid('layout');
            }
        }],
        pivot: {
            rows: [],
            columns: [],
            values: [],
            filters: []
        }
    })

    $('#tblBusquedaDeSecretarias').datagrid({
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        autoRowHeight: false,
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
        onClickRow: function (index, row) {
            //$(this).datagrid('checkRow', index);
            $('#txtcvesecretaria').textbox('setValue', row.Clave);
            $('#txtdessecretaria').textbox('setValue', row.Descripcion);            
            $("#modalBuscarSecretarias").window('close');
        }
    });

    $('#tblBusquedaDeCentroCosto').datagrid({
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        autoRowHeight: false,
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
        onClickRow: function (index, row) {
            //$(this).datagrid('checkRow', index);
            $('#txtcveur').textbox('setValue', row.Clave);
            $('#txtdesur').textbox('setValue', row.Descripcion);            
            $("#modalBuscarCentroCosto").window('close');
        }
    });

    $('#tblBusquedaDePuestos').datagrid({
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        autoRowHeight: false,
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
        onClickRow: function (index, row) {
            $(this).datagrid('checkRow', index);
            if (row.Codigo_Nivel.trim() == "") {
                $.messager.alert('Error', "Debe configurar el código de nivel para el puesto", 'error'); return 0;
            } else {
                codnivel = row.Codigo_Nivel;
                $('#txtcvepuesto').textbox('setValue', row.Clave);
                $('#txtdespuesto').textbox('setValue', row.Descripcion);                
                $("#modalBuscarPuesto").window('close');
            }
        }
    });

    $('#dgfiltro').datagrid({      
        onClickRow: function (index, rows) {         
            $('#txtplaza').textbox('setValue', rows.numplaza);
            $('#txtcvesecretaria').textbox('setValue', rows.secretaria);
            $('#txtdessecretaria').textbox('setValue', rows.dessec);
            $('#txtcveur').textbox('setValue', rows.uniresp);
            $('#txtdesur').textbox('setValue', rows.desur);
            $('#txtcvepuesto').textbox('setValue', rows.puesto);
            $('#txtdespuesto').textbox('setValue', rows.despuesto);
            $('#txtnivel').textbox('setValue', rows.cvenivpl);

        $('#cboquinquenio').combobox('setValue', rows.quinquenio);
        $('#cboTipoRegimen').combobox('setValue', rows.tiporegimen);
        $('#cboPorcRegimen').combobox('setValue', rows.porcregimen);
        $('#cbovolRegimen').combobox('setValue', rows.volregimen);
        if (rows.sexo == 'H')
        { document.getElementById('rbhombre').checked = true; }
        if (rows.sexo == 'M')
        { document.getElementById('rbmujer').checked = true; }

        if (rows.hijos == '1')
        { document.getElementById('rbsi').checked = true; }
        else { document.getElementById('rbno').checked = false; }

        $('#txtconceptos').textbox('setValue', rows.conceptos);

        $('#btnEliminar').linkbutton({disabled:false});
    }
    });
          

    PROYECCION();

    CARGAR_FILTROS();

    $('#btnProceso').bind('click', function () {
        PROCESO_COSTEO('#btnProceso');
    });

    $('#btnCubo').bind('click', function () {
        DATOS_DINAMICOS('#btnCubo');
    });
    
    $('#btnEliminar').bind('click', function () { ELIMINAR_CONCEPTOS('#btnEliminar'); LIMPIAR(); });
});


function CARGAR_FILTROS() {  
        var Filtros = JSON.parse(localStorage.getItem('Filtros'));
        if (Filtros != null) {
            cargado = true;
            var dg = $('#dgfiltro');
            dg.datagrid('loadData', { "total": 0, "rows": [] });
            dg.datagrid({
                data: Filtros,
            });

            //localStorage.setItem('Filtros', null);               
        }  
}

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Clave == row.Clave) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Clave == row.Clave) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function onEndEdit(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'importe'
    });
    row.importe = $(ed.target).numberbox('getText');
}
function onLoad(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].clave == row.clave) {
                    dg.datagrid('checkRow', index);
                    row.importe = checkedRows[i].importe;
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}

function onCheckInd(index, row) {
    for (var i = 0; i < checkedRowsInd.length; i++) {
        if (checkedRowsInd[i].Clave == row.Clave) {
            return
        }
    }
    checkedRowsInd.push(row);
}
function onUncheckInd(index, row) {
    for (var i = 0; i < checkedRowsInd.length; i++) {
        if (checkedRowsInd[i].Clave == row.Clave) {
            checkedRowsInd.splice(i, 1);
            return;
        }
    }
}
function onLoadInd(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {            
                for (var i = 0; i < checkedRowsInd.length; i++) {
                    if (checkedRowsInd[i].Clave == row.Clave) {
                        dg.datagrid('checkRow', index);
                        row.importe = checkedRowsInd[i].importe;
                        dg.datagrid('beginEdit', index);
                        dg.datagrid('endEdit', index);
                        return;
                    }                                            
            }
        })();
    }
}


function PROYECCION() {
    tipocosteo = "Proyeccion";   
    $('#pmenucostos').hide();
    $('#btnBuscar').hide();
    document.getElementById('lblplaza').innerHTML = 'Cantidad de Plazas:'

    LIMPIAR();

    document.getElementById('lblmov').innerHTML = "Proyección";

   
    $('#dgfiltro').datagrid('loadData', { "total": 0, "rows": [] });

}

function LIMPIAR() {
   
    $('#cbocalpla').combobox('setValue', 'x');
    $('#txtplaza').textbox('setValue', '1');
    $('#txtcveestpl').textbox('setValue', '');
    $('#txtdesestpl').textbox('setValue', '');
    $('#txtcvesecretaria').textbox('setValue', '');
    $('#txtdessecretaria').textbox('setValue', '');
    $('#txtdesestpl').textbox('setValue', '');
    $('#txtcveur').textbox('setValue', '');
    $('#txtdesur').textbox('setValue', '');
    $('#txtcvepuesto').textbox('setValue', '');
    $('#txtdespuesto').textbox('setValue', '');
    $('#txtconceptos').textbox('setValue', '');

    $('#txtnivel').textbox('setValue', '');
    
        $('#cboTipoRegimen').combobox('setValue', 'I');
        document.getElementById('rbhombre').checked = false;
        document.getElementById('rbmujer').checked = true;
        document.getElementById('rbno').checked = false;
        document.getElementById('rbsi').checked = true;
}

function AGEGAR_CALPLA(objcbo) {
    var Campos = [];
    var obj;
    obj = {};
    obj["Clave"] = "x";
    obj["Descripcion"] = "Seleccione una Opción";
    obj["selected"] = true;
    Campos.push(obj);
    obj = {};
    obj["Clave"] = "1";
    obj["Descripcion"] = "Activo";
    obj["selected"] = false;
    Campos.push(obj);
    obj = {};
    obj["Clave"] = "0";
    obj["Descripcion"] = "InActivo";
    obj["selected"] = false;
    Campos.push(obj);
    obj = {};
    obj["Clave"] = "";
    obj["Descripcion"] = "Ambos";
    obj["selected"] = false;
    Campos.push(obj);

    $(objcbo).combobox({
        data: Campos,
        valueField: "Clave",
        textField: "Descripcion",
        editable: false
    });
}

function CARGAR_PLAZAS(dgcontrol, ancho, alto, filtro) {

    var colsort = "numplaza asc";
    $(dgcontrol).datagrid({
        url: "Listar_Plazas.aspx?busqueda=" + filtro + "&colord=" + colsort,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "px",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            var rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                $('#txtplaza').textbox('setValue', rows.numplaza);
                $("#winemp").window('close');
            }
        },
        onSortColumn: function (sort, order) {
            colsort = "";
            colsort += sort + ' ' + order + "|";
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            strconplaza = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { strconplaza = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strconplaza = " "; }
    CARGAR_PLAZAS('#dgplaza', 100, 200, strconplaza);
}

function FILTRAR_NIVEL(objcam, objcon, objval) {
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            strcondicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { strcondicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strcondicion = " "; }
    listarNivelSalarial(strcondicion);
}


function LimpiarValores(tipo) {
    if (tipo == 'pue') {
        $('#txtcvepuesto').textbox('setValue', '');
        $('#txtdespuesto').textbox('setValue', '');
    }
    if (tipo == 'ur') {
        $('#txtcveur').textbox('setValue', '');
        $('#txtdesur').textbox('setValue', '');
    }
    if (tipo == 'estpla') {
        $('#txtcveestpl').textbox('setValue', '');
        $('#txtdesestpl').textbox('setValue', '');
    }
    if (tipo == 'sec') {
        $('#txtcvesecretaria').textbox('setValue', '');
        $('#txtdessecretaria').textbox('setValue', '');
    }
}


function MostrarBuscadorDeEstatusPla(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var estpla = "";
        if ($('#cbocalpla').combobox('getValue') != "x") {estpla=$('#cbocalpla').combobox('getValue');}
            var text = $('#txtBusquedaEstatusPla');
            text.textbox('clear').textbox('textbox').focus();
            listarEstatusPla(text[0].value, estpla);
            $('#modalBuscarEstatusPla').window('open');      
    }
}
function listarEstatusPla(busqueda, filtro) {
    if (busqueda != "") { $('#txtBusquedaEstatusPla').textbox('setValue', busqueda); }
    else { busqueda = $('#txtBusquedaEstatusPla').textbox('getValue'); }

    if (busqueda == undefined) { busqueda = ""; }

    $('#tblBusquedaDeEstatusPla').datagrid({
        url: 'listarEstatusPlaza.aspx?busqueda=' + busqueda + '&filtro=' + filtro,
        // pagination: false,
        // enableFilter: true,
        // rownumbers: true,
        // singleSelect: true,
        // striped: true,
        //// pageSize: 20,
        // showPageList: false,        
    });
}

function MostrarBuscadorDeSecretarias(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var text = $('#txtBusquedaSecretarias');
        text.textbox('clear').textbox('textbox').focus();
        listarSecretarias('');
        $('#modalBuscarSecretarias').window('open');
    }
}
function listarSecretarias(busqueda) {
    if (busqueda != "") { $('#txtBusquedaSecretarias').textbox('setValue', busqueda); }
    else { busqueda = $('#txtBusquedaSecretarias').textbox('getValue'); }

    if (busqueda == undefined) { busqueda = ""; }

    $('#tblBusquedaDeSecretarias').datagrid({
        url: 'listarSecretarias.aspx?busqueda=' + busqueda,
    });
}

function MostrarBuscadorDeCentroCosto(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var text = $('#txtBusquedaCentroCosto');
        text.textbox('clear').textbox('textbox').focus();
        listarCentroCosto('', $('#txtcvesecretaria').textbox('getValue'));
        $('#modalBuscarCentroCosto').window('open');
    }
}
function listarCentroCosto(busqueda, secretaria) {
    if (busqueda != "") { $('#txtBusquedaCentroCosto').textbox('setValue', busqueda); }
    else { busqueda = $('#txtBusquedaCentroCosto').textbox('getValue'); }

    if (busqueda == undefined) { busqueda = ""; }

    $('#tblBusquedaDeCentroCosto').datagrid({
        url: 'listarUnidadResponsable.aspx?busqueda=' + busqueda + '&filtro=' + secretaria,      
    });
}

function MostrarBuscadorDePuesto(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var text = $('#txtBusquedaPuesto');
        text.textbox('clear').textbox('textbox').focus();
        listarPuestos("");
        $('#modalBuscarPuesto').window('open');
    }
}
function listarPuestos(filtro) {
    if (filtro != "") { $('#txtBusquedaPuesto').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaPuesto').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

    $('#tblBusquedaDePuestos').datagrid({
        url: 'listarPuestos.aspx?busqueda=' + filtro,
        //onClickRow: function () {
        //    var row = $('#tblBusquedaDePuestos').datagrid('getSelected');
        //    if (row.Codigo_Nivel.trim() == "") {
        //        $.messager.alert('Error', "Debe configurar el código de nivel para el puesto", 'error'); return 0;
        //    } else {
        //        //$('#txtcvepuesto').textbox('setValue', row.Clave);
        //        //$('#txtdespuesto').textbox('setValue', row.Descripcion);
        //        codnivel = row.Codigo_Nivel;
        //        //$('#modalBuscarPuesto').window('close');
        //        //$('#divTableDatosDePuesto').toggle(300);
        //    }
        //}
    });
}

function MostrarNivelSalarial(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if ($('#txtcvepuesto').textbox("getValue") == '') { $.messager.alert('Error', 'Falta seleccionar le puesto', 'error'); return 0 }
        else
        {
            var text = $('#txtBusquedaForSubNivel');
            text.textbox('clear').textbox('textbox').focus();

            listarNivelSalarial('');
        }
    }
}
function listarNivelSalarial(filtro) {
    if ($('#txtcvepuesto').textbox("getValue") == '') { $.messager.alert('Error', 'Falta seleccionar le puesto', 'error'); return 0 }
    else
    {
        //if (filtro != "") { $('#txtBusquedaForSubNivel').textbox('setValue', filtro); }
        //else { filtro = $('#txtBusquedaForSubNivel').textbox('getValue'); }

        //if (filtro == undefined) { filtro = ""; }

        var cols = $('#hidColumnasDeSubNivel').val();
        $('#tblBusquedaDeForSubNivel').datagrid({
            url: 'listarForSubNivel.aspx?busqueda=' + filtro + '&nivel=' + codnivel + '&columnas=' + cols,
            pagination: true,
            enableFilter: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            pageSize: 20,
            showPageList: false,
            beforeSend: function () {
                $('#loading').show();
            },
            onClickRow: function () {
                var row = $('#tblBusquedaDeForSubNivel').datagrid('getSelected');
                $('#txtnivel').textbox("setValue", row.cveniv);
                $('#modalBuscarSubNivel').window('close');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
        CARGAR_CAMPOSBUSQUEDA('#tblBusquedaDeForSubNivel', '#cbocolumnas');
        $('#modalBuscarSubNivel').window('open');
    }    
}

function LISTA_REGIMENIPES(objddl, url) {
    //var parametros = {};
    //parametros.centcosto = cvecentro,
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                editable: false,
                onSelect: function (rec) {
                    if (rec.clave != "x") {
                        LISTA_REGIMENIPESPORC('#cboPorcRegimen', "funsiones.aspx/Lista_RegimenIPESPORC", rec.clave);

                        if (rec.clave == 'I') {
                            $('#cbovolRegimen').combobox({ readonly: false });
                        }
                        else { $('#cbovolRegimen').combobox({ readonly: true }); }
                    }
                    else {
                        $('#cboPorcRegimen').combobox('setValue', 'x');
                    }
                }
            });
            $(objddl).combobox('setValue', 'I')

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });

}

function LISTA_REGIMENIPESPORC(objddl, url, filtro) {
    var parametros = {};
    parametros.filtro = filtro,
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                editable: false
            });
            if (filtro == "I")
            { $(objddl).combobox('setValue', '0.1062500'); }
            if (filtro == "N")
            { $(objddl).combobox('setValue', '0.0000000'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LISTA_COMBOBOX(objddl, url) {
    //var parametros = {};
    //parametros.centcosto = cvecentro,
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                editable: false,
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

function AGREGAR_PERCEPCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        CARGAR_IND('#dgind', 'P', '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 600, 660, false, 'Percepciones');
    }
}

function CARGAR_IND(dgcontrol, strtipo, condicion) {
    $(dgcontrol).datagrid({
        url: "ListaIndicadores.aspx?tipotbl='" + strtipo + "'&busqueda=" + condicion
    });        
    if ($('#txtconceptos').textbox('getValue') != "")
    {
        var dg = $('#dgind');
        var rows = dg.datagrid('getRows');
        var conceptos = $('#txtconceptos').textbox('getValue').split(';');
        for (var j = 0; j < conceptos.length; j++) {
            var importe = conceptos[j].split('/,');
            for (var i = 0; i < rows.length; i++) {
                if (importe[0] == rows[i].Clave) {
                    dg.datagrid('checkRow', i);
                    rows[i].importe = importe[1];
                    dg.datagrid('beginEdit', i);
                    dg.datagrid('endEdit', i);
                    break;
                }
            }
        }
    }
}

function LIMPIAR_IND_SEL() {
    CARGAR_IND('#dgind', "P", '');
    $('#txtvalorind').textbox('setValue', '');
    $('#txtvalorind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');

    tipoind = "";
    checkedRows = [];
}
function ACEPTAR_IND_SEL() {
    var selecciona = "";
    $('#dgind').datagrid('acceptChanges');
    for (var i = 0; i < checkedRowsInd.length; i++) {
        selecciona += checkedRowsInd[i].Clave + "/," + checkedRowsInd[i].importe + ";";
    }
    $('#txtconceptos').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
    checkedRowsInd = [];
    $("#wind").window('close');
    $('#btnGuardarCap').linkbutton({ disabled: false })
}

function LIMPIAR_SECRETARIA() {
    listarSecretarias('');
    $('#txtBusquedaSecretarias').textbox('setValue', '');
    $('#txtBusquedaSecretarias').textbox('clear').textbox('textbox').focus();
    $('#tblBusquedaDeSecretarias').datagrid('uncheckAll');
    checkedRows = [];
}
function ACEPTAR_SECRETARIA() {
    var selecciona = "";
    var descripcion = "";
    $('#tblBusquedaDeSecretarias').datagrid('acceptChanges');
    for (var i = 0; i < checkedRows.length; i++) {
        selecciona += checkedRows[i].Clave + ",";
        descripcion += checkedRows[i].Descripcion + ",";
    }
    $('#txtcvesecretaria').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
    $('#txtdessecretaria').textbox('setValue', descripcion.substring(0, descripcion.length - 1));
    checkedRows = [];
    $("#modalBuscarSecretarias").window('close');
}

function LIMPIAR_CENTROCOSTO() {
    listarSecretarias('');
    $('#txtBusquedaCentroCosto').textbox('setValue', '');
    $('#txtBusquedaCentroCosto').textbox('clear').textbox('textbox').focus();
    $('#tblBusquedaDeCentroCosto').datagrid('uncheckAll');
    checkedRows = [];
}
function ACEPTAR_CENTROCOSTO() {
    var selecciona = "";
    var descripcion = "";
    $('#tblBusquedaDeCentroCosto').datagrid('acceptChanges');
    for (var i = 0; i < checkedRows.length; i++) {
        selecciona += checkedRows[i].Clave + ",";
        descripcion += checkedRows[i].Descripcion + ",";
    }
    $('#txtcveur').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
    $('#txtdesur').textbox('setValue', descripcion.substring(0, descripcion.length - 1));
    checkedRows = [];
    $("#modalBuscarCentroCosto").window('close');
}

function LIMPIAR_PUESTO() {
    listarSecretarias('');
    $('#txtBusquedaPuesto').textbox('setValue', '');
    $('#txtBusquedaPuesto').textbox('clear').textbox('textbox').focus();
    $('#tblBusquedaDePuestos').datagrid('uncheckAll');
    checkedRows = [];
}
function ACEPTAR_PUESTO() {
    var selecciona = "";
    var descripcion = "";
    $('#tblBusquedaDePuestos').datagrid('acceptChanges');
    for (var i = 0; i < checkedRows.length; i++) {
        selecciona += checkedRows[i].Clave + ",";
        descripcion += checkedRows[i].Descripcion + ",";
    }
    $('#txtcvepuesto').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
    $('#txtdespuesto').textbox('setValue', descripcion.substring(0, descripcion.length - 1));
    checkedRows = [];
    $("#modalBuscarPuesto").window('close');
}

function LIMPIAR_ESTATUSPLAZA() {
    listarSecretarias('');
    $('#txtBusquedaEstatusPla').textbox('setValue', '');
    $('#txtBusquedaEstatusPla').textbox('clear').textbox('textbox').focus();
    $('#tblBusquedaDeEstatusPla').datagrid('uncheckAll');
    checkedRows = [];
}
function ACEPTAR_ESTATUSPLAZA() {
    var selecciona = "";
    var descripcion = "";
    $('#tblBusquedaDeEstatusPla').datagrid('acceptChanges');
    for (var i = 0; i < checkedRows.length; i++) {
        selecciona += checkedRows[i].Clave + ",";
        descripcion += checkedRows[i].Descripcion + ",";
    }
    $('#txtcveestpl').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
    $('#txtdesestpl').textbox('setValue', descripcion.substring(0, descripcion.length - 1));
    checkedRows = [];
    $("#modalBuscarEstatusPla").window('close');
}

function CARGAR_DG(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: '',
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        columns: [[
            { field: 'secretaria', title: 'Secretaría', width: 100, align: 'center', halign: 'center' , formatter: function (value, row, index) { return '<span title=\"' + row.dessec + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'uniresp', title: 'Uni. Responsable', width: 150, align: 'center', halign: 'center' , formatter: function (value, row, index) { return '<span title=\"' + row.desuniresp + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'actinac', title: 'Activos/Inactivos', width: 150, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desactivo + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'estatuspl', title: 'Estatus Pla', width: 100, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desestpl + '\" class=\"easyui-tooltip\">' + value + '</span>' } },            
            { field: 'puesto', title: 'Puesto', width: 80, align: 'center', halign: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despue + '\" class=\"easyui-tooltip\">' + value + '</span>' } },          
            { field: 'cvenivpl', title: 'Nivel', width: 80, align: 'center', halign: 'center' },
            { field: 'dessec', title: 'Nivel', width: 80, align: 'center', halign: 'center', hidden: true },
            { field: 'desuniresp', title: 'Nivel', width: 80, align: 'center', halign: 'center', hidden: true },
            { field: 'desactivo', title: 'Nivel', width: 80, align: 'center', halign: 'center', hidden: true },
            { field: 'desestpl', title: 'Nivel', width: 80, align: 'center', halign: 'center', hidden: true },
            { field: 'despue', title: 'Nivel', width: 80, align: 'center', halign: 'center', hidden: true },
        ]],
        beforeSend: function () {
            $('#loading').show();
        },        
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function AGREGAR_VALORES_FILTRO() {      
    var secretaria = "", plaza = "", actinac = "", estpl = "", uniresp = "", puesto = "", nivsal = "", desestpl = "", despuesto = "", dessec = "", desunires = "";
    var quinquenio = "", hijos = "", sexo = "", tiporegimen = "", porcregimen = "",volregimen="",conceptos="";
    
     if ($('#txtplaza').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la cantidad de plazas', 'error'); return 0; }
        else           
            if ($('#txtcvesecretaria').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la secretaria', 'error'); return 0; }
                else
                    if ($('#txtcveur').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el centro de trabajo', 'error'); return 0; }
                    else
                        if ($('#txtcvepuesto').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el puesto', 'error'); return 0; }
                        else
                            if ($('#txtnivel').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el nivel salarial', 'error'); return 0; }
                            else 
                                if (($('#cboTipoRegimen').combobox('getValue') == 'T') && ($('#cboPorcRegimen').combobox('getValue') == "x")) { $.messager.alert('Error', "Falta seleccionar el porcentage del regimen", 'error'); return 0; }                              
                                else {
                                    plaza = $('#txtplaza').textbox('getValue');
                                    secretaria = $('#txtcvesecretaria').textbox('getValue').trim();
                                    uniresp = $('#txtcveur').textbox('getValue').trim();
                                    puesto = $('#txtcvepuesto').textbox('getValue').trim();
                                    nivsal = $('#txtnivel').textbox('getValue').trim();

                                    if ($('#cboquinquenio').combobox('getValue') != "x") { quinquenio = $('#cboquinquenio').combobox('getValue').trim(); }
                                    if ($('#rbhombre').is(":checked") == true) { sexo = 'M'; }
                                    if ($('#rbmujer').is(":checked") == true) { sexo = 'F'; }

                                    if ($('#rbno').is(":checked") == true) { hijos += '0'; }
                                    if ($('#rbsi').is(":checked") == true) { hijos += '1'; }

                                    if ($('#cboTipoRegimen').combobox('getValue') != "x") { tiporegimen = $('#cboTipoRegimen').combobox('getValue'); }
                                    if ($('#cboPorcRegimen').combobox('getValue') != "x") { porcregimen = $('#cboPorcRegimen').combobox('getValue'); }
                                    if ($('#cbovolRegimen').combobox('getValue') != "x") { volregimen = $('#cbovolRegimen').combobox('getValue'); }
                                    else { volregimen = '0.0000000'; }

                                    if ($('#txtconceptos').textbox('getValue') != "") { conceptos = $('#txtconceptos').textbox('getValue'); }
                                   
                                    var dg = $('#dgfiltro');
                                    var total = dg.datagrid('getData').total;
                                    if (total > 0) {
                                        inicial = dg.datagrid('getData').total;
                                        total = total + 1;
                                    }
                                    else {
                                        dg.datagrid('loadData', { "total": 0, "rows": [] });
                                        inicial = 0; total = 1;
                                    }
                                    var Filtros = {};
                                    for (var i = inicial; i < total; i++) {                                           
                                        Filtros.canceladas = 0;
                                        Filtros.numplaza = plaza;
                                        Filtros.secretaria = secretaria;
                                        Filtros.dessec = $('#txtdessecretaria').textbox('getValue');
                                        Filtros.uniresp = uniresp;
                                        Filtros.desur = $('#txtdesur').textbox('getValue');
                                        Filtros.puesto = puesto;
                                        Filtros.despuesto = $('#txtdespuesto').textbox('getValue');
                                        Filtros.cvenivpl = nivsal;
                                        Filtros.quinquenio = quinquenio;
                                        Filtros.sexo = sexo;
                                        Filtros.hijos = hijos;
                                        Filtros.tiporegimen = tiporegimen;
                                        Filtros.porcregimen = porcregimen;
                                        Filtros.volregimen = volregimen;
                                        Filtros.conceptos = conceptos;
                                    }

                                    var fila = $('#dgfiltro').datagrid('getSelected');                                  
                                    if (fila == null) {                                       
                                            lstvalores.push(Filtros);                                        
                                    }
                                    else {                                       
                                            var rowIndex = $("#dgfiltro").datagrid("getRowIndex", fila);
                                            lstvalores[rowIndex] = Filtros;
                                    }
                                 
                                    dg.datagrid('loadData', { "total": 0, "rows": [] });
                                    dg.datagrid({
                                        data: lstvalores,
                                    });
                                    localStorage.setItem('Filtros', JSON.stringify(lstvalores));

                                    $('#btnProceso').linkbutton({ disabled: false });
                                    $('#btnCubo').linkbutton({ disabled: false });
                                    $('#btnEliminar').linkbutton({ disabled: false });
                                }
                           
}


function PROCESO_COSTEO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
      
            dg = $('#dgfiltro');
            for (var i = 0; i < dg.datagrid('getData').total; i++) {
               
                cadena += 'cantidad:' + dg.datagrid('getRows')[i].numplaza + "|cveadspl:" + dg.datagrid('getRows')[i].uniresp + "|cvepuepl:" + dg.datagrid('getRows')[i].puesto +
                    "|cvenivpl:" + dg.datagrid('getRows')[i].cvenivpl + "|quinque:" + dg.datagrid('getRows')[i].quinquenio + "|sexemp:" + dg.datagrid('getRows')[i].sexo + "|padomad:" + dg.datagrid('getRows')[i].hijos +
                    "|cveregret:" + dg.datagrid('getRows')[i].tiporegimen + "|porcret:" + dg.datagrid('getRows')[i].porcregimen + "|porcretvol:" + dg.datagrid('getRows')[i].volregimen + "|cp:" + dg.datagrid('getRows')[i].conceptos + "@"              
            }             
          

            IR_PAGINA("Consulta_Grid.aspx", "tipo=Proyeccion&filtro=" + cadena.substring(0, cadena.length - 1) + "&conceptos=&canceladas=0" + "&btntipo=");
        
        //var parametros = {};
        //parametros.tipocosto = 'Proyeccion';
        //parametros.filtro = cadena.substring(0,cadena.length-1),
        //$.ajax({
        //    type: "POST",
        //    url: "funsiones.aspx/proceso_costeo",
        //    dataType: "json",
        //    contentType: "application/json; charset=utf-8",
        //    data: JSON.stringify(parametros),
        //    cache:"false",
        //    beforeSend: function () {
        //        $('#loading').show();
        //    },
        //    success: function (data) {
        //        if (data.d[0] == "1") {                               
        //            obj = $.parseJSON(data.d[1]);

        //            $('#dgcosto').datagrid({
        //                data: obj,
        //                pagination: false,
        //                enableFilter: false,
        //                rownumbers: true,
        //                singleSelect: true,
        //                autoRowHeight: false,
        //                striped: true,
        //                pageSize:50                
        //            });
        //        }
        //        else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
        //    },
        //    error: function (err) {
        //        $('#loading').hide(100);
        //        $.messager.alert('Error', err.statusText, 'error');
        //    },
        //    complete: function ()
        //    { $('#loading').hide(100); }
        //}).fail(function (jqXHR, textStatus, errorThrown) {      
        //    if (jqXHR.status === 0) {

        //        alert('Not connect: Verify Network.');

        //    } else if (jqXHR.status == 404) {

        //        alert('Requested page not found [404]');

        //    } else if (jqXHR.status == 500) {

        //        alert('Internal Server Error [500].');

        //    } else if (textStatus === 'parsererror') {

        //        alert('Requested JSON parse failed.');

        //    } else if (textStatus === 'timeout') {

        //        alert('Time out error.');

        //    } else if (textStatus === 'abort') {

        //        alert('Ajax request aborted.');

        //    } else {

        //        alert('Uncaught Error: ' + jqXHR.responseText);

        //    }
        //});

        //$('#loading').show();       
    }
}

function DATOS_DINAMICOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        dg = $('#dgfiltro');
        for (var i = 0; i < dg.datagrid('getData').total; i++) {
            cadena += 'cantidad:' + dg.datagrid('getRows')[i].numplaza + "|cveadspl:" + dg.datagrid('getRows')[i].uniresp + "|cvepuepl:" + dg.datagrid('getRows')[i].puesto +
                "|cvenivpl:" + dg.datagrid('getRows')[i].cvenivpl + "|quinque:" + dg.datagrid('getRows')[i].quinquenio + "|sexemp:" + dg.datagrid('getRows')[i].sexo + "|padomad:" + dg.datagrid('getRows')[i].hijos +
                "|cveregret:" + dg.datagrid('getRows')[i].tiporegimen + "|porcret:" + dg.datagrid('getRows')[i].porcregimen + "|porcretvol:" + dg.datagrid('getRows')[i].volregimen + "|cp:" + dg.datagrid('getRows')[i].conceptos + "@"
        }
        
        IR_PAGINA("Consulta_Pivot.aspx", "tipo=Proyeccion&filtro=" + cadena.substring(0, cadena.length - 1) + "&conceptos=&canceladas=0" + "&btntipo=");
    }
}



function ELIMINAR_CONCEPTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var fila = $('#dgfiltro').datagrid('getSelected');
        if (fila) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la proyección seleccionada', function (r) {
                if (r) {
                    var rowIndex = $("#dgfiltro").datagrid("getRowIndex", fila);
                    $('#dgfiltro').datagrid('deleteRow', rowIndex);

                    var rows = $('#dgfiltro').datagrid('getRows');
                    if (rows.length == 0) { $('#btnEliminar').linkbutton({ disabled: true }); }
                }
            });
        }
    }
}




