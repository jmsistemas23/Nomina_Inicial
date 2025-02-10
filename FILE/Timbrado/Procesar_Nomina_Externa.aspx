<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Procesar_Nomina_Externa.aspx.cs" Inherits="FILE_Timbrado_Procesar_Nomina_Externa" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
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
<script src="../../jqueryEsy/plugins/jquery.filebox.js"></script> 
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.15.3/xlsx.full.min.js"></script>    
    <script src="Procesar_Nomina_Externa.js?v3"></script>
</head>
<body>
      <div class="bg-neutral-100 w-screen h-screen flex flex-col bg-yellow-50 " align="Center" style="background-color:#FCFDFF;">  
         <div class="easyui-panel mb-3" style="padding:2px; width:100%"> 
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-btnInicio16'" id="btnInicial">Quincenas</a>          
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>     
             <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar',disabled:false" id="btnLimpiar" >Limpiar</a>                  
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_excel',disabled:false" id="btnGuardar" >Cargar Nómina</a>            
        </div>  
        <div class="flex flex-col mb-1 w-2/3 self-center">
           <asp:Label ID="lblquin" class="text-2xl text-red-900"  runat="server"></asp:Label> 
        </div>
        <div id="dmenu" class=" flex flex-row justify-center space-x-4 mb-4">
              <a id="btnCargar" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon-historia',size:'large',iconAlign:'top' ,toggle:true,group:'gf'" style="width:150px;height:100px; font-weight: bold; font-size: x-large;">Master</a>                                                   
              <a id="btnPlantillas" href="#" class="easyui-linkbutton" data-options="plain:false,iconCls:'icon_parcial',size:'large',iconAlign:'top', toggle:true,group:'gf',disabled:false" style="width:150px; height:100px; font-weight: bold; font-size: x-large;" >Plantillas</a>
        </div> 
         <div id="dcarga" class="w-screen" style="display:none">              
             <div class="flex flex-col mb-1 w-2/3 self-center">
                   <label class="text-left text-lg text-red-900">Organismo</label>   
                    <input class="easyui-combobox" style="width:100%; text-align:left"  id="cboorganismo" data-options="required:false"/>  
             </div>
             <div class="flex flex-col mb-1 w-2/3 self-center">
                <label class="text-left text-lg text-red-900">Archivo de Nómina</label>             
                <input  id="xlsNom"  class="easyui-filebox" data-options="accept:'application/vnd.ms-excel',prompt:'Seleccione el Archivo'" style="width:100%"/>                
                 <pre id="jsonDataNom"></pre>
            </div>  
            <div class="flex flex-col mb-1 w-2/3 self-center">
                <label class="text-left text-lg text-red-900">Archivo de Indicadores</label>             
                <input  id="xlsInd"  class="easyui-filebox" data-options="accept:'application/vnd.ms-excel',prompt:'Seleccione el Archivo'" style="width:100%"/>                
                <pre id="jsonDataInd"></pre>
            </div>  
            <div id="dtotales" class="w-full mt-10 " style="display:none">
                <table id="dgtotales" class="easyui-datagrid" style="width:80%; height:400px;">
                    <thead>
                       <tr></tr>
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
