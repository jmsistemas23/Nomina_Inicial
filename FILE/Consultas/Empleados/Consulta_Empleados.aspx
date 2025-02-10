<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Consulta_Empleados.aspx.cs" Inherits="FILE_Consultas_Empleados_Consulta_Empleados" %>

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
     <link rel="stylesheet" href="../../../Styles/pagina.css" type="text/css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../../jqueryesy/themes/icon.css">
     <link rel="stylesheet" href="../../../Styles/loader.css"  type="text/css" media="screen"/>   

    <script type="text/javascript" src="../../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../../jqueryesy/jquery.easyui.min.js"></script>    
    <script type="text/javascript" src="../../../scripts/Funsiones.js"></script>
    <script src="../../../Scripts/jquery.session.js"></script>     

    <script type="text/javascript" src="Consulta_Empleados.js?0.3"></script>  
    <style type="text/css">
        .auto-style1 {
            height: 26px;
        }
        </style> 
    
</head>
<body>
    <form id="form1" runat="server">
    <div class="easyui-layout" style="width:100%;height:98%; overflow-x: hidden;overflow-y: hidden;" align="center">     
        <div class="easyui-panel" style="padding:3px; width:100%">                               
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'limpiar'" id="btnLimpiar">Limpiar</a>
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'" id="btnBuscar">Buscar</a>                          
        </div>
        <br />            
       <div id="cc" class="easyui-layout" style="width:90%;height:90%;">
          <div id="rmenu" data-options="region:'west',split:true,hideCollapsedContent:false,collapsed:true" title="Menu" style="width:15%; height:100%; padding:3px; overflow:auto;" align="center">             
             <table>
                <tr id="tbtnhistmov"><td align="center"><a id="btnhistmov" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Mov. de Personal</a></td></tr>                
                <tr id="tbtnhistpagos"><td align="center"><a id="btnhistpagos" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Mov. por Conceptos</a></td></tr>
                <tr id="tbtnhistdatper"><td align="center"><a id="btnhistdatper" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Datos Personales</a></td></tr>
                <tr id="tbtnhistreffam"><td align="center"><a id="btnhistreffam" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Referencias Familiares</a></td></tr>
                <tr id="tbtnhistpagesp"><td align="center"><a id="btnhistpagesp" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Mov. Especiales</a></td></tr>
                <tr id="tbtnhistinc"><td align="center"><a id="btnhistinc" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Incidencias</a></td></tr>
                <tr id="tbtnhistter"><td align="center"><a id="btnhistter" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de Terceros</a></td></tr>
                <tr id="tbtnhistplaza"><td align="center"><a id="btnhistplaza" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Historia de la Plaza</a></td></tr>
                <tr id="tbtnhistnomina"><td align="center"><a id="btnhistnomina" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Detalle de Nómina</a></td></tr>    
                <tr id="tbtnImgExpediente"><td align="center"><a id="btnImgExpediente" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon_movimientos',size:'large',iconAlign:'top'" style="width:80px" >Imagenes Expediente</a></td></tr>
             </table>
          </div>
          <div data-options="region:'center'" style="width:90%; height:100%; padding:3px; overflow-x: hidden;overflow-y: hidden;" align="center" > 
             <div id="tconfig" class="easyui-tabs" style="width: 100%; height: 100%;overflow:hidden;padding:3px;"  data-options="plain:true">                  
               <div title="Empleado" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">  
                    <table>
                          <tr>              
                            <td align="left"><asp:Label ID="Label15" CssClass="LetraChicaNegrita" runat="server">Empleado:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtempleado" data-options="readonly:true" value=""></td>              
                        </tr>
                            <tr>              
                            <td align="left"><asp:Label ID="Label31" CssClass="LetraChicaNegrita" runat="server">R.F.C.:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtrfc" data-options="readonly:true"></td>              
                        </tr>
                            <tr>              
                            <td align="left"><asp:Label ID="Label4" CssClass="LetraChicaNegrita" runat="server">CURP:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtcurp" data-options="readonly:true"></td>              
                        </tr>
                            <tr>              
                            <td align="left"><asp:Label ID="Label2" CssClass="LetraChicaNegrita" runat="server">Nombre Completo:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:379px;" id="txtnombre" data-options="readonly:true"></input></td>              
                        </tr>                            
                        <tr>              
                            <td align="left"><asp:Label ID="Label1" CssClass="LetraChicaNegrita" runat="server">Estatus:</asp:Label></td>
                            <td align="left"><input  class="easyui-textbox"  style="width:500px;" id="txtestatus" data-options="readonly:true"></input></td>              
                        </tr>                     
                        </table> 
                    <br />
                        <table class="easyui-datagrid" id="dghistpago" style="width:100%;height:75%" >
                           <thead>
                               <tr>
                                  <th data-options="field:'Plaza',width:80,align:'center',halign:'center'">Plaza</th>
                                   <th data-options="field:'Empleado',width:80,align:'center',halign:'center'">Empleado</th>
                                   <th data-options="field:'Percepciones',width:100,align:'Right',halign:'center'">Percepciones</th>
                                   <th data-options="field:'Deducciones',width:100,align:'Right',halign:'center'">Deducciones</th>
                                   <th data-options="field:'Neto',width:80,align:'Right',halign:'center'">Neto</th>
                                   <th data-options="field:'Periodo',width:180,align:'center',halign:'center'">Periodo</th>
                                   <th data-options="field:'Quincena',width:90,align:'center',halign:'center'">Quincena</th>
                                   <th data-options="field:'Estatus',width:80,align:'center',halign:'center'">Estatus</th>
                                   <th data-options="field:'CvePue',width:80,align:'center',halign:'center'">Clave</th>
                                   <th data-options="field:'DescPue',width:350,align:'left',halign:'center'">Categoria</th> 
                               </tr>
                            </thead>
                        </table>                    
               </div>
              <div title="Datos del Empleado" style="border-style: none; padding: 3px; overflow:hidden; width:100%; height:100%;" align="center">  
                <div class="easyui-accordion" style="width:100%;height:100%;">                                        
                    <div title="Datos Personales" style="overflow:auto;padding:10px;" align="center">
                        <table>
                            <tr>              
                            <td align="left" class="auto-style1"><asp:Label ID="Label6" CssClass="LetraChicaNegrita" runat="server">Sexo:</asp:Label></td>
                            <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtsexo" data-options="readonly:true"></input></td> 
                            <td align="left"><asp:Label ID="Label7" CssClass="LetraChicaNegrita" runat="server">Estado Civil:</asp:Label></td>                                           
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtestadocivil" data-options="readonly:true"></td>  
                        </tr>
                        <tr>                            
                            <td align="left"><asp:Label ID="Label49" CssClass="LetraChicaNegrita" runat="server">Fecha Nacimiento:</asp:Label></td>
                            <td align="left"></input><input  class="easyui-textbox"  style="width:250px;" id="txtfechanacimiento" data-options="readonly:true"></td>                                           
                            <td align="left"><asp:Label ID="Label18" CssClass="LetraChicaNegrita" runat="server">Naciaonalidad:</asp:Label></td>                                           
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtnacionalidad" data-options="readonly:true"></td>                                           
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label50" CssClass="LetraChicaNegrita" runat="server">Estado Nacimiento:</asp:Label></td>                  
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtestadonacimiento" data-options="readonly:true"></td>                  
                            <td align="left"><asp:Label ID="Label57" CssClass="LetraChicaNegrita" runat="server">Municipio Nacimiento:</asp:Label></td>                  
                            <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtmunnacimiento" data-options="readonly:true"></td>                  
                        </tr>
                        <tr>
                            <td align="left"><asp:Label ID="Label8" CssClass="LetraChicaNegrita" runat="server">Calle:</asp:Label></td>
                            <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:685px;" id="txtcalle" data-options="readonly:true"></input></input></td>   
                        </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label9" CssClass="LetraChicaNegrita" runat="server">No. Exterior:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtnoexterior" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label47" CssClass="LetraChicaNegrita" runat="server">No. Interior:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtnointerior" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label10" CssClass="LetraChicaNegrita" runat="server">Colonia:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtcolonia" data-options="readonly:true"></input></td>   
                        <td align="left"><asp:Label ID="Label11" CssClass="LetraChicaNegrita" runat="server">C.P.</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtcp" data-options="readonly:true"></input></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label62" CssClass="LetraChicaNegrita" runat="server">Razon Social:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtRazonSocial" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label61" CssClass="LetraChicaNegrita" runat="server">C.P. Fiscal</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtcpf" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label12" CssClass="LetraChicaNegrita" runat="server">Estado Residencia:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtestado" data-options="readonly:true"></input></td>   
                        <td align="left"><asp:Label ID="Label45" CssClass="LetraChicaNegrita" runat="server">Tipo de Sangre:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txttiposangre" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label13" CssClass="LetraChicaNegrita" runat="server">Municipio Residencia:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:250px;" id="txtmunicipio" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label51" CssClass="LetraChicaNegrita" runat="server">Alergias:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtalergias" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label58" CssClass="LetraChicaNegrita" runat="server">Localidad Residencia:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:250px;" id="txtlocalidad" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label14" CssClass="LetraChicaNegrita" runat="server">Teléfono:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txttelefono" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label48" CssClass="LetraChicaNegrita" runat="server">Profesión:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:250px;" id="txtprofesion" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label17" CssClass="LetraChicaNegrita" runat="server">Celular:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:250px;" id="txtcelular" data-options="readonly:true"></td>
                    </tr>
                        <tr>
                        <td align="left" class="auto-style1"><asp:Label ID="Label19" CssClass="LetraChicaNegrita" runat="server">Nivel Académico:</asp:Label></td>
                        <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:250px;" id="txtnivacademico" data-options="readonly:true"></td>   
                        <td align="left" class="auto-style1"><asp:Label ID="Label20" CssClass="LetraChicaNegrita" runat="server">Cedula Profesional:</asp:Label></td>
                        <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:250px;" id="txtcedula" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left" class="auto-style1"><asp:Label ID="Label54" CssClass="LetraChicaNegrita" runat="server">Tipo de Regimen IPES:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txttiporegimen" data-options="readonly:true"></td>   
                        <td align="left" class="auto-style1"><asp:Label ID="Label21" CssClass="LetraChicaNegrita" runat="server">Maestría:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtmaestria" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left" class="auto-style1"><asp:Label ID="Label55" CssClass="LetraChicaNegrita" runat="server">Porcentaje Reg:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtporcreg" data-options="readonly:true"></td>   
                        <td align="left" class="auto-style1"><asp:Label ID="Label59" CssClass="LetraChicaNegrita" runat="server">Correo Personal:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtcorreopersonal" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left" class="auto-style1"><asp:Label ID="Label56" CssClass="LetraChicaNegrita" runat="server">Regimen Voluntario:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtregvol" data-options="readonly:true"></td>   
                        <td align="left" class="auto-style1"><asp:Label ID="Label60" CssClass="LetraChicaNegrita" runat="server">Correo Institucional:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:250px;" id="txtcorreoinst" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label52" CssClass="LetraChicaNegrita" runat="server">Padecimiento:</asp:Label></td>
                        <td align="left" colspan="3"><input  class="easyui-textbox"  style="width:685px;" id="txtpadecimientos" data-options="readonly:true"></td>   
                    </tr>
                    </table>
                    </div> 
                    <div title="Referencias Familiares" style="overflow:auto;padding:10px;" align="center">
                        <table class="easyui-datagrid" id="dgrf" style="width:90%;height:100%" >
                              <thead>
                                <tr>
                                    <th data-options="field:'Nombre',width:250,align:'left',halign:'center',fixed:true">Nombre</th>
                                    <th data-options="field:'Sexo',width:50,align:'center',halign:'center',fixed:true">Sexo</th>
                                    <th data-options="field:'FecNacimiento',width:100,align:'center',halign:'center',fixed:true">Fecha Nac.</th>
                                    <th data-options="field:'Parentesco',width:200,align:'center',halign:'center',fixed:true">Parentesco</th>
                                    <th data-options="field:'Calle',width:250,align:'left',halign:'center',fixed:true">Calle</th>
                                    <th data-options="field:'NoExterior',width:80,align:'center',halign:'center',fixed:true">No. Exterior</th>
                                    <th data-options="field:'NoInterior',width:80,align:'center',halign:'center',fixed:true">No. Interior</th>
                                    <th data-options="field:'Colonia',width:200,align:'left',halign:'center',fixed:true">Colonia</th>
                                    <th data-options="field:'CodPostal',width:80,align:'center',halign:'center',fixed:true">Cod. Postal</th>
                                    <th data-options="field:'Telefono',width:100,align:'center',halign:'center',fixed:true">Telefono</th>
                                    <th data-options="field:'Estado',width:200,align:'left',halign:'center',fixed:true">Estado</th>
                                    <th data-options="field:'Municipio',width:200,align:'left',halign:'center',fixed:true">Municipio</th>
                                    <th data-options="field:'Observaciones',width:300,align:'left',halign:'center',fixed:true">Observaciones</th>
                                </tr>
                              </thead>
                        </table>
                    </div>
                    <div title="Datos Laborales" style="overflow:auto;padding:10px;" align="center">
                        <table>
                            <tr>
                        <td align="left" class="auto-style1"><asp:Label ID="Label22" CssClass="LetraChicaNegrita" runat="server">Fecha Gob. Federal:</asp:Label></td>
                        <td align="left" class="auto-style1"><input  class="easyui-textbox"  style="width:100px;" id="txtfechagobfed" data-options="readonly:true"></input></td>   
                        <td align="left" class="auto-style1"><asp:Label ID="Label23" CssClass="LetraChicaNegrita" runat="server">Dias Laborados Gob Fed:</asp:Label></td>
                        <td align="left" class="auto-style1"></input><input  class="easyui-textbox"  style="width:100px;" id="txtdiaslabgobfed" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label26" CssClass="LetraChicaNegrita" runat="server">Fecha Secretaría</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfechasec" data-options="readonly:true"></input></td>   
                        <td align="left"><asp:Label ID="Label27" CssClass="LetraChicaNegrita" runat="server">Dias Laborados Sec.:</asp:Label></td>
                        <td align="left"></input><input  class="easyui-textbox"  style="width:100px;" id="txtdiaslabsecretaria" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label53" CssClass="LetraChicaNegrita" runat="server">Fecha Dependencia:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfechadep" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label24" CssClass="LetraChicaNegrita" runat="server">Dias Laborados Actual:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtdiaslabanos" data-options="readonly:true"></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label28" CssClass="LetraChicaNegrita" runat="server">Fecha de Baja:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfechabaja" data-options="readonly:true"></input></td>   
                        <td align="left">&nbsp;</td>
                        <td align="left"></input></td>
                    </tr>
                    <tr>
                        <td align="left"><asp:Label ID="Label29" CssClass="LetraChicaNegrita" runat="server">Fecha de Reingreso:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:100px;" id="txtfechareingreso" data-options="readonly:true"></td>   
                        <td align="left"><asp:Label ID="Label25" CssClass="LetraChicaNegrita" runat="server">Antiguedad:</asp:Label></td>
                        <td align="left"><input  class="easyui-textbox"  style="width:50px;" id="txtantiguedad" data-options="readonly:true"></td>
                    </tr>        
                        </table>
                    </div>  
                    <div title="Plazas Activas" style="overflow:auto;padding:10px;" align="center">
                    <table class="easyui-datagrid" id="dgp" style="width:90%;height:100%" >
                    <thead>
                    <tr>                        
                      <%--  <th data-options="field:'numplaza',width:70,align:'center',halign:'center'">Plaza</th>                              
                        <th data-options="field:'numplamag',width:70,align:'center',halign:'center'">Plaza Ant</th>                              
                        <th data-options="field:'cveesppl',width:100,align:'center',halign:'center'">Estatus Plaza</th>                                              
                        <th data-options="field:'cvepuepl',width:70,align:'center',halign:'center',hidden:false">Puesto</th>                             
                        <th data-options="field:'cvepuepl',width:70,align:'center',halign:'center',hidden:true">Puesto</th>                             
                        <th data-options="field:'cvenivpl',width:80,align:'center',halign:'center',hidden:false">Nivel</th>
                        <th data-options="field:'vigini',width:80,align:'center',halign:'center',hidden:false">Vig. Inicial</th>
                        <th data-options="field:'vigfin',width:80,align:'center',halign:'center',hidden:false">Vig. Final</th>                              
                        <th data-options="field:'hrspla',width:70,align:'center',halign:'center',hidden:false">Hrs.</th>                              
                        <th data-options="field:'cvepagpl',width:80,align:'center',halign:'center',hidden:false">Pagaduría</th>                              
                        <th data-options="field:'cvezonpl',width:60,align:'center',halign:'center',hidden:false">Zona</th>                              
                        <th data-options="field:'cvebanor',width:70,align:'center',halign:'center',hidden:false">Banco</th>                              
                        <th data-options="field:'pagplaor',width:70,align:'center',halign:'center',hidden:false">Tipo Pago</th>                              --%>
                    </tr>
                    </thead>         
                    </table> 
                    </div>
                    <div title="Plazas Canceladas ó Inactivas" style="overflow:auto;padding:10px;" align="center">
                    <table class="easyui-datagrid" id="dgc" style="width:90%;height:100%" >
                    <thead>
                    <tr>                        
                       <%-- <th data-options="field:'numplaza',width:70,align:'center',halign:'center'">Plaza</th>                              
                        <th data-options="field:'numplamag',width:70,align:'center',halign:'center'">Plaza Ant</th>                              
                        <th data-options="field:'cveesppl',width:100,align:'center',halign:'center'">Estatus Plaza</th>                                              
                        <th data-options="field:'cvepuepl',width:70,align:'center',halign:'center',hidden:false">Puesto</th>                              
                        <th data-options="field:'cvenivpl',width:80,align:'center',halign:'center',hidden:false">Nivel</th>
                        <th data-options="field:'vigini',width:80,align:'center',halign:'center',hidden:false">Vig. Inicial</th>
                        <th data-options="field:'vigfin',width:80,align:'center',halign:'center',hidden:false">Vig. Final</th>                              
                        <th data-options="field:'hrspla',width:70,align:'center',halign:'center',hidden:false">Hrs.</th>                              
                        <th data-options="field:'cvepagpl',width:80,align:'center',halign:'center',hidden:false">Pagaduría</th>                              
                        <th data-options="field:'cvezonpl',width:60,align:'center',halign:'center',hidden:false">Zona</th>                              
                        <th data-options="field:'cvebanor',width:70,align:'center',halign:'center',hidden:false">Banco</th>                              
                        <th data-options="field:'pagplaor',width:70,align:'center',halign:'center',hidden:false">Tipo Pago</th>         --%>                     
                    </tr>
                    </thead>         
                    </table> 
                    </div>
                    <div title="Pensionadas" style="overflow:auto;padding:10px;" align="center">
                        <table class="easyui-datagrid" id="dgpn" style="width:100%;height:150px" >
                    <thead>
                    <tr>                        
                        <th data-options="field:'nompen',width:250,align:'left',halign:'center'">Nombre</th>
                        <th data-options="field:'rfcpen',width:150,align:'center',halign:'center'">Rfc</th>
                        <th data-options="field:'curppen',width:150,align:'center',halign:'center',hidden:false">Curp</th>
                        <th data-options="field:'cvepag',width:100,align:'center',halign:'center',hidden:false">Clave Pag.</th>
                        <th data-options="field:'despag',width:300,align:'left',halign:'center',hidden:false">Pagaduría</th>
                        <th data-options="field:'Cuota',width:100,align:'center',halign:'center',hidden:false">Tipo Cuota</th>
                        <th data-options="field:'penimpor',width:100,align:'center',halign:'center',hidden:false">Imp. Cuota</th>
                        <th data-options="field:'quinbaja',width:100,align:'center',halign:'center',hidden:false">Quin. Baja</th>
                        <th data-options="field:'estatus',width:100,align:'center',halign:'center',hidden:false">Estatus</th>
                    </tr>
                    </thead>         
                </table> 
                    </div>
                </div>     
              </div> 
          </div>
      </div>
    </div>       
        <div class="easyui-dialog" style="background-image: url('../../../Imagenes/FONDO1.jpg'); overflow-x: hidden;overflow-y: hidden;" id="winemp" align="Center" closed="true" title="Consulta de Empleados">            
            <table>
                <tr>
                   <td align="Left" class="auto-style2"><asp:Label ID="Label3" CssClass="LetraChicaNegrita"  runat="server" Text="Mantener Campo Busqueda:"></asp:Label></td>
                   <td align="Left"><input type="checkbox" id="chkmantener"></td>
                </tr>
            </table>
                <div style="width:100%;" align="center">
                    <table>                    
                     <tr>
                       <td align="Center">
                          <asp:Label ID="Label36" CssClass="LetraChicaNegrita" runat="server">Buscar:</asp:Label>
                       </td>
                       <td align="Center"> 
                          <input  class="easyui-combobox"  style="width:200px;" id="cbocam"></input>
                      </td>
                      <td align="Center"> 
                           <select class="easyui-combobox"  style="width:150px;" id="cbocon" data-options="editable:false">                                                                                                       
                                 <option value="=">Exacta</option>
                                 <option value="like">Aproximada</option>
                          </select>
                      </td>
                      <td align="Center">
                          <input class="easyui-textbox" style="width:200px" id="txtval">
                      </td>
                      <td align="Center">
                         <a id="btnfiltrar" href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-search'">Buscar</a>
                     </td>
                 </tr>                  
               </table>
                </div>
                <table id="dg" class="easyui-datagrid" style="width:100%;height:505px"> 
                <thead>
                    <tr>                                                
                        <th data-options="field:'numemp',width:80,align:'center',halign:'center',sortable:true">Empleado</th> 
                        <th data-options="field:'rfccom',width:120,align:'center',halign:'center',sortable:true">R.f.c.</th>                         
                        <th data-options="field:'nomcom',width:500,align:'left',halign:'left',sortable:true">Nombre</th>                        
                    </tr>
                </thead>                   
                </table>                      
        </div>   
         <div class="modal" style="display: none;" id="loading" align="center">
           <div class="center" align="center" >
              <img alt="" src="../../../Imagenes/ajax-loader.gif" />
           </div> 
       </div> 
    </div>
        <asp:HiddenField ID="HiddenField1" runat="server" />
    </form>
</body>
</html>
