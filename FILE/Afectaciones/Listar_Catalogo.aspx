<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Catalogo.aspx.cs" Inherits="FILE_PaginasPruebas_Listar_Catalogo" %>

<%    
    string tabla = Request.QueryString["tabla"].ToString();        
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "50000" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();
    string multi = Request.QueryString["multi"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_DatosGrid @tabla='" + tabla + "', @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "',@multi='"+multi+"'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

