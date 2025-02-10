<%@ Page Language="C#" AutoEventWireup="true" CodeFile="EmpleadosEscalafon.aspx.cs" Inherits="FILE_EmpleadosEscalafon_EmpleadosEscalafon"%>

<%@ Register Assembly="Microsoft.ReportViewer.WebForms, Version=11.0.0.0, Culture=neutral, PublicKeyToken=89845dcd8080cc91" 
    Namespace="Microsoft.Reporting.WebForms" TagPrefix="rsweb" %>

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
    <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1 minimum-scale=1"/>	

    <link rel="stylesheet" href="../../Styles/pagina.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="../../Styles/loader.css"  type="text/css" media="screen"/>   
 
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/pepper-grinder/easyui.css">
    <link rel="stylesheet" type="text/css" href="../../jqueryesy/themes/icon.css">      

    <script type="text/javascript" src="../../scripts/jquery-1.11.1.min.js"></script>
    <script type="text/javascript" src="../../scripts/demos.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.min.js"></script>
    <script type="text/javascript" src="../../jqueryesy/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-cellediting.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-scrollview.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-filter.js"></script>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-dnd.js"></script>  <%--Permite mover la filas de posicion--%>
    <script type="text/javascript" src="../../jqueryEsy/plugins/datagrid-groupview.js"></script>
    <script type="text/javascript" src="datagrid-dnd.js"></script>
    <script type="text/javascript" src="../../scripts/Funsiones.js"></script> 
    <script src="../../Scripts/jquery-Mask.js"></script>      
    <script src="EmpleadosEscalafon.js?0.3"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="ddiseño" class="easyui-layout" style="border-style: none; width: 100%; height: 100%;  overflow:hidden;" align="Center" >   
        <div id="escalafonVacancias" style="border-style:none; width:100%; height:100%" align="Center">
            <br />
                <asp:Label ID="Label2" CssClass="TituloMedio" runat="server" Text="Escalafon Vacante"></asp:Label>
            <br />
            <br />
            <table>
                <tr>
                    <td align="left"> 
                        <asp:Label ID="Label1" CssClass="LetraChica" runat="server" Text="Datos Del Empleado: "></asp:Label>
                    </td>
                    <td align="left"> <input type="text" class="easyui-textbox" id="IpBuscar"/> <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search', plain:true" style="border:1px; text-align:center;" id="btnBuscar" >Buscar</a> </td>
                </tr>
            </table>
            <br />
            <table class="easyui-datagrid" id="dgveEscalafonVacancias" style="width:80%;height:60%">
                <thead>
                <tr>
                    <th data-options="field:'Empleado', width:80,align:'left', halign:'center'">N° Empleado</th>
                    <th data-options="field:'Nombre', width:300, align:'left', halign:'center'">Nombre</th>
                    <th data-options="field:'rfc', width:150,align:'left', halign:'center'">RFC</th>
                    <th data-options="field:'Plaza', width:50, align:'left', halign:'center'">Plaza</th>
                    <th data-options="field:'Puesto', width:70, align:'left', halign:'center'">Puesto</th>
                    <th data-options="field:'Descripcion_De_Puesto', width:200, align:'left', halign:'center'">Descripcion De Puesto</th>
                    <th data-options="field:'Adscripcion', width:150, align:'left', halign:'center'">Adscripcion</th>
                    <th data-options="field:'Descripcion_de_Adscripcion', width:550, align:'left', halign:'center'">Descripcion de Adscripcion</th>
                    <th data-options="field:'Pagaduria', width:70, align:'left', halign:'center'">Pagaduria</th>
                    <th data-options="field:'Descripcion_De_Pagaduria', width:550, align:'left', halign:'center'">Descripcion De Pagaduria</th>
                    <th data-options="field:'Dia', width:50, align:'left', halign:'center'">Dia</th>
                    <th data-options="field:'Mes', width:50, align:'left', halign:'center'">Mes</th>
                    <th data-options="field:'Año', width:50, align:'left', halign:'center'">Año</th>
                    <th data-options="field:'Estatus', width:50, align:'left', halign:'center'">Estatus</th>                                   
                </tr>
                </thead>
            </table>
        </div>

        <div id="escalafonActivos" style="display:none; border-style:none; width:100%; height:100%" align="Center">
            <div class="easyui-panel" style="width:100%; padding:3px;">
            <a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:'anterior'" id="btnRegresar">Regresar</a>
            <a href="#" class="easyui-linkbutton" style="display:none;" data-options="plain:true, iconCls:'icon_pdf'" id="btnPDF" >PDF</a>
            <a href="#" class="easyui-linkbutton" style="display:none;" data-options="plain:true, iconCls:'icon-ok'" id="btnProceso" >Procesado</a>
            </div>
            <br />
            <asp:Label ID="Label3" CssClass="TituloMedio" runat="server" Text="Escalafon Activo"></asp:Label>
            <br />
            <br />
            <table class="easyui-datagrid" id="dgvEscalafonActivos" style="width:80%;height:60%" 
                data-options="
                iconCls: 'icon-edit',
                singleSelect: true,
                collapsible:true,
                rownumbers:true,
                view:groupview,
                groupField:'Puesto',
                url: 'datagrid_data1.json',
                method: 'get',
                onClickCell: onClickCell,
                onEndEdit: onEndEdit,
                singleSelect:true,
                onLoadSuccess: onLoadSuccess,
                groupFormatter: groupFormatter
            ">
            <thead>
            <tr>
                <th data-options="field:'Empleado', width:80,align:'left', halign:'center'">N° Empleado</th>
                <th data-options="field:'Nombre', width:300, align:'left', halign:'center'">Nombre</th>
                <th data-options="field:'Rfc', width:120,align:'left', halign:'center'">RFC</th>
                <th data-options="field:'Plaza', width:50, align:'left', halign:'center'">Plaza</th>
                <th data-options="field:'Puesto', width:70, align:'left', halign:'center'">Puesto</th>
                <th data-options="field:'Descripcion_De_Puesto', width:250, align:'left', halign:'center'">Descripcion de puesto</th>
                <th data-options="field:'Adscripcion', width:80, align:'left', halign:'center'">Adscripcion</th>
                <th data-options="field:'Descripcion_de_Adscripcion', width:510, align:'left', halign:'center'">Descripcion de adscripcion</th>
                <th data-options="field:'Pagaduria', width:70, align:'left', halign:'center'">Pagaduria</th>
                <th data-options="field:'Descripcion_De_Pagaduria', width:300, align:'left', halign:'center'">Descripcion de pagaduria</th>
                <th data-options="field:'Vigencia_Inicial', width:100, align:'left', halign:'center'">Vigencia Inicial</th>
                <th data-options="field:'Estatus', width:50, align:'left', halign:'center'">Estatus</th>
                <th data-options="field:'FechaIngreso', width:100, align:'left', halign:'center'">Fecha Ingreso</th>
                <th data-options="field:'Situacion', width:100, align:'left', halign:'center'">Situacion</th>
                <th data-options="field:'Años', width:50, align:'left', halign:'center'">Años</th>
                <th data-options="field:'Meses', width:50, align:'left', halign:'center'">Meses</th>
                <th data-options="field:'Dias', width:50, align:'left', halign:'center'">Dias</th>
                <th data-options="field:'Titulacion', width:50, align:'left', halign:'center'">Titulacion</th>
                <th data-options="field:'Descripcion', width:250, align:'left', halign:'center', editor:'text'">Descripcion</th>
            </tr>
            </thead>
        </table>
       </div>
        <div id="wReporte" class="easyui-dialog" title="Reporte" data-options="iconCls:'icon-save', modal:true" style="width:50%; height:80%; padding:3px; overflow:hidden;">
        <div class="row" id="divReport" style="width:100%;height:100%;">
            </div> 
        </div>
     </div>
        <div class="modal" style="display: none; " id="loading" align="center">
        <div class="center" align="center" >
            <img alt="" src="../../Imagenes/ajax-loader.gif" />
        </div> 
    </div> 
    </form>
</body>
</html>
