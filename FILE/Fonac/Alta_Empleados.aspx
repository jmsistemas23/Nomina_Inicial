<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Alta_Empleados.aspx.cs" Inherits="FILE_Fonac_Alta_Empleados" %>

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
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>
      <script src="../../Scripts/jquery-Mask.js"></script>  
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Alta_Empleados.js?1.1"></script>
   
</head>
<body>
    <form id="form1" runat="server">
     <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiar">Limpiar</a>                                                                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>            
         </div> 
           <br />
        <table style="width: 297px">
            <tr>
                 <td align="left" ><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server" Text="Seleccione el Periodo:"></asp:Label></td>              
                 <td align="left"> <select class="easyui-combobox"  style="width:100px;" id="cboperiodo" data-options="editable:false">                                                                                                       
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                </select>
                 </td>
            </tr>
             <tr>              
                 <td align="left" ><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server" Text="Fecha Alta:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfecha" data-options="readonly:false"></input></td>
            </tr>
        </table>
         <br />
         <asp:Label ID="lbltitulo" CssClass="LetraChicaNegrita" runat="server" Text="ESTAS ALTAS DE EMPLEADOS NO GENERAN RETROACTIVOS"></asp:Label>
          <br /> <br />
           <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocam"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cbocon" data-options="editable:false">                                                                                                                                                                                                         
                                 <option value="like">Aproximada</option>
                               <option value="=">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:200px" id="txtval">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
          <br />
         <table id="dgemp" class="easyui-datagrid" style="width:85%; height:450px;">                   
            <thead>
                <tr>
                    <th data-options="field:'chk',checkbox:true"></th>                         
                    <th data-options="field:'curpemp',width:180,align:'left',halign:'center'">R.F.C.</th>  
                    <th data-options="field:'numemppl',width:90,align:'center',halign:'center'">Empleado</th>  
                    <th data-options="field:'nomcompl',width:300,align:'left',halign:'center'">Nombre</th>  
                    <th data-options="field:'numplaza',width:90,align:'center',halign:'center'">Plaza</th>  
                    <th data-options="field:'cveesppl',width:90,align:'center',halign:'center'">Estatus</th>  
                    <th data-options="field:'cvepuepl',width:100,align:'center',halign:'center'">Puesto</th>  
                    <th data-options="field:'cvejerpl',width:110,align:'center',halign:'center'">Gpo. Jerarquico</th>  
                </tr>
            </thead> 
        </table>   
    </div>
        <div class="modal" style="display: none" id="loading" align="Center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>    
    </form>
</body>
</html>
