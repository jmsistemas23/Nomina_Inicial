<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Grid.aspx.cs" Inherits="FILE_Costeo_Consulta_Grid" %>

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

      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 
        
   <%-- <link href="../../KendoUI/styles/kendo.common.min.css" rel="stylesheet" /> 
    <link href="../../KendoUI/styles/kendo.default.min.css" rel="stylesheet" />    
    <link href="../../KendoUI/styles/kendo.default.mobile.min.css"  rel="stylesheet" />

    <script src="../../KendoUI/lib/jquery.min.js"></script>
    <script src="../../KendoUI/lib/kendo.all.min.js"></script>  
    <script src="../../KendoUI/js/kendo.web.min.js"></script> 
    <script src="../../KendoUI/js/jszip.min.js"></script>
         --%>


  
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>

      <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-export.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-detailview.js"></script>

     <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="Catalogos_funsiones.js"></script>   
    <script src="Consulta_Grid.js?1.7"></script>
  
</head>
<body>   
     <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">              
         <div class="easyui-panel" style="padding:3px; width:100%">    
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>      
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel',disabled:false" id="btnExcel">Exportar Excel</a>                 
        </div>
        <br />  
     <%-- <div id="example">
         <table id="dgdatos" style="width:90%; "></table>    
          <script type="text/x-kendo-template" id="template">
              <table id="dgcalendario" style="width:90%; "></table>     
            </script>                  
      </div>    --%>  
         <table id="dgdatos" class="easyui-datagrid"  style="width:90%; height:90%;" data-options = "striped: true,fitColumns:true,rownumbers: true, pagination: false, singleSelect: true, autoRowHeight: false "> 
              <thead>
                  <tr>
                       <th data-options="field:'Plaza',width:100,align:'center',halign:'center'">Plaza</th>
                       <th data-options="field:'Nombre',width:300,align:'left',halign:'center'">Nombre</th> 
                        <th data-options="field:'Organismo',width:100,align:'center',halign:'center'">Organismo</th> 
                        <th data-options="field:'Categoria',width:100,align:'center',halign:'center'">Categoría</th> 
                        <th data-options="field:'DescCategoria',width:250,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'Adscripcion',width:130,align:'center',halign:'center'">Adscripción</th> 
                        <th data-options="field:'DescAdscripcion',width:250,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'UR',width:250,align:'center',halign:'center'">UR</th> 
                        <th data-options="field:'MensualLiquido',width:120,align:'right',halign:'center'">Mensual Liquido</th> 
                       <th data-options="field:'AnualPresupuestal',width:120,align:'right',halign:'center'">Anual Presupuestal</th>                        
                  </tr>
              </thead>
           </table>      
         <%--  <table id="dgdatos" class="easyui-datagrid"  style="width:90%; height:15%;" data-options = "striped: true,fitColumns:false,rownumbers: true, pagination: false, singleSelect: true, autoRowHeight: false "> 
              <thead>
                  <tr>
                       <th data-options="field:'Plaza',width:100,align:'center',halign:'center'">Plaza</th>
                       <th data-options="field:'Nombre',width:300,align:'left',halign:'center'">Nombre</th> 
                        <th data-options="field:'Organismo',width:100,align:'center',halign:'center'">Organismo</th> 
                        <th data-options="field:'Categoria',width:100,align:'center',halign:'center'">Categoría</th> 
                        <th data-options="field:'DescCategoria',width:250,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'Adscripcion',width:130,align:'center',halign:'center'">Adscripción</th> 
                        <th data-options="field:'DescAdscripcion',width:250,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'UR',width:250,align:'center',halign:'center'">UR</th> 
                        <th data-options="field:'MensualLiquido',width:120,align:'right',halign:'center'">Mensual Liquido</th> 
                       <th data-options="field:'AnualPresupuestal',width:120,align:'right',halign:'center'">Anual Presupuestal</th>                        
                  </tr>
              </thead>
           </table>      
         <br />         
         <table id="dgcalendario" class="easyui-datagrid"  style="width:90%; height:10%;" data-options = "striped: true,fitColumns:false,rownumbers: true, pagination: false, singleSelect: true, autoRowHeight: false "> 
              <thead>
                  <tr>                      
                      <th data-options="field:'Enero',width:100,align:'right',halign:'center'">Enero</th> 
                      <th data-options="field:'Febrero',width:100,align:'right',halign:'center'">Febrero</th> 
                      <th data-options="field:'Marzo',width:100,align:'right',halign:'center'">Marzo</th> 
                      <th data-options="field:'Abril',width:100,align:'right',halign:'center'">Abril</th> 
                      <th data-options="field:'Mayo',width:100,align:'right',halign:'center'">Mayo</th> 
                      <th data-options="field:'Junio',width:100,align:'right',halign:'center'">Junio</th> 
                      <th data-options="field:'Julio',width:100,align:'right',halign:'center'">Julio</th> 
                      <th data-options="field:'Agosto',width:100,align:'right',halign:'center'">Agosto</th> 
                      <th data-options="field:'Septiembre',width:120,align:'right',halign:'center'">Septiembre</th> 
                      <th data-options="field:'Octubre',width:120,align:'right',halign:'center'">Octubre</th> 
                      <th data-options="field:'Noviembre',width:120,align:'right',halign:'center'">Noviembre</th> 
                      <th data-options="field:'Diciembre',width:120,align:'right',halign:'center'">Diciembre</th>                                       
                  </tr>
              </thead>
           </table>   
          <br />                
         <table id="dgcosto" class="easyui-datagrid"  style="width:90%; height:55%;" data-options = "striped: true,fitColumns:false,rownumbers: true, pagination: false, singleSelect: true, autoRowHeight: false "> 
              <thead>
                    <tr>                                              
                        <th data-options="field:'Tipo',width:50,align:'center',halign:'center'">Tipo</th> 
                        <th data-options="field:'Concepto',width:80,align:'center',halign:'center'">Concepto</th> 
                        <th data-options="field:'Gasto',width:70,align:'center',halign:'center'">Gasto</th> 
                        <th data-options="field:'Descripcion',width:250,align:'left',halign:'center'">Descripción</th> 
                        <th data-options="field:'CostoAnual',width:100,align:'right',halign:'center'">Costo Anual</th> 
                        <th data-options="field:'TipoPago',width:150,align:'center',halign:'center'">Tipo Pago</th>                                                 
                        <th data-options="field:'QnaAplica',width:150,align:'center',halign:'center'">Quincena de Aplicación</th>      
                    </tr>
                </thead>                   
         </table>         --%>
    </div>
       <div class="easyui-dialog" style="background-image: url('../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="wdialogo" closed="true" title="Nombre del Archivo" align="Center">
           <div class="easyui-panel" style="padding:3px; width:100%">                               
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>                  
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-ok'" id="btnAceptar">Aceptar</a>                
          </div>  
           <div style="width:100%" align="Center">
               <br />
                <asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre Del Archivo</asp:Label>
               <br />
               <input class="easyui-textbox" style="width:100%" id="txtnombre">            
           </div>   
       </div>
       <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
     
</body>
</html>
