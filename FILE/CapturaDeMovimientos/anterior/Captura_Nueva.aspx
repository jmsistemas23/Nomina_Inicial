<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Captura_Nueva.aspx.cs" Inherits="FILE_CapturaDeMovimientos_Captura_Nueva" %>

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
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
     <script src="../../Scripts/jquery-Mask.js"></script>  
      <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Captura_Nueva.js?2.8"></script>  
     
    <style type="text/css">       
        .container{            
          width: 99.9%;         
          /*overflow-x: hidden;overflow-y: hidden;*/
        }       
      .noscroll{
         overflow:hidden;
      }   
    </style>
</head>
<body>
    <form id="form1" runat="server" >     
      <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
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
          <div class="easyui-layout" style="width:60%;height:60%; overflow:hidden;" align="center">              
             <div id="p" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                                   
                 <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>               
              <br />
              <div id="dextras" style="width:100%; height:95%; overflow:auto;" align="center">

              </div>
             </div>
               <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">   
                   <br />
                   <br />
                    <table style="width: 100%;">           
                        <tr>
                            <td align="Center">
                                <a id="btnNuevaCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'NuevoDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Nuevo Captura</a>
                                <a id="btnEliModCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'EditarDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar/Eliminar </a>                                                   
                            </td>
                        </tr>  
                        <tr>
                            <td align="Center">
                                 <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="CAPTURA BLOQUEADA"></asp:Label>        
                            </td>
                        </tr>
                    </table> 
              </div>                                 
         </div>  
      </div>               
     <div id="dlistamov" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">  
        <div id="MenuListaMov" class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
            <a id="btnRListaMov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>  
             <asp:Label ID="lblquin1" CssClass="LetraChica2"  runat="server"></asp:Label>                  
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
                    <a id="btnBuscarMov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                    
          </table> 
           <br />      
         <div class="easyui-panel" style="padding:5px; width:600px;height:500px;" align="Left" >
            <ul class="easyui-tree" id="lstmod" data-options="animate:true,lines:false">                                        
            </ul>
        </div> 
       </div>          
     <div id="dmoddoc" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">              
          <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarDoc">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarDoc">Limpiar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditarDoc">Editar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminarDoc">Eliminar</a>    
            <asp:Label ID="lblquin3" CssClass="LetraChica2"  runat="server"></asp:Label>                 
        </div>
          <br />
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocamdoc" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:130px;" id="cbocondoc" data-options="editable:false">                        
                        <option value="like">Aproximada</option>                                
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaldoc">
                </td>
                    <td align="Center">
                    <a id="btnfiltrardoc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
            </table>
          <br />
          <table style="display:none; width:100%;height:550px" id="dgdoc">
              <%
                  string tabla = "";
                  if (Request.QueryString["btbl"] != null)
                  {
                      tabla = Request.QueryString["btbl"].ToString();
                  }
                  else { tabla = ""; }      
                  string[] datos;                
                  string[] Array = DiseñoGrid(tabla);
                  var columnas = Array[0].Split('|');
                  var bloqueos = Array[1].Split('|');                                                                
               %>
               <thead data-options="frozen:true">
                   <tr>
                        <%   
                            if (bloqueos[0] != "")
                            {
                                for (var col = 0; col < bloqueos.Length; col++)
                                {
                                    datos = bloqueos[col].Split(',');
                                    var valor = datos[0];
                                    if (valor == "chk") { Response.Write("<th data-options=\"field:'chk',checkbox:true\"</th>"); }
                                    else
                                    {
                                        var alinear = datos[1];
                                        var titulo = datos[2];
                                        var ancho = datos[3] + "px";
                                        Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                                    }
                                }
                            }
                         %>
                   </tr>
               <thead>
               <thead>
                     <tr>
                          <%  
                            
                             for (var col = 0; col < columnas.Length; col++)
                                {
                                    datos = columnas[col].Split(',');                                  
                                     var valor = datos[0];
                                     if (valor=="chk"){   Response.Write("<th data-options=\"field:'chk',checkbox:true\"</th>");}
                                     else{
                                        var alinear = datos[1];
                                        var titulo = datos[2];
                                        var ancho = datos[3] + "px";                                  
                                        Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                                    }
                               }                                                                             
                         %>
                     </tr>
               <thead>
            </table>           
     </div>   
     <div id="dcaptura" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">                
          <div id="MNuevaCap" class="easyui-panel" style="padding:3px; width:100%">                       
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnINuevaCap">Inicio</a>     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRNuevaCap">Regresar</a>  
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLNuevaCap">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGNuevaCap" >Guardar</a>        
                 <asp:Label ID="lblquin2" CssClass="LetraChica2"  runat="server"></asp:Label>            
                 <asp:Label ID="lblnivel" CssClass="LetraChica2 derecha"  runat="server"></asp:Label>                 
           </div>
          <div id="MModificarCap" class="easyui-panel" style="padding:3px; width:100%">                       
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnIModificarCap">Inicio</a>     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarCap">Regresar</a>
                <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLModificarCap">Limpiar</a>--%>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGModificarCap" >Guardar</a>  
                <asp:Label ID="lblquin4" CssClass="LetraChica2"  runat="server"></asp:Label>                 
                 <asp:Label ID="lblnivel2" CssClass="LetraChica derecha" runat="server"></asp:Label> 
           </div>
          <div  class="easyui-layout" style="width:100%;height:94%; overflow-y:scroll;" align="center">
             <div id="dcorigen" align="Center"></div>                                    
          </div>
       </div>                             
      </div>                     
           <div class="modal" style="display: none;" id="loading" align="center">
             <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div> 
         <div class="easyui-dialog" style="overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" id="wincat" closed="true">
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamcat"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cboconcat" data-options="editable:false">                                                                                                       
                                 <option value="=">Exacta</option>
                               <option value="like">Aproximada</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:250px" id="txtvalcat">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                 <table style="display:none; width:100%;height:578px" id="dgcat">                        
                 </table>                                                       
        </div>  
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winemp" closed="true">           
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamemp"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cboconemp" data-options="editable:false">                                                                      
                                 <option value="like">Aproximada</option>
                                 <option value="=">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:250px" id="txtvalemp">
                      </td>
                      <td align="Center">
                         <a id="btnfiltraremp" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                 <table style="display:none; width:100%;height:550px" id="dgemp">                        
                 </table>                     
        </div>  
    </form>
</body>
</html>
