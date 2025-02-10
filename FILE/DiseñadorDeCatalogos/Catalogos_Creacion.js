var checkedRowsCampos = [];
var editIndex = undefined;
var modulo = "";
var indice = "";
var tipomov = "G";
var tipmod = "",tabla="",Agregarfila="";
var valoresant = "",error;
$(document).ready(function () {
    if ($_GET('mod') != null) {
        modulo = $_GET('mod');
    } else { modulo = ''; }

    if (modulo == "Ccat") { EXISTE_TABLA('#btnCrearTbl'); }
    //botones del menu inicial
    $('#btnCrearTbl').bind('click', function () { CREAR_NUEVA_TABLA('#btnCrearTbl'); });
    $('#btnEditarTbl').bind('click', function () { MODIFICAR_TABLA_CREADA('#btnEditarTbl'); });    
    $('#btnExisteTbl').bind('click', function () { EXISTE_TABLA('#btnCrearTbl'); });
   
    //valores de busqueda de tablas existentes
    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_GRID_CAT();
        }
    });
    $('#btnBuscarcat').bind('click', function () { FILTRAR_GRID_CAT(); });
    
    //botones de tablas existentes
    $('#btnIExiste').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnRExiste').bind('click', function () { REGRESAR_EXISTETBL(); });   
    $('#btnLExiste').bind('click', function () { LIMPIAR_TABLAS_SISTEMAS(); });
    $('#btnConfiguracion').bind('click', function () {
        CONFIGURACION_CATALOGOS('#btnConfiguracion');
    });


    //valores de busqueda de tablas creadas
    $('#txtvaltblcreada').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_GRID_dgtblcreada();
        }
    });
    $('#btnBtblcreada').bind('click', function () { FILTRAR_GRID_dgtblcreada(); });

    //botones de tablas creadas
    $('#btnICreada').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnRCreada').bind('click', function () { REGRESAR_MODIFICAR_TBL(); });
    $('#btnLCreada').bind('click', function () { LIMPIAR_TABLA_EXISTENTES('#btnLCreada'); });
    $('#btnMCreada').bind('click', function () { EDITAR_TABLACREADA('#btnMCreada'); });
    $('#btnECreada').bind('click', function () { ELIMINAR_TABLACREADA('#btnECreada'); });

    //valores de busqueda de lista tablas a crear
    $('#txtvaltblcrear').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_GRID_TABLAS_CREAR();
        }
    });
    $('#btnBtblcrear').bind('click', function () { FILTRAR_GRID_TABLAS_CREAR(); });

    //botones de tablas a crear
    $('#btnIlsttblcrear').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnRlsttblcrear').bind('click', function () { REGRESAR_TABLA_CREAR(); });
    $('#btnAlsttblcrear').bind('click', function () { AGREGAR_TABLA_CREAR(); });
    $('#btnElsttblcrear').bind('click', function () { ELIMINAR_TABLA_CREAR('#btnElsttblcrear'); });
    $('#btnLlsttblcrear').bind('click', function () { LIMPIAR_TABLA_CREAR(); });
    $('#btnMlsttblcrear').bind('click', function () { MODIFICAR_TABLA_CREAR('#btnMlsttblcrear'); });
    $('#btnDlsttblcrear').bind('click', function () { CREAR_DISEÑO_TABLA('#btnDlsttblcrear'); });
   
    $('#btnICrear').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnRCrear').bind('click', function () { REGRESAR_CREAR(); });    
    $('#btnLCrear').bind('click', function () { LIMPIAR_CREAR(); });
    $('#btnGCrear').bind('click', function () { GUARDAR_CREAR('#btnGCrear');});

   
    //botones de diseño de tabla        
    $('#btnIDiseñoTbl').bind('click', function () {
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnRDiseñoTbl').bind('click', function () { REGRESAR_DISEÑO_TABLA(); });
    $('#btnGDiseñoTbl').bind('click', function () {
        if (tipomov == "G")
        { GUARDAR_DISEÑO_TABLA('#btnGDiseñoTbl'); }
        else { MODIFICAR_DISEÑO_TABLA('#btnGCrear'); }

    });

    //botones de del grid del diseño de la tabla
    $('#btnAgregar').bind('click', function () { CREAR_FILAS_GRID(); });
    $('#btnEliminar').bind('click', function () { ELIMINAR_FILAS_GRID('#btnEliminar'); });
    


    $('#btnIConfig').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
    $('#btnrRegresar').bind('click', function () {
        //document.location = "Catalogos_Menu.aspx";
        IR_PAGINA("Catalogos_Menu.aspx", "");
    });
       
    $('#btnRConfig').bind('click', function () { REGRESAR_CONFIGURCION(); });      
    $('#btnRTablas').bind('click', function () { REGRESAR_TABLAS(); });
    $('#btnInicio').bind('click', function () { REGRESAR_INICIO(); });    
    $('#btnLConfig').bind('click', function () { LIMPIAR_DISEÑO_CATALOGO(); });
    //$('#btnEConfig').bind('click', function () { ELIMINAR_CATALOGO('#btnEConfig'); });    
    $('#btnGConfig').bind('click', function () {
        SACAR_GUARDAR_CATALOGO('#btnGConfig');
    });
            
    $('#dgtabla').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });

    $('#dgtabla').datagrid({
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        pageSize: 20,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheckCampos,
        onUncheck: onUncheckCampos,
        onBeginEdit: function (index, row) {
            var dg = $(this);
            var dato = "";
            var TipoDato = dg.datagrid('getEditor', { index: index, field: 'TipoDato' });
            var Llave = dg.datagrid('getEditor', { index: index, field: 'Llave' });
            var Nulo = dg.datagrid('getEditor', { index: index, field: 'Nulo' });
            var long = dg.datagrid('getEditor', { index: index, field: 'Longitud' });
            var dec = dg.datagrid('getEditor', { index: index, field: 'Decimal' });
            var Default = dg.datagrid('getEditor', { index: index, field: 'Predeterminado' });
            var Identidad = dg.datagrid('getEditor', { index: index, field: 'Identidad' });
            $(TipoDato.target).combobox({
                onChange: function (value) {
                    dato = value;
                    if (value == 'bit') {
                        if (long != null) {
                            $(long.target).textbox({ disabled: true });
                            $(long.target).textbox('setValue', '');
                        }
                        if (dec != null) {
                            $(dec.target).textbox({ disabled: true });
                            $(dec.target).textbox('setValue', '');
                        }
                        if (Default != null) {
                            $(Default.target).combobox({ disabled: false });
                            $(Default.target).combobox('setValue', '0');
                        }
                        $(Nulo.target).prop('checked', false);
                        $(Nulo.target).prop('disabled', false);
                    }
                    else {
                        if (value == 'int') {
                            if (long != null) {
                                $(long.target).textbox({ disabled: true });
                                $(long.target).textbox('setValue', '');
                            }
                            if (dec != null) {
                                $(dec.target).textbox({ disabled: true });
                                $(dec.target).textbox('setValue', '');
                            }
                            if (Default != null) {
                                $(Default.target).combobox({ disabled: true });
                                $(Default.target).combobox('setValue', '');
                            }
                        }
                        else
                            if (value == 'varchar') {
                                if (long != null) {
                                    $(long.target).textbox({ disabled: false });
                                    $(long.target).textbox('setValue', 'MAX');
                                }
                                if (dec != null) {
                                    $(dec.target).textbox({ disabled: true });
                                    $(dec.target).textbox('setValue', '');
                                }
                                if (Default != null) {
                                    $(Default.target).combobox({ disabled: true });
                                    $(Default.target).combobox('setValue', '');
                                }
                            }
                            else
                                if (value == 'numeric') {                                    
                                    if (long != null) {
                                        $(long.target).textbox({ disabled: false });
                                        $(long.target).textbox('setValue', '18');
                                    }
                                    if (dec != null) {
                                        $(dec.target).textbox({ disabled: false });
                                        $(dec.target).textbox('setValue', '2');
                                    }                                    
                                    if (Default != null) {
                                        $(Default.target).combobox({ disabled: true });
                                        $(Default.target).combobox('setValue', '');
                                    }
                                }
                        $(Nulo.target).prop('checked', true);
                        $(Nulo.target).prop('disabled', false);
                    }
                    $(long.target).textbox('textbox').css('textAlign', 'center');
                    $(dec.target).textbox('textbox').css('textAlign', 'center');
                }
            })
            $(Nulo.target).click(function () {
                var val = $(this).is(':checked');
                if (val == false) { $(Default.target).combobox({ disabled: false }); }
                else { $(Default.target).combobox({ disabled: true }); }
                if (dato == 'bit')
                { $(Default.target).combobox('setValue', '0'); }
                else
                { $(Default.target).combobox('setValue', ''); }
            })
            $(Identidad.target).click(function () {
                var val = $(this).is(':checked');
                if (val == true) {
                    $(TipoDato.target).combobox('setValue', 'int');
                    $(Nulo.target).prop('checked', false);
                    $(Nulo.target).prop('disabled', true);
                    $(long.target).textbox({ disabled: true });
                    $(TipoDato.target).textbox({ disabled: true });
                }
                else {
                    $(TipoDato.target).combobox('setValue', 'varchar');
                    $(Nulo.target).prop('checked', true);
                    $(Nulo.target).prop('disabled', false);
                    $(long.target).textbox({ disabled: false });
                    $(TipoDato.target).textbox({ disabled: false });
                }               
                $(long.target).textbox('textbox').css('textAlign', 'center');
                $(dec.target).textbox('textbox').css('textAlign', 'center');
            })           
        }
    });  
});

//$(window).load(function () {
   
//});

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

function onCheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].Id == row.Id) {
            return
        }
    }       
    checkedRowsCampos.push(row);
}
function onUncheckCampos(index, row) {
    for (var i = 0; i < checkedRowsCampos.length; i++) {
        if (checkedRowsCampos[i].Id == row.Id) {
            checkedRowsCampos.splice(i, 1);
            return;
        }
    }
}

function OrdenarCampos(a, b) {
    var aName = a.Orden;
    var bName = b.Orden;
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function CONFIGURACION_CATALOGOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //var rows = $('#dgcat').datagrid('getSelected');
        //if (rows) {
        //    idtabla = rows.name;
        //    destabla = rows.name;
        //    document.location = "catalogos_configuracion.aspx?idtabla=" + idtabla + "&tabla=" + destabla + " (" + idtabla + ")&mod=Ccat";
        //}  
        var rows = $('#dgcat').datagrid('getSelected');
       if (rows) {
           $('#txttabla').textbox('setValue', rows.name);
           //$('#txtancho').textbox('setValue', 50);
           //$('#txtalto').textbox('setValue', 50);
           $('#chkMayusculas').attr("checked", true);
          /* $('#rbnormal').attr("checked", true);*/
           $('#txttabla').textbox({ readonly: true });
           $('#txttitulo').textbox('setValue','');
           $('#dtblexistente').hide();
           $('#dconfiguracion').show();

       }
    }
}

function REGRESAR_TABLAS() {
    $('#dconfiguracion').hide();
    if (tipomov == "G") {
        $('#dtablas').show();
        CARGAR_TABLAS('#dgcat', '');
    }
    else {
        $('#dmodtabla').show();
        $('#btnEditCat').linkbutton({ disabled: true })
        $('#btnEliCat').linkbutton({ disabled: true })
        $('#btnModCat').linkbutton({ disabled: true })
        $('#btnVistaCat').linkbutton({ disabled: true })
        CARGAR_CATALOGOS_DISEÑADOS('#dgmod', '');
    }
    idtabla = "";
    tabla = "";
}

function REGRESAR_INICIO() {
    $('#dmenu').show();    
    $('#dconfiguracion').hide();
}

function REGRESAR_CONFIGURCION() {
    $('#dtblexistente').show();
    $('#dconfiguracion').hide();
    $('#btnConfiguracion').linkbutton({ disabled: false });
    $('#btnConfiguracion').linkbutton({ disabled: true })
    $('#txtvalcat').textbox('setValue', '');
    var text = $('#txtvalcat');
    text.textbox('clear').textbox('textbox').focus();
    CARGAR_TABLAS('#dgcat', '');
}

function CARGAR_TABLAS(dgobj, condicion) {
    $(dgobj).datagrid({
        url: "Listar_Tablas_Sistema.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "55%",
        heigth: "600px",
        onClickRow: function () {
            rows = $(dgobj).datagrid('getSelected');
            if (rows) {
                indice = $(dgobj).datagrid('getRowIndex', rows);              
                tabla = rows.name;
                $('#dtablas').hide();
                $('#dconfiguracion').show();
                $('#btnLConfig').show();
                $('#btnConfiguracion').linkbutton({ disabled: false });

                //document.getElementById('lblcat').innerHTML = "Catálogo Seleccionado: " + rows.name;
                //LIMPIAR_DISEÑO_CATALOGO();
            }
        }
    });
}
function FILTRAR_GRID_CAT() {
    var condicion = "";
    var vvalor = $('#txtvalcat').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbocamcat').combobox('getValue');
        var vcondicion = $('#cboconcat').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }
    else { condicion = " "; }

    CARGAR_TABLAS('#dgcat', condicion);
}

function EXISTE_TABLA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
        $('#dmenu').hide();
        $('#dtblexistente').show();
        $('#dtblcrear').hide();
        CARGAR_TABLAS('#dgcat','');
        CARGAR_CAMPOSBUSQUEDAS('#dgcat', '#cbocamcat', "name");
        $('#btnConfiguracion').linkbutton({ disabled: false });
        var text = $('#txtvalcat');
        text.textbox('clear').textbox('textbox').focus();
    }
}
function REGRESAR_EXISTETBL()
{
    $('#dmenu').show();
    $('#dtblexistente').hide();
}


function CARGAR_TABLAS_CREAR(dgobj, condicion) {
    $(dgobj).datagrid({
        url: "Listar_Tablas_Creadas.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "55%",
        heigth: "600px",
        onClickRow: function () {
            rows = $(dgobj).datagrid('getSelected');
            if (rows) {
                //indice = $(dgobj).datagrid('getRowIndex', rows);
                tabla = rows.name;
                $('#btnMlsttblcrear').linkbutton({ disabled: false });
                $('#btnElsttblcrear').linkbutton({ disabled: false });
                $('#btnDlsttblcrear').linkbutton({ disabled: false });
            }
        }
    });
}
function FILTRAR_GRID_TABLAS_CREAR() {
    var condicion = "";
    var vvalor = $('#txtvaltblcrear').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbocamtblcrear').combobox('getValue');
        var vcondicion = $('#cbocontblcrear').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }
    else { condicion = " "; }

    CARGAR_TABLAS_CREAR('#dglsttblcrear', condicion);
}
function CREAR_NUEVA_TABLA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide();       
        $('#dlistatblcrear').show();       
        CARGAR_TABLAS_CREAR('#dglsttblcrear', '');
        CARGAR_CAMPOSBUSQUEDAS('#dglsttblcrear', '#cbocamtblcrear', "Tabla");
    }
}
function REGRESAR_TABLA_CREAR()
{
    $('#dmenu').show();
    $('#dlistatblcrear').hide();
}
function AGREGAR_TABLA_CREAR()
{   
    $('#dlistatblcrear').hide();
    $('#dCapturaCrear').show();
    var txtnomtbl = $('#txtnomtbl');
    txtnomtbl.textbox('clear').textbox('textbox').focus();
    //if (tipomov == 'G')
     $('#btnGCrear').linkbutton({ text: 'Guardar' });     
}
function ELIMINAR_TABLA_CREAR(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (rows.TablaSistema == 'Si') { $.messager.alert('Información', 'La tabla '+rows.Tabla+' no se puede eliminar por ser de SISTEMA', 'info'); }
        else
            {
            $.messager.confirm('Confirm', 'Seguro de eliminar la tabla ', function (r) {
                if (r) {               
                    var rows = $('#dglsttblcrear').datagrid('getSelected');
                    if (rows) {                                
                        var rowIndex = $("#dglsttblcrear").datagrid("getRowIndex", rows);
                        ELIMINAR_TABLA(rows.tabla, rowIndex);
                    }
                }
            });
         }        
    }
}
function ELIMINAR_TABLA(tabla, fila) {
    var parametros = {};
    parametros.strtabla = tabla;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Eliminar_Catalogo",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
                $('#dglsttblcrear').datagrid('deleteRow', fila);
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
function MODIFICAR_TABLA_CREAR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {      
       var rows = $('#dglsttblcrear').datagrid('getSelected');
       if (rows) {
           tipomov = "M";
           $('#dlistatblcrear').hide();
           $('#dCapturaCrear').show();
           $('#txtnomtbl').textbox('setValue', rows.Tabla);
           if (rows.GeneraHistoria == "Si")
           { document.getElementById('chkhistoria').checked = true; }
           else { document.getElementById('chkhistoria').checked = false;  }
           if (rows.TablaSistema == "Si")
           { document.getElementById('chksistema').checked = true; }
           else { document.getElementById('chksistema').checked = false; }
       }
       else { $.messager.alert('Error', 'Falta seleccionar la tabla a modificar', 'error'); }
    }
}
function LIMPIAR_TABLA_CREAR()
{
    $('#btnMlsttblcrear').linkbutton({ disabled: true });
    $('#btnElsttblcrear').linkbutton({ disabled: true });
    $('#btnDlsttblcrear').linkbutton({ disabled: true });
    CARGAR_TABLAS_CREAR('#dglsttblcrear', '');
}


function REGRESAR_CREAR() {
    $('#dlistatblcrear').show();
    $('#dCapturaCrear').hide();
    $('#btnMlsttblcrear').linkbutton({ disabled: true });
    $('#btnElsttblcrear').linkbutton({ disabled: true });
    $('#btnDlsttblcrear').linkbutton({ disabled: true });
    CARGAR_TABLAS_CREAR('#dglsttblcrear','');
}
function LIMPIAR_CREAR()
{
    $('#txtnomtbl').textbox('setValue', '');
    var txtnomtbl = $('#txtnomtbl');
    txtnomtbl.textbox('clear').textbox('textbox').focus();    
    document.getElementById('chkhistoria').checked = false;
    document.getElementById('chksistema').checked = false;
}
function GUARDAR_CREAR(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var Historia = 0, Sistema = 0;
        if ($('#chkhistoria').is(":checked") == true) { Historia = 1; } else { Historia = 0; }
        if ($('#chksistema').is(":checked") == true) { Sistema = 1; } else { Sistema = 0; }

        INSERTAR_TABLA($('#txtnomtbl').textbox('getValue'), Historia,Sistema);
    }
}
function INSERTAR_TABLA(tabla,Historia,Sistema) {
  
    var parametros = {};
    parametros.tabla = tabla;
    parametros.historia = Historia;
    parametros.sistema = Sistema;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_Tabla',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else {               
                $('#dlistatblcrear').show();
                $('#dCapturaCrear').hide();
                $('#dglsttblcrear').datagrid('loadData', { "total": 0, "rows": [] });
                CARGAR_TABLAS_CREAR('#dglsttblcrear', '');
                $.messager.alert('Informacion', data.d[1], 'info');
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


function REGRESAR_DISEÑO_TABLA()
{
    $('#dlistatblcrear').show();
    $('#dtbldiseño').hide();
    var rows = $('#dglsttblcrear').datagrid('getSelected');
    var rowIndex = $("#dglsttblcrear").datagrid("getRowIndex", rows);
    $('#dglsttblcrear').datagrid('unselectRow', rowIndex);
    $('#btnMlsttblcrear').linkbutton({ disabled: true });
    $('#btnElsttblcrear').linkbutton({ disabled: true });
    $('#btnDlsttblcrear').linkbutton({ disabled: true });
    $('#dgtabla').datagrid('loadData', { "total": 0, "rows": [] });
    $('#txtnumcampos').textbox('setValue', '1');
    $('#btnEliminar').linkbutton({ disabled: true });
    $('#btnGDiseñoTbl').linkbutton({ disabled: true });

}
function CREAR_DISEÑO_TABLA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var rows = $('#dglsttblcrear').datagrid('getSelected');
        if (rows) {
            tabla = rows.Tabla;
            $('#dlistatblcrear').hide();
            $('#dtbldiseño').show();
            var txtnomtbl = $('#txtnumcampos');
            txtnomtbl.textbox('clear').textbox('textbox').focus();
            $('#txtnumcampos').textbox('setValue', '2');
                   
            CARGAR_DISEÑO_TABLA(tabla); 
        }
    }
}

function CREAR_FILAS_GRID() {
    var inicial = 0, total = 0, index = 0,mov="";
    
    if ($('#txtnumcampos').textbox('getValue') != "") {        
            total = $('#dgtabla').datagrid('getData').total;
            if (total > 0) {
                inicial = $('#dgtabla').datagrid('getData').total;
                total = total + parseInt($('#txtnumcampos').textbox('getValue'));
                if (tipomov == "M") { mov = "A"; Agregarfila = "N"; }
            }
            else {
                $('#dgtabla').datagrid('loadData', { "total": 0, "rows": [] });
                total = $('#txtnumcampos').textbox('getValue'); inicial = 0; mov = "";
            }
           
            for (var i = inicial; i < total; i++) {
                $('#dgtabla').datagrid('insertRow', {
                    index: i+1,
                    row:
                        {
                            Id: i+1,
                            Orden: i + 1,
                            TipoDato: 'Texto',
                            Longitud: 'MAX',
                            Nulo: 'Si',
                            Movimiento:mov
                        }
                });
                $('#dgtabla').datagrid('beginEdit', i);
                var ed = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Decimal' });              
                $(ed.target).textbox('textbox').css('textAlign', 'center');
                var varchar = $('#dgtabla').datagrid('getEditor', { index: i, field: 'TipoDato' });
                $(varchar.target).combobox('setValue', 'varchar');
                var edorden = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Orden' })
                $(edorden.target).textbox('textbox').css('textAlign', 'center');
                var edlongitud = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Longitud' });
                $(edlongitud.target).textbox('textbox').css('textAlign', 'center');                 
            }

        $('#btnGDiseñoTbl').linkbutton({ disabled: false });
        $('#btnEliminar').linkbutton({ disabled: false });
    }
    else { $.messager.alert('Error', 'Falta el número de campos a crear', 'error'); }
}
function ELIMINAR_FILAS_GRID(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        var cont = 0;
        var dg = $('#dgtabla');      
        $.messager.confirm('Confirm', 'Seguro de eliminar el campo ', function (r) {
            if (r) {
                dg.datagrid('acceptChanges');
               for (var i = 0; i <  dg.datagrid('getData').total; i++) {
                   if (dg.datagrid('getRows')[i].Chk == "Si") {
                            cont += 1;                         
                            dg.datagrid('deleteRow', i);
                       }
               }
               if (cont == 0) { $.messager.alert('Información', 'Falta seleccionar el campo a eliminar', 'info'); }
               else {
                   for (var i = 0; i < dg.datagrid('getData').total; i++) {
                       dg.datagrid('beginEdit', i);
                       var edIdentidad = dg.datagrid('getEditor', { index: i, field: 'Identidad' });
                       var Orden = dg.datagrid('getEditor', { index: i, field: 'Orden' });
                       var TipoDato = dg.datagrid('getEditor', { index: i, field: 'TipoDato' });
                       var Llave = dg.datagrid('getEditor', { index: i, field: 'Llave' });
                       var Nulo = dg.datagrid('getEditor', { index: i, field: 'Nulo' });
                       var Longitud = dg.datagrid('getEditor', { index: i, field: 'Longitud' });
                       var Decimal = dg.datagrid('getEditor', { index: i, field: 'Decimal' });
                       var Default = dg.datagrid('getEditor', { index: i, field: 'Predeterminado' });

                       $(TipoDato.target).combobox('setValue', dg.datagrid('getRows')[i].TipoDato);
                       $(Orden.target).textbox('setValue', dg.datagrid('getRows')[i].Orden);
                       $(Longitud.target).textbox('setValue', dg.datagrid('getRows')[i].Longitud);
                       $(Decimal.target).textbox('setValue', dg.datagrid('getRows')[i].Decimal);

                       if (dg.datagrid('getRows')[i].Identidad == "Si") {
                           $(edIdentidad.target).prop('checked', true);
                           $(TipoDato.target).combobox('setValue', 'int');
                           $(TipoDato.target).textbox({ disabled: true });
                           $(Longitud.target).textbox({ disabled: true });
                           $(Decimal.target).textbox({ disabled: true });
                           $(Nulo.target).prop('checked', false);
                           $(Nulo.target).prop('disabled', true);
                       } else {
                           $(edIdentidad.target).prop('checked', false);
                           $(Longitud.target).textbox({ disabled: false });
                           $(TipoDato.target).textbox({ disabled: false });
                           $(Longitud.target).textbox({ disabled: false });
                           $(Decimal.target).textbox({ disabled: false });
                           $(Nulo.target).prop('checked', true);
                           $(Nulo.target).prop('disabled', false);
                       }
                       if (dg.datagrid('getRows')[i].Nulo == "Si") {
                           $(Nulo.target).prop('checked', true);
                           $(Default.target).combobox({ disabled: true });
                       }
                       else {
                           if (dg.datagrid('getRows')[i].Identidad == "Si") { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: true }); }
                           else
                           { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: false }); }
                       }

                       $(Orden.target).textbox('textbox').css('textAlign', 'center');
                       $(Longitud.target).textbox('textbox').css('textAlign', 'center');
                       $(Decimal.target).textbox('textbox').css('textAlign', 'center');
                   }
               }
           }
        });               
    }
}

//guardar diseño de la tabla
function GUARDAR_DISEÑO_TABLA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
            $('#loading').show();
            var campos = "", columnas = "", valores = "", valor = "", condicion = "";

            var dg = $('#dgtabla');
            var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
            var rows = dg.datagrid('getRows');
            dg.datagrid('acceptChanges');

            for (var i = 0; i < rows.length; i++)
            {                               
                campo = rows[i]['Campo'];

                for (var c = 2; c < fields.length; c++) {                   
                    valor = rows[i][fields[c]];
                    
                    if (valor != undefined) {                      
                        if ((fields[c] == "Nulo") || (fields[c] == "Llave") || (fields[c] == "Identidad")) {
                            if (valor == 'Si') { valnulo = 1 } else { valnulo = 0; }
                            valores += valnulo + ",";                          
                        }                      
                        else
                            if (fields[c] == "TipoDato")
                            {
                                if (rows[i]['Identidad'] == "Si") { valores += "''int'',"; }
                                else { valores += "''" + valor + "'',"; }
                            }
                            else
                            if ((fields[c] == "Longitud") || (fields[c] == "Decimal"))
                            {
                                if (rows[i]['Identidad']=="Si"){valores += 0 + ",";}
                                else
                                {   
                                    if (valor.toUpperCase() == "MAX") {valores += "''" + valor + "'',";}
                                    else {
                                        if (valor == "") { valor = 0; }                                       
                                            valores += valor + ",";                                            
                                        }                                   
                                }
                            }
                            else
                               if (fields[c] == "Orden") 
                                   {valores += valor + ",";}
                               else {valores += "''" + valor + "'',";}                                                      
                          }
                          else {
                             if (fields[c] == "Movimiento") { valores += "'''',"; }
                               else {valores += "'''',";}
                            }
                     }
              
                valores = valores.substring(0, valores.length - 1);                
                INSERTAR_CAMPOS_CAPTURA(valores, '','','','G');
                valores = "";
                campos = "";
                campo = "";
                condicion = "";
            }                      
            for (var i = 0; i < rows.length; i++) {
                dg.datagrid('beginEdit', i);             
            
                var edIdentidad = dg.datagrid('getEditor', { index: i, field: 'Identidad' });
                var Orden = dg.datagrid('getEditor', { index: i, field: 'Orden' });
                var TipoDato = dg.datagrid('getEditor', { index: i, field: 'TipoDato' });
                var Llave = dg.datagrid('getEditor', { index: i, field: 'Llave' });
                var Nulo = dg.datagrid('getEditor', { index: i, field: 'Nulo' });
                var Longitud = dg.datagrid('getEditor', { index: i, field: 'Longitud' });
                var Decimal = dg.datagrid('getEditor', { index: i, field: 'Decimal' });
                var Default = dg.datagrid('getEditor', { index: i, field: 'Predeterminado' });
                              
                $(TipoDato.target).combobox('setValue', rows[i]['TipoDato']);
                $(Orden.target).textbox('setValue', rows[i]['Orden']);
                $(Longitud.target).textbox('setValue', rows[i]['Longitud']);
                $(Decimal.target).textbox('setValue', rows[i]['Decimal']);
                              
                if (rows[i]['Identidad'] == "Si") {
                    $(edIdentidad.target).prop('checked', true);
                    $(TipoDato.target).combobox('setValue', 'int');
                    $(TipoDato.target).textbox({ disabled: true });
                    $(Longitud.target).textbox({ disabled: true });
                    $(Decimal.target).textbox({ disabled: true });
                    $(Nulo.target).prop('checked', false);
                    $(Nulo.target).prop('disabled', true);                   
                } else {
                    $(edIdentidad.target).prop('checked', false);                   
                    $(Longitud.target).textbox({ disabled: false });
                    $(TipoDato.target).textbox({ disabled: false });
                    $(Longitud.target).textbox({ disabled: false });
                    $(Decimal.target).textbox({ disabled: false });
                    $(Nulo.target).prop('checked', true);
                    $(Nulo.target).prop('disabled', false);                    
                }                              
                if (rows[i]['Nulo'] == "Si") {
                    $(Nulo.target).prop('checked', true);
                    $(Default.target).combobox({ disabled: true });                  
                }
                else {
                    if (rows[i]['Identidad'] == "Si") { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: true }); }
                    else
                    { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: false }); }
                }
                
                $(Orden.target).textbox('textbox').css('textAlign', 'center');
                $(Longitud.target).textbox('textbox').css('textAlign', 'center');
                $(Decimal.target).textbox('textbox').css('textAlign', 'center');
            }

            //var txtnomtbl = $('#txtnumcampos');
            //txtnomtbl.textbox('clear').textbox('textbox').focus();
            //$('#txtnumcampos').textbox('setValue', rows.length);
            $('#loading').hide(100);

            if (error == "0") { $.messager.alert('Información', "Campos Guardado Correctamente", 'info'); tipomov = "M"; }
    }
}
//modificar los campos de la tabla
function MODIFICAR_DISEÑO_TABLA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        var campos = "", columnas = "", valores = "", valor = "", condicion = "";
        var dg = $('#dgtabla');
        var fields = dg.datagrid('getColumnFields', true).concat(dg.datagrid('getColumnFields', false));
        var rows = dg.datagrid('getRows');
        dg.datagrid('acceptChanges');

        for (var i = 0; i < rows.length; i++)
        {
            if (rows[i]['Chk'] == "Si")
            {
                condicion = fields[1] + "=" + rows[i]['Id'];
                campo = rows[i]['Campo'];

                for (var c = 2; c < fields.length; c++) {
                    valor = rows[i][fields[c]];

                    if (valor != undefined) {
                        if ((fields[c] == "Nulo") || (fields[c] == "Llave") || (fields[c] == "Identidad")) {
                            if (valor == 'Si') { valnulo = 1 } else { valnulo = 0; }
                            valores += valnulo + ",";
                            campos += fields[c] + "=" + valnulo + ",";
                        }
                        else
                            if (fields[c] == "Longitud") {
                                if (rows[i]['Identidad'] == "Si") {
                                    valores += 0 + ",";
                                    campos += fields[c] + "=" + 0 + ",";
                                }
                                else {
                                    if (valor.toUpperCase() == "MAX") {
                                        valores += "''" + valor + "'',";
                                        campos += fields[c] + "=''" + valor + "'',";
                                    }
                                    else {
                                        valores += valor + ",";
                                        campos += fields[c] + "=" + valor + ",";
                                    }
                                }
                            }
                            else
                                if (fields[c] == "Decimal") {
                                    if (rows[i]['Identidad'] == "Si") {
                                        valores += 0 + ",";
                                        campos += fields[c] + "=" + 0 + ",";
                                    }
                                    else {
                                        if (valor == "") { valor = 0; }
                                        valores += valor + ",";
                                        campos += fields[c] + "=" + valor + ",";
                                    }
                                }
                                else
                                    if (fields[c] == "Orden") {
                                        valores += valor + ",";
                                        campos += fields[c] + "=" + valor + ",";
                                    }
                                    else {
                                        valores += "''" + valor + "'',";
                                        campos += fields[c] + "=''" + valor + "'',";
                                    }
                    }
                    else {
                        if (fields[c] == "Movimiento") {
                            if (valor == undefined) {                                
                                campos += fields[c] + "=''M'',";
                            }
                            else {                              
                                campos += fields[c] + "=''" + valor + "'',";
                            }
                        } else {
                            valores += "'''',";
                            campos += fields[c] + "='''',";
                        }
                    }
                }
                             
                valores = valores.substring(0, valores.length - 1);                
                campos = campos.substring(0, campos.length - 1);
                if (Agregarfila == "")
                { INSERTAR_CAMPOS_CAPTURA('', campos, campo, condicion,'M'); }
                else { INSERTAR_CAMPOS_CAPTURA(valores, '', '', '','G'); }

                valores = "";
                campos = "";
                campo = "";
                condicion = "";
            }
        }
        if (error == "0") { $.messager.alert('Información', "Campos Guardado Correctamente", 'info'); }
       
        for (var i = 0; i < rows.length; i++) {
            dg.datagrid('beginEdit', i);

            var edIdentidad = dg.datagrid('getEditor', { index: i, field: 'Identidad' });
            var Orden = dg.datagrid('getEditor', { index: i, field: 'Orden' });
            var TipoDato = dg.datagrid('getEditor', { index: i, field: 'TipoDato' });
            var Llave = dg.datagrid('getEditor', { index: i, field: 'Llave' });
            var Nulo = dg.datagrid('getEditor', { index: i, field: 'Nulo' });
            var Longitud = dg.datagrid('getEditor', { index: i, field: 'Longitud' });
            var Decimal = dg.datagrid('getEditor', { index: i, field: 'Decimal' });
            var Default = dg.datagrid('getEditor', { index: i, field: 'Predeterminado' });

            $(TipoDato.target).combobox('setValue', rows[i]['TipoDato']);
            $(Orden.target).textbox('setValue', rows[i]['Orden']);
            $(Longitud.target).textbox('setValue', rows[i]['Longitud']);
            $(Decimal.target).textbox('setValue', rows[i]['Decimal']);

            if (rows[i]['Identidad'] == "Si") {
                $(edIdentidad.target).prop('checked', true);
                $(TipoDato.target).combobox('setValue', 'int');
                $(TipoDato.target).textbox({ disabled: true });
                $(Longitud.target).textbox({ disabled: true });
                $(Decimal.target).textbox({ disabled: true });
                $(Nulo.target).prop('checked', false);
                $(Nulo.target).prop('disabled', true);
            } else {
                $(edIdentidad.target).prop('checked', false);
                $(Longitud.target).textbox({ disabled: false });
                $(TipoDato.target).textbox({ disabled: false });
                $(Longitud.target).textbox({ disabled: false });
                $(Decimal.target).textbox({ disabled: false });
                $(Nulo.target).prop('checked', true);
                $(Nulo.target).prop('disabled', false);
            }
            if (rows[i]['Nulo'] == "Si") {
                $(Nulo.target).prop('checked', true);
                $(Default.target).combobox({ disabled: true });
            }
            else {
                if (rows[i]['Identidad'] == "Si") { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: true }); }
                else
                { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: false }); }
            }

            $(Orden.target).textbox('textbox').css('textAlign', 'center');
            $(Longitud.target).textbox('textbox').css('textAlign', 'center');
            $(Decimal.target).textbox('textbox').css('textAlign', 'center');
        }

        //var txtnomtbl = $('#txtnumcampos');
        //txtnomtbl.textbox('clear').textbox('textbox').focus();
        //$('#txtnumcampos').textbox('setValue', rows.length);
        $('#loading').hide(100);
    }
}
//insertar los valores de los diseños
function INSERTAR_CAMPOS_CAPTURA(strvalores, strcampos, strcampo, strcondicion,strmov) {
    var parametros = {};
    parametros.valores = strvalores;
    parametros.campos = strcampos;
    parametros.tabla = tabla;
    parametros.campo = strcampo;
    parametros.condicion = strcondicion;
    parametros.tipomov = strmov;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_DiseñoTabla',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else { error = "0"; }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c, 'error');
        },
        complete: function () { //$('#loading').hide(100); 
        }
    });
}

function CARGAR_TABLAS_dgtblcreada(dgobj, condicion) {
    $(dgobj).datagrid({
        url: "Listar_Tablas_Creadas.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "65%",
        heigth: "600px",
        onClickRow: function () {
            rows = $(dgobj).datagrid('getSelected');
            if (rows) {
                indice = $(dgobj).datagrid('getRowIndex', rows);
                idtabla = rows.id;
                tabla = rows.tabla;
                $('#btnMCreada').linkbutton({ disabled: false });
                $('#btnECreada').linkbutton({ disabled: false });
            }
        }
    });
}
function MODIFICAR_TABLA_CREADA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').hide();
        $('#dconfiguracion').hide();
        $('#dtblcreada').show();
        tipmod = 'M';
        //CARGAR_TABLAS_dgtblcreada('#dgtblcreada', '');
        CARGAR_CAMPOSBUSQUEDAS('#dgtblcreada', '#cbocamtblcreada', "tabla");
    }
}

//cargar diseño de la tabla
function CARGAR_DISEÑO_TABLA(tabla)
{
    var parametros = {};
    parametros.tabla = tabla;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_Diseño_Tabla",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                var obj = $.parseJSON(data.d);
                $('#btnGDiseñoTbl').linkbutton({ text: 'Modificar', disabled: false });
                $('#btnEliminar').linkbutton({ disabled: false });
                tipomov = "M";
                $('#dgtabla').datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true
                });

                total = $('#dgtabla').datagrid('getData').total;
                var dg = $('#dgtabla');
                for (var i = 0; i < total; i++) {
                    dg.datagrid('beginEdit', i);
                    var Identidad = dg.datagrid('getEditor', { index: i, field: 'Identidad' });
                    var orden = dg.datagrid('getEditor', { index: i, field: 'Orden' });
                    $(orden.target).textbox('textbox').css('textAlign', 'center');
                    var edlongitud = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Longitud' });
                    var edDecimal = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Decimal' });
                    var Default = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Predeterminado' });
                    var Nulo = $('#dgtabla').datagrid('getEditor', { index: i, field: 'Nulo' });
                    var edTipoDato = $('#dgtabla').datagrid('getEditor', { index: i, field: 'TipoDato' });
                    $(edTipoDato.target).combobox('setValue', obj[i].TipoDato);
                    if (obj[i].Nulo == "Si") {
                        $(Nulo.target).prop('checked', true);
                        $(Default.target).combobox({ disabled: true });
                        $(Default.target).combobox('setValue', '');
                    }
                    else { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: false }); }
                    $(Identidad.target).click(function () {
                        var val = $(this).is(':checked');
                        if (val == true) {
                            $(edTipoDato.target).combobox('setValue', 'int');
                            $(Nulo.target).prop('checked', false);
                            $(Nulo.target).prop('disabled', true);
                        }
                        else {
                            $(Nulo.target).prop('checked', true);
                            $(Nulo.target).prop('disabled', false);
                        }
                    })
                    var long
                    if (obj[i].Longitud == 0) { long = ""; } else { long = obj[i].Longitud; }
                    $(edlongitud.target).textbox('setValue', long);
                    $(edlongitud.target).textbox('textbox').css('textAlign', 'center')
                    var dec;
                    if (obj[i].Decimal == 0) { dec = ""; } else { dec = obj[i].Decimal; }
                    $(edDecimal.target).textbox('setValue', dec);
                    $(edDecimal.target).textbox('textbox').css('textAlign', 'center')
                }
                //var txtnomtbl = $('#txtnumcampos');
                //txtnomtbl.textbox('clear').textbox('textbox').focus();
                //$('#txtnumcampos').textbox('setValue', total);
            }
            else { tipomov = "G"; }
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




//function ELIMINAR_TABLACREADA(btnobj)
//{
//    if ($(btnobj).linkbutton('options').disabled) { return false; }
//    else
//    {
//        $.messager.confirm('Confirm', 'Seguro de eliminar la tabla seleccionada', function (r) {
//            if (r) {
//                rows = $('#dgtblcreada').datagrid('getSelected');
//                if (rows) {                    
//                    var rowIndex = $("#dgtblcreada").datagrid("getRowIndex", rows);
//                    ELIMINAR_TABLA(rows.tabla, rowIndex);
//                }              
//            }
//        })
//    }
//}

//function ELIMINAR_TABLA(tabla,fila)
//{
//    var parametros = {};    
//    parametros.strtabla = tabla;    
//    $.ajax({
//        type: "POST",
//        url: "Funciones.aspx/Eliminar_Catalogo",
//        data: JSON.stringify(parametros),
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        beforeSend: function () {
//            $('#loading').show();
//        },
//        success: function (data) {
//            if (data.d[0] == "0") {
//                $.messager.alert('Información', data.d[1], 'info');               
//                $('#dgtblcreada').datagrid('deleteRow', fila);
//            }
//            else {
//                $.messager.alert('Error', data.d[1], 'error');
//            }
//        },
//        error: function (er) {
//            $('#loading').hide();
//            $.messager.alert('Error', er.statusText, 'error');
//        },
//        complete: function () {
//            $('#loading').hide(100);
//        }
//    });
//}

function CARGAR_TABLAS_CREADAS(tabla) {
    tipomov = 'M';
    var parametros = {};
    parametros.idtabla = tabla;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_Diseño_Tabla",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                tipomov = "M"
               
                var obj = jQuery.parseJSON(data.d[1]);

                if (tipmod == "Modificar") { $('#btnGuardar').linkbutton({ disabled: false }); }
               
                $('#dgtabla').datagrid('loadData', { "total": 0, "rows": [] });

                var llaves = "", valor = "", dato = "", Default = "", dato = "", diseño = "", tipo = "", primarria = ""
                var longitud = '', decimal = '', nulo = "", strdefault = "", llave = "";

                for (var r = 0; r < obj.length; r++) {
                    
                    if (valores[3] == 'varchar') {
                        longitud = valores[4]; decimal = valores[5]; strdefault = '';
                    }
                    if (valores[3] == 'numeric') {
                        longitud = valores[4]; decimal = valores[5]; strdefault = '';
                    }
                    if ((valores[3] == 'int') || (valores[3] == 'bit')) {
                        longitud = ''; decimal = ''; strdefault = '';
                    }
                    if (valores[3] == 'bit') { strdefault = valores[7]; }


                    $('#dgtabla').datagrid('insertRow', {
                        index: r,
                        row: {
                            Index: r,
                            Orden: valores[0],
                            Llave: valores[1],
                            Campo: valores[2],
                            Descripcion: valores[8],
                            Longitud: longitud,
                            Decimal: decimal,
                            Nulo: valores[6],
                            Predeterminado: strdefault,
                            Movimiento: "0"
                        }
                    });

                    $('#dgtabla').datagrid('beginEdit', r);
                    var edorden = $('#dgtabla').datagrid('getEditor', { index: r, field: 'Orden' })
                    $(edorden.target).textbox('textbox').css('textAlign', 'center')

                    var edTipoDato = $('#dgtabla').datagrid('getEditor', { index: r, field: 'TipoDato' });
                    $(edTipoDato.target).combobox('setValue', valores[3]);

                    var edlongitud = $('#dgtabla').datagrid('getEditor', { index: r, field: 'Longitud' });
                    $(edlongitud.target).textbox('setValue', valores[4]);
                    $(edlongitud.target).textbox('textbox').css('textAlign', 'center')

                    var edDecimal = $('#dgtabla').datagrid('getEditor', { index: r, field: 'Decimal' });
                    $(edDecimal.target).textbox('setValue', valores[5]);
                    $(edDecimal.target).textbox('textbox').css('textAlign', 'center')

                    var Default = $('#dgtabla').datagrid('getEditor', { index: r, field: 'Default' });

                    var Nulo = $('#dgtabla').datagrid('getEditor', { index: r, field: 'Nulo' });
                    if (valores[6] == "Si") {
                        $(Nulo.target).prop('checked', true);
                        $(Default.target).combobox({ disabled: true });
                        $(Default.target).combobox('setValue', '');
                    }
                    else { $(Nulo.target).prop('checked', false); $(Default.target).combobox({ disabled: false }); $(Default.target).combobox('setValue', valores[7]); }
                }
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
function FILTRAR_GRID_dgtblcreada() {
    var condicion = "";
    var vvalor = $('#txtvaltblcreada').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbocamtblcreada').combobox('getValue');
        var vcondicion = $('#cbocontblcreada').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
    }
    else { condicion = " "; }

    CARGAR_TABLAS_dgtblcreada('#dgtblcreada', condicion);
}
function EDITAR_TABLACREADA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dtblcreada').hide();
        $('#dtblexistente').hide();
        $('#dmenu').hide();
        $('#dmenu').hide();
        $('#dtblcrear').show();
        CARGAR_TABLAS_CREADAS();
    }
}
function REGRESAR_MODIFICAR_TBL()
{
    $('#dmenu').show();
    $('#dtblcreada').hide();
}
function REGRESAR_MODIFICAR_TBL_INICIO() {
    $('#dmenu').show();
    $('#dconfiguracion').hide();
}
function GUARDAR_DISEÑO_TABLA_(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if ($('#txtnomtbl').textbox('getValue') == "") { $.messager.alert('Información', 'Falta el nombre de la tabla', 'info'); return 0; }
        else
        {
            var cont = 0;
            var llaves = "", llavesP = "", valor = "", dato = "", Default = "", dato = "", diseño = "", tipo = "", nulo = "", primarria = "", nulos = "", anterior = "",Historia="";
            var fields = $('#dgtabla').datagrid('getColumnFields', true).concat($('#dgtabla').datagrid('getColumnFields', false));
            var rows = $('#dgtabla').datagrid('getRows');
            $('#dgtabla').datagrid('acceptChanges');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i]['Llave'] == 'Si') {
                    primaria = "Si";
                    llavesP += rows[i]['Nombre'] + ",";
                } else { primaria = ""; }

                if (rows[i]['TipoDato'] == 'varchar') {
                    tipo = rows[i]['TipoDato'] + "/" + rows[i]['Longitud'];
                    dato = rows[i]['TipoDato'] + " (" + rows[i]['Longitud'] + ")";
                }
                if (rows[i]['TipoDato'] == 'numeric') {
                    tipo = rows[i]['TipoDato'] + "/" + rows[i]['Longitud'] + "/" + rows[i]['Decimal'];
                    dato = rows[i]['TipoDato'] + " (" + rows[i]['Longitud'] + "," + rows[i]['Decimal'] + ")";
                }
                if ((rows[i]['TipoDato'] == 'int') || (rows[i]['TipoDato'] == 'bit')) {
                    tipo = rows[i]['TipoDato'] + "//";
                    dato = rows[i]['TipoDato'];
                }
                if (rows[i]['Nulo'] == 'Si') { nulo = "Null"; nulos = "Si/"; } else { nulos = "/"; }

                if (rows[i]['Default'] != undefined) {
                    Default = rows[i]['Default'];
                } else { Default = ''; }

                if (tipmod == "Modificar") {
                    if (rows[i]['Chk'] == "Si")
                    {
                        if (rows[i]['Identidad'] == "Si") { valor += "Actual:" + rows[i]['Nombre'] + "/" + dato + " Identity (1,1)/" + Default + "-Anterior:" + rows[i]['Anterior'] + "|"; }
                        else
                        { valor += "Actual:" + rows[i]['Nombre'] + "/" + dato + "/" + Default + "-Anterior:" + rows[i]['Anterior'] + "|"; }
                    }
                }
                else {
                    if (rows[i]['Identidad'] == "Si") { valor += rows[i]['Nombre'] + "/" + dato + " Identity (1,1)/" + Default + "|";}
                    else
                    { valor += rows[i]['Nombre'] + "/" + dato + "/" + Default + "|";}
                }
                diseño += rows[i]['Orden'] + "/" + primaria + "/" + rows[i]['Identidad'] + "/" + rows[i]['Nombre'] + "/" + tipo + "/" + nulos + "/" + Default + "/" + rows[i]['Descripcion'] + "|";
            }
            llaves = 'llaves:' + llavesP.substring(0, llavesP.length - 1);
            diseño = diseño.substring(0, diseño.length - 1);

            if ($('#chkhistoria').is(":checked") == true) { Historia = "Historia:Si"; } else { Historia = "Historia:"; }

            var campos = "Tabla:" + $('#txtnomtbl').textbox('getValue') + "|" + llaves + "|" + Historia + "|" + valor.substring(0, valor.length - 1);

            INSERTAR_VALORES_TABLA(tipmod, campos, diseño);
        }
    }
}
function MODIFICAR_DISEÑO()
{
    //if (checkedRowsCampos.length == 0) { $.messager.alert('Información', 'Falta seleccionar los campos a modificar', 'info'); }
    //else
    //{
    var cont = 0;
        $('#dgtabla').datagrid('acceptChanges');
        var rows = $('#dgtabla').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            if (rows[i]['Chk'] == "Si") {
                cont += 1;

            }
        }
        if (cont == 0) { $.messager.alert('Información', 'Falta seleccionar los campos a modificar', 'info'); }
    //}
}
function INSERTAR_VALORES_TABLA(tipomov,campo,diseño) {
    var parametros = {};
    parametros.moviento = tipomov,
    parametros.campos = campo,
    parametros.diseño=diseño
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Crear_Tabla',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1")
            { error = "1"; $.messager.alert('Error', data.d[1], 'error'); }
            else {                
                $.messager.alert('Información', data.d[1], 'info');
                $('#dmenu').show();               
                $('#dtblcrear').hide();                
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
function LIMPIAR_DISEÑO_CATALOGO() {
    $('#btnGConfig').linkbutton({ text: 'Guardar' })
    $('#txttitulo').textbox('setValue', '');
    $('#txttitcorto').textbox('setValue', '');
    //$('#cboreg').combobox('setValue', '10');

    $('#chkMayusculas').attr("disabled", false);
    $('#chkMayusculas').attr("checked", false);
    //$('#chkAgregar').attr("disabled", false);
    //$('#chkAgregar').attr("checked", false);
    //$('#chkEliminar').attr("disabled", false);
    //$('#chkEliminar').attr("checked", false);
    //$('#chkModificar').attr("disabled", false);
    //$('#chkModificar').attr("checked", false);
    //$('#chkHistoria').attr("disabled", false);
    //$('#chkHistoria').attr("checked", false);
    //$('#chkReportes').attr("disabled", false);
    //$('#chkReportes').attr("checked", false);
    //$('#chkCarga').attr("checked", false);

    //$('#txtancho').textbox('setValue', '');
    //$('#txtalto').textbox('setValue', '');
}
function LIMPIAR_TABLAS_SISTEMAS() {
    CARGAR_TABLAS('#dgcat', '');
    $('#cbocamcat').combobox('setValue', 'Tabla');
    $('#cboconcat').combobox('setValue', 'like');
    var text = $('#txtvalcat');
    text.textbox('clear').textbox('textbox').focus();
}
function LIMPIAR_TABLA_EXISTENTES()
{
    $('#cbocamtblcreada').combobox('setValue', 'Tabla');
    $('#cbocontblcreada').combobox('setValue', 'like');
    var text = $('#txtvaltblcreada');
    text.textbox('clear').textbox('textbox').focus();
    CARGAR_TABLAS_dgtblcreada('#dgtblcreada', '');
}
function SACAR_GUARDAR_CATALOGO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = "", Mayusculas = "", Agregar = "", Modificar = "", Eliminar = "", Historia = "", Reportes = "", titulo = "", genclave = "",CargaInicial;
        if ($('#txttitulo').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el título del catálogo', 'error'); }
        else
            //if ($('#txtancho').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el ancho de la vista', 'error'); }
            //else
            //    if ($('#txtalto').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el alto de la vista', 'error'); }
            //    else
                {
                   // if ($('#rbogener').is(":checked") == true) { genclave = "1"; } else { genclave = "0"; }
                    if ($('#chkMayusculas').is(":checked") == true) { Mayusculas = "1"; } else { Mayusculas = "0"; }
                    //if ($('#chkAgregar').is(":checked") == true) { Agregar = "1"; } else { Agregar = "0"; }
                    //if ($('#chkModificar').is(":checked") == true) { Modificar = "1"; } else { Modificar = "0"; }
                    //if ($('#chkEliminar').is(":checked") == true) { Eliminar = "1"; } else { Eliminar = "0"; }
                    //if ($('#chkHistoria').is(":checked") == true) { Historia = "1"; } else { Historia = "0"; }
                    //if ($('#chkReportes').is(":checked") == true) { Reportes = "1"; } else { Reportes = "0"; }
                    //if ($('#chkCarga').is(":checked") == true) { CargaInicial = "1"; } else { CargaInicial = "0"; }

                    if ($('#chkMayusculas').is(":checked") == true) {
                        titulo = $('#txttitulo').textbox('getValue').toUpperCase();

                    } else {
                        titulo = $('#txttitulo').textbox('getValue');
                    }

                    //if (tipomov == "G") {
                    valores = "''" + titulo + "''," + Mayusculas + ",''" + tabla + "''";

                    //    valores = "''" + titulo + "''," + genclave + "," + $('#cboreg').combobox('getValue') + "," + Mayusculas + "," +
                    //              Agregar + "," + Modificar + "," + Eliminar + "," + Historia + "," + Reportes + ","+ CargaInicial +","+ $('#txtancho').textbox('getValue') + "," + $('#txtalto').textbox('getValue') + ",''" + tabla + "''";
                    ////}
                    //else {
                    //    valores = "cattitulo=''" + titulo + "'',generarclave=" + genclave + ",catregistros=" + $('#cboreg').combobox('getValue') + ",catdesmayusculas=" + Mayusculas + ",catagregar=" + Agregar +
                    //          ",catmodificar=" + Modificar + ",cateliminar=" + Eliminar + ",cathistoria=" + Historia + ",catreportes=" + Reportes + ",catancho=" + $('#txtancho').textbox('getValue') +
                    //          ",catalto=" + $('#txtalto').textbox('getValue');
                    //}
                    GUARDAR_CATALOGO(tabla, valores);
                }
    }

}
function GUARDAR_CATALOGO(idtabla, valores) {
    var parametros = {};
    parametros.tipomov = "G";
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
