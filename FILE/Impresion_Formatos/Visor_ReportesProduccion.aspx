<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Visor_ReportesProduccion.aspx.cs" Inherits="FILE_Impresion_Formatos_Visor_ReportesProduccion" %>
<%@ Register assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" namespace="Microsoft.Reporting.WebForms" tagprefix="rsweb" %>


<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>   
     <link rel="stylesheet" href="../../Styles/VisorReporte.css" type="text/css" media="screen"/>   
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	

     <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>     
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    
    <script type="text/javascript" src="Visor_ReportesProduccion.js"></script>    
</head>
<body>
    <form id="form1" runat="server">         
         <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px; overflow-x:hidden; overflow-y:hidden;" align="Center">
        <div class="easyui-panel"  style="padding:3px; width:100%">
          <a id="btnLimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>          
          <a id="btnFiltro" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Filtro',disabled:true" >Filtro</a>
          <a id="btnVista" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Vista-Reporte',disabled:true" >Vista</a>        
          <a id="btnImprimir" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true" >Imprimir</a>
        </div>
        <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
            <div id="p" data-options="region:'west'" style="width:20%;padding:0px; overflow:hidden;" align="center">
                 <div id="Div6" class="easyui-panel" style="width:100%;height:100%; background-color: #FFFFFF;">
                     <ul class="easyui-tree" id="lstformatos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                 </div> 
            </div>
            <div data-options="region:'center'" style="width:80%; padding:0px; overflow-x:hidden; background-color: #FFFFFF;" align="center">  
                <asp:ScriptManager ID="ScriptManager1" runat="server"></asp:ScriptManager>   
                <rsweb:ReportViewer ID="rvReportes" runat="server" Width="100%" Height="785px">
                 </rsweb:ReportViewer>                
            </div>
        </div>         
    </div> 
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wfiltro" closed="true" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnCancelarFiltro">Cerrar</a>                                         
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarFolios">Limpiar</a>               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Vista-Reporte',disabled:true" id="btnVistaFiltro">Vista</a>   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true" id="btnImprimirFiltro">Imprimir</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'," id="btnAgregar">Agregar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_opcciones',disabled:true" id="btnPagos">Datos Pago</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Folios',disabled:true" id="btnQuincenas">Quincenas</a>
        </div> 
          <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
            <div data-options="region:'north'" style="width:100%; height:75%; padding:3px; overflow:hidden;" align="center"> 
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'west'" style="width:30%; overflow:hidden;" align="center">
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style="width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Campos</asp:Label>  
                                    <input class="easyui-textbox" style="width:100%" id="txtcampo" data-options="readonly:false"></input>     
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                    <div id="Div3" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tcampos" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                                </div>
                            </div>
                    </div>
                    <div data-options="region:'center'" style="width:auto; overflow:hidden;" align="center">
                            <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style="width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                    <a href="#" id='btnY' class="easyui-linkbutton" style="width:100px;" data-options="iconCls:'icon-Y',toggle:true,group:'g2',plain:true,disabled:false"></a>
                                    <a href="#" id='btnO' class="easyui-linkbutton" style="width:100px;" data-options="iconCls:'icon-O',toggle:true,group:'g2',plain:true,disabled:false"></a> 
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                    <div id="Div2" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tcondicion" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                                </div>
                            </div>
                    </div>                                           
                    <div data-options="region:'east'" style="width:40%; overflow:hidden;" align="center">
                        <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                                <div data-options="region:'north'" style="width:100%; height:15%; padding:3px; overflow:hidden;" align="center"> 
                                    <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Valor</asp:Label>  
                                    <input class="easyui-textbox" style="width:100%" id="txtvalbuscar" data-options="readonly:false"></input>     
                                </div>
                                <div data-options="region:'south'" style="width:100%; height:85%; padding:3px; overflow:hidden;" >
                                    <div id="Div4" class="easyui-panel" style="width:100%;height:100%">
                                    <ul class="easyui-tree" id="tvalor" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div data-options="region:'south'" style="width:100%; height:25%; padding:0px; overflow:hidden;" >                                         
                <input class="easyui-textbox" style="width:100%; height:70%;" id="txtfiltro" labelPosition="top" multiline="true" data-options="readonly:true"></input>
           </div>
        </div>     
     </div>        
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wdatos" closed="true" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                                            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnCancelarDatos">Cerrar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarDatos">Limpiar</a>            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptarDatos">Aceptar</a>  
        </div> 
        <br />
        <table>
            <tr>
                <td align="left">
                    <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Periodo de Pago:</asp:Label> 
                </td>
                <td align="left">
                    <input  class="easyui-datebox"  style="width:120px;" id="dvigenciainicial" data-options="formatter:myformatter,parser:myparser"></input>
                    <input  class="easyui-datebox"  style="width:120px;" id="dvigenciafinal" data-options="formatter:myformatter,parser:myparser"></input>
                </td>
            </tr>
             <tr>
                <td align="left">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Fecha de Pago:</asp:Label> 
                </td>
                <td align="left">
                    <input  class="easyui-datebox"  style="width:120px;" id="dfechapago" data-options="formatter:myformatter,parser:myparser"></input>                    
                </td>
            </tr>
             <tr>
                <td align="left">
                    <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Vigencia:</asp:Label> 
                </td>
                <td align="left">
                    <input  class="easyui-datebox"  style="width:120px;" id="dvigencia" data-options="formatter:myformatter,parser:myparser"></input>                    
                </td>
            </tr>
            <tr>
                <td align="left">
                    <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Leyenda:</asp:Label> 
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:360px;height:70px;" id="txtleyenda" labelPosition="top" multiline="true" ></input>
                </td>
            </tr>
        </table>         
    </div>     
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wquincenas" closed="true" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                                            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnCancelarQuincena">Cerrar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarQuincena">Limpiar</a>            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptarQuincena">Aceptar</a>  
        </div>         
          <div class="easyui-layout" style="width:100%;height:93%; overflow:hidden;">
                <div data-options="region:'north'" style="width:100%; height:12%; padding:3px; overflow:hidden;" align="center"> 
                    <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Lista de Quincenas</asp:Label>  
                    <input class="easyui-textbox" style="width:100%" id="txtquincenas" data-options="readonly:false"></input>     
                </div>
                <div data-options="region:'south'" style="width:100%; height:88%; padding:3px; overflow:hidden;" >
                    <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                    <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                   </div> 
                </div>
            </div>    
    </div>     
         <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center">
             <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>    
    </form>
</body>
</html>
