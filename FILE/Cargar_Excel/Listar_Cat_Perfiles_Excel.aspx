﻿<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Cat_Perfiles_Excel.aspx.cs" Inherits="FILE_Cargar_Excel_Listar_Cat_Perfiles_Excel" %>

<%   
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "10" : Request.Form["rows"].ToString();
    string busqueda =  Request.QueryString["busqueda"].ToString();    
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();    
   
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargarExcel_ListarCatPerfiles  @desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>

