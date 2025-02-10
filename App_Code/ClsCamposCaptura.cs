using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ClsCamposCaptura
/// </summary>
public class ClsCamposCaptura
{
	public ClsCamposCaptura()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public string Movimiento { get; set; }
    public string Campo { get; set; }
    public int Sololectura { get; set; }
    public int ValidaNulos { get; set; }
    public int ValidaLongitud { get; set; }
    public string Descripcion { get; set; }
    public string Orden { get; set; }
    public string TipoDato { get; set; }    
    public string Tamaño { get; set; }
    public string Longitud { get; set; }
    public string CatalogoSeleccion { get; set; }
    public string CatalogoTexto { get; set; }
    public string CatalogoValor { get; set; }
    public string CatalogoFiltro { get; set; }
    public string CamposRelacion { get; set; }
    public string CamposFiltros { get; set; }
    public int HabilitarBusqueda { get; set; }
    public string CampoDescriptivo { get; set; }
    public string valorPredeterminado { get; set; }
    public Boolean CampoOrigen { get; set; }
    public string ConsultaBusqueda_Tabla { get; set; }
    public string ConsultaBusqueda_Columnas { get; set; }
    public string ConsultaBusqueda_AliasColumnas { get; set; }
    public string ConsultaBusqueda_CamposCaptura_Oculto { get; set; }
    public string ConsultaBusqueda_Condicion { get; set; }
    public string ConsultaBusqueda_Orden { get; set; }
    public string ConsultaBusqueda_LongColumnas { get; set; }
    public string ConsultaBusqueda_RelacionCaptura { get; set; }
    public string ConsultaBusqueda_BusquedaDirecta { get; set; }
    public string Configuracion_CamposCaptura { get; set; }

}