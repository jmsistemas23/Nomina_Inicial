<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarCodigoNivel.aspx.cs" Inherits="FILE_CreacionDePlazas_Org_ListarCodigoNivel" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();       
    listaAdscripciones objAdscripciones = new listaAdscripciones();
    List<adscripciones> lstAdscripciones = new List<adscripciones>();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeCodNiv @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    {
        adscripciones adscrip = new adscripciones();
        adscrip.Clave = ds.Tables[0].Rows[i][1].ToString().Trim();
        adscrip.Descripcion = ds.Tables[0].Rows[i][2].ToString().Trim();
        adscrip.Zona = ds.Tables[0].Rows[i][3].ToString().Trim();
        lstAdscripciones.Add(adscrip);
    }
    objAdscripciones.rows = lstAdscripciones;
    objAdscripciones.total = ds.Tables[0].Rows.Count.ToString();
    
    System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    string datos = js.Serialize(objAdscripciones);
    Response.Write(datos);
        %>