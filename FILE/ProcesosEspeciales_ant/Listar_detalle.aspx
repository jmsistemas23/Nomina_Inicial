<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_detalle.aspx.cs" Inherits="FILE_ProcesosEspeciales_Listar_detalle" %>

<%   
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string idperfil =  Request.QueryString["idperfil"].ToString();
    string campos = Request.QueryString["campos"].ToString();
    string condicion = Request.QueryString["condicion"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarDetalle @idperfil=" + idperfil + ",@desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @campos='" + campos + "',@condicion='"+condicion+"'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
             
    Response.Write(resultado);
        %>
