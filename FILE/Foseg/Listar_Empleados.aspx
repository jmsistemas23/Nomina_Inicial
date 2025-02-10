<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Empleados.aspx.cs" Inherits="FILE_Foseg_Listar_Empleados" %>

<%           
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();
    string filtro = Request.QueryString["filtro"].ToString();   
     string quincena = Request.QueryString["quincena"].ToString();   
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    Utilerias lib = new Utilerias();
   
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Layout_Foseg_ListarEmpleados @quin='" + quincena + "',@filtro="+filtro);    

    string totRegs = ds.Tables[1].Rows[0][0].ToString();

    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";

    Response.Write(resultado);
        %>
