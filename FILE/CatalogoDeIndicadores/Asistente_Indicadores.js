/*Variables Globales*/
var menuSeleccionado;
var lblTipoIndicador = 'INDICADOR SELECCIONADO - '
var tipoIndicadorSeleccionado = false;
var quincenas = new Array();

$(document).ready(function () {
    menuSeleccionado = document.getElementById('aPercepciones');
    //metodo enter del txtvalor para buscar un documento
    var text = $('#txtBusquedaIndicador');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            buscarIndicadorSegunSeleccion();
        }
    });    
    ////listarCapitulos();  
    //// listarFuenteDeFinanciamiento();
    listarTipoClaveSAT();
    listarTipoDeNomina();
    listarFamiliaDeIndicadores();   
    listarTiposEstatus();
    listarTiposExcento();
    CatlisFormula();

    listarIndicadores();

    //$('#chkeximpNM').bind('click', function () {
    //    if ($('#chkeximpNM').is(":checked") == true) {
    //        $('#txtexvalNM').numberbox({ disabled: false });
    //        $('#cboexetipNM').combobox({ disabled: false });
    //    }
    //    else {
    //        $('#txtexvalNM').numberbox({ disabled: true });
    //        $('#cboexetipNM').combobox({ disabled: true });
    //    }
    //});
    $('#btnguardar').bind('click', function () { GUARDAR_INDICADOR('#btnguardar'); });
});

function listarCapitulos() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarCapitulos",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboCapitulo').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                onSelect: function () {
                    //listarClasificacionPresupuestal();
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

function listarTipoClaveSAT() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarTipoClaveSAT",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cbotiposat').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                onSelect: function (valor) {
                    if (valor.clave != "x")
                    { listarClaveSAT(valor.clave); }
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

function listarClaveSAT(VALOR) {
    //if ($('#cbotiposat').combobox('getValue') == '' || $('#cbotiposat').combobox('getValue') == null) return;
    var parametros = {};
    parametros.tipo = VALOR;
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarClaveSAT",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cbocvesat').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',               
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

function listarClasificacionPresupuestal() {
    if ($('#cboCapitulo').combobox('getValue') == '' || $('#cboCapitulo').combobox('getValue') == null) return;
    if (menuSeleccionado == "P") { }
    var parametros = {};
    parametros.capitulo = $('#cboCapitulo').combobox('getValue');
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarClasificacionPresupuestal",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboClaPreCon').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre'
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

function listarTipoDeNomina() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarNominasParaPlazas",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboTipNom').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre'
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

function listarFamiliaDeIndicadores() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarFamiliaDeIndicadores",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboFamInd').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre'
            });
        },
        error: function (a, b, c) {
            $('#loading').hide(100);            
            $.messager.alert('Error', a.responseText, 'error');            
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function listarFuenteDeFinanciamiento() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarFuenteDeFinanciamiento",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboFueFin').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre'
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

function listarTiposEstatus() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarEstatusParaPlazas",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboTipEstatus').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre'
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

function listarTiposExcento() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarTipoExcento",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboexetipNM').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',               
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

function CatlisFormula() {
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarCatlisFormula",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboCatLis').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                onSelect: function () {
                    listarCatlisCampoDeFormula();
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

function listarCatlisCampoDeFormula() {
    if ($('#cboCatLis').combobox('getValue') == '' || $('#cboCatLis').combobox('getValue') == null) return;
    var parametros = {};
    parametros.idLis = $('#cboCatLis').combobox('getValue');
    $('#txtColumnaSel').textbox('setValue', '');
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/listarCatlisCampoDeFormula",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#cboCatLisPla').combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                onSelect: function () {
                    if ($('#cboCatLisPla').combobox('getValue') != '' && $('#cboCatLisPla').combobox('getValue') != null) {
                        $('#txtColumnaSel').textbox('setValue', $('#cboCatLisPla').combobox('getValue'));
                    }
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

function mostarNumDiasYTipExe(che) {
    if (che) {
        // $('#tdNumDias').show();
        $('#tdextepcion').show();
        //$('#tdTipExe').show();
    }
    else {
        //$('#tdNumDias').hide();
        //$('#tdTipExe').hide();
        $('#tdextepcion').hide();
    }
}

function mostrarEspesificarQuincenas() {
    var v = $('#cboQuiApl').combobox('getValue');
    if (v == 'Especificar Qna') {
        $('#espesificarQuincena').show();
    } else {
        $('#espesificarQuincena').hide();
    }
}

function mostarProyeccionMensual(che) {
    if (che)
        $('#tdSinProyeccion').show();
    else $('#tdSinProyeccion').hide();
}

function mostarTipoEstatus(che) {
    if (che)
        $('#tdTipoEstatus').show();
    else $('#tdTipoEstatus').hide();

}

function mostrarFormula() {
    if ($('#cboTipApl').combobox('getValue') == 'Formula') {
        $('#tblformulas').show();
        $('#tblimporte').hide();
        $('#tbloperadores').show();
    } else {
        $('#tblimporte').show();
        $('#tblformulas').hide();
        $('#tbloperadores').hide();
    }
}

function mostrarEspesificarQuincenas() {
    var v = $('#cboQuiApl').combobox('getValue');
    if (v == 'Especificar Qna') {
        $('#especificarQuincena').show();
    } else {
        $('#especificarQuincena').hide();
    }
}

function limpiarCapturaIndicador() {
    location.href = "asistente-indicadores.aspx";
}

function listarIndicadores() {
    var tipProc = (menuSeleccionado.id == 'aDeducciones') ? "indded" : "indper";
    var tipInd = (menuSeleccionado.id == 'aDeducciones') ? "D" : ((menuSeleccionado.id == 'aPercepciones') ? "P" : "A");
    $('#tblBusquedaDeIndicador').datagrid({
        url: 'listarIndicadores.aspx?busqueda=' + document.getElementById('txtBusquedaIndicador').value + '&proc=' + tipProc + '&tipInd=' + tipInd,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeIndicador').datagrid('getSelected');
            document.getElementById('lbltipoindicador').innerHTML = "   Indicador Seleccionado: " + menuSeleccionado.innerText;
            $('#DMenu').hide();           
            $('#DCaptura').show();           
            asignarIndicador(row.Clave);

            if (menuSeleccionado.id == 'aDeducciones')
            { $('#chkApliTerc').hide(); $('#lblter').hide(); }
            else { $('#chkApliTerc').show(); $('#lblter').show(); }
        }
    });
}

function asignarIndicador(ind) {
    var parametros = {};
    parametros.indcop = ind;
    parametros.tipo = (menuSeleccionado.id == 'aDeducciones') ? "D" : ((menuSeleccionado.id == 'aPercepciones')) ? "P" : "A";
    $.ajax({
        type: "POST",
        url: "utileriasIndicadores.aspx/recuperarIndicador",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var campo = $.parseJSON(data.d);
            if (campo.length != 0) {
                $('#cboSubFijo').combobox('disable');
                $('#txtNoPlazas').textbox('disable');
                $('#cboSubFijo').combobox('setValue', campo[0].clvfrm);
                $('#txtNoPlazas').textbox('setValue', campo[0].clavpe);
                $('#txtReferencia').textbox('setValue', campo[0].indant);
                $('#txtDescRecibo').textbox('setValue', campo[0].descpe);
                $('#txtDescCompleta').textbox('setValue', campo[0].descop);
                $('#dtpVigIni').datebox('setValue', campo[0].vigini);

                //if (campo[0].capitulo == "") { $('#cboCapitulo').combobox('setValue', 'x'); }
                //else
                //{ $('#cboCapitulo').combobox('setValue', campo[0].capitulo); }

                //listarClasificacionPresupuestal();
                //$('#cboClaPreCon').combobox('setValue', campo[0].parprepe);

                $('#txtTopeMinimo').numberbox('setValue', campo[0].topeMinimo);
                $('#txtTopeMaximo').numberbox('setValue', campo[0].topeMaximo);
                $('#txtNomCampo').textbox('setValue', campo[0].nomCampo);

                $('#cboTipPag').combobox('setValue', ((campo[0].tipoPago == 'Q') ? "Pago Quincenal" : "Pago Especifico"));

                if (campo[0].cvefamind == "") { $('#cboFamInd').combobox('setValue', 'x'); }
                else
                {                   
                    $('#cboFamInd').combobox('setValue', campo[0].cvefamind);
                }

                //if (campo[0].cvefuentefin == "") { $('#cboFueFin').combobox('setValue', 'x'); }
                //else
                //{ $('#cboFueFin').combobox('setValue', campo[0].cvefuentefin); }

                //document.getElementById('chkIndAplImp').checked = campo[0].apliimp == 'S';
                //if (document.getElementById('chkIndAplImp').checked)
                //document.getElementById('chkimpuestoNM').checked = campo[0].apliimpNM == 'S';
                //if (document.getElementById('chkimpuestoNM').checked)
                //    $('#tdSinProyeccion').show();
                //else $('#tdSinProyeccion').hide();
                document.getElementById('chkSinProMen').checked = (campo[0].sinpromen == 'S' || campo[0].sinpromen == '1');

                if (menuSeleccionado.id == 'aDeducciones') { $('#opcpension').show(); } else { $('#opcpension').hide(); }
                //document.getElementById('chkExencionImp').checked = campo[0].exeimp == '1';
                //mostarNumDiasYTipExe(document.getElementById('chkExencionImp').checked);
                //$('#txtNumdias').textbox('setValue', campo[0].exedias);
                //$('#cboTipExe').combobox('setValue', campo[0].exetip);

                document.getElementById('chkIndPenAli').checked = campo[0].pensal == '1';
                document.getElementById('chkAplPla').checked = campo[0].apliplp == 'S';
                document.getElementById('chkProRet').checked = campo[0].propret == '1';
                document.getElementById('chkAplPreSoc').checked = campo[0].Prevision_Soc == '1';
                document.getElementById('chkAcuTot').checked = campo[0].acumtot == '1';
                document.getElementById('chkCalRet').checked = campo[0].calcret == '1';
                document.getElementById('chkApl1Pla').checked = campo[0].apli1plaza == '1';
                document.getElementById('chkAplBim').checked = campo[0].calcbimestre == '1';
                document.getElementById('chkBono').checked = campo[0].bono == '1';
                document.getElementById('chkAfePre').checked = campo[0].ppto == '1';

                document.getElementById('chkApliTerc').checked = campo[0].apliterceros == '1';
                document.getElementById('chkDescInstitu').checked = campo[0].descinstitucional == '1';
               
          
               $('#cbotiposat').combobox('setValue', campo[0].tipcvesat);               
               listarClaveSAT(campo[0].tipcvesat);
                $('#cbocvesat').combobox('setValue', campo[0].cvesat);
                
                document.getElementById('chkeximpNM').checked = campo[0].exeimpNM == '1';
                if (document.getElementById('chkeximpNM').checked) {
                    $('#txtexvalNM').numberbox({ disabled: false });
                    $('#cboexetipNM').combobox({ disabled: false });
                }
                else {
                    $('#txtexvalNM').numberbox({ disabled: true });
                    $('#cboexetipNM').combobox({ disabled: true });
                }
                $('#txtexvalNM').numberbox('setValue', campo[0].exevalNM);
                if (campo[0].exetipNM != "")
                { $('#cboexetipNM').combobox('setValue', campo[0].exetipNM); }
                else { $('#cboexetipNM').combobox('setValue', 'x'); }

                var quin = (campo[0].appper == 'Todas' || campo[0].appper == 'Quincena Par') || campo[0].appper == 'Quincena Non' ? campo[0].appper : "Especificar Qna";
                $('#cboQuiApl').combobox('setValue', quin);
                mostrarEspesificarQuincenas();
                //var quincenas = new Array();
                //var mySplitResult = campo[0].appper.split(",");
                //for (var i = 0; i < mySplitResult.length; i++) {
                //    quincenas.push(mySplitResult[i].replace("q", ""));
                //}              
                if (quin == "Especificar Qna") {
                    $('#cboQuiSel').combobox('setValues', ReplaceAll(campo[0].appper,"'", ""));
                }                
                $('#formulaIndicador').textbox('setValue', campo[0].frmper);
                //$('#txtimporte').numberbox('setValue', campo[0].importe);
            }
            else { LIMPIAR_CONTROLES(); }
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

function LIMPIAR_CONTROLES()
{
    $('#cboSubFijo').combobox({disabled:false});
    $('#txtNoPlazas').textbox({ disabled: false });
    $('#cboSubFijo').combobox('setValue', "A");
    $('#txtNoPlazas').textbox('setValue', '');
    $('#txtReferencia').textbox('setValue', '');
    $('#txtDescRecibo').textbox('setValue', '');
    $('#txtDescCompleta').textbox('setValue', '');
    $('#dtpVigIni').datebox('setValue', '');

    //listarCapitulos();
    //$('#cboCapitulo').combobox('setValue', 'x');

    //listarClasificacionPresupuestal();
    //$('#cboClaPreCon').combobox('setValue', 'x');

    $('#txtTopeMinimo').numberbox('setValue', 0);
    $('#txtTopeMaximo').numberbox('setValue', 0);
    $('#txtNomCampo').textbox('setValue', '');

    $('#cboTipPag').combobox('setValue', '1');

    //listarFamiliaDeIndicadores();
    $('#cboFamInd').combobox('setValue', 'x'); 
    
    //listarFuenteDeFinanciamiento();
    //$('#cboFueFin').combobox('setValue', 'x'); 

    //document.getElementById('chkIndAplImp').checked = false;
    //if (document.getElementById('chkIndAplImp').checked)
    //document.getElementById('chkimpuestoNM').checked = false;    
    //if (document.getElementById('chkimpuestoNM').checked)
    //$('#tdSinProyeccion').show();
    //$('#tdSinProyeccion').hide();

    document.getElementById('chkSinProMen').checked = false;

    if (menuSeleccionado.id == 'aDeducciones') { $('#opcpension').show(); } else { $('#opcpension').hide(); }

    //document.getElementById('chkExencionImp').checked = false;
    //document.getElementById('chkExencionImp').checked=false;
    //$('#txtNumdias').textbox('setValue', '');

    //$('#cboTipExe').combobox('setValue', '');
    //$('#cboTipNom').combobox('setValue', 'Todas');
    
    document.getElementById('chkIndPenAli').checked = false;
    document.getElementById('chkAplPla').checked = false;
    document.getElementById('chkProRet').checked = false;
    document.getElementById('chkAplPreSoc').checked = false;
    document.getElementById('chkAcuTot').checked = false;
    document.getElementById('chkCalRet').checked = false;
    document.getElementById('chkApl1Pla').checked = false;
    document.getElementById('chkAplBim').checked = false;
    document.getElementById('chkBono').checked = false;
    document.getElementById('chkAfePre').checked = false;    
    $('#cboQuiApl').combobox('setValue', 'Todas');   
    $('#cboQuiSel').combobox('setValues', '');
    $('#formulaIndicador').textbox('setValue', '');

    document.getElementById('chkApliTerc').checked = false;
    document.getElementById('chkDescInstitu').checked = false;
   
    $('#cbotiposat').combobox('setValues', 'x');
    $('#cbocvesat').combobox('setValues', '');
  
    //document.getElementById('chkeximpNM').checked = false;
    //if (document.getElementById('chkeximpNM').checked) {
    //    $('#txtexvalNM').numberbox({ disabled: false });
    //    $('#cboexetipNM').combobox({ disabled: false });
    //    $('#txtexvalNM').numberbox('setValue', 0);
    //    $('#cboexetipNM').combobox('setValues', 'x');
    //}

    $('#txtimporte').numberbox('setValue',0.00);

    //listarTipoDeNomina();
    //listarTiposEstatus();
    //listarTipoClaveSAT();    
    //listarTiposExcento();

    //CatlisFormula();
}

function RegresarMenu() {
    $('#DMenu').show();
    $('#DGrid').show();
    $('#DCaptura').hide();
    $('#tblBusquedaDeIndicador').datagrid('unselectAll');
}

function seleccionarTipoPlaza(liMenu) {
    if (!tipoIndicadorSeleccionado) {      
        menuSeleccionado = liMenu;        
        sessionStorage.setItem('elemento', (lblTipoIndicador + menuSeleccionado.id.replace('a', '')).toUpperCase());
        listarIndicadores();        
    }
}

function AgregarNuevoIndicador() {
    if (!tipoIndicadorSeleccionado) {
        document.getElementById('lbltipoindicador').innerHTML = "   Indicador Seleccionado: "+ menuSeleccionado.innerText;
        $('#DMenu').hide();      
        $('#DCaptura').show();

        LIMPIAR_CONTROLES();

        if (menuSeleccionado.id == 'aDeducciones')
        { $('#chkApliTerc').hide(); $('#lblter').hide(); }
        else { $('#chkApliTerc').show(); $('#lblter').show(); }
    }
}


function buscarIndicadorSegunSeleccion() {
    listarIndicadores();   
}

function insertarCampos() {
    var valor = $('#formulaIndicador').textbox('getValue');
    $('#formulaIndicador').textbox('setValue', valor +=' '+$('#txtColumnaSel').textbox('getValue'));
    $('#cboCatLis').combobox('setValue', 'x');
    $('#cboCatLisPla').combobox('setValue', 'x');
    $('#txtColumnaSel').textbox('setValue', '');
}

function insertarColumna() {
    var valor = $('#formulaIndicador').textbox('getValue');
    $('#formulaIndicador').textbox('setValue',valor+= ' '+ $('#txtmontoimporte').textbox('getValue'));
}


function insertarOperador() {
    var valor = $('#formulaIndicador').textbox('getValue');
    $('#formulaIndicador').textbox('setValue', valor += ' ' + $('#cboOperadores').combobox('getValue'));
}


function limpiarFomula() {
    $('#formulaIndicador').textbox('setValue', '');
}

function insertarMonto() {
    var valor = $('#formulaIndicador').textbox('getValue');
    $('#formulaIndicador').textbox('setValue', valor += ' ' + $('#txtMonto').textbox('getValue'));
}

function GUARDAR_INDICADOR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var quincenas = "", eximpNM = "", exetipNM = "", impNM = "", descinst = "", apliter = "", aplipa = "", aplicaimp = "", sinpromen = "", exeimp = "0", exetip = "", apliplp = "", propret = "", Prevision_Soc = "", acumtot = "", calcret = "", apli1plaza = "", calcbimestre = "", bono = "", ppto = "", tipopago = "", tipoformula = "", numdias = "0"; exetip = "0";
        if (document.getElementById('chkIndPenAli').checked)
        { aplipa = '1'; } else { aplipa = '0'; }
        //if (document.getElementById('chkIndAplImp').checked)
        //{ aplicaimp = 'S'; } else { aplicaimp = 'N'; }
        if (document.getElementById('chkSinProMen').checked)
        { sinpromen == '1'; } else { sinpromen = '0' };
        //if (document.getElementById('chkExencionImp').checked)
        //{ exeimp = '1'; } else { exeimp = '0' }
        if (document.getElementById('chkAplPla').checked)
        { apliplp = 'S'; } else { apliplp = 'N' }
        if (document.getElementById('chkProRet').checked)
        { propret = 'S'; } else { propret = 'N' }
        if (document.getElementById('chkAplPreSoc').checked)
        { Prevision_Soc = 'S'; } else { Prevision_Soc = 'N' }
        if (document.getElementById('chkAcuTot').checked)
        { acumtot = '1'; } else { acumtot = '0' }
        if (document.getElementById('chkCalRet').checked)
        { calcret = '1'; } else { calcret = '0' }
        if (document.getElementById('chkApl1Pla').checked)
        { apli1plaza = '1'; } else { apli1plaza = '0' }
        if (document.getElementById('chkAplBim').checked)
        { calcbimestre = '1'; } else { calcbimestre = '0' }
        if (document.getElementById('chkBono').checked)
        { bono = '1'; } else { bono = '0' }
        if (document.getElementById('chkAfePre').checked)
        { ppto = '1'; } else { ppto = '0' }
        if (document.getElementById('chkApliTerc').checked)
        { apliter = '1'; } else { apliter = '0' }
        if (document.getElementById('chkDescInstitu').checked)
        { descinst = '1'; } else { descinst = '0' }
        //if (document.getElementById('chkimpuestoNM').checked)
        //{ impNM = 'S'; } else { impNM = 'N' }
        //if (document.getElementById('chkeximpNM').checked)
        //{ eximpNM = '1'; } else { eximpNM = '0' }


        if ($('#cboTipPag').combobox('getValue') == "1") { tipopago = "Q"; } else { tipopago = "PF"; }
        if ($('#cboTipApl').combobox('getValue') == "Formula") { tipoformula = "FN" } else { tipoformula = "I"; };
        //if ($('#cboexetipNM').combobox('getValue') == "") { exetipNM = "" } else { exetipNM = $('#cboexetipNM').combobox('getValue') };
        // if (document.getElementById('chkExencionImp').checked == true) { numdias = $('#txtNumdias').textbox('getValue'); exetip = $('#cboTipExe').combobox('getValue'); } else { numdias = 0; exetip = 0;}


        var valores = $('#cboQuiSel').combobox('getValues');
        for (var i = 0; i < valores.length; i++) {
            quincenas += "''" + valores[i] + "'',";
        }

        quincenas = quincenas.substring(0, quincenas.length - 1);
        var parametros = {};
        parametros.clavPe = $('#txtNoPlazas').textbox('getValue');
        parametros.clvfrm = $('#cboSubFijo').combobox('getValue');
        parametros.descpe = $('#txtDescRecibo').textbox('getValue');
        parametros.descop = $('#txtDescCompleta').textbox('getValue');
        parametros.indant = $('#txtReferencia').textbox('getValue');
        parametros.parprepe = "";// $('#cboClaPreCon').combobox('getValue');
        parametros.vigini = $('#dtpVigIni').datebox('getValue');
        parametros.capitulo = "";//$('#cboCapitulo').combobox('getValue');
        parametros.topeminimo = $('#txtTopeMaximo').numberbox('getValue');
        parametros.topemaximo = $('#txtTopeMinimo').numberbox('getValue');
        parametros.nomcampo = $('#txtNomCampo').textbox('getValue');
        parametros.tipopago = tipopago;
        parametros.cvefamind = $('#cboFamInd').combobox('getValue');
        parametros.cvefuentefin = "";//$('#cboFueFin').combobox('getValue');

        parametros.apliimp = "";//aplicaimp;
        parametros.appper = quincenas;
        parametros.sinpromen = sinpromen;
        parametros.exeimp = exeimp;
        parametros.exetip = exetip;
        parametros.numdias = numdias;
        parametros.apliplp = apliplp;
        parametros.propret = propret;
        parametros.prevision_soc = Prevision_Soc;
        parametros.acumtot = acumtot;
        parametros.acumissste = "0";
        parametros.acum2nom = "0";
        parametros.reintegro = "0";
        parametros.calcret = calcret;
        parametros.apli1plaza = apli1plaza;
        parametros.calcBimestre = calcbimestre;
        parametros.bono = bono
        parametros.cadtippl = "";
        parametros.ppto = ppto
        parametros.apliterceros = apliter;
        parametros.descinstitucional = descinst;
        parametros.qnaproyec = "Todas";
        parametros.tipoFormula = tipoformula;
        parametros.frmper = $('#formulaIndicador').textbox('getValue');
        parametros.tipoind = (menuSeleccionado.id == 'aPercepciones') ? "P" : ((menuSeleccionado.id == 'aDeducciones')) ? "D" : "A";
        parametros.cvetiposat = (($('#cbotiposat').combobox('getValue') == 'x') ? "" : $('#cbotiposat').combobox('getValue'));
        parametros.cvesat = (($('#cbocvesat').combobox('getValue') == 'x') ? "" : $('#cbocvesat').textbox('getValue'));
        //parametros.apliimpNM = impNM;
        //parametros.exeimpNM = eximpNM;
        //parametros.exevalNM = (($('#txtexvalNM').textbox('getValue') == "") ? "" : $('#txtexvalNM').textbox('getValue'));
        //parametros.exetipNM = (($('#cboexetipNM').combobox('getValue') == 'x') ? "" : $('#cboexetipNM').textbox('getValue'));
        parametros.importe = 0;//$('#txtimporte').numberbox('getValue');

        $.ajax({
            type: "POST",
            url: "utileriasIndicadores.aspx/guardar_indicador",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0")
                { $.messager.alert('Información', data.d[1], 'info'); }
                else
                { $.messager.alert('Error', data.d[1], 'error'); }
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
