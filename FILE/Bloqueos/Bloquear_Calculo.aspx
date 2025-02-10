<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bloquear_Calculo.aspx.cs" Inherits="FILE_Bloqueos_Bloquear_Calculo" %>

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
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Bloquear_Calculo.js?1.0"></script>  

</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
           <br />
           <br />         
        <table>
                   <tr>
                     <td align="center">
                         <asp:Label ID="Label1" CssClass="TituloMedio" runat="server" Text="Calculo"></asp:Label>    
                     </td>
                  </tr>  
                  <tr>
                     <td align="center">
                         &nbsp;</td>
                  </tr>  
                  <tr>
                      <td align="Center">
                           <asp:Label ID="lblmensaje" CssClass="LetraChica" runat="server" Text=""></asp:Label>
                      </td>
                  </tr>  
                  <tr>
                     <td align="center">
                         &nbsp;</td>
                  </tr>  
                  <tr>
                      <td align="Center">
                           <asp:Label ID="lblnomina" CssClass="LetraChica" runat="server" Text=""></asp:Label>
                      </td>
                  </tr>  
             </table>
             <br />
             <table style="width: 100%;">           
                <tr>
                   <td align="Center">                    
                      <a id="btnAbierto" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">DesBloquear</a>                                                   
                      <a id="btnCerrado" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'gf'" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Bloquear</a>
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
