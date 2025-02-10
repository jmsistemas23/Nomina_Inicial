var chkRowsDoc = [];
$(document).ready(function () {    
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
    $('#btnbuscar').bind('click', function () { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); });

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); }
        }
    });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DOCUMENTOS('#btnLimpiar'); });

    $('#btnGuardar').bind('click', function () { GUARDAR_DOCUMENTOS('#btnGuardar'); });
   
});
$(window).load(function () {
    SACAR_NOMINAS();
    LISTAR_DOCUMENTOS("");
});

function onCheckDoc(index, row) {
    for (var i = 0; i < chkRowsDoc.length; i++) {
        if (chkRowsDoc[i].numdocmp == row.numdocmp) {
            return
        }
    }
    chkRowsDoc.push(row);
}
function onUncheckDoc(index, row) {
    var dg = $(this);
    for (var i = 0; i < chkRowsDoc.length; i++) {
        if (chkRowsDoc[i].numdocmp == row.numdocmp) {
            chkRowsDoc.splice(i, 1);
            dg.datagrid('unselectRow', index);
            return;
        }
    }
}



function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
             //$('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);           
            if (obj.length > 0) {
                $('#lblnominas').hide();
                $('#dbusqueda').show();               
            }
            else {
                $('#lblnominas').show();
                $('#dbusqueda').hide();
                valnomina = '';
                nominasel = '';
            }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function LISTAR_DOCUMENTOS(strcondicion) {  
        var parametros = {};
        parametros.condicion = strcondicion;
        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Listar_Documentos',
            data: JSON.stringify(parametros),
            dataType: "json",           
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "") {
                    obj = $.parseJSON(data.d[0]);
                    objdis = data.d[1];
                    objdoc = $.parseJSON(data.d[2]);
                    if (obj.length > 0) {
                        $('#btnGuardar').linkbutton({ disabled: false });
                    } else { $('#btnGuardar').linkbutton({ disabled: true }); }

                        CARGAR_DG("#dg", obj, objdis, objdoc);
                        CARGAR_CAMPOSBUSQUEDA_COL('#dg', '#cbocampos', 1);                                      
                    $('#dg').show();                   
                }
            },
            error: function (a, b, c) {
                $('#loading').hide(100);
                $.messager.alert('Error', c, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });  
}

function CARGAR_DG(dgcontrol, objdato, objdis,objdoc) {
    var col = $.parseJSON(objdis);
    $(dgcontrol).datagrid({
        data: objdato,
        columns: col.columns,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        autoLoad: true,
        singleSelect: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: true,
        selectOnCheck: true,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');           
            checkedRows = allRows;
        },
        onUncheckAll: function () {            
            checkedRows = [];
        },      
        onCheck: onCheckDoc,
        onUncheck: onUncheckDoc,      
        beforeSend: function () {
            $('#loading').show();
        },
        onCheckAll: function () {
            chkRowsDoc = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {
            chkRowsDoc = [];
        },        
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        onLoadSuccess: function (data) {
            if (objdoc.length > 0) {
                var dg = $(this);
                var rows = dg.datagrid('getRows');
                for (var d = 0; d < objdoc.length; d++) {
                    for (i = 0; i < rows.length; i++) {
                        if (dg.datagrid('getRows')[i].numdocmp == objdoc[d].Documento) {
                            dg.datagrid('checkRow', i);
                            break;
                        }
                    }
                }
            }
        }
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
    filtrar = true;
    LISTAR_DOCUMENTOS(strconplaza)
}

function LIMPIAR_DOCUMENTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $("#txtvalor").textbox('setValue', '');
        var data = $("#cbocampos").combobox('getData'); // get all data dropdown
        if (data.length > 0) {
            // If there is data, then the first data selected by default
            $("#cbocampos").combobox('select', data[0].Clave);
        }
        var data = $("#cbocondicion").combobox('getData'); // get all data dropdown
        if (data.length > 0) {
            // If there is data, then the first data selected by default
            $("#cbocondicion").combobox('select', data[0].value);
        }
        if (filtrar == false) {
            var filas = $('#dg').datagrid('getSelected');
            if (filas != null) {
                var rowIndex = $('#dg').datagrid("getRowIndex", filas);
                $('#dg').datagrid('unselectRow', rowIndex);
            }
        }
        else {
            FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue'));
        }
    }
}

function GUARDAR_DOCUMENTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var cadena = "",tipoplaza="";
        if (chkRowsDoc.length == 0) { $.messager.alert('Error', 'Falta Seleccionar los Documentos', 'error');  }
        else {
            for (var j = 0; j < chkRowsDoc.length; j++) {
                if (chkRowsDoc[j].numdocmp != "") {
                    cadena += chkRowsDoc[j].numdocmp + "|";
                }
                else { cadena = ""; break; }
            }           
            cadena = cadena.substring(0, cadena.length - 1);

            if ($('#rbplazaD').is(":checked") == true) 
                { tipoplaza = "D"; }
                if ($('#rbplazaT').is(":checked") == true) 
                    { tipoplaza = "OD"; }
            
            var parametros = {};           
            parametros.cadena = cadena;
            parametros.tipoplaza = tipoplaza;
            $.ajax({
                type: "POST",
                url: "Funciones.aspx/GUARDAR_DOCUMENTOS",
                data: JSON.stringify(parametros),
                dataType: "json",
                async: false,
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
                    else { $.messager.alert('Información', data.d[1], 'info'); }
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
}