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


public partial class FILE_Consultas_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Cargar_TiposCancelaciones()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_ListarTiposCancelaciones");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Opción";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][0].ToString();           
            dlist.descripcion = ds.Tables[0].Rows[i][1].ToString();            
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Cargar_EstatusCancelaciones()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_EstatusCancelaciones");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Opción";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][0].ToString();                                    
            dlist.descripcion = ds.Tables[0].Rows[i][1].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_CamposCapturaMovimientos(string plaza, int empleado, string quincancelada, int motivo, string estatus, string observaciones,string movimiento,string quinactual)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int usuid = 1;// objusuario.Id;
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        string quin="";

        if (quinactual == "Actual") { quin = objusuario.QuiAct + "_" + objusuario.AñoAct; }
        else { quin = quinactual; }

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CANCELACIONES_GUARDAR_CANCELACIONES '''" + plaza + "'''," + empleado + ",'" + quincancelada + "'," + motivo + ",'" + estatus + "'," + usuid + ",'" + quinactual + "','" + observaciones + "','" + movimiento + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Aplicar_Cancelacion_Pensionadas(int idpen,string plaza,int empleado, string quincancelada, int motivo, string estatus, string observaciones)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CANCELACIONES_GUARDAR_PENSIONADAS " + idpen + ",'" + plaza + "'," + empleado + ",'" + quincancelada + "'," + motivo + ",'" + estatus + "'," + objusuario.Id + ",'" + objusuario.QuiAct + "_" + objusuario.AñoAct + "','" + observaciones + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Quincenas()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_ListarQuincenas '',''");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Quincena";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][0].ToString();
            dlist.selected = false;
            dlist.descripcion = ds.Tables[0].Rows[i][0].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_BloqueosDesbloqueos(string modulo)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado '" + modulo + "',''");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        ds.Dispose();
        return result;
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
    public static string[] Listar_Cancelaciones(string condicion,string quincena)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int usuid = objusuario.Id;
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();        
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_ListarCancelaciones " + usuid + ",'" + condicion + "','" + quincena + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);        
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Validacion_Multinomina(string multi)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ValidacionMultinominas '" + multi + "'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        { result[0] = "0"; }
        else { result[0] = "1"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Captura_Quincenas(string quincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_Listar_Captura_Historia '" + quincena + "'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        { result[0] = "0"; }
        else { result[0] = "1"; }
        return result;
    }
    
}