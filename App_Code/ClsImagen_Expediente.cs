using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsImagen_Expediente
/// </summary>
public class ClsImagen_Expediente
{
	public ClsImagen_Expediente()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public int Id { get; set; }
    public int Orden { get; set; }
    public int Empleado { get; set; }
    public string Expediente { get; set; }    
    public byte[] Imagen { get; set; }
    public List<ClsImagen_Expediente> Iagenes { get; set; }
}