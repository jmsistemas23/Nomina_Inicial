<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseño_Consultas.aspx.cs" Inherits="FILE_DiseñadorDeConsultas_Diseño_Consultas" %>

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
    <script type="text/javascript" src="Diseño_Consultas.js?1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <div class="easyui-layout" style="border-style: none; width:100%;height:100%; padding:0px; overflow:hidden;">                                            
                <div class="easyui-panel" style="padding:3px; width:100%">                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>                               
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLconsulta">Limpiar</a>                                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnAconsulta">Guardar</a>   
                <asp:Label ID="lblconsulta" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                               
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
                                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnCatalogo">Relacionar Catálogo</a>                                                                             
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
    </div>
        <div class="modal" style="display: none; " id="loading" align="center">
      <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
      </div> 
    </div>     
    </form>
</body>
</html>
