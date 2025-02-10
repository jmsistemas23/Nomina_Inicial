<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bloquear_Afectacion.aspx.cs" Inherits="FILE_Bloqueos_Bloquear_Afectacion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
    <script type="text/javascript" src="Bloquear_Afectacion.js?1.1"></script>  
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
       <table>
            <tr>
                <td align="center">
                    <asp:Label ID="Label2" CssClass="TituloMedio" runat="server" Text="Bloquear Afectación"></asp:Label>    
                </td>
            </tr>               
        </table>
         <br />
         <table>
             <tr>
                 <td align="center"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Movimientos de Personal</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'MP'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'MP'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
             <tr>
                 <td align="center"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Pagos y Descuentos Diversos</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDMC" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'MC'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBMC" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'MC'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
              <tr>
                 <td align="center"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Datos Personales</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDDP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'DP'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBDP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'DP'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
              <tr>
                 <td align="center"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Incidencias Laborales</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDIL" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'IL'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBIL" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'IL'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
              <tr>
                 <td align="center"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Movimientos Especiales</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDME" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'ME'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBME" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'MEL'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
              <tr>
                 <td align="center"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Terceros</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDTR" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'TR'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBTR" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'TR'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
                </td>
             </tr>
              <tr>
                 <td align="center"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Referencias Familiares</asp:Label></td>
                  <td align="Center">                    
                   <a id="btnDRF" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Desbloqueo',size:'large',iconAlign:'top' ,toggle:true,group:'RF'" style="width:100px;height:80px; font-weight: bold; font-size: x-large;">Desbloquear</a>                                                   
                   <a id="btnBRF" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'Bloqueo',size:'large',iconAlign:'top', toggle:true,group:'RF'" style="width:100px; height:80px; font-weight: bold; font-size: x-large;" >Bloquear</a>
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
