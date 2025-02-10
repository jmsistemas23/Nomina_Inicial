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

public partial class FILE_Activacion_Cheques_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Bancos()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_NOM_Layout_BanncosActivacionCheques");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = ds.Tables[0].Rows[i]["tipoban"].ToString() + "|" + ds.Tables[0].Rows[i]["tiposalida"].ToString() + "|" + ds.Tables[0].Rows[i]["archivo"].ToString();
                campo.name = ds.Tables[0].Rows[i]["cveban"].ToString();
                campo.text = ds.Tables[0].Rows[i]["nomban"].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Quincenas()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarQuincenas ''");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i]["quincena"].ToString();
                campo.text = ds.Tables[0].Rows[i]["quincena"].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_Organismos()
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_Organismos_Pagos 'Activacion'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = ds.Tables[0].Rows[i]["claveProteccion"].ToString() + "|" + ds.Tables[0].Rows[i]["consecutivoProteccion"].ToString();
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][1].ToString();                
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Crear_Archivo(string archivo,string organismos,string quincena,string banco,string fechapago,string vigencia,string tiposalida,string extension)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "", "" };
        string  cadena = "";
        int consecutivo = 1;
        FileStream file;
        StreamWriter sw;
        string Ruta = "";
        int usuid = objusuario.Id;
        try
        {
            Utilerias lib = new Utilerias();
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "'," + usuid + ",'"+tiposalida+"'");
           
            //if (ds.Tables[0].Rows.Count > 0)
            //{
                if (tiposalida != "ARCHIVOS")
                {
                    Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + "."+ extension);
                    if (File.Exists(Ruta))
                    { File.Delete(Ruta); }
                     file = new FileStream(Ruta, FileMode.OpenOrCreate, FileAccess.Write);
                     sw = new StreamWriter(file);

                    //sacar encabezado del archivo
                    if (ds.Tables[0].Rows[0][0].ToString() != "0")
                    {
                        foreach (DataRow dr in ds.Tables[0].Rows)
                        {
                            for (int i = 0; i <= ds.Tables[0].Columns.Count - 1; i++)
                            {
                                cadena = cadena + dr[i].ToString();
                            }
                            sw.WriteLine(cadena);
                            cadena = "";
                        }
                    }

                    //sacar detalle
                    if (ds.Tables[1].Rows.Count > 0)
                    {
                        result[0] = "1";
                        foreach (DataRow dr in ds.Tables[1].Rows)
                        {
                            for (int i = 0; i <= ds.Tables[1].Columns.Count - 1; i++)
                            {
                                cadena = cadena + dr[i].ToString();
                            }
                            sw.WriteLine(cadena);
                            cadena = "";
                        }
                    }

                    //sacar pie del archivo
                    if (ds.Tables[2].Rows[0][0].ToString() != "0")
                    {
                        foreach (DataRow dr in ds.Tables[2].Rows)
                        {
                            for (int i = 0; i <= ds.Tables[2].Columns.Count - 1; i++)
                            {
                                cadena = cadena + dr[i].ToString();
                            }
                            sw.WriteLine(cadena);
                            cadena = "";
                        }
                    }
                    sw.Close();
                    file.Close();
                }
               else
                {
                    for (int t = 0; t <= ds.Tables.Count-1; t++)
                    {
                        Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo+"-"+consecutivo + "." + extension);
                        if (File.Exists(Ruta))
                        { File.Delete(Ruta); }
                        file = new FileStream(Ruta, FileMode.OpenOrCreate, FileAccess.Write);
                        sw = new StreamWriter(file);

                        foreach (DataRow dr in ds.Tables[t].Rows)
                        {
                            for (int i = 1; i <= ds.Tables[t].Columns.Count - 1; i++)
                            {
                                cadena = cadena + dr[i].ToString();
                            }
                            sw.WriteLine(cadena);
                            cadena = "";
                        }
                        sw.Close();
                        file.Close();
                        consecutivo += 1;
                    }                    
                }
            //}
            //else { result[0] = "0"; }
            ds.Dispose();
            result[2] = consecutivo.ToString();                    
        }
        catch (Exception ev)
        {
            result[0] = "E";
            result[1] = ev.ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Excel(string archivo, string organismos, string quincena, string banco, string fechapago, string vigencia,string tiposalida)
    {
        string[] result = { "", "" };        
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        ExcelApplication app = new ExcelApplication();
        app.Worksheets.Add(new ExcelWorksheet());
        app.Worksheets[0].Name="Archivo";
        if (app == null)
        {
            result[0] = "0";
            result[1] = "Excel no se encuentra instalado";
        }
        else{
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "'," + objusuario.Id+",'"+tiposalida+"'");
            //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "',1,'" + tiposalida + "'");
           
             DataTable miTabla = ds.Tables[1];

            string[] columnas={""};
            ExcelRow fila = new ExcelRow();
            ExcelCell col = new ExcelCell();
            for (int i = 0; i < miTabla.Columns.Count; i++)
            {
                col = new ExcelCell();
                col.Text = miTabla.Columns[i].ColumnName.ToString();
                fila.Cells.Add(col);
            }
            app.Worksheets[0].Rows.Add(fila);

            for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
            {
                fila = new ExcelRow();
                for (int j = 0; j < ds.Tables[1].Columns.Count; j++)
                {
                    string valor = ds.Tables[1].Rows[i].ItemArray[j].ToString();
                    col = new ExcelCell();
                    col.Text = valor;
                    
                    fila.Cells.Add(col);                    
                }
                app.Worksheets[0].Rows.Add(fila);
            }

            ds.Dispose();
            string Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + ".xls");
            if (File.Exists(Ruta))
            { File.Delete(Ruta); }
            app.FilePath = Ruta;
            app.SaveFile();

        //Excel.Application xlApp = new Excel.Application();
        //if (xlApp == null)
        //{
        //    result[0] = "0";
        //    result[1] = "Excel no se encuentra instalado";
        //}
        //else
        //{
        //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "',1");

        //    Excel.Workbook xlWorkBook;
        //    Excel.Worksheet xlWorkSheet;
        //    object misValue = System.Reflection.Missing.Value;


        //    xlWorkBook = xlApp.Workbooks.Add(misValue);
        //    xlWorkSheet = (Excel.Worksheet)xlWorkBook.Worksheets.get_Item(1);

        //    DataTable miTabla = ds.Tables[0];

        //    for (int i = 0; i < miTabla.Columns.Count; i++)
        //    {
        //        xlWorkSheet.Cells[1, i + 1] = miTabla.Columns[i].ColumnName.ToString();
        //    }

        //    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        //    {
        //        for (int j = 0; j < ds.Tables[0].Columns.Count; j++)
        //        {
        //            string valor = ds.Tables[0].Rows[i].ItemArray[j].ToString();
        //            xlWorkSheet.Cells[i + 2, j + 1] = valor;
        //        }
        //    }
        //    ds.Dispose();

        //    string Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + ".xls");
        //    if (File.Exists(Ruta))
        //    { File.Delete(Ruta); }
        //    xlWorkBook.SaveAs(Ruta, Excel.XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, Excel.XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);
        //    xlWorkBook.Close(true, misValue, misValue);
          
        //    //xlApp.Visible = true;            
        //    xlApp.Quit();
       
            result[0] = "1";
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Archivo_Excel(string archivo, string organismos, string quincena, string banco, string fechapago, string vigencia)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "',1");

        //string Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + ".xls");
        //if (File.Exists(Ruta))
        //{ File.Delete(Ruta); }       
        //ExcelLibrary.DataSetHelper.CreateWorkbook(Ruta, ds);
       


        result[0] = "1";
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Contador(string movimiento,int contador)
    {
        string[] result = { "",""};
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_ActivacionCheques_Contador '"+ movimiento + "',"+ contador);
        if (ds.Tables.Count > 0)
        {
            if (movimiento == "S")
            {
                result[0] = ds.Tables[0].Rows[0][0].ToString();
            }
            if (movimiento == "A")
            {
                result[0] = ds.Tables[0].Rows[0][0].ToString();
                result[1] = ds.Tables[0].Rows[0][1].ToString();
            }
            ds.Dispose();
        }
        return result;
    }

}