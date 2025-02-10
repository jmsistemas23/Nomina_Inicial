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
public partial class FILE_ProcesosEspeciales_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Indicadores(string strtipo)
    {
        string datos = "";
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        ClsDropList dlist = new ClsDropList();
        dlist.campo = "x";        
        dlist.selected = true;         
        dlist.descripcion = "Seleccione el Indicador";
        lista.Add(dlist);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarIndicadores '" + strtipo + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                dlist = new ClsDropList();
                dlist.campo = ds.Tables[0].Rows[i]["clave"].ToString();
                //if (i == 0)
                //{ dlist.selected = true; }
                //else { dlist.selected = false; }
                dlist.descripcion = ds.Tables[0].Rows[i]["clave"].ToString() + " - " + ds.Tables[0].Rows[i]["descripcion"].ToString();
                lista.Add(dlist);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            datos = js.Serialize(lista);
        }
        else { datos = "0"; }
        
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Indicador(string strtipo,string cveind,string multi)
    {
        Utilerias lib = new Utilerias();
        string[] result = { "", "","" };
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_EliminarIndicadores '"+strtipo+"','"+ cveind + "','"+multi+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = ds.Tables[0].Rows[0][2].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Perfiles()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarPerfiles 1,20,''");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][1].ToString();
                campo.text = ds.Tables[0].Rows[i][2].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] mostrar_valores_guardados(int idperfil)
    {
        string[] result = { "", "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarDiseñoConsulta " + idperfil);
        if (ds.Tables.Count>0)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = ds.Tables[0].Rows[0][7].ToString();
            result[3] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] cargar_catalogo(string strcat)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet(strcat);
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();                
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][1].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_FiltroProcesos(string idperfil,string condicion,string diseñocondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_Guardar_FiltroProcesos " + idperfil + ",'" + condicion + "','"+diseñocondicion+"'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Contar_detalle(int idperfil)
    {
        string[] result = { "",""};
        Utilerias lib = new Utilerias();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_Consulta_VistaPrevia "+idperfil+",1,20");
        result[0] = ds.Tables[1].Rows[0][0].ToString();        
        ds.Dispose();
        return result;
    }

    public static string DataTableToJsonObj(DataTable dt)
    {
        DataSet ds = new DataSet();
        ds.Merge(dt);
        StringBuilder JsonString = new StringBuilder();
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            JsonString.Append("{\"rows\": [");
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                JsonString.Append("{");
                for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
                {
                    if (j < ds.Tables[0].Columns.Count - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"", "\\\"").Trim() + "\",");
                    }
                    else if (j == ds.Tables[0].Columns.Count - 1)
                    {
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"", "\\\"").Trim() + "\"");
                    }
                }
                if (i == ds.Tables[0].Rows.Count - 1)
                {
                    JsonString.Append("}");
                }
                else
                {
                    JsonString.Append("},");
                }
            }
            JsonString.Append("]}");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Proceso(int idperfil, string tipo,string strcampos,string multi)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_GenerarProceso " + idperfil + ",'" + tipo + "','"+strcampos+"','"+multi+"'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] listar_importacion(string tipo, string multi, string condicion)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarImportacion '" + tipo + "',1,20,'"+condicion+"','" + multi + "'");

        result[0] = ds.Tables[2].Rows[0][0].ToString();
        result[1] = ds.Tables[3].Rows[0][0].ToString();        

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
        if (Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) == 0)
        { result[0] = "0"; }
        else { result[0] = "1"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Catalogo(string strquery, string strvalor, string strtexto)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet(strquery);
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][strvalor].ToString();
                campo.text = ds.Tables[0].Rows[i][strtexto].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }


}