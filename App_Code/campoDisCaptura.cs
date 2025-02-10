using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

public class campoDisCaptura
{
    public campoDisCaptura() { }

    public string campo { get; set; }
    public string descripcion { get; set; }
    public bool activo { get; set; }
    public bool lectura { get; set; }
    public string orden { get; set; }
    public bool busqueda { get; set; }
    public string columnasBusqueda { get; set; }
    public string tablaBusqueda { get; set; }
    public string condicionBusqueda { get; set; }
    public string ordenBusqueda { get; set; }
    public string aliasBusqueda { get; set; }
    public string longitudBusqueda { get; set; }
    public string camposCapturaBusqueda { get; set; }
    public string camposOcultosBusqueda { get; set; }
    public bool guardaOrigen { get; set; }
}