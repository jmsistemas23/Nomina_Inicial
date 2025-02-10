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

public partial class FILE_IndiceDeAfectacion_DIndicesMC : System.Web.UI.Page
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

    public static string[] DiseñoGrid(string strtabla)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][4].ToString();
            result[1] = ds.Tables[0].Rows[0][5].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarIndices(string strcveind)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_IndicesMC_Listar '" + strcveind + "'");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
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
    public static string[] ConfiguracionGrid(string strtabla)
    {
        string[] result = { "", "", "", "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //descripcion
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //ancho tabla
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //alto tabla
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //propiedades
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //columnas grid
            result[4] = ds.Tables[0].Rows[0][4].ToString();
            //columnas de bloqueo
            result[5] = ds.Tables[0].Rows[0][5].ToString();
            //tabla siguiente
            result[6] = ds.Tables[0].Rows[0][6].ToString();
            //tabla anterior
            result[7] = ds.Tables[0].Rows[0][7].ToString();
            //columna filtro tabla siguiente
            result[8] = ds.Tables[0].Rows[0][8].ToString();
            //Orden de Nivel
            result[9] = ds.Tables[0].Rows[0][9].ToString();
            //Pagina nivel
            result[10] = ds.Tables[0].Rows[0][10].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Indices(string strtipo, string strcampos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_IndicesMC_Guardar '" + strtipo + "','" + strcampos + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }
}