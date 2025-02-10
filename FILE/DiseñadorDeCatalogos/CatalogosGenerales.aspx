<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CatalogosGenerales.aspx.cs" Inherits="FILE_CatalogosGenerales_CatalogosGenerales" %>

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

        <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
        <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
        <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
         <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
       <%-- <script src="../../Scripts/jquery-3.3.1.min.js"></script>--%>
        <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="../../scripts/demos.js"></script>
	    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>   
      <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-export.js"></script>
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
      <script src="../../Scripts/base64js.min.js"></script>   
         <script src="../../Scripts/jquery-Mask.js"></script>  
         <script src="../../Scripts/jquery.session.js"></script>  
        <script type="text/javascript" src="CatalogosGenerales.js?v2.6"></script>  
      
</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
      <div id="pinicial" title="" style="width:100%;height:100%;padding:0px;" align="Center">                          
          <div id="dmenu" class="easyui-panel" style="padding:3px; width:100%">    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRvista">Regresar</a>      
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLvista">Limpiar</a>                           
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnagregar">Nuevo</a>        
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btneditar">Editar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btneliminar">Eliminar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-historial',disabled:true" id="btnhistoria">Historia</a>
              <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-reportes'" id="btnreportes">Reportes</a>--%>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel'" id="btnexportar">Exportar Excel</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior',disabled:false" id="btnANivel">Anterior</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'siguiente',disabled:true" id="btnSNivel">Siguiente</a>
               <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server" Text=""></asp:Label>            
          </div>  
          <br />                     
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbcampos" name="state" data-options="editable:false"></input>
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
          <table style="display:none; height:60%" id="dg">           
            </table>  
          
       </div>
       <div id="pcaptura" title="" style="width:100%;height:100%;padding:0px; overflow:hidden; display:none" align="Center">                 
              <div class="easyui-panel" style="padding:3px; width:100%">                  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnregresar">Regresar</a>        
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnlimpiar">Limpiar</a>                   
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnguardar">Guardar</a>                              
             </div>  
           <br />           
              <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server" Text=""></asp:Label>
            <br />
            <div  style="width:100%;height:90%; overflow-y:auto;" align="center">
                <div id="Dcaptura" align="Center"></div>                  
                <div id="p" title="Panel" style="width:700px;height:300px;padding:10px; display:none;"></div>
            </div>           
         </div>   
           <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" id="wincat" closed="true" align="Center">                    
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamcat"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cboconcat" data-options="editable:false">                                                                                                                                        
                               <option value="like">Aproximada</option>
                               <option value="=">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:250px" id="txtvalcat"/>
                      </td>
                      <td align="Center">
                         <a id="btnfiltrarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>                
                 <table style="display:none; height:531px; width:100%" id="dgcat">           
                </table>                                                                
        </div>   
            <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO.jpg'); overflow:hidden;" id="wvista" closed="true" align="center">
              <div id="pvista" title="Panel" style="width:100%;height:100%;padding:3px;"></div>
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
