<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Tomar_Imagen.aspx.cs" Inherits="FILE_Cargar_Imagenes_Tomar_Imagen" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">      

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/base64js.min.js"></script>   
      <script src="SigWebTablet.js"></script>
     <script src="webcam.js?1.1"></script>     
    <script src="Imagen_Firma.js?1.0"></script>
     <style>
         #my_camera {
             width: 75%;
             height: 70%;
             border: 1px solid #800000;
         }
          #dimg{
            width: 75%;
            height: 70%;
            border: 1px solid #800000;
            display:none;
        }              
	</style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">  
        <div class="easyui-panel" style="padding:3px; width:100%">                                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>       
        </div>
        <br /> 
         <div class="easyui-layout" style="width:65%;height:70%; overflow:hidden;">
             <div data-options="region:'north'" style="width:100%; height:30%; padding:10px; overflow:hidden;" align="center"> 
                 <br />
                 <table>
                     <tr>
                         <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
                         <td align="left"><input class="easyui-numberbox" style="width:100px" id="txtempleado"></td>
                     </tr>
                     <tr>
                         <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Rfc:</asp:Label></td>
                         <td align="left"><input class="easyui-textbox" style="width:150px" id="txtrfc" data-options="readonly:true"></td>
                     </tr>
                     <tr>
                         <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                         <td align="left"><input class="easyui-textbox" style="width:300px" id="txtnombre" data-options="readonly:true"></td>
                     </tr>
                 </table>
             </div>
             <div data-options="region:'center'" style="width:100%; height:70%; padding:3px; overflow:hidden;" >
                  <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                        <div data-options="region:'west'" style="width:50%;padding:10px; overflow:hidden;" align="center">
                            <div class="easyui-panel" style="padding:3px; width:100%">                     
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnFirma" onclick="javascript:onSign()">Activar</a>
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLFirma" onclick="javascript:onClear()">Limpiar</a>                               
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGFirma" onclick="javascript:onDone()">Guardar</a>
                           </div>
                            <br />
                            <div style="border: thin solid #800000; width:90%; height:40%">
                                 <canvas name="cnv" id="cnv" style="width: 100%; height: 100%"></canvas>
                                 <asp:Image ID="imgFirma" runat="server" Width="100%" Height="100%"/>
                            </div>
                        </div>
                       <div data-options="region:'center'" style="width:50%;padding:10px; overflow:hidden;" align="center">
                           <div class="easyui-panel" style="padding:3px; width:100%">                     
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnFoto">Imagen</a>
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLFoto">Limpiar</a>
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnDetener" >Detener</a>
                               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGFoto">Guardar</a>
                           </div>
                           <br />
                           <div id="my_camera"></div>  
                           <div id="dimg" ></div>        
                       </div>
                  </div>
            </div>
    </div>
      </div>        
        <div class="easyui-dialog" style="background-image: url('../../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true" title="Consulta de Empleados">            
                <div style="width:100%;" align="center">
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
                                 <option value="=">Exacta</option>
                                 <option value="like">Aproximada</option>
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
                <table id="dgempleados" class="easyui-datagrid" style="width:100%;height:561px"> 
                <thead>
                    <tr>                                                
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th> 
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">R.f.c.</th>                         
                        <th data-options="field:'nomcom',width:500,align:'left',halign:'left'">Nombre</th>                                                
                    </tr>
                </thead>                   
              </table>  
        </div>
           <div class="modal" style="display: none; " id="loading" align="center">
             <div class="center" align="center" >
                <img alt="" src="../../Imagenes/ajax-loader.gif" />
            </div> 
          </div>
        <INPUT TYPE=HIDDEN NAME="bioSigData">
        <INPUT TYPE=HIDDEN NAME="sigImgData">
    </form>
</body>
</html>
