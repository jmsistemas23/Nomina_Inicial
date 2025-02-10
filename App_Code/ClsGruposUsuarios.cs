using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsGruposUsuarios
/// </summary>
public class ClsGruposUsuarios
{
	public ClsGruposUsuarios()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }
    public string text { get; set; }
    public string target { get; set; }
    public int clave { get; set; }
    public string state { get; set; }
    public int? IdPadre { get; set; }  
    public List<ClsGruposUsuarios> children { get; set; }
}