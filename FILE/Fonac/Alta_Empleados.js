var checkedRows = [];
$(document).ready(function () {
    //$.session.set("tipoquin", 0);
    //$.session.set('usuario','Miguel');

    $('#txtfecha').datebox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });

    CARGAR_CAMPOSBUSQUEDAS('#dgemp', '#cbocam', 'curpemp');

    $('#btnBuscar').bind('click', function () {
        if ($('#txtfecha').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la fecha', 'error'); }
        else
            if ($('#cboperiodo').combobox('getValue') == "") { $.messager.alert('Error', 'Falta el periodo', 'error'); }
            else {
                CARGAR_DATOS('#dgemp', '');
                $('#btnGuardar').linkbutton({ disabled: false });
                $('#btnLimpiar').linkbutton({ disabled: false });
            }
    });
    $('#btnfiltrar').bind('click', function () {
        if ($('#txtfecha').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la fecha', 'error'); }
        else
            if ($('#cboperiodo').combobox('getValue') == "") { $.messager.alert('Error', 'Falta el periodo', 'error'); }
            else {
                FILTRAR_GRID("#dgemp", "#txtval", "#cbocam", "#cbocon");
            }
    });
    var text = $('#txtval');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_GRID("#dgemp", "#txtval", "#cbocam", "#cbocon");
        }
    });
    $('#btnLimpiar').bind('click', function () {
        CARGAR_DATOS('#dgemp', '');
        CARGAR_CAMPOSBUSQUEDAS('#dgemp', '#cbocam', 'curpemp');
        $('#cbocam').combobox('setValue', 'like');
        $('#txtval').textbox('setValue', '');

    });
    $('#btnGuardar').bind('click', function () {
        GUARDAR_ALTA('#btnGuardar');
    });
   
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function CARGAR_DATOS(dgcontrol, condicion) {
    var quincena = "";
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + condicion + "&quincena=",
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
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
    $('#btnGuardar').linkbutton({ disabled: false });
    $('#btnLimpiar').linkbutton({ disabled: false });
}

function GUARDAR_ALTA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var ext = 0,tiponom="";
        if ($.session.get("tipoquin") != 0) { ext = $.session.get("tipoquin"); tipon = "E"; }
        else { tiponom = "0"; }

        if (checkedRows.length > 0) {            
            for (var f = 0; f < checkedRows.length; f++) {
                var parametros = {};               
                parametros.periodo = $('#cboperiodo').combobox('getValue');
                parametros.fechaini = $('#txtfecha').textbox('getValue');                
                parametros.empleado = checkedRows[f].numemppl;
                parametros.plaza = checkedRows[f].numplaza;
                parametros.estatuspl = checkedRows[f].cveesppl;
                parametros.cvepue = checkedRows[f].cvepuepl;
                parametros.gpojer = checkedRows[f].cvejerpl;
                parametros.tipoqna = tiponom;
                parametros.numext = ext;
                parametros.usuario = $.session.get('usuario');

                $.ajax({
                    type: "POST",
                    url: "Funsiones.aspx/Guardar_AltaEmpleados",
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
}

function FILTRAR_GRID(dgobjeto, txtvalor, cbcampos, cbocon) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbcampos).combobox('getValue');
        var vcondicion = $(cbocon).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            strconcat = condicion;
        }
        else { strconcat = ""; }
    }
    else { strconcat = ""; }
    CARGAR_DATOS(dgobjeto, strconcat);
   
}