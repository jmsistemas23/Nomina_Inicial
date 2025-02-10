<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bloqueo_Retroactivos.aspx.cs" Inherits="FILE_Bloqueo_Retroactivos_Bloqueo_Retroactivos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
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
    <script src="Bloqueo_Retroactivos.js?0.4"></script>
</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>               
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>                               
        </div> 
           <br />    
       <br /> 
        <div id="dbusqueda" class="easyui-layout" style="display:none; width:100%;height:90%;padding:0px;" align="Center">        
           <table >                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocampos" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocondicion" data-options="editable:false">                                                                                                                                                                     
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
             <br />     
            <table>
                <tr>                    
                    <td align="left">
                         <asp:RadioButton ID="rbplazaD" runat="server" Text="Plaza Destino" CssClass="LetraChicaNegrita" GroupName="plazas" Checked="True"/>
                         <asp:RadioButton ID="rbplazaT" runat="server" Text="Plaza Origen y Destino" CssClass="LetraChicaNegrita"  GroupName="plazas" />                    
                    </td>
                </tr>
            </table>
             <br />     
             <br />     
          <table style="height:60%; width:80%;" id="dg"></table>   
       </div> 
       <br />    
       <br />    
        <asp:Label ID="lblnominas"  style="display:none;" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label> 
      </div>
      <div class="modal" style="display: none; " id="loading" align="center">
         <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
         </div> 
      </div>      
    </form>
</body>
</html>
