<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cargar_BonosGenerales.aspx.cs" Inherits="FILE_ProcesosEspeciales_Perfiles_Cargar_BonosGenerales" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>  
  <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link href="../../Styles/loader.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">    
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="Cargar_BonosGenerales.js?1.5"></script>
</head>
<body>
    <form id="form1" runat="server">
       <div id="dmenu" style="width:100%; height:100%; padding:0px" align="Center">
             <div class="easyui-panel" style="padding:3px; width:100%">    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_procesos'" id="btnGenerarProc">Generar Procesos</a>        
           </div>
           <br />
            <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="PAGO DE BONOS"></asp:Label>
                    </td>
                </tr>                
            </table>    
           <br />              
        <div class="easyui-layout" style="width:90%;height:80%; overflow:hidden;" align="center"> 
           <div id="p" data-options="region:'west'" style="width:30%; overflow:hidden;" align="center">                 
               <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>               
              <br />
              <div id="dextras" style="width:100%; overflow-y:auto" align="center"></div>       
           </div>
           <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">    
               <asp:Label ID="lblbloqueada" CssClass="TituloMedio"  runat="server" Text="CARGA BLOQUEADA"></asp:Label>   
               <div id="dperfil" title="" style="width:100%; height:100%; padding:0px; " align="Center">                             
                <table id="dg"  data-options = "striped: true, rownumbers: true, singleSelect: false, autoRowHeight: false"> 
                  <thead>
                    <tr>   
                        <th data-options="field:'chk',checkbox:true"></th>             
                        <th data-options="field:'fkProEsp',width:80,align:'center',halign:'center'">Clave</th>                          
                        <th data-options="field:'descripcion',width:350,align:'left',halign:'center'">Descripción</th>                                             
                        <th data-options="field:'cveind',width:80,align:'center',halign:'center'">Indicador</th>  
                    </tr>
                  </thead>                          
            </table>  
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
