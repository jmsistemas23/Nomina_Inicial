<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cancelacion_Pension.aspx.cs" Inherits="FILE_Cancelaciones_Cancelacion_Pension" %>

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
    <script type="text/javascript" src="Cancelacion_Pension.js?2.6"></script>      
</head>
<body>
    <form id="form1" runat="server">
      <div class="easyui-layout" style="width:100%;height:98%; overflow-x: hidden;overflow-y: hidden;" align="center">     
        <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove'" id="btnEliminar">Eliminar Selección</a>               
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
                    <td align="left"><input  class="easyui-combobox"  style="width:350px;" id="cbestatus" data-options="readonly:false" value=""></td>                                        
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
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:false"">Id</th>          
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'rfccom',width:150,align:'center',halign:'center'">Rfc</th>
                        <th data-options="field:'nomemp',width:300,align:'left',halign:'left'">Nom. Empleado</th>
                        <th data-options="field:'nompen',width:300,align:'left',halign:'left',hidden:false">Nom. Pensionda</th>                        
                        <th data-options="field:'cvebanpen',width:120,align:'center',halign:'center',hidden:true">Cve. Banco</th>
                        <th data-options="field:'nombanpen',width:120,align:'center',halign:'center',hidden:false">Banco</th>
                        <th data-options="field:'pagppen',width:120,align:'center',halign:'center',hidden:true">Cve Pago</th>
                        <th data-options="field:'despago',width:120,align:'center',halign:'center',hidden:false">Tipo Pago</th>                      
                        <th data-options="field:'imppen01',width:100,align:'center',halign:'center',hidden:false">Importe</th>                                                 
                        <th data-options="field:'estpago',width:100,align:'center',halign:'center',hidden:false">Estatus</th>                                                                       
                    </tr>
                    </thead>         
               </table>                                                       
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
                                 <option value="like">Aproximada</option>
                                 <option value="=">Exacta</option>
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
                        <th data-options="field:'chk',checkbox:true"></th>                                    
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:false"">Id</th>                 
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center'">Plaza</th>
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'rfccom',width:150,align:'center',halign:'center'">R.f.c</th>
                        <th data-options="field:'nomemp',width:300,align:'left',halign:'left'">Nom. Empleado</th>
                        <th data-options="field:'nompen',width:300,align:'left',halign:'left',hidden:false">Nom. Pensionda</th>                        
                        <th data-options="field:'cvebanpen',width:120,align:'center',halign:'center',hidden:true">Cve. Banco</th>
                        <th data-options="field:'nombanpen',width:120,align:'center',halign:'center',hidden:false">Banco</th>
                        <th data-options="field:'pagppen',width:120,align:'center',halign:'center',hidden:true">Cve Pago</th>
                        <th data-options="field:'despago',width:120,align:'center',halign:'center',hidden:false">Tipo Pago</th>                        
                        <th data-options="field:'imppen01',width:100,align:'center',halign:'center',hidden:false">Importe</th>             
                        <th data-options="field:'estpago',width:100,align:'center',halign:'center',hidden:false">Estatus</th>                         
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
