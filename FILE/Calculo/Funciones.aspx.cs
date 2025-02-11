using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Script.Serialization;


public partial class FILE_Calculo_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] EjecutarCalculo(string clave,string proyeccion,string multi)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Calculo_GenerarCalculo '" + clave + "'," + proyeccion + ",'" + multi+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string CancelarCalculo(string proyeccion)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Calculo_GenerarCalculo_Detenercalculo " + proyeccion);
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarInformacionCalculo(string proyeccion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Calculo_GenerarCalculo_Informacion " + proyeccion);
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    public static string DataTableToJsonObj(DataTable dt)
    {
        DataSet ds = new DataSet();
        ds.Merge(dt);
        StringBuilder JsonString = new StringBuilder();
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            JsonString.Append("{\"rows\": [");
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                JsonString.Append("{");
                for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                {
                    if (j < ds.Tables[0].Columns.Count - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"", "\\\"").Trim() + "\",");
                    }
                    else if (j == ds.Tables[0].Columns.Count - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"", "\\\"").Trim() + "\"");
                    }
                }
                if (i == ds.Tables[0].Rows.Count - 1)
                {
                    JsonString.Append("}");
                }
                else
                {
                    JsonString.Append("},");
                }
            }
            JsonString.Append("]}");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarPerfil(string tipomov,string valores)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_GuardarPerfil '" +tipomov+"','"+ valores + "'");
        result[0]=ds.Tables[0].Rows[0][0].ToString();
        result[1]=ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] CargarDatosPerfil(string clave)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Calculo_PerfilesCalculo_ProcedimientosAsignados '" + clave + "'");
    //    result[0] = DataTableToJsonObj(ds.Tables[0]);
    //    result[1] = ds.Tables[1].Rows[0][0].ToString();
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarProcedimientosPerfil(string clave, string valores)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_AsignarProcedimientos '" + clave + "','" + valores + "'");
         result[0]= ds.Tables[0].Rows[0][0].ToString();
         result[1]= ds.Tables[0].Rows[0][1].ToString();
         return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string QuitarProcedimientoPerfil(string clave, string procedimiento)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_EliminarProcedimientoAsignado '" + clave + "','" + procedimiento + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string OrdenarProcedimientoPerfil(string clave, string procedimiento, string posiciones)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_OrdenarProcedimiento '" + clave + "','" + procedimiento + "','" + posiciones + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ActivaDesactivaProcedimientoPerfil(string clave, string procedimiento)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_ActivaDesactivaProcedimientoPerfil '" + clave + "','" + procedimiento + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarProcedimiento(string valores)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_GuardarProcedimiento '" + valores + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] EliminarProcedimiento(string clave)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoPerfiles_EliminarProcedimiento " + clave);
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarPerfiles()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Calculo_PerfilesCalculo");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarProcedimientos(string clave,string proyeccion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Calculo_PerfilesCalculo_ProcedimientosAsignados '" + clave + "'," + proyeccion);
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConsultaControl()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_Consulta");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Validacion_Multinomina(string multi)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ValidacionMultinominas '" + multi + "'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        { result[0] = "0"; }
        else { result[0] = "1"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_BloqueosDesbloqueos(string tipomov)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado 'Calculo','" + tipomov + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

   
}
