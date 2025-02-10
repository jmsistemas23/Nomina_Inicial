using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Collections;
using ExcelDataReader;
using ExcelDataReader.Core;



public partial class FILE_CosteoPlazas_Plazas_Vacantes  : Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }



    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta_CentroCosto(string CentroCosto, string filtro, string NivelSalarial, string desde, string hasta, string opcion, string cvpuespu)
    {   
        
        return new BO().sp_Recurso_Vacante_selectStringJSON(CentroCosto, filtro, desde, hasta, NivelSalarial,null, opcion, cvpuespu);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta_Numero_Plaza(string NumeroPlaza, string desde, string hasta, string NivelSalarial, string cveRecurso_Vacante, string opcion, string cvpuespu)
    {
            return new BO().sp_Recurso_Vacante_selectStringJSON(null, NumeroPlaza, desde, hasta, NivelSalarial, cveRecurso_Vacante,opcion, cvpuespu);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_AgregarPuesto(int id, int nivel, string clave)
    {
        return new BO().sp_cat_puesto_equivalencia_alta(nivel, clave);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_LlenarPuesto(string puesto)
    {

        return new BO().sp_cat_puesto_equivalencia_detalle_selectStringJSON(puesto);
    }
   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_LlenarPuesto_Vacante()
    {
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_LlenarPuesto_Vacante(string puesto)
    {      
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON(puesto);
    }
   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_LlenarMotivo_Vacante()
    {
        return new BO().sp_cat_Motivos_Baja_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_EliminarPuesto(int id, int nivel, string clave)
    {
        new BO().sp_cat_puesto_equivalencia_elimina(id);
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static int Proceso_EliminarMovimiento(int FolioMovimiento)
    {
        return new BO().GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(FolioMovimiento);
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static int Proceso_Guardar(List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        int resultado = new BO().sp_Recurso_Ocupado_alta(ref Recurso_OcupadoEntity);
        return resultado;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static int Proceso_Guardar_Vacante(List<Recurso_Vacante> Recurso_VacanteEntity)
    {
        int resultado = 0;
        Recurso_Vacante elemento;
        //for (int i = 0; i < Calificaciones.Count; i++)
        foreach (Recurso_Vacante elementos in Recurso_VacanteEntity)
        {
            elemento = elementos;
            new BO().sp_Recurso_Vacante_alta(ref elemento);
            resultado = int.Parse(elementos.cveRecurso_Movimiento);
        }
        return resultado;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static List<Respuesta_Entity> Valida_Guardar(List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        List<Respuesta_Entity> list = new List<Respuesta_Entity>();

        list = new BO().Valida(Recurso_OcupadoEntity);
        return list;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static List<Respuesta_Entity> UnificarGuardar(List<Recurso_Vacante> Recurso_VacantedoEntity)
    {
        List<Respuesta_Entity> list = new List<Respuesta_Entity>();

        list = new BO().UnificarValida(Recurso_VacantedoEntity);
        return list;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Costeo_Plazas(List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        
        return new BO().Costeo_Plazas(Recurso_OcupadoEntity);
       

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static List<Respuesta_Entity> Proceso_Consulta_Plaza(string numplaza)
    {
            return new BO().sp_plaza_select(numplaza);
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_Consulta_Plaza_Compactacion(string numplaza)
    {
        return new BO().sp_plaza_compactacion_select(numplaza);
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_Consulta_Plaza_Recategorizacion(string filtro, string desde, string hasta)
    {
        
        return new BO().sp_plaza_recategorizacion_select(filtro, desde, hasta);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Proceso_Consulta_Movimientos(int cveRecurso_Vacante, string cveRecurso_Movimiento)
    {
        if (cveRecurso_Movimiento == "")
        {
            return new BO().sp_Recurso_Ocupado_selectStringJSON(cveRecurso_Vacante);
        }
        else
        {
            return new BO().sp_Recurso_Ocupado_selectStringJSON(cveRecurso_Vacante, int.Parse(cveRecurso_Movimiento));
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static int sp_Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante, string cveRecurso_Ocupado)
    {
        if (cveRecurso_Ocupado == "" || cveRecurso_Ocupado == "0")
        {
            return new BO().sp_Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante);
        }
        else
        {
            return new BO().sp_Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante, int.Parse(cveRecurso_Ocupado));
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string sp_Recurso_Movimiento_selectStringJSON(int cveRecurso_Movimiento, int cveRecurso_Movimiento_tipo)
    {
        
         
        return new BO().sp_Recurso_Movimiento_selectStringJSON(cveRecurso_Movimiento, cveRecurso_Movimiento_tipo);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string sp_Recurso_Vacante_Movimiento_selectStringJSON(int cveRecurso_Movimiento, string desde, string hasta, string NivelSalarial, string opcion, string cvpuespu)
    {
        return new BO().sp_Recurso_Vacante_Movimiento_selectStringJSON(cveRecurso_Movimiento, desde, hasta, NivelSalarial, opcion, cvpuespu);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string GESRH_SPT_Catalogo_MunicipioStringJSON()
    {
        return new BO().GESRH_SPT_Catalogo_ListarTablasStringJSON("munici", "25");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string GESRH_SPT_Catalogo_CentroCostoStringJSON()
    {
        return new BO().GESRH_SPT_Catalogo_ListarTablasStringJSON("centrocosto", "");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string GrupoNominal_selectStringJSON(string GrupoNominal)
    {
         return new BO().GESRH_SPT_Catalogo_ListarTablasStringJSON("zonpag", GrupoNominal);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Empleado_selectStringJSON(string NumeroEmpleado)
    {
        return new BO().GESRH_SPT_BUSCAREMPLEADO_StringJSON("empleado", NumeroEmpleado);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string DocumentosCIT_selectStringJSON(string Folio)
    {
        
        return new BO().DocumentosCIT_selectStringJSON(Folio);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ZonaEconomica_selectStringJSON()
    {
        return new BO().GESRH_SPT_Catalogo_ListarTablasStringJSON("zoneco", "");
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string sp_cat_nivsal_select(string cvezon, string codnivpu)
    {
        return new BO().sp_cat_nivsal_select(cvezon, codnivpu);
    }

    protected void btnSimulacionAfectacion_Click(object sender, EventArgs e)
    {
        DataSet ds = new BO().GESRH_SPT_ControlPlaza_simulacion_afectacion();

        bool respuesta = new BO().ExportToExcel(this, ds.Tables[0], "Simulacion.xls");
        //if(!respuesta)
        //    Page.ClientScript.RegisterStartupScript(this, "ErrorAlert", "alert('" + "no hay informacion para mostrar" + "');", true);

    }
}