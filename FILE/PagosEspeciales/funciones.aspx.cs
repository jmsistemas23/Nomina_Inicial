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

public partial class FILE_PagosEspeciales_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string LlenarDropList(string strtabla,string strcondicion)
    {
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_LlenarListas '" + strtabla + "','" + strcondicion + "'");

        ClsDropList dlist = new ClsDropList();
        dlist.campo = "0";
        dlist.descripcion = "Seleccione";
        dlist.selected = true; 
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsDropList();
            dlist.campo = ds.Tables[0].Rows[i]["clave"].ToString();
            //if (i == 0)
            //{ dlist.selected = true; }
            //else { dlist.selected = false; }
            dlist.descripcion = ds.Tables[0].Rows[i]["descripcion"].ToString();
            //dlist.qry = ds.Tables[0].Rows[i]["qry"].ToString();
            lista.Add(dlist);
        }
        ds.Dispose();
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ListarIndicadores(string strtipoind)
    {
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_LlenarIndicadores '" + strtipoind + "'");

        ClsDropList dlist = new ClsDropList();
        dlist.campo = "0";
        dlist.descripcion = "Seleccione";
        dlist.selected = true;
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsDropList();
            dlist.campo = ds.Tables[0].Rows[i]["clave"].ToString();
            dlist.descripcion = ds.Tables[0].Rows[i]["descripcion"].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        ds.Dispose();
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarDatosEmpleado(string strtipocond, string strcondicion)
    {
        string[] result = { "", "","" };
         Utilerias lib = new Utilerias();
         DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_CapturaEspecial_BuscarEmpleado '" + strtipocond + "','"+strcondicion+"'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            if (ds.Tables[0].Rows[0][0].ToString() != "0")
            {
                result[0] = ds.Tables[1].Rows[0][0].ToString();
                result[1] = ds.Tables[1].Rows[0][1].ToString();
                result[2] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            }
            else
            {
                result[0] = ds.Tables[0].Rows[0][0].ToString();
                result[1] = ds.Tables[0].Rows[0][1].ToString();
            }
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Modificar_Documento(string numdoc)
    {
        string[] result = { "", "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_CapturaEspecial_BuscarDocumento '" + numdoc + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
        }
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Captura(string strmodulo,string strmov,string strcondicion, string strvalores, string strper, string strded, string strapo)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_GuardarMovimiento '" + strmodulo + "','" + strmov + "','" + strcondicion + "','" + objusuario.Usuario + "','" + strvalores + "','" + strper + "','" + strded + "','" + strapo + "'");
      
        if (ds.Tables[0].Columns.Count > 2)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            result[2] = ds.Tables[0].Rows[0][2].ToString();
        }
        else
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Captura(string strtipo, string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_EliminarMovimiento '"+strtipo+"','" + strcondicion + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Insertar_Captura(string strmov, string strvalores, string strfolio,string multi)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_InsertarMovimiento '" + strmov + "','" + objusuario.Usuario + "','" + strvalores + "','" + strfolio + "','" + multi + "'");
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_InsertarMovimiento '" + strmov + "','ADMIN','" + strvalores + "','" + strfolio + "','" + multi + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();       

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Incremento_Contador()
    {
        string result;
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_IncrementoContador");

        result = ds.Tables[0].Rows[0][0].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Indicador(string documento, string indicador, string tipoind)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_EliminarIndicadores '" + documento + "','" + indicador + "','" + tipoind + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Documento(string condicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_EliminarMovimiento 'D','" + condicion+"'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

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
    public static string[] Listar_BloqueosDesbloqueos(string modulo, string tipomov)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado '" + modulo + "','" + tipomov + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }
    
}