var tipo = "";
var vmod = ""

var filtro = "";
var altodg = "";
var anchodg = "";
var valnomina = "";
var nominasel = "";

$(document).ready(function () {

   var tipoMov = $_GET('tipo');
   if ($_GET('tipo') != null) { vmod = tipoMov; }
   else { vmod = 'MP'; }

    document.getElementById('lbltitulo').innerHTML = 'cifras de control';

    var titulo = $_GET('titulo');
    if (titulo != undefined)
    { document.getElementById('lbltitulo').innerHTML = titulo; }
    else { titulo = "Cifras De Control (Movimientos De Personal)"; }

    //tblcifra = "CifrasControl" + vtipo; tblafec = "CifrasControl" + vtipo + "_Afec"; tblpen = "CifrasControl" + vtipo + "_Pend"; tblrech = "CifrasControl" + vtipo + "_Rech"; nivel = "Cifras de Control";
   
    if (vmod != 'PL') { $('#dbotones').show(); }
    else { $('#dbotones').hide(); $('#menu').hide(); }

    $('#btnCifras').bind('click', function () { $('#divfiltro').hide(); tipo = ''; DISEÑO_DG('#dg'); });//document.getElementById('lblnivel').innerHTML = "Cifras de Control";
    $('#btnAfectados').bind('click', function () { $('#divfiltro').show(); tipo = 'A'; DISEÑO_DG('#dg'); });//document.getElementById('lblnivel').innerHTML = "Movimientos Afectados";
    $('#btnPendientes').bind('click', function () { $('#divfiltro').show(); tipo='P'; DISEÑO_DG('#dg'); });//document.getElementById('lblnivel').innerHTML = "Movimientos Pendientes"; 
    $('#btnRechazados').bind('click', function () { $('#divfiltro').show(); tipo='R'; DISEÑO_DG('#dg'); });//document.getElementById('lblnivel').innerHTML = "Movimientos Rechazados"; 

    $('#btnExpotar').bind('click', function () {
        ExporterExcel();
        //$('#dg').datagrid('toExcel', 'text.xls'); 
    });

    $('#btnfiltrar').bind('click', function () { FILTRAR_DG($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });
    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_DG($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });

    $('#btnRMenu').bind('click', function () { REGRESAR_MENU(); });

    //$.extend($.fn.datagrid.methods, {
    //    toExcel: function (jq, filename) {
    //        return jq.each(function () {
    //            var uri = 'data:application/vnd.ms-excel;base64,'
    //            , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    //            , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    //            , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }

    //            var alink = $('<a style="display:none"></a>').appendTo('body');
    //            var view = $(this).datagrid('getPanel').find('div.datagrid-view');
    //            var table = view.find('div.datagrid-view2 table.datagrid-btable').clone();
    //            var tbody = table.find('>tbody');
    //            view.find('div.datagrid-view1 table.datagrid-btable>tbody>tr').each(function (index) {
    //                $(this).clone().children().prependTo(tbody.children('tr:eq(' + index + ')'));
    //            });
    //            var ctx = { worksheet: name || 'Worksheet', table: table.html() || '' };
    //            alink[0].href = uri + base64(format(template, ctx));
    //            alink[0].download = filename;
    //            alink[0].click();
    //            alink.remove();
    //        })
    //    }
    //});   

    $('#btnNomActual').bind('click', function () { VALOR_NOMINA_ACTUAL('#btnNomActual'); });

    SACAR_NOMINAS();  
});

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#dnomina').show();
                $('#dmenu').hide();
                $('#lblnominas').hide();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
            }
            else {
                $('#dmenu').hide();
                $('#lblnominas').show();
                $('#dnomina').show();
                valnomina = '';
                nominasel = '';
            }

            //if (obj[0].Tipo == 'Abierta') {
            //    $('#btnNomActual').linkbutton({ text: obj[0].Seleccion });
            //    $.session.set('valnomina', '');
            //    $('#lblnominas').hide();
            //    $.session.set('nominaAct', obj[0].Seleccion);
            //    $('#btnNomActual').linkbutton({ disabled: false });
            //    $('#btnNomActual').linkbutton('select');

            //    if (objM.length==0){
            //       $('#dextras').hide();
            //       $('#dnomina').hide();
            //       $('#menu').hide();
            //       $('#dmenu').show();
            //       $('#divfiltro').hide();
            //       DISEÑO_DG('#dg', tblcifra);
            //   }
            //}
            //else
            // if (obj[0].Tipo == 'Cerrada') {                
            //     $.session.set('nominaAct', '');

            //     if (objM.length == 0) { $('#lblnominas').show(); }
            //     else { $('#lblnominas').hide(); }

            //    $('#btnNomActual').linkbutton({ text: obj[0].Cierre });
            //    $('#btnNomActual').linkbutton({ disabled: true });
            //    $('#btnNomActual').linkbutton('unselect');
            //    $('#dnomina').show();
            //    $('#btnNomActual').hide();                
            //}
            //if (objM.length > 0) {                
            //    if ((obj[0].Tipo == 'Cerrada') && (objM.length == 1))
            //    {
            //        DISEÑO_DG('#dg', tblcifra);
            //        $('#dmenu').show();
            //        $('#menu').hide();
            //        $('#dextras').hide();
            //        $('#dnomina').hide();
            //    }
            //}           
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
    //$('#dextras').append('<table cellpadding="2" id="tblm"></table>');
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 80%;"></table>');
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
            VALIDAR_MULTINOMINA();
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            $('#dnomina').hide();
            $('#menu').hide();
            $('#dmenu').show();
            DISEÑO_DG('#dg');
        }
    }
}

function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        VALIDAR_MULTINOMINA();               
    }
}

function VALIDAR_MULTINOMINA() {
   
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
            if (data.d[0] == "0") {               
                $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                SACAR_NOMINAS();                
            }
            else {               
                document.getElementById('lblquin1').innerHTML = "";
                document.getElementById('lblquin1').innerHTML = nominasel;

                $('#dnomina').hide();
                $('#dmenu').show();
                DISEÑO_DG('#dg');
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

function REGRESAR_MENU()
{
    $('#dnomina').show();
    $('#dmenu').hide();
    $('#divfiltro').hide();
    nominasel = '';
    valnomina = '';
}

function ExporterExcel() {
    var rows = $('#dg').datagrid('getRows');
    var columns = $("#dg").datagrid("options").columns[0];
    var oXL = new ActiveXObject("Excel.Application");
    var oWB = oXL.Workbooks.Add();
    var oSheet = oWB.ActiveSheet;
    oSheet.name = "Excel";
    for (var i = 0; i < columns.length; i++) {
        oSheet.Cells(1, i + 1).value = columns[i].title;
        for (var i = 0; i < rows.length; i++) {
            for (var j = 0; j < columns.length; j++) {
                oSheet.Cells(i + 2, j + 1).value = rows[i][columns[j].field];
            }
        }
        oXL.Visible = true;
    }
}

function DISEÑO_DG(dgcontrol) {
    var parametros = {};
    parametros.modulo = vmod
    parametros.tipo = tipo;
    parametros.condicion = '';
    parametros.multi = valnomina;

        var $datagrid = {};
        var columns = new Array();

        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Diseño_Cat",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                var datos;
                var objdatos = $.parseJSON(data.d[0]);
                var objdiseño = $.parseJSON(data.d[1]);
               // if (objdatos.length>0) {
                    var columnas = objdiseño[0].ColumnasGrid.split('|');
                    for (var col = 0; col < columnas.length; col++) {
                        datos = columnas[col].split(',');
                        var valor = datos[0];
                        var alinear = datos[1];
                        var titulo = datos[2];
                        var ancho = datos[3] + "px";
                        var alias = datos[4];

                        columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                    }
                    $datagrid.columns = new Array(columns);
                    $(dgcontrol).datagrid({ columns: "", url: "" });
                    $(dgcontrol).datagrid($datagrid);

                    if (objdiseño[0].anchotabla != "")
                    { anchodg = objdiseño[0].anchotabla; }
                    else { anchodg = 100; }

                    if (objdiseño[0].altotabla != "")
                    {
                        altodg = objdiseño[0].altotabla;
                    }
                    else { altodg = 100; }

                    $(dgcontrol).datagrid('loadData', { "total": 0, "rows": [] });
                    CARGAR_DG(dgcontrol, anchodg, altodg);
                    CAMPOS_BUSQUEDA_COLUMNAS("#dg", "#cbocam", columnas);
                //}
                //else { $.messager.alert('Error', 'Se requiere configurar la busqueda', 'error'); }
            }
        });
    }
function CARGAR_DG(dgcontrol, anchodg, altodg) {
var con = "";
if (filtro == null) { con = ""; }
else
    if (filtro!= "") { con = filtro; }
       $("#dg").datagrid({
           url: "ListarCatalogo.aspx?modulo=" + vmod +"&tipo="+tipo+"&busqueda=" + con + "&multi="+valnomina,
            pagination: false,
            enableFilter: false,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            pageSize: 10,
            width: anchodg + "%",
            //heigth: "550px",            
            onClickRow: function () {
                //rows = $(dgcontrol).datagrid('getSelected');
                //if (rows) {
                //    var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));


                //}
            }
        });
}
function FILTRAR_DG(cbocampo, cbocondicion, txtvalor) {
        var condicion;
        if (txtvalor != "") {
            if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'|' + txtvalor + '|\'\''; }
            else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }
            filtro=condicion;
        }
        else { filtro=''; }
        DISEÑO_DG("#dg");       
    }


