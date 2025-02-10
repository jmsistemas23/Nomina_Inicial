using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Modulos
/// </summary>
public class clsModulos
{
    public clsModulos()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }    
    public string text { get; set; }
    public string clave { get; set; }
    public string state { get; set; }   
    public int? IdPadre { get; set; }
    public List<clsModulos> children { get; set; }


}