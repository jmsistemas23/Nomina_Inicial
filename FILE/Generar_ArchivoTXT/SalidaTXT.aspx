<%@ Page Language="C#" AutoEventWireup="true" CodeFile="SalidaTXT.aspx.cs" Inherits="FILE_Generar_ArchivoTXT_SalidaTXT" %>

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
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="SalidaTXT.js?1.0"></script>
    <script src="../../Scripts/jquery.session.js"></script>
    
</head>
<body>
    <form id="form1" runat="server">
    <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">  
        <br />  <br />
        <table style="width: 100%;">           
                <tr>
                   <td align="Center">                                           
                       <a id="btngenerar" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-ExpTxT',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Generar Archivo</a>
                       <a id="btndescargar" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-Texto',size:'large',iconAlign:'top' ,toggle:true,group:'gf',disabled:true" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Descargar Archivo</a>                                            
                   </td>
               </tr>                 
            </table> 
        <br/>  <br/>  
        <table style="width: 30%;">           
               <tr>
                   <td align="Center"><asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Nombre Del Archivo</asp:Label></td>
               </tr>
                <tr>
                   <td align="Center"><input class="easyui-textbox" style="width:100%" id="txtarchivos"></td>
                </tr>
        </table>
    </div>
       
          <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
