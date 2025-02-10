var modulo = "";
var filtrar = false;
var c = "";
$(document).ready(function () {
   
  
    $('#btnActualizar').bind('click', function () {      
        LISTAR_DOCUMENTOS('#btn' + modulo, "");      
    });


    $('#btnbuscar').bind('click', function () { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); });

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocampos").combobox('getValue'), $("#cbocondicion").combobox('getValue'), $("#txtvalor").textbox('getValue')); }
        }
    });

    $('#btnRestaurar').bind('click', function () { RESTAURAR_DOCUMENTOS('#btnRestaurar'); });

    $('#btnMP').bind('click', function () { modulo = 'MP';  LISTAR_DOCUMENTOS('#btn'+modulo, "");});
    $('#btnMC').bind('click', function () { modulo = 'MC';  LISTAR_DOCUMENTOS('#btn' + modulo, ""); });
    $('#btnME').bind('click', function () { modulo = 'ME'; LISTAR_DOCUMENTOS('#btn' + modulo, ""); });
    $('#btnIL').bind('click', function () { modulo = 'IL';  LISTAR_DOCUMENTOS('#btn' + modulo, ""); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DOCUMENTOS('#btnLimpiar'); });


});
$(window).load(function () {
    SACAR_NOMINAS();   
});



function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#lblnominas').hide();
                $('#btnMP').linkbutton({ disabled: false });
                $('#btnMC').linkbutton({ disabled: false });
            }
            else {                
                $('#lblnominas').show();
                $('#btnMP').linkbutton({ disabled: true });
                $('#btnMC').linkbutton({ disabled: true });
                valnomina = '';
                nominasel = '';
            }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            //$('#loading').hide(100);
        }
    });
}

function LISTAR_DOCUMENTOS(btnobj,strcondicion) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var objdis = "";

        var parametros = {};  
        parametros.condicion = strcondicion;
        parametros.modulo = modulo;
        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Listar_DocuementosRestaurar',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: true,
            cache: true,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "") {
                    obj = $.parseJSON(data.d[0]);                             
                    objdis = data.d[1];
                    CARGAR_DG("#dg", obj, objdis);
                    CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocampos');

                    $('#dbusqueda').show();
                    $('#dg').show();
                    $('#btnActualizar').linkbutton('enable');

                   
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
}

function CARGAR_DG(dgcontrol, objdato, objdis) {
    var col = $.parseJSON(objdis);    
    $(dgcontrol).datagrid({
        data: objdato,
        columns: col.columns,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        autoLoad: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,        
        beforeSend: function () {
           // $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {             
                documento = rows.numdocmp;
                
                $('#btnRestaurar').linkbutton('enable');
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
           // $('#loading').hide(100);         
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
    LISTAR_DOCUMENTOS('#btn'+modulo,strconplaza)    
}

function RESTAURAR_DOCUMENTOS(objbtn)
{
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var fields = $('#dg').datagrid('getColumnFields', true).concat($('#dg').datagrid('getColumnFields', false));
        var strcondicion=""
      var  rows = $('#dg').datagrid('getSelected');
        if (rows) {
            var parametros = {};
            parametros.condicion = rows[fields[0]];
            parametros.modulo = modulo;
            $.ajax({
                type: "POST",
                url: 'funciones.aspx/RestaurarDocumento',
                data: JSON.stringify(parametros),
                dataType: "json",
                async: true,
                cache: true,
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                    }
                    else {
                        $.messager.alert('Error', data.d[1], 'error');

                        LISTAR_DOCUMENTOS("");
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
    }
}

function LIMPIAR_DOCUMENTOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {               
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
