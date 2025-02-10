<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogo_Perfiles.aspx.cs" Inherits="FILE_DiseñadorDeBancos_Catalogo_Perfiles" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>     
    <script type="text/javascript" src="Catalogo_Perfiles.js?1.1"></script>  
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">               
        <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">
         <div class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Nuevo</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModificar">Editar</a>            
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
                        <option value="=">Exacta</option>
                         <option value="like">Aproximada</option>
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
         <table id="dg"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'id',width:80,align:'center',halign:'center'">Id</th>  
                        <th data-options="field:'nombre',width:300,align:'left',halign:'center'">Nombre</th>  
                        <th data-options="field:'visible',width:80,align:'center',halign:'center'">Visible</th>                          
                    </tr>
                  </thead>                          
          </table>                        
     </div>
       <div id="dcaptura" style="width:100%;height:100%;padding:0px; display:none" align="Center">                 
         <div class="easyui-panel" style="padding:3px; width:100%">                               
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarcap">Limpiar</a>              
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
                    <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                    <td align="left"><input  class="easyui-textbox"  style="width:300px;" id="txtdescripcion"  value=""></input></td> 
                </tr>
                <tr>
                    <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Visible:</asp:Label></td>
                    <td align="left"><input type="checkbox" id="chkactivo" ></input></td> 
                </tr>
            </table>
     </div>               
    </div>
    </form>
     <div class="modal" style="display: none;" id="loading" align="center">
             <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
     </div>
</body>
</html>
