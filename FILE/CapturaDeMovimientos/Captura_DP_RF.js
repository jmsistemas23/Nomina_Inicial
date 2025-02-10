var tipmov = "";
var cvemov = "";
var cvedoc = "";
var strcondicion = "";
var strconcat = "";
var strcondoc = "";
var tablaseleccion = "";
var camposeleccion = "";
var tipomovimiento = "";
var bandera = false;
var ancho;
var alto;
var strtipo;
var strtabla = "";
var origencreada = false;
var ban = false;
var banO = false;
var strobjcampos = "";
var campoencontrado = false;
var valnomina = "";
var nominasel = "";
var tipobloqueo = "";
var campobusqueda = "";
var objM = "";
$(document).ready(function () {

    var tipo = $_GET('tipo');
    if (tipo != undefined) { strtipo = tipo; }
    else { strtipo = 'dp'; }

    var tabla = $_GET('btbl');
    if (tabla != undefined) { strtabla = tabla; }
    else { strtabla = 'CatDocdp'; }//'CatDocrf'

    //if (strtipo == 'MC') { document.getElementById('lbltitulo').innerHTML = "PAGOS Y DESCUENTOS DIVERSOS"; campobusqueda = 'numdoc' + strtipo.toLowerCase(); }
    //if (strtipo == 'MP') { document.getElementById('lbltitulo').innerHTML = "MOVIMIENTOS DE PERSONAL"; campobusqueda = 'numdoc' + strtipo.toLowerCase(); }
    if (strtipo == 'DP') { document.getElementById('lbltitulo').innerHTML = "DATOS PERSONALES"; campobusqueda = 'numdoc'; }
    if (strtipo == 'IL') { document.getElementById('lbltitulo').innerHTML = "INCIDENCIAS LABORALES"; campobusqueda = 'numdoc' + strtipo.toLowerCase(); }
    if (strtipo == 'RF') { document.getElementById('lbltitulo').innerHTML = "REFERENCIAS FAMILIARES"; campobusqueda = 'cvedoc'; }



    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    $('#MModificarCap').panel('close');


    //seleccion del nodo en el arbol de movimientos
    $('#lstmod').tree({
        onClick: function (node) {
            if (node.children.length <= 0) {
                cvemov = node.nombre;
                $('#lblnivel').text('Movimiento: (' + node.nombre + ') ' + node.text);               
                NUEVA_CAPTURA('');
            }
        }
    });

    //metodo enter del txtvalor para buscar un documento
    var text = $('#txtmovimiento');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if ($('#cboopciones').combobox('getValue') == "Doc") {
                BUSCAR_MOVIMIENTO($('#txtmovimiento').textbox('getValue'));
            }
            else {
                var valor = $('#txtmovimiento').textbox('getValue')
                if (valor != "") {
                    $('#lstmod').tree('doFilter', valor);
                    $('#lstmod').tree('expandAll');
                }
                else { $('#lstmod').tree('doFilter', ''); $('#lstmod').tree('collapseAll'); }
            }
        }
    });

    $('#txtvaldoc').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_DOC("#dgdoc", "#cbocamdoc", "#cbocondoc", "#txtvaldoc");
        }
    });

    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat"); }
        }
    });

    $('#txtvalemp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FILTRAR_EMPLEADO($("#cbocamemp").combobox('getValue'), $("#cboconemp").combobox('getValue'), $("#txtvalemp").textbox('getValue')); }
        }
    });


    $('#btnNuevaCap').bind('click', function () { cvedoc = ""; CAPTURA_NUEVA('#btnNuevaCap'); });
    $('#btnRListaMov').bind('click', function () { BTN_REGRESAR_MOVIMIENTO(); });

    $('#btnEliModCap').bind('click', function () { MODIFICAR_CAPTURA('#btnEliModCap'); });
    $('#btnRModificarDoc').bind('click', function () { BTN_REGRESAR_DOCUMENTO(); });

    $('#btnRNuevaCap').bind('click', function () { REGRESAR_NUEVA_CAPTURA(); });
    $('#btnRModificarCap').bind('click', function () { REGRESAR_MODIFICAR_CAPTURA(); });

    $('#btnEditarDoc').bind('click', function () { tipmov = "M"; NUEVA_CAPTURA(); });
    $('#btnEliminarDoc').bind('click', function () { BTN_ELIMINAR_DOCUMENTO(); });
    $('#btnLimpiarDoc').bind('click', function () { BTN_LIMPIAR_DOCUMENTO(); });
    $('#btnLModificarCap').bind('click', function () { LIMPIAR_CAPTURA("tblo", "objcamposO", "banO"); });

    $('#btnINuevaCap').bind('click', function () { REGRESAR_INICIO_NUEVA_CAPTURA(); });
    $('#btnIModificarCap').bind('click', function () { REGRESAR_INICIO_MODIFICAR_CAPTURA(); });

    $('#btnBuscarMov').bind('click', function () { BUSCAR_MOVIMIENTO($('#txtmovimiento').textbox('getValue')); });

    $('#btnfiltrarcat').bind('click', function () { FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat", "#" + sessionStorage.getItem('camposeleccion'), "#" + sessionStorage.getItem('campodescripcion'), sessionStorage.getItem('tipoctl')); });
    $('#btnfiltrardoc').bind('click', function () { FILTRO_DOC("#dgdoc", "#cbocamdoc", "#cbocondoc", "#txtvaldoc"); });

    $('#btnGNuevaCap').bind('click', function () { VALORES_CAPTURA(); });
    $('#btnGModificarCap').bind('click', function () { VALORES_CAPTURA(); });

    $('#btnLNuevaCap').bind('click', function () { LIMPIAR_CAPTURA("tblo", "camposO", "banO"); });
    $('#btnNomActual').bind('click', function () { VALOR_NOMINA_ACTUAL('#btnNomActual'); });


});

$(window).load(function () {
    SACAR_NOMINAS();
    // Listar_BloqueosDesbloqueos();
});


function CREAR_BONONES_NOMINAS_CERRADA(objm, obj) {

    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    var tr = document.createElement('TR');
    td = document.createElement('TD');
    td.align = "center";

    btn = $('<a />', {
        type: 'button',
        id: "btnNomCerrada",
        name: "||"
    });

    tr = $(tr).append(
        $(td).append(btn)
    );
    table.append(tr);

    $('#btnNomCerrada').linkbutton({
        iconCls: 'icon_Calendario',
        size: 'large',
        width: 70 + "%",
        iconAlign: 'left',
        toggle: true,
        group: 'gf',
        plain: false,
        text: "Captura Sin Quincena Aperturada",
    }).bind('click', function () {
        nominasel = this.text;
        valnomina = this.name;
    });

    if (objm.length == 0) {
        var btn = $('#btnNomCerrada').linkbutton('select');
        nominasel = btn[0].text;
        valnomina = btn[0].name;
    }

}

function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    var textboton = "", nomboton = "";
    var nomina = "";
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        //if (objm[b].numext == 0) {
            nomina = objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext;
        //}

        btn = $('<a />', {
            type: 'button',
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: nomina
        });

        tr = $(tr).append(
            $(td).append(btn)
        );
        table.append(tr);

        if (objm[b].numext > 0) {
            $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({ disabled: true });
        }

        if (objm.length == 0) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
        }

        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            width: 70 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
        });




    }
}


function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            objM = $.parseJSON(data.d[1]);

            $('#lblnominas').hide();
            $('#dextras').show();
            $('#dextras').empty();
            if ((objM.length >= 1) && (objM[0].numext > 0)) {
                CREAR_BONONES_NOMINAS_CERRADA(objM, obj);
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
            }
            if ((objM.length > 0) && (objM[0].numext == 0)) {
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
            }
            if (objM.length == 0) {
                CREAR_BONONES_NOMINAS_CERRADA(objM, obj);
            }

        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = strtipo;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            //if ((objM.length == 0) && (data.d[0] == "F"))
            //{
            //    $('#btnNuevaCap').linkbutton({ disabled: false });
            //    $('#btnEliModCap').linkbutton({ disabled: false });
            //}
            //else {
            //        $('#btnNuevaCap').linkbutton({ disabled: true });
            //        $('#btnEliModCap').linkbutton({ disabled: true });
            //    }                
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


function CAPTURA_NUEVA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        tipmov = "G";
        var nextra = valnomina.substring(9, 8);
        
        if (nextra == 0) {
           VALIDAR_MULTINOMINA('NC');
        }
        else { $.messager.alert('Información', 'No se puede capturar en nómina Extraordinaria', 'info'); }
    }
}

function MODIFICAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var nextra = valnomina.substring(9, 8);

        if (nextra == 0) {
            VALIDAR_MULTINOMINA('MC');
        }
        else { $.messager.alert('Información', 'No se puede capturar en nómina Extraordinaria', 'info'); }
    }
}



function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $.session.set('valnomina', '');
        document.getElementById('lblquin1').innerHTML = "";
        document.getElementById('lblquin2').innerHTML = "";
        document.getElementById('lblquin1').innerHTML = $.session.get('nominaAct');
        document.getElementById('lblquin2').innerHTML = $.session.get('nominaAct');
    }
}

function DDLLISTACAMPOS(objddl) {
    var parametros = {};
    parametros.strtipo = strtipo;
    parametros.strtipobusqueda = 'empleado';

    $.ajax({
        type: "POST",
        url: "funciones.aspx/LlenarDropList",
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
        complete: function () { $('#loading').hide(100); }
    });
}
function Cargarddl(ddlobj, tabla, cve, des, query, camporelacion, valor) {
    var parametros = {};
    parametros.obj = ddlobj;
    parametros.tabla = tabla;
    parametros.cve = cve;
    parametros.des = des;
    parametros.qry = query;
    parametros.camrel = camporelacion;

    var makesArray = [];
    $.ajax({
        type: "POST",
        url: "funciones.aspx/LlenarCatalogos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#' + ddlobj).combobox({
                data: obj,
                valueField: 'valor',
                textField: 'descripcion',
                editable: false
                //onSelect: function (rec) {
                //    if (rec.valor != "x") {
                //        if (rec.relacion != "") {
                //            var qryrelacion = $('#' + rec.relacion).data("valor");
                //            var valores = qryrelacion.split("|");
                //            var camposfiltro = valores[2].split(",");
                //            var rquery = valores[0];
                //            for (var j = 0; j < camposfiltro.length; j++) {
                //                rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                //            }
                //            Cargarddl(rec.relacion, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion,valor);
                //        }
                //    }
                //},
            });
            //if (ddlobj == "porcret") {
            //    var camño = "";
            //}
            if ((valor != "") && (valor != "0.0000000")) {
                if (obj.length > 1) {
                    makesArray = jQuery.grep(obj, function (product, i) {
                        return product.valor == valor;
                    });
                    if (makesArray.length > 0) {
                        $('#' + ddlobj).combobox("setValue", valor);
                    } else { $('#' + ddlobj).combobox("setValue", "X"); }
                }
            }
            else { $('#' + ddlobj).combobox("setValue", "X"); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.textStatus, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}
function LIMPIAR_TABS() {
    if (origencreada == true) {
        $('#dcorigen').empty();
        $('#tblo').empty();
        if (strtipo == 'DP') { CAMBIAR_TITULO_TAB('Datos del Empleado', 'po'); }
        else { CAMBIAR_TITULO_TAB('Plaza Origen', 'po'); }
        $("#tt").tabs('getTab', 'po').panel('options').tab.hide();
    }
    //if (destinocreada == true) {
    //    $('#dcdestino').empty();
    //    $('#tbld').empty();
    //    CAMBIAR_TITULO_TAB('Plaza Destino', 'pd');
    //    $("#tt").tabs('getTab', 'pd').panel('options').tab.hide();
    //}
    //if (sustitutacreada == true) {
    //    $('#dcsustituta').empty();
    //    $('#tbls').empty();
    //    CAMBIAR_TITULO_TAB('Plaza Sustituta', 'ps');
    //    $("#tt").tabs('getTab', 'ps').panel('options').tab.hide();
    //}
}
function CAMBIAR_TITULO_TAB(tituloorigen, titulonuevo) {
    var tab = $('#tt').tabs('getTab', tituloorigen);
    $('#tt').tabs('update', {
        tab: tab,
        bodyCls: 'noscroll',
        options: {
            title: titulonuevo
        },
    });
}

function CREAR_CAPTURA(obj, objdat, objdiv, objtbl) {
    var ctrl;
    var Ocultar;
    var valor;
    var ctrlbl;
    var tabla = "";
    var titulo = "";
    var sololectura;
    var longctrl;
    var nulo = "";
    var longitud = "";
    var long = "";

    $(objdiv).empty();
    $(objtbl).empty();
    $(objdiv).append('<table cellpadding="2" id="' + objtbl + '"></table>');
    table = $(objdiv).children();

    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');

        //if (obj[i].Campo == 'nivacemp')
        // { sololectura; }

        if (objdat == 0) {
            if (obj[i].valorPredeterminado == "") { valor = ""; }
            else { valor = obj[i].valorPredeterminado; }
        }
        else {
            if (obj[i].valorPredeterminado == "") { valor = objdat[0][obj[i].Campo]; }
            else { valor = obj[i].valorPredeterminado; }
        }

        if (obj[i].ValidaNulos == 1) { nulo = true; }
        else { nulo = false; }

        if (obj[i].ValidaLongitud == 1) { longitud = true; }
        else { longitud = false; }

        if (obj[i].Sololectura == 1) { sololectura = true; }
        else { sololectura = false; }

        if (obj[i].CampoOrigen == true) { Ocultar = "Si"; }
        else { Ocultar = "No"; }

        if (obj[i].Longitud != null) { longctrl = obj[i].Longitud; }
        else { longctrl = 1000; }

        if (obj[i].TipoDato == "r") {
            var arr = obj[i].CatalogoSeleccion.split('|')
            td2 = document.createElement('TD');
            for (var j = 0; j < arr.length; j++) {
                var tipoval = arr[j].split(',');
                var label = tipoval[0];

                //if (Ocultar == "Si")
                //{ ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: tipoval[1] + obj[i].Campo, value: 0 }).addClass("hidden"); }
                //else
                //{
                ctrl = $('<input/>').attr({ type: 'radio', name: obj[i].TipoDato + "-" + obj[i].Campo, id: tipoval[1] + obj[i].Campo, value: 0 });
                //}

                ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                $(td2).append(document.createTextNode(label));
                td2 = $(td2).append(ctrl);
            }
            tr = $(tr).append(
                $(td).append(ctrlbl),
                $(td2)
            );
            table.append(tr);

            for (var c = 0; c < arr.length; c++) {
                var alias = arr[c].split(",");
                if (valor == alias[1]) {
                    $('#' + alias[1] + obj[i].Campo).prop("checked", true);
                    break
                }
                else {
                    $('#' + alias[1] + obj[i].Campo).prop("checked", false);
                }
            }
        }
        else
            if (obj[i].TipoDato == "c") {
                var arr = obj[i].CatalogoSeleccion.split('|')
                td2 = document.createElement('TD');
                for (var j = 0; j < arr.length; j++) {
                    var tipoval = arr[j].split(',');
                    var label = valor[0];

                    ctrl = $('<input/>').attr({ type: 'checkbox', name: obj[i].TipoDato + "-" + obj[i].Campo, value: 0, id: tipoval[1] + obj[i].Campo });
                    ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                    //    $(td).append(ctrlbl),
                    //    td2 = $(td2).append(ctrl);
                    //}
                    //tr = $(tr).append(
                    //          $(td).text(obj[i].Descripcion.trim() + ": "),
                    //          $(td2)
                    //          );
                    //table.append(tr);
                    $(td2).append(document.createTextNode(label));
                    td2 = $(td2).append(ctrl);
                }
                tr = $(tr).append(
                    $(td).append(ctrlbl),
                    $(td2)
                );
                table.append(tr);

                for (var c = 0; c < arr.length; c++) {
                    var alias = arr[c].split(",");
                    if (valor == alias[1]) {
                        $('#' + alias[1] + obj[i].Campo).prop("checked", true);
                        break
                    }
                    else {
                        $('#' + alias[1] + obj[i].Campo).prop("checked", false);
                    }
                }
            }
            else
                if (obj[i].TipoDato == "f") {
                    td2 = document.createElement('TD');
                    //if (Ocultar = "Si")
                    //    { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                    //    else
                    //{
                    ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text");
                    //}

                    ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                    tr = $(tr).append(
                        $(td).append(ctrlbl),
                        $(td2).append(ctrl)
                    );
                    table.append(tr);


                    if (obj[i].TipoDato == "f") {
                        $('#' + obj[i].Campo).datebox({
                            width: obj[i].Tamaño * 10,
                            value: valor,
                            formatter: myformatter,
                            readonly: sololectura,
                            required: nulo,
                            parser: myparser,
                            onSelect: function (date) {
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                var d = date.getDate();
                                return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                            }
                        }).datebox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
                    }
                }
                else
                    if ((obj[i].TipoDato == "t") || (obj[i].TipoDato == "tm") || (obj[i].TipoDato == "n") || (obj[i].TipoDato == "e") || (obj[i].TipoDato == "d")) {
                        td2 = document.createElement('TD');

                        if (Ocultar == "Si") { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                        else { ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text"); }

                        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                        if (obj[i].HabilitarBusqueda == "1") {
                            btn = $('<a />', {
                                type: 'button',
                                text: "Buscar",
                                id: "btn" + obj[i].Campo,
                                name: obj[i].ConsultaBusqueda_BusquedaDirecta + "|" + obj[i].ConsultaBusqueda_Tabla,
                                target: obj[i].ConsultaBusqueda_RelacionCaptura + "@" + obj[i].ConsultaBusqueda_Columnas + "@" + obj[i].Configuracion_CamposCaptura,
                                title: obj[i].Descripcion
                            });

                            tr = $(tr).append(
                                $(td).append(ctrlbl),
                                $(td2).append(ctrl),
                                $(td2).append(btn)
                            );
                        }
                        else {
                            if (Ocultar == "No") {
                                tr = $(tr).append(
                                    $(td).append(ctrlbl),
                                    $(td2).append(ctrl)
                                );
                            }
                            else {
                                tr = $(tr).append(
                                    $(td2).append(ctrl)
                                );
                            }
                        }
                        table.append(tr);

                        //poner boton de busqueda si esta configurado para que se muestre en el campo
                        var campo = "";
                        if (obj[i].HabilitarBusqueda == "1") {
                            $('#btn' + obj[i].Campo).linkbutton({
                                iconCls: 'icon-search',
                                plain: true,
                                text: 'Buscar'
                            }).bind('click', function () {
                                campo = this.id.substring(3, this.id.length);
                                sessionStorage.setItem('ctrl' + objtbl, this.target);
                                sessionStorage.setItem('tipoctl', objtbl);
                                var tabla = this.name.split('|');
                                sessionStorage.setItem('nomcampo', "No");
                                sessionStorage.setItem('camfil', '');
                                DISEÑO_CAT('#dgcat', tabla[1], campo, this.title, '#cbocamcat', objtbl);
                            });
                        }

                        var sololectura = false;
                        if (obj[i].Sololectura == "1") { sololectura = true; }


                        if ((obj[i].TipoDato == "t") && (obj[i].CampoOrigen == false)) {
                            if (obj[i].valorPredeterminado != "") { valor = obj[i].valorPredeterminado; }

                            if (longitud == true) { long = 'length[0,' + longctrl + ']'; }

                            $('#' + obj[i].Campo).textbox({
                                width: obj[i].Tamaño * 10,
                                value: valor,
                                readonly: sololectura,
                                required: nulo,
                                validType: long,
                                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                                    keyup: function (e) {
                                        if (e.keyCode == 13) {
                                            //this.value = e.target.value;
                                            var t = $(e.data.target);
                                            var id = t.attr('id');
                                            if ($('#btn' + id).is(':visible')) {
                                                var btn = $('#btn' + id);
                                                sessionStorage.setItem('ctrl' + objtbl, btn[0].target);
                                                sessionStorage.setItem('tipoctl', objtbl);
                                                var tabla = btn[0].name.split('|');
                                                sessionStorage.setItem('nomcampo', tabla[0]);
                                                sessionStorage.setItem('ctrolval', id);
                                                sessionStorage.setItem('camfil', '');
                                                DISEÑO_CAT('#dgcat', tabla[1], id, btn[0].title, '#cbocamcat', objtbl);
                                            }
                                        }
                                        //  $('#' + obj[i].Campo).textbox('setValue', e.target.value);
                                    }
                                })
                            });
                        }
                        else
                            if ((obj[i].TipoDato == "tm") && (obj[i].CampoOrigen == false)) {

                                if (longitud == true) { long = 'length[0,' + longctrl + ']'; }

                                $('#' + obj[i].Campo).textbox({
                                    width: obj[i].Tamaño * 10,
                                    height: 9 * 10,
                                    value: valor,
                                    readonly: sololectura,
                                    multiline: true,
                                    required: nulo,
                                    validType: long
                                });
                            }
                            else
                                if ((obj[i].TipoDato == "n") && (obj[i].CampoOrigen == false)) {

                                    if (longitud == true) { long = 'length[0,' + longctrl + ']'; }

                                    $('#' + obj[i].Campo).numberbox({
                                        width: obj[i].Tamaño * 10,
                                        value: valor,
                                        readonly: sololectura,
                                        min: 0,
                                        precision: 2,
                                        required: nulo,
                                        validType: long
                                    });
                                }
                                else
                                    if ((obj[i].TipoDato == "e") && (obj[i].CampoOrigen == false)) {

                                        if (longitud == true) { long = 'length[0,' + longctrl + ']'; }

                                        $('#' + obj[i].Campo).numberbox({
                                            width: obj[i].Tamaño * 10,
                                            value: valor,
                                            readonly: sololectura,
                                            //min: 0,
                                            //precision: ,
                                            required: nulo,
                                            validType: long
                                        });
                                    }
                                    else
                                        if ((obj[i].TipoDato == "d") && (obj[i].CampoOrigen == false)) {
                                            $('#' + obj[i].Campo).numberbox({
                                                width: obj[i].Tamaño * 10,
                                                value: valor,
                                                readonly: sololectura,
                                                min: 0,
                                                precision: 2,
                                                required: nulo,
                                                //validType: 'length[0,' + longctrl + ']'
                                            });
                                        }
                    }
                    else
                        if (obj[i].TipoDato == "s") {
                            td2 = document.createElement('TD');

                            //ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text");
                            //ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, title: obj[i].Descripcion + ": " }).addClass("text");
                            if (Ocultar == "Si") { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                            else { ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text"); }

                            ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                            $(ctrl).data("valor", obj[i].CatalogoFiltro + "|" + i + "|" + obj[i].CamposFiltros);
                            tr = $(tr).append(
                                $(td).append(ctrlbl),
                                $(td2).append(ctrl)
                            );
                            table.append(tr);

                            if ((obj[i].TipoDato == "s") && (obj[i].CampoOrigen == false)) {
                                $('#' + obj[i].Campo).combobox({
                                    width: obj[i].Tamaño * 10,
                                    required: nulo,
                                    onSelect: function (rec) {
                                        if (rec.valor.toLowerCase() != "x") {
                                            if (rec.relacion != "") {
                                                var qryrelacion = $('#' + rec.relacion).data("valor");
                                                var valores = qryrelacion.split("|");
                                                var camposfiltro = valores[2].split(",");
                                                var rquery = valores[0];
                                                if (camposfiltro != "") {
                                                    for (var j = 0; j < camposfiltro.length; j++) {
                                                        if (rec.ddlobj == camposfiltro[j]) { rquery = rquery.replace("@" + camposfiltro[j], "'" + rec.valor + "'"); }
                                                        else { rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'"); }
                                                    }
                                                    Cargarddl(rec.relacion, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion, valor);
                                                }
                                                else { $.messager.alert('Error', 'Falta relacionar el campo = ' + rec.ddlobj + ' con el campo a filtrar =' + rec.relacion, 'error'); }
                                            }
                                        }
                                        //else {
                                        //    $('#' + rec.relacion).combobox("setValue", 'x');
                                        //}
                                    },
                                });
                                //if (valor != "") {
                                //    $('#' + obj[i].Campo).combobox("setValue", valor);
                                //}
                                //else {
                                //       $('#' + obj[i].Campo).combobox("setValue", 'x');
                                //}
                            }
                            if (obj[i].CatalogoSeleccion != "") {
                                var n = obj[i].CatalogoFiltro.indexOf("@");
                                if (n == -1) {
                                    Cargarddl(obj[i].Campo, obj[i].CatalogoSeleccion, obj[i].CatalogoValor, obj[i].CatalogoTexto, obj[i].CatalogoFiltro, obj[i].CamposRelacion, valor);
                                    if (valor != "") {
                                        $('#' + obj[i].Campo).combobox("setValue", valor);
                                    }
                                    else {
                                        $('#' + obj[i].Campo).combobox("setValue", 'x');
                                    }

                                }
                                else {
                                    var qryrelacion = $('#' + obj[i].Campo).data("valor");
                                    var valores = qryrelacion.split("|");
                                    var camposfiltro = valores[2].split(",");
                                    var rquery = valores[0];
                                    if (camposfiltro != "") {
                                        for (var j = 0; j < camposfiltro.length; j++) {
                                            rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                                        }
                                        Cargarddl(obj[valores[1]].Campo, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion, valor);
                                        if (valor != "") { $('#' + obj[i].Campo).combobox("setValue", valor); }
                                        else {
                                            $('#' + obj[i].Campo).combobox("setValue", 'x');
                                        }

                                    }
                                    else { $.messager.alert('Error', 'Falta relacionar el campo = ' + rec.ddlobj + ' con el campo a filtrar =' + rec.relacion, 'error'); }
                                }
                            }
                            else { $.messager.alert('Error', 'No se tiene relación del catálogo con el campo= ' + obj[i].Campo, 'error'); }
                        }
                        else
                            if (obj[i].TipoDato == "b") {
                                td2 = document.createElement('TD');

                                if (Ocultar == "Si") { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                                else { ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text"); }

                                ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                                if (obj[i].HabilitarBusqueda == "1") {
                                    btn = $('<a />', {
                                        type: 'button',
                                        text: "Buscar",
                                        id: "btn" + obj[i].Campo,
                                        name: obj[i].ConsultaBusqueda_BusquedaDirecta + "|" + obj[i].ConsultaBusqueda_CamposCaptura_Oculto + "|" + obj[i].ConsultaBusqueda_AliasColumnas,
                                        target: obj[i].ConsultaBusqueda_RelacionCaptura + "@" + obj[i].ConsultaBusqueda_Columnas + "@" + obj[i].Configuracion_CamposCaptura,
                                        title: obj[i].Descripcion
                                    });

                                    tr = $(tr).append(
                                        $(td).append(ctrlbl),
                                        $(td2).append(ctrl),
                                        $(td2).append(btn)
                                    );
                                }
                                else {
                                    if (Ocultar == "No") {
                                        tr = $(tr).append(
                                            $(td).append(ctrlbl),
                                            $(td2).append(ctrl)
                                        );
                                    }
                                    else {
                                        tr = $(tr).append(
                                            $(td2).append(ctrl)
                                        );
                                    }
                                }
                                table.append(tr);

                                var sololectura = false;
                                if (obj[i].Sololectura == "1") { sololectura = true; }

                                //poner boton de busqueda si esta configurado para que se muestre en el campo
                                var campo = "";
                                if (obj[i].HabilitarBusqueda == "1") {
                                    $('#btn' + obj[i].Campo).linkbutton({
                                        iconCls: 'icon-search',
                                        plain: true,
                                        text: 'Buscar'
                                    }).bind('click', function () {
                                        campo = this.id.substring(3, this.id.length);
                                        sessionStorage.setItem('ctrl' + objtbl, this.target);

                                        sessionStorage.setItem('tipoctl', objtbl);
                                        var tabla = this.name.split('|');
                                        sessionStorage.setItem('nomcampo', "No");
                                        camposfiltro = "";
                                        if (tabla[1] != "") {
                                            var valorfiltro = "";

                                            var cont = tabla[1].indexOf("and");
                                            if (cont > -1) {
                                                valorfiltro = tabla[2].split(",");
                                                for (var j = 0; j < valorfiltro.length; j++) {
                                                    campofiltro = tabla[1];
                                                    tabla[1] = campofiltro.replace("@" + valorfiltro[j], "''" + $('#' + valorfiltro[j]).textbox('getValue') + "''");
                                                }

                                                camposfiltro = tabla[1];
                                            }
                                            else {
                                                camposfiltro += tabla[1].replace("@" + tabla[2], "''" + $('#' + tabla[2]).textbox('getValue') + "''");
                                            }

                                        } else { camposfiltro = ""; }
                                        sessionStorage.setItem('camfil', camposfiltro);
                                        DISEÑO_CAT('#dgcat', tabla[0], campo, this.title, '#cbocamcat', objtbl);
                                    });
                                }

                                if (obj[i].CampoOrigen == false) {
                                    if (obj[i].valorPredeterminado != "") { valor = obj[i].valorPredeterminado; }

                                    if (longitud == true) { long = 'length[0,' + longctrl + ']'; }

                                    $('#' + obj[i].Campo).textbox({
                                        width: obj[i].Tamaño * 10,
                                        value: valor,
                                        readonly: sololectura,
                                        required: nulo,
                                        validType: long,
                                        inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                                            keyup: function (e) {
                                                if (e.keyCode == 13) {
                                                    var t = $(e.data.target);
                                                    var id = t.attr('id');
                                                    if ($('#btn' + id).is(':visible')) {
                                                        var btn = $('#btn' + id);
                                                        sessionStorage.setItem('ctrl' + objtbl, btn[0].target);
                                                        sessionStorage.setItem('tipoctl', objtbl);
                                                        var tabla = btn[0].name.split('|');
                                                        sessionStorage.setItem('nomcampo', tabla[0]);
                                                        sessionStorage.setItem('ctrolval', id);
                                                        camposfiltro = "";
                                                        if (tabla[1] != "") {
                                                            var valorfiltro = "";

                                                            var cont = tabla[1].indexOf("and");
                                                            if (cont > -1) {
                                                                valorfiltro = tabla[2].split(",");
                                                                for (var j = 0; j < valorfiltro.length; j++) {
                                                                    campofiltro = tabla[1];
                                                                    tabla[1] = campofiltro.replace("@" + valorfiltro[j], "''" + $('#' + valorfiltro[j]).textbox('getValue') + "''");
                                                                }

                                                                camposfiltro = tabla[1];
                                                            }
                                                            else {
                                                                camposfiltro += tabla[1].replace("@" + tabla[2], "''" + $('#' + tabla[2]).textbox('getValue') + "''");
                                                            }

                                                        } else { camposfiltro = ""; }
                                                        sessionStorage.setItem('camfil', camposfiltro);
                                                        DISEÑO_CAT('#dgcat', tabla[0], id, btn[0].title, '#cbocamcat', objtbl);
                                                    }
                                                }
                                            }
                                        })
                                    });

                                }
                            }
    }

}

function BUSCAR_EMPLEADOS(cbocampo, cbcondicion, txtvalor, strbuscar, strtipcap) {
    var condicion;
    if (txtvalor != "") {
        if (cbcondicion == 'like') { condicion = cbocampo + ' ' + cbcondicion + ' \'\'%' + txtvalor + '%\'\''; }
        else { condicion = cbocampo + ' ' + cbcondicion + ' \'\'' + txtvalor + '\'\''; }
        strcondicion = condicion;
        LISTAR_CAMPOS_ORIGEN('Buscar');
        //if (strtipcap == "O")
        //{ LISTAR_CAMPOS_ORIGEN('Buscar'); }
        //if (strtipcap == "D")
        //{ LISTAR_CAMPOS_DESTINO('Buscar'); }
        //if (strtipcap == "S")
        //{ LISTAR_CAMPOS_SUSTITUTOS('Buscar'); }
    }
    else { $.messager.alert('Información', 'Falta el valor a buscar', 'Info'); }
}

function DISEÑO_DOC(dgcontrol) {
    var parametros = {};
    parametros.strtabla = strtabla;

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConfiguracionGrid",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                if (data.d[1] != "") { ancho = data.d[1]; }
                else { ancho = 100; }

                if (data.d[2] != "") { alto = data.d[2]; }
                else { alto = 100; }

                CARGAR_DOC("#dgdoc", strtabla, ancho, alto);
                CARGAR_CAMPOSBUSQUEDAS('#dgdoc', '#cbocamdoc', campobusqueda);
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
function CARGAR_DOC(dgcontrol, ancho, alto) {
    var con;
    if (strcondoc == null) { con = ""; } else { con = strcondoc; };
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?tabla=' + strtabla + '&busqueda=' + con + '&multi=' + valnomina,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                // var documento = rows[fields[0]];
                cvedoc = rows[fields[0]];
                //getSelections(dgcontrol);
                cvemov = rows[fields[1]];
                $('#btnEditarDoc').linkbutton('enable');
                $('#btnEliminarDoc').linkbutton('enable');
            }
        }
    });
}
function FILTRO_DOC(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var condicion = "";
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            strcondoc = condicion;

        }
        else { strcondoc = ""; }
    }
    else { strcondoc = ""; }
    CARGAR_DOC(dgcontrol, strtabla, 95, 73);
}
function getSelections(dgcontrol) {
    var row = "";
    var rows = $(dgcontrol).datagrid('getSelections');
    for (var i = 0; i < rows.length; i++) {
        row = rows[i] + ",";
    }
    cvedoc = row.substring(0, row.length - 1);
}


function CAMPOS_BUSQUEDA_COLUMNAS(dgobjeto, objcampo, objcolumnas) {
    var Campos = [];
    var obj;
    for (var col = 0; col < objcolumnas.length; col++) {
        obj = {};
        if (objcolumnas[col].Visible == 1) {
            obj["Clave"] = objcolumnas[col].Campo;
            obj["Descripcion"] = objcolumnas[col].Titulo;
            if (col == 0) { obj["selected"] = true; }
            else { obj["Select"] = false; }
            Campos.push(obj);
        }
    }
    $(objcampo).combobox({
        data: Campos,
        valueField: "Clave",
        textField: "Descripcion",
        editable: false
    });
}

function DISEÑO_CAT(dgcontrol, strtabla, strcampo, strdescripcion, objcampo, objtbl) {
    var parametros = {};
    parametros.strtipo = strtipo;
    parametros.strcampo = strcampo;
    parametros.strmov = cvemov;

    var $datagrid = {};
    var columns = new Array();
    var frozen = new Array();

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Diseño_Catalogos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var datos, visible;
            if (data.d[0] != "") {
                var columnas = data.d[0].split('|');
                for (var col = 0; col < columnas.length; col++) {
                    datos = columnas[col].split(',');
                    var valor = datos[0];
                    var titulo = datos[1];
                    var alinear = datos[2];
                    var ancho = datos[3] * 10 + "px";
                    if (datos[4] == 1) { visible = false; }
                    else { visible = true; }
                    var bloqueo = datos[6];

                    if (bloqueo == 0) { columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear, "hidden": visible }); }
                    else { frozen.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear, "hidden": visible }); }
                }
                $datagrid.columns = new Array(columns);
                $datagrid.frozenColumns = new Array(frozen);
                $(dgcontrol).datagrid({ columns: "", url: "" });
                $(dgcontrol).datagrid($datagrid);

                tablaseleccion = strtabla;
                camposeleccion = strcampo;

                //CARGAR_CAMPOSBUSQUEDA("#dgcat", objcampo);
                var objbusqueda = $.parseJSON(data.d[2]);
                CAMPOS_BUSQUEDA_COLUMNAS("#dgcat", objcampo, objbusqueda);

                if (data.d[1] != "") {
                    var opts = $('#cboconcat').combobox('options');
                    $('#cboconcat').combobox('select', data.d[1]);
                }

                var campo = sessionStorage.getItem('nomcampo');
                if (campo != "No") {
                    var control = sessionStorage.getItem('ctrolval');
                    var condicion = campo + "=" + $('#' + control).textbox('getValue');
                    strconcat = condicion;
                    $("#txtvalcat").textbox('setValue', $('#' + control).textbox('getValue'));
                    FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat");
                }
                else {
                    strconcat = '';
                    var control = sessionStorage.getItem('ctrolval');


                    CARGAR_CAT("#dgcat", strtabla, strcampo, objtbl);
                    FOCUS('#txtvalcat', "#dgcat");
                }

                windows("#wincat", 800, 644, false, "Buscar " + strdescripcion);
            }
            else { $.messager.alert('Error', 'Se requiere configurar la busqueda', 'error'); }
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
// Definir variables globales para registrar información de paginación
var oPage = {
    pageIndex: 1,
    pageSize: 20
};

function CARGAR_CAT(dgcontrol, strtabla, strcampo, objtbl) {
    var con = "";
    if (strconcat != null) { con = strconcat; } else { con = ""; }
    var camfiltro = sessionStorage.getItem('camfil');


    $(dgcontrol).datagrid({
        url: "Listar_Catalogo.aspx?tipo=" + strtipo + "&campo=" + strcampo + "&mov=" + cvemov + "&busqueda=" + con + "&camfiltro=" + camfiltro,
        pagination: true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        pageNumber: 1,
        //width: anchotabla + "%",
        heigth: altotabla + "%",
        doPagination: function (pPageIndex, pPageSize) {
            // Cambia el valor del parámetro de oPage, que se usa para la siguiente consulta
            oPage.pageIndex = pPageIndex;
            oPage.pageSize = pPageSize;
            Exec_Wait(dgcontrol, 'loadDateGrid(' + dgcontrol + ')');
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                ban = false;
                var objcampos = $.parseJSON(strobjcampos);
                BUSCAR_CAMPO(objcampos, objtbl);
            }
        }
    });

}

/**
  * Encapsular un método común
  * @param {Object} ID de tabla de cuadrícula
  * @param {Object} func Obtenga datos asincrónicos
  * @param {Object} time Tiempo de ejecución de retraso
 */
function Exec_Wait(grid, func, time) {
    var dalayTime = 500;
    __func_ = func;
    __selector_ = '#' + grid;
    $(__selector_).datagrid("loading");
    if (time) {
        dalayTime = time;
    }
    gTimeout = window.setTimeout(_Exec_Wait_, dalayTime);
}
function loadDateGrid(dgcontrol) {
    // Definir condiciones de consulta
    var queryCondition = { name: "Luz del siglo" };
    // Obtenga datos asincrónicamente al objeto javascript, ingrese parámetros como condiciones de consulta e información de número de página
    var oData = getAjaxDate("orderManageBuz", "qryWorkOrderPaged", queryCondition, oPage);
    // Usa el método loadDate para cargar los datos devueltos por la capa Dao
    $(dgcontrol).datagrid('loadData', { "total": oData.page.recordCount, "rows": oData.data });
}

function FILTRAR_CAT(dgobjeto, txtvalor, cbcampos, cbocon) {
    var condicion = "";
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbcampos).combobox('getValue');
        var vcondicion = $(cbocon).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            strconcat = condicion;
        }
        else { strconcat = ""; }
    }
    else { strconcat = ""; }
    CARGAR_CAT(dgobjeto, tablaseleccion, camposeleccion, sessionStorage.getItem('tipoctl'));
}


function SACAR_DATOS_BUSQUEDA(registro, objtbl) {

    var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
    var configuracion = datos[2].split("|");

    var objcampos = $.parseJSON(strobjcampos);

    for (var i = 0; i < configuracion.length; i++) {
        var valor = "";
        var control = configuracion[i].split('/');
        var valores = control[1].split(',');
        var tipodato = valores[0];
        var campos = valores[1].split('-');

        valor = registro[control[0]];

        for (var j = 0; j < campos.length; j++) {

            //if (campos[j] == 'maestria')
            //{ var v = campos[j]; }


            var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                return ocampos.Campo == campos[j];
            });

            if (tipodato == "b") {
                if (makesArray[0].CampoOrigen) { document.getElementById(campos[j]).setAttribute('value', valor); }
                else { $('#' + campos[j]).textbox('setValue', valor); }
            }
            else
                if (tipodato == "t") {
                    if (makesArray[0].CampoOrigen) { document.getElementById(campos[j]).setAttribute('value', valor); }
                    else { $('#' + campos[j]).textbox('setValue', valor); }
                }
            if ((tipodato == "e") || (tipodato == "n")) {
                if (makesArray[0].CampoOrigen) { document.getElementById(campos[j]).setAttribute('value', valor); }
                else { $('#' + campos[j]).numberbox('setValue', valor); }
            }

            if ((tipodato == "r") || (tipodato == "c")) {
                //if (makesArray[0].CampoOrigen)
                //{ document.getElementById(campos[j]).setAttribute('value', valor); }
                //else
                //{
                var ctrol = makesArray[0].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");
                    if (valor == alias[1]) { $('#' + alias[1] + campos[j]).prop("checked", true); break }
                    else { $('#' + alias[1] + campos[j]).prop("checked", false); }
                }
                //}
            }
            if (tipodato == "f") {
                if (makesArray[0].CampoOrigen) { document.getElementById(campos[j]).setAttribute('value', valor); }
                else {
                    $('#' + campos[j]).datebox('setValue', valor);
                }
            }
            if (tipodato == "s") {
                CARGAR_COMBOBOX(objcampos, campos[j], valor);
            }
        }
    }
}

function CARGAR_COMBOBOX(objcampos, campo, valor) {
    var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
        return ocampos.Campo == campo;
    });
    if (makesArray.length > 0) {
        if (!makesArray[0].CampoOrigen) {
            var n = makesArray[0].CatalogoFiltro.indexOf("@");
            if (n == -1) {
                Cargarddl(makesArray[0].Campo, makesArray[0].CatalogoSeleccion, makesArray[0].CatalogoValor, makesArray[0].CatalogoTexto, makesArray[0].CatalogoFiltro, makesArray[0].CamposRelacion, valor);
            }
            else {
                var qryrelacion = $('#' + makesArray[0].Campo).data("valor");
                var valores = qryrelacion.split("|");
                var camposfiltro = valores[2].split(",");
                var rquery = valores[0];
                if (camposfiltro != "") {
                    for (var j = 0; j < camposfiltro.length; j++) {
                        var strcampo = camposfiltro[j];
                        var strvalor = $('#' + strcampo).combobox('getValue');
                        rquery = rquery.replace("@" + strcampo, "'" + strvalor + "'");
                    }
                    Cargarddl(makesArray[0].Campo, makesArray[0].CatalogoSeleccion, makesArray[0].CatalogoValor, makesArray[0].CatalogoTexto, rquery, makesArray[0].CamposRelacion, valor);
                }
            }
            //if (makesArray[0].Campo == "porcretmp")
            //{
            //    var campo = "";
            //}
            if (valor != "") { $('#' + makesArray[0].Campo).combobox("setValue", valor); }
            else { $('#' + makesArray[0].Campo).combobox("setValue", "X"); }
        }
        else {
            document.getElementById(makesArray[0].Campo).setAttribute('value', valor);
        }
    }
}

function BUSCAR_CAMPO(objcampos, objtbl) {
    var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
    if (datos[0] != "") {
        var control = datos[0].split("|");
        var columnas = datos[1].split(',');
        for (var i = 0; i < control.length; i++) {
            var valores = control[i].split(',');

            if (valores[0].Campo == "edoemp") {
                var campo = "";
            }

            if (valores[0] == "r") {
                var val = valores[1].split('-');
                var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                    return ocampos.Campo == val[0];
                });
                var ctrol = makesArray[0].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var valor = ctrol[c].split(",");
                    if (document.getElementById(valor[1] + val[0]) == null) {
                        ban = true;
                        $.messager.alert('Error', ' El campo ' + valores[1] + ' no existe', 'error');
                    }
                }
            }
            else {
                var campos = valores[1].split('-');
                for (var j = 0; j < campos.length; j++) {
                    if (document.getElementById(campos[j]) == null) {
                        ban = true;
                        $.messager.alert('Error', ' El campo ' + campos + ' no existe', 'error');
                    }
                }
            }
        }
        if (ban == false) {
            SACAR_DATOS_BUSQUEDA(rows, objtbl);
            $("#wincat").window('close');
            sessionStorage.setItem('nomcampo', "No");
        }
    }
    else { ban = false; $.messager.alert('Error', 'Falta la relación de los campos/consulta', 'error'); }
}



function BUSCAR_MOVIMIENTO(txtdoc) {
    if (txtdoc != '') {
        var parametros = {};
        parametros.modulo = strtipo;
        parametros.movimiento = txtdoc;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/BuscarMovimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "0") {
                    sessionStorage.setItem('desmov', data.d[1]);
                    cvemov = data.d[0];
                    $('#lblnivel').text('Movimiento: (' + data.d[0] + ') ' + data.d[1]);
                    cvedoc = '';
                    NUEVA_CAPTURA();

                }
                else {
                    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
                    $.messager.alert('Error', data.d[1], 'error');
                }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function () { $('#loading').hide(100); }
        });
    }
    else { $.messager.alert('Advertencia', "Falta el documento a buscar", 'warning'); }
}
function CARGAR_MOVIMIENTOS() {
    var parametros = {};

    parametros.strtipo = strtipo;
    parametros.strclave = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_MovimientosPermisos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                var obj = $.parseJSON(data.d[1]);
                $('#lstmod').tree({
                    data: obj,
                    formatter: function (node) {
                        return '<span title=\'' + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                    },
                });
                $('#lstmod').tree('collapseAll');
            }
            else { $.messager.alert('Error', "No se tiene permisos del módulo " + document.getElementById('lbltitulo').innerHTML, 'error'); BTN_REGRESAR_MOVIMIENTO(); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function BTN_NUEVO_MOVIMIENTO() {
    tipomovimiento = "Nuevo";
    $('#dlistamov').show();
    $('#dmenu').hide();
    $('#cboopciones').combobox('setValue', 'Des');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();

    //var nomina = "";   
    //nomina = $.session.get('nomina'); 

    document.getElementById('lblquin1').innerHTML = "";
    document.getElementById('lblquin2').innerHTML = "";
    document.getElementById('lblquin1').innerHTML = nominasel;
    document.getElementById('lblquin2').innerHTML = nominasel;
    CARGAR_MOVIMIENTOS();
}
function BTN_REGRESAR_MOVIMIENTO() {
    $('#dlistamov').hide();
    $('#dmenu').show();
    $('#cboopciones').combobox('setValue', 'Des');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    $('#lstmod').tree('doFilter', '');
    $('#lstmod').tree('collapseAll');
    nominasel = '';
    valnomina = '';
    SACAR_NOMINAS();
}

function BTN_MODIFICAR_DOCUMENTO() {
    tipomovimiento = "Modificar";
    var nomina = "";
    //if ($('#btnNomActual').linkbutton('options').selected) { nomina = $.session.get('nominaAct'); }
    //else { nomina = $.session.get('nomina'); }

    document.getElementById('lblquin3').innerHTML = "";
    document.getElementById('lblquin4').innerHTML = "";
    document.getElementById('lblquin3').innerHTML = nominasel;
    document.getElementById('lblquin4').innerHTML = nomina;
    $('#dmenu').hide();
    $('#dmoddoc').show();
    $('#txtvaldoc').textbox('setValue', '');
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    strcondoc = "";
    DISEÑO_DOC("#dgdoc");
    FOCUS('#txtvaldoc', "#dgcat");
    $('#btnEditarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');
}
function BTN_REGRESAR_DOCUMENTO() {
    $('#dmenu').show();
    $('#dmoddoc').hide();
    $('#cboopciones').combobox('setValue', 'Des');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    nominasel = '';
    valnomina = '';
    SACAR_NOMINAS();
}

function REGRESAR_NUEVA_CAPTURA() {
    $('#dlistamov').show();
    $('#dcaptura').hide();
    $('#txtmovimiento').textbox('setValue', '');
    $('#cboopciones').combobox('setValue', 'Des');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    $('#lstmod').tree('doFilter', '');
    $('#lstmod').tree('collapseAll');
    document.getElementById('lblnivel').innerHTML = "";
    LIMPIAR_TABS();
    cvemov = "";
}
function REGRESAR_MODIFICAR_CAPTURA() {
    $('#dmoddoc').show();
    $('#dcaptura').hide();
    document.getElementById('lblnivel').innerHTML = "";
    LIMPIAR_TABS();
    cvemov = "";
    $('#dgdoc').datagrid('reload');
    $('#btnEditarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');
    $('#cboopciones').combobox('setValue', 'Des');

}

function REGRESAR_INICIO_NUEVA_CAPTURA() {
    document.getElementById('lblnivel').innerHTML = ""
    $('#txtmovimiento').textbox('setValue', '');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    $('#txtfiltrar').textbox('setValue', '');
    $('#dlistamov').hide();
    $('#dcaptura').hide();
    $('#dmenu').show();
    
    LIMPIAR_TABS();
    cvemov = "";
    SACAR_NOMINAS();
}
function REGRESAR_INICIO_MODIFICAR_CAPTURA() {
    document.getElementById('lblnivel').innerHTML = ""
    $('#dcaptura').hide();
    $('#dlistamov').hide();
    $('#dmenu').show();
    $("#dgdoc").datagrid('unselectAll');
    LIMPIAR_TABS();
    cvemov = "";
    SACAR_NOMINAS();
}

function BTN_ELIMINAR_DOCUMENTO() {
    $.messager.confirm('Confirm', 'Seguro de eliminar el documento ' + sessionStorage.getItem('cvedoc'), function (r) {
        if (r) {
            ELIMINAR_DOCUMENTO(cvedoc);
        }
        else {
            $("#dgdoc").datagrid('unselectAll');
            $('#btnEditarDoc').linkbutton('disable');
            $('#btnEliminarDoc').linkbutton('disable');
        }
    });
}

function ELIMINAR_DOCUMENTO(valor) {
    var parametros = {};
    parametros.strmodulo = strtipo;
    parametros.strdocumento = valor;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Eliminardocumento",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d == "0") {
                $("#dgdoc").datagrid('reload');
                $('#btnEditarDoc').linkbutton('disable');
                $('#btnEliminarDoc').linkbutton('disable');
            }
            else {
                $.messager.show({ title: 'Error', msg: result.msg });
            }
        }
    });
}

function BTN_LIMPIAR_DOCUMENTO() {
    strcondoc = null;
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    $('#cbocondoc').combobox('setValue', 'like');
    sessionStorage.setItem('condicion', '');
    CARGAR_DOC("#dgdoc", strtabla, ancho, alto);
    CARGAR_CAMPOSBUSQUEDAS('#dgdoc', '#cbocamdoc', 'numdoc' + strtipo);

}


function NUEVA_CAPTURA() {
    var parametros = {};
    parametros.modulo = strtipo;
    parametros.movimiento = cvemov;
    parametros.documento = cvedoc;
    parametros.multi = valnomina;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CamposNuevaCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                $.messager.alert('Error', data.d[1], 'error');
            }
            else {
                if (tipmov == 'G') {
                    $('#dlistamov').hide();
                    $('#MModificarCap').panel('close');
                    $('#MNuevaCap').panel('open');
                }
                else {
                    document.getElementById('lblnivel2').innerHTML = "Documento = " + cvemov;
                    $('#dmoddoc').hide();
                    $('#MModificarCap').panel('open');
                    $('#MNuevaCap').panel('close');
                }
                $('#dcaptura').show();

                strobjcampos = data.d[1];
                var objdatos = "";
                var obj = $.parseJSON(data.d[1]);
                if (obj.length > 0) {
                    DDLLISTACAMPOS('#cboCampoO');
                    if (cvemov != "") { sessionStorage.setItem('ctrltblo', obj); }
                    CREAR_CAPTURA(obj, objdatos, '#dcorigen', 'tblo');
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

function LISTAR_CAMPOS_ORIGEN(strbuscar) {
    var parametros = {};
    parametros.modulo = strtipo;
    parametros.movimiento = cvemov;
    parametros.condicion = sessionStorage.getItem('condicion');
    parametros.tipocaptura = "O";
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CamposCapturaFiltros",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
            else {
                var objcamposOrigen = $.parseJSON(data.d[1]);
                var objdatos = $.parseJSON(data.d[2]);

                if (objcamposOrigen.length > 0) {
                    if (strbuscar == "") {
                        $("#tt").tabs('getTab', 'po').panel('options').tab.show();
                        if (strtipo == 'DP') {
                            CAMBIAR_TITULO_TAB('po', 'Datos del Empleado');
                        }
                        else { CAMBIAR_TITULO_TAB('po', 'Plaza Origen'); }
                        DDLLISTACAMPOS('#cboCampoO');
                    }
                    CREAR_CAPTURA(objcamposOrigen, objdatos, '#dcorigen', 'tblo');
                }
                else { $("#tt").tabs('getTab', 'po').panel('options').tab.hide(); }
                return true;

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
function LISTAR_CAMPOS_DESTINO(strbuscar) {
    var parametros = {};
    parametros.modulo = strtipo;
    parametros.movimiento = cvemov;
    parametros.condicion = sessionStorage.getItem('condicion');
    parametros.tipocaptura = "D";

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CamposCapturaFiltros",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
            else {
                var objcamposDestino = $.parseJSON(data.d[1]);
                var objdatos = $.parseJSON(data.d[2]);

                if (objcamposDestino.length > 0) {
                    if (strbuscar == "") {
                        $("#tt").tabs('getTab', 'pd').panel('options').tab.show();
                        CAMBIAR_TITULO_TAB('pd', 'Plaza Destino');
                        DDLLISTACAMPOS('#cboCampoD');
                    }
                    CREAR_CAPTURA(objcamposDestino, objdatos, '#dcdestino', 'tbld');
                }
                else { $("#tt").tabs('getTab', 'pd').panel('options').tab.hide(); }
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
function LISTAR_CAMPOS_SUSTITUTOS(strbuscar) {
    var parametros = {};
    parametros.modulo = strtipo;
    parametros.movimiento = cvemov
    parametros.condicion = sessionStorage.getItem('condicion');
    parametros.tipocaptura = "S";

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CamposCapturaFiltros",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
            else {
                var objcamposSust = $.parseJSON(data.d[1]);
                var objdatos = $.parseJSON(data.d[2]);

                if (objcamposSust.length > 0) {
                    if (strbuscar == '') {
                        $("#tt").tabs('getTab', 'ps').panel('options').tab.show();
                        CAMBIAR_TITULO_TAB('ps', 'Plaza Sustituta');
                        DDLLISTACAMPOS('#cboCampoS');
                    }
                    CREAR_CAPTURA(objcamposSust, objdatos, '#dcsustituta', 'tbls');
                }
                else { $("#tt").tabs('getTab', 'ps').panel('options').tab.hide(); }
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

function SACAR_VALORES(objtbl, strcampos) {
    var valores = '';
    var valor = "";
    var cont = 0;

    //if (objtbl == 'tblo')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
    //if (objtbl == 'tbld')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposD')); }
    //if (objtbl == 'tbls')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposS')); }
    var objcampos = $.parseJSON(strobjcampos);

    $("#" + objtbl + " td input").each(function () {
        var campo = $(this).attr('name');
        if (campo != undefined) {
            var tipodato = campo.split('-');
            campo = tipodato[1];

            //if (campo == 'munnaemp')
            //{ v = campo; }

            var oculto = document.getElementById(campo);

            if ((tipodato[0] == "c") || (tipodato[0] == "r")) {
                var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                    return ocampos.Campo == campo;
                });
                var ctrol = makesArray[0].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");

                    var val = $('#' + alias[0] + campo).is(":checked");
                    if (val == true) {
                        valores += campo + ':' + "1" + '|';
                        campoencontrado == true;
                    }
                }
            }
            else
                if (tipodato[0] == 'tm') {
                    if (oculto.className == 'hidden') { valor = oculto.value; }
                    else { valor = $('#' + campo).textbox('getValue'); }
                    valores += campo + ':' + valor + '|';
                }
                else
                    if (tipodato[0] == 't') {
                        //if (campo == 'cvead0mp')
                        //{
                        //    //alert(campo);
                        //    var s = "";
                        //}
                        if (oculto.className == 'hidden') { valor = oculto.value; }
                        else { valor = $('#' + campo).textbox('getValue'); }
                        valores += campo + ':' + valor + '|';
                    }
                    else
                        if (tipodato[0] == 's') {
                            if (oculto.className == 'hidden') { valor = oculto.value; }
                            else { valor = $('#' + campo).combobox('getValue'); }
                            valores += campo + ':' + valor + '|';
                        }
                        else
                            if (tipodato[0] == 'n') {
                                if (oculto.className == 'hidden') { valor = oculto.value; }
                                else { valor = $('#' + campo).numberbox('getValue'); }
                                valores += campo + ':' + valor + '|';
                            }
                            else
                                if (tipodato[0] == 'f') {
                                    if ($('#' + campo).datebox('getText') == "") {
                                        valor = $('#' + campo).datebox('getText');
                                    }
                                    else { valor = $('#' + campo).datebox('getValue'); }
                                    valores += campo + ':' + valor + '|';
                                }
            cont++;
        }
    });
    //var campos = sessionStorage.getItem('campos');
    //if (campos != "")
    //{ valores = campos + "^" + valores; }

    sessionStorage.setItem(strcampos, valores.substring(0, valores.length - 1));
}

function SACAR_CAPTURA(objtbl, strcampos) {
    var valores = '';
    var objcampos = "";
    var valor = "";

    //if (objtbl == 'tblo')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
    //if (objtbl == 'tbld')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposD')); }
    //if (objtbl == 'tbls')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposS')); }

    var objcampos = $.parseJSON(strobjcampos);

    if (sessionStorage.getItem('ctrl' + objtbl) != null) {
        //var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
        //var controles = datos[0].split("|");        
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;

            //if (campos == "importmc")
            //{ var v = campos; }

            var oculto = document.getElementById(campos);
            var nulo = objcampos[i].ValidaNulos;

            if ((tipodato == "e") || (tipodato == "n")) {
                if (oculto.className == 'hidden') { valor = oculto.value; }
                else { valor = $('#' + campos).numberbox('getValue'); }
            }

            if ((tipodato == "t") || (tipodato == "tm") || (tipodato == "b")) {
                if (oculto.className == 'hidden') { valor = oculto.value; }
                else { valor = $('#' + campos).textbox('getValue'); }
            }

            if ((tipodato == "r") || (tipodato == "c")) {
                //if (oculto.className == 'hidden')
                //{ valor = oculto.value; }
                //else
                //{
                var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");
                    var val = $('#' + alias[1] + campos).is(":checked");

                    if (val == true) { valor = alias[1]; break; }
                    else if (val == false) { valor = ""; }
                }
                //}
            }
            if (tipodato == "f") {

                valor = $('#' + campos).datebox('getValue');
                var valor1 = ReplaceAll(valor, "/", "");
                if (valor1 != "ddmmaaaa") {
                    if ($('#' + campos).datebox('getText') == "") {
                        valor = $('#' + campos).datebox('getText');
                    }
                    else { valor = $('#' + campos).datebox('getValue'); }
                }
                else { valor = ""; }

            }
            if (tipodato == "s") {
                if (oculto.className == 'hidden') { valor = oculto.value; }
                else {
                    valor = $('#' + campos).combobox('getValue');
                    if ((valor.toUpperCase() == "X") || (valor == "")) { valor = ""; }
                    //if ((valor == "x") || (valor == "")) { valor = ""; }
                    //else
                    //{ valor = $('#' + campos).combobox('getValue'); }
                }
            }
            valores += campos + ':' + valor.toUpperCase() + '|';
        }
        var v = valores.substring(0, valores.length - 1);
        sessionStorage.setItem(strcampos, v);
    }
}

function VALIDAR_FECHA(fecha, tipofecha) {
    if (isDate(fecha))
        alert('Valid Date');
    else $.messager.alert('Error', 'La fecha de la vigencia ' + tipofecha + ' esta incorrecta ', 'error'); return 0
}

function VALIDAR_CAPTURA(objtbl, objcampos, ban) {
    //if (objtbl == 'tblo')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
    //if (objtbl == 'tbld')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposD')); }
    //if (objtbl == 'tbls')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcamposS')); }

    var objcampos = $.parseJSON(strobjcampos);
    if (sessionStorage.getItem('ctrl' + objtbl) != null) {
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;
            var nulo = objcampos[i].ValidaNulos;
            var origen = objcampos[i].CampoOrigen;

            //if (campos == 'numempmp')
            //{ var v = campos; }

            if (origen == false) {
                if ((tipodato == "n") || (tipodato == "e")) {
                    valor = $('#' + campos).numberbox('getValue');
                    if ((valor == "") && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else { sessionStorage.setItem(ban, false); }
                }

                if ((tipodato == "t") || (tipodato == "tm")) {
                    valor = $('#' + campos).textbox('getValue');
                    if ((valor == "") && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else { sessionStorage.setItem(ban, false); }
                }

                if ((tipodato == "r") || (tipodato == "c")) {
                    var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                    for (var c = 0; c < ctrol.length; c++) {
                        var alias = ctrol[c].split(",");
                        var val = $('#' + alias[1] + campos).is(":checked");

                        if (val == true) { valor = alias[1]; break; }
                        else if (val == false) { valor = ""; }
                    }
                    if ((valor == "") && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                }

                if (tipodato == "f") {
                    if ($('#' + campos).datebox('getText') == "") { valor = $('#' + campos).datebox('getText'); }
                    else { valor = $('#' + campos).datebox('getValue'); }

                    var valor1 = ReplaceAll(valor, "/", "");
                    if (valor1 != "ddmmaaaa") {
                        var numerico = isNaN(valor1);
                        if (numerico == true) {
                            sessionStorage.setItem(ban, true);
                            $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); return 0;
                        }
                        else { sessionStorage.setItem(ban, false); }

                        if ((valor == "") && (nulo == 1)) {
                            sessionStorage.setItem(ban, true);
                            $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); return 0;
                        }
                        else { sessionStorage.setItem(ban, false); }

                        if (valor != "") {
                            if (!Validar_Fecha(valor)) {
                                sessionStorage.setItem(ban, true);
                                $.messager.alert('Error', 'La fecha de la ' + objcampos[i].Descripcion + ' esta incorrecta ', 'error'); return 0;
                            }
                            else { sessionStorage.setItem(ban, false); }
                        }
                        else { valor = ""; sessionStorage.setItem(ban, false); }
                    }
                    else {
                        if ((valor1 == "ddmmaaaa") && (nulo == 1)) {
                            valor = ""; sessionStorage.setItem(ban, true);
                            $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); return 0;
                        }
                        else { valor = ""; sessionStorage.setItem(ban, false); }
                    }
                }

                if (tipodato == "s") {
                    valor = $('#' + campos).combobox('getValue');
                    if (((valor.toUpperCase() == "X") || (valor == "")) && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else {
                        if (((valor.toUpperCase() == "X") || (valor == "")) && (nulo == 0)) { valor = ""; sessionStorage.setItem(ban, false); }
                    }
                }
            }
        }
    }

}

function VALORES_CAPTURA() {
    //if (origencreada == true)
    //{
    var obj = sessionStorage.getItem('ctrltblo');
    if (obj != null) {
        VALIDAR_CAPTURA("tblo", "camposO", "banO");
        var v = sessionStorage.getItem("banO");
        if (v == "false") {
            SACAR_CAPTURA("tblo", "camposO");

            GUARDAR_DOCUMENTO();
        }
        else { return 0; }
    }
    else { $.messager.alert('Información', 'Falta los valores de captura Origen', 'info'); return 0; }
    //}

    //if (destinocreada == true)
    //{
    //    if (sessionStorage.getItem('ctrltbld') != null) {
    //        VALIDAR_CAPTURA("tbld", "camposD", "banD");
    //        if (sessionStorage.getItem("banD") == "false")
    //        { SACAR_CAPTURA("tbld", "camposD"); }
    //        else { return 0; }
    //    }
    //    else { $.messager.alert('Información', 'Falta los valores de captura Destino', 'info'); return 0; }
    //}

    //if (sustitutacreada == true)
    //   {
    //    if (sessionStorage.getItem('ctrltbls') != null) {
    //        VALIDAR_CAPTURA("tbls", "camposS", "banS");
    //        if (sessionStorage.getItem("banS") == "false")
    //        { SACAR_CAPTURA("tbls", "camposS"); }
    //        else { return 0; }
    //    }
    //    else { $.messager.alert('Información', 'Falta los valores de captura Sustituta', 'info'); return 0; }
    //}


}

function GUARDAR_DOCUMENTO() {
    var parametros = {};
    var camposO = "", camposD = "", camposS = "";
    if (sessionStorage.getItem('camposO') != null) { camposO = sessionStorage.getItem('camposO'); }

    parametros.tipmov = tipmov;
    parametros.strtipo = strtipo;
    parametros.strmov = cvemov;
    parametros.strcamposO = camposO;
    parametros.strcamposD = "";
    parametros.strcamposS = "";
    parametros.condicion = cvedoc;
    parametros.multi = valnomina;

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Captura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                //$.messager.alert('Información', data.d[1], 'info');
                var doc = "";
                if (data.d[2] != undefined) { var doc = data.d[2]; }
                $.messager.alert({ title: 'Información', msg: '<div style="height:100%">' + data.d[1] + ' <br><h3><b>' + doc + '<b><h3></div>', icon: 'info', width: 25 + "%" });

                if (tipmov == "M") {
                    cvedoc = '';
                    $('#dlistamov').hide();
                    $('#dcaptura').hide();
                    $('#dmoddoc').show();
                    $("#dgdoc").datagrid('reload');
                    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
                    document.getElementById('lblnivel2').innerHTML = ""
                }
                if (tipmov == "G") {
                    LIMPIAR_CAPTURA("tblo", "camposO", "banO");
                }
            }
            else {
                $.messager.alert('Error', data.d[1], 'error');
            }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.resonseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function EDITAR_DOCUMENTO(strbuscar) {
    $('#dmoddoc').hide();
    $('#dcaptura').show();
    var parametros = {};
    //parametros.strtipo = sessionStorage.getItem('tipo');
    //parametros.strmov = cvemov;
    //parametros.strdocumento = sessionStorage.getItem('cvedoc');
    parametros.modulo = strtipo;
    parametros.movimiento = cvemov;
    parametros.documento = sessionStorage.getItem('cvedoc');

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CamposNuevaCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
            else {
                var objcamposOrigen = $.parseJSON(data.d[1]);
                var objcamposDestino = $.parseJSON(data.d[2]);
                var objcamposSust = $.parseJSON(data.d[3]);
                var objdatos = $.parseJSON(data.d[4]);

                if (objcamposOrigen.length > 0) {
                    origencreada = true;
                    $("#tt").tabs('getTab', 'po').panel('options').tab.show();
                    if (strtipo == 'DP') {
                        CAMBIAR_TITULO_TAB('po', 'Datos del Empleado');
                    }
                    else { CAMBIAR_TITULO_TAB('po', 'Plaza Origen'); }
                    DDLLISTACAMPOS('#cboCampoO');
                    CREAR_CAPTURA(objcamposOrigen, objdatos, '#dcorigen', 'tblo');
                }
                else { $("#tt").tabs('getTab', 'po').panel('options').tab.hide(); origencreada = false; }

                if (objcamposDestino.length > 0) {
                    destinocreada = true;
                    $("#tt").tabs('getTab', 'pd').panel('options').tab.show();
                    CAMBIAR_TITULO_TAB('pd', 'Plaza Destino');
                    DDLLISTACAMPOS('#cboCampoD');
                    CREAR_CAPTURA(objcamposDestino, objdatos, '#dcdestino', 'tbld');
                }
                else { $("#tt").tabs('getTab', 'pd').panel('options').tab.hide(); destinocreada = false; }

                if (objcamposSust.length > 0) {
                    sustitutacreada = true;
                    $("#tt").tabs('getTab', 'ps').panel('options').tab.show();
                    CAMBIAR_TITULO_TAB('ps', 'Plaza Sustituta');
                    DDLLISTACAMPOS('#cboCampoS');
                    CREAR_CAPTURA(objcamposSust, objdatos, '#dcsustituta', 'tbls');
                }
                else { $("#tt").tabs('getTab', 'ps').panel('options').tab.hide(); sustitutacreada = false; }
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

function LIMPIAR_CAPTURA(objtbl, objcampos, ban) {
    var obj = $.parseJSON(strobjcampos);
    // if (sessionStorage.getItem('ctrl' + objtbl) != null) {
    for (var i = 0; i < obj.length; i++) {
        var campos = obj[i].Campo;
        var tipodato = obj[i].TipoDato;
        var nulo = obj[i].ValidaNulos;
        var origen = obj[i].CampoOrigen;
        var valorpredeterminado = obj[i].valorPredeterminado;

        if (origen == false) {
            if ((tipodato == "t") || (tipodato == "tm")) {
                if (valorpredeterminado != "") { $('#' + campos).textbox('setValue', valorpredeterminado); }
                else { $('#' + campos).textbox('setValue', ''); }
            }

            if ((tipodato == "n") || (tipodato == "e")) {
                if (valorpredeterminado != "") { $('#' + campos).numberbox('setValue', valorpredeterminado); }
                else { $('#' + campos).numberbox('setValue', 0); }
            }

            if ((tipodato == "r") || (tipodato == "c")) {
                var ctrol = obj[i].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");
                    $('#' + alias[1] + campos).prop('checked', false);
                }
            }

            if (tipodato == "f") {
                if (valorpredeterminado != "") { $('#' + campos).datebox('setValue', valorpredeterminado); }
                else { $('#' + campos).datebox('setText') == "" }
            }

            if (tipodato == "s") {
                if (valorpredeterminado != "") { $('#' + campos).combobox('setValue', valorpredeterminado); }
                else { $('#' + campos).combobox('setValue', 'X'); }
            }
        }
    }
    // }

}

function LIMPIAR() {
    if (origencreada == true) {
        if (sessionStorage.getItem('ctrltblo') != null) {
            LIMPIAR_CAPTURA("tblo", "camposO", "banO");
        }
    }
    if (destinocreada == true) {
        if (sessionStorage.getItem('ctrltbld') != null) {
            LIMPIAR_CAPTURA("tbld", "camposD", "banD");
        }
    }
    if (sustitutacreada == true) {
        if (sessionStorage.getItem('ctrltbls') != null) {
            LIMPIAR_CAPTURA("tbls", "camposS", "banS");
        }
    }
}

function VALIDAR_MULTINOMINA(tipo) {

    if ((valnomina != undefined) && (valnomina != '')) {
        var parametros = {};
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Validacion_Multinomina",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") {
                    if (tipo == 'NC') { BTN_NUEVO_MOVIMIENTO(); }
                    else
                        if (tipo == 'MC') { BTN_MODIFICAR_DOCUMENTO(); }
                }
                else {
                    if ((objM.length > 0) && (valnomina != "||")) {
                        $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                    }
                    else {
                        if (tipo == 'NC') { BTN_NUEVO_MOVIMIENTO(); }
                        else
                            if (tipo == 'MC') { BTN_MODIFICAR_DOCUMENTO(); }
                    }

                    SACAR_NOMINAS();
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
    else {
        if (objM.length > 0) {
            $.messager.alert('Error', 'Falta seleccionar la nomina a capturar', 'error');
        }
        else {         
                if (tipo == 'NC') { BTN_NUEVO_MOVIMIENTO(); }
                else
                    if (tipo == 'MC') { BTN_MODIFICAR_DOCUMENTO(); }
            
        }
    }
}




