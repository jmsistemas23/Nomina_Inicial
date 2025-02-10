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

public partial class FILE_Afectaciones_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       
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
    public static string[] Listar_DocuementosRestaurar(string condicion, string modulo)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Restaurar_ListarDocumentos '" + condicion + "','" + modulo + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] RestaurarDocumento(string condicion, string modulo)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Restaurar_PlazasDocumento '" + condicion + "','" + modulo + "'");        
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
}