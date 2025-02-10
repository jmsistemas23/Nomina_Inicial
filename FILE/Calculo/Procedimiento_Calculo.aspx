<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Procedimiento_Calculo.aspx.cs" Inherits="FILE_Calculo_Procedimiento_Calculo" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/> 
   <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-bufferview.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Procedimientos_Calculo.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
        <div id="dmenu" style="width:100%; height:100%; padding:0px">          
          <div class="easyui-panel" style="width:100%;  padding:3px">                           
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnNuevo" >Nuevo</a>    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnlimpiar">Limpiar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnEditar">Editar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminar">Eliminar</a>         
          </div>       
         <br />
              <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label4" CssClass="TituloMedio" runat="server" Text="CONFIGURACIÓN DE PROCEDIMIENTOS PARA PERFILES DE CÁLCULO"></asp:Label><br>
                    </td>
                </tr>                
            </table>
              <br />    
               <table>                    
                <tr>
                    <td align="Center">
                        <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                    </td>
                    <td align="Center"> 
                        <input  class="easyui-combobox"  style="width:200px;" id="cbcampos" name="state"></input>
                    </td>
                    <td align="Center"> 
                        <select class="easyui-combobox"  style="width:120px;" id="cbcondicion"  data-options="editable:false">                                                                                                                              
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
               <table class="easyui-datagrid" style="width:90%; height:560px;" id="dgProc">
                    <thead>
                    <tr>                        
                        <th data-options="field:'Id',width:50,align:'center',halign:'center'">Id</th>  
                        <th data-options="field:'Procedimiento',width:420,align:'left',halign:'center'">Procedimiento</th>                         
                        <th data-options="field:'Descripcion',width:500,align:'left',halign:'center'">Descripción</th>     
                        <th data-options="field:'EnUso',width:60,align:'center',halign:'center'">En Uso</th>                                                                   
                        <th data-options="field:'Proyeccion',width:70,align:'center',halign:'center'">Proyección</th>   
                        <th data-options="field:'Activo',width:60,align:'center',halign:'center'">Activo</th>                                               
                    </tr>
                  </thead>               
               </table>            
        </div>
        <div id="dcaptura" style="display:none; width:100%; height:100%;  padding:0px" >
            <div class="easyui-panel" style="width:100%;  padding:3px; ">
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>  
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarCaptura">Limpiar</a>             
               <a  href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>   
                <asp:Label ID="lblnivel" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                                  
          </div>
             <br />    
            <table style="width: 100%;">
                <tr>
                    <td align="Center">
                       <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server" Text=""></asp:Label>
                    </td>
                </tr>                
            </table>             
            <br />
            <div align="center">
            <table>
               <tr>
                  <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Clave:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtClave" data-options="readonly:true"></input></td>
               </tr>               
               <tr>
                 <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Procedimiento:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:400px;" id="txtProcedimiento"></input><td>
               </tr>
                <tr>
                 <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Descripción:</asp:Label></td>
                   <td align="left"><input  class="easyui-textbox"  style="width:400px;" id="txtDescripcion"></input><td>
               </tr>    
                <tr>
                 <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Usar En Proyección:</asp:Label></td>
                   <td align="left"><input type="checkbox" id="chkProyecciones" name="chkProyecciones" value="chkProyecciones"></td>
               </tr>               
               <tr>
                 <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita" runat="server">Activo:</asp:Label></td>
                   <td align="left"><input type="checkbox" id="chkActivo" name="chkActivo" value="chkActivo"></td>
               </tr>                
             </table>         
          </div>
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
