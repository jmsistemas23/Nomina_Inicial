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


public partial class FILE_ProcesosEspeciales_ImportarArchivo : System.Web.UI.Page
{
    string usuario = "",tipocarga="",multi="";
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        if (objusuario == null)
        {
            Response.Redirect("../../../Login.aspx");
        }

        btnexaminar.Attributes.Add("onclick", "document.getElementById('" + cargaArchivo.ClientID + "').click(); return false;");
        btncargar.Attributes.Add("onclick", "$('#loading').show(); return true;");
    }

    protected void btnCargarArchivo_Click(object sender, EventArgs e)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        usuario = objusuario.Usuario;
        tipocarga = Request.Form["htipocarga"].ToString();
        multi = Request.Form["hmulti"].ToString();

         if (multi != "")
        {
        Utilerias lib = new Utilerias();
        //string valores = "";
        string perfil = "";
        if (cargaArchivo.HasFile)
        {
            HttpFileCollection archivosMasivos = Request.Files;
            HttpPostedFile cargaArchivoIndividual;
            string NombreArchivo, Extension, Ruta;
            DataTable Columnas = ColumnasPorPerfil();
            //DataColumn[] llavePrimaria = new DataColumn[1];
            //llavePrimaria[0] = Columnas.Columns["Perfil"];
            //Columnas.PrimaryKey = llavePrimaria;
            object[] perfilBusqueda = new object[1];
            //DataRow filaEncontrada;
            List<object> resultados = new List<object>();

            for (int i = 0; i < archivosMasivos.Count; i++)
            {
                List<string> r = new List<string>();
                //filaEncontrada = null;
                cargaArchivoIndividual = archivosMasivos[i];
                NombreArchivo = Path.GetFileName(cargaArchivoIndividual.FileName);
                Extension = Path.GetExtension(cargaArchivoIndividual.FileName);
                Ruta = Server.MapPath("ArchivosImportados/" + NombreArchivo);
                cargaArchivoIndividual.SaveAs(Ruta);
                perfilBusqueda[0] = NombreArchivo.Replace(Extension, "");
                perfil = NombreArchivo.Replace(Extension, ""); 
                //filaEncontrada = Columnas.Rows.Find(perfilBusqueda);               

                if (Columnas.Rows.Count==0) { r.Add("Error"); r.Add("No existe relacion origen-destino para el perfil"); }
                else
                {                    
                    List<object> c = CargaArchivo(Ruta, Extension,Columnas.Rows[0]["tabla"].ToString(), Columnas.Rows[0]["Origen"].ToString(), Columnas.Rows[0]["Destino"].ToString(), Columnas.Rows[0]["Mapeo"].ToString());
                    if (Convert.ToBoolean(c[0])) 
                    {
                        r.Add("Correcto"); r.Add(" Registros Importados: " + c[1].ToString());                       
                    }
                    else { r.Add("Error"); r.Add(c[1].ToString()); }
                }
                resultados.Add(r);
            }
          
            ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:datosValidacionPrueba('Si');", true);
        }
        }
         else { ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:datosValidacionPrueba('No');", true); }
    }

    private DataTable ColumnasPorPerfil()
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ColumnasPerfilesCarga " + tipocarga);
        return ds.Tables[0];
    }

    public List<object> CargaArchivo(string Ruta, string Extension,string tabla, string Origen, string Destino, string Mapeo)
    {
        Extension = Extension.ToUpper();
        List<object> r = new List<object>();
        string msjError = "";
        Utilerias lib = new Utilerias();
        
        try
        {
            List<object> SalidaLectura = null;           
            SalidaLectura = LeerArchivoXLS(Ruta, Extension, Origen);
            if (!Convert.ToBoolean(SalidaLectura[0])) { r.Add(false); r.Add("Lectura de archivo, " + SalidaLectura[1].ToString()); return r; }

            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ResetTemporalMasivos '" + tabla + "TmpMasivo'");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add("Reiniciar tabla temporal de validacion"); return r; }
            
            List<object> bulk = lib.bulkCopyDinamico((DataTable)SalidaLectura[1],tabla+"TmpMasivo", Mapeo);
            if (!Convert.ToBoolean(bulk[0])) { r.Add(false); r.Add("Copiado a tabla, " + bulk[1].ToString()); return r; }

            ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_ProcesosEsp_ActualizaNominaCarga '" + tabla + "TmpMasivo','" + multi + "'");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add(ds.Tables[0].Rows[0][1].ToString()); return r; }

            r.Add(true);
            r.Add("Importación Corretamente");

            return r;
        }
        catch (Exception ex)
        {
            r.Add(false);
            r.Add(msjError + ". " + ex.Message);
            return r;
        }
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

    public List<object> LeerArchivoXLS(string Ruta, string Extension, string Origen)
    {
        List<object> r = new List<object>();
       // string[] mRelaciones = Mapeo.Split('|');
        //string[] mFilas;
        string msjError = "";
        string conStr = "";
        try
        {
            msjError = "Error de conexión al archivo XLS (cadenas de conexion)";
            switch (Extension)
            {
                case ".XLS": //Excel 97-03
                    conStr = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
                    //conStr = @"Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DriverId=790;Dbq=" + Ruta + "";
                    break;
                case ".XLSX": //Excel 07
                    conStr = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
                    break;
            }

            conStr = String.Format(conStr, Ruta);
            OleDbConnection connExcel = new OleDbConnection(conStr);
            OleDbCommand cmdExcel = new OleDbCommand();
            OleDbDataAdapter oda = new OleDbDataAdapter();
            cmdExcel.Connection = connExcel;

            //Obtiene nombre de todas las hojas
            msjError = "Error de conexión al archivo XLS (lectura de hojas)";
            connExcel.Open();


            DataTable dtExcelSchema;
            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            //string SheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
            connExcel.Close();

            //Lee informacion de todas las hojas (se queda con la primer hoja que lea sin error) 
            msjError = "No existen hojas activas ó nombre de columna no coinciden con perfil";
            connExcel.Open();
            DataTable dt = new DataTable();
            int conteo = dtExcelSchema.Rows.Count;
            foreach (DataRow dr in dtExcelSchema.Rows)
            {
                conteo--;
                try
                {
                    cmdExcel.CommandText = "SELECT " + Origen + " From [" + dr["TABLE_NAME"].ToString() + "]";
                    oda.SelectCommand = cmdExcel;
                    dt = new DataTable();
                    oda.Fill(dt);
                }
                catch (Exception err) { if (conteo == 0) { throw new Exception("lecturaxls"); } }
            }
            connExcel.Close();


            if (dt.Rows.Count <= 0)
            {
                r.Add(false);
                r.Add("El archivo no tiene registros");
            }
            else
            {
                r.Add(true);
                r.Add(dt);
            }
            return r;
        }
        catch (Exception ex)
        {
            r.Add(false);
            r.Add(msjError + ((ex.Message == "lecturaxls") ? "" : ". " + ex.Message));
            return r;
        }
    }
}