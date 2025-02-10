$(document).ready(function () {
    var tipo = "", filtro = "", canceladas = "", conceptos="";
    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = ''; }
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = ''; }
    if ($_GET('conceptos') != null) {
        conceptos = $_GET('conceptos');
    } else { conceptos = '' }

    if ($_GET('canceladas') != null) {
        canceladas = $_GET('canceladas');
    } else { canceladas = '' }


    var datos = [];
    var dimensions = [];
    var measures = {};

    datos["Plaza"] = { type: "string" };
    datos["Organismo"] = { type: "string" };
    datos["DescCategoria"] = { type: "string" };
    datos["DescAdscripcion"] = { type: "string" };
    datos["Descripcion"] = { type: "string" };
    datos["Tipo"] = { type: "string" };
    datos["TipoPago"] = { type: "string" };
    datos["Gasto"] = { type: "string" };
    datos["UR"] = { type: "string" };
    datos["CostoAnual"] = { type: "number" };

    dimensions["Plaza"] = { caption: "Plaza" };
    dimensions["Organismo"] = { caption: "Organismo" };
    dimensions["DescCategoria"] = { caption: "Categoria" };
    dimensions["DescAdscripcion"] = { caption: "Adscripcion" };
    dimensions["Descripcion"] = { caption: "Conceptos" };
    dimensions["Tipo"] = { caption: "Tipo" };
    dimensions["TipoPago"] = { caption: "TipoPago" };
    dimensions["Gasto"] = { caption: "Gasto" };
    dimensions["UR"] = { caption: "UR" };
    //dimensions["CostoAnual"] = { caption: "CostoAnual" };

    //measures["Plaza"] = { field: "Plaza", format: "{0:c}", aggregate: "Count" };
    measures["CostoAnual"] = { field: "CostoAnual", format: "{0:c}", aggregate: "Sum" };

    //agregar diseño guardado
    var columnas = [], filas = [], mea="";   
    columnas.push("TipoPago");
    filas.push("DescAdscripcion");
    filas.push("Plaza");
    mea = "CostoAnual";
      

    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.filtro = filtro,
    parametros.conceptos=conceptos,
    parametros.canceladas = canceladas;
    $.ajax({
        type: "POST",
        url: "funsiones.aspx/proceso_costeo",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        cache: false,
        timeout: 50000, // sets timeout to 20 seconds  
        data: JSON.stringify(parametros),
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") { alert('Error', data.d[1], 'error'); }
            else
            {
                obj = $.parseJSON(data.d[1]);

                $("#pivotgrid").kendoPivotGrid({
                    filterable: true,
                    //sortable: true,
                    columnWidth: 120,
                    height: 650,
                    dataSource: {
                        data: obj,
                        excel: {
                            fileName: "Datos.xlsx",
                            proxyURL: "//demos.telerik.com/kendo-ui/service/export",
                            filterable: true
                        },
                        schema: {
                            //model: {
                            //    fields: datos
                            //},
                            cube: {
                                dimensions: dimensions,
                                measures: measures
                            }
                        },
                        columns: columnas,
                        rows: filas,
                        measures: mea
                        //,sort: [{
                        //    field: "[Date].[Calendar]",
                        //    dir: "asc" //or desc
                        //}]
                        //,filter: {
                        //    field: "[Date].[Calendar]",
                        //    operator: "endswith",
                        //    value: "2005"
                        //}
                    }
                });

                var grid = $("#pivotgrid").data("kendoPivotGrid");

                var configurator = $("#configurator").kendoPivotConfigurator({
                    dataSource: grid.dataSource,
                    filterable: true,
                    //sortable: true,
                }).getKendoPivotConfigurator();

                configurator.treeView.dataSource.read();
            }
        },
        complete: function () {
            $('#loading').hide(100);
        }
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


    $("#btnExcel").click(function () {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        pivotgrid.saveAsExcel();
    });
    $("#btnGuardar").click(function () {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        var columnas = "[",filas="[",measures="",diseño="";
        
        //for (var c = 0; c < pivotgrid.dataSource._columns.length ; c++) {
        //    columnas += "{ name:"+"'"+pivotgrid.dataSource._columns[c].name+"},";
        //}
        //columnas = columnas.substring(0, columnas.length - 1);
        //columnas += "]";
        //for (var r = 0; r < pivotgrid.dataSource._rows.length ; r++) {
        //    filas += "{ name:" + pivotgrid.dataSource._rows[r].name + "},";
        //}
        //filas = filas.substring(0, filas.length - 1);
        //filas += "]";
        //for (var m = 0; m < pivotgrid.dataSource.measures.length ; m++) {
        //    measures += pivotgrid.dataSource._measures[m].name + ",";
        //}
        //measures = measures.substring(0, measures.length - 1);

        //diseño = columnas + "|" + filas + "|" + measures;

    });


    $('#btnRegresar').bind('click', function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", ""); }
        else { IR_PAGINA("costeo.aspx", ""); }
    });
});