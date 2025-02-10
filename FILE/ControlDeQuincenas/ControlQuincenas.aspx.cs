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


public partial class FILE_ControlQuincenas_ControlQuincenas : System.Web.UI.Page
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
        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConsultaControl()
    {
        string[] result = { "","" };
        //List<String> r = new List<string>();
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_Consulta");
        //r.Add(ds.Tables[0].Rows[0][0].ToString());
        //r.Add(ds.Tables[0].Rows[0][1].ToString());
        //r.Add(ds.Tables[0].Rows[0][2].ToString());
        //r.Add(ds.Tables[0].Rows[0][3].ToString());
        //r.Add(ds.Tables[0].Rows[0][4].ToString());        
        //JavaScriptSerializer js = new JavaScriptSerializer();
        //return js.Serialize(r);
         result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
         result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
         return result;
    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string AperturaQuincena(string tipo)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        List<String> r = new List<string>();
        Utilerias lib = new Utilerias();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_AperturaQuincena '" + tipo + "','ADMIN'");
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_AperturaQuincena '" + tipo + "','"+objusuario.Usuario+"'");
        r.Add(ds.Tables[0].Rows[0][0].ToString());
        r.Add(ds.Tables[0].Rows[0][1].ToString());
        JavaScriptSerializer js = new JavaScriptSerializer();
        return js.Serialize(r);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string CierreQuincena(string multi)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        List<String> r = new List<string>();
        Utilerias lib = new Utilerias();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_CierreQuincena 'ADMIN','" + multi + "'");
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ControlQuincenas_CierreQuincena '" + objusuario.Usuario + "','" + multi + "'");
        r.Add(ds.Tables[0].Rows[0][0].ToString());
        r.Add(ds.Tables[0].Rows[0][1].ToString());
        JavaScriptSerializer js = new JavaScriptSerializer();
        return js.Serialize(r);
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
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"","\\\"").Trim() + "\",");
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
    public static string[] Validacion_Multinomina(string multi)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ValidacionMultinominas '" + multi + "'");
        if (Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) == 0)
        { result[0] = "0"; }
        else { result[0] = "1"; }
        return result;
    }

  
}