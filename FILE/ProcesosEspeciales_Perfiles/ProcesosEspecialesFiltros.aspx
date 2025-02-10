<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ProcesosEspecialesFiltros.aspx.cs" Inherits="FILE_ProcesosEspeciales_ProcesosEspecialesFiltros" %>

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
    <script src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>   
    <script src="../../Scripts/jquery.session.js"></script>  
    <script type="text/javascript" src="ProcesosEspecialesFiltros.js?1.0"></script>  

</head>
<body>
    <form id="form1" runat="server">    
          <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">                
            <div class="easyui-panel" style="padding:3px; width:100%"> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiarProc">Limpiar</a>                                                                                                                                  
        </div>
        <br /> 
         <div class="easyui-layout" style="width:90%;height:90%; overflow:hidden;" align="center"> 
           <div id="p" data-options="region:'west'" style="width:20%; overflow:hidden;" align="center">               
               <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>               
              <br />
              <div id="dextras" style="width:100%; overflow-y:auto" align="center">

              </div>                       
           </div>
           <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">
                <div id="tt" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;" data-options="plain:true">
                     <div title="Diseño del Proceso" style="padding: 3px;overflow:hidden; width:100%;" align="center" >
                         <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                              <div data-options="region:'north'" style="border:none;width:100%; height:35%; padding:0px; overflow:hidden;" align="center"> 
                                  <div class="easyui-layout" style=" width:100%;height:100%; overflow:hidden;" align="center"> 
                                    <div data-options="region:'west'" style="width:40%; overflow:hidden;" align="center">
                                        <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                            <div data-options="region:'north'" style="border:none;width:100%; height:25%; padding:3px; overflow:hidden;" align="center"> 
                                                <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Lista de Perfiles</asp:Label> 
                                                <input class="easyui-textbox" style="width:100%" id="txtperfiles"> 
                                            </div>
                                            <div data-options="region:'south'" style="border:none;width:100%; height:75%; padding:3px; overflow:hidden;" >
                                                <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                                                    <ul class="easyui-tree" id="tperfiles" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                </div> 
                                            </div>
                                        </div>  
                                    </div>
                                    <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">
                                       <table>
                                          <tr>                            
                                            <td align="center">
                                               <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Tipo de Indicador</asp:Label>          
                                            </td>
                                         </tr>
                                         <tr>                            
                                           <td align="center">
                                              <a href="#" id='btnPer'  class="easyui-linkbutton" style="width:155px;" data-options="toggle:true,group:'g1',plain:true,disabled:true">Percepciones</a>
                                              <a href="#" id='btnApo'  class="easyui-linkbutton" style="width:155px;" data-options="toggle:true,group:'g1',plain:true,disabled:true">Aportaciones</a>
                                              <a href="#" id='btnDed' class="easyui-linkbutton" style="width:150px;" data-options="toggle:true,group:'g1',plain:true,disabled:true">Deducciones</a>                                    
                                           </td>
                                         </tr>                                    
                                       </table>                                               
                                       <table>
                                            <tr>                            
                                               <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label>                                       
                                               </td>
                                               <td align="left"><input class="easyui-textbox" style="width:80px" id="txtclave" data-options="readonly:true">
                                                   <asp:Label ID="lbltipoind" CssClass="LetraChicaNegrita" runat="server"></asp:Label>
                                               </td>
                                            </tr>
                                            <tr>                            
                                               <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
                                               <td align="left"><input class="easyui-textbox" style="width:400px" id="txtdescripcion" data-options="readonly:true"></td>
                                            </tr>
                                       </table>                                     
                                       <table>
                                        <tr>                            
                                           <td align="center" colspan="2"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Modo de Aplicación</asp:Label></td>                                  
                                        </tr>
                                        <tr>                            
                                            <td align="center">
                                                <a href="#" id='btnimpfijo'  class="easyui-linkbutton" style="width:155px;" data-options="toggle:true,group:'g2',plain:true,disabled:true">Importe Fijo</a>
                                                <a href="#" id='btnimpformula'  class="easyui-linkbutton" style="width:155px;" data-options="toggle:true,group:'g2',plain:true,disabled:true">Importe Formula</a>                                        
                                           </td>
                                        </tr>                                 
                                      </table>                                                    
                                       <table>                             
                                        <tr>                            
                                            <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Valor:</asp:Label></td>
                                            <td align="left"><input class="easyui-textbox" style="width:150px" id="txtvalor" data-options="readonly:true"></td>
                                        </tr>                             
                                       </table>  
                                    </div>
                                 </div>                                                                
                              </div>
                             <div data-options="region:'south'" style="border:none;width:100%; height:65%; padding:3px; overflow:hidden;" >
                                 <div class="easyui-panel" style="border:none; padding:3px; width:100%">                                            
                                     <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiar">Limpiar Filtro</a>                                                            
                                     <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar Filtro</a>   
                                     <asp:Label ID="lblperfil" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
                                 </div> 
                                  <div class="easyui-layout" style="border:none;width:100%;height:92.9%; overflow:hidden;">
                                    <div data-options="region:'north'" style="border:none;width:100%; height:60%; padding:0px; overflow:hidden;" align="center"> 
                                        <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                                            <div data-options="region:'west'" style="border:none; width:30%; overflow:hidden;" align="center">
                                                 <div class="easyui-layout" style="border:none;width:100%;height:100%; overflow:hidden;">
                                                     <div data-options="region:'north'" style="width:100%; height:27%; padding:3px; overflow:hidden;" align="center"> 
                                                         <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                                         <input class="easyui-textbox" style="width:100%" id="txtcampo" data-options="readonly:true"></input>     
                                                     </div>
                                                     <div data-options="region:'south'" style="width:100%; height:74%; padding:3px; overflow:hidden;" >
                                                         <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                                                           <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                        </div> 
                                                     </div>
                                                 </div>
                                            </div>
                                            <div data-options="region:'center'" style="border:none;width:auto; overflow:hidden;" align="center">
                                                 <div class="easyui-layout" style="border:none;width:100%;height:100%; overflow:hidden;">
                                                     <div data-options="region:'north'" style="width:100%; height:27%; padding:3px; overflow:hidden;" align="center"> 
                                                         <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Condiciones</asp:Label>  
                                                         <input class="easyui-textbox" style="width:100%" id="txtcondicion" data-options="readonly:true"></input>     
                                                     </div>
                                                     <div data-options="region:'south'" style="width:100%; height:74%; padding:3px; overflow:hidden;" >
                                                         <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                                           <ul class="easyui-tree" id="tcondicion" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                                        </div> 
                                                     </div>
                                                 </div>
                                            </div>                                           
                                            <div data-options="region:'east'" style="border:none;width:40%; overflow:hidden;" align="center">
                                                <div class="easyui-layout" style="border:none;width:100%;height:100%; overflow:hidden;">
                                                     <div data-options="region:'north'" style="width:100%; height:27%; padding:3px; overflow:hidden;" align="center"> 
                                                         <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                                         <input class="easyui-textbox" style="width:100%" id="txtvalbuscar" data-options="readonly:true"></input>     
                                                     </div>
                                                     <div data-options="region:'south'" style="width:100%; height:74%; padding:3px; overflow:hidden;" >
                                                         <div id="Div4" class="easyui-panel" style="width:100%;height:100%">
                                                           <ul class="easyui-tree" id="tvalor" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                                        </div> 
                                                     </div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                     <div data-options="region:'south'" style="border:none; width:100%; height:40%; padding:3px; overflow:hidden;" >
                                         <table id="dgcondicion" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbcond"  data-options="rownumbers: true,singleSelect:true, striped:true">
                                            <thead>
                                                <tr>
                                                    <th data-options="field:'Condicion',width:670,align:'left',halign:'center'">Condición</th>
                                                </tr>
                                            </thead>
                                        </table> 
                                          <div id="tbcond" style="padding:3px; width:100%"> 
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
                    <div id="tproc" title="Vista Previa" style="overflow:hidden; width:100%" align="center" data-options="disabled:true"> 
                        <div class="easyui-panel" style="padding:3px; width:100%"> 
                             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_procesos'" id="btnGenerarProc">Generar Procesos</a>    
                             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-tablas'" id="btnDetalle">Detalle del Proceso</a>
                        </div> 
                        <br />
                         <asp:Label ID="lblcontador" CssClass="LetraChicaNegrita" runat="server"></asp:Label>                    
                        <br />                       
                        <table id="dg"></table>                        
                    </div>
                </div>  
           </div>
       </div>            
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wind" closed="true" align="center">                             
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table style="display:none;" id="dgind"> 
                <thead>
                    <tr>
                        <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'descripcion',width:400,align:'left'">Descripcion</th>  
                    </tr>
                </thead>                   
            </table>                                                           
        </div>                
      </div>
      <div class="modal" style="display: none;" id="loading" align="Center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
      </div>
    </form>
</body>
</html>
