<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Configuracion_Campos_Captura.aspx.cs" Inherits="FILE_DiseñadorDeCaptura_Configuracion_Campos_Captura" %>

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
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Configuracion_Campos_Captura.js?1.4"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiar">Limpiar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>                 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Filtro',disabled:true" id="btnFiltro">Buscar</a> 
        </div>  
       <br />                  
       <div class="easyui-layout" style="width:97%;height:90%; overflow:hidden;" align="center">
          <div id="p" data-options="region:'west'" style="width:20%;padding:3px; overflow:hidden;" align="center">    
            <table style="width: 100%;">
               <tr>
                 <td align="center"><a href="#" id="btnMP" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_MovPer',plain:false,toggle:true,group:'gf'" style="width:90%">Movimientos de Personal</a></td>
               </tr>
               <tr>
                 <td align="center"><a href="#" id="btnMC" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_MovCon',plain:false,toggle:true,group:'gf'"style="width:90%">Movimientos de Conceptos</a></td>
              </tr>
              <tr>
                 <td align="center"><a href="#" id="btnDP" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_DatPer',plain:false,toggle:true,group:'gf'"style="width:90%">   Datos Personales   </a></td>
             </tr>
                <tr>
                 <td align="center"><a href="#" id="btnRF" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon-RefFam',plain:false,toggle:true,group:'gf'"style="width:90%">Referencias Familiares</a></td>
             </tr>
                 <tr>
                 <td align="center"><a href="#" id="btnIL" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_IncLab',plain:false,toggle:true,group:'gf'"style="width:90%">Incidencias Laborales</a></td>
             </tr>                
               <tr>
                 <td align="center"><a href="#" id="btnPA" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_PenAli',plain:false,toggle:true,group:'gf'" style="width:90%">  Pensión Alimenticia  </a></td>
             </tr>        
         </table>         
          </div>
          <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">   
               <table id="dgcampos" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbO">              
                            <thead data-options="frozen:true">
                                <tr>
                                    <th data-options="field:'chk',checkbox:true"></th>                                                                                        
                                    <th data-options="field:'campo',width:100,align:'left',halign:'center'">Campo</th>
                                    <th data-options="field:'descripcionCampo',width:250,align:'left',halign:'center', editor: { type: 'textbox'}">Descripción</th>         
                                </tr>
                            </thead> 
                            <thead>
                                <tr>                                    
                                    <th data-options="field:'longitud',width:80,align:'center', editor: { type: 'textbox'}">Longitud</th>
                                    <th data-options="field:'tamaño',width:80,align:'center', editor: { type: 'textbox'}">Tamaño</th>                                    
                                    <th data-options="field:'tipoDato',width:120,align:'center',halign:'center',hidden:false,
                                                    <%--formatter:function(value,row){
                                                      return row.descripcion;
                                                    },    --%>                                              
                                                  editor:{
                                                     type:'combobox',
                                                     options:{
                                                              valueField:'tipodato',
                                                              textField:'descripcion',
                                                               data:[
                                                                      {tipodato: 't', descripcion: 'Texto'},                                                                      
                                                                      {tipodato: 's', descripcion: 'Selección'},
                                                                      {tipodato: 'n', descripcion: 'Numérico'},
                                                                      {tipodato: 'e', descripcion: 'Entero'},
                                                                      {tipodato: 'c', descripcion: 'CheckBox'},
                                                                      {tipodato: 'r', descripcion: 'RadioButton'},
                                                                      {tipodato: 'tm', descripcion: 'Multilinea'},
                                                                      {tipodato: 'd', descripcion: 'Decimal'},                                                                      
                                                                      {tipodato: 'f', descripcion: 'Fecha'},
                                                                      {tipodato: 'b', descripcion: 'Boton'},
                                                                    ],
                                                              required:true
                                                             }
                                                    }">Tipo Dato</th>
                                    <th data-options="field:'usoInterno',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Uso Interno</th>                        
                                    <th data-options="field:'usoDescriptivo',width:95,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Uso Descriptivo</th>                                                                    
                                    <th data-options="field:'usoOrigen',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Uso Origen</th>          
                                    <th data-options="field:'campoDescriptivo',width:150,align:'center',halign:'center',hidden:false">Campo Descriptivo</th>                              
                                    <th data-options="field:'campo_GuardaOrigen',width:100,align:'center',halign:'center',hidden:false">Campo Origen</th>
                                    <th data-options="field:'catalogoseleccion',width:100,align:'center',halign:'center',hidden:false">Catálogo</th>
                                    <th data-options="field:'catalogoSeleccionTexto',width:100,align:'center',halign:'center',hidden:true">Texto</th>
                                    <th data-options="field:'catalogoSeleccionValor',width:100,align:'center',halign:'center',hidden:true">Valor</th>
                                    <th data-options="field:'catalogoSeleccionfiltro',width:150,align:'left',halign:'center',hidden:true">Consulta Catálogo</th>
                                    <th data-options="field:'campoFiltro',width:120,align:'center',halign:'center'">Filtro del catálogo</th>
                                    <th data-options="field:'campoRelacion',width:120,align:'center',halign:'center',hidden:false">Campo a Filtrar</th>                                                            
                                </tr>
                            </thead>                            
            </table>                  
            <div id="tbO" style="height:auto">                
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnAgregarCampo">Agregar Campo</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnDescriptivo">Relacionar Campo Descriptivo</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnOrigen">Relacionar Campo Origen</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnCatalogo">Relacionar Campo Catálogo</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnOpciones">Relacionar Campo Opciones</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnWFiltroCat">Filtro del Catálogo</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnCampoFiltro">Campo a Filtrar</a>
                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnValidaciones">Validaciones</a>
            </div>  
          </div>
       </div>
    </div>    
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wcampoopciones" closed="true" align="center"> 
          <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCamOpc">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnACamOpc">Aceptar</a>   
             <asp:Label ID="lblcamopc" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
         <br />
         <table>
             <tr>
                 <td><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Texto Verdadero:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:110px" id="txtopcV"></td>
                 <td><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Valor Verdadero:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:50px" id="txtvalV"></td>
             </tr>
             <tr>
                 <td><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Texto Falso:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:110px" id="txtopcF"></td>
                 <td><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Valor Falso:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:50px" id="txtvalF"></td>
             </tr>
         </table>
     </div>      
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wdescriptivo" closed="true" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLDescriptivo">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAdescriptivo">Aceptar</a>   
             <asp:Label ID="lblcamdes" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div>   
        <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">            
            <div data-options="region:'north'" style="width:100%; height:10%; padding:2px; overflow:hidden;" align="center"> 
                <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Campos</asp:Label> 
                <input class="easyui-textbox" style="width:100%" id="txtcampos">
            </div>
            <div data-options="region:'south'" style="width:100%; height:90%; padding:2px; overflow:hidden;" >
                <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                    <ul class="easyui-tree" id="tvcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                </div> 
            </div>                                       
        </div>
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
                      <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Tablas del Sistema</asp:Label> 
                      <input class="easyui-textbox" style="width:100%" id="txttablas">
                   </div>
                   <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                       <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                          <ul class="easyui-tree" id="tvtablas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                       </div> 
                   </div>   
                </div>
                 <div data-options="region:'center'" style="width:90%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                     <div data-options="region:'west'" style="width:50%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                           <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Campo Valor</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamvalor">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamvalor" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                               </div> 
                           </div>   
                     </div>
                    <div data-options="region:'center'" style="height:100%; padding:0px; overflow:hidden;" align="center"> 
                          <div data-options="region:'north'" style="width:100%; height:16%; padding:0px; overflow:hidden;" align="center"> 
                              <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Campo Texto</asp:Label> 
                              <input class="easyui-textbox" style="width:100%" id="txtcamtexto">
                           </div>
                           <div data-options="region:'south'" style="width:100%; height:85%; padding:0px; overflow:hidden;" >
                               <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                                  <ul class="easyui-tree" id="tvcamtexto" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                               </div> 
                           </div>   
                    </div>
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
                  <div data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">                          
                      <div title="Columna Tabla Izquierda" style="padding: 1px; height:93%" align="center" id="Div5">                             
                           <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Columna Izquierda</asp:Label>                                                                                                                      
                           <input class="easyui-textbox" style="width:100%" id="txtcolizq"></input> 
                           <div id="Div7" class="easyui-panel" style="padding:1px; width:100%;height:86%">
                               <ul class="easyui-tree" id="tcolizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                           </div> 
                      </div>
                  </div>
                  <div data-options="region:'center'" style="padding:3px;overflow:hidden;">
                      <div title="Columna tabla Derecha" style="padding: 1px; height:93%" align="center" id="Div8">
                           <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Campo Relación</asp:Label>                                                                                                                               
                           <input class="easyui-textbox" style="width:100%" id="txtcolder"> 
                           <div id="Div9" class="easyui-panel" style="padding:1px;" width:100%;height:86%">
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
    <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO.jpg');" id="wfilavanzado" closed="true">
          <div class="easyui-panel" style="padding: 3px;">                
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLConsulta">Limpiar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnConsultar">Filtrar Condición</a>
          </div>  
         <div class="easyui-layout" style="width:100%;height:95%; overflow:hidden;">
              <div data-options="region:'north'" style="width:100%; height:55%; padding:0px; overflow:hidden;" align="center"> 
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="width:30%; overflow:hidden;" align="center">
                                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                    <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                        <input class="easyui-textbox" style="width:100%" id="txtcampo" data-options="readonly:false"></input>     
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                        <div id="Div10" class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                    </div>
                                </div>
                        </div>
                        <div data-options="region:'center'" style="width:auto; overflow:hidden;" align="center">
                                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                    <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Condiciones</asp:Label>  
                                        <input class="easyui-textbox" style="width:100%" id="txtcondicion" data-options="readonly:false"></input>     
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                        <div id="Div11" class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tcondicion" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                    </div>
                                </div>
                        </div>                                           
                        <div data-options="region:'east'" style="width:40%; overflow:hidden;" align="center">
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                    <div data-options="region:'north'" style="width:100%; height:20%; padding:3px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                        <input class="easyui-textbox" style="width:100%" id="txtvalbuscar" data-options="readonly:false"></input>     
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:80%; padding:3px; overflow:hidden;" >
                                        <div id="Div12" class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tvalor" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                    </div> 
                                    </div>
                                </div>
                        </div>
                    </div>
              </div>
             <div data-options="region:'south'" style="width:100%; height:45%; padding:0px; overflow:hidden;" >
                  <div class="easyui-panel" style="padding:3px; width:100%">    
                       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:false" id="btnECondicion">Eliminar</a>
                       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnACondicion">Agregar</a>   
                       <a href="#" id="opcY" class="easyui-linkbutton" data-options="iconCls:'icon-Y',plain:true,toggle:true,group:'gf'"></a>
                       <a href="#" id="opcO" class="easyui-linkbutton" data-options="iconCls:'icon-O',plain:true,toggle:true,group:'gf'"></a>                             
                  </div>
                 <table id="dgcondicion" class="easyui-datagrid"  style="width:100%; height:174px;" data-options="rownumbers: true,singleSelect:true, striped:true">
                        <thead>
                            <tr>
                                <th data-options="field:'Condicion',width:670,align:'left',halign:'center'">Condición</th>
                            </tr>
                        </thead>
                    </table>                             
             </div>
         </div>
     </div>     
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="dvalidaciones" closed="true" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLValidaciones">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAValidaciones">Aceptar</a>   
             <asp:Label ID="Label14" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
         </div> 
         <br />
         <table>
             <tr>
                 <td><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Campo Seleccionado:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:200px" id="txtcamposel"></td>
             </tr>
             <tr>
                 <td><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Carácteres a Eliminar:</asp:Label> </td>
                 <td><input class="easyui-textbox" style="width:110px" id="txtvalorsel"></td>
             </tr>
         </table>
    </div>      
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wAgregarCampos" closed="true" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLCampo">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGCampo">Guardar</a>       
         </div>           
         <table id="dgcolnuevas" class="easyui-datagrid"  style="width:100%; height:90%;">              
              <thead>
                   <tr>    
                     <th data-options="field:'chk',checkbox:true"></th>                                          
                     <th data-options="field:'campo',width:150,align:'left',halign:'center'">Campo</th>
                     <th data-options="field:'descripcionCampo',width:250,align:'left',halign:'center', editor: { type: 'textbox'}">Descripción</th>     
                     <%--<th data-options="field:'usoDescriptivo',width:95,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Uso Descriptivo</th>               
                     <th data-options="field:'usoInterno',width:80,align:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Uso Interno</th>                  --%>   
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
