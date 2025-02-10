<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Asistente_Indicadores.aspx.cs" Inherits="FILE_CatalogoDeIndicadores_Asistente_Indicadores" %>

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
    <link rel="stylesheet" type="text/css" href="../../styles/style-creacion-de-plazas.css" />
    
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="Asistente_indicadores.js?1.7"></script>
    <script type="text/javascript">
        
    </script>
     <style type="text/css">       
       .container{            
          width: 100%;
          height:310px;
          overflow-x: hidden;
          overflow-y: auto;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">               
       <div id="DMenu">           
           <div class="easyui-panel" style="padding:3px; width:100%">                               
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnnuevo"  onclick="AgregarNuevoIndicador()">Nuevo</a>                           
         </div> 
           <br /> 
           <br />
        <%--   <div class="easyui-panel" style="width:30%; margin-top:20px;  padding:4px" align="Center">--%>
            <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                       <a id="aPercepciones" href="#" class="easyui-linkbutton" onclick="seleccionarTipoPlaza(this)" data-options="plain:false,iconCls:'percepciones',size:'large',iconAlign:'top',toggle:true,group:'g1',selected:true" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Percepciones</a>
                       <a id="aDeducciones" href="#" class="easyui-linkbutton" onclick="seleccionarTipoPlaza(this)" data-options="plain:false,iconCls:'deducciones',size:'large',iconAlign:'top',toggle:true,group:'g1'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Deducciones</a>
                       <a id="aAportaciones" href="#" class="easyui-linkbutton" onclick="seleccionarTipoPlaza(this)" data-options="plain:false,iconCls:'aportaciones',size:'large',iconAlign:'top',toggle:true,group:'g1'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Aportaciones</a>                       
                  </td>
              </tr>                        
            </table>                
        <%--   </div>--%>
           <br />
           <div id="DGrid"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">                
             <table>   
                 <tr>
                    <td align="left"><asp:Label ID="Label39"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaIndicador" style="width:400px"/></td>
                    <td align="left"><a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" onclick="buscarIndicadorSegunSeleccion()">Buscar</a></td>
                </tr>                             
             </table>   
             <table> 
               <tr>
                 <td align="center">
                    <table class="easyui-datagrid" id="tblBusquedaDeIndicador" style="width:600px;height:500px"> 
                      <thead>
                         <tr>
                           <th data-options="field:'Clave'">Indicador</th>
                           <th data-options="field:'Descripcion'" style="width:450px">Descripcion</th>                        
                           <th data-options="field:'Zona'">Tipo</th>                        
                        </tr>
                      <thead>
                   </table>
                </td>
             </tr>                               
            </table>   
        </div>
       </div>  
         <div id="DCaptura"  class="easyui-layout" style="width:100%;height:100%;padding:0px; display:none" align="Center">
            <div class="easyui-panel" style="padding:3px; width:100%">                   
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRmenu" onclick="RegresarMenu()">Regresar</a>  
                <a id="btnguardar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" >Guardar</a>       
                <asp:Label ID="lbltipoindicador"  CssClass="LetraChica" runat="server" Text=""></asp:Label>                        
            </div>          
             <br />            
             <div class="easyui-tabs" style="width:70%;height:600px"> 
                     <div title="Captura" align="center"> 
                          <br /> <br />
                          <table>
                                      <tr>
                                          <td aling="Center">
                                             <asp:Label ID="Label4"  CssClass="LetraChicaNegrita" runat="server" Text="No de Indicador:"></asp:Label>
                                          </td>
                                          <td>                                
                                              <input id="txtNoPlazas" class="easyui-textbox" precision="" value="" style="width:50px"/>
                                              <select class="easyui-combobox"   id="cboSubFijo" name="cboSubFijo"  style="width:50px" data-options="editable:false">
                                                <%
                                                  string sel = "selected";
                                                  for (int i = 0; i < 26; i++) {
                                                     Response.Write("<option " + sel + " value=" + (char)(i + 97) + ">" + (char)(i + 97) + "</option>");
                                                    sel = "";
                                                    }
                                                %>
                                              </select>
                                              <asp:Label ID="lblindicador" CssClass="LetraChica" runat="server" Text=""></asp:Label>
                                            </td>
                                      </tr> 
                                      <tr>
                                         <td>
                                             <asp:Label ID="Label1"  CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Referencia:"></asp:Label>
                                         </td> 
                                          <td>                                
                                            <input id="txtReferencia" class="easyui-textbox" value="" style="width:100px"/>
                                          </td>                                                                  
                                      </tr>   
                                      <tr>
                                        <td>
                                            <asp:Label ID="Label2"  CssClass="LetraChicaNegrita" runat="server" Text="Descripción para Recibo:" ></asp:Label>
                                        </td> 
                                          <td colspan ="3">                                
                                            <input id="txtDescRecibo" class="easyui-textbox" value="" style="width:300px"/>
                                        </td>
                                      </tr>                      
                                     <tr>
                                       <td>
                                           <asp:Label ID="Label3"  CssClass="LetraChicaNegrita" runat="server" Text="Descripción Completa:"></asp:Label>
                                       </td> 
                                         <td colspan ="3">                                
                                           <input id="txtDescCompleta" class="easyui-textbox" value="" style="width:300px"/>
                                        </td>
                                     </tr>
                                        <tr>
                                        <td>
                                            <asp:Label ID="Label10"  CssClass="LetraChicaNegrita" runat="server" Text="Nombre del Campo:"></asp:Label>
                                        </td>
                                        <td colspan ="3">                                
                                            <input id="txtNomCampo" class="easyui-textbox txtChico" value="" style="width:100px"/>
                                        </td> 
                                    </tr>                                  
                                     <tr>
                                        <td>
                                            <asp:Label ID="Label5"  CssClass="LetraChicaNegrita" runat="server" Text="Vigencia Inicial:"></asp:Label>
                                        </td> 
                                          <td> 
                                            <input type="text" id="dtpVigIni" name="dtpVigIni" class="easyui-datebox" style="width:100px" data-options="formatter:myformatter,parser:myparser"/>                                             
                                        </td>
                                    </tr>                        
                                    <%--<tr>
                                      <td>
                                           <asp:Label ID="Label6"  CssClass="LetraChicaNegrita" runat="server" Text="Capítulo:"></asp:Label>
                                      </td>
                                        <td> 
                                          <select class="easyui-combobox" id="cboCapitulo" style="width:400px" data-options="editable:false"></select>
                                       </td> 
                                    </tr>                       
                                    <tr>
                                       <td>
                                           <asp:Label ID="Label7"  CssClass="LetraChicaNegrita" runat="server" Text="Clasificación Presupuestal/Contable:"></asp:Label>
                                       </td> 
                                        <td > 
                                            <select class="easyui-combobox" id="cboClaPreCon" name="cboClaPreCon" style="width:400px" data-options="editable:false"></select>
                                        </td>
                                    </tr>                       --%>
                                    <tr>
                                       <td>
                                           <asp:Label ID="Label8"  CssClass="LetraChicaNegrita" runat="server" Text="Tope Mínimo:"></asp:Label>
                                       </td> 
                                        <td > 
                                            <input id="txtTopeMinimo" class="easyui-numberbox" precision="2" value="" style="width:80px"/>
                                        </td>
                                    </tr>                       
                                    <tr>
                                        <td>
                                            <asp:Label ID="Label9"  CssClass="LetraChicaNegrita" runat="server" Text="Tope Máximo:"></asp:Label>
                                        </td> 
                                        <td> 
                                            <input id="txtTopeMaximo" class="easyui-numberbox" precision="2" value="" style="width:80px"/>
                                        </td>
                                    </tr>                                       
                                    <tr>
                                        <td>
                                            <asp:Label ID="Label11"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Pago:"></asp:Label>
                                        </td> 
                                        <td > 
                                            <select class="easyui-combobox" id="cboTipPag" name="cboTipPag"style="width:200px" data-options="editable:false">                                               
                                                <option value="1">Pago Quincenal</option>
                                                <option value="2">Pago Especifico</option>
                                            </select>
                                        </td>
                                    </tr>                        
                                    <tr>
                                        <td>
                                            <asp:Label ID="Label12"  CssClass="LetraChicaNegrita" runat="server" Text="Familia del Indicador:"></asp:Label>
                                        </td> 
                                        <td > 
                                            <select class="easyui-combobox" id="cboFamInd" name="cboFamInd" style="width:400px" data-options="editable:false">
                                            </select>
                                        </td>
                                    </tr>  
                                       <tr>
                                      <td>
                                           <asp:Label ID="Label6"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo Clave SAT:"></asp:Label>
                                      </td>
                                        <td> 
                                          <select class="easyui-combobox" id="cbotiposat" style="width:200px" data-options="editable:false"></select>
                                       </td> 
                                    </tr>  
                                       <tr>
                                      <td>
                                           <asp:Label ID="Label7"  CssClass="LetraChicaNegrita" runat="server" Text="Clave SAT:"></asp:Label>
                                      </td>
                                        <td> 
                                          <select class="easyui-combobox" id="cbocvesat" style="width:400px" data-options="editable:false"></select>
                                       </td> 
                                    </tr>
                                 <%--    <tr>
                                      <td>
                                           <asp:Label ID="Label15"  CssClass="LetraChicaNegrita" runat="server" Text="Importe Predeterminado:"></asp:Label>
                                      </td>
                                        <td> 
                                          <select id="txtimporte" class="easyui-numberbox"  precision="2" style="width:100px" data-options="editable:true"></select>
                                       </td> 
                                    </tr>     --%>                                                                                                                                                                                                        
                                   <%-- <tr>
                                        <td>
                                            <asp:Label ID="Label13"  CssClass="LetraChicaNegrita" runat="server" Text="Fuente de Financiamiento:"></asp:Label>
                                        </td>
                                         <td > 
                                            <select class="easyui-combobox" id="cboFueFin" name="cboFueFin" style="width:400px" data-options="editable:false">
                                            </select>
                                        </td> 
                                    </tr>--%>
                                       <tr><td> &nbsp;</td></tr>                                                                            
                                  </table>    
                     </div>
                     <div title="Opciones" align="center">
                          <br /> <br />                           
                         <table id="Table1">                                                   
                                                   <%-- <tr>--%>
                                                       <%-- <td><input type="checkbox" value="Aplica Impuesto" id="chkIndAplImp"  onchange="mostarProyeccionMensual(this.checked)"/>                                             
                                                                <asp:Label ID="Label15"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Impuesto"></asp:Label> 
                                                        </td> --%>
                                                      <%-- <td><input type="checkbox" id="chkimpuestoNM" value="ImpuestoNM" onchange="mostarProyeccionMensual(this.checked)"/>                                            
                                                         <asp:Label ID="Label13"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Impuesto NM"></asp:Label>
                                                      </td> --%>
                                                 <%--  </tr>--%>
                                                    <!------------------------------------------------------------------------>
                                                    <tr>
                                                        <td id="tdSinProyeccion" class="oculto">
                                                            <table id="Table2" class="marginIzq">
                                                                <tr>
                                                                    <td ><input id="chkSinProMen" type="checkbox"/></td>
                                                                    <td><asp:Label ID="Label16"  CssClass="LetraChicaNegrita" runat="server" Text="Sin Proyeccion Mensual"></asp:Label></td>
                                                                </tr>  
                                                                <tr>
                                                                    <td ><input id="chkeximpNM" type="checkbox"/></td>
                                                                    <td><asp:Label ID="Label40"  CssClass="LetraChicaNegrita" runat="server" Text="Excenta Impuesto:"></asp:Label></td>
                                                                </tr>                                                               
                                                            </table>
                                                            <table style="width:100%" class="marginIzq">                                                                                                                                                                                                       
                                                                <tr>
                                                                   <td>
                                                                     <asp:Label ID="Label17"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Excento:"></asp:Label>
                                                                   </td> 
                                                                    <td> 
                                                                      <input id="cboexetipNM" class="easyui-combobox" value="" style="width:280px" data-options="editable:false, disabled:true"/>
                                                                  </td>
                                                              </tr> 
                                                                <tr>
                                                                   <td>
                                                                      <asp:Label ID="Label43"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Excentar:"></asp:Label>
                                                                   </td> 
                                                                   <td>
                                                                      <input id="txtexvalNM" class="easyui-numberbox"  precision="2" value="" style="width:80px" data-options="disabled:true"/>                                                                
                                                                   </td>
                                                                </tr>  
                                                            </table>                                                                                        
                                                        </td> 
                                                   </tr>
                                                 <tr>
                                                        <td id="opcpension" style="display:none">
                                                            <input type="checkbox" id="chkIndPenAli" value="Indicador de Pension Alimenticia" />
                                                            <asp:Label ID="Label14"  CssClass="LetraChicaNegrita" runat="server" Text="Indicador de Pensión Alimenticia"></asp:Label> 
                                                        </td> 
                                                    </tr>
                                             <%--  <tr>
                                                    <td><input type="checkbox" id="chkExencionImp"  value="Exencion de Impuesto" onchange="mostarNumDiasYTipExe(this.checked)" />                                             
                                                        <asp:Label ID="Label17"  CssClass="LetraChicaNegrita" runat="server" Text="Exencion de Impuesto"></asp:Label>
                                                    </td> 
                                                </tr>
                                                <!------------------------------------------------------------------------>
                                                <tr>
                                                    <td id="tdextepcion" class="oculto">                                           
                                                            <table id="tblextepcion" class="marginIzq">
                                                                <tr>
                                                                    <td id="tdNumDias" >                                                                          
                                                                    <asp:Label ID="Label18"  CssClass="LetraChicaNegrita" runat="server" Text="Número de Días:"></asp:Label>                                                                                               
                                                                    </td> 
                                                                    <td id="txtnumdias">
                                                                        <input id="Text1" class="easyui-numberbox oculto txtChico" precision="" value=""/>     
                                                                    </td>                                        
                                                                </tr>
                                                                <tr>
                                                                    <td id="tdTipExe" >
                                                                    <asp:Label ID="Label19"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Exencion:"></asp:Label>                                                        
                                                                    </td> 
                                                                    <td id="scboTipExe">
                                                                        <select class="easyui-combobox oculto txtChico" id="cboTipExe" ></select>
                                                                    </td>
                                                                </tr>
                                                            </table>                                            
                                                    </td>                                        
                                                </tr>            --%>                        
                                                   
                                                    <tr>
                                                        <td><input type="checkbox" id="chkAplPla" value="Aplica Plan" />                                            
                                                            <asp:Label ID="Label20"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Plan"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkProRet" value="Proporcionalidad en Retroactivo" />                                            
                                                            <asp:Label ID="Label21"  CssClass="LetraChicaNegrita" runat="server" Text="Proporcionalidad en Retroactivo"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkAplPreSoc" value="Aplica Prevision Social" />
                                                            <asp:Label ID="Label22"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Prevision Social"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkAcuTot" value="Acomula Totales" />                                            
                                                            <asp:Label ID="Label23"  CssClass="LetraChicaNegrita" runat="server" Text="Acomula Totales"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkCalRet" value="Calcula Retroactivos" />                                            
                                                            <asp:Label ID="Label24"  CssClass="LetraChicaNegrita" runat="server" Text="Calcula Retroactivos"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkApl1Pla" value="Aplica Solo 1 Plaza" />                                            
                                                            <asp:Label ID="Label25"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Solo 1 Plaza"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkAplBim" value="Aplica Bimestralmente" />                                            
                                                            <asp:Label ID="Label26"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica Bimestralmente"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkBono" value="Bono" />                                            
                                                            <asp:Label ID="Label27"  CssClass="LetraChicaNegrita" runat="server" Text="Bono"></asp:Label>
                                                        </td> 
                                                    </tr>
                                                    <tr>
                                                        <td><input type="checkbox" id="chkAfePre" value="Afecta Presupuesto" />                                            
                                                            <asp:Label ID="Label28"  CssClass="LetraChicaNegrita" runat="server" Text="Afecta Presupuesto"></asp:Label>
                                                        </td> 
                                                    </tr> 
                                                       <tr>
                                                        <td><input type="checkbox" id="chkApliTerc" value="Aplica En Descuentos (Terceros)" />                                            
                                                            <asp:Label ID="lblter"  CssClass="LetraChicaNegrita" runat="server" Text="Aplica En Descuentos (Terceros)"></asp:Label>
                                                        </td> 
                                                    </tr>      
                                                    <tr>
                                                        <td><input type="checkbox" id="chkDescInstitu" value="Es Institucional" />                                            
                                                            <asp:Label ID="Label42"  CssClass="LetraChicaNegrita" runat="server" Text="Es Institucional"></asp:Label>
                                                        </td> 
                                                    </tr>                                                       
                                                </table>                                      
                          <br />
                         <table>                                                       
                                                    <tr>
                                                        <td>
                                                            <asp:Label ID="Label30"  CssClass="LetraChicaNegrita" runat="server" Text="Tipos de Plaza:"></asp:Label>
                                                        </td>
                                                        <td colspan="3">
                                                            <select class="easyui-combobox" style="width:290px" id="cboTipNom" name="cboTipNom" data-options="editable:false,valueField:'cvetippl',textField:'destippl'" ></select>  
                                                        </td>
                                                    </tr> 
                                                    <tr>
                                                        <td>
                                                            <asp:Label ID="Label29"  CssClass="LetraChicaNegrita" runat="server" Text="Quincenas de Aplicacion:"></asp:Label>
                                                        </td>
                                                        <td>
                                                            <select class="easyui-combobox" id="cboQuiApl" style="width:150px" name="cboQuiApl" data-options="editable:false,onSelect:function(){mostrarEspesificarQuincenas()}" >
                                                                <option value="Todas">Todas</option>
                                                                <option value="Quincena Par">Quincena Par</option>
                                                                <option value="Quincena Non">Quincena Non</option>
                                                                <option value="Especificar Qna">Especificar Qna</option>
                                                            </select>                                                                                                                             
                                                        </td>
                                                        <td id="especificarQuincena" class="oculto" align="Left"> 
                                                            <select class="easyui-combobox" id="cboQuiSel" multiple="true" multiline="true" name="cboQuiSel"  style="width:200px;" data-options="editable:false">                                                            
                                                            <option>01</option><option>02</option><option>03</option><option>04</option>
                                                            <option>05</option><option>06</option><option>07</option><option>08</option>
                                                            <option>09</option><option>10</option><option>11</option><option>12</option>
                                                            <option>13</option><option>14</option><option>15</option><option>16</option>
                                                            <option>17</option><option>18</option><option>19</option><option>20</option>
                                                            <option>21</option><option>22</option><option>23</option><option>24</option>
                                                           </select>  
                                                        </td>
                                                    </tr>                                        
                                            </table>                              
                     </div>
                        <div title="Formula"> 
                             <div class="easyui-panel" style="padding:3px; width:100%">                               
                                  <a id="btllimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'"  onclick="limpiarFomula()">Limpiar</a>
                             </div>                                    
                                <div class="hijosCentrados">  
                                     <br /><br />                  
                                    <asp:Label ID="Label31"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Aplicacion:"></asp:Label>
                                    <select class="easyui-combobox txtChico" id="cboTipApl" data-options="onSelect:function(){mostrarFormula(this);},editable:false">
                                        <option>Formula</option>
                                        <option>Importe Fijo</option>
                                    </select>
                                    <br /><br />
                                    <table class="width100">
                                        <tr>
                                            <td align="Center">
                                               <table id="tblformulas" class="width80">
                                                  <tr>
                                                     <td align="Center"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Elementos de Formula"></asp:Label></td>
                                                     <td align="Center"><asp:Label ID="Label36"  CssClass="LetraChicaNegrita" runat="server" Text="Campos"></asp:Label></td>
                                                     <td align="Center"><asp:Label ID="Label37"  CssClass="LetraChicaNegrita" runat="server" Text="Valor"></asp:Label></td>
                                                  </tr>
                                                  <tr>
                                                     <td align="Center"><select class="easyui-combobox" id="cboCatLis" name="cboCatLis" style="width:230px" onclick="listarCatlisCampoDeFormula()" data-options="editable:false"></select></td>
                                                     <td align="Center"><select class="easyui-combobox" id="cboCatLisPla" style="width:230px" name="cboCatLisPla" data-options="editable:false" ></select></td>
                                                     <td align="Center"><input id="txtColumnaSel" data-options="readonly:true" class="easyui-textbox" style="width:200px" value="" /></td>                                                                                    
                                                  </tr> 
                                                   <tr><td colspan="3" align="Center"><a id="A1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'"  onclick="insertarCampos()">Agregar</a></td></tr>   
                                             </table>
                                               <table id="tblimporte" class="width80 oculto">
                                                 <tr>
                                                     <td><asp:Label ID="Label38"  CssClass="LetraChicaNegrita" runat="server" Text="Monto:"></asp:Label></td>
                                                     <td><input id="txtmontoimporte" data-options="readonly:false" class="easyui-numberbox" style="width:150px" value="" /></td>
                                                     <td><a id="btnIMontoImporte" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" onclick="insertarColumna()">Agregar</a></td>
                                                 </tr>                                                
                                               </table>
                                               <br />
                                               <table id="tbloperadores" class="width80">
                                                <tr>
                                                    <td align="Center"><asp:Label ID="Label34"  CssClass="LetraChicaNegrita" runat="server" Text="Operadores:"></asp:Label></td>
                                                    <td align="Center">
                                                        <select class="easyui-combobox txtMicro" id="cboOperadores" name="cboOperadores" data-options="editable:false">
                                                           <option>+</option><option>-</option><option>*</option><option>/</option>
                                                           <option>(</option><option>)</option><option>=</option><option>></option>
                                                           <option><</option><option>>=</option><option><=</option><option><></option>
                                                           <option>%</option>
                                                       </select>                                                
                                                    </td>                                                    
                                                    <td align="Center"><a id="btn1" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" style="width:90px" onclick="insertarOperador()">Agregar</a></td> 
                                                    <td>&nbsp;</td>                                                  
                                                    <td align="Center"><asp:Label ID="Label35"  CssClass="LetraChicaNegrita" runat="server" Text="Monto:"></asp:Label></td>
                                                    <td align="Center"><input id="txtMonto" class="easyui-numberbox" style="width:150px" precision="2" value=""/></td>
                                                    <td align="Center"><a id="btn2" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" style="width:90px" onclick="insertarMonto()">Agregar</a></td>
                                                </tr>
                                            </table> 
                                           </td>
                                       </tr>                                                                            
                                        <tr><td>&nbsp;</td></tr>                                       
                                       <tr>
                                        <td>                                      
                                            <asp:Label ID="Label33"  CssClass="LetraChicaNegrita" runat="server" Text="Formula de Calculo"></asp:Label> 
                                            <br />                                
                                            <input id="formulaIndicador" class="easyui-textbox" data-options="multiline:true,readonly:true" value="" style="width:100%;height:90px" />                                                                                                                         
                                        </td>
                                        </tr>
                                    </table>
                                </div>
                             </div>
                 </div>
       </div>                      
    </div>   
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="win" closed="true">               
             <table style="width:100%;height:100%" id="dglista"></table>                                        
        </div>
        <div class="modal" style="display: none;" id="loading" align="center">
             <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
        </div>      
    </form>
</body>
</html>
