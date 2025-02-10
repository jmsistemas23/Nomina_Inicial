<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Imagenes_Expedientes.aspx.cs" Inherits="FILE_Consultas_Consulta_Imagenes_Expedientes" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />
    <meta charset="utf-8">
   <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css">          
     <link href="../../Styles/ListaImg.css" rel="stylesheet" />
     <link href="../../Styles/viewer.css" rel="stylesheet" />
    
     <script src="../../scripts/viewer.js"></script>    
    <script src="../../Scripts/base64js.min.js"></script>

     <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="Consulta_Imagenes_Expedientes.js?1.3"></script> 
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="center">      
          <div class="easyui-panel"  style="padding:3px; width:100%">  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true"  id="btnImprimir">Imprimir</a>           
        </div>
     <div class="easyui-layout" style="width:100%;height:95%;  overflow-x:hidden; overflow-y:hidden;">
          <div id="p" data-options="region:'west',split:true" title="Configuración" style="width:35%;padding:5px; overflow:hidden;" align="center">    
               <table style="width:65%">
                    <tr>             
                        <td align="left" ><asp:Label ID="lblcamcaptura" CssClass="LetraChica" runat="server" Text="Expediente"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:150px" id="txtexpediente" data-options="readonly:true"></td>
                    </tr>
                     <tr>
                        <td align="left"><asp:Label ID="Label1" CssClass="LetraChica" runat="server" Text="Empleado"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:150px" id="txtempleado"  data-options="readonly:true"></td>
                    </tr>
                      <tr>
                        <td align="left" ><asp:Label ID="Label2" CssClass="LetraChica" runat="server" Text="Nombre"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width: 300px; height: 45px" id="txtnombre" data-options="multiline:true,readonly:true"></td>
                    </tr>
                      <tr>
                        <td align="left"><asp:Label ID="Label3" CssClass="LetraChica" runat="server" Text="CURP"></asp:Label></td>
                        <td><input class="easyui-textbox" style="width:200px" id="txtcurp" data-options="readonly:true"></td>
                    </tr>
                 </table>   
                <br />
                <br />
                <table style="width: 394px">
                    <tr>
                        <td align="center" class="auto-style1"><asp:Label ID="Label4" CssClass="LetraChica" runat="server" Text="No. de Página"></asp:Label></td>
                        <td></td>
                        <td align="center"><asp:Label ID="Label5" CssClass="LetraChica" runat="server" Text="Total de Páginas"></asp:Label></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1"><input class="easyui-textbox" style="width:100px;text-align:center" id="txtnopagina" value="1" data-options="disabled:true"></td>
                        <td align="center"><asp:Label ID="Label6" CssClass="LetraChica" runat="server" Text="de"></asp:Label></td>
                        <td align="center"><input class="easyui-textbox" style="width:100px; text-align:center" id="txttotpagina" value="0" data-options="disabled:true"></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                        <td align="center">&nbsp;</td>
                    </tr>
                     <tr>
                        <td align="center" class="auto-style1"><asp:Label ID="Label7" CssClass="LetraChica" runat="server" Text="Imagenes a Mostrar"></asp:Label></td>
                        <td></td>
                        <td align="center"><asp:Label ID="Label8" CssClass="LetraChica" runat="server" Text="Total de Imagenes"></asp:Label></td>
                    </tr>
                    <tr>
                        <td align="center" class="auto-style1"><input class="easyui-textbox" style="width:100px;text-align:center" id="txtimagenes" value="50" data-options="disabled:true"></td>
                        <td align="center"><asp:Label ID="Label9" CssClass="LetraChica" runat="server" Text="de"></asp:Label></td>
                        <td align="center"><input class="easyui-textbox" style="width:100px; text-align:center" id="txttotimagenes" value="0" data-options="disabled:true"></td>
                    </tr>
                </table>  
                <br />
                 <table>
                    <tr>
                        <td><a id="btnInicio" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-btnInicio',disabled:true" >Inicio</a></td>
                        <td><a id="btnAnterior" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-btnAnterior',disabled:true" >Anterior</a></td>
                        <td><a id="btnSiguiente" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-btnSiguiente',disabled:true" >Siguiente</a></td>
                        <td><a id="btnUltimo" href="#" class="easyui-linkbutton" style="width:90px" data-options="plain:false,toggle:true,group:'gf',size:'large',iconAlign:'top',iconCls:'icon-btnUltimo',disabled:true" >Ultimo</a></td>
                    </tr>
                </table>      
          </div>
          <div data-options="region:'center'" style="width:80%; Height:100%; padding:0px; overflow-x:hidden; overflow-y:hidden; background-color: #FFFFFF;" align="center">  
              <div  class="easyui-panel" id="galley" align="center" style="padding:3px; overflow:auto; width: 100%; height: 100%;">                            
               </div>    
          </div>
      </div>
    </div>
    <div class="modal" style="display: none;" id="loading" align="center">
        <div class="center" align="center" >
           <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>
    </form>
</body>
</html>
