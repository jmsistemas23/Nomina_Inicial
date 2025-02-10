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

public partial class FILE_Incremento_Niveles_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Lista(string tipo, string condicion)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_IncrementoNivel_Listas '"+tipo+"','"+condicion+"'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new ClsCampos();
            campo.Id = i;
            campo.name = ds.Tables[0].Rows[i][0].ToString();
            campo.text = ds.Tables[0].Rows[i][1].ToString();
            lstcampo.Add(campo);
        }
        result[0] = js.Serialize(lstcampo);
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Lista_NS(string strcondicion,string strconceptos,string strniveles)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_IncrementoNivel_Lista_NS '" + strcondicion + "','"+strconceptos+"','"+strniveles+"'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Incremento(string vigini,string vigfin,string valores)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_IncrementoNivel_GuardarIncremento '"+ vigini + "','" + vigfin + "','" + valores + "'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        return result;
    }  
}