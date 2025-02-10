<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ClonarPermisos.aspx.cs" Inherits="FILE_UsuariosyPermisos_ClonarPermisos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>	     

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>  
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js?v1"></script>     
    <script src="ClonarPermisos.js?v1.4"></script>
</head>
<body>
    <form id="form1" runat="server">
         <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">  
              <div class="easyui-panel" style="padding:3px; width:100%">                                                     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar' ,disabled:false" id="btnLimpiar" >Limpiar</a>                        
            </div>       
             <br />
        <div class="easyui-layout" style="width:60%;height:50%;overflow:hidden;">
             <div data-options="region:'west'" style="width:50%; height:100%; padding:0px;overflow:hidden;" align="center">
                 <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden; border:hidden">
                    <div data-options="region:'north'" style="width:100%; height:14%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label  CssClass="LetraChicaNegrita" runat="server" Text="Usuario Destino"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtusudestino"/>                                              
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:86%; padding:3px; overflow:hidden;" >
                        <div  class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstusudestino" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                </div>  
             </div>
             <div data-options="region:'center'" style="width:50%;height:100%; padding:0px;overflow:hidden;" align="center">
                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden; border:hidden">
                    <div data-options="region:'north'" style="width:100%; height:14%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label  CssClass="LetraChicaNegrita" runat="server" Text="Usuario Origen"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtusuorigen"/>                                                
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:86%; padding:3px; overflow:hidden;" >
                        <div  class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstusuorigen" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                    </div>                   
             </div>                     
        </div>  
             <br />
         <table align="center">
                <tr>
                    <td align="Left"><asp:Label ID="Label20" CssClass="LetraChicaNegrita"  runat="server" Text="Eliminar Permisos del Usuario Origen:"></asp:Label></td>
                    <td align="Left"><input type="checkbox" id="chkelipermisos"/></td>
               </tr>
        </table>
        <table id="dgroles" class="easyui-datagrid"  style="width:50%; height:15%;" toolbar="#tbrol">              
                <thead data-options="frozen:false">
                     <tr>
                         <th data-options="field:'usuario',width:150,align:'center',halign:'center'">Usuario</th>
                         <th data-options="field:'Menu',width:100,align:'center',halign:'center'">Menu</th>
                         <th data-options="field:'Documentos',width:100,align:'center',halign:'center'">Documentos</th>
                         <th data-options="field:'Reportes',width:100,align:'center',halign:'center'">Reportes</th>
                         <th data-options="field:'Terceros',width:100,align:'center',halign:'center'">Terceros</th>
                         <th data-options="field:'Filtros',width:100,align:'center',halign:'center'">Filtros</th>
                         <th data-options="field:'ProEsp',width:100,align:'center',halign:'center'">ProEsp</th>
                     </tr>
                </thead>
        </table>
        <div id="tbrol" style="height:auto">                
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true,disabled:true" id="btnAplicarRoles">Aplicar Roles</a>
        </div>
       <br />
       <table id="dgInd" class="easyui-datagrid"  style="width:40%; height:15%;" toolbar="#tbind">              
                <thead data-options="frozen:false">
                     <tr>
                         <th data-options="field:'usuario',width:150,align:'center',halign:'center'">Usuario</th>
                         <th data-options="field:'Menu',width:100,align:'center',halign:'center'">Menu</th>
                         <th data-options="field:'Catalogos',width:100,align:'center',halign:'center'">Catálogos</th>
                         <th data-options="field:'Consultas',width:100,align:'center',halign:'center'">Consultas</th>
                         <th data-options="field:'Plazas',width:100,align:'center',halign:'center'">Plazas</th>
                         
                     </tr>
                </thead>
        </table>
        <div id="tbind" style="height:auto">                
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok',plain:true,disabled:true" id="btnAplicarInd">Aplicar Permisos Individual</a>
        </div>
       </div>
         <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>          
    </form>
</body>
</html>
