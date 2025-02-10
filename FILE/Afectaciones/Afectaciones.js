var tipoMov
var titulo
var tblmov
var tbldoc
var tblerror=""
var tbldetalle = ""
var tipoafectacion="M";
//var rutafunsion
var mostrarerrores
var altoerror
var altodetalle
var ancho;
var alto;
var valnomina = "";
var nominasel = "";
var condicion = "";
var tipo = "";
var tipobusqueda = "";
var tipobloqueo = "";

$(document).ready(function () {
    
     tipoMov = $_GET('tipo');
     if (tipoMov != undefined) { tipoMov = tipoMov; }
     else { tipoMov = 'MP'; }
   
     if (tipoMov == 'MC') { document.getElementById('lbltitulo').innerHTML = "PAGOS Y DESCUENTOS DIVERSOS"; }
     if (tipoMov == 'MP') { document.getElementById('lbltitulo').innerHTML = "MOVIMIENTOS DE PERSONAL"; }
     if (tipoMov == 'DP') { document.getElementById('lbltitulo').innerHTML = "DATOS PERSONALES"; }
     if (tipoMov == 'IL') { document.getElementById('lbltitulo').innerHTML = "INCIDENCIAS LABORALES"; }
     if (tipoMov == 'TR') { document.getElementById('lbltitulo').innerHTML = "TERCEROS"; }
     if (tipoMov == 'ME') { document.getElementById('lbltitulo').innerHTML = "MOVIMIENTOS ESPECIALES"; }
     if (tipoMov == 'RF') { document.getElementById('lbltitulo').innerHTML = "REFERENCIAS FAMILIARES"; }
    
     $.session.set('tipoafec', "R");



     if (tipoMov != undefined) {
         tblmov = "rubmov" + tipoMov;
         tbldoc = "AfeDoc" + tipoMov;
    
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
                         $('#lstrubros').tree('doFilter', valor);
                         $('#lstrubros').tree('expandAll');
                     }
                     else { $('#lstrubros').tree('doFilter', ''); $('#lstrubros').tree('collapseAll'); }
                 }
             }
         });

        $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {
              
                FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat",  $.session.get('camposeleccion'));
            }
        });

        $('#txtvaldoc').textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {              
                FILTRAR_CAT("#dgdoc", "#txtvaldoc", "#cbocamdoc", "#cbocondoc",  $.session.get('camposeleccion'));
            }
        });

        $('#dmenu').show();
        $('#dparcial').hide();
        $('#derror').hide();
      
        $('#btncompleta').bind('click', function () { AFECTACION_COMPLETA('#btncompleta');  });
        $('#btnparcial').bind('click', function () { AFECTACION_PARCIAL('#btnparcial'); });

            $('#btnrparcial').bind('click', function () { RegresarParcial(); });
            $('#btnaparcial').bind('click', function () { AfectacionParcial('P');  });

            $('#btnBmovimientos').bind('click', function () { condicion = ""; tipobusqueda = "M"; Buscar('#btnBmovimientos', 'M'); });
            $('#btnLmovimientos').bind('click', function () { condicion = ""; Limpiar('#btnLmovimientos', '#txtmovimientos'); });

            $('#btnBdocumentos').bind('click', function () { condicion = ""; tipobusqueda = "D"; Buscar('#btnBdocumentos', 'D'); });
            $('#btnLdocumentos').bind('click', function () { condicion = ""; Limpiar('#btnLdocumentos', '#txtdocumentos'); });

            $('#btnregresarerrores').bind('click', function () { RegresarErrores(); });
            $('#btnrdocumentos').bind('click', function () { RegresarDocumentos(); });

            $('#btnfiltrarcat').bind('click', function () {  FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat", $.session.get('camposeleccion')); });
            $('#btnfiltrardoc').bind('click', function () { FILTRAR_CAT("#dgdoc", "#txtvaldoc", "#cbocamdoc", "#cbocondoc", $.session.get('camposeleccion')); });

            $('#btnAceptar').bind('click', function () { getSelections(); });
            $('#btnCerrar').bind('click', function () { Cerrar_Busqueda(); });

            $('#btnArubros').bind('click', function () { getCheckedSel(); });
            $('#btnCrubros').bind('click', function () { $("#winrubro").window('close'); });

        $('#btnNomActual').bind('click', function () {VALOR_NOMINA_ACTUAL('#btnNomActual');});
      
    }
    else { $.messager.alert('Error', 'Falta el parametro del tipo de movimiento', 'error'); }
});
$(window).load(function () {
    SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Afectacion';
    parametros.tipomov = tipoMov;
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            if (data.d[0] == 'C') {$('#lblbloqueada').hide();}
            else { $('#lblbloqueada').show(); }

            if (data.d[0] == "C") {
                $('#btncompleta').linkbutton({ disabled: false });
                $('#btnparcial').linkbutton({ disabled: false });
            }
            else {
                $('#btncompleta').linkbutton({ disabled: true });
                $('#btnparcial').linkbutton({ disabled: true });
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

function AFECTACION_PARCIAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        VALIDAR_MULTINOMINA('#btnparcial', 'P'); $('#loading').hide();
    }
}

function AFECTACION_COMPLETA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.session.set('tipoafec', "C");
        VALIDAR_MULTINOMINA('#btncompleta', 'C'); $('#loading').hide();
    }
}

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
           // $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#lblnominas').hide();
                $('#dextras').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);                
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
              
                valnomina = '';
                nominasel = '';
            }
          
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            //$('#loading').hide(100);
        }
    });
}

function CREAR_BONONES_NOMINAS_ANTERIORES(objm,obj) {
    $('#dextras').empty();
    // $('#dextras').append('<table cellpadding="2" id="tblm"></table>');
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
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

        if (objm.length == 1)
        {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            $nominasel = btn[0].text;
            valnomina = btn[0].name;
        }
    }
}

function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.session.set('valnomina', '');
        document.getElementById('lblquin1').innerHTML = "";        
        document.getElementById('lblquin1').innerHTML = $.session.get('nominaAct');        
    }
}

function SELECCIONAR_MOV() {
    var state = $('#btnmov').linkbutton('options')['selected'];
    if (state == false) {
        $.session.set('tipoafec', "R");
        $('#txtmovimientos').textbox('enable');
        $('#btnBmovimientos').linkbutton('enable');
        $('#btnLmovimientos').linkbutton('enable');

        $('#txtdocumentos').textbox('disable');
        $('#btnBdocumentos').linkbutton('disable');
        $('#btnLdocumentos').linkbutton('disable');
    }
}

function SELECCIONAR_DOC() {
    var state = $('#btndoc').linkbutton('options')['selected'];
    if (state == false) {
        $.session.set('tipoafec', "P");
        $('#txtmovimientos').textbox('disable');
        $('#btnBmovimientos').linkbutton('disable');
        $('#btnLmovimientos').linkbutton('disable');

        $('#txtdocumentos').textbox('enable');
        $('#btnBdocumentos').linkbutton('enable');
        $('#btnLdocumentos').linkbutton('enable');
        }
}

function RegresarParcial() {
    $('#dmenu').show();
    $('#dparcial').hide();
    valnomina = '';
    nominasel = '';
    SACAR_NOMINAS();
}

function RegresarErrores() {
    $('#dmenu').show();
    $('#dparcial').hide();
    $('#derror').hide();
    valnomina = '';
    nominasel = '';
}

function RegresarDocumentos() {    
    $('#dparcial').show();
    $('#ddoc').hide();    
}

function Limpiar(btnobj, txtobjeto) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $(txtobjeto).textbox('setValue', "");
    }
}

function CARGAR_LISTA(dgobjeto, txtobjeto,tipo, tabla, descripcion) {
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strfiltro = "";
    parametros.strtipo = "A";
    $.ajax({
        type: "POST",
        url: "Afectacion_Funsiones.aspx/ListarRubros",
        data: JSON.stringify(parametros),
        dataType: "json",        
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {        
            var obj = $.parseJSON(data.d[1]);
            if (data.d[2] != "")
            { var columnasbloquedas = jQuery.parseJSON(data.d[2]); }
            else { columnasbloquedas = ''; }

            var columnas = jQuery.parseJSON(data.d[3]);

            $.session.set('tiposdatos', data.d[4]);
            $.session.set('filtroscolumnas', data.d[5]);
            $.session.set('scrollv', 'No');
                        
            var valor;
            var dg = $(dgobjeto).datagrid({
                loadMsg: 'Processing, please wait ...',
                rownumbers: true,
                singleSelect: false,
                pagination: false,
                autoRowHeight: false,
                view: bufferview,
                pageSize: 18,
                frozenColumns: columnasbloquedas,
                data: obj,
                columns: columnas,
                onClickRow: function () {
                    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
                    var rows = $(dgobjeto).datagrid('getSelected');
                    if (rows) {                                               
                        valor = $(txtobjeto).textbox('getValue');

                        if (valor == "") { valor = rows[fields[0]]; }
                        else { valor = $(txtobjeto).textbox('getValue') + ',' + rows[fields[0]]; }

                         $(txtobjeto).textbox('setValue', valor);

                       // $("#win").window('close');
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
            if (tipo == "M") {               
                if (cvemodulo == "DP") { windows(350, 200, "Buscar Documentos"); }
                if (cvemodulo == "MC") { windows(400, 200, "Buscar Documentos"); }
                else { windows(540, 400, "Buscar Movimientos"); }                
            }
            if (tipo == "D") {               
                if (cvemodulo == "DP") { windows(350, 515, "Buscar Documentos"); }
                else { windows(900, 515, "Buscar Documentos"); }               
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

function BUSCAR_MOVIMIENTO(txtdoc) {
    if (txtdoc != '') {
        var parametros = {};
        parametros.modulo = tipoMov;
        parametros.movimiento = txtdoc;
        $.ajax({
            type: "POST",
            url: "Afectacion_Funciones.aspx/BuscarMovimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "0") {                  
                    cvemov = data.d[0];                  
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
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
    else { $.messager.alert('Advertencia', "Falta el documento a buscar", 'warning'); }
}

function CARGAR_MOVIMIENTOS() {
    var parametros = {};   
    parametros.strtipo = tipoMov;
    parametros.strclave = "";
    $.ajax({
        type: "POST",
        url: 'Afectacion_funciones.aspx/Listar_MovimientosPermisos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                var obj = $.parseJSON(data.d[1]);
                $('#lstrubros').tree({
                    data: obj,
                    formatter: function (node) {
                        return '<span title=\'' + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                    },
                });
                $('#lstrubros').tree('collapseAll');
            }
            else {
                $.messager.alert('Error', "No se tiene permisos del módulo " + document.getElementById('lbltitulo').innerHTML, 'error');
                //BTN_REGRESAR_MOVIMIENTO();
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

function Buscar(btnobj,strtipo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        if (strtipo == "M") {
           
            CARGAR_MOVIMIENTOS();
            $.session.set('camposeleccion', "#txtmovimientos");
            windows_porcentaje("#winrubro", '30%', '68%', false, false, false, 'Buscar Por Rubros');
        }
        if (strtipo == "D") {          
            DISEÑO_CAT('#dgcat', tbldoc, 'Buscar Documentos', '#cbocamcat');
            $.session.set('camposeleccion', "#txtdocumentos");
        }
    }
}

function AfectacionMovimientos(valores) {
    var parametros = {};
    parametros.tipoMov = tipoMov;
    parametros.tipo = $.session.get('tipoafec');
    parametros.valores = valores;   
    parametros.multi = valnomina;
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/Afectacion",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', "La afectación ha terminado", 'info');               

                $('#dmenu').hide();
                $('#dparcial').hide();
                $('#derror').show();

                if (data.d[1] != "") {
                    var obj = $.parseJSON(data.d[1]);                  
                    $('#dgcifra').datagrid({
                            pagination: false,
                            rownumbers: true,
                            pageSize: 10,
                            singleSelect: true,
                            striped: true,
                            width: "28%",
                            height: "300px",
                            data: obj,
                            columns: [[
                                { field: 'Estado', title: 'Estado', width: 100, align: 'center' },
                                { field: 'Conteo', title: 'Conteo', width: 100, align: 'center' },
                            ]],
                        });
                    }                

                if (data.d[2] != "") {
                    var obj = $.parseJSON(data.d[2]);
                    $('#dgerrores').datagrid({
                        pagination: false,
                        rownumbers: true,
                        pageSize: 10,
                        singleSelect: true,
                        striped: true,
                        width: "70%",
                        height: "200px",
                        data: obj,
                        columns: [[
                            { field: 'documento', title: 'Documento', width: 150, align: 'center' },
                            { field: 'tipo', title: 'Tipo', width: 300, align: 'center' },
                            { field: 'documentosRelacionados', title: 'Doc. Relacionados', width: 500, align: 'left' },
                            { field: 'error', title: 'Error', width: 600, align: 'left' },
                        ]],
                    });
                }            
            }
            else {               
                $('#dgerrores').hide();
                $('#dgcifra').hide();
                $('#dgbd').show();
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

function SeleccionParcial() {
    $('#dmenu').hide();
    $('#dparcial').show();

    //$('#loading').hide(100);
    document.getElementById('lblparcial').innerHTML = "Afectación Parcial"
    Limpiar('#btnLmovimientos','#txtmovimientos');
    Limpiar('#btnLdocumentos', '#txtdocumentos');
   
    //var nomina = $.session.get('nomina'); 

    document.getElementById('lblquin1').innerHTML = "";    
    document.getElementById('lblquin1').innerHTML = nominasel;

    if ((tipoMov == "TR") || (tipoMov == "ME"))
    {
        $('#txtmovimientos').textbox({ disabled: true });
        $('#btnmov').linkbutton({ disabled: true });
        $('#btnLmovimientos').linkbutton({ disabled: true });
        $('#btnBmovimientos').linkbutton({ disabled: true });
        $('#btndoc').linkbutton({ selected: true });

        $('#txtdocumentos').textbox({ disabled: false });
        $('#btndoc').linkbutton({ disabled: false });
        $('#btnLdocumentos').linkbutton({ disabled: false });
        $('#btnBdocumentos').linkbutton({ disabled: false });
    }
}

function AfectacionParcial() {    
    var valor = "";
   // var tipoa = $.session.get('tipoafectacion');
    var mov = $('#txtmovimientos').textbox('getValue');
    var doc = $('#txtdocumentos').textbox('getValue');
    if (mov != "")
    {
        valor = $('#txtmovimientos').textbox('getValue');
    }
    else
    if (doc != "")
    {
        valor = $('#txtdocumentos').textbox('getValue');
    }

    if (valor == "")
    { $.messager.alert('Error', 'Falta selecciona un movimiento o documento para afectar', 'error'); }
    else
    {
        $('#loading').show();
        AfectacionMovimientos(valor);        
    }
}


function CARGAR_ERRORES(dgcontrol, tabla, filtro) {   
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strfiltro = filtro;
    parametros.strtipo = "A";
    var obj;
    var columnas = [];
    var columnasbloquedas = [];
    $.ajax({
        type: "POST",
        url: "Afectacion_Funsiones.aspx/ListarCatalogoNiveles",
        data: JSON.stringify(parametros),
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
           
           // ancho del grid
            if (data.d[5] != "")
            { anchotabla = data.d[5] + "%"; }
            else { anchotabla = "100%"; }
                      
              //  datos del grid
                obj = $.parseJSON(data.d[7]);           

           // bloqueo de columnas
            if (data.d[8] != "")
            { columnasbloquedas = jQuery.parseJSON(data.d[8]); }
            else { columnasbloquedas = []; }
            
                //diseño del grid
                columnas = jQuery.parseJSON(data.d[9]);
           
           // columnas de filtros
            sessionStorage.setItem('filtroscolumnas', data.d[11]);

            $(dgcontrol).datagrid({
                rownumbers: true,
                singleSelect: true,
                pagination: false,
                autoRowHeight: false,
                striped: true,
                width: anchotabla,
                height: altoerror,
                fitColumns:false,
                frozenColumns: columnasbloquedas,
                data: obj,
                columns: columnas,
              
            });                 
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

function getSelections() {
    var ss = [];
    var rows = $('#dgcat').datagrid('getSelections');
    var fields = $('#dgcat').datagrid('getColumnFields', true).concat($('#dgcat').datagrid('getColumnFields', false));
    if (rows.length > 0) {
        for (var i = 0; i < rows.length; i++) {            
            var row = rows[i];
           // ss += row[fields[1]] + ","
            ss.push(row[fields[1]]);
            ss.join(',');
        }
        //ss = ss.substring(0, ss.length - 1);
        var tipoa=$.session.get('tipoafectacion');
        if (tipoa == "P") { $($.session.get('camposeleccion')).textbox('setValue', ss); }
        else { $($.session.get('camposeleccion')).textbox('setValue', ss); }
        $("#wincat").window('close');
    }
    else { $.messager.alert('Error', 'Falta seleccionar el registro a afectar', 'error'); }
}

function getCheckedSel() {
    var nodes = $('#lstrubros').tree('getChecked', ['checked', 'indeterminate']);
    var ss = [];
    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].checked == true) {
            ss.push(nodes[i].nombre);
            ss.join(',');
        }
    }
    if (ss != "") {       
        var tipoa = $.session.get('tipoafectacion');
        if (tipoa == "P") { $($.session.get('camposeleccion')).textbox('setValue', ss); }
        else { $($.session.get('camposeleccion')).textbox('setValue', ss); }
        $("#winrubro").window('close');
    }
    else { $.messager.alert('Error', 'Falta seleccionar el movimiento a afectar', 'error'); }
}


function Cerrar_Busqueda()
{
    $("#wincat").window('close');
}

function DISEÑO_CAT(dgcontrol, strtabla, descripcion,  objcampo) {
    var parametros = {};
    parametros.strtabla = strtabla;
  
    var $datagrid = {};
    var columns = new Array();
    var frozenColumns = new Array();

    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/ConfiguracionGrid",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var datos;
            if (data.d[3] != "") {
                var colbloquedas = data.d[3].split('|');
                for (var col = 0; col < colbloquedas.length; col++) {
                    datos = colbloquedas[col].split(',');
                    var valor = datos[0];
                    var alinear = datos[1];
                    var titulo = datos[2];
                    ancho = datos[3] + "px";

                    frozenColumns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                }
                $datagrid.frozenColumns = new Array(frozenColumns);
            }
              if (data.d[2] != "") {
                var columnas = data.d[2].split('|');
                for (var col = 0; col < columnas.length; col++) {
                    datos = columnas[col].split(',');
                    if (datos[0] != 'chk') {
                        var valor = datos[0];
                        var alinear = datos[1];
                        var titulo = datos[2];
                        ancho = datos[3] + "px";
                        columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                    }
                    else {
                        var valor = datos[0];                       
                        columns.push({ "field": valor,"checkbox":true });
                    }
                    
                }
                $datagrid.columns = new Array(columns);
                $(dgcontrol).datagrid({ columns: "", url: "" });
                $(dgcontrol).datagrid($datagrid);

                $('#txtvalcat').textbox('setValue', "");
                $('#cboconcat').combobox('setValue', "like");
                $.session.set('condicion', "")

                CARGAR_CAT(dgcontrol, strtabla);
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                CARGAR_CAMPOSBUSQUEDA_COL(dgcontrol, objcampo,1);
                
                //windows("#wincat", data.d[0], data.d[1], descripcion);
               
                windows_porcentaje("#wincat", data.d[0], data.d[1], false, false, false, descripcion);

            }
            else { $.messager.alert('Error', 'Se requiere configurar la busqueda', 'error'); }
        }
    });

}
function CARGAR_CAT(dgcontrol, strtabla) {
    var con = "";
    if (condicion != "") { con = condicion; }
    $(dgcontrol).datagrid({
        url: "Listar_Catalogo.aspx?tabla=" + strtabla + "&busqueda=" + con+"&multi="+valnomina,
        pagination: false,
        scrollbar:true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        frozen:true,
        //pageSize: 20,       
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                $($.session.get('camposeleccion')).textbox('setValue', rows[fields[0]]);                
               
                //$("#wincat").window('close'); 
            }
        }
    });
}
function FILTRAR_CAT(dgobjeto, txtvalor, cbcampos, cbocon, txtval) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbcampos).combobox('getValue');
        var vcondicion = $(cbocon).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' (\'\'' + vvalor + '\'\')'; }           
        }
        else { condicion=""; }
    }
    else { condicion = ""; }

    if (tipobusqueda == "M") { strtabla = tblmov; }
    else { strtabla = tbldoc; }

    CARGAR_CAT(dgobjeto, strtabla);
}

function VALIDAR_MULTINOMINA(btnobj,tipobtn)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#loading').show();
        if ((valnomina != undefined) && (valnomina != '')) {
            var parametros = {};
            parametros.multi = valnomina;
            $.ajax({
                type: "POST",
                url: "Afectacion_Funciones.aspx/Validacion_Multinomina",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                   // $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1") {
                        if (tipobtn == 'C') { $.session.set('tipoafectacion', 'C'); AfectacionMovimientos(""); }
                        else
                            if (tipobtn == 'P') { $.session.set('tipoafectacion', 'P'); SeleccionParcial(); }
                    }
                    else {                        
                        $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                        SACAR_NOMINAS();
                    }                    
                },
                error: function (er) {
                    $('#loading').hide();
                    $.messager.alert('Error', er.statusText, 'error');
                },
                complete: function () {
                  //  $('#loading').hide(100);
                }
            });
        }
        else { $('#loading').hide(100); $.messager.alert('Error', 'Falta seleccionar la nomina a afectar', 'error'); }
    }
}

