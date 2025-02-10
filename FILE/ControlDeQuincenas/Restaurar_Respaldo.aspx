<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Restaurar_Respaldo.aspx.cs" Inherits="FILE_ControlQuincenas_Restaurar_Respaldo" %>

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
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Restaurar_Respaldo.js?1.2"></script>
</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh',disabled:false" id="btnActualizar">Actualizar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnRestaurar">Restaurar</a>                               
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
          <table style="display:none; height:500px; width:80%;" id="dg">
              <thead>
                 <tr>                                                                                      
                    <th data-options="field:'Modulo',width:100,align:'center',halign:'center'">Módulo</th>         
                    <th data-options="field:'UsrCreacion',width:200,align:'center',halign:'center'">Usuario Creación</th>                    
                    <th data-options="field:'FechaCreacion',width:200,align:'center',halign:'center'">Fecha Creación</th>                    
                    <th data-options="field:'UsrRestauracion',width:200,align:'center',halign:'center'">Usu. Restauración</th>                    
                    <th data-options="field:'FechaRestauracion',width:200,align:'center',halign:'center'">Fecha Restauración</th>                    
                    <th data-options="field:'Id',width:60,align:'center',halign:'center',hidden:true">Módulo</th>         
                </tr>
            </thead> 
          </table>           
    </div>
        <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
