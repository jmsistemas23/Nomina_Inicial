<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarEstatusPlaza.aspx.cs" Inherits="FILE_Costeo_ListarEstatusPlaza" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    string filtro = Request.QueryString["filtro"].ToString();    
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();


    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_EstatusPlaza @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "',@filtro='"+filtro+"'");
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

   string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

   Response.Write(resultado);
        %>