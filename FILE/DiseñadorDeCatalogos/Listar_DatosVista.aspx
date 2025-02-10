<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_DatosVista.aspx.cs" Inherits="FILE_PaginasPruebas_Listar_DatosVista" %>

<%
    string tabla = Request.QueryString["tabla"].ToString();
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();
    string hist = Request.QueryString["hist"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_DatosVista @tabla='" + tabla + "', @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "',@historia='" + hist+"'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

