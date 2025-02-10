<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Detalle.aspx.cs" Inherits="FILE_ProcesoEspecial_Perfiles_Listar_Detalle" %>

<%   
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "40" : Request.Form["rows"].ToString();
    string idperfil = Request.QueryString["idperfil"].ToString();
    string campos = Request.QueryString["campos"].ToString(); 
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarDetalle @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @idperfil=" + idperfil + ",@campos='" + campos + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>