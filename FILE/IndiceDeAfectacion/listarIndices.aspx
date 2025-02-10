<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarIndices.aspx.cs" Inherits="FILE_DisenoDeIndices_listarIndices" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda = Request.QueryString["busqueda"].ToString();
    string sp = "GESRH_SP_SelectParaPaginacionDeIndices";
    string qry = "select count(*) from indices where des like '%" + busqueda +"%' or cve like '%"+busqueda+"%'";
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet(qry);
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    listaAdscripciones objAdscripciones = new listaAdscripciones();

    List<adscripciones> lstAdscripciones = new List<adscripciones>();
    ds = lib.ejecutarConsultaEnDataSet(sp + " @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    {
        adscripciones adscrip = new adscripciones();
        adscrip.Clave = ds.Tables[0].Rows[i]["Clave"].ToString().Trim();
        adscrip.Descripcion = ds.Tables[0].Rows[i]["Descripcion"].ToString().Trim();
        adscrip.Zona = ds.Tables[0].Rows[i]["Orden"].ToString().Trim();
        lstAdscripciones.Add(adscrip);
    }
    objAdscripciones.rows = lstAdscripciones;
    objAdscripciones.total = totRegs;
    
    System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    string datos = js.Serialize(objAdscripciones);
    Response.Write(datos);
        %>