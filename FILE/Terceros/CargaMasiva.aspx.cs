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
using System.Data.Odbc;
using System.Web.UI;


public partial class FILE_Terceros_CargaMasiva : System.Web.UI.Page
{
    //OdbcConnection connExcel;
    string usuario = "";
    string multi = "";
    Int64 contcarga = 0;
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] BuscarPerfiles()
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga");
        result[0] = DataTableToJsonObj(ds.Tables[0]);
        result[1] = ds.Tables[1].Rows[0][0].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string ConsultarPerfil(string perfil, string columnas)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ConsultaPerfil '" + perfil + "','" + columnas + "'");
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(DataTableToStringArray(ds.Tables[0]));
        return datos;
    }

    protected void btnCargarArchivo_Click(object sender, EventArgs e)
    {       
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        usuario = objusuario.Usuario;

        multi = Request.Form["hmulti"].ToString();
        if (multi != "")
        {
            Utilerias lib = new Utilerias();
            lib.EJECUTAR_SENTENCIA("exec GESRH_SPT_Terceros_ReinicioCargaPerfiles");

            //string valores = "";
            if (cargaArchivo.HasFile)
            {
                HttpFileCollection archivosMasivos = Request.Files;
                HttpPostedFile cargaArchivoIndividual;
                string NombreArchivo, Extension, Ruta;
                DataTable Columnas = ColumnasPorPerfil();
                DataColumn[] llavePrimaria = new DataColumn[1];
                llavePrimaria[0] = Columnas.Columns["Archivo"];
                Columnas.PrimaryKey = llavePrimaria;
                object[] perfilBusqueda = new object[1];
                DataRow filaEncontrada;
                List<object> resultados = new List<object>();
                string perfil = "";


                for (int i = 0; i < archivosMasivos.Count; i++)
                {
                    List<string> r = new List<string>();
                    filaEncontrada = null;
                    cargaArchivoIndividual = archivosMasivos[i];
                    NombreArchivo = Path.GetFileName(cargaArchivoIndividual.FileName);
                    Extension = Path.GetExtension(cargaArchivoIndividual.FileName);
                    Ruta = Server.MapPath("Archivos/" + NombreArchivo);

                    if (File.Exists(Ruta)) { File.Delete(Ruta); }

                    cargaArchivoIndividual.SaveAs(Ruta);
                    //perfilBusqueda[i] = NombreArchivo.ToLower();
                    filaEncontrada = Columnas.Rows.Find(NombreArchivo.ToLower());                    

                    /*perfil = filaEncontrada[1].ToString();
                    r.Add(perfil);*/

                    //if (filaEncontrada == null) { r.Add("Error"); r.Add("No existe relacion origen-destino para el perfil"); }
                    //else
                    if (filaEncontrada != null)
                    {
                        perfil = filaEncontrada[1].ToString();
                        r.Add(perfil);
                        List<object> c = CargaArchivo(Ruta, Extension, filaEncontrada["Origen"].ToString(), filaEncontrada["Destino"].ToString(), filaEncontrada["Clave"].ToString(), filaEncontrada["Perfil"].ToString(), filaEncontrada["Mapeo"].ToString());
                        if (Convert.ToBoolean(c[0])) { r.Add("Correcto"); r.Add(" Registros Importados: " + c[1].ToString()); }
                        else { r.Add("Error"); r.Add(c[1].ToString()); }
                        resultados.Add(r);
                    }

                    foreach (object o in resultados)
                    {
                        List<string> s = (List<string>)o;
                        //valores = "''" + s[0] + "''|''" + s[1] + "''|''" + s[2].Replace("'", "") + "''";
                        lib.EJECUTAR_SENTENCIA("GESRH_SPT_Terceros_ValidacionesCarga '" + perfil + "','" + s[1] + "','" + s[2].Replace("'", "") + "'");
                    }
                }

                //string salida = "";
                //foreach (object o in resultados)
                //{
                //    List<string> s = (List<string>)o;
                //    if (salida.Length <= 0) { salida = s[0] + "|" + s[1] + "|" + s[2]; }
                //    else { salida += "||" + s[0] + "|" + s[1] + "|" + s[2]; }
                //}

                //salida = salida.Replace("'", "");
                //ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:datosValidacion('" + salida + "');", true);

                //DataTable dt = new DataTable();
                //dt.Columns.Add(new DataColumn("Perfil"));
                //dt.Columns.Add(new DataColumn("Estatus"));
                //dt.Columns.Add(new DataColumn("Mensaje"));

                //string salida = ""; string valores = "";
                //foreach (object o in resultados)
                //{
                //    List<string> s = (List<string>)o;                             
                //    //dt.Rows.Add(s[0], s[1], s[2].Replace("'", ""));
                //    valores += "''"+s[0] + "''|''" + s[1] + "''|''" + s[2].Replace("'", "")+"''";
                //    lib.EJECUTAR_SENTENCIA("exec GESRH_SPT_Terceros_ValidacionesCarga 'G','" + perfil + "','" + valores + "'"); //"insert into GESRH_Nom_Terceros_Validaciones (Perfil,Estatus,Mensaje) values("+valores+")"            
                //}                                  

                //string datos = DataTableToJsonObj(dt);
                //salida = salida.Replace("'", "");
                ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:datosValidacionPrueba('Si');", true);
            }
        }
        else { ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:datosValidacionPrueba('No');", true); }
    }
    
    public List<object> CargaArchivo(string Ruta, string Extension, string Origen, string Destino, string Clave, string Perfil, string Mapeo)
    {
        Extension = Extension.ToUpper();
        List<object> r = new List<object>();
        string msjError = "";
        try
        {
            List<object> SalidaLectura = null;
            if (Extension == ".TXT")
            {
                SalidaLectura = LeerArchivoTXT(Ruta, Origen, Mapeo);
                if (Convert.ToBoolean(SalidaLectura[0])) { Mapeo = SalidaLectura[2].ToString(); }
            }
            else { SalidaLectura = LeerArchivoXLS(Ruta, Extension, Origen, Mapeo); }
            if (!Convert.ToBoolean(SalidaLectura[0])) { r.Add(false); r.Add(SalidaLectura[1].ToString()); return r; }

            Utilerias lib = new Utilerias();
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ResetTemporalMasivos");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add("Reiniciar tabla temporal de validacion"); return r; }

            List<object> bulk = lib.bulkCopyDinamico((DataTable)SalidaLectura[1], "capterTmpMasivo", Mapeo);
            if (!Convert.ToBoolean(bulk[0])) { r.Add(false); r.Add("Copiado a tabla temporal, " + bulk[1].ToString()); return r; }

            ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_ValidaCargaMasiva '" + Clave + "','" + Extension + "','" + usuario + "','" + multi+"'");
            if (ds.Tables[0].Rows[0][0].ToString() == "1") { r.Add(false); r.Add(ds.Tables[0].Rows[0][1].ToString()); return r; }

            r.Add(true);
            r.Add(ds.Tables[0].Rows[0][1].ToString());
            return r;
        }
        catch (Exception ex)
        {
            r.Add(false);
            r.Add(msjError + ". " + ex.Message);
            return r;
        }
    }

    //CREAR CONEXION A DIFERENTES TIPOS DE ODBCONEXXION
    public OdbcConnection ConexionOdbc(string RutaArchivo, string ExtensionArchivo)
    {
        OdbcConnection odbcon = new OdbcConnection();

        switch (ExtensionArchivo)
        {            
            case ".XLS":
                {
                    odbcon.ConnectionString = @"Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DriverId=790;Dbq=" + RutaArchivo +"";
                    break;
                }
            case ".XLSX":
                {
                    odbcon.ConnectionString = @"Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)};DriverId=790;Dbq=" + RutaArchivo + "";
                    break;
                }
        }
        return odbcon;
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
                            if (colVal == "contadortr")
                            {
                                foreach (DataRow drValida in dt.Rows)
                                {
                                    if (drValida[colValTB].ToString().Trim().Length <= 0 || drValida[colValTB].ToString() == "0") { drValida[colValTB] = "1"; }
                                }
                            }

                            if (colVal == "importetr")
                            {
                                foreach (DataRow drValida in dt.Rows)
                                {
                                    if (drValida[colValTB].ToString().Length > 15) { drValida[colValTB] = drValida[colValTB].ToString().Substring(0, (drValida[colValTB].ToString().IndexOf(".")) + 3); }
                                    if (drValida[colValTB].ToString().Contains(".")) { drValida[colValTB] = Math.Round(Convert.ToDecimal(drValida[colValTB].ToString()), 2).ToString(); }
                                }
                            }

                            if (colVal == "rfcemptr")
                            {
                                foreach (DataRow drValida in dt.Rows)
                                {
                                    if (drValida[colValTB].ToString().Length > 15) { drValida[colValTB] = drValida[colValTB].ToString().Trim(); }
                                }
                            }

                            if (colVal == "numemptr")
                            {
                                foreach (DataRow drValida in dt.Rows)
                                {
                                    if (drValida[colValTB].ToString().Trim().Length <= 0) { drValida[colValTB] = "0"; }
                                }
                            }
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

    public List<object> LeerArchivoTXT(string Ruta, string Origen, string Mapeo)
    {
        List<object> r = new List<object>();
        string msjError = "";
        try
        {
            DataTable dt = new DataTable();
            string mapeoBulk = "";
            string[] mRelaciones = Mapeo.Split('|');
            string[] mLimites;
            string[] mColumnas = Mapeo.Split('|');
            foreach (string v in mRelaciones)
            {
                mColumnas = v.Split(',');
                dt.Columns.Add(new DataColumn(mColumnas[1]));
                if (mapeoBulk.Length <= 0) { mapeoBulk = mColumnas[1] + "," + mColumnas[1]; }
                else { mapeoBulk += "|" + mColumnas[1] + "," + mColumnas[1]; }
            }

            msjError = "Error de conexión al archivo TXT";
            int contador;
            string line;
            DataRow dr;

            // Read the file and display it line by line.
            System.IO.StreamReader file = new System.IO.StreamReader(Ruta);
            while ((line = file.ReadLine()) != null)
            {
                contador = 0;
                dr = dt.NewRow();
                string pruebas;
                foreach (string v in mRelaciones)
                {
                    mColumnas = v.Split(',');
                    mLimites = mColumnas[0].Split('-');
                    dr[contador] = line.Substring(int.Parse(mLimites[0]) - 1, (int.Parse(mLimites[1]) + 1) - int.Parse(mLimites[0]));
                    if (mColumnas[1] == "importetr") { dr[contador] = dr[contador].ToString().Insert(dr[contador].ToString().Length - 2, "."); }
                    contador++;
                }
                dt.Rows.Add(dr);
            }
            file.Close();

            r.Add(true);
            r.Add(dt);
            r.Add(mapeoBulk);
            return r;
        }
        catch (Exception ex)
        {
            r.Add(false);
            r.Add(msjError + ". " + ex.Message);
            return r;
        }
    }

    public static DataTable ColumnasPorPerfil()
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_ColumnasPorPerfil");
        return ds.Tables[0];
    }

    public static string CreacionTablaTemporal(string perfil, string destino)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_PerfilesCarga_CrearTemporalesDeCarga '" + perfil + "','" + destino + "'");
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string BuscarCamposDisponiblesParaRelacion()
    {
        string result = "";
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_CamposCaptura");
        foreach (DataRow dr in ds.Tables[0].Rows)
        {
            if (dr["Reservado"].ToString() == "NO")
            {
                if (result.Length <= 0) { result = dr["Campo"].ToString() + "," + dr["descripcionCampo"].ToString(); }
                else { result += "|" + dr["Campo"].ToString() + "," + dr["descripcionCampo"].ToString(); }
            }
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
    public static string GuardarPerfil(string perfil, string descripcion, string relacionconceptos, string relacioncampos, string tipomovimiento, string tipoafectacion, string activo)
    {
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Terceros_Perfiles_Guardar '" + perfil + "','" + descripcion + "','" + relacionconceptos + "','" + relacioncampos + "','" + tipomovimiento + "','" + tipoafectacion + "','" + activo + "'");
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
                        JsonString.Append("\"" + ds.Tables[0].Columns[j].ColumnName.ToString() + "\":" + "\"" + ds.Tables[0].Rows[i][j].ToString().Replace("\"","\\\"").Trim() + "\",");
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
}