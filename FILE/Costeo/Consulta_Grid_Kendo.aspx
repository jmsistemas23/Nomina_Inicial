<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Grid_Kendo.aspx.cs" Inherits="FILE_Costeo_Consulta_Grid_Kendo" %>

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
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

      <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 

    <link href="../../KendoUI/styles/kendo.common.min.css" rel="stylesheet" /> 
    <link href="../../KendoUI/styles/kendo.default.min.css" rel="stylesheet" />    
    <link href="../../KendoUI/styles/kendo.default.mobile.min.css"  rel="stylesheet" />

    <script src="../../KendoUI/lib/jquery.min.js"></script>
    <script src="../../KendoUI/lib/kendo.all.min.js"></script>   
    <script src="../../KendoUI/lib/jszip.min.js"></script>
             
   <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    

     <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>   
    <script src="Consulta_Grid_Kendo.js?1.5"></script>
  
</head>
<body>   
     <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">              
         <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>      
            <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel',disabled:false" id="btnExcel">Exportar Excel</a>               --%>  
        </div>
        <br /> 
         <div style="width:95%;height: 80%;">
           <table id="dgdatos" ></table>                      
        </div>  
    </div>
      
       <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
     
</body>
</html>
