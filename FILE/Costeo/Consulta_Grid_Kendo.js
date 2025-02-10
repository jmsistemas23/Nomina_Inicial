var tipo ="";
var filtro = '';
var conceptos = '';
var canceladas = '';
var contplazas = 0;

$(document).ready(function () {
   // ?tipo=Costo&filtro=numplaza:35774&conceptos=&canceladas=0&btntipo=0

    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = 'costo'; }
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = 'numplaza:35774' }//cvetpl:ADMON|cvepuepl:BAA3001|
    if ($_GET('conceptos') != null) {
        conceptos = $_GET('conceptos');
    } else { conceptos = '' }

    if ($_GET('canceladas') != null) {
        canceladas = $_GET('canceladas');
    } else { canceladas = '0' }
    if ($_GET('btntipo') != null) {
        btntipo = $_GET('btntipo');
    } else { btntipo = '' }


    $('#btnExcel').bind('click', function () {
        // Export all detail grids.
        $("#grid [data-role=grid]").each(function () {
            $(this).data("kendoGrid").saveAsExcel();
        });
    });

  
    //$('#btnExcel').linkbutton({ disabled: false });

    $('#btnRegresar').bind('click', function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", "filtro="+filtro+"&btntipo=" + btntipo); }
        else {
            IR_PAGINA("costeo.aspx", "btntipo=" + btntipo);
            //window.location("costeo.aspx?btntipo=" + btntipo)            
        }
    });
    
    CARGAR_COSTEO();

    
   
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
                    serverPaging: false,
                    serverSorting: false,
                    serverFiltering: false,
                    sortable: true,
                    pagination:false,
                    pageable: false,
                    groupable: false,
                    filterable: false,
                    columnMenu: false,
                    reorderable: false,
                    resizable: true,                  
                    height: 680,                    
                    toolbar: ["excel"],                   
                    detailInit: detailInit,                  
                    dataSource: {
                            data: obj1,                       
                    },
                    schema: {
                        model: {
                            fields: {
                                MensualLiquido: { type: "number" },
                                AnualPresupuestal: { type: "number" },                               
                            }
                        }
                    },
                    columns: [
                         {
                             field: "Plaza", title: "Plaza", width: 80,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Nombre", title: "Nombre", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Organismo", title: "Organismo", width: 120,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Categoria", title: "Categoria", width: 100,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "DescCategoria", title: "Desc. Categoria", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "Adscripcion", title: "Adscripcion", width: 120,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "DescAdscripcion", title: "Desc. Adscripcion", width: 300,
                             attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" }
                            //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "UR", title: "UR", width: 250,
                             attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "MensualLiquido", title: "Mensual Liquido", width: 150, format: "{0:c2}", type: "number",
                             attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "MensualPercepcion", title: "Mensual Percepción", width: 180, format: "{0:c2}", type: "number",
                             attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         },
                         {
                             field: "AnualPresupuestal", title: "Anual Presupuestal", width: 180, format: "{0:c2}", type: "number",
                             attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" }
                             //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                         }
                    ],
                    dataBound: function () {
                        detailExportPromises = [];
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                        //var grid = $("#dgdatos").data("kendoGrid");
                        //for (var i = 0; i < grid.columns.length; i++) {
                        //    grid.autoFitColumn(i);
                        //}
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
                            kendo.saveAs({
                                dataURI: new kendo.ooxml.Workbook(workbook).toDataURL(),
                                fileName: tipo+".xlsx"
                            });
                        });
                    }
                });

                var grid = $("#dgdatos").data("kendoGrid");
                $(".k-master-row").each(function (index) {
                    grid.collapseRow(this);
                });
            }
            else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
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

function currency(data) {
    if (data.MensualLiquido == 'MensualLiquido') {
        return kendo.toString(data.MensualLiquido, "$###.##")
    }
    else {
        return kendo.toString(data.AnualPresupuestal, "$###.##")
    }
}

function exportChildData(Plaza, rowIndex) {
    var deferred = $.Deferred();

    detailExportPromises.push(deferred);

    var rows = [{
        cells: [
         // { value: "Plaza" },
          { value: "Tipo" },         
          { value: "Concepto" },         
          { value: "Gasto" },         
          { value: "Descripcion" },         
          { value: "CostoAnual" },
          { value: "TipoPago" },
          { value: "QnaAplica" }
          //{ value: "Adscripcion" },
          //{ value: "DescAdscripcion" },
          //{ value: "UR" },
        ]
    }];

    // dataSource.filter({ field: "Plaza", operator: "eq", value: Plaza });
    var filobj3 = jQuery.grep(obj3, function (Calendario, i) {
          return Calendario.Plaza == Plaza;
       });

    var exporter = new kendo.ExcelExporter({
        columns: [
        //  { field: "Plaza" },
          { field: "Tipo" },
          { field: "Concepto" },
          { field: "Gasto" },
          { field: "Descripcion" },
          { field: "CostoAnual" },
          { field: "TipoPago" },
          { field: "QnaAplica" }
          //{ field: "Adscripcion" },
          //{ field: "DescAdscripcion" },
          //{ field: "UR" },
        ],
        dataSource: filobj3
    });

    exporter.workbook().then(function (book, data) {
        deferred.resolve({
            masterRowIndex: rowIndex,
            sheet: book.sheets[0]
        });
    });
}

function detailInit(e) {
    $("<div style='width:70%;'/>").appendTo(e.detailCell).kendoGrid({
        dataSource: {
            data: obj3,
            serverPaging: false,
            serverSorting: false,
            serverFiltering: false,
            sortable: true,
            pagination: false,
            pageable: false,
            groupable: false,
            filterable: false,
            columnMenu: false,
            reorderable: false,
            resizable: false,
            filter: { field: "Plaza", operator: "eq", value: e.data.Plaza }
        },       
        excelExport: function (e) {
            e.preventDefault();
            deferred.resolve({
                masterRowIndex: masterRowIndex,
                sheet: e.workbook.sheets[0]
            });
        },
        columns: [
            {
                field: "Plaza", title: "Plaza", width: 90, hidden: true,
                attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
            },
                  {
                      field: "Tipo", title: "Tipo", width: 50,
                      attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                      //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                    {
                        field: "Concepto", title: "Concepto", width: 60,
                        attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                        //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                    },
                  {
                      field: "Gasto", title: "Gasto", width: 50,
                      attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                      //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                    {
                        field: "Descripcion", title: "Descripcion", width: 150,
                        attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" }
                        //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                    },
                  {
                      field: "CostoAnual", title: "Costo Anual", width: 80, format: "{0:c2}", type: "number",
                      attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" }
                      //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "TipoPago", title: "Tipo de Pago", width: 80,
                      attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                      //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  },
                  {
                      field: "QnaAplica", title: "Qna. de Aplicación", width: 100,
                      attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                      //headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  }
                  //,
                  // {
                  //     field: "Adscripcion", title: "Adscripcion", width: 100,
                  //     attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                  //     //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  // },
                  //       {
                  //           field: "DescAdscripcion", title: "Desc. Adscripcion", width: 150,
                  //           attributes: { "class": "table-cell", style: "text-align: left; font-size: 12px" }
                  //           //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  //       },
                  //       {
                  //           field: "UR", title: "UR", width: 150,
                  //           attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" }
                  //           //,headerAttributes: { "class": "align-center", style: "font-weight: bold" }
                  //       }
        ]
    });
    //$("<div/>").appendTo(e.detailCell).kendoGrid({
    //    dataSource: {
    //        data: obj2,
    //        serverPaging: false,
    //        serverSorting: false,
    //        serverFiltering: false,
    //        sortable: true,
    //        pagination: false,
    //        pageable: false,
    //        groupable: false,
    //        filterable: false,
    //        columnMenu: false,
    //        reorderable: false,
    //        resizable: true,
    //        width: "80%",
    //        filter: { field: "Plaza", operator: "eq", value: e.data.Plaza }
    //    },
    //    excelExport: function (e) {                       
    //        e.preventDefault();            
    //        deferred.resolve({
    //            masterRowIndex: masterRowIndex,
    //            sheet: e.workbook.sheets[0]
    //        });
    //    },       
    //    columns: [
    //        {
    //            field: "Plaza", title: "Plaza", width: 90, hidden: true,
    //            attributes: { "class": "table-cell", style: "text-align: center; font-size: 12px" },
    //            headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //        },
    //              {
    //                  field: "Enero", title: "Enero", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //                {
    //                    field: "Febrero", title: "Febrero", format: "{0:c}", width: 50,
    //                    attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                    headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //                },
    //              {
    //                  field: "Marzo", title: "Marzo", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //                {
    //                    field: "Abril", title: "Abril", format: "{0:c}", width: 50,
    //                    attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                    headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //                },
    //              {
    //                  field: "Mayo", title: "Mayo", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Junio", title: "Junio", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Julio", title: "Julio", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Agosto", title: "Agosto", format: "{0:c}", width: 50,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Septiembre", title: "Septiembre", format: "{0:c}", width: 80,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Octubre", title: "Octubre", format: "{0:c}", width: 80,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Noviembre", title: "Noviembre", format: "{0:c}", width: 80,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //              {
    //                  field: "Diciembre", title: "Diciembre", format: "{0:c}", width: 80,
    //                  attributes: { "class": "table-cell", style: "text-align: right; font-size: 12px" },
    //                  headerAttributes: { "class": "align-center", style: "font-weight: bold" }
    //              },
    //    ]
    //});
}






