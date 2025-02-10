<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogos_Niveles.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Catalogos_Niveles" %>

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
    <script type="text/javascript" src="Catalogos_Niveles.js?1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>                               
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>                          
        </div>
        <br />
        <div class="easyui-layout" style="width:80%;height:70%; overflow:hidden;">
            <div data-options="region:'north'" style="width:100%; height:70%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'west'" style="border:none;width:50%;padding:3px; overflow:hidden;" align="center">    
                         <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                            <div data-options="region:'west'" style="border:none;width:50%;padding:3px; overflow:hidden;" align="center">                                                                           
                               <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                   <div data-options="region:'north'" style="width:100%; height:15%; padding:2px; overflow:hidden;" align="center"> 
                                       <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Tabla Actual</asp:Label>                                                                                                                      
                                       <input class="easyui-textbox" style="width:100%" id="txtcatact"></input> 
                                   </div>
                                    <div data-options="region:'south'" style=" border:none;width:100%; height:85%; padding:0px; overflow:hidden;" align="center">
                                         <div id="Div15" class="easyui-panel" style="padding:1px; width:100%;height:100%">
                                         <ul class="easyui-tree" id="tvcatact" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                   </div>  
                                    </div>
                               </div>                                          
                            </div>
                             <div data-options="region:'center'" style="border:none; padding:3px;overflow:hidden;">
                                  <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                       <div data-options="region:'north'" style="width:100%; height:15%; padding:2px; overflow:hidden;" align="center"> 
                                           <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Clave Actual</asp:Label>                                                                                                                      
                                           <input class="easyui-textbox" style="width:100%" id="txtcveact"></input> 
                                       </div>
                                        <div data-options="region:'south'" style=" border:none;width:100%; height:85%; padding:0px; overflow:hidden;" align="center">
                                             <div id="Div3" class="easyui-panel" style="padding:1px; width:100%;height:100%">
                                             <ul class="easyui-tree" id="tvcveact" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div>  
                                        </div>
                                   </div>                                          
                             </div>
                         </div>
                    </div>
                    <div data-options="region:'center'" style="border:none; padding:3px;overflow:hidden;">
                        <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                            <div data-options="region:'west'" style=" border:none; width:50%;padding:3px; overflow:hidden;" align="center">
                              <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                   <div data-options="region:'north'" style="width:100%; height:15%; padding:2px; overflow:hidden;" align="center"> 
                                       <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Catálogo Siguiente</asp:Label>                                                                                                                      
                                       <input class="easyui-textbox" style="width:100%" id="txtcatsig"></input> 
                                   </div>
                                    <div data-options="region:'south'" style=" border:none;width:100%; height:85%; padding:0px; overflow:hidden;" align="center">
                                         <div id="Div4" class="easyui-panel" style="padding:1px; width:100%;height:100%">
                                         <ul class="easyui-tree" id="tvcatsig" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                   </div>  
                                    </div>
                               </div>                         
                          </div>
                           <div data-options="region:'center'" style="border:none; padding:3px;overflow:hidden;">
                                  <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                       <div data-options="region:'north'" style="width:100%; height:15%; padding:2px; overflow:hidden;" align="center"> 
                                           <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave Siguiente</asp:Label>                                                                                                                      
                                           <input class="easyui-textbox" style="width:100%" id="txtcvesig"></input> 
                                       </div>
                                        <div data-options="region:'south'" style=" border:none;width:100%; height:85%; padding:0px; overflow:hidden;" align="center">
                                             <div id="Div1" class="easyui-panel" style="padding:1px; width:100%;height:100%">
                                             <ul class="easyui-tree" id="tvcvesig" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                       </div>  
                                        </div>
                                   </div>                                          
                             </div>
                        </div>
                    </div>                  
               </div>
            </div>
            <div data-options="region:'south'" style=" border:none;width:100%; height:30%; padding:0px; overflow:hidden;" align="center">
               <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                   <div data-options="region:'north'" style="border:none;width:100%; height:22%; padding:0px; overflow:hidden;" align="center"> 
                       <div class="easyui-panel" style="padding:3px; width:100%">                                            
                          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnARealacion">Agregar</a>                      
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnERelacion">Eliminar</a>                                                                               
                       </div> 
                   </div>
                   <div data-options="region:'south'" style=" border:none;width:100%; height:78%; padding:0px; overflow:hidden;" align="center">
                       <table id="dgrelaciones" class="easyui-datagrid"  style="width:100%; height:100%;" data-options="rownumbers: true,singleSelect:true, striped:true">
                         <thead>
                          <tr>                                                        
                            <th data-options="field:'NumNivel',width:100,align:'center',halign:'center',editor: { type: 'textbox'}">Orden</th>
                            <th data-options="field:'NumNivelAnt',width:150,align:'center',halign:'center',hidden:true">Nivel Anterior</th>
                            <th data-options="field:'CatNivelAct',width:200,align:'left',halign:'center'">Catálogo Actual</th>                            
                            <th data-options="field:'CveNivelAct',width:200,align:'center',halign:'center'">Clave Actual</th>
                            <th data-options="field:'CatNivelSig',width:200,align:'left',halign:'center'">Catálogo Siguiente</th>
                            <th data-options="field:'CveNivelSig',width:200,align:'center',halign:'center'">Clave Siguiente</th>
                          </tr>
                        </thead>
                      </table>     
                   </div>
               </div>               
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
