<%@ Page Language="C#" AutoEventWireup="true"  %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
     <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Perfiles_Calculo.js?1.1"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
      <div id="dmenu" style="width:100%; height:100%; padding:0px">          
          <div class="easyui-panel" style="width:100%;  padding:3px">                           
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevoPerfil" >Nuevo</a>    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnlimpiar">Limpiar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditar">Editar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>  
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_marcar',disabled:true" id="btnProcedimientos" >Procedimientos</a>                                 
          </div>                       
           <br />
              <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label4" CssClass="TituloMedio" runat="server" Text="PERFILES DE CÁLCULO"></asp:Label><br>
                    </td>
                </tr>                
            </table>
              <br />    
               <table>                    
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                    </td>
                    <td align="Center"> 
                        <input  class="easyui-combobox"  style="width:100px;" id="cbcampos" name="state"></input>
                    </td>
                    <td align="Center"> 
                        <select class="easyui-combobox"  style="width:120px;" id="cbcondicion" data-options="editable:false">                                                                                                                              
                            <option value="like">Aproximada</option>
                            <option value="=">Exacta</option>
                        </select>
                    </td>
                    <td align="Center">
                        <input class="easyui-textbox" style="width:250px" id="txtvalor">
                    </td>
                        <td align="Center">
                        <a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                    </td>
                </tr>                  
              </table>  
               <br />         
               <table class="easyui-datagrid" id="dgPerfiles">
                    <thead>
                    <tr>                        
                        <th data-options="field:'id',width:65,align:'center',halign:'center'">Id</th>  
                        <th data-options="field:'perfil',width:500,align:'left',halign:'center'">Perfil</th>                         
                        <th data-options="field:'activo',width:65,align:'center',halign:'center'">Activo</th>                         
                    </tr>
                  </thead>               
               </table>                     
       </div>  
      <div id="dcaptura" style="display:none; width:100%; height:100%; padding:0px">
          <div class="easyui-panel" style="width:100%;  padding:3px; ">
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarPerfil">Regresar</a>  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCaptura">Limpiar</a>             
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarPerfil">Guardar</a>                                             
          </div>  
          <br />
             <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server" Text=""></asp:Label>
          <br />
          <br />
          <div align="center">
            <table>
               <tr>
                  <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtClave" data-options="readonly:true"></input></td>
               </tr>               
               <tr>
                 <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Nombre De Perfil:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:400px;" id="txtNombre"></input><td>
               </tr>               
               <tr>
                 <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Activo:</asp:Label></td>
                   <td align="left"><input type="checkbox" id="chkActivo" name="chkActivo" value="chkActivo"></td>
               </tr>                
             </table>         
          </div>
      </div>
      <div id="dlista"  style="display:none; width:100%; height:100%; padding:0px">
            <div class="easyui-panel" style="width:100%;  padding:3px;">
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarLista">Regresar</a>  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'"  id="btnAgregarProcedimiento" >Agregar</a>
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminarProcedimiento">Eliminar</a>               
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-clear',disabled:true " id="btnDesactivaProcedimiento">Activar/Desactivar</a>   
                <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server" Text=""></asp:Label>                             
          </div>  
          <%--  <br />  
           <table>                    
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                    </td>
                    <td align="Center"> 
                        <input  class="easyui-combobox"  style="width:200px;" id="cbocamproc" name="state"></input>
                    </td>
                    <td align="Center"> 
                        <select class="easyui-combobox"  style="width:120px;" id="cboconproc">                                                                                                  
                            <option value="=">Exacta</option>
                            <option value="like">Aproximada</option>
                        </select>
                    </td>
                    <td align="Center">
                        <input class="easyui-textbox" style="width:250px" id="txtvalproc">
                    </td>
                        <td align="Center">
                        <a id="A1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                    </td>
                </tr>                  
              </table> --%> 
          <br />
          <div class="easyui-panel" style="width:30%;  padding:3px; ">
          <table style="width: 100%;">
                    <tr>
                        <td align="Center">
                            <asp:Label ID="lblmodOrden" CssClass="LetraChica" runat="server">Subir/Bajar</asp:Label>
                            <input  class="easyui-textbox"  style="width:25px; text-align:center" id="txtmodOrden" data-options="disabled:true" value="1"></input>                            
                            <asp:Label ID="Label7" CssClass="LetraChica" runat="server">Posiciones</asp:Label>
                            <a id="btnSubirOrden" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-subir',disabled:true" >Subir</a>
                            <a id="btnBajarOrden" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bajar',disabled:true" >Bajar</a>                            
                        </td>
                    </tr>
           </table> 
          </div>
          <br />     
        <%--  <div class="easyui-panel" style="width:70%; height:80%; padding:3px; ">   --%>
          <table class="easyui-datagrid" id="dgProcedimientosAsignados" style="width:70%; height:75%;">
                <thead>
                    <tr>                        
                        <th data-options="field:'fkProcedimiento',width:65,align:'center',halign:'center'">Clave</th>  
                        <th data-options="field:'Procedimiento',width:800,align:'left',halign:'center'">Procedimiento</th>                         
                        <th data-options="field:'Orden',width:65,align:'center',halign:'center'">Orden</th>                         
                        <th data-options="field:'Activo',width:65,align:'center',halign:'center'">Activo</th>                         
                    </tr>
                  </thead>
          </table>   
      <%--   </div>   --%>
      </div>      
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="modalProcedimientos" closed="true">
          <div class="easyui-panel" style="width:100%;  padding:3px; ">
                <a id="btnCancelarProcedimientos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cerrar'">Cancelar</a>                    
                <a id="btnAceptarProcedimientos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" >Aceptar</a>
          </div>
          <br />
            <table class="easyui-datagrid" id="dgAsignaProcedimientos" style="width:100%; height:94%;">
                <thead>
                    <tr> 
                        <th data-options="field:'chk',checkbox:true"></th>                       
                        <th data-options="field:'fkProcedimiento',width:50,align:'center',halign:'center'">Clave</th>  
                        <th data-options="field:'Procedimiento',width:600,align:'left',halign:'center'">Procedimiento</th>                         
                        <th data-options="field:'Orden',width:70,align:'center',halign:'center'">Orden</th>                         
                        <th data-options="field:'Activo',width:70,align:'center',halign:'center'">Activo</th>                              
                    </tr>
                  </thead>    
          </table>
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
