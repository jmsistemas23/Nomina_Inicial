<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DIndicesMC.aspx.cs" Inherits="FILE_IndiceDeAfectacion_DIndicesMC" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="DIndicesMC.js"></script>
</head>
<body>
    <form id="form1" runat="server">
   <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
         <div id="dmenu" title="" style="width:100%;height:790px;padding:0px;" align="Center">     
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
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocam" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:100px;" id="cbocon">
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
     <div id="dcaptura" title="" style="width:100%;height:790px;padding:0px; display:none" align="Center">      
         <div class="easyui-panel" style="padding:5px; width:100%">                                        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarCap">Regresar</a> 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCap">Limpiar</a>                  
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarCap" >Guardar</a>              
             <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server"></asp:Label> 
          </div> 
         <br />           
          <table>
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
     <div id="ddiseño" title="" style="width:100%;height:790px;padding:0px; display:none " align="Center"> 
          <div class="easyui-panel" style="padding:5px; width:100%">                                        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarInd">Regresar</a>     
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarInd" >Guardar</a> 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarInd">Limpiar</a>                 
             <asp:Label ID="lblindice" CssClass="LetraChica" runat="server"></asp:Label> 
          </div>  
          <br />           
          <table>
              <tr>
                <td align="Center">
                    &nbsp;</td>
            </tr>                                
              <tr>
                <td align="Center">
                    <input type="checkbox" name="aplicaEmp" id="apliemp">Aplicar a empleados
                </td>
            </tr>                                
              <tr>
                <td align="Center">
                    &nbsp;</td>
            </tr>                                
            <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Seleccione Tipo de Afectación</asp:Label>
                </td>
            </tr>
            <tr>
                <td align="Center">
                     <select class="easyui-combobox" data-options="editable:false" style="width:350px;" id="cbMovimiento">                                                                      
                        <option value="x">Seleccione una Opción</option>
                        <option value="perprocespIMP">Percepciones por proceso especial con importe</option>
                        <option value="perprocespFRM">Percepciones por proceso especial con formula</option>
                        <option value="cadperFRM">Percepciones fijas por formula</option>
                        <option value="cadperIMP">Percepciones fijas por importe</option>
                        <option value="dedprocespIMP">Deducciones por proceso especial con importe</option>
                        <option value="dedprocespFRM">Deducciones por proceso especial con formula</option>
                        <option value="caddedFRM">Deducciones fijas por formula</option>
                        <option value="caddedIMP">Deducciones fijas por importe</option>
                        <option value="apoprocespIMP">Aportaciones por proceso especial con importe</option>
                        <option value="apoprocespFRM">Aportaciones por proceso especial con formula</option>
                        <option value="aportaciones">Aportaciones fijas por formula</option>
                        <option value="cadapoIMP">Aportaciones fijas por importe</option>
                        <option value="quinque">Quinquenio</option>
                        <option value="licenci">Licenciatura</option>
                        <option value="titula">Titulacion</option>
                        <option value="estantjub">Estímulo De Antigüedad Por Jubilación</option>
                        <option value="primaant">Prima De Antigüedad</option>
                    </select>
                </td>
           </tr>             
            <tr>
                <td align="Center">
                    &nbsp;</td>
            </tr>
            <tr>
                <td align="Center">
                    <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Seleccione Tipo de Movimiento</asp:Label>
                </td>
            </tr>
              <tr>
                <td align="Center">
                   <select class="easyui-combobox" data-options="editable:false" style="width:350px;" id="cbTipo">           
                        <option value="x">Seleccione una Opción</option>
                        <option value="a">Alta</option>
                        <option value="b">Baja</option>
                        <option value="c">Cambio</option>
                    </select>
                </td>
            </tr>              
              <tr>
                <td align="Center">
                    &nbsp;</td>
            </tr>
              <tr>
                <td align="Center">
                    <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Aplica Cálculo</asp:Label>
                </td>
            </tr>
              <tr>
                <td align="Center">
                   <select class="easyui-combobox" data-options="editable:false" style="width:350px;" id="cbCalculo">           
                        <option value="x">Seleccione una Opción</option>
                        <option value="retro">Retroactivo</option>
                        <option value="respo">Responsabilidad</option>
                        <option value="difer">Diferencias</option>
                    </select>
                </td>
            </tr>             
             <tr>
                <td align="Center">
                    &nbsp;</td>
            </tr>
             <tr>
                <td align="Center">
                    <asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Aplicar Afectación</asp:Label>
                </td>
            </tr>
              <tr>
                <td align="Center">
                   <select class="easyui-combobox"  data-options="editable:false" style="width:350px;" id="cbAfectacion">           
                        <option value="x">Seleccione una Opción</option>
                        <option value="0">Afectación por Plaza</option>
                        <option value="1">Afectación por Plaza y Empleado</option>
                    </select>
                </td>
            </tr>
          </table>
     </div>
        <div class="modal" style="display: none" id="loading">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>
    </div>
    </form>
</body>
</html>
