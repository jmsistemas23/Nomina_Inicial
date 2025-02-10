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

public partial class FILE_Afectaciones_Afectacion_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Afectacion(string tipoMov, string tipo, string valores,string multi)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        var usu = "Admin"; //objusuario.Usuario
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_" + tipoMov + " '" + tipo + "','" + valores + "','" + usu + "','" + multi + "'");        
        if (ds.Tables[0].Rows.Count > 0)
        {
            if (ds.Tables[0].Columns[0].ColumnName.ToString() == "Column1") { 
                result[0] = "1";
                result[1] = ds.Tables[0].Rows[0][0].ToString();
            }
            else
            {
                result[0] = "0";
                result[1] = DataTableToJsonObj(ds.Tables[0]);
                if (ds.Tables.Count > 1)
                { result[2] = DataTableToJsonObj(ds.Tables[1]); }
                else { result[2] = ""; }
            }
        }
        else
        {
            result[0] = "0";
            result[1] = "";
            if (ds.Tables.Count > 1)
            { result[2] = DataTableToJsonObj(ds.Tables[1]); }
            else { result[2] = ""; }
        }
        return result;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_ME(string tipo, string valores, string usuario,string multi)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_ME '" + usuario+"','"+multi+"'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //        if (ds.Tables[0].Rows.Count > 0)
    //        {
    //            result[0] = "0";
    //            result[1] = DataTableToJsonObj(ds.Tables[0]);
    //        }
    //        else { result[0] = "1"; }
    //    return result;
    //}

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_IL(string tipo, string valores, string usuario)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_IL '" + usuario + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //        if (ds.Tables[0].Rows.Count > 0)
    //        {
    //            result[0] = "0";
    //            result[1] = DataTableToJsonObj(ds.Tables[0]);
    //        }
    //        else { result[0] = "1"; }
    //    return result;
    //}

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_TR(string usuario,string multi)
    //{
    //    string[] result = { "","" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_TR '"+usuario+"','"+multi+"'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //        if (ds.Tables[0].Rows.Count > 0)
    //        {
    //            result[0] = "0";
    //            result[1] = DataTableToJsonObj(ds.Tables[0]);
    //        }
    //        else { result[0] = "1"; }
    //    return result;
    //}

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_MP(string tipo, string valores, string usuario)
    //{
    //    string[] result = { "","" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_MP '" + tipo + "','" + valores + "','" + usuario + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        result[0] = "0";
    //        result[1] = DataTableToJsonObj(ds.Tables[0]);            
    //    }
    //    else { result[0] = "1"; }
    //    return result;
    //}

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_MC(string tipo, string valores, string usuario)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_MC '" + tipo + "','" + valores + "','" + usuario + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //        if (ds.Tables[0].Rows.Count > 0)
    //        {
    //            result[0] = "0";
    //            result[1] = DataTableToJsonObj(ds.Tables[0]);
    //        }
    //        else { result[0] = "1"; }
    //    return result;
    //}

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Afectacion_DP(string tipo, string valores, string usuario)
    //{
    //    string[] result = { "","" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_AFECTACION_DP '" + tipo + "','" + valores + "','" + usuario + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        result[0] = "0";
    //        result[1] = DataTableToJsonObj(ds.Tables[0]); 
    //    }
    //    else { result[0] = "1"; }
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarRubros(string strtabla, string strfiltro, string strtipo)
    {
        string[] result = { "", "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogo_DiseñoTablas '" + strtabla + "','" + strfiltro + "','" + strtipo + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = DataTableToJsonObj(ds.Tables[1]);
            result[2] = ds.Tables[2].Rows[0][0].ToString();
            result[3] = ds.Tables[3].Rows[0][0].ToString();
            result[4] = ds.Tables[4].Rows[0][0].ToString();
            result[5] = ds.Tables[5].Rows[0][0].ToString();
            result[6] = ds.Tables[0].Rows[0][1].ToString();
            result[7] = ds.Tables[0].Rows[0][2].ToString();
            result[8] = ds.Tables[0].Rows[0][3].ToString();
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarCatalogoNiveles(string strtabla, string strfiltro, string strtipo)
    {
        string[] result = { "", "", "", "", "", "", "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogo_DiseñoTablas_Niveles '" + strtabla + "','" + strfiltro + "','" + strtipo + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //descripcion
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //nivel tabla siguiente
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //llave tabla siguiente
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //nivel tabla anterior
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //llave tabla anterior
            result[4] = ds.Tables[0].Rows[0][4].ToString();
            //ancho tabla
            result[5] = ds.Tables[0].Rows[0][5].ToString();
            //orden nivel
            result[6] = ds.Tables[0].Rows[0][6].ToString();
            //datos de la consulta
            result[7] = DataTableToJsonObj(ds.Tables[1]);
            //bloqueo de columnas
            result[8] = ds.Tables[2].Rows[0][0].ToString();
            //diseño de la tabla
            result[9] = ds.Tables[2].Rows[0][1].ToString();
            //propiedades de la captura
            result[10] = ds.Tables[2].Rows[0][2].ToString();
            //columnas de filtros
            result[11] = ds.Tables[2].Rows[0][3].ToString();
            //tabla historia
            result[12] = ds.Tables[0].Rows[0][7].ToString();
            //tabla llave historia
            result[13] = ds.Tables[0].Rows[0][8].ToString();

        }
        else { result[0] = "0"; }
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
    public static string[] ConfiguracionGrid(string strtabla)
    {
        string[] result = { "","","",""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {            
            //ancho tabla
            result[0] = ds.Tables[0].Rows[0][1].ToString();
            //alto tabla
            result[1] = ds.Tables[0].Rows[0][2].ToString();            
            //columnas grid
            result[2] = ds.Tables[0].Rows[0][4].ToString();
            //Bloqueo columnas grid
            result[3] = ds.Tables[0].Rows[0][5].ToString();    
        }
        else { result[0] = "0"; }
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
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ValidacionMultinominas '" + multi + "'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {result[0] = "0";}
        else { result[0] = "1"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_MovimientosPermisos(string strtipo, string strclave)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMovimientosPermisos " + objusuario.Id + ",'" + strtipo + "','" + strclave + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
                menu.text = ds.Tables[0].Rows[i]["Id"].ToString() + "-" + ds.Tables[0].Rows[i]["Nombre"].ToString();
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_BloqueosDesbloqueos_Modulos()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Bloquear_Listado_Modulos ");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

        ds.Dispose();
        return result;
    }

}