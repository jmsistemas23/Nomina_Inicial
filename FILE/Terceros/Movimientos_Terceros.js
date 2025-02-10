var tipomovimiento = "", tipocaptura, valnomina = "", selnomina = "", filtrotercero = "", validar = "", valores = "", idter = "", cveter = "";
var objdatos = "";

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

    $('#txtvalter').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_TERCERO($('#cbocamter').combobox('getValue'), $('#selconter').combobox('getValue'), $('#txtvalter').textbox('getValue'));
        }
    });
    $('#btnbuscarter').bind('click', function () { FILTRO_TERCERO($('#cbocamter').combobox('getValue'), $('#selconter').combobox('getValue'), $('#txtvalter').textbox('getValue')); });

    $('#btnInicioTer').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnRegresarMenu').bind('click', function () { document.location = "Cap_Terceros.aspx"; });
    $('#btnLimpiarLista').bind('click', function () { LIMPIAR_LISTA_TERCEROS('#btnLimpiarLista'); });
    $('#btnMovTerceros').bind('click', function () { MOVIMIENTO_TERCEROS('#btnMovTerceros'); });
    $('#btnRegresarTer').bind('click', function () { REGRESAR_TERCEROS('#btnRegresarTer'); });
    
    $('#btnGuardar').bind('click', function () {
        GUARDAR_CAPTURA('#btnGuardar');
    });
    document.getElementById('lblnomquin1').innerHTML = selnomina;
    if (tipocaptura == "B")
    {
        $('#btnLimpiarTer').hide();
        document.getElementById('lblsubtitulo').innerHTML = "Baja Terceros";
        $('#btnMovTerceros').linkbutton({ text: 'Baja Terceros', iconCls: 'icon-cancel' });
    }
    else {
        $('#btnLimpiarTer').show();
        document.getElementById('lblsubtitulo').innerHTML = "Modificar Terceros";
        $('#btnMovTerceros').linkbutton({ text: 'Modificar Terceros', iconCls: 'icon-ok' });
    }

    CARGAR_LISTA_TERCEROS('#dgter', 95, 50);
    CARGAR_CAMPOSBUSQUEDA('#dgter', '#cbocamter');
});

function CARGAR_LISTA_TERCEROS(dgcontrol, ancho, alto) {
    var con;
    if (filtrotercero == null) { con = ""; } else { con = filtrotercero; };
    $(dgcontrol).datagrid({
        url: 'ListarTerceros.aspx?busqueda=' + con,
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
                idter = rows.id;
                $('#btnMovTerceros').linkbutton({ disabled: false });
                $('#txtvalter').textbox('clear').textbox('textbox').focus();
            }
        }
    });
}

function LIMPIAR_LISTA_TERCEROS()
{
    filtrotercero = "";
    $('#txtvalter').textbox('clear').textbox('textbox').focus();
    $('#selconter').combobox('setValue', '=');
    CARGAR_LISTA_TERCEROS('#dgter', 95, 50);
}

function FILTRO_TERCERO(cbocampo, cbcondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { filtrotercero = cbocampo + ' ' + cbcondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { filtrotercero = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
    }
    else { filtrotercero = ""; }
    CARGAR_LISTA_TERCEROS('#dgter', 95, 50);
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

        
        if (objdatos.rows[i].lectura == "true") { readonly = true; } else { readonly = false; }        

        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + i }).html(descripcion + ": ");

        if ((tipoctrl == "txt") || (tipoctrl == "tm") || (tipoctrl == "fec") || (tipoctrl == "num") || (tipoctrl == "cbo"))
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
                validType: 'length[0,' + longctrl + ']'
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

function CREAR_CAPTURA__(objdatos, objdiv, lectura) {
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

        if (campo = 'observacionestr') {
            longctrl;
        }

        if (tipomovimiento == "G") {
            if (objdatos.rows[i].lectura == "true") { readonly = true; } else { readonly = false; }
        }
        else { readonly = lectura; }

        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + i }).html(descripcion + ": ");

        if ((tipoctrl == "txt") || (tipoctrl == "tm") || (tipoctrl == "fec") || (tipoctrl == "num") || (tipoctrl == "cbo")) { ctrl = $('<input/>').attr({ type: 'text', id: campo }); }
        if (tipoctrl == "chk") { ctrl = $('<input/>').attr({ type: 'checkbox', id: campo }); }

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
                validType: 'length[0,' + longctrl + ']'
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
                                    
                $('#tbemp').show();
                CREAR_CAPTURA(obj, '#nuevacaptura', '');               
                $('#btnGuardar').linkbutton('enable');
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

function REGRESAR_TERCEROS(btn)
{
    if ($(btn).linkbutton('options').disabled) { return false; }
    else {
        $('#dListaTerceros').show();
        $('#dnuevacaptura').hide();
        CARGAR_LISTA_TERCEROS('#dgter', 95, 50);
        CARGAR_CAMPOSBUSQUEDA('#dgter', '#cbocamter');
    }
}

function MOVIMIENTO_TERCEROS(btn)
{
    if ($(btn).linkbutton('options').disabled) { return false; }
    else {        
        $('#dListaTerceros').hide();
        $('#dnuevacaptura').show();       
        BUSCAR_CAMPOS_CAPTURA(cveter, "''", "''", tipocaptura, idter);
    }
}

function VALIDAR_CAPTURA() {   
    var obj = $.parseJSON(objdatos);
    for (var i = 0; i < obj.rows.length; i++) {
        var dato = document.getElementById(obj.rows[i].campo).value;
        var campo = obj.rows[i].campo;

        if (obj.rows[i].tipo == "cbo") {
            dato = $('#' + campo).combobox('getValue');
        }

        if (tipocaptura == "C") {
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
        else {
            valores += campo + ':' + dato + '|';
            validar = "No";
        }
    }
    if (validar == "No") {
        valores=valores.substring(0, valores.length - 1);
    }
}
function GUARDAR_CAPTURA(btn) {
    if ($(btn).linkbutton('options').disabled) { return false; }
    else {        
         VALIDAR_CAPTURA(); 

        if (validar == "No") {
            var parametros = {};
            parametros.strmov = tipomovimiento;
            parametros.strcveter = cveter;           
            parametros.strvalores = valores;
            parametros.strcondicion = filtrotercero;
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

                        $('#dListaTerceros').show();
                        $('#dnuevacaptura').hide();
                        CARGAR_LISTA_TERCEROS('#dgter', 95, 50);
                        CARGAR_CAMPOSBUSQUEDA('#dgter', '#cbocamter');
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
