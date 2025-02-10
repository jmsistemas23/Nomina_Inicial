<%@ Page Language="C#" AutoEventWireup="true" CodeFile="listarPuestos.aspx.cs" Inherits="creacionDePlazas_listarPuestos" %>
<%
    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("select count(*) from puesto where despue like '%"+busqueda+"%' or cvepue like '%"+busqueda+"%'");
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    listaPuestos objPuestos = new listaPuestos();
    
    List<puestos> lstPuestos = new List<puestos>();
    ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDePuestos @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @busqueda='" + busqueda + "'");
    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    {
        puestos puesto = new puestos();
        puesto.Clave = ds.Tables[0].Rows[i]["Clave"].ToString().Trim();
        puesto.Descripcion = ds.Tables[0].Rows[i]["Descripcion"].ToString().Trim();
        puesto.Codigo_Nivel = ds.Tables[0].Rows[i]["Codigo_Nivel"].ToString().Trim();
        puesto.Tipo_Puesto = ds.Tables[0].Rows[i]["Tipo_Puesto"].ToString().Trim();
        puesto.Grupo_Jerarquico = ds.Tables[0].Rows[i]["Grupo_Jerarquico"].ToString().Trim();
        puesto.Des_Jerarquico = ds.Tables[0].Rows[i]["Des_Jerarquico"].ToString().Trim();
        puesto.Tipo_Jornada = ds.Tables[0].Rows[i]["Tipo_Jornada"].ToString().Trim();
        puesto.Grupo_Laboral = ds.Tables[0].Rows[i]["Grupo_Laboral"].ToString().Trim();
        puesto.Des_Laboral = ds.Tables[0].Rows[i]["Des_Laboral"].ToString().Trim();
        puesto.asignahoras = ds.Tables[0].Rows[i]["asignahoras"].ToString();
        lstPuestos.Add(puesto);
    }
    objPuestos.rows = lstPuestos;
    objPuestos.total = totRegs;
    
    System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
    string datos = js.Serialize(objPuestos);
    Response.Write(datos);
        %>