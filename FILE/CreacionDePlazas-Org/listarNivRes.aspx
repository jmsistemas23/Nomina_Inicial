<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarNivRes.aspx.cs" Inherits="creacionDePlazas_listarNivRes" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("select count(*) from gpoman where cvegma like '%" + busqueda + "%' or desgma like '%" + busqueda + "%' ");
    string totRegs = "3";

    listaAdscripciones objAdscripciones = new listaAdscripciones();

    List<adscripciones> lstAdscripciones = new List<adscripciones>();
    
    adscripciones adscrip = new adscripciones();
    adscrip.Clave = "A";
    adscrip.Descripcion = "BAJO";
    adscrip.Zona = "";
    lstAdscripciones.Add(adscrip);

    adscrip = new adscripciones();
    adscrip.Clave = "B";
    adscrip.Descripcion = "MEDIO";
    adscrip.Zona = "";
    lstAdscripciones.Add(adscrip);

    adscrip = new adscripciones();
    adscrip.Clave = "C";
    adscrip.Descripcion = "ALTO";
    adscrip.Zona = "";
    lstAdscripciones.Add(adscrip);
    
    objAdscripciones.rows = lstAdscripciones;
    objAdscripciones.total = totRegs;
    
    System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    string datos = js.Serialize(objAdscripciones);
    Response.Write(datos);
        %>