<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Perfiles_Produccion.aspx.cs" Inherits="FILE_Produccion_Listar_Perfiles_Produccion" %>

<%       
    string busqueda =  Request.QueryString["tipo"].ToString();
    string quincena = Request.QueryString["quin"].ToString();     
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarPerfiles @tipo='" + busqueda + "',@quincena='" + quincena + "'");
        
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + "}";

    Response.Write(resultado);
        %>