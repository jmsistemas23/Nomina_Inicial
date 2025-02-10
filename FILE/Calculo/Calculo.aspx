<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Calculo.aspx.cs" Inherits="FILE_Calculo_Calculo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	
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
    <script src="../../Scripts/numeral.js"></script>
     <script src="../../Scripts/jquery.session.js"></script> 
    <script src="Calculo.js?0.8"></script>
</head>
<body>
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
        <div class="easyui-panel" style="width:100%;  padding:3px">                                            
             <a id="btnRPerfiles" href="#" class="easyui-linkbutton"  data-options="plain:true,iconCls:'icon_InicioMin'" >Perfiles</a>   
             <a id="btnRListaPerfil" href="#" class="easyui-linkbutton" style="display:none;" data-options="plain:true,iconCls:'anterior'" >Regresar</a>   
             <a id="btnEjecutar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" >Ejecutar Cálculo</a>
              <a id="btnCancelar" href="#" class="easyui-linkbutton" style="display:none;" data-options="plain:true,iconCls:'icon-cancel'">Cancelar</a>    
             <a id="btnActualizar" href="#" class="easyui-linkbutton" style="display:none;" data-options="plain:true,iconCls:'icon-reload'" >Actualizar</a>  
              <asp:Label ID="lblquin" CssClass="LetraChica"  runat="server"></asp:Label>                               
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
                        <asp:Label ID="lblporciento" CssClass="LetraChicaGreen" runat="server"></asp:Label>
                    </td>
                </tr> 
             <tr>
                    <td align="Center">
                        <asp:Label ID="lblproceso" CssClass="LetraChicaGreen" runat="server"></asp:Label>
                    </td>
                </tr> 
         </table>
        <br />
        <div id="divProcedimientos" align="center"  style="top:50px; width: 85%;">
                <table class="easyui-datagrid" style="width: 100%; height: 550px;" id="dgProcedimientos"></table>
         </div>
        <div id="divCalculo" align="center" style="width: 90%; display:none">
              <table class="easyui-datagrid" style="width: 100%; height: 550px;" id="dgCalculo">
                   <thead>
                    <tr>                        
                        <th data-options="field:'Descripcion',width:450,align:'left',halign:'center'">Id</th>  
                        <th data-options="field:'Estado',width:180,align:'center',halign:'center'">Perfil</th>                         
                        <th data-options="field:'Mensaje',width:800,align:'left',halign:'center'">Activo</th>                         
                    </tr>
                  </thead>    
              </table>
         </div>
        <div id="divError" align="center" style="width:100%;height:80%; display:none">
              <table style="width: 100%;">                
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
         </div>
    </div>
    <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>  
</body>
</html>
