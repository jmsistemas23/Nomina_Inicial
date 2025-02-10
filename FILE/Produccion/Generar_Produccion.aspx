<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Generar_Produccion.aspx.cs" Inherits="FILE_Produccion_Generar_Produccion" %>

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
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/jquery.session.js"></script>   
      <script src="../../Scripts/jquery-Mask.js"></script>   
    <script type="text/javascript" src="Generar_Produccion.js?0.2"></script>  
</head>
<body>
      <% 
          ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
          hquiact.Value =  objusuario.QuiAct;
        %>         
    <form id="form1" runat="server">
     <div class="easyui-layout"  style="width:100%; height:100%; padding:0px" align="Center">  
          <div class="easyui-panel" style="padding:3px; width:100%">                             
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>              
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarProd">Limpiar Producción</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_procesos'" id="btnGenerar">Generar Producción</a>                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reportes'" id="btnGenerarReporte">Generar Reportes</a>                 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Folios'" id="btnFolios">Folios Generados</a>
        </div>
        <br />
          <table>
            <tr>                            
                <td align="center">
                    <asp:Label ID="llblquin" CssClass="LetraChicaNegrita" runat="server"></asp:Label> 
                </td>
            </tr>
          </table>
        <br />
        <br />
        <div class="easyui-layout" id="Div1" style="width:70%; height:65%; padding:3px" align="Center">              
            <div data-options="region:'center'" style="width:90%; height:100%; padding:3px; overflow:hidden;" align="center"> 
                 <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="border-style:none; width:100%; height:15%; padding:0px; overflow:hidden;" align="center"> 
                        <div class="easyui-layout" style="border-style:none; width:100%;height:100%; overflow:hidden;">                           
                            <div data-options="region:'center'" style="width:50%; height:100%; padding:0px; overflow:hidden;" align="center"> 
                                <table>
                                      <tr>                            
                                         <td align="center">
                                             <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Tipo de Producción</asp:Label> 
                                         </td>
                                      </tr>
                                   <tr>                            
                                      <td align="center">
                                           <a href="#" id='btnRecibo'  class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g2',plain:true,selected:true">Recibo</a>
                                           <a href="#" id='btnCheque' class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g2',plain:true">Cheque</a>    
                                          <a href="#" id='btnPension' class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g2',plain:true">Pensión</a>
                                      </td>
                                    </tr>
                                 </table>
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                         <table id="dgprod" class="easyui-datagrid"  toolbar="#tbt" style="width:100%; height:100%;">
                            <thead>
                                <tr>     
                                    <th data-options="field:'chk',checkbox:true"></th>                                     
                                    <th data-options="field:'cveperfil',width:80,align:'center',halign:'center',hidden:true">Perfil</th>
                                    <th data-options="field:'nomperfil',width:250,align:'left',halign:'center'">Perfil</th>                                    
                                    <th data-options="field:'recibo',width:100,align:'center',halign:'center'">Recibo</th>
                                    <th data-options="field:'cheque',width:100,align:'center',halign:'center'">Cheque</th>
                                    <th data-options="field:'fecha',width:110,align:'center',halign:'center'">Fecha Pago</th>
                                    <th data-options="field:'periodo',width:200,align:'center',halign:'center'">Periodo Pago</th>
                                    <th data-options="field:'vigencia',width:110,align:'center',halign:'center'">Vigencia</th>                                                                                                            
                                    <th data-options="field:'leyenda',width:80,align:'center',halign:'center',hidden:true">Leyenda</th>                                    
                                    <th data-options="field:'tipo',width:300,align:'center',halign:'center',hidden:true">tipo</th>
                                    <th data-options="field:'cveconsulta',width:80,align:'center',halign:'center',hidden:true">cveconsulta</th>
                                </tr>
                            </thead> 
                        </table> 
                         <div id="tbt" style="height:auto">                                                  
                            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:true" id="btnAdFolios">Agregar Folios</a>                                   
                        </div>       
                    </div>
                 </div>
            </div>        
        </div>
    </div>
           <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wincaptura" closed="true" align="center"> 
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarFolios">Limpiar</a>                                                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptarFolios">Aceptar</a>   
                 <asp:Label ID="lblrelcampo" CssClass="LetraChica" runat="server" Text=""></asp:Label>                 
             </div> 
          <br />
             <table>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Recibo:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-textbox" style="width:120px" id="txtrecibo">
                     </td>
                 </tr>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Cheque:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-textbox" style="width:120px" id="txtcheque">
                     </td>
                 </tr>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Fecha Pago:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-datebox" style="width:120px" id="txtfecha" data-options="formatter:myformatter,parser:myparser">
                     </td>
                 </tr>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Periodo Pago:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-textbox" style="width:180px" id="txtperiodo">
                     </td>
                 </tr>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Vigencia:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-datebox" style="width:120px" id="txtvigencia" data-options="formatter:myformatter,parser:myparser">
                     </td>
                 </tr>
                 <tr>
                     <td align="left">
                         <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Leyenda:</asp:Label> 
                     </td>
                     <td align="left">
                         <input class="easyui-textbox"  data-options="multiline:true" value="" style="height:70px; width:350px" id="txtleyenda">
                     </td>
                 </tr>
             </table>
        </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="winfolios" closed="true" align="center"> 
             <table>
                <tr>                            
                    <td align="center">
                        <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Tipo de Producción</asp:Label> 
                    </td>
                </tr>
            <tr>                            
                <td align="center">
                    <a href="#" id='btnR'  class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g3',plain:true,selected:true">Recibo</a>
                    <a href="#" id='btnC' class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g3',plain:true">Cheque</a>    
                    <a href="#" id='btnP' class="easyui-linkbutton" style="width:110px;" data-options="toggle:true,group:'g3',plain:true">Pensión</a>
                </td>
            </tr>
            </table>
            <br />
            <table id="dgfolios" class="easyui-datagrid" style="width:100%; height:85%;">
                <thead>
                    <tr>                                  
                        <th data-options="field:'cveperfil',width:80,align:'center',halign:'center',hidden:true">Perfil</th>
                        <th data-options="field:'nomperfil',width:250,align:'left',halign:'center'">Perfil</th>                                    
                        <th data-options="field:'folio_inicial',width:120,align:'center',halign:'center'">Folio Inicial</th>                                    
                        <th data-options="field:'folio_final',width:120,align:'center',halign:'center'">Folio Final</th>                                    
                        <th data-options="field:'totales',width:110,align:'center',halign:'center'">Totales</th>                        
                    </tr>
                </thead> 
            </table> 
        </div>
         <input type="hidden" id="hquiact" name="hdnMy" class="hdnMy" runat="Server"  />
    <div class="modal" style="display: none;" id="loading"  align="Center">
        <div class="center">
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>
    </form>
</body>
</html>
