var objformatos = "";
var viewer = null;
var designer = null;
var report = null;
var ruta = "";
var clave = "";
var nombre = "";
var objlstcampos = [];
var listaCampos = {};
var operador = "";
var val = 0;
var filtro = "";
var idgrupo = "";

$(document).ready(function () {   
    $('#btnPagos').hide();
    $('#btnQuincenas').hide();

    $.extend($.fn.tree.methods, {
        unselect: function (jq, target) {
            return jq.each(function () {
                var opts = $(this).tree('options');
                $(target).removeClass('tree-node-selected');
                if (opts.onUnselect) {
                    opts.onUnselect.call(this, $(this).tree('getNode', target));
                }
            });
        },
        removeAll: function (jq) {
            return jq.each(function () {
                var roots = $(this).tree('getRoots');
                for (var i = roots.length - 1; i >= 0; i--) {
                    $(this).tree('remove', roots[i].target);
                }
            })
        }
    });

    LISTAR_FORMATOS();

    $('#lstformatos').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                clave = node.clave;
                nombre = node.text;
                setReport(clave, nombre);
            }
        }
    });

    $('#btnReporteador').bind('click', function () { createDesigner(); });

    $('#btnImprimir').bind('click', function () {
        IMPRIMIR_REPORTE();
    });

    $('#btnVista').bind('click', function () {
        setTimeout(function () {
            viewer.showProcessIndicator();
            viewer.report = report;
        }, 100);
        $('#btnImprimir').linkbutton({ disabled: false });
    });

    $('#btnLimpiar').bind('click', function () {
        clave = ""; nombre = "";
        var t = $('#lstformatos');
        var snode = t.tree('getSelected');
        if (snode != null) {
            t.tree('unselect', snode.target);
        }
        $('#btnVista').linkbutton({ disabled: true });
        $('#btnImprimir').linkbutton({ disabled: true });
        $('#btnFiltro').linkbutton({ disabled: true });
    });

    $('#btnFiltro').bind('click', function () {
        ABRIR_FILTRO();
        $('#btnImprimir').linkbutton({ disabled: false });
    });

    $('#btnPagos').bind('click', function () {
        DATOS_PAGOS();
        windows("#wdatos", 550, 250, 'Datos de Pago');
    });

    $('#btnQuincenas').bind('click', function () {
        DATOS_QUINCENAS();
        windows("#wquincenas", 250, 500, 'Lista de Quincenas');
    });

    $('#btnCancelarFiltro').bind('click', function () {
        $("#wfiltro").window('close');
    });
    $('#btnCancelarDatos').bind('click', function () {
        $("#wdatos").window('close');
    });
    $('#btnCancelarQuincena').bind('click', function () {
        $("#wquincenas").window('close');
    });


    $('#btnY').bind('click', function () {
        operador = "and";
    });

    $('#btnO').bind('click', function () {
        operador = "or";
    });

    $('#tcampos').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                if (node.attributes != "")
                { sessionStorage.setItem('catalogo', "Si"); CARGAR_CATALOGO('#tvalor', node.attributes); FILTRAR_TREE_TXT('#txtvalbuscar', '#tvalor'); }
                else {
                    sessionStorage.setItem('catalogo', "No");
                    $('#tvalor').tree('removeAll');
                }
            }
        }
    });

    $('#dfechapago').datebox({
        onSelect: function (date) {
            if (!date) { return ' '; }
            var y = date.getFullYear();
            var m = date.getMonth() + 3;
            var d = date.getDate();
            var fecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
            $('#dvigencia').datebox('setValue', fecha);
        },
    });

    FILTRAR_TREE_TXT('#txtcampo', '#tcampos');
    FILTRAR_TREE_TXT('#txtvalbuscar', '#tvalor');
    FILTRAR_TREE_TXT('#txtquincenas', '#tquincenas');

    $('#btnAgregar').bind('click', function () { AGREGAR('#btnAgregar'); });
    $('#btnLimpiarFolios').bind('click', function () { LIMPIAR_FILTRO('#btnLimpiarFolios'); });

    $('#btnLimpiarDatos').bind('click', function () { DATOS_PAGOS(); });
    $('#btnLimpiarQuincena').bind('click', function () { $('#txtquincenas').textbox('setValue', ''); FILTRAR_TREE_TXT('#txtquincenas', '#tquincenas'); });

    $('#btnAceptarQuincena').bind('click', function () { ACEPTAR_QUINCENA(); });
    $('#btnAceptarDatos').bind('click', function () { ACEPTAR_DATOS(); });

    $('#btnVistaFiltro').bind('click', function () { VISTA_FILTRO(); });

});


function LISTAR_FORMATOS() {
    var parametros = {};
    parametros.idformatos = '';
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Formatos',
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
            objformatos = jQuery.parseJSON(data.d[1]);

            $('#lstformatos').tree({
                data: obj
            });
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LISTAR_CAMPOS() {
    var parametros = {};
    parametros.idformatos = '';
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Campos',
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

            $('#tcampos').tree({
                data: obj
            });
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_CONDICIONES(tobj) {
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };

    listacampos.name = "=";
    listacampos.text = "Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Like";
    listacampos.text = "Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<>";
    listacampos.text = "Diferente";
    objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "In";
    //listacampos.text = "En Valores";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "OR";
    //listacampos.text = "O";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "And";
    //listacampos.text = "Y";
    //objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = ">";
    listacampos.text = "Mayor Que";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = ">=";
    listacampos.text = "Mayor Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<";
    listacampos.text = "Menor Que";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "<=";
    listacampos.text = "Menor Igual";
    objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "(";
    //listacampos.text = "(";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = ")";
    //listacampos.text = ")";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "+";
    //listacampos.text = "+";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "-";
    //listacampos.text = "-";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "*";
    //listacampos.text = "*";
    //objlstcampos.push(listacampos);

    //listacampos = { name: "", text: "" };
    //listacampos.name = "/";
    //listacampos.text = "/";
    //objlstcampos.push(listacampos);

    $(tobj).tree({
        data: objlstcampos
    });
}

function MOSTRAR_VALORES_GUARDADOS() {
    var parametros = {};
    parametros.idperfil = clave;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/mostrar_valores_guardados',
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
                strmov = "M";
                var objtablas = $.parseJSON(data.d[1]);
                var objcampos = $.parseJSON(data.d[2]);
                filtro = data.d[7];

                if (filtro != "") {
                    $('#btnVistaFiltro').linkbutton('enable');
                    $('#btnImprimirFiltro').linkbutton('enable');
                }
                else {
                    $('#btnVistaFiltro').linkbutton('disabled');
                    $('#btnImprimirFiltro').linkbutton('disabled');
                }
                objtablas = objtablas.sort(function (a, b) { return a.id - b.id });
                objcampos = objcampos.sort(function (a, b) { return a.orden - b.orden });
                CARGAR_LISTA_CAMPOS(objcampos, filtro);
            }
            else { strmov = "G"; sessionStorage.setItem('condicion', ''); }

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_LISTA_CAMPOS(objcampos, filtro) {
    objlstcampos = [];
    if (objcampos.length > 0) {
        for (var p = 0; p < objcampos.length; p++) {
            if (objcampos[p].filtro == "Si") {
                listacampos = { id: "", name: "", text: "", attributes: "" };
                var campo = "";
                if (objcampos[p].alias != "")
                { campo = $.trim(objcampos[p].alias) + '.' + $.trim(objcampos[p].campo); }
                else { camos = objcampos[p].campo; }
                var descripcion = objcampos[p].descripcion;

                listacampos.id = p;
                listacampos.attributes = objcampos[p].query;
                listacampos.name = campo;
                listacampos.text = descripcion;
                objlstcampos.push(listacampos);
            }
        }
        $('#tcampos').tree({
            data: objlstcampos,
            formatter: function (node) {
                return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
            }
        });
        $('#txtfiltro').textbox('setValue', filtro);
    }
    else { $.messager.alert('Advertencia', 'No existen campos para filtrar', 'warning'); return 0; }
}

function CARGAR_CATALOGO(tobj, strcat) {
    var parametros = {};
    parametros.strcat = strcat;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/cargar_catalogo',
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
            $(tobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                }
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
}

function SACAR_VALORES() {
    var filtro = "";
    if (sessionStorage.getItem('catalogo') == "Si") {
        var t = $('#tvalor');
        nvalor = t.tree('getSelected');
        filtro = nvalor.name;
    }
    else { filtro = $('#txtvalbuscar').textbox('getValue'); }

    var t = $('#tcondicion');
    ncondicion = t.tree('getSelected');

    var t = $('#tcampos');
    ncampo = t.tree('getSelected');

    switch (ncondicion.name) {
        case "=":
        case "<>":
        case ">":
        case "<":
        case "<=":
        case ">=":
            filtro = ncampo.name + ncondicion.name + "'" + filtro + "'";
            break;
        case "Like":
            filtro = ncampo.name + ncondicion.name + "'%" + filtro + "%'";
            break;

    }
    return filtro;
}

function VALIDA_SELECCION() {
    var t = $('#tcampos');
    ncampo = t.tree('getSelected');

    if (ncampo == null) { val += 1; $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return val; }
    else { val = 0; }

    var t = $('#tcondicion');
    ncondicion = t.tree('getSelected');

    if (ncondicion == null) { val = +1; $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return val; }
    else { val = 0; }

    if (sessionStorage.getItem('catalogo') == "Si") {
        var t = $('#tvalor');
        nvalor = t.tree('getSelected');
        if (nvalor == null) { val += 1; $.messager.alert('Error', 'Falta seleccionar el valor', 'error'); return val; }
        else { val = 0; }
    }
    else {
        if ($('#txtvalbuscar').textbox('getValue') == "") { val += 1; $.messager.alert('Error', 'Falta escribir el valor', 'error'); return val; }
        else { val = 0; }
    }
    return val;
}

function AGREGAR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        val = VALIDA_SELECCION();
        if (val == 0) {
            if (($('#txtfiltro').textbox('getValue') != "") && (operador == "")) {
                $.messager.alert('Error', 'Falta el operador lógico', 'error'); return 0;
            }
            else {
                if (operador == "")
                { $('#txtfiltro').textbox('setValue', SACAR_VALORES()); }
                else {
                    var query = $('#txtfiltro').textbox('getValue');
                    $('#txtfiltro').textbox('setValue', query + " " + operador + " " + SACAR_VALORES());
                    val = 0;
                    $('#btnVistaFiltro').linkbutton('enable');
                    $('#btnImprimirFiltro').linkbutton('enable');

                    $('#txtcampo').textbox('setValue', '');
                    $('#txtvalbuscar').textbox('setValue', '');
                    $('#tvalor').tree('removeAll');

                    var t = $('#tcampos');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }

                    var t = $('#tcondicion');
                    var node = t.tree('getSelected');
                    if (node != undefined) {
                        t.tree('unselect', node.target);
                    }

                    $('#btnY').linkbutton({ selected: false });
                    $('#btnO').linkbutton({ selected: false });
                }
            }
        }
    }
}

function LIMPIAR_FILTRO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfiltro').textbox('setValue', filtro);
        $('#txtcampo').textbox('setValue', '');
        $('#txtvalbuscar').textbox('setValue', '');
        $('#tvalor').tree('removeAll');

        var t = $('#tcampos');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }

        var t = $('#tcondicion');
        var node = t.tree('getSelected');
        if (node != undefined) {
            t.tree('unselect', node.target);
        }

        $('#btnY').linkbutton({ selected: false });
        $('#btnO').linkbutton({ selected: false });

        $('#btnVistaFiltro').linkbutton({ disabled: true });
        $('#btnImprimirFiltro').linkbutton({ disabled: true });



    }
}

function DATOS_PAGOS() {
    var tipopago = "";
    if (idgrupo == "1") { tipopago = "DP"; }
    if (idgrupo == "2") { tipopago = "CH"; }
    if (idgrupo == "3") { tipopago = "PN"; }

    var parametros = {};
    parametros.tipopago = tipopago;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Datos_Pagos',
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
                var objdatospago = $.parseJSON(data.d[1]);
                var objleyenda = $.parseJSON(data.d[2]);
                $('#txtleyenda').textbox('setValue', objleyenda[0].leyenda);
                $('#dvigenciainicial').datebox('setValue', objdatospago[0].iniqui);
                $('#dvigenciafinal').datebox('setValue', objdatospago[0].finqui);
                $('#dfechapago').datebox('setValue', objleyenda[0].fechapago);
                if (tipopago == "DP") {
                    var date = new Date($("#dfechapago").datebox('getValue'));
                    if (!date) { return ' '; }
                    var y = date.getFullYear();
                    var m = date.getMonth() + 3;
                    var d = date.getDate();
                    var fecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                    $('#dvigencia').datebox('setValue', fecha);
                }
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

function DATOS_QUINCENAS() {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Datos_Quincenas',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                var objquincenas = $.parseJSON(data.d[1]);
                $('#tquincenas').tree({
                    data: objquincenas
                });

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

function ACEPTAR_QUINCENA() {
    var t = $('#tquincenas');
    var nquincena = t.tree('getSelected');
    //report.setVariable('quincena', nquincena.text);
    report.dictionary.variables.getByName("condicion").valueObject = "FIRST COMPANY";

}

function ACEPTAR_DATOS() {
    //var t = $('#tquincenas');
    //var nquincena = t.tree('getSelected');
    ////report.setVariable('quincena', nquincena.text);
}

function VISTA_FILTRO() {
    setTimeout(function () {
        viewer.showProcessIndicator();
        report.loadFile(ruta + "/" + nombre + ".mrt");
        var filtro = $('#txtfiltro').textbox('getValue');
        report._dictionary._variables.getByName("condicion").valueObject = filtro;
        viewer.report = report;
        $("#wfiltro").window('close');
    }, 100);
}

function ABRIR_FILTRO() {
    $('#loading').show();
    CARGAR_CONDICIONES('#tcondicion');
    MOSTRAR_VALORES_GUARDADOS();
    $('#loading').hide(100);
    windows("#wfiltro", 800, 500, 'Filtrar Reporte');
}

function setReport(clave, nombre) {

    var parametros = "";
    var datos = "";
    var historia = "";

    var makesArray = jQuery.grep(objformatos, function (Formatos, i) {
        return Formatos.id == clave;
    });
    if (makesArray.length > 0) {
        ruta = makesArray[0].ruta;
        parametros = makesArray[0].parametros;
        datos = makesArray[0].fechas;
        historia = makesArray[0].quinhist;
        idgrupo = makesArray[0].idgrupo;
    }    

    if (datos == "1")
    { $('#btnPagos').show(); $('#btnPagos').linkbutton({ disabled: false }); }
    if (historia == "1")
    { $('#btnQuincenas').show(); $('#btnQuincenas').linkbutton({ disabled: false }); }

    if (parametros == "1")
    { $('#btnFiltro').linkbutton({ disabled: false }); }
    else
    {
        $('#btnVista').linkbutton({ disabled: false });
    }
}


