var nodoorigen = "", nododestino="",usuorigen="",usodestino="";
$(document).ready(function () {
    //$.extend($.fn.tree.methods, {
    //    removeAll: function (jq) {
    //        return jq.each(function () {
    //            var roots = $(this).tree('getRoots');
    //            for (var i = roots.length - 1; i >= 0; i--) {
    //                $(this).tree('remove', roots[i].target);
    //            }
    //        })
    //    },
    //    unselect: function (jq, target) {
    //        return jq.each(function () {
    //            var opts = $(this).tree('options');
    //            $(target).removeClass('tree-node-selected');
    //            if (opts.onUnselect) {
    //                opts.onUnselect.call(this, $(this).tree('getNode', target));
    //            }
    //        });
    //    }
    //});

    LISTAR_USUARIOS();
    

    var textuo = $('#txtusuorigen');
    textuo.textbox('textbox').bind('keydown', function (e) {
        if(e.keyCode == 13) {
            var valor = textuo.val();
            if (valor != "") {
                $('#lstusuorigen').tree('doFilter', valor);
                $('#lstusuorigen').tree('expandAll');
            }
            else {
                $('#lstusudestino').tree('doFilter', '');
                $('#lstusudestino').tree('expandAll');
            }
        }    
    });
    var textud = $('#txtusudestino');
    textud.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var valor = textud.val();
            if (valor != "")
              {
                if (valor != $('#txtusuorigen').textbox('getValue')) {                    
                    $('#lstusudestino').tree('doFilter', valor);
                    $('#lstusudestino').tree('expandAll');
                }                
              }
            else {
                $('#lstusudestino').tree('doFilter', '');
                $('#lstusudestino').tree('expandAll');
            }
        }
    });

    $('#lstusudestino').tree({
        onClick: function (node) {
            if (node.IdPadre != "0") {
                nodoorigen = node.clave;
                usuorigen = node.text;              
            }
        }
    });
    $('#lstusuorigen').tree({
        onClick: function (node) {
            if (node.IdPadre != "0") {
                if (nodoorigen != node.text) {
                    nododestino = node.clave;
                    usudestino = node.text;                    
                    LISTAR_BITACORA();
                }
                else {
                    DESCARCAR_TREE('#lstusudestino');
                    //var t = $('#lstusudestino');
                    //var node = t.tree('getSelected');
                    //if (node != undefined) {
                    //    t.tree('unselect', node.target);
                    //}
                    $.messager.alert('Error', 'El usuario no se puede seleccionar como destino, ya existe como origen', 'error');
                }
            }
        }
    });

    $('#btnLimpiar').bind('click', function () {
        //$('#txtusuorigen').textbox('setValue', '');
        //var t = $('#lstusudestino');
        //var node = t.tree('getSelected');
        //if (node != undefined) {
        //    t.tree('unselect', node.target);
        //}
        DESCARCAR_TREE('#lstusuorigen');
        $('#lstusuorigen').tree('doFilter', '');
        $('#lstusuorigen').tree('expandAll');

        $('#dgroles').datagrid('loadData', { "total": 0, "rows": [] });

        //document.getElementById('lblusuorigen').innerHTML = "Usuario Origen: ";

        $('#txtusudestino').textbox('setValue', '');
        //var t = $('#lstusuorigen');
        //var node = t.tree('getSelected');
        //if (node != undefined) {
        //    t.tree('unselect', node.target);
        //}
        DESCARCAR_TREE('#lstusudestino');
        $('#lstusudestino').tree('doFilter', '');
        $('#lstusudestino').tree('expandAll');

        $('#dgInd').datagrid('loadData', { "total": 0, "rows": [] });

        //document.getElementById('lblusudestino').innerHTML = "Usuario Destino: ";

        document.getElementById('chkelipermisos').checked = false;

        $('#btnGuardar').linkbutton({ disabled: true });
     
    });

    $('#btnAplicarRoles').bind('click', function () {
        APLICAR_ROLES('#btnAplicarRoles');
        LISTAR_BITACORA();
    });
    $('#btnAplicarInd').bind('click', function () {
        APLICAR_PERMISOS_IND('#btnAplicarInd');
        LISTAR_BITACORA();
    });
    
});

function LISTAR_USUARIOS() {
    var parametros = {};
    parametros.strfiltro = "";
    $.ajax({
        type: "POST",
        url: 'AdministracionDeUsuarios.aspx/Listar_GruposUsuarios',
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
            $('#lstusuorigen').tree({
                data: obj
            });
            $('#lstusudestino').tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function LISTAR_BITACORA() {
    var parametros = {};
    parametros.UsuOrigen = nodoorigen;
    parametros.UsuarioDestino = nododestino;
    $.ajax({
        type: "POST",
        url: 'ClonarPermisos.aspx/Cifras_Control',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var objRoles = jQuery.parseJSON(data.d[0]);
            var objPerInd = jQuery.parseJSON(data.d[1]);

            $('#dgroles').datagrid({
                data: objRoles,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
                checkOnSelect: false,
                selectOnCheck: false,               
                beforeSend: function () {
                    $('#loading').show();
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () { $('#loading').hide(100); },                
            });

            if ($('#dgroles').datagrid('getData').total > 0) { $('#btnAplicarRoles').linkbutton({ disabled: false }); }
            else { $('#btnAplicarRoles').linkbutton({ disabled: true });}

            $('#dgInd').datagrid({
                data: objPerInd,
                pagination: false,
                enableFilter: false,
                rownumbers: true,
                singleSelect: true,
                striped: true,
                pageSize: 20,
                checkOnSelect: false,
                selectOnCheck: false,
                beforeSend: function () {
                    $('#loading').show();
                },
                error: function (err) {
                    $('#loading').hide(100);
                    $.messager.alert('Error', err.statusText, 'error');
                },
                complete: function () { $('#loading').hide(100); },
            });

            if ($('#dgInd').datagrid('getData').total > 0) { $('#btnAplicarInd').linkbutton({ disabled: false }); }
            else { $('#btnAplicarInd').linkbutton({ disabled: true }); }
           
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function APLICAR_ROLES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var norigen = SELCCIONAR_NODO_CLAVE_TREE('#lstusuorigen');
        var ndestino = SELCCIONAR_NODO_CLAVE_TREE('#lstusudestino');

        if (norigen == "") { $.messager.alert('Error', "Falta seleccionara el usuario origen", 'error'); }
        else
            if (ndestino == "") { $.messager.alert('Error', "Falta seleccionar el usuario destino", 'error'); }
            else {    
              
                var parametros = {};                
                parametros.UsuarioOrigen = norigen;
                parametros.UsuarioDestino = ndestino;
                parametros.EliminarPer = $('#chkelipermisos').is(":checked");
                $.ajax({
                    type: "POST",
                    url: "ClonarPermisos.aspx/Aplicar_Roles",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');   
                            LISTAR_BITACORA();
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

function APLICAR_PERMISOS_IND(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var norigen = SELCCIONAR_NODO_CLAVE_TREE('#lstusuorigen');
        var ndestino = SELCCIONAR_NODO_CLAVE_TREE('#lstusudestino');

        if (norigen == "") { $.messager.alert('Error', "Falta seleccionara el usuario origen", 'error'); }
        else
            if (ndestino == "") { $.messager.alert('Error', "Falta seleccionar el usuario destino", 'error'); }
            else {
                var parametros = {};
                parametros.UsuarioOrigen = norigen;
                parametros.UsuarioDestino = ndestino;
                parametros.EliminarPer = $('#chkelipermisos').is(":checked");
                $.ajax({
                    type: "POST",
                    url: "ClonarPermisos.aspx/Aplicar_Permisos_Ind",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');
                            LISTAR_BITACORA();
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