<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Configuración_Consultas.aspx.cs" Inherits="FILE_DiseñadorDeConsultas_Configuración_Consultas" %>

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
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Configuración_Consultas.js?1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
   <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
    
    </div>
     <div class="modal" style="display: none; " id="loading" align="center">
      <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
      </div> 
     </div>
    </form>
</body>
</html>
