<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MovimientosIL.aspx.cs" Inherits="FILE_Asistentes_MovimientosIL" %>

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
     <script type="text/javascript" src="MovimientosIL.js?1.5"></script>    
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
                        <asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server" Text="Listado De Incidencias Laborales"></asp:Label> 
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
                    </tr

                    <tr>
                        <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita"  runat="server">Aplica Descuento:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkAplicaDescuento" ></td>
                    </tr>
                    <tr>
                        <td align="left"> <asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Indicador Descuento:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:60px" id="txtConceptoD" data-options="readonly:true">
                           <a id="btnConceptoD" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" style="width: 70px">Buscar</a>
                           <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar' ,disabled:true" id="btnLConceptoD">Limpiar</a>
                       </td>
                    </tr>
                     <tr>
                        <td align="left"> <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Factor De Incidencia:</asp:Label></td>
                       <td align="left"><input class="easyui-textbox" style="width:60px" id="txtFactor"></td>
                    </tr>
                    <tr>
                        <td align="left" ><asp:Label ID="Label18" CssClass="LetraChicaNegrita"  runat="server">Aplica Descuento con Validacion:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkADesValidacion" ></td>
                    </tr>
                    <tr>
                        <td align="left" > <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Desc. Medio Sueldo:</asp:Label></td>
                        <td align="left"><input class="easyui-textbox" style="width:60px" id="txtmediosueldo" data-options="readonly:true">
                           <a id="btnDmediosueldo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" style="width: 70px">Buscar</a>
                           <a id="btnLmediosueldo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar' ,disabled:true">Limpiar</a>
                       </td>
                    </tr>
                    <tr>
                        <td align="left" > <asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Desc. Sin Sueldo:</asp:Label></td>
                        <td align="left"><input class="easyui-textbox" style="width:60px" id="txtsinsueldo" data-options="readonly:true">
                           <a id="btnDsinsueldo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" style="width: 70px">Buscar</a>
                           <a id="btnLsinsueldo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar' ,disabled:true">Limpiar</a>
                       </td>
                    </tr>
                    <tr>
                        <td align="left" ><asp:Label ID="Label17" CssClass="LetraChicaNegrita"  runat="server">Genera Recurso Temporal:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkgenrectemp"></td>
                    </tr>
                    <tr>
                        <td align="left" ><asp:Label ID="Label5" CssClass="LetraChicaNegrita"  runat="server">Resta Dias:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkrestadias"></td>
                    </tr>
                     <tr>
                        <td align="left" ><asp:Label ID="Label6" CssClass="LetraChicaNegrita"  runat="server">Anexa Expediente:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkexpediente"></td>
                    </tr>
                     <tr>
                        <td align="left" ><asp:Label ID="Label21" CssClass="LetraChicaNegrita"  runat="server">Forzar Error Antiguedad:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkantiguedad" ></td>
                    </tr>
                     <tr>
                        <td align="left" ><asp:Label ID="Label22" CssClass="LetraChicaNegrita"  runat="server">Forzar Error Emp. Inactivo:</asp:Label></td>
                        <td align="left" ><input type="checkbox" id="chkempinactivo" ></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita"  runat="server">Visible:</asp:Label></td>
                        <td align="left"><input type="checkbox" id="chkvisible" ></td>
                    </tr>
                </table>
                <br />  
                <div title="Empleados" style="overflow:auto;padding:5px;" align="center">               
                      <table class="easyui-datagrid" id="dg"  style="width:95%; " data-options = "striped: true,rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 10 ">
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
     
     <div id="modalConceptos" class="easyui-window" title="Buscar Conceptos" data-options="modal:true,minimizable:false,collapsible:false,maximizable:false,closed:true,iconCls:'icon-search'"  align="center" style="width: 650px; height: 600px; overflow:hidden;">
         <div class="easyui-panel" style="padding:3px; width:100%">                 
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnCancelarConceptos">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptarConceptos">Aceptar</a>                          
         </div>                 
         <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>                       
         <table class="easyui-datagrid" style="width: 100%; height: 90%;" id="dgConceptos" data-options = "striped: true,rownumbers: true, singleSelect: false, autoRowHeight: false, pageSize: 10 "></table>      
     </div>
      <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../../Imagenes/ajax-loader.gif" />
        </div> 
    </div>    
    </form>
</body>
</html>
