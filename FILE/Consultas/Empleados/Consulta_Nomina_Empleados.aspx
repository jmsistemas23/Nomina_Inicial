<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Nomina_Empleados.aspx.cs" Inherits="FILE_Consultas_Consulta_Nomina_Empleados" %>

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
     <script src="../../../Scripts/accounting.js"></script>
    <script type="text/javascript" src="Consulta_Nomina_Empleados.js?2.2"></script>  
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:false" id="btnReporte">Reporte</a>                            
         <%--   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a> --%>             
       </div> 
         <%--<br />
         <table >
          <tr>              
              <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboquin" data-options="editable:false"></td>
          </tr> 
             <tr>              
              <td align="left"><asp:Label ID="Label38" CssClass="LetraChicaNegrita" runat="server">Conceptos:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboconceptos" data-options="editable:false"></td>
          </tr> 
       </table>--%>
       <br />  
           <table>
          <tr>              
              <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">No. Plaza:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:150px;" id="cboplaza" data-options="readonly:true" value=""></input></td>              
              <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">No. Empleado:</asp:Label></td>              
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true"></input></td>              
          </tr>           
           <tr>              
              <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtrfc" data-options="readonly:true"></input></td>              
              <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">CURP:</asp:Label></td>              
              <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtcurp" data-options="readonly:true"></input></td>              
          </tr>          
           <tr>              
              <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label></td>
              <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtnombre" data-options="readonly:true"></input></td>              
          </tr>          
      </table>
         <table>
             <tr>
               <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Tipo de Pago:</asp:Label></td>
                <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txttipopago" data-options="readonly:true" value=""></input></td>              
                 <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Nomina:</asp:Label></td>
                <td align="left"><input  class="easyui-textbox"  style="width:275px;" id="txtcvetpl" data-options="readonly:true" value=""></input></td>              
             </tr>
             <tr>
                 <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label></td>
                <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtbanco" data-options="readonly:true" value=""></input></td>    
                  <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Categoría:</asp:Label></td>
                <td align="left"><input  class="easyui-textbox"  style="width:305px;" id="txtpuesto" data-options="readonly:true" value=""></input></td>    
             </tr>
             <tr>
                 <td align="left"><asp:Label ID="Label39" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
                <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtpagaduria" data-options="readonly:true"></td>    
             </tr>
             <tr>
                 <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Centro de Trabajo:</asp:Label></td>
                <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtadscripcion" data-options="readonly:true"></td>    
             </tr>
         </table>    
         <br />    
     <div class="easyui-layout" style="width:90%;height:63%; overflow-x: hidden;overflow:hidden;" align="center">     
       <div id="p" data-options="region:'west'" style="width:30%;padding:3px; overflow:hidden;" align="center">
           <div class="easyui-layout" style="width:100%;height:100%; overflow: hidden;overflow:hidden;" align="center"> 
                <div data-options="region:'north'" style="width:100%; height:10%; padding:3px; overflow:hidden;" align="center">
                   <table >          
             <tr>              
              <td align="left"><asp:Label ID="Label38" CssClass="LetraChicaNegrita" runat="server">Conceptos:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboconceptos" data-options="editable:false"></td>
          </tr> 
          </table>
               </div>
               <div data-options="region:'south'" style="width:100%; height:90%; padding:3px; overflow:hidden;" >
                   <div id="Div6" class="easyui-panel" style="border:none; width:100%;height:100%">
               <ul class="easyui-tree" id="tvquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
           </div>     
              </div>            
          </div>
       </div>       
         <div data-options="region:'center'" style="width:80%;padding:3px; overflow-x:scroll;" align="center">   
           <br /><asp:Label ID="Label32" CssClass="LetraChicaNegrita" runat="server">PERCEPCIONES</asp:Label>
             <table class="easyui-datagrid" id="dgp" >
            <thead>
            <tr>                        
                <th data-options="field:'cveindp',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descopp',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importep',width:100,align:'right',halign:'center',
                    formatter:function(value, row){return accounting.formatMoney(row.importep);}">Importe</th>  
                <th data-options="field:'tipmov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>        
           <br /><asp:Label ID="Label33" CssClass="LetraChicaNegrita" runat="server">DEDUCCIONES</asp:Label>
             <table class="easyui-datagrid" id="dgd" >
            <thead>
            <tr>                        
                <th data-options="field:'cveind',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descod',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importe',width:100,align:'right',halign:'center',
                    formatter:function(value, row){return accounting.formatMoney(row.importe);}">Importe</th>  
                <th data-options="field:'tipmov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>
           <br /><asp:Label ID="Label34" CssClass="LetraChicaNegrita" runat="server">APORTACIONES</asp:Label>
             <table class="easyui-datagrid" id="dga" >
            <thead>
            <tr>                        
                <th data-options="field:'cveind',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descop',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importe',width:100,align:'right',halign:'center',
                    formatter:function(value, row){return accounting.formatMoney(row.importe);}">Importe</th>  
                <th data-options="field:'tipmov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>
           <br /><asp:Label ID="Label35" CssClass="LetraChicaNegrita" runat="server">TOTALES</asp:Label>
             <table class="easyui-datagrid" id="dgt" >
            <thead>
            <tr>                                        
                <th data-options="field:'tipo',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importe',width:100,align:'right',halign:'center',
                    formatter:function(value, row){return accounting.formatMoney(row.importe);}">Importe</th>  
            </tr>
            </thead>         
        </table>
        </div>
      </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winemp" closed="true">
            <form id="Form2" method="post" novalidate>
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocam" data-options="editable:false"></input>
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
                <table id="dgplaza"> 
                <thead>
                     <tr>                                                
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th> 
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">R.f.c.</th>                         
                        <th data-options="field:'nomcom',width:500,align:'left',halign:'left'">Nombre</th>                        
                    </tr>
                </thead>                   
            </table>           
            </form>                                         
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
