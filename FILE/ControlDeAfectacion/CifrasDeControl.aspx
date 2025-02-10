<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CifrasDeControl.aspx.cs" Inherits="FILE_ControlDeAfectacion_CifrasDeControl"  ValidateRequest="false"%>

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
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
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
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="CifrasDeControl.js?1.6"></script>    
</head>
<body>
    <form id="form1" runat="server">    
      <div id="forma" align="center">                    
           <div id="dnomina" style="width:80%;height:60%; overflow:hidden;" align="center">  
               <br />  
               <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text=""></asp:Label><br>
                    </td>
                </tr>                
               </table>     
               <br />                        
               <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>                      
               <br />
               <div id="dextras" align="center" style="width:100%;" align="center">
               </div>          
           </div>
          <div id="dmenu" style="width:100%; height:100%; display:none; padding:0px" align="Center">
             <div  id="menu" class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
                <a id="btnRMenu" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>  
                <asp:Label ID="lblquin1" CssClass="LetraChica2"  runat="server"></asp:Label>                  
             </div>  
              <br /> 
              <br />             
                <table style="width: 100%;"  id="dbotones">           
                    <tr>
                      <td align="Center">
                           <a id="btnCifras" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'top',iconCls:'icon-cifras'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Cifras</a>
                           <a id="btnAfectados" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'top',iconCls:'icon-afectados'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Afectados</a>
                           <a id="btnPendientes" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'top',iconCls:'icon-pendientes'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Pendientes</a>
                           <a id="btnRechazados" href="#" class="easyui-linkbutton" data-options="plain:false,size:'large',iconAlign:'top',iconCls:'icon-rechazados'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Rechazados</a>                                                                    
                      </td>
                    </tr>                        
               </table>                           
            <br />
            <div id="divfiltro" style="width:100%;" align="Center">            
                <table>                    
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                    </td>
                    <td align="Center"> 
                        <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocam" name="state"></input>
                    </td>
                    <td align="Center"> 
                        <select class="easyui-combobox" data-options="editable:false"  style="width:100px;" id="cbocon">
                            <option value="=">Exacta</option>
                            <option value="like">Aproximada</option>                                
                        </select>
                    </td>
                    <td align="Center">
                        <input class="easyui-textbox" style="width:250px" id="txtval">
                    </td>
                        <td align="Center">
                        <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                    </td>
                </tr>                  
              </table> 
           </div>         
              <br />       
            <table class="easyui-datagrid" style="height: 430px;" id="dg"></table>       
       </div>        
    </div>
        <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
    </form>
</body>
</html>
