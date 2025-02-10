<%@ Page Language="C#" AutoEventWireup="true" CodeFile="CapturaDeMovimientosMasiva.aspx.cs" Inherits="FILE_CapturaDeMovimientos_CapturaDeMovimientosMasiva" %>

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
    
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="CapturaDeMovimientosMasiva.js?1.1"></script>     
     <script type="text/javascript" >
        
    </script>   
   <%-- <style>
        #contenedor {
        width:80%;
        height:80%;       
        }

        #Izq {            
        width:40%;
        margin : 0;
        float: left ;
        }

        #Der {            
        width:60%;
        margin : 0;       
        }
    </style> --%>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"   style="width:100%;height:100%;padding:0px;" align="Center">      
         <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
          <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label>
                    </td>
                </tr>                
          </table>
         <br />
          <div class="easyui-panel" style="width:30%;height:95px; overflow:hidden;" align="center"> 
              <br />
                  <table style="width: 100%;">           
                        <tr>
                            <td align="Center">
                                <a id="btnExportarArchivo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_BajarExcel',size:'large',iconAlign:'top'" style="width:150px" >Exportar Archivo</a>
                                <a id="btnImportarArchivo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Cargar_Excel',size:'large',iconAlign:'top'" style="width:150px">Importar Archivo</a>                                                   
                            </td>
                        </tr>                        
                    </table> 
              <br />
               <br />
          </div>       
      </div>   
        <div id="dexportar"  style="width:100%;height:100%; overflow:hidden; display:none" align="center">  
            <div class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
                <a id="btnRexportar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>  
                <a id="btnExportar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_MiniBExcel'" runat="server" onserverclick="btnDescargarArchivo_Click">Exportar Archivo</a> 
                <asp:Label ID="lblexportar" CssClass="LetraChica2"  runat="server"></asp:Label>                  
            </div>   
           <br />          
         <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="left"> 
                    <select class="easyui-combobox"  style="width:150px;" id="cboopciones" data-options="editable:false">                                                                                              
                        <option value="Des">Descripción</option>
                        <option value="Doc">Movimiento</option>
                    </select>
                </td>                
                <td align="left">
                    <input class="easyui-textbox" style="width:250px" id="txtmovimiento">
                </td>
                    <td align="left">
                    <a id="btnBuscarMod" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                    
          </table> 
           <br />      
         <div class="easyui-panel" style="padding:5px; width:600px;height:500px;" align="Left" >
            <ul class="easyui-tree" id="lstmod" data-options="animate:true,lines:false">                                        
            </ul>
        </div> 
       </div>           
        <div id="dimportar" style="width:100%;height:100%; padding:0px; overflow:hidden; display:none"> 
            <div class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
                <a id="btnRimportar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>                                
             </div>   
            <br />
            <div class="easyui-layout" style="width:80%;height:80%; padding:3px;  overflow:hidden;">               
               <div data-options="region:'west'" style="width:40%;height:100%; padding:3px; overflow:hidden;" align="center"> 
                   <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>               
                   <br />
                   <div id="dextras" style="width:100%; height:100%; overflow:auto;" align="center"></div>                                               
               </div>
               <div data-options="region:'center'" style=" width:60%;height:100%; padding:3px; overflow:hidden;" align="center">                     
                    <table>                    
                    <tr>
                        <td align="left">
                            <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                        </td>
                        <td align="left"> 
                            <select class="easyui-combobox"  style="width:150px;" id="cbocammov" data-options="editable:false">                                                                                              
                                <option value="Des">Descripción</option>
                                <option value="Doc">Movimiento</option>
                            </select>
                        </td>                
                        <td align="left">   
                             <input class="easyui-textbox" style="width:250px" id="txtvalmov">                         
                        </td>
                            <td align="left">
                            <a id="btnBuscarMov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                        </td>
                    </tr>                    
               </table>     
                    <br />      
                    <div id="pmov" class="easyui-panel" style="padding:5px; width:90%;height:300px;" align="Left" >
                    <ul class="easyui-tree" id="lstmov" data-options="animate:true,lines:false"></ul>
                    </div>            
                    <br />                                      
                       <table style="width: 100%;">
                          <tr> 
                            <td align="Center">                                                
                              <a id="btnexaminar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_Excel',size:'large',iconAlign:'top',disabled:true" style="width:150px">Buscar Archivo</a>                  
                              <a id="btncargar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Cargar_Excel',size:'large',iconAlign:'top',disabled:true" runat="server" onserverclick="btnCargarArchivo_Click" style="width:150px">Cargar Archivo</a>                  
                            </td>
                          </tr>                   
                       </table>
                       <br />
                       <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta del Archivo a Importar</asp:Label><br />
                       <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="true" Width="50%" style="display:none;" onchange="fileinfo()"/>
                       <br />
                       <input class="easyui-textbox" style="width:550px;" id="txtarchivos" data-options="readonly:'true'">                                                
                  </div>                                           
            </div>            
        </div>                  
    </div>
         <input type="hidden" id="husuario" name="hdnMy" class="hdnMy" runat="Server"  />    
        <input type="hidden" id="htipo" name="hdtabla" class="hdnMy" runat="Server"  />  
        <input type="hidden" id="hmov" name="hdtabla" class="hdnMy" runat="Server"  />  
        <input type="hidden" id="hmulti" name="hdtabla" class="hdnMy" runat="Server"  />  
         <div class="modal" style="display: none;" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
        </div> 
    </form>
</body>
</html>
