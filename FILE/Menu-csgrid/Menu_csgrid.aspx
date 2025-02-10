<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu_csgrid.aspx.cs" Inherits="FILE_Menu_csgrid_Menu_csgrid" %>

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
     
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script src="../../Scripts/Funsiones.js"></script>
    <script src="Menu_csgrid.js"></script>

    
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
	<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	

    <link href="style-allec-nav_nvo.css" rel="stylesheet" />
    <link href="demo-style.css" rel="stylesheet" />
    <link href="Menu.css" rel="stylesheet" />
</head>
<body class="initial-page">
    <nav class="nav grid-container" id="nav">       
          <div class="item1">             
             <div class="gridlogo" id="dgridlogo">                
                  <div id="tt" class="easyui-tabs" style="width:100%;  height:100%; "></div>                 
                 <div id="imglogo" class="glogo"></div> 
                 <div id="pacceso" class="daccesos">                   
                   <div id="paneldrop" class="easyui-panel" style=" border-style:none;position:relative;overflow-x:hidden;overflow-y:auto;height:auto; width:50%; background-color: #eeeeee; "></div>                        
                 </div>
             </div>
          </div>  
          <div class="item2">        
               <div class="MenuInicial">
                  <ul>
                      <li><a class="nav__btn-open aMenu" href="javascript:void(0);" id="btnmenu"></a></li>
                      <li><a class="aUsuarios" href="#" id="btnusuario"></a></li>
                      <li><a class="aAccesos" href="#" id="btnAccesos"></a></li>
                      <li><a class="aSalir" href="#"></a></li>
                  </ul>
              </div>
          </div>
         <div class="item3 gridquin">
             <div class="datosquin"><asp:Label ID="lblMenuQuin" CssClass="LetraChicaQuin lblleft" runat="server" Text=""></asp:Label></div>  
             <div class="datosusu"><asp:Label ID="lblusuario" CssClass="LetraChicaQuin lblright" runat="server" Text=""></asp:Label></div>
         </div> 
         <div class="nav-list-wrapper" id="nav-list-wrapper">                  
                <span class="nav__title">Menu</span>
                <span class="nav__btn-close"></span>                                 
                <div class="nav-list-container">     
                    <ul class="nav-list" id="menu"></ul>          
                </div>
        </div>       
    </nav>
    <script src="TweenMax.min.js"></script>
    <script src="allec-nav.js"></script>  
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
