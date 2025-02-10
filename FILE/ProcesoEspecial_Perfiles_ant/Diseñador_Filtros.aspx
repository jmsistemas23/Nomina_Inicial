<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseñador_Filtros.aspx.cs" Inherits="FILE_ProcesoEspecial_Perfiles_Diseñador_Filtros" %>

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
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link href="../../Styles/loader.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">    
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="Diseñador_Filtros.js?1.0"></script>  
</head>
<body>
    <form id="form1" runat="server">    
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
         <table id="dglista"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'id',width:80,align:'center',halign:'center'">Clave</th>  
                        <th data-options="field:'descripcion',width:300,align:'left',halign:'center'">Descripción</th>  
                        <th data-options="field:'activo',width:80,align:'center',halign:'center'">Activo</th>                          
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
                    <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
                    <td align="left"><input  class="easyui-textbox"  style="width:300px;" id="txtdescripcion"  value=""></input></td> 
                </tr>
                <tr>
                    <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Activo:</asp:Label></td>
                    <td align="left"><input type="checkbox" id="chkactivo" ></input></td> 
                </tr>
            </table>
     </div>                 
    <div class="modal" style="display: none;" id="loading"  align="Center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
      </div>    
    </form>
</body>
</html>
