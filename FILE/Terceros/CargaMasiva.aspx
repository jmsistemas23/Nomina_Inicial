<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CargaMasiva.aspx.cs" Inherits="FILE_Terceros_CargaMasiva" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="CargaMasiva.js?v2.2"></script>  
     <script type="text/javascript" >
         function fileinfo() {
             //if ((valnomina != undefined) && (valnomina != '')) {                
                 $('#txtarchivos').textbox('setValue', document.getElementById('<%=cargaArchivo.ClientID%>').value);        
                //}
                //else {
                //    $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error');
                //    $('#txtarchivos').textbox('setValue', '');
                //}
            }         
    </script>  
    <style type="text/css">
        .auto-style1 {
            width: 93px;
        }

        div.centered {
            text-align: center;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
          <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">                     
             <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">
                 <br />
                  <table style="width: 100%;">
                    <tr>
                       <td align="Center">
                          <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="TERCEROS"></asp:Label><br>
                      </td>
                    </tr>                
                  </table>   
                  <br />             
                 <div class="easyui-layout" style="width:60%;height:60%; overflow:hidden;" align="center">              
                 <div id="p" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                  
                      <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                     <br />
                     <div id="dextras" style="width:100%; overflow:auto" align="center">

                    </div>
                 </div>
                 <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">  
                     <div id="dcarga"  style="width:100%;height:100%; overflow:hidden;" >
                      <br />
                     <br />
                     <table style="width: 100%;">
                       <tr> 
                        <td align="Center">                       
                          <asp:Button ID="btnexaminar" runat="server" Text="" CssClass="btnexaminar" />                            
                          <asp:Button ID="btncargar" runat="server" Text=""  CssClass="btncargarMasiva" OnClick="btnCargarArchivo_Click"/>            
                       </td>
                      </tr>                   
                     </table>
                      <br />
                      <br />
                     <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta Del Archivo Para Perfil</asp:Label><br />
                     <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="true" Width="50%" onchange="fileinfo()" style="display:none;"/>
                     <br />
                     <input class="easyui-textbox" style="width:90%" id="txtarchivos" data-options="readonly:'true'">   
                     </div>
                       <asp:Label ID="lblbloqueada" CssClass="TituloMedio"  runat="server" Text="CARGA BLOQUEADA"></asp:Label>                                                           
                 </div>
              </div>          
        </div>  
             <div id="dvalidacion" align="center" style="width:100%; padding:0px; display:none;">
                  <div style="width:100%; padding:3px;" class="easyui-panel">                                         
                      <a id="btnRegresar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" >Regresar</a>                                                   
                  </div>
                  <br />
                  <div style="width:100%;" align="Center">            
                    <table>                    
                    <tr>
                        <td align="Center">
                            <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                        </td>
                        <td align="Center"> 
                            <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocam" name="state"></input>
                        </td>
                        <td align="Center"> 
                            <select class="easyui-combobox" data-options="editable:false"  style="width:100px;" id="cbocon">
                                <option value="=">Exacta</option>
                                <option value="like">Aproximada</option>                                
                            </select>
                        </td>
                        <td align="Center">
                            <input class="easyui-textbox" style="width:250px" id="txtval">
                        </td>
                            <td align="Center">
                            <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                        </td>
                    </tr>                  
                    </table> 
                 </div> 
                  <br />
                  <table class="easyui-datagrid" id="dg" >
                       <thead>
                        <tr>                        
                            <th data-options="field:'perfil',width:200,align:'left',halign:'center'">Perfil</th>                              
                            <th data-options="field:'archivo',width:200,align:'left',halign:'center'">Archivo</th>                              
                            <th data-options="field:'estatus',width:90,align:'left',halign:'center'">Estatus</th>  
                            <th data-options="field:'mensaje',width:700,align:'left',halign:'center',hidden:false">Mensaje</th>                              
                        </tr>
                      </thead>         
                  </table>
            </div>                      
            <input type="hidden" id="husuario" name="hdnMy" class="hdnMy" runat="Server"  />
            <input type="hidden" id="hmulti" name="hdnMy" class="hdnMy" runat="Server"  />                                   
          </div>
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="dlg" closed="true">
                <input id="txterror" class="easyui-textbox" labelPosition="top" multiline="true" value="" closed="true" style="width:100%;height:113px" data-options="readonly:true">
           </div>
          <div class="modal" style="display: none;" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
        </div> 
    </form>
</body>
</html>
