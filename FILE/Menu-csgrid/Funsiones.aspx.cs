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
using System.Text.RegularExpressions;

public partial class FILE_Sistema_Funsiones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Menus_Accesos(int fkusuario)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMenuAccesos " + fkusuario);
        if (ds.Tables.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CARGAR_MENU(int fkusuario)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<Menu> lstmenu = new List<Menu>();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMenuPermisos " + fkusuario);
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                Menu menu = new Menu();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.Nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
                menu.Url = ds.Tables[0].Rows[i]["url"].ToString();
                menu.UrlImagen = ds.Tables[0].Rows[i]["urlimagen"].ToString();
                menu.NombreTab = ds.Tables[0].Rows[i]["NombreTab"].ToString();
                menu.Propietario = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"].ToString()) : (int?)null;
                menu.Visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"]);
                lstmenu.Add(menu);
            }
            List<Menu> menutree = GetMenuTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
        }
        return result;
    }

    private static List<Menu> GetMenuTree(List<Menu> list, int? propietario)
    {
        return list.Where(x => x.Propietario == propietario).Select(x => new Menu()
        {
            Id = x.Id,
            Nombre = x.Nombre,
            Url = x.Url,
            UrlImagen = x.UrlImagen,
            NombreTab = x.NombreTab,
            Propietario = x.Propietario,
            Visible = x.Visible,
            List = GetMenuTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Datos_Quincena()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ActualizaEtiqueta ");

        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //result[1] = ds.Tables[0].Rows[0][1].ToString();
            //result[2] = ds.Tables[1].Rows[0][0].ToString();
        }
        else { result[0] = "Nomina Cerrada"; }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_PermisosMenus(int fkusuario)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMenuPermisos " + fkusuario);
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["nombre"].ToString();
                menu.nombre = ds.Tables[0].Rows[i]["nombretab"].ToString();
                menu.url = ds.Tables[0].Rows[i]["url"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetPermisosTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        }
        return result;
    }
    private static List<ClsPermisosMenus> GetPermisosTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            nombre = x.nombre,
            IdPadre = x.IdPadre,
            url = x.url,
            visible = x.visible,
            children = GetPermisosTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Accesos_Usuarios(string idusuario, string fkaccesos)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Guardar_Menu_AccesosDirectos " + idusuario + ",'" + fkaccesos + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);

        ds.Dispose();
        return result;
    }

}