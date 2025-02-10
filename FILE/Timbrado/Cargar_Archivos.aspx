<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Cargar_Archivos.aspx.cs" Inherits="FILE_Timbrado_Cargar_Archivos" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>    
<link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
<link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
<link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>  
<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css"/>
<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css"/>	     

<script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="../../scripts/demos.js"></script>
<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script> 
<script src="../../jqueryEsy/plugins/jquery.filebox.js"></script>       
<script src="../../Scripts/Funsiones.js"></script>
    <script src="Cargar_Archivos.js?v0.2"></script>
</head>
<body>    
      <div  class="easyui-layout" style="width:100%;height:100%;padding:0px;" align="Center">  
           <div class="easyui-panel" style="padding:2px; width:100%">    
              <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-save',disabled:false" id="btnGCaptura">Guardar</a>                            
           </div>  
          <br />
            <table> 
                <tr>            
                    <td style="width:70%;"> 
                        <form id="uploadFile" enctype="multipart/form-data" method="post">
                           <input id="txtCertificado" class="easyui-filebox" name="file1" data-options="prompt:'Choose a file...'" style="width:100%"/>                           
                        </form>
                    </td>
                    <td style="width:30%;">
                        <div id="progressFile" class="easyui-progressbar" style="width:100%;"></div>
                     </td>
                </tr>
            </table>
      </div>  
</body>
</html>
