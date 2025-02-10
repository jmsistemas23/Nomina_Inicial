<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Campos_Terceros.aspx.cs" Inherits="FILE_Terceros_Campos_Terceros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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
     <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    
    <script src="Campos_Terceros.js?0.0"></script>
</head>
<body>
    <form id="form1" runat="server">
   <div id="forma" align="Center">
    <div id="dmenu" style="width:100%; padding:0px;" align="Center">
         <div class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Nuevo</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModificar">Editar</a>            
           </div>
           <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblPerfil" CssClass="LetraChica" runat="server" Text=""></asp:Label><br>
                    </td>
                </tr>                
            </table>         
        <br />
         <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocam"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocon">                                                                                                
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtval">
                </td>
                    <td align="Center">
                    <a id="btnBuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
               <br />
            <table id="dglista" style="height:550px"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'cvecamtr',width:100,align:'center',halign:'center'">Clave</th>  
                        <th data-options="field:'nomcamtr',width:150,align:'left',halign:'center'">Campo</th>  
                        <th data-options="field:'descamtr',width:300,align:'left',halign:'center'">Descripción</th>  
                        <th data-options="field:'tipcamtr',width:100,align:'center',halign:'center'">Tipo</th>  
                        <th data-options="field:'camsizetr',width:100,align:'center',halign:'center'">Tamaño</th>                        
                    </tr>
                  </thead>                          
            </table>                 
    </div>
    <div id="dcaptura" style="display:none; width:100%; height:100%; padding:0px"  align="Center">
        <div class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCap">Limpiar</a>                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>  
            <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server"></asp:Label>               
        </div>
        <br />
         <asp:Label ID="lblmov" CssClass="LetraChica" runat="server" Text=""></asp:Label><br>
        <br />
        <table style="border-spacing: 5px">                    
              <tr>
                <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label></td>            
                <td align="left"><input class="easyui-textbox" style="width:80px" id="txtclave"/></td>
              </tr>
              <tr>
                <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Campo:</asp:Label></td>
                <td align="left"><input class="easyui-textbox" style="width:200px" id="txtcampo"/></td>
              </tr>
              <tr>
                <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
                <td align="left"><input class="easyui-textbox" style="width:300px" id="txtdescripcion"/></td>                
              </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Tipo:</asp:Label></td>
                <td align="left"><input class="easyui-textbox" style="width:150px" id="txtTipoDato"/></td>                
              </tr>
            <tr>
                <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Tamaño:</asp:Label></td>
                <td align="left"><input class="easyui-textbox" style="width:100px" id="txttamaño"/></td>                
              </tr>
        </table>        
    </div>
  </div>
     <div class="modal" style="display: none; " id="loading" algin="center" >
       <div class="center">
         <img alt="" src="../../Imagenes/ajax-loader.gif" />
       </div> 
     </div>
    </form>
</body>
</html>
