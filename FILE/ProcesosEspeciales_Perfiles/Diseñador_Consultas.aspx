<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseñador_Consultas.aspx.cs" Inherits="FILE_ProcesosEspeciales_Perfiles_Diseñador_Consultas" %>

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
    <link href="../../Styles/loader.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">    
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script src="Diseñador_Consultas.js?0.4"></script>

</head>
<body>
    <form id="form1" runat="server">
     <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">
      <div class="easyui-panel" style="padding:3px; width:100%">                               
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>  
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnEDiseño">Eliminar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLconsulta">Limpiar Todo</a>                                                            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGuardarConsulta">Guardar Consulta</a>   
             <asp:Label ID="lblperfil" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
        <br />   
              <div class="easyui-layout" style="border-style: none; width: 80%; height: 90%; padding:0px; overflow:hidden;">                                                                                                                    
                  <div id="tpsql" class="easyui-tabs" style="width: 100%; height: 95.5%;overflow:hidden;padding:0px;" data-options="plain:true">                  
                        <div title="Configuración Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%;height:100%;" align="center"> 
                            <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden; padding:0px;">
                                <div data-options="region:'west'" style="width:25%;height:100%; padding:0px; overflow:hidden;" align="center">
                                    <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden;">
                                        <div data-options="region:'north'" style="border-style: none;  width:100%; height:10%; padding:3px; overflow:hidden;" align="center"> 
                                            <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Lista de Tablas</asp:Label> 
                                            <input class="easyui-textbox" style="width:100%" id="txtBTablas">
                                        </div>
                                        <div data-options="region:'south'" style="border-style: none;  width:100%; height:90%; padding:3px; overflow:hidden;" >
                                            <div id="Div5" class="easyui-panel" style="width:100%;height:100%">
                                                <ul class="easyui-tree" id="tvtablas" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                            </div> 
                                        </div>
                                    </div>
                                </div>
                                <div data-options="region:'center'" style="width:75%;height:100%;padding:0px; overflow:hidden;" align="center">
                                    <div class="easyui-layout" style=" width:100%;height:100%; padding:0px; overflow:hidden;">
                                        <div id="paneldrop" data-options="region:'north',split:true" style="border-style: none; overflow-y:auto; overflow-x:auto; width:100%; height:50%; padding:3px;" align="left">                                                        
                                        </div>                       
                                        <div data-options="region:'center'" style="border-style: none;width:100%; height:10%; padding:0px; overflow:hidden;" >   
                                                <div class="easyui-panel" style="padding:0px; width:100%">
                                                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_Relacion'" id="btnGenerarRelaciones">Generar Relaciones</a>
                                            </div> 
                                            <input class="easyui-textbox" style="width:100%; height:75%;" id="txtrelacion" labelPosition="top" multiline="true" data-options="readonly:false"></input>                                                  
                                        </div>
                                        <div data-options="region:'south'" style="border-style: none;width:100%; height:35%; padding:0px; overflow:hidden;" >                                                                                                                                                                                            
                                                <table id="dgcamsel" class="easyui-datagrid" style="width:100%; height:100%;" toolbar="#tbcat">              
                                                        <thead>
                                                        <tr>                                    
                                                            <th data-options="field:'Tabla',width:190,align:'left',halign:'center',hidden:true">tabla</th>
                                                            <th data-options="field:'Campo',width:190,align:'left',halign:'center',hidden:false">Campo</th>
                                                            <th data-options="field:'Orden',width:60,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ordenar</th>
                                                            <th data-options="field:'Tipo',width:120,align:'center',halign:'center',hidden:false,                                                  
                                                                                    editor:{
                                                                                            type:'combobox',
                                                                                            options:{
                                                                                                    valueField:'tipo',
                                                                                                    textField:'descripcion',
                                                                                                    data:[
                                                                                                            {tipo: 'Asc', descripcion: 'Ascendente'},                                                                      
                                                                                                            {tipo: 'Desc', descripcion: 'Descendente'},                                                                                    
                                                                                                        ],
                                                                                                    }
                                                                                        }">Tipo</th>
                                                            <th data-options="field:'Catalogo',width:250,align:'left',halign:'center',hidden:false">Catálogo Relacionado</th>
                                                            <th data-options="field:'CatTexto',width:100,align:'center',halign:'center',hidden:true">Texto</th>
                                                            <th data-options="field:'CatValor',width:100,align:'center',halign:'center',hidden:true">Valor</th>
                                                            <th data-options="field:'Query',width:500,align:'left',halign:'center',hidden:true">Consulta Catálogo</th>
                                                        </tr>                                            
                                                        </thead>                                                                           
                                                </table> 
                                                <div id="tbcat" style="padding:3px; width:100%"> 
                                                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRelacion">Limpiar Configuración</a>       
                                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnCatalogo">Relacionar Catálogo</a>
                                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:false" id="btnECatalogo">Eliminar Relación Catálogo</a>
                                                </div>                                                                        
                                        </div>                           
                                    </div>
                                </div>          
                            </div>                 
                        </div>
                        <div title="Condición" style="border-style: none; padding: 3px; overflow:hidden; width:100%;height:100%;" align="center"> 
                                            <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden; padding:0px;">                      
                                                <div data-options="region:'center'" style="border-style: none; width:100%;height:100%;padding:0px; overflow:hidden;" align="center">
                                                    <div class="easyui-layout" style="border-style: none; width:100%;height:100%; padding:0px; overflow:hidden;">
                                                        <div data-options="region:'north'" style="border-style: none;width:100%; height:55%; padding:0px; overflow:hidden;" align="center"> 
                                                                <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                <div data-options="region:'west'" style="border-style: none; width:30%; overflow:hidden;" align="center">
                                                                        <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                            <div data-options="region:'north'" style=" width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                                                                <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                                                                <input class="easyui-textbox" style="width:100%" id="txtcampo" data-options="readonly:false"></input>     
                                                                            </div>
                                                                            <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                <div id="Div10" class="easyui-panel" style="width:100%;height:100%">
                                                                                <ul class="easyui-tree" id="tvcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                                            </div> 
                                                                            </div>
                                                                        </div>
                                                                </div>
                                                                <div data-options="region:'center'" style="border-style: none; width:auto; overflow:hidden;" align="center">
                                                                        <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                            <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                                                                <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Condiciones</asp:Label>  
                                                                                <input class="easyui-textbox" style="width:100%" id="txtcondicion" data-options="readonly:false"></input>     
                                                                            </div>
                                                                            <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                <div id="Div11" class="easyui-panel" style="width:100%;height:100%">
                                                                                <ul class="easyui-tree" id="tvcondicion" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                                            </div> 
                                                                            </div>
                                                                        </div>
                                                                </div>                                           
                                                                <div data-options="region:'east'" style=" border-style: none; width:40%; overflow:hidden;" align="center">
                                                                    <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                            <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                                                                <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                                                                <input class="easyui-textbox" style="width:100%" id="txtvalbuscar" data-options="readonly:false"></input>     
                                                                            </div>
                                                                            <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                <div id="Div12" class="easyui-panel" style="width:100%;height:100%">
                                                                                <ul class="easyui-tree" id="tvvalor" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                                                            </div> 
                                                                            </div>
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div data-options="region:'center'" style="width:100%; height:auto; padding:3px; overflow:hidden;" >                                                                                   
                                                            <table id="dgcondicion" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcond" data-options="rownumbers: true,singleSelect:true, striped:true">
                                                                <thead>
                                                                    <tr>                                                                      
                                                                       <th data-options="field:'Condicion',width:670,align:'left',halign:'center',editor:'textbox'">Condición</th>
                                                                    </tr>
                                                                </thead>
                                                            </table>   
                                                             <div id="tbcond" style="padding:3px; width:100%"> 
                                                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCondicion">Limpiar Condición</a>     
                                                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:false" id="btnECondicion">Eliminar</a>
                                                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnACondicion">Agregar</a>   
                                                                <a href="#" id="opcY" class="easyui-linkbutton" data-options="iconCls:'icon-Y',plain:true,toggle:true,group:'gf'"></a>
                                                                <a href="#" id="opcO" class="easyui-linkbutton" data-options="iconCls:'icon-O',plain:true,toggle:true,group:'gf'"></a>  
                                                             </div>                                     
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>                
                                        </div>                                              
                  </div>                                      
                </div>   
       <%-- <div id="tpconfig" class="easyui-tabs" style="width: 80%; height: 90%;overflow:hidden;padding:0px;" data-options="plain:true">       
            <div title="Diseño Consulta Sql" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height: 100%;" align="center">                                                                          
           
            </div>
            <div title="Configuración del Proceso" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height: 100%;" align="center">
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">  
                      <div id="p" data-options="region:'west'" style="width:20%;padding:3px; overflow:hidden;" align="center">
                           <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                           </div> 
                      </div>
                      <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">   
                        <div id="tpvista" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;padding:0px;" data-options="plain:true"> 
                                <div title="Diseño del Proceso" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">
                                    <table id="dgcolumnas" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcol" data-options="singleSelect: true">  
                                    <thead data-options="frozen:true">
                                        <tr>
                                            <th data-options="field:'chk',checkbox:true"></th>                                                    
                                            <th data-options="field:'Orden',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Orden</th>  
                                            <th data-options="field:'Campo',width:120,align:'left',halign:'center',hidden:false">Campos</th>
                                            </tr>                           
                                    </thead>     
                                    <thead>
                                        <tr>                                                                                              
                                            <th data-options="field:'Titulo',width:250,align:'left',halign:'center', editor: { type: 'textbox'}">Titulo</th>
                                        
                                            <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true">Campos ant</th>
                                        </tr>                           
                                    </thead>     
                                </table> 
                                    <div id="tbcol" style="padding:3px; width:100%">   
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiarProceso">Limpiar</a>  
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarProceso">Guardar Proceso</a>
                                    </div>      
                                </div>   
                                <div title="Vista Previa" style="border-style: none; padding: 3px; overflow:hidden; width:100%;" align="center">                                                            
                                    <table id="dgvista" class="easyui-datagrid" toolbar="#tbvista" style="width:100%; height:100%;" data-options = "striped: true,fitColumns:true,rownumbers: true, pagination: true, singleSelect: true, autoRowHeight: false, pageSize: 20 "> </table>
                                    <div id="tbvista" style="padding:3px; width:100%">   
                                         <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLVistaPrevia">Limpiar Vista Previa</a>     
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'" id="btnVistaPrevia">Vista Previa</a>                             
                                    </div>      
                                </div>                                                                 
                            </div>       
                     </div>
                </div> 
            </div>             
        </div>--%>
    </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcatalogo" closed="true" align="center">
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCatalogo">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACatalogo">Aceptar</a>   
             <asp:Label ID="lblcatalogo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>  
        <div class="easyui-layout" style="width:100%;height:89%; overflow:hidden;">            
                 <div data-options="region:'west'" style="width:40%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                   <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                      <asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Tablas del Sistema</asp:Label> 
                      <input class="easyui-textbox" style="width:100%" id="txttablas">
                   </div>
                   <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                       <div id="Div13" class="easyui-panel" style="width:100%;height:100%">
                          <ul class="easyui-tree" id="ttblsistemas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                       </div> 
                   </div>   
                </div>
                 <div data-options="region:'center'" style="width:90%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                     <div data-options="region:'west'" style="width:50%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                           <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Campo Texto</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamtexto">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div14" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamtexto" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                               </div> 
                           </div>   
                     </div>
                    <div data-options="region:'center'" style="height:100%; padding:0px; overflow:hidden;" align="center"> 
                          <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Campo Valor</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamvalor">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div15" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamvalor" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
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
