<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarCatalogo.aspx.cs" Inherits="FILE_PaginasPruebas_Listar_Catalogo" %>

<%
    string modulo = Request.QueryString["modulo"].ToString();
    string tipo = Request.QueryString["tipo"].ToString();
    //string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    //string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();
    string multi = Request.QueryString["multi"].ToString();
    //int paginasN = Convert.ToInt32(pagina);
    //int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_CifrasControl @mod='" + modulo + "', @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "',@multi='" + multi + "'");
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_CifrasControl @mod='" + modulo + "',@tipo='"+tipo+"',@condicion='" + busqueda + "',@multi='" + multi + "'");
    string totRegs = "0";//ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

