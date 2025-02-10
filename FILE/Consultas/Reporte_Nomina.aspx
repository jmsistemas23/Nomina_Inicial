<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reporte_Nomina.aspx.cs" Inherits="FILE_Consultas_Reporte_Nomina" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>        
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	

     <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>     
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>  
    <script src="Reporte_Nomina.js?1.1"></script>

     <script type="text/javascript">
         $(document).ready(function () {
             //$('#btnImprimir').bind('click', function () { Print(); });
         });
      

         function Print() {
             var report = document.getElementById("<%=rvReportes.ClientID %>");
             var div = report.getElementsByTagName("DIV");
             var reportContents;
             for (var i = 0; i < div.length; i++) {
                if (div[i].id.indexOf("VisibleReportContent") != -1) {
                   reportContents = div[i].innerHTML;
                   break;
             }
         }

    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head><title>RDL Report</title>');
    frameDoc.document.write('</head><body style = "font-family:arial;font-size:10pt;">');
    //frameDoc.document.write('</head><body>');
    frameDoc.document.write(reportContents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();

    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
}




</script>    
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px; overflow-x:hidden; overflow-y:hidden;" align="Center">
         <div class="easyui-panel"  style="padding:3px; width:100%">   
          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>        
          <a id="btnImprimir" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:false" >Imprimir</a>
        </div>
         <div class="easyui-layout" style="width:100%;height:97%;  overflow-x:hidden; overflow-y:hidden;">
             <rsweb:ReportViewer ID="rvReportes" runat="server" Width="100%"  Height="100%" ShowPrintButton="false" ShowRefreshButton="true"></rsweb:ReportViewer>
         </div>
    </div>
        <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center">
             <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>          
        <input type="hidden" id="hfusuario" name="hfusuario" runat="Server"  />                  
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>
    </form>
</body>
</html>
