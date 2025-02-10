<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogos_Configuracion.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Catalogos_Configuracion" %>

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
    <script type="text/javascript" src="Catalogos_Configuracion.js?0.1"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>                
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-cat'" id="btnVistaCat">Vista Catálogo</a> 
              <asp:Label ID="lblcat" CssClass="LetraChica" runat="server" Text=""></asp:Label>                   
           </div>
        <br />
         <div id="tt" class="easyui-tabs" style="width: 90%; height: 90%;overflow:hidden;padding:3px;"  data-options="plain:true">                  
             <div title="Configuración de la Vista" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">
                   <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                    <div id="Div3" data-options="region:'west'" style="width:15%;padding:3px; overflow:hidden;" align="center">
                            <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                            <div data-options="region:'north'" style="width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                                <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                                <input class="easyui-textbox" style="width:100%" id="txtcamvista">
                            </div>
                            <div data-options="region:'south'" style="border-style: none; width:100%; height:92%; padding:0px; overflow:hidden;" >
                                <div id="Div4" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tcamvista" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                            </div>
                    </div>
                    <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">   
                        <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;" align="center">                                                                                                                                 
                               <table id="dgvista" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbvista">  
                                            <thead data-options="frozen:true">
                                                <tr>
                                                    <th data-options="field:'chk',checkbox:true"></th>                                                        
                                                    <th data-options="field:'Campo',width:130,align:'left',halign:'center',hidden:false">Campos</th>
                                                    <th data-options="field:'OrdenVista',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Ordenar</th>
                                                    <th data-options="field:'AlinearDato',width:120,align:'center',halign:'center',hidden:false,                                                  
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
                                                                        }">Alinear Datos</th>                                                        
                                                 </tr>                                                         
                                            </thead>     
                                            <thead>
                                                <tr>                                                    
                                                    <th data-options="field:'Titulo',width:180,align:'left',halign:'center', editor: { type: 'textbox'}">Titulo</th>                                                                                                                                                                                                  
                                                    <th data-options="field:'AlinearTitulo',width:120,align:'center',halign:'center',hidden:false,                                                  
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
                                                                        }">Alinear Título</th>    
                                                    <th data-options="field:'Longitud',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Longitud</th>
                                                    <th data-options="field:'Ocultar',width:55,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ocultar</th>                                                    
                                                    <th data-options="field:'ColumnasBloqueadas',width:125,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Columnas Bloquedas</th>
                                                    <th data-options="field:'Clave',width:50,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Clave</th>
                                                    <th data-options="field:'Descripcion',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Descripción</th>
                                                    <th data-options="field:'OrdenarDatos',width:100,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ordenar Datos</th> 
                                                    <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true">Campos ant</th> 
                                                     <th data-options="field:'TipoDato',width:120,align:'center',halign:'center',hidden:false,                                                  
                                                        editor:{
                                                                type:'combobox',
                                                                options:{
                                                                    valueField:'TipoDato',
                                                                    textField:'descripcion',
                                                                    data:[
                                                                            {TipoDato: 'Texto', descripcion: 'Texto'},                                                                            
                                                                            {TipoDato: 'Numerico', descripcion: 'Numerico'},                                                                            
                                                                        ],
                                                                  }
                                                        }">Tipo Dato</th>
                                                </tr>                           
                                            </thead>     
                                     </table> 
                                     <div id="tbvista" style="padding:3px; width:100%">   
                                        <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh',disabled:false" id="btnActualizaVista">Actualizar</a>--%>
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLVista">Limpiar</a>  
                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGVista">Guardar</a>
                                         <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEVista">Eliminar</a>  
                                         <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnVistaCaptura">Relacionar Vista-Campos Captura</a>                                                                                      
                                    </div>                          
                       </div>
                    </div>                                         
                 </div>
             </div>
             <div title="Configuración Campos Captura" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">                
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                    <div id="p" data-options="region:'west'" style="width:15%;padding:3px; overflow:hidden;" align="center">
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
                                    <th data-options="field:'Campo',width:150,align:'left',halign:'center',hidden:false">Campo</th>
                                    <th data-options="field:'Orden',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Ordenar</th>
                                    <th data-options="field:'Descripcion',width:200,align:'left',halign:'center', editor: { type: 'textbox'}">Descripción</th>                                             
                                </tr>
                            </thead> 
                            <thead>                                
                                <tr>
                                    <th data-options="field:'CampoLLave',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Campo Clave</th>                                    
                                    <th data-options="field:'CamposLlavesGuardar',width:105,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Consecutivo</th>                                  
                                    <th data-options="field:'TipoDato',width:120,align:'center',halign:'center',hidden:false,                                                  
                                                  editor:{
                                                     type:'combobox',
                                                     options:{
                                                              valueField:'TipoDato',
                                                              textField:'descripcion',
                                                               data:[
                                                                      {TipoDato: 't', descripcion: 'Texto'},                                                                      
                                                                      {TipoDato: 's', descripcion: 'Selección'},
                                                                      {TipoDato: 'n', descripcion: 'Numerico'},
                                                                      {TipoDato: 'c', descripcion: 'CheckBox'},                                                                     
                                                                      {TipoDato: 'r', descripcion: 'Radios'},                                                                     
                                                                      {TipoDato: 'tm', descripcion: 'Multilinea'},
                                                                      {TipoDato: 'd', descripcion: 'Decimal'},                                                                      
                                                                      {TipoDato: 'f', descripcion: 'Fecha'},
                                                                      {TipoDato: 'a', descripcion: 'Archivo'},
                                                                    ],                                                         
                                                             }
                                                    }">Tipo Dato</th>
                                    <th data-options="field:'Longitud',width:70,align:'center', editor: { type: 'textbox'}">Longitud</th>
                                    <th data-options="field:'Tamaño',width:70,align:'center', editor: { type: 'textbox'}">Tamaño</th>                                    
                                    <th data-options="field:'GenerarClave',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Gen. Clave</th>
                                    <th data-options="field:'SoloLectura',width:85,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Solo Lectura</th>
                                    <th data-options="field:'ValidarNulo',width:85,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Validar Nulo</th>
                                    <th data-options="field:'CampoOpciones',width:120,align:'center',halign:'center',hidden:false">Opciones</th>                                        
                                    <th data-options="field:'HabilitarCatalogo',width:70,align:'center',halign:'center',hidden:false">Catálogo</th>                                        
                                    <th data-options="field:'CampoFiltro',width:120,align:'center',halign:'center',hidden:false">Campos de Filtros</th>
                                    <th data-options="field:'CampoRelacion',width:100,align:'center',halign:'center',hidden:false">Campo a Filtrar</th>
                                    <th data-options="field:'HabilitarBusqueda',width:70,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Busqueda</th>
                                    <th data-options="field:'Consulta_CamposConcatenar',width:70,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Concatenar</th>
                                    <th data-options="field:'CampoCaptura',width:120,align:'center',halign:'center'">Relación Captura</th>             
                                    <th data-options="field:'Catalogo_Tabla',width:100,align:'center',halign:'center',hidden:true">Cat_Tabla</th>                                                                                           
                                    <th data-options="field:'Catalogo_Texto',width:100,align:'center',halign:'center',hidden:true">Cat_Texto</th>
                                    <th data-options="field:'Catalogo_Valor',width:100,align:'center',halign:'center',hidden:true">Cat_Valor</th>
                                    <th data-options="field:'Catalogo_Consulta',width:100,align:'center',halign:'center',hidden:true">Cat_Consulta</th>
                                    <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true"">Campos ant</th>                                    
                                </tr>
                            </thead>
                        </table>
                        <div id="tbcam" style="height:auto">  
                           <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh',disabled:false" id="btnActualizarCam">Actualizar</a>--%>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLCampos">Limpiar</a>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGCampos">Guardar</a>  
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnECampos">Eliminar</a>                    
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnOpciones">Relacionar Campo Opciones</a>                                
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCatalogo">Relacionar Campo Catálogo</a>    
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCamposFiltros">Campos de Filtros</a>
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCatalogoaFiltrar">Campo a Filtrar</a>       
                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnCampoCaptura">Relacionar Consulta-Campos Captura</a>                             
                        </div>
                       </div>
                    </div>                                         
                 </div>
             </div>
             <div title="Configuración Campos Busqueda" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">                                      
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="border-style: none; width:20%; height:100%; padding:1px; overflow:hidden;" align="center">                            
                             <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style=" width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
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
                        <div data-options="region:'center'" style="border-style: none; height:100%; width:80%;padding:1px; overflow:hidden;" align="center">                                                         
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
                                                                    <th data-options="field:'Campo',width:150,align:'left',halign:'center',hidden:false">Campos</th>
                                                                    <th data-options="field:'OrdColumnas',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Ordenar</th>                                                                                           
                                                                    <th data-options="field:'AlinerDato',width:110,align:'center',halign:'center',hidden:false,                                                  
                                                                                        editor:{
                                                                                            type:'combobox',
                                                                                            options:{
                                                                                                    valueField:'Alineacion',
                                                                                                    textField:'descripcion',
                                                                                                    data:[
                                                                                                            {Alineacion: 'Left', descripcion: 'Izquierda'},                                                                      
                                                                                                            {Alineacion: 'Center', descripcion: 'Centro'},
                                                                                                            {Alineacion: 'Right', descripcion: 'Derecha'},                                                                      
                                                                                                        ],
                                                                                                    }
                                                                                        }">Alinear Dato</th>         
                                                                 </tr>                           
                                                            </thead>     
                                                            <thead>
                                                                <tr>                                                    
                                                                    <th data-options="field:'Titulo',width:150,align:'left',halign:'center', editor: { type: 'textbox'}">Titulo</th>                                                    
                                                                    <th data-options="field:'AlinearTitulo',width:110,align:'center',halign:'center',hidden:false,                                                  
                                                                                        editor:{
                                                                                            type:'combobox',
                                                                                            options:{
                                                                                                    valueField:'Alineacion',
                                                                                                    textField:'descripcion',
                                                                                                    data:[
                                                                                                            {Alineacion: 'Left', descripcion: 'Izquierda'},                                                                      
                                                                                                            {Alineacion: 'Center', descripcion: 'Centro'},
                                                                                                            {Alineacion: 'Right', descripcion: 'Derecha'},                                                                      
                                                                                                        ],
                                                                                                    }
                                                                                        }">Alinear Título</th>         
                                                                    <th data-options="field:'Longitud',width:60,align:'center',halign:'center', editor: { type: 'textbox'}">Longitud</th>                                                    
                                                                    <th data-options="field:'Ocultar',width:60,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ocultar</th>
                                                                    <th data-options="field:'CampoAnt',width:100,align:'center',halign:'center',hidden:true"">Campos ant</th> 
                                                                </tr>                           
                                                            </thead>     
                                                         </table> 
                                                     <div id="tbcol" style="padding:3px; width:100%">   
                                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiarconsulta">Limpiar</a>                                          
                                                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarConsulta">Guardar</a>
                                                        <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnCamConfig">Campos Configurados</a> --%>                                                        
                                                    </div>  
                                                     </div>   
                                                      <div title="Vista Previa" style="border-style: none; padding: 3px; overflow:hidden; width:100%;" align="center">                                                            
                                                            <table id="dgvistaprevia" class="easyui-datagrid" toolbar="#tbvistaPrevia" style="width:100%; height:100%;" data-options = "striped: true,fitColumns:true,rownumbers: true, pagination: true, singleSelect: true, autoRowHeight: false, pageSize: 20 "> </table>
                                                          <div id="tbvistaPrevia" style="padding:3px; width:100%">   
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
                                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnEConsulta">Eliminar</a>  
                                                <asp:Label ID="lblcampo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                               
                                            </div>                                                       
                                          <div id="tpsql" class="easyui-tabs" style="width: 100%; height: 95.9%;overflow:hidden;padding:0px;" data-options="plain:true">                  
                                              <div title="Configuración Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%;height:100%;" align="center"> 
                                                   <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden; padding:0px;">
                                                        <div data-options="region:'west'" style="width:25%;height:100%; padding:0px; overflow:hidden;" align="center">
                                                           <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden;">
                                                                <div data-options="region:'north'" style="border-style: none;  width:100%; height:10%; padding:3px; overflow:hidden;" align="center"> 
                                                                    <asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server">Lista de Tablas</asp:Label> 
                                                                    <input class="easyui-textbox" style="width:100%" id="txttbllist">
                                                                </div>
                                                                <div data-options="region:'south'" style="border-style: none;  width:100%; height:90%; padding:3px; overflow:hidden;" >
                                                                    <div id="Div24" class="easyui-panel" style="width:100%;height:100%">
                                                                        <ul class="easyui-tree" id="tvtblsist" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
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
                                                                                </tr>                                            
                                                                             </thead>                                                                           
                                                                       </table>                                                                                                                                      
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
                                                                                        <asp:Label ID="Label27" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                                                                        <input class="easyui-textbox" style="width:100%" id="txtcampo" data-options="readonly:false"></input>     
                                                                                    </div>
                                                                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                        <div id="Div26" class="easyui-panel" style="width:100%;height:100%">
                                                                                        <ul class="easyui-tree" id="tvcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                                                    </div> 
                                                                                    </div>
                                                                                </div>
                                                                        </div>
                                                                        <div data-options="region:'center'" style="border-style: none; width:auto; overflow:hidden;" align="center">
                                                                                <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                                    <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                                                                        <asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Condiciones</asp:Label>  
                                                                                        <input class="easyui-textbox" style="width:100%" id="txtcondicion" data-options="readonly:false"></input>     
                                                                                    </div>
                                                                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                        <div id="Div27" class="easyui-panel" style="width:100%;height:100%">
                                                                                        <ul class="easyui-tree" id="tvcondicion" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                                                    </div> 
                                                                                    </div>
                                                                                </div>
                                                                        </div>                                           
                                                                        <div data-options="region:'east'" style=" border-style: none; width:40%; overflow:hidden;" align="center">
                                                                            <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                                                    <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                                                                        <asp:Label ID="Label29" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                                                                        <input class="easyui-textbox" style="width:100%" id="txtvalbuscar" data-options="readonly:false"></input>     
                                                                                    </div>
                                                                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                                                                        <div id="Div28" class="easyui-panel" style="width:100%;height:100%">
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
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wdisconsulta" closed="true" align="center">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="">Aceptar</a>
                                      
          </div>
          <div id="tcondicion" class="easyui-tabs" style="width: 100%; height: 95%;overflow:hidden;padding:0px;" data-options="plain:true">                  
             <div title="Configuración Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">                 
               <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden; padding:0px;">
                    <div data-options="region:'west'" style="border-style: none;width:25%;height:100%; padding:0px; overflow:hidden;" align="center">
                       <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden;">
                            <div data-options="region:'north'" style=" width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                                <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Lista de Tablas</asp:Label> 
                                <input class="easyui-textbox" style="width:100%" id="txtBtblsist">
                            </div>
                            <div data-options="region:'south'" style=" width:100%; height:92%; padding:3px; overflow:hidden;" >
                                <div id="Div9" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                      </div>
                   </div>
                   <div data-options="region:'center'" style="border-style: none; width:75%;height:100%;padding:0px; overflow:hidden;" align="center">
                        <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                            <div id="" data-options="region:'north',split:false" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="left">                                                        
                            </div>                       
                            <div data-options="region:'center'" style="width:100%; height:auto; padding:3px; overflow:hidden;" >                                                     
                                <div class="easyui-panel" style="padding:0px; width:100%">                                            
                                     <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="">Generar Relaciones</a>
                                </div> 
                                <input class="easyui-textbox" style="width:100%; height:20%;" id="" labelPosition="top" multiline="true" data-options="readonly:false"></input>
                                <div class="easyui-layout" style="border-style: none; width:100%;height:70%; overflow:hidden;">
                                <table id="" class="easyui-datagrid" style="width:100%; height:100%;">              
                                         <thead>
                                            <tr>                                    
                                                <th data-options="field:'tabla',width:190,align:'left',halign:'center',hidden:true">tabla</th>
                                                <th data-options="field:'campo',width:190,align:'left',halign:'center',hidden:false">Campo</th>
                                                <th data-options="field:'orden',width:60,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Ordenar</th>
                                                <th data-options="field:'tipoorden',width:120,align:'center',halign:'center',hidden:false,                                                  
                                                                            editor:{
                                                                                type:'combobox',
                                                                                options:{
                                                                                        valueField:'tipoorden',
                                                                                        textField:'descripcion',
                                                                                        data:[
                                                                                                {tipoorden: 'Asc', descripcion: 'Ascendente'},                                                                      
                                                                                                {tipoorden: 'Desc', descripcion: 'Descendente'},                                                                                    
                                                                                            ],
                                                                                        }
                                                                            }">Tipo</th>
                                            </tr>
                                         </thead> 
                                       </table>    
                                </div>
                            </div>                           
                        </div>
                   </div>          
              </div> 
             </div>
             <div title="Condición Consulta" style="border-style: none; padding: 3px; overflow:hidden; width:100%" align="center">  
                   <div class="easyui-layout" style="width:100%; height:100%; overflow:hidden; padding:0px;">
                       <div data-options="region:'west'" style="border-style: none;width:25%;height:100%; padding:0px; overflow:hidden;" align="center">
                           <div class="easyui-layout" style="border-style: none; width:100%; height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style=" width:100%; height:8%; padding:3px; overflow:hidden;" align="center"> 
                                    <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Tablas Seleccionadas</asp:Label> 
                                    <input class="easyui-textbox" style="width:100%" id="txttblsel">
                                </div>
                                <div data-options="region:'south'" style=" width:100%; height:92%; padding:3px; overflow:hidden;" >
                                    <div id="Div10" class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tvtblsel" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                </div>
                          </div>
                       </div>
                      <div data-options="region:'center'" style="border-style: none; width:75%;height:100%;padding:0px; overflow:hidden;" align="center">
                             <div class="easyui-layout" style="border-style: none; width:100%;height:100%; padding:0px; overflow:hidden;">
                                  <div data-options="region:'north'" style="border-style: none;width:100%; height:55%; padding:0px; overflow:hidden;" align="center"> 
                                         <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                            <div data-options="region:'west'" style="border-style: none; width:30%; overflow:hidden;" align="center">
                                                    <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                        <div data-options="region:'north'" style=" width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                                            <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                                            <input class="easyui-textbox" style="width:100%" id="" data-options="readonly:false"></input>     
                                                        </div>
                                                        <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                                            <div id="Div11" class="easyui-panel" style="width:100%;height:100%">
                                                            <ul class="easyui-tree" id="" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                        </div> 
                                                        </div>
                                                    </div>
                                            </div>
                                            <div data-options="region:'center'" style="border-style: none; width:auto; overflow:hidden;" align="center">
                                                    <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                        <div data-options="region:'north'" style="width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                                            <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Condiciones</asp:Label>  
                                                            <input class="easyui-textbox" style="width:100%" id="" data-options="readonly:false"></input>     
                                                        </div>
                                                        <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                                            <div id="Div12" class="easyui-panel" style="width:100%;height:100%">
                                                            <ul class="easyui-tree" id="" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                        </div> 
                                                        </div>
                                                    </div>
                                            </div>                                           
                                            <div data-options="region:'east'" style=" border-style: none; width:40%; overflow:hidden;" align="center">
                                                <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">
                                                        <div data-options="region:'north'" style="width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                                            <asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                                            <input class="easyui-textbox" style="width:100%" id="" data-options="readonly:false"></input>     
                                                        </div>
                                                        <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                                            <div id="Div13" class="easyui-panel" style="width:100%;height:100%">
                                                            <ul class="easyui-tree" id="" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                                        </div> 
                                                        </div>
                                                    </div>
                                            </div>
                                        </div>
                                  </div>
                                 <div data-options="region:'center'" style="width:100%; height:auto; padding:3px; overflow:hidden;" >   
                                     <div class="easyui-panel" style="padding:3px; width:100%">   
                                           <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:false" id="">Eliminar</a>
                                             
                                     </div>                             
                                     <table id="" class="easyui-datagrid"  style="width:100%; height:87%;" data-options="rownumbers: true,singleSelect:true, striped:true">
                                            <thead>
                                                <tr>
                                                    <th data-options="field:'Condicion',width:670,align:'left',halign:'center'">Condición</th>
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
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcatalogo" closed="true" align="center" title="Relación de Campo-Catálogo">
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCatalogo">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACatalogo">Aceptar</a>   
             <asp:Label ID="lblcatalogo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>  
        <div class="easyui-layout" style="width:100%;height:89%; overflow:hidden;">            
                 <div data-options="region:'west'" style="width:40%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                   <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                      <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Tablas del Sistema</asp:Label> 
                      <input class="easyui-textbox" style="width:100%" id="txttablas">
                   </div>
                   <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                       <div id="Div5" class="easyui-panel" style="width:100%;height:100%">
                          <ul class="easyui-tree" id="tvtablas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                       </div> 
                   </div>   
                </div>
                 <div data-options="region:'center'" style="width:90%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                     <div data-options="region:'west'" style="width:50%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                           <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Campo Valor</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamvalor">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamvalor" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                               </div> 
                           </div>   
                     </div>
                    <div data-options="region:'center'" style="height:100%; padding:0px; overflow:hidden;" align="center"> 
                          <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Campo Texto</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamtexto">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div8" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamtexto" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                               </div> 
                           </div>   
                    </div>
                </div>
            </div>                                           
       </div>
    </div>     
         <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO.jpg'); overflow:hidden;" id="wCampoFiltro" closed="true" title="Selección del Campo Filtro">
        <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLFiltroCat">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAFiltroCat">Aceptar</a>   
             <asp:Label ID="lblcamrelacion" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>  
        <div class="easyui-layout" style="width:100%;height:91%; overflow:hidden;">
            <div data-options="region:'north'" style="width:100%; height:70%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                  <div data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">                          
                      <div title="Columna Tabla Izquierda" style="padding: 1px; height:93%" align="center" id="Div14">                             
                           <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Columna Izquierda</asp:Label>                                                                                                                      
                           <input class="easyui-textbox" style="width:100%" id="txtcolizq"></input> 
                           <div id="Div15" class="easyui-panel" style="padding:1px; width:100%;height:86%">
                               <ul class="easyui-tree" id="tcolizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                           </div> 
                      </div>
                  </div>
                  <div data-options="region:'center'" style="padding:3px;overflow:hidden;">
                      <div title="Columna tabla Derecha" style="padding: 1px; height:93%" align="center" id="Div16">
                           <asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Campo Relación</asp:Label>                                                                                                                               
                           <input class="easyui-textbox" style="width:100%" id="txtcolder"> 
                           <div id="Div17" class="easyui-panel" style="padding:1px; width:100%;height:86%">
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
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcamfiltrar" closed="true" align="center" title="Selección del Campo a Filtrar"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCamFiltro">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACamFiltro">Aceptar</a>   
             <asp:Label ID="lblcamdes" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>   
            <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">            
                <div data-options="region:'north'" style="width:100%; height:12%; padding:2px; overflow:hidden;" align="center"> 
                    <asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                    <input class="easyui-textbox" style="width:100%" id="txtcamfiltro">
                </div>
                <div data-options="region:'south'" style="width:100%; height:88%; padding:2px; overflow:hidden;" >
                    <div id="Div18" class="easyui-panel" style="width:100%;height:100%">
                        <ul class="easyui-tree" id="tvcamfiltro" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                    </div> 
                </div>                                       
            </div>
        </div>  
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcamcaptura" closed="true" align="center" title="Relación de los Campos Consulta-Campos Captura">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLcamcaptura">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAcamcaptura">Aceptar</a>   
             <asp:Label ID="lblcamcaptura" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
          </div> 
         <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">  
             <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                 <div data-options="region:'west'" style="border-style: none; width:55%; height:100%; padding:0px; overflow:hidden;" align="center">
                      <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcap">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >
                            <div id="Div19" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tvcamcap" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                 <div data-options="region:'center'" style="border-style: none; height:100%; width:35%;padding:0px; overflow:hidden;" align="center">  
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                             <asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Campos Consulta</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcon">                                                       
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >
                            <div id="Div20" class="easyui-panel" style="width:100%;height:100%">                                
                                 <ul class="easyui-tree" id="tvcamcon" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                </div>
            </div>
            <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >
                <div class="easyui-panel" style="padding:3px; width:100%">   
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAgregarCampos">Agregar</a> 
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnEliminarCampos">Eliminar</a> 
                </div>                
                <table id="dgcamcaptura" class="easyui-datagrid"  style="width:100%; height:88%;" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                    <thead>
                        <tr>
                            <th data-options="field:'camcaptura',width:150,align:'left',halign:'center',hidden:false">Campos Captura</th>
                            <th data-options="field:'namecamcap',width:150,align:'left',halign:'center',hidden:false">Relación</th>                            
                            <th data-options="field:'camconsulta',width:150,align:'left',halign:'center',hidden:false">Campos Consulta</th>
                        </tr>                           
                    </thead>  
                </table>                  
            </div>
         </div>
      </div>
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wvistacaptura" closed="true" align="center" title="Relación de las Columnas Vista-Campos Captura">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCamCapVista">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACamCapVista">Aceptar</a>   
             <asp:Label ID="Label18" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
          </div> 
         <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">  
             <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                 <div data-options="region:'west'" style="border-style: none; width:55%; height:100%; padding:0px; overflow:hidden;" align="center">
                      <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcapvista">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >
                            <div id="Div22" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tcamcapvista" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                 <div data-options="region:'center'" style="border-style: none; height:100%; width:35%;padding:0px; overflow:hidden;" align="center">  
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                             <asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Campos Consulta</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamconvista">
                            
                           
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >
                            <div id="Div23" class="easyui-panel" style="width:100%;height:100%">                                
                                 <ul class="easyui-tree" id="tcamconvista" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                 </div>
                </div>
            </div>
            <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >
                <div class="easyui-panel" style="padding:3px; width:100%">   
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnACamVista">Agregar</a> 
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnECamVista">Eliminar</a> 
                </div>                
                <table id="dgcamvista" class="easyui-datagrid"  style="width:100%; height:89%;" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                    <thead>
                        <tr>
                            <th data-options="field:'camcaptura',width:150,align:'left',halign:'center',hidden:false">Campos Captura</th>
                            <th data-options="field:'namecamcap',width:150,align:'left',halign:'center',hidden:false">Relación</th>                            
                            <th data-options="field:'camconsulta',width:150,align:'left',halign:'center',hidden:false">Campos Consulta</th>
                        </tr>                           
                    </thead>  
                </table>                  
            </div>
         </div>
      </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcambusqueda" closed="true" align="center">
            <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLcambus">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAcambus">Aceptar</a>               
          </div>       
        <table id="dgcambusqueda" class="easyui-datagrid"  style="width:100%; height:93%;" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
            <thead>
                <tr>
                    <th data-options="field:'idtabla',width:180,align:'left',halign:'center',hidden:false">Tabla</th>
                    <th data-options="field:'campo',width:180,align:'left',halign:'center',hidden:true">campo</th>                            
                    <th data-options="field:'descripcion',width:250,align:'left',halign:'center',hidden:false">Descripción</th>
                </tr>                           
            </thead>  
        </table> 
        </div>
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wcampoopciones" closed="true" align="center" title="Creación de las Opciones"> 
          <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCamOpc">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACamOpc">Aceptar</a>   
             <asp:Label ID="lblcamopc" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
         <br />
         <table>
             <tr>
                 <td><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server">Texto Verdadero:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:110px" id="txtopcV"></td>
                 <td><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Valor Verdadero:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:50px" id="txtvalV"></td>
             </tr>
             <tr>
                 <td><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Texto Falso:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:110px" id="txtopcF"></td>
                 <td><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server">Valor Falso:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:50px" id="txtvalF"></td>
             </tr>
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
