<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Proyeccion.aspx.cs" Inherits="FILE_Costeo_Proyeccion" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
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
    <script src="../../jqueryEsy/plugins/jquery.pivotgrid.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>
    <script src="Proyeccion.js?1.8"></script>
     <style type="text/css"> 
        .icon-layout{
            background:url('../imagenes/botones/layout.png') no-repeat center center;
        }

         .auto-style9 {
             width: 136px;
         }

         .auto-style10 {
             height: 26px;
         }

         .auto-style11 {
             width: 204px;
         }
         .auto-style12 {
             height: 26px;
             width: 204px;
         }

   </style>
</head>
<body>
    <form id="form1" runat="server">
      <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">                     
          <div id="pcosteo" style="width:100%; height:100%; padding:0px; " align="Center">              
            <div class="easyui-panel" style="padding:3px; width:100%">                   
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                         
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnProceso">Proyección</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnCubo">Datos Dinámicos</a>
            </div>
              <br />
               <asp:Label ID="lblmov" CssClass="TituloMedio" runat="server" Text=""></asp:Label>   
              <br />             
              <table style="border-spacing: 7px">
                <tr>                    
                    <td align="left"><asp:Label ID="lblplaza"  CssClass="LetraChicaNegrita" runat="server" Text="Plaza:"></asp:Label></td>
                    <td align="left"><input id="txtplaza" class="easyui-textbox " style="width:150px" ></td>
                    <td align="left"><a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a></td>
                </tr>                                                             
                </table>    
             <div class="easyui-accordion" style="width:100%;height:40%; overflow:hidden"> 
                  <div title="Filtros" style="overflow:hidden;  padding:5px;" align="center">
                       <table style="border-spacing: 7px;">               
                         <tr>
                            <td align="left" class="auto-style11"><asp:Label ID="Label39"  CssClass="LetraChicaNegrita" runat="server" Text="Secretarias:"></asp:Label></td>                                        
                            <td align="left" class="auto-style9"><input id="txtcvesecretaria" class="easyui-textbox " value="" data-options="readonly:false" style="width:150px"></td>
                            <td align="left"><input id="txtdessecretaria" class="easyui-textbox " value="" data-options="readonly:false" style="width:500px"></td>
                            <td align="left"><a id="btnsecretaria" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                            <td align="left"><a id="btnlsecretaria" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
                        </tr>                  
                         <tr>
                            <td align="left" class="auto-style12"><asp:Label ID="Label14"  CssClass="LetraChicaNegrita" runat="server" Text="Unidad Responsable:"></asp:Label></td>                                        
                            <td align="left" class="auto-style10"><input id="txtcveur" class="easyui-textbox " value="" data-options="readonly:false" style="width:150px"></td>
                            <td align="left" class="auto-style10"><input id="txtdesur" class="easyui-textbox " value="" data-options="readonly:false" style="width:500px"></td>
                            <td align="left" class="auto-style10"><a id="btnadscripcion" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                            <td align="left" class="auto-style10"><a id="btnlimpiarads" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
                        </tr>                  
                         <tr>
                            <td align="left" class="auto-style11"><asp:Label ID="Label20"  CssClass="LetraChicaNegrita" runat="server" Text="Clave Puesto:"></asp:Label></td>                                        
                            <td align="left"><input id="txtcvepuesto" class="easyui-textbox " value="" data-options="readonly:false" style="width:150px"></td>
                            <td align="left"><input id="txtdespuesto" class="easyui-textbox " value="" data-options="readonly:false" style="width:500px"></td>
                            <td align="left"><a id="btnpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                            <td align="left"><a id="btnlimpiarpuesto" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
                        </tr>                  
                         <tr>
                            <td align="left" class="auto-style11"><asp:Label ID="Label32"  CssClass="LetraChicaNegrita" runat="server" Text="Nivel Salarial:"></asp:Label></td>                                        
                            <td align="left" colspan="2"><input id="txtnivel" class="easyui-textbox " value="" data-options="readonly:true" style="width:150px"><a id="btnnivel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>
                            <td align="left"></td>
                            <td align="left"></td>
                        </tr>
                        </table>     
                  </div>  
                 <div title="Adicionales" style="overflow:hidden;  padding:5px;" align="center">       
                       <table>
                         <tr>
                            <td align="left"><asp:Label ID="Label21"  CssClass="LetraChicaNegrita" runat="server" Text="Quinquenio:"></asp:Label></td>                                        
                            <td align="left">
                                <select class="easyui-combobox "  id="cboquinquenio" style="width:200px" ></select>
                             </td>
                            <td align="left">&nbsp;</td>
                            <td align="left">&nbsp;</td>
                        </tr>                  
                         <tr>
                            <td align="left"><asp:Label ID="Label33"  CssClass="LetraChicaNegrita" runat="server" Text="Sexo:"></asp:Label></td>                                        
                            <td align="left" colspan="3">
                                <asp:RadioButton ID="rbmujer" runat="server" Text="Mujer" CssClass="LetraChicaNegrita"  GroupName="sexo" Checked="True"/>
                                <asp:RadioButton ID="rbhombre" runat="server" Text="Hombre" CssClass="LetraChicaNegrita" GroupName="sexo"/>
                              </td>
                        </tr>                  
                          <tr>
                            <td align="left"><asp:Label ID="Label34"  CssClass="LetraChicaNegrita" runat="server" Text="Tiene Hijos:"></asp:Label></td>                                        
                            <td align="left" colspan="3">
                                <asp:RadioButton ID="rbsi" runat="server" Text="Si" CssClass="LetraChicaNegrita" GroupName="padomad" Checked="True"/>
                                <asp:RadioButton ID="rbno" runat="server" Text="No" CssClass="LetraChicaNegrita"  GroupName="padomad" />
                              </td>
                        </tr>                                        
                          <tr>
                            <td align="left" ><asp:Label ID="Label35"  CssClass="LetraChicaNegrita" runat="server" Text="Tipo Regimen Ipes:"></asp:Label></td>                                        
                            <td align="left" colspan="3"><select class="easyui-combobox "  id="cboTipoRegimen" name="cboTipoPlaza" style="width:200px" ></select></td>
                        </tr>                                        
                          <tr>
                            <td align="left"><asp:Label ID="Label37"  CssClass="LetraChicaNegrita" runat="server" Text="Porcentaje Regimen Ipes:"></asp:Label></td>                                        
                            <td align="left" colspan="3"><select class="easyui-combobox "  id="cboPorcRegimen" style="width:200px" ></select></td>
                        </tr>                                        
                          <tr>
                            <td align="left"><asp:Label ID="Label38"  CssClass="LetraChicaNegrita" runat="server" Text="Porcentaje Voluntario Ipes:"></asp:Label></td>                                        
                            <td align="left" colspan="3"><select class="easyui-combobox "  id="cbovolRegimen" style="width:200px"  ></select></td>
                        </tr>                                        
                          <tr>
                            <td align="left"><asp:Label ID="Label36"  CssClass="LetraChicaNegrita" runat="server" Text="Conceptos Personales:"></asp:Label></td>                                        
                            <td align="left"><input id="txtconceptos" class="easyui-textbox " value="" data-options="readonly:true" style="width:500px" ></td>
                            <td align="left"><a id="btnbind" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a></td>   
                            <td align="left"><a id="btnlimpiarind" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
                        </tr>                                        
                        </table>    
                 </div>          
              </div>   
              <br />              
                   <table id="dgfiltro" class="easyui-datagrid"  style="width:60%; height:35%;"  toolbar="#tbt" data-options="rownumbers: true,singleSelect:true, striped:true">
                     <thead>
                        <tr>   
                            <th data-options="field:'numplaza',width:70,align:'center',halign:'center'">Cantidad</th>
                            <th data-options="field:'secretaria',width:100,align:'center',halign:'center'">Secretaría</th>
                            <th data-options="field:'dessec',width:100,align:'center',halign:'center',hidden: true">descsec</th>
                            <th data-options="field:'uniresp',width:120,align:'center',halign:'center'">Uni. Responsable</th>              
                            <th data-options="field:'desur',width:100,align:'center',halign:'center',hidden: true">descur</th>             
                            <th data-options="field:'puesto',width:100,align:'center',halign:'center'">Puesto</th>
                            <th data-options="field:'despuesto',width:100,align:'center',halign:'center',hidden: true">despue</th>
                            <th data-options="field:'cvenivpl',width:100,align:'center',halign:'center'">Nivel</th>
                            <th data-options="field:'quinquenio',width:100,align:'center',halign:'center',hidden: false">Quinquenio</th>
                            <th data-options="field:'sexo',width:80,align:'center',halign:'center',hidden: false">Sexo</th>
                            <th data-options="field:'hijos',width:80,align:'center',halign:'center',hidden: false">Hijos</th>
                            <th data-options="field:'tiporegimen',width:100,align:'center',halign:'center',hidden: false">Tipo Regimen</th>
                            <th data-options="field:'porcregimen',width:100,align:'center',halign:'center',hidden: false">Porc. Regimen</th>                            
                            <th data-options="field:'volregimen',width:100,align:'center',halign:'center',hidden: false">Vol. Regimen</th>                            
                            <th data-options="field:'conceptos',width:150,align:'center',halign:'center',hidden: false">Conceptos</th>                            
                        </tr> 
                    </thead>        
              </table>
               <div id="tbt" style="height:auto">                                                  
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnAgregar">Agregar</a>                                   
                   <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnEliminar">Eliminar</a>                                   
               </div>  
          </div>          
         <div id="presultado" style="width:100%; height:100%; padding:0px; display:none;"  align="Center">  
             <div class="easyui-panel" style="padding:3px; width:100%">                   
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRresultado">Regresar</a>                                         
            </div>
               <br />
            <div id="tconfig" class="easyui-tabs" style="width: 100%; height: 90%;overflow:hidden;padding:3px;"  data-options="plain:true">                  
                 <div title="Costeo General" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center"> 
                     <table id="dgcosto" style="width:90%; height:90%;"> 
                <thead>
                    <tr>                        
                        <th data-options="field:'Plaza',width:100,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'Organismo',width:100,align:'center',halign:'center'">Organismo</th> 
                        <th data-options="field:'Categoria',width:100,align:'center',halign:'center'">Categoría</th> 
                        <th data-options="field:'DescCategoria',width:300,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'Adscripcion',width:100,align:'center',halign:'center'">Adscripción</th> 
                        <th data-options="field:'DescAdscripcion',width:300,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'UR',width:250,align:'center',halign:'center'">UR</th> 
                        <th data-options="field:'Tipo',width:50,align:'center',halign:'center'">Tipo</th> 
                        <th data-options="field:'Concepto',width:80,align:'center',halign:'center'">Concepto</th> 
                        <th data-options="field:'Gasto',width:70,align:'center',halign:'center'">Gasto</th> 
                        <th data-options="field:'Descripcion',width:300,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'CostoAnual',width:100,align:'right',halign:'center'">Costo Anual</th> 
                        <th data-options="field:'TipoPago',width:130,align:'center',halign:'center'">Tipo Pago</th>                                                 
                    </tr>
                </thead>                   
            </table>
                 </div>                       
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
           <%--  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAestpl">Aceptar</a>      --%>          
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
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarSecretarias" title="Buscar Secretaria" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLsec">Limpiar</a>
                  <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAsec">Aceptar</a>      --%>          
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
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarCentroCosto" title="Buscar Unidad Responsable" class="easyui-dialog" align="center" style="width:740px;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">      
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLcentro">Limpiar</a>
               <%--   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAcentro">Aceptar</a> --%>               
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
                       <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                       <th data-options="field:'Descripcion'">Descripción</th>                                     
                   </tr>
                  </thead>
            </table>
    </div>
          <div id="modalBuscarPuesto" align="center" class="easyui-dialog" style="width:40%;height:643px;padding:0px; background-image: url('../../Imagenes/FONDO1.jpg');"  closed="true" title="Buscar Puesto" data-options="iconCls:'icon-search',resizable:false,modal:true">       
              <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLpuesto">Limpiar</a>
              <%--    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnApuesto">Aceptar</a>        --%>        
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
                    <th data-options="field:'Clave',align:'center',halign:'center'">Clave</th>
                    <th data-options="field:'Descripcion'">Descripción</th>
                    <th data-options="field:'Codigo_Nivel',width:100,align:'center',halign:'center'">Código Nivel</th>
                </tr>
           </thead> 
          <%-- <thead>
                <tr>
                    
                    <th data-options="field:'Tipo_Puesto',width:80,align:'center',halign:'center'">Tipo Puesto</th>
                    <th data-options="field:'Grupo_Jerarquico',width:100,align:'center',halign:'center'">Grupo Jerárquico</th>
                    <th data-options="field:'Des_Jerarquico',width:200,align:'left',halign:'center'">Descripción</th>
                    <th data-options="field:'Tipo_Jornada',hidden:false">Tipo Jornada</th>
                    <th data-options="field:'Grupo_Laboral',hidden:false">Grupo Laboral</th>                       
                    <th data-options="field:'Des_Laboral',hidden:false">Descripción</th>                      
                    <th data-options="field:'asignahoras',hidden:true">Horas</th>                      
                </tr>
           </thead> --%>
          </table>        
      </div> 
         <div id="modalBuscarTipoPlaza" title="Tipo de Plazas" class="easyui-dialog" align="center" style="width:700px;height:643px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">        
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
        <div id="modalBuscarSubNivel" align="center" title="Buscar Sub Nivel del Puesto" class="easyui-dialog" style="width:50%;height:643px;padding:3px; background-image: url('../../Imagenes/FONDO1.jpg');" closed="true" data-options="iconCls:'icon-search',resizable:false,modal:true">             
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
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wind" closed="true" align="center">  
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
            <table id="dgind" style="width:100%; height:555px; display:none;"> 
                <thead>
                    <tr>   
                         <th data-options="field:'chk',checkbox:true"></th>                        
                        <th data-options="field:'Clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'Descripcion',width:350,align:'left'">Descripcion</th> 
                        <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>                           
                    </tr>
                </thead>                   
            </table>                                                           
        </div>  
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" closed="true" title="Buscar Plazas">    
            <div class="easyui-panel" style="padding:3px; width:100%">                               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLFiltro">Limpiar</a>               
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
                <table id="dgplaza" class="easyui-datagrid" style="width:100%;height:576px"> 
                <thead>
                    <tr>                        
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