<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogo_Consultas.aspx.cs" Inherits="FILE_DiseñadorDeConsultas_Catalogo_Consultas" %>

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
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Catalogo_Consultas.js?1.0"></script>
</head>
<body>   
    <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
          <div class="easyui-panel" style="padding:3px; width:100%">                                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>      
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAgregar">Agregar</a> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditar">Modificar</a>                                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>              
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnConfiguracionCon">Configuración Consulta</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-cat',disabled:true" id="btnVistaCon">Vista Consulta</a>    
        </div>
            <br /><br />
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocammod" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconmod" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalmod">
                </td>
                    <td align="Center">
                    <a id="btnBuscarmod" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
            <br />
            <table style="display:none; height:60%" id="dgconsulta"> 
                  <thead>
                    <tr>                                                                                                
                        <th data-options="field:'Id',width:100,align:'center',halign:'center',hidden:true">Id</th>     
                        <th data-options="field:'Descripcion',width:350,align:'left',halign:'center'">Descripción</th>
                        <th data-options="field:'Paginacion',width:80,align:'center',halign:'center',hidden: false">Paginación</th>
                        <th data-options="field:'NumFilas',width:70,align:'center',halign:'center',hidden: false">Registros</th>
                        <th data-options="field:'Ancho',width:60,align:'center',halign:'center',hidden: false">Ancho</th>
                        <th data-options="field:'Alto',width:60,align:'center',halign:'center',hidden: false">Alto</th>                                          
                    </tr>
                  </thead>                          
           </table> 
        </div>   
        <div id="dcaptura" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
            <div class="easyui-panel" style="padding:3px; width:100%">               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRMenu">Regresar</a>              
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLCaptura">Limpiar</a>                 
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGCaptura">Guardar</a>     
                <asp:Label ID="lblconsulta" CssClass="LetraChicaNegrita"  runat="server"></asp:Label>           
            </div>
             <br />  
            <br />  
              <table>
                 <tr>
                     <td align="center" colspan="2"><asp:Label ID="lblmov" CssClass="LetraChicaNegrita"  runat="server"></asp:Label></td>
                 </tr>
                 <tr>
                     <td align="center" colspan="2">&nbsp;</td>
                 </tr>
                 <tr>
                    <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita"  runat="server">Titulo de la Consulta:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:300px" id="txttitulo"></td>
                 </tr> 
                <tr>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                  </tr>
                <tr>
                    <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita"  runat="server">Ancho:</asp:Label></td>
                    <td align="left"><input class="easyui-numberbox" style="width:60px" id="txtancho"></td>
                  </tr>
                <tr>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                  </tr>
                  <tr>
                    <td align="left"><asp:Label ID="Label18" CssClass="LetraChicaNegrita"  runat="server">Alto:</asp:Label></td>
                    <td align="left"><input class="easyui-numberbox" style="width:60px" id="txtalto"></td>
                  </tr> 
                  <tr>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                  </tr> 
                   <tr>
                     <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita"  runat="server">Paginación:</asp:Label></td>
                     <td align="left"><input type="checkbox"  id="chkpaginacion"></td>
                </tr>
                   <tr>
                     <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                  <tr>
                         <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita"  runat="server">Total de Registros:</asp:Label></td>
                         <td align="left"> <select class="easyui-combobox"  style="width:120px;" id="cboregistros" data-options="editable:false, disabled:true">                                                                                              
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select></td>
                      </tr>
              </table>           
        </div>     
    </div>
    <div class="modal" style="display: none; " id="loading" align="center">
      <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
      </div> 
    </div>          
</body>
</html>
