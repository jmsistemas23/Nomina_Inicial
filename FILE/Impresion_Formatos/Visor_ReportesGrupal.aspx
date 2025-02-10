<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Visor_ReportesGrupal.aspx.cs" Inherits="FILE_Impresion_Formatos_Visor_ReportesGrupal" %>
<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>   
     <link rel="stylesheet" href="../../Styles/VisorReporte.css" type="text/css" media="screen"/>   
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	

     <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>     
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    
    <script type="text/javascript" src="Visor_ReportesGrupal.js"></script>    
</head>
<body>
    <form id="form1" runat="server">
         <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px; overflow-x:hidden; overflow-y:hidden;" align="Center">
        <div class="easyui-panel"  style="padding:3px; width:100%">
          <a id="btnLimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>                    
          <a id="btnImprimir" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true" >Imprimir</a>
        </div>
        <div class="easyui-layout" style="width:100%;height:99%;  overflow-x:hidden; overflow-y:hidden;">
            <div id="p" data-options="region:'west'" style="width:20%;padding:0px; overflow:hidden;" align="center">
                 <div id="Div6" class="easyui-panel" style="width:100%;height:100%; background-color: #FFFFFF;">
                     <ul class="easyui-tree" id="lstformatos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                 </div> 
            </div>
            <div data-options="region:'center'" style="width:80%; Height:100%; padding:0px; overflow-x:scroll; overflow-y:scroll; background-color: #FFFFFF;" align="center">  
                <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>   
                <rsweb:ReportViewer ID="rvReportes" runat="server" Width="100%"  Height="70%">
                 </rsweb:ReportViewer>                
            </div>
        </div>           
    </div>
         <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center">
             <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>          
       <input id="HFNomReporte" type="hidden" runat="server" />   
    </form>
</body>
</html>
