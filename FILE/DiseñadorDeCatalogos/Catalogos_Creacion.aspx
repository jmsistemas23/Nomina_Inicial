<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogos_Creacion.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Catalogos_Creacion" %>

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
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Catalogos_Creacion.js?1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">                 
        <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center">         
         <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnrRegresar">Regresar</a>
         </div>
            <br />       
          <%--<div class="easyui-panel" style="width:30%; margin-top:20px;  padding:4px" align="Center">      --%>               
            <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                       <a id="btnCrearTbl" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_NewTabla',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Crear Tabla</a>                       
                       <%--<a id="btnEditarTbl" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_EditTabla',size:'large',iconAlign:'top'" style="width:100px;height:90px;" >Modificar Tabla</a>                       --%>
                       <a id="btnExisteTbl" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_SelTabla',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Tabla Existente</a>     
                  </td>
              </tr>                        
            </table>                
         <%--</div>         --%>                
       </div>
       <div id="dtblexistente" class="easyui-layout" style="width:100%;height:100%; display:none; overflow:hidden;" align="center">
           <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnIExiste">Inicio</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRExiste">Regresar</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLExiste">Limpiar</a>                 
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnConfiguracion">Datos del Catálogo</a>  
         </div>
          <br />
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label30" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocamcat" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconcat" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalcat">
                </td>
                    <td align="Center">
                    <a id="btnBuscarcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
           <br />
            <table style="display:none; height:60%" id="dgcat"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'idname',width:100,align:'center',halign:'center',hidden: true">Clave</th>  
                        <th data-options="field:'name',width:500,align:'left',halign:'center'">Tabla</th>                         
                    </tr>
                  </thead>                          
            </table>         
          </div>  
         <div id="dtblcreada" class="easyui-layout" style="width:100%;height:100%; display:none; overflow:hidden;" align="center">
               <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnICreada">Inicio</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRCreada">Regresar</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLCreada">Limpiar</a>  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnMCreada">Modificar</a>    
               <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnECreada">Eliminar</a>                          
            </div>
              <br />
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocamtblcreada" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocontblcreada" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaltblcreada">
                </td>
                    <td align="Center">
                    <a id="btnBtblcreada" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
             <br />
            <table style="display:none;" id="dgtblcreada"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'Id',width:50,align:'center',halign:'center',hidden: false">Id</th>  
                        <th data-options="field:'Tabla',width:350,align:'left',halign:'center'">Tabla</th>                         
                        <th data-options="field:'GeneraHistoria',width:100,align:'center',halign:'center',hidden:false">Genera Historia</th>                         
                        <th data-options="field:'TablaSistema',width:100,align:'center',halign:'center',hidden:false">Tabla Sistema</th>                         
                    </tr>
                  </thead>                          
            </table>        
         </div> 
        <div id="dlistatblcrear" class="easyui-layout" style="width:100%;height:100%; display:none; overflow:hidden;" align="center">
             <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnIlsttblcrear">Inicio</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRlsttblcrear">Regresar</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLlsttblcrear">Limpiar</a>  
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnAlsttblcrear">Agregar</a>   
                 <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnMlsttblcrear">Modificar</a>   
                 <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnElsttblcrear">Eliminar</a>                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnDlsttblcrear">Diseño</a>                         
            </div>
              <br />
            <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocamtblcrear" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cbocontblcrear" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvaltblcrear">
                </td>
                    <td align="Center">
                    <a id="btnBtblcrear" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
             <br />
            <table style="display:none;" id="dglsttblcrear"> 
                  <thead>
                    <tr>                        
                        <th data-options="field:'Id',width:50,align:'center',halign:'center',hidden: false">Id</th>  
                        <th data-options="field:'Tabla',width:400,align:'left',halign:'center'">Tabla</th>                         
                        <th data-options="field:'GeneraHistoria',width:80,align:'center',halign:'center',hidden:false">Historia</th>                         
                        <th data-options="field:'TablaSistema',width:80,align:'center',halign:'center',hidden:false">Sistema</th>                         
                    </tr>
                  </thead>                          
            </table>
        </div>
       <div id="dCapturaCrear" class="easyui-layout" style="width:100%;height:100%; display:none; overflow:hidden;" align="center">
            <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnICrear">Inicio</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRCrear">Regresar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLCrear">Limpiar</a>  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGCrear">Guardar</a>                              
         </div>
           <br />
         <table >
                <tr>
                    <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server" Text="Nombre de la Tabla:"></asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:250px" id="txtnomtbl"></td>
                </tr> 
                <tr>
                    <td align="left"><asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server" Text="Generar Historia:"></asp:Label></td>
                    <td align="left"><input type="checkbox"  id="chkhistoria"></td>                   
               </tr>               
             <tr>
               <td align="left"><asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server" Text="Tabla de Sistema:"></asp:Label></td>
               <td align="left"><input type="checkbox"  id="chksistema"></td>                   
               </tr>                                          
          </table>           
       </div>
       <div id="dtbldiseño" class="easyui-layout" style="width:100%;height:100%; display:none; overflow:hidden;" align="center">
         <div class="easyui-panel" style="padding:3px; width:100%">                                  
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnIDiseñoTbl">Inicio</a>
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRDiseñoTbl">Regresar</a>
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:true" id="btnGDiseñoTbl">Guardar</a>
         </div>
         <br />
         <table>
              <tr>
                  <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server" Text="Número de Campos:"></asp:Label></td>
                  <td align="left"><input class="easyui-textbox" style="width:50px" id="txtnumcampos" value="" ></td>                   
               </tr>   
         </table>
         <br />
           <table id="dgtabla" class="easyui-datagrid" style="width:65%; height:50%;" toolbar="#tbtabla">              
            <thead>
            <tr>    
                <th data-options="field:'Chk',width:50,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}"></th>                                
                <th data-options="field:'Id',width:50,align:'center',halign:'center',hidden:true">Id</th>
                <th data-options="field:'Orden',width:50,align:'center',halign:'center', editor: { type: 'textbox'},hidden:false">Orden</th>
                <th data-options="field:'Llave',width:50,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Llave</th>
                <th data-options="field:'Identidad',width:80,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Identidad</th>
                <th data-options="field:'Campo',width:200,align:'left',halign:'center', editor: { type: 'textbox'},hidden:false">Nombre</th>  
                <th data-options="field:'Descripcion',width:200,align:'left',halign:'center', editor: { type: 'textbox'},hidden:false">Descripción</th>                   
                <th data-options="field:'TipoDato',width:120,align:'center',halign:'center',hidden:false,                                                  
                                            editor:{
                                                type:'combobox',
                                                options:{
                                                        valueField:'TipoDato',
                                                        textField:'descripcion',
                                                        data:[
                                                                {TipoDato: 'varchar', descripcion: 'Texto'},
                                                                {TipoDato: 'int', descripcion: 'Entero'},
                                                                {TipoDato: 'numeric', descripcion: 'Numerico'},
                                                                {TipoDato: 'bit', descripcion: 'Booleano'},
                                                            ],
                                                        }
                                            }">Tipo</th>
                <th data-options="field:'Longitud',width:70,align:'center',halign:'center', editor: { type: 'textbox'},hidden:false">Longitud</th>
                <th data-options="field:'Decimal',width:70,align:'center',halign:'center', editor: { type: 'numberbox'},hidden:false">Decimales</th>                
                <th data-options="field:'Nulo',width:50,align:'center',halign:'center', editor:{type:'checkbox',options:{on:'Si',off:''}}">Nulos</th>
                <th data-options="field:'Predeterminado',width:115,align:'center',halign:'center',hidden:false,                                                  
                                            editor:{
                                                type:'combobox',
                                                options:{
                                                        valueField:'Default',
                                                        textField:'descripcion',
                                                        data:[
                                                                {Default: '', descripcion: 'Vacio'},
                                                                {Default: '1', descripcion: 'Uno'},
                                                                {Default: '0', descripcion: 'Cero'},                                                               
                                                            ],
                                                        }
                                            }">Predeterminado</th>  
                <th data-options="field:'Movimiento',width:5,align:'center',halign:'center',hidden:true">Movimiento</th>              
            </tr>            
            </thead> 
        </table> 
           <div id="tbtabla" style="padding:3px; width:100%">                                          
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'" id="btnAgregar">Agregar</a>
               <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnEliminar">Eliminar</a>
           </div>
     </div>
       <div id="dconfiguracion" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
           <div class="easyui-panel" style="padding:3px; width:100%">
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnIConfig">Inicio</a> 
                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRConfig">Regresar</a>              
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLConfig">Limpiar</a>                 
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGConfig">Guardar</a>                                                          
           </div>                      
            <br />  
            <br />  
          <%-- <fieldset style="width:500px">--%>
            <legend><asp:Label ID="Label15" CssClass="LetraChicaNegrita"  runat="server">Datos del Catálogo</asp:Label></legend>
             <br />
            <table>
                <tr>
                    <td align="left"><asp:Label ID="Label16" CssClass="LetraChicaNegrita"  runat="server">Tabla:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:300px" id="txttabla"></td>
                    </tr>  
                    <tr>
                    <td align="left"><asp:Label ID="lbl4" CssClass="LetraChicaNegrita"  runat="server">Título del Catálogo:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:300px" id="txttitulo"></td>
                    </tr>                                              
                    <tr>
                    <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita"  runat="server">Descripción a Mayus:</asp:Label></td>
                    <td align="left"><input type="checkbox"  id="chkMayusculas"></td>
                    </tr>                
            <%--    <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita"  runat="server">Botón Agregar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkAgregar"></td>
                </tr>
                <tr>
                <td align="left"><asp:Label ID="Label5" CssClass="LetraChicaNegrita"  runat="server">Botón Modificar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkModificar"></td>
                </tr>
                <tr>
                <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita"  runat="server">Botón Eliminar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkEliminar"></td>
                </tr>
                <tr>
                <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita"  runat="server">Historia:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkHistoria"></td>
                </tr>
                <tr>
                <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita"  runat="server">Generar Reporte:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkReportes"></td>
                </tr>
                <tr>
                <td align="left"><asp:Label ID="Label21" CssClass="LetraChicaNegrita"  runat="server">Carga Inicial:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkCarga"></td>
                </tr>--%>
                        </table>
          <%-- </fieldset>--%>
           <br />
             <br />
         <%--     <fieldset style="width:500px">
                        <legend><asp:Label ID="Label14" CssClass="LetraChicaNegrita"  runat="server">Configuración de la Clave</asp:Label></legend>
                        <table>
                            <tr>
                                <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita"  runat="server">Clave Normal:</asp:Label></td>
                                <td align="left"><input type="radio"  id="rbnormal" name="group1" ></td>
                            </tr>
                            <tr>
                                <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita"  runat="server">Generar Clave:</asp:Label></td>
                                <td align="left"><input type="radio"  id="rbogener" name="group1" ></td>
                            </tr>
                        </table>                                                
              </fieldset>    --%>                   
            <br />
             <br />
          <%-- <fieldset style="width:500px">
                  <legend><asp:Label ID="Label9" CssClass="LetraChicaNegrita"  runat="server">Configuración de la Vista</asp:Label></legend>           
                    <table style="margin:3px; padding: 5px 5px 5px 5px; border-spacing:5px 5px;">               
                       <tr>
                         <td align="left"><asp:Label ID="Label10" CssClass="LetraChicaNegrita"  runat="server">Total de Registros:</asp:Label></td>
                         <td align="left"> <select class="easyui-combobox"  style="width:120px;" id="cboreg" data-options="editable:false">                                                                                              
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="30">30</option>
                                        <option value="40">40</option>
                                        <option value="50">50</option>
                                    </select></td>
                      </tr>
                      <tr>
                        <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita"  runat="server">Ancho:</asp:Label></td>
                        <td align="left"><input class="easyui-textbox" style="width:60px" id="txtancho"></td>
                     </tr>
                     <tr>
                       <td align="left"><asp:Label ID="Label18" CssClass="LetraChicaNegrita"  runat="server">Alto:</asp:Label></td>
                      <td align="left"><input class="easyui-textbox" style="width:60px" id="txtalto"></td>
                     </tr>                   
                  </table>           
            </fieldset>--%>
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
