<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Usuarios.aspx.cs" Inherits="FILE_UsuariosyPermisos_Listar_Usuarios" %>

<%
    string fkroll = "";
    string tipo = "";
    fkroll = Request.QueryString["fkroll"].ToString();
    tipo = Request.QueryString["tipo"].ToString();    
    string pagina =(Request.Form["page"] == null)?"1": Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "20" : Request.Form["rows"].ToString();    
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();

    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarDatosUsuariosPorRoles @fkroll=" + fkroll + ",@tipo='" + tipo + "', @desde=" + ((paginasN * rowsN) - rowsN + 1).ToString() + ", @hasta=" + (paginasN * rowsN).ToString() );
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarDatosUsuariosPorRoles @fkroll=" + fkroll + ",@tipo='" + tipo + "'");
    string totRegs = ds.Tables[1].Rows[0][0].ToString();   
    
    string resultado = "{\"rows\":" + new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]) + ",\"total\":\"" + totRegs + "\"}";
    ds.Dispose();  
    Response.Write(resultado);
        %>
