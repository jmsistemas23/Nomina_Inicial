<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MovimientosDP.aspx.cs" Inherits="FILE_Asistentes_MovimientosDP" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">  
    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
	<script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>  
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script> 
     <script type="text/javascript" src="MovimientosDP.js"></script>    
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
            <div id="p" data-options="region:'west'" style="width:40%;padding:0px; overflow:hidden;" align="center">
                <div class="easyui-layout" style="width:100%;height:100%; overflow:hidden;">
                    <div data-options="region:'north'" style="width:100%; height:9%; padding:5px; overflow:hidden;" align="center"> 
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Listado De Movimientos De Datos Personales"></asp:Label> 
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
                        <td align="left"><input  class="easyui-combobox"  style="width:560px;" id="cboInd" data-options="editable:false"></input></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita"  runat="server">Visible:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkvisible" ></td>
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
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
