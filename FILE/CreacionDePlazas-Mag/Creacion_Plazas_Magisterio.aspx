<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Creacion_Plazas_Magisterio.aspx.cs" Inherits="FILE_CreacionDePlazas_Creacion_Plazas_Magisterio" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
    <link rel="stylesheet" type="text/css" href="../../styles/style-creacion-de-plazas.css" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>    
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>     
    <script src="../../Scripts/jquery-Mask.js"></script>  
     <script type="text/javascript" src="CreacionPlazasMagisterio.js?1.1"></script>
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
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="Creacion de plazas"></asp:Label><br>
                    </td>
                </tr>                
            </table>
          <br />
         <div class="easyui-panel" style="width:20%; margin-top:20px;  padding:4px" align="Center">                        
           <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                         <a id="aNormal" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'empleados',size:'large',iconAlign:'top'" style="width:100px" >Normal</a>
                        <a id="aSustituta" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'sustitutos',size:'large',iconAlign:'top'" style="width:100px" >Sustituta</a>
                       <a id="aHonorarios" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'honorarios',size:'large',iconAlign:'top'" style="width:100px" >Asimilados</a>
                      <%--   <a id="aJubilados" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'jubilados',size:'large',iconAlign:'top'" style="width:100px" >Jubilados</a>
                        <a id="aNoEmpleados" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'noempleados',size:'large',iconAlign:'top'" style="width:100px" >No Empleados</a>           --%>                              
                  </td>
              </tr>                        
        </table>                  
         </div>        
      </div>
      <div id="dinicial" style="width:100%; height:100%; padding:0px; display:none" align="Center">              
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
                    <td align="left"><asp:Label ID="Label2"  CssClass="LetraChicaNegrita" runat="server" Text="No. de Plaza:"></asp:Label></td>
                    <td align="left" colspan="4"><input id="txtNoPlazas" class="easyui-numberbox " style="width:150px" precision="" value=""></input>
                        <asp:Label ID="lblplazas"  CssClass="SubTitulo" runat="server" Text=""></asp:Label>
                    </td>
                </tr>                        
                <tr>
                    <td align="left"><asp:Label ID="Label3"  CssClass="LetraChicaNegrita" runat="server" Text="Plaza Anterior:"></asp:Label></td>
                    <td align="left" colspan="2"><input id="txtPlazaAnt" class="easyui-textbox " value="" style="width:150px" ></input></td>
                    <td align="left"><asp:Label ID="Label34"  CssClass="LetraChicaNegrita" runat="server" Text="No. de Autorización:"></asp:Label></td>
                    <td align="left"><input id="txtNoAutorizacion" class="easyui-textbox " value="" style="width:150px" ></td>
                </tr>                                                             
                <tr>
                    <td align="left"><asp:Label ID="Label7"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Pago:"></asp:Label></td>
                    <td align="left">                                
                            <select class="easyui-combobox "  id="cboTipoPago" name="cboTipoPago" style="width:150px"  data-options="valueField:'clave',textField:'nombre', editable:false">
                                <option value="Q">QUINCENAL</option>
                                <option value="D">DIAS</option>                                     
                            </select></td>
                    <td align="left" colspan="2"><asp:Label ID="Label31"  CssClass="LetraChicaNegrita" runat="server" Text="Estatus Inicial:"></asp:Label></td>
                    <td align="left"><select class="easyui-combobox "  id="cbovacancia" name="cbovacancia" style="width:215px" ></select></td>
                </tr>                        
               <tr>
                    <td align="left"><asp:Label ID="Label4"    CssClass="LetraChicaNegrita" runat="server" Text="Vigencia Inicial:"></asp:Label></td>
                    <td align="left"><input type="text" id="dtpVigIni" name="dtpVigIni" class="easyui-textbox" style="width:150px" /></td>                    
                    <td align="left" colspan="2"><asp:Label ID="Label5"  CssClass="LetraChicaNegrita" runat="server" Text="Vigencia Final:"></asp:Label></td>
                    <td align="left"><input type="text" id="dtpVigFin" name="dtpVigFin" class="easyui-textbox " style="width:150px" /></td>
                </tr>                                                      
                </table>           
          <br />                                                  
          <table style="border-spacing: 7px">               
             <tr>
                <td align="left"><asp:Label ID="Label16"  CssClass="LetraChicaNegrita" runat="server" Text="Pagaduría:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvepagad" class="easyui-textbox " value="" data-options="readonly:false" style="width:100px" ></td>
                <td align="left"><input id="txtdespagad" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
               <td align="left"><a id="btnlpagad" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  onclick="LimpiarValores('zp')">Limpiar</a></td>
                <td align="left"><a id="btnbpagad" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDePagaduria()">Buscar</a>  </td>
            </tr>                  
              <tr>
                <td align="left"><asp:Label ID="Label14"  CssClass="LetraChicaNegrita" runat="server" Text="Unidad Responsable:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcveur" class="easyui-textbox " value="" data-options="readonly:false" style="width:100px" ></td>
                <td align="left"><input id="txtdesur" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
               <%-- <td align="left"><a id="btnlimpiarads" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  onclick="LimpiarValores('ur')">Limpiar</a></td>
                <td align="left"><a id="btnadscripcion" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDeCentroCosto()">Buscar</a>  </td>--%>
            </tr>                                        
             <tr>
                <td align="left"><asp:Label ID="Label6"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo de Plaza:"></asp:Label></td>                                        
                <td align="left" colspan="4"><select class="easyui-combobox "  id="cboTipoPlaza" name="cboTipoPlaza" style="width:509px" ></select></td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>   
            </tr>                                                                 
              <tr>
                <td align="left"><asp:Label ID="Label20"  CssClass="LetraChicaNegrita" runat="server" Text="Clave Puesto:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvepuesto" class="easyui-textbox " value="" data-options="readonly:false" style="width:100px" ></td>
                <td align="left"><input id="txtdespuesto" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                <td align="left"><a id="btnlimpiarpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" onclick="LimpiarValores('pue')">Limpiar</a></td>
                <td align="left"><a id="btnpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDePuesto()">Buscar</a></td>   
            </tr>                                        
            <tr>
                <td align="left"><asp:Label ID="Label21"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo Puesto:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvetippue" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>  
                <td align="left" colspan="5"><asp:Label ID="Label22"  CssClass="LetraChicaNegrita" runat="server" Text="Hora/Jornada:"></asp:Label>
                    <input id="txthora" class="easyui-textbox " value="" data-options="readonly:true" style="width:80px" >&nbsp; <asp:Label ID="Label33"  CssClass="LetraChicaNegrita" runat="server" Text="No. Horas:"></asp:Label>
                    <input id="txthoras" class="easyui-textbox " value="" data-options="readonly:false" style="width:80px" ></td>                                        
                <td align="left" class="auto-style1">&nbsp;</td>                                        
            </tr>                                                     
            <tr>
                <td align="left"><asp:Label ID="Label23"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Jerarquico:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvegpojer" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left"><input id="txtdesgpojer" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>                                            
            </tr> 
            <tr>
                <td align="left"><asp:Label ID="Label24"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Laboral:"></asp:Label></td>                                        
                <td align="left" colspan="1"><input id="txtcvegpolab" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left"><input id="txtdesgpolab" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>      
            </tr> 
            <tr>
                <td align="left"><asp:Label ID="Label10"  CssClass="LetraChicaNegrita" runat="server" Text="Código de Nivel:"></asp:Label></td>
                <td align="left"><input id="txtcodniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left" colspan="2"><asp:Label ID="Label25"  CssClass="LetraChicaNegrita" runat="server" Text="Zona:"></asp:Label><input id="txtzona" class="easyui-textbox " value="" data-options="readonly:true" style="width:80px" ></td>                
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Nivel Salarial:"></asp:Label></td>
                <td align="left"><input id="txtnivel" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left" colspan="2"><a id="btnbsubnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarSubnivel()">Buscar</a></td>                
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label17"  CssClass="LetraChicaNegrita" runat="server" Text="Grupo Mando:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtcvegrupoman" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left"><input id="txtdesgrupoman" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                <%--<td align="left"><a id="btnlgpoman" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  onclick="LimpiarValores('gm')">Limpiar</a></td>
                <td align="left"><a id="btnbgpoman" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDeGpoMando()">Buscar</a>  </td>--%>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label18"  CssClass="LetraChicaNegrita" runat="server" Text="Responsabilidad:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtcvenivelresp" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
                <td align="left"><input id="txtdesnivelresp" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
                <%--<td align="left"><a id="btnlnivelresp" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  onclick="LimpiarValores('nr')">Limpiar</a></td>
                    <td align="left"><a id="btnbnivelresp" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDeNivRes()">Buscar</a>  </td>--%>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server" Text="Código de SubNivel:"></asp:Label></td>
                <td align="left" colspan="1"><input id="txtsubniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px"></td>
               <td align="left"><input id="txtdessubniv" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
            </tr>                                                            
            <tr>
                <td align="left"><asp:Label ID="Label19"  CssClass="LetraChicaNegrita" runat="server" Text="Formula ISR:"></asp:Label></td>
               <td align="left" colspan="1"><input id="txtcveforisr" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px" ></td>
               <td align="left"><input id="txtdesforisr" class="easyui-textbox " value="" data-options="readonly:true" style="width:400px" ></td>
               <td align="left"><a id="btnlforisr" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true"  onclick="LimpiarValores('isr')">Limpiar</a></td>
               <td align="left"><a id="btnbforisr" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="mostrarBuscadorDeForISR()">Buscar</a>  </td>
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

      <div id="modalBuscarPuesto" align="center" class="easyui-dialog" style="width:700px;height:642px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Puesto" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <table>
            <tr>
                <td align="left"><asp:Label ID="Label1"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                <td align="left"><input type="text" value="" class="easyui-textbox" style="width:450px;" id="txtBusquedaPuesto" /></td>
                <td align="left"> <a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true"  onclick="listarPuestos()">Buscar</a></td>
            </tr>
        </table>
        <table class="easyui-datagrid" id="tblBusquedaDePuestos" style="width:100%; height:570px;"> 
            <thead>
                <tr>
                    <th data-options="field:'Clave'">Clave</th>
                    <th data-options="field:'Descripcion'">Descripción</th>
                    <th data-options="field:'Codigo_Nivel'">Código Nivel</th>
                    <th data-options="field:'Tipo_Puesto'">Tipo Puesto</th>
                    <th data-options="field:'Grupo_Jerarquico'">Grupo Jerárquico</th>
                    <th data-options="field:'Des_Jerarquico'">Descripción</th>
                    <th data-options="field:'Tipo_Jornada'">Tipo Jornada</th>
                    <th data-options="field:'Grupo_Laboral'">Grupo Laboral</th>                       
                    <th data-options="field:'Des_Laboral'">Descripción</th>                      
                    <th data-options="field:'asignahoras',hidden:false">Horas</th>                      
                </tr>
            <thead>
          </table>                                                         
         </div> 

      <div id="modalBuscarSubNivel" align="center" title="Buscar Sub Nivel del Puesto" class="easyui-dialog" style="width:70%;height:600px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
        <table>
                <tr>
                    <td align="left"><asp:Label ID="Label9"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaForSubNivel" style="width:450px"/></td>
                    <td align="left"><a id="A6" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarForSubNivel()">Buscar</a></td>
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
      
      <div id="modalBuscarCentroCosto" align="center" title="Unidad Responsable" class="easyui-dialog" style="width:700px;height:280px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label13"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaCentroCosto" style="width:450px"/></td>
                    <td align="left"><a id="A1" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarCentroCosto()">Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeCentroCosto"> 
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
      
      <div id="modalBuscarPagaduria" title="Buscar Pagaduría" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form5" method="post" novalidate>
             <table >
                <tr>
                     <td align="left"><asp:Label ID="Label11"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                     <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaPagaduria" style="width:450px"/></td>
                    <td align="left"><a id="A3" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true"onclick="listarPagaduria()">Buscar</a></td>
                </tr>
            </table> 
           <table class="easyui-datagrid" id="tblBusquedaDePagaduria" style="width:100%; height:570px;"> 
                   <thead>
                   <tr>
                        <th data-options="field:'Clave'">Clave</th>
                        <th data-options="field:'Descripcion'">Descripción</th>                          
                        <th data-options="field:'Zona'">Localidad</th>
                        <th data-options="field:'Localidad'">Localidad</th>
                        <th data-options="field:'Centcosto',hidden:true">centro costo</th>
                       <th data-options="field:'Descentro',hidden:true">des centro costo</th>
                    </tr>
                  <thead>
               </table>                    
        </form>                                         
    </div> 

      <div id="modalBuscarGpoMando" title="Buscar Grupo de Mando" class="easyui-dialog" align="center" style="width:500px;height:157px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">
        <form id="Form6" method="post" novalidate>
             <table >
                <tr>
                    <td align="left"><asp:Label ID="Label27"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaGpoMando" style="width:270px"/></td>
                    <td align="left"><a id="A4" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarGpoMando()">Buscar</a></td>
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
                    <td align="left"><a id="A5" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarNivRes()">Buscar</a></td>
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
                        <td align="left"> <a id="A8" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true"  onclick="listarForISR()">Buscar</a></td>
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
      
      <div id="modalBuscarPlaza" class="easyui-dialog"  align="center" style="width:600px;height:629px;padding:3px; overflow:hidden; background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Plazas" data-options="iconCls:'icon-search',resizable:false,modal:true">                                
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label35" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:150px;" id="cbcampos" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbcondicion" data-options="editable:false">                                                                                              
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:150px" id="txtvalor">
                </td>
                    <td align="Center">
                    <a id="btnBplaza" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
          </table>  
                     <table class="easyui-datagrid" id="tblBusquedaDePlaza" style="width:100%; height:95%"> 
                        <thead>
                           <tr>
                                <th data-options="field:'numplaza'">Num Plaza</th>
                                <th data-options="field:'numemppl'">No Empleado</th>                        
                                <th data-options="field:'hrspla'">Horas</th>                                                       
                                <th data-options="field:'cveesppl'">Estatus</th>                                                       
                            </tr>
                          <thead>
                    </table>                                                                                               
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
