<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Historia_Plazas_Empleados.aspx.cs" Inherits="FILE_Consultas__Empleados_Historia_Plazas" %>

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
     <script src="../../../Scripts/jquery-Mask.js"></script>  
    <script type="text/javascript" src="Historia_Plazas_Empleados.js?1.2"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" >           
         <div id="dmenu" class="easyui-layout" style="width:100%; height:100%; padding:0px;" align="Center">
             <div class="easyui-panel" style="padding:3px; width:100%">                               
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRMenu">Regresar</a>                            
             </div> 
             <br />
              <table>
                <tr>
                   <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true" value=""></input></td>
                    <td align="left">          
                   <td align="left">   
                </tr>                                            
                <tr>
                    <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
                    <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtnombre" data-options="readonly:true"></input></td>           
                </tr>                
                <tr>              
                   <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtrfc" data-options="readonly:true"></input></td>   
                    <td align="left">   
                    <td align="left">   
               </tr>     
                   <tr>              
                   <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">C.U.R.P.:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtcurp" data-options="readonly:true"></input></td>   
                    <td align="left">   
                    <td align="left">   
               </tr>                 
         </table>             
             <br />
             <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Historia de Plazas</asp:Label>  
             <br />
             <div class="easyui-accordion" style="width:90%;height:50%;">  
                  <div title="Plazas por Empleado" style="overflow:auto; padding:10px;" align="center">
                      <table class="easyui-datagrid" id="dgpe"  style="width:100%; height:100%">
                         <thead>
                           <tr>                        
                              <th data-options="field:'numplaza',width:100,align:'center',halign:'center'">Plaza</th>                              
                              <th data-options="field:'cveesppl',width:70,align:'center',halign:'center'">Estatus</th>                                                            
                               <th data-options="field:'movvigini',width:90,align:'center',halign:'center'">Vig. Inicial</th>                  
                               <th data-options="field:'movvigfin',width:90,align:'center',halign:'center'">Vig. Final</th>
                               <th data-options="field:'cvepuepl',width:90,align:'center',halign:'center'">Puesto</th>
                               <th data-options="field:'hrspla',width:90,align:'center',halign:'center'">Horas</th>
                               <th data-options="field:'cvenivpl',width:100,align:'center',halign:'center'">Vivel Salarial</th>
                               <th data-options="field:'cvepagpl',width:90,align:'center',halign:'center'">Grupo</th>
                               <th data-options="field:'pagplaor',width:90,align:'center',halign:'center'">Tipo Pago</th>
                               <th data-options="field:'cvebanor',width:90,align:'center',halign:'center'">Banco</th>
                           </tr>
                        </thead>         
                    </table> 
                 </div>  
                 <div title="Empleados por Plaza" style="overflow:auto; padding:10px;" align="center">
                     <table class="easyui-datagrid" id="dgep"  style="width:100%; height:100%">
                         <thead>
                           <tr>                        
                              <th data-options="field:'numplaza',width:100,align:'center',halign:'center'">Plaza</th>                              
                              <th data-options="field:'cveesppl',width:70,align:'center',halign:'center'">Estatus</th>                              
                              <th data-options="field:'numemppl',width:100,align:'center',halign:'center'">Empleado</th>                  
                               <th data-options="field:'rfccompl',width:150,align:'center',halign:'center'">Rfc</th>                  
                               <th data-options="field:'nomcompl',width:450,align:'left',halign:'center'">Nombre</th>                  
                               <th data-options="field:'movvigini',width:90,align:'center',halign:'center'">Vig. Inicial</th>                  
                               <th data-options="field:'movvigfin',width:90,align:'center',halign:'center'">Vig. Final</th>
                               <th data-options="field:'cvepuepl',width:90,align:'center',halign:'center'">Puesto</th>
                               <th data-options="field:'hrspla',width:90,align:'center',halign:'center'">Horas</th>
                               <th data-options="field:'cvenivpl',width:100,align:'center',halign:'center'">Vivel Salarial</th>
                               <th data-options="field:'cvepagpl',width:90,align:'center',halign:'center'">Grupo</th>
                               <th data-options="field:'pagplaor',width:90,align:'center',halign:'center'">Tipo Pago</th>
                               <th data-options="field:'cvebanor',width:90,align:'center',halign:'center'">Banco</th>
                           </tr>
                        </thead>         
                    </table>    
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
