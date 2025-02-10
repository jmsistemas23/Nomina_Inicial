<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Activacion_cheques_Foseg.aspx.cs" Inherits="FILE_Foseg_Activacion_cheques_Foseg" %>

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
    
    <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
 <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

 <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
 <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>      

 <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
 <script type="text/javascript" src="../../scripts/demos.js"></script>
 <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
 <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
 <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
 <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
 <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
 <script type="text/javascript" src="../../scripts/Funsiones.js?0.0"></script> 
 <script src="../../Scripts/jquery-Mask.js"></script>    
    <script src="Activacion_Cheques_Foseg.js?v0.2"></script>
</head>
<body>   
       <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center"> 
            <div class="easyui-panel" style="padding:3px; width:100%">                                 
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_marcar'" id="btnContador">Contador</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-mini_Texto'" id="btnGenerar">Generar Archivo</a>      
            </div>
            <br />
            <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="ACTIVACIÓN DE CHEQUES FOSEG"></asp:Label>   
            <br />
            <br />
            <div class="easyui-layout" style="width:40%;height:65%; overflow:hidden;">
                 <div data-options="region:'north'" style="width:100%; height:13%; padding:10px; overflow:hidden;" align="center"> 
                     <table>
                        <tr>
                            <td align="left" >
                                <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Nombre Archivo:</asp:Label> 
                            </td>
                            <td align="left" colspan="3">
                                <input class="easyui-textbox" style="width:100%" id="txtnombrearchivo"/>
                            </td>
                        </tr>
                        <tr>
                            <td align="left">
                                <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Fecha Pago:</asp:Label> 
                            </td>
                            <td align="left">
                                <input  class="easyui-datebox"  style="width:120px;" id="dfechapago" data-options="formatter:myformatter,parser:myparser"/>
                            </td>
                            <td align="left">
                                <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Vigencia:</asp:Label> 
                            </td>
                            <td align="left">
                                <input  class="easyui-datebox"  style="width:120px;" id="dvigencia" data-options="formatter:myformatter,parser:myparser"/>
                            </td>
                        </tr>
                                                              
                    </table>
                </div>
                 <div data-options="region:'center'" style="border:none; width:100%; height:8%; padding:0px; overflow:hidden;" >
                    <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="width:50%;padding:20px; overflow:hidden;" align="center">
                            <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Bancos</asp:Label> 
                        </div>                            
                        <div data-options="region:'center'" style="width:50%;padding:20px; overflow:hidden;" align="center">
                            <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Quincenas</asp:Label> 
                        </div>                         
                    </div>               
                </div>
                <div data-options="region:'south'" style=" border:none; width:100%; height:78%; padding:0px; overflow:hidden;" >   
                    <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">
                            <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                <ul class="easyui-tree" id="tbancos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div> 
                        <div data-options="region:'center'" style="width:50%;padding:3px; overflow:hidden;" align="center">
                            <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                                <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                            </div> 
                        </div>                                                   
                    </div>                                               
                </div>
            </div>
        </div>   
       <div class="easyui-dialog" style="background-image: url('../../../Imagenes/FONDO1.jpg');padding:2px;  overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true" title="Consulta de Empleados">                  
           <div style="width:100%;" align="center">
               <table>                    
                <tr>
                  <td align="Center">
                     <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                  </td>
                  <td align="Center"> 
                     <input  class="easyui-combobox"  style="width:200px;" id="cbocam"/>
                 </td>
                 <td align="Center"> 
                      <select class="easyui-combobox"  style="width:150px;" id="cbocon" data-options="editable:false">                                                                                                       
                            <option value="=">Exacta</option>
                            <option value="like">Aproximada</option>
                     </select>
                 </td>
                 <td align="Center">
                     <input class="easyui-textbox" style="width:200px" id="txtval"/>
                 </td>
                 <td align="Center">
                    <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
          </table>
           </div>
           <table id="dg" class="easyui-datagrid" style="width:100%;height:529px"> 
           <thead>
               <tr>        
                   <th data-options="field:'chk',checkbox:true"></th>   
                   <th data-options="field:'empleado',width:80,align:'center',halign:'center',sortable:false">Empleado</th> 
                   <th data-options="field:'plaza',width:150,align:'center',halign:'center',sortable:false">Plaza</th> 
                   <th data-options="field:'rfc',width:150,align:'center',halign:'center',sortable:false">R.f.c.</th>                         
                   <th data-options="field:'nombrecompleto',width:400,align:'left',halign:'left',sortable:false">Nombre</th>                        
               </tr>
           </thead>                   
           </table>                      
       </div> 
      <div class="easyui-dialog flex flex-col items-center space-y-2" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="wcontador" align="Center" closed="true">      
       <div class="easyui-panel " style="padding:2px; width:100%">                              
         <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnActualizar" >Actualizar</a>
       </div> 
      <div class="flex flex-col self-center justify-center pt-2 w-full overflow-auto">
          <div class="flex flex-col mb-2 ">
            <label class="text-center text-lg text-red-900">Contador</label>                    
            <input class="easyui-numberbox" style="width:100%; text-align:center" id="txtcontador" />                   
          </div> 
     </div>
  </div>
       <div class="modal" style="display: none; " id="loading" align="center">
     <div class="center" align="center" >
         <img alt="" src="../../Imagenes/ajax-loader.gif" />
     </div> 
 </div>    
        <div class="modal" style="display: none; " id="loading" align="center">
             <div class="center" align="center" >
                <img alt="" src="../../Imagenes/ajax-loader.gif" />
            </div> 
       </div>    
</body>
</html>
