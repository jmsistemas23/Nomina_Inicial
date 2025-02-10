<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cat_ListaCamposIndice.aspx.cs" Inherits="FILE_IndiceDeAfectacion_Cat_ListaCamposIndice" %>

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
     <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Cat_ListaCamposIndice.js?1.1"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">
         <div class="easyui-panel" style="padding:3px; width:100%">                                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEliminar">Eliminar</a>           
        </div> 
        <br />
       <div class="easyui-layout" style="width:85%;height:90%; overflow:hidden;">
           <div data-options="region:'west'" style="border-style: none;width:25%;padding:0px; overflow:hidden;" align="center">
                <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Tablas</asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txttblsistema">
                    </div>
                    <div data-options="region:'south'" style="border-style: none; width:100%; height:92%; padding:0px; overflow:hidden;" >
                        <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                            <ul class="easyui-tree" id="ttblsistema" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                        </div> 
                    </div>
                </div>
           </div>
           <div  data-options="region:'center'" style="border-style: none;width:25%;padding:0px; overflow:hidden;" align="center">
                 <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtcampos">
                    </div>
                    <div data-options="region:'south'" style="border-style: none; width:100%; height:92%; padding:0px; overflow:hidden;" >
                        <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                            <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                        </div> 
                    </div>
                </div>
           </div>
           <div  data-options="region:'east'" style="border-style: none;width:50%;padding:0px; overflow:hidden;" align="center">
                <table id="dgcampos" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcam" >              
                    <thead>
                       <tr> 
                         <th data-options="field:'chk',checkbox:true"></th>                                                                
                        <th data-options="field:'nom_camp',width:130,align:'center',halign:'center',hidden:false">Campo</th>
                        <th data-options="field:'desc_camp',width:280,align:'left',halign:'center', editor: { type: 'textbox'}">Descripción</th>
                        <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true">Campos ant</th>
                       </tr>
                    </thead>
                </table>
           </div>                      
       </div>
    </div>
    <div class="modal" style="display: none; " id="loading" align="center">
       <div class="center" align="center" >
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
       </div>
    </div> 
    </form>
</body>
</html>
