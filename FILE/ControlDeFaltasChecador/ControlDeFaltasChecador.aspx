<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ControlDeFaltasChecador.aspx.cs" Inherits="FILE_ControlDeFaltasChecador_ControlDeFaltasChecador" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>    
    <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
    
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 

      <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>

      <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-export.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-detailview.js"></script>

     <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/jquery.session.js"></script>   
      <script src="../../Scripts/jquery-Mask.js"></script> 
    <script src="ControlDeFaltasChecador.js"></script>
</head>
<body>    
     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_procesos'" id="btnGenerar">Generar</a>             
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnAplicar">Aplicar</a>              
        </div> 
         <br /><br />
         <div aling="center" style="border-spacing: 10px">
             <table>
                 <tr>
                    <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label></td>
                    <td align="left"> <input class="easyui-datebox" style="width:120px" id="dtvigini" data-options="formatter:myformatter,parser:myparser"></td>
                 </tr>                
                 <tr>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                 </tr>
                 <tr>
                    <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label></td>
                    <td align="left"><input class="easyui-datebox" style="width:120px" id="dtvigfin" data-options="formatter:myformatter,parser:myparser"></td>
                 </tr>
             </table>
         </div>
          <br /><br />

     </div>
     <div class="modal w-screen h-screen" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
</body>
</html>
