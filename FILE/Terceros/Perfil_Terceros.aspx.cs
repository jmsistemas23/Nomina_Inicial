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

public partial class FILE_Terceros_Perfil_Terceros : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        btnexaminar.Attributes.Add("onclick", "document.getElementById('" + cargaArchivo.ClientID + "').click(); return false;");
        btncargar.Attributes.Add("onclick", "$('#loading').show(); return true;");
    }

    public static string[] DiseñoGrid(string strtabla)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][4].ToString();
            result[1] = ds.Tables[0].Rows[0][5].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    protected void btnCargarArchivo_Click(object sender, EventArgs e)
    {
        if (cargaArchivo.HasFile)
        {
            string NombreArchivo = Path.GetFileName(cargaArchivo.PostedFile.FileName);
            string Extension = Path.GetExtension(cargaArchivo.PostedFile.FileName);
            string Ruta = Server.MapPath("Archivos/" + cargaArchivo.FileName);
            cargaArchivo.SaveAs(Ruta);
            string columnas = columnasArchivo(Ruta, Extension);
            ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:CARGAR_NUEVO_PERFIL('0','" + NombreArchivo.Replace(Extension, "") + "','" + Extension + "','" + columnas + "',false);", true);
        }
    }

    public string columnasArchivo(string Ruta, string Extension)
    {
        Extension = Extension.ToUpper();
        string cols = "";
        try
        {
            string conStr = "";
            switch (Extension)
            {
                case ".XLS": //Excel 97-03
                    conStr = ConfigurationManager.ConnectionStrings["Excel03ConString"].ConnectionString;
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

            //Get the name of First Sheet
            connExcel.Open();
            DataTable dtExcelSchema;
            dtExcelSchema = connExcel.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);
            //string SheetName = dtExcelSchema.Rows[0]["TABLE_NAME"].ToString();
            connExcel.Close();

            //Lee informacion de todas las hojas (se queda con la primer hoja que lea sin error) 
            //msjError = "Error de conexión al archivo XLS (lectura de registros)";
            connExcel.Open();
            DataTable dt = new DataTable();
            int conteo = dtExcelSchema.Rows.Count;
            foreach (DataRow dr in dtExcelSchema.Rows)
            {
                conteo--;
                try
                {
                    cmdExcel.CommandText = "SELECT Top 1 * From [" + dr["TABLE_NAME"].ToString() + "]";
                    //cmdExcel.CommandText = "SELECT " + Origen + " From [" + dr["TABLE_NAME"].ToString() + "]";
                    oda.SelectCommand = cmdExcel;
                    dt = new DataTable();
                    cols = "";
                    oda.Fill(dt);
                    foreach (DataColumn c in dt.Columns)
                    {
                        cols += "," + c.ColumnName;
                    }
                    break;
                }
                catch { if (conteo == 0) { cols = ""; } }
            }
            connExcel.Close();
            return cols.Substring(1, cols.Length - 1);
        }
        catch (Exception ex)
        {
            return "";
        }
    }
}