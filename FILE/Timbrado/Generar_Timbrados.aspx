<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Generar_Timbrados.aspx.cs" Inherits="FILE_Timbrado_Generar_Timbrados" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
       <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>        
 <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" /> 
 
 <link href="../../Styles/pagina.css" rel="stylesheet" />   
 <link href="../../Styles/loader.css" rel="stylesheet" />
 
 <link href="../../jqueryEsy/themes/pepper-grinder/easyui.css" rel="stylesheet" /> 
 <link href="../../jqueryEsy/themes/icon.css" rel="stylesheet" />
     
 <script src="../../Scripts/jquery-1.11.1.min.js"></script>
 <script src="../../jqueryEsy/jquery.easyui.min.js"></script> 
 <script src="../../Scripts/demos.js"></script>
 <script src="../../Scripts/Funsiones.js?v0"></script>
 <script src="../../Scripts/accounting.js"></script>
    <script src="Generar_Timbrados.js?v1.0"></script>
</head>
<body>
   <div  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
       <div id="dquincenas" class="easyui-layout flex flex-col" style="width:300px;height:60%; overflow:hidden;">
           <div class="mt-10 mb-4">
               <asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">Lista de Quincenas</asp:Label> 
                <input class="easyui-textbox" style="width:100%" id="txtquincenas"/>
           </div>
           <div>
               <div id="Div6" class="easyui-panel" style="width:100%;height:600px">
                   <ul class="easyui-tree" id="tquincenas" data-options="animate:true,lines:false,checkbox:false,cascadeCheck:false"></ul>
                </div> 
           </div>
       </div>
       <div id="dprocesos" class="easyui-layout flex flex-col items-center" style="width:100%;height:100%; overflow:hidden; display:none">
           <div class="easyui-panel" style="padding:2px; width:100%">                             
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>      
               <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-cancel',disabled:true" id="btnDetener">Detener</a>      
           </div>
           <div class="mt-10 mb-4">
               <asp:Label ID="lblquin" class="text-2xl text-red-900"  runat="server"></asp:Label> 
           </div>
           <div class=" flex flex-row justify-center space-x-4 mb-4">
              <a id="btnMaster" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-historia',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Master</a>                                                   
              <a id="btnPlantillas" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top', toggle:true,group:'gf',disabled:false" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Plantillas</a>
           </div> 
             <div id="dtotales" class="w-full mt-10 " style="display:none">
                <table id="dgtotales" class="easyui-datagrid" style="width:90%; height:100px;">
                    <thead>
                        <tr></tr>
                    </thead>               
                </table>              
            </div>
           <div id="dplantillas" class="w-full mt-10" style="display:none">
                <table id="dgplantillas" class="easyui-datagrid" style="width:90%; height:150px;">
                    <thead>
                        <tr> </tr>
                    </thead>
                </table>
            </div>         
            
       </div>
   </div>   
   <div class="modal w-screen h-screen items-center" style="display: none;" id="loading" align="center">
      <div class="center w-screen h-screen items-center"  align="center" >
        <img alt="" src="../../Imagenes/ajax-loader.gif" />
     </div> 
   </div> 
</body>
</html>
