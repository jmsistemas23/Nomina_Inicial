<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Reposiciones.aspx.cs" Inherits="FILE_Reposicion_de_Cheques_Reposiciones" %>

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
      <script src="../../Scripts/jquery-Mask.js"></script>   
    <script type="text/javascript" src="Reposiciones.js?2.2"></script>     
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout"  style="width:100%; height:100%; padding:0px" align="Center" >  
         <%--<div class="easyui-panel" style="padding:3px; width:100%">                                                      
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reportes'" id="btnGenerarReporte">Actualizar Reportes</a>                               
        </div>--%>
         <br />
          <table >
          <tr>              
              <td align="left"><asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:200px;" id="cboquin" data-options="editable:false"></td>
          </tr>           
       </table>
         <br />
         <table >
             <tr>                                                                                       
             <td align="center"><a href="#" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" id="opcNomina" class="easyui-linkbutton" data-options="plain:false,toggle:true,group:'gf',selected:true">Nomina</a></td>
             <td align="center"><a href="#" style="width:150px;height:80px; font-weight: bold;font-size: x-large;" id="opcPension" class="easyui-linkbutton" data-options="plain:false,toggle:true,group:'gf'">Pensionadas</a></td>
          </tr>
         </table>
         <br />
          <div class="easyui-layout" style="width:60%;height:70%;overflow:hidden;">
              <div id="p" data-options="region:'west'" style="width:30%;padding:3px;overflow:hidden;" align="center">
                   <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:9%; padding:3px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Lista de Perfiles"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtfiltrar">
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:91%; padding:0px; overflow:hidden;" >
                        <div id="Div6" class="easyui-panel" style="border:none; width:100%;height:100%">
                           <ul class="easyui-tree" id="lstperfiles" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                </div>          
              </div> 
              <div data-options="region:'center'" style="overflow:hidden;" >
                  <div id="tpreposicion" class="easyui-tabs" style="padding: 3px; width: 100%; height:100%" data-options="plain:true">                   
                  <%--  <div title="Folios Individuales" align="center">
                        <div class="easyui-panel" style="padding:3px; width:100%">                                               
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLInd">Limpiar</a>            
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnAInd">Actualizar</a>                                                             
                        </div>   
                           <br /><br />
                        <table style="width: 284px">
                            <tr>
                                <td alig="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server" Text="Folio Anterior:"></asp:Label></td>
                                <td align="left"><input id="txtfolioanterior" class="easyui-textbox " value="" style="width:150px"  data-options="readonly:true" ></input></td>
                            </tr>
                            <tr>
                                <td alig="left">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                            </tr>
                            <tr>
                                <td alig="left" ><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server" Text="Folio Actual:"></asp:Label></td>
                                <td align="left"><input id="txtfolioactual" class="easyui-textbox " value="" style="width:150px" data-options="readonly:true"></input></td>
                            </tr>
                        </table>
                    </div>--%>
                    <div title="Folios Por Grupo" align="center">
                        <div class="easyui-panel" style="padding:3px; width:100%">                                               
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLGrupo" >Limpiar</a>            
                            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnAGrupo">Actualizar</a>                                                             
                        </div>   
                           <br /><br />
                        <table style="width: 271px">
                            <tr>
                                <td alig="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server" Text="Folio Inicial:"></asp:Label></td>
                                <td align="left"><input id="txtfolioinicial" class="easyui-textbox " value="" style="width:150px" data-options="readonly:true"></input></td>
                            </tr>
                            <tr>
                                <td alig="left">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                            </tr>
                            <tr>
                                <td alig="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server" Text="Folio Final:"></asp:Label></td>
                                <td align="left"><input id="txtfoliofinal" class="easyui-textbox " value="" style="width:150px" data-options="readonly:true"></td>
                            </tr>
                            <tr>
                                <td alig="left">&nbsp;</td>
                                <td align="left">&nbsp;</td>
                            </tr>
                            <tr>
                                <td alig="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server" Text="Folio Actual:"></asp:Label></td>
                                <td align="left"><input id="txtFactual" class="easyui-textbox " value="" style="width:150px" data-options="readonly:true"></td>
                            </tr>
                            </table>
                    </div>
                  </div>
             </div>
         </div>
    </div>
     <div class="modal" style="display: none;" id="loading"  align="Center">
        <div class="center">
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>
    </form>
</body>
</html>
