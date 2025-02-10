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
using Excel = Microsoft.Office.Interop.Excel;

public partial class FILE_DiseñadorDeCatalogos_Funsiones_CatGen : System.Web.UI.Page
{
    Utilerias lib = new Utilerias();
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Niveles(string strtabla)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ListarNiveles '" + strtabla + "'");
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
    public static string[] ConfiguracionVista(string strtabla)
    {
        string[] result = { "","",""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionVista '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {           
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);            
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposNuevaCaptura(string strtabla,string strcampo)
    {
        string[] result = { "", "","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_NuevaCaptura_V2 " + strtabla + ",'" + strcampo + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = ds.Tables[1].Rows[0][0].ToString();
            result[2] = ds.Tables[2].Rows[0][0].ToString();           
        }
        else { result[0] = "0"; result[1] = "No existe configuración de captura"; }
        ds.Dispose();
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
        dlist.valor = "x";
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
            dlist.cve = cve;
            dlist.des = des;
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        js.MaxJsonLength = 500000000;
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Movimientos_Catalogos(string strcampos, string strtabla, string strmov, string strcondicion)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string usuario = "Admin";// objusuario.Usuario;
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SPT_Catalogos_GuardarMovimientos_N '" + strcampos + "','" + strtabla + "','" + strmov + "','" + strcondicion + "','"+usuario+"'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            if (strmov == "Eliminar")
            {
                if (ds.Tables[0].Rows[0][0].ToString() == "0")
                { result[0] = "1"; result[1] = "El Registro se ha eliminado con exito"; }
                else
                { result[0] = "0"; result[1] = ds.Tables[0].Rows[0][1].ToString(); }
            }
            if ((strmov == "Guardar") || (strmov == "Modificar"))
            {
                if (ds.Tables[0].Rows[0][0].ToString() == "0")
                { result[0] = "1"; result[1] = "El Registro se ha guardado con exito"; }
                else { result[0] = "0"; result[1] = ds.Tables[0].Rows[0][1].ToString(); }
            }
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Permisos_Botones(string strtabla)
    {
        string[] result = { "", "", "" };
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int idusu = 1;// objusuario.Id;        
        Utilerias lib = new Utilerias();        
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarPermisosPorCatalogos " + idusu + ",'" + strtabla + "'");        
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Excel(string tabla,string filtro)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ExportarDatos '" + tabla + "','"+filtro+"'");      

        Excel.Application xlApp;
        Excel.Workbook xlWorkBook;
        Excel.Worksheet xlWorkSheet;
        object misValue = System.Reflection.Missing.Value;

        xlApp = new Excel.ApplicationClass();

        //xlApp = new Microsoft.Office.Interop.Excel.Application();

        xlWorkBook = xlApp.Workbooks.Add(misValue);
        xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

        DataTable miTabla = ds.Tables[0];

        for (int i = 1; i < miTabla.Columns.Count + 1; i++)
        {
            xlWorkSheet.Cells[1, i] = miTabla.Columns[i - 1].ColumnName;
        }
        // rows
        for (var i = 0; i < miTabla.Rows.Count; i++)
        {
            // to do: format datetime values before printing
            for (var j = 0; j < miTabla.Columns.Count; j++)
            {
                xlWorkSheet.Cells[i + 2, j + 1] = miTabla.Rows[i][j];
            }
        }

        xlApp.Visible = true;
        xlApp.Quit();

        ds.Dispose();
        result[0] = "1";
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Sacar_Consecutivo(string cadena)
    {
        string[] result = { "", "", "" };     
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet(cadena);
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarArchivo(string nombre, string imageData,string condicion,string tabla)
    {
        string[] result = { "", "", "", "" };
        System.Data.SqlClient.SqlConnection conn = null;
        try
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(imageData);

                conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["Ejecutivo"].ConnectionString);
                conn.Open();
                SqlCommand Comando = new SqlCommand();
                Comando.Connection = conn;
                Comando.CommandText= "update "+@tabla +" set nombrearchivo=@nombre,ImgNombramiento=@imagen where "+@condicion;
                Comando.Parameters.Add("@nombre", SqlDbType.VarChar);
                Comando.Parameters.Add("@imagen", SqlDbType.Image);

                Comando.Parameters["@nombre"].Value = nombre;
                Comando.Parameters["@imagen"].Value = imageBytes;
                
                int queryResult = Comando.ExecuteNonQuery();
                if (queryResult > 0)
                {
                    result[0] = "0";
                    result[1] = "";
                }
            }
            catch (Exception ex)
            {
                result[0] = "1";
                result[1] = "Error al guardar el archivo ";
            }
        }
        finally
        {
            if (conn != null)
                conn.Close();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] MostrarArchivo(string clave)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        byte[] imagen = { 0 };
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_MostrarArchivo " + clave);
        if (ds.Tables[0].Rows[0][0].ToString() != "")
        {
            result[0] = "0";
            imagen = (byte[])ds.Tables[0].Rows[0][0];

            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 500000000;
            result[1] = js.Serialize(imagen);
        }
        else
        {
            result[0] = "1";
        }
        ds.Dispose();
        return result;
    }

}