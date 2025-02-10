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

public partial class FILE_UsusariosyPermisos_AdministracionDeUsuarios : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}
        //else
        //{
        //    //ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Validacion(" + objusuario.Id + ");", true);           
        //}
        // ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Validacion(1);", true);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Movimientos_Usuarios(string strvalores,string strmov)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistemas_GuardarUsuarios '" + strvalores + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            if (strmov == "Eliminar")
            {
                if (ds.Tables[0].Rows[0][0].ToString() == "0")
                { result[0] = "0"; result[1] = "El Registro se ha eliminado con exito"; }
                else
                { result[0] = "1"; result[1] = "Error al aliminar el registro " + ds.Tables[0].Rows[0][1].ToString(); }
            }
            else
            {
                if (ds.Tables[0].Rows[0][0].ToString() == "0")
                { result[0] = "0"; result[1] = "El Registro se ha guardado con exito"; }
                else { result[0] = "1"; result[1] = "Error al guardar el registro " + ds.Tables[0].Rows[0][1].ToString(); }
            }
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Grupos()
    {
        string datos = "";
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lstcat = new List<ClsCatalogos>();

        ClsCatalogos campo = new ClsCatalogos();
        campo.valor = "x";
        campo.descripcion = "Seleccione una Opción";
        campo.selected = true;
        lstcat.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Usuarios_Listar_Grupos ");
        if (ds.Tables.Count > 0)
        {
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    campo = new ClsCatalogos();
                    campo.valor = ds.Tables[0].Rows[i][0].ToString();
                    campo.descripcion = ds.Tables[0].Rows[i][1].ToString();
                    campo.selected = false;
                    lstcat.Add(campo);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                datos = js.Serialize(lstcat);
            }
            else { datos = ""; }
        }
        return datos;
    }

    public static string DataTableToJsonObj(DataTable dt)
    {
        DataSet ds = new DataSet();
        ds.Merge(dt);
        StringBuilder JsonString = new StringBuilder();
        if (ds != null && ds.Tables[0].Rows.Count > 0)
        {
            JsonString.Append("[");
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
            JsonString.Append("]");
            return JsonString.ToString();
        }
        else
        {
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_GruposUsuarios(string strfiltro)
    {
        string[] result = { ""};
        List<ClsGruposUsuarios> lstmod = new List<ClsGruposUsuarios>();
       Utilerias lib = new Utilerias();
       ClsGruposUsuarios mod = new ClsGruposUsuarios();
       JavaScriptSerializer js = new JavaScriptSerializer();

       DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Usuarios_Listar_Usuarios '" + strfiltro + "'");
       if (ds.Tables.Count > 0)
       {           
           for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
           {
               mod = new ClsGruposUsuarios();
               mod.Id = Convert.ToInt16(ds.Tables[0].Rows[i]["Id"].ToString());
               mod.text = ds.Tables[0].Rows[i]["Descripcion"].ToString();
               mod.target = ds.Tables[0].Rows[i]["Usuario"].ToString();
               mod.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["clave"].ToString());
               if (Convert.ToInt32(ds.Tables[0].Rows[i]["estado"].ToString()) == 1)
               { mod.state = "opened"; }     
               mod.IdPadre = ds.Tables[0].Rows[i]["IdPadre"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["IdPadre"].ToString()) : (int?)null;
               lstmod.Add(mod);
           }                        
       }
        ds.Dispose();
       List<ClsGruposUsuarios> modtree = GetModuloTree(lstmod, 0);
       result[0]= js.Serialize(modtree);
      
       return result;
    }

    private static List<ClsGruposUsuarios> GetModuloTree(List<ClsGruposUsuarios> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsGruposUsuarios()
        {
            Id = x.Id,
            text = x.text,
            target = x.target,
            clave=x.clave,
            IdPadre = x.IdPadre,
            state = x.state,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ConsultarUsuario(DataTable tabla)
    {
        List<String> r = new List<string>();                
        for (int i = 0; i < tabla.Rows.Count; i++)
        {
            for (int c = 0; c < tabla.Columns.Count; c++)
            {
                r.Add(tabla.Rows[i][c].ToString());
            }
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        return js.Serialize(r);
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Usuarios(string fkusuario)
    {
        string[] result = { ""};        
        Utilerias lib = new Utilerias();       
        JavaScriptSerializer js = new JavaScriptSerializer();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Usuarios_Listar_Usuarios " + fkusuario);
        if (ds.Tables.Count > 0)
        {
            result[0] = new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]);
        }                
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Usuario(string id, string usuario, string contraseña, string appaterno, string apmaterno, string nombres, string correo, string vigenciaini, string vigenciafin, int idgrupo, Boolean activo, Boolean esadmin, Boolean conexterna)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Usuarios_Guardar_Usuarios " + id + ",'" + usuario + "','" + contraseña + "','" + appaterno.ToUpper() + "','" + apmaterno.ToUpper() + "','" + nombres.ToUpper() + "','" + correo + "','" + vigenciaini + "','" + vigenciafin + "'," + activo + "," + idgrupo + "," + esadmin + "," + conexterna);
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Roles_Usuarios(string idusuario, string fkrolmenu, string fkrolmov,string fkrolrep,string fkrolter,string fkrolfil,string fkrolpe)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();      
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosYRoles_Guardar_Roles_Usuario " + idusuario + ",'" + fkrolmenu + "','" + fkrolmov + "','"+fkrolrep+"','"+fkrolter+"','"+fkrolfil+"','"+fkrolpe+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Roles_Usuarios(string idusuario, string tipopermiso, string fkroles)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosYRoles_Eliminar_Roles_Usuario " + idusuario + ",'" + tipopermiso + "','" + fkroles + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_de_Roles(string tiporol,int idusuario)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosYRoles_Listar_Roles '" + tiporol + "'," + idusuario);
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.clave = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["descripcion"].ToString();                
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["estatus"].ToString());
                lstmenu.Add(menu);
            }           
            result[0] = js.Serialize(lstmenu);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        }
        return result;    
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Menus()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Menus");
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
            List<ClsPermisosMenus> menutree = GetMenuTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
        }
        return result;
    }

    private static List<ClsPermisosMenus> GetMenuTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            IdPadre = x.IdPadre,
            target = x.target,
            visible = x.visible,
            children = GetMenuTree(list, x.Id)
        }).ToList();
    }

    //private static List<clsModulos> GetModuloTree(List<clsModulos> list, int? IdPadre)
    //{
    //    return list.Where(x => x.IdPadre == IdPadre).Select(x => new clsModulos()
    //    {
    //        Id = x.Id,
    //        text = x.text,
    //        clave = x.clave,
    //        IdPadre = x.IdPadre,
    //        state = x.state,
    //        children = GetModuloTree(list, x.Id)
    //    }).ToList();
    //}

    private static List<ClsPermisosMenus> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            nombre = x.nombre,
            IdPadre = x.IdPadre,
            visible = x.visible,
            children = GetModuloTree(list, x.Id)
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

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Movimientos '" + strtipo + "'");
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
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);          
        }
        return result;
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
    //        mod.text = ds.Tables[0].Rows[f]["Nombre"].ToString().Trim();
    //        mod.clave = ds.Tables[0].Rows[f]["Id"].ToString();
    //        if (Convert.ToInt32(ds.Tables[0].Rows[f]["Visible"]) == 1)
    //        { mod.state = "closed"; }
    //        mod.IdPadre = ds.Tables[0].Rows[f]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[f]["Propietario"].ToString()) : (int?)null;
    //        lstmod.Add(mod);
    //    }
    //    List<clsModulos> modtree = GetModuloTree(lstmod, 0);
    //    result[0] = js.Serialize(modtree);

    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Reportes(string idformatos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Reportes ");

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.text = ds.Tables[0].Rows[i]["Descripcion"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> menutree = GetMenuTree(lstmenu, 0);
        result[0] = js.Serialize(menutree);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
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

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Terceros ");
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
            ds.Dispose();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Permisos_Individuales(string idusuario, string fkmenu, string fkmovmp, string fkmovmc, string fkmovdp, string fkmovil, string fkmovrf, string fkrep, string fkter, string fkpermisoscatalogos, string fkpermisosxls, string fkpermisospe, string fkpermisosconsultas,string fkpermisosplazas)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Guardar_Permisos " + idusuario + ",'" + fkmenu + "','" + fkmovmp + "','" + fkmovmc + "','" + fkmovdp + "','" + fkmovil + "','"+fkmovrf+"','" + fkrep + "','" + fkter + "','" + fkpermisoscatalogos+"','"+fkpermisosxls+"','"+fkpermisospe+"','"+fkpermisosconsultas+"','"+fkpermisosplazas+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Permisos_Individuales(string idusuario, string tipopermiso, string fkpermisos)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Eliminar_Permisos " + idusuario + ",'" + tipopermiso + "','" + fkpermisos+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_de_Permisos_Individuales(string tiporol, int idusuario)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Listar_Permisos " + idusuario+ ",'" + tiporol + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Catalogos_Individuales(string tipo, int idusuario, string fkpermisoscatalogos)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Eliminar_Catalogos '" + tipo + "'," + idusuario + ",'" + fkpermisoscatalogos + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = ds.Tables[0].Rows[0][2].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_Consultas_Individuales(string tipo,int idusuario, string fkpermisosconsultas)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Eliminar_Consultas '" + tipo + "',"+idusuario+",'" + fkpermisosconsultas + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        //result[2] = ds.Tables[0].Rows[0][2].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Elininar_CreacionPLA_Individuales(string tipo, int idusuario, string fkpermisoscreacionpla)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_PermisosInd_Eliminar_CreacionPla '" + tipo + "'," + idusuario + ",'" + fkpermisoscreacionpla + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        //result[2] = ds.Tables[0].Rows[0][2].ToString();
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_ProcesosEspeciales()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Procesos_Especiales");
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
            ds.Dispose();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Catalogos(int idusuario)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Catalogos " + idusuario + ",'I'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
       // result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Consultas(int idusuario)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Botones_CreacionDePlaza " + idusuario + ",'I'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_CreacionPlazas(int idusuario)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Sistema_Listar_Botones_CreacionDePlaza " + idusuario + ",'I'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        ds.Dispose();
        return result;
    }


}