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

public partial class FILE_Fonac_funsiones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Configuracion(string indicador_inscr, string indicador_insc_apo1, string Estplaapo1, string indicador_insc_apo2, string Estplaapo2, string indicador_insc_apo3, string Estplaapo3, string indicador, string Indicador_apo1, string Indicador_apo2, string Indicador_apo3)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Configuracion '" + indicador_inscr + "','" + indicador_insc_apo1 + "'," + Estplaapo1 + ",'" + indicador_insc_apo2 + "'," + Estplaapo2 + ",'" + indicador_insc_apo3 + "'," + Estplaapo3 + ",'" + indicador + "','" + Indicador_apo1 + "','" + Indicador_apo2 + "','" + Indicador_apo3 + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Configuracion()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Cargar_Configuracion");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[]  Cerrar_Apertura_Ciclo(string tipo)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = new DataSet();
        
        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Cierre '" + tipo + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Ciclo()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Cierre 'B'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);        
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Quincenas()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarQuincenas");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Actual";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][1].ToString() + "|" + ds.Tables[0].Rows[i][2].ToString() + "|" + ds.Tables[0].Rows[i][3].ToString();
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
    public static string[] Mostrar_Detalle(int empleado)
    {
        string[] result = { "","","","" };
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Fonac_MostrarDetalle "+empleado);
        if (ds.Tables[0].Rows[0][0].ToString() == "1")
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]); 
        }
        else {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);          
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_AltaPago(int numemp,string plaza,string quincena,string año,string descuento,string apo1,string apo2,string apo3,string tipoquin,string numext,string observaciones,string usu)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_AltaPago '" + numemp + "','"+quincena+"','"+año+"',"+descuento+","+apo1+","+apo2+","+apo3+",'"+tipoquin+"','"+numext+"','"+plaza+"','"+observaciones+"','"+usu+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_AltaEmpleados(int periodo, string fechaini, string empleado, string plaza, string estatuspl, string cvepue, string gpojer, string tipoqna, string numext, string usuario)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Mov_AltaEmpleados " + periodo + ",'" + fechaini + "'," + empleado + ",'" + plaza + "','" + estatuspl + "','" + cvepue + "','" + gpojer + "','" + tipoqna + "'," + numext + ",'" + usuario + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_BajaEmpleados(string fechaini, string empleado, string plaza, string estatuspl,string tipoqna, string numext, string usuario,string observaciones)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_FONAC_Mov_BajaEmpleados '" + fechaini + "'," + empleado + ",'" + plaza + "','" + estatuspl + "','" + tipoqna + "'," + numext + ",'" + usuario + "','" + observaciones + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
}