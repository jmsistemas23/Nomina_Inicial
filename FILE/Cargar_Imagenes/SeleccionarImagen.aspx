<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SeleccionarImagen.aspx.cs" Inherits="FILE_Cargar_Imagenes_SeleccionarImagen" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
	  <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">      

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
    <script src="../../jqueryEsy/plugins/jquery.filebox.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/base64js.min.js"></script>   
    <script src="SeleccionarImagen.js?0.5"></script>
     <style>       
        .textbox .textbox-text,
        .textbox .textbox-prompt{
	        font-size: 16px;
            /*font-weight:bold;*/    
            height:25px;
	        box-sizing:border-box;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>  
            <input id="Pdf" class="easyui-filebox" name="file1" style="width:300px">
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" id="btnVista">Ver</a>  
            <table>
                     <tr>
                         <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label></td>
                         <td align="left"><input class="easyui-textbox" style="width:100px" id="txtclave"></td>
                     </tr>
             </table>
           <div id="p" title="Panel" style="width:700px;height:300px;padding:10px;"></div>
            <%--<iframe id="frame"  style="width:700px;height:300px;padding:10px;"></iframe>--%>
            </div>
          <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO.jpg'); overflow:hidden;" id="wvista" closed="true" align="center">
              <div id="pvista" title="Panel" style="width:100%;height:100%;padding:3px;"></div>
          </div>
    </form>
</body>
</html>
