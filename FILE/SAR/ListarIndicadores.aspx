<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarIndicadores.aspx.cs" Inherits="FILE_SAR_ListarIndicadores" %>

<%    
    string tipoind = Request.QueryString["tipoind"].ToString();
    string busqueda = Request.QueryString["busqueda"].ToString();    
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "500" : Request.Form["rows"].ToString();   
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    Utilerias lib = new Utilerias();
    System.Data.DataSet ds = new System.Data.DataSet();

    if (tipoind == "D")
    { ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeIndicadoresDed @tipInd=" + tipoind + ", @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'"); }
    else { ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeIndicadoresPer @tipInd=" + tipoind + ", @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'"); }
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>
