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
//using Excel = Microsoft.Office.Interop.Excel;
using System.Web.Security;
using System.Security.Principal;
using System.Runtime.InteropServices;
using dotnetPanama.ExcelXml;

public partial class FILE_Costeo_funsiones : System.Web.UI.Page
{
  

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_TipoPlazas(string centcosto)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_CreacionPlaza_Listar_TipoPlaza '" + centcosto + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["cvetippl"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["destippl"].ToString();
            campo.tabla = "Nominas";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_RegimenIPES()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPES");
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
    public static string Lista_RegimenIPESVOL()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPESVol");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][1].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_RegimenIPESPORC(string filtro)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_RegimenIPESPorc '"+filtro+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][1].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Lista_Quinquenios()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_Quinquenios ");
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

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] PROCESO_COSTEO(string tipocosto,string filtro,string conceptos,string canceladas)
    //{
    //    string[] result = { "", "","" };
    //    string columnas = "";
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos '" + tipocosto + "','" + filtro + "','" + conceptos + "'," + canceladas);
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        //if (ds.Tables[0].Rows[0]["Mensaje"] != null)
    //        //{
    //        //    result[0] = "0";
    //        //    result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString();
    //        //}
    //        //else
    //        //{
    //            result[0] = "1";
    //            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
    //            for (int c = 0; c < ds.Tables[0].Columns.Count; c++)
    //            {
    //                columnas += ds.Tables[0].Columns[c].ToString()+"|";
    //            }
    //            result[2] = columnas.Substring(0, columnas.Length - 1);
    //        //}
    //    }
    //    else { result[0] = "0"; result[1] = "No existen datos a costear"; result[2] = ""; }
    //    ds.Dispose();
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Plazas(string filtro)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_PlazasFiltros '" + filtro + "'");
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
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] proceso_costeo(string tipocosto,string filtro,string conceptos,string canceladas)
    {
        string[] result = { "", "","","" };
        Utilerias lib = new Utilerias();
        DataSet ds = new DataSet();

        ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CalculoGral_Costos '"+tipocosto+"','"+filtro+"','"+conceptos+"','"+canceladas+"'");
        if (ds.Tables[0].Rows.Count == 0)
        {
            result[0] = "1";
        }
        else
        {
            ClsTblCostos tblcostos = new ClsTblCostos();
            tblcostos.dscostos = ds;
            tblcostos.tiposcosto=tipocosto;
            HttpContext.Current.Session["dscostos"] = tblcostos;

            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = ds.Tables[0].Rows.Count.ToString();           
        }
        ds.Dispose();
        return result;
    }

   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    private static void CARGAR_COLUMNAS_TBL(DataTable dt,ExcelApplication app)
    {
        ExcelRow fila = new ExcelRow();
        ExcelCell col = new ExcelCell();

        fila = new ExcelRow();
        for (int h1 = 0; h1 < dt.Columns.Count; h1++)
        {
            col = new ExcelCell();
            col.Text = dt.Columns[h1].ColumnName.ToString();
            fila.Cells.Add(col);
        }
        app.Worksheets[0].Rows.Add(fila);

        for (int i = 0; i < dt.Rows.Count; i++)
        {
            fila = new ExcelRow();
            for (int j = 0; j < dt.Columns.Count; j++)
            {
                string valor = dt.Rows[i].ItemArray[j].ToString();
                col = new ExcelCell();
                col.Text = valor;

                fila.Cells.Add(col);
            }
            app.Worksheets[0].Rows.Add(fila);
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    private static void CARGAR_DATOS_TBL(DataTable dtdatos, ExcelApplication app)
    {
        ExcelRow fila = new ExcelRow();
        ExcelCell col = new ExcelCell();
        for (int i = 0; i < dtdatos.Rows.Count; i++)
        {
            fila = new ExcelRow();
            for (int j = 0; j < dtdatos.Columns.Count; j++)
            {
                string valor = dtdatos.Rows[i].ItemArray[j].ToString();
                col = new ExcelCell();
                col.Text = valor;

                fila.Cells.Add(col);
            }
            app.Worksheets[0].Rows.Add(fila);
        }
    }

     [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GENERA_EXCEL(string tipocosto, string nomarchivo)
    {
         string[] result = { "", "","","" };
        Utilerias lib = new Utilerias();
        ExcelApplication app = new ExcelApplication();
        ExcelRow fila = new ExcelRow();
        ExcelCell col = new ExcelCell();
        app.Worksheets.Add(new ExcelWorksheet());
        app.Worksheets[0].Name = nomarchivo;
        if (app == null)
        {
            result[0] = "0";
            result[1] = "Excel no se encuentra instalado";
        }
        else
        {   
             ClsTblCostos objcostos = (ClsTblCostos)HttpContext.Current.Session["dscostos"];
             if (objcostos.dscostos.Tables[0].Rows.Count ==0)
             {
                 result[0] = "0";               
             }
             else
             {
                 DataTable miTabla1 = objcostos.dscostos.Tables[0];
                 DataTable miTabla2 = objcostos.dscostos.Tables[1];


                 for (int i = 0; i < miTabla1.Rows.Count; i++)
                 {
                     if (i > 0) { fila = new ExcelRow(); }

                     //cargar columnas de tabla 1
                     for (int h1 = 0; h1 < miTabla1.Columns.Count; h1++)
                     {
                         col = new ExcelCell();
                         col.Text = miTabla1.Columns[h1].ColumnName.ToString();
                         fila.Cells.Add(col);
                     }
                     app.Worksheets[0].Rows.Add(fila);

                     fila = new ExcelRow();
                     for (int j = 0; j < objcostos.dscostos.Tables[0].Columns.Count; j++)
                     {
                         string valor = objcostos.dscostos.Tables[0].Rows[i].ItemArray[j].ToString();
                         col = new ExcelCell();
                         col.Text = valor;

                         fila.Cells.Add(col);
                     }
                     app.Worksheets[0].Rows.Add(fila);

                     //cargar columnas de tabla 2                     
                     fila = new ExcelRow();                     
                     for (int h2 = 0; h2 < miTabla2.Columns.Count; h2++)
                     {
                         col = new ExcelCell();
                         col.Text = miTabla2.Columns[h2].ColumnName.ToString();
                         fila.Cells.Add(col);
                     }
                     app.Worksheets[0].Rows.Add(fila);           
                 }                 


                 objcostos.dscostos.Dispose();

                 string fecha = DateTime.Today.ToShortDateString();
                 string Ruta = HttpContext.Current.Server.MapPath("../Descargas_Archivos/Archivos/" + nomarchivo +".xls");
                 if (File.Exists(Ruta))
                 { File.Delete(Ruta); }
                 app.FilePath = Ruta;
                 app.SaveFile();
                 result[0] = "1";
             }
        }
        return result;
    }


     [WebMethod(EnableSession = true)]
     [ScriptMethod]
     public static string[] columnas_nivel(string codniv,string busqueda)
     {
         string[] result = { "", "", "", "" };
         Utilerias lib = new Utilerias();
         DataSet ds = new DataSet();

         ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Costeo_Listar_ColumnasNivelSalarial @desde='1', @hasta='20', @codNiv = '" + codniv + "',@busqueda='" + busqueda + "'");
         result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
         result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
         ds.Dispose();
         return result;
     }
        
}