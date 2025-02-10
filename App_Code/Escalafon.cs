using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Escalafon
/// </summary>
public class Escalafon
{
	public Escalafon()
	{
	}
}


public class EscalafonVacante
{
    public int numeroEmpleado { get; set; }
    public string nombre { get; set; }
    public string rfc { get; set; }
    public string puesto { get; set; }
    public string plaza { get; set; }
    public string descripcionDelPuesto { get; set; }
    public string adscripcion { get; set; }
    public string descripcionDeAdscripcion { get; set; }
    public string pagaduria { get; set; }
    public string descripcionDePagaduria { get; set; }
    public string dias { get; set; }
    public string meses { get; set; }
    public string años { get; set; }
}

public class EscalafonActivo
{
    public int fkNumEmpleadoVacante { get; set; }
    public int fkNumEmpleadosActivo { get; set; }
    public string Nombre { get; set; }
    public string Rfc { get; set; }
    public string Plaza { get; set; }
    public string Puesto { get; set; }
    public string Descripcion_De_Puesto { get; set; }
    public string Adscripcion { get; set; }
    public string Descripcion_De_Adscripcion { get; set; }
    public string Pagaduria { get; set; }
    public string Descripcion_De_Pagaduria { get; set; }
    public string Vigencia_inicial { get; set; }
    public string Estatus { get; set; }
    public string Fecha_Ingreso { get; set; }
    public string Situacion { get; set; }
    public string Años { get; set; }
    public string Meses { get; set; }
    public string Dias { get; set; }
    public string Descripcion { get; set; }
    public int Preferencia { get; set; }
    public string PuestoNue { get; set; }
    public string Procesos { get; set; }
    public string Titulacion { get; set; }
    public bool Proceso { get; set; }
}

public class EscalafonV
{
    public string NumEmpleado { get; set; }
    public string Puesto { get; set; }
}