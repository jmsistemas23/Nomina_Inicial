using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsPermisosMenus
/// </summary>
public class ClsPermisosMenus
{
	public ClsPermisosMenus()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }
    public string text { get; set; }
    public string nombre { get; set; }
    public string target { get; set; }
    public int clave { get; set; }
    public string state { get; set; }
    public string url { get; set; }
    public Boolean visible { get; set; }
    public int? IdPadre { get; set; }
    public List<ClsPermisosMenus> children { get; set; }
}