<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Relaciones.aspx.cs" Inherits="FILE_DiseñadorDeCatalogos_Listar_Relaciones" %>

<%
    string busqueda = Request.QueryString["tabla"].ToString();            
   
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarRelaciones @tabla='" + busqueda + "'");
    if (ds.Tables[0].Rows.Count > 0)
    {
        string totRegs = ds.Tables[0].Rows[0][0].ToString();
        string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
        Response.Write(resultado);
    }
    //else
    //{
    //    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    //    string resultado = "{\"rows\":" + -1 + ",\"total\":\"" + totRegs + "\"}";
    //    Response.Write(resultado);
    //}
        %>
