<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseño_IndicesMP.aspx.cs" Inherits="FILE_IndiceDeAfectacion_Diseño_IndicesMP" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	   
    <link href="style.css" rel="stylesheet" />

    <script src="../../Scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 

	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>    
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>
   
    <script type="text/javascript" src="Diseño_IndicesMP.js?2.2"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">         
          <div class="easyui-panel" style="padding:3px; width:100%">                                        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarInd">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarInd">Limpiar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGuardar">Guardar</a>               
             <asp:Label ID="lblindice" CssClass="LetraChica" runat="server"></asp:Label> 
          </div>          
             <table class="hijosIzquierda">
                <tr>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" id="chkRetroactivo" onchange="chkRetroactivo_Onchange()" /><asp:Label ID="Label4" CssClass="LetraMiniChica" runat="server" Text="Retroactivo"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkResponsabilidad" onchange="chkResponsabilidad_Onchange()" /><asp:Label ID="Label5" CssClass="LetraMiniChica" runat="server" Text="Responsabilidad"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkDiferencias" onchange="chkDiferencias_Onchange()" /><asp:Label ID="Label6" CssClass="LetraMiniChica" runat="server" Text="Diferencias"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkDiasDeAgui" /><asp:Label ID="Label2" CssClass="LetraMiniChica" runat="server" Text="Dias de Aguinaldo"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkBajas" /><asp:Label ID="Label8" CssClass="LetraMiniChica" runat="server" Text="Bajas"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkEliconceper" onchange="chkEliconceper_Onchange()" /><asp:Label ID="Label9" CssClass="LetraMiniChica" runat="server" Text="EliConceper"></asp:Label></td>
                </tr>
                <tr>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" id="chkActuConceper" onchange="chkActuConceper_Onchange()" /><asp:Label ID="Label10" CssClass="LetraMiniChica" runat="server" Text="AutoConceper"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkEliPension" /><asp:Label ID="Label11" CssClass="LetraMiniChica" runat="server" Text="EliPension"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkActuConceper2" onchange="chkActuConceper2_Onchange()" /><asp:Label ID="Label12" CssClass="LetraMiniChica" runat="server" Text="AutoConceper2"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkBajaFonac" onchange="chkBajaFonacot_Onchange()" /><asp:Label ID="Label13" CssClass="LetraMiniChica" runat="server" Text="Baja Fonac"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkActualizarFonac" onchange="chkActuFonacot_Onchange()" /><asp:Label ID="Label14" CssClass="LetraMiniChica" runat="server" Text="Actualiza Fonac"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkCancelarPago" /><asp:Label ID="Label15" CssClass="LetraMiniChica" runat="server" Text="Cancelar Pago"></asp:Label></td>
                </tr>
          </table> 
             <br />  
            <div class="easyui-accordion"  style="width: 65%; height: 80%;"> 
                <div title="Campos de Captura a Plaza Origen"  align="center" style="overflow:hidden;">                    
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                        <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                            <div data-options="region:'west'" style="border-style: none; width:50%; height:100%; padding:0px; overflow:hidden;" align="center">
                                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                    <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                                    <input class="easyui-textbox" style="width:100%" id="txtcamcap1">
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                    <div id="Div4" class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tvcamcap1" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                </div>                                       
                            </div>
                            </div>
                            <div data-options="region:'center'" style="border-style: none; height:100%; width:50%;padding:0px; overflow:hidden;" align="center">  
                                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Plaza Origen</asp:Label> 
                                    <input class="easyui-textbox" style="width:100%" id="txtcampla1">                                                       
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                    <div id="Div8" class="easyui-panel" style="width:100%;height:100%">                                
                                            <ul class="easyui-tree" id="tvcampla1" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                </div>                                       
                            </div>
                            </div>
                        </div>
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >                                        
                          <table id="dgcamcaptura1" class="easyui-datagrid"  toolbar="#tbcat" style="width:100%; height:100%;" data-options = "view: scrollview,  autoRowHeight: false,autoRowHeight:true ">  
                            <thead>
                                <tr>   
                                    <th data-options="field:'origen',width:280,align:'left',halign:'center',hidden:true">Captura</th>                                
                                    <th data-options="field:'desc_ori',width:280,align:'center',halign:'center',hidden:false">Campos Captura</th>   
                                    <th data-options="field:'destino',width:280,align:'left',halign:'center',hidden:true">Plaza</th>                                              
                                    <th data-options="field:'desc_des',width:280,align:'center',halign:'center',hidden:false">Campos Plaza</th>
                                  <%--  <th data-options="field:'tipo',width:100,align:'center',halign:'center',hidden:false,                                                  
                                                                                        editor:{
                                                                                            type:'combobox',
                                                                                            options:{
                                                                                                    valueField:'tipo',
                                                                                                    textField:'descripcion',
                                                                                                    data:[
                                                                                                            {tipo: 'T', descripcion: 'Todos'},
                                                                                                            {tipo: 'E', descripcion: 'Especificar'},                                                                                                            
                                                                                                        ],
                                                                                                    }
                                                                                        }">Tipo</th>        
                                    <th data-options="field:'ind',align:'center',hidden: true" width="100" formatter="showButton">Indicador</th>                  --%>                       
                                </tr>                           
                            </thead>  
                          </table> 
                            <div id="tbcat" style="padding:3px; width:100%">                                                                    
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcampla1">Limpiar</a>
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcampla1">Agregar</a>                                                     
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcampla1">Eliminar</a>                               
                        </div>                   
                       </div>
                    </div>        
                </div>
                <div title="Borrar Campos de Plaza Origen"  align="center"> 
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Campos Plaza Origen</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtcamcap0">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                            <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                <ul class="easyui-tree" id="tvcamcap0" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                    </div>
                </div>
                <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" > 
                    <table id="dgcamcaptura0" class="easyui-datagrid"  toolbar="#tbEcamplaori" style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                    <thead>
                        <tr>   
                            <th data-options="field:'destino',width:280,align:'left',halign:'center',hidden:true">Origen</th>                                
                            <th data-options="field:'desc_des',width:280,align:'center',halign:'center',hidden:false">Campos Plaza</th>
                            <th data-options="field:'tipo',width:50,align:'center',halign:'center',hidden:false">Tipo</th>
                        </tr>                           
                    </thead>  
                </table> 
                    <div id="tbEcamplaori" style="padding:3px; width:100%">                                                                    
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcampla0">Limpiar</a>
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcampla0">Agregar</a>                                                     
                       <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcampla0">Eliminar</a>  
                       <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnInd0">Indicadores</a>                                                                        
                </div>    
                </div>
            </div>        
                </div> 
                 <div title="Campos de Captura a Plaza Destino"  align="center">  
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                           <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                             <div data-options="region:'west'" style="border-style: none; width:50%; height:100%; padding:0px; overflow:hidden;" align="center">
                                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcamcap2">
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                                           <ul class="easyui-tree" id="tvcamcap2" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                             </div>
                             <div data-options="region:'center'" style="border-style: none; height:100%; width:50%;padding:0px; overflow:hidden;" align="center">  
                                 <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                         <asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Plaza Destino</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcampla2">                                                       
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div5" class="easyui-panel" style="width:100%;height:100%">                                
                                             <ul class="easyui-tree" id="tvcampla2" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                             </div>
                            </div>
                         </div>
                         <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >                                        
                            <table id="dgcamcaptura2" class="easyui-datagrid"  toolbar="#tbcat2" style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                                <thead>
                                    <tr>   
                                        <th data-options="field:'origen',width:280,align:'left',halign:'center',hidden:true">Captura</th>                                
                                        <th data-options="field:'desc_ori',width:280,align:'center',halign:'center',hidden:false">Campos Captura</th>   
                                        <th data-options="field:'destino',width:280,align:'left',halign:'center',hidden:true">Plaza</th>                                              
                                        <th data-options="field:'desc_des',width:280,align:'center',halign:'center',hidden:false">Campos Plaza</th>                                        
                                    </tr>                           
                                </thead>  
                            </table> 
                             <div id="tbcat2" style="padding:3px; width:100%">                                                                    
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcampla2">Limpiar</a>
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcampla2">Agregar</a>                                                     
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcampla2">Eliminar</a>                                                                          
                            </div>                   
                        </div>
                    </div>                
                </div>
                <div title="Campos de Plaza Origen a Plaza Destino"  align="center">   
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                         <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                              <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Campos Plaza Origen</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcamcap3">
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                                           <ul class="easyui-tree" id="tvcamcap3" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                         </div>
                         <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" > 
                             <table id="dgcamcaptura3" class="easyui-datagrid"  toolbar="#tbcam3" style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                                <thead>
                                    <tr>   
                                        <th data-options="field:'origen',width:280,align:'left',halign:'center',hidden:true">Origen</th>                                
                                        <th data-options="field:'desc_ori',width:280,align:'center',halign:'center',hidden:false">Campos Plaza</th>  
                                        <th data-options="field:'tipo',width:50,align:'center',halign:'center',hidden:false">Tipo</th>                                                            
                                    </tr>                           
                                </thead>  
                            </table> 
                             <div id="tbcam3" style="padding:3px; width:100%">                                                                    
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcampla3">Limpiar</a>
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcampla3">Agregar</a>                                                     
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcampla3">Eliminar</a>   
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnInd3">Indicadores</a>                                                                           
                            </div>    
                         </div>
                     </div>              
                </div>   
                 <div title="Campos de Captura a Empleados"  align="center">    
                     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                           <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                             <div data-options="region:'west'" style="border-style: none; width:50%; height:100%; padding:0px; overflow:hidden;" align="center">
                                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Campos Captura</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcamcap4">
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                                           <ul class="easyui-tree" id="tvcamcap4" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                             </div>
                             <div data-options="region:'center'" style="border-style: none; height:100%; width:50%;padding:0px; overflow:hidden;" align="center">  
                                 <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                         <asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Campos Empleados</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcamemp4">                                                       
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div9" class="easyui-panel" style="width:100%;height:100%">                                
                                             <ul class="easyui-tree" id="tvcamemp4" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                             </div>
                            </div>
                         </div>
                         <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" >                                        
                            <table id="dgcamcaptura4" class="easyui-datagrid"  toolbar="#tbcat4" style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                                <thead>
                                    <tr>   
                                        <th data-options="field:'origen',width:280,align:'left',halign:'center',hidden:true">Captura</th>                                
                                        <th data-options="field:'desc_ori',width:280,align:'center',halign:'center',hidden:false">Campos Captura</th>   
                                        <th data-options="field:'destino',width:280,align:'left',halign:'center',hidden:true">Empleado</th>                                              
                                        <th data-options="field:'desc_des',width:280,align:'center',halign:'center',hidden:false">Campos Empleado</th>                                        
                                    </tr>                           
                                </thead>  
                            </table> 
                             <div id="tbcat4" style="padding:3px; width:100%">                                                                    
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcamemp4">Limpiar</a>
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcamemp4">Agregar</a>                                                     
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcamemp4">Eliminar</a>                                                                          
                            </div>                   
                        </div>
                    </div>                      
                  </div>
                 <div title="Borrar Campos de Empleados"  align="center">      
                    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">  
                         <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                              <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                                    <div data-options="region:'north'" style="width:100%; height:27%; padding:2px; overflow:hidden;" align="center"> 
                                        <asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server">Campos Empleados</asp:Label> 
                                        <input class="easyui-textbox" style="width:100%" id="txtcamemp5">
                                    </div>
                                    <div data-options="region:'south'" style="width:100%; height:73%; padding:2px; overflow:hidden;" >
                                        <div id="Div10" class="easyui-panel" style="width:100%;height:100%">
                                           <ul class="easyui-tree" id="tvcamemp5" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                        </div> 
                                    </div>                                       
                                </div>
                         </div>
                         <div data-options="region:'south'" style="width:100%; height:50%; padding:3px; overflow:hidden;" > 
                             <table id="dgcamcaptura5" class="easyui-datagrid"  toolbar="#tbcamem5" style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                                <thead>
                                    <tr>   
                                        <th data-options="field:'origen',width:280,align:'left',halign:'center',hidden:true">Origen</th>                                
                                        <th data-options="field:'desc_ori',width:280,align:'center',halign:'center',hidden:false">Campos Empleado</th>                                                              
                                    </tr>                           
                                </thead>  
                            </table> 
                             <div id="tbcamem5" style="padding:3px; width:100%">                                                                    
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLcamemp5">Limpiar</a>
                                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAcamemp5">Agregar</a>                                                     
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnEcamemp5">Eliminar</a> 
                                  <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnInd5">Indicadores</a>     --%>                                                                            
                            </div>    
                         </div>
                     </div>                 
                 </div>
             </div>    
           <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wind" closed="true" align="center">
                <div class="easyui-panel" style="padding:3px; width:100%">                                            
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLInd">Limpiar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGInd">Aceptar</a>                     
                 </div> 
                 <div class="easyui-layout" style=" border:none; width:100%;height:94%; overflow:hidden;">  
                     <div data-options="region:'north'" style=" border:none; width:100%; height:50%; padding:0px; overflow:hidden;" align="center">
                         <div class="easyui-layout" style=" border:none;  width:100%;height:100%; overflow:hidden;">            
                             <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                                 <asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Indicadores</asp:Label> 
                                 <input class="easyui-textbox" style="width:100%" id="txtindicador">
                            </div>
                            <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >
                                <div id="Div11" class="easyui-panel" style="width:100%;height:100%">
                                   <ul class="easyui-tree" id="tindicadores" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                            </div>                                       
                       </div>
                     </div>
                  <div data-options="region:'south'" style="height:50%; width:100%;padding:2px; overflow:hidden;" align="center">                                 
                       <table id="dgind" class="easyui-datagrid"  style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">  
                           <thead>
                            <tr>                            
                               <th data-options="field:'cveind',width:80,align:'center',halign:'center',hidden:false">Clave</th>
                               <th data-options="field:'desind',width:350,align:'left',halign:'center',hidden:false">Descripción</th>
                            </tr>                           
                         </thead>  
                     </table>          
                 </div>
           </div>
    </div>
        <div class="modal" style="display: none;" id="Div1" align="center">
             <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>  
    </form>
</body>
</html>
