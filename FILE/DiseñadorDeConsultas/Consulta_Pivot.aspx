<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Pivot.aspx.cs" Inherits="FILE_DiseñadorDeConsultas_Consulta_Pivot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="kendo.common.min.css" />
    <link rel="stylesheet" href="kendo.default.min.css" />
    <link rel="stylesheet" href="kendo.default.mobile.min.css" />

    <script src="jquery.min.js"></script>
    <script src="kendo.all.min.js"></script>   
    <script src="jszip.min.js"></script>
</head>
<body>
    <script src="products.js"></script>
  
   <div id="example">
    <button id="export" class="k-button k-button-icontext hidden-on-narrow"><span class="k-icon k-i-excel"></span>Export to Excel</button>
    <div id="configurator" class="hidden-on-narrow"></div>
    <div id="pivotgrid" class="hidden-on-narrow"></div>
    
    <div class="responsive-message"></div>

    <script>
        $(document).ready(function () {
            var pivotgrid = $("#pivotgrid").kendoPivotGrid({
                filterable: true,
                columnWidth: 120,
                height: 570,
                dataSource: {
                    data: products,
                    schema: {
                        model: {
                            fields: {
                                ProductName: { type: "string" },
                                UnitPrice: { type: "number" },
                                UnitsInStock: { type: "number" },
                                Discontinued: { type: "boolean" },
                                CategoryName: { field: "Category.CategoryName" }
                            }
                        },
                        cube: {
                            dimensions: {
                                ProductName: { caption: "All Products" },
                                CategoryName: { caption: "All Categories" },
                                Discontinued: { caption: "Discontinued" }
                            },
                            measures: {
                                "Sum": { field: "UnitPrice", format: "{0:c}", aggregate: "sum" },
                                "Average": { field: "UnitPrice", format: "{0:c}", aggregate: "average" }
                            }
                        }
                    }
                    //columns: [{ name: "CategoryName", expand: true }, { name: "ProductName" }],
                   // rows: [{ name: "Discontinued", expand: true }]
                   // measures: ["Sum"]
                }
            }).data("kendoPivotGrid");

            $("#configurator").kendoPivotConfigurator({
                dataSource: pivotgrid.dataSource,
                filterable: true,
                height: 570
            });

            $("#export").click(function () {
                pivotgrid.saveAsExcel();
            });

        });

    </script>
    <style>
        #pivotgrid {
            display: inline-block;
            vertical-align: top;
            width: 70%;
        }

        #configurator {
            display: inline-block;
            vertical-align: top;
        }

         #export
        {
            margin: 0 0 10px 1px;
        }

    </style>

</div>

</body>
</html>
