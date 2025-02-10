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

public partial class FILE_IndiceDeAfectacion_IndicesMP : System.Web.UI.Page
{
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
    [System.Web.Services.WebMethod]
    public static bool GetResponse()
    {
        return true;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}
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

}