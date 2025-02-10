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

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_BanncosActivacionCheques");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = ds.Tables[0].Rows[i]["tipoban"].ToString() + "|" + ds.Tables[0].Rows[i]["pagolinea"].ToString() + "|" + ds.Tables[0].Rows[i]["ArcSalida"].ToString();
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

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_Organismos_Pagos 'Salida'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.attributes = ds.Tables[0].Rows[i]["clienteActivacion"].ToString() + "|" + ds.Tables[0].Rows[i]["consecutivoproteccion"].ToString();
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
    public static string[] Crear_Archivo(string archivo,string organismos,string quincena,string banco,string fechapago,string vigencia,int pagolinea,string tipo,string extension)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string[] result = { "", "", "" };
        string  cadena = "";
        try
        {
            int idusu =  objusuario.Id;
            Utilerias lib = new Utilerias();
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Layout_DispercionDePagos '" + organismos + "','" + quincena + "','" + banco + "','" + fechapago + "','" + vigencia + "'," + idusu +","+pagolinea+","+tipo);
            if (ds.Tables[0].Rows.Count > 0)
            {                
                string Ruta = HttpContext.Current.Server.MapPath("Archivos/" + archivo +"."+ extension);
                if (File.Exists(Ruta))
                { File.Delete(Ruta); }
                FileStream file = new FileStream(Ruta, FileMode.OpenOrCreate, FileAccess.Write);
                StreamWriter sw = new StreamWriter(file);

                //sacar encabezado del archivo
                if (ds.Tables[0].Rows[0][0].ToString() != "0")
                {                   
                   for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                      {                          
                          sw.WriteLine(ds.Tables[0].Rows[i][0].ToString());
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
                sw.Flush();                
                sw.Close();
                sw.Dispose();
                             
                file.Dispose();               
                ds.Dispose();
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

}