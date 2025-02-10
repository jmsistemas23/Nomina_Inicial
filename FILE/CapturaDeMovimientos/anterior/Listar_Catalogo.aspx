<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Listar_Catalogo.aspx.cs" Inherits="FILE_PaginasPruebas_Listar_Catalogo" %>

<% 
   
    string tipo = Request.QueryString["tipo"].ToString();
    string camfiltro = Request.QueryString["camfiltro"].ToString();
    //string paginas = Request.QueryString["pagina"].ToString();
    //string filas = Request.QueryString["filas"].ToString();
    string campo = Request.QueryString["campo"].ToString();    
    string mov = Request.QueryString["mov"].ToString();  
    string pagina = (Request.Form["page"] == null) ? "1" : Request.Form["page"].ToString();
    string rows = (Request.Form["rows"] == null) ? "1000" : Request.Form["rows"].ToString();
    
    
    string busqueda =  Request.QueryString["busqueda"].ToString();
    int paginasN = Convert.ToInt32(pagina);
    int rowsN = Convert.ToInt32(rows);
    
    Utilerias lib = new Utilerias();
    
    //System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_Listar_Catalogo @tipo='" + tipo +"',@mov='" + mov +"',@campo='" + campo + "',@desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "',@pagina=" + pagina+",@camfiltro='"+camfiltro+"'");
    System.Data.DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_Listar_Catalogo_Filtros @tipo='" + tipo +"',@mov='" + mov +"',@campo='" + campo + "',@desde='" + ((paginasN * rowsN) - rowsN + 1).ToString() + "', @hasta='" + (paginasN * rowsN).ToString() + "', @condicion='" + busqueda + "',@pagina=" + pagina+",@camfiltro='"+camfiltro+"'");
    if (ds.Tables.Count > 0)
    {
        string totRegs = ds.Tables[1].Rows[0][0].ToString();
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

