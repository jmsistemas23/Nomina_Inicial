var query = "", valor = "";
var ncampo = "", ncondicion = "", nvalor = "";
var objfiltro = [];
var colStruct = [];
var valnomina = '';
var nominasel = '';
var idperfil = "";
var catalogo = "";
$(document).ready(function () {
   
    $('#btnPer').bind('click', function () { AGREGAR_PERCEPCION('#btnPer', 'P', 'Percepción'); });
    $('#btnDed').bind('click', function () { AGREGAR_PERCEPCION('#btnDed', 'D', 'Deducción'); });
    $('#btnApo').bind('click', function () { AGREGAR_PERCEPCION('#btnApo', 'A', 'Aportación'); });

    //$('#btnAddcam').bind('click', function () { AGREGAR_FILTRO('#btnAddcam', 'cam'); });
    //$('#btnAddcon').bind('click', function () { AGREGAR_FILTRO('#btnAddcon', 'con'); });
    //$('#btnAddval').bind('click', function () { AGREGAR_FILTRO('#btnAddval', 'val'); });
    //$('#btnLultimoval').bind('click', function () { QUITAR_ULTIMA_CONDICION('#btnLultimoval'); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR_FILTRO('#btnLimpiar'); });
    $('#btnLimpiarProc').bind('click', function () { LIMPIAR_PROCESO('#btnLimpiarProc'); });

    $('#btnGuardar').bind('click', function () { GUARDAR_FILTRO('#btnGuardar'); });

    $('#btnDetalle').bind('click', function () { MOSTRAR_DETALLE('#btnDetalle'); });
    $('#btnGenerarProc').bind('click', function () { GENERAR_PROCESO('#btnGenerarProc'); });
    
    $('#txtvalorind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalorind').textbox('getValue');
            if (vvalor != "") {
                condicion = vvalor;
            }           
            $.session.set("conind", condicion);
            BUSCAR_INDICADORES(condicion);
        }
    });
    $('#btnbusarind').bind('click', function () { BUSCAR_INDICADORES($.session.get("conind")) });

    $('#btnECondicion').bind('click', function () { ELIMINAR_CONDICION('#btnECondicion'); });
    $('#btnACondicion').bind('click', function () { AGREGAR_CONDICION('#btnACondicion'); });

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
    


    $('#tperfiles').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                idperfil = node.name;
                MOSTRAR_VALORES_GUARDADOS();
                CARGAR_CONDICIONES('#tcondicion');
                HABILITAR_OBJETOS();
            }
        }
    });

    $('#tcampos').tree({
        onClick: function (node) {
            if (node.name != "") {
                if (node.attributes != "")
                { CARGAR_CATALOGO('#tvalor', node.attributes); }
            }
        }
    });

    FILTRAR_TREE_TXT('#txtcampo', '#tcampos');
    FILTRAR_TREE_TXT('#txtcondicion', '#tcondicion');

    SACAR_NOMINAS();
});

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
            var objM = $.parseJSON(data.d[1]);
            
         
            if (objM.length > 0) {
                $('#dextras').show();
                $('#lblnominas').hide();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);                
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
                $('#lblnominas').hide();
                valnomina = '';
                nominasel = '';               
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
function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            //text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
        });

        tr = $(tr).append(
          $(td).append(btn)
        );
        table.append(tr);


        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: true,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
            VALIDAR_MULTINOMINA();
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            VALIDAR_MULTINOMINA();
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        VALIDAR_MULTINOMINA();
        $.session.set('valnomina', '');
      
    }
}

function CARGAR_CATALOGO(tvobj, query) {
    var valores = query.split("|");
    var parametros = {};
    parametros.strquery = valores[2];
    parametros.strvalor = valores[1];
    parametros.strtexto = valores[0];
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Cargar_Catalogo',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $(tvobj).tree({
                data: obj,
                formatter: function (node) {
                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                },
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

function HABILITAR_OBJETOS()
{
    $('#tt').tabs('enableTab', 1);

    $('#btnPer').linkbutton({ selected: false });
    $('#btnDed').linkbutton({ selected: false });
    $('#btnApo').linkbutton({ selected: false });
    $('#btnimpfijo').linkbutton({ selected: false });
    $('#btnimpformula').linkbutton({ selected: false });

    $('#btnPer').linkbutton('enable');
    $('#btnDed').linkbutton('enable');
    $('#btnApo').linkbutton('enable');
    $('#btnimpfijo').linkbutton('enable');
    $('#btnimpformula').linkbutton('enable');  
    $('#txtvalor').textbox({ readonly: false });

    $('#txtcampo').textbox({ readonly: false });
    $('#txtcondicion').textbox({ readonly: false });
    $('#txtvalbuscar').textbox({ readonly: false });

    $('#btnLimpiarProc').linkbutton('enable');   
    $('#btnLimpiar').linkbutton('enable');
    $('#btnGuardar').linkbutton('enable');
    $('#btnLTodo').linkbutton('enable');
    $('#btnLultimoval').linkbutton('enable');
    $('#btnAddcam').linkbutton('enable');
    $('#btnAddcon').linkbutton('enable');
    $('#btnAddval').linkbutton('enable');
}

function LISTAR_PERFILES(tobj) {
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Perfiles',
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

function CARGAR_IND(dgcontrol, strtipo, ancho, alto, condicion,titulo) {
    $(dgcontrol).datagrid({
        url: "ListaIndicadores.aspx?tipotbl='" + strtipo + "'&busqueda=" + condicion,
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
                $('#txtclave').textbox('setValue', rows.clave);
                $('#txtdescripcion').textbox('setValue', rows.descripcion);
                sessionStorage.setItem('tipoind', strtipo);
                document.getElementById('lbltipoind').innerHTML = titulo;
                $("#wind").window('close');
                $('#btnPer').linkbutton({ selected: false });
                $('#btnDed').linkbutton({ selected: false });
                $('#btnApo').linkbutton({ selected: false });
            }
        }
    });
}

function BUSCAR_INDICADORES(condicion) {
    if (sessionStorage.getItem('tipoind') == 'P')
    { CARGAR_IND('#dgind', 'P', 530, 220, condicion); }
    else
        if (sessionStorage.getItem('tipoind') == 'D')
        { CARGAR_IND('#dgind',  'D', 530, 220, condicion); }
        else
            if (sessionStorage.getItem('tipoind') == 'A')
            { CARGAR_IND('#dgind', 'A', 530, 220, condicion); }
    FOCUS('#txtvalorind', "#dgind");
}

function AGREGAR_PERCEPCION(btnobj,tipoind,titulo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        sessionStorage.setItem('tipoind', tipoind);
        CARGAR_IND('#dgind', tipoind, 530, 220, '',titulo);
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 555, 630,false, titulo);
    }
}

function MOSTRAR_VALORES_GUARDADOS() {
    var parametros = {};
    parametros.idperfil =idperfil;
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
                var objcampos = jQuery.parseJSON(data.d[1]);
                var objvista = jQuery.parseJSON(data.d[3]);                
                CARGAR_LISTA_CAMPOS_CONSULTA('#tcampos', objcampos);
                CARGAR_DISEÑO_VISTAPREVIA('#dg', objvista);              
                CARGAR_CONDICION_PERFIL('#dgcondicion', data.d[2]);
            }
            else { $.messager.alert('Error', 'No existe diseño del perfil', 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_DISEÑO_VISTAPREVIA(dgobj,columnas)
{
    var colStruct = [];
    var colItems = [];
   // var valores = columnas.split(',');
    for (var c = 0; c < columnas.length; c++) {
        var menuItem = {
            field: columnas[c].Campo,
            title: columnas[c].Titulo,
        }
        colItems.push(menuItem);
    }
    colStruct.push(colItems);

    $(dgobj).datagrid({
        columns: colStruct,
       // url: "Listar_importacion.aspx?tipo=" + tipo + "&busqueda=" + "&multi=" + $.session.get('valnomina'),
        fitColumns: true,
        rownumbers: true,
        singleSelect: true,
        pagination: true,
        striped: true,
        pageSize: 20,
        heigth: "80%"
    });
}

function CARGAR_CONDICION_PERFIL(dgobj,objcampos)
{
    var objcondicion;
    var conteo = objcampos.indexOf('|');
    if (conteo > 0) {
        objcondicion = objcampos.split('|');
        for (var i = 0; i < objcondicion.length; i++) {
            $(dgobj).datagrid('insertRow', {
                index: i,
                row: {
                    Condicion: objcondicion[i]
                }
            });
        }
    }
    else {
        $(dgobj).datagrid('insertRow', {
            index: 0,
            row: {
                Condicion: objcampos
            }
        });
    }
}

function SortByName(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function CARGAR_LISTA_CAMPOS_CONSULTA(tobj, objcolumnas) {
    var objlstcampos = [];
    for (var c = 0; c < objcolumnas.length; c++) {
        var lstcampos = { id: "", name: "", text: "" };
        lstcampos.id = c;
        lstcampos.name = objcolumnas[c].Tabla+"."+objcolumnas[c].Campo;
        lstcampos.text = objcolumnas[c].Campo;
        if (objcolumnas[c].Query != "")
        { lstcampos.attributes = objcolumnas[c].CatTexto + "|" + objcolumnas[c].CatValor + "|" + objcolumnas[c].Query; }
        else { lstcampos.attributes = ""; }

        objlstcampos.push(lstcampos);
    }
    $(tobj).tree({
        data: objlstcampos,
        //onLoadSuccess: function () {
        //    var rows = $('#dgcolumnas').datagrid('getRows');
        //    var tri = $(tobj).tree('getRoots');
        //    for (var t = 0; t < rows.length; t++) {
        //        for (var h = 0; h < tri.length; h++) {
        //            if (rows[t].Campo == tri[h].text) {
        //                $(tobj).tree('check', tri[h].target);
        //                break;
        //            }
        //        }
        //    }
        //}
    });
}

function CARGAR_DISEÑO_TABLAS(objtablas, objcampos)
{
    var relaciontbl = "",camposconsulta="",tablainicial="",camposprocesos="";
    var distablas = objtablas.split("|");
    for (var i = 0; i < distablas.length; i++) {
        var tablas = distablas[i].split(',');
        if (tablas[3] == "Si") { tablainicial = "From "+tablas[1] + " as " + tablas[2]; }
        if (tablas[4] == "Si") { relaciontbl += tablas[5] + " "; }
    }

    var objlstcampos = [];  var colItems = [];
   var strcampos = objcampos.split("|");
   strcampos.sort(function (a, b) {       
           var a1 = a[0], b1 = b[0];
           if (a1 == b1) return 0;
           return a1 > b1 ? 1 : -1;       
   });
   for (var i = 0; i < strcampos.length; i++) {
       var campos = strcampos[i].split('/');
       if (campos[5] == "Si") {
           var listacampos = { name: "", text: "", attributes: "" };

           if (campos[1] != "")
           { listacampos.name = campos[1] + "." + campos[2]; }
           else { listacampos.name = campos[2]; }

           listacampos.attributes = campos[12],
           listacampos.text = campos[2];
           objlstcampos.push(listacampos);
       }
       if (campos[4] == "Si")
       {
           if (campos[1] != "")
           { camposconsulta += campos[1] + "." + campos[2] + ","; }
           else { camposconsulta += campos[2] + ","; }
           var menuItem = {
               field: campos[2],
               title: campos[3],
               align: 'center'
           };
           colItems.push(menuItem);
       }

       if (campos[6] == "Si")
       {
           if (campos[1] != "")
           { camposprocesos += campos[1] + "." + campos[2] + ","; }
           else { camposprocesos += campos[2] + ","; }
       }
   }
   colStruct.push(colItems);

 
   sessionStorage.setItem('camposconsulta', camposconsulta.substring(0, camposconsulta.length - 1));
   sessionStorage.setItem('camposprocesos', camposprocesos.substring(0, camposprocesos.length -1));
   $('#tcampos').tree({
       data: objlstcampos       
   });    
}

//function CARGAR_CATALOGO(tobj,strcat)
//{
//    var parametros = {};
//    parametros.strcat = strcat;
//    $.ajax({
//        type: "POST",
//        url: 'Funciones.aspx/cargar_catalogo',
//        data: JSON.stringify(parametros),
//        dataType: "json",
//        async: false,
//        cache: false,
//        contentType: "application/json; charset=utf-8",
//        beforeSend: function () {
//            $('#loading').show();
//        },
//        success: function (data) {
//            var obj = jQuery.parseJSON(data.d[0]);
//            $(tobj).tree({
//                data: obj,
//                formatter: function (node) {
//                    return '<span title=\'' + node.name + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
//                }
//            });
           
//        },
//        error: function (err) {
//            $('#loading').hide(100);
//            $.messager.alert('Error', err.responseText, 'error');
//        },
//        complete: function () {
//            $('#loading').hide(100);
//        }
//    });
//}

function CARGAR_CONDICIONES(tobj)
{
    var objlstcampos = [];
    var listacampos = { name: "", text: "" };

    listacampos.name = "=";
    listacampos.text = "Igual";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "!=";
    listacampos.text = "Diferente";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Like";
    listacampos.text = "Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Not Like";
    listacampos.text = "No Contenga";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "LikeIni";
    listacampos.text = "Inicie con";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "NoLikeIni";
    listacampos.text = "No Inicie con";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "In";
    listacampos.text = "En Valor";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "Not In"
    listacampos.text = "No en Valor";
    objlstcampos.push(listacampos);
  
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

    listacampos = { name: "", text: "" };
    listacampos.name = "(";
    listacampos.text = "(";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = ")";
    listacampos.text = ")";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "+";
    listacampos.text = "+";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "-";
    listacampos.text = "-";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "*";
    listacampos.text = "*";
    objlstcampos.push(listacampos);

    listacampos = { name: "", text: "" };
    listacampos.name = "/";
    listacampos.text = "/";
    objlstcampos.push(listacampos);

    $(tobj).tree({
        data: objlstcampos        
    });
}

function AGREGAR_FILTRO(btnobj, tipo)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
        if (tipo == "cam")
        {
            var t = $('#tcampos');
            ncampo = t.tree('getSelected');
            if (ncampo == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0;}
            valor = ncampo.name;
            objfiltro.push(ncampo.name);
            $('#txtcampo').textbox('setValue', '');                        
            if (ncampo != undefined) {
                t.tree('unselect', ncampo.target);
            }
        }
        if (tipo == "con") {
            var t = $('#tcondicion');
            ncondicion = t.tree('getSelected');
            if (ncondicion == null) { $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return 0; }
            valor = ncondicion.name;
            objfiltro.push(ncondicion.name);
            $('#txtcondicion').textbox('setValue', '');
            if (ncondicion != undefined) {
                t.tree('unselect', ncondicion.target);
            }
        }
        if (tipo == "val") {
            if (sessionStorage.getItem('catalogo') == "Si") {
                var t = $('#tvalor');
                nvalor = t.tree('getSelected');
                if (nvalor == null) { $.messager.alert('Error', 'Falta seleccionar el valor', 'error'); return 0; }

                if (ncondicion.name == "Like") { valor = '\'|' + nvalor.name + '|\''; }
                else
                { valor = ' (\'' + nvalor.name + '\')'; }
            }
            else {
                if ($('#txtvalbuscar').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el valor', 'error'); return 0; }

                if (ncondicion.name == "Like") { valor = '\'|' + $('#txtvalbuscar').textbox('getValue') + '|\''; }
                else
                { valor = ' (\'' + $('#txtvalbuscar').textbox('getValue') + '\')'; }
            }
            objfiltro.push(valor);
            $('#txtvalbuscar').textbox('setValue', '');
            if (sessionStorage.getItem('catalogo') == "Si") {
                if (nvalor != undefined) {
                    t.tree('unselect', nvalor.target);
                }
            }
        }
        query = $('#txtfiltro').textbox('getValue')+" ";
        $('#txtfiltro').textbox('setValue', query += valor);

    }
}

function QUITAR_ULTIMA_CONDICION(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var query = "";
        objfiltro.splice($.inArray(objfiltro.length, objfiltro), 1);
        for (var r = 0; r < objfiltro.length; r++)
        {
            query += objfiltro[r] + " ";
        }
        $('#txtfiltro').textbox('setValue', query);
    }
}

function LIMPIAR_FILTRO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtcampo').textbox('setValue', '');
        var t = $('#tcampos');
        var ncampo = t.tree('getSelected');
        if (ncampo != undefined) {
            t.tree('unselect', ncampo.target);
        }

        $('#txtcondicion').textbox('setValue', '');
        if (sessionStorage.getItem('catalogo') == "Si") {
            var t = $('#tcondicion');
            var ncampo = t.tree('getSelected');
            if (ncampo != undefined) {
                t.tree('unselect', ncampo.target);
            }
        }

        $('#txtvalbuscar').textbox('setValue', '');        
        $('#tvalor').tree('removeAll');        
        $('#txtfiltro').textbox('setValue', '');      
    }
}

function LIMPIAR_PROCESO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfiltro').textbox('setValue', '');
        $('#txtclave').textbox('setValue', '');
        $('#txtdescripcion').textbox('setValue', '');
        $('#txtvalor').textbox('setValue', '');
        $('#btnPer').linkbutton({ selected: false });
        $('#btnDed').linkbutton({ selected: false });
        $('#btnApo').linkbutton({ selected: false });
        $('#btnimpfijo').linkbutton({ selected: false });
        $('#btnimpformula').linkbutton({ selected: false });
        $('#btnGuardar').linkbutton({ disabled: true });
        $('#btnLimpiar').linkbutton({ disabled: true });
        $('#txtperfiles').textbox('setValue', '');
        //var t = $('#tperfiles');
        //var ncampo = t.tree('getSelected');
        //if (ncampo != undefined) {
        //    t.tree('unselect', ncampo.target);
        //}
        var t = $('#tcampos');
        var ncampo = t.tree('getSelected');
        if (ncampo != undefined) {
            t.tree('unselect', ncampo.target);
        }
        var t = $('#tcondicion');
        var ncampo = t.tree('getSelected');
        if (ncampo != undefined) {
            t.tree('unselect', ncampo.target);
        }
        $('#tvalor').tree('removeAll');
        $('#tperfiles').tree('removeAll');
        
        if (document.getElementById('lblcontador').innerHTML != "") {
            document.getElementById('lblcontador').innerHTML = "";
            $('#dg').datagrid('loadData', { "total": 0, "rows": [] });
        }              
        $('#tt').tabs('disableTab', 1);
        SACAR_NOMINAS();
    }
}

function GUARDAR_FILTRO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var diseñocondicion = "",condicion="";
        var rows = $('#dgcondicion').datagrid('getRows');
        var total = $('#dgcondicion').datagrid('getData').total;
        for (i = 0; i < total; i++) {
            var encontrado = rows[i].Condicion.indexOf("'");
            if (encontrado > 0) {                
                condicion += rows[i].Condicion.replace(/'/g, "''''") + " ";
                diseñocondicion += rows[i].Condicion.replace(/'/g, "''''") + "|";
            }
            else {
                condicion += rows[i].Condicion + " ";
                diseñocondicion += rows[i].Condicion + "|";
            }
        }
        if (condicion.length > 0) {
            condicion = condicion.substring(0, condicion.length - 1);
            diseñocondicion = diseñocondicion.substring(0, diseñocondicion.length - 1);
        }


        var parametros = {};
        parametros.idperfil = idperfil;
        parametros.condicion = condicion;
        parametros.diseñocondicion = diseñocondicion
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Guardar_FiltroProcesos',
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
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
}


function MOSTRAR_DETALLE(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {               
        var parametros = {};
        parametros.idperfil = idperfil;        
        $.ajax({
            type: "POST",
            url: 'funciones.aspx/Contar_detalle',
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {                
                document.getElementById('lblcontador').innerHTML = "Total de Registros: " + data.d[0];               
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.responseText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
        

        $('#dg').datagrid({           
            url: "Listar_detalle.aspx?idperfil=" + idperfil,            
        });
                     
    }
}

function GENERAR_PROCESO(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var tipo = "";
        if ($('#txtclave').textbox('getValue')=="")
        { $.messager.alert('Error', 'Falta seleccionar el indicador', 'error'); return 0; }
        else
        if ((($('#btnimpfijo').linkbutton('options').selected)==false) && (($('#btnimpformula').linkbutton('options').selected)==false))
        { $.messager.alert('Error', 'Falta seleccionar el tipo de pago', 'error'); return 0; }
        else
            if (($('#txtvalor').textbox('getValue') == "") && ($('#btnimpfijo').linkbutton('options').selected)==true)
            { $.messager.alert('Error', 'Falta el importe a pagar', 'error'); return 0; }
            else
            {
                if ($('#btnimpfijo').linkbutton('options').selected) { tipo = 'I'; }
                if ($('#btnimpformula').linkbutton('options').selected) { tipo = 'F'; }
                if ($('#txtvalor').textbox('getValue') == "") {
                    valor = "''" + $('#txtclave').textbox('getValue') + "'',''" + $('#txtdescripcion').textbox('getValue') + "'',''P''";
                }
                else
                {
                   valor="''" + $('#txtclave').textbox('getValue') + "'',''" + $('#txtdescripcion').textbox('getValue') + "'',''P'',''" + $('#txtvalor').textbox('getValue')+"''";                    
                }

                var parametros = {};
                parametros.idperfil = idperfil;
                parametros.tipo = tipo;
                parametros.strcampos = valor;
                parametros.multi = valnomina;                
                $.ajax({
                    type: "POST",
                    url: 'funciones.aspx/Generar_Proceso',
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "0") {
                            $.messager.alert('Información', data.d[1], 'info');
                            LISTAR_IMPORTACION();
                        }
                        else { $.messager.alert('Error', data.d[1], 'error'); }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); }
                });
            }
    }

  
}

function LISTAR_IMPORTACION() {
    var colStruct = [];
    var colItems = [];
    var tipo = "";
    if ($('#btnimpfijo').linkbutton('options').selected) { tipo = 'I'; }
    if ($('#btnimpformula').linkbutton('options').selected) { tipo = 'F'; }

    var condicion = "";
    if ($('#txtclave').textbox('getValue') != "") { condicion = $('#txtclave').textbox('getValue'); }

    var parametros = {};
    parametros.tipo = tipo;
    parametros.multi = valnomina;
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/listar_importacion',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            document.getElementById('lblcontador').innerHTML = "Total de Registros: " + data.d[1];
            var columnas = data.d[0].split('|');
            for (var c = 0; c < columnas.length; c++) {
                var valores = columnas[c].split(',');               
                var menuItem = {
                    field: valores[0],
                    title: valores[1],
                    width: valores[2],
                    align: valores[3],
                    halign: valores[4],
                }
                colItems.push(menuItem);               
            }
            colStruct.push(colItems);
            
            $('#dg').datagrid({
                columns: colStruct,
                url: "Listar_importacion.aspx?tipo="+tipo+"&busqueda="+"&multi="+ $.session.get('valnomina'),
                fitColumns: true,
                rownumbers: true,
                singleSelect: true,
                pagination: true,
                striped: true,
                pageSize: 20,
                heigth: "80%"
            });

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {          
            $('#loading').hide(100);
        }
    });


}


function VALIDAR_MULTINOMINA() {
    if ((valnomina != undefined) && (valnomina != '')) {
        var parametros = {};
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Validacion_Multinomina",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {                    
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                    SACAR_NOMINAS();
                }
                else
                {
                    LISTAR_PERFILES('#tperfiles');
                    FILTRAR_TREE_TXT('#txtperfiles', '#tperfiles');                   
                    $('#btnLimpiarProc').linkbutton({ disabled: false });
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
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a capturar', 'error'); }
}

function getChkName(objtre) {
    var nodes = $(objtre).tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        ss.push("'" + nodes[i].name + "'");
    }
    return ss.join(',');
}


function AGREGAR_CONDICION(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        var condicion = "", logico = "", vtcampos = "", vtcondicion = "", vtvalor = "", vttabla = "";

        vtcampos = $('#tcampos').tree('getSelected');
        vtcondicion = $('#tcondicion').tree('getSelected');
        //vttabla = $('#tvtblsel').tree('getSelected');
        vtvalor = getChkName('#tvalor');
        if (vtvalor == "")
        { vtvalor = $('#txtvalbuscar').textbox('getValue'); }

        //if (vttabla == null) { $.messager.alert('Error', 'Falta seleccionar la tabla', 'error'); return 0; }
        //else
        if (vtcampos == null) { $.messager.alert('Error', 'Falta seleccionar el campo', 'error'); return 0; }
        else
            if (vtcondicion == null) { $.messager.alert('Error', 'Falta seleccionar la condición', 'error'); return 0; }
            else
                if (vtvalor == "") { $.messager.alert('Error', 'Falta el valor a buscar', 'error'); return 0; }
                else
                {
                    if (vtcondicion.name == 'LikeIni') {
                        condicion = vtcampos.name + ' Like \'' + vtvalor + '%\'';
                    }
                    else
                        if (vtcondicion.name == 'NoLikeIni') {
                            condicion = vtcampos.name + ' Not Like \'' + vtvalor + '%\'';
                        }
                        else
                        if (vtcondicion.name == 'Not Like') {
                            condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'%' + vtvalor + '%\'';
                        }
                        else
                            if (vtcondicion.name == 'Like') {
                                condicion = vtcampos.name + ' ' + vtcondicion.name + ' \'%' + vtvalor + '%\'';
                            } else
                                if (vtcondicion.name == '=') {
                                    condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor + '';
                                } else
                                    if ((vtcondicion.name == 'In') || (vtcondicion.name == 'Not In')) {
                                        condicion = vtcampos.name + ' ' + vtcondicion.name + ' (' + vtvalor + ')';
                                    } else
                                        if ((vtcondicion.name == '>') || (vtcondicion.name == '<') || (vtcondicion.name == '>=') || (vtcondicion.name == '<=')) {
                                            condicion = vtcampos.name + ' ' + vtcondicion.name + ' ' + vtvalor + '';
                                        }

                    if ($('#opcY').linkbutton('options').selected) { logico = 'and'; }
                    if ($('#opcO').linkbutton('options').selected) { logico = 'or'; }

                    var filas = $('#dgcondicion').datagrid('getSelected');
                    if (filas == null) {

                        if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        else { condicion = logico + " " + condicion; }

                        var total = $('#dgcondicion').datagrid('getData').total;
                        $('#dgcondicion').datagrid('insertRow', {
                            index: total + 1,
                            row: {
                                Condicion: condicion,
                            }
                        });
                    }
                    else {
                        //if ((logico == "") && ($('#dgcondicion').datagrid('getData').total > 0)) { $.messager.alert('Error', 'Falta seleccionar el opereado lógico', 'error'); return 0; }
                        condicion = logico + " " + condicion;

                        var rowIndex = $("#dgcondicion").datagrid("getRowIndex", filas);
                        $('#dgcondicion').datagrid('updateRow', {
                            index: rowIndex,
                            row:
                                {
                                    Condicion: condicion,
                                }
                        });
                        $('#dgcondicion').datagrid('unselectRow', rowIndex);
                    }

                    $('#opcY').linkbutton({ selected: false });
                    $('#opcO').linkbutton({ selected: false });
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
                    $('#tvalor').tree('removeAll');
                    $('#txtvalbuscar').textbox('setValue', '');
                    $('#txtcampo').textbox('setValue', '');
                    $('#txtcondicion').textbox('setValue', '');
                    $('#tcampos').tree('doFilter', '');
                    $('#tcondicion').tree('doFilter', '');
                    $('#tvalor').tree('doFilter', '');
                }
    }
}
function ELIMINAR_CONDICION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        rows = $('#dgcondicion').datagrid('getSelected');
        if (rows) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la condición', function (r) {
                if (r) {
                    var rowIndex = $("#dgcondicion").datagrid("getRowIndex", rows);
                    $('#dgcondicion').datagrid('deleteRow', rowIndex);
                }
            })
        }
    }
}