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

public partial class FILE_Produccion_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Produccion(string strtipo,string strfolios,string strquincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds= new DataSet();
        if (strquincena == "Actual")
        {
            if (strtipo != "PN")
            { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Nomina '" + strfolios + "','"+strquincena+"'"); }
            else
            { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Pension '" + strfolios + "','" + strquincena + "'"); }
        }
        else
        {
            if (strtipo != "PN")
            { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Nomina_hist '" + strfolios + "','" + strquincena + "'"); }
            else
            { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Pension_hist '" + strfolios + "','" + strquincena + "'"); }
        }
        if (ds.Tables[0].Rows.Count > 0)
        { result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]); }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Limpiar_Produccion(string strquincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
       string msg=lib.EJECUTAR_SENTENCIA("GESRH_SPT_NOM_Produccion_LimpiarNomina '" + strquincena + "'");
       if (msg == "Si") { result[0] = "1"; result[1] = "Se han Limpiado las Tablas de Producción"; }
       else { result[0] = "0"; result[1] = "Error al limpiar la producción"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Actualizar_Folios(string recibo,int cheque,string fecha,string periodo,string vigencia,string leyenda,string cveconsulta,string cveperfil,string quincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ActualizarFoliosPerfiles '''"+recibo+"''',"+cheque+",'''"+fecha+"''','''"+periodo+"''','''"+vigencia+"''','''"+leyenda+"''','''"+cveconsulta+"''','''"+cveperfil+"''','''"+quincena+"'''");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Reportes(string strquincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();

        if (strquincena == "Actual")
        { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Reportes"); }
        else { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_NominaRecibos_Historia '" + strquincena+"'"); }
        
        result[0] = "Información de Reportes Generada";
        
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Validar(string quincena)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();
        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_TipoValidaciones '"+quincena+"'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Errores(int strid)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();
        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarErrores "+strid);
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas(int bloqueo,string año)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarQuincenas "+bloqueo+",'"+año+"'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows[0][0].ToString() != "No")
        {
            //result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                campo.attributes = ds.Tables[0].Rows[i][3].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        else { result[0] = ds.Tables[0].Rows[0][1].ToString(); }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BloquearDesbloquear_Quincena(string valor, string quin)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_BloqueoDesBloqueo_Quincena '" + valor + "','" + quin + "'");
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas_Bloquedas(string bloqueo, string año)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarQuincenas '" + bloqueo + "','" + año + "'");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows[0][0].ToString() != "No")
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                campo.attributes = ds.Tables[0].Rows[i]["bloqueaproduccion"].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        else { result[0] = ds.Tables[0].Rows[0][1].ToString(); }
        return result;
    }
}