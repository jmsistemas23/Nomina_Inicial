<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu_Costeo.aspx.cs" Inherits="FILE_Costeo_Menu_Costeo" %>

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

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
     <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
      <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>
    <script src="Menu_Costeo.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">            
        <div  id="pinicial">
             <br />
               <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="COSTEO DE PLAZAS"></asp:Label><br>
                    </td>
                </tr>                
            </table>
            <br />          
         <%--<div class="easyui-panel" style="width:30%; margin-top:20px;  padding:4px" align="Center">                                   --%>
           <table style="width: 100%;">                 
              <tr>
                  <td align="Center">
                        <a id="btnCosteo" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-costo',size:'large',iconAlign:'top'" style="width:150px;height:80px; font-weight: bold;font-size: x-large;" >Costeo</a>
                        <a id="btnProyeccion" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-proyeccion',size:'large',iconAlign:'top'" style="width:150px;height:80px; font-weight: bold;font-size: x-large;" >Proyección</a>                                                           
                  </td>
              </tr>                          
            </table>  
         <%--</div>--%>                
         </div>  
    </div>
           <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
    </form>
</body>
</html>
