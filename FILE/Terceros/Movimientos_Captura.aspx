<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Movimientos_Captura.aspx.cs" Inherits="FILE_Terceros_Movimientos_Captura" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
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
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" src="Movimientos_Captura.js?1.1"></script>  
</head>
<body>
    <form id="form1" runat="server">
    <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">       
          <div id="dperfilesterceros" title="" style="width:100%; height:100%; padding:0px; " align="Center">
           <div class="easyui-panel" style="padding:3px; width:100%; display:none;">                   
              <a id="btnanterior" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>  
              <a id="btnlimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'">Limpiar</a>   
               <asp:Label ID="lblquinperfil" CssClass="LetraChica2"  runat="server"></asp:Label>                    
           </div> 
             <br />      
             <table>                    
                <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:150px;" id="cbocamperfil" ></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cboconperfil">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:200px" id="txtvalorperfil">
                </td>
                    <td align="Center">
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscarperfil" >Buscar</a>
                </td>
            </tr>                  
            </table> 
             <br />    
              <table id="dgperfiles">
               <thead>
                    <tr>                        
                        <th data-options="field:'cveter',width:80,align:'center',halign:'center'">Clave</th>  
                        <th data-options="field:'dester',width:400,align:'left',halign:'center'">Descripción</th>                          
                        <th data-options="field:'tiparc',width:50,align:'left',halign:'center',hidden:true">tipo</th>                          
                    </tr>
                </thead>                 
            </table>                 
       </div> 
          <div id="dlistadocumentos" title="" style="width:100%; height:100%; padding:0px; display:none; overflow:hidden"  align="Center">  
           <div class="easyui-panel" style="padding:3px; width:100%;">                                                       
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarDoc">Regresar</a>                     
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarDoc">Limpiar</a> 
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModificarDoc">Modificar</a>                    
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliminarDoc">Eliminar</a>                
                 <asp:Label ID="lblquindoc1" CssClass="LetraChica2" runat="server"></asp:Label>                
           </div>
           <br />        
           <table>                    
               <tr>
                <td align="Center">
                    <asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocamdoc"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false" style="width:130px;" id="cbocondoc">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                 <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaldoc">
                </td>
                    <td align="Center">
                        <a id="btnBdoc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                   </td>
               </tr>                  
            </table> 
           <br />
           <table style="display:none; height:550px" id="dgmovimientos"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'estmovtr',width:100,align:'center',halign:'center'">Estatus</th>  
                        <th data-options="field:'numdoctr',width:120,align:'center',halign:'center'">Documento</th>  
                        <th data-options="field:'numemptr',width:100,align:'center',halign:'center'">Empleado</th>  
                        <th data-options="field:'rfcemptr',width:130,align:'center',halign:'center'">Rfc</th>  
                        <th data-options="field:'tipcaptr',width:130,align:'center',halign:'center'">Tipo Captura</th>
                        <th data-options="field:'desmovtr',width:130,align:'center',halign:'center'">Tercero</th>
                        <th data-options="field:'tipmovtr',width:130,align:'center',halign:'center'">Tipo Movimiento</th>
                        <th data-options="field:'indicadortr',width:100,align:'center',halign:'center'">Indicador</th>                          
                        <th data-options="field:'importetr',width:100,align:'right',halign:'center'">Importe</th>       
                        <th data-options="field:'cvemovtr',width:100,align:'right',halign:'center',hidden:true">indicador</th>                                                  
                    </tr>
                  </thead>                          
            </table>                
        </div> 
          <div id="dnuevacaptura" title="" style="width:100%; height:100%; padding:0px; display:none; overflow:hidden"  align="Center">  
            <div id="pnueva" class="easyui-panel" style="padding:3px; width:100%;">                                        
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnInicioNC">Inicio</a>     
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarNC">Regresar</a>     
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarNC">Limpiar</a>              
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGuardarNC" >Guardar</a>    
                    <asp:Label ID="lblPerfilNC" CssClass="LetraChica derecha" runat="server"></asp:Label> 
                    <asp:Label ID="lblNuevacap" CssClass="LetraChica2"  runat="server"></asp:Label>     
            </div>
             <div id="pmodificar" class="easyui-panel" style="padding:3px; width:100%; display:none;">    
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'MinNuevoDoc'" id="btnInicioMC">Inicio</a>     
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresarMC">Regresar</a>     
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiarMC">Limpiar </a>       
                   <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:false" id="btnEliminarMC">Eliminar</a>                
                   <asp:Label ID="lbldoc" CssClass="LetraChica derecha" runat="server"></asp:Label>   
                  <asp:Label ID="lblquindoc2" CssClass="LetraChica2"  runat="server"></asp:Label>               
             </div>          
            <br />
             <table id="tbemp">                    
            <tr>
            <td align="Center">
                <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
            </td>
            <td align="Center"> 
                <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocamcap"></input>
            </td>
            <td align="Center"> 
                <select class="easyui-combobox" data-options="editable:false" style="width:130px;" id="cboconcap">                    
                    <option value="like">Aproximada</option>                                
                    <option value="=">Exacta</option>
                </select>
            </td>
                <td align="Center">
                <input class="easyui-textbox" style="width:250px" id="txtvalcap">
            </td>
                <td align="Center">
                    <a id="btnBcaptura" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table> 
             <br />          
              <asp:Label ID="lblsubtitulo" CssClass="LetraChica" runat="server"></asp:Label> 
             <br /><br />
             <div id="nuevacaptura" align="Center" style="width:50%;  height:auto;"></div>              
        </div>             
         <div class="modal" style="display: none; width:100%;height:100%;" id="loading" align="center">
           <div class="center" style="width:100%;height:100%;" align="center" >
              <img alt="" src="../../Imagenes/ajax-loader.gif" />
           </div> 
       </div>       
    </div>                 
          <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="winemp" closed="true" align="center">      
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cboBcamemp"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cboBconemp">                                                                                                                                                
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtBvalemp">
                </td>
                    <td align="Center">
                    <a id="btnBemp" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>          
            <div id="dplaza" align="center">
             <table id="dgplaza"> 
                <thead>
                     <tr>                                               
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center'">Empleado</th>
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center'">R.F.C.</th>
                        <th data-options="field:'nomcom',width:400,align:'left',halign:'center'">Nombre</th>
                    </tr>
                </thead>                   
            </table>       
         </div>
    </div>             
    </form>
</body>
</html>
