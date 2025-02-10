<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Costeo.aspx.cs" Inherits="FILE_Costeo_Costeo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	

    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">      

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>
    <script src="Costeo.js?1.13"></script>
    <style type="text/css">
        .auto-style8 {
            height: 25px;
            width: 53px;
        }
        </style>
     <style type="text/css"> 
        .icon-layout{
            background:url('../imagenes/botones/layout.png') no-repeat center center;
        }
        .datagrid-header-check input{
        display: none;
    }

   </style>
</head>
<body>
    <form id="form1" runat="server">
      <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">                     
          <div id="pcosteo" style="width:100%; height:100%; padding:0px; "  align="Center">              
            <div class="easyui-panel" style="padding:3px; width:100%">                   
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                         
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnProceso">Costeo</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:false" id="btnCubo">Datos Dinámicos</a>                                                
            </div>
              <br />
               <asp:Label ID="lblmov" CssClass="TituloMedio" runat="server" Text=""></asp:Label>   
              <br />
              <br />
              <%--<div id="pmenucostos" class="easyui-panel" style="width:30%; margin-top:20px;  padding:4px" align="Center">          --%>
                  <a href="#" id="btnplazas" class="easyui-linkbutton" data-options="plain:false,toggle:true,group:'costeo',selected:true, iconCls:'empleados',size:'large',iconAlign:'top'" style="width:150px;height:80px; font-weight: bold;font-size: x-large;">Plazas</a>
                  <a href="#" id="btnpersonalizado" class="easyui-linkbutton" data-options="false:false,toggle:true,group:'costeo',iconCls:'perzonalizar',size:'large',iconAlign:'top'" style="width:150px;height:80px; font-weight: bold;font-size: x-large;">Personalizado</a>                  
             <%-- </div>--%>
              <br />
             <div style="width:100%; height:75%; overflow-y:auto;">
           <table style="border-spacing: 7px;">               
             <tr>
                <td align="left" colspan="4"> <asp:Label ID="Label8" CssClass="LetraChicaNegrita"  runat="server" Text="Costear Plazas Canceladas:"></asp:Label><input type="checkbox" id="chkplazas"></td>                                        
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="lblplaza"  CssClass="LetraChicaNegrita" runat="server" Text="Plaza:"></asp:Label></td>                                        
                <td align="left"><input id="txtplaza" class="easyui-textbox " value="" style="width:600px" ></td>
                <td align="left"><a id="btnbplazas" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" >Buscar</a></td>
                <td align="left"><a id="btnlplazas" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label39"  CssClass="LetraChicaNegrita" runat="server" Text="Secretarias:"></asp:Label></td>                                        
                <td align="left"><input id="txtcvesecretaria" class="easyui-textbox " value="" data-options="readonly:true" style="width:600px"></td>
                <td align="left"><a id="btnsecretaria" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnlsecretaria" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                  
             <tr>
                <td align="left">&nbsp;</td>                                        
                <td align="left"><input  class="easyui-textbox"  style="width:600px;height:50px;" id="txtdessecretaria" data-options="readonly:true" labelPosition="top" multiline="true" ></input></td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label14"  CssClass="LetraChicaNegrita" runat="server" Text="Unidad Responsable:"></asp:Label></td>                                        
                <td align="left"><input id="txtcveur" class="easyui-textbox " value="" data-options="readonly:true" style="width:600px"></td>
                <td align="left"><a id="btnadscripcion" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnlimpiarads" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                  
             <tr>
                <td align="left">&nbsp;</td>                                        
                <td align="left"><input  class="easyui-textbox"  style="width:600px;height:50px;" id="txtdesur" data-options="readonly:true" labelPosition="top" multiline="true" ></td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label40"  CssClass="LetraChicaNegrita" runat="server" Text="Activos/Inactivos:"></asp:Label></td>                                        
                <td align="left">
                    <select class="easyui-combobox "  id="cbocalpla" style="width:200px" name="D1" ></select></td>
                 <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label6"  CssClass="LetraChicaNegrita" runat="server" Text="Estatus de Plaza:"></asp:Label></td>                                        
                <td align="left"><input id="txtcveestpl" class="easyui-textbox " value="" data-options="readonly:true" style="width:600px"></td>
                 <td align="left"><a id="btnestatuspl" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                <td align="left"><a id="btnlimpiarestpl" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" >Limpiar</a></td>
            </tr>                  
             <tr>
                <td align="left">&nbsp;</td>                                        
                <td align="left"><input  class="easyui-textbox"  style="width:600px;height:50px;" id="txtdesestpl" data-options="readonly:true" labelPosition="top" multiline="true" ></td>
                 <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label20"  CssClass="LetraChicaNegrita" runat="server" Text="Clave Puesto:"></asp:Label></td>                                        
                <td align="left"><input id="txtcvepuesto" class="easyui-textbox " value="" data-options="readonly:true" style="width:600px"></td>
                <td align="left"><a id="btnpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnlimpiarpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>                  
             <tr>
                <td align="left">&nbsp;</td>                                        
                <td align="left"><input  class="easyui-textbox"  style="width:600px;height:50px;" id="txtdespuesto" data-options="readonly:true" labelPosition="top" multiline="true" ></td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
            </tr>                  
             <tr>
                <td align="left"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Nivel Salarial:"></asp:Label></td>                                        
                <td align="left"><input id="txtnivel" class="easyui-textbox " value="" data-options="readonly:true" style="width:100px">
                    <a id="btnnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"></td>
                <td align="left"></td>
            </tr>
             <tr>
                <td align="left"><asp:Label ID="Label41"  CssClass="LetraChicaNegrita" runat="server" Text="Plaza/Conceptos:"></asp:Label></td>                                        
                <td align="left"><input id="txtconceptos" class="easyui-textbox " value="" data-options="readonly:true" style="width:600px"></td>
                <td align="left"><a id="btnconceptos" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                <td align="left"><a id="btnlimpiarconceptos" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
            </tr>
            </table>                      
              </div>            
          </div>          

    </div>
        <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
        <div id="modalBuscarEstatusPla" title="Buscar Estatus de la Plaza" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLestpl">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAestpl">Aceptar</a>                
         </div>       
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label3"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaEstatusPla" style="width:450px"/></td>
                    <td align="left"><a id="btnbEstpl" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeEstatusPla" style="width:100%; height:540px;"> 
                   <thead>
                   <tr>
                       <th data-options="field:'chk',checkbox:true"></th>    
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarSecretarias" title="Buscar Secretaria" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLsec">Limpiar</a>
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAsec">Aceptar</a>                
             </div>                            
              <table>
               <tr>
                    <td align="left"><asp:Label ID="Label5"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaSecretarias" style="width:450px"/></td>
                    <td align="left"><a id="btnbSec" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeSecretarias" style="width:100%; height:540px;"> 
                   <thead>
                   <tr>
                       <th data-options="field:'chk',checkbox:true"></th>                        
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarCentroCosto" title="Buscar Unidad Responsable" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLcentro">Limpiar</a>
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAcentro">Aceptar</a>                
             </div> 
          <table>
               <tr>
                    <td align="left"><asp:Label ID="Label13"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaCentroCosto" style="width:450px"/></td>
                    <td align="left"><a id="btnbcentrotrabajo" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
                </tr>               
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeCentroCosto" style="width:100%; height:540px;"> 
                   <thead>
                   <tr>
                       <th data-options="field:'chk',checkbox:true"></th>
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarPuesto" align="center" class="easyui-dialog" style="width:40%;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Puesto" data-options="iconCls:'icon-search',resizable:false,modal:true">       
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLpuesto">Limpiar</a>
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnApuesto">Aceptar</a>                
             </div> 
          <table>
            <tr>
                <td align="left"><asp:Label ID="Label1"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                <td align="left"><input type="text" value="" class="easyui-textbox" style="width:450px;" id="txtBusquedaPuesto" /></td>
                <td align="left"> <a id="btnbpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a></td>
            </tr>
        </table>
        <table class="easyui-datagrid" id="tblBusquedaDePuestos" style="width:100%; height:540px;"> 
           <thead data-options="frozen:true">
                <tr>
                    <th data-options="field:'chk',checkbox:true"></th>
                    <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                    <th data-options="field:'Descripcion'">Descripción</th>
                    <th data-options="field:'Codigo_Nivel',width:100,align:'center',halign:'center'">Código Nivel</th>
                </tr>
           </thead>        
          </table>        
      </div> 
         <div id="modalBuscarTipoPlaza" title="Tipo de Plazas" class="easyui-dialog" align="center" style="width:700px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">        
         <table>
              <tr>
                    <td align="left"><asp:Label ID="Label26"  CssClass="LetraChicaNegrita" runat="server" Text="Valor a Buscar:"></asp:Label></td>
                    <td align="left"><input type="text" value="" class="easyui-textbox" id="txtBusquedaTipoPlaza" style="width:450px"/></td>
                    <td align="left"><a id="btnbtipopl" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" onclick="listarTipoPlaza()">Buscar</a></td>
                </tr>                 
            </table> 
            <table class="easyui-datagrid" id="tblBusquedaDeTipoPlaza" style="width:100%; height:570px;"> 
                   <thead>
                   <tr>
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                       
                   </tr>
                  </thead>
               </table>                               
    </div> 
        <div id="modalBuscarSubNivel" align="center" title="Buscar Sub Nivel del Puesto" class="easyui-dialog" style="width:50%;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">             
              <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocolumnas"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cbocondicion" data-options="editable:false">                                                                                                                                                                         
                                 <option value="=">Exacta</option>
                               <option value="like">Aproximada</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input type="text" value="" class="easyui-textbox" id="txtBusquedaForSubNivel" style="width:250px"/>
                      </td>
                      <td align="Center">
                        <a id="btnbnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true" >Buscar</a>
                     </td>
                 </tr>                  
               </table>        
           <table class="easyui-datagrid" id="tblBusquedaDeForSubNivel" style="height:95%" > 
               <thead data-options="frozen:true">
                   <tr>
                       <th data-options="field:'cveniv',align:'center',halign:'center'">Nivel</th>
                       <th data-options="field:'codniv',align:'center',halign:'center'">Código Nivel</th>
                       <th data-options="field:'nivant',align:'center',halign:'center'">Nivel Anterior</th>
                       <th data-options="field:'cvezonns',align:'center',halign:'center'">Zona</th>
                       <th data-options="field:'cvegmani',align:'center',halign:'center'">Grupo Mando</th>
                       <th data-options="field:'desgma',hidden:true">desgma</th>  
                       <th data-options="field:'cvegreni',align:'center',halign:'center'">Responsabilidad</th>
                       <th data-options="field:'desgre',hidden:true">desgre</th>  
                       <th data-options="field:'cvenisni',align:'center',halign:'center'">Subnivel</th>           
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
         <div class="easyui-dialog" style="width:70%;height:600px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;"  id="wind" closed="true" align="center">  
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLSelInd">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnASelInd">Aceptar</a>                
             </div>                            
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>  
         <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">              
             <div data-options="region:'north'" style="border-style: none; width:100%; height:50%; padding:3px; overflow:hidden;" align="center"> 
                  <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">  
                      <div id="p" data-options="region:'west'" style="width:20%;padding:3px; overflow:hidden;" align="center">
                          <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                              <asp:Label ID="Label16" CssClass="LetraChicaNegrita"  runat="server" Text="Todos:"></asp:Label><input type="checkbox" id="chktodos">
                              <ul class="easyui-tree" id="tplazas" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                          </div> 
                      </div>
                      <div data-options="region:'center'" style="width:80%;padding:3px; overflow:hidden;" align="center"> 
                           <table id="dgind" style="width:100%; height:100%; display:none;"> 
                             <thead>
                              <tr>
                                <th data-options="field:'chk',checkbox:true"></th>              
                                <%--<th data-options="field:'chk',width:50,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}"></th>           --%>
                                <th data-options="field:'Clave',width:65,align:'center',halign:'center'">Clave</th>
                                <th data-options="field:'Descripcion',width:270,align:'left'">Descripcion</th> 
                                <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>                           
                             </tr>
                            </thead>                   
                          </table>    
                     </div>
                </div>
            </div>
            <div data-options="region:'south'" style="border-style: none; width:100%; height:50%; padding:0px; overflow:hidden;" >  
                <div class="easyui-panel" style="padding:3px; width:100%">   
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnAgregar">Agregar</a>                           
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnEliminar">Eliminar</a>                        
                </div>                   
                  <table id="dgconceptos" class="easyui-datagrid"  style="width:100%; height:68%;" data-options="rownumbers: true,singleSelect:true, striped:true">
                    <thead>
                        <tr>
                            <th data-options="field:'Conceptos',width:580,align:'left',halign:'center',editor:'textbox'">Conceptos</th>
                        </tr>
                    </thead>
                </table>  
            </div>                                    
         </div>                                                                  
        </div>  
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" closed="true" title="Buscar Plazas" align="Center">    
            <div class="easyui-panel" style="padding:3px; width:100%">                               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLPlazas">Limpiar</a>                  
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAPlazas">Aceptar</a>                
         </div>         
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocam"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cbocon" data-options="editable:false">                                                                                                                                                                         
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
                </div>                          
                <table id="dgplaza" class="easyui-datagrid" style="width:100%;height:580px"> 
                <thead>
                    <tr>    
                        <th data-options="field:'chk',checkbox:true"></th>                    
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center',sortable:true">Plaza</th>  
                        <th data-options="field:'numemppl',width:80,align:'center',halign:'center',sortable:true">Empleado</th>                         
                        <th data-options="field:'rfccompl',width:120,align:'center',halign:'center',sortable:true">R.F.C.</th>  
                        <th data-options="field:'nomcompl',width:350,align:'left',halign:'center',sortable:true">Nombre</th>                                                 
                    </tr>
                </thead>                   
            </table>                      
        </div> 
    </form>
</body>
</html>
