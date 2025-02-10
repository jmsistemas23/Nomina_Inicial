<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarPagadurias.aspx.cs" Inherits="creacionDePlazas_listarPagadurias" %>

<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("select count(*) from zonpag where cvepag like '%" + busqueda + "%' or despag like '%" + busqueda + "%' ");
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    listaPagaduria objPagaduria = new listaPagaduria();

    List<ClsPagaduria> lstPagaduria = new List<ClsPagaduria>();
    ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDePagadurias_mag @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    {
        ClsPagaduria zonpag = new ClsPagaduria();
        zonpag.Clave = ds.Tables[0].Rows[i]["Clave"].ToString().Trim();
        zonpag.Descripcion = ds.Tables[0].Rows[i]["Descripcion"].ToString().Trim();
        zonpag.Zona = ds.Tables[0].Rows[i]["Zona"].ToString().Trim();
        zonpag.Localidad = ds.Tables[0].Rows[i]["municipio"].ToString().Trim()+" / "+ds.Tables[0].Rows[i]["localidad"].ToString().Trim();
        zonpag.Centcosto = ds.Tables[0].Rows[i]["centcosto"].ToString().Trim();
        zonpag.Descentro = ds.Tables[0].Rows[i]["descentro"].ToString().Trim();
        lstPagaduria.Add(zonpag);
    }
    objPagaduria.rows = lstPagaduria;
    objPagaduria.total = totRegs;
    
    System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    string datos = js.Serialize(objPagaduria);
    Response.Write(datos);
        %>