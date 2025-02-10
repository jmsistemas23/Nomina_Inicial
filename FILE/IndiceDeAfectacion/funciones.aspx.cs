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

public partial class FILE_IndiceDeAfectacion_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Tablas_Sistema()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Indices_ListaTablas");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new ClsCampos();
            campo.Id = i;
            campo.name = ds.Tables[0].Rows[i][0].ToString();
            campo.text = ds.Tables[0].Rows[i][0].ToString();
            lstcampo.Add(campo);
        }
        result[0] = js.Serialize(lstcampo);
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas(string strtabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarColumasTablas '" + strtabla + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Lista_Campos(string tabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Indices_ListaCamposIndice '" + tabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Campos(string tabla, string valores, string campos, string campo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Indices_GuardarCamposIndice '" + tabla + "','" + valores + "','" + campos + "','" + campo + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Campos(string tabla,  string campo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Indices_EliminarCamposIndice '" + tabla + "','" + campo + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        else { result[0] = ""; }
        return result;
    }
}