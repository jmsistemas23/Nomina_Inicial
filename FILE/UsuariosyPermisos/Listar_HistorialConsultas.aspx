<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_HistorialConsultas.aspx.cs" Inherits="FILE_UsuariosyPermisos_Listar_HistorialConsultas" %>

<%
    string fkroll = "";
    string tipo = "";
    fkroll = Request.QueryString["fkroll"].ToString();
    tipo = Request.QueryString["tipo"].ToString();    
   
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarConsultas @permiso=" + fkroll + ",@tipo='" + tipo + "'");
    string totRegs = ds.Tables[0].Rows.Count.ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
    ds.Dispose();  
    Response.Write(resultado);
        %>

