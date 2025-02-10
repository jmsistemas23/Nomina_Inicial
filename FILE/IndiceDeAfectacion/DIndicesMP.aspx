<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DIndicesMP.aspx.cs" Inherits="FILE_IndiceDeAfectacion_DIndicesMP" %>

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
    <script type="text/javascript" src="DIndicesMP.js?v1.2"></script>
     <link href="style.css" rel="stylesheet" />
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
     <div id="ddiseño" class="easyui-layout" style="width:100%;height:100%; display:none" align="Center">               
          <div class="easyui-panel" style="padding:3px; width:100%">                                        
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarInd">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarInd">Limpiar</a>                     
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardarInd" >Guardar</a>              
             <asp:Label ID="lblindice" CssClass="LetraChica" runat="server"></asp:Label> 
          </div> 
         <table class="hijosIzquierda">
                <tr>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" id="chkRetroactivo" onchange="chkRetroactivo_Onchange()" /><asp:Label ID="Label4" CssClass="LetraMiniChica" runat="server" Text="Retroactivo"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkResponsabilidad" onchange="chkResponsabilidad_Onchange()" /><asp:Label ID="Label5" CssClass="LetraMiniChica" runat="server" Text="Responsabilidad"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkDiferencias" onchange="chkDiferencias_Onchange()" /><asp:Label ID="Label6" CssClass="LetraMiniChica" runat="server" Text="Diferencias"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkDiasDeAgui" /><asp:Label ID="Label2" CssClass="LetraMiniChica" runat="server" Text="Dias de Aguinaldo"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkBajas" /><asp:Label ID="Label8" CssClass="LetraMiniChica" runat="server" Text="Bajas"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkEliconceper" onchange="chkEliconceper_Onchange()" /><asp:Label ID="Label9" CssClass="LetraMiniChica" runat="server" Text="EliConceper"></asp:Label></td>
                </tr>
                <tr>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" id="chkActuConceper" onchange="chkActuConceper_Onchange()" /><asp:Label ID="Label10" CssClass="LetraMiniChica" runat="server" Text="AutoConceper"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkEliPension" /><asp:Label ID="Label11" CssClass="LetraMiniChica" runat="server" Text="EliPension"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkActuConceper2" onchange="chkActuConceper2_Onchange()" /><asp:Label ID="Label12" CssClass="LetraMiniChica" runat="server" Text="AutoConceper2"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkBajaFonac" onchange="chkBajaFonacot_Onchange()" /><asp:Label ID="Label13" CssClass="LetraMiniChica" runat="server" Text="Baja Fonac"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkActualizarFonac" onchange="chkActuFonacot_Onchange()" /><asp:Label ID="Label14" CssClass="LetraMiniChica" runat="server" Text="Actualiza Fonac"></asp:Label></td>
                    <td class="bordeSencillo paddingSencillo"><input type="checkbox" value="" id="chkCancelarPago" /><asp:Label ID="Label15" CssClass="LetraMiniChica" runat="server" Text="Cancelar Pago"></asp:Label></td>
                </tr>
          </table> 
         <div style="overflow-y: scroll; height:85%">
                <br />                    
                <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server" Text="Campos de captura a plaza origen"></asp:Label> 
                <br /><br />
                <table id="tblCapturaAOrigen" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label17" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label18" CssClass="LetraMiniChica" runat="server" Text="Captura"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label19" CssClass="LetraMiniChica" runat="server" Text="Plazas"></asp:Label>
                            <select style="width:50px;" id="selNumColCapturaAPlazas"onchange="cargarColumnasDelTipo1(true)"></select>
                        </th>
                    </tr>
                </table>
                <br />                    
                <asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server" Text="Borrar campos de plaza origen"></asp:Label> 
                <br /><br />            
                <table id="tblBorrarOrigen" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label21" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>                    
                        <th class="hijosCentrados">
                            <asp:Label ID="Label22" CssClass="LetraMiniChica" runat="server" Text="Plazas"></asp:Label>
                            <select id="selBorrarCamposPlazaOrigen" onchange="cargarColumnasDelTipo0(true)"></select>
                        </th>
                    </tr>
                </table>
                <br />                    
                <asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server" Text="Campos de captura a plaza destino"></asp:Label> 
                <br /><br />               
                <table id="tblCapturaADestino" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label24" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label25" CssClass="LetraMiniChica" runat="server" Text="Captura"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label26" CssClass="LetraMiniChica" runat="server" Text="Plazas Destino"></asp:Label>
                            <select id="selCapturaAPlazaDestino" onchange="cargarColumnasDelTipo2(true)"></select>
                        </th>
                    </tr>
                </table>
                <br />                    
                <asp:Label ID="Label27" CssClass="LetraChicaNegrita" runat="server" Text="Campos de plaza origen a plaza destino"></asp:Label> 
                <br /><br />          
                <table id="tblOrigenADestino" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label28" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>                                        
                        <th class="hijosCentrados">
                            <asp:Label ID="Label29" CssClass="LetraMiniChica" runat="server" Text="Plazas"></asp:Label>
                            <select id="selPlazaOrigenAPlazaDestino" onchange="cargarColumnasDelTipo3(true)"></select>
                        </th>
                    </tr>
                </table>
                <br />                    
                <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server" Text="Campos de captura a catalogo Empleados"></asp:Label> 
                <br /><br />               
                <table id="tblCapturaAEmpleado" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label31" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label32" CssClass="LetraMiniChica" runat="server" Text="Captura"></asp:Label>
                        </th>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label33" CssClass="LetraMiniChica" runat="server" Text="Empleado"></asp:Label>
                            <select id="selCapturaAEmpleado" onchange="cargarColumnasDelTipo4(true)"></select>
                        </th>
                    </tr>
                </table>
                <br />                    
                <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server" Text="Borrar campos de catalogo Empleados"></asp:Label> 
                <br /><br />               
                <table id="tblBorrarDeEmpleado" class="hijosIzquierda centrado margenTopNegativo">
                    <tr>
                        <th class="hijosCentrados">
                            <asp:Label ID="Label35" CssClass="LetraMiniChica" runat="server" Text="No"></asp:Label>
                        </th>                    
                        <th class="hijosCentrados">
                                <asp:Label ID="Label34" CssClass="LetraMiniChica" runat="server" Text="Empleado"></asp:Label>
                            <select id="selBorrarDeEmpleado" onchange="cargarColumnasDelTipo7(true)"></select>
                        </th>
                    </tr>
                </table> 
           </div>         
    </div>
     <div id="idBuscadorIndicadores" class="centrado oculto fixed fondoBlanco border">
        <input type="text" id="txtBuscarIndicador" value="Buscar..." class="inputGrande mayusculas" onchange="txtBuscarIndicador_OnChange()" onfocus="txtBuscarIndicador_OnFocus()" />
        <table class="width45">
            <tr>
                <td>
                    <select id="selBuscarIndicador" size="8" class="inputGrande" ondblclick="selBuscarIndicador_ondblClick()"></select>
                </td>                
            </tr>
            <tr>
                <td>
                    <select id="selIndicadoresSeleccionados" size="8" class="inputGrande" ondblclick="selIndicadoresSeleccionados_ondblClick()"></select>
                </td>
            </tr>
        </table>
        <div class="hijosDerecha" style="margin:0px 5px 5px 0px">
            <input type="button" value="Aceptar" id="btnAceptarBuscadorIndicadores" onclick="AceptarBuscadorIndicadores()" />
            <input type="button" value="Cerrar" id="btnCerrarBuscadorIndicadores" onclick="CerrarBuscadorIndicadores()" />
        </div>                      
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
