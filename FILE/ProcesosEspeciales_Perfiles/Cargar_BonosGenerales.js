var Ancho = 65;
var Alto = 60;
var checkedRows = [];
$(document).ready(function () {
    CARGAR_GRID('#dg', Ancho, Alto, "");

    $('#dg').datagrid({
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onCheckAll: function () {
            var allRows = $(this).datagrid('getRows');
            checkedRows = allRows;
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        onBeforeEdit: function (index, row) {
            row.editing = true;
            this.datagrid('checkRow', index);
        }
    });

    $('#btnGenerarProc').bind('click', function () { GENERAR_PROCESO('#btnGenerarProc'); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_PROCESO('#btnLimpiar'); });

    SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'PE';
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "C") {
                $('#lblbloqueada').hide();
                $('#dperfil').show();
            }
            else {
                $('#lblbloqueada').show();
                $('#dperfil').hide();
               
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

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].fkProEsp == row.fkProEsp) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].fkProEsp == row.fkProEsp) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}

function CARGAR_GRID(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Bonos.aspx?&busqueda=' + condicion,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%"
    });
}

function LIMPIAR_PROCESO() {
    var total = $('#dg').datagrid('getData').total;
    $('#dg').datagrid('uncheckAll', total);
}

function GENERAR_PROCESO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var id = "", contador = 0;
        if (checkedRows.length > 0) {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].cveind == "") { contador += 1; break; }
                id += checkedRows[i].fkProEsp + "|";
            }
            if (contador == 0) {
                id = id.substring(0, id.length - 1);

                var parametros = {};
                parametros.idperfil = id;
                parametros.multi = valnomina;
                $.ajax({
                    type: "POST",
                    url: 'funciones.aspx/Generar_Bonos',
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
                        else { $.messager.alert('Error', data.d[1], 'error'); }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function () { $('#loading').hide(100); }
                });
            }
            else { $.messager.alert('Error', 'Falta asiganr el indicador al perfil ' + checkedRows[i].descripcion, 'error'); }
        }
        else { $.messager.alert('Error', 'Falta seleccionar le perfil a procesar', 'error'); }
    }
}

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#dextras').show();
                $('#lblnominas').hide();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
                $('#dg').show();
               // $('#btnGenerarProc').linkbutton({ disabled: false });
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
                $('#dg').hide();
                //$('#btnGenerarProc').linkbutton({ disabled: true });
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


function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            //text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
        });

        tr = $(tr).append(
            $(td).append(btn)
        );
        table.append(tr);


        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            width: 70 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
            VALIDAR_MULTINOMINA();
            $("#hmulti").val(this.name);
        });
        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            $("#hmulti").val(btn[0].name);
            VALIDAR_MULTINOMINA();
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        VALIDAR_MULTINOMINA();
    }
}
function VALIDAR_MULTINOMINA() {
    if ((valnomina != undefined) && (valnomina != '')) {
        var parametros = {};
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Validacion_Multinomina",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                    SACAR_NOMINAS();
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
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error'); }
}

