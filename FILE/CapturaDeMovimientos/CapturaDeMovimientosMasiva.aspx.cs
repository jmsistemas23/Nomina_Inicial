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
using System.Runtime.InteropServices;
using System.IO;
using System.Data.OleDb;
using System.Data.Odbc;
using System.Web.UI;
using System.Collections;
using Microsoft.Office.Interop.Excel;




public partial class FILE_CapturaDeMovimientos_CapturaDeMovimientosMasiva : System.Web.UI.Page
{
    string tipo = "";
    string mov = "";
    string usuario = "";
    string multi = "";
   
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
    }

    public System.Data.DataTable crearTablaParaInsercionMasiva(string columnas)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        System.Data.DataTable dt = new System.Data.DataTable();
        ConexionSQL conexionDePrueba = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter("GESRH_SPT_Capturas_CrearTabla_CapturaMasiva", conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;
        Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@usuario", objusuario.Usuario));
        Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@columnas", columnas));
        try
        {
            Adaptador.Fill(dt);
            return dt;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
    }

    //private System.Data.DataTable cargarArchivoPlantilla(string rutaNomina, string nomArchivo, string columnas, string colNoNul)
    //{
    //    string extArc = nomArchivo.Substring(nomArchivo.IndexOf('.'), nomArchivo.Length - nomArchivo.IndexOf('.')).ToUpper();
    //    string nomArc = nomArchivo.ToUpper().Replace(extArc, "");
    //    string rutArc = rutaNomina.Replace(nomArchivo, "").ToUpper();

    //    string[] hojas = hojasExcel(rutArc + nomArc + extArc);
    //    string fecPagoArchivo;
    //    ConexionOdbc ConOdbc = new ConexionOdbc(rutArc, extArc, nomArc);
    //    System.Data.DataTable dt = new System.Data.DataTable();
    //    OdbcDataAdapter Adaptador;
    //    string consulta = "select " + columnas + " from [" + hojas[0] + "$] where " + colNoNul + " <> null ";
    //    Adaptador = new OdbcDataAdapter(consulta, ConOdbc.abrirConexion());
    //    Adaptador.SelectCommand.CommandTimeout = 700;
    //    try
    //    {
    //        Adaptador.Fill(dt);
    //        return dt;
    //    }
    //    catch (Exception ex)
    //    {
    //        return null;
    //    }
    //    finally
    //    {
    //        Adaptador.Dispose();
    //        ConOdbc.cerrarConexion();
    //    }
    //}

   
    private bool cargarDatosDelArchivoCargado(System.Data.DataTable dt)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        ConexionSQL conexionDePrueba = new ConexionSQL();
        try
        {
            using (SqlBulkCopy bulkCopy = new SqlBulkCopy(conexionDePrueba.abrirConexion()))
            {
                bulkCopy.DestinationTableName = "dbo.GESRH_TablaTemporalParaCargaMasiva_" + objusuario.Usuario;
                bulkCopy.BulkCopyTimeout = 700;
                bulkCopy.WriteToServer(dt);
                bulkCopy.Close();
            }
        }
        catch
        {
            return false;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
        return true;
    }

    private string[] hojasExcel(string RutaArc)
    {
        DataSet dsMsExcel = new DataSet();
        ArrayList res = new ArrayList();
        System.Data.Common.DbConnection connection = null;
        try
        {
            System.Data.Common.DbProviderFactory factory = System.Data.Common.DbProviderFactories.GetFactory("System.Data.OleDb");
            System.Data.DataTable worksheets;
            connection = factory.CreateConnection();
            string connectionString = @"Provider=Microsoft.Ace.OLEDB.12.0;Data Source=" + RutaArc + ";Extended Properties=Excel 12.0;";
            connection.ConnectionString = connectionString;
            connection.Open();
            worksheets = connection.GetSchema("Tables");
            foreach (DataRow dr in worksheets.Rows)
            {
                if (dr["Table_Name"].ToString().Trim().Contains("#")) continue;
                if (dr["Table_Name"].ToString().Trim().Contains("$"))
                {
                    res.Add(dr["Table_Name"].ToString().Trim().Replace("$", ""));
                }
                else
                    res.Add(dr["Table_Name"].ToString().Trim());
            }
            return (string[])res.ToArray(typeof(string));
            //modificaComboHojas(cbo);
            //Microsoft.Office.Interop.Excel.Application miExcel = new Excel.Application();
        }
        catch (Exception ex)
        {
            return null;
        }
        finally
        {
            if (connection != null)
                connection.Close();
        }
    }

    public DataSet buscarColumnasParaExcel(string tipo, string mov)
    {
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        DataSet dt = new DataSet();
        ConexionSQL conexionDePrueba = new ConexionSQL();

        Adaptador = new System.Data.SqlClient.SqlDataAdapter("GESRH_SPT_Capturas_ListarCampos_NuevaCaptura_LayoutMasivo", conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;
        Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@tipo", tipo));
        Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@mov", mov));
        try
        {
            Adaptador.Fill(dt);
            return dt;
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
    }


    protected void btnCargarArchivo_Click(object sender, EventArgs e)
    {
        usuario = Request.Form["husuario"].ToString();        
        multi = Request.Form["hmulti"].ToString();
        tipo = Request.Form["htipo"].ToString();
        mov = Request.Form["hmov"].ToString();

        
            if (cargaArchivo.HasFile)
             {
                 string columns;
                 string colNoNulo;
                 if (mov != "")
                 {
                     DataSet res = buscarColumnasParaExcel("MP", mov);
                     if (res.Tables[0].Rows[0]["Error"].ToString().Equals("0"))
                     {
                         columns = res.Tables[1].Rows[0][0].ToString();
                         colNoNulo = res.Tables[2].Rows[0][0].ToString();
                         //Request.Form["filPlantilla"]
                         if (Request.Files.Count > 0)
                         {
                             HttpPostedFile file = Request.Files["filPlantilla"];

                             //check file was submitted
                             if (file != null && file.ContentLength > 0)
                             {
                                 //string fname = Path.GetFileName(file.FileName);
                                 //file.SaveAs(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/plantillasSubidas/", fname)));
                                 //crearTablaParaInsercionMasiva(usuario, columns);
                                 //System.Data.DataTable dtNom = cargarArchivoPlantilla(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/plantillasSubidas/", fname)), fname, columns, colNoNulo.Split(',')[0]);
                                 //cargarDatosDelArchivoCargado(dtNom, usuario);
                                 //file.InputStream.Flush();
                                 //file.InputStream.Close();
                             }
                         }
                     }
                 }
            }
       
    }
   
    protected void btnDescargarArchivo_Click(object sender, EventArgs e)
    {
        tipo = Request.Form["htipo"].ToString();
        mov = Request.Form["hmov"].ToString();

            DataSet res = buscarColumnasParaExcel("MP", mov);
            if (res.Tables[0].Rows[0]["Error"].ToString().Equals("0"))
            {
                string columns = res.Tables[1].Rows[0][0].ToString();
                string[] colSep = columns.Split(',');
                Application xlApp = new Application();
                Workbook wb = xlApp.Workbooks.Add(XlWBATemplate.xlWBATWorksheet);
                Worksheet ws = (Worksheet)wb.Worksheets[1];
                for (int i = 0; i < colSep.Length; i++)
                {
                    //ws.Cells[1, i + 1].EntireColumn.NumberFormat = "@";
                    ws.Cells.EntireColumn.NumberFormat = "@";
                    ws.Cells[1, i + 1] = colSep[i];
                }
                object misValue = System.Reflection.Missing.Value;
                if (File.Exists(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/PlantillasMovimientos/", "plantilla_Mov_" + mov + ".xls"))))
                    File.Delete(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/PlantillasMovimientos/", "plantilla_Mov_" + mov + ".xls")));
                wb.SaveAs(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/PlantillasMovimientos/", "plantilla_Mov_" + mov + ".xls")), Microsoft.Office.Interop.Excel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, Microsoft.Office.Interop.Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
                wb.Close(true, misValue, misValue);
                xlApp.Quit();

                FileInfo file = new FileInfo(Server.MapPath(Path.Combine("~/file/CapturaDeMovimientos/PlantillasMovimientos/", "plantilla_Mov_" + mov + ".xls")));
                Response.Clear();
                Response.ClearHeaders();
                Response.ClearContent();
                Response.AddHeader("content-disposition", "attachment; filename=" + "plantilla_Mov_" + mov + ".xls");
                Response.AddHeader("Content-Type", "application/Excel");
                Response.ContentType = "application/vnd.xls";
                Response.AddHeader("Content-Length", file.Length.ToString());
                Response.WriteFile(file.FullName);

                Marshal.ReleaseComObject(ws);
                Marshal.ReleaseComObject(wb);
                Marshal.ReleaseComObject(xlApp);
                Response.End();                   

            }           
    }

}