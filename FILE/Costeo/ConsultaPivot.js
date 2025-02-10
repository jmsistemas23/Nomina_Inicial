$(document).ready(function () {
    var tipo = "", filtro = "", canceladas = "";
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

    //agregar diseño guardado
    //var Discolumnas = [], Disfilas = [], Dismeasures = "";    
    //Discolumnas[0]= { name:"TipoPago" ,expand:true};  
    //Disfilas[0] = { name: "DescAdscripcion", expand: true };
    //Disfilas[1] = { name: "Plaza", expand: false };   
    //Dismeasures = "CostoAnual";    

    var buildDataSource = function (columnas,datos) {        
        var columnas = columnas.split('|');

        var dimensions = [];
        var measures = {};

        for (var c = 0; c < columnas.length;c++) {            
            dimensions[columnas[c]] = { caption: columnas[c] };
        }

        if (dimensions["Plaza"]) {
            measures["Contador Plazas"] = { field: "Plaza", aggregate: "count" };
            
        }
        if (dimensions["CostoAnual"]) {
            measures["CostoAnual"] = { field: "CostoAnual", format: "{0:c}", aggregate: "Sum" };
        }

        return new kendo.data.PivotDataSource({
            data: datos,
            schema: {
                cube: {
                    dimensions: dimensions,
                    measures: measures
                }               
            }            
            //,columns: Discolumnas,
            //rows: Disfilas,
            //measures: Dismeasures
        });
    };
   
    var pivotgrid = $("#pivotgrid").kendoPivotGrid({
        filterable: true,
        columnWidth: 120,
        height: 570,   
    }).data("kendoPivotGrid");

    var configurator = $("#configurator").kendoPivotConfigurator({
        dataSource: pivotgrid.dataSource,
        filterable: true,
        height: 570
    }).data("kendoPivotConfigurator");

    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.filtro = filtro,
     parametros.conceptos = conceptos,
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
            if (data.d[0] == "0") { $.messager.alert('Error', data.d[1], 'error'); return 0; }
            else
            {
                obj = $.parseJSON(data.d[1]);
              
                var source = buildDataSource(data.d[2], obj);

                pivotgrid.setDataSource(source);
                configurator.setDataSource(source);
            }
        },
        complete: function () {
            $('#loading').hide(100);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            //alert('Not connect: Verify Network.');
            $.messager.alert('Error', 'Not connect: Verify Network.', 'error');

        } else if (jqXHR.status == 404) {

            //alert('Requested page not found [404]');
            $.messager.alert('Error', 'Requested page not found [404]', 'error'); 

        } else if (jqXHR.status == 500) {

            //alert('Internal Server Error [500].');
            $.messager.alert('Error', 'Internal Server Error [500].', 'error'); 

        } else if (textStatus === 'parsererror') {

            //alert('Requested JSON parse failed.');
            $.messager.alert('Error', 'Requested JSON parse failed.', 'error');

        } else if (textStatus === 'timeout') {

            //alert('Time out error.');
            $.messager.alert('Error', 'Time out error.', 'error');

        } else if (textStatus === 'abort') {

            //alert('Ajax request aborted.');
            $.messager.alert('Error', 'Ajax request aborted.', 'error'); 

        } else {

            //alert('Uncaught Error: ' + jqXHR.responseText);
            $.messager.alert('Error', 'Uncaught Error: ' + jqXHR.responseText, 'error');
        }
    });


    $("#btnExcel").click(function () {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        pivotgrid.saveAsExcel();
    });
    $("#btnGuardar").click(function () {
        var pivotgrid = $("#pivotgrid").data("kendoPivotGrid");
        var columnas = "[", filas = "[", measures = "", diseño = "";

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
    $("#btnRegresar").click(function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", ""); }
        else { IR_PAGINA("costeo.aspx", ""); }
    });

    

});