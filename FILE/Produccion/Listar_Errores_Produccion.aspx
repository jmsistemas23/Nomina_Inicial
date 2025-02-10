<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Errores_Produccion.aspx.cs" Inherits="FILE_Produccion_Listar_Errores_Produccion" %>

<%       
    string busqueda =  Request.QueryString["id"].ToString();   
    
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarErrores @id='" + busqueda + "'");
        
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + "}";

    Response.Write(resultado);
        %>

