<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Afectacion_Modulos.aspx.cs" Inherits="FILE_Afectaciones_Afectacion_Modulos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
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
    <script src="Afectacion_Modulos.js?0.6"></script>
</head>
<body>
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <div class="easyui-layout" style="top:20px; width:95%;height:95%; overflow:hidden;" align="center">     
                <div id="dnominas" data-options="region:'west'" style="width:35%;padding:3px; overflow:hidden;" align="center">
                     <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                     <br />
                    <div id="dextras" style="width:100%; height:70%;  overflow-y:auto" align="center">
                    </div>
             </div>
              <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">                
              <table>
             <tr>                
                  <td align="Center">                    
                   <a id="btnCMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovPer',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Movimientos de Personal</a>                                                                      
                  <td align="Center">                    
                   <a id="btnCMC" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovCon',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Pagos y Descuentos Diversos</a>                                                                   
                </td>
                </td>
             </tr>
             <tr>                 
                  
             </tr>
              <tr>                 
                  <td align="Center">                    
                   <a id="btnCME" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovEsp',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Movimientos Especiales</a>                                                                      
                </td>
                   <td align="Center">                    
                   <a id="btnCIL" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_IncLab',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Incidencias Laborales</a>                                                                      
                </td>
             </tr>              
              <tr>                 
                 
             </tr>
              <tr>  
                   <td align="Center">                    
                   <a id="btnCDP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_DatPer',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Datos Personales</a>                                                                      
                  </td>
                  <td align="Center">                    
                   <a id="btnCRF" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_RefFam',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Referencias Familiares</a>                                                                      
                </td>
             </tr>
                  <tr>                 
                 
             </tr>
              <tr>                                 
                   <td align="Center">                    
                   <a id="btnCTR" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_Ter',size:'large',iconAlign:'left' ,toggle:true,group:'AFC',disabled:true" style="width:300px;height:80px; font-weight: bold; font-size: x-large;">Terceros</a>                                                                      
                </td>
             </tr>
         </table>
                  <br />  
                  <div ID="derror" style="display:none; width:100%;height:50%; overflow:auto;" align="center" > 
                      <asp:Label ID="lblerror" CssClass="LetraChica" runat="server" Text="Datos de la Afectación"></asp:Label>
                      <br />                                              
                      <table class="easyui-datagrid"  id="dgcifra"></table>
                      <br />
                      <table class="easyui-datagrid"  id="dgerrores"></table>
                   </div>                   
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
