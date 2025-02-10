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
//using Excel = Microsoft.Office.Interop.Excel;
using System.Web.Security;
using System.Security.Principal;
using System.Runtime.InteropServices;
using dotnetPanama.ExcelXml;


public partial class FILE_FaltasyRetardos_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_FaltasyRetardos()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Incidencias_ListarMovimientos");
        if (ds.Tables[0].Rows.Count == 0)
        {
            result[0] = ds.Tables[1].Rows[0][0].ToString();
            result[1] = ds.Tables[1].Rows[0][1].ToString();
        }
        else
        {
            result[0] = ds.Tables[1].Rows[0][0].ToString();
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        ds.Dispose();
        return result;
    }
      [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Aplicar_FaltasyRetardos(string valores)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();
        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Incidencias_GuardarValores '" + valores + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
      }
    

}