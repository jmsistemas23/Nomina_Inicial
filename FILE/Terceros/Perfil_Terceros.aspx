<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Perfil_Terceros.aspx.cs" Inherits="FILE_Terceros_Perfil_Terceros" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>   
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script type="text/javascript" src="Perfil_Terceros.js?2.8"></script>
    <script src="../../Scripts/jquery.session.js"></script> 
    <script type="text/javascript" >
         function fileinfo() {
             $('#txtarchivos').textbox('setValue', document.getElementById('<%=cargaArchivo.ClientID%>').value);
         }
    </script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="dmenu"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center"> 
       <div class="easyui-panel" style="padding:3px; width:100%">                   
               <a id="btnLimpiar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'">Limpiar</a>   
               <a id="btnNuevo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add'">Nuevo</a>                 
               <a id="btnCatTerceros" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_mini-cat',disabled:false">Catálogo</a>                                
               <a id="btnDiseño" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-configuracion',disabled:true">Diseño Perfil</a>
        </div>
        <br />
           <div style="width:100%;" align="Center">            
            <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocam" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cbocon">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtval">
                </td>
                    <td align="Center">
                    <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
            </table>  
              <br />                        
             <table  id="dg" style="width:50%; height:550px">
              <%
                  string tabla = "";
                  if (Request.QueryString["tabla"] != null)
                  {
                      tabla = Request.QueryString["tabla"].ToString();
                  }
                  else { tabla = "ListaTerceros"; }      
                  string[] datos;                 
                  string[] Array = DiseñoGrid(tabla);
                  var columnas = Array[0].Split('|');
                  var bloqueos = Array[1].Split('|');                                                                
               %>
               <thead data-options="frozen:true">
                   <tr>
                        <%   
                            if (bloqueos[0] != "")
                            {
                                for (var col = 0; col < bloqueos.Length; col++)
                                {
                                    datos = bloqueos[col].Split(',');
                                    var valor = datos[0];
                                    var alinear = datos[1];
                                    var titulo = datos[2];
                                    var ancho = datos[3] + "px";
                                    Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                                }
                            }
                         %>
                   </tr>
               <thead>
               <thead>
                     <tr>
                          <%  
                            
                             for (var col = 0; col < columnas.Length; col++)
                                {
                                    datos = columnas[col].Split(',');
                                     var valor = datos[0];
                                     var alinear = datos[1];
                                     var titulo = datos[2];
                                     var ancho = datos[3] + "px";                                     
                                     Response.Write("<th data-options=\"field:'" + valor + "',align:'" + alinear + "'\" style=\"width:" + ancho + "\">" + titulo + "</th>");
                               }                                                                             
                         %>
                     </tr>
               <thead>
            </table>  
           </div>                     
    </div>
    <div id="dCarga" align="center" style="width:100%; padding:0px; display:none">           
       <div class="easyui-panel" style="padding:3px; width:100%">
           <a id="btnRegresar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" >Regresar</a>                                                 
       </div>
       <br />
       <div align="center" class="easyui-panel" style="width:30%;">
          <table style="width: 100%;">
              <tr> 
                 <td align="Center">                       
                    <asp:Button ID="btnexaminar" runat="server" Text="" CssClass="btnexaminar" />                            
                    <asp:Button ID="btncargar" runat="server" Text=""  CssClass="btncargarMasiva" OnClick="btnCargarArchivo_Click"/>            
                  </td>
             </tr>                   
          </table>
       </div>
        <br />
        <table>            
            <tr>
                <td align="Center">      
                <asp:Label ID="lblCarga" CssClass="LetraChica" runat="server">Ruta Del Archivo Para Perfil</asp:Label><br>
                </td>
            </tr>
            <tr>
            <td align="Center">      
                <asp:FileUpload ID="cargaArchivo" runat="server" AllowMultiple="true" Width="50%" onchange="fileinfo()" style="display:none;"/>
                <input class="easyui-textbox" style="width:500px" id="txtarchivos" data-options="readonly:'true'">                        
            </td>
            </tr>                    
        </table>
    </div> 
    <div id="dCatalogo" style="width:100%;height:90%;padding:0px; display:none" align="Center">
         <div style="width:100%; padding:3px;" class="easyui-panel">                
             <a id="btnRegresarCat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>                       
             <a id="btnModificarCat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">Modificar</a> 
             <asp:Label ID="lblMPerfil" CssClass="LetraChica" runat="server"></asp:Label>       
       </div>
        <br />
        <table>                    
            <tr>
                <td align="Center">
                    <asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                </td>
                <td align="Center"> 
                    <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocamcat" name="state"></input>
                </td>
                <td align="Center"> 
                    <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cboconcat">
                        <option value="=">Exacta</option>
                        <option value="like">Aproximada</option>                                
                    </select>
                </td>
                <td align="Center">
                    <input class="easyui-textbox" style="width:250px" id="txtvalcat">
                </td>
                    <td align="Center">
                    <a id="btnfilcat" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                </td>
            </tr>                  
        </table>  
        <br />      
           <table id="dgmperfil" class="easyui-datagrid"  style="width:45%; height:550px;" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 20,pagination: true ">  
                <thead>
                        <tr> 
                            <th data-options="field:'chk',checkbox:true"></th>                           
                            <th data-options="field:'cveter',width:60,align:'center',halign:'center',hidden:false">Clave</th>
                            <th data-options="field:'dester',width:350,align:'left',halign:'center',hidden:false, editor: { type: 'textbox'}">Descripción</th>
                            <th data-options="field:'eliter',width:100,align:'center',halign:'center',hidden:false, editor:{ type:'checkbox',options:{on:'1',off:'0'}}">Eliminar al Cierre</th>
                            <th data-options="field:'activo',width:70,align:'center',halign:'center',hidden:false, editor:{ type:'checkbox',options:{on:'1',off:'0'}}">Estatus</th>
                        </tr>                           
               </thead>        
          </table>
    </div>
    <div id="dInformacion" style="width:100%;height:90%;padding:0px; display:none" align="Center">
        <div style="width:100%; padding:3px;" class="easyui-panel">                
             <a id="btnRegresarInfo" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'">Regresar</a>                       
             <a id="btnGuardar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'">Guardar</a> 
             <asp:Label ID="lblPerfil" CssClass="LetraChica" runat="server"></asp:Label>       
       </div>   
       <div style="border-style: none; width:100%;height:13%; overflow:hidden;">
            <table>
            <tr>
                <td align="Left">
                    <asp:Label ID="Label4" CssClass="LetraChica" runat="server">Clave:</asp:Label>
                            
                </td>
                <td align="Left">                            
                    <input class="easyui-textbox" style="width:150px" data-options="readonly:true" id="txtPerfil">
                </td>
            </tr>
            <tr>
                <td align="Left">                           
                    <asp:Label ID="Label5" CssClass="LetraChica" runat="server">Descripción:</asp:Label>                                                       
                </td>
                <td align="Left">                                                       
                    <input class="easyui-textbox" style="width:300px" id="txtDescripcion">
                </td>
            </tr>                                        
            <tr>
                <td align="Left">
                    <asp:Label ID="Label1" CssClass="LetraChica" runat="server">Extensión Del Archivo:</asp:Label>                            
                </td>
                <td align="Left">                            
                    <input class="easyui-textbox" style="width:50px" id="txtExtension">
                </td>
            </tr>                                     
           </table>
       </div>    
       <div class="easyui-layout" style="border-style: none; width:100%;height:90%; overflow-x:hidden; overflow-y:scroll;">           
           <asp:Label ID="Label2" CssClass="LetraChica" runat="server">Relación De Conceptos Asignados Al Perfil</asp:Label>
                 <br />
                 <table id="dgconceptos" class="easyui-datagrid"  style="width:40%; height:250px;" toolbar="#tbcon" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 20 ">  
                    <thead>
                        <tr>                                                                                    
                            <th data-options="field:'conarchivo',width:90,align:'center',halign:'center',hidden:false">Archivo</th>
                            <th data-options="field:'conactual',width:90,align:'center',halign:'center',hidden:false,editor: { type: 'textbox'}">Actual</th>                            
                            <th data-options="field:'numdescuento',width:100,align:'center',halign:'center',hidden:false,editor: { type: 'textbox'}">Num. Descuento</th>
                            <th data-options="field:'parcial',width:110,align:'center',halign:'center',hidden:false,editor: { type:'checkbox',options:{on:'1',off:'0'}}">Aplicar Parcialidad</th>                            
                            <th data-options="field:'ordter',width:90,align:'center',halign:'center',hidden:true">Orden Ter</th>
                        </tr>                           
                    </thead>  
                </table>
                <div id="tbcon" style="height:auto">  
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLIndicador">Limpiar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnAIndicador">Agregar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:false" id="btnEIndicador">Eliminar</a>
                </div>
                <br />
                <table style="width: 100%;">       
                 <tr>
                    <td align="Center"> <asp:Label ID="Label14" CssClass="LetraChica" runat="server">Tipo De Movimiento:</asp:Label>
                        &nbsp;Alta<input type="checkbox" id="chkAlta" name="chkAlta" value="chkAlta">
                            Baja<input type="checkbox" id="chkBaja" name="chkBaja" value="chkBaja">
                            Cambio<input type="checkbox" id="chkCambio" name="chkCambio" value="chkCambio">
                    </td>
                 </tr>
                 <tr>
                    <td align="Center"> &nbsp;</td>
                 </tr>
                 <tr>
                    <td align="Center"> 
                        <asp:Label ID="Label3" runat="server" CssClass="LetraChica">Tipo De Afectación:</asp:Label>
                        &nbsp;<select class="easyui-combobox" data-options="editable:false"  style="width:300px;" id="cbotipoafectacion">
                                <option value="0">Seleccione tipo de afectación</option>
                                <option value="1">Aplica a una plaza</option>
                                <option value="2">Aplica entre todas su plazas</option>
                                <option value="3">Aplica lo que alcanze por plaza</option>
                                <option value="4">Aplica a todas sus plazas, distribuido</option>
                            </select>
                    </td>
                 </tr>
                </table>
                <br />
                <asp:Label ID="Llblrelacion" CssClass="LetraChica" runat="server">Relacion De Campos de Captura</asp:Label>
                <br />
                 <table id="dgcampos" class="easyui-datagrid"  style="width:36%; height:300px;" toolbar="#tbcam" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 20 ">  
                    <thead>
                        <tr>                           
                            <th data-options="field:'camarchivo',width:110,align:'left',halign:'center',hidden:false">Campo Archivo</th>
                            <th data-options="field:'camtabla',width:150,align:'left',halign:'center',hidden:false">Campo Tabla</th>
                            <th data-options="field:'ordcam',width:120,align:'left',halign:'center',hidden:false,editor: { type: 'textbox'}">Orden Captura</th>
                        </tr>                           
                    </thead>  
                </table>
                <div id="tbcam" style="height:auto">  
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLCampos">Limpiar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnACampos">Agregar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:false" id="btnECampos">Eliminar</a>
                </div>
       </div>     
    </div>
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg');" id="wind" closed="true" title="Lista de Indicadores">    
          <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLSelInd">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnASelInd">Aceptar</a>              
         </div>        
                <div style="width:100%;" align="Center">            
                    <table>                    
                    <tr>
                        <td align="Center">
                            <asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                        </td>
                        <td align="Center"> 
                            <input  class="easyui-combobox" data-options="editable:false" style="width:200px;" id="cbocamind" name="state"></input>
                        </td>
                        <td align="Center"> 
                            <select class="easyui-combobox" data-options="editable:false"  style="width:120px;" id="cboconind">
                                <option value="=">Exacta</option>
                                <option value="like">Aproximada</option>                                
                            </select>
                        </td>
                        <td align="Center">
                            <input class="easyui-textbox" style="width:250px" id="txtvalind">
                        </td>
                            <td align="Center">
                            <a id="btnfiltrarind" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                        </td>
                    </tr>                  
                    </table> 
                 </div> 
                <table class="easyui-datagrid" id="dgind" style="height:557px">
                     <thead>
                        <tr>     
                            <th data-options="field:'chk',checkbox:true"></th>                            
                            <th data-options="field:'indcod',width:80,align:'center',halign:'center',hidden:false">Clave</th>
                            <th data-options="field:'descod',width:450,align:'left',halign:'center',hidden:false">Descripción</th>
                        </tr>                           
                    </thead>  
                </table>                                   
         </div>           
    <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow:hidden;" id="wcampos" closed="true" title="">   
         <div class="easyui-panel" style="padding:3px; width:100%">                                            
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLRelCam">Limpiar</a>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnARelCam">Aceptar</a>                    
         </div>    
        <div class="easyui-layout" style="border-style: none; width:100%;height:95%; overflow:hidden;"> 
            <div data-options="region:'north'" style="width:100%; height:50%; padding:3px; overflow:hidden; " align="center">   
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;"> 
                     <div data-options="region:'west'" style="width:50%; height:100%; padding:3px; overflow:hidden; " align="center"> 
                          <div id="Div6" class="easyui-panel" style="width:100%;height:100%">
                              <ul class="easyui-tree" id="tcamorigen" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                          </div>   
                     </div>
                     <div data-options="region:'center'" style="width:50%; height:100%; padding:3px; overflow:hidden; " align="center">   
                          <div id="Div1" class="easyui-panel" style="width:100%;height:100%">
                              <ul class="easyui-tree" id="tcamdestino" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                          </div>   
                     </div>
                 </div>
            </div>
            <div data-options="region:'center'" style="width:100%; height:50%; padding:3px; overflow:hidden; " align="center">  
                 <table id="dgCamRel" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tbselcam" data-options = "striped: true, rownumbers: true, singleSelect: true, autoRowHeight: false, pageSize: 20 ">  
                    <thead>
                        <tr>                            
                            <th data-options="field:'camrelo',width:110,align:'left',halign:'center',hidden:false">Origen</th>
                            <th data-options="field:'camreld',width:300,align:'left',halign:'center',hidden:false">Destino</th>
                        </tr>                           
                    </thead>  
                </table>   
                <div id="tbselcam" style="height:auto">                      
                     <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-add',disabled:false" id="btnAGRelCam">Agregar</a>
                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-remove',disabled:true" id="btnERelCam">Eliminar</a>       
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
