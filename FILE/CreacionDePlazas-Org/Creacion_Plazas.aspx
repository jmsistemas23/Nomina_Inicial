<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Creacion_Plazas.aspx.cs" Inherits="FILE_CreacionDePlazas_Creacion_Plazas" %>

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

    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
    <link rel="stylesheet" type="text/css" href="../../styles/style-creacion-de-plazas.css" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>    
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
     <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>     
    <script src="../../Scripts/jquery-Mask.js"></script>  
     <script type="text/javascript" src="Creacion_Plazas.js?2.2"></script>
    <style type="text/css">
        .auto-style1 {
        }
        </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
      <div id="dmenu" style="width:100%; height:100%; padding:2px; " align="Center">                                                                               
             <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="Creación de plazas"></asp:Label><br>
                    </td>
                </tr>                
            </table>
          <br />
         <div id="pinicial" class="easyui-panel" style="width:40%; margin-top:20px;  padding:4px" align="Center">                        
           <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                      <a id="aNormal" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'empleados',size:'large',iconAlign:'top'" style="width:100px" >Normal</a>
                      <a id="aSustituta" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'sustitutos',size:'large',iconAlign:'top'" style="width:100px" >Sustituta</a>
                      <a id="aOtras" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Otras',size:'large',iconAlign:'top'" style="width:100px" >Otras</a>
                  </td>
              </tr>                                      
           </table>                  
         </div>        
          <div id="potras" class="easyui-panel" style="width:45%; margin-top:20px; padding:4px" align="Center">
              <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                      <a id="aRegresar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Anterior32',size:'large',iconAlign:'top'" style="width:100px" >Regresar</a>
                      <a id="aHonorarios" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'honorarios',size:'large',iconAlign:'top'" style="width:100px" >Honorarios</a>
                      <a id="aInterinos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'interinos',size:'large',iconAlign:'top'" style="width:100px" >Interinos</a>                      
                  </td>
              </tr>    
              <tr>
                  <td align="Center">
                      <a id="aPasantes" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'pasante',size:'large',iconAlign:'top'" style="width:100px" >Pasantes</a>
                      <a id="aResidentes" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'residente',size:'large',iconAlign:'top'" style="width:100px" >Residentes</a>
                      <a id="aSuplencias" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_MovPer',size:'large',iconAlign:'top'" style="width:100px" >Suplencias</a>
                     <%-- <a id="aContratos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'contratos',size:'large',iconAlign:'top'" style="width:100px" >Contratos</a>--%>
                    <%--  <a id="aNoEmpleados" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'noempleados',size:'large',iconAlign:'top'" style="width:100px" >No Empleados</a>--%>                      
                  </td>
              </tr>                                      
             </table>                  
          </div>
      </div>

      <div id="dinicial" style="width:100%; height:100%; padding:0px; display:normal" align="Center">              
          <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRmenu">Regresar</a>               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnguardar">Guardar</a>                                 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>
            <asp:Label ID="lblPlazaOrigenEnSustituta"  CssClass="LetraChica" runat="server" Text=""></asp:Label>   
          </div>          
          <br />          
          <table style="border-spacing: 7px">
                <tr>
                    <td align="center" colspan="7">
                        <asp:Label ID="lblplazas"  CssClass="SubTitulo" runat="server" Text=""></asp:Label>
                    </td>
                </tr>                        
                <tr>
                    <td align="left"><asp:Label ID="Label2"  CssClass="LetraChicaNegrita" runat="server" Text="No. de Plazas a Crear:"></asp:Label></td>
                    <td align="left"><input id="txtNoPlazas" class="easyui-numberbox " style="width:150px" precision="" value=""></input>
                        </td>
                    <td align="left" ><asp:Label ID="Label3"  CssClass="LetraChicaNegrita" runat="server" Text="Plaza Anterior:"></asp:Label>
                    </td>
                    <td align="left" ><input id="txtPlazaAnt" class="easyui-textbox " value="" style="width:150px" ></td>
                </tr>                        
                <tr>
                    <td align="left"><asp:Label ID="Label7"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Pago:"></asp:Label></td>
                    <td align="left"></input>                                
                            <select class="easyui-combobox "  id="cboTipoPago" name="cboTipoPago" style="width:150px"  data-options="valueField:'clave',textField:'nombre', editable:false">
                                <option value="Q">QUINCENAL</option>
                                <option value="D">DIAS</option>                                     
                            </select></td>
                    <td align="left"><asp:Label ID="Label34"  CssClass="LetraChicaNegrita" runat="server" Text="No. de Autorización:"></asp:Label></td>
                    <td align="left"><input id="txtNoAutorizacion" class="easyui-textbox " value="" style="width:150px" ></td>
                </tr>                                                             
                <tr>
                    <td align="left"><asp:Label ID="Label38"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Plaza:"></asp:Label></td>
                    <td align="left"><select class="easyui-combobox "  id="cboTipoPlaza" name="cbovacancia" style="width:200px" ></select></td>
                    <td align="left" ><asp:Label ID="Label31"  CssClass="LetraChicaNegrita" runat="server" Text="Estatus Inicial:"></asp:Label></td>
                    <td align="left"><select class="easyui-combobox "  id="cbovacancia" name="cbovacancia" style="width:215px" ></select></td>
                </tr>                        
               <tr>
                    <td align="left"><asp:Label ID="Label4"    CssClass="LetraChicaNegrita" runat="server" Text="Vigencia Inicial:"></asp:Label></td>
                    <td align="left"><input type="text" id="dtpVigIni" name="dtpVigIni" class="easyui-textbox" style="width:150px" /></td>                    
                    <td align="left" ><asp:Label ID="Label5"  CssClass="LetraChicaNegrita" runat="server" Text="Vigencia Final:"></asp:Label></td>
                    <td align="left"><input type="text" id="dtpVigFin" name="dtpVigFin" class="easyui-textbox " style="width:150px" /></td>
                </tr>                                                      
               <tr>
                    <td align="left"><asp:Label ID="Label33"    CssClass="LetraChicaNegrita" runat="server" Text="Horas:"></asp:Label></td>
                    <td align="left"><input id="txthoras" class="easyui-textbox " value="8" style="width:150px" ></td>                    
                    <td align="left" ><asp:Label ID="Label36"    CssClass="LetraChicaNegrita" runat="server" Text="Sueldo Personalizado:"></asp:Label></td>
                    <td align="left"><input id="txtSueldoPer" class="easyui-numberbox " data-options="precision:2" value=""  style="width:150px" ></td>
                </tr>                                                      
                </table>           
          <br />                                                  
          <table style="border-spacing: 7px">               
              <tr>
                <td align="left"><asp:Label ID="Label22"  CssClass="LetraChicaNegrita" runat="server" Text="Programa:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtprograma" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesprograma" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                
                <td align="left"><a id="btnBuscarprograma" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnLimpiarprograma" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>     
              <tr>
                <td align="left"><asp:Label ID="Label14"  CssClass="LetraChicaNegrita" runat="server" Text="Adscripción:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcveads" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesads" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                
                <td align="left"><a id="btnBuscarads" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnLimpiarads" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>     
              <tr>
                <td align="left"><asp:Label ID="Label6"  CssClass="LetraChicaNegrita" runat="server" Text="Estructura Programática:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcveetp" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesetp" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                
                <td align="left"><a id="btnBuscaretp" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a>  </td>
                <td align="left"><a id="btnLimpiaretp" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                                       
              <tr>
                <td align="left"><asp:Label ID="Label16"  CssClass="LetraChicaNegrita" runat="server" Text="Pagaduría:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvezp" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdeszp" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>               
                <td align="left"><a id="btnBuscarzp" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a>  </td>
                <td align="left"><a id="btnLimpiarzp" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                                        
              <tr>
                <td align="left"><asp:Label ID="Label20"  CssClass="LetraChicaNegrita" runat="server" Text="Clave Puesto:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvepuesto" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdespuesto" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                
                <td align="left"><a id="btnBuscarpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>   
                  <td align="left"><a id="btnlimpiarpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                                        
            <tr>
                <td align="left"><asp:Label ID="Label21"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo Puesto:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvetippue" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>  
                <td align="left" colspan="4">&nbsp; </td>                                                                                            
            </tr>                                                     
            <tr>
                <td align="left"><asp:Label ID="Label23"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Jerarquico:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvegpojer" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesgpojer" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                                            
            </tr> 
            <tr>
                <td align="left"><asp:Label ID="Label24"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Laboral:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvegpolab" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesgpolab" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>      
            </tr> 
            <tr>
                <td align="left"><asp:Label ID="Label10"  CssClass="LetraChicaNegrita" runat="server" Text="Código de Nivel:"></asp:Label></td>
                <td align="left"><input id="txtcodniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>
                <td align="left"><a id="btnBconNiv" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a>
                    <a id="btnLconNiv" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" >Limpiar</a>
                </td>                
                <td align="left"></td>                
                <td align="left">&nbsp;</td>                
            </tr>                                                                                                                           
            <tr>
                <td align="left"><asp:Label ID="Label25"  CssClass="LetraChicaNegrita" runat="server" Text="Zona:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtzona" class="easyui-textbox " value="" data-options="readonly:true" style="width:80px" ></td>
                <td align="left" colspan="2">&nbsp;</td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label17"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Mando:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtcvegrupoman" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesgrupoman" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                <td align="left"><a id="btnBgpoman" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                <td align="left"><a id="btnLgpoman" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" >Limpiar</a></td>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label18"  CssClass="LetraChicaNegrita" runat="server" Text="Responsabilidad:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtcvenivelresp" class="easyui-textbox " value="" data-options="readonly:false" style="width:180px" ></td>
                <td align="left" colspan="2"><input id="txtdesnivelresp" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                <td align="left"><a id="btnBnivelresp" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                <td align="left"><a id="btnLnivelresp" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  >Limpiar</a></td>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server" Text="Código de SubNivel:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtsubniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px"></td>
               <td align="left" colspan="2"><input id="txtdessubniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                 <td align="left"><a id="btnBsubnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                <td align="left"><a id="btnLsubnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  >Limpiar</a></td>
            </tr>                                                            
            <%-- <tr>
                <td align="left"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Nivel Salarial:"></asp:Label></td>
                <td align="left"><input id="txtnivel" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>
                <td align="left"><a id="btnBuscarnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a>
                    <a id="btnLimpiarnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a>
                </td>                                 
            </tr>         --%>                                                         
            <tr>
                <td align="left"><asp:Label ID="Label19"  CssClass="LetraChicaNegrita" runat="server" Text="Formula ISR:"></asp:Label></td>
               <td align="left" colspan="1"><input id="txtcveforisr" class="easyui-textbox " value="" data-options="readonly:true" style="width:180px" ></td>
               <td align="left" colspan="2"><input id="txtdesforisr" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>               
               <td align="left"><a id="btnbforisr" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a>  </td>
               <td align="left"><a id="btnlforisr" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" >Limpiar</a></td>
            </tr>                                                            
         </table>
          <table id="tblDatosDeAdscripcion" style="border-spacing: 7px">              
                    <tr>
                    <td align="left"><asp:Label ID="Label8"  CssClass="LetraChicaNegrita" runat="server" Text="Observaciones:"></asp:Label></td>                                        
                    <td align="left"><input id="txtObservaciones" class="easyui-textbox " data-options="multiline:true" value="" style="height:80px; width:495px" /></td>
                </tr>        
            </table>
      </div>

      <div id="dplazascreadas" style="width:100%; height:100%; padding:0px; display:none" align="Center">       
         <div class="easyui-panel" style="padding:0px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarDoc" onclick="Regresar_Inicio()">Regresar</a>               
        </div>
        <br />
         <asp:Label ID="Label15" CssClass="TituloMedio" runat="server" Text="Plazas Creadas"></asp:Label><br>
        <br />
        <table style="display:none;" id="dgplazas"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'cveesppl',width:100,align:'center',halign:'center'">Estatus Plaza</th>  
                        <th data-options="field:'cvetpl',width:80,align:'center',halign:'center'">Tipo Plaza</th>  
                        <th data-options="field:'cveadspl',width:100,align:'center',halign:'center'">Clave Centro</th>  
                        <th data-options="field:'descentro',width:300,align:'left',halign:'center'">Centro Trabajo</th>
                        <th data-options="field:'cvepuepl',width:100,align:'center',halign:'center'">Clave Puesto</th>
                        <th data-options="field:'despue',width:350,align:'left',halign:'center'">Puesto</th>                          
                    </tr>
                  </thead>                          
            </table>          
    </div>

      <div id="modalBuscarPuesto" align="center" class="easyui-dialog" style="width:700px;height:500px;padding:3px; overflow:hidden;  background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Puesto" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <table>
            <tr>
                <td align="left"><asp:Label ID="Label1"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                <td align="left"><input type="text" value="" class="easyui-textbox" style="width:450px;" id="txtBusquedaPuesto" /></td>
                <td align="left"> <a id="btnBPuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
            </tr>
        </table>
        <table class="easyui-datagrid" id="tblBusquedaDePuestos" style="height:94%"> 
            <thead>
                <tr>
                    <th data-options="field:'Clave'">Clave</th>
                    <th data-options="field:'Descripcion'">Descripción</th>
                    <th data-options="field:'Codigo_Nivel'">Código Nivel</th>
                    <th data-options="field:'Tipo_Puesto'">Tipo Puesto</th>
                    <th data-options="field:'Grupo_Jerarquico'">Grupo Jerárquico</th>
                    <th data-options="field:'Des_Jerarquico'">Descripción</th>
                   <%-- <th data-options="field:'Tipo_Jornada'">Tipo Jornada</th>--%>
                    <th data-options="field:'Grupo_Laboral'">Grupo Laboral</th>                       
                    <th data-options="field:'Des_Laboral'">Descripción</th>                      
                   <%-- <th data-options="field:'asignahoras',hidden:false">Horas</th>             --%>         
                </tr>
            <thead>
          </table>                                                         
         </div> 

      <div id="modalBuscarSubNivel" align="center" title="Buscar Sub Nivel del Puesto" class="easyui-dialog" style="width:1300px;height:600px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
        <table>
                <tr>
                    <td align="left"><asp:Label ID="Label9"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaForSubNivel" style="width:450px"/></td>
                    <td align="left"><a id="btnBSNivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                </tr>
            </table>             
           <table class="easyui-datagrid" id="tblBusquedaDeForSubNivel" > 
               <thead data-options="frozen:true">
                   <tr>
                       <th data-options="field:'cveniv'">Nivel</th>
                       <th data-options="field:'codniv'">Código Nivel</th>
                       <th data-options="field:'nivant'">Nivel Anterior</th>
                       <th data-options="field:'cvezonns'">Zona</th>
                       <th data-options="field:'cvegmani'">Grupo Mando</th>
                       <th data-options="field:'desgma',hidden:true">desgma</th>  
                       <th data-options="field:'cvegreni'">Responsabilidad</th>
                       <th data-options="field:'desgre',hidden:true">desgre</th>  
                       <th data-options="field:'cvenisni'">Subnivel</th>           
                       <th data-options="field:'desnis',hidden:true">desnis</th>                                      
                 </tr>
                 <thead>
                <%
                    System.Data.DataTable columns = new Utilerias().ejecutarConsultaEnDataTable("select name from sys.columns where object_id = (select object_id from sys.tables where name = 'nivsal') and name not in ('cveniv','codniv','nivant','cvezonns','cvegmani','cvegreni','cvenisni','hojniv','vigini','cadperni','caddedni','cadaponi','identifi','vigfin','fecafe','nomusu','descrip','cadproyec')");                    
                    string cols = "";
                    foreach (System.Data.DataRow dr in columns.Rows)
                    {
                        cols+=dr[0].ToString() + ",";
                        Response.Write("<th data-options=\"field:'" + dr[0].ToString() + "'\">" + dr[0].ToString() + "</th>");                        
                    }
                    Response.Write("<input id='hidColumnasDeSubNivel' type='hidden' value='"+cols.Substring(0,cols.Length - 1)+"' />");
                     %>                                                               
                  <thead>
               </table>                           
    </div>   
      
         <div id="modalSubNivel" align="center" title="Buscar Sub Nivel" class="easyui-dialog" style="width:500px;height:380px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBuscarCveSubNivel" style="width:270px"/></td>
                    <td align="left"><a id="btnBSubNivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBuscarSubNivel"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>
                   </tr>
                  </thead>
            </table>
    </div>



     <div id="modalBuscarPrograma" align="center" title="Buscar Programa" class="easyui-dialog" style="width:700px;height:500px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label37"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaPrograma" style="width:450px"/></td>
                    <td align="left"><a id="btnBPrograma" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDePrograma" style="height:94%"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>
                   </tr>
                  </thead>
            </table>
    </div>

      <div id="modalBuscarAdscripcion" align="center" title="Adscripción" class="easyui-dialog" style="width:700px;height:500px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label13"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaAdscripcion" style="width:450px"/></td>
                    <td align="left"><a id="btnBAdscripcion" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeAdscripcion" style="height:94%"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                        <th data-options="field:'Zona'">Zona</th>         
                   </tr>
                  </thead>
            </table>
    </div>

       <div id="modalBuscarEstruProg" align="center" title="Estructura Programática" class="easyui-dialog" style="width:700px;height:500px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label30"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBuscarEstruProg" style="width:450px"/></td>
                    <td align="left"><a id="btnBEstrucprog" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeEstrucProg" style="height:94%"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>

      <div id="modalBuscarTipoPlaza" title="Tipo de Plazas" class="easyui-dialog" align="center" style="width:700px;height:600px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">        
         <table>
              <tr>
                    <td align="left"><asp:Label ID="Label26"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaTipoPlaza" style="width:450px"/></td>
                    <td align="left"><a id="A2" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarTipoPlaza()">Buscar</a></td>
                </tr>                 
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeTipoPlaza"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                       
                   </tr>
                  </thead>
               </table>                               
    </div> 
      
      <div id="modalBuscarPagaduria" title="Buscar Pagaduría" class="easyui-dialog" align="center" style="width:740px;height:500px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form5" method="post" novalidate>
             <table >
                <tr>
                     <td align="left"><asp:Label ID="Label11"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                     <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBuscarPagaduria" style="width:450px"/></td>
                    <td align="left"><a id="btnBPagaduria" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBusquedaDePagaduria" style="height:94%"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Clave</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                                                
                       <th data-options="field:'Localidad'">Municipio</th>
                    </tr>
                  <thead>
               </table>                    
        </form>                                         
    </div> 

      <div id="modalBuscarGpoMando" title="Buscar Grupo de Mando" class="easyui-dialog" align="center" style="width:500px;height:205px;padding:3px; overflow:hidden;  background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form6" method="post" novalidate>
             <table >
                <tr>
                    <td align="left"><asp:Label ID="Label27"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaGpoMando" style="width:270px"/></td>
                    <td align="left"><a id="btnBGpoMan" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                 </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBusquedaDeGpoMando"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Clave</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                        
                    </tr>
                  <thead>
               </table>                   
        </form>                                         
    </div>    
      
      <div id="modalBuscarNivRes" title="Buscar Nivel de Responsabilidad" class="easyui-dialog"  align="center" style="width:500px;height:205px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form7" method="post" novalidate>
             <table>
                <tr>
                    <td align="left"><asp:Label ID="Label28"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaNivRes" style="width:270px"/></td>
                    <td align="left"><a id="btnBNivRes" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                 </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBusquedaDeNivRes"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Clave</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                        
                    </tr>
                  <thead>
               </table>                   
        </form>                                         
    </div>     
        
      <div id="modalBuscarForISR" title="Buscar ISR" class="easyui-dialog"  align="center" style="width:500px;height:182px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form8" method="post" novalidate>
             <table>
                     <tr>
                        <td align="left"><asp:Label ID="Label29"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                        <td align="left"><input type="text" value="" class="easyui-textbox" style="width:260px;" id="txtBusquedaForISR" /></td>
                        <td align="left"> <a id="btnBisr" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                    </tr>                    
                </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBusquedaDeForISR"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Clave</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                        
                    </tr>
                  <thead>
               </table>                   
        </form>                                         
    </div>  
      
      <div id="modalBuscarPlaza" class="easyui-dialog"  align="center" style="width:600px;height:630px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Plazas" data-options="iconCls:'icon-search',resizable:false,modal:true">                                
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label35" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:150px;" id="cbocampl" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconpl" data-options="editable:false">                                                                                              
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:150px" id="txtvalplaza">
                </td>
                    <td align="Center">
                    <a id="btnBplaza" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
          </table>  
                     <table class="easyui-datagrid" id="tblBusquedaDePlaza"> 
                        <thead>
                           <tr>
                                <th data-options="field:'numplaza'">Num Plaza</th>
                                <th data-options="field:'numemppl'">No Empleado</th>                        
                                <th data-options="field:'hrspla'">Horas</th>                                                       
                                <th data-options="field:'cveesppl'">Estatus</th>                                                       
                               <th data-options="field:'cvetpl',hidden:true">Tipo Plaza</th>                                                       
                            </tr>
                          <thead>
                    </table>                                                                                               
       </div>     
        
        <div id="ModalBuscarCodigoNivel" title="Buscar Código Nivel" class="easyui-dialog"  align="center" style="width:500px;height:231px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form2" method="post" novalidate>
             <table>
                     <tr>
                        <td align="left"><asp:Label ID="Label39"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                        <td align="left"><input type="text" value="" class="easyui-textbox" style="width:260px;" id="txtBusquedaCodNiv" /></td>
                        <td align="left"> <a id="btnBcodNiv" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                    </tr>                    
                </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBuscarCodNiv"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Código</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                        
                       <th data-options="field:'Zona'">Zona</th>                        
                    </tr>
                  <thead>
               </table>                   
        </form>                                         
    </div>     
                         
      <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div>                                            
      </div>
    </form>
</body>
</html>
