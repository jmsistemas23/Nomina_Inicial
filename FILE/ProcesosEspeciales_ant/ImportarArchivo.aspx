<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ImportarArchivo.aspx.cs" Inherits="FILE_ProcesosEspeciales_ImportarArchivo" %>

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
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="ImportarArchivo.js?V2.1"></script>  
     <script src="../../Scripts/jquery.session.js"></script>  
     <script type="text/javascript" >
         function fileinfo() {
             $('#txtarchivos').textbox('setValue', document.getElementById('<%=cargaArchivo.ClientID%>').value);
         }
    </script>  
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
           <br />
              <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text=""></asp:Label>
                    </td>
                </tr>                
            </table>  
            <br />    
        <div class="easyui-layout" style="width:90%;height:85%; overflow:hidden;" align="center"> 
           <div id="p" data-options="region:'west'" style="width:30%; overflow:hidden;" align="center">                 
               <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>               
              <br />
              <div id="dextras" style="width:100%; overflow-y:auto" align="center">

              </div>       
           </div>
           <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">                   
               <br />         
                <table style="width: 100%;">
                    <tr> 
                    <td align="Center">                       
                        <asp:Button ID="btnexaminar" runat="server" Text="" CssClass="btnexaminar" />                            
                        <asp:Button ID="btncargar" runat="server" Text=""  CssClass="btncargarMasiva" OnClick="btnCargarArchivo_Click"/>                        
                        <asp:Button ID="btnarchivo" runat="server" Text="" CssClass="btnArchivo" />
                     </td>                   
                </tr>                                     
                </table>
             <br />
          <table>
             <tr>
                <td align="Center">      
                <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta Del Archivo</asp:Label><br>
                </td>
            </tr>
            <tr>
                <td align="Center">      
                <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="false" Width="650px" onchange="fileinfo()" style="display:none;"/>
                <input class="easyui-textbox" style="width:500px" id="txtarchivos" data-options="readonly:'true'">                        
                </td>
             </tr>   
          </table>     
            <br />
            <table>
             <tr>
                <td align="Center"><select class="easyui-combobox"  style="width:400px;" id="cboindicadores"></select></td>
                 <td align="left"><a id="btnEliminar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">Eliminar</a></td>
              </tr>
            </table>
            <br />
            <table id="dglistaFI" style="display:none"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>  
                        <th data-options="field:'cveind',width:80,align:'center',halign:'center'">Indicador</th>  
                        <th data-options="field:'desind',width:350,align:'left',halign:'center'">Descripción</th>  
                        <th data-options="field:'ind',width:80,align:'center',halign:'center'">Tipo</th>
                        <th data-options="field:'Monto',width:80,align:'center',halign:'center'">Monto</th>                        
                    </tr>
                  </thead>                          
            </table>            
            <table id="dglistaFO" style="display:none"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:100,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'numemp',width:100,align:'center',halign:'center'">Empleado</th>  
                        <th data-options="field:'cveind',width:100,align:'center',halign:'center'">Indicador</th>  
                        <th data-options="field:'descin',width:350,align:'left',halign:'center'">Descripción</th>  
                        <th data-options="field:'tipoind',width:80,align:'center',halign:'center'">Tipo</th>
                        <th data-options="field:'cantidad',width:80,align:'center',halign:'center'">Cantidad</th>                                                
                    </tr>
                  </thead>                          
            </table>           
           </div>
        </div>       
        <input type="hidden" id="husuario" name="hdnMy" class="hdnMy" runat="Server"  />    
        <input type="hidden" id="htipocarga" name="hdtabla" class="hdnMy" runat="Server"  />  
        <input type="hidden" id="hmulti" name="hdtabla" class="hdnMy" runat="Server"  />  
         <div class="modal" style="display: none; width:100%; height:100%;" id="loading">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
      </div>    
    </div>       
    </form>
</body>
</html>
