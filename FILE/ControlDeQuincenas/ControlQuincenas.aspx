<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ControlQuincenas.aspx.cs" Inherits="FILE_ControlQuincenas_ControlQuincenas" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
      <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="ControlQuincenas.js?2.2"></script>
    
    <style type="text/css">
        .auto-style1 {
            width: 93px;
        }

        div.centered {
            text-align: center;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
            <br />
            <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label><br>
                    </td>
                </tr>
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server"></asp:Label>
                    </td>
                </tr>                              
            </table>
            <br />
             <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label3" CssClass="LetraChica" runat="server" Text="APERTURAS"></asp:Label>
                    </td>
                </tr> 
            </table>  
            <div id="dmenu"  style="width:45%; margin-top:0px; padding:5px; " align="center">                                                                
                    <a id="btnAperturaOrd" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'left',disabled:false" style="width: 70%">Ordinaria</a><br /><br />
                    <a id="btnAperturaExt" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'left',disabled:false" style="width: 70%">ExtraOrdinaria</a><br /><br />                                                          
                    <a id="btnApExtAnterior" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'left',disabled:false" style="width: 70%">Apertura De Nómina Extraordinaria Anterior</a><br /><br />                       
            </div> 
            <br />
            <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label2" CssClass="LetraChica" runat="server" Text="CIERRES"></asp:Label>
                    </td>
                </tr> 
            </table>            
            <div id="dextras" style="width:45%; height:40%; overflow-y:auto; margin-top:0px; padding:5px;" align="center">
            </div>                                                   
        </div> 
         <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>            
    </form>
</body>
</html>
