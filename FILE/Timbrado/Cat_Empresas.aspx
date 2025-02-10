<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cat_Empresas.aspx.cs" Inherits="FILE_Timbrado_Cat_Empresas" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>    
  <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
  <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
  <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>  
  <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
  <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>	     

  <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
  <script type="text/javascript" src="../../scripts/demos.js"></script>
  <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
  <script src="../../jqueryEsy/plugins/jquery.filebox.js"></script>   
     <script src="../../Scripts/jquery.session.js"></script> 
  <script src="../../Scripts/Funsiones.js"></script>
    <script src="Cat_Empresas.js?0.1"></script>
     <script type="text/javascript" >
         function BuscarCer() {              
         $('#txtCertificado').textbox('setValue', document.getElementById('<%=FUExaminarCer.ClientID%>').value);                    
         }     
         function BuscarKey() {
             $('#txtLlavePrivada').textbox('setValue', document.getElementById('<%=FUExaminarKey.ClientID%>').value);
         }     
     </script>  
</head>
<body>
    <form id="form1" runat="server">
        <div  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
            <div id="dinicial" title="" style="width:100%;height:100%;padding:2px;" align="Center">  
                   <div class="easyui-panel" style="padding:2px; width:100%">    
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar" >Limpiar</a> 
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAgregar">Nuevo</a>        
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditar">Editar</a>
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>                           
                    </div>  
                    <div class="flex flex-row mt-8 space-x-2 mb-2 w-full justify-center items-center ">           
                        <asp:Label ID="Label11"  CssClass="text-red-900" runat="server" Text="Valor a Buscar:"></asp:Label>            
                        <div class="w-1/5">
                            <input type="text" value="" class="easyui-textbox" id="txtvalor" style="width:100%"/>
                        </div>             
                        <a id="btnBempleado" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a>            
                    </div> 
                    <table class="easyui-datagrid" id="dg" style="width:50%; height:50%;"> 
                        <thead>
                            <tr>                    
                                <th data-options="field:'Contribuyente',width:140,align:'center',halign:'center'">Rfc</th>
                                <th data-options="field:'Descripcion',width:500,align:'left',halign:'center'">Descripción</th>    
                                <th data-options="field:'NomArchivoCer',width:150,align:'center',halign:'center',hidden:true">Cer Base</th>
                                <th data-options="field:'NoCertificado',width:150,align:'center',halign:'center',hidden:true">NoCertificado</th>
                                <th data-options="field:'Certificado',width:130,align:'center',halign:'center',hidden:true"">Certificado</th>
                                <th data-options="field:'NomArchivoKey',width:180,align:'center',halign:'center',hidden:true">Key Base</th>  
                                <th data-options="field:'Clave',width:180,align:'center',halign:'center',hidden:true">Clave</th>
                                <th data-options="field:'FechaCreacion',width:140,align:'center',halign:'center',hidden:false"">Fecha Creacion</th>                                       
                                <th data-options="field:'Vigencia',width:140,align:'center',halign:'center',hidden:false">Vigencia</th>                
                            </tr>
                        </thead>
                    </table>  
            </div>
            <div id="dcaptura"  style="width:100%;height:100%;padding:2px; overflow:hidden; display:none" align="Center"> 
                <div class="easyui-panel" style="padding:2px; width:100%">                  
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>        
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLCaptura">Limpiar</a>                   
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>                              
                </div>  
                 <table class="mt-8">
                     <tr>
                        <td><label class="text-lg text-red-900">Organismo:</label> </td>
                        <td><input class="easyui-textbox" style="width:450px;" id="txtDescripcion"  data-options="required:true,readonly:true"/></td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">Rfc:</label> </td>
                        <td><input class="easyui-textbox" style="width:200px;" id="txtContribuyente"  data-options="required:true,readonly:true"/></td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">Certificado Digital:</label> </td>
                        <td><input class="easyui-textbox" style="width:300px;" id="txtCertificado"  data-options="required:true,readonly:true"/>
                            <a href="#" runat="server" class="easyui-linkbutton" data-options="plain:true,disabled:false" id="btnExaminarCer">Examinar</a> 
                        </td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">LLave Privada:</label> </td>
                        <td><input class="easyui-textbox" style="width:300px;" id="txtLlavePrivada"  data-options="required:true,readonly:true"/>
                           <a href="#" runat="server" class="easyui-linkbutton" data-options="plain:true,disabled:false" id="btnExaminarkey">Examinar</a>                                                   
                        </td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">Clave CSD:</label> </td>
                        <td><input class="easyui-textbox" style="width:150px;" id="txtClave"  data-options="required:true,readonly:true"/>
                             <a href="#"  class="easyui-linkbutton" runat="server" onserverclick="btnGenerar_Click"  data-options="plain:true,iconCls:'GenerarKey',disabled:false" id="btnGenerar">Generar</a> 
                        </td>                     
                    </tr>                
                    <tr>
                        <td><label class="text-lg text-red-900">No. Certificado:</label> </td>
                        <td><input class="easyui-textbox" style="width:150px;" id="txtNoCertificado"  data-options="required:false,readonly:true"/></td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">Fecha Creación:</label> </td>
                        <td><input class="easyui-datebox" style="width:120px" id="dbfechacreacion" data-options="formatter:myformatter,parser:myparser,readonly:true"/></td>
                    </tr>
                    <tr>
                        <td><label class="text-lg text-red-900">Fecha Vencimiento:</label> </td>
                        <td><input class="easyui-datebox" style="width:120px" id="dbfechavencimiento" data-options="formatter:myformatter,parser:myparser,readonly:true"/></td>
                    </tr>
                </table>
                 <asp:FileUpload ID="FUExaminarCer" runat="server" AllowMultiple="false" Width="50%" onchange="BuscarCer()" style="display:none;"/>
                 <asp:FileUpload ID="FUExaminarKey" runat="server" AllowMultiple="false" Width="50%" onchange="BuscarKey()" style="display:none;"/>
            </div>
        </div>
          <div class="modal w-screen h-screen items-center" style="display: none;" id="loading" align="center">
            <div class="center w-screen h-screen items-center"  align="center" >
                <img alt="" src="../../Imagenes/ajax-loader.gif" />
            </div> 
          </div> 
    </form>
</body>
</html>
