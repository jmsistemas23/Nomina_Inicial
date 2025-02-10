using System;
using System.Data;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

public partial class FILE_Retroactivos_Funciones : System.Web.UI.Page
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
    public static string[] Listar_Documentos(string condicion)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_BloqueoRetroactivo_ListarDocumentos '"+condicion+"'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Documentos(string cadena,string tipoplaza)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        var idusu = objusuario.Id;
        var quinact =  objusuario.QuiAct;
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_BloqueoRetroactivo_GuardarDocumentos " + idusu +",'"+ quinact + "','" + cadena + "','"+tipoplaza+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();       
        ds.Dispose();
        return result;
    }
}