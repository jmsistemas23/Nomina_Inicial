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
public partial class FILE_ControlQuincenas_Restaurar_Respaldo : System.Web.UI.Page
{
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        if (objusuario == null)
        {
            Response.Redirect("../../Login.aspx");
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_FechasRastaurar(string condicion)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Respaldos_ListaFechasRespaldos '" + condicion + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Restaurar_Respaldo(int id)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_NOM_Respaldos_Restaurar "+id+",'" + objusuario.Usuario + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
}