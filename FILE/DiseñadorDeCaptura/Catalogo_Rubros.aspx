<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogo_Rubros.aspx.cs" Inherits="FILE_DiseñadorDeCaptura_Catalogo_Rubros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>   
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	

     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>  
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>  
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Catalogo_Rubros.js?1.3"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
          <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>               
        </div>  
         <br />
         <div class="easyui-layout" style="width:70%;height:80%; overflow:hidden;" align="center">
          <div id="p" data-options="region:'west'" style="width:25%;padding:3px; overflow:hidden;" align="center">    
               <table  style="width: 100%;">
               <tr>
                 <td align="center"><a href="#" id="btnmovconfig" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon-captura',plain:false,disabled:true" style="width:90%">Movimientos Configurados</a></td>
               </tr>  
               <tr>
                 <td align="center"><a href="#" id="btnReplicarMovConfig" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_Copiar',plain:false,disabled:true" style="width:90%">Modificar Movimientos</a></td>
               </tr>
                <tr>
                 <td align="center"><a href="#" id="btnReplicarCampoMov" class="easyui-linkbutton" data-options="size:'large',iconCls:'interinos',plain:false,disabled:true" style="width:90%">Modificar Campos a Movimiento</a></td>
               </tr>
                   <tr>
                 <td align="center"><a href="#" id="btnEliminarMovConfig" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_Delete',plain:false,disabled:true" style="width:90%">Eliminar Movimientos</a></td>
               </tr>
           </table>  
              <br />
              <br />
               <br />
               <br />
            <table  style="width: 100%;">
               <tr>
                 <td align="center"><a href="#" id="btnMP" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_MovPer',plain:false,toggle:false,group:'gf'" style="width:90%">Movimientos de Personal</a></td>
               </tr>             
               <tr>
                 <td>&nbsp;</td>
               </tr>             
               <tr>
                 <td align="center"><a href="#" id="btnMC" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_MovCon',plain:false,toggle:false,group:'gf'" style="width:90%">Movimientos de Conceptos</a></td>
              </tr>               
              <tr>
                 <td>&nbsp;</td>
             </tr>             
              <tr>
                 <td align="center"><a href="#" id="btnDP" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon_DatPer',plain:false,toggle:false,group:'gf'" style="width:90%">   Datos Personales   </a></td>
             </tr>             
                 <tr>
                 <td>&nbsp;</td>
             </tr>
                <tr>
                 <td align="center"><a href="#" id="btnRF" class="easyui-linkbutton" data-options="size:'large',iconCls:'icon-RefFam',plain:false,toggle:false,group:'gf'" style="width:90%">Referencias Familiares</a></td>
             </tr>             
                 <tr>
                 <td>&nbsp;</td>
             </tr>
                 <tr>
                 <td align="center"><a href="#" id="btnIL" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_IncLab',plain:false,toggle:true,group:'gf'" style="width:90%">Incidencias Laborales</a></td>
             </tr>  
               <tr>
                 <td>&nbsp;</td>
             </tr>
                 <tr>
                 <td align="center"><a href="#" id="btnPA" class="easyui-linkbutton"  data-options="size:'large',iconCls:'icon_PenAli',plain:false,toggle:true,group:'gf'" style="width:90%">  Pensión Alimenticia  </a></td>
             </tr>        
         </table>         
          </div>
          <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center">   
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label><br>
                    </td>
                </tr>                
            </table>
            <br />
           <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="left"> 
                    <select class="easyui-combobox"  style="width:150px;" id="cboopciones" data-options="editable:false">                                                                      
                        <option value="Doc">Movimiento</option>
                        <option value="Des">Descripción</option>
                    </select>
                </td>                
                <td align="left">
                    <input class="easyui-textbox" style="width:250px" id="txtmovimiento" >
                </td>
                    <td align="left">
                    <a id="btnBuscarMov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                    
          </table> 
           <br />      
         <div class="easyui-panel" style="padding:5px; width:600px;height:475px;" align="Left" >
            <ul class="easyui-tree" id="lstmod" data-options="animate:true,lines:false">                                        
            </ul>
        </div> 
          </div>
         </div>
    </div>
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wconfiguraciones" closed="true" align="center">
           <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLConfiguracion">Limpiar</a>             
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-refresh'" id="btnActualizar">Actualizar</a>
             <asp:Label ID="Label12" CssClass="LetraChica" runat="server" Text=""></asp:Label>
         </div> 
        <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">  
             <div data-options="region:'west'" style="border-style: none;width:40%; height:100%; padding:0px; overflow:hidden;" align="center">
                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:10%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Lista de Movimientos</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtmovimientos">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:90%; padding:2px; overflow:hidden;" >
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
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wreplicacampomov" closed="true" align="center">
            <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRCampoMov">Limpiar</a>             
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save', disabled:true" id="btnGRCampoMov">Guardar</a>             
           </div> 
             <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">  
             <div data-options="region:'west'" style="border-style: none;width:50%; height:100%; padding:0px; overflow:hidden;" align="center">
                  <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="border-style: none;width:100%; height:50%; padding:0px; overflow:hidden;" align="center"> 
                            <div class="easyui-layout" style="border-style: none;width:100%;height:100%; overflow:hidden;">            
                               <div data-options="region:'north'" style="width:100%; height:20%; padding:2px; overflow:hidden;" align="center"> 
                                    <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Movimientos Actuales</asp:Label> 
                                     <input class="easyui-textbox" style="width:100%" id="txtmovactuales">
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:80%; padding:2px; overflow:hidden;" >  
                                     <div class="easyui-panel" style="width:100%;height:100%">
                                        <ul class="easyui-tree" id="tmovactuales" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div> 
                                </div>                                       
                         </div>
                       </div>
                       <div data-options="region:'south'" style="width:100%; height:50%; padding:0px; overflow:hidden;" >                                                          
                              <table id="dgmovimientos" class="easyui-datagrid"  style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect:false, autoRowHeight: false, pageSize: 10 ">  
                                         <thead>
                                            <tr>
                                            <th data-options="field:'chk',checkbox:true"></th>    
                                            <th data-options="field:'movimiento',width:80,align:'center',halign:'center',hidden:false">Movimiento</th>
                                            <th data-options="field:'Nombre',width:350,align:'left',halign:'center',hidden:false">Descripción</th>                                                                        
                                        </tr>                           
                                    </thead>  
                             </table>                                 
                      </div>
                  </div>
             </div>
             <div data-options="region:'center'" style="border-style: none;height:100%; width:50%; padding:0px; overflow:hidden;" align="center"> 
                  <table id="dgcampos" class="easyui-datagrid"  style="width:100%; height:100%;" data-options = "striped: true,view: scrollview, rownumbers: true, singleSelect:false, autoRowHeight: false, pageSize: 10 ">  
                                <thead>
                                    <tr>    
                                        <th data-options="field:'chk',checkbox:true"></th>   
                                        <th data-options="field:'campo',width:90,align:'left',halign:'center',hidden:false">Campos</th>
                                        <th data-options="field:'descripcionCampo',width:170,align:'left',halign:'center',hidden:false">Descripción</th>                            
                                        <th data-options="field:'orden',width:80,align:'center',halign:'center',hidden:false">Orden</th>
                                    </tr>                           
                                </thead>  
                           </table>   
             </div>
        </div>
       </div>
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wreplicamov" closed="true" align="center">
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLReplica">Limpiar</a>             
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save', disabled:true" id="btnGReplica">Guardar</a>             
         </div> 
         <div class="easyui-layout" style="width:100%;height:94%; overflow:hidden;">  
             <div data-options="region:'west'" style="border-style: none;width:50%; height:100%; padding:0px; overflow:hidden;" align="center">
                  <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:10%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Lista de Movimientos</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtmovconfig">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:90%; padding:2px; overflow:hidden;" >
                            <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tmovconfig" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                   </div>
             </div>
             <div data-options="region:'center'" style="height:100%; width:50%; padding:0px; overflow:hidden;" align="center"> 
                 <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:10%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Movimientos a Modificar</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtmovmod">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:90%; padding:2px; overflow:hidden;" >
                            <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tmovmod" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                       
                   </div>
             </div>
        </div>
     </div>
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="weliminarmov" closed="true" align="center">
          <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLMov">Limpiar</a>             
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel', disabled:true" id="btnEMov">Eliminar</a>             
         </div> 
          <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">            
                        <div data-options="region:'north'" style="width:100%; height:10%; padding:2px; overflow:hidden;" align="center"> 
                            <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Lista de Movimientos</asp:Label> 
                            <input class="easyui-textbox" style="width:100%" id="txtmoveliminar">
                        </div>
                        <div data-options="region:'south'" style="width:100%; height:90%; padding:2px; overflow:hidden;" >
                            <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                               <ul class="easyui-tree" id="tmoveliminar" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
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
