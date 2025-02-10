<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Ejecucion_Calculo_Ant.aspx.cs" Inherits="FILE_Calculo_Ejecucion_Calculo_Ant" %>

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

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Ejecucion_Calculo_Ant.js?0.0"></script>  

    <script type="text/javascript">    
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
             <div id="dmenu" class="easyui-panel" style="width:100%;  padding:3px">                           
                 <%--<a id="btnRegresar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" >Regresar</a>--%>
                 <a id="btnPerfiles" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" >Regresar</a>
                 <a id="btnEjecutar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" >Ejecutar Cálculo</a>
                 <a id="btnCancelar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'">Cancelar</a>                        
                 <a id="btnActualizar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-reload'" >Actualizar</a>  
                 <asp:Label ID="lblquin1" CssClass="LetraChica"  runat="server"></asp:Label>                               
             </div>
            <br />                    
            <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label>
                    </td>
                </tr>
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblPerfil" CssClass="LetraChica" runat="server"></asp:Label>
                    </td>
                </tr>                
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblstore" CssClass="LetraChica2" runat="server"></asp:Label>
                    </td>
                </tr>                
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblerror" CssClass="LetraChica2" runat="server"></asp:Label>
                    </td>
                </tr>                
            </table>
            <br />   
            <div id="divPerfiles" class="easyui-layout" style="width:90%;height:60%; overflow:hidden;" align="center">              
               <div id="p" data-options="region:'west'" style="width:35%;padding:3px; overflow:hidden;" align="center">                                   
                    <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>   
                    <br />                               
                    <div id="dextras" style="width:100%; height:95%;   overflow-y:auto" align="center">
                     </div>
              </div>
              <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">                            
                   <table class="easyui-datagrid" style=" border-bottom-color:red; width: 100%; height: 200px;" id="dgPerfiles"></table>   
                   <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="CALCULO BLOQUEADO"></asp:Label>                                      
             </div>               
           </div>
            <div id="divProcedimientos" align="center"  style="width: 75%; display:none">
                <table class="easyui-datagrid" style="width: 100%; height: 550px;" id="dgProcedimientos"></table>
            </div>
            <div id="divCalculo" align="center" style="width: 90%; display:none">
                <table class="easyui-datagrid" style="width: 100%; height: 550px;" id="dgCalculo"></table>
            </div>
         </div>
    </form>
</body>
</html>
