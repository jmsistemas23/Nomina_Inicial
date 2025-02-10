<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Pension_Alimenticia.aspx.cs" Inherits="FILE_Consultas_Consulta_Pension_Alimenticia" %>

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
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
     <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
     <script src="../../Scripts/jquery-Mask.js"></script>  
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script type="text/javascript" src="Consulta_Pension_Alimenticia.js"></script>  
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
       <div id="dlista" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center">              
          <div class="easyui-panel" style="padding:3px; width:100%">                               
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarLista">Limpiar</a>                
          </div>
          <br />
          <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbocam" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:130px;" id="cbocon" data-options="editable:false">
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
          <br />
         <table style="display:none;" id="dglista"> 
                  <thead>
                    <tr>                                               
                        <th data-options="field:'numemp',width:100,align:'center',halign:'center'">Empleado</th>  
                        <th data-options="field:'nomemp',width:300,align:'left',halign:'center'">Nombre Empleado</th>  
                        <th data-options="field:'nompen',width:300,align:'left',halign:'center'">Beneficiario</th>  
                        <th data-options="field:'oficipen',width:100,align:'center',halign:'center'">Oficio</th>                        
                        <th data-options="field:'descrip',width:400,align:'left',halign:'center'">Tipo de Descuento</th>  
                        <th data-options="field:'penimpor',width:120,align:'right',halign:'center'">Importe/Porcentaje</th>                          
                        <th data-options="field:'id',width:100,align:'center',halign:'center',hidden:true">Id</th>  
                    </tr>
                  </thead>                          
            </table>              
     </div>
        <div id="dcaptura" class="easyui-layout" style="width:100%;height:100%; overflow:hidden; display:none" align="center">     
          <div class="easyui-panel" style="padding:3px; width:100%">                                        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>                   
           </div>         
          <br />
          <div id="ddatos" align="Center" style="height:90%; overflow-y:scroll"></div>    
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
