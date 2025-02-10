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
using System.Data.OleDb;
using System.IO;

public partial class FILE_Cargar_Excel_Importacion_Excel : System.Web.UI.Page
{
    string strtabla = "";
    Int64 contcarga = 0;
    string multi = "";
    int id = 0;
    protected void Page_Load(object sender, EventArgs e)
    {
        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}

        btnexaminar.Attributes.Add("onclick", "document.getElementById('" + cargaArchivo.ClientID + "').click(); return false;");
        btncargar.Attributes.Add("onclick", "$('#loading').show(); return true;");       
    }

    protected void btnCargarArchivo_Click(object sender, EventArgs e)
    {
        multi = Request.Form["hmulti"].ToString();
        id = Convert.ToInt16(Request.Form["hid"].ToString());
        Utilerias lib = new Utilerias();
        string perfil = "";
        if (cargaArchivo.HasFile)
        {
            HttpFileCollection archivosMasivos = Request.Files;
            HttpPostedFile cargaArchivoIndividual;
            string NombreArchivo, Extension, Ruta;
            DataTable Columnas = ColumnasPorPerfil();
            object[] perfilBusqueda = new object[1];
            List<object> resultados = new List<object>();

            for (int i = 0; i < archivosMasivos.Count; i++)
            {
                List<string> r = new List<string>();
                cargaArchivoIndividual = archivosMasivos[i];
                NombreArchivo = Path.GetFileName(cargaArchivoIndividual.FileName);
                Extension = Path.GetExtension(cargaArchivoIndividual.FileName);
                Ruta = Server.MapPath("Archivos/" + NombreArchivo);
                cargaArchivoIndividual.SaveAs(Ruta);
                perfilBusqueda[0] = NombreArchivo.Replace(Extension, "");
                perfil = NombreArchivo.Replace(Extension, "");

                if (Columnas.Rows.Count == 0) { r.Add("Error"); r.Add("No existe relacion origen-destino para el perfil"); }
                else
                {
                    List<object> c = CargaArchivo(Ruta, Extension, "importacion_Excel", Columnas.Rows[0][3].ToString(), Columnas.Rows[0][4].ToString(), Columnas.Rows[0][5].ToString());
                    if (Convert.ToBoolean(c[0]))
                    {
                        r.Add("Correcto"); r.Add(" Registros Importados: " + c[1].ToString());
                    }
                    else { r.Add("Error"); r.Add(c[1].ToString()); }
                }
                resultados.Add(r);
            }
            ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:CargaRealizada('Si');", true);
        }
        else { ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:CargaRealizada('No');", true); }
    }

    private DataTable ColumnasPorPerfil()
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargarExcel_ListarConfiguracionPerfiles " + id);
        return ds.Tables[0];
    }

    public List<object> CargaArchivo(string Ruta, string Extension, string tabla, string Origen, string Destino, string Mapeo)
    {
       
        Extension = Extension.ToUpper();
        List<object> r = new List<object>();
        string msjError = "";
        Utilerias lib = new Utilerias();

        //try
        //{
            List<object> SalidaLectura = null;
            SalidaLectura = LeerArchivoXLS(Ruta, Extension, Origen, Mapeo);
            if (!Convert.ToBoolean(SalidaLectura[0])) { r.Add(false); r.Add("Lectura de archivo, " + SalidaLectura[1].ToString()); return r; }

            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargaInicial_ResetCarga 'importacion_Excel'");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add("Reiniciar tabla de carga"); return r; }

            List<object> bulk = lib.bulkCopyDinamico((DataTable)SalidaLectura[1], tabla, Mapeo);
            if (!Convert.ToBoolean(bulk[0])) { r.Add(false); r.Add("Copiado a tabla, " + bulk[1].ToString()); return r; }

            ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CargarExcel_ActualizarCarga "+id+",'importacion_Excel"+"','"+multi+"'");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add(ds.Tables[0].Rows[0][1].ToString()); return r; }

            r.Add(true);
            r.Add("Importación Corretamente");

            return r;
        //}
        //catch (Exception ex)
        //{
        //    r.Add(false);
        //    r.Add(msjError + ". " + ex.Message);
        //    return r;
        //}
    }

    public List<object> LeerArchivoXLS(string Ruta, string Extension, string Origen, string Mapeo)
    {
        List<object> r = new List<object>();
        string[] mRelaciones = Mapeo.Split('|');
        string[] mFilas;
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
                    //cmdExcel.CommandText = "SELECT " + Origen + " From [progeduc]";

                    cmdExcel.CommandTimeout = 70000;
                    oda.SelectCommand = cmdExcel;
                    dt = new DataTable();
                    oda.Fill(dt);

                    contcarga = dt.Rows.Count;

                    if (contcarga > 0)
                    {
                        string colVal = "";
                        string colValTB = "";
                        foreach (string v in mRelaciones)
                        {
                            mFilas = v.Split(',');
                            colVal = mFilas[1].Replace("[", "").Replace("]", "");
                            colValTB = mFilas[0].Replace("[", "").Replace("]", "");
                        }
                        break;
                    }
                }
                catch (Exception err)
                {
                    msjError = err.ToString();
                    if (conteo == 0) { throw new Exception("lecturaxls"); }
                }
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