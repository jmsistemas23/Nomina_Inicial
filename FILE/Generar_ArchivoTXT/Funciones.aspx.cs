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

public partial class FILE_Generar_ArchivoTXT_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static void DESCARGAR_ARCHIVO_TXT(string nombrearchivo)
    //{
    //    ScriptManager.RegisterClientScriptBlock(this.page, this.GetType(), "AbrirDescarga", string.Format("window.open('Descargas.aspx?Fileid={0}');", nombrearchivo), true);
       
    //}

    //private static void DescargarDocumento(String ruta,string archivo)
    //{
    //    string fileExtension = ".txt";
    //    //try
    //    //{
    //        String prueba;
    //        HttpContext.Current.Response.Clear();
    //        HttpContext.Current.Response.ContentType = GetContentType(fileExtension);
    //        //prueba = Path.GetFileName(ruta).ToString();
    //        HttpContext.Current.Response.AppendHeader("Content-Disposition", "attachment; filename=" + archivo);
    //        HttpContext.Current.Response.TransmitFile(ruta);
    //        HttpContext.Current.Response.End();
    //    //}
    //    //catch (Exception ex)
    //    //{
    //    //    ControlarExcepcion(ex);
    //    //}
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CREAR_ARCHIVO_TXT(string nombrearchivo)
    {
        string[] result = { "", "","" };
        string encabezado = "", cadena = "", datosfinales = "";
        try
        {
            Utilerias lib = new Utilerias();
            DataSet ds = lib.ejecutarConsultaEnDataSet("select TOP 10 numplaza,cveesppl,cvetpl,cveadspl,cvepuepl  from plazas where calpla=1");
            if (ds.Tables[0].Rows.Count > 0)
            {
                //sacar la primera linea del archivo
                //for (int col = 0; col < ds.Tables[0].Columns.Count; col++)
                //{ encabezado = encabezado + ds.Tables[0].Rows[0][col].ToString(); }

                string Ruta = HttpContext.Current.Server.MapPath("Archivos/" + nombrearchivo + ".txt");
                if (File.Exists(Ruta))
                { File.Delete(Ruta); }
                FileStream file = new FileStream(Ruta, FileMode.OpenOrCreate, FileAccess.Write);
                StreamWriter sw = new StreamWriter(file);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    result[0] = "1";
                    foreach (DataRow dr in ds.Tables[0].Rows)
                    {
                        for (int i = 0; i <= ds.Tables[0].Columns.Count - 1; i++)
                        {
                            cadena = cadena + dr[i].ToString();
                        }
                        sw.WriteLine(cadena);
                        cadena = "";
                    }

                    //for (int col = 0; col < ds.Tables[2].Columns.Count; col++)
                    //{ datosfinales = datosfinales + ds.Tables[2].Rows[0][col].ToString(); }
                    //sw.WriteLine(datosfinales);

                    sw.Close();
                    file.Close();

                    #region Ruta de la descarga
                    //string prot = "http";
                    //string domainname = HttpContext.Current.Request.ServerVariables.Get("SERVER_NAME");
                    //string cad = HttpContext.Current.Request.ServerVariables.Get("SCRIPT_NAME");
                    //int x = Convert.ToInt16(cad.Length.ToString());
                    //x = x - 26;
                    //string pth = "";
                    //pth = cad.Substring(0, x) + "archivos/" + nombrearchivo + ".txt";
                   
                    //result[2] = "http://" + domainname + pth;                  
                    #endregion
                    //result[2] = "archivos/" + nombrearchivo + ".txt";               
                  
                   
                }
            }
            else { result[0] = "0"; }
        }
        catch (Exception ev)
        {
            result[0] = "E";
            result[1] = ev.ToString();            
        }
        return result;
    }

    private static string GetContentType(string fileExtension)
    {
        if (string.IsNullOrEmpty(fileExtension))
            return string.Empty;

        string contentType = string.Empty;
        switch (fileExtension)
        {
            case ".htm":
            case ".html":
                contentType = "text/HTML";
                break;

            case ".txt":
                contentType = "text/plain";
                break;

            case ".doc":
            case ".rtf":
            case ".docx":
                contentType = "Application/msword";
                break;

            case ".xls":
            case ".xlsx":
                contentType = "Application/x-msexcel";
                break;

            case ".jpg":
            case ".jpeg":
                contentType = "image/jpeg";
                break;

            case ".gif":
                contentType = "image/GIF";
                break;

            case ".pdf":
                contentType = "application/pdf";
                break;
        }

        return contentType;
    }

    private static Stream GetFile(string ruta)
    {
        FileStream fileStream = new FileStream(ruta, FileMode.Open, FileAccess.Read);
        return fileStream;
    }
}