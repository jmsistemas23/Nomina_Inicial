<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogo_Perfiles.aspx.cs" Inherits="FILE_ProcesosEspeciales_Perfiles_Catalogo_Perfiles" %>

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
   <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>

    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="Catalogo_Perfiles.js?1.2"></script>  
</head>
<body>
    <form id="form1" runat="server">    
     <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">
         <div class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Nuevo</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModificar">Editar</a>            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Ordenfolio',disabled:false" id="btnModificarOrd">Modificar Orden</a>            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnDiseño">Diseño</a>
           </div>
          <br />          
         <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:150px;" id="cbcampos" name="state" data-options="editable:false"></input>
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
         <table id="dglista"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true">Clave</th>
                        <th data-options="field:'ordenperfil',width:80,align:'center',halign:'center'">Orden Perfil</th>
                        <th data-options="field:'descripcion',width:300,align:'left',halign:'center'">Descripción</th>  
                        <th data-options="field:'cveind',width:100,align:'center',halign:'center'">Indicador</th>
                        <th data-options="field:'desind',width:300,align:'left',halign:'center',hidden:true">Desc. Indicador</th>  
                        <th data-options="field:'diseño',width:80,align:'center',halign:'center'">Diseño</th>
                        <th data-options="field:'procedimiento',width:300,align:'center',halign:'center'">Proceso</th>                               
                        <th data-options="field:'activo',width:80,align:'center',halign:'center'">Activo</th>                               
                        
                    </tr>
                  </thead>                          
            </table>                        
     </div>
     <div id="dcaptura" style="width:100%;height:100%;padding:0px; display:none" align="Center">                 
         <div class="easyui-panel" style="padding:3px; width:100%">                               
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>                     
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>   
              <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>  
           <br />                                        
            <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server" Text=""></asp:Label>         
            <br />
         <br />
            <table>
                <tr>
                    <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label></td>
                    <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtclave" data-options="readonly:true" value=""></input></td> 
                </tr>
                <tr>
                    <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
                    <td align="left"><input  class="easyui-textbox"  style="width:400px;" id="txtdescripcion"  value=""></input></td> 
                </tr>
                 <tr>
                    <td align="left"> <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:100px" id="txtConceptoP" data-options="readonly:true">
                           <a id="btnConceptoP" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" style="width: 70px">Buscar</a>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLConceptoP">Limpiar</a>
                     </td>
                 </tr>
                   <td align="left"> <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Descripción Ind:</asp:Label></td>
                   <td align="left"><input class="easyui-textbox" style="width:300px" id="txtDesConcepto" data-options="readonly:true"></td>
                 <tr>
                     </tr>
                   <td align="left"> <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Proceso:</asp:Label></td>
                   <td align="left"><input class="easyui-textbox" style="width:300px" id="txtproceso" data-options="readonly:true"></td>
                 <tr>
                 </tr>
                <tr>
                    <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Activo:</asp:Label></td>
                    <td align="left"><input type="checkbox" id="chkactivo" ></input></td> 
                </tr>
            </table>
     </div>   
    <div id="dorden" style="width:100%; display:none; height:100%; padding:0px" align="Center">
        <div class="easyui-panel" style="padding:3px; width:100%">                               
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarO">Regresar</a>                     
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarO">Guardar</a>                 
         </div>  
           <br />                                        
          <table id="dgorden" class="easyui-datagrid">   
                  <thead>
                    <tr>     
                        <th data-options="field:'chk',checkbox:true"></th>        
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true ">Clave</th>
                        <th data-options="field:'ordenperfil',width:80,align:'center',halign:'center', editor: { type: 'textbox'}">Orden Perfil</th>
                        <th data-options="field:'descripcion',width:400,align:'left',halign:'center'">Descripción</th>
                    </tr>
                  </thead>                          
            </table>                     
    </div>
     <%-- <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wind" closed="true" align="center">                             
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table style="display:none;" id="dgind"> 
                <thead>
                    <tr>
                        <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'descripcion',width:400,align:'left'">Descripcion</th>  
                    </tr>
                </thead>                   
            </table>                                                           
        </div>                --%>
         <div id="wind" class="easyui-window" title="Buscar Conceptos" data-options="modal:true,minimizable:false,collapsible:false,maximizable:false,closed:true,iconCls:'icon-search'"  align="center" style=" width: 650px; height: 600px; overflow:hidden;">
         <div class="easyui-panel" style="padding:3px; width:100%">                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnCancelarConceptos">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptarConceptos">Aceptar</a>                          
         </div> 
             <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
         <table class="easyui-datagrid" style="width: 100%; height: 90%;" id="dgConceptos" data-options = "striped: true,rownumbers: true, singleSelect: false, autoRowHeight: false, pageSize: 10 "></table>      
     </div>
    <div class="modal" style="display: none;" id="loading"  align="Center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
      </div>    
    </form>
</body>
</html>