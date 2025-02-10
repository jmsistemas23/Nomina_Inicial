var tipo = "PA";
var cvedoc = "";
$(document).ready(function () {
    $.extend($.fn.validatebox.methods, {
        required: function (jq, required) {
            return jq.each(function () {
                var opts = $(this).validatebox('options');
                opts.required = required != undefined ? required : true;
                $(this).validatebox('validate');
            })
        }
    })
    // $.session.set("usuario", 'edgar.zazueta');
    //localStorage.setItem('usuario', 'migueleduardo.sandoval@gmail.com');

    //tipo = $_GET('tipo');
    //if (tipo != undefined) { tipo = tipo; }
    //else { tipo = 'PA'; }
    //sessionStorage.setItem('tipo', tipo);
   
    $('#btnNuevaCap').bind('click', function () { tipmov = "G"; cvedoc=""; NUEVA_CAPTURA(); });
    $('#btnEliModCap').bind('click', function () { MODIFICAR_DOCUMENTO(); });
    $('#btnRNuevaCap').bind('click', function () { REGRESAR_NUEVA_CAPTURA(); });
    $('#btnRModificarCap').bind('click', function () { REGRESAR_MODIFICAR_CAPTURA(); });
    $('#btnRModificarDoc').bind('click', function () { REGRESAR_DOCUMENTO(); });

    $('#btnEditarDoc').bind('click', function () { tipmov = "M";  NUEVA_CAPTURA(); });
    $('#btnEliminarDoc').bind('click', function () { ELIMINAR_DOCUMENTO(); });
    $('#btnLimpiarDoc').bind('click', function () { LIMPIAR_DOCUMENTO(); });    
    $('#btnIModificarCap').bind('click', function () { REGRESAR_INICIO_MODIFICAR_CAPTURA(); });

    $('#btnLNuevaCap').bind('click', function () { LIMPIAR_CAPTURA("tblo", "camposO", "banO"); });
    $('#btnLModificarCap').bind('click', function () { LIMPIAR_CAPTURA("tblo", "camposO", "banO"); });

    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat"); }
        }
    });
    $('#btnfiltrarcat').bind('click', function () { FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat", "#" + sessionStorage.getItem('camposeleccion'), "#" + sessionStorage.getItem('campodescripcion'), sessionStorage.getItem('tipoctl')); });

    $('#txtvaldoc').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRO_DOC("#dgdoc", "#cbocamdoc", "#cbocondoc", "#txtvaldoc");
        }
    });
    $('#btnfiltrardoc').bind('click', function () { FILTRO_DOC("#dgdoc", "#cbocamdoc", "#cbocondoc", "#txtvaldoc"); });

    $('#btnGNuevaCap').bind('click', function () { VALORES_CAPTURA(); });
    $('#btnGModificarCap').bind('click', function () { VALORES_CAPTURA(); });

});

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

function NUEVA_CAPTURA() {
    var parametros = {};
    parametros.modulo = tipo;
    parametros.movimiento = '01';
    parametros.documento = cvedoc;
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
                if (sessionStorage.getItem('cvedoc') == "") {                  
                    $('#MModificarCap').panel('close');
                    $('#MNuevaCap').panel('open');
                }
                else {                   
                    $('#dmodificar').hide();
                    $('#MModificarCap').panel('open');
                    $('#MNuevaCap').panel('close');
                }
                $('#dcaptura').show();               
                $('#dmenu').hide();

                var objcamposOrigen = $.parseJSON(data.d[1]);               

                var objdatos = "";

                if (objcamposOrigen.length > 0) {
                    sessionStorage.setItem('objcamposO', data.d[1]);
                    origencreada = true;
                    
                    if (sessionStorage.getItem('cvedoc') != "") { sessionStorage.setItem('ctrltblo', objcamposOrigen); }

                    CREAR_CAPTURA(objcamposOrigen, objdatos, '#dcorigen', 'tblo');
                }
                else {origencreada = false; }
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

function REGRESAR_NUEVA_CAPTURA() {
    $('#dmenu').show();
    $('#dcaptura').hide();      
}
function REGRESAR_MODIFICAR_CAPTURA() {
    $('#dmenu').hide();
    $('#dcaptura').hide();
    $('#dmodificar').show();
    cvemov = "";  
    $('#dgdoc').datagrid('reload');
    $('#btnEditarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');    
}
function REGRESAR_INICIO_MODIFICAR_CAPTURA() {   
    $('#dcaptura').hide();
    $('#dmodificar').hide();
    $('#dmenu').show();
    $("#dgdoc").datagrid('unselectAll');    
    cvemov = "";
}


function LIMPIAR_CAPTURA(objtbl, objcampos, ban) {
    if (objtbl == 'tblo')
    { objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
    
    if (sessionStorage.getItem('ctrl' + objtbl) != null) {
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;
            var nulo = objcampos[i].ValidaNulos;
            var origen = objcampos[i].CampoOrigen;

            if (origen == false) {
                if ((tipodato == "t") || (tipodato == "tm") || (tipodato == "d")) {
                    $('#' + campos).textbox('setValue', '');
                }

                if (tipodato == "n") {
                    $('#' + campos).numberbox('setValue', 0.00);
                }

                if ((tipodato == "r") || (tipodato == "c")) {
                    var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                    for (var c = 0; c < ctrol.length; c++) {
                        var alias = ctrol[c].split(",");
                        $('#' + alias[1] + campos).prop('checked', false);
                    }
                }

                if (tipodato == "f") {
                    $('#' + campos).textbox('setText') == ""
                }

                if (tipodato == "s") {
                    $('#' + campos).combobox('setValue', 'x');
                }
            }
        }
    }

}

function SACAR_DATOS_BUSQUEDA(registro, objtbl) {
    ban = false;
    var objcampos = "";

    if (!ban) {
        if (objtbl == 'tblo')
        { objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
        if (objtbl == 'tbld')
        { objcampos = $.parseJSON(sessionStorage.getItem('objcamposD')); }
        if (objtbl == 'tbls')
        { objcampos = $.parseJSON(sessionStorage.getItem('objcamposS')); }

        BUSCAR_CAMPO(objcampos, objtbl);

        var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
        var control = datos[0].split("|");
        var columnas = datos[1].split(',');

        for (var i = 0; i < control.length; i++) {
            var valores = control[i].split(',');
            var campos = valores[1].split('-');
            var tipodato = valores[0];

            var valor = registro[columnas[i]];

            for (var j = 0; j < campos.length; j++) {
                //if (campos[j] == 'estatus')
                //{ var v = campos[j]; }

                var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                    return ocampos.Campo == campos[j];
                });

                if ((tipodato == "t") || (tipodato == "n") || (tipodato == "d")) {
                    if (makesArray[0].CampoOrigen)
                    { document.getElementById(campos[j]).setAttribute('value', valor); }
                    else
                    { $('#' + campos[j]).textbox('setValue', valor); }
                }

                if ((tipodato == "r") || (tipodato == "c")) {
                    //if (makesArray[0].CampoOrigen)
                    //{ document.getElementById(campos[j]).setAttribute('value', valor); }
                    //else
                    //{
                    var ctrol = makesArray[0].CatalogoSeleccion.split("|");
                    for (var c = 0; c < ctrol.length; c++) {
                        var alias = ctrol[c].split(",");
                        if (valor == alias[1]) { $('#' + alias[0] + campos[j]).prop("checked", true); break }
                        else { $('#' + alias[0] + campos[j]).prop("checked", false); }
                    }
                    //}
                }
                if (tipodato == "f") {
                    if (makesArray[0].CampoOrigen)
                    { document.getElementById(campos[j]).setAttribute('value', valor); }
                    else {
                        $('#' + campos[j]).textbox('setValue', valor);
                    }
                }
                if (tipodato == "s") {
                    CARGAR_COMBOBOX(objcampos, campos[j], valor);
                }
            }
        }
    }
}

function BUSCAR_CAMPO(objcampos, objtbl) {
    var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
    var control = datos[0].split("|");
    var columnas = datos[1].split(',');
    for (var i = 0; i < control.length; i++) {
        var valores = control[i].split(',');
        //if (valores[1] == 'padomad')
        //{ var v = valores[1]; }
        if (valores[0] == "r") {
            var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                return ocampos.Campo == valores[1];
            });
            var ctrol = makesArray[0].CatalogoSeleccion.split("|");
            for (var c = 0; c < ctrol.length; c++) {
                var valor = ctrol[c].split(",");
                if (document.getElementById(valor[0] + valores[1]) == null) {
                    ban = true;
                    $.messager.alert('Error', ' El campo ' + campos + ' no existe', 'error');
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
    parametros.strtipo = tipo;
    parametros.strcampo = strcampo;
    parametros.strmov = '01';

    var $datagrid = {};
    var columns = new Array();

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
            var datos;
            if (data.d[0] != "") {
                var columnas = data.d[0].split('|');
                for (var col = 0; col < columnas.length; col++) {
                    datos = columnas[col].split(',');
                    var valor = datos[0];
                    var alinear = datos[2];
                    var titulo = datos[1];
                    var ancho = datos[3] * 10 + "px";

                    columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                }


                //var columnas = data.d[3].split('|');
                //for (var col = 0; col < columnas.length; col++) {
                //    datos = columnas[col].split(',');
                //    var valor = datos[0];
                //    var alinear = datos[2];
                //    var titulo = datos[1];
                //    var ancho = datos[3]*10 + "px";

                //    columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                //}
                $datagrid.columns = new Array(columns);
                $(dgcontrol).datagrid({ columns: "", url: "" });
                $(dgcontrol).datagrid($datagrid);

                sessionStorage.setItem('tablaseleccion', strtabla);
                sessionStorage.setItem('camposeleccion', strcampo);

                var objbusqueda = $.parseJSON(data.d[2]);
                //CARGAR_CAMPOSBUSQUEDA("#dgcat", objcampo);
                CAMPOS_BUSQUEDA_COLUMNAS("#dgcat", objcampo, objbusqueda);

                if (data.d[1] != "") {
                    var opts = $('#cboconcat').combobox('options');
                    $('#cboconcat').combobox('select', data.d[1]);
                }

                var campo = sessionStorage.getItem('nomcampo');
                if (campo != "No") {
                    var control = sessionStorage.getItem('ctrolval');
                    var condicion = campo + "=" + $('#' + control).textbox('getValue');
                    sessionStorage.setItem('concat', condicion);
                    $("#txtvalcat").textbox('setValue', $('#' + control).textbox('getValue'));
                    FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat");
                }
                else {
                    sessionStorage.setItem('concat', '')
                    //var control = sessionStorage.getItem('ctrolval');
                    //$('#' + control).textbox('setValue', '');
                    CARGAR_CAT("#dgcat", strtabla, strcampo, objtbl);
                    FOCUS('#txtvalcat', "#dgcat");
                }

                windows("#wincat", 850, 627,false, strdescripcion);
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
function CARGAR_CAT(dgcontrol, strtabla, strcampo, objtbl) {
    var con = "";
    if (sessionStorage.getItem('concat') != null) { con = sessionStorage.getItem('concat'); } else { con = ""; }
  
  
    $(dgcontrol).datagrid({
        url: "Listar_Catalogo.aspx?tipo=" + tipo + "&tabla=" + strtabla + "&campo=" + strcampo + "&mov=01&busqueda=" + con,
        pagination: true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,
        //width: anchotabla + "%",
        //heigth: altotabla + "%",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                SACAR_DATOS_BUSQUEDA(rows, objtbl);
                $("#wincat").window('close');
                sessionStorage.setItem('nomcampo', "No");
            }
        }
    });
}
function FILTRAR_CAT(dgobjeto, txtvalor, cbcampos, cbocon) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbcampos).combobox('getValue');
        var vcondicion = $(cbocon).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            sessionStorage.setItem('concat', condicion);
        }
        else { sessionStorage.setItem('concat', ""); }
    }
    else { sessionStorage.setItem('concat', ""); }
    CARGAR_CAT(dgobjeto, sessionStorage.getItem('tablaseleccion'), sessionStorage.getItem('camposeleccion'), sessionStorage.getItem('tipoctl'));
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

    $(objdiv).empty();
    $(objtbl).empty();
    $(objdiv).append('<table cellpadding="2" id="' + objtbl + '"></table>');
    table = $(objdiv).children();

    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');

        //if (obj[i].Campo == 'cvenetolegal')
        // { sololectura; }

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

        if (obj[i].ValidaNulos == 1) { nulo = true; }
        else { nulo = false; }

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
                if (valor == alias[1]) {
                    $('#' + alias[1] + obj[i].Campo).prop("checked", true);
                    break
                }
                else {
                    $('#' + alias[1] + obj[i].Campo).prop("checked", false);
                }
            }
            //for (var c = 0; c < arr.length; c++) {
            //    var alias = arr[c].split(",");                
            //        if (valor == alias[1]) { $('#' + valor + obj[i].Campo).prop("checked", true); break }
            //        else { $('#' + valor + obj[i].Campo).prop("checked", false); }                                
            //}
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
                    if (valor == alias[1]) {
                        $('#' + alias[1] + obj[i].Campo).prop("checked", true);
                        break
                    }
                    else {
                        $('#' + alias[1] + obj[i].Campo).prop("checked", false);
                    }
                }
                //for (var c = 0; c < arr.length; c++) {
                //    var alias = arr[c].split(",");
                //    if (valor == alias[1]) { $('#' + valor + obj[i].Campo).prop("checked", true); break }
                //    else { $('#' + valor + obj[i].Campo).prop("checked", false); }
                //}
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
                            readonly: sololectura,
                            required: nulo,                            
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

                        if (obj[i].HabilitarBusqueda == "1") {
                            btn = $('<a />', {
                                type: 'button',
                                text: "Buscar",
                                id: "btn" + obj[i].Campo,
                                name: obj[i].ConsultaBusqueda_BusquedaDirecta + "|" + obj[i].ConsultaBusqueda_Tabla,
                                target: obj[i].ConsultaBusqueda_RelacionCaptura + "@" + obj[i].ConsultaBusqueda_Columnas,
                                title: obj[i].ConsultaBusqueda_AliasColumnas
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
                                DISEÑO_CAT('#dgcat', tabla[1], campo, this.title, '#cbocamcat', objtbl);
                                //FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat");
                            });
                        }

                        var sololectura = false;
                        if (obj[i].Sololectura == "1") { sololectura = true; }


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
                                            precision: 4,
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

                            //if (obj[i].Campo == "pagppen")
                            //{
                            //    var campo = obj[i].Campo;
                            //}
                           
                            if (obj[i].TipoDato == "s") {
                                $('#' + obj[i].Campo).combobox({
                                    width: obj[i].Tamaño * 10,                                    
                                    editable: true,
                                    required:nulo,
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

function SACAR_CAPTURA(objtbl, strcampos) {
    var valores = '';
    var objcampos = "";
    var valor = "";

    if (objtbl == 'tblo')
    { objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }    

    if (sessionStorage.getItem('ctrl' + objtbl) != null) {
        //var datos = sessionStorage.getItem('ctrl' + objtbl).split("@");
        //var controles = datos[0].split("|");        
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;

            //if (campos == 'cvenetolegal')
            //{ var v = campos; }

            var oculto = document.getElementById(campos);
            var nulo = objcampos[i].ValidaNulos;

            if ((tipodato == "t") || (tipodato == "n") || (tipodato == "tm")|| (tipodato == "d")) {
                if (oculto.className == 'hidden')
                { valor = oculto.value; }
                else
                { valor = $('#' + campos).textbox('getValue'); }
            }            

            if ((tipodato == "r") || (tipodato == "c")) {
                var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");
                    var val = $('#' + alias[1] + campos).is(":checked");

                    if (val == true) { valor = alias[1]; break; }
                    else if (val == false) { valor = ""; }
                }
            }
            if (tipodato == "f") {
                if ($('#' + campos).textbox('getText') == "") {
                    valor = $('#' + campos).textbox('getText');
                }
                else { valor = $('#' + campos).textbox('getValue'); }

                var valor1 = ReplaceAll(valor, "/", "");
                if (valor1 == "ddmmaaaa") {
                    valor = "";
                }

            }
            if (tipodato == "s") {
                if (oculto.className == 'hidden')
                { valor = oculto.value; }
                else
                {
                    valor = $('#' + campos).combobox('getValue');
                    if ((valor == "x") || (valor == "")) { valor = ""; }                    
                }
            }
            valores += campos + ':' + valor.toUpperCase() + '|';
        }
        var v = valores.substring(0, valores.length - 1);
        sessionStorage.setItem(strcampos, v);
    }
}

function VALIDAR_CAPTURA(objtbl, objcampos, ban) {
    if (objtbl == 'tblo')
    { objcampos = $.parseJSON(sessionStorage.getItem('objcamposO')); }
   
    if (sessionStorage.getItem('ctrl' + objtbl) != null) {
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;
            var nulo = objcampos[i].ValidaNulos;
            var origen = objcampos[i].CampoOrigen;

            //if (campos == 'cvenetolegal')
            //{ campos; }

            if (origen == false) {
                if ((tipodato == "t") || (tipodato == "n") || (tipodato == "d")) {
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
                    if (valor == "") { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                }

                if (tipodato == "f") {
                    //if ($('#' + campos).textbox('getText') == "") { valor = $('#' + campos).textbox('getText'); }
                    //else { valor = $('#' + campos).textbox('getValue'); }

                    //if ((valor == "") && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    //else { sessionStorage.setItem(ban, false); }

                    //if ((valor == "") && (nulo == 1))  {
                    //    if (!Validar_Fecha(valor)) {
                    //        sessionStorage.setItem(ban, true);
                    //        $.messager.alert('Error', 'La fecha de la ' + objcampos[i].Descripcion + ' esta incorrecta ', 'error'); return 0;
                    //    }                       
                    //}
                    if ($('#' + campos).datebox('getText') == "") { valor = $('#' + campos).textbox('getText'); }
                    else { valor = $('#' + campos).textbox('getValue'); }

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
                    else { valor = ""; sessionStorage.setItem(ban, false); }
                }

                if (tipodato == "s") {
                    valor = $('#' + campos).combobox('getValue');
                    if (((valor == "x") || (valor == "")) && (nulo == 1)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else {
                        if (((valor == "x") || (valor == "")) && (nulo == 0))
                        { valor = ""; sessionStorage.setItem(ban, false); }
                    }
                }
            }
        }
    }
}

function VALORES_CAPTURA() {
    if (origencreada == true) {
        var obj = sessionStorage.getItem('ctrltblo');
        if (obj != null) {
            VALIDAR_CAPTURA("tblo", "camposO", "banO");
            //SACAR_CAPTURA("tblo", "camposO");
            var val=sessionStorage.getItem("banO");
            if (val == "false")
            { SACAR_CAPTURA("tblo", "camposO"); }
            else { return 0; }
        }
        else { $.messager.alert('Información', 'Falta los valores de captura Origen', 'info'); return 0; }
    }
    GUARDAR_DOCUMENTO();
}

function GUARDAR_DOCUMENTO() {
    var parametros = {};
    var camposO = "", camposD = "", camposS = "";
    if (sessionStorage.getItem('camposO') != null) { camposO = sessionStorage.getItem('camposO'); }   

    parametros.tipmov = tipmov;
    parametros.strtipo = tipo;  
    parametros.strmov = "01";
    parametros.strcamposO = camposO;
    parametros.strcamposD = "";
    parametros.strcamposS = "";
    parametros.condicion = cvedoc;
  
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
                $.messager.alert('Información', data.d[1], 'info');
                               
                LIMPIAR_CAPTURA("tblo", "camposO", "banO");
                if (tipmov == "M")
                { 
                    LIMPIAR_CAPTURA("tblo", "camposO", "banO");
                    $('#dcaptura').hide();
                    $('#dmodificar').show();
                    sessionStorage.setItem('condicion', "");
                    CARGAR_DOC("#dgdoc", 100, 50);
                }
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


function CARGAR_DOC(dgcontrol, ancho, alto) {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    var colsort = "numemp asc";
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?busqueda=' + con + "&colord=" + colsort,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        multiSort: true,
        remoteSort: false,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {               
                cvedoc = rows[fields[7]];
                $('#btnEditarDoc').linkbutton('enable');
                $('#btnEliminarDoc').linkbutton('enable');
            }
        },
        onSortColumn: function (sort, order) {
        colsort = "";
        colsort += sort + ' ' + order + "|";
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}
function FILTRO_DOC(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            sessionStorage.setItem('condicion', condicion);
        }
        else { sessionStorage.setItem('condicion', ""); }
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_DOC(dgcontrol, 100, 50);
}

function MODIFICAR_DOCUMENTO() {   
    $('#dmenu').hide();
    $('#dcaptura').hide();
    $('#dmodificar').show();
    $('#txtvaldoc').textbox('setValue', '');
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    sessionStorage.setItem('condicion', "");
    
    CARGAR_DOC("#dgdoc", 100, 50);
    CARGAR_CAMPOSBUSQUEDA('#dgdoc', '#cbocamdoc');
    
    $('#btnEditarDoc').linkbutton('disable');
    $('#btnEliminarDoc').linkbutton('disable');
}

function REGRESAR_DOCUMENTO() {
    $('#dmenu').show();
    $('#dmodificar').hide();    
}

function ELIMINAR_DOCUMENTO() {
    $.messager.confirm('Confirm', 'Seguro de eliminar captura de pensionada', function (r) {
        if (r) {
            ELIMINAR_DOCUMENTO(sessionStorage.getItem('cvedoc'));
        }
        else {
            $("#dgdoc").datagrid('unselectAll');
            $('#btnEditarDoc').linkbutton('disable');
            $('#btnEliminarDoc').linkbutton('disable');
        }
    });
}

function LIMPIAR_DOCUMENTO() {
    $('#txtvaldoc').textbox('clear').textbox('textbox').focus();
    $('#cbocondoc').combobox('setValue', '=');
    sessionStorage.setItem('condicion', '');
    CARGAR_DOC("#dgdoc", 100, 50);
    CARGAR_CAMPOSBUSQUEDA('#dgdoc', '#cbocamdoc');
}


function ELIMINAR_DOCUMENTO(valor) {
    var parametros = {};
    parametros.strmodulo = tipo;
    parametros.strdocumento = sessionStorage.getItem('cvedoc');
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Eliminardocumento",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
                $('#dmenu').hide();
                $('#dcaptura').hide();
                $('#dmodificar').show();
                cvemov = "";
                $('#dgdoc').datagrid('reload');
                $('#btnEditarDoc').linkbutton('disable');
                $('#btnEliminarDoc').linkbutton('disable');
                CARGAR_DOC("#dgdoc", 100, 50);
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

function EDITAR_DOCUMENTO() {
    $('#dmodificar').hide();
    $('#dcaptura').show();
    var parametros = {};
    
    parametros.modulo = tipo;
    parametros.movimiento = '01';
    parametros.documento = cvedoc;

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
            if (data.d[0] == "1")
            { $.messager.alert('Error', data.d[1], 'error'); }
            else
            {
                var objcamposOrigen = $.parseJSON(data.d[1]);
                var objdatos = "";
                if (objcamposOrigen.length > 0) {
                    origencreada = true;                   
                   // DDLLISTACAMPOS('#cboCampoO');
                    CREAR_CAPTURA(objcamposOrigen, objdatos, '#dcorigen', 'tblo');
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
