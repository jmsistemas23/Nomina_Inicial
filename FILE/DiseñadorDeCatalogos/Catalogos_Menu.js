var idtabla = "", tabla = "", destabla = "", tipomov="", modulo = "",error="";
var indice = "";
$(document).ready(function () {
    if ($_GET('idtabla') != null) {
        idtabla = $_GET('idtabla');       
    } else { idtabla = ''; }
    if ($_GET('mod') != null) {
        modulo = $_GET('mod');       
    } else { modulo = ''; }

    if (modulo == 'Mcat')
    { MODIFICAR_CATALOGO('#btnEliModCat'); }
    if (modulo == 'Mniv')
    { MODIFICAR_NIVELES('#btnEliModNiv'); }    


    $('#btnNuevoCat').bind('click', function () {
       // document.location = "Catalogos_Creacion.aspx";
        IR_PAGINA("Catalogos_Creacion.aspx", "");
    });
    $('#btnEliModCat').bind('click', function () {MODIFICAR_CATALOGO('#btnEliModCat');});
    $('#btnConfiguracion').bind('click', function () { CONFIGURACION_CATALOGOS('#btnConfiguracion'); });
    $('#btnRelacionar').bind('click', function () { CARGAR_RELACIONES('#btnRelacionar'); });
    
    $('#btnNuevoNiv').bind('click', function () {
        //document.location = "Catalogos_Niveles.aspx?tabla=&mod=Nniv";
        IR_PAGINA("Catalogos_Niveles.aspx", "tabla=&mod=Nniv");
    });
    $('#btnNiveles').bind('click', function () { CONFIGURACION_NIVELES('#btnNiveles'); });
    $('#btnEliModNiv').bind('click', function () { MODIFICAR_NIVELES('#btnEliModNiv'); });

    $('#txtvalmod').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_CATALOGOS();
        }
    });
    $('#btnBuscarmod').bind('click', function () { FILTRAR_CATALOGOS(); });
   
    $('#btnModCat').bind('click', function () { tipomov = "M"; VALORES_CATALOGO('#btnModCat'); });
    $('#btnEliCat').bind('click', function () { tipomov = "E"; VALORES_CATALOGO('#btnEliCat'); });
   
    $('#btnIConfig').bind('click', function () { MENU_INICIAL('#btnIConfig'); });    
    $('#btnRConfig').bind('click', function () { REGRESAR_CONFIGURCION(); });
    $('#btnGConfig').bind('click', function () {
        if ((tipomov == "G") || (tipomov == "M")) {
            SACAR_GUARDAR_CATALOGO('#btnGConfig');
        }
        else { ELIMINAR_CATALOGO('#btnGConfig'); }
    });

    $('#btnIRelacion').bind('click', function () { MENU_INICIAL('#btnIRelacion'); });
    $('#btnRRelacion').bind('click', function () { REGRESAR_RELACIONES(); });
    $('#btnAgregarRel').bind('click', function () { DISEÑO_RELACION('#btnAgregarRel'); });
    $('#btnEliminarRel').bind('click', function () { ELIMINAR_RELACION('#btnEliminarRel'); });
    $('#btnLimpiarLRel').bind('click', function () { LIMPIAR_RELACION('#btnLimpiarLRel'); });
    $('#btnGRelacion').bind('click', function () { GUARDAR_DIS_RELACION('#btnGRelacion'); });

    FILTRAR_TREE_TXT('#txtcolizq', '#tcolizq');
    FILTRAR_TREE_TXT('#txtcolder', '#tcolder');

    FILTRAR_TREE_TXT('#txtfiltablas', '#tvtablas');

    $('#btnRmodtabla').bind('click', function () { REGRESAR_MENU(); });

    $('#btnLMod').bind('click', function () { LIMPIAR_DATOS_CATALOGOS(); });
   
    $('#btnVistaCat').bind('click', function () { MOSTRAR_CATALOGO('#btnVistaCat'); });
            
    $('#btnRNivel').bind('click', function () { REGRESAR_NIVELES(); });
    $('#btnLNivel').bind('click', function () { LIMPIAR_FILTRO_NIVELES() });    
    $('#btnENivel').bind('click', function () { ELIMINAR_NIVELES('#btnENivel'); });

    $('#btnBuscartbl').bind('click', function () { MODIFICAR_TABLAS('#btnBuscartbl'); });
    $('#btnAtablas').bind('click', function () {

        var t = $('#tvtablas');
        var node = t.tree('getSelected');
        if (node != undefined) {
            $('#txttabla').textbox('setValue', node.name);

            $("#wtablas").window('close');
        }
    });      
});
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

function FILTRAR_CATALOGOS() {
    var condicion = "";
    var vvalor = $('#txtvalmod').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbocammod').combobox('getValue');
        var vcondicion = $('#cboconmod').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }
    else { condicion = " "; }

    CARGAR_CATALOGOS('#dgmod', condicion);
}
function LIMPIAR_DATOS_CATALOGOS() {
    CARGAR_CATALOGOS('#dgmod', '');
    $('#txtcammod').combobox('setValue', 'Tabla');
    $('#txtconmod').combobox('setValue', '=');
    var text = $('#txtvalmod');
    text.textbox('clear').textbox('textbox').focus();
    $('#btnEditCat').linkbutton({ disabled: true })
    $('#btnEliCat').linkbutton({ disabled: true })
    $('#btnModCat').linkbutton({ disabled: true })
    $('#btnConfiguracion').linkbutton({ disabled: true })
    $('#btnVistaCat').linkbutton({ disabled: true })
    //$('#btnRelacionar').linkbutton({ disabled: true })
}
function ELIMINAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgmod').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar el catálogo', function (r) {
                if (r) {
                    var rowIndex = $("#dgmod").datagrid("getRowIndex", filas);
                    GUARDAR_CATALOGO(idtabla, '');
                    $('#dgmod').datagrid('deleteRow', rowIndex);
                    REGRESAR_CONFIGURCION();
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el catálogo a eliminar', 'error'); }
    }
}
function CARGAR_CATALOGOS(dgobj, condicion) {
    $(dgobj).datagrid({
        url: "Listar_Catalogos_Creados.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "90%",
        heigth: "700px",
        onClickRow: function () {
            rows = $(dgobj).datagrid('getSelected');
            if (rows) {
                tipomov = 'M';
                indice = $(dgobj).datagrid('getRowIndex', rows);
                $('#btnEditCat').linkbutton({ disabled: false })
                $('#btnEliCat').linkbutton({ disabled: false })
                $('#btnModCat').linkbutton({ disabled: false })
                $('#btnConfiguracion').linkbutton({ disabled: false })
                $('#btnVistaCat').linkbutton({ disabled: false })
                //$('#btnRelacionar').linkbutton({ disabled: false })
                idtabla = rows.TablaConsultas;
                tabla = rows.CatTitulo;
            }
        }
    });
}
function MODIFICAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        tipomov = "M";
        $('#dmenu').hide();
        $('#dconfiguracion').hide();
        $('#dniveles').hide();
        $('#dtablas').show();
        $('#btnModCat').linkbutton({ disabled: true });
        $('#btnEliCat').linkbutton({ disabled: true });
        $('#btnConfiguracion').linkbutton({ disabled: true });
        $('#btnVistaCat').linkbutton({ disabled: true });
        //$('#btnRelacionar').linkbutton({ disabled: true });
        CARGAR_CATALOGOS('#dgmod', '');
        CARGAR_CAMPOSBUSQUEDAS('#dgmod', '#cbocammod', "TablaConsultas");
        var text = $('#txtvalmod');
        text.textbox('clear').textbox('textbox').focus();
    }
}

function SACAR_GUARDAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = "", Mayusculas = "", Agregar = "", Modificar = "", Eliminar = "", Historia = "", Reportes = "", titulo = "", genclave = "", cargainicial = "", visible = "", datoscaptura = "",cargaarchivo="", Exportar = "";
        if ($('#txttitulo').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el título del catálogo', 'error'); }
        else
            if ($('#txtancho').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el ancho de la vista', 'error'); }
            else
                if ($('#txtalto').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el alto de la vista', 'error'); }
                else
                {
                    if ($('#rbogener').is(":checked") == true) { genclave = "1"; } else { genclave = "0"; }
                    if ($('#chkMayusculas').is(":checked") == true) { Mayusculas = "1"; } else { Mayusculas = "0"; }
                    if ($('#chkAgregar').is(":checked") == true) { Agregar = "1"; } else { Agregar = "0"; }
                    if ($('#chkModificar').is(":checked") == true) { Modificar = "1"; } else { Modificar = "0"; }
                    if ($('#chkEliminar').is(":checked") == true) { Eliminar = "1"; } else { Eliminar = "0"; }
                    if ($('#chkHistoria').is(":checked") == true) { Historia = "1"; } else { Historia = "0"; }
                    if ($('#chkReportes').is(":checked") == true) { Reportes = "1"; } else { Reportes = "0"; }
                    if ($('#chkExportar').is(":checked") == true) { Exportar = "1"; } else { Exportar = "0"; }
                    if ($('#chkcarga').is(":checked") == true) { cargainicial = "1"; } else { cargainicial = "0"; }
                    if ($('#chkvisible').is(":checked") == true) { visible = "1"; } else { visible = "0"; }
                    if ($('#chkDatosCaptura').is(":checked") == true) { datoscaptura = "1"; } else { datoscaptura = "0"; }
                    if ($('#chkCargarArchivo').is(":checked") == true) { cargaarchivo = "1"; } else { cargaarchivo = "0"; }

                    if ($('#chkMayusculas').is(":checked") == true) {
                        titulo = $('#txttitulo').textbox('getValue').toUpperCase();

                    } else {
                        titulo = $('#txttitulo').textbox('getValue');
                    }

                    //if (tipomov == "G") {
                    //valores = "''" + titulo + "''," + genclave + "," + $('#cboreg').combobox('getValue') + "," + Mayusculas + "," +
                    //          Agregar + "," + Modificar + "," + Eliminar + "," + Historia + "," + Reportes + "," + $('#txtancho').textbox('getValue') + "," + $('#txtalto').textbox('getValue') + ",''" + tabla + "''";
                    //}
                    //else {
                    valores = "tablaconsultas=''" + $('#txttabla').textbox('getValue') + "'', cattitulo=''" + titulo + "'',generarclave=" + genclave + ",catregistros=" + $('#cboreg').combobox('getValue') + ",catdesmayusculas=" + Mayusculas + ",catagregar=" + Agregar +
                          ",catmodificar=" + Modificar + ",cateliminar=" + Eliminar + ",cathistoria=" + Historia + ",catreportes=" + Reportes + ",catexportar="+Exportar+",catancho=" + $('#txtancho').textbox('getValue') + ",cargainicial=" + cargainicial +
                          ",catalto=" + $('#txtalto').textbox('getValue') + ",visiblerelaciones=" + visible + ",DatosCaptura=" + datoscaptura+",CargarArchivos="+cargaarchivo;
                    //}
                    GUARDAR_CATALOGO(idtabla, valores);
                }
    }

}
function GUARDAR_CATALOGO(idtabla, valores) {
    var parametros = {};
    parametros.tipomov = tipomov;
    parametros.id = idtabla;
    parametros.valores = valores;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Catalogo",
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

function VALORES_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dgmod').datagrid('getSelected');
        if (rows) {
            idtabla = rows.TablaConsultas;
            tabla = rows.TablaConsultas;
            destabla = rows.CatTitulo;           
            $('#dconfiguracion').show();
            $('#dtablas').hide();
                       
            if (tipomov == "E") {
                $('#btnGConfig').linkbutton({ text: 'Eliminar' });
               /* $('#btnGConfig').linkbutton({ disabled: true });*/

                //$('#btnEConfig').linkbutton({ disabled: false })
                $('#txttabla').textbox({ readonly: true });
                $('#txttitulo').textbox({ readonly: true });
                $('#txttitcorto').textbox({ readonly: true });
                $('#cboreg').combobox({ readonly: true });

                $('#chkMayusculas').attr("disabled", true);
                $('#chkAgregar').attr("disabled", true);
                $('#chkEliminar').attr("disabled", true);
                $('#chkModificar').attr("disabled", true);
                $('#chkHistoria').attr("disabled", true);
                $('#chkReportes').attr("disabled", true);
                $('#chkExportar').attr("disabled", true);
                $('#chkCarga').attr("disabled", true);
                $('#chkvisible').attr("disabled", true);
                $('#chkvisible').attr("disabled", true);
                $('#chkDatosCaptura').attr("disabled", true);
                $('#chkCargarArchivos').attr("disabled", true);

                $('#rbnormal').attr("disabled", true);
                $('#rbogener').attr("disabled", true);

                $('#txtancho').textbox({ readonly: true });
                $('#txtalto').textbox({ readonly: true });

                $('#btnBuscartbl').linkbutton({ disabled: true });
                $('#btnLimpiartbl').linkbutton({ disabled: true });
            }
            else {
                $('#btnGConfig').linkbutton({ text: 'Modificar' });
               // $('#btnGConfig').linkbutton({ disabled: false });

              //  $('#btnEConfig').linkbutton({ disabled: true })
                $('#txttabla').textbox({ readonly: true });
                $('#txttitulo').textbox({ readonly: false });
                $('#cboreg').combobox({ readonly: false });

                $('#chkMayusculas').attr("disabled", false);
                $('#chkAgregar').attr("disabled", false);
                $('#chkEliminar').attr("disabled", false);
                $('#chkModificar').attr("disabled", false);
                $('#chkHistoria').attr("disabled", false);
                $('#chkReportes').attr("disabled", false);
                $('#chkExportar').attr("disabled", false);
                $('#chkCarga').attr("disabled", false);
                $('#chkvisible').attr("disabled", false);
                $('#chkDatosCaptura').attr("disabled", false);
                $('#chkCargarArchivos').attr("disabled", false);

                $('#rbnormal').attr("disabled", false);
                $('#rbogener').attr("disabled", false);

                $('#txtancho').textbox({ readonly: false });
                $('#txtalto').textbox({ readonly: false });

                $('#btnBuscartbl').linkbutton({ disabled: false });
                $('#btnLimpiartbl').linkbutton({ disabled: false });
            }

            $('#txttabla').textbox('setValue', '');
            $('#txttitulo').textbox('setValue', '');
            $('#txttabla').textbox('setValue', rows.TablaConsultas);
            $('#txttitulo').textbox('setValue', rows.CatTitulo);
            $('#cboreg').combobox('setValue', rows.CatRegistros);

            if (rows.GenerarClave == 'Si') {
                document.getElementById('rbogener').checked = true;
                document.getElementById('rbnormal').checked = false;
            } else {
                document.getElementById('rbnormal').checked = true;
                document.getElementById('rbogener').checked = false;
            }
            if (rows.CatDesMayusculas == 1) { document.getElementById('chkMayusculas').checked = true; } else { document.getElementById('chkMayusculas').checked = false; }
            if (rows.CatAgregar == 1) { document.getElementById('chkAgregar').checked = true; } else { document.getElementById('chkAgregar').checked = false; }
            if (rows.CatModificar == 1) { document.getElementById('chkEliminar').checked = true; } else { document.getElementById('chkEliminar').checked = false;  }
            if (rows.CatEliminar == 1) { document.getElementById('chkModificar').checked = true; } else { document.getElementById('chkModificar').checked = false; }
            if (rows.CatHistoria == 1) { document.getElementById('chkHistoria').checked = true; } else { document.getElementById('chkHistoria').checked = false; }
            if (rows.CatReportes == 1) { document.getElementById('chkReportes').checked = true; } else { document.getElementById('chkReportes').checked = false;  }
            if (rows.CatExportar == 1) { document.getElementById('chkExportar').checked = true; } else { document.getElementById('chkExportar').checked = false;  }
            if (rows.CargaInicial == "Si") { $('#chkCarga').attr("checked", true); } else { document.getElementById('chkCarga').checked = false;  }
            if (rows.Visible == "Si") { $('#chkvisible').attr("checked", true); } else { document.getElementById('chkvisible').checked = false; }
            if (rows.DatosCaptura == "Si") {
                document.getElementById('chkDatosCaptura').checked = true;
            } else { document.getElementById('chkDatosCaptura').checked = false; }
            if (rows.CargarArchivos == "Si") {
                document.getElementById('chkCargarArchivos').checked = true;
            } else { document.getElementById('chkCargarArchivos').checked = false; }

            

            $('#txtancho').textbox('setValue', rows.CatAncho);
            $('#txtalto').textbox('setValue', rows.CatAlto);           
        }
    }
}

function REGRESAR_MENU()
{
    $('#dmenu').show();
    $('#dtablas').hide();
    $('#dniveles').hide();
    $('#dconfiguracion').hide();    
}
function REGRESAR_NIVELES() {
    $('#dmenu').show();
    $('#dmodniveles').hide();    
    tabla = "";
}
function REGRESAR_CONFIGURCION() {
    $('#dtablas').show();
    $('#dconfiguracion').hide();
    $('#dniveles').hide();
    $('#dmenu').hide();
    $('#btnConfiguracion').linkbutton({ disabled: false });

    $('#btnModCat').linkbutton({ disabled: true });
    $('#btnEliCat').linkbutton({ disabled: true });
    $('#btnConfiguracion').linkbutton({ disabled: true });
    $('#btnVistaCat').linkbutton({ disabled: true });
    //$('#btnRelacionar').linkbutton({ disabled: true });
    
    CARGAR_CATALOGOS('#dgmod', '');
}
function MENU_INICIAL() {
    $('#dmenu').show();
    $('#dtablas').hide();
    $('#dconfiguracion').hide();
    $('#dniveles').hide();
    $('#drelaciones').hide();
    idtabla = "";
    tabla = "";
}



function CARGAR_NIVELES(condicion) {

    $('#dgcatnivel').datagrid({
        url: "Listar_Catalogos_Niveles.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "35%",
        heigth: "600px",
        onClickRow: function () {
            rows = $(this).datagrid('getSelected');
            if (rows) {
                $('#btnNiveles').linkbutton({ disabled: false });
                $('#btnENivel').linkbutton({ disabled: false });
            }
        }
    });
}
function CONFIGURACION_NIVELES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dgcatnivel').datagrid('getSelected');
        if (rows) {
            //document.location = "Catalogos_Niveles.aspx?tabla=" + rows.Tabla + '&mod=Mniv';
            IR_PAGINA("Catalogos_Niveles.aspx","tabla=" + rows.Tabla + '&mod=Mniv');
        }
    }
}
function MODIFICAR_NIVELES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide();
        $('#dconfiguracion').hide();
        $('#dtablas').hide();        
        $('#dniveles').show();

        CARGAR_NIVELES('');
        CARGAR_CAMPOSBUSQUEDA("#dgcatnivel", "#cbocamnivel");
        var text = $('#txtvalnivel');
        text.textbox('clear').textbox('textbox').focus();
    }
}


function MOSTRAR_CATALOGO(btnobj)
{  
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dgmod').datagrid('getSelected');
        if (rows) {
            //document.location = "CatalogosGenerales.aspx?idtabla=" + rows.TablaConsultas + "&mod=Mcat";
            IR_PAGINA("CatalogosGenerales.aspx","idtabla=" + rows.TablaConsultas + "&mod=Mcat");
        }
    }
}
function CONFIGURACION_CATALOGOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dgmod').datagrid('getSelected');
        if (rows) {
            idtabla = rows.TablaConsultas;           
            destabla = rows.CatTitulo;
            //document.location = "catalogos_configuracion.aspx?idtabla=" + idtabla + "&tabla=" + destabla + " (" + idtabla + ")&mod=Mcat";
            IR_PAGINA("catalogos_configuracion.aspx", "idtabla=" + idtabla + "&tabla=" + destabla + " (" + idtabla + ")&mod=Mcat");
        }
       
    }
}

function LIMPIAR_FILTRO_NIVELES() {
    CARGAR_NIVELES('');
    $('#cboconnivel').combobox('setValue', '=');
    var text = $('#txtvalnivel');
    text.textbox('clear').textbox('textbox').focus();
}
function ELIMINAR_NIVELES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgcatnivel').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la configuración del nivel', function (r) {
                if (r) {    
                    var rowIndex = $("#dgmod").datagrid("getRowIndex", filas);
                    INSERTAR_CATALOGOS_NIVELES(filas.Tabla,'');
                    $('#dgmod').datagrid('deleteRow', rowIndex);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar el catálogo a eliminar', 'error'); }
    }
}
function INSERTAR_CATALOGOS_NIVELES(tabla, campos) {
    var parametros = {};
    parametros.tabla = tabla;
    parametros.campos = campos;
    parametros.tipo = 'E';
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Catalogos_Niveles',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
            else { $.messager.alert('Inoformación', data.d[1], 'info'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function REGRESAR_RELACIONES() {
    $('#dtablas').show();
    $('#dconfiguracion').hide();
    $('#dniveles').hide();
    $('#dmenu').hide();
    $('#drelaciones').hide();
    $('#btnConfiguracion').linkbutton({ disabled: false });

    $('#btnModCat').linkbutton({ disabled: true });
    $('#btnEliCat').linkbutton({ disabled: true });
    $('#btnConfiguracion').linkbutton({ disabled: true });
    $('#btnVistaCat').linkbutton({ disabled: true });
    //$('#btnRelacionar').linkbutton({ disabled: true });

    CARGAR_CATALOGOS('#dgmod', '');
}
function CARGAR_RELACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tabla = "";
        $.messager.confirm('Confirm', 'Seguro de agregar tabla sin relacionar con otro catálogo', function (r) {
            if (r) {
                $('#btnEliminarRel').linkbutton({ disabled: true });
                $('#dtablas').hide();
                $('#dconfiguracion').hide();
                $('#dniveles').hide();
                $('#dmenu').hide();
                $('#drelaciones').show();
                var rows = $('#dgmod').datagrid('getSelected');
                if (rows) {
                    document.getElementById('tbltabla').innerHTML = "Tabla Seleccionada: " + rows.TablaConsultas;
                    tabla = rows.TablaConsultas;
                }
                RELACIONES_TABLAS(tabla);
            }
        });       
    }
}
function LIMPIAR_RELACION() {
    var filas = $('#dgrelaciones').datagrid('getSelected');
    if (filas != null) {
        var rowIndex = $("#dgrelaciones").datagrid("getRowIndex", filas);
        $('#dgrelaciones').datagrid('unselectRow', rowIndex);
    }
    $('#btnEliminarRel').linkbutton({disabled:true});
}
function CARGAR_COLUMNAS_TABLA(objrtv, tabla) {
    var parametros = {};
    parametros.strtabla = tabla;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Columnas_Tablas',
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
            $(objrtv).tree({
                data: obj,
                onLoadSuccess: function () {
                    //var tri = $(objrtv).tree('getRoots');                    
                    //    for (var h = 0; h < tri.length; h++) {
                    //        if (rows[t].campo == tri[h].text) {
                    //            $(objrtv).tree('check', tri[h].target)
                    //            break;
                    //        }                        
                    //}
                }
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
function CARGAR_LISTATABLAS(objcbo, objson) {
    $(objcbo).combobox({
        data: objson,
        valueField: 'campo',
        textField: 'descripcion',
        editable: false,
        onSelect: function (rec) {
            if (rec.campo != 'x') {
                if (objcbo == '#cbocamizq')
                {CARGAR_COLUMNAS_TABLA('#tcolizq', rec.campo);}
                if (objcbo == '#cbocamder')
                {CARGAR_COLUMNAS_TABLA('#tcolder', rec.campo); }
            }
        }
    });
}
function TABLAS_SISTEMA(tblizq,tblder) {
    var obj = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/ddl_Tablas_Sistema',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = jQuery.parseJSON(data.d[0]);
            CARGAR_LISTATABLAS('#cbocamizq', obj);
            CARGAR_LISTATABLAS('#cbocamder', obj);
            if (tblizq != "")
            { 
                $('#cbocamizq').combobox('setValue', tblizq);
                CARGAR_COLUMNAS_TABLA('#tcolizq', tblizq);
            }
            if (tblder != "")
            { 
               $('#cbocamder').combobox('setValue', tblder);
               CARGAR_COLUMNAS_TABLA('#tcolder', tblder);
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


function RELACIONES_TABLAS(condicion,ancho,alto)
{
    $('#dgrelaciones').datagrid({
        url: 'Listar_Relaciones.aspx?&tabla=' + condicion,
        pagination: false,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        //pageSize: 20,
        //width: ancho + "%",
        //heigth: alto + "%",
        onClickRow: function () {
            rows = $('#dgrelaciones').datagrid('getSelected');
            if (rows) {            
                $('#btnEliminarRel').linkbutton('enable');
            }
        }
    });
   
}
function GRID_RELACIONES(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: 'Listar_Tablas.aspx?&busqueda=' + condicion,
        pagination: false,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        //pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {            
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                $('#btnAgregarRel').linkbutton('enable');
                $('#btnEliminarRel').linkbutton('enable');                
            }
        }
    });
}
function LIMPIAR_DISEÑO_RELACION() {
    $('#cbocamizq').combobox('setValue', 'X');
    $('#cbocamder').combobox('setValue', 'X');
    var t = $('#tcolizq');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    var t = $('#tcolder');
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }   
    //$('#btnleft').linkbutton({ selected: false });
    //$('#btnright').linkbutton({ selected: false });
    //$('#btnunion').linkbutton({ selected: false });    
}
function DISEÑO_RELACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
            $('#btnAgregarRel').linkbutton('enable');
            $('#btnEliminarRel').linkbutton('enable');                        
            LIMPIAR_DISEÑO_RELACION();
        var rows = $('#dgrelaciones').datagrid('getSelected');
        if (rows) {
            TABLAS_SISTEMA(rows.TablaIzquierda, rows.TablaDerecha);
        }
        else { TABLAS_SISTEMA('', ''); }
            windows("#winr", 650, 400, false, 'Relaciones');        
       
    }
}

function MOVIMIENTO_RELACION_TABLA(movimiento, clave, tabla, valores) {
    var parametros = {};
    parametros.strtipo = movimiento;
    parametros.id = clave;
    parametros.strvalores = valores;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Movimiento_RelacionTablas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                error = "1"; $.messager.alert('Error', data.d[1], 'error');
                $('#btnLimpiarLRel').linkbutton({ disabled: true });
                $('#btnAgregarRel').linkbutton({ disabled: true });
                $('#btnEliminarRel').linkbutton({ disabled: true });
            }
            else {
                error = "0"; $.messager.alert('Información', data.d[1], 'info');
                $('#btnLimpiarLRel').linkbutton({ disabled: false });
                $('#btnAgregarRel').linkbutton({ disabled: false });
                $('#btnEliminarRel').linkbutton({ disabled: false });              
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}
function GUARDAR_DIS_RELACION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var colizq = "",colder="";
        var t = $('#tcolizq');
        var nodei = t.tree('getSelected');
        if (nodei == null) { colizq = ""; }
        else{ colizq = nodei.text; }

            var t = $('#tcolder');
            var noded = t.tree('getSelected');
            if (noded == null) { colder = ""; }
            else { colder = noded.text; }

                if ($('#cbocamizq').combobox('getValue') == 'X') { $.messager.alert('Error', 'Falta seleccionar la tabla izquierda', 'error'); return 0; }
                else
                    if ($('#cbocamder').combobox('getValue') == 'X') { $.messager.alert('Error', 'Falta seleccionar la tabla derecha', 'error'); return 0; }
                    else
                    {                        
                        var valores = ""; var relacion = "";
                        var filas = $('#dgrelaciones').datagrid('getSelected');
                        var index = $('#dgrelaciones').datagrid('getRowIndex', filas)
                        if (filas != null) {
                            if ((colizq == "") && (colder != "")) { relacion = $('#cbocamizq').combobox('getText') + "." + colizq + "=" + $('#cbocamder').combobox('getText') + "." + colder; }
                            else { relacion = ""; }
                            valores = "TablaIzquierda=''" + $('#cbocamizq').combobox('getText') + "'',TablaDerecha=''" + $('#cbocamder').combobox('getText') + "'',Relacion=''" + relacion + "''"
                            MOVIMIENTO_RELACION_TABLA('M', filas.Id, '', valores);
                        }
                        else {                            
                            if ((colizq == "") && (colder != "")) { relacion = $('#cbocamizq').combobox('getText') + "." + colizq + "=" + $('#cbocamder').combobox('getText') + "." + colder; }
                            else { relacion = ""; }
                            valores = "''" + $('#cbocamizq').combobox('getText') + "'',''" + $('#cbocamder').combobox('getText') + "'',''" + relacion + "''";
                            MOVIMIENTO_RELACION_TABLA('G', 0, '', valores);
                        }
                        if (error == "0") {
                            var relacion="";
                            if ((colizq == "") && (colder != ""))
                            { relacion = $('#cbocamizq').combobox('getText') + "." + colizq + "=" + $('#cbocamder').combobox('getText') + "." + colder; }
                            else { relacion = ""; }
                            if (filas == null) {
                                $('#dgrelaciones').datagrid('insertRow', {
                                    index: 1,
                                    row: {
                                        TablaDerecha: $('#cbocamder').combobox('getText'),
                                        TablaIzquierda: $('#cbocamizq').combobox('getText'),
                                        Relacion: relacion
                                    }
                                });
                            }
                            else {
                                $('#dgrelaciones').datagrid('updateRow', {
                                    index: index,
                                    row: {
                                        TablaDerecha: $('#cbocamder').combobox('getText'),
                                        TablaIzquierda: $('#cbocamizq').combobox('getText'),
                                        Relacion: relacion
                                    }
                                });
                            }
                            $("#winr").window('close');
                        }
                    }
    }
}

function MODIFICAR_TABLAS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var obj = "";     
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Listar_Tablas_Sistema',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                obj = jQuery.parseJSON(data.d[0]);
                $('#tvtablas').tree({
                    data: obj,
                });
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.statusText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
        windows("#wtablas", 400, 500, false, 'Tablas del Sistema');
    }
}


