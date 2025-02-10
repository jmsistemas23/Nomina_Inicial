using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script;
using System.Web.Script.Services;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Web.Script.Serialization;
using System.IO;
using System.Data.OleDb;
using System.Web.UI;

public partial class FILE_Bloqueos_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas(int bloqueo,string año)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarQuincenas "+bloqueo+",'"+año+"'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows[0][0].ToString() != "No")
        {
            //result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                campo.attributes = ds.Tables[0].Rows[i][3].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        else { result[0] = ds.Tables[0].Rows[0][1].ToString(); }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Quincena(string valor, string quin,string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_BloquearDesbloquear_Quincena '" + valor + "','" + quin + "','"+tipo+"'");
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas_Bloquedas(string bloqueo, string año)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarQuincenas '" + bloqueo + "','" + año + "'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows.Count > 0)
        {
            if (ds.Tables[0].Rows[0][0].ToString() != "No")
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    campo = new ClsCampos();
                    campo.Id = i;
                    campo.name = ds.Tables[0].Rows[i][0].ToString();
                    campo.text = ds.Tables[0].Rows[i][0].ToString();
                    campo.attributes = ds.Tables[0].Rows[i]["bloqueaproduccion"].ToString();
                    lstcampo.Add(campo);
                }
                result[0] = js.Serialize(lstcampo);
            }
            else { result[0] = ds.Tables[0].Rows[0][1].ToString(); }
        }
        else { result[0] = ""; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas_Cancelacion(string bloqueo, string año)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_ListarQuincenas '" + bloqueo + "','" + año + "'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows.Count > 0)
        {
            if (ds.Tables[0].Rows[0][0].ToString() != "No")
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    campo = new ClsCampos();
                    campo.Id = i;
                    campo.name = ds.Tables[0].Rows[i][0].ToString();
                    campo.text = ds.Tables[0].Rows[i][0].ToString();
                    campo.attributes = ds.Tables[0].Rows[i][3].ToString();
                    lstcampo.Add(campo);
                }
                result[0] = js.Serialize(lstcampo);
            }
            else { result[0] = ds.Tables[0].Rows[0][1].ToString(); }
        }
        else { result[0] = ""; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ValidarProduccion()
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Calculo_ContadorProduccion");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        result[2] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Calculo(int valor)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Calculo " + valor);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Cancelaciones(int valor)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Cancelaciones " + valor);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Captura(string tipo,string modulo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Captura '" + modulo + "','" + tipo + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Afectacion(string tipo, string modulo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Afectacion '" + modulo + "','" + tipo + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_BloqueosDesbloqueos(string modulo)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado '" + modulo + "',''");
        result[0]=lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
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
    public static string[] Listar_BloqueosDesbloqueos_Cancelaciones(string modulo)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado '" + modulo + "',''");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] BloquearDesbloquear_Cancelaciones(int valor)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Nomina " + valor);
    //    ds.Dispose();
    //    return result;
    //}

}