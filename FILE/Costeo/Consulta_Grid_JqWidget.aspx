<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Grid_JqWidget.aspx.cs" Inherits="FILE_Costeo_Consulta_Grid_JqWidget" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/> 
      
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 

    <link href="../../jqwidgets/jqwidgets/styles/jqx.base.css" rel="stylesheet" />

    <script src="../../Scripts/jquery-1.11.1.min.js"></script>
    

       <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    

    <script type="text/javascript"  src="../../jqwidgets/jqwidgets/jqxcore.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxscrollbar.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxbuttons.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxmenu.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxcheckbox.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.selection.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.columnsresize.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxdata.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxdata.export.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.export.js"></script>
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.grouping.js"></script>    
    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxexport.js"></script>

    <script type="text/javascript" src="../../jqwidgets/jqwidgets/jqxgrid.sort.js"></script>        
    <script type="text/javascript" src="../../Scripts/demos.js"></script>

    <script type="text/javascript" src="../../jqwidgets/scripts/jszip.min.js"></script>
    <script type="text/javascript" src="../../jqwidgets/scripts/vfs_fonts.js"></script>
    <script type="text/javascript" src="../../jqwidgets/scripts/pdfmake.min.js"></script>

       <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>   
    <script src="Consulta_Grid_JqWidget.js"></script>

</head>
<body>
     <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">              
         <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>      
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel',disabled:false" id="btnExcel">Exportar Excel</a>                 
        </div>
        <br /> 
          <div id="dgcosto"></div>             
     </div>
      <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
</body>
</html>
