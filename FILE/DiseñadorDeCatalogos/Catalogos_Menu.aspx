<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Catalogos_Menu.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Catalogos_Menu" %>

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
    <script type="text/javascript" src="Catalogos_Menu.js?1.5"></script>
    <style type="text/css">
        .auto-style1 {
            width: 212px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
        <div id="dmenu" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
          <br />
          <table style="width: 100%;">
                <tr>
                    <td align="Center">
                        <asp:Label ID="lbltitulo" CssClass="TituloMedio" runat="server" Text="DISEÑADOR DE CATÁLOGOS"></asp:Label>
                    </td>
                </tr>                
          </table>
         <%-- <div class="easyui-panel" style="width:40%; margin-top:20px;  padding:4px" align="Center">--%>
            <table style="width: 100%;">           
              <tr>
                  <td align="Center">
                       <a id="btnNuevoCat" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_Add_Cat',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;" >Nuevo Catálogo</a>
                       <a id="btnEliModCat" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_Mod_Cat',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar Catálogo</a>                                                   
                       <a id="btnNuevoNiv" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_Add_Nivel',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Definir Niveles</a>
                       <a id="btnEliModNiv" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_Mod_Nivel',size:'large',iconAlign:'top'" style="width:150px; height:80px; font-weight: bold;font-size: x-large;">Modificar Niveles</a>
                  </td>
              </tr>                        
            </table>                
         <%--</div> --%>                        
       </div>            
         <div id="dtablas" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
            <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRmodtabla">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLMod">Limpiar</a>      
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-edit',disabled:true" id="btnModCat">Editar</a>                                 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnEliCat">Eliminar</a>              
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnConfiguracion">Configuración</a>  
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-cat',disabled:true" id="btnVistaCat">Vista Catálogo</a>    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_Relacion',disabled:false" id="btnRelacionar">Relacionar Tabla</a>    
                <asp:Label ID="lblcat" CssClass="LetraChica" runat="server" Text=""></asp:Label>                     
           </div>
           <br /><br />
           <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocammod" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconmod" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalmod">
                </td>
                    <td align="Center">
                    <a id="btnBuscarmod" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
           <br />
            <table style="display:none;" id="dgmod"> 
                  <thead>
                    <tr>                                                
                        <th data-options="field:'TablaConsultas',width:350,align:'center',halign:'center'">Tabla</th>                         
                        <th data-options="field:'CatTitulo',width:250,align:'left',halign:'center'">Titulo</th>                         
                        <th data-options="field:'GenerarClave',width:100,align:'center',halign:'center',hidden: false">Generar Clave</th>                         
                        <th data-options="field:'CatRegistros',width:70,align:'center',halign:'center',hidden: false">Registros</th> 
                        <th data-options="field:'CatDesMayusculas',width:60,align:'left',halign:'center',hidden: true">Mayusculas</th>                                                 
                        <th data-options="field:'CatAgregar',width:60,align:'left',halign:'center',hidden: true">Agregar</th>                         
                        <th data-options="field:'CatModificar',width:60,align:'left',halign:'center',hidden: true">Modificar</th>                         
                        <th data-options="field:'CatEliminar',width:60,align:'left',halign:'center',hidden: true">Eliminar</th>                         
                        <th data-options="field:'CatHistoria',width:60,align:'left',halign:'center',hidden: true">Historia</th>                         
                        <th data-options="field:'CatReportes',width:60,align:'left',halign:'center',hidden: true">Reportes</th>                         
                        <th data-options="field:'CatExportar',width:60,align:'left',halign:'center',hidden: true">Exportar</th>                         
                        <th data-options="field:'CatAncho',width:60,align:'center',halign:'center',hidden: false">Ancho</th>                         
                        <th data-options="field:'CatAlto',width:60,align:'center',halign:'center',hidden: false">Alto</th>                         
                        <th data-options="field:'CamposCaptura',width:60,align:'center',halign:'center',hidden: true">camposcaptura</th>                         
                        <th data-options="field:'CargaInicial',width:60,align:'center',halign:'center'">Carga</th>                         
                        <th data-options="field:'Visible',width:120,align:'center',halign:'center'">Visible Relaciones</th>                         
                        <th data-options="field:'DatosCaptura',width:120,align:'center',halign:'center'">Guardar Usuario</th>                         
                        <th data-options="field:'CargarArchivos',width:120,align:'center',halign:'center'">Cargar Archivo</th>                         
                    </tr>
                  </thead>                          
            </table>         
       </div>
       <div id="dniveles" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center">  
           <div class="easyui-panel" style="padding:3px; width:100%">                   
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRNivel">Regresar</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLNivel">Limpiar</a>
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnENivel">Eliminar</a>              
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true" id="btnNiveles">Configuración Niveles</a>                
           </div>
            <br /><br />
           <table>                    
            <tr>
                <td align="left">
                    <asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                   <select class="easyui-combobox"  style="width:150px;" id="cbocamnivel" data-options="editable:false"></select>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox"  style="width:120px;" id="cboconnivel" data-options="editable:false">
                        <option value="like">Aproximada</option>
                        <option value="=">Exacta</option>
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalnivel">
                </td>
                    <td align="Center">
                    <a id="btnBcatnivel" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>             
            </table>
            <br />
            <table style="display:none;" id="dgcatnivel"> 
                  <thead>
                    <tr>                                                
                        <th data-options="field:'Tabla',width:400,align:'left',halign:'center'">Tabla</th>
                    </tr>
                  </thead>                          
            </table>     
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
           <fieldset style="width:662px">
            <legend><asp:Label ID="Label15" CssClass="LetraChicaNegrita"  runat="server">Configuración del Catálogo</asp:Label></legend>
            <table style="width: 656px">
                 <tr>
                    <td align="left" class="auto-style1"><asp:Label ID="Label11" CssClass="LetraChicaNegrita"  runat="server">Tabla:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:300px" id="txttabla"></td>
                    <td align="left"><a id="btnBuscartbl" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search',plain:true">Buscar</a>  </td>
                    <td align="left"><a id="btnLimpiartbl" href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true">Limpiar</a></td>
                    </tr> 
                    <tr>
                    <td align="left" class="auto-style1"><asp:Label ID="lbl4" CssClass="LetraChicaNegrita"  runat="server">Título del Catálogo:</asp:Label></td>
                    <td align="left"><input class="easyui-textbox" style="width:300px" id="txttitulo"></td>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                    </tr>                                              
                    <tr>
                    <td align="left" class="auto-style1"><asp:Label ID="Label3" CssClass="LetraChicaNegrita"  runat="server">Descripción a Mayus:</asp:Label></td>
                    <td align="left"><input type="checkbox"  id="chkMayusculas" checked="checked"></td>
                    <td align="left">&nbsp;</td>
                    <td align="left">&nbsp;</td>
                    </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label4" CssClass="LetraChicaNegrita"  runat="server">Botón Agregar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkAgregar" checked="checked"></td>
                <td align="left">&nbsp;</td>
                <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label5" CssClass="LetraChicaNegrita"  runat="server">Botón Modificar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkModificar" checked="checked"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label6" CssClass="LetraChicaNegrita"  runat="server">Botón Eliminar:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkEliminar" checked="checked"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label7" CssClass="LetraChicaNegrita"  runat="server">Tabulador Historia:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkHistoria"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label8" CssClass="LetraChicaNegrita"  runat="server">Generar Reporte:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkReportes"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label25" CssClass="LetraChicaNegrita"  runat="server">Exportar Excel:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkExportar"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label21" CssClass="LetraChicaNegrita"  runat="server">Carga Inicial:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkCarga"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label22" CssClass="LetraChicaNegrita"  runat="server">Visible en Relaciones:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkvisible"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label24" CssClass="LetraChicaNegrita"  runat="server">Guardar Datos Captura:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkDatosCaptura"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
                <tr>
                <td align="left" class="auto-style1"><asp:Label ID="Label26" CssClass="LetraChicaNegrita"  runat="server">Cargar Archivo:</asp:Label></td>
                <td align="left"><input type="checkbox"  id="chkCargarArchivos"></td>
                <td align="left">&nbsp;</td>
                     <td align="left">&nbsp;</td>
                </tr>
               </table>
           </fieldset>
           <br />
             <br />
              <fieldset style="width:500px">
                        <legend><asp:Label ID="Label14" CssClass="LetraChicaNegrita"  runat="server">Configuración de la Clave</asp:Label></legend>
                        <table>
                            <tr>
                                <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita"  runat="server">Clave Normal:</asp:Label></td>
                                <td align="left"><input type="radio"  id="rbnormal" name="group1" checked="checked" ></td>
                            </tr>
                            <tr>
                                <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita"  runat="server">Generar Clave:</asp:Label></td>
                                <td align="left"><input type="radio"  id="rbogener" name="group1" ></td>
                            </tr>
                        </table>                                                
              </fieldset>                       
            <br />
             <br />
           <fieldset style="width:500px">
                  <legend><asp:Label ID="Label1" CssClass="LetraChicaNegrita"  runat="server">Configuración de la Vista</asp:Label></legend>           
                    <table style="margin:3px; padding: 5px 5px 5px 5px; border-spacing:5px 5px;">               
                       <tr>
                         <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita"  runat="server">Total de Registros:</asp:Label></td>
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
                        <td align="left"><input class="easyui-textbox" style="width:60px" id="txtancho" value="50"></td>
                     </tr>
                     <tr>
                       <td align="left"><asp:Label ID="Label18" CssClass="LetraChicaNegrita"  runat="server">Alto:</asp:Label></td>
                      <td align="left"><input class="easyui-textbox" style="width:60px" id="txtalto" value="50"></td>
                     </tr>                   
                  </table>           
            </fieldset>
       </div>    
       <div id="drelaciones" class="easyui-layout" style="width:100%;height:100%; overflow:hidden;" align="center"> 
           <div class="easyui-panel" style="padding:3px; width:100%">         
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_InicioMin'" id="btnIRelacion">Inicio</a> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRRelacion">Regresar</a> 
               <a href="#" class="easyui-linkbutton" data-options="iconCls:'limpiar',plain:true" id="btnLimpiarLRel">Limpiar</a>
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add',plain:true,disabled:false" id="btnAgregarRel">Agregar</a>  
                    <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove',plain:true,disabled:true" id="btnEliminarRel">Eliminar</a>  
               <asp:Label ID="tbltabla" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                                    
          </div> 
           <br />
            
           <br />
            <table id="dgrelaciones" class="easyui-datagrid"  style="width:65%; height:60%;" data-options="rownumbers: true,singleSelect:true, striped:true"  >
                <thead>
                    <tr>                                                          
                        <th data-options="field:'TablaIzquierda',width:150,align:'center',halign:'center',hidden:false">Tablas Izquierda</th>
                        <th data-options="field:'TablaDerecha',width:150,align:'center',halign:'center',hidden:false">Tablas Derecha</th>
                        <th data-options="field:'Relacion',width:400,align:'left',halign:'center'">Relaciones</th>     
                        <th data-options="field:'Id',width:80,align:'center',halign:'center',hidden:true">Id</th>                        
                    </tr>
                </thead> 
            </table>               
       </div>    
        <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden" id="winr" closed="true" align="center"> 
             <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRelacion">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnGRelacion">Aceptar</a>   
             <asp:Label ID="Label16" CssClass="LetraChica" runat="server" Text=""></asp:Label>                                
            </div>                             
            <div class="easyui-layout" style="width:100%;height:92%; overflow:hidden;">                                    
                <div data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                          
                    <div title="Columna Tabla Izquierda" style="padding: 3px; height:100%" align="center" id="Div2">                             
                        <asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Tabla Izquierda</asp:Label>                                                                                               
                        <input class="easyui-combobox"  style="width:100%;" id="cbocamizq" data-options="editable:false"></input>                                                         
                        <input class="easyui-textbox" style="width:100%" id="txtcolizq"></input> 
                        <div id="Div3" class="easyui-panel" style="padding:5px; width:100%;height:77%">
                            <ul class="easyui-tree" id="tcolizq" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                        </div> 
                    </div>
                </div>
                <div data-options="region:'center'" style="padding:5px;overflow:hidden;">
                    <div title="Columna tabla Derecha" style="padding: 3px; height:100%" align="center" id="Div4">
                        <asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Tabla Derecha</asp:Label>                                                                                               
                        <input class="easyui-combobox"  style="width:100%;" id="cbocamder" data-options="editable:false"></input>                                                         
                        <input class="easyui-textbox" style="width:100%" id="txtcolder"> 
                        <div id="Div5" class="easyui-panel" style="padding:5px; width:100%;height:77%">
                            <ul class="easyui-tree" id="tcolder" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                        </div> 
                    </div>
                </div>                                   
            </div>        
       </div> 
     <div class="easyui-dialog" style="width:200px;height:400px; background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden" id="wtablas" closed="true" align="center"> 
            <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLtablas">Limpiar</a>                                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAtablas">Aceptar</a>                
            </div>   
         <div class="easyui-layout" style="border:none;width:100%;height:93%; overflow:hidden;">
             <div data-options="region:'north'" style="width:100%; height:12%; padding:3px; overflow:hidden;" align="center"> 
                 <asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Lista de Tablas</asp:Label>  
                 <input class="easyui-textbox" style="width:100%" id="txtfiltablas" data-options="readonly:false"></input>     
              </div>
             <div data-options="region:'south'" style="width:100%; height:88%; padding:3px; overflow:hidden;" >
                 <div id="Div1" class="easyui-panel" style="border:none; width:100%;height:100%">
                      <ul class="easyui-tree" id="tvtablas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                 </div> 
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
