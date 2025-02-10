 <%@ Page Language="C#" AutoEventWireup="true" CodeFile="Configuracion_Captura_Movimientos.aspx.cs" Inherits="FILE_DiseñadorDeCaptura_Configuracion_Captura_Movimientos" %>

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

     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Configuracion_Captura_Movimientos.js?2.9"></script>
 
</head>
<body>
    <form id="form1" runat="server">
     <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>  
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiarMovConf">Limpiar Configuración</a>              
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion'" id="btnMovConfig">Movimientos Configurados</a>     
           <%--  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarMovConfig">Guardar Configuración</a>                  --%>      
              <asp:Label ID="lblmov" CssClass="LetraChica" runat="server" Text=""></asp:Label>                   
        </div>
         <br />       
       <div id="tconfig" class="easyui-tabs" style="width: 90%; height: 90%;overflow:hidden;padding:3px;"  data-options="plain:true">                  
             <div title="Selección de Campos Captura" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">                
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                    <div id="p" data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">
                            <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                            <div data-options="region:'north'" style="width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                                <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                                <input class="easyui-textbox" style="width:100%" id="txtcampos">
                            </div>
                            <div data-options="region:'south'" style="border-style: none; width:100%; height:92%; padding:0px; overflow:hidden;" >
                                <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                            </div>
                    </div>
                    <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">   
                        <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;" align="center">                                                                                                                                 
                        <table id="dgcampos" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcam" >              
                            <thead data-options="frozen:true">
                                <tr>
                                    <th data-options="field:'chk',checkbox:true"></th>                                                                                        
                                    <th data-options="field:'Campo',width:150,align:'center',halign:'center',hidden:true">NomCampo</th>
                                    <th data-options="field:'DescripcionCampo',width:300,align:'left',halign:'center'">Campo</th>
                                    <th data-options="field:'Orden',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Orden</th>         
                                </tr>
                            </thead> 
                            <thead>
                                <tr>                                                                        
                                    <th data-options="field:'SoloLectura',width:85,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Solo Lectura</th>
                                    <th data-options="field:'GuardaOrigen',width:100,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Guardar Origen</th>
                                    <th data-options="field:'ValidaNulo',width:85,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Validar Nulo</th>
                                    <th data-options="field:'ValidaLongitud',width:97,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Validar Longitud</th>
                                    <th data-options="field:'HabilitarBusqueda',width:115,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Habilitar Busqueda</th>
                                    <th data-options="field:'consultaBusqueda_BusquedaDirecta',width:120,align:'center',halign:'center'">Busqueda Directa</th>
                                    <th data-options="field:'CampoCaptura',width:120,align:'center',halign:'center'">Relación Captura</th>                                                        
                                    <th data-options="field:'consultaBusqueda_AliasColumnas',width:120,align:'center',halign:'center'">Campo de Filtro</th>                                    
                                    <th data-options="field:'consultaBusqueda_CamposCaptura_Oculto',width:120,align:'center',halign:'center',hidden:true">condicion de Filtro</th>                                    
                                    <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true">Campos ant</th>
                                    <th data-options="field:'CampoCap',width:100,align:'center',halign:'center',hidden:true">Campos cap</th>                                                      
                                </tr>
                            </thead>
                        </table>
                        <div id="tbcam" style="height:auto">  
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiarCampos">Limpiar</a>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarCampos">Guardar</a>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnECamposMov">Eliminar</a>
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnBDirecta">Relacionar Campo Busqueda Directa</a>
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCamCaptura">Relacionar Consulta-Campos Captura</a>
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCamFiltro">Filtro de la Consultas</a>                           
                        </div>
                       </div>
                    </div>                                         
                 </div>
             </div>
             <div title="Configuración de la Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">                                      
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="border-style: none; width:20%; height:100%; padding:0px; overflow:hidden;" align="center">                            
                             <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style=" width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                                      <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Campos de Busqueda</asp:Label> 
                                     <input class="easyui-textbox" style="width:100%" id="txtcambusqueda">
                                 </div>
                                 <div data-options="region:'south'" style="border-style: none; width:100%; height:92%; padding:0px; overflow:hidden;" >
                                      <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                          <ul class="easyui-tree" id="tvcambusqueda" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                      </div> 
                                 </div>
                             </div>
                        </div>                        
                        <div data-options="region:'center'" style="border-style: none; height:100%; width:80%; padding:0px; overflow:hidden;" align="center">
                              <div  id="tpconsultasql" class="easyui-tabs" style="border-style: none; width: 100%; height: 100%;overflow:hidden;padding:0px;" data-options="plain:true">
                                  <div title="Configuración Busqueda" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height: 100%;" align="center">
                                       <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">  
                                            <div data-options="region:'west'" style="border-style: none; width:20%; height:100%; padding:0px; overflow:hidden;" align="center">
                                                <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden;">
                                                    <div data-options="region:'north'" style=" width:100%; height:12%; padding:3px; overflow:hidden;" align="center"> 
                                                         <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Campos Consulta</asp:Label> 
                                                         <input class="easyui-textbox" style="width:100%" id="txtcolconsulta">
                                                    </div>
                                                    <div data-options="region:'south'" style="border-style: none; width:100%; height:91%; padding:0px; overflow:hidden;" >
                                                         <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                                                            <ul class="easyui-tree" id="tvcolconsulta" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                                         </div> 
                                                     </div>
                                                 </div>
                                             </div>
                                             <div data-options="region:'center'" style="border-style: none;height:100%; width:80%;padding:0px; overflow:hidden;" align="center"> 
                                                 <div id="tpvista" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;padding:0px;" data-options="plain:true"> 
                                                     <div title="Diseño de Busqueda" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">
                                                           <table id="dgcolumnas" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcol">  
                                                            <thead data-options="frozen:true">
                                                                <tr>
                                                                    <th data-options="field:'chk',checkbox:true"></th>                                                    
                                                                    <th data-options="field:'Campo',width:110,align:'left',halign:'center',hidden:false">Campos</th>
                                                                 </tr>                           
                                                            </thead>     
                                                            <thead>
                                                                <tr>                                                  
                                                                    <th data-options="field:'Orden',width:110,align:'left',halign:'center', editor: { type: 'textbox'}">Ord. Columnas</th>  
                                                                    <th data-options="field:'Titulo',width:250,align:'left',halign:'center', editor: { type: 'textbox'}">Titulo</th>                                                    
                                                                    <th data-options="field:'Alineacion',width:100,align:'center',halign:'center',hidden:false,                                                  
                                                                                        editor:{
                                                                                            type:'combobox',
                                                                                            options:{
                                                                                                    valueField:'Alineacion',
                                                                                                    textField:'descripcion',
                                                                                                    data:[
                                                                                                            {Alineacion: 'Izquierda', descripcion: 'Izquierda'},                                                                      
                                                                                                            {Alineacion: 'Centro', descripcion: 'Centro'},
                                                                                                            {Alineacion: 'Derecha', descripcion: 'Derecha'},                                                                      
                                                                                                        ],
                                                                                                    }
                                                                                        }">Alineación</th>         
                                                                    <th data-options="field:'Longitud',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Longitud</th>  
                                                                    <th data-options="field:'Visible',width:60,align:'center', editor:{type:'checkbox',options:{on:'1',off:'0'}}">Visible</th>
                                                                    <th data-options="field:'OrdenBusqueda',width:110,align:'left',halign:'center', editor: { type: 'textbox'}">Ord. Busqueda</th>
                                                                    <th data-options="field:'ColBloqueada',width:110,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'1',off:'0'}}">Bloq. Columna</th>
                                                                    <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true">Campos ant</th>
                                                                </tr>                           
                                                            </thead>     
                                                     </table> 
                                                           <div id="tbcol" style="padding:3px; width:100%">   
                                                              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiarconsulta">Limpiar</a>  
                                                              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarConsulta">Guardar</a>                                          
                                                              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnOrdCondicion">Orden de Condición</a>
                                                          </div>      
                                                     </div>   
                                                      <div title="Vista Previa" style="border-style: none; padding: 3px; overflow:hidden; width:100%;" align="center">                                                            
                                                            <table id="dgvista" class="easyui-datagrid" toolbar="#tbvista" style="width:100%; height:100%;" data-options = "striped: true,fitColumns:true,rownumbers: true, pagination: true, singleSelect: true, autoRowHeight: false, pageSize: 20 "> </table>
                                                          <div id="tbvista" style="padding:3px; width:100%">   
                                                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'" id="btnActualizarVista">Actualizar Vista</a>                             
                                                          </div>      
                                                       </div>                                                                 
                                                 </div>                                                                                                                         
                                             </div>
                                      </div> 
                                  </div> 
                                  <div title="Diseño Consulta Sql" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height: 100%;" align="center">                                                                          
                                       <div class="easyui-layout" style="border-style: none; width:100%;height:100%; padding:0px; overflow:hidden;">                                            
                                             <div class="easyui-panel" style="padding:3px; width:100%">                                                         
                                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLconsulta">Limpiar</a>                                                            
                                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnAconsulta">Guardar</a>   
                                                <asp:Label ID="lblcampo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                               
                                            </div>                                                       
                                          <div id="tpsql" class="easyui-tabs" style="width: 100%; height: 95.9%;overflow:hidden;padding:0px;" data-options="plain:true">                  
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
                                                                                    <th data-options="field:'Tabla',width:190,align:'left',halign:'center',hidden:false">tabla</th>
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
                                                                 <div class="easyui-panel" style="padding:3px; width:100%">   
                                                                       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:false" id="btnECondicion">Eliminar</a>
                                                                       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnACondicion">Agregar</a>   
                                                                       <a href="#" id="opcY" class="easyui-linkbutton" data-options="iconCls:'icon-Y',plain:true,toggle:true,group:'gf'"></a>
                                                                       <a href="#" id="opcO" class="easyui-linkbutton" data-options="iconCls:'icon-O',plain:true,toggle:true,group:'gf'"></a>             
                                                                 </div>                             
                                                                 <table id="dgcondicion" class="easyui-datagrid"  style="width:100%; height:89%;" data-options="rownumbers: true,singleSelect:true, striped:true">
                                                                        <thead>
                                                                            <tr>
                                                                                <th data-options="field:'Condicion',width:670,align:'left',halign:'center',editor:'textbox'">Condición</th>
                                                                            </tr>
                                                                        </thead>
                                                                 </table>                                        
                                                             </div>
                                                         </div>
                                                  </div>
                                              </div>                
                                              </div>                                              
                                          </div>                                      
                                       </div>
                                  </div>
                              </div>
                        </div> 
                </div>                                                      
             </div>
        </div>  
    </div>
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcamcaptura" closed="true" align="center">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLcamcaptura">Diseño Original</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAcamcaptura">Aceptar</a>   
             <asp:Label ID="lblcamcaptura" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
         <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">  
             <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                 <div data-options="region:'west'" style="border-style: none; width:55%; height:100%; padding:0px; overflow:hidden;" align="center">
                      <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:16%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcap">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:84%; padding:2px; overflow:hidden;" >
                            <div id="Div4" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tvcamcap" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                 <div data-options="region:'center'" style="border-style: none; height:100%; width:35%;padding:0px; overflow:hidden;" align="center">  
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:16%; padding:2px; overflow:hidden;" align="center"> 
                             <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Campos Consulta</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcon">                                                       
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:84%; padding:2px; overflow:hidden;" >
                            <div id="Div8" class="easyui-panel" style="width:100%;height:100%">                                
                                 <ul class="easyui-tree" id="tvcamcon" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                </div>
            </div>
            <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >
                <div class="easyui-panel" style="padding:3px; width:100%">   
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiaRelacion">Limpiar Selección</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAgregarCampos">Agregar</a>                     
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnOrigen">Modificar Origen</a> 
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnEliminarCampos">Eliminar</a> 
                </div>                
                <table id="dgcamcaptura" class="easyui-datagrid"  style="width:100%; height:89%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                    <thead>
                        <tr>                            
                            <th data-options="field:'camcaptura',width:120,align:'left',halign:'center',hidden:false">Campos Captura</th>
                            <th data-options="field:'namecamcap',width:180,align:'left',halign:'center',hidden:false">Campos Relación</th>                            
                            <th data-options="field:'camconsulta',width:120,align:'left',halign:'center',hidden:false">Campos Consulta</th>
                            <th data-options="field:'camorigen',width:120,align:'left',halign:'center',hidden:true">Campos Origen</th>
                        </tr>                           
                    </thead>  
                </table>                  
            </div>
         </div>
      </div>
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wbdirecta" closed="true" align="center" > 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLdirecta">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAdirecta">Aceptar</a>   
             <asp:Label ID="lblcambdirecta" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>   
        <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">            
            <div data-options="region:'north'" style="width:100%; height:13%; padding:2px; overflow:hidden;" align="center"> 
                <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                <input class="easyui-textbox" style="width:100%" id="txtcamdirectos">
            </div>
            <div data-options="region:'south'" style="width:100%; height:87%; padding:2px; overflow:hidden;" >
                <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                    <ul class="easyui-tree" id="tvcamdirectos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                </div> 
            </div>                                       
        </div>
      </div>
     <%-- <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wdisconsulta" closed="true" align="center">
           <div id="tcondicion" class="easyui-tabs" style="width: 100%; height: 95%;overflow:hidden;padding:0px;" data-options="plain:true">                  
                                        <div title="Configuración Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">                 
                                           
                                        </div>           
                                         <div title="Condición Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">  
                                             
                                         </div>                       
                                     </div>        
     </div> --%> 
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
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wconfiguraciones" closed="true" align="center">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLConfiguracion">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAConfiguracion">Aceptar</a>   
             <asp:Label ID="Label12" CssClass="LetraChica" runat="server" Text=""></asp:Label>
         </div> 
        <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">  
             <div data-options="region:'west'" style="border-style: none;width:40%; height:100%; padding:0px; overflow:hidden;" align="center">
                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:13%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Lista de Movimientos</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtmovimientos">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:87%; padding:2px; overflow:hidden;" >
                            <div id="Div9" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tvmovimientos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                   </div>
             </div>
             <div data-options="region:'center'" style="height:100%; width:auto;padding:0px; overflow:hidden;" align="center"> 
                 <table id="dgcamposconfig" class="easyui-datagrid"  style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                    <thead>
                        <tr>
                            <th data-options="field:'campo',width:180,align:'left',halign:'center',hidden:false">Campos</th>
                            <th data-options="field:'descripcioncampo',width:250,align:'left',halign:'center',hidden:false">Descripción</th>                            
                            <th data-options="field:'habilitarbusqueda',width:80,align:'center',halign:'center',hidden:false">Busqueda</th>
                        </tr>                           
                    </thead>  
                </table>   
             </div>
        </div>
      </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wordcondicion" closed="true" align="center">
            <div class="easyui-panel" style="padding:3px; width:100%">                                                         
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGOrden">Aceptar</a>               
         </div> 
            <br />
          <div class="easyui-layout" style="width:100%;height:93%; padding:10px; overflow:hidden;">  
               <a href="#" id="btnexacta" class="easyui-linkbutton" data-options="selected:true,plain:true,toggle:true,group:'gf'">Exacta</a>
               <a href="#" id="btnaproximada" class="easyui-linkbutton" data-options="plain:true,toggle:true,group:'gf'">Aproximada</a>  
          </div>
       </div>
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wfiltro" closed="true" align="center">
            <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLfiltro">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAfiltro">Aceptar</a>   
             <asp:Label ID="Label6" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>   
        <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">            
            <div data-options="region:'north'" style="width:100%; height:13%; padding:2px; overflow:hidden;" align="center"> 
                <asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                <input class="easyui-textbox" style="width:100%" id="txtCamFiltros">
            </div>
            <div data-options="region:'south'" style="width:100%; height:87%; padding:2px; overflow:hidden;" >
                <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                    <ul class="easyui-tree" id="tvcamfiltros" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                </div> 
            </div>                                       
        </div>
      </div>   
           <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO.jpg'); overflow:hidden;" id="wcamrelacion" closed="true">
        <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLFiltroCat">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAFiltroCat">Aceptar</a>   
             <asp:Label ID="lblcamrelacion" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>  
        <div class="easyui-layout" style="width:100%;height:91%; overflow:hidden;">
            <div data-options="region:'north'" style="width:100%; height:70%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                  <div data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                          
                      <div title="Columna Tabla Izquierda" style="padding: 1px; height:93%" align="center" id="Div16">                             
                           <asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Columna Izquierda</asp:Label>                                                                                                                      
                           <input class="easyui-textbox" style="width:100%" id="txtcolizq"></input> 
                           <div id="Div17" class="easyui-panel" style="padding:1px; width:100%;height:86%">
                               <ul class="easyui-tree" id="tcolizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                           </div> 
                      </div>
                  </div>
                  <div data-options="region:'center'" style="padding:3px;overflow:hidden;">
                      <div title="Columna tabla Derecha" style="padding: 1px; height:93%" align="center" id="Div18">
                           <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Campo Relación</asp:Label>                                                                                                                               
                           <input class="easyui-textbox" style="width:100%" id="txtcolder"> 
                           <div id="Div19" class="easyui-panel" style="padding:1px; width:100%; height:86%">
                                 <ul class="easyui-tree" id="tcolder" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                           </div> 
                      </div>
                  </div>
               </div>
            </div>
            <div data-options="region:'south'" style="width:100%; height:30%; padding:0px; overflow:hidden;" align="center">
                 <div class="easyui-panel" style="padding:3px; width:100%">                                            
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnEFiltroCat">Eliminar</a>                                                            
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAGFiltroCat">Agregar</a>   
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Y',toggle:true,group:'g1'" id="btnY"></a>   
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-O',toggle:true,group:'g1'" id="btnO"></a>                   
                </div>  
                <input class="easyui-textbox" style="width:100%; height:70%;" id="txtfiltro" labelPosition="top" multiline="true" data-options="readonly:true"></input>
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
