using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Foseg_Fun_Foseg : System.Web.UI.Page
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

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Layout_BanncosActivacionCheques");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = ds.Tables[0].Rows[i]["archivo"].ToString();
                campo.name = ds.Tables[0].Rows[i]["banco"].ToString();
                campo.text = ds.Tables[0].Rows[i]["banco"].ToString();
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

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Layout_QuincenasActivacionCheques ");
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
    public static string[] Cargar_Empleados(string quincena,string filtro)
    {
        string[] result = { "","","" };
        Utilerias lib = new Utilerias();
       
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Layout_ListarEmpleados '" + quincena+"','"+filtro+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = "0";
            result[1] = "";
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else {
            result[0] = "1";
            result[1] = "No Existe información a cargar";
            result[2] = "";
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Generar_Produccion(string cheque,string periodo, string fechapago, string vigencia, string leyenda)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Generar_Produccion '"+cheque+"','" + periodo + "','" + fechapago + "','"+ vigencia + "','"+ leyenda + "'");
        if (ds.Tables.Count > 0)
        {
            result[0] = "0";
            result[1] = ds.Tables[0].Rows[0][1].ToString();          
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Crear_Archivo(string archivo, string quincena, string banco, string fechapago, string vigencia, string tiposalida, string extension,string filtro)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "", "" };
        string cadena = "";
        int consecutivo = 1;
        FileStream file;
        StreamWriter sw;
        string Ruta = "";
        //int usuid = objusuario.Id;
        try
        {
            Utilerias lib = new Utilerias();
            DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Layout_ActivacionCheques '" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "','" + filtro + "'");

            if (ds.Tables[0].Rows.Count > 0)
            {
                if (tiposalida != "ARCHIVOS")
                {
                    Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + "." + extension);
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
                    result[0] = "0";
                }
                else
                {
                    for (int t = 0; t <= ds.Tables.Count - 1; t++)
                    {
                        Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo + "-" + consecutivo + "." + extension);
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
                    result[0] = "0";
                }
            }
            else { 
                result[0] = "1";
                result[1] = "No Existe Información";
            }
            ds.Dispose();
            result[2] = consecutivo.ToString();
        }
        catch (Exception ev)
        {
            result[0] = "1";
            result[1] = ev.ToString();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Contador(string movimiento, int contador)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPT_Foseg_Layout_ActivacionCheques_Contador '" + movimiento + "'," + contador);
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