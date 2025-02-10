using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsMovimientos
/// </summary>
public class ClsMovimientos
{
	public ClsMovimientos()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public int Id { get; set; }
    public string text { get; set; }
    public string state { get; set; }
    public int? IdPadre { get; set; }
    public List<ClsMovimientos> children { get; set; }

}