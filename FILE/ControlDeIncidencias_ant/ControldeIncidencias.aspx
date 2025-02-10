<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ControldeIncidencias.aspx.cs" Inherits="FILE_ControlDeIncidencias_ControldeIncidencias" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />	

      <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   

    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"> 
      <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>

      <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-export.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-detailview.js"></script>

     <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="ControldeIncidencias.js?v1.0"></script>
</head>
<body>
    <form id="form1" runat="server">
     <div id="ddiseño" style="border-style: none; width:100%;height:100%; overflow:hidden;" align="Center">              
         <div class="easyui-panel" style="padding:3px; width:100%">    
             <%--<a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>             --%>
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save'" id="btnGuardar">Guardar</a>              
        </div> 
    <br />
    <table id="dg" class="easyui-datagrid"  style="width:80%; height:80%;" >  
       <thead>
          <tr>
             <th data-options="field:'chk',checkbox:true"></th>                     
              <th data-options="field:'id',width:20,align:'center',halign:'center',hidden:false">Id</th>
             <th data-options="field:'numdoc',width:130,align:'center',halign:'center',hidden:false">Documento</th>
             <th data-options="field:'numplaza',width:80,align:'center',halign:'center',hidden:false">Plaza</th>                            
             <th data-options="field:'numemp',width:80,align:'center',halign:'center',hidden:false">Empleado</th>
             <th data-options="field:'cveind',width:70,align:'center',halign:'center',hidden:false">Clave</th>
             <th data-options="field:'descin',width:200,align:'left',halign:'center',hidden:false">Descripción</th>
             <th data-options="field:'tipoind',width:90,align:'center',halign:'center',hidden:false">Tipo Indicador</th>
             <th data-options="field:'cantidad',width:80,align:'center',halign:'center',hidden:false">Cantidad</th>
             <th data-options="field:'importecalc',width:100,align:'right',halign:'center',hidden:false">Importe</th>
             <th data-options="field:'aplicar',width:70,align:'center',halign:'center',hidden:false, editor:{type:'checkbox',options:{on:'1',off:'0'}}">Aplicar</th>             
          </tr>                           
       </thead>  
     </table>  
    </div>
     <div class="modal" style="display: none" id="loading" align="center">
               <div class="center">
                  <img alt="" src="../../Imagenes/ajax-loader.gif" />
               </div> 
       </div> 
    </form>
</body>
</html>
