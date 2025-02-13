﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Historia_Referencias_Familiares.aspx.cs" Inherits="FILE_Consultas_Empleados_Historia_Referencias_Familiares" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script>    
    <script src="../../../Scripts/jquery-Mask.js"></script> 
    <script src="Historia_Referencias_Familiares.js"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" >           
         <div id="dmenu" class="easyui-layout" style="width:100%; height:100%; padding:0px;" align="Center">
             <div class="easyui-panel" style="padding:3px; width:100%">                               
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRMenu">Regresar</a>           
                <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-BDoc',disabled:true" id="btnMovimiento">Movimiento</a> --%>          
             </div> 
             <br />
              <table>
                <tr>
                   <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true" value=""></input></td>
                    <td align="left">          
                   <td align="left">   
                </tr>                                             
                <tr>
                    <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                    <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtnombre" data-options="readonly:true"></input></td>           
                </tr>                
                <tr>              
                   <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtrfc" data-options="readonly:true"></input></td>   
                    <td align="left">   
                    <td align="left">   
              </tr>  
                     <tr>
                    <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">C.U.R.P.:</asp:Label></td>
                    <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtcurp" data-options="readonly:true"></td>
                    <td align="left">
                    <td align="left">   
                </tr>                           
            </table>
             <br />             
             <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Historia de Referencias Familiares</asp:Label>  
             <br />
             <table class="easyui-datagrid"  style="width:90%; height:60%" id="dghm"></table>                  
         </div>        
         <div id="dcaptura" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">                         
            <div class="easyui-panel" style="padding:3px; width:100%">                                        
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'buscar'" id="btnInicio">Inicio</a> 
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRcaptura">Regresar</a> 
                <asp:Label ID="lblmov" CssClass="LetraChica" runat="server"></asp:Label>                                 
           </div>
             <br />
          <div  class="easyui-layout" style="width:100%;height:94%; overflow-y:scroll;" align="center">
             <div id="dcorigen" align="Center"></div>                                    
          </div>           
         </div>         
    </div>
        <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
    </form>
</body>
</html>