<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cap_Terceros.aspx.cs" Inherits="FILE_Terceros_Cap_Terceros" %>

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
     <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Cap_Terceros.js?1.3"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
       <div id="dmenu" style="width:100%; height:100%; padding:4px" align="Center">
             <br />
              <table style="width: 100%;">
                    <tr>
                        <td align="Center">
                            <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="TERCEROS"></asp:Label><br>
                        </td>
                    </tr>                
              </table>
              <br />
              <div class="easyui-layout" style="width:70%;height:60%; overflow:hidden;" align="center">              
                 <div id="p" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                  
                     <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                     <br />
                     <div id="dextras" style="width:100%; overflow-y:auto" align="center">

                    </div>
                 </div>
                 <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">  
                      <br />
                     <br />
                      <table style="width: 100%;">
                        <tr>
                             <td align="Center">
                                  <table cellpadding="3" cellspacing="5">                                                                                    
                                       <tr>
                                          <td align="Center">
                                               <a id="btnNuevaCaptura" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-Adocumento',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Nueva Captura</a>
                                              <a id="btnModificarCaptura" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar Captura</a>
                                               <a id="btnBajaTerceros" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-Edocumento',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Baja</a>
                                               <a id="btnCambioTerceros" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-Mdocumento',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Cambio</a>                                               
                                          </td>                              
                                      </tr>
                                       <tr>
                                        <td align="Center">
                                             <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="CAPTURA BLOQUEADA"></asp:Label>        
                                        </td>
                                    </tr>
                                </table>    
                             </td> 
                        </tr>                            
                    </table>  
                 </div>
           </div>           
      </div>      
    </div>       
       <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div>           
       </div>   
    </form>
</body>
</html>
