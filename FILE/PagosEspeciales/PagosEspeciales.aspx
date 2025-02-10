<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PagosEspeciales.aspx.cs" Inherits="FILE_PagosEspeciales_PagosEspeciales" %>

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
    <%-- <link rel="stylesheet" href="../../Styles/tema.css" type="text/css" media="screen"/>--%>
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
     <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="PagosEspeciales.js?0.3"></script>    
    
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
             <div class="easyui-layout" style="width:60%;height:60%; overflow:hidden;" align="center">              
             <div id="p" data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">
                 <asp:Label ID="lblnominas" CssClass="TituloMedio" runat="server" Text="NOMINA CERRADA"></asp:Label>                 
              <br />
              <div id="dextras" style="width:100%; overflow:auto;" align="center">

              </div>
             </div>
               <div data-options="region:'center'" style="padding:3px; overflow:hidden;" align="center">   
                   <br />
                   <br />
                    <table style="width: 100%;">           
                        <tr>
                            <td align="Center">
                                <a id="btnNuevaCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'NuevoDoc',size:'large',iconAlign:'top'" style="width:150px" >Nuevo Captura</a>
                                <a id="btnEliModCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'EditarDoc',size:'large',iconAlign:'top'" style="width:150px">Modificar/Eliminar </a>                                                   
                            </td>
                        </tr> 
                     <tr>
                       <td align="Center">
                          <asp:Label ID="lblbloqueada" CssClass="TituloMedio" runat="server" Text="CAPTURA BLOQUEADA"></asp:Label>        
                      </td>
                    </tr>                             
                    </table> 
              </div>                                 
         </div>            
        </div>
        <div id="dcaptura" class="easyui-layout" style="width:100%; height:100%; padding:0px;" align="Center">
           <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarCap">Regresar</a> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCap">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarCap">Guardar</a>  
               <asp:Label ID="lblquin1" CssClass="LetraChica" runat="server"></asp:Label>           
           </div>
            <br /> 
            <div id="Div2" class="easyui-layout" style="width:100%; height:90%; padding:0px; overflow-y:scroll;" align="Center">
           <div id="Div1" class="easyui-tabs" style="width:700px;height:480px;" data-options="plain:true">   
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
             <div id="tt" class="easyui-tabs" style="width:520px;height:295px" data-options="plain:true">   
                  <div title="Percepciones"  style="overflow:auto;padding:5px;" align="center"> 
                        <table id="dgp" class="easyui-datagrid" toolbar="#tbp" style="width:500px; height:250px;" data-options="pageSize: 10,rownumbers: true,singleSelect: true,striped: true">  
                            <thead>
                            <tr>
                                <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                                <th data-options="field:'descripcion',width:300,align:'left'">Descripcion</th>  
                                <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>  
                                <th data-options="field:'tip_acumula',width:80,align:'center',halign:'center',hidden: true">Tipo</th>
                            </tr>     
                            </thead>                                          
                        </table>              
                        <div id="tbp" style="height:auto">
                            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" id="btnAGIndP">Agregar</a>                   
                            <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" id="btnEIndP">Eliminar</a>                                 
                        </div>                     
                </div> 
                 <div title="Deducciones"  style="overflow:auto;padding:5px;" align="center">
                            <table id="dgd" class="easyui-datagrid" toolbar="#tbd" style="width:500px; height:250px;" data-options="pageSize: 10,rownumbers: true,singleSelect: true,striped: true">                   
                                <thead>
                                    <tr>
                                        <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                                        <th data-options="field:'descripcion',width:300,align:'left'">Descripcion</th>  
                                        <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th> 
                                        <th data-options="field:'tip_acumula',width:80,align:'center',halign:'center',hidden: true">Tipo</th> 
                                    </tr>
                                </thead> 
                            </table>              
                            <div id="tbd" style="height:auto">
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" id="btnAGIndD">Agregar</a>                   
                                <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" id="btnEIndD">Eliminar</a>                                 
                            </div> 
                         </div>
                <div title="Aportaciones"  style="overflow:auto;padding:5px;" align="center">
                    <table id="dga" class="easyui-datagrid" toolbar="#tba" style="width:500px; height:250px;" data-options="pageSize: 10,rownumbers: true,singleSelect: true,striped: true">                   
                        <thead>
                            <tr>
                                <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                                <th data-options="field:'descripcion',width:300,align:'left'">Descripcion</th>  
                                <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>  
                                <th data-options="field:'tip_acumula',width:80,align:'center',halign:'center',hidden: true">Tipo</th>
                            </tr>
                        </thead> 
                    </table>              
                    <div id="tba" style="height:auto">
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true" id="btnAGIndA">Agregar</a>                   
                        <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true" id="btnEIndA">Eliminar</a>                                 
                    </div> 
                    </div>                                               
              </div>                           
            </div>           
       </div>               
        <div id="dmodeli" class="easyui-layout" style="width:100%; height:100%; padding:0px; display:none" align="Center">
           <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarModEli">Regresar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnlimpiarModEli">Limpiar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModificar">Modificar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a> 
               <asp:Label ID="lblquin2" CssClass="LetraChica" runat="server"></asp:Label>                         
           </div>
            <br />          
           <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocammov" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconmov" data-options="editable:false">                                                                                                                        
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalmov">
                </td>
                    <td align="Center">
                    <a id="btnBuscarMov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
               <br />
            <table style="display:none; width:70%; height:550px" id="dgmov"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'numdocme',width:120,align:'center',halign:'center'">Documento</th>  
                        <th data-options="field:'feccapme',width:90,align:'center',halign:'center'">Fecha</th>  
                        <th data-options="field:'numplame',width:90,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'numempme',width:90,align:'center',halign:'center'">Empleado</th> 
                        <th data-options="field:'nombre',width:300,align:'left',halign:'center'">Nombre</th> 
                        <th data-options="field:'rfc',width:110,align:'center',halign:'center'">Rfc</th> 
                        <th data-options="field:'indicame',width:100,align:'center',halign:'center'">Indicador</th>
                        <th data-options="field:'importme',width:100,align:'center',halign:'center'">Importe</th>
                        <th data-options="field:'perdedme',width:80,align:'center',halign:'center'">Tipo</th>
                        <th data-options="field:'viginime',width:120,align:'center',halign:'center'">Vigencia Inicial</th>  
                        <th data-options="field:'vigfinme',width:120,align:'center',halign:'center'">Vigencia Final</th>  
                        <th data-options="field:'quiactme',width:80,align:'center',halign:'center'">Quincena</th>  
                        <th data-options="field:'anoactme',width:80,align:'center',halign:'center'">Año</th>
                        <th data-options="field:'usucapme',width:150,align:'center',halign:'center'">Usu. Captura</th>
                        <th data-options="field:'observa',width:450,align:'left',halign:'center'">Observaciones</th>
                    </tr>
                  </thead>                          
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
                    <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table id="dgind" style="width:100%; height:560px; display:none;" data-options = "striped: true, rownumbers: true, singleSelect: false, autoRowHeight: false"> 
                <thead>
                    <tr>
                         <th data-options="field:'chk',checkbox:true"></th>              
                        <th data-options="field:'clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'descripcion',width:400,align:'left'">Descripcion</th>  
                        <th data-options="field:'importe',width:75,align:'right',halign:'center', editor: { type: 'numberbox', options: { precision: 2 } }">Importe</th>  
                        <th data-options="field:'tip_acumula',width:80,align:'center',halign:'center',hidden: true">Tipo</th>
                    </tr>
                </thead>                   
            </table>                                                           
        </div>  
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winemp" closed="true" align="center">      
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:120px;" id="cbocam" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocon" data-options="editable:false">                                                                                                
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtval">
                </td>
                    <td align="Center">
                    <a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
          <div id="dplazas" align="center">
            <table id="dgplaza"> 
                <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'cvepuepl',width:80,align:'center',halign:'center'">Puesto</th>
                        <th data-options="field:'cveesppl',width:80,align:'center',halign:'center'">Estatus</th>                        
                        <th data-options="field:'hrspla',width:80,align:'center',halign:'center'">Horas</th>
                        <th data-options="field:'numemppl',width:80,align:'center',halign:'center'">Empleado</th> 
                        <th data-options="field:'rfccompl',width:120,align:'center',halign:'center'">R.f.C.</th>                         
                        <th data-options="field:'cvezonpl',width:120,align:'center',halign:'center'">zona</th>                         
                        <th data-options="field:'cvenivpl',width:120,align:'center',halign:'center'">nivel</th>                         
                        <th data-options="field:'vigini',width:120,align:'center',halign:'center',hidden: true">VigIni</th>                          
                        <th data-options="field:'vigfin',width:120,align:'center',halign:'center',hidden: true">VigFin</th>                          
                        <th data-options="field:'cveadspl',width:120,align:'center',halign:'center',hidden: true">Adscripcion</th>                          
                        <th data-options="field:'cvepagpl',width:120,align:'center',halign:'center',hidden: true">Pagaduria</th>                          
                        <th data-options="field:'estrucprog',width:120,align:'center',halign:'center',hidden: true">EstrucProg</th>                          
                    </tr>
                </thead>                   
            </table>     
         </div>
         <div id="dempleados" align="center">
            <table id="dgempleados"> 
                <thead>
                    <tr>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>                        
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">R.f.c.</th>  
                        <th data-options="field:'nomcom',width:300,align:'left',halign:'center'">Nombre</th>  
                        <th data-options="field:'sexemp',width:300,align:'left',halign:'center',hidden: true">sexo</th>  
                    </tr>
                </thead>                   
            </table>       
         </div>
    </div> 
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wincat" closed="true" align="center">                              
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalcat">
                </td>
                <td align="Center">
                    <a id="btnbuscarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>           
           <div id="dadscri">
            <table  id="dgadscri"> 
                <thead>
                    <tr>
                        <th data-options="field:'cvecentro',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'descentro',width:550,align:'left'">Descripción</th>  
                    </tr>
                </thead>                   
            </table>         
            </div>           
          <div id="dzonpag" style="display:none">
              <table  id="dgzonpag"> 
                <thead>
                    <tr>
                        <th data-options="field:'cvepag',width:100,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'despag',width:450,align:'left'">Descripción</th>  
                    </tr>
                </thead>                   
            </table>         
          </div>                                       
      </div> 
      <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO.jpg');" id="winEliminar" closed="true" >   
             <div style="width:100%;" align="center">
                 <div class="easyui-panel" style="padding:3px; width:100%" align="center" >                   
                   <a href="#"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-folios'"  id="btnFolio">Folio Seleccionado</a><br /><br />
                   <a href="#"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_documento'"  id="btnDocumento">Movimiento</a><br /><br />
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'cerrar'"  id="btnCancelaDoc">Cancelar</a>
                 </div>                
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
