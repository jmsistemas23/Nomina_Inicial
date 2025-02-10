<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Imagenes_Expediente.aspx.cs" Inherits="FILE_Consultas_Imagenes_Expediente" %>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head >
    <title></title>
     <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

     <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>  
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="Imagenes_Expediente.js?0.0"></script>

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
    <style type="text/css">
        .auto-style1 {
            width: 188px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="center">      
          <div class="easyui-panel"  style="padding:3px; width:100%">  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>                  
            <a id="btnVista" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-imagenes',disabled:true" onclick="javascript:__doPostBack('CargarExpediente', '');">Vista Previa</a>
            <a id="btnImprimir" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true" >Imprimir</a>                       
        </div>
        <div class="easyui-layout" style="width:100%;height:97%;  overflow-x:hidden; overflow-y:hidden;">
            <div id="p" data-options="region:'west',split:true" title="Configuración" style="width:22%;padding:5px; overflow:hidden;" align="center">                              
               <%--   <table>
                    <tr>
                        <td><a id="btnEjecutivo" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-imagen',disabled:false" >Ejecutivo</a></td>
                        <td><a id="btnMagisterio" href="#" class="easyui-linkbutton" style="width:90px"  data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-imagen',disabled:false" >Magisterio</a></td>
                    </tr>
                </table>   
                <br />          --%>     
                 <table style="width:100%">
                    <tr>             
                        <td align="left" ><asp:Label ID="lblcamcaptura" CssClass="LetraChica" runat="server" Text="Expediente"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:150px" id="txtexpediente"></td>
                    </tr>
                     <tr>
                        <td align="left"><asp:Label ID="Label1" CssClass="LetraChica" runat="server" Text="Empleado"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:150px" id="txtempleado"></td>
                    </tr>
                      <tr>
                        <td align="left" ><asp:Label ID="Label2" CssClass="LetraChica" runat="server" Text="Nombre"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width: 300px; height: 45px" id="txtnombre" data-options="multiline:true,readonly:true"></td>
                    </tr>
                      <tr>
                        <td align="left"><asp:Label ID="Label3" CssClass="LetraChica" runat="server" Text="CURP"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:200px" id="txtcurp" data-options="readonly:true"></td>
                    </tr>
                 </table>   
                <br />
                <br />
                <table style="width: 394px">
                    <tr>
                        <td align="center" class="auto-style1"><asp:Label ID="Label4" CssClass="LetraChica" runat="server" Text="No. de Página"></asp:Label></td>
                        <td></td>
                        <td align="center"><asp:Label ID="Label5" CssClass="LetraChica" runat="server" Text="Total de Páginas"></asp:Label></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1"><input class="easyui-textbox" style="width:100px;text-align:center" id="txtnopagina" value="1" data-options="disabled:true"></td>
                        <td align="center"><asp:Label ID="Label6" CssClass="LetraChica" runat="server" Text="de"></asp:Label></td>
                        <td align="center"><input class="easyui-textbox" style="width:100px; text-align:center" id="txttotpagina" value="0" data-options="disabled:true"></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                    </tr>
                     <tr>
                        <td align="center" class="auto-style1"><asp:Label ID="Label7" CssClass="LetraChica" runat="server" Text="Imagenes a Mostrar"></asp:Label></td>
                        <td></td>
                        <td align="center"><asp:Label ID="Label8" CssClass="LetraChica" runat="server" Text="Total de Imagenes"></asp:Label></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1"><input class="easyui-textbox" style="width:100px;text-align:center" id="txtimagenes" value="200" data-options="disabled:true"></td>
                        <td align="center"><asp:Label ID="Label9" CssClass="LetraChica" runat="server" Text="de"></asp:Label></td>
                        <td align="center"><input class="easyui-textbox" style="width:100px; text-align:center" id="txttotimagenes" value="0" data-options="disabled:true"></td>
                    </tr>
                </table>  
                <br />
                 <table>
                    <tr>
                        <td><a id="btnAnterior" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-large-Anterior',disabled:true" >Anterior</a></td>
                        <td><a id="btnSiguiente" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-large-Siguiente',disabled:true" >Siguiente</a></td>
                    </tr>
                </table>                           
            </div>
            <div data-options="region:'center'" style="width:80%; Height:100%; padding:0px; overflow:auto; background-color: #FFFFFF;" align="center">                                                                  
                 <rsweb:ReportViewer ID="rvReportes" runat="server" Width="100%"  Height="100%"></rsweb:ReportViewer>               
            </div>            
        </div>      
    </div>
    <div class="modal" style="display: none;" id="loading" align="center">
        <div class="center" align="center" >
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>
         <input type="hidden" id="hfexpediente" name="hfusuario" runat="Server"  />               
        <asp:ScriptManager ID="ScriptManager1" runat="server"  EnablePageMethods="true">
        </asp:ScriptManager>            
    </form>
</body>
</html>
