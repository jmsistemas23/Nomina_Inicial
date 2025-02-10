<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu.aspx.cs" Inherits="FILE_Sistema2_Menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	   

    <link href="../../Styles/EstiloFuente.css" rel="stylesheet" />
    <link rel="stylesheet" href="style-allec-nav.css"/>
     <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />   
     
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
	<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css" />	

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../scripts/jquery.slidereveal.min.js"></script>
    <script type="text/javascript" src="../../scripts/jquery.slidereveal.js"></script>
    <script src="../../Scripts/Funsiones.js"></script>
    <script src="Menu.js?0.5"></script>

     <style type="text/css">      
      .slider{
        background-color: #eeeeee;
        color: black;
      }       
      .noscroll{
         overflow:hidden;
      }        
    </style>    
</head>
<body>    
     <% 
         ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
         if (objusuario != null)
         {

             lblQuin.InnerText = objusuario.QuinMulti;
             lblusuario.InnerText = objusuario.Nombre;

             lblusu.Text = objusuario.Usuario;
             lblnombreusu.Text = objusuario.Nombre;
             lblarea.Text = objusuario.Area;
         }
         else { Response.Redirect("../../Login.aspx"); }
        %>    
   <img src="../../Imagenes/wave.png" class="fixed hidden sm:block h-full w-2/4 inset-0" style="z-index: -1;"/>          
   <nav class="nav w-screen h-screen flex flex-col" id="nav">                   
        <div class="flex-grow grid grid-flow-col grid-cols-1">            
	            <div class="w-auto h-auto py-1 px-1">                                                             
                    <div id="dlogo-accesos" class="flex flex-wrap h-full ">
                        <div class="w-full sm:w-1/2 ">
                            <img id="imglogo" src="../../Imagenes/LOGO1.png" class="fixed  sm:block h-full w-2/4 inset-0" style="z-index: -1;"/>
                        </div>
                        <div class="w-full sm:w-1/2 ">
                             <div id="paneldrop"  style="position:relative;overflow-x:hidden;overflow-y:auto;height:100%;"></div>              
                        </div>
                    </div>                
                    <div id="tt" class="easyui-tabs" style="width: 100%;  height:100%; display:none"></div>                                                       
	            </div>                  
                <div class="w-16 text-center ">                    
                      <div class="grid gap-2 py-1">
			              <div class="inline-block mr-2 mt-2 ">
                            <button id="btnMenu" type="button" class="nav__btn-open focus:outline-none text-white text-sm py-4 px-5 rounded-md bg-red-800 hover:bg-red-500 hover:shadow-lg" title="Menu">                              
                              <img src="../../Imagenes/botones/menu.png" alt="..." class="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                            </button>
                        </div>
                          <div class="inline-block mr-2 mt-2 ">
                            <button id="btnUsuario" type="button" class="nav__btn-usu focus:outline-none text-white text-sm py-4 px-5 rounded-md bg-red-800 hover:bg-red-500 hover:shadow-lg" title="Usuarios">                              
                              <img src="../../Imagenes/botones/USUARIO.png" alt="..." class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"  />
                            </button>
                        </div>
                          <div class="inline-block mr-2 mt-2 ">
                            <button id="btnAccesos" type="button" class="nav__btn-usu focus:outline-none text-white text-sm py-4 px-5 rounded-md bg-red-800 hover:bg-red-500 hover:shadow-lg" title="Accesos">                              
                              <img src="../../Imagenes/botones/Accesos.png" alt="..." class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"  />
                            </button>
                        </div>
                           <div class="inline-block mr-2 mt-2 ">
                            <button id="btnCerrar" type="button" class="focus:outline-none text-white text-sm py-4 px-5 rounded-md bg-red-800 hover:bg-red-500 hover:shadow-lg" title="Cerrar">                              
                              <img src="../../Imagenes/botones/CERRAR.png" alt="..." class="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
                            </button>
                        </div>
		            </div>                    
                </div>                
        </div>                      
        <footer class="px-1 py-1 h-auto bg-red-800 grid grid-flow-col grid-cols-1 static bottom-0" >
            <label id="lblQuin" runat="server" class="text-left text-white font-bold "></label>
            <label id="lblusuario" runat="server" class="text-right text-white font-bold"></label>
        </footer>  
       <div class="nav-list-wrapper" id="nav-list-wrapper">
            <span class="nav__title">Menu</span>
            <span class="nav__btn-close"></span>  
            <div class="nav-list-container">
                <ul class="nav-list" id="menu"></ul>
            </div>
      </div>         
   </nav>
   
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
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcontraseña" closed="true" align="center">
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
                <div data-options="region:'north'" style="width:100%; height:8%; padding:2px; overflow:hidden;" align="center">                      
                     <input class="easyui-textbox" style="width:100%" id="txtmenu">
                </div>
                <div data-options="region:'south'" style="width:100%; height:92%; padding:2px; " >
                     <div id="div3"  style="height:100%; width: 100%" align="left">           
                         <ul class="easyui-tree" id="tvmenu" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>   
                     </div> 
                </div>                                       
             </div>       
      </div>  
    <!-- TweenMax -->
    <script src="TweenMax.min.js"></script>
    <!-- Allec menu -->
    <script src="allec-nav.js"></script>        
</body>
</html>
