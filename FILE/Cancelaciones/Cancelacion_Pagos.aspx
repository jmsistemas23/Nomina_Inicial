<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cancelacion_Pagos.aspx.cs" Inherits="FILE_Cancelacion_Cancelacion_Pagos" %>

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
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Cancelacion_Pagos.js?0.4"></script>      
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
        .auto-style2 {}
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">    
         <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
          <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server"></asp:Label>
                    </td>
                </tr>                
          </table>
         <br />
          <br />   
             <%--<div class="easyui-panel" style="padding:3px; width:35%">                 --%>
                    <table style="width: 100%;">           
                        <tr>
                            <td align="Center">
                                <a id="btnNuevaCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'NuevoDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Nueva Captura</a>
                                <a id="btnEliModCap" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'EditarDoc',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar/Eliminar</a>
                            </td>
                        </tr>                      
                    </table> 
          <%--  </div>--%>
      </div>                
        <div id="dcaptura" class="easyui-layout" style="width:100%;height:98%; overflow-x: hidden;overflow-y: hidden; display:none" align="center">     
        <div class="easyui-panel" style="padding:3px; width:100%">            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRCaptura">Regresar</a>                    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar Todo</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnEliminar">Limpiar Selección</a>               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>            
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnCancelar">Aplicar Cancelación</a>
        </div>
        <br />                                      
        <table >
          <tr>              
              <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboquin" data-options="editable:false"></td>
          </tr>              
       </table>
       <br />     
            <div title="Datos del Empleado" style="overflow:auto;padding:10px;" align="center">
                <table>
                    <tr>              
                    <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Motivo de Cancelación:</asp:Label></td>
                    <td align="left"><input  class="easyui-combobox"  style="width:350px;" id="cbmotivo" data-options="readonly:false" value=""></td>                                        
                </tr>                   
                    <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>                   
                    <tr>              
                    <td align="left"><asp:Label ID="Label38" CssClass="LetraChicaNegrita" runat="server">Estatus de Cancelación:</asp:Label></td>
                    <td align="left"><input  class="easyui-combobox"  style="width:350px;" id="cboestatus" data-options="readonly:false" value=""></td>                                        
                </tr>                   
                    <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>                   
                <tr>              
                    <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Observaciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:500px; height:80px;" id="txtobservaciones" labelPosition="top" multiline="true" data-options="readonly:false"></input></td>              
                </tr>               
                </table>
            </div> 
             <br />
              <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server" Text="Datos a Cancelar"></asp:Label>                                      
              <br /> <br />
               <table class="easyui-datagrid" id="dgp" style="width:80%;height:400px" >
                    <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcom',width:350,align:'left',halign:'left'">Nombre</th>                        
                        <th data-options="field:'cveads',width:100,align:'left',halign:'left',hidden:true">Clave Dep.</th>                        
                        <th data-options="field:'descads',width:350,align:'left',halign:'left'">Dependencia</th>                        
                        <th data-options="field:'tipopago',width:120,align:'center',halign:'center',hidden:true">cvePago</th>                        
                        <th data-options="field:'despago',width:120,align:'center',halign:'center',hidden:false">Tipo Pago</th>
                        <th data-options="field:'cvebanor',width:120,align:'center',halign:'center',hidden:true">cveBanco</th>
                        <th data-options="field:'banco',width:120,align:'center',halign:'center',hidden:false">Banco</th>
                        <th data-options="field:'Total_liquido',width:120,align:'center',halign:'center',hidden:false">Liquido</th>                        
                        <th data-options="field:'estpago',width:120,align:'center',halign:'center',hidden:false">Estatus</th>                        
                        <th data-options="field:'cvequi',width:120,align:'center',halign:'center',hidden:true">Cvequi</th>
                        <th data-options="field:'ano',width:120,align:'center',halign:'center',hidden:true">Año</th>
                        <th data-options="field:'tipo_nom',width:120,align:'center',halign:'center',hidden:true">Tiponomina</th>
                    </tr>
                    </thead>         
               </table>                                                       
    </div>    
         <div id="dmoddoc" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">              
          <div class="easyui-panel" style="padding:3px; width:100%">                   
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificarDoc">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarDoc">Limpiar</a>  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditarDoc">Editar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminarDoc">Eliminar</a>    
            <asp:Label ID="lblquin3" CssClass="LetraChica2"  runat="server"></asp:Label>                 
        </div>
          <br />
          
        <table >
          <tr>              
              <td align="left"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cbomodquin" data-options="editable:false"></td>
          </tr>              
       </table>
             <br />                                      
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocamdoc" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:130px;" id="cbocondoc" data-options="editable:false">                                                                                                                             
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>   
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaldoc">
                </td>
                    <td align="Center">
                    <a id="btnfiltrardoc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
            </table>
          <br />
          <table class="easyui-datagrid" style="width:100%;height:550px" id="dgdoc">
                <thead>
                    <tr>                                                
                        <th data-options="field:'plaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcom',width:350,align:'left',halign:'left'">Nombre</th>                        
                        <th data-options="field:'fkMotivo',width:80,align:'center',halign:'center',hidden:true">fkmotvio</th>                        
                        <th data-options="field:'desmotivo',width:350,align:'left',halign:'center',hidden:false">Motivo</th>
                        <th data-options="field:'Estatus',width:80,align:'center',halign:'center',hidden:true">fkestatus</th>
                        <th data-options="field:'desestatus',width:250,align:'left',halign:'center',hidden:false">Estatus</th>                        
                        <th data-options="field:'Observaciones',width:400,align:'left',halign:'center',hidden:false">Observaciones</th>
                        <th data-options="field:'Usuario',width:200,align:'left',halign:'center',hidden:false">Usuario</th>  
                        <th data-options="field:'cvequi',width:120,align:'center',halign:'center',hidden:true">Cvequi</th>
                        <th data-options="field:'ano',width:120,align:'center',halign:'center',hidden:true">Año</th>
                        <th data-options="field:'tipo_nom',width:120,align:'center',halign:'center',hidden:true">Tiponomina</th>                      
                    </tr>
                </thead>         
          </table>
     </div>    
        <div id="dmodificar" class="easyui-layout" style="width:100%;height:98%; overflow-x: hidden;overflow-y: hidden; display:none" align="center">     
             <div class="easyui-panel" style="padding:3px; width:100%">            
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRModificar">Regresar</a>                    
                <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLModificar">Limpiar</a>        --%>    
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnModificar">Guardar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel'" id="btnEmodificar">Eliminar</a> 
            </div>
            <br />
            <div title="Datos del Empleado" style="overflow:auto;padding:10px;" align="center">
                <table>
                    <tr> 
                        <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Plaza:</asp:Label></td>             
                        <td align="left"><input class="easyui-textbox" style="width:80px" id="txtplaza" data-options="readonly:true"></td>
                    </tr>
                     <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>  
                    <tr> 
                        <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>             
                        <td align="left"><input class="easyui-textbox" style="width:80px" id="txtempleado" data-options="readonly:true"></td>
                    </tr>
                     <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>  
                    <tr> 
                        <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>             
                        <td align="left"><input class="easyui-textbox" style="width:300px" id="txtnombre" data-options="readonly:true"></td>
                    </tr>
                     <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>  
                    <tr>              
                    <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Motivo de Cancelación:</asp:Label></td>
                    <td align="left"><input  class="easyui-combobox"  style="width:350px;" id="cbomotivoscan" data-options="readonly:false" value=""></td>                                        
                </tr>                   
                    <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>                   
                    <tr>              
                    <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Estatus de Cancelación:</asp:Label></td>
                    <td align="left"><input  class="easyui-combobox"  style="width:350px;" id="cboestatuscan" data-options="readonly:false" value=""></td>                                        
                </tr>                   
                    <tr>              
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>                                        
                </tr>                   
                <tr>              
                    <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Observaciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:500px; height:80px;" id="txtobservacionescan" labelPosition="top" multiline="true" data-options="readonly:false"></input></td>              
                </tr>               
                </table>
            </div>  
        </div>
    </div>
           <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true"> 
               <div class="easyui-panel" style="padding:3px; width:100%">                                            
                  <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLBusqueda">Limpiar</a>
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="brnABusqueda">Aceptar</a>                    
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
                <table id="dg" style="height:555px;"> 
                <thead>
                    <tr>  
                        <th data-options="field:'chk',checkbox:true"></th>                                                     
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th> 
                        <th data-options="field:'rfc',width:120,align:'center',halign:'center',hidden:false">R.f.c.</th>                         
                        <th data-options="field:'nomcom',width:300,align:'left',halign:'left'">Nombre</th>
                        <th data-options="field:'tipopago',width:120,align:'center',halign:'center',hidden:true">cvePago</th>                        
                        <th data-options="field:'despago',width:120,align:'center',halign:'center',hidden:false">Tipo Pago</th>
                        <th data-options="field:'cvebanor',width:120,align:'center',halign:'center',hidden:true">cveBanco</th>
                        <th data-options="field:'banco',width:120,align:'center',halign:'center',hidden:true">Banco</th>
                        <th data-options="field:'Total_liquido',width:120,align:'center',halign:'center',hidden:false">Liquido</th> 
                        <th data-options="field:'estpago',width:70,align:'center',halign:'center',hidden:false">Estatus</th>                                
                        <th data-options="field:'cvequi',width:120,align:'center',halign:'center',hidden:true">Cvequi</th>
                        <th data-options="field:'ano',width:120,align:'center',halign:'center',hidden:true">Año</th>
                        <th data-options="field:'tipo_nom',width:120,align:'center',halign:'center',hidden:true">Tiponomina</th>
                    </tr>
                </thead>                   
            </table>                      
         </div>   
        <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
    </form>
</body>
</html>
