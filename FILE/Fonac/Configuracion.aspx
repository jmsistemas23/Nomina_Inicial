<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Configuracion.aspx.cs" Inherits="FILE_Fonac_Configuracion" %>

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
    <script type="text/javascript" src="Configuracion.js?1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
   <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                                         
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>                
         </div> 
       <br />
        <table>
             <tr>
                 <td align="center"><asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="CONFIGURACION DE FONAC Y APERTURA DE INSCRIPCION"></asp:Label></td>
             </tr>
         </table>
       <br />
        <div class="easyui-accordion"  style="width: 60%; height:70%;">             
             <div title="1)DATOS PARA LA INCRIPCION"  align="center" style="overflow:hidden;">   
                   <br />    
                   <table>          
                       <tr>
                           <td><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Indicador de Descuento:</asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtIndDesc"></td>
                           <td>
                               <a id="btnBinddesc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLinddesc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>
                       </tr>
                       <tr>
                           <td>&nbsp;</td>
                           <td>&nbsp;</td>
                           <td>
                               &nbsp;</td>
                       </tr>
                    </table>
                    <table>
                       <tr>
                           <td colspan="3" align="center"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server" Text="Datos Para la Aportación 1 (Dependencia)"></asp:Label></td>
                       </tr>
                       <tr>
                           <td><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Indicador de Aportación 1:</asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtIndApo1"></td>
                           <td>
                               <a id="btnBindapo1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindapo1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>                           
                       </tr>
                        <tr>
                            <td colspan="3"><input type="checkbox" id="chkestplapo1" /><asp:Label ID="Label1" CssClass="LetraMiniChica" runat="server" Text="Todos los Estatus Plaza, Aplican para Aportación 1"></asp:Label></td>
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Estatus de la Plaza:</asp:Label></td>
                             <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtestatusapo1"></td>
                             <td>
                               <a id="btnBestatusapo1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLestatusapo1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>
                        </tr>
                   </table>
                   <br />
                  <table>
                       <tr>
                           <td colspan="3" align="center"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server" Text="Datos Para la Aportación 2 (Sindical)"></asp:Label></td>
                       </tr>
                       <tr>
                           <td><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Indicador de Aportación 2:</asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtIndApo2"></td>
                           <td>
                               <a id="btnBindapo2" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindapo2" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>                           
                       </tr>
                        <tr>
                            <td colspan="3"><input type="checkbox" id="chkestplapo2" /><asp:Label ID="Label8" CssClass="LetraMiniChica" runat="server" Text="Todos los Estatus Plaza, Aplican para Aportación 2"></asp:Label></td>
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Estatus de la Plaza:</asp:Label></td>
                             <td><input class="easyui-textbox"  data-options="readonly:true" style="width:300px" id="txtestatusapo2"></td>
                             <td>
                               <a id="btnBestatusapo2" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLestatusapo2" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>
                        </tr>
                   </table>
                   <br />
                  <table>
                       <tr>
                           <td colspan="3" align="center"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server" Text="Datos Para la Aportación 3 (Otros)"></asp:Label></td>
                       </tr>
                       <tr>
                           <td><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Indicador de Aportación 3:</asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtIndApo3"></td>
                           <td>
                               <a id="btnBindapo3" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindapo3" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>                           
                       </tr>
                        <tr>
                            <td colspan="3"><input type="checkbox" id="chkestplapo3" /><asp:Label ID="Label12" CssClass="LetraMiniChica" runat="server" Text="Todos los Estatus Plaza, Aplican para Aportación 3"></asp:Label></td>
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Estatus de la Plaza:</asp:Label></td>
                             <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtestatusapo3"></td>
                             <td>
                               <a id="btnBestatusapo3" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLestatusapo3" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td>
                        </tr>
                   </table>
             </div>
             <div title="2) INDICADORES PARA ACUMULADOS "  align="center" style="overflow:hidden;"> 
                 <br /> 
                  <table>
                       <tr>
                           <td align="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Descuento:"></asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtdescuento"></td>
                           <td>
                               <a id="btnBdescuento" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLdescuento" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td> 
                       </tr>
                       <tr>
                           <td align="left">&nbsp;</td>
                           <td>&nbsp;</td>
                           <td>
                               &nbsp;</td> 
                       </tr>
                      <tr>
                           <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Aportación 1(Dependencia):"></asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtindacumuladep"></td>
                           <td>
                               <a id="btnBindacudep" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindacudep" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td> 
                       </tr>
                      <tr>
                           <td align="left">&nbsp;</td>
                           <td>&nbsp;</td>
                           <td>
                               &nbsp;</td> 
                       </tr>
                      <tr>
                           <td align="left"><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Aportación 2(Sindical):"></asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtindacumulasindical"></td>
                           <td>
                               <a id="btnBindacusindical" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindacusindical" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td> 
                       </tr>
                      <tr>
                           <td align="left">&nbsp;</td>
                           <td>&nbsp;</td>
                           <td>
                               &nbsp;</td> 
                       </tr>
                       <tr>
                           <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Aportación 3(Otros):"></asp:Label></td>
                           <td><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtindacumulaotros"></td>
                           <td>
                               <a id="btnBindacuotros" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                               <a id="btnLindacuotros" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                           </td> 
                       </tr>
                       <tr>
                           <td align="left">&nbsp;</td>
                           <td>&nbsp;</td>
                           <td>
                               &nbsp;</td> 
                       </tr>
                  </table>
              </div>
        </div>              
    </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wind" closed="true" align="center">  
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLSelInd">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnASelInd">Aceptar</a>                
         </div>                            
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table id="dgind" style="width:100%; height:560px; display:none;" data-options = "striped: true, rownumbers: true, singleSelect: false, autoRowHeight: false"> 
                <thead>
                    <tr>
                        <th data-options="field:'chk',checkbox:true"></th>              
                        <th data-options="field:'Clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'Descripcion',width:400,align:'left'">Descripcion</th>                          
                    </tr>
                </thead>                   
            </table>                                                           
        </div> 
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="westpla" closed="true" align="center">  
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLestpla">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAestpla">Aceptar</a>                
         </div>                            
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalestpla">
                </td>
                <td align="Center">
                    <a id="btnBestpla" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table id="dgestpla" style="width:100%; height:560px; display:none;" data-options = "striped: true, rownumbers: true, singleSelect: false, autoRowHeight: false"> 
                <thead>
                    <tr>
                        <th data-options="field:'chk',checkbox:true"></th>              
                        <th data-options="field:'Clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'nombre',width:400,align:'left'">Descripcion</th>                          
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
