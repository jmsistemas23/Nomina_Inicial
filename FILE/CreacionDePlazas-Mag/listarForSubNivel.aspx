<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarForSubNivel.aspx.cs" Inherits="FILE_CreacionDePlazas_listarForSubNivel" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();        
    string nivel = Request.QueryString["nivel"].ToString();
    string zona = Request.QueryString["zona"].ToString();
    string columnas = Request.QueryString["columnas"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataTable ds = lib.ejecutarConsultaEnDataTable("select count(*) from nivsal where codniv='" +nivel+"'"  );
    string totRegs = ds.Rows[0][0].ToString();

    listaAdscripciones objAdscripciones = new listaAdscripciones();

    List<adscripciones> lstAdscripciones = new List<adscripciones>();
    ds = lib.ejecutarConsultaEnDataTable("GESRH_SP_SelectParaPaginacionDeForNivel @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @columnas='" + columnas + "', @codNiv = '" + nivel + "',@codzon='" + zona + "'");

    string datos = new Utilerias().convertirDatatableEnJsonString(ds);
    Response.Write(datos);
        %>