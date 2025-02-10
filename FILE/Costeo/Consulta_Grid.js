var tipo ="";
var filtro = '';
var conceptos = '';
var canceladas = '';
var contplazas = 0;
$(document).ready(function () {
  
    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = 'Costo'; }
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = 'numemppl:27881' }//cvetpl:ADMON|cvepuepl:BAA3001|
    if ($_GET('conceptos') != null) {
        conceptos = $_GET('conceptos');
    } else { conceptos = '' }

    if ($_GET('canceladas') != null) {
        canceladas = $_GET('canceladas');
    } else { canceladas = '' }
    if ($_GET('btntipo') != null) {
        btntipo = $_GET('btntipo');
    } else { btntipo = '' }


    $('#btnExcel').bind('click', function () {
       // if (tipo == 'Proyeccion') {
            //$('#dgcosto').datagrid('toExcel', 'Proyeccion.xls');            
        //}
        //else {
        //$('#dgdatos').datagrid('toExcel', 'Costo.xls');
        //}

        //$('#dgdatos').datagrid('toExcel', {
        //    filename: tipo+'.xls',
        //    worksheet: tipo
        //});

        //windows("#wdialogo", 500, 140, false, "Nombre del Archivo");
        //TXTFOCUS('#txtnombre');
        //$('#txtnombre').textbox('setValue', tipo);

       // var rows = $('#dgdatos').datagrid('getRows');
     
    });

    $('#btnAceptar').bind('click', function () {
        Descargar_Excel();
    });

    $('#wdialogo').window({
        onBeforeClose: function () {           
            return true;
        }
    });

    //$('#dgcosto').datagrid({
    //   url: "ListarProceso.aspx?tipo=" + tipo + "&filtro=" + filtro + "&conceptos=" + conceptos+ "&canceladas=" + canceladas
    //});

    $('#btnExcel').linkbutton({ disabled: false });

    $('#btnRegresar').bind('click', function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", "filtro="+filtro+"&btntipo=" + btntipo); }
        else {
            IR_PAGINA("costeo.aspx", "btntipo=" + btntipo);
            //window.location("costeo.aspx?btntipo=" + btntipo)            
        }
    });
    
    CARGAR_DATOS();
   
});



function CARGAR_COSTEO() {
    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.filtro = filtro,
    parametros.conceptos = conceptos,
    parametros.canceladas = canceladas
    $.ajax({
        type: "POST",
        url: "funsiones.aspx/proceso_costeo",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(parametros),
        cache: "false",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "1") {
                obj1 = $.parseJSON(data.d[0]);
                obj2 = $.parseJSON(data.d[1]);
                obj3 = $.parseJSON(data.d[2]);
                contplazas = data.d[3];
                $("#dgdatos").kendoGrid({
                    sortable: true,
                    pageable: true,
                    groupable: false,
                    filterable: false,
                    columnMenu: false,
                    reorderable: false,
                    resizable: true,
                    height: 680,
                    //toolbar: ["excel"],
                    //excel: {
                    //    fileName: tipo + ".xlsx",
                    //     proxyURL: "https://demos.telerik.com/kendo-ui/service/export",
                    //    filterable: true
                    //},
                    dataSource: {
                        data: obj1,
                        schema: {
                            model: {
                                id: "Plzas",
                                fields: {
                                    Plaza: { type: "string" },
                                    Nombre: { type: "string" },
                                    Organismo: { type: "string" },
                                    Categoria: { type: "string" },
                                    DescCategoria: { type: "string" },
                                    Adscripcion: { type: "string" },
                                    DescAdscripcion: { type: "string" },
                                    UR: { type: "string" },
                                    MensualLiquido: { type: "number" },
                                    AnualPresupuestal: { type: "number" },
                                }
                            }
                        }
                    },
                    columns: [
                         {
                             field: "Plaza", title: "Plaza", width: 90,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Nombre", title: "Nombre", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Organismo", title: "Organismo", width: 120,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Categoria", title: "Categoria", width: 100,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "DescCategoria", title: "Desc. Categoria", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Adscripcion", title: "Adscripcion", width: 120,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "DescAdscripcion", title: "Desc. Adscripcion", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "UR", title: "UR", width: 250,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "MensualLiquido", title: "Mensual Liquido", format: "{0:c}", width: 150,
                             attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "AnualPresupuestal", title: "Anual Presupuestal", format: "{0:c}", width: 180,
                             attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                             headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         }
                    ],                   
                    detailInit: detailInit,
                    dataBound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                    },
                    excelExport: function (e) {
                        e.preventDefault();

                        var workbook = e.workbook;

                        detailExportPromises = [];

                        var masterData = e.data;

                        for (var rowIndex = 0; rowIndex < masterData.length; rowIndex++) {
                            exportChildData(masterData[rowIndex].Plaza, rowIndex);
                        }

                        $.when.apply(null, detailExportPromises)
                        .then(function () {
                            // Get the export results.
                            var detailExports = $.makeArray(arguments);

                            // Sort by masterRowIndex.
                            detailExports.sort(function (a, b) {
                                return a.masterRowIndex - b.masterRowIndex;
                            });

                            // Add an empty column.
                            workbook.sheets[0].columns.unshift({
                                width: 30
                            });

                            // Prepend an empty cell to each row.
                            for (var i = 0; i < workbook.sheets[0].rows.length; i++) {
                                workbook.sheets[0].rows[i].cells.unshift({});
                            }

                            // Merge the detail export sheet rows with the master sheet rows.
                            // Loop backwards so the masterRowIndex does not need to be updated.
                            for (var i = detailExports.length - 1; i >= 0; i--) {
                                var masterRowIndex = detailExports[i].masterRowIndex + 1; // compensate for the header row

                                var sheet = detailExports[i].sheet;

                                // Prepend an empty cell to each row.
                                for (var ci = 0; ci < sheet.rows.length; ci++) {
                                    if (sheet.rows[ci].cells[0].value) {
                                        sheet.rows[ci].cells.unshift({});
                                    }
                                }

                                // Insert the detail sheet rows after the master row.
                                [].splice.apply(workbook.sheets[0].rows, [masterRowIndex + 1, 0].concat(sheet.rows));
                            }

                            // Save the workbook.
                            kendo.saveAs({ dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(), fileName: tipo + ".xlsx" });
                        });
                    }
                });
            }
            else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

            alert('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

            alert('Time out error.');

        } else if (textStatus === 'abort') {

            alert('Ajax request aborted.');

        } else {

            alert('Uncaught Error: ' + jqXHR.responseText);

        }
    });
}

function exportChildData(EmployeeID, rowIndex) {
    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{
        cells: [
          // First cell.
          { value: "OrderID" },
          // Second cell.
          { value: "Freight" },
          // Third cell.
          { value: "ShipName" },
          // Fourth cell.
          { value: "OrderDate" },
          // Fifth cell.
          { value: "ShipCity" }
        ]
    }];

    dataSource.filter({ field: "Plaza", operator: "eq", value: Plaza });

    var exporter = new kendo.ExcelExporter({
        columns: [{
            field: "Enero"
        }, {
            field: "Febrero"
        }, {
            field: "Marzo"
        }, {
            field: "Abrirl"
        },{
            field: "Mayo"
        },{
            field: "Junio"
        }, {
            field: "Julio"
        }, {
            field: "Agosto"
        }, {
            field: "Septiembre"
        }, {
            field: "Octubre"
        }, {
            field: "Noviembre"
        }, {
            field: "Diciembre"
        }],
        dataSource: dataSource
    });

    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });
}

function detailInit(e) {
    var detailRow = e.detailRow;
    detailRow.find(".dgcalendario").kendoGrid({
        dataSource: {
            data: obj2,
            schema: {
                model: {
                    id: "Plazas",
                    fields: {
                        Enero: { type: "number" },
                        Febrero: { type: "number" },
                        Marzo: { type: "number" },
                        Abril: { type: "number" },
                        Mayo: { type: "number" },
                        Junio: { type: "number" },
                        Julio: { type: "number" },
                        Agosto: { type: "number" },
                        Septiembre: { type: "number" },
                        Octubre: { type: "number" },
                        Nobiembre: { type: "number" },
                        diciembre: { type: "number" },
                    }
                }
            }
        },
        scrollable: false,
        sortable: false,
        pageable: false,
        columns: [
                  {
                      field: "Enero", title: "Enero", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                    {
                        field: "Febrero", title: "Febrero", format: "{0:c}", width: 100,
                        attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                        headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                    },
                  {
                      field: "Marzo", title: "Marzo", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                    {
                        field: "Abril", title: "Abril", format: "{0:c}", width: 100,
                        attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                        headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                    },
                  {
                      field: "Mayo", title: "Mayo", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Junio", title: "Junio", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Julio", title: "Julio", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Agosto", title: "Agosto", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Septiembre", title: "Septiembre", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Octubre", title: "Octubre", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Noviembre", title: "Noviembre", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "Diciembre", title: "Diciembre", format: "{0:c}", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
                      headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
        ]
    });
}


function CARGAR_DATOS() {
    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.filtro = filtro,
    parametros.conceptos = conceptos,
    parametros.canceladas = canceladas
    $.ajax({
        type: "POST",
        url: "funsiones.aspx/proceso_costeo",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(parametros),
        cache: "false",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "1") {
                obj1 = $.parseJSON(data.d[0]);
                obj2 = $.parseJSON(data.d[1]);
                obj3 = $.parseJSON(data.d[2]);
                contplazas = data.d[3];
                $('#dgdatos').datagrid({
                    data: obj1,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    autoRowHeight: false,
                    autoUpdateDetail:true,
                    striped: true,
                    pageSize: 50,
                    view: detailview,
                    detailFormatter: function (index, row) {
                        return '<div style="padding:2px;position:relative;"><table class="ddv"></table></div><div style="padding:2px;position:relative;"><table class="ddv2"></table></div>';
                    },
                    onExpandRow: function (index, row) {
                        var ddv = $(this).datagrid('getRowDetail', index).find('table.ddv');                        
                        var valor=row["Plaza"];
                        var filobj2 = jQuery.grep(obj2, function (Calendario, i) {
                            return Calendario.Plaza == valor;
                        });
                        var ddv2 = $(this).datagrid('getRowDetail', index).find('table.ddv2');
                        var filobj3 = jQuery.grep(obj3, function (Conceptos, i) {
                            return Conceptos.Plaza == valor;
                        });
                        ddv.datagrid({
                            data: filobj2,
                            fitColumns: true,
                            singleSelect: true,
                            rownumbers: true,
                            striped: true,
                            loadMsg: '',
                            height: 'auto',
                            columns: [[                               
                                { field: 'Enero', title: 'Enero',align: 'right' },
                                { field: 'Febrero', title: 'Febrero', align: 'right' },
                                { field: 'Marzo', title: 'Marzo',align: 'right' },
                                { field: 'Abril', title: 'Abril',align: 'right' },
                                { field: 'Mayo', title: 'Mayo',align: 'right' },
                                { field: 'Junio', title: 'Junio',align: 'right' },
                                { field: 'Julio', title: 'Julio',align: 'right' },
                                { field: 'Agosto', title: 'Agosto',align: 'right' },
                                { field: 'Septiembre', title: 'Septiembre',align: 'right' },
                                { field: 'Octubre', title: 'Octubre',align: 'right' },
                                { field: 'Noviembre', title: 'Noviembre',align: 'right' },
                                { field: 'Diciembre', title: 'Diciembre', align: 'right' }                              
                            ]],
                            onResize: function () {
                                $('#dgdatos').datagrid('fixDetailRowHeight', index);
                            },
                            onLoadSuccess: function () {
                                setTimeout(function () {
                                    $('#dgdatos').datagrid('fixDetailRowHeight', index);
                                }, 0);
                            }
                        });                       
                        ddv2.datagrid({
                            data: filobj3,
                            fitColumns: true,
                            singleSelect: true,
                            rownumbers: true,
                            striped: true,
                            loadMsg: '',
                            height: 'auto',
                            columns: [[                              
                                { field: 'Tipo', title: 'Tipo', align: 'center' },
                                { field: 'Concepto', title: 'Concepto', align: 'center' },
                                { field: 'Gasto', title: 'Gasto', align: 'center' },
                                { field: 'Descripcion', title: 'Descripción', align: 'left' },
                                { field: 'CostoAnual', title: 'Costo Anual', align: 'right' },
                                { field: 'TipoPago', title: 'Tipo de Pago', align: 'center' },
                                { field: 'QnaAplica', title: 'Quincena de Aplicación', align: 'center' }
                            ]],
                            onResize: function () {
                                $('#dgdatos').datagrid('fixDetailRowHeight', index);
                            },
                            onLoadSuccess: function () {
                                setTimeout(function () {
                                    $('#dgdatos').datagrid('fixDetailRowHeight', index);
                                }, 0);
                            }
                        });
                        $('#dgdatos').datagrid('fixDetailRowHeight', index);
                    }
                });                
            }
            else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

            alert('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

            alert('Time out error.');

        } else if (textStatus === 'abort') {

            alert('Ajax request aborted.');

        } else {

            alert('Uncaught Error: ' + jqXHR.responseText);

        }
    });
}

//function CARGAR_DATOS()
//{
//    var parametros = {};
//    parametros.tipocosto = tipo;
//    parametros.filtro = filtro,
//    parametros.conceptos = conceptos,
//    parametros.canceladas = canceladas
//    $.ajax({
//        type: "POST",
//        url: "funsiones.aspx/proceso_costeo",
//        dataType: "json",
//        contentType: "application/json; charset=utf-8",
//        data: JSON.stringify(parametros),
//        cache: "false",
//        beforeSend: function () {
//            $('#loading').show();
//        },
//        success: function (data) {
//            if (data.d[0] != "1") {
//                obj1 = $.parseJSON(data.d[0]);
//                obj2 = $.parseJSON(data.d[1]);
//                obj3 = $.parseJSON(data.d[2]);
//                contplazas = data.d[3];
//                $('#dgdatos').datagrid({
//                    data: obj1,
//                    pagination: false,
//                    enableFilter: false,
//                    rownumbers: true,
//                    singleSelect: true,
//                    autoRowHeight: false,
//                    striped: true,
//                    pageSize: 50,
//                    onClickRow: function () {
//                        if (contplazas != "1")
//                            var fields = $('#dgdatos').datagrid('getColumnFields', true).concat($('#dgdatos').datagrid('getColumnFields', false));
//                            rows = $('#dgdatos').datagrid('getSelected');
//                            if (rows) {
//                                var filobj2 = jQuery.grep(obj2, function (Calendario, i) {
//                                    return Calendario.Plaza == rows[fields[0]];
//                                });
//                                var filobj3 = jQuery.grep(obj3, function (Costo, i) {
//                                    return Costo.Plaza == rows[fields[0]];
//                                });
//                                cargar_detalle(filobj2, filobj3);
//                            }
//                      }
//                });
//                if (contplazas == "1")
//                 {cargar_detalle(obj2, obj3);}
//            }
//            else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
//        },
//        error: function (err) {
//            $('#loading').hide(100);
//            $.messager.alert('Error', err.statusText, 'error');
//        },
//        complete: function ()
//        { $('#loading').hide(100); }
//    }).fail(function (jqXHR, textStatus, errorThrown) {
//        if (jqXHR.status === 0) {

//            alert('Not connect: Verify Network.');

//        } else if (jqXHR.status == 404) {

//            alert('Requested page not found [404]');

//        } else if (jqXHR.status == 500) {

//            alert('Internal Server Error [500].');

//        } else if (textStatus === 'parsererror') {

//            alert('Requested JSON parse failed.');

//        } else if (textStatus === 'timeout') {

//            alert('Time out error.');

//        } else if (textStatus === 'abort') {

//            alert('Ajax request aborted.');

//        } else {

//            alert('Uncaught Error: ' + jqXHR.responseText);

//        }
//    });
//}

function cargar_detalle(obj2, obj3)
{
    $('#dgcalendario').datagrid({
        data: obj2,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 50
    });
    $('#dgcosto').datagrid({
        data: obj3,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 50
    });
   
}

function Descargar_Excel()
{
    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.nomarchivo = $('#txtnombre').textbox('getValue');
    $.ajax({
        type: "POST",
        url: "funsiones.aspx/GENERA_EXCEL",
        dataType: "json",
        contentType: "application/json; charset=utf-8",        
        data: JSON.stringify(parametros),
        cache: "false",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Error', "No existen datos a costear", 'error');
            }
            else { window.open('../Descargas_Archivos/Descargar_Excel.aspx?Fileid=' + $('#txtnombre').textbox('getValue')); }
            $('#wdialogo').window('close');

        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

            alert('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

            alert('Time out error.');

        } else if (textStatus === 'abort') {

            alert('Ajax request aborted.');

        } else {

            alert('Uncaught Error: ' + jqXHR.responseText);

        }
    });
}



