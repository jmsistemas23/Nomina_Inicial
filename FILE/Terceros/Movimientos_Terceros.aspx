<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Movimientos_Terceros.aspx.cs" Inherits="FILE_Terceros_Movimientos_Terceros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/> 

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
     <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Movimientos_Terceros.js?1.4"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
       <div id="dListaTerceros" title="" style="width:100%; height:100%; padding:0px; overflow:hidden"  align="Center"> 
            <div class="easyui-panel" style="padding:3px; width:100%;">                                                       
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarMenu">Regresar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarLista">Limpiar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnMovTerceros">Baja</a>  
                <asp:Label ID="lblnomquin1" CssClass="LetraChica2"  runat="server"></asp:Label>                      
           </div> 
            <br />        
           <table>                    
               <tr>
                <td align="Center">
                    <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocamter"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false" style="width:130px;" id="selconter">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                 <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalter">
                </td>
                    <td align="Center">
                        <a id="btnbuscarter" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                   </td>
               </tr>                  
            </table> 
           <br />
           <table style="display:none; height:550px" id="dgter"> 
                  <thead>
                    <tr>                                                
                        <th data-options="field:'cveter',width:50,align:'center',halign:'center',hidden:false">Clave</th>  
                        <th data-options="field:'perfil',width:130,align:'center',halign:'center'">Perfil</th>  
                        <th data-options="field:'numemp',width:90,align:'center',halign:'center'">Empleado</th>  
                        <th data-options="field:'rfc',width:130,align:'center',halign:'center'">Rfc</th>  
                        <th data-options="field:'nomcom',width:300,align:'Left',halign:'center'">Nombre</th>
                        <th data-options="field:'indicador',width:80,align:'center',halign:'center'">Indicador</th>
                        <th data-options="field:'desind',width:300,align:'Left',halign:'center'">Descripción</th>
                        <th data-options="field:'importe',width:100,align:'right',halign:'center'">Importe</th>
                        <th data-options="field:'id',width:100,align:'center',halign:'center',hidden:true">id</th>  
                    </tr>
                  </thead>                          
            </table>      
        </div> 
        <div id="dnuevacaptura" title="" style="width:100%; height:100%; padding:0px; display:none; overflow:hidden"  align="Center">         
            <div id="pterceros" class="easyui-panel" style="padding:3px; width:100%; display:none;">    
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnInicioTer">Inicio</a>     
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarTer">Regresar</a>     
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarTer">Limpiar </a>       
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGuardar">Guardar</a>                
               <asp:Label ID="lbltercero" CssClass="LetraChica derecha" runat="server"></asp:Label>   
             <asp:Label ID="lblquinter" CssClass="LetraChica2"  runat="server"></asp:Label>               
         </div>
        <br />       
           <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server"></asp:Label> 
        <br /><br />
        <div id="nuevacaptura" align="Center" style="width:50%;  height:auto;"></div>              
        </div>      
    </div>
        <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>   
    </form>
</body>
</html>
