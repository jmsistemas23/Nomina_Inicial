<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarForSubNivel.aspx.cs" Inherits="FILE_CreacionDePlazas_listarForSubNivel" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();        
    string nivel = Request.QueryString["nivel"].ToString();
    //string zona = Request.QueryString["zona"].ToString();
    string columnas = Request.QueryString["columnas"].ToString();
    string busqueda = Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();
    System.Data.DataSet ds = new System.Data.DataSet();
   

    listaAdscripciones objAdscripciones = new listaAdscripciones();

    List<adscripciones> lstAdscripciones = new List<adscripciones>();
    ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionNivelSalarial @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @columnas='" + columnas + "', @codNiv = '" + nivel + "',@busqueda='" + busqueda + "'");

    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string datos = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
       
    Response.Write(datos);
        %>