<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Pension_Alimenticia.aspx.cs" Inherits="FILE_Pension_Alimenticia" %>

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
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
     <script src="../../Scripts/jquery-Mask.js"></script>  
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Pension_Alimenticia.js?2.4"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
       <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
          <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="PENSION ALIMENTICIA"></asp:Label>
                    </td>
                </tr>                
            </table>
           <br />
           <br />
         <%-- <div class="easyui-panel" style="width:25%; margin-top:20px;  padding:4px" align="Center">--%>
            <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                       <a id="btnNuevaCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'NuevoDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Nuevo Captura</a>
                       <a id="btnEliModCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'EditarDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar/Eliminar </a>                                                   
                  </td>
              </tr>                        
        </table>                
     <%--  </div>        --%>                 
       </div>   
      <div id="dcaptura" class="easyui-layout" style="width:100%;height:95%; overflow:hidden; display:none" align="center">     
          <div id="MNuevaCap" class="easyui-panel" style="padding:3px; width:100%">                                        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRNuevaCap">Regresar</a>  
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLNuevaCap">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGNuevaCap" >Guardar</a>                  
                 <asp:Label ID="lblnivel" CssClass="LetraChica2 derecha"  runat="server"></asp:Label>                 
           </div>
          <div id="MModificarCap" class="easyui-panel" style="padding:3px; display:none; width:100%">                       
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnIModificarCap">Inicio</a>     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarCap">Regresar</a>
                <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLModificarCap">Limpiar</a>--%>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGModificarCap" >Guardar</a>    
                 <asp:Label ID="lblnivel2" CssClass="LetraChica derecha" runat="server"></asp:Label> 
           </div>
          <br />
          <div id="dcorigen" align="Center" style="height:93%; overflow-y:scroll"></div>    
      </div>   
      <div id="dmodificar" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">              
          <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarDoc">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarDoc">Limpiar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditarDoc">Editar</a>
            <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminarDoc">Eliminar</a>    --%>        
        </div>
          <br />
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocamdoc" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:130px;" id="cbocondoc" data-options="editable:false">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaldoc">
                </td>
                    <td align="Center">
                    <a id="btnfiltrardoc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
            </table>
          <br />
         <table style="display:none;" id="dgdoc"> 
                  <thead>
                    <tr>                                               
                        <th data-options="field:'numemp',width:100,align:'center',halign:'center',sortable:true">Empleado</th>  
                        <th data-options="field:'nomemp',width:300,align:'left',halign:'center',sortable:true">Nombre Empleado</th>  
                        <th data-options="field:'nompen',width:300,align:'left',halign:'center',sortable:true">Beneficiario</th>  
                        <th data-options="field:'oficipen',width:100,align:'center',halign:'center',sortable:true">Oficio</th>                        
                        <th data-options="field:'descrip',width:400,align:'left',halign:'center',sortable:true">Tipo de Descuento</th>  
                        <th data-options="field:'penimpor',width:120,align:'right',halign:'center'">Importe/Porcentaje</th>                          
                        <th data-options="field:'estatus',width:80,align:'center',halign:'center'">Estatus</th>                          
                        <th data-options="field:'id',width:100,align:'center',halign:'center',hidden:true">Id</th>  
                    </tr>
                  </thead>                          
            </table>              
     </div>           
    </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wincat" closed="true">
            <form id="fm" method="post" novalidate>
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamcat"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cboconcat" data-options="editable:false">                                                                                                       
                                 <option value="=">Exacta</option>
                               <option value="like">Aproximada</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:250px" id="txtvalcat">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                 <table style="display:none; width:100%; height:95%" id="dgcat">                        
                 </table>          
            </form>                                         
        </div> 
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winemp" closed="true">
            <form id="Form2" method="post" novalidate>
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamemp"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cboconemp" data-options="editable:false">                                                                      
                                 <option value="like">Aproximada</option>
                                 <option value="=">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:250px" id="txtvalemp">
                      </td>
                      <td align="Center">
                         <a id="btnfiltraremp" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                 <table style="display:none;" id="dgemp">                        
                 </table>          
            </form>                                         
        </div>                
        <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>    
    </form>
</body>
</html>
