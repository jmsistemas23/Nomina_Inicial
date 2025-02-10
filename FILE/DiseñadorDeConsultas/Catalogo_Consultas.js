var titulo = "";
var tipomov = "";
$(document).ready(function () {
    CARGAR_CATALOGOS('#dgconsulta', '');
    CARGAR_CAMPOSBUSQUEDAS('#dgconsulta', '#cbocammod', "Descripcion");
    var text = $('#txtvalmod');
    text.textbox('clear').textbox('textbox').focus();

    $('#btnAgregar').bind('click', function () { AGREGAR_CONSULTA('#btnAgregar','G'); });    
    $('#btnEditar').bind('click', function () { AGREGAR_CONSULTA('#btnEditar', 'M'); });
    $('#btnEliminar').bind('click', function () { AGREGAR_CONSULTA('#btnEliminar', 'E'); });
    $('#btnRMenu').bind('click', function () { REGRESAR_CONSULTA('#btnRMenu'); });
    $('#btnLCaptura').bind('click', function () { LIMPIAR_CAPTURA('#btnLCaptura'); });
    $('#btnGCaptura').bind('click', function () { GUARDAR_CAPTURA('#btnGCaptura'); });

    $('#chkpaginacion').bind('click', function () {
        if ($('#chkpaginacion').is(":checked") == true) {
            $('#cboregistros').combobox({ disabled: false });
        } else { $('#cboregistros').combobox({ disabled: true }); }
    });
});

function CARGAR_CATALOGOS(dgobj, condicion) {
    $(dgobj).datagrid({
        url: "Listar_Consultas_Creadas.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "70%",
        heigth: "600px",
        onClickRow: function () {
           var rows = $(dgobj).datagrid('getSelected');
            if (rows) {
                tipomov = 'M';
                indice = $(dgobj).datagrid('getRowIndex', rows);              
                titulo = rows.Titulo;
                $('#btnEditar').linkbutton({ disabled: false })              
                $('#btnEliminar').linkbutton({ disabled: false })
                $('#btnDiseñoCon').linkbutton({ disabled: false })
                $('#btnVistaCon').linkbutton({ disabled: false })
                $('#btnRelacionarCon').linkbutton({ disabled: false })                
            }
        }
    });
}

function AGREGAR_CONSULTA(btnobj,mod) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide();
        $('#dcaptura').show();
        tipomov = mod;
        var rows = $('#dgconsulta').datagrid('getSelected');
        if (mod == 'G') {
            $('#btnGCaptura').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
            document.getElementById('lblconsulta').innerHTML = "";
            document.getElementById('lblmov').innerHTML = "Agregar";
            $('#txttitulo').textbox({ readonly: false });
            $('#txtancho').numberbox({ readonly: false });
            $('#txtalto').numberbox({ readonly: false });
            $('#txtancho').numberbox('setValue', 70);
            $('#txtalto').numberbox('setValue', 60);
            $('#cboregistros').combobox('setValue', '10');
            $('#cboregistros').combobox({ disabled: true });
            $('#chkpaginacion').attr("disabled", false);
            $('#chkpaginacion').attr("checked", false);
            $('#btnLCaptura').linkbutton({ disabled: false });

            var text = $('#txttitulo');
            text.textbox('clear').textbox('textbox').focus();
        }
        else
            if (mod == 'M') {               
                $('#btnGCaptura').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
                document.getElementById('lblconsulta').innerHTML = "Consulta Seleccionada: " + rows.Descripcion;
                document.getElementById('lblmov').innerHTML = "Modificar";
                $('#txttitulo').textbox({ readonly: false });
                $('#txtancho').numberbox({ readonly: false });
                $('#txtalto').numberbox({ readonly: false });
                $('#chkpaginacion').attr("disabled", false);
                $('#btnLCaptura').linkbutton({ disabled: false });
                                                             
                if (rows.Paginacion == 'Si') {                    
                    document.getElementById('chkpaginacion').checked = true;
                    $('#cboregistros').combobox({ disabled: false });
                }
                else {                    
                    document.getElementById('chkpaginacion').checked = false;
                    $('#cboregistros').combobox({ disabled: true });
                }
            }
            else
                if (mod == 'E') {
                    var rows = $('#dgconsulta').datagrid('getSelected');
                    $('#btnGCaptura').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' });
                    document.getElementById('lblconsulta').innerHTML = "Consulta Seleccionada: " + rows.Descripcion;
                    document.getElementById('lblmov').innerHTML = "Eliminar";
                    $('#txttitulo').textbox({ readonly: true });
                    $('#txtancho').numberbox({ readonly: true });
                    $('#txtalto').numberbox({ readonly: true });
                    $('#cboregistros').combobox({ disabled: true });                   
                    $('#chkpaginacion').attr("disabled", true);
                    $('#btnLCaptura').linkbutton({ disabled: true });
                                                           
                    if (rows.Paginacion == 'Si') { document.getElementById('chkpaginacion').checked = true; }
                    else { document.getElementById('chkpaginacion').checked = false; }
                }
        $('#txttitulo').textbox('setValue', rows.Descripcion);
        $('#txtancho').numberbox('setValue', rows.Ancho);
        $('#txtalto').numberbox('setValue', rows.Alto);
        $('#cboregistros').combobox('setValue', rows.NumFilas);
    }
}

function REGRESAR_CONSULTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').show();
        $('#dcaptura').hide();       
        CARGAR_CATALOGOS('#dgconsulta', '');
        var text = $('#txtvalmod');
        text.textbox('clear').textbox('textbox').focus();
        document.getElementById('lblconsulta').innerHTML = "";
        $('#btnGCaptura').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
        $('#btnEditar').linkbutton({ disabled: true });
        $('#btnEliminar').linkbutton({ disabled: true });
        $('#btnDiseñoCon').linkbutton({ disabled: true });
        $('#btnVistaCon').linkbutton({ disabled: true });
        $('#btnRelacionarCon').linkbutton({ disabled: true });
    }
}

function LIMPIAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        $('#txttitulo').textbox('setValue','');
        $('#txtancho').numberbox('setValue',70);
        $('#txtalto').numberbox('setValue', 60);
        $('#cboregistros').combobox('setValue', '10');
        $('#chkpaginacion').attr("checked", false);
        $('#cboregistros').combobox({ disabled: true });
        var text = $('#txttitulo');
        text.textbox('clear').textbox('textbox').focus();
    }
}

function GUARDAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dgconsulta').datagrid('getSelected');
        if (tipomov != "E") {
            var paginacion = "";
            if ($('#txttitulo').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la descripción de la consulta', 'error'); }
            else
                if ($('#txtancho').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el ancho de la consulta', 'error'); }
                else
                    if ($('#txtalto').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el alto de la consulta', 'error'); }
                    else
                    {
                        if ($('#chkpaginacion').is(":checked") == true) { paginacion = "1"; } else { paginacion = "0"; }

                        if (tipomov == 'M') {
                            valores = "descripcion=''" + $('#txttitulo').textbox('getValue').toUpperCase() + "'',paginacion=" + paginacion +
                                      ",NumFilas=''" + $('#cboregistros').combobox('getValue') + "'',ancho=" + $('#txtancho').textbox('getValue') + ",alto=" + $('#txtalto').textbox('getValue');
                           
                            GUARDAR_CONSULTA(rows.Id, valores);                           
                        }
                        else {
                            valores = "''" + $('#txttitulo').textbox('getValue').toUpperCase() + "''," + paginacion + ",''" + $('#cboregistros').combobox('getValue') + "''," + $('#txtancho').textbox('getValue') + "," + $('#txtalto').textbox('getValue');
                            GUARDAR_CONSULTA(0, valores);
                            LIMPIAR_CAPTURA('#btnLCaptura');
                        }                       
                    }           
        }
        else {
            $.messager.confirm('Confirm', 'Seguro de eliminar la consulta ' + titulo, function (r) {
                if (r) {
                    GUARDAR_CONSULTA(rows.Id, '');
                    REGRESAR_CONSULTA('#btnRMenu');
                        //var indice = $('#dgconsulta').datagrid('getRowIndex', rows);
                        //$('#dgconsulta').datagrid('deleteRow', indice);                        
                }
            });
        }
    }
}

function GUARDAR_CONSULTA(id,valores) {
    var parametros = {};
    parametros.tipomov = tipomov;
    parametros.id = id;
    parametros.valores = valores;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Consulta",
        data: JSON.stringify(parametros),
        dataType: "json",
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
            }
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