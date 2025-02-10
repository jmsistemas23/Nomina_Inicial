<%@ Page Language="C#" AutoEventWireup="true" CodeFile="IndicesMP.aspx.cs" Inherits="FILE_IndiceDeAfectacion_IndicesMP" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
       <link href="style.css" rel="stylesheet" />

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="IndicesMP.js?v1.1"></script>
  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">         
         <div id="dmenu" class="easyui-layout" style="width:100%;height:100%;" align="Center">     
          <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Nuevo</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditar">Editar</a>   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Seleccion',disabled:true" id="btnDiseño">Indice</a>
         </div>  
            <br />
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocam" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:130px;" id="cbocon" data-options="editable:false">
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
          <table style="display:none;" id="dg">
              <%
                  string tabla = "";
                  if (Request.QueryString["tabla"] != null)
                  {
                      tabla = Request.QueryString["tabla"].ToString();
                  }
                  else { tabla = "CatIndicesMP"; }      
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
        <div id="dcaptura" class="easyui-layout" style="width:100%;height:100%; display:none" align="Center">          
         <div class="easyui-panel" style="padding:3px; width:100%">                                        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarCap">Regresar</a> 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCap">Limpiar</a>                  
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarCap" >Guardar</a>              
             <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server"></asp:Label> 
          </div> 
         <br />
             <asp:Label ID="lblmov" CssClass="LetraChica" runat="server"></asp:Label>  
         <br />      
          <table>
               <tr>
                  <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita"  runat="server">Clave:</asp:Label></td>
                   <td  align="left"><input class="easyui-textbox" style="width:80px" id="txtclave" ></td>
               </tr>
              <tr>
                  <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita"  runat="server">Descripción:</asp:Label></td>
                   <td  align="left"><input class="easyui-textbox" style="width:500px" id="txtdescripcion" ></td>
               </tr>
               <tr>
                  <td align="left"><asp:Label ID="lbl4" CssClass="LetraChicaNegrita"  runat="server">Orden:</asp:Label></td>
                   <td  align="left"><input class="easyui-numberbox" style="width:80px" id="txtorden" ></td>
               </tr>
          </table>         
     </div>    
        <div id="ddiseño" class="easyui-layout" style="width:100%;height:100%; " align="Center">      
            
        </div>                      
    </div>
          <div class="modal" style="display: none;" id="Div1" align="center">
             <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>  
    </form>
</body>
</html>
