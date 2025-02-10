<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Vista_Previa.aspx.cs" Inherits="FILE_ProcesoEspecial_Perfiles_Vista_Previa" %>

<%
    string idperfil = Request.QueryString["idperfil"].ToString();     
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();    
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_Consulta_VistaPrevia @idperfil=" + idperfil + ", @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "'");
    if (ds.Tables.Count > 0)
    {
        string totRegs = ds.Tables[1].Rows[0][0].ToString();
        string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
        Response.Write(resultado);
    }   
        %>
