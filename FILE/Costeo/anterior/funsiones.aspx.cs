using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Costeo_funsiones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_TipoPlazas(string centcosto)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_CreacionPlaza_Listar_TipoPlaza '" + centcosto + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["cvetippl"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["destippl"].ToString();
            campo.tabla = "Nominas";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_RegimenIPES()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPES");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][0].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();            
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_RegimenIPESVOL()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPESVol");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][1].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_RegimenIPESPORC(string filtro)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPESPorc '"+filtro+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][1].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_Quinquenios()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_Quinquenios ");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][0].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] PROCESO_COSTEO(string tipocosto,string filtro,string conceptos,string canceladas)
    //{
    //    string[] result = { "", "","" };
    //    string columnas = "";
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos '" + tipocosto + "','" + filtro + "','" + conceptos + "'," + canceladas);
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        //if (ds.Tables[0].Rows[0]["Mensaje"] != null)
    //        //{
    //        //    result[0] = "0";
    //        //    result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString();
    //        //}
    //        //else
    //        //{
    //            result[0] = "1";
    //            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
    //            for (int c = 0; c < ds.Tables[0].Columns.Count; c++)
    //            {
    //                columnas += ds.Tables[0].Columns[c].ToString()+"|";
    //            }
    //            result[2] = columnas.Substring(0, columnas.Length - 1);
    //        //}
    //    }
    //    else { result[0] = "0"; result[1] = "No existen datos a costear"; result[2] = ""; }
    //    ds.Dispose();
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Plazas(string filtro)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_PlazasFiltros '" + filtro + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] proceso_costeo(string tipocosto,string filtro,string conceptos,string canceladas)
    {
        string[] result = { "", "","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos '"+tipocosto+"','"+filtro+"','"+conceptos+"','"+canceladas+"'");
        if (ds.Tables[0].Rows.Count == 0)
        {
            result[0] = "1";
        }
        else
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = ds.Tables[0].Rows.Count.ToString();
        }
        ds.Dispose();
        return result;
    }
}