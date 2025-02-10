using System;
using System.Collections.Generic;
using System.EnterpriseServices.Internal;
using System.Linq;
using System.Web;

/// <summary>
/// Descripción breve de ArchivoNomina
/// </summary>
public class ArchivoNomina
{
  public string Año_nomina { get; set; }
    public string periodo_nomina { get; set; }
    public string Tipo_Nomina { get; set; }
    public string RFC { get; set; }
    public string NumEmpleado { get; set; }
    public string NumPlaza { get; set; }
    public string nombreEmpleado { get; set; }
    public string Curp { get; set; }
    public string DomicilioFiscalReceptor { get; set; }
    public string TipoNomina {  get; set; } 
    public string FormaPago {  get; set; }  
    public string Liquido { get; set; }
    public string MetodoPago {  get; set; }
    public string Serie {  get; set; }
    public string Recibo { get; set; }
    public string LugarExpedicion { get; set; }
    public string NumCtaPago { get; set; }
    public string FechaPago { get; set; }
    public string FechaInicialPago { get; set; }
    public string FechaFinalPago { get; set; }
    public string NumDiasPagados { get; set; }
    public string TotalPercepciones { get; set; }
    public string TotalDeducciones { get; set; }
    public string TotalOtrosPagos { get; set; }
    public string RegistroPatronal { get; set; }
    public string OrigenRecurso { get; set; }
    public string MontoRecursoPropio { get; set; }
    public string NumSeguridadSocial { get; set; }
    public string FechaInicioRelLaboral { get; set; }
    public string Antiguedad { get; set; }
    public string TipoContrato { get; set; }
    public string Sindicalizado { get; set; }
    public string TipoJornada { get; set; }
    public string TipoRegimen { get; set; }
    public string Departamento { get; set; }
    public string Puesto { get; set; }
    public string RiesgoPuesto { get; set; }
    public string PeriocidadPago { get; set; }
    public string Banco { get; set; }
    public string CuentaBancaria { get; set; }
    public string SalarioBaseCotApor { get; set; }
    public string SalarioDiarioIntegrado { get; set; }
    public string ClaveEntFed { get; set; }
    public string TotalSueldos { get; set; }
    public string TotalSepararacionIndemnizacion { get; set; }
    public string TotalJubilacionPensionRetiro { get; set; }
    public string TotalGrabadoPercepciones { get; set; }
    public string TotalExcentoPercepciones { get; set; }
    public string TotalUnaExhibicionJPR { get; set; }
    public string TotalParcialJPR { get; set; }
    public string MontoDiarioJPR { get; set; }
    public string IngresoAcumulableJPR { get; set; }
    public string IngresoNoAcumulableJPR { get; set; }
    public string TotalPagoSi { get; set; }
    public string NumAniosServicioSi { get; set; }
    public string UltimoSueldoMensOrdSi { get; set; }
    public string IngresoAcumulableSi { get; set; }
    public string IngresoNoAcumulableSi { get; set; }
    public string TotalOtrasDeducciones { get; set; }
    public string TotalImpuestoRetenidos { get; set; }
    public string SubsidioCausado { get; set; }
    public string SueldoAFavorCom { get; set; }
    public string AnioCom { get; set; }
    public string RemanenteSalFavCom { get; set; }
    public string relacion_tipo_clave { get; set; }
    public string relacion_UUID { get; set; }
    public string Comentario { get; set; }
    public string id_Recibo { get; set; }
}