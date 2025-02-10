<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Inc_Niveles.aspx.cs" Inherits="FILE_IncrementoDeNiveles_Inc_Niveles" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">
      <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

     <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
        <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
         <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
       <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
        <script type="text/javascript" src="../../scripts/demos.js"></script>
	    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
        <script type='text/javascript' src="../../jqueryesy/plugins/datagrid-cellediting.js"></script>
        <script type="text/javascript" src="../../jqueryesy/plugins/datagrid-scrollview.js"></script>
        <script type="text/javascript" src="../../jqueryesy/jquery.tree.js"></script>     
        <script type="text/javascript" src="../../scripts/Funsiones.js"></script>
         <script src="../../Scripts/jquery-Mask.js"></script>  
         <script src="../../Scripts/jquery.session.js"></script>  
        <script type="text/javascript" src="Inc_Niveles.js?v1.3"></script> 
</head>
<body>
    <form id="form1" runat="server">
     <div id="dconfiguracion"  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">   
        <div id="dmenu" class="easyui-panel" style="padding:3px; width:100%">    
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                      
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnAplicarIncremento">Aplicar Incremento</a>
       </div>
         <br />
        <div id="tconfig" class="easyui-tabs" style="width: 80%; height: 90%;overflow:hidden;padding:3px;"  data-options="plain:true">
            <div title="Valores de Busqueda" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center"> 
                 <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                    <div  data-options="region:'west'" style="width:35%;padding:3px; overflow:hidden;" align="center">
                        <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                            <div data-options="region:'north'" style="width:100%; height:20%; padding:0px; overflow:hidden;" align="center"> 
                                <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Grupo Jerarquico</asp:Label> 
                                <input class="easyui-textbox" style="width:100%" id="txtgpojer">
                                    <div id="Div6" class="easyui-panel" style="border-style: none; width:100%;height:65%">
                                    <ul class="easyui-tree" id="tgpojer" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                            <div data-options="region:'center'" style="width:100%; height:20%; padding:0px; overflow:hidden;" align="center" >
                                <asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Grupo Laboral</asp:Label> 
                                <input class="easyui-textbox" style="width:100%" id="txtgpolab">
                                    <div id="Div1" class="easyui-panel" style="border-style: none; width:100%;height:65%">
                                    <ul class="easyui-tree" id="tgpolab" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                            <div data-options="region:'south'" style="width:100%; height:60%; padding:0px; overflow:hidden;" align="center">
                                <table style="width: 90%">
                                    <tr>
                                        <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Puestos</asp:Label></td>                                       
                                        <td align="right"><asp:Label ID="Label4" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkpuestos"></td>                                                                              
                                    </tr>                                   
                                </table>                                
                                <input class="easyui-textbox" style="width:100%" id="txtpuestos">                                                                                            
                                <div id="Div2" class="easyui-panel" style="border-style: none; width:100%;height:87%">
                                    <ul class="easyui-tree" id="tpuestos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div data-options="region:'center'" style="width:65%;padding:3px;  overflow:hidden;" align="center">                 
                        <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                            <div  data-options="region:'west'" style="width:50%;padding:3px; overflow:hidden;" align="center">                                
                               <table style="width: 90%">
                                    <tr>
                                        <td align="left"><asp:Label ID="Label3" CssClass="LetraChicaNegrita" runat="server">Conceptos</asp:Label></td>                                       
                                        <td align="right"><asp:Label ID="Label5" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkconceptos"></td>                                                                              
                                    </tr>                                   
                                </table>        
                                <input class="easyui-textbox" style="width:100%" id="txtconceptos">
                                    <div id="Div3" class="easyui-panel" style="border-style: none; width:100%;height:93%">
                                    <ul class="easyui-tree" id="tconceptos" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>
                                </div>                                 
                            </div>                                
                            <div data-options="region:'center'" style="width:50%;padding:3px;  overflow:hidden;" align="center"> 
                                <div id="Div5" class="easyui-panel" style="padding:3px; width:100%">  
                                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiarNiv">Limpiar</a>
                                    <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" id="btnBuscarNiv">Buscar Niveles</a>                               
                                </div>    
                                 <table style="width: 90%">
                                    <tr>
                                        <td align="left"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Niveles</asp:Label></td>
                                        <td align="right"><asp:Label ID="Label16" CssClass="LetraChicaNegrita"  runat="server" Text="Marcar Todos:"></asp:Label><input type="checkbox" id="chkniveles"></td>
                                    </tr>
                                    </table>
                                    <input class="easyui-textbox" style="width:100%" id="txtniveles">
                                    <div id="Div4" class="easyui-panel" style="border-style: none; width:100%;height:89%">
                                        <ul class="easyui-tree" id="tniveles" data-options="animate:true,lines:false,checkbox:true,cascadeCheck:false"></ul>                            
                                    </div>              
                             </div>
                        </div>
                  </div>   
             </div>      
           </div>    
            <div title="Aplicación de Importes" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">                        
                <div class="easyui-layout" style="border-style: none; width:100%;height:100%; overflow:hidden;">
                      <div data-options="region:'north'" style="width:100%; height:30%; padding:0px; overflow:hidden;" align="center">                
                           <div id="Div7" class="easyui-panel" style="padding:3px; width:100%">  
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLimpiarCon">Limpiar</a>
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search',disabled:true" id="btnCargarCon">Cargar Conceptos</a>                               
                          </div>             
                          <br />
                                <a href="#" id="btnporcentaje" class="easyui-linkbutton" style="width:20%" data-options="plain:true,toggle:true,group:'gf',disabled:true">Porcentaje</a>
                                <a href="#" id="btnimporte" class="easyui-linkbutton" style="width:20%" data-options="plain:true,toggle:true,group:'gf',disabled:true">Importe</a>                           
                            <br />
                           <br />
                            <table>                                                                                      
                                <tr>
                                    <td align="center" colspan="4">
                                        <asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Importe:</asp:Label>
                                        <input class="easyui-numberbox" style="width:30%;" data-options="disabled:true,precision:2" id="txtimporte"></td>                                                  
                                </tr>
                                <tr>
                                    <td align="center" colspan="4">
                                        &nbsp;</td>                                                  
                                </tr>
                                <tr>
                                    <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Vigencia Inicial:</asp:Label></td>
                                    <td align="left"><input  class="easyui-datebox"  style="width:120px;" id="dvigenciainicial" data-options="formatter:myformatter,parser:myparser,disabled:true"></input></td>
                                    <td align="left"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Vigencia Final:</asp:Label></td>
                                    <td align="left"><input  class="easyui-datebox"  style="width:120px;" id="dvigenciafinal" data-options="formatter:myformatter,parser:myparser,disabled:true"></input></td>
                                </tr>                                              
                            </table>
                      </div>
                      <div data-options="region:'center'" style="width:100%; height:70%; padding:0px; overflow:hidden;" align="center" >
                           <table id="dgcaptura" class="easyui-datagrid"  style="width:100%; height:100%;" toolbar="#tb">  
                                <%--<thead data-options="frozen:true">
                                  <tr>
                                    <th data-options="field:'chk',checkbox:true"></th>              
                                  </tr>
                                </thead>      --%>                                         
                           </table>
                          <div id="tb" style="height:auto">                                                                                                           
                               <%-- <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:true" id="btnLImporte">Limpiar Importes</a>--%>
                                <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok',disabled:true" id="btnAplicar">Aplicar Importes</a>
                        </div>     
                     </div>
                </div>
            </div>    
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
