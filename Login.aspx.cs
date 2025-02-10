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

public partial class Login : System.Web.UI.Page
{
    static string ipusu;
    protected void Page_Load(object sender, EventArgs e)
    {
         ipusu = HttpContext.Current.Request.UserHostName;        
    }
    public static string DataTableToJsonObj(DataTable dt)
    {
        DataSet ds = new DataSet();
        ds.Merge(dt);
        StringBuilder JsonString = new StringBuilder();
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            JsonString.Append("[");
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
            JsonString.Append("]");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Iniciar_Sesion(string strusuario, string strcontraseña)
    {
        string[] result = { "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sesion_Iniciar_Sesion '" + strusuario + "','" + strcontraseña + "'");

        ClsLogin log = new ClsLogin();
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {
            log.Id = Convert.ToInt16(ds.Tables[1].Rows[0]["Id"].ToString());
            log.Usuario = ds.Tables[1].Rows[0]["Usuario"].ToString();
            log.Nombre = ds.Tables[1].Rows[0]["Nombre"].ToString();
            log.VigenciaIni = ds.Tables[1].Rows[0]["VigenciaIni"].ToString();
            log.Area = ds.Tables[1].Rows[0]["Area"].ToString();
            log.QuinMulti = ds.Tables[2].Rows[0]["NomQuinMulti"].ToString();
            //log.TipoQuin = "";//ds.Tables[2].Rows[0]["tipoquin"].ToString();
            log.IpUsu = ipusu;

            if (ds.Tables[3].Rows.Count > 0)
            {
                log.QuiAct = ds.Tables[3].Rows[0]["cvequin"].ToString();
                log.AñoAct = ds.Tables[3].Rows[0]["anoquin"].ToString();
            }
            else
            {
                log.QuiAct = "No existe quincena abierta";
                log.AñoAct = DateTime.Today.Year.ToString();
            }
            result[0] = ds.Tables[0].Rows[0]["Error"].ToString();
            result[1] = "";
        }
        else
        {
            result[0] = ds.Tables[0].Rows[0]["Error"].ToString();
            result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString();
        }
        HttpContext.Current.Session["Usuario"] = log;
        return result;

    }

}