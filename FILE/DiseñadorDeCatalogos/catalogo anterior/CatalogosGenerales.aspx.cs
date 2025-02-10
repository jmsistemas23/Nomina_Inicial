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

public partial class FILE_CatalogosGenerales_CatalogosGenerales : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //public static string[] DiseñoVista(string strtabla)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionVista '" + strtabla + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        result[0] = ds.Tables[1].Rows[0]["BloqueoColumnas"].ToString();
    //        result[1] = ds.Tables[1].Rows[0]["Columnas"].ToString();
    //    }
    //    else { result[0] = "0"; }
    //    ds.Dispose();
    //    return result;
    //}
}