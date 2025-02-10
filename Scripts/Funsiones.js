var cveniveles = [];
var tblindicador = "";
var altotabla;
var anchotabla;
var checkedRows = [];

$(window).load(function () {
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

});

function $_GET(param) {
    url = document.URL;
    url = String(url.match(/\?+.+/));
    url = url.replace("?", "");
    url = url.split("&");
    x = 0;
    while (x < url.length) {
        p = url[x].split("=");
        if (p[0] == param) {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}



function FILTRAR_TREE_TXT(objtxt, objtree) {
    var text = $(objtxt);
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var valor = text.val();
            if (valor != "") {
                $(objtree).tree('doFilter', valor);
                $(objtree).tree('expandAll');
            }
            else { $(objtree).tree('doFilter', ''); $(objtree).tree('collapseAll'); }
        }
    });
}

function DESCARCAR_TREE(objtree) {
    var t = $(objtree);
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
}

function SELCCIONAR_NODO_TREE(objtree) {
    var node = $(objtree).tree('getSelected');    
    return (node) != null ? node.name:null;
}

function SELCCIONAR_NODO_CLAVE_TREE(objtree) {
    var node = $(objtree).tree('getSelected');
    return node.clave;
}

function Cargar_ComboBox(tabla, strfunsion, strfiltro, strcontrol) {
    var parametros = {};
    parametros.tabla = tabla;
    parametros.filtro = strfiltro;

    $.ajax({
        type: "POST",
        url: strfunsion,
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != "") {
                sessionStorage.setItem('Cargado', "Si");
                var obj = $.parseJSON(data.d);
                $('#' + strcontrol).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                    editable:false
                });
            }
            else { sessionStorage.setItem('Cargado', "No"); }
        },
        error: function (err) { alert(err.statusText); }
    });
}

function Llenar_ComboBox(tabla, strfunsion, strfiltro, strcontrol) {
    var parametros = {};
    parametros.tabla = tabla;
    parametros.filtro = strfiltro;

    $.ajax({
        type: "POST",
        url: strfunsion,
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d != "") {               
                var obj = $.parseJSON(data.d);
                $('#' + strcontrol).combobox({
                    data: obj,
                    valueField: 'campo',
                    textField: 'descripcion',
                    editable: false
                });
            }            
        },
        error: function (err) { alert(err.statusText); }
    });
}

function myformatter(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var fecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y;
    return fecha;
}

function myparser(s) {
    if (!s) return new Date();
    var ss = (s.split('/'));
    var y = parseInt(ss[0], 10);
    var m = parseInt(ss[1], 10);
    var d = parseInt(ss[2], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(d, m - 1, y);
    } else {
        return new Date();
    }   
}


function formattedDate(date) {
    if (date.indexOf('/') > 0) { return date; }
    else
    {
        var day = date.substring(0, 2);
        var month = date.substring(2, 2);
        var year = date.substring(4, 4);
        var fecha = day + '/' + month + '/' + year;
        return fecha;
    }       
}


function windows(objwin, width, heigth, ajustable, titulo) {
    var $win;
    $win = $(objwin).window({
        width: width,
        height: heigth,
        border: true,
        modal: true,       
        collapsible: false,
        minimizable: false,
        maximizable: false,
        loadingMessage: 'Cargando ...',
        title: titulo,
        resizable: ajustable,
        onResize:function(){
          $(this).window('hcenter');
          }
    });
    $win.window('open');
    $win.window('center');
}

function baseUrl() {
    var href = window.location.href.split('/');
    return href[0] + '//' + href[2] + '/';
}



function windows_porcentaje(objwin, width, heigth, ajustable,maximizar,minimizar, titulo) {
    var $win;
    $win = $(objwin).window({
        width: width+'%',
        height: heigth + '%',
        border: true,
        modal: true,
        resizable: ajustable,
        collapsible: false,
        minimizable: minimizar,
        maximizable: maximizar,
        loadingMessage: 'Loading ...',
        title: titulo,
        onResize: function () {
            $(this).window('hcenter');
        }
    });
    $win.window('open');
    $win.window('center');
}

function CAPTURA_SOLO_LECTURA(dgcontrol) {
    var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
    var control = sessionStorage.getItem('controles').split("|");
    for (var i = 0; i < fields.length; i++) {
        var tipodato = control[i].split(',');
        var campo = fields[i];

        if ((tipodato[0] == "txt") || (tipodato[0] == "n"))
        { $('#' + campo).textbox({ readonly: true }); }

        if (tipodato[0] == "chk") {
            $('#' + campo).attr("disabled", true);
        }
        if (tipodato[0] == "f")
        {
            $('#' + campo).datebox({ readonly: true });          
            $('#' + campo).datebox('setValue', rows[fields[i]]);
        }
    }
}


function SACAR_VALORES_ELIMINAR(dgcontrol) {
    var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
    var rows = $(dgcontrol).datagrid('getSelected');
    var documento = rows[fields[0]];
    var campo = fields[0];
    sessionStorage.setItem('condicion', campo + "=''" + documento + "''");
}

function CREAR_CAPTURA(mostrardatos,dgcontrol) {
    var ctrl;
    var ctrlbl;
    var valor = '';
    var dato = false;
    var readonly = false;
    var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));

    $('#Dcaptura').empty()
    $('#Dcaptura').append('<table cellpadding="2" id="tabla"></table>');
    table = $('#Dcaptura').children();

    if (sessionStorage.getItem('controles') != "") {
        var control = sessionStorage.getItem('controles').split("|");

        for (var i = 0; i < fields.length; i++) {
            var tipodato = control[i].split(',');

            var columna = $(dgcontrol).datagrid('getColumnOption', fields[i]);
            var tr = document.createElement('TR');
            td = document.createElement('TD');
            td2 = document.createElement('TD');

            var tipoctrl = tipodato[0];
            var longctrl = tipodato[1];

            if (mostrardatos == true)
            { valor = rows[fields[i]]; }

            if (sessionStorage.getItem('mov') != 'Guardar')
            { readonly = tipodato[2]; }


            ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + columna.field }).html(columna.title + ": ");

            if ((tipoctrl == "txt") || (tipoctrl == "f") || (tipoctrl == "n") || (tipoctrl == "tm"))
            { ctrl = $('<input/>').attr({ type: 'text', id: columna.field  }); }
            if (tipoctrl == "chk")
            { ctrl = $('<input/>').attr({ type: 'checkbox', id: columna.field }); }

            tr = $(tr).append(
                $(td).append(ctrlbl),
                $(td2).append(ctrl)
               );
            table.append(tr);

            if (tipoctrl == "tm") {
                //$('#' + columna.field).textbox({
                //    width: longctrl * 10,
                //    value: valor,
                //    readonly: readonly,
                //    //required: true,                        
                //    validType: 'length[0,' + longctrl + ']'
                //});               
                $('#' + columna.field).textbox({
                    width: longctrl * 10,
                    height: 9 * 10,
                    value: valor,
                    readonly: readonly,
                    multiline: true,                                       
                });
                $('#' + columna.field).textbox('textbox').attr('maxlength', longctrl);
            }
            if (tipoctrl == "txt") {
                $('#' + columna.field).textbox({
                    width: longctrl * 10,
                    value: valor,
                    readonly: readonly,
                    //required: true,                        
                    validType: 'length[0,' + longctrl + ']'
                });
                $('#' + columna.field).textbox('textbox').attr('maxlength', longctrl);
            }
            if (tipoctrl == "n") {
                if (valor == "") { valor = 0; }
                $('#' + columna.field).numberbox({
                    width: longctrl * 10,
                    value: valor,
                    readonly: readonly,
                    min: 0,
                    precision: 2
                });
            }
            if (tipoctrl == "chk") {
                if (valor == "1") { dato = true; }
                $('#' + columna.field).attr("checked", dato);
            }
            if (tipoctrl == "f") {
                $('#' + columna.field).datebox({
                    width: longctrl * 10,
                    formatter: myformatter,
                    readonly: readonly,
                    parser: myparser,
                    onSelect: function (date) {
                        var y = date.getFullYear();
                        var m = date.getMonth() + 1;
                        var d = date.getDate();
                        return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                    }
                });
                $('#' + columna.field).datebox('setValue', valor);
            }            
        }
    }
    else { $.messager.alert('Error', "Falta el diseño de los campos de captura", 'error'); }
}


function SACAR_VALORES_GUARDAR() {
    var valores = '';
    var values = {};
    var control = sessionStorage.getItem('controles').split("|");
    var valor;
    var cont = 0;
    var error = 0;
    $('#tabla td input').each(function () {
        var campo = $(this).attr('id');

        if (campo != undefined) {
            var tipodato = control[cont].split(',');
            if (tipodato[0] == "chk") {
                valor = $('#' + campo).is(":checked");                              
                if (valor == true)
                { valor = "1"; }
                else
                { valor = "0"; }
            }
            else
                if (tipodato[0] == 'txt') {
                    valor = $('#' + campo).textbox('getValue').toUpperCase();
                    if (cont == 0) { sessionStorage.setItem('condicion', campo+"="+ valor); }
                }
            else
               if (tipodato[0] == 'tm') {
                valor = $('#' + campo).textbox('getValue').toUpperCase();
                }
                else
                    if (tipodato[0] == 'n') {
                        valor = $('#' + campo).numberbox('getValue');
                    }
                   else
                    if (tipodato[0] == 'f') {                                              
                        if ($('#' + campo).datebox('getText') == "") {
                            valor = $('#' + campo).datebox('getText');
                        }
                        else { valor = $('#' + campo).datebox('getValue'); }
                    }
            if (valor == "") { $.messager.alert('Error', 'Falta el valor del campo ' + campo, 'error'); error = 1; return false;}
            else
            {              
                valores += campo + ':' + valor + '|';
                cont++;
            }
        }
    });
    if (error == 0)
    { sessionStorage.setItem('campos', valores.substring(0, valores.length - 1)); }
    else { sessionStorage.setItem('campos', 0); }
}


function CARGAR_INDICADORES(tabla, descripcion, dgcontrol, tipo,url) {
    var parametros = {};
    parametros.strtabla = tabla;
    //parametros.strfiltro = "";
    //parametros.strtipo = "A";
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(parametros),
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var obj = $.parseJSON(data.d[1]);
            if (data.d[2] != "")
            { var columnasbloquedas = jQuery.parseJSON(data.d[2]); }
            else { columnasbloquedas = ''; }
            var columnas = jQuery.parseJSON(data.d[3]);
            sessionStorage.setItem('tiposdatos', data.d[4]);
            sessionStorage.setItem('filtroscolumnas', data.d[5]);
            sessionStorage.setItem('scrollv', 'No');
            var dg = $(dgcontrol).datagrid({
                loadMsg: 'Processing, please wait ...',
                rownumbers: true,
                singleSelect: true,
                pagination: false,
                autoRowHeight: false,
                view: bufferview,
                pageSize: 18,
                frozenColumns: columnasbloquedas,
                data: obj,
                columns: columnas,
                onClickRow: function () {
                    var rows = $(dgcontrol).datagrid('getSelected');
                    if (rows) {
                        if (tipo == "P") {
                            ind = $('#txtpercepciones').textbox('getValue');
                            $('#txtpercepciones').textbox('setValue', ind + rows.indcop + '+');
                        }
                        if (tipo == "D") {
                            ind = $('#txtdeducciones').textbox('getValue');
                            $('#txtdeducciones').textbox('setValue', ind + rows.indcod + '-');
                        }
                        if (tipo == "A") {
                            ind = $('#txtaportaciones').textbox('getValue');
                            $('#txtaportaciones').textbox('setValue', ind + rows.indcop + '+');
                        }

                        $("#win").window('close');
                        for (var i = 0; i < columnas[0].length; i++) {
                            dg.datagrid('removeFilterRule', columnas[0][i].field);
                        }
                    }
                }
            });
            dg.datagrid('enableFilter');
            for (var i = 0; i < columnas[0].length; i++) {
                dg.datagrid('enableFilter', [{
                    field: columnas[0][i].field, type: 'textbox',
                    onChange: function (value) {
                        if (value == '') {
                            dg.datagrid('removeFilterRule', columnas[0][i].field);
                        }
                        else {
                            dg.datagrid('addFilterRule', {
                                field: columnas[0][i].field, op: 'contains', value: value
                            });
                        }
                        dg.datagrid('doFilter');
                    }
                }
                ]);
            }
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }
    });
    windows(700, 515, descripcion);
}

function btnBIndicadores(tipo,dgcontrol,url) {
    if (tipo == "P")
    { CARGAR_INDICADORES("indper", "Buscar Percepciones", dgcontrol, tipo,url); }
    if (tipo == "D")
    { CARGAR_INDICADORES("indded", "Buscar Deducciones", dgcontrol, tipo, url); }
    if (tipo == "A")
    { CARGAR_INDICADORES("indapo", "Buscar Aportaciones", dgcontrol, tipo, url); }
}

function btnLIndicadores(control) {
    $('#' + control).textbox('setValue', '');
}


function Niveles(Nivel, NivelAct, CatAct, CveAct, CatAnt, Valor, Titulo, Hist) {
    this.Nivel = Nivel;
    this.NivelAct = NivelAct;
    this.CatAct = CatAct;
    this.CveAct = CveAct;
    this.CatAnt = CatAnt;
    this.Valor = Valor;
    this.Titulo = Titulo;
    this.Historia = Hist;
}

function RegresarNivel(id) {
    for (var pos in cveniveles) {
        if (cveniveles[pos].TablaAct == id) {
            // delete cveniveles[pos];
            return cveniveles[pos].Valor
        }
    }
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

    for (var i = 0; i < arraytosearch.length; i++) {

        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}


function Encrypt(str) {
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(str.charCodeAt(pos) ^ key);
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}

function Decrypt(str) {
    if (!str) str = "";
    str = (str == "undefined" || str == "null") ? "" : str;
    try {
        var key = 146;
        var pos = 0;
        ostr = '';
        while (pos < str.length) {
            ostr = ostr + String.fromCharCode(key ^ str.charCodeAt(pos));
            pos += 1;
        }

        return ostr;
    } catch (ex) {
        return '';
    }
}

function nobackbutton(){ 
       window.location.hash="no-back-button"; 
       window.location.hash="Again-No-back-button" //chrome 
      window.onhashchange=function(){window.location.hash="no-back-button";} 
}

function FOCUS(txtobjeto, dgobjeto) {
    if (txtobjeto == "") {
        var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
        txtobjeto = '#' + fields[0];
    }
    var text = $(txtobjeto);
    text.textbox('clear').textbox('textbox').focus();
}

function TXTFOCUS(txtobjeto, tipodato)
{
    if (tipodato == 'numberbox') {
        $(txtobjeto).numberbox('clear').numberbox('textbox').focus();
    }
    if (tipodato == 'textbox') {
        var text = $(txtobjeto);
        text.textbox('clear').textbox('textbox').focus();
    }
}

function TXTALILCEACION(txtobjeto, alineacion, tipodato) {
    if (tipodato == 'numberbox') {
        $(txtobjeto).numberbox('textbox').css('text-align', alineacion);
    }
    if (tipodato == 'textbox') {
        $(txtobjeto).textbox('textbox').css('text-align', alineacion);
    }
}

//function Niveles(titulocat,tblant, tblsig, Valor, nivelant,paginanivel) {
//    this.TituloCatalogo = titulocat;
//    this.TablaAnt = tblant;
//    this.TablaSig = tblsig;
//    this.Valor = Valor;
//    this.NivelAnt = nivelant;
//    this.PaginaNivel = paginanivel;
//}


function FILTRAR_GRID_INDICADORES(dgobjeto, txtvalor, cbcampos, cbocon) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbcampos).combobox('getValue');
        var vcondicion = $(cbocon).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' ' + vvalor + ''; }
            sessionStorage.setItem('condicion', condicion);
        }
        else { sessionStorage.setItem('condicion', ""); }
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_GRID_INDICADORES("#dgind", "Listar_Catalogo.aspx");
}

function CARGAR_GRID_INDICADORES(dgcontrol, urldatos) {
    var url;
    if (sessionStorage.getItem('condicion') == null) { url = urldatos + "?tabla=" + tblindicador + "&busqueda="; } else { url =  urldatos+"?tabla=" + tblindicador + "&busqueda=" + sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: url,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: anchotabla + "%",
        heigth: altotabla + "%",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                if (tipo == "P") {
                    ind = $('#txtpercepciones').textbox('getValue');
                    $('#txtpercepciones').textbox('setValue', ind + rows.indcop + '+');
                }
                if (tipo == "D") {
                    ind = $('#txtdeducciones').textbox('getValue');
                    $('#txtdeducciones').textbox('setValue', ind + rows.indcod + '-');
                }
                if (tipo == "A") {
                    ind = $('#txtaportaciones').textbox('getValue');
                    $('#txtaportaciones').textbox('setValue', ind + rows.indcop + '+');
                }

                $("#win").window('close');
            }
        }
    });
}

function DISEÑO_INDICADORES(dgcontrol, urldiseño, strtabla, descripcion, strtipo,wancho,walto) {
    tblindicador = strtabla;
    tipo = strtipo;
    var parametros = {};
    parametros.strtabla = strtabla;
    
    var $datagrid = {};
    var columns = new Array();

    $.ajax({
        type: "POST",
        url: urldiseño,
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var datos; 
            columnas = data.d[4].split('|');
            for (var col = 0; col < columnas.length; col++) {
                datos = columnas[col].split(',');
                var valor = datos[0];
                var alinear = datos[1];
                var titulo = datos[2];
                var ancho = datos[3] + "px";

                columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
            }
            $datagrid.columns = new Array(columns);
            $(dgcontrol).datagrid($datagrid);

            if (data.d[1] != "")
            { anchotabla = data.d[1]; }
            else { anchotabla = 100; }

            if (data.d[2] != "")
            { altotabla = data.d[2]; }
            else { altotabla = 100; }

            CARGAR_GRID_INDICADORES("#dgind", "Listar_Catalogo.aspx");
            CARGAR_CAMPOSBUSQUEDA("#dgind", '#cbocamind');
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    //windows(700, 620, descripcion);
    windows(wancho, walto, descripcion);
}

function CARGAR_CAMPOSBUSQUEDA_COL(dgobjeto, objcampo,COLSEL) {
    var columna;
    var Campos = [];
    var obj;

    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < fields.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        if ((columna.hidden != true) && (fields[col] != "chk")) {
            obj["Clave"] = columna.field;
            obj["Descripcion"] = columna.title;
            if (col == COLSEL) { obj["selected"] = true; }
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

function CARGAR_CAMPOSBUSQUEDA(dgobjeto, objcampo) {
    var columna;
    var Campos = [];
    var obj;

    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < fields.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        if ((columna.hidden != true) && (fields[col]!="chk")) {
            obj["Clave"] = columna.field;
            obj["Descripcion"] = columna.title;
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
    //$.fn.combobox.defaults.onLoadSuccess = function (items) {
    //    if (items.length) {
    //        var opts = $(this).combobox('options');
    //        $(this).combobox('select', items[0][opts.valueField]);
    //    }
    //}    
}

function CARGAR_CAMPOSBUSQUEDA_TODAS(dgobjeto, objcampo) {
    var columna;
    var Campos = [];
    var obj;

    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < fields.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        if (fields[col] != "chk"){
            obj["Clave"] = columna.field;
            obj["Descripcion"] = columna.title;
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


function CARGAR_CAMPOSBUSQUEDAS(dgobjeto, objcampo,camsel) {
    var columna;
    var Campos = [];
    var obj;

    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < fields.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        if ((columna.hidden != true) && (fields[col] != "chk")) {
            obj["Clave"] = columna.field;
            obj["Descripcion"] = columna.title;
            if (columna.field == camsel) { obj["selected"] = true; }
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
    //$.fn.combobox.defaults.onLoadSuccess = function (items) {
    //    if (items.length) {
    //        var opts = $(this).combobox('options');
    //        $(this).combobox('select', items[0][opts.valueField]);
    //    }
    //}    
}

function CAMPOS_BUSQUEDA_COLUMNAS(dgobjeto, objcampo, objcolumnas) {
    var columns = new Array();
    var datos;
    var Campos = [];
    var obj;
    var campo = "";
    for (var col = 0; col < objcolumnas.length; col++) {
        obj = {};
        datos = objcolumnas[col].split(',');
        if (datos[4] == undefined) { campo = datos[0]; } else { campo = datos[4] + "." + datos[0]; }
        obj["Clave"] = campo;
        obj["Descripcion"] = datos[2];
        if (col == 0) { obj["selected"] = true; }
        else { obj["Select"] = false; }
        Campos.push(obj);
    }
    $(objcampo).combobox({
        data: Campos,
        valueField: "Clave",
        textField: "Descripcion",
        editable: false
    });
}

function CAMPOS_BUSQUEDA_CONSULTA(dgobjeto, objcampo, objcolumnas) {
    var columns = new Array();  
    var Campos = [];
    var obj;
    var campo = "";
    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col = 0; col < objcolumnas.length; col++) {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);
        if ((columna.hidden != true) && (fields[col] != "chk")) {          
            obj["Clave"] = objcolumnas[col];
            obj["Descripcion"] = columna.title;
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

function LIMPIAR_NODE_TREE(objtree, cerrar) {
    var t = $(objtree);
    var node = t.tree('getSelected');
    if (node != undefined) {
        t.tree('unselect', node.target);
    }
    t.tree({ state: cerrar });
}

function LIMPIAR_NODECHK_TREE(objtree, cerrar) {
    var cknodes = $(objtree).tree("getChecked");
    for (var i = 0; i < cknodes.length; i++) {
        $(objtree).tree("uncheck", cknodes[i].target);

        var node = $(objtree).tree('getSelected');
        if (node != undefined) {
            $(objtree).tree('unselect', node.target);
        }
    }    
    $(objtree).tree('collapseAll');
}

function getChecked(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].Id);
    }
    return ss.join(',');
}

function getCheckedMov(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push(nodes[i].clave);
    }
    return ss.join(',');
}

function getCheckedName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push("''"+nodes[i].name+"''");
    }
    return ss.join(',');
}

function getChecked_Array(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        var lst = { id: "", nombre: "", url: "" };
       lst.id = nodes[i].Id;
       lst.nombre = nodes[i].text;
       lst.url = nodes[i].url;

        ss.push(lst);
    }
    return ss;
}



//$.extend($.fn.tree.methods, {
//    unselect: function (jq, target) {
//        return jq.each(function () {
//            var opts = $(this).tree('options');
//            $(target).removeClass('tree-node-selected');
//            if (opts.onUnselect) {
//                opts.onUnselect.call(this, $(this).tree('getNode', target));
//            }
//        });
//    }
//});


function FILTRAR_TREE(objtxt, objtre, cerrar) {
    var valor = $(objtxt).textbox('getValue').toUpperCase().replace('Á', 'A').replace('É', 'E').replace('Í', 'I').replace('Ó', 'O').replace('Ú', 'U');
    if (valor != "") {
        $(objtre).tree('doFilter', valor);
        $(objtre).tree('expandAll');
    }
    else {
        $(objtre).tree('doFilter', '');
        if (cerrar == "Si")
        { $(objtre).tree('collapseAll'); }
        else { $(objtre).tree('expandAll'); }
    }
}

function TXT_FILTRO_TREE(objtxt, objtre,cerrar) {
    var text = $(objtxt);
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_TREE(objtxt, objtre, cerrar);
        }
    });
}
//var windowWidth = ((parseInt($(window).width())) / 2) - 120;

//var windowWidth = $(window).width();
//var windowHeight = $(window).height();
//$('#divizquierda').css({ 'width': windowWidth, 'height': windowHeight });

//var div = $('#divizquierda');
//div.css("top", ($(window).height() - div.height()) / 2 + 'px');

function DESMARCAR_FILA_GRID(dgobj)
{
    var bandera
    var rows = $(dgobj).datagrid('getSelected');
    if (rows)
    { $(dgobj).datagrid('unselectRow', $(dgobj).datagrid('getRowIndex', rows)); bandera = true; }
    else { bandera = false; }
    return bandera;
}


function LIMPIAR() {
    var i = 0;
    var control = sessionStorage.getItem('controles').split("|");
    $('#tabla td input').each(function () {
        Campo = $(this).attr("id");
        if (Campo != undefined) {
            var tipodato = control[i].split(',');
            if (tipodato[0] == "txt") {
                $('#' + Campo).textbox('setValue', '');
                $('#' + Campo).textbox({ readonly: false });
            }
            if (tipodato[0] == "n") {
                $('#' + Campo).textbox('setValue', 0);
                $('#' + Campo).textbox({ readonly: false });
            }
            if (tipodato[0] == "chk") {
                $('#' + Campo).attr("checked", false);
            }
            if (tipodato[0] == "f") {
                $('#' + Campo).datebox('setValue', '');
                $('#' + Campo).datebox({ readonly: false });
            }
            i++;
        }
    });
}

function Validar_Fecha(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;
    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
    var dtArray = currVal.match(rxDatePattern); // is format OK? 
    if (dtArray == null)
        return false;
    dtMonth = dtArray[3];
    dtDay = dtArray[1];
    dtYear = dtArray[5];
    //var currentYear = (new Date).getFullYear();
    //if (dtYear < 2000)
    //    return false;
    //else
    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}


function ReplaceAll(strcadena, strinicial, strreemplazo) {
    return strcadena.split(strinicial).join(strreemplazo);
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
