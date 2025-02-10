var Id = "";
var objm = "";
var makesArray = [];
var PROPIETARIO="";
$(document).ready(function () {
    $('#btnLimpiar').bind('click', function () { LIMPIAR(0); });
    $('#btnGuardar').bind('click', function () { GUARDAR(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR(); });

    $('#btnNuevoPropietario').bind('click', function () { LISTAR_REPORTES('#lstPropietario', true); });
    $('#btnCancelarPropietario').bind('click', function () { $('#modalPropietarios').window('close'); });

    LISTAR_REPORTES('#lstMenus',false);
    LIMPIAR(0);
    document.getElementById('chkvisible').checked = true;
    $('#btnNuevo').bind('click', function () { NUEVO(); });
    $('#lstMenus').tree({
        onClick: function (node) {
            //$('#txtpropietario').textbox('setValue', node.Propietario);
            makesArray = jQuery.grep(objm, function (menus, i) {
                return menus.Id == node.Id;
            });
            if (makesArray.length > 0) {
                PROPIETARIO = makesArray[0].Propietario;
                $('#txtpropietario').textbox('setValue', makesArray[0].Propietario);
                $('#txtNomPropietario').textbox('setValue', makesArray[0].NomPropietario);
                $('#txtId').textbox('setValue', makesArray[0].Id);
                $('#txtdescripcion').textbox('setValue', makesArray[0].Descripcion);
                $('#txtreporte').textbox('setValue', makesArray[0].NomReporte);
                $('#txtorden').textbox('setValue', makesArray[0].Orden);
                if (makesArray[0].Visible == 1) { document.getElementById('chkvisible').checked = true; }
                else { document.getElementById('chkvisible').checked = false; }
            }
            LISTAR_SUBMENUS('#dg', node.Id);
        }
    });

    $('#lstPropietario').tree({
        onClick: function (node) {
            makesArray = jQuery.grep(objm, function (menus, i) {
                return menus.Id == node.Id;
            });
            if (makesArray.length > 0) {

                if ($('#txtId').textbox('getValue') == makesArray[0].Id) {
                    $.messager.alert('Error', 'El nivel seleccionado no debe ser el mismo elemento ', 'error');
                } else {
                    $('#txtpropietario').textbox('setValue', makesArray[0].Id);
                    $('#txtNomPropietario').textbox('setValue', makesArray[0].Descripcion);

                    var nodos = $('#lstPropietario').tree('getSelected');
                    var orden = 1;
                    if (nodos != null) { orden = nodos.children.length + 1; }
                    $('#txtorden').textbox('setValue', orden);

                    $('#modalPropietarios').window('close');
                }
            }
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

function LISTAR_REPORTES(tobj,modal) {
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Reportes',
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
                data: obj
            });
            if (modal) { $('#modalPropietarios').window('open'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function NUEVO() { LIMPIAR(1); }

function LIMPIAR(nuevo) {
    if (nuevo == 1 && $('#lstMenus').tree('getSelected') == null) { nuevo = 0; }
    $('#txtpropietario').textbox('setValue', $('#txtId').val());
    $('#txtNomPropietario').textbox('setValue',$('#txtdescripcion').val());
    $('#txtId').textbox('setValue', '0');
    $('#txtorden').textbox('setValue', '');
    $('#txtreporte').textbox('setValue', '');
    document.getElementById('chkvisible').checked = true;
    if (nuevo == 0) {
        $('#dg').datagrid('loadData', { "total": 0, "rows": [] });
        $('#txtpropietario').textbox('setValue', '0');
        $('#txtNomPropietario').textbox('setValue', 'SIN NIVEL SUPERIOR');
        var padres = $('#lstMenus').tree('getRoots');
        var orden = 1;
        if (padres != null) { orden = padres.length + 1; }
        $('#txtorden').textbox('setValue', orden);
        function ELIMINAR() {
    if ($('#txtId').textbox('getValue') == "" || $('#txtId').textbox('getValue') == "0") { $.messager.alert('Error', "Seleccione Elemento", 'error'); }
    else
    {
        var numHijos = 0;
        var hijos = $('#lstMenus').tree('getSelected');
        if (hijos != null) { numHijos = hijos.children.length; }
        if (numHijos > 0) {
            $.messager.alert('Error', 'Existen elementos dependientes', 'error');
        } else {
            var parametros = {};
            parametros.id = $('#txtId').textbox('getValue');
            $.ajax({
                type: "POST",
                url: "funciones.aspx/Eliminar_Menu",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LIMPIAR(0);
                        LISTAR_REPORTES('#lstMenus');
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
}
('#lstMenus');
    }
    else {
        var hijos = $('#lstMenus').tree('getSelected');
        var orden = 1;
        if (hijos != null) { orden = hijos.children.length + 1; }
        $('#txtorden').textbox('setValue', orden);
    }
    $('#txtdescripcion').textbox('clear').textbox('textbox').focus();
}

function GUARDAR() {
    if ($('#txtpropietario').textbox('getValue') == "") { $.messager.alert('Error', "Falta seleccionar raiz", 'error'); }
    else
        if ($('#txtdescripcion').textbox('getValue') == "") { $.messager.alert('Error', "Falta descripcion del reporte", 'error'); }
        else
            if (($('#txtreporte').textbox('getValue') == "") && (PROPIETARIO!=0)) { $.messager.alert('Error', "Falta el nombre del reporte", 'error'); }
            else
                if ($('#txtorden').textbox('getValue') == "") { $.messager.alert('Error', "Falta ordenamiento", 'error'); }
                else
                {
                    var parametros = {};
                    parametros.propietario = $('#txtpropietario').textbox('getValue');
                    parametros.id = $('#txtId').textbox('getValue');
                    parametros.descripcion = $('#txtdescripcion').textbox('getValue').toUpperCase();
                    parametros.nomreporte = $('#txtreporte').textbox('getValue').toUpperCase();
                    parametros.orden = $('#txtorden').textbox('getValue');
                    parametros.visible = ((document.getElementById('chkvisible').checked) ? '1' : '0');

                    $.ajax({
                        type: "POST",
                        url: "funciones.aspx/Guardar_Reporte",
                        data: JSON.stringify(parametros),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                            $('#loading').show();
                        },
                        success: function (data) {
                            if (data.d[0] == "0") {
                                $.messager.alert('Información', data.d[1], 'info');
                                LIMPIAR(0);
                                LISTAR_REPORTES('#lstMenus');
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

function ELIMINAR() {
    if ($('#txtId').textbox('getValue') == "" || $('#txtId').textbox('getValue') == "0") { $.messager.alert('Error', "Seleccione Elemento", 'error'); }
    else
    {
        var numHijos = 0;
        var hijos = $('#lstMenus').tree('getSelected');
        if (hijos != null) { numHijos = hijos.children.length; }
        if (numHijos > 0) {
            $.messager.alert('Error', 'Existen elementos dependientes', 'error');
        } else {
            $.messager.confirm('Información', '¿Desea Eliminar Elemento ' + $('#txtdescripcion').val() + '?', function (r) {
                if (r) {
                    var parametros = {};
                    parametros.id = $('#txtId').textbox('getValue');
                    $.ajax({
                        type: "POST",
                        url: "funciones.aspx/Eliminar_Reporte",
                        data: JSON.stringify(parametros),
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                            $('#loading').show();
                        },
                        success: function (data) {
                            if (data.d[0] == "0") {
                                $.messager.alert('Información', data.d[1], 'info');
                                LIMPIAR(0);
                                LISTAR_REPORTES('#lstMenus');
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
            });
        }
    }
}

function LISTAR_SUBMENUS(dgcontrol,id) {
    $(dgcontrol).datagrid({
        url: "Listar_SubReportes.aspx?busqueda=" + id,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        height:"300px",
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
