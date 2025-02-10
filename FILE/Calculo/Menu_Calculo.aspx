<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu_Calculo.aspx.cs" Inherits="FILE_Calculo_Menu_Calculo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
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
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script src="Menu_Calculo.js?0.4"></script>
</head>
<body>   
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
         <div id="dmenu" class="easyui-panel" style="width:100%;  padding:3px; display:none;">                                                     
                 <a id="btnActualizar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reload'" >Actualizar</a>                   
         </div>
            <table style="top:50px; width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label>
                    </td>
                </tr>                
            </table>
         <br />   
          <div id="divPerfiles" class="easyui-layout" style="width:90%;height:60%; overflow:hidden;" align="center">              
               <div id="p" data-options="region:'west'" style="width:35%;padding:3px; overflow:hidden;" align="center">                                   
                    <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text=""></asp:Label>   
                    <br />                               
                    <div id="dextras" style="width:100%; height:95%;   overflow-y:auto" align="center">
                     </div>
              </div>
              <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">                            
                   <table class="easyui-datagrid" style="width: 100%; height:100%;" id="dgPerfiles"></table>   
                   <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="CALCULO BLOQUEADO"></asp:Label>                                      
             </div>               
           </div>
     </div>    
     <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>  
</body>
</html>
