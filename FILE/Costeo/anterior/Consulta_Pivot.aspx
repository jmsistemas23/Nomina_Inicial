<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Pivot.aspx.cs" Inherits="FILE_DiseñadorDeConsultas_Consulta_Pivot" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	


      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="styles/kendo.common.min.css" />
    <link rel="stylesheet" href="styles/kendo.default.min.css" />
    <link rel="stylesheet" href="styles/kendo.default.mobile.min.css" />
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/> 

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
   
    

    <script src="lib/jquery.min.js"></script>
    <script src="lib/kendo.all.min.js"></script>   
    <script src="lib/jszip.min.js"></script>

    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>
    <script src="ConsultaPivot.js?1.4"></script>
    
</head>
<body>  
   <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>      
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel'" id="btnExcel">Exportar Excel</a>       
              <%--  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>    --%>   
        </div>  
        <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">
             <div data-options="region:'west',split:true" style="width:20%; height:100%; padding:3px; overflow:hidden;" align="center" title="Diseño Cubo">
                 <div id="configurator" class="hidden-on-narrow"></div>
             </div>
            <div data-options="region:'center'" style="height:100%; width:80%; padding:3px; overflow-y:hidden;" align="center";  title="Vista Cubo">
                <div id="pivotgrid" class="hidden-on-narrow"></div>
           </div>
        </div>  
       <style>
        #pivotgrid {
            display: inline-block;
            vertical-align: top;
            width: 100%;          
        }

        #configurator {
            display: inline-block;
            vertical-align: top;
            width: 100%;
        }        
    </style>                   
</div>
    <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
</body>
</html>
