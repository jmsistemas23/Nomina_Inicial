<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PagosEsp.aspx.cs" Inherits="FILE_PagosEspeciales_PagosEsp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>   
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	     

      <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>     
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
     <script src="../../Scripts/jquery-Mask.js"></script>  
    <script type="text/javascript" src="PagosEsp.js?1.0"></script>    
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
        <div id="dmenu" class="easyui-layout" style="width:100%; height:100%; padding:0px;" align="Center">
            <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="movimientos especiales"></asp:Label>
                    </td>
                </tr>                
            </table>
            <br />
           <div class="easyui-panel" style="width:25%; padding:4px" align="Center">
              <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                       <a id="btnNuevaCap" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'NuevoDoc',size:'large',iconAlign:'top'" style="width:100px" >Nuevo Captura</a>
                       <a id="btnEliModCap" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'EditarDoc',size:'large',iconAlign:'top'" style="width:100px">Modificar/Eliminar </a>                                                   
                  </td>
              </tr>  
                <tr>
                <td align="Center">
                        <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="AFECTACIÓN BLOQUEADA"></asp:Label>        
                </td>
            </tr>                      
              </table>                
           </div>   
        </div>
       <div id="dcaptura" style="display:none; width:100%; height:100%; padding:0px; overflow-y:hidden;" align="Center">
           <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarCap">Regresar</a> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCap">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarCap">Guardar</a>  
               <asp:Label ID="lbldoc" CssClass="LetraChica" runat="server"></asp:Label>           
           </div>
           <br />
           <div  style="width:100%; height:90%; padding:0px; overflow-y:scroll;" align="Center">
            <div class="easyui-tabs" style="width:700px;height:470px;" data-options="plain:true">   
                   <div title="Buscar Datos"  style="overflow:auto;padding:10px;" align="center"> 
                   <asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server">Buscar Plaza</asp:Label>
                     <table>                    
                        <tr>
                            <td align="left">
                                <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                            </td>
                            <td align="Center"> 
                               <select class="easyui-combobox"  style="width:130px;" id="cbocamplaza" data-options="editable:false">
                                    <option value="numplaza">Plaza</option>
                                    <option value="numemppl">Empleado</option>                                
                                    <option value="rfccompl">R.F.C.</option>                                
                                    <option value="nomcompl">Nombre</option>                                
                                </select>
                            </td>
                            <td align="Center"> 
                                <select class="easyui-combobox"  style="width:130px;" id="cboconplaza" data-options="editable:false">                                                                        
                                    <option value="=">Exacta</option>          
                                    <option value="like">Aproximada</option>                      
                                </select>
                            </td>
                            <td align="Center">
                                <input class="easyui-textbox" style="width:250px" id="txtvalplaza">
                            </td>
                                <td align="Center">
                                <a id="btnBuscarPlaza" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                            </td>
                        </tr>             
                     </table>
                    <br />            
                    <table>
                        <tr>
                            <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">No. Plaza:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtplaza" data-options="readonly:true"></input></td>
                            <td align="left" class="auto-style2"><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Estatus:</asp:Label></td>
                            <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:50px;" id="txtestatus" data-options="readonly:true"></td>
                            <td align="left" class="auto-style1">&nbsp;</td>
                        </tr>                
                        <tr>
                            <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtvigenciaini" data-options="readonly:true"></input></td>
                            <td align="left" class="auto-style2"><asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label></td>
                            <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtvigenciafin" data-options="readonly:true"></td>
                            <td align="left" class="auto-style1">&nbsp;</td>
                        </tr>                 
                        <tr>
                           <td align="left"><asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Horas de la Plaza:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:50px;" id="txthrplaza" data-options="readonly:true"></input></td>
                            <td align="left" class="auto-style2"><asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Zona Económica:</asp:Label></td> 
                            <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:50px;" id="txtzonaeco" data-options="readonly:true"></td> 
                            <td align="left" class="auto-style1">&nbsp;</td> 
                        </tr>                 
                        <tr>
                           <td align="left"><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server">Puesto:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:80px;" id="txtpuesto" data-options="readonly:true"></input></td>
                            <td align="left" class="auto-style2"><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Nivel:</asp:Label></td> 
                            <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtnivel" data-options="readonly:true"></td> 
                            <td align="left" class="auto-style1">&nbsp;</td> 
                        </tr>                 
                        <tr>
                            <td align="left"><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Adscripción:</asp:Label></td>
                            <td align="left"  colspan="3"><input  class="easyui-textbox"  style="width:400px;" id="txtadscri" data-options="readonly:false"></input><input type="hidden" id="htxtadscri" /></td>
                            <td align="left"><a id="btnadscri" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a></td>
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
                            <td align="left"  colspan="3"><input  class="easyui-textbox"  style="width:400px;" id="txtpag" data-options="readonly:false"></input><input type="hidden" id="htxtpag" /></td>
                            <td align="left"><a id="btnzonpag" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a></td>
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label25" CssClass="LetraChicaNegrita" runat="server">Est. Programática:</asp:Label></td>
                            <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:400px;" id="txtestp" data-options="readonly:true"></input><input type="hidden" id="htxtestp" /></td>                            
                        </tr>
                    </table>
                    <br />  
                     <asp:Label ID="Label27" CssClass="LetraChicaNegrita" runat="server">Buscar Empleado</asp:Label>
                      <table>                    
                        <tr>
                            <td align="left">
                                <asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                            </td>
                            <td align="Center"> 
                               <select class="easyui-combobox"  style="width:130px;" id="cbocamemp" data-options="editable:false">                                    
                                    <option value="numemp">Empleado</option>                                
                                    <option value="rfccom">R.F.C.</option>                                
                                    <option value="nomcom">Nombre</option>                                
                                </select>
                            </td>
                            <td align="Center"> 
                                <select class="easyui-combobox"  style="width:130px;" id="cboconemp" data-options="editable:false">                                                                        
                                    <option value="=">Exacta</option>
                                    <option value="like">Aproximada</option>
                                </select>
                            </td>
                            <td align="Center">
                                <input class="easyui-textbox" style="width:250px" id="txtvalemp">
                            </td>
                                <td align="Center">
                                <a id="btnBuscarEmpleado" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                            </td>
                        </tr>             
                     </table>
                      <br />            
                     <table>
                        <tr>
                            <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true"></input></td>
                            <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Sexo:</asp:Label><input  class="easyui-textbox"  style="width:50px;" id="txtsexo" data-options="readonly:true"></td>
                        </tr>                
                        <tr>
                            <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">RFC:</asp:Label></td>
                            <td align="left" colspan="2"><input  class="easyui-textbox"  style="width:130px;" id="txtrfc" data-options="readonly:true"></input></td>
                           
                        </tr>                 
                        <tr>
                            <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                            <td align="left" colspan="2"><input  class="easyui-textbox"  style="width:400px;" id="txtnombre" data-options="readonly:false"></input></td>
                          
                        </tr>                 
                        </table>   
               </div>     
                   <div title="Datos del Pago"  style="overflow:auto;padding:10px;" align="center">     
                  <table>
                    <tr>
                        <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Tipo Pago:</asp:Label></td>
                        <td align="left"><input   class="easyui-combobox"  style="width:200px;" id="cbotipopago" data-options="editable:false"></input></td>
                        <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label></td>
                        <td align="left"><input   class="easyui-combobox"  style="width:200px;" id="cbobancos" data-options="editable:false"></input></td>
                    </tr>                
                    <tr>
                        <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Sucursal:</asp:Label></td>
                        <td align="left"><input   class="easyui-combobox"  style="width:200px;" id="cbosucursal" data-options="editable:false"></input></td>
                        <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Cuenta:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtcuenta"></input></td>
                    </tr>                                
                </table>                
                 <table>
                    <tr>
                        <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label></td>
                        <td align="left"><input  class="easyui-datebox"  style="width:120px;" id="dvigenciainicial" data-options="formatter:myformatter,parser:myparser"></input></td>
                        <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label></td>
                        <td align="left"><input  class="easyui-datebox"  style="width:120px;" id="dvigenciafinal" data-options="formatter:myformatter,parser:myparser"></input></td>
                    </tr>                                                          
                </table>
                <br />
                <table>
                   <tr>
                     <td align="left"><asp:Label ID="Label29" CssClass="LetraChicaNegrita" runat="server">Observaciones:</asp:Label></td>
                     <td align="left"><input  class="easyui-textbox"  style="width:500px;height:50px;" id="txtobservaciones" labelPosition="top" multiline="true" ></input></td>                        
                  </tr>                                                          
                </table> 
              </div>              
              </div>  
               <br />
               <table id="dgp" style="width:500px; height:250px;" toolbar="" >
                    <thead>
                        <tr>
                            <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                            <th data-options="field:'descripcion',width:300,align:'left'">Descripcion</th>  
                            <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>  
                        </tr>
                    </thead>
              </table>
           </div>
       </div>
    </div>
     <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center">
             <img alt="" src="../../Imagenes/ajax-loader.gif" />
         </div> 
    </div>   
    </form>
</body>
</html>
