var vtipomov = "";
var vtipo = "";
var movimiento = "";
var documento = "";
var desmov = "";
var vempleado = "";
$(document).ready(function () {
    var empleado = $_GET('empleado');
    if (empleado != undefined) { vempleado = empleado; }
    else { vempleado = ''; }
    var tipomov = $_GET('tipomov');
    if (tipomov != undefined) { vtipomov = tipomov; }
    else { vtipomov = ''; }
    var tipo = $_GET('tipo');
    if (tipo != undefined) { vtipo = tipo; }
    else { vtipo = ''; }

    LISTAR_NOMINA();
   
    $('#btnRMenu').bind('click', function () {
        //document.location = "Consulta_Empleados.aspx?empleado=" + vempleado
        IR_PAGINA("Consulta_Empleados.aspx", "numplaza=&empleado=" + empleado);
    });

    //$('#btnRcaptura').bind('click', function () {
    //    $('#dmenu').show();
    //    $('#dcaptura').hide();
    //    LISTAR_NOMINA();
    //});

    $('#btnMovimiento').bind('click', function () { EDITAR_MOVIMIENTO('#btnMovimiento'); });
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

function LISTAR_NOMINA() {
    var obj = "";
    var objhm = "";

    var parametros = {};
    parametros.tipo = vtipo;    
    parametros.tipomov = vtipomov;
    parametros.valor = vempleado;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_HistoriaMovimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                obj = $.parseJSON(data.d[0]);
                if (obj.length > 0) {
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);
                    $('#txtcurp').textbox('setValue', obj[0].curpemp);
                }
            }

            objhe = $.parseJSON(data.d[1]);
            if (objhe[0].Error == 0) {
                $.messager.alert('Error', objhe[0].Mensaje, 'error');
            }
            else {
                if (data.d[2] != "") {
                    objdatos = $.parseJSON(data.d[2]);
                    if (objdatos.length > 0) {
                        objdetalle = $.parseJSON(data.d[3]);
                        disdatos = data.d[4];
                        disdetalle = data.d[5];
                        CARGAR_DG("#dghc", objdatos, disdatos, objdetalle, disdetalle);
                    }
                }
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

function CARGAR_DG(dgcontrol, objdatos, disdatos, objdetalle, disdetalle) {
    var col = $.parseJSON(disdatos);
    $(dgcontrol).datagrid({
        data: objdatos,
        columns: col.columns,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        autoRowHeight: false,
        autoUpdateDetail: true,
        pageSize: 20,
        view: detailview,
        detailFormatter: function (index, row) {
            return '<div style="padding:2px;position:relative;"><table class="ddv"></table></div>';
        },
        beforeSend: function () {
            $('#loading').show();
        },
        onExpandRow: function (index, row) {
            var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv');
            var valor = row["numdocme"];
            var fildetalle = jQuery.grep(objdetalle, function (detalle, i) {
                return detalle.numdocme == valor;
            });
            var col = $.parseJSON(disdetalle);
            ddv.datagrid({
                data: fildetalle,
                columns: col.columns,
                fitColumns: false,
                singleSelect: true,
                rownumbers: true,
                striped: true,
                loadMsg: '',
                height: 'auto',
                onResize: function () {
                    $(dgcontrol).datagrid('fixDetailRowHeight', index);
                },
                onLoadSuccess: function () {
                    setTimeout(function () {
                        $(dgcontrol).datagrid('fixDetailRowHeight', index);
                    }, 0);
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

function EDITAR_MOVIMIENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        EDITAR_DOCUMENTO();
    }
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
        url: "../funciones.aspx/LlenarCatalogos",
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
            if (valor != "") {
                if (obj.length > 1) {
                    makesArray = jQuery.grep(obj, function (product, i) {
                        return product.valor == valor;
                    });
                    if (makesArray.length > 0) {
                        $('#' + ddlobj).combobox("setValue", valor);
                    } else { $('#' + ddlobj).combobox("setValue", "x"); }
                }
            }
            else { $('#' + ddlobj).combobox("setValue", "x"); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CREAR_CAPTURA(obj, objdat, objdiv, objtbl) {
    var ctrl;
    var Ocultar;
    var valor;
    var ctrlbl;
    var tabla = "";
    var titulo = "";
    var sololectura = true;
    var longctrl;
    var nulo = false;

    $(objdiv).empty();
    $(objtbl).empty();
    $(objdiv).append('<table cellpadding="2" id="' + objtbl + '"></table>');
    table = $(objdiv).children();

    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');

        //if (obj[i].Campo == 'sexo')
        //{ sololectura; }

        if (objdat == 0) {
            if (obj[i].valorPredeterminado == "")
            { valor = ""; }
            else { valor = obj[i].valorPredeterminado; }
        }
        else {
            if (obj[i].valorPredeterminado == "")
            { valor = objdat[0][obj[i].Campo]; }
            else { valor = obj[i].valorPredeterminado; }
        }

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

                ctrl = $('<input/>').attr({ type: 'radio', name: obj[i].TipoDato + "-" + obj[i].Campo, value: 0, id: tipoval[1] + obj[i].Campo });
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
                if (valor == alias[1]) { $('#' + valor + obj[i].Campo).prop("checked", true); break }
                else { $('#' + valor + obj[i].Campo).prop("checked", false); }
            }
        }
        else
            if (obj[i].TipoDato == "c") {
                var arr = obj[i].CatalogoSeleccion.split('|')
                td2 = document.createElement('TD');
                for (var j = 0; j < arr.length; j++) {
                    var tipoval = arr[j].split(',');
                    var label = tipoval[0];
                    ctrl = $('<input/>').attr({ type: 'checkbox', name: obj[i].TipoDato + "-" + obj[i].Campo, value: 0, id: tipoval[1] + obj[i].Campo });
                    ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                    //    $(td).append(document.createTextNode(label)),
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
                    if (valor == alias[1]) { $('#' + valor + obj[i].Campo).prop("checked", true); break }
                    else { $('#' + valor + obj[i].Campo).prop("checked", false); }
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
                        $('#' + obj[i].Campo).textbox({
                            width: obj[i].Tamaño * 10,
                            value: valor,
                            //formatter: myformatter,
                            //parser: myparser
                            readonly: sololectura,
                            required: nulo,
                            //onSelect: function (date) {
                            //    var y = date.getFullYear();
                            //    var m = date.getMonth() + 1;
                            //    var d = date.getDate();
                            //    return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                            //}
                        });
                        $('#' + obj[i].Campo).textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
                    }
                }
                else
                    if ((obj[i].TipoDato == "t") || (obj[i].TipoDato == "tm") || (obj[i].TipoDato == "n") || (obj[i].TipoDato == "d")) {
                        td2 = document.createElement('TD');

                        if (Ocultar == "Si") { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                        else { ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text"); }

                        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                        //if (obj[i].HabilitarBusqueda == "1") {
                        //    btn = $('<a />', {
                        //        type: 'button',
                        //        text: "Buscar",
                        //        id: "btn" + obj[i].Campo,
                        //        name: obj[i].ConsultaBusqueda_BusquedaDirecta + "|" + obj[i].ConsultaBusqueda_Tabla,
                        //        target: obj[i].ConsultaBusqueda_RelacionCaptura + "@" + obj[i].ConsultaBusqueda_Columnas,
                        //        title: obj[i].ConsultaBusqueda_AliasColumnas
                        //    });

                        //    tr = $(tr).append(
                        //      $(td).append(ctrlbl),
                        //      $(td2).append(ctrl),
                        //      $(td2).append(btn)
                        //      );
                        //}
                        //else {
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
                        //}
                        table.append(tr);

                        //poner boton de busqueda si esta configurado para que se muestre en el campo
                        //var campo = "";
                        //if (obj[i].HabilitarBusqueda == "1") {

                        //    $('#btn' + obj[i].Campo).linkbutton({
                        //        iconCls: 'icon-search',
                        //        plain: true,
                        //        text: 'Buscar'
                        //    }).bind('click', function () {
                        //        campo = this.id.substring(3, this.id.length);
                        //        sessionStorage.setItem('ctrl' + objtbl, this.target);
                        //        sessionStorage.setItem('tipoctl', objtbl);
                        //        var tabla = this.name.split('|');
                        //        sessionStorage.setItem('nomcampo', "No");
                        //        DISEÑO_CAT('#dgcat', tabla[1], campo, this.title, '#cbocamcat', objtbl);
                        //        //FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat");
                        //    });
                        //}

                        //var sololectura = false;
                        //if (obj[i].Sololectura == "1") { sololectura = true; }


                        if ((obj[i].TipoDato == "t") && (obj[i].CampoOrigen == false)) {
                            if (obj[i].valorPredeterminado != "")
                            { valor = obj[i].valorPredeterminado; }

                            $('#' + obj[i].Campo).textbox({
                                width: obj[i].Tamaño * 10,
                                value: valor,
                                readonly: sololectura,
                                required: nulo,
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
                                                DISEÑO_CAT('#dgcat', tabla[1], id, btn[0].title, '#cbocamcat', objtbl);
                                            }
                                        }
                                    }
                                })
                            });
                        }
                        else
                            if ((obj[i].TipoDato == "tm") && (obj[i].CampoOrigen == false)) {
                                $('#' + obj[i].Campo).textbox({
                                    width: obj[i].Tamaño * 10,
                                    height: 9 * 10,
                                    value: valor,
                                    readonly: sololectura,
                                    multiline: true,
                                    required: nulo,
                                    //validType: 'length[0,' + longctrl + ']'
                                });
                            }
                            else
                                if ((obj[i].TipoDato == "n") && (obj[i].CampoOrigen == false)) {
                                    $('#' + obj[i].Campo).numberbox({
                                        width: obj[i].Tamaño * 10,
                                        value: valor,
                                        readonly: sololectura,
                                        min: 0,
                                        precision: 0,
                                        required: nulo,
                                        //validType: 'length[0,' + longctrl + ']'
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
                            if (Ocultar == "Si")
                            { ctrl = $('<input/>').attr({ type: 'hidden', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo, value: valor }).addClass("hidden"); }
                            else
                            { ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text"); }

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
                                    readonly: sololectura,
                                    onSelect: function (rec) {
                                        if (rec.valor != "x") {
                                            if (rec.relacion != "") {
                                                var qryrelacion = $('#' + rec.relacion).data("valor");
                                                if (qryrelacion != undefined) {
                                                    var valores = qryrelacion.split("|");
                                                    var camposfiltro = valores[2].split(",");
                                                    var rquery = valores[0];
                                                    for (var j = 0; j < camposfiltro.length; j++) {
                                                        rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                                                    }
                                                    Cargarddl(rec.relacion, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion, valor);
                                                }
                                            }
                                        }
                                    },
                                });
                            }

                            var n = obj[i].CatalogoFiltro.indexOf("@");
                            if (n == -1) {
                                Cargarddl(obj[i].Campo, obj[i].CatalogoSeleccion, obj[i].CatalogoValor, obj[i].CatalogoTexto, obj[i].CatalogoFiltro, obj[i].CamposRelacion, valor);
                                if (valor != "") {
                                    $('#' + obj[i].Campo).combobox("setValue", valor);
                                }
                                else { $('#' + obj[i].Campo).combobox("setValue", "x"); }
                            }
                            else {
                                var qryrelacion = $('#' + obj[i].Campo).data("valor");
                                var valores = qryrelacion.split("|");
                                var camposfiltro = valores[2].split(",");
                                var rquery = valores[0];
                                for (var j = 0; j < camposfiltro.length; j++) {
                                    rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                                }
                                Cargarddl(obj[valores[1]].Campo, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion, valor);
                                if (valor != "")
                                { $('#' + obj[i].Campo).combobox("setValue", valor); }
                                else { $('#' + obj[i].Campo).combobox("setValue", "x"); }
                            }

                        }

    }
}

function EDITAR_DOCUMENTO() {
    var parametros = {};

    parametros.modulo = vtipomov;
    parametros.movimiento = movimiento;
    parametros.documento = documento;

    $.ajax({
        type: "POST",
        url: "../Funciones.aspx/CamposHistoria",
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
                var objcamposOrigen = $.parseJSON(data.d[1]);
                var objdatos = "";
                if (objcamposOrigen.length > 0) {
                    origencreada = true;
                    CREAR_CAPTURA(objcamposOrigen, objdatos, '#dcorigen', 'tblo');
                    document.getElementById('lblmov').innerHTML = "Documento: " + documento + " / Movimiento: " + movimiento + " - " + desmov;
                    $('#dmenu').hide();
                    $('#dcaptura').show();
                }
                else { $("#tt").tabs('getTab', 'po').panel('options').tab.hide(); origencreada = false; }

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