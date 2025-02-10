<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarPlazas.aspx.cs" Inherits="creacionDePlazas_listarPlazas" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    //string valor = "";
    Utilerias lib = new Utilerias();

    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("select count(*) from plazas where nomcompl like '%" + busqueda + "%' or numplaza like '%" + busqueda + "%' or numemppl like '%"+busqueda+"%' ");
    //if (busqueda != "") { valor = "select count(*) from plazas where " + busqueda; } else { valor = "select count(*) from plazas"; }
    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet(valor);
    //string totRegs = ds.Tables[0].Rows[0][0].ToString();

    //listaAdscripciones objAdscripciones = new listaAdscripciones();

    //List<adscripciones> lstAdscripciones = new List<adscripciones>();
    //ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDePlazas_Sustitutas @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    //for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    //{
    //    adscripciones adscrip = new adscripciones();
    //    adscrip.Clave = ds.Tables[0].Rows[i]["Plaza"].ToString().Trim();        
    //    adscrip.Zona = ds.Tables[0].Rows[i]["Empleado"].ToString().Trim();
    //    adscrip.Descripcion = ds.Tables[0].Rows[i]["Horas"].ToString().Trim();
    //    lstAdscripciones.Add(adscrip);
    //}
    //objAdscripciones.rows = lstAdscripciones;
    //objAdscripciones.total = totRegs;
    
    //System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    //string datos = js.Serialize(objAdscripciones);
    //Response.Write(datos);
        %>

<%        
   
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDePlazas_Sustitutas @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>