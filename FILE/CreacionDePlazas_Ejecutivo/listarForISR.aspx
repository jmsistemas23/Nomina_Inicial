<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarForISR.aspx.cs" Inherits="creacionDePlazas_listarForISR" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    string tipoplaza = Request.QueryString["tipo"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();


    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_CreacionPlaza_Listar_ForISR @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "',@tipo='"+tipoplaza+"'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>