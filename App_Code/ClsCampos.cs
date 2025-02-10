using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsCampos
/// </summary>
public class ClsCampos
{
	public ClsCampos()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }
    public string text { get; set; }
    public string attributes { get; set; }
    public string name { get; set; }
    public int? IdPadre { get; set; }
    public List<ClsCampos> children { get; set; }
}