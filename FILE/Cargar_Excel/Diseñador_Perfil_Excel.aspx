<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Diseñador_Perfil_Excel.aspx.cs" Inherits="FILE_Cargar_Excel_Diseñador_Perfil_Excel" %>

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
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">      

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/jquery.session.js"></script> 
    <script src="Diseñador_Perfil_Excel.js"></script>
      <script type="text/javascript" >
          function fileinfo() {              
             $('#txtarchivos').textbox('setValue', document.getElementById('<%=cargaArchivo.ClientID%>').value);
             
         }
    </script>  
</head>
<body>
      <form id="form1" runat="server">    
       <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">    
           <div class="easyui-panel" style="padding:3px; width:100%">                                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarDis"  >Regresar</a>         
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar">Limpiar</a>              
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>   
               <asp:Label ID="lblperfil" CssClass="LetraChica" runat="server" Text=""></asp:Label>              
           </div>     
           <br />    
           <div class="easyui-layout" style="width:60%;height:90%; overflow:hidden; " align="Center">  
                <div data-options="region:'north'" style="width:100%; height:25%; padding:1px; overflow:hidden; " align="center">                         
                   <table style="width: 100%;">
                  <tr> 
                    <td align="Center">                       
                        <asp:Button ID="btnexaminar" runat="server" Text="" CssClass="btnexaminar" />                                                   
                        <asp:Button ID="btncargar" runat="server" Text=""  CssClass="btncargarMasiva" OnClick="btnCargarArchivo_Click"/>            
                    </td>                     
                  </tr>                   
              </table>            
                   <br />                      
                   <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta Del Archivo Para Perfil</asp:Label><br />
                   <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="true" Width="70%" onchange="fileinfo()" style="display:none;"/>                     
                   <br />                    
                   <input id="txtarchivos" class="easyui-textbox" style="width:70%"  data-options="readonly:'true'">       
                </div>
                <div data-options="region:'center'" style="width:100%; height:75%; padding:3px; overflow:hidden; " align="center">  
                   <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                       <div data-options="region:'north'" style="width:100%; height:50%; padding:1px; overflow:hidden; " align="center">   
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;"> 
                                <div data-options="region:'west'" style="border-style: none;  width:50%; height:100%; padding:3px; overflow:hidden; " align="center"> 
                                   <asp:Label ID="Label1" CssClass="LetraChica" runat="server">Campos Origen</asp:Label>
                                     <div id="Div1" class="easyui-panel" style="width:100%;height:93%">
                                       <ul class="easyui-tree" id="tcamorigen" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                   </div>   
                                </div>
                                <div data-options="region:'center'" style="border-style: none; width:50%; height:100%; padding:3px; overflow:hidden; " align="center">  
                                    <asp:Label ID="Label2" CssClass="LetraChica" runat="server">Campos Destino</asp:Label> 
                                    <div id="Div2" class="easyui-panel" style="width:100%;height:93%">
                                       <ul class="easyui-tree" id="tcamdestino" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                    </div>   
                               </div>
                         </div>
                    </div>
                       <div data-options="region:'center'" style="width:100%; height:50%; padding:3px; overflow:hidden; " align="center">                           
                         <table id="dgCamRel" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbselcam" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 20 ">  
                           <thead>
                              <tr>                            
                                 <th data-options="field:'camrelo',width:150,align:'left',halign:'center',hidden:false">Origen</th>
                                 <th data-options="field:'camreld',width:300,align:'left',halign:'center',hidden:false">Destino</th>
                             </tr>                           
                          </thead>  
                         </table>   
                         <div id="tbselcam" style="height:auto">                      
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnAGRelCam">Agregar</a>
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnERelCam">Eliminar</a>       
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
