<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Afectacion_Modulos_taps.aspx.cs" Inherits="FILE_Afectaciones_Afectacion_Modulos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>         
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
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
    <script src="Afectacion_Modulos.js?0.3"></script>
</head>
<body>
    <form id="form1" runat="server">
        <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
            <div class="easyui-layout" style="top:20px; width:95%;height:95%; overflow:hidden;" align="center">     
                <div id="dnominas" data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">
                     <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                     <br />
                    <div id="dextras" style="width:100%; height:70%;  overflow-y:auto" align="center">
                    </div>
             </div>
              <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center"> 
                  <div id="tmodulos" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;padding:1px;"  data-options="plain:true"> 
                      <div title="Movimientos de Personal" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                           <table cellpadding="3" cellspacing="5">                                                                               
                                   <tr>
                                      <td align="Center">                                     
                                          <a id="btncompletaMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_completa',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Completa</a>
                                          <a id="btnparcialMP" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Parcial</a>                             
                                      </td>                                
                                  </tr>
                                    <tr>
                                        <td align="Center">
                                             <asp:Label ID="lblbloqueadaMP" CssClass="TituloMedio" runat="server" Text="AFECTACIÓN BLOQUEADA"></asp:Label>        
                                        </td>
                                    </tr>
                            </table>    
                      </div>
                      <div title="Movimientos por Conceptos" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                      </div>
                      <div title="Movimientos Especiales" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                      </div>
                      <div title="Incidencias Laborales" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                      </div>
                      <div title="Terceros" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                      </div>
                      <div title="Datos Personales" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
                      </div>
                      <div title="Referencias Familiares" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">   
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
