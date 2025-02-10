<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Menu.aspx.cs" Inherits="FILE_Menu_Menu" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        
    <link rel="stylesheet" type="text/css" href="../../Styles/loader.css"  media="screen"/> 
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
	<link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">	
     <link href="Menu.css" rel="stylesheet" />   
         
    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script> 
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script>    
    <script type="text/javascript" src="../../Scripts/jquery.session.js"></script>       
    <script src="Menu.js"></script> 
     
</head>   
<body>           
      <div class="nav grid-container">        
          <div class="item1">Main</div>  
          <div class="item2">
               <div class="MenuInicial">
                  <ul>
                      <li><a class="nav__btn-open aMenu" href="javascript:void(0);"id="btnmenu"></a></li>
                      <li><a class="aUsuarios" href="#"></a></li>
                      <li><a class="aAccesos" href="#"></a></li>
                      <li><a class="aSalir" href="#"></a></li>
                  </ul>
              </div>
          </div>
          <div class="item3">Footer</div>   
          <div class="nav-list-wrapper" id="nav-list-wrapper">  
          </div>      
       </div>               
     <div class="modal" style="display: none; width:100%; height:100%;" id="loading" align="center">
        <div class="center">
            <img alt="" src="Imagenes/ajax-loader.gif"/>
        </div> 
    </div>            
</body>
    <script src="main.js"></script> <!-- Resource jQuery -->
</html>
