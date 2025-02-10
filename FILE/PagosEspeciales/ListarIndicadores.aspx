<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarIndicadores.aspx.cs" Inherits="FILE_PagosEspeciales_ListarIndicadores" %>


<%    
    string tipoind = Request.QueryString["tipoind"].ToString();
    string numdoc = Request.QueryString["numdoc"].ToString();
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();   
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_ListarIndicadores @tipoind=" + tipoind + ", @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @numdoc='" + numdoc + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

