<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Entrar.aspx.cs" Inherits="FILE_Patrimoniales_Entrar" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
       <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"/>   
       <link href="../../tailwinds/static/dist/tailwind.css" rel="stylesheet" />
    <script src="../../Scripts/jquery-1.11.1.min.js"></script>
    <script src="../../Scripts/demos.js"></script>
    <script src="../../Scripts/Funsiones.js"></script>   

     <link href="../../jqueryEsy/themes/icon.css" rel="stylesheet" />
     <link href="../../jqueryEsy/themes/pepper-grinder/easyui.css" rel="stylesheet" />   
     <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
	<script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
     
    <script src="Entrar.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div class="w-screen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
           <form class="flex flex-col justify-center items-center w-1/2">
        <img src="../../Imagenes/escudo.png" class="w-32" />
        <h2 class="my-8 font-display font-bold text-3xl text-red-800 text-center">
          Bienvenido
        </h2>
        <div class="relative">
          <i class="fa fa-user absolute text-primarycolor text-xl"></i>
          <input
            id="txtemp"
            type="text"
            placeholder="Empleado"
            class="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-2xl font-black"/>
            <%--<input id="txtusu" type="text"  class="easyui-tetbox"/>--%>
        </div>
        <div class="relative mt-8">
           <i class="fa fa-user absolute text-primarycolor text-xl"></i>
          <input 
            id="txtrfc"
            type="text"   
              placeholder="Rfc"         
            class="pl-8 border-b-2 font-display focus:outline-none focus:border-primarycolor transition-all duration-500 capitalize text-2xl font-black"/>
           <%--<input id="txtpas" type="password" class="easyui-tetbox"/>--%>
        </div>           
        <input 
            class="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-500"
            type="button" 
            value="Entrar" id='btnentrar' />
      </form>
    </div>
    </form>
</body>
</html>
