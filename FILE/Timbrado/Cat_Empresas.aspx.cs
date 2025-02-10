using System;
using System.IO;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;


public partial class FILE_Timbrado_Cat_Empresas : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        // btnGenerar.Attributes.Add("AutoPostBack", "False");

        //if (!IsPostBack)
        //{
            btnExaminarCer.Attributes.Add("onclick", "document.getElementById('" + FUExaminarCer.ClientID + "').click(); return false;");
            btnExaminarkey.Attributes.Add("onclick", "document.getElementById('" + FUExaminarKey.ClientID + "').click(); return false;");

            btnGenerar.Attributes.Add("onserverclick", "$('#loading').show(); return false;");
       // }       
    }

    protected void btnGenerar_Click(object sender, EventArgs e)
    {
        if (FUExaminarCer.HasFile)
        {
            string[] result = { "", "", "", "", "", "" };
            string nombreArchivocer = string.Empty;
            string nombreArchivokey = string.Empty;
            string Error = "0";
            string Mensaje = "";
            string Valores = "";           
            string destino = @"~/file/timbrado/SellosDigitales/";

            string carpetaDestino = Server.MapPath(destino);
            nombreArchivocer = System.IO.Path.GetFileName(FUExaminarCer.PostedFile.FileName);
            nombreArchivokey = System.IO.Path.GetFileName(FUExaminarKey.PostedFile.FileName);

            string SaveLocationcer = carpetaDestino + nombreArchivocer;
            string SaveLocationkey = carpetaDestino + nombreArchivokey;
            try
            {
                if (File.Exists(SaveLocationkey))
                { File.Delete(SaveLocationkey); }

                FUExaminarKey.PostedFile.SaveAs(SaveLocationkey);                

                if (File.Exists(SaveLocationcer))
                { File.Delete(SaveLocationcer); }

                FUExaminarCer.PostedFile.SaveAs(SaveLocationcer);

                Valores = GeneradorEncriptadoCFDI(SaveLocationcer);
               
                Error = "0";
                Mensaje = "Archivos Creados";
            }
            catch (Exception ex)
            {
                Error = "1";
                Mensaje = ex.Message;
            }

            string Datos = string.Format("Cargar_Respuesta('{0}','{1}','{2}','{3}','{4}');", Error, Mensaje, Valores, nombreArchivocer, nombreArchivokey);

            ScriptManager.RegisterStartupScript(this, this.GetType(), "Script", Datos, true);
        }
    }

    public string Sellar(string CadenaOriginal, byte[] ArchivoClavePrivada, string lPassword)
    {
        byte[] ClavePrivada = ArchivoClavePrivada;
        byte[] bytesFirmados = null;
        byte[] bCadenaOriginal = null;

        SecureString lSecStr = new SecureString();
        SHA256Managed sham = new SHA256Managed();
        lSecStr.Clear();

        foreach (char c in lPassword.ToCharArray())
            lSecStr.AppendChar(c);

        RSACryptoServiceProvider lrsa = JavaScience.opensslkey.DecodeEncryptedPrivateKeyInfo(ClavePrivada, lSecStr);
        bCadenaOriginal = Encoding.UTF8.GetBytes(CadenaOriginal);
        try
        {
            bytesFirmados = lrsa.SignData(Encoding.UTF8.GetBytes(CadenaOriginal), sham);
        }
        catch (NullReferenceException)
        {
            throw new NullReferenceException("Clave privada incorrecta.");
        }
        string sellodigital = Convert.ToBase64String(bytesFirmados);
        return sellodigital;

    }


    public static string GeneradorEncriptadoCFDI(string _pathCer)
    {
        string DatosCFDI;
        string numeroCertificado, aa, b, c;
        SelloDigital.leerCER(_pathCer, out aa, out b, out c, out numeroCertificado);

        SelloDigital oSelloDigital = new SelloDigital();
        DatosCFDI = numeroCertificado;
        DatosCFDI += "@" + oSelloDigital.Certificado(_pathCer) + "@" + aa + "@" + b;

        return DatosCFDI;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Sello(HttpPostedFile data)
    {
        string nombreArchivo = string.Empty;
        string Valores = "";

        string[] result = { "", "", "", "", "", "" };
        HttpPostedFile fileup = HttpContext.Current.Request.Files["FUExaminarCer"];

        result[0] = "0";
        result[1] = "Archivos Creados";
        result[2] = Valores;

        //if (fileup.ContentLength > 0)
        //{

        //    string carpetaDestino = HttpContext.Current.Server.MapPath("SellosDigitales/");
        //    nombreArchivo = System.IO.Path.GetFileName(fileup.FileName);

        //    string SaveLocation = carpetaDestino + nombreArchivo;
        //    try
        //    {
        //        if (File.Exists(SaveLocation))
        //        { File.Delete(SaveLocation); }

        //        fileup.SaveAs(SaveLocation);

        //        Valores = GeneradorEncriptadoCFDI(SaveLocation);

        //        result[0] = "0";
        //        result[1] = "Archivos Creados";
        //        result[2] = Valores;
        //    }
        //    catch (Exception ex)
        //    {
        //        result[0] = "1";
        //        result[1] = ex.Message;
        //    }            
        //}
        return result;
    }
}