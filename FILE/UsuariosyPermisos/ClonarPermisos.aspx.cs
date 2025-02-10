using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_UsuariosyPermisos_ClonarPermisos : System.Web.UI.Page
{
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
    public static string[] Cifras_Control(string UsuOrigen, string UsuarioDestino)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ClonarPermisos_CifrasControl " + UsuOrigen + "," + UsuarioDestino);
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Aplicar_Roles(string UsuarioOrigen, string UsuarioDestino, Boolean EliminarPer)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ClonarPermisos_Roles_Guardar " + UsuarioOrigen + "," + UsuarioDestino + "," + EliminarPer);
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Aplicar_Permisos_Ind(string UsuarioOrigen, string UsuarioDestino, Boolean EliminarPer)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ClonarPermisos_PermisosInd_Guardar " + UsuarioOrigen + "," + UsuarioDestino + "," + EliminarPer);
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

}