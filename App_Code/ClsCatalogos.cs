using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsCatalogos
/// </summary>
public class ClsCatalogos
{
	public ClsCatalogos()
	{
		//
		// TODO: Add constructor logic here
		//
	}    
    public string valor { get; set; }
    public string descripcion { get; set; }
    public string qry { get; set; }
    public string cve { get; set; }
    public string des { get; set; }
    public string ddlobj { get; set; }
    public string relacion { get; set; }   
    public bool selected { get; set; }
}