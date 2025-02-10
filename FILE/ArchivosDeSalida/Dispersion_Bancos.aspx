<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Dispersion_Bancos.aspx.cs" Inherits="FILE_ArchivosDeSalida_Dispersion_Bancos" %>

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
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="../../Scripts/jquery-Mask.js"></script>      
    <script type="text/javascript" src="Dispersion_Bancos.js?0.2"></script>    
</head>
<body>
    <form id="form1" runat="server">
     <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">  
           <div class="easyui-panel" style="padding:3px; width:100%">                                 
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Proceso'" id="btnGenerar">Generar</a>
                <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-mini_Texto',disabled:true" id="btnDescargar">Descargar</a>--%>
           </div>
         <br />
          <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="DISPERSIÓN DE PAGOS"></asp:Label>   
         <br />
          <br />
           <div class="easyui-layout" style="width:70%;height:70%; overflow:hidden;">
                <div data-options="region:'north'" style="width:100%; height:15%; padding:5px; overflow:hidden;" align="center"> 
                    <table>
                        <tr>
                            <td align="left" >
                                <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Nombre Archivo:</asp:Label> 
                            </td>
                            <td align="left" colspan="3">
                                <input class="easyui-textbox" style="width:100%" id="txtnombrearchivo">
                            </td>
                        </tr>
                         <tr>
                            <td align="left">
                                <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Fecha Pago:</asp:Label> 
                            </td>
                             <td align="left">
                                 <input  class="easyui-datebox"  style="width:120px;" id="dfechapago" data-options="formatter:myformatter,parser:myparser"></input>
                            </td>
                             <td align="left">
                                <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Vigencia:</asp:Label> 
                            </td>
                             <td align="left">
                                 <input  class="easyui-datebox"  style="width:120px;" id="dvigencia" data-options="formatter:myformatter,parser:myparser"></input>
                            </td>
                        </tr>
                         <tr>
                            <td align="left">
                                &nbsp;</td>
                             <td align="left">
                                 &nbsp;</td>
                             <td align="left">
                                 &nbsp;</td>
                             <td align="left">
                                 &nbsp;</td>
                        </tr>                                              
                         </table>
                </div>
               <div data-options="region:'center'" style="border:none; width:100%; height:15%; padding:0px; overflow:hidden;" >
                   <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                       <div data-options="region:'west'" style="width:30%;padding:15px; overflow:hidden;" align="center">
                                
                            <table>
                                <tr>
                                    <td align="center" colspan="2">
                                        <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Bancos</asp:Label>
                                    </td>                                        
                                </tr>
                                <tr>
                                    <td><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Pago en Linea:</asp:Label> </td>
                                    <td><input type="checkbox"  id="chklinea" disabled="disabled"></td>
                              </tr>
                            </table>           
                            </div>                            
                            <div data-options="region:'center'" style="width:25%;padding:10px; overflow:hidden;" align="center">
                                <table>
                                    <tr>
                                        <td align="center" colspan="2">
                                            <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Quincenas</asp:Label> 
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                             <a id="btnActual" href="#" class="easyui-linkbutton" data-options="toggle:true,group:'g1',selected:true">Actual</a>
                                            <a id="btnHistoria" href="#" class="easyui-linkbutton" data-options="toggle:true,group:'g1'">Historia</a>
                                        </td>
                                        </tr>                                      
                                </table>
                            </div> 
                              <div data-options="region:'east'" style="width:45%;padding:30px; overflow:hidden;" align="center">
                                      <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Organismos</asp:Label>                                                                                       
                            </div>
                     </div>                                 
               </div>
                <div data-options="region:'south'" style=" border:none; width:100%; height:70%; padding:0px; overflow:hidden;" >   
                     <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                           <div data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">
                                  <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tbancos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                            </div> 
                            <div data-options="region:'center'" style="width:25%;padding:3px; overflow:hidden;" align="center">
                                 <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                            </div>                            
                           <div data-options="region:'east'" style="width:45%;padding:3px; overflow:hidden;" align="center">
                                <div id="Div6" class="easyui-panel" style="width:100%;height:100%">                                    
                                    <ul class="easyui-tree" id="torganismos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
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
