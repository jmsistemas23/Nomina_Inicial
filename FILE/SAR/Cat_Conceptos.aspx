<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cat_Conceptos.aspx.cs" Inherits="FILE_SAR_Cat_Conceptos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
        <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
        <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
         <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>          
        <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="../../scripts/demos.js"></script>
	    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>   
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
         <script src="../../Scripts/jquery-Mask.js"></script>  
         <script src="../../Scripts/jquery.session.js"></script>  
        <script type="text/javascript" src="Cat_Conceptos.js?v1.4"></script>  
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
       <div id="dlista" title="" style="width:100%;height:100%;padding:0px;" align="Center">    
            <div id="dmenu" class="easyui-panel" style="padding:3px; width:100%">  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btneditar">Editar</a>
            </div>
           <br />
           <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox"  style="width:200px;" id="cbcampos" name="state" data-options="editable:false"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbcondicion" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalor">
                </td>
                    <td align="Center">
                    <a id="btnbuscar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
          </table>
           <br /> 
            <table style="display:none; height:60%; width:70%" id="dgconceptos">
                <thead data-options="frozen:true">
                    <tr>                                                        
                    <th data-options="field:'Cvecon',width:70,align:'center',halign:'center'">Clave</th>
                    <th data-options="field:'Concepto',width:250,align:'left',halign:'center',hidden:false">Concepto</th>
                    </tr>
                </thead>  
                <thead>
                  <tr>
                    <th data-options="field:'Percepciones',width:350,align:'left',halign:'center'">Percepciones</th>                            
                    <th data-options="field:'Deducciones',width:350,align:'left',halign:'center'">Deducciones</th>
                    <th data-options="field:'Formula',width:80,align:'center',halign:'center'">Formula</th>
                    <th data-options="field:'PoPago',width:80,align:'center',halign:'center'">% Pago</th>
                    <th data-options="field:'TipoQnas',width:80,align:'center',halign:'center'">Quincena</th>
                    <th data-options="field:'noacum',width:150,align:'center',halign:'center'">No. Quincena Acumular</th>
                    <th data-options="field:'TopeImportes',width:80,align:'center',halign:'center'">Importe Max.</th>
                    <th data-options="field:'Tope_Base',width:80,align:'center',halign:'center'">Importe Tope</th>                   
                    </tr>
                </thead>           
            </table>   
       </div>
       <div id="dcaptura" title="" style="width:100%;height:100%;padding:0px;" align="Center">   
           <div class="easyui-panel" style="padding:3px; width:100%;"> 
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnregresar">Regresar</a>  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnmodificar">Modificar</a>
           </div>
           <br />
           <table>
               <tr>
                   <td align="left">
                        <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-textbox" style="width:100px" id="txtclave">
                   </td>
               </tr>
                <tr>
                   <td align="left">
                        <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-textbox" style="width:250px" id="txtdescripcion">
                   </td>
               </tr>
                <tr>
                    <td><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Percepciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtper"></td>
                    <td>
                        <a id="btnbper" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                        <a id="btnlper" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                    </td>                           
                </tr>
                <tr>
                    <td><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">Deducciones:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtded"></td>
                    <td>
                        <a id="btnbded" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                        <a id="btnlded" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                    </td>                           
                </tr>
                <tr>
                    <td><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Formula:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" data-options="readonly:true" style="width:300px" id="txtformula"></td>
                    <td align="left">                        
                        <a id="btnlformula" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" >Limpiar</a>
                         <select class="easyui-combobox"  style="width:200px;" id="ddlindicador" data-options="editable:false">
                              <option value="x">Seleccione Indicador</option>
                              <option value="PR">Percepción</option>
                              <option value="DD">Deducción</option>                              
                         </select>
                         <select class="easyui-combobox"  style="width:200px;" id="ddloperadores" data-options="editable:false">
                              <option value="x">Seleccione Operador</option>
                              <option value="+">Suma</option>
                              <option value="-">Resta</option>
                              <option value="*">Multiplicación</option>
                              <option value="(">Abrir Parentesis</option>
                              <option value=")">Cerrar Parentesis</option>
                         </select>
                    </td>                           
                </tr>
               <tr>
                   <td align="left">
                        <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">% Pago:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-numberbox" precision="3" style="width:100px" id="txtporpago">
                   </td>
                </tr>
               <tr>
                  <td align="left">
                        <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Tipo Quincenas:</asp:Label>
                   </td>
                    <td align="left">
                         <select class="easyui-combobox"  style="width:150px;" id="ddlquincenas" data-options="editable:false">
                              <option value="A">Ambas</option>
                              <option value="O">Ordinaria</option>
                              <option value="E">ExtraOrdinaria</option>                              
                         </select>
                    </td>
               </tr>
                <tr>
                   <td align="left">
                        <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">No. Qnas Acumular:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-numberbox" style="width:100px" id="txtnoqnas">
                   </td>
               </tr>
               <tr>
                   <td align="left">
                        <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Importe Max.:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-numberbox"  precision="2" style="width:100px" id="txtimpmax">
                   </td>
               </tr>
               <tr>
                   <td align="left">
                        <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Importe Tope Base:</asp:Label>
                   </td>
                   <td align="left">
                       <input class="easyui-numberbox"  precision="2" style="width:100px" id="txtimpbase">
                   </td>
               </tr>
           </table>
           <br />
           <table>
               <tr>
                   <td align="center"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Tipo de Pagos a Acumular</asp:Label></td>
               </tr>
               <tr>
                   <td align="center">
                       <table>
                           <tr>
                               <td align="Left"><input type="checkbox" value="ME" id="chkme"><asp:Label ID="Label17" CssClass="LetraChicaNegrita"  runat="server" Text="ME-Movimientos Especiales"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="CE" id="chkce"><asp:Label ID="Label13" CssClass="LetraChicaNegrita"  runat="server" Text="CE-Conceptos Espaciales"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="NM" id="chknm"><asp:Label ID="Label21" CssClass="LetraChicaNegrita"  runat="server" Text="NM-Nomina"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="RP" id="chkrp"><asp:Label ID="Label19" CssClass="LetraChicaNegrita"  runat="server" Text="RP-Retroactivos de Personal"></asp:Label></td>                                                              
                           </tr>
                          <%-- <tr>
                               <td align="Left"><input type="checkbox" value="IM" id="chkim"><asp:Label ID="Label16" CssClass="LetraChicaNegrita"  runat="server" Text="IM-Conceptos Especiales IMSS"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="MC" id="chkmc"><asp:Label ID="Label14" CssClass="LetraChicaNegrita"  runat="server" Text="MC-Pagos y Descuentos Diversos"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="RC" id="chkrc"><asp:Label ID="Label15" CssClass="LetraChicaNegrita"  runat="server" Text="RC-Ret. Pagos y Descuentos"></asp:Label></td>                               
                           </tr>
                           <tr>
                               <td align="Left"><input type="checkbox" value="IP" id="chkip"><asp:Label ID="Label20" CssClass="LetraChicaNegrita"  runat="server" Text="IP-ISR Piramidal"></asp:Label></td>                               
                               <td align="Left"><input type="checkbox" value="TE" id="chkte"><asp:Label ID="Label22" CssClass="LetraChicaNegrita"  runat="server" Text="TE-Tereceros"></asp:Label></td>
                           </tr>
                           <tr>
                               <td align="Left"><input type="checkbox" value="IS" id="chkis"><asp:Label ID="Label23" CssClass="LetraChicaNegrita"  runat="server" Text="IS-ISR"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="PA" id="chkpa"><asp:Label ID="Label24" CssClass="LetraChicaNegrita"  runat="server" Text="PA-Pension Alimenticia"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="TG" id="chktg"><asp:Label ID="Label25" CssClass="LetraChicaNegrita"  runat="server" Text="TG-Tereceros Gravables ISR"></asp:Label></td>
                           </tr>
                           <tr>
                               <td align="Left"><input type="checkbox" value="IL" id="chklb"><asp:Label ID="Label26" CssClass="LetraChicaNegrita"  runat="server" Text="IL-Incidencias Laborales"></asp:Label></td>
                               <td align="Left"><input type="checkbox" value="PE" id="chkpe"><asp:Label ID="Label27" CssClass="LetraChicaNegrita"  runat="server"  Text="PE-Procesos Especiales"></asp:Label></td>                               
                           </tr>--%>
                       </table>
                   </td>
               </tr>
           </table>
       </div>
            <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wind" closed="true" align="center">  
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLSelInd">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnASelInd">Aceptar</a>                
         </div>                            
            <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Valor a Buscar:</asp:Label>
                </td>                                                     
                <td align="Center">
                    <input class="easyui-textbox" style="width:300px" id="txtvalorind">
                </td>
                <td align="Center">
                    <a id="btnbusarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>        
            <table id="dgind" style="width:100%; height:560px; display:none;" data-options = "striped: true, rownumbers: true, singleSelect: false, autoRowHeight: false"> 
                <thead>
                    <tr>
                        <th data-options="field:'chk',checkbox:true"></th>              
                        <th data-options="field:'Clave',width:80,align:'center',halign:'center'">Clave</th>
                        <th data-options="field:'Descripcion',width:400,align:'left'">Descripcion</th>                          
                    </tr>
                </thead>                   
            </table>                                                           
        </div> 
    </div>
        <div class="modal" style="display: none" id="loading" align="Center">
           <div class="center">
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>
    </form>
</body>
</html>
