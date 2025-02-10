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

public partial class FILE_DiseñadorDeCatalogos_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Catalogo(string tipomov,string id,string valores)
    {
        string[] result = { "",""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarTabla '"+tipomov+"','" + id + "','" + valores + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Columnas_Tablas_Name(string idtabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarColumasTablas '" + idtabla + "'");
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
        return result;
    }
   

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Tablas_Sistema()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();        
        ClsCampos campo = new ClsCampos();
        
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarTablasSistema");
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
        return result;
    }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Configuracion(string idtabla)
    {
        string[] result = { "","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_ConfiguracionVista '" + idtabla+"'" );
        if (ds.Tables.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Configuracion(string idtabla,string campollave,string campodescriptivo,string colcampos, string colorden,string colbloqueadas,string columnas)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarConfiguracion '" + idtabla + "','" + campollave + "','"+campodescriptivo +"','"+ colcampos + "','" + colorden + "','" + colbloqueadas + "','" + columnas + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Configuracion_Campos(string idtabla, string campo, string condicion, string colinsert, string valores, string camupdate)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarConfiguracionCampos '" + idtabla + "','" + campo + "','" + condicion + "','" + colinsert + "','" + valores + "','" + camupdate + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Configuracion_Vista(string idtabla, string campo, string condicion, string colinsert, string valores, string camupdate)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarConfiguracionVista '" + idtabla + "','" + campo + "','" + condicion + "','" + colinsert + "','" + valores + "','" + camupdate + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Campos_Vista_Captura(string idtabla, string campos)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarCamposCapturaVista '" + idtabla + "','" + campos + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_DiseñoConsulta(string idtabla, string campo)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_ConfiguracionConsulta '" + idtabla + "','" + campo + "'");
        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_CamposBusqueda()
    {
        string[] result = { ""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_CamposBusqueda ");
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
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposVistaCaptura(string strtabla, string strcampo)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_NuevaCaptura_V2 " + strtabla + ",'" + strcampo + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i]["Campo"].ToString();
                campo.text = ds.Tables[0].Rows[i]["Descripcion"].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Catalogos()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_CatalogosCreados 1,20,''");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[2].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[2].Rows[i][0].ToString();
                campo.text = ds.Tables[2].Rows[i][1].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Catalogos_Niveles(string tabla, string campos,string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarNiveles '" + tabla + "','" + campos + "','"+tipo+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Catalogos_Niveles(string tabla)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ListarNiveles '" + tabla + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] =lib.convertirDatatableEnJsonString(ds.Tables[0]);              
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Crear_Tabla(string moviento, string campos,string diseño)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_CreacionTablas '" + moviento + "','" + campos + "','"+diseño+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Tablas_creadas(int idtabla)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("select * from GESRH_NOM_Catalogos_TablasCreadas where id=" + idtabla);
        if (ds.Tables.Count > 0)
        {
            result[0] = "0";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "1"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Catalogo(string strtabla)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_EliminarTabla '" + strtabla + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Movimiento_RelacionTablas(string strtipo, int id, string strvalores)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_MovimientosRelaciones '" + strtipo + "'," + id + ",'" + strvalores + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();           
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_CamposCaptura(string tabla, string campo, string orden)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_EliminarCampoCaptura '" + tabla + "','" + campo + "','" + orden + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        else { result[0] = ""; }
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_CamposVista(string tabla, string campo, string orden)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_EliminarCampoVista '" + tabla + "','" + campo + "','" + orden + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        else { result[0] = ""; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_DiseñoTabla(string valores, string campos, string tabla, string campo, string condicion, string tipomov)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarTablaCreadaDiseño '" + valores + "','" + campos + "','" + tabla + "','" + campo + "','" + condicion + "','" + tipomov + "'");
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
    public static string[] Guardar_Tabla(string tabla, int historia, int sistema,int id)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_GuardarTablaCreada '" + tabla + "'," + historia + "," + sistema+","+id);
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
    public static string[] Listar_Diseño_Tabla(string tabla)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_Listar_DiseñoTablaCreada '" + tabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);}
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Lista_CamposCaptura(string tipo, string movimiento)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();
        string strcampo = "";
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_DisCaptura_ListarCamposCaptura '" + tipo + "','" + movimiento + "'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                if (ds.Tables[0].Rows[i][3].ToString() != "")
                { strcampo = "|" + ds.Tables[0].Rows[i][1].ToString() + "," + ds.Tables[0].Rows[i][2].ToString() + "-" + ds.Tables[0].Rows[i][3].ToString(); }
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