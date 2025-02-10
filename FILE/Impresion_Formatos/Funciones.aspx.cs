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

public partial class FILE_Impresion_Formatos_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

   
    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Listar_Formatos(string idformatos)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    List<ClsGruposUsuarios> lstmod = new List<ClsGruposUsuarios>();
    //    ClsGruposUsuarios mod = new ClsGruposUsuarios();
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_ListarFormatos '" + idformatos + "'");

    //    for (int f = 0; f < ds.Tables[1].Rows.Count; f++)
    //    {
    //        mod = new ClsGruposUsuarios();
    //        mod.Id = Convert.ToInt16(ds.Tables[1].Rows[f]["Id"].ToString());
    //        mod.text = ds.Tables[1].Rows[f]["descripcion"].ToString();
    //        mod.target = ds.Tables[1].Rows[f]["descripcion"].ToString();
    //        mod.clave = Convert.ToInt32(ds.Tables[1].Rows[f]["clave"].ToString());
    //        if (Convert.ToInt32(ds.Tables[1].Rows[f]["estado"].ToString()) == 1)
    //        { mod.state = "opened"; }     
    //        mod.IdPadre = ds.Tables[1].Rows[f]["IdPadre"] != DBNull.Value ? Convert.ToInt32(ds.Tables[1].Rows[f]["IdPadre"].ToString()) : (int?)null;
    //        lstmod.Add(mod);
    //    }
    //    List<ClsGruposUsuarios> modtree = GetModuloTree(lstmod, 0);
    //    result[0] = js.Serialize(modtree);
    //    result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Reportes(string idusuario)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarReportesPermisos " + idusuario);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.text = ds.Tables[0].Rows[i]["nombre"].ToString();
            menu.target = ds.Tables[0].Rows[i]["nomreporte"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> modtree = GetModuloTree(lstmenu, 0);
            result[0] = js.Serialize(modtree);
        return result;
    }

    private static List<ClsPermisosMenus> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            target = x.target,
            clave = x.clave,
            IdPadre = x.IdPadre,          
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Formato(string strmov, string strvalores, string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_GuardarFormato '" + strmov + "','" + strvalores + "','" + strcondicion + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

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

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarTablasSistema");
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
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas(Int64 id, string alias)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ListarColumasTablas '" + id + "'");
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
    public static string[] Guardar_Filtros(string strmov, int idperfil, string distablas, string discampos, string strfrom, string strrelaciones, string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_GuardarDiseñoFiltro '" + strmov + "'," + idperfil + ",'''" + distablas + "''','''" + discampos + "''','''" + strfrom.TrimEnd() + "''','''''','''" + strrelaciones.TrimEnd() + "''','" + strcondicion + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] mostrar_valores_guardados(int idperfil)
    {
        string[] result = { "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_MostrarDiseñoFiltro " + idperfil);
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
    public static string[] Listar_Datos_Pagos(string tipopago)
    {
        string[] result = { "", "", ""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_Listar_DatosPagos '" + tipopago+"'");
        if (ds.Tables[0].Rows.Count>0)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);     
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Datos_Quincenas()
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        List<ClsGruposUsuarios> lstmod = new List<ClsGruposUsuarios>();
        JavaScriptSerializer js = new JavaScriptSerializer();
        ClsGruposUsuarios mod = new ClsGruposUsuarios();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Impresion_Listar_Quincenas");
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int f = 0; f < ds.Tables[0].Rows.Count; f++)
            {
                mod = new ClsGruposUsuarios();
                mod.Id = f;
                mod.text = ds.Tables[0].Rows[f]["qna"].ToString();                                                      
                lstmod.Add(mod);
            }
            result[0] = "1"; 
            result[1] = js.Serialize(lstmod);
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

}