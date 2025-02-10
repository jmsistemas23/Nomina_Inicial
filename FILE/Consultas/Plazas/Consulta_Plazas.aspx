<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Plazas.aspx.cs" Inherits="FILE_Consultas_Consulta_Plazas" %>

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
    <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="Consulta_Plazas.js?0.6"></script>  
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
        .auto-style4 {
        }
        .auto-style5 {
            height: 26px;
            width: 163px;
        }
        .auto-style6 {
            width: 163px;
        }
        .auto-style7 {
            height: 26px;
            width: 170px;
        }
        .auto-style8 {
            width: 170px;
        }
        .auto-style9 {
            width: 329px;
        }
        </style>
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:98%; overflow-x: hidden;overflow-y: hidden;" align="center">     
         <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>                                      
         </div> 
         <br />
      <div id="cc" class="easyui-layout" style="width:90%;height:90%;">
          <div data-options="region:'west',split:true,hideCollapsedContent:false,collapsed:true"  title="Menu" style="width:11%; height:100%; padding:3px; overflow:auto;" align="center"> 
             <table>                                     
                    <tr id="tbtnhistmov"><td align="center"><a id="btnhistmov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Movimientos</a></td></tr>
                    <tr id="tbtnhistplaza"><td align="center"><a id="btnhistplaza" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de la Plaza</a></td></tr>
                    <tr id="tbtnhistpagos"><td align="center"><a id="btnhistpagos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Pagos</a></td></tr>
                    <tr id="tbtnhistpagesp"><td align="center"><a id="btnhistpagesp" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Mov. Especiales</a></td></tr>
                    <tr id="tbtnhistinc"><td align="center"><a id="btnhistinc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Incidencias</a></td></tr>
                    <tr id="tbtnhistter"><td align="center"><a id="btnhistter" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Terceros</a></td></tr>
                    <tr id="tbtnhistnomina"><td align="center"><a id="btnhistnomina" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Detalle de Nómina</a></td></tr>                
             </table>
          </div>
          <div data-options="region:'center'" style="width:85%; height:100%; padding:3px; overflow-x: auto;overflow-y: auto;" align="center" >      
               <br />
              <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Datos de la Plaza</asp:Label>   
               <br />
              <br />   
              <table>
                <tr>              
                  <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">No. Plaza:</asp:Label></td>
                  <td align="left" class="auto-style4"><input  class="easyui-textbox"  style="width:100px;" id="txtplaza" data-options="readonly:true" value=""></input></td>                            
                    <td align="left">
                        <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">No. Empleado:</asp:Label>
                    </td>
                    <td align="left">
                        <input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true"></td>
               </tr>           
               <tr>              
                  <td align="left"><asp:Label ID="Label61" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                  <td align="left" colspan="3" class="auto-style4"><input  class="easyui-textbox" id="txtnombre" style="width:345px;" data-options="readonly:true" value=""></td>                                                               
              </tr>          
               <tr>              
                  <td align="left">
                    <asp:Label ID="Label45" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label>
                   </td>
                  <td align="left" class="auto-style4">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtviginicial" data-options="readonly:true"></td>                                             
                   <td align="left">
                    <asp:Label ID="Label46" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label>
                   </td>
                   <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtvigfinal" data-options="readonly:true"></td>
              </tr>          
               <tr>              
                  <td align="left">
                    <asp:Label ID="Label62" CssClass="LetraChicaNegrita" runat="server">Vig. Ini. Ultimo. Mov:</asp:Label>
                   </td>
                  <td align="left" class="auto-style4">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtviginicialum" data-options="readonly:true"></td>                                             
                   <td align="left">
                    <asp:Label ID="Label63" CssClass="LetraChicaNegrita" runat="server">Vig. Fin. Ultimo Mov:</asp:Label>
                   </td>
                   <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtvigfinalum" data-options="readonly:true"></td>
              </tr>          
               </table>
              <table style="width: 722px">              
               <tr>              
                  <td align="left">
                      &nbsp;</td>
                  <td align="left">
                      &nbsp;</td>              
                  <td align="left">
                      &nbsp;</td>              
                  <td align="left">
                      &nbsp;</td>              
              </tr>
               <tr>              
                  <td align="left">
                    <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Estatus:</asp:Label>
                   </td>
                  <td align="left" colspan="3">
                    <input  class="easyui-textbox"  style="width:551px;" id="txtestatus" data-options="readonly:true"></td>              
              </tr>
               <tr>              
                  <td align="left">
                    <asp:Label ID="Label55" CssClass="LetraChicaNegrita" runat="server">Tipo de Plaza:</asp:Label>
                   </td>
                  <td align="left" colspan="3">
                    <input  class="easyui-textbox"  style="width:549px;" id="txttipoplaza" data-options="readonly:true"></td>              
              </tr>
               <tr>              
                  <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Cve. Presupuestal:</asp:Label></td>
                  <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtestprog" data-options="readonly:true"></td>              
              </tr>
               <tr>              
                  <td align="left"><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Adscripción:</asp:Label></td>
                  <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtadscripcion" data-options="readonly:true"></input></td>              
              </tr>
               <tr>              
                  <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
                  <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtpagaduria" data-options="readonly:true"></td>              
              </tr>
               <tr>              
                  <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Puesto:</asp:Label></td>
                  <td align="left" colspan="3"></input><input  class="easyui-textbox"  style="width:550px;" id="txtpuesto" data-options="readonly:true"></td>              
              </tr>
              <tr>                            
                  <td align="left">
                   <asp:Label ID="Label56" CssClass="LetraChicaNegrita" runat="server">Puesto Anterior:</asp:Label></td>
                  <td align="left" colspan="3">
                    <input  class="easyui-textbox"  style="width:549px;" id="txtpuestoant" data-options="readonly:true"></td>                  
              </tr>
              </table>            
              <table style="width: 777px; height: 167px;">
               <tr>
                <td align="left" class="auto-style5">
                    <asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Tipo Pago:</asp:Label>
                </td>
                <td align="left" class="auto-style1">
                    <input  class="easyui-textbox"  style="width:200px;" id="txttippago" data-options="readonly:true"></td>
                <td align="left" class="auto-style7" colspan="2">
                    <asp:Label ID="Label60" CssClass="LetraChicaNegrita" runat="server">Nivel Salarial:</asp:Label>
                   </td>
                <td align="left" class="auto-style1">
                    <input  class="easyui-textbox"  style="width:200px;" id="txtnivel" data-options="readonly:true"></td>
            </tr>
               <tr>
                <td align="left" class="auto-style6">
                    <asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:200px;" id="txtbanco" data-options="readonly:true"></td>
                <td align="left" class="auto-style8" colspan="2">
                    <asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Grupo Jer.:</asp:Label>
                   </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:200px;" id="txtgpojer" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style5">
                    <asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Días de Pago:</asp:Label>
                </td>
                <td align="left" class="auto-style1">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtdiaspago" data-options="readonly:true"></td>
                <td align="left" class="auto-style7" colspan="2">
                    <asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">No. Cuenta:</asp:Label>
                </td>
                <td align="left" class="auto-style1">
                    <input  class="easyui-textbox"  style="width:200px;" id="txtcuenta" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style6">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Quinquenio:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtquinquenio" data-options="readonly:true"></td>
                <td align="left" class="auto-style8" colspan="2">
                    <asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Días de Retro:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtdiasretro" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style6">
                   <asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Tipo de Incremento:</asp:Label>
                </td>
                <td align="left" colspan="2">
                    <input  class="easyui-textbox"  style="width:200px;" id="txttipoinc" data-options="readonly:true"></td>
                <td align="left">
                    <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Zona:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtzona" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style6">
                    <asp:Label ID="Label57" CssClass="LetraChicaNegrita" runat="server">%. de Jubilación:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtporjub" data-options="readonly:true"></td>
                <td align="left" class="auto-style8" colspan="2">
                    <asp:Label ID="Label58" CssClass="LetraChicaNegrita" runat="server">Año de Jubilación:</asp:Label>
                </td>
                <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtanojub" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style6">
                    <asp:Label ID="Label59" CssClass="LetraChicaNegrita" runat="server">Benefactor:</asp:Label>
                </td>
                <td align="left" colspan="4">
                    <input  class="easyui-textbox"  style="width:585px;" id="txtbenef" data-options="readonly:true"></td>
            </tr>
            </table>
              <br />
              <div id="indicadores" class="easyui-accordion" style="width:75%;height:230px;">  
                   <div title="Conceptos de la Plaza" style="overflow:auto;  padding:5px;" align="center">
                      <table>                                             
                          <tr>
                              <td align="left"><asp:Label ID="Label42" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndPPl" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label43" CssClass="LetraChicaNegrita" runat="server">Deducciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndDPl" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label44" CssClass="LetraChicaNegrita" runat="server">Aportaciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndAPl" data-options="readonly:true"></td>
                          </tr>
                    </table>
                   </div>
                   <div title="Conceptos Personales" style="overflow:auto; padding:5px;" align="center">
                      <table>             
                      <tr>
                          <td align="left"><asp:Label ID="Label48" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                          <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndPPer" data-options="readonly:true"></td>
                      </tr>
                      <tr>
                          <td align="left"><asp:Label ID="Label49" CssClass="LetraChicaNegrita" runat="server">Deducciones:</asp:Label></td>
                          <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndDPer" data-options="readonly:true"></td>
                      </tr>
                      <tr>
                          <td align="left"><asp:Label ID="Label50" CssClass="LetraChicaNegrita" runat="server">Aportaciones:</asp:Label></td>
                          <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndAPer" data-options="readonly:true"></td>
                      </tr>
                      </table>
                    </div> 
                   <div title="Conceptos del Nivel" style="overflow:auto;padding:5px;" align="center">                   
                      <table>                  
                          <tr>
                              <td align="left" class="auto-style1"><asp:Label ID="Label52" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                              <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:550px;" id="txtIndPNiv" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label53" CssClass="LetraChicaNegrita" runat="server">Deducciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndDNiv" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label54" CssClass="LetraChicaNegrita" runat="server">Aportaciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndANiv" data-options="readonly:true"></td>
                          </tr>
                     </table>
                  </div>
                   <div title="Conceptos a la Adscripción" style="overflow:auto;padding:5px;" align="center">                   
                      <table>                  
                          <tr>
                              <td align="left" class="auto-style1"><asp:Label ID="Label31" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                              <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:550px;" id="txtIndPAds" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label32" CssClass="LetraChicaNegrita" runat="server">Deducciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndDAds" data-options="readonly:true"></td>
                          </tr>
                          <tr>
                              <td align="left"><asp:Label ID="Label33" CssClass="LetraChicaNegrita" runat="server">Aportaciones:</asp:Label></td>
                              <td align="left"><input  class="easyui-textbox"  style="width:550px;" id="txtIndAAds" data-options="readonly:true"></td>
                          </tr>
                     </table>
                  </div>
                 <%-- <div title="Empleados" style="overflow:auto;padding:5px;" align="center">               
                      <table class="easyui-datagrid" id="dgemp"  style="width:80%; height:auto">
                        <thead>
                        <tr>                        
                            <th data-options="field:'numemp',width:70,align:'center',halign:'center'">Empleado</th>                              
                            <th data-options="field:'rfccom',width:150,align:'center',halign:'center'">Rfc</th>                              
                            <th data-options="field:'curpemp',width:150,align:'center',halign:'center'">Curp</th>                              
                            <th data-options="field:'nomcom',width:350,align:'left',halign:'center'">Nombre</th>                  
                            <th data-options="field:'sexemp',width:50,align:'center',halign:'center'">Sexo</th>                  
                        </tr>
                        </thead>
                       </table>       
                   </div>     --%>           
            </div>   
         </div>            
      </div>
    </div>
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" closed="true" title="Buscar Plazas" align="center">    
            <div class="easyui-panel" style="padding:3px; width:100%">                               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLFiltro">Limpiar</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBFiltroAvanzado">Busqueda Avanzada</a>                                    
         </div>      
             <table>
                <tr>
                   <td align="Left" class="auto-style2"><asp:Label ID="Label2" CssClass="LetraChicaNegrita"  runat="server" Text="Mantener Campo Busqueda:"></asp:Label></td>
                   <td align="Left"><input type="checkbox" id="chkmantener"></td>
                </tr>
            </table>     
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
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
                <table id="dgplaza" class="easyui-datagrid" style="width:100%;height:473px"> 
                <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center',sortable:true">Plaza</th>  
                        <th data-options="field:'numemppl',width:80,align:'center',halign:'center',sortable:true">Empleado</th>                         
                        <th data-options="field:'rfccompl',width:120,align:'center',halign:'center',sortable:true">R.F.C.</th>  
                        <th data-options="field:'nomcompl',width:350,align:'left',halign:'center',sortable:true">Nombre</th>  
                        <th data-options="field:'cveesppl',width:60,align:'center',halign:'center',sortable:true">Estatus</th>  
                        <th data-options="field:'cvepuepl',width:70,align:'center',halign:'center',sortable:true">Puesto</th>                      
                        <th data-options="field:'cvenivpl',width:90,align:'center',halign:'center',sortable:true">Nivel</th>   
                        <th data-options="field:'hrspla',width:60,align:'center',halign:'center',hidden: true">Horas</th>                                                                                                              
                        <th data-options="field:'cvepagpl',width:90,align:'center',halign:'center',hidden: true">Pagaduría</th>                                                    
                        <th data-options="field:'pagplaor',width:90,align:'center',halign:'center',hidden: true">Pago</th>                                                                         
                        <th data-options="field:'nombanpapl',width:90,align:'center',halign:'center',hidden: true">Banco</th>
                        <th data-options="field:'movvigini',width:100,align:'center',halign:'center',hidden: false">Vig. Ini. Mov.</th>
                        <th data-options="field:'movvigfin',width:100,align:'center',halign:'center',hidden: false">Vig. Fin. Mov.</th>
                    </tr>
                </thead>                   
            </table>                      
        </div>  
         <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO.jpg');" id="winfiltro" closed="true">
                <div align="center">
                    <div class="easyui-panel" style="padding: 3px;">
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-filter'" id="btnAgregarFiltro">Agregar Filtro</a>
                        <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnConsultar">Consultar</a>
                    </div>
                    <div class="easyui-panel" id="pnlFiltros">
                        <div class="easyui-panel" style="width: 100%; height: auto;" align="center" id="pnlNivel">
                            <table id="tblfiltro">
                                <tr>
                                    <td align="Center">
                                        <input class="easyui-combobox" style="width: 230px;" id="cbofcam" data-options="editable:true"></input>
                                    </td>
                                    <td align="Center">
                                        <select class="easyui-combobox" style="width: 130px;" id="cbofcon" data-options="editable:true">                                            
                                            <option value="=">Exacta</option>
                                            <option value="like">Aproximada</option>
                                        </select>
                                    </td>
                                    <td align="Center">
                                        <div id="txt" align="Center">
                                            <input class="easyui-textbox" style="width: 240px" id="txtfval"></div>
                                        <div id="cb" align="Center">
                                            <input class="easyui-combobox" style="width: 240px;" id="cboval" data-options="editable:true"></input></div>
                                        <div id="dt" align="Center">
                                            <input class="easyui-datebox" style="width: 240px;" id="dtval" data-options="formatter:myformatter,parser:myparser"></div>
                                    </td>
                                    <td align="Center">
                                        <a href="#" id="opcY" class="easyui-linkbutton" style="width: 30px" data-options="plain:true,toggle:true,group:'g1',selected:true">Y</a>
                                        <a href="#" id="opcO" class="easyui-linkbutton" style="width: 30px" data-options="plain:true,toggle:true,group:'g1'">O</a>
                                    </td>
                                </tr>
                            </table>
                            <table id="tblCondicion"></table>
                        </div>
                    </div>
                </div>
            </div> 
         <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>
       
    </form>
</body>
</html>
