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

public partial class FILE_Terceros_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BuscarPerfiles()
    {
        string[] result = { "", "" ,""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        result[2] = ds.Tables[2].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ConsultarPerfil(string perfil, string nombre, string extension, string columnas)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ConsultaPerfil " + perfil + ",'" + nombre + "','" + extension.Replace(".", "") + "','" + columnas + "'");
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(DataTableToStringArray(ds.Tables[0]));
        return datos;
    }
   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string BuscarCamposDisponiblesParaRelacion()
    {
        string result = "";
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Catalogo_CamposCaptura");
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            if (result.Length <= 0) { result = dr["nomcamtr"].ToString() + "," + dr["descamtr"].ToString(); }
            else { result += "|" + dr["nomcamtr"].ToString() + "," + dr["descamtr"].ToString(); }
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConsultarConceptos()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ConsultaConceptos");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string GuardarPerfil(string perfil, string descripcion, string extension, string relacionconceptos, string relacioncampos, string tipomovimiento, string tipoafectacion, string activo)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string usuraio =  objusuario.Usuario;
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Perfiles_Guardar '" + perfil + "','" + descripcion + "','" + extension + "','" + relacionconceptos + "','" + relacioncampos + "','" + tipomovimiento + "','" + tipoafectacion + "','" + activo + "','"+usuraio+"'");
        return ds.Tables[0].Rows[0][0].ToString();
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

    public static string[] DataTableToStringArray(DataTable dt)
    {
        string[] result = new string[dt.Columns.Count];
        if (dt.Rows.Count > 0)
        {
            int contColumna = 0;
            foreach (DataColumn c in dt.Columns)
            {
                result[contColumna] = dt.Rows[0][c].ToString();
                contColumna++;
            }
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConsultaOrdenPerfiles()
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ConsultaOrden");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        result[2] = ds.Tables[2].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string OrdenarConceptoPerfil(string clave, string concepto, string posiciones)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_OrdenarConcepto '" + clave + "','" + concepto + "','" + posiciones + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CargarCampos()
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Catalogo_CamposCaptura");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        result[2] = ds.Tables[2].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string GuardarCampos(string valores)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Catalogo_CamposCaptura_Guardar '" + valores + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarCaptura(string strmov,string strcveter,  string strvalores,string strcondicion,string multi)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_GuardarMovimientos '" + strmov + "','" + strcveter + "','" + objusuario.Usuario + "','" + strvalores + "','" + strcondicion + "','" + multi + "'");
        result[0]= ds.Tables[0].Rows[0][0].ToString();
        result[1]= ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] EliminarCaptura(string cvenumdoc)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Captura_Eliminar '" + cvenumdoc + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
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
            ////tabla llave historia
            //result[13] = ds.Tables[0].Rows[0][8].ToString();

        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string LLenarListaCampos(string strtipo, string strtipobusqueda)
    {
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Campos_Busqueda '" + strtipo + "','" + strtipobusqueda + "'");
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
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Listar_Empleados '" + strcondicion + "','" + strmodulo + "','" + strcampo + "','Empleado'");
        if (ds.Tables.Count > 0)
        {
            result[0] = DataTableToJsonObj(ds.Tables[0]);
            result[1] = ds.Tables[1].Rows[0][0].ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_NuevaCaptura(string strcveter,string strdocumento,string strempleado,string tipocaptura,int strid)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Lista_NuevaCaptura " + strcveter + ",'"+strdocumento+"'," + strempleado+",'"+tipocaptura+"',"+strid);
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "1";
            result[1] = DataTableToJsonObj(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_ModificarCaptura(string strcveter, string strempleado)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Lista_ModificarCaptura " + strcveter + "," + strempleado);
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "1";
            result[1] = DataTableToJsonObj(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string cargarcatalogo(string strconsulta)
    {       
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        ClsDropList dlist = new ClsDropList();
        dlist.campo = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una opción";
        lista.Add(dlist);

        DataSet ds = lib.ejecutarConsultaEnDataSet(strconsulta);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsDropList();
            dlist.campo = ds.Tables[0].Rows[i][0].ToString();          
            dlist.descripcion = ds.Tables[0].Rows[i]["campo"].ToString()+"-"+ds.Tables[0].Rows[i]["descripcion"].ToString();            
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
        string[] result = { "", "", "", "", "", "", "", "", "", "", "","" };
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
            //columnas consulta
            result[11] = ds.Tables[0].Rows[0][11].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Diseño_Empleados(string strtabla,string strtipo)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ConfiguracionGrid '"+strtipo+"','"+strtabla+"'");
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
    public static string[] Diseño_Cat(string strtabla)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {            
            //diseño
            result[0] = ds.Tables[0].Rows[0][4].ToString();                        
            //ancho
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //alto
            result[2] = ds.Tables[0].Rows[0][2].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Cargar_CamposBusqueda(string strtipo, string strtipobusqueda)
    {
        Utilerias lib = new Utilerias();
        List<ClsDropList> lista = new List<ClsDropList>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Campos_Busqueda '" + strtipo + "','" + strtipobusqueda + "'");
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
    public static string[] ModificarPerfil(string valores)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Perfiles_Modificar '" + valores + "'");
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
        if (Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString()) == 0)
        { result[0] = "0"; }
        else { result[0] = "1"; }
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
}