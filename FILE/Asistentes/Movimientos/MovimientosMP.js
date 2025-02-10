var Id = "";
var objm = "";
var makesArray = [];
var tipo = 'MP';
$(document).ready(function () {
    $('#btnLimpiar').bind('click', function () { LIMPIAR(0); });
    $('#btnGuardar').bind('click', function () { GUARDAR(); });

    LISTAR_MOVIMIENTOS('#lstMenus');
    //LISTAR_INDICES('#cbIndice');
    CARGAR_INDICES('#cboInd');
    CARGAR_INDICES('#cbopenpago');
    LIMPIAR(0);
    document.getElementById('chkvisible').checked = true;
    $('#btnNuevo').bind('click', function () { NUEVO(); });
    $('#lstMenus').tree({
        onClick: function (node) {
            makesArray = jQuery.grep(objm, function (menus, i) {
                return menus.Id == node.Id;
            });
            if (makesArray.length > 0) {
                $('#txtpropietario').textbox('setValue', makesArray[0].Propietario);
                $('#txtId').textbox('setValue', makesArray[0].Id);
                $('#txtnombremenu').textbox('setValue', makesArray[0].Nombre);
                $('#txtNomPropietario').textbox('setValue', makesArray[0].NomPropietario);
                //document.getElementById('cbIndice').value = makesArray[0].Indice;
                $('#cboInd').combobox('setValue', makesArray[0].Indice);
                $('#cbopenpago').combobox('setValue', makesArray[0].IndicePendientePago);
                document.getElementById('chksumadias').checked = ((makesArray[0].SumaDias == 1) ? true : false);
                document.getElementById('chkrestadias').checked = ((makesArray[0].RestaDias == 1) ? true : false);
                document.getElementById('chkgeneraemp').checked = ((makesArray[0].CreaEmpleado == 1) ? true : false);
                document.getElementById('chkhispla').checked = ((makesArray[0].HisPla == 1) ? true : false);
                document.getElementById('chkaguiprop').checked = ((makesArray[0].CalcAguiProp == 1) ? true : false);
                document.getElementById('chkexpediente').checked = ((makesArray[0].anexaExpediente == 1) ? true : false);
                document.getElementById('chklibrecurso').checked = ((makesArray[0].LiberaRecurso == 1) ? true : false);
                document.getElementById('chktomarrecurso').checked = ((makesArray[0].TomaRecurso == 1) ? true : false);
                document.getElementById('chkmodrecurso').checked = ((makesArray[0].ModRecurso == 1) ? true : false);
                document.getElementById('chkcomrecurso').checked = ((makesArray[0].CompactaRecurso == 1) ? true : false);
                document.getElementById('chkdescomrecurso').checked = ((makesArray[0].DescompactaRecurso == 1) ? true : false);
                document.getElementById('chkgenrectemp').checked = ((makesArray[0].GeneraRecursoTemporal == 1) ? true : false);
                document.getElementById('chkcancelarecurso').checked = ((makesArray[0].CancelaRecurso == 1) ? true : false);
                document.getElementById('chkaltaiste').checked = ((makesArray[0].altaissste == 1) ? true : false);
                document.getElementById('chkbajaiste').checked = ((makesArray[0].bajaissste == 1) ? true : false);
                document.getElementById('chkmodificaiste').checked = ((makesArray[0].cambioissste == 1) ? true : false);
                document.getElementById('chkvisible').checked = ((makesArray[0].Visible == 1) ? true : false);
                document.getElementById('chkproyeccion').checked = ((makesArray[0].generaProyeccionPS == 1) ? true : false);
            }
            LISTAR_SUBMOVIMIENTOS('#dg', node.Id);
        }
    });

    var text = $('#txtFmenu');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var valor = text.val();
            if (valor != "") {
                $('#lstMenus').tree('doFilter', valor);
                $('#lstMenus').tree('expandAll');
            }
            else { $('#lstMenus').tree('doFilter', '');  }
        }
    });
});

function LISTAR_MOVIMIENTOS(tobj) {
    var parametros = {};
    parametros.tipo=tipo;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Movimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            objm = jQuery.parseJSON(data.d[1]);

            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LISTAR_INDICES(tobj) {

    var select = document.getElementById("cbIndice"), length = select.options.length;
    while (length--) { select.remove(length); }

    var parametros = {};
    parametros.tipo = tipo;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/LISTAR_INDICES",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            $.each($.parseJSON(data.d), function () {
                var option = document.createElement("option");
                option.text = this.nombre;
                option.value = this.clave;
                document.getElementById('cbIndice').add(option);
            });           
            document.getElementById('cbIndice').value = '';
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }
    });
}

function CARGAR_INDICES(ddlobj) {
    var parametros = {};
    parametros.tipo = tipo;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Cargar_Indices',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d != "") {
                obj = $.parseJSON(data.d);
                $(ddlobj).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                });
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

function NUEVO() {
    if ($('#lstMenus').tree('getSelected') != null) {
        if ($('#lstMenus').tree('getSelected').Id.toString().length > 4) {
            $.messager.alert('Error', 'Nivel máximo alcanzado, no puede generar nivel dentro del elemento seleccionado', 'error');
        } else {
            LIMPIAR(1);
        }
    }
    else { LIMPIAR(1); }
}

function LIMPIAR(nuevo) {
    if (nuevo == 1 && $('#lstMenus').tree('getSelected') == null) { nuevo = 0; }
    $('#txtpropietario').textbox('setValue', $('#txtId').val());
    $('#txtNomPropietario').textbox('setValue',$('#txtnombremenu').val());
    $('#txtId').textbox('setValue', '0');
    //document.getElementById('cbIndice').value = '';
    $('#cboInd').combobox('setValue', 'x');
    $('#cbopenpago').combobox('setValue', 'x');
    document.getElementById('chksumadias').checked = false;
    document.getElementById('chkrestadias').checked = false;
    document.getElementById('chkgeneraemp').checked = false;
    document.getElementById('chkhispla').checked = false;
    document.getElementById('chkaguiprop').checked = false;
    document.getElementById('chkvisible').checked = true;
    document.getElementById('chklibrecurso').checked = false;
    document.getElementById('chktomarrecurso').checked = false;
    document.getElementById('chkcomrecurso').checked = false;
    document.getElementById('chkdescomrecurso').checked = false;
    document.getElementById('chkmodrecurso').checked = false;
    document.getElementById('chkgenrectemp').checked = false;
    document.getElementById('chkcancelarecurso').checked = false;
    document.getElementById('chkaltaiste').checked = false;
    document.getElementById('chkbajaiste').checked = false;
    document.getElementById('chkmodificaiste').checked = false;
    document.getElementById('chkproyeccion').checked = false;
    if (nuevo == 0) {
        $('#dg').datagrid('loadData', { "total": 0, "rows": [] });
        $('#txtpropietario').textbox('setValue', '0');
        $('#txtNomPropietario').textbox('setValue', 'SIN NIVEL SUPERIOR');
        LISTAR_MOVIMIENTOS('#lstMenus');
        //LISTAR_INDICES('#cbIndice');
        CARGAR_INDICES('#cboInd');
        CARGAR_INDICES('#cbopenpago');
    }
    $('#txtnombremenu').textbox('clear').textbox('textbox').focus();
}

function GUARDAR() {
    if ($('#txtnombremenu').textbox('getValue') == "") { $.messager.alert('Error', "Falta nombre del movimiento", 'error'); }
    else
    {
        var indice = "",indpago="";
        if ($('#cboInd').combobox('getValue') != 'x')
        { indice = $('#cboInd').combobox('getValue') }
        else { indice = 0; }

        if ($('#cbopenpago').combobox('getValue') != 'x')
        { indpago = $('#cbopenpago').combobox('getValue') }
        else { indpago = 0; }

        //var qry = $('#txtId').val() + '|' + $('#txtnombremenu').val() + '|' + $('#txtpropietario').val() + '|' + ((document.getElementById('chkvisible').checked) ? '1' : '0') + '|' + indice + '|' + ((document.getElementById('chksumadias').checked) ? '1' : '0') + '|' + ((document.getElementById('chkrestadias').checked) ? '1' : '0') + '|' + ((document.getElementById('chkgeneraemp').checked) ? '1' : '0') + '|' + ((document.getElementById('chkhispla').checked) ? '1' : '0') + '|' + ((document.getElementById('chkaguiprop').checked) ? '1' : '0' + '||');
        var qry = $('#txtId').val() + '|' + $('#txtnombremenu').val().toUpperCase() + '|' + $('#txtpropietario').val() + '|' + ((document.getElementById('chkvisible').checked) ? '1' : '0') + '|' + indice + '|' +
                  ((document.getElementById('chksumadias').checked) ? '1' : '0') + '|' + ((document.getElementById('chkrestadias').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkgeneraemp').checked) ? '1' : '0') + '|' + ((document.getElementById('chkhispla').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkaguiprop').checked) ? '1' : '0') + '|' + ((document.getElementById('chkexpediente').checked) ? '1' : '0') + '||' +
                  ((document.getElementById('chklibrecurso').checked) ? '1' : '0') + '|' + ((document.getElementById('chktomarrecurso').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkmodrecurso').checked) ? '1' : '0') + '|' +((document.getElementById('chkcomrecurso').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkdescomrecurso').checked) ? '1' : '0') + '|' + ((document.getElementById('chkgenrectemp').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkcancelarecurso').checked) ? '1' : '0') + '|'+indpago+'|' + ((document.getElementById('chkaltaiste').checked) ? '1' : '0') + '|' +
                  ((document.getElementById('chkbajaiste').checked) ? '1' : '0') + '|' + ((document.getElementById('chkmodificaiste').checked) ? '1' : '0') + '|' + ((document.getElementById('chkproyeccion').checked) ? '1' : '0');
        
       
        var parametros = {};
        parametros.tipo = tipo;
        parametros.valores = qry;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Guardar_Movimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    //LIMPIAR(0);
                    LISTAR_MOVIMIENTOS('#lstMenus');
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
}


function LISTAR_SUBMOVIMIENTOS(dgcontrol, id) {
    $(dgcontrol).datagrid({
        url: "Listar_SubMovimientos.aspx?tipo=" + tipo + "&busqueda=" + id,
        //pagination: true,
        //rownumbers: true,
        //singleSelect: true,
        //striped: true,
        //pageSize: 10,
        height: "250px",
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
}
