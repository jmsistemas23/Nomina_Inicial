using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Web.Services;


public partial class FILE_CosteoPlazas_puestos_equivalencia : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta()
    {
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta_Detalle(string clave)
    {       
        return new BO().sp_cat_puesto_equivalencia_detalle_selectStringJSON(clave);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_AgregarPuesto(int id, int nivel, string clave)
    {       
        return new BO().sp_cat_puesto_equivalencia_alta(nivel, clave);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_EliminarPuesto(int id, int nivel, string clave)
    {        
        new BO().sp_cat_puesto_equivalencia_elimina(id);
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_AgregarPuesto_Detalle(int id, string clave, string cvepuesto_equivalencia)
    {        
        return new BO().sp_cat_puesto_equivalencia_detalle_alta(clave, cvepuesto_equivalencia);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_EliminarPuesto_Detalle(int id)
    {        
        new BO().sp_cat_puesto_equivalencia_detalle_elimina(id);
        return new BO().sp_cat_puesto_equivalencia_selectStringJSON();
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta_Nivel(int id)
    {
        return new BO().sp_cat_puesto_equivalencia_detalle_nivel_selectStringJSON(id);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_AgregarPuesto_Nivel(string cveNivel_educativo, int cvepuesto_equivalencia_detalle)
    {
        return new BO().sp_cat_puesto_equivalencia_detalle_nivel_alta(cveNivel_educativo, cvepuesto_equivalencia_detalle);
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_EliminarPuesto_Nivel(int id)
    {
        new BO().sp_cat_puesto_equivalencia_detalle_nivel_elimina(id);
        return "";
    }

    [WebMethod(EnableSession = true)]
    public static string Proceso_Consulta_Puestos(string clave)
    {        
        return new BO().sp_cat_puesto_equivalencia_detalle_selectStringJSON(clave, 1);
    }
}