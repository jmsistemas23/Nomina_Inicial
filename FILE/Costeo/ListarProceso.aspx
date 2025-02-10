<%@ Page Language="C#" AutoEventWireup="true" CodeFile="ListarProceso.aspx.cs" Inherits="FILE_Costeo_ListarProceso" %>


<%
       
    string Tipo = Request.QueryString["Tipo"].ToString();
    string filtro = Request.QueryString["filtro"].ToString();//.Replace("/","+");
    string conceptos = Request.QueryString["conceptos"].ToString().Replace(",","+,");
    string plancan = Request.QueryString["canceladas"].ToString(); 
    Utilerias lib = new Utilerias();

    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos @Tipo='" + Tipo + "', @Parametros='" + filtro + "',@CP_Costo='" + conceptos + "',@canceladas=" + plancan);
    if (ds.Tables.Count > 0)
    {
        string totRegs = ds.Tables[0].Rows.Count.ToString();
        string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
        Response.Write(resultado);
    }  
        %>
