<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MovimientosMP.aspx.cs" Inherits="FILE_Asistentes_MovimientosMP" %>

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

     <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">	     

    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>   
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script> 
     <script type="text/javascript" src="MovimientosMP.js?1.7"></script>    
    <style type="text/css">
        .auto-style1 {
            width: 20px;
        }
        .auto-style2 {
            width: 7px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
         <div class="easyui-panel" style="padding:3px; width:100%">                                                     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar" >Limpiar</a>        
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo">Agregar Elemento</a>      
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar" >Guardar</a>                                                        
            </div>  
        <div class="easyui-layout" style="width:93%;height:86%; overflow:hidden; margin-top:30px; ">
            <div id="p" data-options="region:'west'" style="border:none; width:40%;padding:0px; overflow:hidden;" align="center">
                <div class="easyui-layout" style="border:none; width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:9%; padding:5px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Listado De Movimientos De Personal"></asp:Label> 
                        <input class="easyui-textbox" style="width:100%" id="txtFmenu">
                    </div>
                    <div data-options="region:'south'" style="width:100%; height:91%; padding:3px; overflow:hidden;" >
                        <div id="Div7" class="easyui-panel" style="width:100%;height:100%">
                           <ul class="easyui-tree" id="lstMenus" data-options="animate:true,lines:false"></ul>
                        </div> 
                    </div>
                 </div>     
            </div>
            <div data-options="region:'center'" style="padding:5px;overflow:hidden;" align="center">
                <table style="margin-top:30px;">                   
                    <tr>
                        <td align="left"> <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nivel Superior:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:60px" id="txtpropietario" data-options="readonly:true"><input class="easyui-textbox" style="width:500px" id="txtNomPropietario" data-options="readonly:true"></td>
                    </tr>                    
                     <tr>
                        <td align="left"> <asp:Label ID="Label16" CssClass="LetraChicaNegrita" runat="server">Movimiento:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:60px" id="txtId" data-options="readonly:true"><input class="easyui-textbox" style="width:500px" id="txtnombremenu"></td>
                    </tr>

                     <tr>
                        <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita"  runat="server">Índice De Afectación:</asp:Label></td>
                        <td align="left">
                            <input  class="easyui-combobox"  style="width:570px;" id="cboInd" data-options="editable:false"></input>
                        </td>
                    </tr>

                     <tr>
                        <td align="left"><asp:Label ID="Label23" CssClass="LetraChicaNegrita"  runat="server">Índice Pendiente de Pago:</asp:Label></td>
                        <td align="left"><input  class="easyui-combobox"  style="width:570px;" id="cbopenpago" data-options="editable:false"></td>
                    </tr>
                </table>
                <table style="width: 62%">
                     <tr>
                        <td align="left"><asp:Label ID="Label5" CssClass="LetraMiniChica"  runat="server">SUMA Dias Laborados:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chksumadias" ></td>
                        <td align="left"><asp:Label ID="Label7" CssClass="LetraMiniChica"  runat="server">Genera Empleado (Valida CURP):</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkgeneraemp" ></td>
                    </tr>

                     <tr>
                        <td align="left"><asp:Label ID="Label6" CssClass="LetraMiniChica"  runat="server">RESTA Dias Laborados:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkrestadias" ></td>
                        <td align="left"><asp:Label ID="Label8" CssClass="LetraMiniChica"  runat="server">Genera Historia De Plaza:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkhispla" ></td>
                    </tr>

                                 <tr>
                        <td align="left" ><asp:Label ID="Label9" CssClass="LetraMiniChica"  runat="server">Aplica Aguinaldo Proporcional:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkaguiprop" ></td>
                        <td align="left" ><asp:Label ID="Label10" CssClass="LetraMiniChica"  runat="server">Anexa Expediente:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkexpediente" ></td>
                    </tr>
                                 <tr>
                        <td align="left"><asp:Label ID="Label3" CssClass="LetraMiniChica"  runat="server">Liberar Recurso:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chklibrecurso" ></td>
                        <td align="left" ><asp:Label ID="Label4" CssClass="LetraMiniChica"  runat="server">Tomar Recurso:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chktomarrecurso" ></td>
                    </tr>
                                 <tr>
                        <td align="left" ><asp:Label ID="Label12" CssClass="LetraMiniChica"  runat="server">Modifica Recurso:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkmodrecurso" ></td>
                        <td align="left" ><asp:Label ID="Label14" CssClass="LetraMiniChica"  runat="server">Compacta Recurso:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkcomrecurso"></td>
                    </tr>
                     <tr>
                        <td align="left" ><asp:Label ID="Label15" CssClass="LetraMiniChica"  runat="server">Descompacta Recurso:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkdescomrecurso"></td>
                        <td align="left" ><asp:Label ID="Label17" CssClass="LetraMiniChica"  runat="server">Genera Recurso Temporal:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkgenrectemp"></td>
                    </tr>
                    <tr>
                        <td align="left" ><asp:Label ID="Label18" CssClass="LetraMiniChica"  runat="server">Cancela Recurso:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkcancelarecurso"></td>
                        <td align="left" ><asp:Label ID="Label19" CssClass="LetraMiniChica"  runat="server">Alta Issste:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkaltaiste" ></td>
                    </tr>                      
                       <tr>
                        <td align="left"><asp:Label ID="Label20" CssClass="LetraMiniChica"  runat="server">Baja Issste:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkbajaiste" ></td>
                        <td align="left" ><asp:Label ID="Label21" CssClass="LetraMiniChica"  runat="server">Modifica Issste:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkmodificaiste" ></td>
                    </tr>
                     <tr>
                        <td align="left" ><asp:Label ID="Label11" CssClass="LetraMiniChica"  runat="server">Visible:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkvisible" ></td>
                        <td align="left"><asp:Label ID="Label22" CssClass="LetraMiniChica"  runat="server">Genera Proyección PS:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkproyeccion" ></td>
                    </tr>
                     </table>
                <br />  
                <div title="Empleados" style="overflow:auto;padding:5px;" align="center">               
                      <table class="easyui-datagrid" id="dg"  style="width:95%;" data-options = "striped: true,rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">
                        <thead>
                        <tr>                        
                            <th data-options="field:'id',width:70,align:'center',halign:'center'">Id</th>                              
                            <th data-options="field:'nombre',width:700,align:'left',halign:'left'">Nombre</th>        
                        </tr>
                        </thead>
                       </table>       
                   </div>           
            </div>
         </div> 
    </div>
         <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
