<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Tablas_Sistema.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Listar_Tablas_Sistema" %>

<%        
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda = Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_TablasSistema @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @valor='" + busqueda + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>