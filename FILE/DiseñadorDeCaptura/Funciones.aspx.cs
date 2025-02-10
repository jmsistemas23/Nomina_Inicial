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
public partial class FILE_DiseñadorDeCaptura_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] ListarMovimeintos(string strtipo, string strclave)
    //{
    //    string[] result = { "", "" };
    //    Utilerias lib = new Utilerias();
    //    List<clsModulos> lstmod = new List<clsModulos>();
    //    clsModulos mod = new clsModulos();
    //    JavaScriptSerializer js = new JavaScriptSerializer();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_Listar_Movimientos '" + strtipo + "','" + strclave + "'");

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
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarColumnas(string tipo, string movimiento)
    {
        string[] result = { ""};
        
        Utilerias lib = new Utilerias();
        List<campoDisCaptura> lstConsulta = new List<campoDisCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("Exec GESRH_SPT_Capturas_ConfiguracionCaptura '" + tipo + "','" + movimiento + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoDisCaptura consulta = new campoDisCaptura();
            consulta.orden = ds.Tables[0].Rows[i]["orden"].ToString();
            consulta.campo = ds.Tables[0].Rows[i]["campo"].ToString();
            consulta.descripcion = ds.Tables[0].Rows[i]["descripcion"].ToString();
            consulta.activo = Convert.ToBoolean(ds.Tables[0].Rows[i]["activo"]);
            consulta.lectura = Convert.ToBoolean(ds.Tables[0].Rows[i]["soloLectura"]);
            consulta.busqueda = Convert.ToBoolean(ds.Tables[0].Rows[i]["busqueda"]);
            consulta.columnasBusqueda = ds.Tables[0].Rows[i]["columnasBusqueda"].ToString();
            consulta.tablaBusqueda = ds.Tables[0].Rows[i]["tablaBusqueda"].ToString();
            consulta.condicionBusqueda = ds.Tables[0].Rows[i]["condicionBusqueda"].ToString();
            consulta.ordenBusqueda = ds.Tables[0].Rows[i]["ordenBusqueda"].ToString();
            consulta.aliasBusqueda = ds.Tables[0].Rows[i]["aliasBusqueda"].ToString();
            consulta.longitudBusqueda = ds.Tables[0].Rows[i]["longitudBusqueda"].ToString();
            consulta.camposCapturaBusqueda = ds.Tables[0].Rows[i]["camposCaptura"].ToString();
            consulta.camposOcultosBusqueda = ds.Tables[0].Rows[i]["camposBusquedaOcultos"].ToString();
            consulta.guardaOrigen = Convert.ToBoolean(ds.Tables[0].Rows[i]["guardaOrigen"]);
            lstConsulta.Add(consulta);
        }
        ds.Dispose();
        JavaScriptSerializer js = new JavaScriptSerializer();
        return js.Serialize(lstConsulta);
       // result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        //return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string guardarColumnas(string tipo, string movimiento, string qry)
    {
        string[] cadena = qry.Split('&');
        string valores = "";
        string tmp = "";
        foreach (string c in cadena)
        {
            tmp = "";
            string[] val = c.Split(';');
            foreach (string c1 in val)
            {
                if (tmp.Length > 0) { tmp += ",''" + c1 + "''"; }
                else { tmp = "''" + c1 + "''"; }
            }
            tmp = "(" + tmp + ")";

            if (valores.Length > 0) { valores += "," + tmp; }
            else { valores = tmp; }
        }

        Utilerias lib = new Utilerias();
        List<campoMsjSQL> lstConsulta = new List<campoMsjSQL>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("Exec GESRH_SPT_Capturas_ConfiguracionCaptura_Guardar '" + tipo + "','" + movimiento + "','" + valores + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoMsjSQL consulta = new campoMsjSQL();
            consulta.error = int.Parse(ds.Tables[0].Rows[i]["Error"].ToString());
            consulta.mensaje = ds.Tables[0].Rows[i]["Mensaje"].ToString();
            lstConsulta.Add(consulta);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstConsulta);
        ds.Dispose();
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Configuracion_Campos(string tipo, string tipocampo, string condicion)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCampos '" + tipo + "','" + tipocampo + "','" + condicion + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_CamposDestino(string tipo, string tipocampo,string condicion)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCampos '" + tipo + "','" + tipocampo + "','"+condicion+"'");
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
                //menu = new ClsDropList();
                //menu.campo = ds.Tables[0].Rows[i]["descripcion"].ToString();
                //menu.descripcion = ds.Tables[0].Rows[i]["descripcion"].ToString();
                //lstmenu.Add(menu);
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
    public static string[] ddl_Tablas_Sistema()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsDropList> lstmenu = new List<ClsDropList>();
        ClsDropList menu = new ClsDropList();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarTablasSistema");
        if (ds.Tables.Count > 0)
        {          
                menu = new ClsDropList();
                menu.campo = "x";
                menu.descripcion = "Seleccione una opción";
                menu.selected = true;
                lstmenu.Add(menu);          

            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsDropList();
                menu.campo = ds.Tables[0].Rows[i]["descripcion"].ToString();
                menu.descripcion = ds.Tables[0].Rows[i]["descripcion"].ToString();
                lstmenu.Add(menu);
            }
            result[0] = js.Serialize(lstmenu);
        }
        ds.Dispose();
        return result;
    }
   

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas(string strtabla,string modulo)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Listar_NuevasColumnas '" + strtabla + "','"+modulo+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
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
    public static string[] Guardar_Consulta(string tipo, string movimiento, string campo, string consulta, string relaciones, string condicion, string orden,string tablas,string columnas,string configuracion,string condiciones)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_GuardarDiseñoconsulta '" + tipo + "','" + movimiento + "','" + campo + "','" + consulta + "','" + relaciones + "','" + condicion + "','" + orden + "','" + tablas + "','" + columnas + "','" + configuracion + "','" + condiciones+"'");      
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
    public static string[] Guardar_ConfiguracionConsulta(string tipo, string movimiento, string campo, string colvista, string colregistro)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_GuardarConfiguracionconsulta '" + tipo + "','" + movimiento + "','" + campo + "','" + colvista + "','" + colregistro + "'");
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
    public static string[] Guardar_ValoresConsulta(string tipo, string movimiento, string campo, string campos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_GuardarValoresConsulta '" + tipo + "','" + movimiento + "','" + campo + "','" + campos + "'");
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
    public static string[] Guardar_CamposCaptura(string tipo, string campos, string condicion,string campo)
    {
          string[] result = { "","" };
          Utilerias lib = new Utilerias();
          DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_GuardarColumnas '" + tipo + "','" + campos + "','" + condicion + "','"+campo+"'");
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
    public static string[] Guardar_ColumnasNuevas(string tipo, string campos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_GuardarColumnasNuevas '" + tipo + "','" + campos + "'");
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
    public static string[] Lista_CamposMovimientos(string tipo)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCampos '" + tipo + "','','usointerno=0 and usodescriptivo=0 and usoorigen=0'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;                
                campo.name = ds.Tables[0].Rows[i][1].ToString();
                campo.text = ds.Tables[0].Rows[i][2].ToString();
                campo.attributes = ds.Tables[0].Rows[i][3].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_CamposCapturaMovimientos(string tipo,string movimiento,string columnas,string valores, string campos, string condicion, string campo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_GuardarCamposMovimientos '" + tipo + "','" + movimiento + "','" + columnas + "','" + valores + "','" + campos + "','" + condicion + "','" + campo + "'");
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
    public static string[] Listar_Configuracion_Campos_Movimientos(string tipo, string movimiento,string condicion)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCamposMovimientos '" + tipo + "','" + movimiento + "','" + condicion + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
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
    public static string[] Generar_Relaciones(string tablasseleccionadas)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        string tablas = tablasseleccionadas.Replace("''", "");
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_RelacionTablas '" + tablas.Trim()  + "'");
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
    public static string[] Listar_DiseñoConsulta(string tipo, string movimiento, string campo)
    {
        string[] result = { "", "","","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarDiseñoConsulta '" + tipo + "','" + movimiento + "','" + campo + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        result[2] = ds.Tables[0].Rows[0][2].ToString();
        result[3] = ds.Tables[0].Rows[0][3].ToString();
        result[4] = ds.Tables[0].Rows[0][4].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_ConfiguracionConsulta(string tipo, string movimiento, string campo)
    {
        string[] result = { "", "","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarDiseñoConsulta '" + tipo + "','" + movimiento + "','" + campo + "'");
        if (ds.Tables[0].Rows.Count>0)
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
    public static string[] Listar_CamposFiltros(string tipo, string movimiento)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ListarCampos_FiltrosBusqueda '" + tipo + "','" + movimiento + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
          
        }
        else { result[0] = ""; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_CamposCapturaMovimientos(string tipo, string movimiento,  string campo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_EliminarCamposMovimientos '" + tipo + "','" + movimiento + "','" + campo + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        else { result[0] = ""; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Movimientos(string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarMovimientos '" + tipo + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["Id"].ToString()+"-"+ds.Tables[0].Rows[i]["Nombre"].ToString();
                menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Movimientos_Visibles(string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListaMovimientos '" + tipo + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                menu = new ClsPermisosMenus();
                menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
                menu.text = ds.Tables[0].Rows[i]["Id"].ToString() + "-" + ds.Tables[0].Rows[i]["Nombre"].ToString();
                menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
                menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
                menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
                lstmenu.Add(menu);
            }
            List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
            result[0] = js.Serialize(menutree);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        ds.Dispose();
        return result;
    }

    private static List<ClsPermisosMenus> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            IdPadre = x.IdPadre,
            nombre=x.nombre,
            visible = x.visible,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Movimientos_Configurados(string tipo, string strmovact, string strmov)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        //List<ClsCampos> lstcampo = new List<ClsCampos>();
        //ClsCampos campo = new ClsCampos();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListaMovimientosConfigurados '" + tipo + "','" + strmovact + "','" + strmov + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.text = ds.Tables[0].Rows[i]["Id"].ToString()+"-"+ds.Tables[0].Rows[i]["Nombre"].ToString();
            menu.nombre = ds.Tables[0].Rows[i]["Id"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["Propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["Propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["Visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> menutree = GetMov(lstmenu, lstmenu[0].IdPadre);
        result[0] = js.Serialize(menutree);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        //for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        //{
        //    campo = new ClsCampos();
        //    campo.Id = i;
        //    campo.name = ds.Tables[0].Rows[i][0].ToString();
        //    campo.text = ds.Tables[0].Rows[i][1].ToString();
        //    lstcampo.Add(campo);
        //}
        //result[0] = js.Serialize(lstcampo);    
        ds.Dispose();
        return result;
    }

    private static List<ClsPermisosMenus> GetMov(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            nombre=x.nombre,
            IdPadre = x.IdPadre,
            visible = x.visible,
            children = GetMov(list, x.Id)
        }).ToList();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Campos_Movimientos_Configurados(string tipo, string movimiento)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListaCamposMovConfigurados '" + tipo + "','" + movimiento + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Campos_Movimientos(string tipo, string movimiento)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Listar_Movimientos_Modificar '" + tipo + "','" + movimiento + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Configuracion_Movimientos(string tipo, string movimiento, string movnuevo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Guardar_Configuracion_Movimientos '" + tipo + "','" + movimiento + "','" + movnuevo + "'");
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
    public static string[] Eliminar_Configuracion_Movimientos(string tipo, string movimiento)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Eliminar_Configuracion_Movimientos '" + tipo + "','" + movimiento + "'");
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
    public static string[] Buscar_Campos_Busqueda(string tipo, string movimiento)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Buscar_Campos_Busqueda '" + tipo + "','" + movimiento + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();            
        }
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_CamposCaptura(string tipo, string movimiento)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();
        string strcampo="";
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCamposCaptura '" + tipo + "','" + movimiento + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                if (ds.Tables[0].Rows[i][3].ToString()!="")
                {strcampo="|"+ds.Tables[0].Rows[i][1].ToString() + "," + ds.Tables[0].Rows[i][2].ToString() + "-" + ds.Tables[0].Rows[i][3].ToString();}
                //else{strcampo=ds.Tables[0].Rows[i][1].ToString() + "," + ds.Tables[0].Rows[i][2].ToString();}

                //campo = new ClsCampos();
                //campo.Id = i;
                //campo.name = ds.Tables[0].Rows[i][2].ToString();
                //campo.attributes = strcampo;
                //campo.text = ds.Tables[0].Rows[i][4].ToString();
                //lstcampo.Add(campo);

                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][2].ToString();
                campo.attributes = ds.Tables[0].Rows[i][1].ToString() + "," + ds.Tables[0].Rows[i][2].ToString() + strcampo;
                campo.text = ds.Tables[0].Rows[i][4].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Catalogo(string strquery,string strvalor,string strtexto)
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Diseño_Catalogos(string strtabla, string strcampo, string strmov)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ConfiguracionGrid '" + strtabla + "','" + strcampo + "','" + strmov + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //TABLA
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //COLUMNAS
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //orden
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //longitud columnas
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //relacion columnas
            result[4] = ds.Tables[0].Rows[0][4].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_CamposFiltrosConsultas(string tipo, string movimiento, string strcampo)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCampos_FiltroConsultas '" + tipo + "','" + movimiento + "','" + strcampo + "'");
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

            lstcampo = new List<ClsCampos>();        
            for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[1].Rows[i][0].ToString();
                campo.text = ds.Tables[1].Rows[i][0].ToString();
                lstcampo.Add(campo);
            }
            result[1] = js.Serialize(lstcampo);
            result[2] = ds.Tables[2].Rows[0][0].ToString();
        }
        else { result[0] = ""; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Campos_Movimientos_Modificados(string tipo, string movimiento, string movnuevo,string campo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_Guardar_Configuracion_CampoMovimientos '" + tipo + "','" + movimiento + "','" + movnuevo + "','"+campo+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        ds.Dispose();
        return result;
    }



}