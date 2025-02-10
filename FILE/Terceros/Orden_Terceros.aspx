<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Orden_Terceros.aspx.cs" Inherits="FILE_Terceros_Orden_Terceros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
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
    <script type="text/javascript" src="Orden_Terceros.js?1.0"></script>  
</head>
<body>
    <form id="form1" runat="server">    
        <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
           <div style="width:100%; padding:3px;" class="easyui-panel">                               
                <a id="btnLimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'">Limpiar</a>                   
           </div>  
            <br />
           <div style="width:100%;" align="Center">            
            <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocam" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cbocon">
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
          <br />
            <table>
                 <tr>
                    <td align="Center">
                          <asp:Label ID="lblmodOrden" CssClass="LetraChica" runat="server">Niveles:</asp:Label>                            
                          <input class="easyui-textbox" size="5" style="width:40px; text-align: center" id="txtmodOrden"  value="1">                           
                          <a id="btnSubirOrden" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-subir'" >Subir</a>
                          <a id="btnBajarOrden" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-bajar'" >Bajar</a>
                    </td>
                 </tr>
            </table>  
            <br />                       
             <table style="display:none; height:550px" id="dg">
              <%
                  string tabla = "";
                  if (Request.QueryString["tabla"] != null)
                  {
                      tabla = Request.QueryString["tabla"].ToString();
                  }
                  else { tabla = "OrdenTerceros"; }      
                  string[] datos;
                  string[] alias;                
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
                                    var alinear = datos[1];
                                    var titulo = datos[2];
                                    var ancho = datos[3] + "px";
                                    Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
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
                                     var alinear = datos[1];
                                     var titulo = datos[2];
                                     var ancho = datos[3] + "px";                                     
                                     Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                               }                                                                             
                         %>
                     </tr>
               <thead>
            </table>  
           </div>                         
       </div>               
         <div class="modal" style="display: none; " id="loading" align="center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
      </div>    
    </form>
</body>
</html>
