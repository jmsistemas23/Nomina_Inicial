var checkedRows = [];
var chkRowsEstPla = [];
var objtxt = "";
var objtxtestpla = "";
$(document).ready(function () {
    $.session.set('idusuario', 1);

    if ($.session.get('idusuario') == null)
    { window.location.href = '../../Login.aspx'; }

    $('#btnBinddesc').bind('click', function () { objtxt = '#txtIndDesc'; AGREGAR_INDICADOR('#btnBinddesc', "D"); });
    $('#btnLinddesc').bind('click', function () { LIMPIAR_INDICADOR('#btnLinddesc', '#txtIndDesc'); });

    $('#btnBindapo1').bind('click', function () { objtxt = '#txtIndApo1'; AGREGAR_INDICADOR('#btnBindapo1', "A"); });
    $('#btnLindapo1').bind('click', function () { LIMPIAR_INDICADOR('#btnLindapo1', '#txtIndApo1'); });

    $('#btnBindapo2').bind('click', function () { objtxt = '#txtIndApo2'; AGREGAR_INDICADOR('#btnBindapo2', "A"); });
    $('#btnLindapo2').bind('click', function () { LIMPIAR_INDICADOR('#btnLindapo2', '#txtIndApo2'); });

    $('#btnBindapo3').bind('click', function () { objtxt = '#txtIndApo3'; AGREGAR_INDICADOR('#btnBindapo3', "A"); });
    $('#btnLindapo3').bind('click', function () { LIMPIAR_INDICADOR('#btnLindapo3', '#txtIndApo3'); });

    $('#btnBdescuento').bind('click', function () { objtxt = '#txtdescuento'; AGREGAR_INDICADOR('#btnBdescuento', "D"); });
    $('#btnLdescuento').bind('click', function () { LIMPIAR_INDICADOR('#btnLdescuento', '#txtdescuento'); });

    $('#btnBindacudep').bind('click', function () { objtxt = '#txtindacumuladep'; AGREGAR_INDICADOR('#btnBindacudep', "A"); });
    $('#btnLindacudep').bind('click', function () { LIMPIAR_INDICADOR('#btnLindacudep', '#txtindacumuladep'); });

    $('#btnBindacusindical').bind('click', function () { objtxt = '#txtindacumulasindical'; AGREGAR_INDICADOR('#btnBindacusindical', "A"); });
    $('#btnLindacusindical').bind('click', function () { LIMPIAR_INDICADOR('#btnLindacusindical', '#txtindacumulasindical'); });

    $('#btnBindacuotros').bind('click', function () { objtxt = '#txtindacumulaotros'; AGREGAR_INDICADOR('#btnBindacuotros', "A"); });
    $('#btnLindacuotros').bind('click', function () { LIMPIAR_INDICADOR('#btnLindacuotros', '#txtindacumulaotros'); });


    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });

    $('#btnBestatusapo1').bind('click', function () { objtxtestpla = '#txtestatusapo1'; AGREGAR_ESTATUS_PLAZA('#btnBestatusapo1'); });
    $('#btnLestatusapo1').bind('click', function () { LIMPIAR_ESTATUS_PLAZA('#btnLestatusapo1', '#txtestatusapo1'); });

    $('#btnBestatusapo2').bind('click', function () { objtxtestpla = '#txtestatusapo2'; AGREGAR_ESTATUS_PLAZA('#btnBestatusapo2'); });
    $('#btnLestatusapo2').bind('click', function () { LIMPIAR_ESTATUS_PLAZA('#btnLestatusapo2', '#txtestatusapo2'); });

    $('#btnBestatusapo3').bind('click', function () { objtxtestpla = '#txtestatusapo3'; AGREGAR_ESTATUS_PLAZA('#btnBestatusapo3'); });
    $('#btnLestatusapo3').bind('click', function () { LIMPIAR_ESTATUS_PLAZA('#btnLestatusapo3', '#txtestatusapo3'); });

    $('#btnLestpla').bind('click', function () { LIMPIAR_EST_PLA(); });
    $('#btnAestpla').bind('click', function () { ACEPTAR_EST_PLA(); });

    $('#btnGuardar').bind('click', function () { GUARDAR_CONFIGURACION(); });

    $('#dgind').datagrid({
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onLoadSuccess: onLoad,        
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $('#dgind').datagrid('checkRow', index);
        }
    });

    $('#dgestpla').datagrid({
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckep,
        onUncheck: onUncheckep,
        onLoadSuccess: onLoadep,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $('#dgestpla').datagrid('checkRow', index);
        }
    });

    CARGAR_CONFIGURACION();
});

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
function onLoad(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].Clave == row.Clave) {
                    dg.datagrid('checkRow', index);                    
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}

function onCheckep(index, row) {
    for (var i = 0; i < chkRowsEstPla.length; i++) {
        if (chkRowsEstPla[i].Clave == row.Clave) {
            return
        }
    }
    chkRowsEstPla.push(row);
}
function onUncheckep(index, row) {
    for (var i = 0; i < chkRowsEstPla.length; i++) {
        if (chkRowsEstPla[i].Clave == row.Clave) {
            chkRowsEstPla.splice(i, 1);
            return;
        }
    }
}
function onLoadep(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < chkRowsEstPla.length; i++) {
                if (chkRowsEstPla[i].Clave == row.Clave) {
                    dg.datagrid('checkRow', index);                
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}

function AGREGAR_INDICADOR(btnobj,tipoind) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        checkedRows = [];
        CARGAR_IND('#dgind', tipoind, '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 650, 660, 'Aportaciones');
    }
}

function LIMPIAR_INDICADOR(btnobj, objtxt)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $(objtxt).textbox('setValue', '');
    }
}

function CARGAR_IND(dgcontrol, strtipo, condicion) {       
    $(dgcontrol).datagrid({
        url: "ListarIndicadores.aspx?tipoind=" + strtipo + "&busqueda=" + condicion
    });
}

function LIMPIAR_IND_SEL() {
    CARGAR_IND('#dgind', sessionStorage.getItem('tipoind'), '');
    $('#txtvalorind').textbox('setValue', '');
    $('#txtvalorind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');

    tipoind = "";
    checkedRows = [];
}

function ACEPTAR_IND_SEL() {         
    $('#dgind').datagrid('acceptChanges');
    $('#dgind').datagrid('loadData', { "total": 0, "rows": [] });
    var ind = "";
    for (var i = 0; i < checkedRows.length; i++) {
        ind += checkedRows[i].Clave + ",";
    }
    ind = ind.substring(0, ind.length - 1);
    $(objtxt).textbox('setValue', ind)
    tipoind = "";
    checkedRows = [];
    $("#wind").window('close');
    //$('#btnGuardarCap').linkbutton({ disabled: false })
}


function AGREGAR_ESTATUS_PLAZA(btnobj, tipoind) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        CARGAR_ESTATUS_PLAZA('#dgestpla', '');
        FOCUS('#txtvalestpla', "#dgestpla");
        windows("#westpla", 650, 660, 'Estatus Plaza');
    }
}

function LIMPIAR_ESTATUS_PLAZA(btnobj, objtxt) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $(objtxt).textbox('setValue', '');
    }
}

function CARGAR_ESTATUS_PLAZA(dgcontrol, condicion) {
    $(dgcontrol).datagrid({
        url: "ListarEstatusPlaza.aspx?busqueda=" + condicion
    });
}

function ACEPTAR_EST_PLA() {
    $('#dgestpla').datagrid('acceptChanges');
    $('#dgestpla').datagrid('loadData', { "total": 0, "rows": [] });
    var ind = "";
    for (var i = 0; i < chkRowsEstPla.length; i++) {
        ind += chkRowsEstPla[i].Clave + ",";
    }
    ind = ind.substring(0, ind.length - 1);
    $(objtxtestpla).textbox('setValue', ind)
   
    chkRowsEstPla = [];
    $("#westpla").window('close');
    //$('#btnGuardarCap').linkbutton({ disabled: false })
}

function LIMPIAR_EST_PLA() {
    CARGAR_ESTATUS_PLAZA('#dgind', '');
    $('#txtvalestpla').textbox('setValue', '');
    $('#txtvalestpla').textbox('clear').textbox('textbox').focus();
    $('#dgestpla').datagrid('uncheckAll');   
    chkRowsEstPla = [];
}

function CARGAR_CONFIGURACION()
{
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/Cargar_Configuracion',      
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            if (obj.length > 0) {
                $('#txtIndDesc').textbox('setValue', obj[0].Indicador_inscribe);
                $('#txtIndApo1').textbox('setValue', obj[0].Indicador_insc_apo1);
                if (obj[0].estplaapo1 == 0) { document.getElementById('chkestplapo1').checked = true; }
                else { $('#txtestatusapo1').textbox('setValue', obj[0].estplaapo1); }
                $('#txtIndApo2').textbox('setValue', obj[0].Indicador_insc_apo2);
                if (obj[0].estplaapo2 == 0) { document.getElementById('chkestplapo2').checked = true; }
                else { $('#txtestatusapo2').textbox('setValue', obj[0].estplaapo2); }
                $('#txtIndApo3').textbox('setValue', obj[0].Indicador_insc_apo3);
                if (obj[0].estplaapo3 == 0) { document.getElementById('chkestplapo3').checked = true; }
                else { $('#txtestatusapo3').textbox('setValue', obj[0].estplaapo3); }
                $('#txtdescuento').textbox('setValue', obj[0].Indicador);
                $('#txtindacumuladep').textbox('setValue', obj[0].Indicador_apo1);
                $('#txtindacumulasindical').textbox('setValue', obj[0].Indicador_apo2);
                $('#txtindacumulaotros').textbox('setValue', obj[0].Indicador_apo3);
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

function GUARDAR_CONFIGURACION() {
    var estatus1, estatus2, estatus2 = 0;
    var parametros = {};
    if ($('#chkestplapo1').is(":checked") == true) { estatus1 = 0; } else { estatus1 = $('#txtestatusapo1').textbox('getValue'); }
    if ($('#chkestplapo2').is(":checked") == true) { estatus2 = 0; } else { estatus2 = $('#txtestatusapo2').textbox('getValue'); }
    if ($('#chkestplapo3').is(":checked") == true) { estatus3 = 0; } else { estatus3 = $('#txtestatusapo3').textbox('getValue'); }

    parametros.indicador_inscr = $('#txtIndDesc').textbox('getValue');
    parametros.indicador_insc_apo1 = $('#txtIndApo1').textbox('getValue');
    parametros.Estplaapo1 = estatus1;
    parametros.indicador_insc_apo2 = $('#txtIndApo2').textbox('getValue');
    parametros.Estplaapo2 = estatus2;
    parametros.indicador_insc_apo3 = $('#txtIndApo3').textbox('getValue');
    parametros.Estplaapo3 = estatus3;
    parametros.indicador = $('#txtdescuento').textbox('getValue');
    parametros.Indicador_apo1 = $('#txtindacumuladep').textbox('getValue');
    parametros.Indicador_apo2 = $('#txtindacumulasindical').textbox('getValue');
    parametros.Indicador_apo3 = $('#txtindacumulaotros').textbox('getValue');
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/Guardar_Configuracion',
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
            if (obj[0].Error == "1") { $.messager.alert('Error', obj[0].Mensaje, 'error'); }
            else {$.messager.alert('Información', obj[0].Mensaje, 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });    
}




