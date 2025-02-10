using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using Microsoft.Reporting.WebForms;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Hosting;
//using CrystalDecisions.CrystalReports.Engine;
    
public partial class FILE_EmpleadosEscalafon_funciones : System.Web.UI.Page
{
    //protected CrystalDecisions.Web.CrystalReportViewer cr;

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Datos_Empleados_Vacancias(string condicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_Escalafon_Empleados_Vacancia '" + condicion + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Datos_Empleados_Activos(string condicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_Escalafon_Empleados_Activos_Ordenados '" + condicion + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static void EmpleadosEscalafonVacantes(List<EscalafonActivo> Activos, List<EscalafonVacante> Vacanate)
        {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();

        foreach (var item in Activos)
        {

            lib.ejecutarConsultaEnDataTable("exec GESRH_SPT_Escalafon_Insertar_Activos " + item.fkNumEmpleadoVacante + ", " + item.fkNumEmpleadosActivo + ", '" + item.Nombre + "', '" +
                                           item.Rfc + "', '" + item.Plaza + "', '" + item.Puesto + "', '" + item.Descripcion_De_Puesto + "', '" + item.Adscripcion + "', '" +
                                           item.Descripcion_De_Adscripcion + "', '" + item.Pagaduria + "', '" + item.Descripcion_De_Pagaduria + "', '" + item.Vigencia_inicial + "', '" +
                                           item.Estatus + "', '" + item.Fecha_Ingreso + "', '" + item.Situacion + "', '" + item.Años.ToString() + "', '" + item.Meses.ToString() + "', '" + item.Dias.ToString() + "', '" +
                                           item.Descripcion + "', " + item.Preferencia + ", '" + item.PuestoNue + "', '" + item.Titulacion + "', " + item.Proceso + ", 'EN PROCESO'");
        }

        foreach (var item in Vacanate)
        {
            lib.ejecutarConsultaEnDataTable("exec GESRH_SPT_Escalafon_Empleados_Insertar_Vacantes " + item.numeroEmpleado + ", '" + item.nombre + "', '" + item.rfc + "', '" + item.plaza + "', '" +
                                        item.puesto + "', '" + item.descripcionDelPuesto + "', '" + item.adscripcion + "', '" + item.descripcionDeAdscripcion + "', '" +
                                        item.pagaduria + "', '" + item.descripcionDePagaduria + "', '" + item.dias + "', '" + item.meses + "', '" + item.años + "'");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ProcesarEmpleados(string condicion)
    {
        string result = "";
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_Escalafon_ProcesarEmpleados " + condicion);
        result = ds.Tables[0].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }
}