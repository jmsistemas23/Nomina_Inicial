<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarCostos.aspx.cs" Inherits="FILE_Costeo_ListarCostos" %>


<%
       
    string Tipo = Request.QueryString["Tipo"].ToString();
    string filtro = Request.QueryString["filtro"].ToString();    
    Utilerias lib = new Utilerias();


    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos @Tipo='" + Tipo + "', @Parametros='" + filtro + "'");
   
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0])+"\"}";

    Response.Write(resultado);
        %>