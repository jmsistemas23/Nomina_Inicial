<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Baja_Empleados.aspx.cs" Inherits="FILE_Fonac_Baja_Empleados" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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
    <script type="text/javascript" src="Baja_Empleados.js?1.1"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiar">Limpiar</a>                                                                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnBaja">Baja</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>            
         </div> 
           <br />
         <table style="width: 581px">
             <tr>              
                 <td align="left" ><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server" Text="Fecha Baja:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfecha" data-options="readonly:false"></input></td>
            </tr>
            <tr>
                 <td align="left" ><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server" Text="Motivo de Baja:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:400px;height:50px;" id="txtobservaciones" labelPosition="top" multiline="true" ></input>
                 </td>
            </tr>             
        </table>
         <br />
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
                    <th data-options="field:'numplaza',width:90,align:'center',halign:'center'">Plaza</th>  
                    <th data-options="field:'numemp',width:90,align:'center',halign:'center'">Empleado</th>  
                    <th data-options="field:'nomcompl',width:300,align:'left',halign:'center'">Nombre</th>  
                    <th data-options="field:'rfccompl',width:150,align:'center',halign:'center'">R.f.c.</th>  
                    <th data-options="field:'cveesp',width:90,align:'center',halign:'center'">Estatus</th>  
                    <th data-options="field:'cvepue',width:90,align:'center',halign:'center'">Puesto</th>  
                    <th data-options="field:'quincena',width:100,align:'center',halign:'center'">Quincena</th>  
                    <th data-options="field:'ano',width:80,align:'center',halign:'center'">Año</th>  
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
