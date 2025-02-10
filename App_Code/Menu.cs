using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Menu
/// </summary>
public class Menu
{
	public Menu()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Url { get; set; }
    public string UrlImagen { get; set; }
    public string NombreTab { get; set; }
    public string NombreRep { get; set; }
    public int? Propietario { get; set; }
    public int Orden { get; set; }
    public Boolean Visible { get; set; }
    public List<Menu> List { get; set; }
  }