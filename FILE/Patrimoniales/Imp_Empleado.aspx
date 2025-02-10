<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Imp_Empleado.aspx.cs" Inherits="FILE_Patrimoniales_Imp_Empleado" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>   
       <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
     <link href="../../Styles/EstiloFuente.css" rel="stylesheet" />
    <script src="../../Scripts/jquery-1.11.1.min.js"></script>
    <script src="../../Scripts/demos.js"></script>
    <script src="../../Scripts/Funsiones.js"></script>   
    
     <link href="../../jqueryEsy/themes/icon.css" rel="stylesheet" />
     <link href="../../jqueryEsy/themes/pepper-grinder/easyui.css" rel="stylesheet" />   
     <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>

    <script src="Imp_Empleado.js"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div class="w-screen h-screen" align="center">
         <div class="easyui-panel" style="padding:3px; width:100%">                             
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_MiniSalir'" id="btnCerrar">Cerrar</a>
        </div>
         <br />
         <br />
         <table>
          <tr>                            
              <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">No. Empleado:</asp:Label></td>              
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true"></input></td>              
          </tr>           
           <tr>              
              <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtrfc" data-options="readonly:true"></input></td>                                     
          </tr>                   
           <tr>              
              <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
              <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:300px;" id="txtnombre" data-options="readonly:true"></input></td>              
          </tr>
       </table>
        <br />
        <table class="easyui-datagrid" id="dgimportes"  style="width:75%; height:50%;">
            <thead>
            </thead>
        </table>
    </div>
    </form>
</body>
</html>
