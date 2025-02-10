<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseñador_FiltroFormatos.aspx.cs" Inherits="FILE_Impresion_Formatos_Diseñador_FiltroFormatos" %>

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
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    
    <script type="text/javascript" src="Diseñador_FiltroFormatos.js?1.0"></script>  
</head>
<body>
    <form id="form1" runat="server" >  
        <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">  
         <div class="easyui-panel" style="padding:3px; width:100%">                               
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnregresar">Regresar</a>  
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnEDiseño">Eliminar</a>                         
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>   
             <asp:Label ID="lblperfil" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
        <br />                
         <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;" align="center">                          
                   <div id="tt" class="easyui-tabs" style="width: 90%; height: 90%;overflow:hidden;" data-options="plain:true">
                        <div title="Tablas y Relaciones" style="padding: 3px;overflow:hidden; width:100%" align="center">
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                <div id="p" data-options="region:'west'" style="width:20%;padding:3px; overflow:hidden;" align="center">
                                      <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                        <div data-options="region:'north'" style="width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                                            <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Tablas del Sistema</asp:Label> 
                                            <input class="easyui-textbox" style="width:100%" id="txttablas">
                                        </div>
                                        <div data-options="region:'south'" style="width:100%; height:92%; padding:3px; overflow:hidden;" >
                                            <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                                                <ul class="easyui-tree" id="lsttablas" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                            </div> 
                                        </div>
                                       </div>
                                </div>
                                <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">                                                                                       
                                        <table id="dgtablas" class="easyui-datagrid"  toolbar="#tbt" style="width:100%; height:100%;" data-options="rownumbers: true,singleSelect:true" >
                                            <thead>
                                                <tr>
                                                    <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true">Clave</th>
                                                    <th data-options="field:'descripcion',width:250,align:'left'">Tabla</th>
                                                    <th data-options="field:'alias',width:50,align:'center',halign:'center', editor: { type: 'textbox'}">Alias</th>
                                                    <th data-options="field:'inicial',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Tabla Inicial</th>
                                                    <th data-options="field:'relacionada',width:90,align:'center',halign:'center'">Relacionada</th>
                                                    <th data-options="field:'relacion',width:400,align:'left',halign:'center',hidden:false">Relación</th>
                                                </tr>
                                            </thead> 
                                        </table>  
                                        <div id="tbt" style="height:auto">                                                  
                                            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnRelacion">Relacionar Tablas</a>                                   
                                        </div>                                                                                                       
                                    </div>                                         
                            </div>
                        </div> 
                        <div title="Configuración de Campos" style="padding: 3px;overflow:hidden; width:100%" align="center">
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                <div data-options="region:'west'" style="width:20%;padding:3px; overflow:hidden;" align="center">
                                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                        <div data-options="region:'north'" style="width:100%; height:12%; padding:6px; overflow:hidden;" align="center"> 
                                            <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Tablas Seleccionadas</asp:Label> 
                                            <input class="easyui-combobox"  style="width:100%;" id="cbotablas" data-options="editable:false"></input>                                            
                                            <input class="easyui-textbox" style="width:100%" id="txtcampos"> </input>                 
                                        </div>
                                        <div data-options="region:'south'" style="width:100%; height:88%; padding:3px; overflow:hidden;" >
                                            <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                                                 <ul class="easyui-tree" id="trvcampos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                            </div> 
                                        </div>
                                       </div>                                   
                                </div>
                                <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">  
                                    <table id="dgconfig" class="easyui-datagrid"  toolbar="#tbcam" style="width:100%; height:100%;" data-options="rownumbers: true" >
                                     <thead>
                                           <tr>                                             
                                             <th data-options="field:'orden',width:50,align:'center',halign:'center', editor: { type: 'textbox'}">Orden</th>
                                             <th data-options="field:'alias',width:100,align:'left',halign:'center',hidden:true">alias</th>
                                             <th data-options="field:'campo',width:100,align:'left',halign:'center'">Campos</th>
                                             <th data-options="field:'descripcion',width:250,align:'left',halign:'center', editor: { type: 'textbox'}">Descripción</th>                                              
                                             <th data-options="field:'consulta',width:80,align:'center',halign:'center',editor:{type:'checkbox',options:{on:'Si',off:''}}"">Consulta</th>
                                             <th data-options="field:'filtro',width:80,align:'center',halign:'center',editor:{type:'checkbox',options:{on:'Si',off:''}}"">Filtro</th>                                             
                                             <th data-options="field:'relcat',width:80,align:'center',halign:'center'">Catálogo</th>                                                                                          
                                             <th data-options="field:'cvecat',width:100,align:'left',halign:'center',hidden:true">cvecat</th>
                                             <th data-options="field:'descat',width:100,align:'left',halign:'center',hidden:true">descat</th>
                                             <th data-options="field:'nulos',width:80,align:'center',halign:'center',hidden:true">nulos</th>
                                             <th data-options="field:'repetidos',width:80,align:'center',halign:'center',hidden:true">repetidos</th>
                                             <th data-options="field:'query',width:80,align:'center',halign:'center',hidden:true">query</th>
                                           </tr>
                                        </thead> 
                                    </table> 
                                    <div id="tbcam" style="height:auto">                                                                                                                                  
                                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" id="btnECampos">Eliminar Relación Catálogo</a>  
                                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" id="btnCatalogo">Relaciónar Campo Catálogo</a>  
                                    </div>     
                                </div>
                            </div>
                        </div>                           
                    </div>
         </div>                                       
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winr" closed="true" align="center"> 
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRelacion">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGRelacion">Aceptar</a>   
             <asp:Label ID="Label1" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>                             
            <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">
                <div data-options="region:'north'" style="height:48%">
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                          
                            <div title="Columna Tabla Izquierda" style="padding: 3px; height:93%" align="center" id="Div2">                             
                                <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Tabla Izquierda</asp:Label>                                                                                               
                                <input class="easyui-combobox"  style="width:100%;" id="cbocamizq" data-options="editable:false"></input>                                                         
                                <input class="easyui-textbox" style="width:100%" id="txtcolizq"></input> 
                                <div id="Div3" class="easyui-panel" style="padding:5px; width:100%;height:81%">
                                   <ul class="easyui-tree" id="tcolizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                           </div>
                        </div>
                        <div data-options="region:'center'" style="padding:5px;overflow:hidden;">
                            <div title="Columna tabla Derecha" style="padding: 3px; height:93%" align="center" id="Div4">
                                <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Tabla Derecha</asp:Label>                                                                                               
                                <input class="easyui-combobox"  style="width:100%;" id="cbocamder" data-options="editable:false"></input>                                                         
                              <input class="easyui-textbox" style="width:100%" id="txtcolder"> 
                              <div id="Div5" class="easyui-panel" style="padding:5px; width:100%;height:81%">
                                   <ul class="easyui-tree" id="tcolder" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                              </div> 
                           </div>
                        </div>
                    </div>
                </div>
                <div data-options="region:'center'" style="height:10%;padding:1px; overflow:hidden;"  align="center">
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                         <div data-options="region:'west'" style="width:55%;padding:3px; overflow:hidden;" align="center">
                             <table>
                                <tr>                            
                                    <td align="center">
                                    <asp:Label ID="Label3" CssClass="LetraMiniChica" runat="server">Tipos de Relaciones</asp:Label>          
                                    </td>
                                </tr>
                                <tr>                            
                                    <td align="center">
                                    <a href="#" id='btnleft'  class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,group:'g1',plain:true">Todo de la izquierda</a>
                                    <a href="#" id='btnright' class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,group:'g1',plain:true">Todo de la derecha</a>                                    
                                   </td>
                                </tr>   
                                 <tr>
                                     <td align="center">
                                         <a href="#" id='btnunion' class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,group:'g1',plain:true">Union de Tablas</a>
                                     </td>
                                 </tr>                                                         
                            </table>
                         </div>
                         <div data-options="region:'center'" style="width:50%;padding:3px; overflow:hidden;" align="center">
                            <table>
                                <tr>
                                    <td align="center">
                                         <asp:Label ID="Label7" CssClass="LetraMiniChica" runat="server">Operador Lógico</asp:Label>                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center">
                                       <a href="#" id='btny'class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true"> Y </a>
                                       <a href="#" id='btno' class="easyui-linkbutton" data-options="toggle:true,group:'g2',plain:true"> O </a>
                                    </td>
                               </tr>
                            </table>
                         </div>
                     </div>
                </div>
                <div data-options="region:'south'" style="height:37%;padding:4px; overflow:hidden;"  align="center">                  
                    <table id="dgrelacion" class="easyui-datagrid"  toolbar="#tbr" style="width:100%; height:100%;" data-options="rownumbers: true" >
                        <thead>
                           <tr>
                             <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true">Clave</th>
                             <th data-options="field:'relacion',width:550,align:'left',halign:'center'">Relaciones</th>
                           </tr>
                        </thead> 
                    </table>  
                    <div id="tbr" style="height:auto">                                                  
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" id="btnAgregar">Agregar</a>  
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" id="btnEliminar">Eliminar</a>  
                    </div>    
                </div>                 
            </div>
        </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wincatalogo" closed="true" align="center"> 
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRelCat">Limpiar</a>                                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGRelCat">Aceptar</a>   
                 <asp:Label ID="lblrelcampo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                 
             </div> 
             <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">
                 <div data-options="region:'north'" style="width:100%; height:15%; padding:0px; overflow:hidden;" align="center"> 
                     <br />
                     <table>
                         <tr>
                            <td align="center">
                                <%--<input type="checkbox" id="chknulos" >Quitar Nulos</input>
                                <input type="checkbox" id="chkrepetidos" >Quitar Repetidos</input>--%>
                                <a href="#" id='btnnulos'  class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,plain:true">Quitar Nulos</a>
                                <a href="#" id='btnrepetidos' class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,plain:true">Quitar Repetidos</a>
                            </td>
                         </tr>
                     </table>
                 </div>
                <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                         <div data-options="region:'west'" style="height:85%; width:50%;padding:3px; overflow:hidden;" align="center">
                              <div title="Columna tabla Derecha" style="padding: 3px; height:87%" align="center">   
                              <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Campo Clave</asp:Label>                                                             
                              <input class="easyui-textbox" style="width:100%" id="txtcamizq"> 
                              <div id="Div9" class="easyui-panel" style="padding:5px; width:100%;height:100%">
                                   <ul class="easyui-tree" id="rtvcamizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                              </div> 
                           </div>
                        </div>
                        <div data-options="region:'center'" style="height:85%;width:50%;padding:3px;overflow:hidden;">
                            <div title="Columna tabla Derecha" style="padding: 3px; height:87%" align="center">  
                                <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Campo Descripción</asp:Label>                                                              
                              <input class="easyui-textbox" style="width:100%" id="txtcamder"> 
                              <div id="Div7" class="easyui-panel" style="padding:5px; width:100%;height:100%">
                                   <ul class="easyui-tree" id="rtvcamder" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                              </div> 
                           </div>
                        </div>                        
                    </div>
                </div>
            </div>
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
