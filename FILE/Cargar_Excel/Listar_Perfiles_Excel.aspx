<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Perfiles_Excel.aspx.cs" Inherits="FILE_Cargar_Excel_Listar_Perfiles_Excel" %>

<%   
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);

    Utilerias lib = new Utilerias();
    ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
    int usuid = objusuario.Id;
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargarExcel_ListarPerfiles_Permisos @fkusuario=" + usuid + ",@desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "'");
    // System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargarExcel_ListarPerfiles_Permisos @fkusuario=" + 10049 + ",@desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "'");
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>
