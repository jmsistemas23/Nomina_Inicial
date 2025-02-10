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

public partial class FILE_Patrimoniales_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

  
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Iniciar_Seccion(string empleado, string rfc)
    {
        string[] result = { "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("spt_Patrimonial_InicioSeccion '" + empleado + "','" + rfc + "'");
        ClsLogin log = new ClsLogin();
        if (ds.Tables[1].Rows[0][0].ToString() == "0")
        {

            log.Usuario = ds.Tables[0].Rows[0]["EMPLEADO"].ToString();
            log.Nombre = ds.Tables[0].Rows[0]["RFC"].ToString();

            result[0] = ds.Tables[1].Rows[0]["Error"].ToString();
            result[1] = ds.Tables[1].Rows[0]["Mensaje"].ToString();           
        }
        else
        {
            result[0] = ds.Tables[1].Rows[0]["Error"].ToString();
            result[1] = ds.Tables[1].Rows[0]["Mensaje"].ToString();
        }
        ds.Dispose();
        HttpContext.Current.Session["Usuario"] = log;
        return result;

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Datos()
    {
        string[] result = { "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        DataSet ds = lib.ejecutarConsultaEnDataSet("spt_Patrimonial_Importes '" + objusuario.Usuario + "','" + objusuario.Nombre + "'");
        //DataSet ds = lib.ejecutarConsultaEnDataSet("spt_Patrimonial_Importes '27881','saam750901a48'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        result[2] = ds.Tables[2].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

}