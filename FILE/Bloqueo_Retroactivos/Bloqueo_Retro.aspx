<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Bloqueo_Retro.aspx.cs" Inherits="FILE_Bloqueo_Retroactivos_Bloqueo_Retro" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
         <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="UTF-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="../../Scripts/jquery.session.js"></script>
    <script src="Bloqueo_Retro.js"></script>
</head>
<body>    
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
            <div class="easyui-panel" style="padding:3px; width:100%">                               
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>          
            </div>  
               <br />  
             <br />
           <div id="dbusqueda" class="easyui-layout" style="display:none; width:100%;height:90%;padding:0px;" align="Center">        
            <table style="width: 100%;">           
                <tr>
                    <td align="Center">
                        <a id="btnMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_MovPer',size:'large',iconAlign:'top',toggle:true,group:'MP',disabled:false" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Mov. Personal</a>                     
                    </td>
                </tr>
            </table>                 
            <br />
             <div  class="easyui-layout" style="width:100%;padding:0px;" align="Center">                                                                
          <table class="easyui-datagrid" style="width:100%;height:300px" id="dgdoc" toolbar="#tbmp">
                <thead>
                    <tr>    
                         <th data-options="field:'chk',checkbox:true"></th>          
                        <th data-options="field:'numdocmp',width:160,align:'center',halign:'center'">Documento</th>                                                                        
                        <th data-options="field:'cvemovmp',width:100,align:'center',halign:'center'">Cve. Movimiento</th>
                        <th data-options="field:'desmovmp',width:400,align:'left',halign:'left'">Des. Movimiento</th>
                        <th data-options="field:'numplamp',width:100,align:'center',halign:'center'">Pla. Origen</th>
                        <th data-options="field:'numempmp',width:100,align:'center',halign:'center'">Emp. Origen</th>
                        <th data-options="field:'numpladmp',width:100,align:'center',halign:'center'">Pla. Destino</th>
                        <th data-options="field:'numemdmp',width:100,align:'center',halign:'center'">Emp. Destino</th>
                        <th data-options="field:'rfcempmp',width:115,align:'left',halign:'left'">Rfc</th>
                        <th data-options="field:'nomcommp',width:350,align:'left',halign:'left'">Nombre</th>
                         <th data-options="field:'tipoplaza',width:200,align:'center',halign:'center',hidden:false,                                                  
                              editor:{
                                     type:'combobox',
                                     options:{
                                           valueField:'tipoplaza',
                                           textField:'descripcion',
                                              data:[
                                                    {tipoplaza: 'D', descripcion: 'Destino'},
                                                    {tipoplaza: 'OD', descripcion: 'Origen/Destino'},                                                                                                            
                                                   ],
                                              }
                                    }">Tipo de Plaza</th>         
                    </tr>
                </thead>         
          </table>
           <div id="tbmp" style="height:auto">                
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:false" id="btnquitarsel">Quitar Selección</a>
           </div> 
       </div>   
            <br />    
            <br />    
          </div>
           <asp:Label ID="lblnominas"  style="display:none;" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label> 
     </div>   
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="wdoc" align="Center" closed="true"> 
               <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLDoc">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="brnADoc">Aceptar</a>                    
              </div>         
         <br />
             <table >                    
             <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocampos" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocondicion" data-options="editable:false">                                                                                                                                                                     
                        <option value="like">Aproximada</option>
                         <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalor">
                </td>
                    <td align="Center">
                    <a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
         </table>
         <br />
          <table style="height:80%; width:100%;" id="dg"></table>   
      </div>
       <div class="modal" style="display: none; " id="loading" align="center">
         <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
         </div> 
      </div>         
</body>
</html>
