<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bloquear_QuincenasProduccion.aspx.cs" Inherits="FILE_Bloqueos_Bloquear_QuincenasProduccion" %>

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
    <script type="text/javascript" src="Bloquear_QuincenasProduccion.js?1.1"></script>  

</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
           <br />
           <br />         
       <table>
               <tr>
                  <td align="center">
                      <asp:Label ID="Label2" CssClass="TituloMedio" runat="server" Text="Historial de Quincenas"></asp:Label>    
                  </td>
               </tr>               
            </table>
             <br />
             <table style="width: 100%;">           
                <tr>
                    <td align="Center">                    
                        <a id="btnQuinDesbloqueo" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'q'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                        <a id="btnQuinBloqueo" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'q'" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                    </td>
                </tr>                        
            </table> 
             <br />
            <div class="easyui-layout" style="width:300px;height:60%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:12%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Quincenas</asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtquincenas">
                    </div>
                    <div data-options="region:'south'" style="border-style:none; width:100%; height:88%; padding:0px; overflow:hidden;" >
                        <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                            <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                        </div> 
                    </div>
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
