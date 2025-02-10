var ID;
var fecharestaurada = "",condicion="";
$(document).ready(function () {
   
    LISTAR_FECHASRESPALDO('#dg');

    $('#btnRestaurar').bind('click', function () { RESTAURAR_RESPALDO('#btnRestaurar');  });

    $('#btnActualizar').bind('click', function () { LISTAR_FECHASRESPALDO('#dg'); });

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_GRID("#dg");
        }
    });
    $('#btnbuscar').bind('click', function () { FILTRAR_GRID("#dg"); });
});

function LISTAR_FECHASRESPALDO(dgobj) {
    var parametros = {};    
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: "Restaurar_Respaldo.aspx/Listar_FechasRastaurar",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
          
            $(dgobj).datagrid({
                data: obj,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,                             
                onClickRow: function () {
                    var rows = $(dgobj).datagrid('getSelected');
                   if (rows) {
                       ID = rows.Id;
                       fecharestaurada = rows.FechaCreacion;
                       $('#btnRestaurar').linkbutton({ disabled: false });
                   }
                },
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
            CARGAR_CAMPOS_BUSQUEDA(dgobj, '#cbcampos');
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

function CARGAR_CAMPOS_BUSQUEDA(dgobjeto, cbobjeto) {
    var columna;
    var Campos = [];
    var obj;

    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < fields.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        obj["Clave"] = columna.field;
        obj["Descripcion"] = columna.title;
        if (col == 0) { obj["selected"] = true; }
        else { obj["Select"] = false; }
        Campos.push(obj);
    }
    $(cbobjeto).combobox({
        data: Campos,
        valueField: "Clave",
        textField: "Descripcion",
        editable: false
    });
}

function RESTAURAR_RESPALDO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var parametros = {};
        parametros.id = ID;
      
        $.ajax({
            type: "POST",
            url: "Restaurar_Respaldo.aspx/Restaurar_Respaldo",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
                else
                {
                    $.messager.alert('Información', 'Restauración Completa con la fecha: ' + fecharestaurada, 'info');
                    LISTAR_FECHASRESPALDO('#dg');
                }
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

function RESTAURAR() {
   
}

function FILTRAR_GRID(dgobjeto) {   
    var vvalor = $('#txtvalor').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbcampos').combobox('getValue');
        var vcondicion = $('#cbcondicion').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }

    LISTAR_FECHASRESPALDO(dgobjeto);
}