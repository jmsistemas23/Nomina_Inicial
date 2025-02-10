<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Produccion.aspx.cs" Inherits="FILE_Calculo_Produccion" %>

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
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Produccion.js?1.0"></script>  

</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
           <br />
           <br />
          <table>
            <tr>
                <td align="center">
                      <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="Producción de Nomina"></asp:Label>    
                </td>
            </tr>                   
        </table>
             <br />
         <table>
              <tr>
                    <td align="Center">
                        <asp:Label ID="lblmensaje" CssClass="LetraChica" runat="server" Text=""></asp:Label>
                    </td>
                </tr>  
         </table>
          <br />
        <table style="width: 100%;">           
            <tr>
                <td align="Center">                    
                    <a id="btnHistoria" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-historia',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Historia</a>                                                   
                    <a id="btnActual" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top', toggle:true,group:'gf'" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Actual</a>
                </td>
            </tr>                        
        </table> 
      </div>
          <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>  
    </form>
</body>
</html>
