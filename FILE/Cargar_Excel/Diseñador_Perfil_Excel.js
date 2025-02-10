var id = 0;
var perfil = "";
$(document).ready(function () {
    $.extend($.fn.tree.methods, {
        removeAll: function (jq) {
            return jq.each(function () {
                var roots = $(this).tree('getRoots');
                for (var i = roots.length - 1; i >= 0; i--) {
                    $(this).tree('remove', roots[i].target);
                }
            })
        },
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        }
    })

    if ($_GET('Id') != null) {
        id = $_GET('Id');
    } else { id = ''; }
    if ($_GET('perfil') != null) {
        perfil = $_GET('perfil');
    } else { perfil = ''; }

    document.getElementById('lblperfil').innerHTML = perfil;

    $('#btnRegresarDis').bind('click', function () {
        if ($('#btnRegresarDis').linkbutton('options').disabled) { return false; }
        else
        { IR_PAGINA("Cat_Perfiles_Excel.aspx", ""); }
    });

    CARGAR_DISEÑO_PERFIL();

    $('#btnAGRelCam').bind('click', function () { AGREGAR_RELACION_CAMPOS(); });
    $('#btnERelCam').bind('click', function () { ELIMINAR_RELACION_CAMPOS('#btnERelCam'); });

    $('#btnGuardar').bind('click', function () { GUARDAR_DISEÑO('#btnGuardar'); });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR_LISTA();
    });

});

function LIMPIAR_LISTA() {
    $('#dgCamRel').datagrid('loadData', { "total": 0, "rows": [] });
    $('#btnERelCam').linkbutton({ disabled: true });  
}

function IR_PAGINA(url, parametros) {
    var strpagina = "";
    if (parametros != "") { strpagina = url + "?" + parametros; } else { strpagina = url; }
    $.ajax({
        url: url + "/GetResponse",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == true) {
                window.location = strpagina;
            }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c, 'error');
        }
    });
}

function CARGAR_NUEVO_PERFIL(columnas, datos) {
    var colarchivo = "";
    if (datos == "Si") {
        colarchivo = columnas.split(',');
        if ($.session.get("PerfilCargado") == 'Si') {
            $.messager.confirm('Confirm', 'Seguro de reemplazar el diseño del perfil', function (r) {
                if (r) {
                    $('#dgCamRel').datagrid('loadData', { "total": 0, "rows": [] });
                    $('#btnERelCam').linkbutton({ disabled: true });

                    $('#tcamorigen').tree('removeAll');
                    CARGAR_CAMPOS_ORIGEN('#tcamorigen', colarchivo);
                    $('#tcamdestino').tree('removeAll');
                    CARGAR_CAMPOS_DESTINO('#tcamdestino', 'importacion_excel');
                }
            });
        }
        else {
            CARGAR_CAMPOS_ORIGEN('#tcamorigen', colarchivo);
            CARGAR_CAMPOS_DESTINO('#tcamdestino',"Importacion_Excel");
        }
    }
    else { $.messager.alert('Error', 'Falta seleccionar el archivo a cargar', 'error'); }
}

function CARGAR_CAMPOS_DESTINO(tvobj, tabla) {   
    objlstcampos = [];
    var parametros = {};
    parametros.tabla = tabla;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_Tablas_Destino",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[1]);
            $(tvobj).tree({
                data: obj,                             
            });

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

function CARGAR_CAMPOS_ORIGEN(tvobj, strcampos) {
    objlstcampos = [];
    for (var p = 0; p < strcampos.length; p++) {
        var campos = strcampos[p].split(',');
        listacampos = { id: "", name: "", text: "" };
        var name = campos[0];
        var text = campos[0];

        listacampos.id = p;
        listacampos.name = name;
        listacampos.text = text;
        objlstcampos.push(listacampos);

    }
    $(tvobj).tree({
        data: objlstcampos       
    });
}

function CARGAR_DISEÑO_PERFIL() {
    var parametros = {};
    parametros.id = id
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Diseño_Perfil',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //if (data.d[0] == "1") {               
                obj = jQuery.parseJSON(data.d[0]);
                if (obj[0].Mapeo != "") {
                    $.session.set("PerfilCargado", 'Si');
                    var campos = obj[0].Mapeo.split('|');

                    for (var r = 0; r < campos.length; r++) {
                        var columnas = campos[r].split(',');
                        $('#dgCamRel').datagrid('insertRow', {
                            index: r,
                            row: {
                                camrelo: columnas[0],
                                camreld: columnas[1]
                            }
                        });
                    }

                    objlstcamposO = [];
                    var camposorigen = obj[0].CamposOrigen.split(',');
                    for (var o = 0; o < camposorigen.length; o++) {
                        listacampos = { name: "", text: "" };
                        listacampos.name = camposorigen[o];
                        listacampos.text = camposorigen[o];
                        objlstcamposO.push(listacampos);
                    }
                    $('#tcamorigen').tree({
                        data: objlstcamposO
                    });


                    objlstcamposD = [];
                    var camposdestino = obj[0].CamposDestino.split(',');
                    for (var d = 0; d < camposdestino.length; d++) {
                        listacampos = { name: "", text: "" };
                        listacampos.name = camposdestino[d];
                        listacampos.text = camposdestino[d];
                        objlstcamposD.push(listacampos);
                    }
                    $('#tcamdestino').tree({
                        data: objlstcamposD
                    });
                    movimiento = "M";
                }
                else { $.session.set("PerfilCargado", 'No'); }

            //}
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


function AGREGAR_RELACION_CAMPOS() {
    vtcamorigen = $('#tcamorigen').tree('getSelected');
    vtcamdestino = $('#tcamdestino').tree('getSelected');
    if (vtcamorigen.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo origen', 'error'); return 0; }
    else
        if (vtcamdestino.name == null) { $.messager.alert('Error', 'Falta seleccionar el campo destino', 'error'); return 0; }
        else
        {
            if ($('#dgCamRel').datagrid('getData').total > 0) { r += 1; } else { r = 0; }
            $('#dgCamRel').datagrid('insertRow', {
                index: r,
                row: {
                    camrelo: vtcamorigen.name,
                    camreld: vtcamdestino.name
                }
            });

            var t = $('#tcamorigen');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }
            var t = $('#tcamdestino');
            var node = t.tree('getSelected');
            if (node != undefined) {
                t.tree('unselect', node.target);
            }

            $('#btnERelCam').linkbutton('enable');
            $('#btnGuardar').linkbutton('enable');
        }
}

function ELIMINAR_RELACION_CAMPOS() {
    //if ($(btnobj).linkbutton('options').disabled) { return false; }
    //else
    //{
        rows = $('#dgCamRel').datagrid('getSelected');
        if (rows) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la relación', function (r) {
                if (r) {
                    var rowIndex = $("#dgCamRel").datagrid("getRowIndex", rows);
                    $('#dgCamRel').datagrid('deleteRow', rowIndex);
                    if ($('#dgCamRel').datagrid('getData').total == 0) { $('#btnERelCam').linkbutton({ disabled: true }); }
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar la relación a eliminar', 'error'); }
    //}
}

function GUARDAR_DISEÑO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var camposRelacion = "", camposorigen = "", camposdestino = "";

        var rows = $('#dgCamRel').datagrid('getRows');
        var total = $('#dgCamRel').datagrid('getData').total;
        if (total > 0) {
            var tri = $('#tcamorigen').tree('getRoots');
            for (var o = 0; o < tri.length; o++) {
                camposorigen += tri[o].name + ",";
            }
            var tri = $('#tcamdestino').tree('getRoots');
            for (var d = 0; d < tri.length; d++) {
                camposdestino += tri[d].name + ",";
            }

            for (var r = 0; r < total; r++) {
                camposRelacion += "[" + rows[r].camrelo + "],[" + rows[r].camreld + "]|";
            }
            camposorigen = camposorigen.substring(0, camposorigen.length - 1);
            camposdestino = camposdestino.substring(0, camposdestino.length - 1);
            camposRelacion = camposRelacion.substring(0, camposRelacion.length - 1);

            INSERTAR_DISEÑO(camposorigen, camposdestino, camposRelacion);

            $('#loading').hide(100);

            for (var r = 0; r < total; r++) {
                $('#dgCamRel').datagrid('beginEdit', r);
            }
        }
        else { $.messager.alert('Error', 'Falta las relaciones de los campos', 'error'); }
    }
}

function INSERTAR_DISEÑO(camposorigen, camposdestino, camposRelacion) {
    var parametros = {};
    parametros.id = id
    parametros.perfil = perfil;
    parametros.rcamposorigen = camposorigen;
    parametros.rcamposdestino = camposdestino;
    parametros.relacioncampos = camposRelacion;    
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/GuardarDiseñoPerfil",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[1] == "1") {
                $.messager.alert('Información', 'Perfil configurado correctamente', 'info');
            }
            else { $.messager.alert('Error', 'Error al configurar el perfil', 'error'); }
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

