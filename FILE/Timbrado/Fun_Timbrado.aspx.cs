using JavaScience;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.IO;
using System.Security;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Xml;



public partial class FILE_Timbrado_Fun_Timbrado : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

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
    public static string[] Cargar_Empresas(string Filtro)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Listar_Empresas '" + Filtro + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "0";
            result[1] = "";
            result[2] = new Utilerias().convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else
        {
            result[0] = "1";
            result[1] = "No Existe Información";
            result[2] = null;
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_LLavePrivada(string Certificado, string FDCertificado, string LlavePrivada, string FDLlavePrivada, string Clave)
    {
        string[] result = { "", "", "", "", "", "" };

        //FileStream file;
        //StreamWriter sw;       

        //string RutaSellosDigitales = HttpContext.Current.Server.MapPath("SellosDigitales/" + Certificado);
        //string RutaLlavePrivada = HttpContext.Current.Server.MapPath("SellosDigitales/" + LlavePrivada);
        //string RutaContra = HttpContext.Current.Server.MapPath("SellosDigitales/Contraseña.txt");

        //if (File.Exists(RutaSellosDigitales))
        //{ File.Delete(RutaSellosDigitales); }
        //file = new FileStream(RutaSellosDigitales, FileMode.OpenOrCreate, FileAccess.Write);
        //sw = new StreamWriter(file);
        //sw.WriteLine(FDCertificado);
        //sw.Close();



        //if (File.Exists(RutaLlavePrivada))
        //{ File.Delete(RutaLlavePrivada); }
        // File.Create(RutaLlavePrivada);


        //if (File.Exists(RutaContra))
        //{ File.Delete(RutaContra); }
        //file = new FileStream(RutaContra, FileMode.OpenOrCreate, FileAccess.Write);
        //sw = new StreamWriter(file);
        //sw.WriteLine(Clave);
        //sw.Close();
        //file.Close();

        try
        {
            //string valores = GeneradorEncriptadoCFDI(RutaSellosDigitales);
            string valores = GeneradorEncriptadoCFDI("D:\\CONTROLES-2024\\SITIO-NOMINA_EJECUTIVO\\FILE\\Timbrado\\SellosDigitales\\00001000000510261964.cer");
            string[] datos = valores.Split('@');

            result[0] = "0";
            result[1] = "Archivos Creados";
            result[2] = datos[0];
            result[3] = datos[1];
            result[4] = datos[2];
            result[5] = datos[3];
        }
        catch (Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message + '/' + ex.StackTrace;
        }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Sello(string Certificado, string Data)
    {
        string[] result = { "", "", "" };
        FileStream file;
        StreamWriter sw;

        string RutaSellosDigitales = HttpContext.Current.Server.MapPath("SellosDigitales/" + Certificado);

        if (File.Exists(RutaSellosDigitales))
        { File.Delete(RutaSellosDigitales); }

        //file = new FileStream(RutaSellosDigitales, FileMode.OpenOrCreate, FileAccess.Write);
        //sw = new StreamWriter(file);
        //sw.WriteLine(Data);
        //sw.Close();
        //File.ReadAllBytes(RutaSellosDigitales);

        try
        {
            //string valores = GeneradorEncriptadoCFDI("D:\\CONTROLES-2024\\SITIO-NOMINA_EJECUTIVO\\FILE\\Timbrado\\SellosDigitales\\00001000000510261964.cer");
            string valores = GeneradorEncriptadoCFDI(RutaSellosDigitales);
            result[0] = "0";
            result[1] = "Archivos Creados";
        }
        catch (Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message + '/' + ex.StackTrace;
        }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Datos(string rfc, string Certificado, string NoCertificado, string Certificado64, string LlavePrivada, string Clave, string FechaCreacion, string Vigencia)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();

        string RutaLlavePrivada = HttpContext.Current.Server.MapPath("SellosDigitales/" + LlavePrivada);
        byte[] bytellame = File.ReadAllBytes(RutaLlavePrivada);
        string ArchivoKey64 = Convert.ToBase64String(bytellame);

        SecureString lSecStr = new SecureString();
        lSecStr.Clear();

        foreach (char c in Clave.ToCharArray())
            lSecStr.AppendChar(c);

        RSACryptoServiceProvider lrsa = opensslkey.DecodeEncryptedPrivateKeyInfo(bytellame, lSecStr);
        XmlDocument xml = new XmlDocument();
        xml.LoadXml(lrsa.ToXmlString(true));
        byte[] bytes = Encoding.UTF8.GetBytes(xml.OuterXml);
        string LaveCertificado64 = Convert.ToBase64String(bytes);

        List<SqlParameter> parametros = new List<SqlParameter>();
        {
            parametros.Add(new SqlParameter("@rfc", SqlDbType.VarChar) { Value = rfc });
            parametros.Add(new SqlParameter("@NomArchivoCer", SqlDbType.VarChar) { Value = Certificado });
            parametros.Add(new SqlParameter("@NoCertificado", SqlDbType.VarChar) { Value = NoCertificado });
            parametros.Add(new SqlParameter("@Certificado", SqlDbType.VarChar) { Value = Certificado64 });
            parametros.Add(new SqlParameter("@NomArchivoKey", SqlDbType.VarChar) { Value = LlavePrivada });
            parametros.Add(new SqlParameter("@ArchivoKey64", SqlDbType.VarChar) { Value = ArchivoKey64 });
            parametros.Add(new SqlParameter("@LlaveCertificado64", SqlDbType.VarChar) { Value = LaveCertificado64 });
            parametros.Add(new SqlParameter("@Clave", SqlDbType.VarChar) { Value = Clave });
            parametros.Add(new SqlParameter("@FechaCreacion", SqlDbType.VarChar) { Value = FechaCreacion });
            parametros.Add(new SqlParameter("@Vigencia", SqlDbType.VarChar) { Value = Vigencia });
        };


        DataSet ds = lib.ejecutarProcedimiento("GESRH_SPT_Timbrado_Cat_Guardar_Datos", parametros);

        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "0";
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        else
        {
            result[0] = "1";
            result[1] = ds.Tables[0].Rows[0][1].ToString();
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenas()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarQuincenas ''");
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        if (ds.Tables[0].Rows.Count > 0)
        {
            //result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString();
                campo.attributes = ds.Tables[0].Rows[i][3].ToString();
                lstcampo.Add(campo);
            }
            result[0] = "0";
            result[1] = js.Serialize(lstcampo);
        }
        else
        {
            result[0] = "1";
            result[1] = "No existen quincenas a procesar";
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Master(string Quincena)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_GeneraMaster  '" + Quincena + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        // result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Plantillas()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_GeneraPlantilla");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        //result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        //result[3] = lib.convertirDatatableEnJsonString(ds.Tables[2]);

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Control_Plantillas(string Quincena)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Control_Plantillas '" + Quincena + "'");

        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        result[2] = ds.Tables[1].Rows[0][1].ToString();
        result[3] = ds.Tables[1].Rows[0][2].ToString();

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Totales(string Quincena)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Totales_Master '" + Quincena + "'");

        result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Detener_Plantillas()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_GeneraPlantilla_Detener ");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Nomina_Externa(DatosCargar Obj)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        string Nom = Obj.DatosNom;
        string Ind = Obj.DatosInd;
        string ValNom = "";
        string ValInd = "";

        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int idusu = 1;// objusuario.Id;


        try
        {
            var lstnom = JsonConvert.DeserializeObject<List<ArchivoNomina>>(Nom);
            foreach (ArchivoNomina dat in lstnom)
            {
                ValNom += "''" + dat.Año_nomina + "'',''" + dat.periodo_nomina + "'',''" + dat.Tipo_Nomina + "'',''" + dat.RFC + "'',''" + dat.NumEmpleado + "'',''" + dat.NumPlaza + "'',''" + dat.nombreEmpleado + "'',''" + dat.Curp + "'',''" + dat.DomicilioFiscalReceptor + "'',''" + dat.TipoNomina + "'',''" + dat.FormaPago + "'',"
                         + "''" + dat.Liquido + "'',''" + dat.MetodoPago + "'',''" + dat.Serie + "'',''" + dat.Recibo + "'',''" + dat.LugarExpedicion + "'',''" + dat.NumCtaPago + "'',''" + dat.FechaPago + "'',''" + dat.FechaInicialPago + "'',''" + dat.FechaFinalPago + "'',"
                         + "''" + dat.NumDiasPagados + "'',''" + dat.TotalPercepciones + "'',''" + dat.TotalDeducciones + "'',''" + dat.TotalOtrosPagos + "'',''" + dat.RegistroPatronal + "'',''" + dat.OrigenRecurso + "'',''" + dat.MontoRecursoPropio + "'',''" + dat.NumSeguridadSocial + "'',"
                         + "''" + dat.FechaInicioRelLaboral + "'',''" + dat.Antiguedad + "'',''" + dat.TipoContrato + "'',''" + dat.Sindicalizado + "'',''" + dat.TipoJornada + "'',''" + dat.TipoRegimen + "'',''" + dat.Departamento + "'',''" + dat.Puesto + "'',''" + dat.RiesgoPuesto + "'',"
                         + "''" + dat.PeriocidadPago + "'',''" + dat.Banco + "'',''" + dat.CuentaBancaria + "'',''" + dat.SalarioBaseCotApor + "'',''" + dat.SalarioDiarioIntegrado + "'',''" + dat.ClaveEntFed + "'',''" + dat.TotalSueldos + "'',''" + dat.TotalSepararacionIndemnizacion + "'',''" + dat.TotalJubilacionPensionRetiro + "'',"
                         + "''" + dat.TotalGrabadoPercepciones + "'',''" + dat.TotalExcentoPercepciones + "'',''" + dat.TotalUnaExhibicionJPR + "'',''" + dat.TotalParcialJPR + "'',''" + dat.MontoDiarioJPR + "'',''" + dat.IngresoAcumulableJPR + "'',''" + dat.IngresoNoAcumulableJPR + "'',"
                         + "''" + dat.TotalPagoSi + "'',''" + dat.NumAniosServicioSi + "'',''" + dat.UltimoSueldoMensOrdSi + "'',''" + dat.IngresoAcumulableSi + "'',''" + dat.IngresoNoAcumulableSi + "'',''" + dat.TotalOtrasDeducciones + "'',''" + dat.TotalImpuestoRetenidos + "'',"
                         + "''" + dat.SubsidioCausado + "'',''" + dat.SueldoAFavorCom + "'',''" + dat.AnioCom + "'',''" + dat.RemanenteSalFavCom + "'',''" + dat.relacion_tipo_clave + "'',''" + dat.relacion_UUID + "'',''" + dat.Comentario + "'',''" + dat.id_Recibo + "''|";
            }
            ValNom = ValNom.Substring(0, ValNom.Length - 1);

            var lstind = JsonConvert.DeserializeObject<List<ArchivoIndicadores>>(Ind);
            foreach (ArchivoIndicadores dat in lstind)
            {
                ValInd += "''" + dat.año_nomina + "'',''" + dat.Periodo_Nomina + "'',''" + dat.Tipo_Nomina + "'',''" + dat.RFC + "'',''" + dat.NumEmpleado + "'',''" + dat.NumPlaza + "'',''" + dat.TipoIndicador + "'',''" + dat.Tipo + "'',"
                         + "''" + dat.clave + "'',''" + dat.Concepto + "'',''" + dat.ImporteGravado + "'',''" + dat.ImporteExcento + "'',''" + dat.DiasIncapacidad + "'',''" + dat.TipoIncapacidad + "'',''" + dat.ImporteMonetario + "'',''" + dat.id_Recibo + "''|";
            }
            ValInd = ValInd.Substring(0, ValInd.Length - 1);

            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Carga_PlantillasExternos " + Obj.Organismo + "," + idusu + ",'" + Obj.Quincena + "','" + ValNom + "','" + ValInd + "'");
            if (ds.Tables.Count > 0)
            {
                result[0] = ds.Tables[0].Rows[0][0].ToString();
                result[1] = ds.Tables[0].Rows[0][1].ToString();
                result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            }
            ds.Dispose();
        }
        catch (Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message.ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Nominas_Externas()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        ClsDropList clsDropList = new ClsDropList();
        List<ClsDropList> lstcat = new List<ClsDropList>();
        try
        {
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Listar_Empresas_Externas");
            if (ds.Tables[0].Rows.Count > 0)
            {
                clsDropList = new ClsDropList();
                clsDropList.campo = "x";
                clsDropList.descripcion = "Seleccione una Opción";
                clsDropList.selected = true;
                lstcat.Add(clsDropList);

                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    clsDropList = new ClsDropList();
                    clsDropList.campo = ds.Tables[0].Rows[i][0].ToString();
                    clsDropList.descripcion = ds.Tables[0].Rows[i][0].ToString() + " / " + ds.Tables[0].Rows[i][1].ToString();
                    clsDropList.selected = false;
                    lstcat.Add(clsDropList);
                }
                result[0] = "0";
                result[1] = "";
                result[2] = js.Serialize(lstcat);
            }
            else
            {
                result[0] = "1";
                result[1] = ds.Tables[0].Rows[0][1].ToString();

            }
            ds.Dispose();
        }
        catch (Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message.ToString();
        }
        return result;

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Nominas_Externas_Cargadas()
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        try
        {
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Timbrado_Listar_Empresas_Cargadas");
            if (ds.Tables[0].Rows.Count > 0)
            {
                result[0] = "0";
                result[1] = "";
                result[2] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            }
            else
            {
                result[0] = "1";
                result[1] = ds.Tables[0].Rows[0][1].ToString();

            }
                ds.Dispose();            
        }
        catch (Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message.ToString();
        }
        return result;
    }
}