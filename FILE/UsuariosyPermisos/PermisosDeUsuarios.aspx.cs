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


public partial class FILE_UsuariosyPermisos_PermisosDeUsuarios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_de_Roles(string tiporol,int idusuario)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarRoles '" + tiporol + "'," + idusuario);
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                if (tiporol=="fil"){                    
                    menu.nombre = ds.Tables[0].Rows[i]["filtro"].ToString();                    
                }                
                menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["descripcion"].ToString();                
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["estatus"].ToString());                
                lstmenu.Add(menu);
            }           
            result[0] = js.Serialize(lstmenu);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Menus()
    {
        string[] result = { ""};
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMenus");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["nombre"].ToString();                
                menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);            
            result[0]=js.Serialize(menutree);
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
            target=x.target,
            visible=x.visible,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] ListarMovimintos(string strtipo)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    List<clsModulos> lstmod = new List<clsModulos>();
    //    clsModulos mod = new clsModulos();
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMovimientos '" + strtipo + "'");

    //    for (int f = 0; f < ds.Tables[0].Rows.Count; f++)
    //    {
    //        mod = new clsModulos();
    //        mod.Id = Convert.ToInt32(ds.Tables[0].Rows[f]["Id"].ToString());
    //        mod.text = ds.Tables[0].Rows[f]["nombre"].ToString().Trim();
    //        mod.clave = ds.Tables[0].Rows[f]["Id"].ToString();
    //        //if (Convert.ToInt32(ds.Tables[0].Rows[f]["estado"]) == 1)
    //        mod.state = "closed"; 
    //        mod.IdPadre = ds.Tables[0].Rows[f]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[f]["Propietario"].ToString()) : (int?)null;
    //        lstmod.Add(mod);
    //    }
    //    List<clsModulos> modtree = GetModuloTree(lstmod, 0);
    //    result[0] = js.Serialize(modtree);

    //    return result;
    //}

    private static List<ClsPermisosMenus> GetMovTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            nombre = x.nombre,
            IdPadre = x.IdPadre,
            visible = x.visible,
            children = GetMovTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Movimientos(string strtipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMovimientos '" + strtipo + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
                menu.text = ds.Tables[0].Rows[i]["Nombre"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetMovTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
        }
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarMovimintos_Asignados(int idroll, string strclave)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Listar_Movimientos_Asignados "+ idroll + ",'" + strclave + "'");

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
            menu.text = ds.Tables[0].Rows[i]["Nombre"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> modtree = GetMovTree(lstmenu, 0);
        result[0] = js.Serialize(modtree);

        return result;
    }

    //private static List<clsModulos> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    //{
    //    return list.Where(x => x.IdPadre == IdPadre).Select(x => new clsModulos()
    //    {
    //        Id = x.Id,
    //        text = x.text,
    //        //clave = x.clave,
    //        IdPadre = x.IdPadre,
    //        state = x.state,
    //        children = GetModuloTree(list, x.Id)
    //    }).ToList();
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarIndicadores()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        List<clsModulos> lstmod = new List<clsModulos>();
        clsModulos mod = new clsModulos();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_Indicadores");

        for (int f = 0; f < ds.Tables[0].Rows.Count; f++)
        {
            mod = new clsModulos();
            mod.clave =ds.Tables[0].Rows[f][0].ToString();
            mod.text = ds.Tables[0].Rows[f][1].ToString().Trim();            
            lstmod.Add(mod);
        }       
        result[0] = js.Serialize(lstmod);

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosMenus(string id, string descripcion, Boolean activo, string fkpermisosmenus,string fkpermisoscatalogos,string fkpermisosconsultas, string fkpermisosplazas)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesMenus_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkpermisosmenus + "','"+fkpermisoscatalogos+"','"+fkpermisosconsultas+"','"+fkpermisosplazas+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosMov(string id, string descripcion, Boolean activo,string fkmovimiento, string fkmovPersonales, string fkmovConceptos, string fkmovDatPer,string fkmovRefFam,string fkmovIncLab, string movind)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesMovimientos_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkmovimiento+"','" + fkmovPersonales + "','" + fkmovConceptos + "','" + fkmovDatPer+"','"+fkmovRefFam +"','"+fkmovIncLab + "','" + movind + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosProEsp(string id, string descripcion, Boolean activo, string fkperxls, string fkperproesp)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesProEsp_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkperxls + "','" + fkperproesp + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_PermisosMenus(string idroll, string tipopermisos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarPermisosPorRoles " + idroll + ",'" + tipopermisos + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        if ((tipopermisos == "M") || (tipopermisos == "PE"))
        { result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]); }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Reportes(string idformatos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarReportes ");

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.text = ds.Tables[0].Rows[i]["Descripcion"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
        result[0] = js.Serialize(menutree);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

        //for (int f = 0; f < ds.Tables[0].Rows.Count; f++)
        //{
        //    mod = new ClsGruposUsuarios();
        //    mod.Id = Convert.ToInt16(ds.Tables[0].Rows[f]["Id"].ToString());
        //    mod.text = ds.Tables[0].Rows[f]["descripcion"].ToString();
        //    mod.target = ds.Tables[0].Rows[f]["descripcion"].ToString();
        //    mod.clave = Convert.ToInt32(ds.Tables[0].Rows[f]["Id"].ToString());
        //    if (Convert.ToInt32(ds.Tables[0].Rows[f]["estado"].ToString()) == 1)
        //    { mod.state = "opened"; }
        //    mod.IdPadre = ds.Tables[0].Rows[f]["IdPadre"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[f]["IdPadre"].ToString()) : (int?)null;
        //    lstmod.Add(mod);
        //}
        //List<ClsGruposUsuarios> modtree = GetModuloTree(lstmod, 0);
        //result[0] = js.Serialize(modtree);
        //result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

        return result;
    }

    private static List<ClsGruposUsuarios> GetModuloTree(List<ClsGruposUsuarios> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsGruposUsuarios()
        {
            Id = x.Id,
            text = x.text,           
            clave = x.clave,
            IdPadre = x.IdPadre,
            state = x.state,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosReportes(string id, string descripcion, Boolean activo, string fkpermisosrep)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesReportes_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkpermisosrep + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosTerceros(string id, string descripcion, Boolean activo, string fkpermisoster)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesTerceros_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkpermisoster + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_Terceros()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarTerceros ");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["cveter"].ToString());
                menu.text = ds.Tables[0].Rows[i]["dester"].ToString();
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["activo"].ToString());
                lstmenu.Add(menu);
            }
            result[0] = js.Serialize(lstmenu);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Roles(string tipo, int idrol)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesMovimientos_Eliminar '" + tipo + "'," + idrol);
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Permisos(string modulo,string tipo, int idrol, string permisos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesMovimientos_Asignacion_Eliminar '"+modulo+"','" + tipo + "'," + idrol + ",'" + permisos + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Permisos_Catalogos(string tipo, int idrol, string fkpermisoscatalogos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesCatalogos_Asignacion_Eliminar '" + tipo + "'," + idrol + ",'" + fkpermisoscatalogos + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Permisos_Consultas(string tipo,string fkpermisosconsultas)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesConsultas_Asignacion_Eliminar '" + tipo + "',0,'" + fkpermisosconsultas + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Permisos_CreacionPLA(string tipo, int idusuario, string fkpermisoscreacionpla)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesCreacionPla_Asignacion_Eliminar '" + tipo + "'," + idusuario + ",'" + fkpermisoscreacionpla + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        //result[2] = ds.Tables[0].Rows[0][2].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_PermisosFiltros(string id, string descripcion, Boolean activo, string fkpermisosfil)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_RolesFiltros_Guardar " + id + ",'" + descripcion.ToUpper() + "'," + activo + ",'" + fkpermisosfil + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_ProcesosEspeciales()
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarProcesosEspeciales");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i][0].ToString());
                menu.text = ds.Tables[0].Rows[i][1].ToString();
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i][2].ToString());
                lstmenu.Add(menu);
            }
            result[0] = js.Serialize(lstmenu);

            lstmenu = new List<ClsPermisosMenus>();
            for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.clave = Convert.ToInt32(ds.Tables[1].Rows[i][0].ToString());
                menu.text = ds.Tables[1].Rows[i][1].ToString();
                menu.visible = Convert.ToBoolean(ds.Tables[1].Rows[i][2].ToString());
                lstmenu.Add(menu);
            }
            result[1] = js.Serialize(lstmenu);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_CreacionPlazas(int idusuario)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarCreacionPlaza " + idusuario + ",'R'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }


  
}