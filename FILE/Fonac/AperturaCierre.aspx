<%@ Page Language="C#" AutoEventWireup="true" CodeFile="AperturaCierre.aspx.cs" Inherits="FILE_Fonac_AperturaCierre" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
   <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>

     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="AperturaCierre.js?1.2"></script>
    <style type="text/css">
        .auto-style1 {
            width: 186px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
     <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <br />
      <table>
             <tr>
                 <td align="center"><asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="CIERRE DEL CICLO ACTUAL"></asp:Label></td>
             </tr>
         </table>
         <br>
         <table style="width: 342px">          
            <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">No. de Ciclo Actual:</asp:Label></td>               
                <td align="center"><asp:Label ID="lblciclo" CssClass="LetraChica" runat="server" Text=""></asp:Label></td>             
               <td align="right"><a id="btnCerrar" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'cerrar2',size:'large',iconAlign:'top'" style="width:100px">Cerrar</a>                             
               </td> 
            </tr>
          </table>
    </div>
    </form>
</body>
</html>
