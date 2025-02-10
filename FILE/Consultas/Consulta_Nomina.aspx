<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Nomina.aspx.cs" Inherits="FILE_Consultas_Consulta_Nomina" %>

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
     <script src="../../Scripts/accounting.js"></script>
    <script type="text/javascript" src="Consulta_Nomina.js?0.2"></script>  
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
        .auto-style2 {
        }
        .auto-style3 {
            height: 26px;
            width: 217px;
        }
        .auto-style4 {
            width: 217px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a> 
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'Imp-Reporte',disabled:true" id="btnReporte">Reporte</a>                          
       </div> 
         <br />
         <table >
          <tr>              
              <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboquin" data-options="editable:false"></td>
          </tr> 
             <tr>              
              <td align="left"><asp:Label ID="Label38" CssClass="LetraChicaNegrita" runat="server">Conceptos:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboconceptos" data-options="editable:false"></td>
          </tr> 
       </table>
       <br />              
         <table>
          <tr>              
              <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">No. Plaza:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtplaza" data-options="readonly:true" value=""></input></td>              
              <td align="left">
                    <asp:Label ID="Label39" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial Plaza:</asp:Label>
                </td>              
              <td align="left"></input>
                    <input  class="easyui-textbox"  style="width:150px;" id="txtviginipla" data-options="readonly:true"></td>              
          </tr>           
           <tr>              
              <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">No. Empleado:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:150px;" id="txtempleado" data-options="readonly:true"></td>              
              <td align="left">
                    <asp:Label ID="Label40" CssClass="LetraChicaNegrita" runat="server">Vigencia Final Plaza:</asp:Label>
                </td>              
              <td align="left">
                    <input  class="easyui-textbox"  style="width:150px;" id="txtvigfinpla" data-options="readonly:true"></td>              
          </tr>          
           <tr>              
              <td align="left">
                    <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label>
                </td>
              <td align="left">
                    <input  class="easyui-textbox"  style="width:150px;" id="txtrfc" data-options="readonly:true"></td>              
              <td align="left">
                    <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">CURP:</asp:Label>
                </td>              
              <td align="left">
                    <input  class="easyui-textbox"  style="width:150px;" id="txtcurp" data-options="readonly:true"></td>              
          </tr>          
           <tr>              
              <td align="left">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre:</asp:Label>
                </td>
              <td align="left" colspan="3">
                    <input  class="easyui-textbox"  style="width:481px;" id="txtnombre" data-options="readonly:true"></td>              
          </tr>          
         </table>
       <div class="easyui-layout" style="width:100%;height:65%; overflow-x: hidden;overflow-y: scroll;" align="center">   
             <table>          
           <tr>              
              <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Estatus:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txtestatus" data-options="readonly:true"></td>              
          </tr>
           <tr>              
              <td align="left">
                    <asp:Label ID="Label55" CssClass="LetraChicaNegrita" runat="server">Tipo de Plaza:</asp:Label>
                   </td>
              <td align="left">
                    <input  class="easyui-textbox"  style="width:600px;" id="txttipoplaza" data-options="readonly:true"></td>              
          </tr>
           <tr>              
              <td align="left"><asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Adscripción:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txtadscripcion" data-options="readonly:true"></input></td>              
          </tr>
           <tr>              
              <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txtpagaduria" data-options="readonly:true"></input></td>              
          </tr>
          <tr>                            
              <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Puesto:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txtpuesto" data-options="readonly:true"></input></td>                  
          </tr>
          <tr>                            
              <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Tipo Puesto:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txttipopue" data-options="readonly:true"></td>                  
          </tr>
          <tr>                            
              <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Puesto Anterior:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:600px;" id="txtpuestoant" data-options="readonly:true"></td>                  
          </tr>
      </table>          
             <table style="width: 990px">
          <tr>
              <td align="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Tipo Pago:</asp:Label></td>
              <td align="left" class="auto-style4"><input  class="easyui-textbox"  style="width:200px;" id="txttippago" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Grupo Jer.:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtgpojer" data-options="readonly:true"></td>
              <td align="left"><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Días de Pago:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtdiaspago" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label></td>
              <td align="left" class="auto-style4"></input><input  class="easyui-textbox"  style="width:200px;" id="txtbanco" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">No. Cuenta:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:200px;" id="txtcuenta" data-options="readonly:true"></td>
              <td align="left"><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Días de Retro:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtdiasretro" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Quinquenio:</asp:Label></td>
              <td align="left" class="auto-style3"></input><input  class="easyui-textbox"  style="width:100px;" id="txtquinquenio" data-options="readonly:true"></td>   
              <td align="left" class="auto-style1"><asp:Label ID="Label27" CssClass="LetraChicaNegrita" runat="server">N.S.S.:</asp:Label></td>
              <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnss" data-options="readonly:true"></td>
              <td align="left" class="auto-style1"><asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server">Base Grabable:</asp:Label></td>
              <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtbasegrab" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label29" CssClass="LetraChicaNegrita" runat="server">Estatus Pago:</asp:Label></td>
              <td align="left" class="auto-style4"></input><input  class="easyui-textbox"  style="width:200px;" id="txtestatuspag" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server">No. Recibo:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtrecibo" data-options="readonly:true"></td>
              <td align="left">
                    <asp:Label ID="Label58" CssClass="LetraChicaNegrita" runat="server">Año de Jubilación:</asp:Label>
                </td>
              <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtanojub" data-options="readonly:true"></td>
          </tr>
            <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Periodo Pag.:</asp:Label></td>
              <td align="left" class="auto-style3"></input><input  class="easyui-textbox"  style="width:200px;" id="txtperpag" data-options="readonly:true"></td>   
              <td align="left" class="auto-style1"><asp:Label ID="Label25" CssClass="LetraChicaNegrita" runat="server">No. Cheque:</asp:Label></td>
              <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:100px;" id="txtcheque" data-options="readonly:true"></td>
              <td align="left" class="auto-style1">
                    <asp:Label ID="Label57" CssClass="LetraChicaNegrita" runat="server">%. de Jubilación:</asp:Label>
                </td>
              <td align="left" class="auto-style1">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtporjub" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left">
                    <asp:Label ID="Label47" CssClass="LetraChicaNegrita" runat="server">Tipo de Incremento:</asp:Label>
                </td>
              <td align="left" class="auto-style2" colspan="5"></input><input  class="easyui-textbox"  style="width:246px;" id="txttipoinc" data-options="readonly:true"></input></td>   
          </tr>
          <tr>
              <td align="left">
                    <asp:Label ID="Label59" CssClass="LetraChicaNegrita" runat="server">Benefactor:</asp:Label>
                </td>
              <td align="left" colspan="5">
                    <input  class="easyui-textbox"  style="width:639px;" id="txtbenef" data-options="readonly:true"></td>   
          </tr>          
          </table>             
             <table>
             <tr>
                 <td align="left">
                  <asp:Label ID="Label31" CssClass="LetraChicaNegrita" runat="server">Ultimo Movimiento:</asp:Label>
                </td>
              <td align="left" colspan="5">
                    <input  class="easyui-textbox"  style="width:700px;" id="txtmovimiento" data-options="readonly:true"></td>   
             </tr>
         </table>
             <table>
             <tr>
              <td align="left">
                    <asp:Label ID="Label45" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label>
                </td>              
                 <td align="left"></input>
                    <input  class="easyui-textbox"  style="width:100px;" id="txtviginicialmov" data-options="readonly:true"></td>              
              <td align="left">
                    <asp:Label ID="Label46" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label>
                </td>
              <td align="left">
                    <input  class="easyui-textbox"  style="width:100px;" id="txtvigfinalmov" data-options="readonly:true"></td>              
             </tr>          
         </table>
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
           <br />
           <br />
           <br />
           <br />
           <br />
           <br />            
      </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;"  id="winemp" closed="true" align="center">         
            <table>
                <tr>
                   <td align="Left" class="auto-style2"><asp:Label ID="Label9" CssClass="LetraChicaNegrita"  runat="server" Text="Mantener Campo Busqueda:"></asp:Label></td>
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
                <table id="dgplaza" class="easyui-datagrid" style="width:100%;height:505px"> 
                <thead>
                    <tr>                        
                        <th data-options="field:'numplaza',width:80,align:'center',halign:'center',sortable:true">Plaza</th>                          
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center',sortable:true">Empleado</th> 
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center',sortable:true">R.f.c.</th>                         
                        <th data-options="field:'nomcom',width:350,align:'left',halign:'center',sortable:true">Nombre</th>
                        <th data-options="field:'cveesppl',width:80,align:'center',halign:'center',sortable:true">Estatus</th>
                        <th data-options="field:'cvepuepl',width:80,align:'center',halign:'center',sortable:true">Puesto</th>                        
                        <th data-options="field:'cvenivpl',width:120,align:'center',halign:'center',sortable:true">Nivel</th>                         
                        <th data-options="field:'cvezonpl',width:120,align:'center',halign:'center',hidden: true">zona</th>                                                 
                       <%-- <th data-options="field:'hrspla',width:80,align:'center',halign:'center',hidden: true">Horas</th>--%>
                        <th data-options="field:'vigini',width:120,align:'center',halign:'center',hidden: true">VigIni</th>                          
                        <th data-options="field:'vigfin',width:120,align:'center',halign:'center',hidden: true">VigFin</th>                          
                        <th data-options="field:'cveadspl',width:120,align:'center',halign:'center',hidden: true">Adscripcion</th>                          
                        <th data-options="field:'cvepagpl',width:120,align:'center',halign:'center',hidden: true">Pagaduria</th>                          
                        <th data-options="field:'estrucprog',width:120,align:'center',halign:'center',hidden: true">EstrucProg</th>                          
                    </tr>
                </thead>                   
            </table>                                                       
        </div>                     
    </div>
         <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
        <asp:HiddenField ID="HiddenField1" runat="server" />
    </form>
</body>
</html>
