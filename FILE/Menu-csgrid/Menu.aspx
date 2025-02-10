<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu.aspx.cs" Inherits="FILE_Sistema_Menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

     <link rel="stylesheet" href="../../Styles/Contenedor.css" type="text/css" media="screen"/>       
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
  
    <link rel="stylesheet" href="style-allec-nav.css">
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
	<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	

	<script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    

    <script type="text/javascript" src="../../scripts/jquery.slidereveal.min.js"></script>
    <script type="text/javascript" src="../../scripts/jquery.slidereveal.js"></script>
      <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Menu.js"></script>  
</head>
    <style type="text/css">      
      .slider{
        background-color: #eeeeee;
        color: black;
      }       
      .noscroll{
         overflow:hidden;
      }        
    </style>    
<body class="initial-page" >         
    <nav class="nav" id="nav">                   
         <div id="divizquierda">
           <div id="imglogo" >
               <img src="../../Imagenes/LOGO1.png" alt="image">
           </div>   
           <div id="tt" class="easyui-tabs" style="width: 100%;  height:100%; display:none"></div>
        </div> 
         <a class="nav__btn-open" href="javascript:void(0);"title="Menu"></a>                
         <a class="nav__btn-usu" href="#"; title="Usuario" id="btnusuario"></a>
         <a class="nav__btn-accesos" href="#"; title="Accesos" id="btnAccesos"></a>
         <a class="nav__btn-cerrar" href="#"; title="Cerrar" onclick="Cerrar()"></a>                                                
        <div id='slideusuario' class="slider" align="center" style="display:none">
          <div id="divusuario" class="barraslide" style="height: 20px; width: 100%" align="center">
              <asp:Label ID="Label1" runat="server" Text="Presiona ESC para Cerrar"></asp:Label>   
          </div>
           <br />
            <br />
          <div style="width: 100%; height:300px" align="center">
              <asp:Image ID="imgusuario" runat="server" Width="250" Height="200" ImageAlign="Middle" ImageUrl="~/Imagenes/logo1.png" />
          </div> 
          <div style="background-color: #E1DFD9">
               <table style="padding: 5px; border-spacing: 5px; width:auto; height: 161px;">
                <tr>
                    <td align="left" style="padding:5px">
                        <asp:Label ID="Label2" CssClass="LetraChicaNegrita"  runat="server" Text="Usuario:"></asp:Label>
                    </td>
                     <td colspan="2" align="left">
                         <asp:Label ID="lblusu" runat="server" Text=""></asp:Label>  
                     </td>
                 </tr>
                 <tr>
                     <td colspan="3" align="center">
                     </td>
                 </tr>
                 <tr>
                      <td align="left" style="padding:5px">
                        <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server" Text="Nombre:"></asp:Label>
                    </td>
                     <td colspan="3" align="left">
                         <asp:Label ID="lblnombreusu" runat="server" Text=""></asp:Label>  
                     </td>
                 </tr>
                 <tr>
                     <td colspan="3" align="center">
                     </td>
                 </tr>
                 <tr>
                      <td align="left" style="padding:5px">
                        <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server" Text="Área:"></asp:Label>
                    </td>
                     <td colspan="2" align="left">
                         <asp:Label ID="lblarea" runat="server" Text=""></asp:Label>  
                     </td>
                </tr>
                   <td colspan="2" align="center">                       
                       <a id="btnCambiarPass" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_CambiarPSW',size:'large',iconAlign:'top'" style="width:150px" >Cambiar Contraseña</a>
                   </td>
                <tr>
               </tr>
           </table>
          </div>            
        </div>                       
        <div class="nav-list-wrapper" id="nav-list-wrapper">
            <span class="nav__title">Menu</span>
            <span class="nav__btn-close"></span>  
            <div class="nav-list-container">
                <ul class="nav-list" id="menu"></ul>
            </div>
        </div>        
        <div id="divabajo">  
           <asp:Label ID="lblMenuQuin" CssClass="LetraChicaQuin lblleft" runat="server" Text=""></asp:Label>       
           <asp:Label ID="lblusuario" CssClass="LetraChicaQuin lblright" runat="server" Text=""></asp:Label>       
        </div>                            
    </nav>        
     <!-- TweenMax -->
    <script src="../../scripts/MenuMetro/TweenMax.min.js"></script>
    <!-- Allec menu -->
    <script src="../../scripts/MenuMetro/allec-nav.js"></script>
      <div id="pacceso" class="easyui-layout" style="border-style:none; height:90%; overflow:hidden; ">       
       <div id="paneldrop" class="easyui-panel" style="border-style:none;position:relative;overflow-x:hidden;overflow-y:auto;height:100%; background-color: #eeeeee;  "></div>              
    </div>  
   
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden; display:none" id="wcontraseña" closed="true" align="center">
        <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnCancelarCambioPass">Cancelar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarCambioPass">Guardar</a>           
        </div>
        <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden; padding:10px;" align="center">       
        <table >                   
              <tr>
                  <td align="left"> <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Contraseña Anterior:</asp:Label></td>
                  <td align="left"><input class="easyui-textbox" type="password" style="width:150px" id="txtPassAnt"></td>
              </tr>                    
              <tr>
                  <td align="left"> <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Nueva Contraseña:</asp:Label></td>
                  <td align="left"><input class="easyui-textbox" type="password" style="width:150px" id="txtPassNuevo"></td>
              </tr>
              <tr>
                  <td align="left"> <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Repita Nueva Contraseña:</asp:Label></td>
                  <td align="left"><input class="easyui-textbox" type="password" style="width:150px" id="txtPassNuevo_Rep"></td>
              </tr>
        </table> 
    </div>      
    </div>  
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden; display:none" id="waccesos" closed="true" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLAcesos">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'"  id="btnGAccesos">Guardar</a>   
             <asp:Label ID="lblcamcaptura" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>         
         <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">            
                <div data-options="region:'north'" style="width:100%; height:12%; padding:2px; overflow:hidden;" align="center"> 
                     <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Menus</asp:Label> 
                     <input class="easyui-textbox" style="width:100%" id="txtmenu">
                </div>
                <div data-options="region:'south'" style="width:100%; height:88%; padding:2px; " >
                     <div id="div3"  style="height:100%; width: 100%" align="left">           
                         <ul class="easyui-tree" id="tvmenu" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>   
                     </div> 
                </div>                                       
             </div>       
      </div>  
</body>
</html>
