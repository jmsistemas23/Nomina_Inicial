<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Validar_Produccion.aspx.cs" Inherits="FILE_Produccion_Validar_Produccion" %>

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
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>   
      <script src="../../Scripts/jquery-Mask.js"></script>   
    <script type="text/javascript" src="Validar_Produccion.js?1.3"></script>  
</head>
<body>
    <form id="form1" runat="server">
       <div class="easyui-layout"  style="width:100%; height:100%; padding:0px; " align="Center">               
           <div class="easyui-layout" id="dmenu" style="width:100%; height:100%; padding:0px;" align="Center"> 
                <br /><br />         
                <table>
                <tr>
                    <td align="center">
                          <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="Producción de Nomina"></asp:Label>    
                    </td>
                </tr>                   
            </table>
           <br />
            <table style="width: 100%;">           
                <tr>
                    <td align="Center">                    
                        <a id="btnHistoria" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-historia',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Historia</a>                                                   
                        <a id="btnActual" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top', toggle:true,group:'gf'" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Actual</a>
                    </td>
                </tr>                        
            </table> 
            <br />
              <div class="easyui-layout" style="width:300px;height:60%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:12%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Quincenas</asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtquincenas">
                    </div>
                    <div data-options="region:'south'" style="border-style:none; width:100%; height:88%; padding:0px; overflow:hidden;" >
                        <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                            <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                        </div> 
                    </div>
              </div>
           </div>
          <div class="easyui-layout" id="dvalidaciones" style="width:100%; height:100%; padding:0px; display:none" align="Center">    
            <div class="easyui-panel" style="padding:3px; width:100%">                                 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reload'" id="btnActualizar">Actualizar</a>                              
            </div>
           <br />               
              <table id="dgvalidaciones" class="easyui-datagrid" style="width:33%; height:40%;">
                <thead>
                    <tr>                                  
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true">id</th>
                        <th data-options="field:'tipovalidacion',width:300,align:'left',halign:'center',hidden:false">Validación</th>
                        <th data-options="field:'valor',width:100,align:'center',halign:'center'">Total</th>
                    </tr>
                </thead> 
            </table>               
            <br /><br />            
              <table id="dgerrores" class="easyui-datagrid" style="display:none; width:56%; height:40%;">
              </table>    
          </div>                   
       </div>
    <div class="modal" style="display: none;" id="loading"  align="Center">
        <div class="center">
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>
    </form>
</body>
</html>
