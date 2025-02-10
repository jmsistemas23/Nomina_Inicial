<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Creacion_Menu.aspx.cs" Inherits="FILE_Asistentes_Creacion_Menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">	     

    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>  
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script> 
     <script type="text/javascript" src="Creacion_Menus.js?1.0"></script>    
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar" >Limpiar</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Agregar</a>      
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-no',disabled:true" id="btnEliminar" >Eliminar</a>                                
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar" >Guardar</a>                                                        
            </div>  
        <div class="easyui-layout" style="width:90%;height:85%; overflow:hidden; margin-top:30px; ">
            <div id="p" data-options="region:'west'" style="width:30%;padding:0px; overflow:hidden;" align="center">
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:9%; padding:5px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Menus"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtFmenu">
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstMenus" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                   </div>     
            </div>
            <div data-options="region:'center'" style="padding:5px;overflow:hidden;" align="center">
                <table style="margin-top:30px;">                   
                    <tr>
                        <td align="left"> <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nivel Superior:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:50px" id="txtpropietario" data-options="readonly:true">
                           <input class="easyui-textbox" style="width:450px" id="txtNomPropietario" data-options="readonly:true">
                           <a id="btnNuevoPropietario" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" style="width: 80px">Cambiar</a></td>
                    </tr>                    
                     <tr>
                        <td align="left"> <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Nombre del Menu:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:50px" id="txtId" data-options="readonly:true"><input class="easyui-textbox" style="width:450px" id="txtnombremenu"></td>
                    </tr>
                     <tr>
                        <td align="left"> <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Nombre de la Pestaña:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:500px" id="txtnombretab"></td>
                    </tr>
                     <tr>
                        <td align="left"> <asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">URL de la Página:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:500px" id="txturl"></td>
                    </tr>
                                       <tr>
                        <td align="left"> <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">URL de imagen:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:500px" id="txturlimg"></td>
                    </tr>
                     <tr>
                        <td align="left"> <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Orden Menu:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:50px" id="txtorden"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita"  runat="server">Visible:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkvisible" ></td>
                    </tr>
                </table>
                <br />  
                <div title="Empleados" style="overflow:auto;padding:5px;" align="center">               
                      <table class="easyui-datagrid" id="dg"  style="width:90%; height:auto">
                        <thead>
                        <tr>                        
                            <th data-options="field:'id',width:50,align:'center',halign:'center'">Id</th>                              
                            <th data-options="field:'nombretab',width:300,align:'left',halign:'center'">Nombre</th>        
                            <th data-options="field:'url',width:440,align:'left',halign:'center'">Url</th>                                                    
                            <th data-options="field:'orden',width:50,align:'center',halign:'center'">Orden</th>                  
                        </tr>
                        </thead>
                       </table>       
                   </div>           
            </div>
         </div> 
    </div>

    <div id="modalPropietarios" class="easyui-window" title="Seleccione Nuevo Nivel" data-options="modal:true,minimizable:false,collapsible:false,maximizable:false,closed:true,iconCls:'icon-search'" style="width: 450px; height: 650px; overflow:hidden;">         
        <div id="Div6" class="easyui-panel" style="width:100%;height:100%"> 
           <ul class="easyui-tree" id="lstPropietario" data-options="animate:true,lines:false"></ul>
        </div>
     </div>

    </form>
</body>
</html>
