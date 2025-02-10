<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Afectaciones.aspx.cs" Inherits="FILE_Afectaciones_Afectaciones" %>

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
    <script type="text/javascript" src="Afectaciones.js?2.3"></script>  
       
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
        <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center">   
           <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="tipos de afectación"></asp:Label><br>
                    </td>
                </tr>                
            </table>  
             <br />
          <div class="easyui-layout" style="width:60%;height:60%; overflow:hidden;" align="center">              
             <div id="dnominas" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">
                 <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>
                  <br />
                 <div id="dextras" style="width:100%; height:95%;  overflow-y:auto" align="center">
                </div>
             </div>
             <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">  
                  <br />
                 <br />
                  <table style="width: 100%;">
                    <tr>
                         <td align="Center">
                              <table cellpadding="3" cellspacing="5">                                                
                                <tr>
                                    <td align="center" colspan="3">                   
                                        <asp:Label ID="Label7" runat="server" CssClass="LetraChica" Font-Bold="True" Font-Names="Arial" Font-Size="Small" Text="Al oprimir 'Completa' el sistema hara una afectación de todos los movimientos que se encuentren pendientes o rechazados y en caso de oprimir 'Parcial' podra elegir los movimientos por rubro, plaza y número de documento. "></asp:Label>
                                    </td>
                                </tr>
                                   <tr>
                                      <td align="Center">                                     
                                          <a id="btncompleta" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_completa',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Completa</a>
                                          <a id="btnparcial" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Parcial</a>                             
                                      </td>                                
                                  </tr>
                                    <tr>
                                        <td align="Center">
                                             <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="AFECTACIÓN BLOQUEADA"></asp:Label>        
                                        </td>
                                    </tr>
                            </table>    
                         </td> 
                    </tr>                            
                </table>  
             </div>
          </div>         
         </div>             
        <div id="dparcial" style="width:100%;height:790px;padding:0px; display:none" align="Center">           
              <div id="MenuListaMov" class="easyui-panel" style="padding:0px; width:100%;">      
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnrparcial" >Regresar</a>                            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'"id="btnaparcial" >Afectar</a>    
                   <asp:Label ID="lblquin1" CssClass="LetraChica2"  runat="server"></asp:Label>                                                                                                       
              </div> 
             <br />
             <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lblparcial" CssClass="TituloMedio" runat="server" Text="Afectación Parcial"></asp:Label><br>
                    </td>
                </tr>                
         </table>                                                        
              <div class="easyui-panel" style="width:25%; margin-top:20px;  padding:4px" align="Center">                        
                  <table style="width: 100%;">           
                    <tr>
                      <td align="Center">
                          <a href="#" id="btnmov" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top',selected:true,toggle:true,group:'g1'" onClick="SELECCIONAR_MOV();">Movimiento</a>
                          <a href="#" id="btndoc" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_documentos',size:'large',iconAlign:'top',toggle:true,group:'g1'" onClick="SELECCIONAR_DOC();">Documento</a>                                        
                      </td>
                   </tr>                        
                   </table>            
              </div>  
             <br />
             <table>                                                         
                     <tr>                        
                        <td align="left"><asp:Label ID="lbl4" CssClass="LetraChicaNegrita"  runat="server">Movimientos:</asp:Label></td>
                        <td align="left"><input class="easyui-textbox" style="width:200px" data-options="disabled:false" id="txtmovimientos">
                          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:false" id="btnBmovimientos" >Buscar</a> 
                          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLmovimientos" >Limpiar</a> 
                      </td>
                   </tr>                              
                   <tr>                       
                      <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita"  runat="server">Documentos:</asp:Label></td>
                      <td align="left"><input class="easyui-textbox" style="width:200px" data-options="disabled:true" id="txtdocumentos">
                          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" id="btnBdocumentos">Buscar</a>
                          <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLdocumentos" >Limpiar</a> 
                     </td>
                   </tr>     
                 </table>                       
         </div>
        <div id="ddoc" style="width:100%;height:790px;padding:0px; display:none" align="Center">           
              <div id="Div4" class="easyui-panel" style="padding:0px; width:100%;">      
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnrdocumentos" >Regresar</a>
              </div>  
            <br />         
               <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocamdoc"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:120px;" id="cbocondoc">                                                                      
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
                </div>
               <table style="display:none;" id="dgdoc">
              <%
                  /*string tabla = "";
                  if (Request.QueryString["tipo"] != null)
                  {
                      //if (Request.QueryString["tipo"].ToString() == "MP") { tabla = "CatDocmp"; }
                      //if (Request.QueryString["tipo"].ToString() == "MC") { tabla = "CatDocmc"; }
                      //if (Request.QueryString["tipo"].ToString() == "DP") { tabla = "CatDocdp"; }
                      tabla = "CatDoc" + Request.QueryString["tipo"].ToString();
                  }
                  //else { tabla = "CatDocmp"; }      
                  string[] datos;                
                  string[] Array = DiseñoGrid(tabla);
                  var columnas = Array[0].Split('|');
                  var bloqueos = Array[1].Split('|');    */                                                            
               %>
               <thead data-options="frozen:true">
                   <tr>
                        <%   
                            /*if (bloqueos[0] != "")
                            {
                                for (var col = 0; col < bloqueos.Length; col++)
                                {
                                    datos = bloqueos[col].Split(',');
                                    var valor = datos[0];
                                    var alinear = datos[1];
                                    var titulo = datos[2];
                                    var ancho = datos[3] + "px";
                                    Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                                }
                            }*/
                         %>
                   </tr>
               <thead>
               <thead>
                     <tr>
                          <%  
                            
                             /*for (var col = 0; col < columnas.Length; col++)
                                {
                                    datos = columnas[col].Split(',');
                                     var valor = datos[0];
                                     var alinear = datos[1];
                                     var titulo = datos[2];
                                     var ancho = datos[3] + "px";                                     
                                     Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                               }    */                                                                         
                         %>
                     </tr>
               <thead>
            </table>              
          </div>
         <div id="derror" style="width:100%;  display:none"> 
            <div id="Div1" class="easyui-panel" style="padding:3px; width:100%;">      
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnregresarerrores" >Regresar</a>
            </div>   
               <br />                
              <asp:Label ID="lblerror" CssClass="LetraChica" runat="server" Text="Cifras de Afectación"></asp:Label>
               <br />
              <br />
              <br />
              <table class="easyui-datagrid"  id="dgdb" style="display:none">                    
              </table>             
              <table class="easyui-datagrid"  id="dgcifra">                    
              </table>
             <br />
              <table class="easyui-datagrid"  id="dgerrores">                    
              </table>
         </div>
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden" id="wincat" closed="true">   
             <div class="easyui-panel" style="padding:3px; width:100%">                   
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_MiniSalir'" id="btnCerrar">Cerrar</a>  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnAceptar">Aceptar</a>
              <asp:Label ID="lblmov" CssClass="LetraChica" runat="server" Text=""></asp:Label>                   
            </div>            
                    <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:150px;" id="cbocamcat"  data-options="editable:false"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:130px;" id="cboconcat" data-options="editable:false">                                                                      
                                 <option value="like">Aproximada</option>
                                 <option value="in">Exacta</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:200px" id="txtvalcat">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                 <table style="display:none; width:100%; height:89%" id="dgcat" >                        
                 </table>                                                                          
            </div>
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden" id="winrubro" closed="true" align="center">   
              <div class="easyui-panel" style="padding:3px; width:100%">                   
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_MiniSalir'" id="btnCrubros">Cerrar</a>  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnArubros">Aceptar</a>
                <asp:Label ID="Label2" CssClass="LetraChica" runat="server" Text=""></asp:Label>                   
            </div> 
             <br />
               <table>                    
                <tr>
                    <td align="left">
                        <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
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
         <div class="easyui-panel" style="padding:5px; width:100%;height:85%" align="Left" >
            <ul class="easyui-tree" id="lstrubros" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:true">                                        
            </ul>
        </div> 
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
