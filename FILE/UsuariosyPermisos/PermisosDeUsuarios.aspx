<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PermisosDeUsuarios.aspx.cs" Inherits="FILE_UsuariosyPermisos_PermisosDeUsuarios" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
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
    <script type="text/javascript" src="PermisosDeUsuarios.js?2.0"></script>    
</head>
<body>
    <form id="form1" runat="server">
    <div id="forma" align="Center">                                  
        <br />       
         <div id="tt" class="easyui-tabs" style="width: 90%; height: 600px;overflow:hidden;" data-options="plain:true">
            <div title="Menus" style="padding: 3px;overflow:hidden;" align="center">
             <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNRMenu">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRMenu" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGRMenu" >Guardar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnERMenu" >Eliminar</a>
             </div>
             <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">
                <div id="p" data-options="region:'west'" style="width:30%;padding:0px; overflow:hidden;" align="center">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtFrolmenu">
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstRMenus" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>  
                 </div>
               <div data-options="region:'center'" style="padding:3px;overflow:hidden;">
                   <div id="tpermisos" class="easyui-tabs" style="width: 100%; height: 100%;">
                       <div title="Rol de Menus" style="padding: 5px" align="center">
                           <br />
                           <table>
                               <tr>
                                   <td align="left">
                                       <asp:Label ID="Label1" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input class="easyui-textbox" style="width:200px" id="txtnomrollmenu" readonly="true"> 
                                   </td>
                               </tr>
                               <tr>
                                    <td align="left">
                                       <asp:Label ID="Label2" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input type="checkbox" id="chkArolMenu" checked="checked">
                                   </td>
                               </tr>
                           </table>
                       </div>
                       <div title="Lista de Menus" style="padding: 5px; overflow:hidden;" align="center" id="tpermisosmenu">
                            <div class="easyui-panel" style="padding:3px; width:100%">
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEmenu" >Eliminar Menus</a>   
                             </div>
                            <input class="easyui-textbox" style="width:100%" id="txtfmenu">                            
                            <div id="Div2" class="easyui-panel" style="padding:5px; width:100%;height:88%">
                                <asp:Label ID="Label15" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkmenu">
                                <ul class="easyui-tree" id="lstmenu" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                            </div> 
                       </div>
                       <div title="Lista de Catálogos" style="padding: 5px; overflow:hidden;" align="center"  id="tpermisoscatalogos">
                             <div class="easyui-panel" style="padding:3px; width:100%">
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcata" >Eliminar Catálogo</a>   
                             </div>                                                                     
                                 <table id="dgcat" class="easyui-datagrid" style="width:100%; height:93%;">     
                                <thead>
                                    <tr>
                                        <th data-options="field:'chk',checkbox:true"></th>
                                        <th data-options="field:'id',width:50,align:'left',halign:'center',hidden:true">id</th>
                                        <th data-options="field:'NombreTab',width:300,align:'left',halign:'center'">Catálogo</th>
                                        <th data-options="field:'Agregar',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Agregar</th>
                                        <th data-options="field:'Modificar',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Modificar</th>
                                        <th data-options="field:'Eliminar',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Eliminar</th>
                                        <th data-options="field:'Historia',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Historia</th>
                                        <th data-options="field:'Exportar',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Exportar</th>
                                        <th data-options="field:'Reportes',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Reportes</th>                                                                                
                                    </tr>
                                 <thead>                                      
                            </table>                            
                       </div>
                        <div title="Lista de Consultas" style="padding: 5px; overflow:hidden;" align="center"  id="tpermisosconsultas">
                             <div class="easyui-panel" style="padding:3px; width:100%">
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcon" >Eliminar Consultas</a>   
                             </div>                                                                     
                                 <table id="dgcon" class="easyui-datagrid" style="width:100%; height:93%;">     
                                <thead>
                                    <tr>
                                        <th data-options="field:'chk',checkbox:true"></th>
                                        <th data-options="field:'id',width:50,align:'left',halign:'center',hidden:true">Id</th>
                                        <th data-options="field:'NombreTab',width:300,align:'left',halign:'center'">Consultas</th>
                                        <th data-options="field:'histmovper',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Mov. Personal </th>
                                        <th data-options="field:'histmovcon',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Mov. Conceptos</th>
                                        <th data-options="field:'histdatper',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Dat. Personales</th>
                                        <th data-options="field:'histreffam',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ref. Familiares</th>
                                        <th data-options="field:'histmovesp',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Mov. Especiales</th>
                                        <th data-options="field:'histinclab',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Inc. Laborales</th>
                                        <th data-options="field:'histcapter',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Cap. Terceros</th>
                                        <th data-options="field:'histplazas',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Hist. Plazas</th>
                                        <th data-options="field:'histdetnom',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Det. Nomina</th>                                                                                
                                        <th data-options="field:'histimgexp',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Img. Expediente</th>                                                                                
                                    </tr>
                                 <thead>                                      
                            </table>                            
                       </div>
                       <div title="Creación de Plazas" align="center" style="overflow:hidden">
                            <div class="easyui-panel" style="padding:3px; width:100%">                                                    
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnECreacionPLA" >Eliminar</a>
                            </div>
                            <table id="dgcreacionpla" class="easyui-datagrid" style="width:100%; height:88%;">     
                                <thead>
                                    <tr>
                                        <th data-options="field:'chk',checkbox:true"></th>
                                        <th data-options="field:'id',width:50,align:'left',halign:'center',hidden:true">id</th>
                                        <th data-options="field:'NombreTab',width:300,align:'left',halign:'center'">Menu</th>
                                        <th data-options="field:'PlaNormales',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Normal</th>
                                        <th data-options="field:'PlaInterinos',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Interinos</th>
                                        <th data-options="field:'PlaJubPen',width:110,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Jub/Pensionados</th>
                                        <th data-options="field:'PlaNoEmp',width:100,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">No Empleados</th>
                                    </tr>
                                </thead>
                          </table>
                        </div>
                       <div title="Lista de Usuarios" style="padding: 5px; overflow:hidden;" align="center">
                            <table id="dgusumenu" style="height:100%; width:100%">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>
                       </div>
                   </div>
               </div>
             </div>
            </div>
            <div title="Movimientos" style="padding: 3px; overflow:hidden;" align="center"> 
              <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNDoc">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLDoc" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGDoc" >Guardar</a>  
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEDoc" >Eliminar</a>                                                      
             </div> 
              <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">    
                 <div id="d" data-options="region:'west'" style="width:30%;padding:0px;overflow:hidden;" align="center">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                           <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                           <input class="easyui-textbox" style="width:100%" id="txtfmov">
                      </div>
                    <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div8" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstRmov" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>                                           
                 </div>
                 <div data-options="region:'center'" style="padding:3px;overflow:hidden">
                    <div id="tmovimientos" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;">
                        <div title="Rol de Movimientos" style="padding: 5px" align="center">
                               <br />
                               <table>
                                   <tr>
                                       <td align="left">
                                           <asp:Label ID="Label4" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                       </td>
                                       <td align="left">
                                           <input class="easyui-textbox" style="width:200px" id="txtpmov" readonly="true"> 
                                       </td>
                                   </tr>
                                   <tr>
                                        <td align="left">
                                           <asp:Label ID="Label5" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                       </td>
                                       <td align="left">
                                           <input type="checkbox" id="chkpermov" checked="checked">
                                       </td>
                                   </tr>
                               </table>
                        </div>
                        <div title="Movimientos"  align="center">
                            <div id="Div6" class="easyui-accordion" style="width: 100%; height: 100%;">
                                <div title="Movimientos de Personal" align="center" style="overflow:hidden;">
                                    <div class="easyui-panel" style="padding:3px; width:100%; ">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEmp" >Eliminar Mov. de Personal</a>   
                                    </div>
                                   <input class="easyui-textbox" style="width:99%" id="txtfmp">                                                                  
                                   <div id="Div3" class="easyui-panel" style="padding:5px; width:99%;height:82%">
                                        <asp:Label ID="Label16" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkmp">       
                                       <ul class="easyui-tree" id="lstmp" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                                </div>
                               <div title="Movimientos por Conceptos"  align="center" style="overflow:hidden;">   
                                   <div class="easyui-panel" style="padding:3px; width:100%; ">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEmc" >Eliminar Mov. por Conceptos</a>   
                                    </div>                                                        
                                    <input class="easyui-textbox" style="width:99%" id="txtfmc">                                    
                                       <div id="Div4" class="easyui-panel" style="padding:5px; width:99%;height:82%">
                                           <asp:Label ID="Label17" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkmc">                                    
                                           <ul class="easyui-tree" id="lstmc" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div>                                  
                               </div>   
                               <div title="Datos Personales"  align="center" style="overflow:hidden;">
                                   <div class="easyui-panel" style="padding:3px; width:100%;">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEdp" >Eliminar Datos Personales</a>   
                                    </div>    
                                   <input class="easyui-textbox" style="width:99%" id="txtfdp">                                    
                                       <div id="Div5" class="easyui-panel" style="padding:5px; width:99%;height:82%">
                                           <asp:Label ID="Label18" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkdp">                                    
                                          <ul class="easyui-tree" id="lstdp" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div> 
                              </div>
                                <div title="Referencias Familiares"  align="center" style="overflow:hidden;">
                                   <div class="easyui-panel" style="padding:3px; width:100%;">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnErf" >Eliminar Referencias Familiares</a>   
                                    </div>    
                                   <input class="easyui-textbox" style="width:99%" id="txtfrf">                                    
                                       <div id="Div16" class="easyui-panel" style="padding:5px; width:99%;height:82%">
                                           <asp:Label ID="Label22" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkrf">                                    
                                          <ul class="easyui-tree" id="lstrf" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div> 
                              </div>
                                <div title="Incidencias Labolares"  align="center" style="overflow:hidden;">
                                    <div class="easyui-panel" style="padding:3px; width:100%;">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEil" >Eliminar Incidencias Labolares</a>   
                                    </div>    
                                   <input class="easyui-textbox" style="width:99%" id="txtfil">                                     
                                       <div id="Div11" class="easyui-panel" style="padding:5px; width:99%;height:82%">
                                           <asp:Label ID="Label19" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkil">                                    
                                          <ul class="easyui-tree" id="lstil" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div> 
                              </div>   
                          </div>
                        </div>
                        <div title="Indicadores por Movimiento"  align="center" style="overflow:hidden;">                                    
                              <div class="easyui-layout" style="width:100%;height:490px;">    
                                    <div id="Div1" data-options="region:'west'" style="width:50%; height:90%;overflow:hidden;" align="center">
                                        <asp:Label ID="Label6" CssClass="LetraChicaNegrita"  runat="server" Text="Lista de Movimientos"></asp:Label>
                                        <input class="easyui-textbox" style="width:98%" id="txtfmovimientos"> 
                                        <div class="easyui-panel" style="padding:5px; width:98%;height:90%" >
                                                <ul class="easyui-tree" id="lstmovimientos" data-options="animate:true,lines:false"></ul>
                                        </div>                   
                                    </div>
                                    <div data-options="region:'center'" style="padding:2px; width:50%; height:90%"  align="center">
                                        <asp:Label ID="Label7" CssClass="LetraChicaNegrita"  runat="server" Text="Lista de Indicadores"></asp:Label>
                                        <input class="easyui-textbox" style="width:98%" id="txtfind"> 
                                        <div class="easyui-panel" style="padding:5px; width:98%;height:90%" >
                                                <ul class="easyui-tree" id="lstind" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                        </div>                   
                                    </div>
                               </div>  
                         </div>      
                        <div title="Lista de Usuarios" style="padding: 5px;overflow:hidden;" align="center" >                            
                            <table id="dgusumov" style="height:100%; width:100%">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>                       
                       </div>                                                              
                    </div>
                  </div>
              </div>
             </div>   
            <div title="Terceros" style="padding: 3px; overflow:hidden;" align="center"> 
              <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNTer">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLTer" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGTer" >Guardar</a>  
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnETer" >Eliminar</a>                                                      
             </div>
              <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">    
                 <div id="Div9" data-options="region:'west'" style="width:30%;padding:0px;overflow:hidden;" align="center">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center">                           
                           <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                           <input class="easyui-textbox" style="width:100%" id="txtfrolter">
                      </div>
                      <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div10" class="easyui-panel" style="width:100%;height:100%">                           
                           <ul class="easyui-tree" id="lstRter" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>                                           
                 </div>
                 <div data-options="region:'center'" style="padding:3px;overflow:hidden">
                    <div id="tterceros" class="easyui-tabs" style="width: 100%; height: 100%; overflow:hidden;">
                       <div title="Rol de Terceros" style="padding: 5px" align="center">
                           <br />
                           <table>
                               <tr>
                                   <td align="left">
                                       <asp:Label ID="Label9" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input class="easyui-textbox" style="width:200px" id="txtpter" readonly="true"> 
                                   </td>
                               </tr>
                               <tr>
                                    <td align="left">
                                       <asp:Label ID="Label10" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input type="checkbox" id="chkAter" checked="checked">
                                   </td>
                               </tr>
                           </table>
                       </div>
                       <div title="Lista de Terceros" style="padding: 5px;overflow:hidden;" align="center" id="Div12">
                           <div class="easyui-panel" style="padding:3px; width:100%">
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEtr" >Eliminar Terceros</a>   
                             </div>
                            <input class="easyui-textbox" style="width:100%" id="txtfter"> 
                            <div id="Div13" class="easyui-panel" style="padding:5px; width:100%;height:88%">
                                 <asp:Label ID="Label20" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chktr">
                                <ul class="easyui-tree" id="lsttr" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                            </div> 
                       </div>
                       <div title="Lista de Usuarios" style="padding: 5px" align="center">
                            <table id="dgusuter" style="height:100%; width:100%">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>
                       </div>
                     </div>
                 </div>
             </div>
           </div>   
           <div title="Procesos Especiales" style="padding: 3px; overflow:hidden;" align="center"> 
               <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNProEsp">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLProEsp" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGProEsp" >Guardar</a>  
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEProEsp" >Eliminar</a>                                                      
             </div>
                 <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">    
                 <div id="Div21" data-options="region:'west'" style="width:30%;padding:0px;overflow:hidden;" align="center">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center">                           
                           <asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                           <input class="easyui-textbox" style="width:100%" id="txtfrolproesp">
                      </div>
                      <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div23" class="easyui-panel" style="width:100%;height:100%">                           
                           <ul class="easyui-tree" id="lstRproesp" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>                                           
                 </div>
                 <div data-options="region:'center'" style="padding:3px;overflow:hidden">
                    <div id="tproesp" class="easyui-tabs" style="width: 100%; height: 100%; overflow:hidden;">
                       <div title="Rol de Procesos Especiales" style="padding: 5px" align="center">
                           <br />
                           <table>
                               <tr>
                                   <td align="left">
                                       <asp:Label ID="Label27" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input class="easyui-textbox" style="width:200px" id="txtpproesp" readonly="true"> 
                                   </td>
                               </tr>
                               <tr>
                                    <td align="left">
                                       <asp:Label ID="Label28" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input type="checkbox" id="chkAproesp" checked="checked">
                                   </td>
                               </tr>
                           </table>
                       </div>
                       <div title="Procesos Especiales" style="padding: 5px;overflow:hidden;" align="center" id="Div25">
                            <div id="Div26" class="easyui-accordion" style="width: 100%; height: 100%;">
                                <div title="Perfiles por Carga de Excel" align="center" style="overflow:hidden;">
                                    <div class="easyui-panel" style="padding:3px; width:100%; ">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnExls" >Eliminar Perfil Carga de Excel</a>   
                                    </div>
                                   <input class="easyui-textbox" style="width:99%" id="txtfxls">                                                                  
                                   <div id="Div24" class="easyui-panel" style="padding:5px; width:99%;height:85%">
                                        <asp:Label ID="Label29" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkxls">       
                                       <ul class="easyui-tree" id="lstxls" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                   </div> 
                                </div>
                                <div title="Perfiles por Procesos Especiales" align="center" style="overflow:hidden;">
                                     <div class="easyui-panel" style="padding:3px; width:100%; ">
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnPE" >Eliminar Perfil de Proceso</a>   
                                    </div>
                                   <input class="easyui-textbox" style="width:99%" id="txtfpe">                                                                  
                                   <div id="Div27" class="easyui-panel" style="padding:5px; width:99%;height:85%">
                                        <asp:Label ID="Label30" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkpe">       
                                       <ul class="easyui-tree" id="lstpe" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                   </div> 
                                </div>
                            </div>
                       </div>
                       <div title="Lista de Usuarios" style="padding: 5px" align="center">
                            <table id="dgusuproesp" style="height:100%; width:100%">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>
                       </div>
                     </div>
                 </div>
             </div>
           </div>          
           <div title="Reportes" style="padding: 3px; overflow:hidden;" align="center"> 
                 <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNRep">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRep" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGRep" >Guardar</a>   
                     <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnERep" >Eliminar</a>                                                     
             </div>
                 <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">    
                 <div id="Div14" data-options="region:'west'" style="width:30%;padding:0px;overflow:hidden;" align="center">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                           <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                           <input class="easyui-textbox" style="width:100%" id="txtfrolRep">
                      </div>
                      <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div15" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstRRep" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>                                           
                 </div>
                 <div data-options="region:'center'" style="padding:3px;overflow:hidden">
                    <div id="treportes" class="easyui-tabs" style="width: 100%; height: 100%;">
                       <div title="Rol de Reportes" style="padding: 5px" align="center">
                           <br />
                           <table>
                               <tr>
                                   <td align="left">
                                       <asp:Label ID="Label12" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input class="easyui-textbox" style="width:200px" id="txtprep" readonly="true"> 
                                   </td>
                               </tr>
                               <tr>
                                    <td align="left">
                                       <asp:Label ID="Label14" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input type="checkbox" id="chkArep" checked="checked">
                                   </td>
                               </tr>
                           </table>
                       </div>
                       <div title="Lista de Reportes" style="padding: 5px;overflow:hidden" align="center" id="Div17">
                            <div class="easyui-panel" style="padding:3px; width:100%">
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnErp" >Eliminar Reportes</a>   
                             </div>
                            <input class="easyui-textbox" style="width:100%" id="txtfrep"> 
                            <div id="Div18" class="easyui-panel" style="padding:5px; width:100%;height:88%">
                                <asp:Label ID="Label21" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkrp">
                                <ul class="easyui-tree" id="lstrp" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                            </div> 
                       </div>
                       <div title="Lista de Usuarios" style="padding: 5px" align="center">
                            <table id="dgusurep">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>
                       </div>
                     </div>
                 </div>
             </div>
            </div>
             <div title="Filtros" style="padding: 3px; overflow:hidden;" align="center"> 
                <div class="easyui-panel" style="padding:3px; width:100%">                   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNFil">Nuevo</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLFil" >Limpiar</a>                         
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGFil" >Guardar</a>   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEFil" >Eliminar</a>                                                     
               </div>
               <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">   
                   <div id="Div19" data-options="region:'west'" style="width:30%;padding:0px;overflow:hidden;" align="center">
                       <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                           <asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Roles"></asp:Label> 
                           <input class="easyui-textbox" style="width:100%" id="txtfrolFil">
                      </div>
                      <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div20" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstRFil" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>
                   </div>
                   <div data-options="region:'center'" style="padding:3px;overflow:hidden">
                         <div id="tfiltros" class="easyui-tabs" style="width: 100%; height: 100%;">
                       <div title="Rol de Filtros" style="padding: 5px" align="center">
                           <br />
                           <table>
                               <tr>
                                   <td align="left">
                                       <asp:Label ID="Label24" CssClass="LetraChicaNegrita"  runat="server" Text="Nombre del Rol:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input class="easyui-textbox" style="width:200px" id="txtpfil" readonly="true"> 
                                   </td>
                               </tr>
                               <tr>
                                    <td align="left">
                                       <asp:Label ID="Label25" CssClass="LetraChicaNegrita"  runat="server" Text="Activo:"></asp:Label>
                                   </td>
                                   <td align="left">
                                       <input type="checkbox" id="chkAfil" checked="checked">
                                   </td>
                               </tr>
                           </table>
                       </div>
                       <div title="Filtros" style="padding: 5px;overflow:hidden" align="center" id="Div22">
                            <div class="easyui-panel" style="padding:3px; width:100%">  
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEfi" >Eliminar Filtro</a>                               
                             </div>  
                             <input class="easyui-textbox" style="width: 100%; height: 94%" id="txtquery" data-options="multiline:true">                          
                       </div>
                       <div title="Lista de Usuarios" style="padding: 5px" align="center">
                            <table id="dgfil">
                                <thead>
                                    <tr>
                                        <th data-options="field:'nombre',align:'left',halign:'center'">Usuario</th>
                                        <th data-options="field:'area',align:'left',halign:'center'">Area</th>                                        
                                    </tr>
                                 <thead>                                      
                            </table>
                       </div>
                     </div>
                   </div>
                </div>
             </div>
        </div>                       
        <div class="modal" style="display: none" id="loading" align="Center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
          </div>         
    </div>
    </form>
</body>
</html>
