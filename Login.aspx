<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>    
    <link href="tailwinds/static/dist/tailwind.css" rel="stylesheet" />

    <script src="Scripts/jquery-1.11.1.min.js"></script>
    <script src="Scripts/demos.js"></script>

     <link href="jqueryEsy/themes/icon.css" rel="stylesheet" />
     <link href="jqueryEsy/themes/pepper-grinder/easyui.css" rel="stylesheet" />   
     <script type="text/javascript" src="jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="jqueryesy/jquery.easyui.min.js"></script>
     
    <script src="Login.js?1.3"></script>
</head>
 <body>
    <img src="Imagenes/wave.png" class="fixed hidden lg:block inset-0 h-full" style="z-index: -1;"/>
    <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
      <img src="Imagenes/LOGO1.png" class="hidden lg:block w-1/2 hover:scale-90 transition-all duration-500 transform mx-auto"/>
      <form class="flex flex-col justify-center items-center w-1/2">
        <img src="Imagenes/LOGO1.png" class="w-32" />
        <h2 class="my-8 font-display font-bold text-3xl text-red-800 text-center">
          Bienvenido
        </h2>
        <div class="relative">
          <i class="fa fa-user absolute text-primarycolor text-xl"></i>
          <input
            id="txtusu"
            type="text"
            placeholder="Usuario"
            value="Admin"
            class="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-2xl font-black"/>
            <%--<input id="txtusu" type="text"  class="easyui-tetbox"/>--%>
        </div>
        <div class="relative mt-8">
          <i class="fa fa-lock absolute text-primarycolor text-xl"></i>
          <input 
            id="txtpas"
            type="password"   
              placeholder="Contraseña"      
              value="@dM1n"
            class="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-2xl font-black"/>
           <%--<input id="txtpas" type="password" class="easyui-tetbox"/>--%>
        </div>           
        <input 
            class="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
            type="button" 
            value="Entrar" id='btnentrar' />
      </form>
       <div id="jqxLoader">
       </div>
    </div>    
  </body>
</html>
