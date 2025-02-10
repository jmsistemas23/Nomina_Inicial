var codnivel = "";
var secretaria = "";
var checkedRows = [];
var tipocosteo = "Costo";
var strconplaza = "";
var obj = [];
var checkedRowsInd = [];
var btntipo = "0";
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
    if ($_GET('btntipo') != null) {
        btntipo = $_GET('btntipo');
    } else { btntipo = '0' }
   

    $('#btnRegresar').bind('click', function () {
        IR_PAGINA("Menu_Costeo.aspx", "");
    });

   // $('#chkplazas').attr("disabled", true);

    var txtcvesecretaria = $('#txtcvesecretaria');
    txtcvesecretaria.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarSecretarias(txtcvesecretaria[0].value)
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
           // if ($('#txtcvesecretaria').textbox('getValue') != "") {
                listarCentroCosto(txtcveur[0].value, $('#txtcvesecretaria').textbox('getValue'));
                $('#modalBuscarCentroCosto').window('open');
            //}
            //else { $.messager.alert('Error', 'Falta seleccionar la secretaria', 'error'); }
        }
    });
    var txtcveur = $('#txtBusquedaCentroCosto');
    txtcveur.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarCentroCosto(txtcveur[0].value, $('#txtcvesecretaria').textbox('getValue'))
        }
    });

    var txtcvepuesto = $('#txtcvepuesto');
    txtcvepuesto.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarPuestos(txtcvepuesto[0].value)
            $('#modalBuscarPuesto').window('open');
        }
    });
    var txtcvepuesto = $('#txtBusquedaPuesto');
    txtcvepuesto.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarPuestos(txtcvepuesto[0].value)
        }
    });

    var txtcveestpl = $('#txtcveestpl');
    txtcveestpl.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            //if ($('#cbocalpla').combobox('getValue') != "x") {
                listarEstatusPla(txtcveestpl[0].value, $('#cbocalpla').combobox('getValue'));
                $('#modalBuscarEstatuspla').window('open');
            //}
          //else { $.messager.alert('Error', 'Falta el tipo de plaza activa/inactiva', 'error'); }
        }
    });
    var txtcveestpl = $('#txtBusquedaEstatusPla');
    txtcveestpl.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarEstatusPla(txtcveestpl[0].value, $('#cbocalpla').combobox('getValue'));
        }
    });

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

    AGEGAR_CALPLA('#cbocalpla');
    
    $('#btnLPlazas').bind('click', function () { LIMPIAR_PLAZA(); });
    $('#btnAPlazas').bind('click', function () { ACEPTAR_PLAZA(); });

   
    $('#btnadscripcion').bind('click', function () {
        //if ($('#txtcvesecretaria').textbox('getValue') != "") {
            MostrarBuscadorDeCentroCosto('#btnadscripcion');
        //}
        //else { $.messager.alert('Error', 'Falta seleccionar la secretaria', 'error'); }
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

    $('#btnestatuspl').bind('click', function () {
        MostrarBuscadorDeEstatusPla('#btnestatuspl');
    });
    $('#btnlimpiarestpl').bind('click', function () {
        LimpiarValores('estpla', '#btnlimpiarestpl')
    });
    $('#btnbEstpl').bind('click', function () {
        listarEstatusPla("");
    });

    $('#btnLestpl').bind('click', function () { LIMPIAR_ESTATUSPLAZA(); });
    $('#btnAestpl').bind('click', function () { ACEPTAR_ESTATUSPLAZA(); });

    $('#btnnivel').bind('click', function () {
        MostrarNivelSalarial('#btnnivel');
    });
    $('#btnbnivel').bind('click', function () {
        FILTRAR_NIVEL($("#cbocolumnas").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtBusquedaForSubNivel").textbox('getValue'));
    });

    $('#btnProceso').bind('click', function () {
        PROCESO_COSTEO('#btnProceso');
    });

    $('#btnCubo').bind('click', function () {
        DATOS_DINAMICOS('#btnCubo');
    });
      
    $('#btnRresultado').bind('click', function () {
        $('#pcosteo').show();
        $('#presultado').hide();
        LIMPIAR();
    });
    $('#btnLimpiar').bind('click', function () {
        LIMPIAR();
    });
    
    $('#btnplazas').bind('click', function () {
        btntipo = 0;
        $('#chkplazas').attr("disabled", false);
        $('#btnbplazas').linkbutton({ disabled: false });
        $('#btnlplazas').linkbutton({ disabled: false });
        $('#txtplaza').textbox({ disabled: false });
        var text = $('#txtplaza');
        text.textbox('clear').textbox('textbox').focus();


        $('#cbocalpla').combobox({ disabled: true });
        $('#btnestatuspl').linkbutton({ disabled: true });
        $('#btnlimpiarestpl').linkbutton({ disabled: true });
        $('#btnadscripcion').linkbutton({ disabled: true });
        $('#btnlimpiarads').linkbutton({ disabled: true });
        $('#btnsecretaria').linkbutton({ disabled: true });
        $('#btnlsecretaria').linkbutton({ disabled: true });
        $('#btnnivel').linkbutton({ disabled: true });

        $('#btnpuesto').linkbutton({ disabled: true });
        $('#btnlimpiarpuesto').linkbutton({ disabled: true });

        $('#btnProceso').linkbutton({ disabled: false });
        $('#btnCubo').linkbutton({ disabled: false });

    });
    $('#btnpersonalizado').bind('click', function () {
        btntipo = 1;
        $('#chkplazas').attr("disabled", true);
        $('#btnbplazas').linkbutton({ disabled: true });
        $('#btnlplazas').linkbutton({ disabled: true });
        $('#txtplaza').textbox({ disabled: true });

        $('#cbocalpla').combobox({ disabled: false });
        $('#btnestatuspl').linkbutton({ disabled: false });
        $('#btnlimpiarestpl').linkbutton({ disabled: false });
        $('#btnadscripcion').linkbutton({ disabled: false });
        $('#btnlimpiarads').linkbutton({ disabled: false });
        $('#btnsecretaria').linkbutton({ disabled: false });
        $('#btnlsecretaria').linkbutton({ disabled: false });
        $('#btnpuesto').linkbutton({ disabled: false });
        $('#btnlimpiarpuesto').linkbutton({ disabled: false });
        $('#btnnivel').linkbutton({ disabled: false });

        $('#btnProceso').linkbutton({ disabled: false });
        $('#btnCubo').linkbutton({ disabled: false });

    });

    $('#btnlimpiarconceptos').bind('click', function () { LIMPIAR_CONCEPTOS(); });
    $('#btnconceptos').bind('click', function () { MOSTRAR_CONCEPTOS('#btnconceptos'); });
   
    var txtplazas = $('#txtplaza');
    txtplazas.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_PLAZAS('#dgplaza', 100, 200, "");
            CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'numplaza');
            windows("#winemp", 820, 679, false, "Busqueda de Plazas");
            var text = $('#txtval');
            text.textbox('clear').textbox('textbox').focus();
        }
    });
    $('#btnbplazas').bind('click', function () {
        LISTAR_PLAZAS('#dgplaza', 100, 200, "");
        CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'numplaza');
        windows("#winemp", 820, 679, false, "Busqueda de Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });
    $('#btnlplazas').bind('click', function () {
        var text = $('#txtplaza');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });
    $('#btnfiltrar').bind('click', function () {
        FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue'));
    });
    
  
    $('#txtvalorind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            {              
                CARGAR_IND('#dgind', "p", $("#txtvalorind").textbox('getValue'));
            }
        }
    });

    $('#dgplaza').datagrid({
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,      
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckPlaza,
        onUncheck: onUncheckPlaza,
        onLoadSuccess: onLoadPlaza,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onClickRow: function (index, row) {
            $(this).datagrid('checkRow', index);
        },
        beforeSend: function () {
            $('#loading').show();
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
        onLoadSuccess: onLoadFiltro,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onClickRow: function (index, row) {
            $(this).datagrid('checkRow', index);
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
        onLoadSuccess: onLoadFiltro,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onClickRow: function (index, row) {
            $(this).datagrid('checkRow', index);
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
        onLoadSuccess: onLoadFiltro,
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
            }
        }
    });

    $('#tblBusquedaDeEstatusPla').datagrid({
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
        onLoadSuccess: onLoadFiltro,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onClickRow: function (index, row) {
            $(this).datagrid('checkRow', index);           
        }
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
        onLoadSuccess: onLoadInd,
        onCheck: onCheckInd,
        onUncheck: onUncheckInd,       
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $(this).datagrid('checkRow', index);           
        }

    });
    $('#dgind').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgconceptos').datagrid({
        onClickRow: function (index, row) {
            var dg = $('#dgind');
            var rows = dg.datagrid('getRows');
            //sacar la plaza de la cadena
            var valores = row.Conceptos.split(':');
            //marcar la plaza seleccionada
            var tri = $('#tplazas').tree('getRoots');
            for (var i = 0; i < tri.length; i++) {
                if (tri[i].name == valores[0])
                { $('#tplazas').tree('check', tri[i].target); break; }
            }           

            //separar los conceptos
            var conceptos = valores[1].split(';');
            //separa los importes de los indicadores
            for (var j = 0; j < conceptos.length; j++) {
                var importe = conceptos[j].split(',');               
                //asignar importe a la lista
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
    });

    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });

    $('#btnAgregar').bind('click', function () { AGREGAR_CONCEPTOS(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_CONCEPTOS('#btnEliminar'); });

    $('#chktodos').bind('click', function () {
        if ($('#chktodos').is(":checked") == true) {
            MARCAR_DESMARCAR_TREE('#tplazas', 'check');
        }
        else { MARCAR_DESMARCAR_TREE('#tplazas', 'uncheck'); }
    });
    
    CONFIGURACION();

    CARGAR_FILTROS();

    document.getElementById('lblmov').innerHTML = "COSTEOS";
});

function CARGAR_FILTROS()
{
    var Filtros = JSON.parse(localStorage.getItem('Filtros'));
    if (Filtros != null) {
        if (Filtros.placan == "1") { $('#chkplazas').attr("checked", true); } else { $('#chkplazas').attr("checked", false); }
        $('#txtplaza').textbox('setValue',Filtros.plazas);
        $('#txtcvesecretaria').textbox('setValue', Filtros.cvesec);
        $('#txtdessecretaria').textbox('setValue',Filtros.dessec);
        $('#txtcveur').textbox('setValue',Filtros.cveunires);
        $('#txtdesur').textbox('setValue',Filtros.desunires);
        $('#cbocalpla').combobox('setValue', Filtros.actinac);
        $('#txtcveestpl').textbox('setValue', Filtros.cveestpl);
        $('#txtdesestpl').textbox('setValue', Filtros.desestpl);
        $('#txtcvepuesto').textbox('setValue', Filtros.cvepuesto);
        $('#txtdespuesto').textbox('setValue', Filtros.despuesto);
        $('#txtnivel').textbox('setValue', Filtros.nivsal);
        $('#txtconceptos').textbox('setValue', Filtros.conceptos);
        localStorage.setItem('Filtros', null);
    }
}

function onCheckPlaza(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheckPlaza(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}
function onLoadPlaza(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            if (checkedRows.length > 0) {
                for (var i = 0; i < checkedRows.length; i++) {
                    if (checkedRows[i].numplaza == row.numplaza) {
                        dg.datagrid('checkRow', index);
                        row.numplaza = checkedRows[i].numplaza;
                        dg.datagrid('beginEdit', index);
                        dg.datagrid('endEdit', index);
                        return;
                    }
                }
            }
            else {
                if ($('#txtplaza').textbox('getValue') != "") {
                    var plazas = "";
                    var contpl = $('#txtplaza').textbox('getValue').indexOf(',');
                    if (contpl != 0)
                    { plazas = $('#txtplaza').textbox('getValue').split(','); }
                    else { plazas = $('#txtplaza').textbox('getValue'); }

                    for (var i = 0; i < plazas.length; i++) {
                        if (plazas[i] == row.numplaza) {
                            dg.datagrid('checkRow', index);
                            row.numplaza = plazas[i];
                            dg.datagrid('beginEdit', index);
                            dg.datagrid('endEdit', index);
                            return;
                        }
                    }
                }
            }
        })();
    }
}
function onEndEditPlaza(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'numplaza'
    });
    //if (ed != null)
    //{ row.numplaza = $(ed.target).numberbox('getText'); }
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



function onLoadFiltro(data) {   
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].Clave == row.Clave) {
                    dg.datagrid('checkRow', index);
                    row.Clave = checkedRows[i].Clave;
                    return;
                }
            }
        })();
    }
}

function LIMPIAR()
{
    $('#cbocalpla').combobox('setValue', 'x');
    $('#txtplaza').textbox('setValue', '');
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
    checkedRows = [];
    checkedRowsInd = [];
}

function CONFIGURACION() {                  
    if (btntipo == "0") {
        $('#btnplazas').linkbutton({ selected: true });
        $('#btnpersonalizado').linkbutton({ selected: false });
        $('#chkplazas').attr("disabled", false);
        $('#btnbplazas').linkbutton({ disabled: false });
        $('#btnlplazas').linkbutton({ disabled: false });
        $('#txtplaza').textbox({ disabled: false });

        $('#cbocalpla').combobox({ disabled: true });
        $('#btnestatuspl').linkbutton({ disabled: true });
        $('#btnlimpiarestpl').linkbutton({ disabled: true });
        $('#btnadscripcion').linkbutton({ disabled: true });
        $('#btnlimpiarads').linkbutton({ disabled: true });
        $('#btnsecretaria').linkbutton({ disabled: true });
        $('#btnlsecretaria').linkbutton({ disabled: true });
        $('#btnpuesto').linkbutton({ disabled: true });
        $('#btnlimpiarpuesto').linkbutton({ disabled: true });
        $('#btnnivel').linkbutton({ disabled: true });
    }
    else {
        $('#btnpersonalizado').linkbutton({ selected: true });
        $('#btnplazas').linkbutton({ selected: false });
        $('#chkplazas').attr("disabled", true);
        $('#btnbplazas').linkbutton({ disabled: true });
        $('#btnlplazas').linkbutton({ disabled: true });
        $('#txtplaza').textbox({ disabled: true });

        $('#cbocalpla').combobox({ disabled: false });
        $('#btnestatuspl').linkbutton({ disabled: false });
        $('#btnlimpiarestpl').linkbutton({ disabled: false });
        $('#btnadscripcion').linkbutton({ disabled: false });
        $('#btnlimpiarads').linkbutton({ disabled: false });
        $('#btnsecretaria').linkbutton({ disabled: false });
        $('#btnlsecretaria').linkbutton({ disabled: false });
        $('#btnpuesto').linkbutton({ disabled: false });
        $('#btnlimpiarpuesto').linkbutton({ disabled: false });
        $('#btnnivel').linkbutton({ disabled: false });
    }
           
}

function AGEGAR_CALPLA(objcbo)
{
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
    LISTAR_PLAZAS('#dgplaza', 100, 200, strconplaza);
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

function LISTAR_PLAZAS(dgcontrol, ancho, alto, filtro) {

    var colsort = "numplaza asc";

    $(dgcontrol).datagrid({
        url: "Listar_Plazas.aspx?busqueda=" + filtro + "&colord=" + colsort,
        width: ancho + "%",
        heigth: alto + "px"
    });
}

function MostrarBuscadorDeEstatusPla(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var calpla="";
        if ($('#cbocalpla').combobox('getValue') != "x") { calpla = $('#cbocalpla').combobox('getValue'); }
            var text = $('#txtBusquedaEstatusPla');
            text.textbox('clear').textbox('textbox').focus();
            listarEstatusPla('', calpla);
            $('#modalBuscarEstatusPla').window('open');
        //} else { $.messager.alert('Error', 'Falta el tipo de plaza activa/inactiva', 'error'); }
    }
}
function listarEstatusPla(busqueda,filtro) {
    if (busqueda != "") { $('#txtBusquedaEstatusPla').textbox('setValue', busqueda); }
    else { busqueda = $('#txtBusquedaEstatusPla').textbox('getValue'); }

    if (busqueda == undefined) { busqueda = ""; }

    $('#tblBusquedaDeEstatusPla').datagrid({
        url: 'listarEstatusPlaza.aspx?busqueda=' + busqueda+'&filtro='+filtro,
       // pagination: false,
       // enableFilter: true,
       // rownumbers: true,
       // singleSelect: true,
       // striped: true,
       //// pageSize: 20,
       // showPageList: false,
        //onClickRow: function () {
        //    var row = $('#tblBusquedaDeEstatusPla').datagrid('getSelected');
           
        //    $('#txtcveestpl').textbox('setValue', row.Clave);
        //    $('#txtdesestpl').textbox('setValue', row.Descripcion);
        //    $('#modalBuscarEstatusPla').window('close');
        //}
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
function listarCentroCosto(busqueda,secretaria) {
    if (busqueda != "") { $('#txtBusquedaCentroCosto').textbox('setValue', busqueda); }
        else { busqueda = $('#txtBusquedaCentroCosto').textbox('getValue'); }

        if (busqueda == undefined) { busqueda = ""; }

        $('#tblBusquedaDeCentroCosto').datagrid({
            url: 'listarUnidadResponsable.aspx?busqueda=' + busqueda + '&filtro=' + secretaria,          
            //onClickRow: function () {
            //    var row = $('#tblBusquedaDeCentroCosto').datagrid('getSelected');
            //    $('#txtcveur').textbox('setValue', row.Clave);
            //    $('#txtdesur').textbox('setValue', row.Descripcion);
            //    $('#modalBuscarCentroCosto').window('close');
            //}
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
    //if (filtro != "") { $('#txtBusquedaForSubNivel').textbox('setValue', filtro); }
    //else { filtro = $('#txtBusquedaForSubNivel').textbox('getValue'); }

    //if (filtro == undefined) { filtro = ""; }

    var cols = $('#hidColumnasDeSubNivel').val();
    $('#tblBusquedaDeForSubNivel').datagrid({
        url: 'listarForSubNivel.aspx?busqueda='+filtro+'&nivel=' + codnivel + '&columnas=' + cols,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDeForSubNivel').datagrid('getSelected');          
            $('#txtnivel').textbox("setValue", row.cveniv);
            $('#modalBuscarSubNivel').window('close');
        }
    });
    CARGAR_CAMPOSBUSQUEDA('#tblBusquedaDeForSubNivel', '#cbocolumnas');
    $('#modalBuscarSubNivel').window('open');
    //}
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
           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
   
}

function LISTA_REGIMENIPESPORC(objddl, url,filtro) {
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

function LIMPIAR_PLAZA() {
    listarSecretarias('');
    $('#txtval').textbox('setValue', '');
    $('#txtval').textbox('clear').textbox('textbox').focus();
    $('#dgplaza').datagrid('uncheckAll');
    checkedRows = [];
}
function ACEPTAR_PLAZA() {
    var selecciona = "";
    objlstcampos = [];

    if (checkedRows.length > 0) {
        $('#dgplaza').datagrid('acceptChanges');
        for (var i = 0; i < checkedRows.length; i++) {
            selecciona += checkedRows[i].numplaza + ",";

            listacampos = { id: "", name: "", text: "" };
            var name = checkedRows[i].numplaza;
            var text = checkedRows[i].numplaza;

            listacampos.id = p;
            listacampos.name = name;
            listacampos.text = text;
            objlstcampos.push(listacampos);
        }
        //if (objlstcampos.length > 0) {
        //    $('#tplazas').tree({
        //        data: objlstcampos,
        //        formatter: function (node) {
        //            return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
        //        }
        //    });
        //}
        $('#txtplaza').textbox('setValue', selecciona.substring(0, selecciona.length - 1));
        localStorage.setItem('Plazas', JSON.stringify(objlstcampos));
    }
    $("#winemp").window('close');
}


function PROCESO_COSTEO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cadena = "",conceptos="";
        var placan = 0;
       

        if ($('#btnplazas').linkbutton('options').selected) {
            if ($('#txtplaza').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la plaza', 'error'); return 0; }
            else
            { cadena = 'numplaza:' + $('#txtplaza').textbox('getValue')+"|"; }
        }
        if ($('#btnpersonalizado').linkbutton('options').selected) {

            if ($('#cbocalpla').combobox('getValue') != "x") {
                if ($('#cbocalpla').combobox('getValue') == "") { cadena += 'calpla:|'; }
                else
                { cadena += 'calpla:' + $('#cbocalpla').combobox('getValue').trim() + '|'; }
            }
            if ($('#txtcveestpl').textbox('getValue') != "") { cadena += 'cveesppl:' + $('#txtcveestpl').textbox('getValue').trim() + "|"; }
           // if ($('#txtcvesecretaria').textbox('getValue') != "") { cadena += 'cvesec:' + $('#txtcvesecretaria').textbox('getValue').trim() + "|"; }
            if ($('#txtcveur').textbox('getValue') != "") { cadena += 'cveadspl:' + $('#txtcveur').textbox('getValue').trim() + "|"; }
            if ($('#txtcvepuesto').textbox('getValue') != "") { cadena += 'cvepuepl:' + $('#txtcvepuesto').textbox('getValue').trim() + "|"; }
            if ($('#txtnivel').textbox('getValue') != "") { cadena += 'cvenivpl:' + $('#txtnivel').textbox('getValue').trim() + "|"; }            
        }
        if ($('#txtconceptos').textbox('getValue') != "") { conceptos =  $('#txtconceptos').textbox('getValue').trim(); }

        if ($('#chkplazas').is(":checked") == true) { placan = '1'; }else{placan='0';};

        var Filtros = {};
        Filtros.canceladas = placan;
        Filtros.plazas = $('#txtplaza').textbox('getValue');
        Filtros.cvesec = $('#txtcvesecretaria').textbox('getValue').trim();
        Filtros.dessec = $('#txtdessecretaria').textbox('getValue').trim();
        Filtros.cveunires = $('#txtcveur').textbox('getValue').trim();
        Filtros.desunires = $('#txtdesur').textbox('getValue').trim();
        Filtros.actinac = placan;
        Filtros.cveestpl = $('#txtcveestpl').textbox('getValue').trim();
        Filtros.desestpl = $('#txtdesestpl').textbox('getValue').trim();
        Filtros.cvepuesto = $('#txtcvepuesto').textbox('getValue').trim();
        Filtros.despuesto = $('#txtdespuesto').textbox('getValue').trim();
        Filtros.nivsal = $('#txtnivel').textbox('getValue').trim()
        Filtros.conceptos = conceptos;

        localStorage.setItem('Filtros', JSON.stringify(Filtros));
        IR_PAGINA("Consulta_Grid.aspx", "tipo=Costo&filtro=" + cadena.substring(0, cadena.length - 1) + "&conceptos=" + conceptos + "&canceladas=" + placan + "&btntipo=" + btntipo);
       // window.location = "Consulta_Grid.aspx?tipo=Costo&filtro=" + cadena.substring(0, cadena.length - 1) + "&conceptos=" + conceptos + "&canceladas=" + placan + "&btntipo=" + btntipo;
    }
}

function DATOS_DINAMICOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cadena = "", conceptos="";
        var placan = 0;


        if ($('#btnplazas').linkbutton('options').selected) {
            if ($('#txtplaza').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la plaza', 'error'); return 0; }
            else
            { cadena = 'numplaza:' + $('#txtplaza').textbox('getValue') + "|"; }
        }
        if ($('#btnpersonalizado').linkbutton('options').selected) {

            if ($('#cbocalpla').combobox('getValue') != "x") {
                if ($('#cbocalpla').combobox('getValue') == "") { cadena += 'calpla:|'; }
                else
                { cadena += 'calpla:' + $('#cbocalpla').combobox('getValue').trim() + '|'; }
            }
            if ($('#txtcveestpl').textbox('getValue') != "") { cadena += 'cveesp:' + $('#txtcveestpl').textbox('getValue').trim() + "|"; }
            if ($('#txtcvesecretaria').textbox('getValue') != "") { cadena += 'cvesec:' + $('#txtcvesecretaria').textbox('getValue').trim() + "|"; }
            if ($('#txtcveur').textbox('getValue') != "") { cadena += 'cveadspl:' + $('#txtcveur').textbox('getValue').trim() + "|"; }
            if ($('#txtcvepuesto').textbox('getValue') != "") { cadena += 'cvepuepl:' + $('#txtcvepuesto').textbox('getValue').trim() + "|"; }
            if ($('#txtnivel').textbox('getValue') != "") { cadena += 'cvenivpl:' + $('#txtnivel').textbox('getValue').trim() + "|"; }
        }
        if ($('#txtconceptos').textbox('getValue') != "") { conceptos = $('#txtconceptos').textbox('getValue').trim(); }

        if ($('#chkplazas').is(":checked") == true) { placan = '1'; } else { placan = '0'; };

        var Filtros = {};
        Filtros.canceladas = placan;
        Filtros.plazas = $('#txtplaza').textbox('getValue');
        Filtros.cvesec = $('#txtcvesecretaria').textbox('getValue').trim();
        Filtros.dessec = $('#txtdessecretaria').textbox('getValue').trim();
        Filtros.cveunires = $('#txtcveur').textbox('getValue').trim();
        Filtros.desunires = $('#txtdesur').textbox('getValue').trim();
        Filtros.actinac = placan;
        Filtros.cveestpl = $('#txtcveestpl').textbox('getValue').trim();
        Filtros.desestpl = $('#txtdesestpl').textbox('getValue').trim();
        Filtros.cvepuesto = $('#txtcvepuesto').textbox('getValue').trim();
        Filtros.despuesto = $('#txtdespuesto').textbox('getValue').trim();
        Filtros.nivsal = $('#txtnivel').textbox('getValue').trim()
        Filtros.conceptos = conceptos;

        localStorage.setItem('Filtros', JSON.stringify(Filtros));
        IR_PAGINA("Consulta_Pivot.aspx", "tipo=Costo&filtro=" + cadena.substring(0, cadena.length - 1) + "&conceptos=" + conceptos + "&canceladas=" + placan + "&btntipo=" + btntipo);
    }
}



function MOSTRAR_CONCEPTOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtvalorind').textbox('setValue', '');
        $('#txtvalorind').textbox('clear').textbox('textbox').focus();
        $('#dgind').datagrid('uncheckAll');
        $('#dgconceptos').datagrid('loadData', { "total": 0, "rows": [] });        

        if ($('#btnplazas').linkbutton('options').selected)
        {
            if ($('#txtplaza').textbox('getValue') == "") { $.messager.alert('Information', 'Falta seleccionar las plazas a costear', 'error'); return 0; }
            else
            {
                //checkedRowsInd = [];
                var node = $('#tplazas').tree('getSelected');
                if (node != undefined) {
                    $('#tplazas').tree('unselect', node.target);
                }
            }
        }                    
        if ($('#btnpersonalizado').linkbutton('options').selected) {
                
            CARGAR_PLAZAS();
        }
        CARGAR_IND('#dgind', 'P', '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 650, 660, false, 'Percepciones');
    }    
}

function CARGAR_PLAZAS()
{
    var filtro = "";
    if ($('#txtcvesecretaria').textbox('getValue') != "") { filtro += "secretaria_unidadResponsable=''" + $('#txtcvesecretaria').textbox('getValue') + "'' and "; }
    if ($('#txtcveur').textbox('getValue') != "") { filtro += "cveadspl=''" + $('#txtcveur').textbox('getValue') + "'' and "; }
    if ($('#txtcveestpl').textbox('getValue') != "") { filtro += "cveesppl=''" + $('#txtcveestpl').textbox('getValue') + "'' and "; }
    if ($('#txtcvepuesto').textbox('getValue') != "") { filtro += "cvepuepl=''" + $('#txtcvepuesto').textbox('getValue') + "'' and "; }
    if ($('#txtnivel').textbox('getValue') != "") { filtro += "cvenivpl=''" + $('#txtnivel').textbox('getValue') + "'' and "; }
    if (($('#cbocalpla').combobox('getValue') == "1") || ($('#cbocalpla').combobox('getValue') == "0"))
    { filtro += "calpla=" + $('#cbocalpla').combobox('getValue') + " and "; }

    filtro = filtro.substring(0, filtro.length - 4);

    var parametros = {};    
    parametros.filtro = filtro;

    $.ajax({
        type: "POST",
        url: 'funsiones.aspx/Cargar_Plazas',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);           
            $('#tplazas').tree({
                data: obj
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loading').hide();
            $.messager.alert('Information', jqXHR.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function CARGAR_IND(dgcontrol, strtipo, condicion) {  
    $(dgcontrol).datagrid({
        url: "ListaIndicadores.aspx?tipotbl='" + strtipo + "'&busqueda=" + condicion
    });
    //cargar los conceptos seleccionados
    if ($('#txtconceptos').textbox('getValue') != "") {
        var placon = $('#txtconceptos').textbox('getValue').indexOf('|');
        if (placon != 0) {
            plazas = $('#txtconceptos').textbox('getValue').split('|');
            for (var i = 0; i < plazas.length; i++) {
                $('#dgconceptos').datagrid('insertRow', {
                    index: i,
                    row: { Conceptos: plazas[i] }
                });
            }
        }
        else {
            $('#dgconceptos').datagrid('insertRow', {
                index: 0,
                row: { Conceptos: $('#txtconceptos').textbox('getValue') }
            });
        }
    }
    if ($('#txtplaza').textbox('getValue') != "") {
        //objlstcampos = [];
        //var plazas = $('#txtplaza').textbox('getValue').split(',');
        //for (var i = 0; i < plazas.length; i++) {
        //    listacampos = { id: "", name: "", text: "" };
        //    var name = checkedRows[i].numplaza;
        //    var text = checkedRows[i].numplaza;

        //    listacampos.id = p;
        //    listacampos.name = name;
        //    listacampos.text = text;
        //    objlstcampos.push(listacampos);
        //}
        var plazas = JSON.parse(localStorage.getItem('Plazas'));
        
        if (plazas.length > 0) {
            $('#tplazas').tree({
                data: plazas,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                }
            });
        }
    }

}

function LIMPIAR_CONCEPTOS()
{
    $('#txtconceptos').textbox('setValue', '');  
    var nodes = $('#tplazas').tree('getChecked', ['checked']);
        for (var i = 0; i < nodes.length; i++) {           
            $('#tplazas').tree('uncheck', nodes[i].target);
        }    
    checkedRowsInd = [];
    document.getElementById('chktodos').checked = false;
}

function LIMPIAR_IND_SEL() {
    checkedRowsInd = [];
    CARGAR_IND('#dgind', "P", '');        
    var nodes = $('#tplazas').tree('getChecked', ['checked']);
    for (var i = 0; i < nodes.length; i++) {
        $('#tplazas').tree('uncheck', nodes[i].target);
    }
    $('#txtvalorind').textbox('setValue', '');
    $('#txtvalorind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');
    $('#dgconceptos').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnEliminar').linkbutton({ disabled: true });
    $('#chktodos').attr("checked", false);
}

function ACEPTAR_IND_SEL() {
    var selecciona = "";
    var total = $('#dgconceptos').datagrid('getData').total;
    var rows = $('#dgconceptos').datagrid('getRows');  
    for (i = 0; i < total; i++) {
        selecciona += rows[i].Conceptos + "|";
    }
    $('#txtconceptos').textbox('setValue',selecciona.substring(0, selecciona.length - 1));    
    $("#wind").window('close');
}

function ELIMINAR_CONCEPTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var fila = $('#dgconceptos').datagrid('getSelected');
        if (fila) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la plaza con sus conceptos', function (r) {
                if (r) {
                    var rowIndex = $("#dgconceptos").datagrid("getRowIndex", fila);
                    $('#dgconceptos').datagrid('deleteRow', rowIndex);

                    var rows = $('#dgconceptos').datagrid('getRows');
                    if (rows.length == 0) { $('#btnEliminar').linkbutton({ disabled: true }); }
                }
            });                       
        }        
    }
}

function AGREGAR_CONCEPTOS() {
    var conceptos = ""; var ban = 0;
    //var plaza = $('#tplazas').tree('getSelected');

  
    $('#dgind').datagrid('acceptChanges');

    var plaza = $('#tplazas').tree('getChecked', ['checked']);
    if (plaza.length == 0) { $.messager.alert('Error', 'Falta seleccionar la plaza ', 'error'); return 0; }
    else
        if (checkedRowsInd.length == 0) { $.messager.alert('Error', 'Falta seleccionar el indicador ', 'error'); return 0; }
        else
        {
            for (var j = 0; j < plaza.length; j++) {
                for (var i = 0; i < checkedRowsInd.length; i++) {
                    if (checkedRowsInd[i].importe == undefined) { $.messager.alert('Error', 'Falta el importe del concepto ' + checkedRowsInd[i].Clave, 'error'); ban = 1; return 0; }
                    else
                    { conceptos += checkedRowsInd[i].Clave + "," + checkedRowsInd[i].importe + ";"; }
                }

                if (ban == 0) {
                    var filas = $('#dgconceptos').datagrid('getSelected');
                    if (filas == null) {
                        var total = $('#dgconceptos').datagrid('getData').total;
                        $('#dgconceptos').datagrid('insertRow', {
                            index: total + 1,
                            row: { Conceptos: plaza[j].text + ":" + conceptos.substring(0, conceptos.length - 1) }
                        });
                    }
                    else {
                        var rowIndex = $("#dgconceptos").datagrid("getRowIndex", filas);
                        $('#dgconceptos').datagrid('updateRow', {
                            index: rowIndex,
                            row: { Conceptos: plaza[j].text + ":" + conceptos.substring(0, conceptos.length - 1) }
                        });
                    }
                    conceptos = "";                  
                }
            }

            var nodes = $('#tplazas').tree('getChecked', ['checked']);
            for (var i = 0; i < nodes.length; i++) {
                $('#tplazas').tree('uncheck', nodes[i].target);
            }
           
            var rows = $('#dgind').datagrid('getRows');
            for (var i = 0; i < checkedRowsInd.length; i++) {
                for (var j = 0; j < rows.length; j++) {
                    if (rows[j].Clave == checkedRowsInd[i].Clave) {

                        $('#dgind').datagrid('updateRow', {
                            index: j,
                            row: {importe: ''}
                        });                       
                    }
                }                
            }
          
            for (var j = 0; j < rows.length; j++) {
                $('#dgind').datagrid('uncheckRow', j);
            }
            $('#btnEliminar').linkbutton({ disabled: false });
        }
   
    //$('#dgind').datagrid('loadData', { "total": 0, "rows": [] });
    //CARGAR_IND('#dgind', "P", '');
}





