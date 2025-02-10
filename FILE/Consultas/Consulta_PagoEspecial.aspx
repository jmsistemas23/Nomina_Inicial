<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_PagoEspecial.aspx.cs" Inherits="FILE_Consultas_Consulta_PagoEspecial" %>

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
    <script type="text/javascript" src="Consulta_PagoEspecial.js?1.1"></script>  
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
        <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>              
       </div> 
       <br /> 
        <table >
          <tr>              
              <td align="left"><asp:Label ID="Label37" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:250px;" id="cboquin" data-options="editable:false"></td>
          </tr>           
       </table>
         <br /> 
     <div class="easyui-layout" style="width:100%;height:85%; overflow-x: hidden;overflow-y: scroll;" align="center">        
      <table>
          <tr>              
              <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">No. Plaza:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtplaza" data-options="readonly:true" value=""></input></td>              
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
           <tr>              
              <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
              <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtpagaduria" data-options="readonly:true"></input></td>              
          </tr>         
          <tr>                            
              <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Puesto:</asp:Label></td>
              <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:550px;" id="txtpuesto" data-options="readonly:true"></input></td>                  
          </tr>
      </table>
      <table>
          <tr>
              <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Estatus:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtestatus" data-options="readonly:true"></input></td>   
              <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Horas Plaza:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txthrplaza" data-options="readonly:true"></input></td>
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Nivel Salarial:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnivsal" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Nivel Antecedente:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnivant" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Tipo Puesto:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txttipopue" data-options="readonly:true"></input></td>   
              <td align="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Tipo Pago:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txttippago" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Grupo Jer.:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtgpojer" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtbanco" data-options="readonly:true"></input></td>
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label38" CssClass="LetraChicaNegrita" runat="server">Num. Cheque:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtcheque" data-options="readonly:true"></td>   
              <td align="left">&nbsp;</td>
              <td align="left">&nbsp;</td>
          </tr>
            </table>
        <br /><asp:Label ID="Label32" CssClass="LetraChicaNegrita" runat="server">PERCEPCIONES</asp:Label>
        <table class="easyui-datagrid" id="dgp" >
            <thead>
            <tr>                        
                <th data-options="field:'indicame',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descop',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importme',width:100,align:'right',halign:'center'">Importe</th>  
                <th data-options="field:'tipomov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>
          <br /><asp:Label ID="Label33" CssClass="LetraChicaNegrita" runat="server">DEDUCCIONES</asp:Label>
        <table class="easyui-datagrid" id="dgd" >
            <thead>
            <tr>                        
                <th data-options="field:'indicame',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descod',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importme',width:100,align:'right',halign:'center'">Importe</th>  
                <th data-options="field:'tipomov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>
          <br /><asp:Label ID="Label34" CssClass="LetraChicaNegrita" runat="server">APORTACIONES</asp:Label>
        <table class="easyui-datagrid" id="dga" >
            <thead>
            <tr>                        
                <th data-options="field:'indicame',width:70,align:'center',halign:'center'">Clave</th>                              
                <th data-options="field:'descop',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importme',width:100,align:'right',halign:'center'">Importe</th>  
                <th data-options="field:'tipomov',width:70,align:'center',halign:'center',hidden:false">Tipo</th>                              
            </tr>
            </thead>         
        </table>
         <br /><asp:Label ID="Label35" CssClass="LetraChicaNegrita" runat="server">TOTALES</asp:Label>
        <table class="easyui-datagrid" id="dgt" >
            <thead>
            <tr>                                        
                <th data-options="field:'tipo',width:350,align:'left',halign:'center'">Descripción</th>                              
                <th data-options="field:'importme',width:100,align:'right',halign:'center'">Importe</th>                  
            </tr>
            </thead>         
        </table>
      </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow: hidden;" id="winemp" closed="true" align="center">           
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
                <table id="dgplaza"> 
                <thead>
                    <tr>                        
                        <th data-options="field:'numplame',width:80,align:'center',halign:'center'">Plaza</th>  
                        <th data-options="field:'numempme',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'nomcom',width:300,align:'left',halign:'center'">Nombre</th>                        
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">RFC</th>
                        <th data-options="field:'cveesppl',width:80,align:'center',halign:'center',hidden: true">Estatus Plaza</th> 
                        <th data-options="field:'hrspla',width:120,align:'center',halign:'center',hidden: true">Hrs. Plaza</th>                                                 
                        <th data-options="field:'viginime',width:110,align:'center',halign:'center',hidden: false">Vig. Incial</th>                          
                        <th data-options="field:'vigfinme',width:110,align:'center',halign:'center',hidden: false">Vig. Final</th>         
                        <th data-options="field:'cvepagme',width:120,align:'center',halign:'center',hidden: true">cvePagaduría</th>                         
                        <th data-options="field:'despag',width:120,align:'center',halign:'center',hidden: true">Pagaduria</th>                                          
                        <th data-options="field:'cvepuepl',width:120,align:'center',halign:'center',hidden: true">Cvepuesto</th>                          
                        <th data-options="field:'despue',width:120,align:'center',halign:'center',hidden: true">Puesto</th>                          
                        <th data-options="field:'cvpuespu',width:120,align:'center',halign:'center',hidden: true">cvpuespu</th>                          
                        <th data-options="field:'cvejerpu',width:120,align:'center',halign:'center',hidden: true">cvejerpu</th>                          
                        <th data-options="field:'cvepagplaor',width:120,align:'center',halign:'center',hidden: true">cvepagplaor</th>                          
                        <th data-options="field:'cvenivpl',width:120,align:'center',halign:'center',hidden: true">cvenivpl</th>                                                  
                        <th data-options="field:'cvebanme',width:120,align:'center',halign:'center',hidden: true">cvebanme</th>                          
                        <th data-options="field:'desbanme',width:120,align:'center',halign:'center',hidden: true">desbanme</th>                          
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
    </form>
</body>
</html>
