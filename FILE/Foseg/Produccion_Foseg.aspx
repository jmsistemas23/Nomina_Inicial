<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Produccion_Foseg.aspx.cs" Inherits="FILE_Foseg_Produccion_Foseg" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
      <meta http-equiv="cache-control" content="max-age=0" />
 <meta http-equiv="cache-control" content="no-cache" />
 <meta http-equiv="expires" content="0" />
 <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
 <meta http-equiv="pragma" content="no-cache" />
 <meta charset="UTF-8"/>
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
 <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
   <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
 <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
 <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>
  <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"//>   

 <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
 <script type="text/javascript" src="../../scripts/demos.js"></script>
 <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
 <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
 <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
  <script src="../../Scripts/jquery.session.js"></script>   
   <script src="../../Scripts/jquery-Mask.js"></script> 
    <script src="Produccion_Foseg.js?v0.2"></script>  
</head>
<body>   
        <div class="easyui-layout"  style="width:100%; height:100%; padding:0px" align="Center">  
              <div class="easyui-panel" style="padding:2px; width:100%">                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarProd">Limpiar Producción</a> 
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_procesos'" id="btnGenerar">Generar Producción</a>                 
               <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reportes'" id="btnGenerarReporte">Generar Reportes</a> --%>                               
            </div>
              <br />
             <table>     
                <tr>
                    <td align="left">
                            <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Cheque:</asp:Label> 
                    </td>
                    <td align="left">
                        <input class="easyui-textbox" style="width:120px" id="txtcheque"/>
                    </td>
                </tr>
                <tr>
                    <td align="left">
                        <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Fecha Pago:</asp:Label> 
                    </td>
                    <td align="left">
                        <input class="easyui-datebox" style="width:120px" id="txtfecha" data-options="formatter:myformatter,parser:myparser"/>
                    </td>
                </tr>
             <tr>
         <td align="left">
             <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Periodo Pago:</asp:Label> 
         </td>
         <td align="left">
             <input class="easyui-textbox" style="width:180px" id="txtperiodo"/>
         </td>
     </tr>
     <tr>
         <td align="left">
             <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Vigencia:</asp:Label> 
         </td>
         <td align="left">
             <input class="easyui-datebox" style="width:120px" id="txtvigencia" data-options="formatter:myformatter,parser:myparser"/>
         </td>
     </tr>
     <tr>
         <td align="left">
             <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Leyenda:</asp:Label> 
         </td>
         <td align="left">
             <input class="easyui-textbox"  data-options="multiline:true" value="" style="height:70px; width:350px" id="txtleyenda"/>
         </td>
     </tr>
 </table>
        </div>
           
      <div class="modal" style="display: none;" id="loading"  align="Center">
      <div class="center">
         <img alt="" src="../../Imagenes/ajax-loader.gif" />
      </div> 
  </div>
</body>
</html>
