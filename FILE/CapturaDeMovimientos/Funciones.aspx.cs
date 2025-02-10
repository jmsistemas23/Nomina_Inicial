using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI.WebControls;

public partial class FILE_CapturaDeMovimientos_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

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
                        string des = "";
                        if (ds.Tables[0].Rows[i][j].ToString().Contains('"') == true)
                        {
                            des = ds.Tables[0].Rows[i][j].ToString().Replace('"', ' ');
                        }
                        else { des = ds.Tables[0].Rows[i][j].ToString(); }

                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + des + "\",");
                    }
                    else if (j == ds.Tables[0].Columns.Count - 1)
                    {
                        string des = "";
                        if (ds.Tables[0].Rows[i][j].ToString().Contains('"') == true)
                        {
                            des = ds.Tables[0].Rows[i][j].ToString().Replace('"', ' ');
                        }
                        else { des = ds.Tables[0].Rows[i][j].ToString(); }

                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + des + "\"");
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


    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] ListarMovimientos(string strtipo, string strclave)
    //{
    //    string[] result = { "", ""};
    //    Utilerias lib = new Utilerias();
    //    List<clsModulos> lstmod = new List<clsModulos>();
    //    clsModulos mod = new clsModulos();
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_Listar_Movimientos '"+strtipo+"','"+strclave+"'");

    //    for (int f = 0; f < ds.Tables[0].Rows.Count; f++)
    //    {
    //        mod = new clsModulos();
    //        mod.Id = Convert.ToInt32(ds.Tables[0].Rows[f]["Id"].ToString());
    //        mod.text = ds.Tables[0].Rows[f]["Descripcion"].ToString().Trim();
    //        mod.clave = ds.Tables[0].Rows[f]["clave"].ToString();
    //        if (Convert.ToInt32(ds.Tables[0].Rows[f]["estado"]) == 1)
    //        { mod.state = "closed"; }
    //        mod.IdPadre = ds.Tables[0].Rows[f]["IdPadre"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[f]["IdPadre"].ToString()) : (int?)null;
    //        lstmod.Add(mod);
    //    }
    //    List<clsModulos> modtree = GetModuloTree(lstmod, 0);
    //    result[0] = js.Serialize(modtree);

    //    return result;
    //}

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
    public static string[] Listar_MovimientosPermisos(string strtipo, string strclave)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int usuid = 1;// objusuario .Id;
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

      DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMovimientosPermisos " + usuid+ ",'" + strtipo + "','" + strclave + "'");
        
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
                menu.text = ds.Tables[0].Rows[i]["Id"].ToString()+"-"+ds.Tables[0].Rows[i]["Nombre"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
            result[0] = "1";
            result[1] = js.Serialize(menutree);
        }
        else { result[0] = "0"; }
        return result;
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
        if (ds.Tables[0].Rows.Count > 0)
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
            result[0] = "1";
            result[1] = js.Serialize(menutree);
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BuscarMovimiento(string modulo, string movimiento)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_Listar_Movimientos '" + modulo + "','" + movimiento + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                result[0] = ds.Tables[0].Rows[i]["clave"].ToString();
                result[1] = ds.Tables[0].Rows[i]["descripcion"].ToString();
            }
        }
        else
        {
            result[0] = "0";
            result[1] = "No existe diseño de captura del movimiento - " + movimiento;
        }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string LlenarDropList(string strtipo,string strtipobusqueda)
    {
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Campos_Busqueda '"+strtipo+"','"+strtipobusqueda+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            ClsDropList dlist = new ClsDropList();
            dlist.campo = ds.Tables[0].Rows[i]["campo"].ToString();
            if (i == 0)
            { dlist.selected = true; }
            else { dlist.selected = false; }
            dlist.descripcion = ds.Tables[0].Rows[i]["Descripcioncampo"].ToString();
            //dlist.qry = ds.Tables[0].Rows[i]["qry"].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarEmpleados(string strcampo, string strcondicion, string strmodulo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        //DataTable dt = lib.ejecutarConsultaEnDataTable("GESRH_SPT_Listar_Empleados '"+strcondicion+"','" + strmodulo + "','" + strcampo + "'");
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Captura_ListarEmpleados '" + strcondicion + "','" + strmodulo + "','" + strcampo + "','Empleado'");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }


    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] modificarCaptura(string strtipo,string strmov, string strdocumento)
    //{
    //    string[] result = { "", "","","","" };
    //    Utilerias lib = new Utilerias();
    //    List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ListarCampos_ModificarCaptura '" + strtipo + "','" +strmov + "','" + strdocumento + "'");
    //    if (ds.Tables[0].Rows[0][0].ToString() == "0")
    //    {
    //        result[0] = "0";
    //        for (int t = 1; t < ds.Tables.Count - 1; t++)
    //        {
    //            lista = new List<ClsCamposCaptura>();
    //                for (int i = 0; i < ds.Tables[t].Rows.Count; i++)
    //                {
    //                    ClsCamposCaptura dlist = new ClsCamposCaptura();
    //                    dlist.Movimiento = ds.Tables[t].Rows[i]["movimiento"].ToString();
    //                    dlist.Campo = ds.Tables[t].Rows[i]["campo"].ToString();
    //                    dlist.Sololectura = Convert.ToInt16(ds.Tables[t].Rows[i]["Sololectura"]);
    //                    dlist.Descripcion = ds.Tables[t].Rows[i]["descripcioncampo"].ToString();
    //                    dlist.Orden = ds.Tables[t].Rows[i]["orden"].ToString();
    //                    dlist.TipoDato = ds.Tables[t].Rows[i]["tipodato"].ToString();
    //                    dlist.Tamaño = ds.Tables[t].Rows[i]["tamaño"].ToString();
    //                    dlist.Longitud = ds.Tables[1].Rows[i]["longitud"].ToString();
    //                    dlist.CatalogoSeleccion = ds.Tables[t].Rows[i]["catalogoseleccion"].ToString();
    //                    dlist.CatalogoValor = ds.Tables[t].Rows[i]["catalogoseleccionvalor"].ToString();
    //                    dlist.CatalogoTexto = ds.Tables[t].Rows[i]["catalogoselecciontexto"].ToString();
    //                    dlist.CatalogoFiltro = ds.Tables[t].Rows[i]["catalogoseleccionfiltro"].ToString();
    //                    dlist.CamposRelacion = ds.Tables[t].Rows[i]["CampoRelacion"].ToString();
    //                    dlist.CamposFiltros = ds.Tables[t].Rows[i]["Campofiltro"].ToString();
    //                    dlist.HabilitarBusqueda = Convert.ToInt16(ds.Tables[t].Rows[i]["habilitarbusqueda"]);
    //                    dlist.CampoDescriptivo = ds.Tables[t].Rows[i]["CampoDescriptivo"].ToString();
    //                    dlist.CampoOrigen = Convert.ToBoolean(ds.Tables[t].Rows[i]["CampoOrigen"].ToString());
    //                    dlist.ConsultaBusqueda_Tabla = ds.Tables[t].Rows[i]["ConsultaBusqueda_Tabla"].ToString();
    //                    dlist.ConsultaBusqueda_Columnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_Columnas"].ToString();
    //                    dlist.ConsultaBusqueda_AliasColumnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_AliasColumnas"].ToString();
    //                    dlist.ConsultaBusqueda_Condicion = ds.Tables[t].Rows[i]["ConsultaBusqueda_Condicion"].ToString();
    //                    dlist.ConsultaBusqueda_Orden = ds.Tables[t].Rows[i]["ConsultaBusqueda_Orden"].ToString();
    //                    dlist.ConsultaBusqueda_LongColumnas = ds.Tables[t].Rows[i]["consultaBusqueda_LongitudColumnas"].ToString();                        
    //                    lista.Add(dlist);
    //                }
    //                JavaScriptSerializer js = new JavaScriptSerializer();
    //                result[t] = js.Serialize(lista);             
    //        }
    //        if (ds.Tables[4].Rows.Count > 0)
    //        {
    //            result[4] = DataTableToJsonObj(ds.Tables[4]); 
    //        }
    //        else { result[4] = "0"; }
    //    }
    //    else { result[0] = ds.Tables[0].Rows[0][0].ToString(); result[1] = ds.Tables[0].Rows[0][1].ToString(); }

    //    return result;
    //}
    

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposNuevaCaptura(string modulo, string movimiento,string documento,string multi)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ListarCampos_NuevaCaptura '" + modulo + "','" + movimiento + "','" + documento + "','"+multi+"'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {
            result[0] = "0";
            for (int t = 1; t < ds.Tables.Count ; t++)
            {
                lista = new List<ClsCamposCaptura>();
                for (int i = 0; i < ds.Tables[t].Rows.Count; i++)
                {
                    ClsCamposCaptura dlist = new ClsCamposCaptura();
                    dlist.Movimiento = ds.Tables[t].Rows[i]["movimiento"].ToString();
                    dlist.Campo = ds.Tables[t].Rows[i]["campo"].ToString();
                    dlist.Sololectura = Convert.ToInt16(ds.Tables[t].Rows[i]["Sololectura"]);
                    dlist.ValidaNulos = Convert.ToInt16(ds.Tables[t].Rows[i]["validaNulo"]);
                    dlist.ValidaLongitud = Convert.ToInt16(ds.Tables[t].Rows[i]["validalongitud"]);
                    dlist.Descripcion = ds.Tables[t].Rows[i]["descripcioncampo"].ToString();
                    dlist.Orden = ds.Tables[t].Rows[i]["orden"].ToString();
                    dlist.TipoDato = ds.Tables[t].Rows[i]["tipodato"].ToString();
                    dlist.Tamaño = ds.Tables[t].Rows[i]["tamaño"].ToString();
                    dlist.Longitud = ds.Tables[1].Rows[i]["longitud"].ToString();
                    dlist.CatalogoSeleccion = ds.Tables[t].Rows[i]["catalogoseleccion"].ToString();
                    dlist.CatalogoValor = ds.Tables[t].Rows[i]["catalogoseleccionvalor"].ToString();
                    dlist.CatalogoTexto = ds.Tables[t].Rows[i]["catalogoselecciontexto"].ToString();
                    dlist.CatalogoFiltro = ds.Tables[t].Rows[i]["catalogoseleccionfiltro"].ToString();
                    dlist.CamposRelacion = ds.Tables[t].Rows[i]["CampoRelacion"].ToString();
                    dlist.CamposFiltros = ds.Tables[t].Rows[i]["Campofiltro"].ToString();
                    dlist.HabilitarBusqueda = Convert.ToInt16(ds.Tables[t].Rows[i]["habilitarbusqueda"]);
                    dlist.CampoDescriptivo = ds.Tables[t].Rows[i]["CampoDescriptivo"].ToString();
                    dlist.CampoOrigen = Convert.ToBoolean(ds.Tables[t].Rows[i]["CampoOrigen"].ToString());
                    dlist.ConsultaBusqueda_Tabla = ds.Tables[t].Rows[i]["ConsultaBusqueda_Tabla"].ToString();
                    dlist.ConsultaBusqueda_Columnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_Columnas"].ToString();
                    dlist.ConsultaBusqueda_AliasColumnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_AliasColumnas"].ToString();
                    dlist.ConsultaBusqueda_CamposCaptura_Oculto = ds.Tables[t].Rows[i]["ConsultaBusqueda_CamposCaptura_Oculto"].ToString();
                    dlist.ConsultaBusqueda_Condicion = ds.Tables[t].Rows[i]["ConsultaBusqueda_Condicion"].ToString();
                    dlist.ConsultaBusqueda_Orden = ds.Tables[t].Rows[i]["ConsultaBusqueda_Orden"].ToString();
                    dlist.ConsultaBusqueda_LongColumnas = ds.Tables[t].Rows[i]["consultaBusqueda_LongitudColumnas"].ToString();
                    dlist.ConsultaBusqueda_RelacionCaptura = ds.Tables[t].Rows[i]["consultaBusqueda_CamposCaptura"].ToString();
                    dlist.valorPredeterminado = ds.Tables[t].Rows[i]["valorPredeterminado"].ToString();
                    dlist.ConsultaBusqueda_BusquedaDirecta = ds.Tables[t].Rows[i]["consultaBusqueda_BusquedaDirecta"].ToString();
                    dlist.Configuracion_CamposCaptura = ds.Tables[t].Rows[i]["configuracioncamposcaptura"].ToString();
                    lista.Add(dlist);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                result[t] = js.Serialize(lista);
            }
            //if (ds.Tables[4].Rows.Count > 0)
            //{
                //result[4] = "";//DataTableToJsonObj(ds.Tables[4]); 
            //}
            //else { result[4] = "0"; }
        }
        else { result[0] = ds.Tables[0].Rows[0][0].ToString(); 
            result[1] = ds.Tables[0].Rows[0][1].ToString(); }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposCapturaFiltros(string modulo, string movimiento, string condicion,string tipocaptura)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ListarCampos_NuevaCaptura_Filtros '" + modulo + "','" + movimiento + "','" + condicion + "','"+tipocaptura+"'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {
            result[0] = "0";
            
                lista = new List<ClsCamposCaptura>();
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    ClsCamposCaptura dlist = new ClsCamposCaptura();
                    dlist.Movimiento = ds.Tables[1].Rows[i]["movimiento"].ToString();
                    dlist.Campo = ds.Tables[1].Rows[i]["campo"].ToString();
                    dlist.Sololectura = Convert.ToInt16(ds.Tables[1].Rows[i]["Sololectura"]);
                    dlist.Descripcion = ds.Tables[1].Rows[i]["descripcioncampo"].ToString();
                    dlist.Orden = ds.Tables[1].Rows[i]["orden"].ToString();
                    dlist.TipoDato = ds.Tables[1].Rows[i]["tipodato"].ToString();
                    dlist.Tamaño = ds.Tables[1].Rows[i]["tamaño"].ToString();
                    dlist.Longitud = ds.Tables[1].Rows[i]["longitud"].ToString();
                    dlist.CatalogoSeleccion = ds.Tables[1].Rows[i]["catalogoseleccion"].ToString();
                    dlist.CatalogoValor = ds.Tables[1].Rows[i]["catalogoseleccionvalor"].ToString();
                    dlist.CatalogoTexto = ds.Tables[1].Rows[i]["catalogoselecciontexto"].ToString();
                    dlist.CatalogoFiltro = ds.Tables[1].Rows[i]["catalogoseleccionfiltro"].ToString();
                    dlist.CamposRelacion = ds.Tables[1].Rows[i]["CampoRelacion"].ToString();
                    dlist.CamposFiltros = ds.Tables[1].Rows[i]["Campofiltro"].ToString();
                    dlist.HabilitarBusqueda = Convert.ToInt16(ds.Tables[1].Rows[i]["habilitarbusqueda"]);
                    dlist.CampoDescriptivo = ds.Tables[1].Rows[i]["CampoDescriptivo"].ToString();
                    dlist.CampoOrigen = Convert.ToBoolean(ds.Tables[1].Rows[i]["CampoOrigen"].ToString());
                    dlist.ConsultaBusqueda_Tabla = ds.Tables[1].Rows[i]["ConsultaBusqueda_Tabla"].ToString();
                    dlist.ConsultaBusqueda_Columnas = ds.Tables[1].Rows[i]["ConsultaBusqueda_Columnas"].ToString();
                    dlist.ConsultaBusqueda_AliasColumnas = ds.Tables[1].Rows[i]["ConsultaBusqueda_AliasColumnas"].ToString();
                    dlist.ConsultaBusqueda_Condicion = ds.Tables[1].Rows[i]["ConsultaBusqueda_Condicion"].ToString();
                    dlist.ConsultaBusqueda_Orden = ds.Tables[1].Rows[i]["ConsultaBusqueda_Orden"].ToString();
                    dlist.ConsultaBusqueda_LongColumnas = ds.Tables[1].Rows[i]["consultaBusqueda_LongitudColumnas"].ToString();
                    dlist.ConsultaBusqueda_RelacionCaptura = ds.Tables[1].Rows[i]["consultaBusqueda_CamposCaptura"].ToString();
                    lista.Add(dlist);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                result[1] = js.Serialize(lista);
            
            if (ds.Tables[2].Rows.Count > 0)
            { result[2] = DataTableToJsonObj(ds.Tables[2]); }
            else { result[2] = "0"; }
        }
        else { result[0] = ds.Tables[0].Rows[0][0].ToString(); result[1] = ds.Tables[0].Rows[0][1].ToString(); }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string LlenarCatalogos(string obj, string tabla, string cve, string des, string qry, string camrel)
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        if (qry == "") { qry = "select * from " + tabla + " order by " + cve; }
        DataSet ds = lib.ejecutarConsultaEnDataSet(qry);

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "X";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Opción";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][cve].ToString();
            dlist.selected = false;
            dlist.descripcion = ds.Tables[0].Rows[i][des].ToString();
            if (qry != "")
            { dlist.qry = qry; }
            else { dlist.qry = ""; }
            dlist.ddlobj = obj;
            dlist.relacion = camrel;
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConfiguracionGrid(string strtabla)
    {
        string[] result = { "", "", "", "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //descripcion
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //ancho tabla
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //alto tabla
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //propiedades
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //columnas grid
            result[4] = ds.Tables[0].Rows[0][4].ToString();
            //columnas de bloqueo
            result[5] = ds.Tables[0].Rows[0][5].ToString();
            //tabla siguiente
            result[6] = ds.Tables[0].Rows[0][6].ToString();
            //tabla anterior
            result[7] = ds.Tables[0].Rows[0][7].ToString();
            //columna filtro tabla siguiente
            result[8] = ds.Tables[0].Rows[0][8].ToString();
            //Orden de Nivel
            result[9] = ds.Tables[0].Rows[0][9].ToString();
            //Pagina nivel
            result[10] = ds.Tables[0].Rows[0][10].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Diseño_Catalogos(string strtipo,string strcampo,string strmov)
    {
        string[] result = { "", "", "", "","","",""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ConfiguracionGrid '" + strtipo + "','" + strcampo + "','" + strmov + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {           
            //longitud columnas
            result[0] = ds.Tables[0].Rows[0][3].ToString();
            result[1] = ds.Tables[0].Rows[0][5].ToString();

            //lista de campos para la busqueda
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);  
       
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Diseño_Empleados(string strtabla,string strtipo)
    {
        string[] result = { "", "", "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ConfiguracionGrid '" + strtipo + "','"+strtabla+"'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //TABLA
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //diseño
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //campos
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //alto
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //ancho
            result[4] = ds.Tables[0].Rows[0][4].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Captura(string tipmov,string strtipo,  string strmov, string strcamposO,string strcamposD,string strcamposS,string condicion,string multi)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string usuario = "Miguel.Sandoval";//objusuario.Usuario;
        string[] result = { "", "","" };        
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_GuardarMovimientos '" + tipmov + "','" + strtipo + "','"+ usuario + "','" + strmov + "','" + strcamposO + "','" + strcamposD + "','" + strcamposS + "','" + condicion + "','" + multi + "'");        

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
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] EliminarDocumento(string strmodulo, string strdocumento)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_EliminarDocumentos '" + strmodulo + "','" + strdocumento + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
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
    public static string Parentesco()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Referencias_Listar_Parentesco");
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
    public static string Sexo()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Referencias_Listar_Sexo");
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
    public static string[] Listar_BloqueosDesbloqueos(string modulo,string tipomov)
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