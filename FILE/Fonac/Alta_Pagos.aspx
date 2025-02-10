<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Alta_Pagos.aspx.cs" Inherits="FILE_Fonac_Alta_Pagos" %>

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
    <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>

     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Alta_Pagos.js?1.0"></script>
   
    <style type="text/css">
        .auto-style1 {
            height: 23px;
            width: 189px;
        }
        .auto-style2 {
            width: 165px;
        }
        .auto-style3 {
            height: 23px;
        }
        .auto-style4 {
            height: 23px;
            width: 145px;
        }
        .auto-style5 {
            height: 23px;
            width: 165px;
        }
        .auto-style6 {
            height: 23px;
            width: 114px;
        }
    </style>
   
</head>
<body>
    <form id="form1" runat="server">
    <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiar">Limpiar</a>                                                                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardar">Guardar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-Minipagos',disabled:true" id="btnDetalle">Detalle de Pagos</a>
         </div> 
        <br />
        <div id="Div1" class="easyui-layout" style="width:100%;height:95%; padding:0px; overflow-x:auto;overflow-y: auto; " align="Center" > 
        <table style="width: 637px">
            <tr>
                <td align="left" class="auto-style2"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server" Text="No. Empleado:"></asp:Label></td>
                <td align="left" class="auto-style6"><input  class="easyui-textbox"  style="width:100px;" id="empleado" data-options="readonly:true"></td>
                <td align="left" class="auto-style4"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server" Text="Plaza:"></asp:Label></td>
                <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="plaza" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style2"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server" Text="Nombre:"></asp:Label></td>
                <td align="left" class="auto-style3" colspan="3"><input  class="easyui-textbox"  style="width:470px;" id="nombre" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left"  class="auto-style5"><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server" Text="RFC:"></asp:Label></td>
                <td align="left" class="auto-style6"><input  class="easyui-textbox"  style="width:160px;" id="rfc" data-options="readonly:true"></td>
                <td align="left" class="auto-style4"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server" Text="CURP:"></asp:Label></td>
                <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:160px;" id="curp" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left"  class="auto-style5"><asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server" Text="Puesto:"></asp:Label></td>
                <td align="left" class="auto-style6"><input  class="easyui-textbox"  style="width:100px;" id="puesto" data-options="readonly:true"></td>
                <td align="left" class="auto-style4"><asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server" Text="Estatus Plaza:"></asp:Label></td>
                <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="estatuspla" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" class="auto-style2"><asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server" Text="Estatus Fonac:"></asp:Label></td>
                <td align="left" class="auto-style3" colspan="3"><input  class="easyui-textbox"  style="width:200px;" id="estatusfonac" data-options="readonly:true"></td>
            </tr>
        </table>
        <br />
        <asp:Label ID="lblmensaje" CssClass="Mensaje" runat="server" Text=""></asp:Label>
        <br />
         <br />
        <table style="width: 426px">
            <tr>
                <td align="center" ><asp:Label ID="lbltotaldecuento" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="center" ><input  class="easyui-textbox"  style="width:100px;" id="total" data-options="readonly:true"></td>
            </tr>
        </table>     
        <table style="width: 321px">
            <tr>
                <td align="left" ><asp:Label ID="lblcontadorfonac" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="contadorfonac" data-options="readonly:true"></td>
            </tr>
             <tr>
                <td align="left" ><asp:Label ID="lbltotapo1" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="tot1" data-options="readonly:true"></td>
            </tr>
             <tr>
                <td align="left" ><asp:Label ID="lblcontapo1" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="cont1" data-options="readonly:true"></td>
            </tr>
             <tr>
                <td align="left" ><asp:Label ID="lbltotapo2" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="tot2" data-options="readonly:true"></td>
            </tr>
             <tr>
                <td align="left" ><asp:Label ID="lblcontapo2" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="cont2" data-options="readonly:true"></td>
            </tr>
            <tr>
                <td align="left" ><asp:Label ID="lbltotapo3" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="tot3" data-options="readonly:true"></td>
            </tr>
             <tr>
                <td align="left" ><asp:Label ID="lblcontapo3" CssClass="LetraChicaNegrita" runat="server" Text=""></asp:Label></td>
                <td align="right" ><input  class="easyui-textbox"  style="width:100px;" id="cont3" data-options="readonly:true"></td>
            </tr>
        </table>
        <br />
        <table>
            <tr>              
                <td align="left" ><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server" Text="Quincena:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-combobox"  style="width:150px;" id="cboquin" data-options="editable:false"></td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server" Text="Plaza:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtplaza" data-options="readonly:true"></td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server" Text="Puesto:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtpuesto" data-options="readonly:true"></td>
            </tr>
             <tr>              
                <td align="left" ><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Tipo Quincena:"></asp:Label></td>              
                 <td align="left">
                           <select class="easyui-combobox"  style="width:150px;" id="cbotipquin" data-options="editable:false">                                                                                                       
                                 <option value="O">Ordinaria</option>
                                 <option value="E">ExtraOrdinaria</option>
                          </select>
                 </td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server" Text="Monto Descuento:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtmonto" data-options="readonly:false"></td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server" Text="Monto Aportacion 1:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtapo1" data-options="readonly:false"></td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server" Text="Monto Aportacion 2:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtapo2" data-options="readonly:false"></td>
            </tr>
            <tr>              
                 <td align="left" ><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server" Text="Monto Aportacion 3:"></asp:Label></td>              
                 <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtapo3" data-options="readonly:false"></td>
            </tr>
             <tr>              
                    <td align="left"><asp:Label ID="Label25" CssClass="LetraChicaNegrita" runat="server">Observaciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:500px; height:40px;" id="txtobservaciones" labelPosition="top" multiline="true" data-options="readonly:false"></input></td>              
                </tr> 
        </table>
         </div>
    </div>
           <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true"> 
               <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLBusqueda">Limpiar</a>                 
              </div>            
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
                          <input class="easyui-textbox" style="width:200px" id="txtval">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                <table id="dg"> 
                <thead>
                    <tr>                                                                         
                        <th data-options="field:'numemppl',width:100,align:'center',halign:'center'">Empleado</th>                        
                        <th data-options="field:'nomcompl',width:300,align:'left',halign:'center',hidden:false">Nombre</th>
                        <th data-options="field:'rfccompl',width:150,align:'center',halign:'center'">R.f.c.</th>                         
                        <th data-options="field:'curpemp',width:150,align:'left',halign:'center',hidden:false">Curp</th>
                        <th data-options="field:'numplaza',width:120,align:'center',halign:'center',hidden:true">plaza</th>
                        <th data-options="field:'cveesppl',width:120,align:'center',halign:'center',hidden:true">estatus</th>
                        <th data-options="field:'cvepuepl',width:120,align:'center',halign:'center',hidden:true">puesto</th>
                    </tr>
                </thead>                   
            </table>                      
         </div>   
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="windetallepago" align="Center" closed="true">                
                <table id="dgdetpago"> 
                <thead>
                    <tr>
                        <th colspan="7">ACUMULADOS FONAC POR CICLOS</th>                       
                    </tr>
                    <tr>
                         <th colspan="7">CICLO ACTUAL</th>
                    </tr>
                    <tr>                          
                        <th data-options="field:'ciclo',width:80,align:'center',halign:'center'">Ciclo</th>                        
                        <th data-options="field:'quincena',width:100,align:'center',halign:'center',hidden:false">Quincena</th>
                        <th data-options="field:'ano',width:80,align:'center',halign:'center'">Año</th>                         
                        <th data-options="field:'descuento',width:120,align:'right',halign:'center',hidden:false">Descuento</th>
                        <th data-options="field:'apo1',width:120,align:'right',halign:'center',hidden:false">Aportación 1</th>
                        <th data-options="field:'apo2',width:120,align:'right',halign:'center',hidden:false">Aportación 2</th>
                        <th data-options="field:'apo3',width:120,align:'right',halign:'center',hidden:false">Aportación 3</th>                       
                    </tr>
                </thead>                   
            </table>                      
         </div>   
         <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
