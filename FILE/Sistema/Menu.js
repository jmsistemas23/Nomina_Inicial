var objm = "";
var quin = "";
var permisofiltro = "";
$(document).ready(function () {
    $('#tt').hide();

    CARGAR_MENU('#menu');

    LISTAR_MENU_ACCESOS();

    $('#slideusuario').slideReveal({
        position: "right",
        overlay: true,
        autoEscape: true,
        push: false,
        width: 430,
        speed: 700
    });

    $('#tt').tabs({
        tabPosition: "top",
        plain: true,
        onBeforeClose: function (title, index) {
            var target = this;
            $.messager.confirm('Confirm', 'Seguro de cerrar el módulo ' + title, function (r) {
                if (r) {

                    var count = $('#tt .panel').length;
                    var opts = $(target).tabs('options');
                    var bc = opts.onBeforeClose;
                    opts.onBeforeClose = function () { };
                    $(target).tabs('close', index);
                    opts.onBeforeClose = bc;
                    if (count == 1) {
                        $('#tt').hide();
                      //  $('#imglogo').show();
                        $('#dlogo-accesos').show();
                    }

                }
            });

            SACAR_DATOS_QUINCENA();

            return false;
        }
    });

    $('#btnUsuario').bind('click', function () {     
        $('#slideusuario').show();
        $('#slideusuario').slideReveal("toggle");
    });

    $('#btnCerrar').bind('click', function () {
        Cerrar();
    });

    $('#btnCambiarPass').bind('click', function () { windows("#wcontraseña", 400, 170, false, 'Modificar Contraseña'); });
    $('#btnCancelarCambioPass').bind('click', function () { $('#wcontraseña').window('close'); });
    $('#btnGuardarCambioPass').bind('click', function () { CAMBIA_PASS(); });

    $('#btnAccesos').bind('click', function () {
        LISTAR_MENU('#tvmenu');
        windows("#waccesos", 450, 500, false, 'Lista de Menus');
    });

    $('#btnGAccesos').bind('click', function () { GUARDAR_ACCESOS('#btnGAccesos'); });

    $('#tvmenu').tree({
        onClick: function (node) {
            if (node.name != "") {
                var ch = node.checked;
                if ((ch == undefined) || (ch == false)) {
                    $('#tvmenu').tree('check', node.target);
                }
                else {
                    $('#dg' + node.Id).draggable().remove();
                    $('#tvmenu').tree('uncheck', node.target);
                }
            }
        }
    });

    FILTRAR_TREE_TXT('#txtmenu', '#tvmenu', "Si");

   
});

function onDrag(e) {
    var d = e.data;
    if (d.left < 0) { d.left = 0 }
    if (d.top < 0) { d.top = 0 }
    if (d.left + $(d.target).outerWidth() > $(d.parent).width()) {
        d.left = $(d.parent).width() - $(d.target).outerWidth();
    }
    if (d.top + $(d.target).outerHeight() > $(d.parent).height()) {
        d.top = $(d.parent).height() - $(d.target).outerHeight();
    }
}

function menu(ul, obj) {
    var nombrerpt = "";
    for (var i = 0; i < obj.length; i++) {
        var nombre = obj[i].Nombre;
        var objlst = obj[i].List;
        var imagen = obj[i].UrlImagen;
      
        var li = $('<li class="nav-list__item"/>')
          .appendTo(ul);

        var a = $('<a class="nav-list__link nav-list__link--primary"/>')
              .text(nombre)
              .attr('href', "javascript:void(0);")              
              .appendTo(li);
        var img = $('<img id="imgmenu" class="nav-list__icon" src="../..' + imagen + '" alt=""/>')
        .appendTo(a);

        if (objlst.length > 0) {
            var sub_ul = $('<ul class="nav-list__sub"/>')
                .appendTo(li);
            submenu(sub_ul, objlst);
        }
    }
}

function submenu(ul, objlst) {
    var nombrerpt = "";
    for (var i = 0; i < objlst.length; i++) {
        var nombre = objlst[i].Nombre;
        var lstsub = objlst[i].List;
        var url = objlst[i].Url;
                
        var nomtab = objlst[i].NombreTab;
        if (objlst[i].nombrerpt != undefined)
        { nombrerpt = objlst[i].nombrerpt; }
        else { nombrerpt = ""; }

        if (lstsub.length > 0) {
            var li = $('<li class="nav-list__item"/>')
              .appendTo(ul);
            var a = $('<a class="nav-list__link"/>')
                .text(nombre)
                .attr('href', "javascript:void(0);")
                .appendTo(li);

            var sub_ul = $('<ul class="nav-list__sub"/>')
                .appendTo(li);
            submenu(sub_ul, lstsub);
        }
        else {
            var li = $('<li class="nav-list__item"/>')
             .appendTo(ul);
            var a = $('<a class="nav-list__link" data-menu="' + url+nombrerpt + '"/>')
                .text(nombre)
                .attr('href', ".." + url + nombrerpt)
                .attr('name', nomtab)                
                .appendTo(li);

            if ((permisofiltro == "Si") && (nomtab == 'Consulta de Empleados'))
            {AgregarTabPadre('Consulta', nombre, ".."+ url);}
        }       
    }
}

function CARGAR_MENU(mcontrol) {  
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/CARGAR_MENU',
        //data: JSON.stringify(parametros),
        datatype: 'json',
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                var obj = $.parseJSON(data.d[0]);
                
                //si el usuario logueado tiene rol de filtro por secretaria, se abre la consuslta de empleados
                if (data.d[1] == "Si") {
                    permisofiltro = data.d[1];                   
                }
                else { permisofiltro = "No";}
                menu($(mcontrol), obj);

            }
            else { $.messager.alert('Error', 'No Existe la Configuración del menu', 'error'); }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $('#loading').hide();
            $.messager.alert('Error', jqXHR, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CAMBIA_PASS() {
    if ($('#txtPassAnt').textbox('getValue') == "") { $.messager.alert('Error', "Ingrese contraseña actual", 'error'); }
    else
        if ($('#txtPassNuevo').textbox('getValue') == "" || $('#txtPassNuevo_Rep').textbox('getValue') == "") { $.messager.alert('Error', "Ingrese contraseña nueva", 'error'); }
        else
            if ($('#txtPassNuevo').textbox('getValue') != $('#txtPassNuevo_Rep').textbox('getValue')) { $.messager.alert('Error', "Contraseña nueva no coincide en ambos campos", 'error'); }
            else
            {
                var parametros = {};
                parametros.pass = $('#txtPassAnt').textbox('getValue');
                parametros.passNuevo = $('#txtPassNuevo').textbox('getValue');
                $.ajax({
                    type: "POST",
                    url: "funsiones.aspx/CambiarPass",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');
                            LIMPIAR_CAMBIOPASS();
                            $('#wcontraseña').window('close');
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

function LIMPIAR_CAMBIOPASS() {
    $('#txtPassAnt').textbox('setValue', '');
    $('#txtPassNuevo_Rep').textbox('setValue', '');
    $('#txtPassNuevo').textbox('setValue', '');
}

function Cerrar() {
    $.messager.confirm('Confirmación', 'Seguro de salir del sistema', function (r) {
        if (r) {
            window.location.href = '../../Login.aspx';
        }
    });
    return false;
}

function LISTAR_MENU(tobj) {
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/Listar_PermisosMenus',
        //data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            var objacceso = jQuery.parseJSON(data.d[1]);

            $(tobj).tree({
                data: obj,
                onlyLeafCheck: true,
                onLoadSuccess: function () {
                    var tri = $(tobj).tree('getRoots');
                    for (var h = 0; h < tri.length; h++) {
                        var tree = $(tobj).tree('getChildren', tri[h].target);
                        if (tree.length == 0) {
                            for (var j = 0; j < objacceso.length; j++) {
                                if (objacceso[j].id == tri[h].Id) {
                                    $(tobj).tree('check', tri[h].target);
                                }
                            }
                        }
                        else {
                            for (var i = 0; i < tree.length; i++) {
                                for (var j = 0; j < objacceso.length; j++) {
                                    if (objacceso[j].id == tree[i].Id) {
                                        $(tobj).tree('check', tree[i].target)
                                        //break;
                                    }

                                    if (objacceso[j].id == tri[h].Id) {
                                        $(tobj).tree('check', tri[h].target);
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (objacceso.length > 0) { $(tobj).tree('expandAll'); }
            else { $(tobj).tree('collapseAll'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function LISTAR_MENU_ACCESOS() {
    $.ajax({
        type: "POST",
        url: 'Funsiones.aspx/Listar_Menus_Accesos',
        //data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            if (obj.length > 0) { CREAR_BOTON_ACCESO(obj); }
            else { $('#pacceso').hide(); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function GUARDAR_ACCESOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var obj = "";
        var parametros = {};
        parametros.fkaccesos = getChecked('#tvmenu');
        $.ajax({
            type: "POST",
            url: "funsiones.aspx/Guardar_Accesos_Usuarios",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');
                    obj = jQuery.parseJSON(data.d[2]);
                    if (obj.length > 0) {
                        $('#paneldrop').panel('clear');
                        CREAR_BOTON_ACCESO(obj);
                    }
                    else { $('#pacceso').hide(); }
                    $("#waccesos").window('close');
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


function windows_page(id, width, height, titulo, url) {
    var dir = window.location.pathname.split('/');
    var dominio = "http://" + $(location).attr('host') + "/" + dir[1] + "/" + dir[2] + url;
    //var dominio = "http://" + $(location).attr('host')  + "/" + dir[1] + url;


    var contenido = '<iframe id="mainFrame" frameborder="0" scrolling="no" src="' + dominio + '" style="width:100%;height:100%;overflow:hidden;background:#E1DFD9;"></iframe>';
    //$(objwin).empty();

    var $winp;
    $('<div style="overflow:hidden;"> id=win' + id).dialog({
        width: width + "%",
        height: height + "%",
        title: titulo,
        border: true,
        modal: false,
        collapsible: false,
        minimizable: false,
        maximizable: true,
        resizable: true,
        loadingMessage: 'Cargando ...',
        content: contenido,
        onResize: function () {
            $(this).window('center');
        }
        //open: function () {
        //    $(this).load(dominio);
        //}        
    });

    $winp = $('#win' + id).window({
        // width: width,
        // height: height,
        // border: true,
        // modal: false,
        //// content: contenido,
        // collapsible: false,
        // minimizable: false,
        // maximizable: true,
        // resizable: true,
        // loadingMessage: 'Cargando ...',
        // title: titulo,
        //onResize: function () {
        //    $(this).window('center');
        //}
    });
    $winp.window('open');
    $winp.window('center');
}

function CREAR_BOTON_ACCESO(selchk) {

    //$('#pacceso').show();
    for (i = 0; i < selchk.length; i++) {
        var vdraggable = $('<div id="dg' + selchk[i].id + '" class="easyui-draggable" data-options="onDrag:onDrag,handle:\'#' + selchk[i].id + '\'" style="width:100%;height:auto;background:#fafafa;border:1px solid #ccc;overflow:hidden;">');
        var title = $('<div id="' + selchk[i].id + '" style="padding:5px;background:#ccc;color:#fff"></div>');
        $(vdraggable).append(title);
        var btn = $('<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:\'icon_Accesos\',size:\'large\'" name="' + selchk[i].url + '" id="btn' + selchk[i].id + '">' + selchk[i].nombre + '</a>');

        $(title).append(btn);

        $("#paneldrop").append(vdraggable);
        vdraggable.draggable().resizable();

        $('#btn' + selchk[i].id).linkbutton({
            plain: true,
            width: "100%",
            text: selchk[i].nombretab
        }).bind('click', function () {
            windows_page(this.id, 50, 60, this.text, this.name);
        });
    }

}


