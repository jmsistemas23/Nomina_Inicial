var strquin = "",strtipoquin="";
var tipo = "";
var checkedRows = [];
$(document).ready(function () {  
    

    if ($_GET('quin') != null) {
        strquin = $_GET('quin');
    } else { strquin = ''; }

    if ($_GET('tipoquin') != null) {
        strtipoquin = $_GET('tipoquin');
    } else { strtipoquin = ''; }


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
    
    if (strtipoquin == 'A') { document.getElementById('llblquin').innerHTML = "Quincena ACTUAL a Generar"; }
    else {
        document.getElementById('llblquin').innerHTML = "Quincena " + strquin + " a Generar";       
    }
 
    LISTAR_PERFILES('RN');   
       
    $('#btnAdFolios').bind('click', function () { ABRIR_VENTANA_FOLIOS('#btnAdFolios'); });

    $('#btnRecibo').bind('click', function () { LISTAR_PERFILES('RN'); tipo = 'RN';});
    $('#btnCheque').bind('click', function () { LISTAR_PERFILES('CH'); tipo = 'CH'; });
    $('#btnPension').bind('click', function () { LISTAR_PERFILES('PN'); tipo = 'PN'; });

    $('#btnR').bind('click', function () { LISTAR_FOLIOS_PRODUCCION('#dgfolios', '#btnFolios');});
    $('#btnC').bind('click', function () { LISTAR_FOLIOS_PRODUCCION('#dgfolios', '#btnFolios'); });
    $('#btnP').bind('click', function () { LISTAR_FOLIOS_PRODUCCION('#dgfolios', '#btnFolios');  });

    $('#btnAceptarFolios').bind('click', function () { ACEPTAR_FOLIO('#dgprod', '#btnAceptarFolios'); });
    $('#btnLimpiarFolios').bind('click', function () { LIMPIAR_FOLIO('#btnLimpiarFolios'); });

    $('#btnGenerar').bind('click', function () { GENERAR_PRODUCCION('#btnGenerar'); });   
    $('#btnFolios').bind('click', function () { LISTAR_FOLIOS_PRODUCCION('#dgfolios', '#btnFolios'); });
    $('#btnGenerarReporte').bind('click', function () { GENERAR_REPORTES('#btnGenerarReporte'); });

    $('#btnRegresar').bind('click', function () { document.location = "Validar_Produccion.aspx"; });
    
    $('#btnLimpiarProd').bind('click', function () { LIMPIAR_TABLAS_PRODUCCION(); });
    //$('#txtrecibo').textbox('textbox').mask("999999999", { placeholder: "" });
    //$('#txtcheque').textbox('textbox').mask("999999999", { placeholder: "" });

    $('#txtfecha').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#txtvigencia').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#txtperiodo').textbox('textbox').mask("99/99/9999--99/99/9999", { placeholder: "dd/mm/aaaa--dd/mm/aaaa" });

    $('#txtfecha').datebox({
        onSelect: function (date) {                    
            if (!date) { return ' '; }
            var y = date.getFullYear();
            var m = date.getMonth() + 3;
            var d = date.getDate();
           var fecha=(d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
           $('#txtvigencia').datebox('setValue', fecha);
        },
    });

    $('#dgprod').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id'
    });
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].cveperfil == row.cveperfil) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].cveperfil == row.cveperfil) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function LIMPIAR_TABLAS_PRODUCCION()
{
    checkedRows = [];
    if (strquin == "") { strquin = 'Actual'; }
    var parametros = {};
    parametros.strquincena = strquin;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Limpiar_Produccion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
            } else { $.messager.alert('Error', data.d[1], 'error'); }
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

function ABRIR_VENTANA_FOLIOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var folio = "",añoquin="",ext="";
        var d = new Date();
              
        var months = ["01", "02", "03", "04", "05", "06", "07",
             "08", "09", "10", "11", "12"];
            var mes = months[d.getMonth()];
            var año = d.getFullYear().toString();           

            if (strquin=="Actual")
            { folio = año.substr(2, 2) + $("[name='hquiact']").val() + '00001'; }
            else {
                //11_Ext1_2019
                //11_2019
                quincena = strquin.substring(0, 2);
                if (strquin.length > 7) {
                    añoquin = strquin.substr(strquin.length - 2, 2);
                    //ext = strquin.replace(strquin.substr(strquin.length - 5, 5), '');
                    //numext = ext.replace(quincena_ + "Ext", '');
                    folio = añoquin + quincena + '00001';
                }
                else {
                    folio = strquin.substr(5, 2) + quincena + '00001';
                }
            }
                  
        //if ($('#btnCheque').linkbutton('options').selected)
        //{        
        //    var text = $('#txtcheque');
        //    text.textbox('textbox').focus();
        //}
        $('#txtrecibo').textbox('setValue', folio);
        //var text = $('#txtrecibo');
        //text.textbox('textbox').focus();
       
        windows("#wincaptura", 500, 300,false, 'Captura de Folios de Producción');
    }
}

function ACEPTAR_FOLIO(dgcontrol,btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cheque = "";       
        var dg = $('#dgprod');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            var perpago = "";
            if ($('#txtrecibo').textbox('getValue') == "") { $.messager.alert('Error', "Falta el Número de Recibo", 'error'); return 0; }
            else
            {
                if ($('#txtperiodo').textbox('getValue') == 'dd/mm/aaaa-dd/mm/aaaa') { perpago = ""; } else { perpago = $('#txtperiodo').textbox('getValue'); }

                if ($('#txtcheque').textbox('getValue') == "") { cheque = 0; } else { cheque = $('#txtcheque').textbox('getValue'); }

                $('#dgprod').datagrid('updateRow', {
                    index: cell.index,
                    row: {
                        recibo: $('#txtrecibo').textbox('getValue'),
                        cheque: cheque,
                        fecha: $('#txtfecha').datebox('getValue'),
                        periodo: perpago,
                        vigencia: $('#txtvigencia').datebox('getValue'),
                        leyenda: $('#txtleyenda').textbox('getValue')
                    }
                });
                $('#dgprod').datagrid('endEdit');

                ACTUALIZAR_FOLIO($('#txtrecibo').textbox('getValue'), cheque, $('#txtfecha').datebox('getValue'), perpago, $('#txtvigencia').datebox('getValue'), $('#txtleyenda').textbox('getValue'), $('#dgprod').datagrid('getRows')[cell.index].cveconsulta, $('#dgprod').datagrid('getRows')[cell.index].cveperfil);
            }
            $('#dgprod').datagrid('unselectRow', $('#dgprod').datagrid('getRowIndex', cell.index));
            $("#wincaptura").window('close');
        //var cheque = "";
        //var rows = $(dgcontrol).datagrid('getSelected');
        //if (rows) {
        //    var perpago = "";           
        //    if ($('#txtrecibo').textbox('getValue') == "") { $.messager.alert('Error', "Falta el Número de Recibo", 'error'); return 0; }
        //    else
        //    {
        //        if ($('#txtperiodo').textbox('getValue') == 'dd/mm/aaaa-dd/mm/aaaa') { perpago = ""; } else { perpago = $('#txtperiodo').textbox('getValue'); }
                
        //        if ($('#txtcheque').textbox('getValue') == "") { cheque = 0; } else { cheque = $('#txtcheque').textbox('getValue'); }

        //        $(dgcontrol).datagrid('updateRow', {
        //            index: $(dgcontrol).datagrid('getRowIndex', rows),
        //            row: {
        //                recibo: $('#txtrecibo').textbox('getValue'),
        //                cheque: cheque,
        //                fecha: $('#txtfecha').datebox('getValue'),
        //                periodo: perpago,
        //                vigencia: $('#txtvigencia').datebox('getValue'),
        //                leyenda: $('#txtleyenda').textbox('getValue')
        //            }
        //        });
        //        $(dgcontrol).datagrid('endEdit');

        //        ACTUALIZAR_FOLIO($('#txtrecibo').textbox('getValue'), cheque, $('#txtfecha').datebox('getValue'), perpago, $('#txtvigencia').datebox('getValue'), $('#txtleyenda').textbox('getValue'), rows.cveconsulta, rows.cveperfil);
        //    }
        //    $('#dgprod').datagrid('unselectRow', $('#dgprod').datagrid('getRowIndex', rows));
        //    $("#wincaptura").window('close');
        }
    }
}

function ACTUALIZAR_FOLIO(recibo,cheque, fecha, periodo, vigencia, leyenda,cveconsulta,cveperfil)
{
    var quin = "";
    if (strquin=="") { quin='Actual';} else{quin=strquin ; }
    var parametros = {};
    parametros.recibo = recibo;
    parametros.cheque = parseInt(cheque);
    parametros.fecha = fecha;
    parametros.periodo = periodo;
    parametros.vigencia = vigencia;
    parametros.leyenda = leyenda;
    parametros.cveconsulta = cveconsulta;
    parametros.cveperfil = cveperfil;
    parametros.quincena = quin;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Actualizar_Folios',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
            } else { $.messager.alert('Error', data.d[1], 'error'); }
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

function LIMPIAR_FOLIO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var d = new Date();
        if ($('#btnRecibo').linkbutton('options').selected) {
            var months = ["01", "02", "03", "04", "05", "06", "07",
             "08", "09", "10", "11", "12"];
            var mes = months[d.getMonth()];
            var año = d.getFullYear().toString();
            folio = año.substr(2, 2) + mes + '00001';
            var text = $('#txtfecha');
            text.textbox('textbox').focus();
        }
        else {
            folio = "1";
            var text = $('#txtcheque');
            text.textbox('textbox').focus();
        }
        $('#txtrecibo').textbox('setValue', folio);
        $('#txtcheque').textbox('setValue', '');
        $('#txtfecha').datebox('setValue', '');
        $('#txtperiodo').textbox('setValue', '');
        $('#txtleyenda').textbox('setValue', '');
        $('#txtvigencia').datebox('setValue','');
    }
}

function LISTAR_FOLIOS_PRODUCCION(dgcontrol, btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if ($('#btnR').linkbutton('options').selected) { tipo = 'RN' }
        else
            if ($('#btnC').linkbutton('options').selected) { tipo = 'CH' }
            else
                if ($('#btnP').linkbutton('options').selected) { tipo = 'PN' }

        var quin = "";
        if (strquin=="") { quin='Actual';} else{quin=strquin ; }
        $(dgcontrol).datagrid({
            url: 'Listar_Folios_Produccion.aspx?tipo=' + tipo+'&quin='+quin,
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
            complete: function ()
            { $('#loading').hide(100); }           
        });
      

        windows("#winfolios", 700, 500,false, 'Folios Generados');
    }
}

function GENERAR_PRODUCCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tipo = "", folios = "", quincena = "";
        var quin = "";
        if (strquin == "") { quin = 'Actual'; } else { quin = strquin; }

        if ($('#btnRecibo').linkbutton('options').selected) { tipo = 'RN' }
        else
            if ($('#btnCheque').linkbutton('options').selected) { tipo = 'CH' }
            else
                if ($('#btnPension').linkbutton('options').selected) { tipo = 'PN' }
      

        if (checkedRows.length > 0) {
            for (var p = 0; p < checkedRows.length; p++) {
                if ((tipo == 'CH') && (checkedRows[p].cheque != 0))
                { folios += checkedRows[p].cveconsulta + checkedRows[p].cveperfil + "|"; }
                else
                    if ((tipo == 'RN') && (checkedRows[p].recibo != 0))
                    { folios += checkedRows[p].cveconsulta + checkedRows[p].cveperfil + "|"; }
                    else
                        if ((tipo == 'PN') && (checkedRows[p].cheque != 0))
                        { folios += checkedRows[p].cveconsulta + checkedRows[p].cveperfil + "|"; }
            }
            folios = folios.substring(0, folios.length - 1);
        }
        //else {
        //    var rows = $('#dgprod').datagrid('getSelected');
        //    if (rows) {
        //        folios = rows['cveconsulta'] + "" + rows['cveperfil'];
        //        $('#dgprod').datagrid('unselectRow', $('#dgprod').datagrid('getRowIndex', rows));
        //    }
        //}
        GENERAR_FOLIOS(folios, tipo, quin);


        //var rows = $('#dgprod').datagrid('getSelected');
        //if (rows) {
        //    folios = rows['cveconsulta'] + "" + rows['cveperfil'];
        //    $('#dgprod').datagrid('unselectRow', $('#dgprod').datagrid('getRowIndex', rows));
        //}
        //else {
        //    var data = $('#dgprod').datagrid('getData');
        //    for (var p = 0; p < data.rows.length; p++) {
        //        if ((tipo == 'CH') && ($('#dgprod').datagrid('getRows')[p].cheque != 0))
        //        { folios += $('#dgprod').datagrid('getRows')[p].cveconsulta + $('#dgprod').datagrid('getRows')[p].cveperfil + "|"; }
        //        else
        //            if ((tipo == 'RN') && ($('#dgprod').datagrid('getRows')[p].recibo != 0))
        //            { folios += $('#dgprod').datagrid('getRows')[p].cveconsulta + $('#dgprod').datagrid('getRows')[p].cveperfil + "|"; }
        //            else
        //                if ((tipo == 'PN') && ($('#dgprod').datagrid('getRows')[p].cheque != 0))
        //                { folios += $('#dgprod').datagrid('getRows')[p].cveconsulta + $('#dgprod').datagrid('getRows')[p].cveperfil + "|"; }
        //    }
        //    folios = folios.substring(0, folios.length - 1);
        //}        
      
    }
}

function GENERAR_FOLIOS(folios,tipo,quincena) {
    var obj;
    var parametros = {};
    parametros.strtipo = tipo;
    parametros.strfolios = folios;
    parametros.strquincena = quincena;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Generar_Produccion',
        data: JSON.stringify(parametros),
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                obj = $.parseJSON(data.d[0]);               
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            $('#loading').hide(100);

            if (tipo == 'RN') {  $('#btnR').linkbutton({ selected: true }); }
            else
                if (tipo == 'CH') {  $('#btnC').linkbutton({ selected: true }); }
                else
                    if (tipo == 'PN') { $('#btnP').linkbutton({ selected: true }); }

            $('#dgfolios').datagrid({
                data: obj,
                pagination: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
            });
            windows("#winfolios", 700, 500,false, 'Folios Generados');            
        }
    });
}


function GENERAR_REPORTES(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var quin = "";
        if (strquin == "") { quin = 'Actual'; } else { quin = strquin; }

        var parametros = {};     
        parametros.strquincena = quin;
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Generar_Reportes',
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "0") {
                    $.messager.alert('Información', data.d[0], 'info');
                } else { $.messager.alert('Error', 'Error al generar la información de reportes', 'error'); }
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
}

function LISTAR_PERFILES(condicion) {

    var quin = "";
    if (strquin == "") { quin = 'Actual'; } else { quin = strquin; }
    $('#dgprod').datagrid({
        url: 'Listar_Perfiles_Produccion.aspx?&tipo=' + condicion + "&quin=" + quin,
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
        onClickRow: function () {
            $('#btnAdFolios').linkbutton('enable');
        }
    });   
}

function CARGAR_FECHAS_HISTORIA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //tquincenas

        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Listar_Quincenas',
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                var obj = jQuery.parseJSON(data.d[0]);
                $('#tquincenas').tree({
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
}
