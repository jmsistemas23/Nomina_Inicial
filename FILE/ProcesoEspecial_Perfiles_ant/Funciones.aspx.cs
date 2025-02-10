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


public partial class FILE_ProcesoEspecial_Perfiles_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Perfil(string strmov,string strvalores,string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_GuardarPerfiles '"+ strmov+"','"+ strvalores + "','"+strcondicion+"'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Listar_Tablas_Sistema()
    //{
    //    string[] result = { "" };
    //    Utilerias lib = new Utilerias();
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
    //    ClsPermisosMenus menu = new ClsPermisosMenus();

    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarTablasSistema");
    //    if (ds.Tables.Count > 0)
    //    {
    //        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
    //        {
    //            menu = new ClsPermisosMenus();
    //            menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
    //            menu.text = ds.Tables[0].Rows[i]["descripcion"].ToString();               
    //            lstmenu.Add(menu);
    //        }
    //        result[0] = js.Serialize(lstmenu);
    //    }
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas(Int64 id,string alias)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarColumasTablas '"+id+"'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = alias;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

   

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Seleccion_Tablas(string strmov, int idperfil, string distablas, string discampos, string strcampos, string strfrom, string strrelaciones, string strprocesos, string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_GuardarDiseñoPerfil '" + strmov + "'," + idperfil + ",'''" + distablas + "''','''" + discampos + "''','''" + strcampos.TrimEnd() + "''','''" + strfrom.TrimEnd() + "''','''''','''" + strrelaciones.TrimEnd() + "''','''" + strprocesos + "''','" + strcondicion + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] mostrar_valores_guardados(int idperfil)
    {
        string[] result = { "", "","" ,"","","","",""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_MostrarValoresdiseño " + idperfil);
        if (ds.Tables[0].Rows[0][0].ToString() == "1")
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[1].Rows[0][1].ToString();
            result[2] = ds.Tables[1].Rows[0][2].ToString();
            result[3] = ds.Tables[1].Rows[0][3].ToString();
            result[4] = ds.Tables[1].Rows[0][4].ToString();
            result[5] = ds.Tables[1].Rows[0][5].ToString();
            result[6] = ds.Tables[1].Rows[0][6].ToString();
            result[7] = ds.Tables[1].Rows[0][7].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Tablas_Consulta()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarTablasSistema 1,20,''");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new ClsCampos();
            campo.Id = i;
            campo.name = ds.Tables[0].Rows[i][0].ToString();
            campo.text = ds.Tables[0].Rows[i][1].ToString();
            lstcampo.Add(campo);
        }
        result[0] = js.Serialize(lstcampo);
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Columnas_NombreTabla(string tabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarColumasTablas '" + tabla + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][1].ToString();
                campo.text = ds.Tables[0].Rows[i][1].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Relaciones(string tablasseleccionadas)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        string tablas = tablasseleccionadas.Replace("''", "");
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_RelacionTablas '" + tablas.Trim() + "'");
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
    public static string[] Listar_Tablas_Sistema()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarTablasSistema");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {                
                menu = new ClsPermisosMenus();
                menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["descripcion"].ToString();
                lstmenu.Add(menu);
            }
            result[0] = js.Serialize(lstmenu);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas(string strtabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarColumasTablas '" + strtabla + "'");
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
    public static string[] Guardar_Consulta(int idperfil, string consulta, string relaciones, string condicion, string orden, string tablas, string columnas, string configuracion, string condiciones)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_GuardarDiseñoConsulta " + idperfil + ",'" + consulta + "','" + relaciones + "','" + condicion + "','" + orden + "','" + tablas + "','" + columnas + "','" + configuracion + "','" + condiciones + "','Consulta'");
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
    public static string[] Guardar_Proceso(int idperfil, string proceso)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_GuardarDiseñoConsulta " + idperfil + ",'" + proceso + "','','','','','','','','Proceso'");
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
    public static string[] Listar_ConfiguracionConsulta(int idperfil)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarDiseñoConsulta " + idperfil);
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            //result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
        }
        else { result[0] = ""; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Proceso(int idperfil,string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_EliminarDiseñoConsulta " + idperfil);
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