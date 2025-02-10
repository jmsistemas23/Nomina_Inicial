<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Documentos.aspx.cs" Inherits="FILE_AgregarObservaciones_Listar_Documentos" %>

<%   
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();
    string modulo = Request.QueryString["modulo"].ToString();
    string quincena = Request.QueryString["quincena"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);

    Utilerias lib = new Utilerias();
    ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
    string usus = "VIRI.GUTIERREZ";// objusuario.Usuario;

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Observaciones_ListarEmpleados @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "',  @modulo='" + modulo + "', @condicion='" + busqueda + "',@quincena='"+quincena+"',@usuario='"+usus+"'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>
