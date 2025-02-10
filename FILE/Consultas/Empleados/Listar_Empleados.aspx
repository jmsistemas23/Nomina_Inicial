<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Empleados.aspx.cs" Inherits="FILE_Consultas_Empleados_Listar_Empleados" %>

<%           
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string busqueda = Request.QueryString["busqueda"].ToString();
    string colord = Request.QueryString["colord"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    Utilerias lib = new Utilerias();

    ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
    int uid = 1;// objusuario.Id;
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_BuscarEmpleados_filtro @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @valor='" + busqueda + "',@orden='" + colord + "',@fkusuario="+uid);
    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_BuscarEmpleados_filtro @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @valor='" + busqueda + "',@orden='" + colord + "',@fkusuario=1");

    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>