var checkedRows = [];
$(document).ready(function () {
    CARGAR_DATOS();

    $('#dg').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#btnGuardar').bind('click', function () { APLICAR_FALTASYRETARDOS('#btnGuardar'); });
});



function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].id == row.id) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function CARGAR_DATOS() {  
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_FaltasyRetardos",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        cache: "false",
        beforeSend: function () {
            $('#loading').show();
        },
        onBeforeEdit: function (index, row) {
            row.editing = true;
        },
        success: function (data) {
            if (data.d[0] == "0") {
                obj1 = $.parseJSON(data.d[1]);

                $('#dg').datagrid({
                    data: obj1,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: false,
                    autoRowHeight: false,
                    striped: true,
                    checkOnSelect: false,
                    selectOnCheck: false,
                    onCheckAll: function () {
                        var allRows = $(this).datagrid('getRows');
                        checkedRows = allRows;
                    },
                    onUncheckAll: function () {
                        checkedRows = [];
                    },
                    onCheck: onCheck,
                    onUncheck: onUncheck,
                    onBeforeEdit: function (index, row) {
                        row.editing = true;
                        //$(this).datagrid('checkRow', index);
                    },
                    complete: function () {
                        $('#loading').hide(100);                        
                    }
                });

                var rows = $('#dg').datagrid('getRows');              
                for (var i = 0; i < rows.length; i++) {
                    $('#dg').datagrid('beginEdit', i);
                    var edaplicar = $('#dg').datagrid('getEditor', { index: i, field: 'aplicar' });
                    if (obj1[i].aplicar == 1) {
                        $(edaplicar.target).prop('checked', true);
                    }
                    else { $(edaplicar.target).prop('checked', false); }
                }
            }
            else { $.messager.alert('Error', data.d[0], 'error'); }            
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }       
    });
  
    
}

function APLICAR_FALTASYRETARDOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = "";
      
        if (checkedRows.length == 0) {
            $.messager.alert('Error', 'Falta seleccionar los documentos a aplicar', 'error');            
        }
        else {
            $('#dg').datagrid('acceptChanges');
            for (var r = 0; r < checkedRows.length; r++) {
                valores += checkedRows[r].id + ";" + checkedRows[r].aplicar + "|";
            }
            valores = valores.substring(0, valores.length - 1);

            var parametros = {};
            parametros.valores = valores;
            $.ajax({
                type: "POST",
                url: 'Funciones.aspx/Aplicar_FaltasyRetardos',
                data: JSON.stringify(parametros),
                dataType: "json",
                async: true,
                cache: false,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
                    else { error = "0"; $.messager.alert('Información', data.d[1], 'info'); }

                    for (var i = 0; i < $('#dg').datagrid('getData').total; i++) {
                        $('#dg').datagrid('uncheckRow', i);
                        $('#dg').datagrid('beginEdit', i);
                        var edaplicar = $('#dg').datagrid('getEditor', { index: i, field: 'aplicar' });
                        if (obj1[i].aplicar == 1) {
                            $(edaplicar.target).prop('checked', true);
                        }
                        else { $(edaplicar.target).prop('checked', false); }
                    }

                   
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', xhr.statusText, 'error');
                },
                complete: function ()
                { $('#loading').hide(100); }
            });
        }
    }
}