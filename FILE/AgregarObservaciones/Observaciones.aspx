<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Observaciones.aspx.cs" Inherits="FILE_AgregarObservaciones_Observaciones" %>

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
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	     

      <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>    
    <script src="../../jqueryEsy/plugins/jquery.datagrid.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Observaciones.js?0.1"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">    
         <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>  
              <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" id="btnBuscar">Buscar</a>              --%>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>          
        </div>  
         <br />               
        <div id="dquin" class="easyui-layout" style="width:100%; padding:0px;" align="Center">                           
            <table style="width: 100%;">           
                <tr>
                    <td align="Center">
                        <a id="btnMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovPer',size:'large',iconAlign:'top',toggle:true,group:'MP',disabled:false" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Mov. Personal</a>
                        <a id="btnMC" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovCon',size:'large',iconAlign:'top' ,toggle:true,group:'MP',disabled:false" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Mov. Conceptos</a>
                        <a id="btnME" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovEsp',size:'large',iconAlign:'top' ,toggle:true,group:'MP',disabled:false" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Mov. Especiales</a>
                        <a id="btnDP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_DatPer',size:'large',iconAlign:'top' ,toggle:true,group:'MP',disabled:false" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Dat. Personales</a>                        
                    </td>
                </tr>
            </table> 
            <br />       
        <table>
             <tr>              
                  <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Observaciones:</asp:Label></td>
                   <td align="left"><input class="easyui-textbox" style="width:500px; height:80px;" id="txtobservaciones" labelPosition="top" multiline="true" data-options="readonly:true"/></td>              
                </tr>  
        </table>        
        </div>
        <br />
        <div id="dmp"  class="easyui-layout" style="width:100%;padding:0px;" align="Center">                                                                
          <table class="easyui-datagrid" style="width:100%;height:300px" id="dgdoc" toolbar="#tbmp">
                <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th> 
                        <th data-options="field:'id',width:160,align:'center',halign:'center',hidden:true">id</th>                                                    
                        <th data-options="field:'Documento',width:160,align:'center',halign:'center'">Documento</th>
                        <th data-options="field:'quiact',width:70,align:'center',halign:'center'">Quincena</th>
                        <th data-options="field:'anoact',width:70,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'Plaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'Empleado',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'Nombre',width:350,align:'left',halign:'left'">Nombre</th>
                        <th data-options="field:'CveMov',width:100,align:'center',halign:'center'">Cve. Movimiento</th>
                        <th data-options="field:'DesMov',width:350,align:'left',halign:'left'">Des. Movimiento</th>
                        <th data-options="field:'Obs',width:600,align:'left',halign:'left',hidden:false">Observaciones</th>
                    </tr>
                </thead>         
          </table>
           <div id="tbmp" style="height:auto">  
              <%--  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:false" id="btnquitardocmp">Quitar Todo</a>            --%>   
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:false" id="btnquitarsel">Quitar Selección</a>               
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnActualizardocmp">Actualizar</a>                           
           </div> 
       </div>       
    </div> 
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true"> 
               <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLDoc">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="brnADoc">Aceptar</a>                    
              </div>            
                <div style="width:100%;" align="center">
                    <table>
                        <tr>              
                          <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
                         <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboquin" data-options="editable:false"></td>
                       </tr>     
                    </table>
                    <table>                                                                              
                      <tr>
                       <td align="Center">
                          <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocam"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cbocon" data-options="editable:false">
                                <option value="like">Aproximada</option>
                               <option value="=">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:200px" id="txtval">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                <div id="divmp" style="display:none">
                <table id="dgMP" style="height:370px;"> 
                <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th>                                                     
                        <th data-options="field:'numdocmp',width:160,align:'center',halign:'center'">Documento</th>
                        <th data-options="field:'quiactmp',width:70,align:'center',halign:'center'">Quincena</th>
                        <th data-options="field:'anoactmp',width:70,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'tipoquinmp',width:70,align:'center',halign:'center'">Tipo Quin</th>
                        <th data-options="field:'numplamp',width:70,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numempmp',width:70,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcommp',width:350,align:'left',halign:'left'">Nombre</th>
                        <th data-options="field:'rfcempmp',width:120,align:'center',halign:'center'">Rfc</th>
                        <th data-options="field:'cvemovmp',width:100,align:'center',halign:'center'">Cve. Movimiento</th>
                        <th data-options="field:'desmovmp',width:400,align:'left',halign:'left'">Des. Movimiento</th>
                        <th data-options="field:'observmp',width:600,align:'left',halign:'left',hidden:false">Observaciones</th>
                    </tr>
                </thead>                                
                </table>                      
                </div>
              <div id="divmc" style="display:none">
               <table id="dgMC" style="height:370px;"> 
                <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th>                                                     
                        <th data-options="field:'numdocmc',width:160,align:'center',halign:'center'">Documento</th>
                        <th data-options="field:'quiactmc',width:70,align:'center',halign:'center'">Quincena</th>
                        <th data-options="field:'anoactmc',width:70,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'tipoquinmc',width:70,align:'center',halign:'center'">Tipo Quin</th>
                        <th data-options="field:'numplamc',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numempmc',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcommc',width:350,align:'left',halign:'left'">Nombre</th>
                        <th data-options="field:'cvemovmc',width:100,align:'center',halign:'center'">Cve. Movimiento</th>
                        <th data-options="field:'desmovmc',width:400,align:'left',halign:'left'">Des. Movimiento</th>
                        <th data-options="field:'observamc',width:600,align:'left',halign:'left',hidden:false">Observaciones</th>
                    </tr>
                </thead>   
                </table>
              </div>
               <div id="divme" style="display:none">
               <table id="dgME" style="height:370px;"> 
                <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th>                                                     
                        <th data-options="field:'numdocme',width:160,align:'center',halign:'center'">Documento</th>
                        <th data-options="field:'quiactme',width:70,align:'center',halign:'center'">Quincena</th>
                        <th data-options="field:'anoactme',width:70,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'tipoquinme',width:70,align:'center',halign:'center'">Tipo Quin</th>
                        <th data-options="field:'numplame',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numempme',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcomme',width:350,align:'left',halign:'left'">Nombre</th>                        
                        <th data-options="field:'observa',width:600,align:'left',halign:'left',hidden:false">Observaciones</th>
                    </tr>
                </thead>   
                </table>
              </div>
              <div id="divdp" style="display:none">
              <table id="dgDP" style="height:370px;"> 
                <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th>                                                     
                        <th data-options="field:'numdoc',width:160,align:'center',halign:'center'">Documento</th>
                        <th data-options="field:'quiactdp',width:70,align:'center',halign:'center'">Quincena</th>
                        <th data-options="field:'anoactdp',width:70,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'tipoquin',width:70,align:'center',halign:'center'">Tipo Quin</th>
                        <th data-options="field:'numpladp',width:70,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:70,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcom',width:350,align:'left',halign:'left'">Nombre</th>
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">Rfc</th>
                        <th data-options="field:'clamov',width:100,align:'center',halign:'center'">Cve. Movimiento</th>
                        <th data-options="field:'nombre',width:400,align:'left',halign:'left'">Des. Movimiento</th>
                        <th data-options="field:'observaciones',width:600,align:'left',halign:'left',hidden:false">Observaciones</th>
                    </tr>
                </thead>                                
              </table>       
              </div>
         </div>        
    <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
    </form>
</body>
</html>
