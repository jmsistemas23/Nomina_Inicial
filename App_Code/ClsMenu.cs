using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsMenu
/// </summary>
public class ClsMenu
{
	public ClsMenu()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }
    public string text { get; set; }
    public string url { get; set; }
    public string state { get; set; }
    public string attributes { get; set; }
    public int? IdPadre { get; set; }
    public List<ClsMenu> children { get; set; }
}