<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_DetallePagos.aspx.cs" Inherits="FILE_Fonac_Listar_DetallePagos" %>

<%               
    string busqueda = Request.QueryString["busqueda"].ToString();    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Fonac_DetallePagos @empleado=" + busqueda);
    string totRegs = ds.Tables[0].Rows[0][0].ToString();

    string resultado = "{\"Total\":" + totRegs + ",\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[1]) + ",\"footer\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[2])+"}";

    Response.Write(resultado);
        %>
