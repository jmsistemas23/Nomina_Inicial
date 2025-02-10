<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarEstatusPlaza.aspx.cs" Inherits="FILE_Fonac_ListarEstatusPlaza" %>

<%       
    string busqueda = Request.QueryString["busqueda"].ToString();      
    Utilerias lib = new Utilerias();
    System.Data.DataSet ds = new System.Data.DataSet();

    ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_EstatusDePlazas @busqueda='" + busqueda + "'"); 
    
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

