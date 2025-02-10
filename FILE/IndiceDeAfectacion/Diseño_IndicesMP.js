var indice = "", strindice = "";
var indseleccionado = false;
var tipoind = "";
var tipoModificacionIndicadores;
var simbolo = "";
var dgcampos = "";
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

    indice = $_GET('indice');
    if (indice == undefined) {
        indice = '';
    }
    strindice = $_GET('strindice');
    if (strindice == undefined) {
        strindice = '';
    }

    document.getElementById('lblindice').innerHTML = "Indice: " + strindice;

    CARGAR_CHK();

    tipoModificacionIndicadores = listarTipoDeModificacionDeIndicadores(indice);

    FILTRAR_TREE_TXT('#txtcamcap0', '#tvcamcap0');
    FILTRAR_TREE_TXT('#txtcampla1', '#tvcampla1');
    FILTRAR_TREE_TXT('#txtcamcap1', '#tvcamcap1');
    FILTRAR_TREE_TXT('#txtcampla2', '#tvcampla2');
    FILTRAR_TREE_TXT('#txtcamcap2', '#tvcamcap2');
    FILTRAR_TREE_TXT('#txtcamcap3', '#tvcamcap3');
    FILTRAR_TREE_TXT('#txtcamemp4', '#tvcamemp4');
    FILTRAR_TREE_TXT('#txtcamcap4', '#tvcamcap4');
    FILTRAR_TREE_TXT('#txtcamemp5', '#tvcamemp5');

    listarCamposMovimientosParaIndices('plazas', '#tvcamcap0');
    listarCamposMovimientosParaIndices('capmov', '#tvcamcap1');
    listarCamposMovimientosParaIndices('plazas', '#tvcampla1');
    listarCamposMovimientosParaIndices('capmov', '#tvcamcap2');
    listarCamposMovimientosParaIndices('plazas', '#tvcampla2');
    listarCamposMovimientosParaIndices('plazas', '#tvcamcap3');
    listarCamposMovimientosParaIndices('capmov', '#tvcamcap4');
    listarCamposMovimientosParaIndices('empleados', '#tvcamemp4');
    listarCamposMovimientosParaIndices('empleados', '#tvcamemp5');
    
    listarCamposPorIndiceYTipo(0, '#dgcamcaptura0');
    listarCamposPorIndiceYTipo(1, '#dgcamcaptura1');
    listarCamposPorIndiceYTipo(2, '#dgcamcaptura2');
    listarCamposPorIndiceYTipo(3, '#dgcamcaptura3');
    listarCamposPorIndiceYTipo(4, '#dgcamcaptura4');
    listarCamposPorIndiceYTipo(5, '#dgcamcaptura5');

    $('#btnRegresarInd').bind('click', function () {
        //window.location = 'IndicesMP.aspx?indice=&strindice=';
        IR_PAGINA('IndicesMP.aspx', 'indice=&strindice=');
    });

    FILTRAR_TREE_TXT('#txtindicador', '#tindicadores');

    $('#btnLInd').bind('click', function () {
        $('#txtindicador').textbox('setValue', '');
        $('#tindicadores').tree('doFilter', '');
        $('#tindicadores').tree('expandAll');
        LIMPIAR_NODECHK_TREE('#tindicadores', '');
    });

    $('#tindicadores').tree({
        onCheck: function (node) {
            var ch = node.checked;
            if (ch == true) {
                var ban = BUSCAR_INDICADOR_SELECCIONADO('#dgind', node);
                if (ban == false) { CARGAR_CAMPO_SELECCIONADO(node); }
            }
            if (ch == false)
            { QUITAR_CAMPO_SELECCIONADO(node); }
        },
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    CARGAR_CAMPO_SELECCIONADO(node);
                }
                else {
                    var ban = BUSCAR_INDICADOR_SELECCIONADO('#dgind', node);
                    if (ban == false) { QUITAR_CAMPO_SELECCIONADO(node); }
                }
            }
        }
    });

    $('#btnGInd').bind('click', function () { GUARDAR_INDICADOR(); });

    /*VBALORES DE CONFIGURACION DE BORRAR CAMPOS PLAZA ORIGEN*/
    $('#btnAcampla0').bind('click', function () { AGREGAR_CAMPO_CAPTURA_0('#btnAcampla0'); });
    $('#btnEcampla0').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_0('#btnEcampla0'); });
    $('#btnGcampla0').bind('click', function () { GUARDAR_CAMPO_CAPTURA_0('#btnGcampla0'); });
    $('#btnLcampla0').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_0('#btnLcampla0'); });

    $('#dgcamcaptura0').datagrid({
        onClickRow: function () {
            $('#btnLcampla0').linkbutton({ disabled: false });
            $('#btnGcampla0').linkbutton({ disabled: false });
            $('#btnEcampla0').linkbutton({ disabled: false });

            var filas = $('#dgcamcaptura0').datagrid('getSelected');
            if ((filas.destino == "cadperper") || (filas.destino == "caddedper") || (filas.destino == "cadaportper"))
            { $('#btnInd0').linkbutton({ disabled: false }); }
            else { $('#btnInd0').linkbutton({ disabled: true }); }
        }
    });

    $('#tvcamcap0').tree({
        onClick: function (node) {
            if (node.name != 0) {
                var dg0 = $('#dgcamcaptura0');
                var rows = dg0.datagrid('getRows');
                for (var i = 0; i < rows.length; i++) {
                    if (node.name == rows[i].destino) {
                        dg0.datagrid('selectRow', i);
                    }
                    else { dg0.datagrid('unselectRow', i); }
                }
                $('#btnEcampla0').linkbutton({ disabled: true });
                $('#btnInd0').linkbutton({ disabled: true });
            }
        }
    });

    $('#btnInd0').bind('click', function () {
        $('#loading').show();
        dgcampos = "#dgcamcaptura0";
        AGREGAR_INDICADOR_CAPTURA0('#btnInd0');
    });
      
    /*VALORES DE CONFIGURACION DE CAMPOS CAPTURA A PLAZA ORIGEN*/
    $('#btnAcampla1').bind('click', function () { AGREGAR_CAMPO_CAPTURA_1('#btnAcampla1'); });
    $('#btnEcampla1').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_1('#btnEcampla1'); });
    $('#btnGcampla1').bind('click', function () { GUARDAR_CAMPO_CAPTURA_1('#btnGcampla1'); });
    $('#btnLcampla1').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_1('#btnLcampla1'); });

    $('#dgcamcaptura1').datagrid({
        onClickRow: function () {
            $('#btnLcampla1').linkbutton({ disabled: false });
            $('#btnGcampla1').linkbutton({ disabled: false });
            $('#btnEcampla1').linkbutton({ disabled: false });
           
        }
        //onLoadSuccess: function () {
        //    $(this).datagrid('getPanel').find('.easyui-linkbutton').each(function () {
        //        $(this).linkbutton({
        //            onClick: function () {
        //                var id = $(this).attr('row-id');                      
        //            }
        //        })
        //    })
        //}
    });
     
    $('#tvcamcap1').tree({
        onClick: function (node) {
            //if (node.name != 0) {
            //    var dg1 = $('#dgcamcaptura1');
            //    var rows = dg1.datagrid('getRows');                
            //    for (var i = 0; i < rows.length; i++) {
            //        if (node.name == rows[i].origen) {
            //            dg1.datagrid('selectRow', i);
            //        }
            //        else { dg1.datagrid('unselectRow', i); }
            //    }
            //}
        }
    });

    /*VALORES DE CONFIGURACION DE CAMPOS CAPTURA A PLAZA DESTINO*/
    $('#btnAcampla2').bind('click', function () { AGREGAR_CAMPO_CAPTURA_2('#btnAcampla2'); });
    $('#btnEcampla2').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_2('#btnEcampla2'); });
    $('#btnGcampla2').bind('click', function () { GUARDAR_CAMPO_CAPTURA_2('#btnGcampla2'); });
    $('#btnLcampla2').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_2('#btnLcampla2'); });

    $('#dgcamcaptura2').datagrid({
        onClickRow: function () {
            $('#btnLcampla2').linkbutton({ disabled: false });
            $('#btnGcampla2').linkbutton({ disabled: false });
            $('#btnEcampla2').linkbutton({ disabled: false });          
        }
    });

    $('#tvcamcap2').tree({
        onClick: function (node) {
            if (node.name != 0) {
                //var dg2 = $('#dgcamcaptura2');
                //var rows = dg2.datagrid('getRows');
                //for (var i = 0; i < rows.length; i++) {
                //    if (node.name == rows[i].origen) {
                //        dg2.datagrid('selectRow', i);
                //    }
                //    else { dg2.datagrid('unselectRow', i); }
                //}
            }
        }
    });
   
    /*VALORES DE CONFIGURACION DE CAMPOS DE PLAZA ORIGEN A PLAZA DESTINO*/
    $('#btnAcampla3').bind('click', function () { AGREGAR_CAMPO_CAPTURA_3('#btnAcampla3'); });
    $('#btnEcampla3').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_3('#btnEcampla3'); });
    $('#btnGcampla3').bind('click', function () { GUARDAR_CAMPO_CAPTURA_3('#btnGcampla3'); });
    $('#btnLcampla3').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_3('#btnLcampla3'); });

    $('#dgcamcaptura3').datagrid({
        onClickRow: function () {
            $('#btnLcampla3').linkbutton({ disabled: false });
            $('#btnGcampla3').linkbutton({ disabled: false });
            $('#btnEcampla3').linkbutton({ disabled: false });

            var filas = $('#dgcamcaptura3').datagrid('getSelected');
            if ((filas.origen == "cadperper") || (filas.origen == "caddedper") || (filas.origen == "cadaportper"))
            { $('#btnInd3').linkbutton({ disabled: false }); }
            else { $('#btnInd3').linkbutton({ disabled: true }); }
        }
    });

    $('#tvcamcap3').tree({
        onClick: function (node) {
            //if (node.name != 0) {
            //    var dg3 = $('#dgcamcaptura3');
            //    var rows = dg3.datagrid('getRows');
            //    for (var i = 0; i < rows.length; i++) {
            //        if (node.name == rows[i].origen) {
            //            dg3.datagrid('selectRow', i);
            //        }
            //        else { dg3.datagrid('unselectRow', i); }
            //    }
            //}
            $('#btnEcampla3').linkbutton({ disabled: true });
            $('#btnInd3').linkbutton({ disabled: true });
        }
    });

    $('#btnInd3').bind('click', function () {
        $('#loading').show();
        dgcampos = "#dgcamcaptura3";
        AGREGAR_INDICADOR_CAPTURA3('#btnInd3');
    });

    /*VALORES DE CONFIGURACION DE CAMPOS CAPTURA A EMPLEADOS*/
    $('#btnAcamemp4').bind('click', function () { AGREGAR_CAMPO_CAPTURA_4('#btnAcamemp4'); });
    $('#btnEcamemp4').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_4('#btnEcamemp4'); });
    $('#btnGcamemp4').bind('click', function () { GUARDAR_CAMPO_CAPTURA_4('#btnGcamemp4'); });
    $('#btnLcamemp4').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_4('#btnLcamemp4'); });

    $('#dgcamcaptura4').datagrid({
        onClickRow: function () {
            $('#btnLcamemp4').linkbutton({ disabled: false });
            $('#btnGcamemp4').linkbutton({ disabled: false });
            $('#btnEcamemp4').linkbutton({ disabled: false });
        }
    });

    $('#tvcamcap4').tree({
        onClick: function (node) {
            //if (node.name != 0) {
            //    var dg4 = $('#dgcamcaptura4');
            //    var rows = dg4.datagrid('getRows');
            //    for (var i = 0; i < rows.length; i++) {
            //        if (node.name == rows[i].origen) {
            //            dg4.datagrid('selectRow', i);
            //        }
            //        else { dg4.datagrid('unselectRow', i); }
            //    }
            //}
        }
    });

    /*VALORES DE CONFIGURACION BORRAR CAMPO DE EMPLEADOS*/
    $('#btnAcamemp5').bind('click', function () { AGREGAR_CAMPO_CAPTURA_5('#btnAcamemp5'); });
    $('#btnEcamemp5').bind('click', function () { ELIMINAR_CAMPO_CAPTURA_5('#btnEcamemp5'); });
    $('#btnGcamemp5').bind('click', function () { GUARDAR_CAMPO_CAPTURA_5('#btnGcamemp5'); });
    $('#btnLcamemp5').bind('click', function () { LIMPIAR_CAMPO_CAPTURA_5('#btnLcamemp5'); });

    $('#dgcamcaptura5').datagrid({
        onClickRow: function () {
            $('#btnLcamemp5').linkbutton({ disabled: false });
            $('#btnGcamemp5').linkbutton({ disabled: false });
            $('#btnEcamemp5').linkbutton({ disabled: false });

            var filas = $('#dgcamcaptura5').datagrid('getSelected');
            if ((filas.origen == "cadperper") || (filas.origen == "caddedper") || (filas.origen == "cadaportper"))
            { $('#btnInd5').linkbutton({ disabled: false }); }
            else { $('#btnInd5').linkbutton({ disabled: true }); }
        }
    });

    $('#tvcamemp5').tree({
        onClick: function (node) {
            //if (node.name != 0) {
            //    var dg5 = $('#dgcamcaptura5');
            //    var rows = dg5.datagrid('getRows');
            //    for (var i = 0; i < rows.length; i++) {
            //        if (node.name == rows[i].origen) {
            //            dg5.datagrid('selectRow', i);
            //        }
            //        else { dg5.datagrid('unselectRow', i); }
            //    }
            //}
            $('#btnEcampla5').linkbutton({ disabled: true });
            $('#btnInd5').linkbutton({ disabled: true });
        }
    });

    $('#btnInd5').bind('click', function () {
        $('#loading').show();
        AGREGAR_INDICADOR_CAPTURA5('#btnInd5');
    });

    $('#btnGuardar').bind('click', function () { GUARDAR_CAMPOS_INDICE(); });

    //$('#dgcamcaptura1').datagrid('enableCellEditing').datagrid('gotoCell', {
    //    index: 1,
    //    field: 'id',
    //});
    //$('#dgcamcaptura1').datagrid({
    //    pagination: false,
    //    enableFilter: false,
    //    rownumbers: true,
    //    singleSelect: false,
    //    striped: true,
    //    pageSize: 20,
    //    checkOnSelect: false,
    //    selectOnCheck: false,       
    //    onBeginEdit: function (index, row) {
    //        var dg = $(this);            
    //        var tipo = dg.datagrid('getEditor', { index: index, field: 'tipo' });           
    //        $(tipo.target).combobox({
    //            onChange: function (value) {
    //                dato = value;
    //                if (value == 'E') {
                       
    //                }                   
    //            }
    //        })           
    //    }
    //});
   
});

function showButton(val, row,index) {
    for (var name in row) {
        if (row["origen"] == "cadperpermp") {
            // $('#dgcamcaptura1').datagrid('showColumn', 'ind')                       
            var s = "<button id=" + row.origen + " class='easyui-linkbutton' iconCls=\"icon-add\"  data-options=\"plain:true,iconCls:'icon-add'\"  onclick=\"receive_goods(this)\">Ver</button>";            
            return s;         
        }
    }
}

function receive_goods(valor)
{
    alert(valor.id);
}

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

function formatDetail(value, row) {  
    return '<a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" row-id="' + row.origen + '">Indicador</a>';
}


function listarChecksPorIndice() {
    var parametros = {};
    var dat;    
    parametros.clave = indice;
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

function CARGAR_CHK()
{
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

function listarCamposMovimientosParaIndices(tabla,tobj) {
    var dat;
    var parametros = {};
    parametros.tabla = tabla;

    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposCaptura",
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
            $(tobj).tree({
                data: dat,
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

function listarCamposPorIndiceYTipo(tipo, dgobj) {
    var parametros = {};
    var obj;
    parametros.clave = indice;
    parametros.indice = tipo;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/listarCamposPorIndiceYTipo_DG",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                obj = JSON.parse(data.d[0]);
            }
            $(dgobj).datagrid({
                data: obj,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
                beforeSend: function () {
                    $('#loading').show();
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () {
                    $('#loading').hide(100);
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

function MOSTRAR_INDICADORES(objtv, tipoind) {
    var parametros = {};
    var obj;
    parametros.tipoind = tipoind;   
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/Listar_Indicadores",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            //$('#loading').show();
        },
        success: function (data) {
            var objcampos = $.parseJSON(data.d[0]);
            $(objtv).tree({
                data: objcampos
            });
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.resposetext, 'error');
        },
        complete: function () {
           // $('#loading').hide(100);
        }
    });
}
function CARGAR_INDICADORES_SELECCIONADOS(objdg)
{
    var parametros = {};
   
    parametros.indicamp = indice;
    parametros.campo = campo;
    parametros.tipo=tipoind
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/Indicadores_Seleccionados",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
          //  $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                var obj = $.parseJSON(data.d[0]);
                for (var i = 0; i < obj.length; i++) {
                    $(objdg).datagrid('insertRow', {
                        index: i,
                        row: {
                            cveind: obj[i].cveind,
                            desind: obj[i].desind,
                        }
                    });                 
                }
                //$(objdg).datagrid({
                //    data: obj
                //});
                var tri = $('#tindicadores').tree('getRoots');
                for (var t = 0; t < obj.length; t++) {
                    for (var h = 0; h < tri.length; h++) {
                        if (obj[t].cveind == tri[h].name) {
                            $('#tindicadores').tree('check', tri[h].target)
                            break;
                        }
                    }
                }
            }           
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.resposetext, 'error');
        },
        complete: function () {
            //$('#loading').hide(100);
           
        }
    });
}

function CARGAR_CAMPO_SELECCIONADO(node) {
    var dg = $('#dgind');
    var total = dg.datagrid('getData').total;

    var cellcampo = dg.datagrid('cell');
    if (cellcampo == null) {
        dg.datagrid('insertRow', {
            index: total,
            row: {
                cveind: node.name,
                desind: node.text,
            }
        });
        $('#tindicadores').tree('unselect', node.target);
        $('#tindicadores').tree('check', node.target);
    }
    else {
        $.messager.confirm('Confirm', 'Desea reemplazar el indicador ' + dg.datagrid('getRows')[cellcampo.index].cveind, function (r) {
            if (r) {
                dg.datagrid('updateRow', {
                    index: cellcampo.index,
                    row: {
                        cveind: node.name,
                        desind: node.text,
                    }
                });

                var nodes = $('#tindicadores').tree('getChecked', ['checked']);
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].name == dg.datagrid('getRows')[cellcampo.index].cveind)
                    { $('#tindicadores').tree('uncheck', nodes[i].target); }
                }
                $('#tindicadores').tree('check', node.target);
                $('#tindicadores').tree('unselect', node.target);
            }
            else {
                $('#tindicadores').tree('uncheck', node.target);
                $('#tindicadores').tree('unselect', node.target);
            }
        });
    }

    $('#txtindicador').textbox('setValue', '');
}
function QUITAR_CAMPO_SELECCIONADO(node) {
    var dg = $('#dgind');
    var rows = dg.datagrid('getRows');
    for (var p = 0; p < dg.datagrid('getData').total; p++) {
        if (node.name == rows[p].cveind) {
            dg.datagrid('deleteRow', p);
            var t = $('#tindicadores');
            var snode = t.tree('getSelected');
            if (snode != null) {
                t.tree('uncheck', snode.target);
                t.tree('unselect', snode.target);
            }
        }
    }
}
function BUSCAR_INDICADOR_SELECCIONADO(dgobj, node) {
    var ban = false;
    var rows = $(dgobj).datagrid('getRows');
    var total = $(dgobj).datagrid('getData').total;
    for (var n = 0; n < total; n++) {
        if (node.name == rows[n].cveind) { ban = true; }
    }
    if ($(dgobj).datagrid('getData').total == 0) { ban = false; }
    return ban;
}

function AGREGAR_CAMPO_CAPTURA_0(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamcap0');
        var campocaptura = t.tree('getSelected');
        if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else
        {
            var tipo = "";
            var dg = $('#dgcamcaptura0');

            if ((campocaptura.name == 'cadperper') || (campocaptura.name == 'caddedper') || (campocaptura.name == 'cadaportper'))
            { tipo = "T"; }

            var filas = dg.datagrid('getSelected');
            if (filas == null) {
                if (total = dg.datagrid('getData').total > 0)
                { total = dg.datagrid('getData').total + 1; }
                else { total = 0; }

                dg.datagrid('insertRow', {
                    index: total,
                    row:
                        {
                            destino: campocaptura.name,
                            desc_des: campocaptura.text,
                            tipo:tipo
                        }
                });
            }
            else {
                var rowIndex = dg.datagrid("getRowIndex", filas);
                dg.datagrid('updateRow', {
                    index: rowIndex,
                    row:
                        {
                            destino: campocaptura.name,
                            desc_des: campocaptura.text,
                            tipo: tipo
                        }
                });
            }

            $('#btnGcampla0').linkbutton({ disabled: false });

            $('#txtcamcap0').textbox('setValue', '');
            var t = $('#tvcamcap0');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
                t.tree('doFilter', '');
            }
        }
    }
}
function ELIMINAR_CAMPO_CAPTURA_0(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura0');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
                //$('#btnLcampla0').linkbutton({ disabled: true });
                $('#btnEcampla0').linkbutton({ disabled: true });
                $('#btnInd0').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_0(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamcap0').textbox('setValue', '');
        var t = $('#tvcamcap0');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        //$('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });  
        var dg = $('#dgcamcaptura0');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcampla0').linkbutton({ disabled: true });
        $('#btnEcampla0').linkbutton({ disabled: true });
        $('#btnInd0').linkbutton({ disabled: true });
    }
}


function AGREGAR_INDICADOR_CAPTURA0(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var dg = $('#dgcamcaptura0');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {           
            if (filas.destino == "cadperper") { campo = "indoriper"; tipoind = 'P'; simbolo = "+"; }
            if (filas.destino == "caddedper") { campo = "indorided"; tipoind = 'D'; simbolo = "-"; }
            if (filas.destino == "cadaportper") { campo = "indoriapo"; tipoind = 'A'; simbolo = "+"; }

            MOSTRAR_INDICADORES('#tindicadores', tipoind);
            CARGAR_INDICADORES_SELECCIONADOS('#dgind');
                                  
            $('#loading').hide(100);
            windows("#wind", 500, 600, false, 'Relación de Indicadores');            
        }
    }
}

function AGREGAR_INDICADOR()
{

    var objlstcampos = [];
    var lstcampos = { id: "", name: "", text: "" };
    lstcampos.id = c;
    lstcampos.text = node.text;
    lstcampos.name = node.name + "-" + node.text;
    objlstcampos.push(lstcampos);

    $('#tvcolconsulta').tree({
        data: objlstcampos
    });
}


//function BUSCAR_CAMPO_EN_LISTA(dgobj,campoabuscar)
//{
//    var res = "";
//    var dg = $(dgobj);
//    for (var i = 0; i < dg.datagrid('getData').total; i++) {
//        if (campoabuscar == dg.datagrid('getRows')[i].origen) {           
//            res = "Elemento repetido en Campos de captura a plaza origen (" + dg.datagrid('getRows')[i].desc_ori + ") en la posicion " + i;
//            break;
//        }       
//    }
//    return res;
//}

function AGREGAR_CAMPO_CAPTURA_1(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var camorigen = "";
        var dg = $('#dgcamcaptura1');
        var t = $('#tvcampla1');
        var campoplaza = t.tree('getSelected');
        if (campoplaza == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la plaza origen', 'error'); return 0; }
        else
        {
            var t = $('#tvcamcap1');
            var campocaptura = t.tree('getSelected');
            if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la captura', 'error'); return 0; }
            else
            {                
                var filas = dg.datagrid('getSelected');
                if (filas == null) {
                    if (total = dg.datagrid('getData').total > 0)
                    { total = dg.datagrid('getData').total + 1; }
                    else { total = 0; }
                   
                    dg.datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoplaza.name,
                                desc_des: campoplaza.text
                            }
                    });
                }
                else {                   
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                   dg.datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoplaza.name,
                                desc_des: campoplaza.text
                            }
                    });
                }

                $('#btnGcampla1').linkbutton({ disabled: false });

                $('#txtcampla1').textbox('setValue', '');
                var t = $('#tvcampla1');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }

                $('#txtcamcap1').textbox('setValue', '');
                var t = $('#tvcamcap1');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }
            }
        }

    }
}
function ELIMINAR_CAMPO_CAPTURA_1(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura1');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
                //$('#btnLcampla1').linkbutton({ disabled: true });              
                $('#btnEcampla1').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_1(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcampla1').textbox('setValue', '');
        var t = $('#tvcampla1');
        t.tree('doFilter', '');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        

        $('#txtcamcap1').textbox('setValue', '');
        var t = $('#tvcamcap1');
        t.tree('doFilter', '');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }        
     
        var dg = $('#dgcamcaptura1');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcampla1').linkbutton({ disabled: true });
        $('#btnEcampla1').linkbutton({ disabled: true });
        $('#btnInd1').linkbutton({ disabled: true });
    }
}
function GUARDAR_CAMPO_CAPTURA_1(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //var dg = $('#dgcamcaptura');
        //var cadcaptura = "", cadconfiguracion = "", camorigen = "";
        //var total = dg.datagrid('getData').total;
        //for (var p = 0; p < total; p++) {

        //    if (dg.datagrid('getRows')[p].camorigen != undefined) { camorigen = dg.datagrid('getRows')[p].camorigen; }

        //    cadcaptura += dg.datagrid('getRows')[p].namecamcap + "|";
        //    cadconfiguracion += dg.datagrid('getRows')[p].camconsulta + "/" + dg.datagrid('getRows')[p].namecamcap + "/" + dg.datagrid('getRows')[p].camcaptura + "/" + camorigen + "|";
        //}
        //cadcaptura = cadcaptura.substring(0, cadcaptura.length - 1);
        //cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);

        //var campos = "configuracionCamposcaptura=''" + cadconfiguracion + "'',consultaBusqueda_CamposCaptura=''" + cadcaptura + "''";

        //var dg = $('#dgcampos');
        //var cell = dg.datagrid('cell');

        //INSERTAR_CAMPOS_CAPTURA(campos, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

        //if (error == "0") {
        //    $.messager.alert('Información', 'La relación de los campos captura-consulta se ha guardado', 'info');

        //    var campocap = "";
        //    if (cadconfiguracion != "") { campocap = "Si"; }
        //    $('#dgcampos').datagrid('updateRow', {
        //        index: cell.index,
        //        row: { CampoCaptura: campocap }
        //    });
        //    // $('#dgcampos').datagrid('checkRow', cell.index);
        //    $('#dgcampos').datagrid('endEdit', cell.index);
        //    $('#dgcampos').datagrid('beginEdit', cell.index);
        //    $("#wcamcaptura").window('close');
        //}
    }
}


function AGREGAR_CAMPO_CAPTURA_2(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcampla2');
        var campoconsulta = t.tree('getSelected');
        if (campoconsulta == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la plaza destino', 'error'); return 0; }
        else
        {
            var t = $('#tvcamcap2');
            var campocaptura = t.tree('getSelected');
            if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la captura', 'error'); return 0; }
            else
            {
                var camorigen = "";
                var dg = $('#dgcamcaptura2');
                var filas = dg.datagrid('getSelected');
                if (filas == null) {
                    if (total = dg.datagrid('getData').total > 0)
                    { total = dg.datagrid('getData').total + 1; }
                    else { total = 0; }

                    dg.datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoconsulta.name,
                                desc_des: campoconsulta.text
                            }
                    });
                }
                else {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoconsulta.name,
                                desc_des: campoconsulta.text
                            }
                    });
                }

                $('#btnGcampla2').linkbutton({ disabled: false });

                $('#txtcampla2').textbox('setValue', '');
                var t = $('#tvcampla2');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }

                $('#txtcamcap2').textbox('setValue', '');
                var t = $('#tvcamcap2');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }
            }
        }

    }
}
function ELIMINAR_CAMPO_CAPTURA_2(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura2');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
               // $('#btnLcampla2').linkbutton({ disabled: true });
                $('#btnEcampla2').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_2(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcampla2').textbox('setValue', '');
        var t = $('#tvcampla2');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        $('#txtcamcap2').textbox('setValue', '');
        var t = $('#tvcamcap2');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        //$('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });  
        var dg = $('#dgcamcaptura2');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcampla2').linkbutton({ disabled: true });
        $('#btnEcampla2').linkbutton({ disabled: true });
    }
}
function GUARDAR_CAMPO_CAPTURA_2(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //var dg = $('#dgcamcaptura');
        //var cadcaptura = "", cadconfiguracion = "", camorigen = "";
        //var total = dg.datagrid('getData').total;
        //for (var p = 0; p < total; p++) {

        //    if (dg.datagrid('getRows')[p].camorigen != undefined) { camorigen = dg.datagrid('getRows')[p].camorigen; }

        //    cadcaptura += dg.datagrid('getRows')[p].namecamcap + "|";
        //    cadconfiguracion += dg.datagrid('getRows')[p].camconsulta + "/" + dg.datagrid('getRows')[p].namecamcap + "/" + dg.datagrid('getRows')[p].camcaptura + "/" + camorigen + "|";
        //}
        //cadcaptura = cadcaptura.substring(0, cadcaptura.length - 1);
        //cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);

        //var campos = "configuracionCamposcaptura=''" + cadconfiguracion + "'',consultaBusqueda_CamposCaptura=''" + cadcaptura + "''";

        //var dg = $('#dgcampos');
        //var cell = dg.datagrid('cell');

        //INSERTAR_CAMPOS_CAPTURA(campos, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

        //if (error == "0") {
        //    $.messager.alert('Información', 'La relación de los campos captura-consulta se ha guardado', 'info');

        //    var campocap = "";
        //    if (cadconfiguracion != "") { campocap = "Si"; }
        //    $('#dgcampos').datagrid('updateRow', {
        //        index: cell.index,
        //        row: { CampoCaptura: campocap }
        //    });
        //    // $('#dgcampos').datagrid('checkRow', cell.index);
        //    $('#dgcampos').datagrid('endEdit', cell.index);
        //    $('#dgcampos').datagrid('beginEdit', cell.index);
        //    $("#wcamcaptura").window('close');
        //}
    }
}

function AGREGAR_CAMPO_CAPTURA_3(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamcap3');
        var campocaptura = t.tree('getSelected');
        if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else
        {
            var tipo = "";
            var dg = $('#dgcamcaptura3');

            if ((campocaptura.name == 'cadperper') || (campocaptura.name == 'caddedper') || (campocaptura.name == 'cadaportper'))
            { tipo = "T"; }

            var filas = dg.datagrid('getSelected');
            if (filas == null) {
                if (total = dg.datagrid('getData').total > 0)
                { total = dg.datagrid('getData').total + 1; }
                else { total = 0; }
               
                dg.datagrid('insertRow', {
                    index: total,
                    row:
                        {
                            origen: campocaptura.name,
                            desc_ori: campocaptura.text,
                            tipo: tipo
                        }
                });
            }
            else {
                var rowIndex = dg.datagrid("getRowIndex", filas);
                dg.datagrid('updateRow', {
                    index: rowIndex,
                    row:
                        {
                            origen: campocaptura.name,
                            desc_ori: campocaptura.text,
                            tipo: tipo
                        }
                });
            }

            $('#btnGcampla3').linkbutton({ disabled: false });

            $('#txtcamcap3').textbox('setValue', '');
            var t = $('#tvcamcap3');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
                t.tree('doFilter', '');
            }
        }
    }
}
function ELIMINAR_CAMPO_CAPTURA_3(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura3');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
                //$('#btnLcampla3').linkbutton({ disabled: true });
                $('#btnEcampla3').linkbutton({ disabled: true });
                $('#btnInd3').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_3(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamcap3').textbox('setValue', '');
        var t = $('#tvcamcap3');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        //$('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });  
        var dg = $('#dgcamcaptura3');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcampla3').linkbutton({ disabled: true });
        $('#btnEcampla3').linkbutton({ disabled: true });
        $('#btnInd3').linkbutton({ disabled: true });
    }
}

function AGREGAR_INDICADOR_CAPTURA3(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura3');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            if (filas.origen == "cadperper") { campo = "inddesper"; tipoind = 'P'; simbolo = "+"; }
            if (filas.origen == "caddedper") { campo = "inddesded"; tipoind = 'D'; simbolo = "-"; }
            if (filas.origen == "cadaportper") { campo = "inddesapo"; tipoind = 'A'; simbolo = "+"; }

            MOSTRAR_INDICADORES('#tindicadores', tipoind);
            CARGAR_INDICADORES_SELECCIONADOS('#dgind');
            windows("#wind", 500, 600, false, 'Relación de Indicadores');
        }
    }
}

function AGREGAR_CAMPO_CAPTURA_4(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamemp4');
        var campoconsulta = t.tree('getSelected');
        if (campoconsulta == null) { $.messager.alert('Error', 'Falta seleccionar el campo del empleado', 'error'); return 0; }
        else
        {
            var t = $('#tvcamcap4');
            var campocaptura = t.tree('getSelected');
            if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo de la captura', 'error'); return 0; }
            else
            {
                var camorigen = "";
                var dg = $('#dgcamcaptura4');
                var filas = dg.datagrid('getSelected');
                if (filas == null) {
                    if (total = dg.datagrid('getData').total > 0)
                    { total = dg.datagrid('getData').total + 1; }
                    else { total = 0; }

                    dg.datagrid('insertRow', {
                        index: total,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoconsulta.name,
                                desc_des: campoconsulta.text
                            }
                    });
                }
                else {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('updateRow', {
                        index: rowIndex,
                        row:
                            {
                                origen: campocaptura.name,
                                desc_ori: campocaptura.text,
                                destino: campoconsulta.name,
                                desc_des: campoconsulta.text
                            }
                    });
                }

                $('#btnGcamemp4').linkbutton({ disabled: false });

                $('#txtcamemp4').textbox('setValue', '');
                var t = $('#tvcamemp4');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }

                $('#txtcamcap4').textbox('setValue', '');
                var t = $('#tvcamcap4');
                var node = t.tree('getSelected');
                if (node != undefined) {
                    t.tree('unselect', node.target);
                    t.tree('doFilter', '');
                }
            }
        }

    }
}
function ELIMINAR_CAMPO_CAPTURA_4(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura4');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
               // $('#btnLcamemp4').linkbutton({ disabled: true });
                $('#btnEcamemp4').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_4(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamemp4').textbox('setValue', '');
        var t = $('#tvcamemp4');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        $('#txtcamcap4').textbox('setValue', '');
        var t = $('#tvcamcap4');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        //$('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });  
        var dg = $('#dgcamcaptura4');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcamemp4').linkbutton({ disabled: true });
        $('#btnEcamemp4').linkbutton({ disabled: true });
    }
}
function GUARDAR_CAMPO_CAPTURA_4(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //var dg = $('#dgcamcaptura');
        //var cadcaptura = "", cadconfiguracion = "", camorigen = "";
        //var total = dg.datagrid('getData').total;
        //for (var p = 0; p < total; p++) {

        //    if (dg.datagrid('getRows')[p].camorigen != undefined) { camorigen = dg.datagrid('getRows')[p].camorigen; }

        //    cadcaptura += dg.datagrid('getRows')[p].namecamcap + "|";
        //    cadconfiguracion += dg.datagrid('getRows')[p].camconsulta + "/" + dg.datagrid('getRows')[p].namecamcap + "/" + dg.datagrid('getRows')[p].camcaptura + "/" + camorigen + "|";
        //}
        //cadcaptura = cadcaptura.substring(0, cadcaptura.length - 1);
        //cadconfiguracion = cadconfiguracion.substring(0, cadconfiguracion.length - 1);

        //var campos = "configuracionCamposcaptura=''" + cadconfiguracion + "'',consultaBusqueda_CamposCaptura=''" + cadcaptura + "''";

        //var dg = $('#dgcampos');
        //var cell = dg.datagrid('cell');

        //INSERTAR_CAMPOS_CAPTURA(campos, "", "", "campo=''" + $('#dgcampos').datagrid('getRows')[cell.index].Campo + "''", $('#dgcampos').datagrid('getRows')[cell.index].Campo);

        //if (error == "0") {
        //    $.messager.alert('Información', 'La relación de los campos captura-consulta se ha guardado', 'info');

        //    var campocap = "";
        //    if (cadconfiguracion != "") { campocap = "Si"; }
        //    $('#dgcampos').datagrid('updateRow', {
        //        index: cell.index,
        //        row: { CampoCaptura: campocap }
        //    });
        //    // $('#dgcampos').datagrid('checkRow', cell.index);
        //    $('#dgcampos').datagrid('endEdit', cell.index);
        //    $('#dgcampos').datagrid('beginEdit', cell.index);
        //    $("#wcamcaptura").window('close');
        //}
    }
}

function AGREGAR_CAMPO_CAPTURA_5(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var t = $('#tvcamemp5');
        var campocaptura = t.tree('getSelected');
        if (campocaptura == null) { $.messager.alert('Error', 'Falta seleccionar el campo del empleado', 'error'); return 0; }
        else
        {
            var camorigen = "";
            var dg = $('#dgcamcaptura5');
            var filas = dg.datagrid('getSelected');
            if (filas == null) {
                if (total = dg.datagrid('getData').total > 0)
                { total = dg.datagrid('getData').total + 1; }
                else { total = 0; }

                dg.datagrid('insertRow', {
                    index: total,
                    row:
                        {
                            origen: campocaptura.name,
                            desc_ori: campocaptura.text
                        }
                });
            }
            else {
                var rowIndex = dg.datagrid("getRowIndex", filas);
                dg.datagrid('updateRow', {
                    index: rowIndex,
                    row:
                        {
                            origen: campocaptura.name,
                            desc_ori: campocaptura.text
                        }
                });
            }

            $('#btnGcamemp5').linkbutton({ disabled: false });

            $('#txtcamemp5').textbox('setValue', '');
            var t = $('#tvcamemp5');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
                t.tree('doFilter', '');
            }
        }
    }
}
function ELIMINAR_CAMPO_CAPTURA_5(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura5');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el campo', function (r) {
                if (r) {
                    var rowIndex = dg.datagrid("getRowIndex", filas);
                    dg.datagrid('deleteRow', rowIndex);
                }
               // $('#btnLcamemp5').linkbutton({ disabled: true });
                $('#btnEcamemp5').linkbutton({ disabled: true });
                $('#btnInd5').linkbutton({ disabled: true });
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el campo a eliminar', 'error'); }
    }
}
function LIMPIAR_CAMPO_CAPTURA_5(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcamemp5').textbox('setValue', '');
        var t = $('#tvcamemp5');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }
        t.tree('doFilter', '');

        //$('#dgcamcaptura').datagrid('loadData', { "total": 0, "rows": [] });  
        var dg = $('#dgcamcaptura5');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('unselectRow', rowIndex);
        }
        $('#btnGcamemp5').linkbutton({ disabled: true });
        $('#btnEcamemp5').linkbutton({ disabled: true });
        $('#btnInd5').linkbutton({ disabled: true });
    }
}

function AGREGAR_INDICADOR_CAPTURA5(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var dg = $('#dgcamcaptura5');
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            if (filas.origen == "cadperper") { campo = "indempper"; tipoind = 'P'; simbolo = "+"; }
            if (filas.origen == "caddedper") { campo = "indempded"; tipoind = 'D'; simbolo = "-"; }
            if (filas.origen == "cadaportper") { campo = "indempapo"; tipoind = 'A'; simbolo = "+"; }

            MOSTRAR_INDICADORES('#tindicadores', tipoind);

            windows("#wind", 500, 600, false, 'Relación de Indicadores');
        }
    }
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
        //var quitarRenglon = new Array();
        //var tablaBorraOrigen = document.getElementById('tblBorrarOrigen');        
        //for (var i = 1; i < tablaBorraOrigen.rows.length; i++) {
        //    var row = tablaBorraOrigen.rows[i];
        //    if (row.cells[1].childNodes[0].value == 'cadperper' || row.cells[1].childNodes[0].value == 'caddedper' || row.cells[1].childNodes[0].value == 'cadaportper') {
        //        quitarRenglon.push(i);
        //    }
        //}
        //var selNumRows = document.getElementById('selBorrarCamposPlazaOrigen');
        //selNumRows.value = selNumRows.value - quitarRenglon.length;
        //for (var i = quitarRenglon.length - 1 ; i > -1 ; i--) {
        //    tablaBorraOrigen.deleteRow(quitarRenglon[i]);
        //}
        //for (var i = 1; i < tablaBorraOrigen.rows.length; i++) {
        //    var row = tablaBorraOrigen.rows[i];
        //    row.cells[0].innerHTML = i;
        //}
        /*******************************************************************/
        //quitarRenglon = new Array();
        //var tablaOrigenADestino = document.getElementById('tblOrigenADestino');
        //for (var i = 1; i < tablaOrigenADestino.rows.length; i++) {
        //    var row = tablaOrigenADestino.rows[i];
        //    if (row.cells[1].childNodes[0].value == 'cadperper' || row.cells[1].childNodes[0].value == 'caddedper' || row.cells[1].childNodes[0].value == 'cadaportper') {
        //        quitarRenglon.push(i);
        //    }
        //}
        //var selNumRows = document.getElementById('selPlazaOrigenAPlazaDestino');
        //selNumRows.value = selNumRows.value - quitarRenglon.length;
        //for (var i = quitarRenglon.length - 1 ; i > -1 ; i--) {
        //    tablaOrigenADestino.deleteRow(quitarRenglon[i]);
        //}
        //for (var i = 1; i < tablaOrigenADestino.rows.length; i++) {
        //    var row = tablaOrigenADestino.rows[i];
        //    row.cells[0].innerHTML = i;
        //}
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

function sacarCamposAGrabar()
{
    var resultadoCompleto = "";
    tipoModificacionIndicadores.oricadper = "";
    tipoModificacionIndicadores.oricadded = "";
    tipoModificacionIndicadores.oricadapo = "";
    tipoModificacionIndicadores.descadper = "";
    tipoModificacionIndicadores.descadded = "";
    tipoModificacionIndicadores.descadapo = "";

    //captura a plaza origen
    var resultadoCapAOri = "";
    var dg = $('#dgcamcaptura1');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoCapAOri += "(''" + indice + "''," + fila++ + ",1,''" + rows[i].origen + "'',''" + rows[i].destino + "''),";
    }
    resultadoCompleto += (resultadoCapAOri != '') ? resultadoCapAOri : "";


    //borrar campos origen
    var resultadoBorraOrigen = "";
    var dg = $('#dgcamcaptura0');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoBorraOrigen += "(''" + indice + "''," + fila++ + ",0,'''',''" + rows[i].destino + "''),";
        if (rows[i].destino == 'cadperper') {
            tipoModificacionIndicadores.oricadper = rows[i].tipo;
        } 
        if (rows[i].destino == 'caddedper'){
            tipoModificacionIndicadores.oricadded = rows[i].tipo;
        } 
        if (rows[i].destino == 'cadaportper') {
            tipoModificacionIndicadores.oricadapo = rows[i].tipo;
        } 
    }
    resultadoCompleto += (resultadoBorraOrigen != '') ? resultadoBorraOrigen : "";
      
    //captura a plaza destino
    var resultadoCapADes = "";
    var dg = $('#dgcamcaptura2');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoCapADes += "(''" + indice + "''," + fila++ + ",2,''" + rows[i].origen + "'',''" + rows[i].destino + "''),";
    }
    resultadoCompleto += (resultadoCapADes != '') ? resultadoCapADes : "";


    //campo de plaza origen a plaza destino
    var resultadoOriADes = "";
    var dg = $('#dgcamcaptura3');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoOriADes += "(''" + indice + "''," + fila++ + ",3,''" + rows[i].origen + "'',''" + rows[i].origen + "''),";

        if (rows[i].origen == 'cadperper') {
            tipoModificacionIndicadores.descadper = rows[i].tipo;
        } 
        if (rows[i].origen == 'caddedper') {
            tipoModificacionIndicadores.descadded = rows[i].tipo;
        } 
        if (rows[i].origen == 'cadaportper') {
            tipoModificacionIndicadores.descadapo = rows[i].tipo;
        } 
    }
    resultadoCompleto += (resultadoOriADes != '') ? resultadoOriADes : "";


    //captura a empleados
    var resultadoCapAEmp = "";
    var dg = $('#dgcamcaptura4');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoCapAEmp += "(''" + indice + "''," + fila++ + ",4,''" + rows[i].origen + "'',''" + rows[i].destino + "''),";
    }
    resultadoCompleto += (resultadoCapAEmp != '') ? resultadoCapAEmp : "";


    //borrar a empleados
    var resultadoBorrarEmp = "";
    var dg = $('#dgcamcaptura5');
    var rows = dg.datagrid('getRows');
    var fila = 1;
    for (var i = 0; i < rows.length; i++) {
        resultadoBorrarEmp += "(''" + indice + "''," + fila++ + ",7,''" + rows[i].origen + "'',''''),";
    }
    resultadoCompleto += (resultadoBorrarEmp != '') ? resultadoBorrarEmp : "";

    return resultadoCompleto.substring(0, resultadoCompleto.length - 1);
}

function sacarllaves()
{
    var strllaves = "";

    var dg = $('#dgcamcaptura1');
    var rows1 = dg.datagrid('getRows');
    if (rows1.length > 0)
    {
        strllaves+="llavea=''numplamp'',llaveb=''numplaza'',"
    }
    var dg = $('#dgcamcaptura3');
    var rows3 = dg.datagrid('getRows');
    if (rows3.length > 0) {
        strllaves += "pladesa=''numpldmp'',pladesb=''numplaza'',"
    }

    //var dg = $('#dgcamcaptura4');
    //var rows4 = dg.datagrid('getRows');
    //if (rows3.length > 0) {
    //    strllaves +="empleo=''numempmp'',empled=''numrmdmp'',"
    //}
    return strllaves.substring(0, strllaves.length - 1);
}



function GUARDAR_CAMPOS_INDICE() {  
        var resCampos = sacarCamposAGrabar();        
        //var indicamp = indicadoresPorIndice.indoriper + "|" + indicadoresPorIndice.indorided + "|" + indicadoresPorIndice.indoriapo + "|" + indicadoresPorIndice.inddesper + "|" + indicadoresPorIndice.inddesded + "|" + indicadoresPorIndice.inddesapo
        var modificadores = tipoModificacionIndicadores.oricadper + "|" + tipoModificacionIndicadores.oricadded + "|" + tipoModificacionIndicadores.oricadapo + "|" + tipoModificacionIndicadores.descadper + "|" + tipoModificacionIndicadores.descadded + "|" + tipoModificacionIndicadores.descadapo;
        var checksDelIndice = separarChecksDelIndice();
        var llaves = sacarllaves();
        var parametros = {};
        parametros.resCampos = resCampos;
        parametros.indicamp = "";
        parametros.modificadores = modificadores;
        parametros.checksDelIndice = checksDelIndice;
        parametros.cveInd = indice;
        parametros.llaves = llaves;
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
}

function GUARDAR_INDICADOR() {
    var campocondicion = "", diseñocondicion = "";
    var dg = $('#dgind');
    var rows = dg.datagrid('getRows');
    var total = dg.datagrid('getData').total;
    for (i = 0; i < total; i++) {
        campocondicion += rows[i].cveind + simbolo;     
    }
    if (campocondicion != "") {
        diseñocondicion = diseñocondicion.substring(0, campocondicion.length - 1);
    }

    var parametros = {};
    parametros.indicamp = indice;
    parametros.campo = campo;
    parametros.indicadores = campocondicion;
    $.ajax({
        type: "POST",
        url: "utileriaDeIndices.aspx/Grabar_Indicadores",
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
            {
                $.messager.alert('Información', data.d[1], 'info');
                var filas = $(dgcampos).datagrid('getSelected');
                var rowIndex = $(dgcampos).datagrid("getRowIndex", filas);
                var strtipo = "";
                if (filas.tipo == 'E') { strtipo = 'T'; } else { strtipo = 'E'; }

                    $(dgcampos).datagrid('updateRow', {
                        index: rowIndex,
                        row: { tipo: strtipo }
                    });                
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
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