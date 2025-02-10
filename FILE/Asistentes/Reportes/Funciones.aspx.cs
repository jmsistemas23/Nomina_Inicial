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

public partial class FILE_Asistentes_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Reportes()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarReportes");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["Descripcion"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        return result;
    }

    private static List<ClsPermisosMenus> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            IdPadre = x.IdPadre,
            visible = x.visible,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Reporte(string propietario, string id, string descripcion, string nomreporte, string orden, string visible)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Guardar_Reporte '" + propietario + "','" + id + "','" + descripcion + "','" + nomreporte + "','" + orden + "','" + visible + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Reporte(string id)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Eliminar_Reporte '" + id + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
}