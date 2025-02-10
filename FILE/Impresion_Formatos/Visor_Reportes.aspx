<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Visor_Reportes.aspx.cs" Inherits="FILE_Reportes_Visor_Reportes" %>
<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head >
    <meta http-equiv="x-ua-compatible" content="IE=11" >
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
    <script type="text/javascript" src="Impresion.js"></script>    
       
    <script type="text/javascript">
        $(document).ready(function () {
            $('#btnImprimir').bind('click', function () { Print(); });
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
         <div class="easyui-panel"  style="padding:3px; width:100%">          
          <a id="btnImprimir" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte'" >Imprimir</a>                  
        </div>
        <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>       
        <rsweb:ReportViewer ID="rvReportes" runat="server" Width="100%" Height="785px">
        </rsweb:ReportViewer>       
    </form>
</body>
</html>