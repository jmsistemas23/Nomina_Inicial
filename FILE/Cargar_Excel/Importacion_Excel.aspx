<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Importacion_Excel.aspx.cs" Inherits="FILE_Cargar_Excel_Importacion_Excel" %>

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
     <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script src="Importacion_Excel.js?1.2"></script>
     <script type="text/javascript" >
         function fileinfo() {             
             $('#txtarchivos').textbox('setValue', document.getElementById('<%=cargaArchivo.ClientID%>').value);             
         }
    </script>  
</head>
<body>
    <form id="form1" runat="server">
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">              
            <div id="dmenu" style="width:100%; height:90%; padding:4px" align="Center">
             <br />
              <table style="width: 100%;">
                    <tr>
                        <td align="Center">
                            <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="IMPORTACION EXCEL"></asp:Label><br>
                        </td>
                    </tr>                
              </table>
              <br />
              <div class="easyui-layout" style="width:70%;height:60%; overflow:hidden;" align="center">              
                 <div id="p" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                  
                     <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                     <br />
                     <div id="dextras" style="width:100%; overflow-y:auto" align="center">
                    </div>
                 </div>
                 <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">                      
                     <asp:Label ID="lblbloqueada" CssClass="TituloMedio"  runat="server" Text="CARGA BLOQUEADA"></asp:Label>    
                     <div id="dperfil" title="" style="width:100%; height:100%; padding:0px; " align="Center">                      
                         <table id="tblperfiles">                    
                            <tr>
                            <td align="Center">
                                <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                            </td>                
                            <td align="Center">
                                <input class="easyui-textbox" style="width:300px" id="txtvalorperfil">
                            </td>
                                <td align="Center">
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscarperfil" >Buscar</a>
                            </td>
                        </tr>                  
                        </table> 
                         <br />    
                          <table id="dg">
                           <thead>
                                <tr>                        
                                    <th data-options="field:'fkProEsp',width:80,align:'center',halign:'center'">Clave</th>  
                                    <th data-options="field:'descripcion',width:400,align:'left',halign:'center'">Descripción</th>                          
                                    <th data-options="field:'activo',width:50,align:'center',halign:'center',hidden:false">Estatus</th>                          
                                </tr>
                            </thead>                 
                        </table>                 
                   </div>  
                 </div>
           </div>           
      </div>                  
             <div id="dcargar"  class="easyui-layout" style="width:100%;height:100%;padding:0px; display:none;" align="Center">   
           <div class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
              <a id="btnanterior" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>  
             <%-- <a id="btnlimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'">Limpiar</a>    --%>               
           </div>
          <br />                  
                <table style="width: 100%;">
                  <tr> 
                   <td align="Center">  
                        <asp:Label ID="lblperfil" CssClass="TituloMedio" runat="server" Text=""></asp:Label>                     
                    </td>
               </tr>              
              </table>
                  <br />
           <div  class="easyui-panel" style="padding:3px; width:40%" align="Center">                             
             <table style="width: 100%;">               
                 <tr> 
                    <td align="Center">                       
                        <asp:Button ID="btnexaminar" runat="server" Text="" CssClass="btnexaminar" />                            
                        <asp:Button ID="btncargar" runat="server" Text=""  CssClass="btncargarMasiva" OnClick="btnCargarArchivo_Click"/>                                               
                     </td>                   
                </tr>                                     
           </table>
             <br />
             <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta Del Archivo</asp:Label>
             <br />
             <br />
             <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="false" Width="650px" onchange="fileinfo()" style="display:none;"/>
             <input class="easyui-textbox" style="width:500px;" id="txtarchivos" data-options="readonly:'true'">     
          </div>                   
      </div>
    </div>   
        <input type="hidden" id="husuario" name="hdnMy" class="hdnMy" runat="Server"  />
            <input type="hidden" id="hmulti" name="hdnMy" class="hdnMy" runat="Server"  />   
        <input type="hidden" id="hid" name="hdnMy" class="hdnMy" runat="Server"  />   
          <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
