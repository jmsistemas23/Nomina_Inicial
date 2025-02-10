<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Pensionadas.aspx.cs" Inherits="FILE_Consultas_Consulta_Pensionadas" %>

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
    <script type="text/javascript" src="Consulta_Pensionadas.js?1.5"></script>  
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
        .auto-style2 {
            height: 23px;
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
        <div class="easyui-layout" style="width:100%;height:90%; overflow-x:hidden;overflow-y:scroll;" align="center"> 
         <table >
          <tr>              
              <td align="left"><asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Quincena:</asp:Label></td>
              <td align="left"><input  class="easyui-combobox"  style="width:200px;" id="cboquin" data-options="editable:false"></td>
          </tr> 
       </table>
        <br />     
        <table>
          <tr>              
              <td align="center" class="auto-style2" colspan="5"><asp:Label ID="Label53" CssClass="LetraChicaNegrita" runat="server">DATOS DEL EMPLEADO</asp:Label></td>
          </tr>           
          <tr>              
              <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true" value=""></input></td>              
              <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">R.F.C:</asp:Label></td>              
              <td align="left"><input  class="easyui-textbox"  style="width:151px;" id="txtrfc" data-options="readonly:true"></td>              
              <td align="left"></input></td>              
          </tr>           
           <tr>              
              <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Nombre del Empleado:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:490px;" id="txtnombreempleado" data-options="readonly:true"></input></td>              
          </tr>
          </table>
        <table>
          <tr>
              <td align="left">&nbsp;</td>
              <td align="left">&nbsp;</td>   
              <td align="left" colspan="2">&nbsp;</td>
              <td align="left">&nbsp;</td>
          </tr>
          <tr>
              <td align="center" colspan="5"><asp:Label ID="Label54" CssClass="LetraChicaNegrita" runat="server">DATOS DE LA PENSION</asp:Label></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">R.F.C:</asp:Label></td>
              <td align="left" colspan="2"></input></input><input  class="easyui-textbox"  style="width:200px;" id="txtrfcpen" data-options="readonly:true"></td>   
              <td align="left"><asp:Label ID="Label48" CssClass="LetraChicaNegrita" runat="server">Curp:</asp:Label></td>   
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtcurppen" data-options="readonly:true"></td>   
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Apellido Paterno:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:400px;" id="txtappaternopen" data-options="readonly:true"></td>   
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Apellido Materno:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:400px;" id="txtapmaternopen" data-options="readonly:true"></input></input></td>   
          </tr>
           <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Nombre (s):</asp:Label></td>
              <td align="left" class="auto-style1" colspan="4"><input  class="easyui-textbox"  style="width:400px;" id="txtnompen" data-options="readonly:true"></input></input></td>   
          </tr>
           <tr>
              <td align="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Sexo:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtsexopen" data-options="readonly:true"></input></td>   
              <td align="left" colspan="2"><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Telefono:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txttelefonopen" data-options="readonly:true"></td>
          </tr>
            <tr>
              <td align="left"><asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Calle:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:270px;" id="txtcallepen" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label47" CssClass="LetraChicaNegrita" runat="server">No. Interior:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnointeriorpen" data-options="readonly:true"></td>
          </tr>
           <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Colonia:</asp:Label></td>
              <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:270px;" id="txtcoloniapen" data-options="readonly:true"></td>   
              <td align="left" class="auto-style1" colspan="2"><asp:Label ID="Label55" CssClass="LetraChicaNegrita" runat="server">No. Exterior:</asp:Label></td>
              <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnoexteriorpen" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">CP.</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtcppen" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">No. Cred. Ife:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtifepen" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Estado:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:270px;" id="txtestadopen" data-options="readonly:true"></td>   
              <td align="left" colspan="2">&nbsp;</td>
              <td align="left">&nbsp;</td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server">Municipio:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:270px;" id="txtmunicipiopen" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label56" CssClass="LetraChicaNegrita" runat="server">Localidad:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:270px;" id="txtlocalidadpen" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left">&nbsp;</td>
              <td align="left">&nbsp;</td>   
              <td align="left" colspan="2">&nbsp;</td>
              <td align="left">&nbsp;</td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Juszago:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:678px;" id="txtjusgado" data-options="readonly:true"></td>   
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server">No. Oficio:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnooficio" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">No. Expediente:</asp:Label></td>
              <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtnoexpediente" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server">Nombre del Juez:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:678px;" id="txtnombrejuez" data-options="readonly:true"></input></input></td>   
          </tr>
          <tr>
              <td align="left">&nbsp;</td>
              <td align="left">&nbsp;</td>   
              <td align="left" colspan="2">&nbsp;</td>
              <td align="left">&nbsp;</td>
          </tr>        
          <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label45" CssClass="LetraChicaNegrita" runat="server">Indicador:</asp:Label></td>
              <td align="left" class="auto-style1" colspan="3"><input  class="easyui-textbox"  style="width:350px;" id="txtindicador" data-options="readonly:true"></td>   
              <td align="left" class="auto-style1">&nbsp;</td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label51" CssClass="LetraChicaNegrita" runat="server">Cuota/Porcentaje:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtporcentaje" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label57" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:269px;" id="txtdescripcion" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left" class="auto-style1"><asp:Label ID="Label52" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label></td>
              <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtviginicial" data-options="readonly:true"></td>   
              <td align="left" colspan="2" class="auto-style1"><asp:Label ID="Label58" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label></td>
              <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtvigfinal" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label59" CssClass="LetraChicaNegrita" runat="server">Tipo de Págo:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txttipopago" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label60" CssClass="LetraChicaNegrita" runat="server">Cheque:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtcheque" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label61" CssClass="LetraChicaNegrita" runat="server">Banco:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:270px;" id="txtbanco" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label65" CssClass="LetraChicaNegrita" runat="server">Importe:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtimporte" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label62" CssClass="LetraChicaNegrita" runat="server">No. Cuenta:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtcuenta" data-options="readonly:true"></td>   
              <td align="left" colspan="2"><asp:Label ID="Label63" CssClass="LetraChicaNegrita" runat="server">Cuenta Clabe:</asp:Label></td>
              <td align="left"><input  class="easyui-textbox"  style="width:200px;" id="txtcuentaclabe" data-options="readonly:true"></td>
          </tr>
          <tr>
              <td align="left"><asp:Label ID="Label64" CssClass="LetraChicaNegrita" runat="server">Pagaduría:</asp:Label></td>
              <td align="left" colspan="4"><input  class="easyui-textbox"  style="width:678px;" id="txtpagaduria" data-options="readonly:true"></td>   
          </tr>
          </table>
       </div>
    </div>
     <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true">            
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
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center',sortable:true">Empleado</th> 
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center',sortable:true">R.f.C.</th>                         
                        <th data-options="field:'nomemp',width:300,align:'left',halign:'left',sortable:true">Nombre Empleado</th>                        
                        <th data-options="field:'nompen',width:300,align:'left',halign:'left',sortable:true">Nombre Pensionada</th>                        
                        <th data-options="field:'sexo',width:50,align:'center',halign:'center'">Sexo</th>                        
                        <th data-options="field:'cvepag',width:80,align:'center',halign:'center'">Cve Zona</th> 
                        <th data-options="field:'despag',width:300,align:'left',halign:'center'">Des Zona</th> 
                        <th data-options="field:'id',width:80,align:'center',halign:'center',hidden:true">Id</th> 
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
