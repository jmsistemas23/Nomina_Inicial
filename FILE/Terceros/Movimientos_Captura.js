var tipomovimiento = "", tipocaptura, valnomina = "", selnomina = "", filtrotercero = "", validar = "", valores = "", filtrodoc = "", cveter = "";
var objdatos = "";
var tabla = "listaterceros";

$(document).ready(function () {
    //$.session.set('idusuario', 1);
    //$.session.set('usuario', 'miguel');

    var tmov = $_GET('tipomov');
    if (tmov != undefined)
    { tipomovimiento = tmov; }

    var tcap = $_GET('tipocap');
    if (tcap != undefined)
    { tipocaptura = tcap; }

    var valnom = $_GET('nomina');
    if (valnom != undefined)
    { valnomina = valnom; }

    var selnom = $_GET('selnomina');
    if (selnom != undefined)
    { selnomina = selnom; }
    
    
    $('#btnInicioMC').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnInicioNC').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnanterior').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnlimpiar').bind('click', function () { LIMPIAR_PERFIL_TERCEROS(); });
    $('#btnRegresarNC').bind('click', function () { REGRESAR_CAPTURA(); });
    $('#btnLimpiarNC').bind('click', function () { LIMPIAR_CAPTURA(); });    
    $('#txtvalorperfil').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_PERFIL_TERCERO($('#cbocamperfil').combobox('getValue'), $('#cboconperfil').combobox('getValue'), $('#txtvalorperfil').textbox('getValue'));
        }
    });
    $('#btnBuscarperfil').bind('click', function () { FILTRO_PERFIL_TERCERO($('#cbocamperfil').combobox('getValue'), $('#cboconperfil').combobox('getValue'), $('#txtvalorperfil').textbox('getValue')); });
    $('#txtvalcap').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_EMPLEADO($('#cbocamcap').combobox('getValue'), $('#cboconcap').combobox('getValue'), $('#txtvalcap').textbox('getValue'));
        }
    });
    $('#txtBvalemp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            WIN_FILTRAR_EMPLEADO($('#cboBcamemp').combobox('getValue'), $('#cboBconemp').combobox('getValue'), $('#txtBvalemp').textbox('getValue'));
        }
    });
    $('#btnBemp').bind('click', function () { WIN_FILTRAR_EMPLEADO($('#cboBcamemp').combobox('getValue'), $('#cboBconemp').combobox('getValue'), $('#txtBvalemp').textbox('getValue')); });
    $('#txtvalcap').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_EMPLEADO($('#cbocamcap').combobox('getValue'), $('#cboconcap').combobox('getValue'), $('#txtvalcap').textbox('getValue'));
        }
    });
    $('#btnBcaptura').bind('click', function () { FILTRAR_EMPLEADO($('#cbocamcap').combobox('getValue'), $('#cboconcap').combobox('getValue'), $('#txtvalcap').textbox('getValue')); });

    
    $('#btnRegresarDoc').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnLimpiarDoc').bind('click', function () { LIMPIAR_LISTAR_DOCUMENTOS(); });
    $('#btnModificarDoc').bind('click', function () { tipomovimiento = "Modificar"; MODIFICAR_LISTAR_DOCUMENTOS('#btnModificarDoc'); });
    $('#btnEliminarDoc').bind('click', function () { tipomovimiento = "Eliminar"; MODIFICAR_LISTAR_DOCUMENTOS('#btnEliminarDoc'); });
    $('#btnRegresarMC').bind('click', function () { REGRESAR_MODIFICAR_DOC(); });
    $('#btnLimpiarMC').bind('click', function () { LIMPIAR_MODIFICAR_DOC(); });
    $('#btnEliminarMC').bind('click', function () {
        GUARDAR_CAPTURA('#btnEliminarMC');
    });

    $('#txtvaldoc').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_DOCUMENTO($('#cbocamdoc').combobox('getValue'), $('#cbocondoc').combobox('getValue'), $('#txtvaldoc').textbox('getValue'));
        }
    });
    $('#btnBdoc').bind('click', function () { FILTRAR_DOCUMENTO($('#cbocamdoc').combobox('getValue'), $('#cbocondoc').combobox('getValue'), $('#txtvaldoc').textbox('getValue')); });

    $('#btnGuardarNC').bind('click', function () { GUARDAR_CAPTURA('#btnGuardarNC'); });

    if (tipomovimiento == "Guardar")
    {
        $('#dperfilesterceros').show();
        $('#dlistadocumentos').hide();
        LISTA_PERFIL_TERCEROS();
    }
    else {
        $('#dperfilesterceros').hide();
        $('#dlistadocumentos').show();
        LISTA_DOCUMENTOS();
    }
});

function LIMPIAR_PERFIL_TERCEROS() {
    $('#txtvalorperfil').textbox('clear').textbox('textbox').focus();
    $('#cboconperfil').combobox('setValue', '=');
    filtrotercero = "";   
    CARGAR_PERFILES_TERCEROS('#dgperfiles', 45, 50);
}

function REGRESAR_CAPTURA() {
    filtrotercero = "";
    $('#btnGCaptura').linkbutton('disable');
    $('#dnuevacaptura').hide();
    $('#dmodificarcaptura').hide();
    $('#dperfilesterceros').show();
    $('#txtvalorperfil').textbox('clear').textbox('textbox').focus();
    CARGAR_PERFILES_TERCEROS('#dgperfiles', 45, 50);
    CARGAR_CAMPOSBUSQUEDA('#dgperfiles', '#cbocamperfil');
}

function LIMPIAR_CAPTURA() {
    $('#txtvalcap').textbox('clear').textbox('textbox').focus();
    $('#cboconcap').combobox('setValue', 'like');
    filtrotercero = "";
    BUSCAR_CAMPOS_CAPTURA(cveter, "''", "''", 'A', 0);
}

function FILTRO_PERFIL_TERCERO(cbocampo, cbcondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { filtrotercero = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    else { filtrotercero = ""; }
    CARGAR_PERFILES_TERCEROS('#dgperfiles', 45, 50);
}

function CARGAR_PERFILES_TERCEROS(dgcontrol, ancho, alto) {
    var con;
    $(dgcontrol).datagrid({
        url: "Listar_Perfiles.aspx?tabla=" + tabla + "&busqueda=" + filtrotercero + "&multi=" + valnomina,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                cveter = rows.cveter;
                document.getElementById('lblNuevacap').innerHTML = "";
                document.getElementById('lblNuevacap').innerHTML = selnomina;               
                document.getElementById('lblPerfilNC').innerHTML = "Tercero: " + rows[fields[0]] + " - " + rows[fields[1]];
                BUSCAR_CAMPOS_CAPTURA(rows.cveter, "''", "''", 'A', 0);
                $('#dperfilesterceros').hide();
                $('#dnuevacaptura').show();
                $('#txtvalcap').textbox('clear').textbox('textbox').focus();
                document.getElementById('lblsubtitulo').innerHTML = tipomovimiento;
            }
        }
    });
}

function CARGAR_CAMPOSBUSDQUEDA(objddl) {
    var parametros = {};
    parametros.strtipo = 'TR';
    parametros.strtipobusqueda = 'empleado';

    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_CamposBusqueda",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'campo',
                textField: 'descripcion',
                editable: false
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

function BUSCAR_CAMPOS_CAPTURA(clave, documento, empleado, tipocaptura, id) {
    var parametros = {};
    parametros.strcveter = clave;
    parametros.strdocumento = documento;
    parametros.strempleado = empleado;
    parametros.tipocaptura = tipocaptura;
    parametros.strid = id;

    $.ajax({
        type: "POST",
        url: "funciones.aspx/Listar_NuevaCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0")
            { $.messager.alert('Error', 'No existe diseño de captura para el perfil', 'error'); }
            else
            {
                var obj = $.parseJSON(data.d[1]);
                objdatos=data.d[1];

                if (tipomovimiento == "Guardar") {
                    $('#pnueva').show();
                    $('#pmodificar').hide();
                    $('#tbemp').show();
                    CREAR_CAPTURA(obj, '#nuevacaptura', '');
                    $('#btnGCaptura').linkbutton('enable');
                }
                else                    
                    if (tipomovimiento == "Modificar") {
                        $('#tbemp').show();
                        $('#pnueva').hide();
                        $('#pmodificar').show();
                        CREAR_CAPTURA(obj, '#nuevacaptura', false);
                        $('#btnEliminarMC').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });

                    }
                    else {
                        $('#pnueva').hide();
                        $('#pmodificar').show();
                        $('#tbemp').hide();
                        CREAR_CAPTURA(obj, '#nuevacaptura', true);
                        $('#btnEliminarMC').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' });
                    }
                     CARGAR_CAMPOSBUSDQUEDA('#cbocamcap');
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

function BUSCAR_CAMPOS_MODIFICARCAPTURA(clave, empleado) {
    var obj = "";
    var parametros = {};
    parametros.strcveter = clave;
    parametros.strempleado = empleado;

    $.ajax({
        type: "POST",
        url: "funciones.aspx/Listar_ModificarCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0")
            { $.messager.alert('Error', 'No existe diseño de captura para el perfil', 'error'); }
            else
            {
                var objmd = $.parseJSON(data.d[1]);

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

function LISTA_PERFIL_TERCEROS() {    
    $('#txtvalorperfil').textbox('clear').textbox('textbox').focus();

    document.getElementById('lblquinperfil').innerHTML = "";
    document.getElementById('lblquinperfil').innerHTML = selnomina;

    CARGAR_PERFILES_TERCEROS('#dgperfiles', 45, 60);
    CARGAR_CAMPOSBUSQUEDA('#dgperfiles', '#cbocamperfil');
}

function CARGAR_CATALOGO(cbobjeto, consulta, valor) {
    var parametros = {};
    parametros.strconsulta = consulta;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/cargarcatalogo",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(cbobjeto).combobox({
                data: obj,
                valueField: 'campo',
                textField: 'descripcion',
                editable: false
            });
            if (valor != "")
            { $(cbobjeto).combobox('setValue', valor); }
            else { $(cbobjeto).combobox('setValue', 'x'); }
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

function CREAR_CAPTURA(objdatos, objdiv, lectura) {
    var ctrl;
    var ctrlbl;
    var valor = '';
    var dato = false;
    var readonly = false;
    var table;

    $(objdiv).empty()
    $(objdiv).append('<table cellpadding="2" id="tabla"></table>');
    table = $(objdiv).children();

    for (var i = 0; i < objdatos.rows.length; i++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td2 = document.createElement('TD');

        var tipoctrl = objdatos.rows[i].tipo;
        var longctrl = objdatos.rows[i].longitud;
        var campo = objdatos.rows[i].campo;
        var valor = objdatos.rows[i].valor;
        var descripcion = objdatos.rows[i].descripcion;

        //if (campo = 'observacionestr') {
        //    longctrl;
        //}

        if (tipomovimiento == "G") {
            if (objdatos.rows[i].lectura == "true") { readonly = true; } else { readonly = false; }
        }
        else { readonly = lectura; }

        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + i }).html(descripcion + ": ");

        if ((tipoctrl == "txt") || (tipoctrl == "tm")|| (tipoctrl == "fec") || (tipoctrl == "num") || (tipoctrl == "cbo"))
        { ctrl = $('<input/>').attr({ type: 'text', id: campo }); }
        if (tipoctrl == "chk")
        { ctrl = $('<input/>').attr({ type: 'checkbox', id: campo }); }

        tr = $(tr).append(
            $(td).append(ctrlbl),
            $(td2).append(ctrl)
           );
        table.append(tr);


        if (tipoctrl == "txt") {
            $('#' + campo).textbox({
                width: longctrl * 10,
                value: valor,
                readonly: readonly,
                //required: true,                        
                validType: 'length[0,' + longctrl  + ']'
            });
            $('#' + campo).textbox('textbox').attr('maxlength', longctrl);
        }
        if (tipoctrl == "tm") {
            $('#' + campo).textbox({
                width: longctrl * 10,
                height: 9 * 10,
                value: valor,
                readonly: readonly,
                multiline: true,
                validType: 'length[0,' + longctrl + ']'
            });
            $('#' + campo).textbox('textbox').attr('maxlength', longctrl);
        }
        if (tipoctrl == "num") {
            if (objdatos.rows[i].valor == "") { valor = 0; }
            $('#' + campo).numberbox({
                width: longctrl * 10,
                value: valor,
                readonly: readonly,
                min: 0,
                precision: 0
            });
        }
        if (tipoctrl == "chk") {
            if (valor == "1") { dato = true; }
            $('#' + campo).attr("checked", dato);
        }
        if (tipoctrl == "fec") {
            $('#' + campo).datebox({
                width: longctrl * 10,
                readonly: readonly,
                formatter: myformatter,
                parser: myparser,
                onSelect: function (date) {
                    var y = date.getFullYear();
                    var m = date.getMonth() + 1;
                    var d = date.getDate();
                    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                }
            });
            $('#' + campo).datebox('setValue', valor);
        }
        if (tipoctrl == "cbo") {
            $('#' + campo).combobox({
                width: longctrl * 10,
                readonly: readonly,
            });
            CARGAR_CATALOGO('#' + campo, objdatos.rows[i].catalogo, valor);
        }
    }
}

//funciones para buscar el empledo
function FILTRAR_EMPLEADO(cbocampo, cbocondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }

        if (cbocondicion == 'like') {
            WIN_CARGAR_DATOS_EMPLEADOS('#dgplaza', 635, 215, condicion);          
        }
        else {
            if (tipomovimiento == 'G')
            { BUSCAR_CAMPOS_CAPTURA(cveter, '', txtvalor, 'A', 0); }
            else { BUSCAR_CAMPOS_MODIFICARCAPTURA(cveter, txtvalor); }
        }
    }
    else {
        WIN_CARGAR_DATOS_EMPLEADOS('#dgplaza', 635, 215, '');       
    }
    CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cboBcamemp');
    windows("#winemp", 660, 630, "Buscar Empleado");
}
function WIN_CARGAR_DATOS_EMPLEADOS(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: "Listar_Datos.aspx?tabla=EmpTercero&busqueda=" + condicion + "&multi=" + valnomina,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "px",
        heigth: alto + "px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                var emp = rows[fields[0]];
                BUSCAR_CAMPOS_CAPTURA(cveter, '', emp, 'A', 0);
                $("#winemp").window('close');                
                $('#btnGuardarNC').linkbutton('enable');
            }
        }
    });
}
function WIN_FILTRAR_EMPLEADO(cbocampo, cbocondicion, txtvalor) {
    var condicion = "";
    if (txtvalor != "") {
        if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'%' + txtvalor + '%\'\''; }
        else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    WIN_CARGAR_DATOS_EMPLEADOS('#dgplaza', 635, 215, condicion);
}

//funcioens para mostrar la lista de documentos
function CARGAR_DOCUMENTOS(dgcontrol, ancho, alto, condicion) {
    $(dgcontrol).datagrid({
        url: "ListarMovimientos.aspx?busqueda=" + condicion + "&multi=" + valnomina,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                document.getElementById('lbldoc').innerHTML = "Documento: " + rows[fields[1]];                
                cveter = rows.cvemovtr;
                cveperfildoc = rows.numdoctr;
                numemptr = rows.numemptr;
                filtrodoc = "numdoctr=''" + rows.numdoctr + "''";
                $('#btnModificarDoc').linkbutton('enable');
                $('#btnEliminarDoc').linkbutton('enable');
            }
        }
    });
    if ($(dgcontrol).datagrid('getData').total == 0)
    { $('#btnEliminar').linkbutton('disable'); $('#btnModificar').linkbutton('disable'); }
}
function LISTA_DOCUMENTOS() {
    $('#dlistadocumentos').show();
    document.getElementById('lblquindoc1').innerHTML = "";
    document.getElementById('lblquindoc1').innerHTML = selnomina;
    document.getElementById('lblquindoc2').innerHTML = "";
    document.getElementById('lblquindoc2').innerHTML = selnomina;
    $('#dmenu').hide();
    $('#dperfilesterceros').hide();
    $('#txtvalorperfil').textbox('clear').textbox('textbox').focus();
    CARGAR_DOCUMENTOS('#dgmovimientos', 70, 500, '');
    CARGAR_CAMPOSBUSQUEDA('#dgmovimientos', '#cbocamdoc');

}
function MODIFICAR_LISTAR_DOCUMENTOS(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else {
        document.getElementById('lblsubtitulo').innerHTML = tipomovimiento;
        if (tipomovimiento == "Eliminar") { $('#btnLModDoc').hide(); } else { $('#btnLModDoc').show(); }
        BUSCAR_CAMPOS_CAPTURA(cveter, cveperfildoc, numemptr, 'MC', 0);
        $('#dlistadocumentos').hide();
        $('#dnuevacaptura').show();
        $('#pmodificar').show();
        $('#pnueva').hide();
    }
}
function REGRESAR_MODIFICAR_DOC() {    
    cveperfildoc = "";
    numemptr = "";
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    $('#dnuevacaptura').hide();
    $('#dlistadocumentos').show();
    $('#pnueva').hide();
    $('#pmodificar').show();
    LISTA_DOCUMENTOS();
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    $('#btnModificarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');
}
function LIMPIAR_MODIFICAR_DOC() {       
    BUSCAR_CAMPOS_CAPTURA(cveter, '', '', 'MC', 0);
}
function LIMPIAR_LISTAR_DOCUMENTOS() {
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    $('#btnModificarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');
    $('#cbocondoc').combobox('setValue', '=');
    cveperfildoc = "";
    CARGAR_CAMPOSBUSQUEDA('#dgmovimientos', '#cbocamdoc');
    LISTA_DOCUMENTOS();
}
function FILTRAR_DOCUMENTO(cbocampo, cbocondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    else { condicion = ""; }

    CARGAR_DOCUMENTOS('#dgmovimientos', 70, 500, condicion);
}


//funciones para guardar
function VALIDAR_CAPTURA() {
    var obj = $.parseJSON(objdatos);
    for (var i = 0; i < obj.rows.length; i++) {
        var dato = document.getElementById(obj.rows[i].campo).value;
        var campo = obj.rows[i].campo;

        if (obj.rows[i].tipo == "cbo") {
            dato = $('#' + campo).combobox('getValue');
        }

        if ((dato == "") || (dato == "x")) {
            validar = "Si";
            $.messager.alert('Error', 'Falta el ' + obj.rows[i].descripcion, 'error');
            valores = "";
            return;
        }
        else {
            //valores += dato + "|";
            valores += campo + ':' + dato + '|';
            validar = "No";
        }
    }
    if (validar == "No") {
        valores = valores.substring(0, valores.length - 1);
    }
}
function GUARDAR_CAPTURA(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else {
        if (tipomovimiento != "Eliminar")
        { VALIDAR_CAPTURA(); } else { validar = "No"; }

        if (validar == "No") {
            var parametros = {};
            parametros.strmov = tipomovimiento;
            parametros.strcveter = cveter;          
            parametros.strvalores = valores;
            parametros.strcondicion = filtrodoc;
            parametros.multi = valnomina;
            $.ajax({
                type: "POST",
                url: "funciones.aspx/GuardarCaptura",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1")
                    { $.messager.alert('Error', data.d[1], 'error'); }
                    else
                    {
                        $.messager.alert('Información', data.d[1], 'info');
                        if (tipomovimiento == "Guardar")
                        { LIMPIAR_CAPTURA();  }
                        else { REGRESAR_MODIFICAR_DOC(); }

                        valores = "";
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

