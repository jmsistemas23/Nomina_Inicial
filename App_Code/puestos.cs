using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de puestos
/// </summary>
public class puestos
{
    public string Clave { get; set; }
    public string Descripcion { get; set; }
    public string Codigo_Nivel { get; set; }
    public string Tipo_Puesto { get; set; }
    public string Grupo_Jerarquico { get; set; }
    public string Des_Jerarquico { get; set; } 
    public string Tipo_Jornada { get; set; }
    public string Grupo_Laboral { get; set; }                    
    public string Des_Laboral { get; set; }
    public string asignahoras { get; set; }


	public puestos()
	{
		//
		// TODO: Agregar aquí la lógica del constructor
		//        
	}
}