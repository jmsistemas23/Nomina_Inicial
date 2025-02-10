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

public partial class FILE_Cargar_Imagenes_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Mostrar_Imagenes(int empleado)
    {       
        string[] result = { "", "" };
        List<Imagen_Binaria> lstimagen = new List<Imagen_Binaria>();
        Imagen_Binaria ilist = new Imagen_Binaria();
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        byte[] firma= {0};
        byte[] foto = {0}; 
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_MostarImagenes " + empleado);
        if (ds.Tables[0].Rows[0][0].ToString() != "")
        {
            result[0] = "1";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ilist = new Imagen_Binaria();                
                foto = (byte[])ds.Tables[0].Rows[i][0];                               
                firma = (byte[])ds.Tables[0].Rows[i][1]; 
                
                ilist.Imagen = foto;
                ilist.firma = firma;
                lstimagen.Add(ilist);
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 500000000;
            result[1] = js.Serialize(lstimagen);
        }
        else
        {
            result[0] = "0";
        }
        ds.Dispose();
        return result;
    }

    private DataTable GetData(string query)
    {
        DataTable dt = new DataTable();
        string constr = ConfigurationManager.ConnectionStrings["local"].ConnectionString;
        using (SqlConnection con = new SqlConnection(constr))
        {
            using (SqlCommand cmd = new SqlCommand(query))
            {
                using (SqlDataAdapter sda = new SqlDataAdapter())
                {
                    cmd.CommandType = CommandType.Text;
                    cmd.Connection = con;
                    sda.SelectCommand = cmd;
                    sda.Fill(dt);
                }
            }
            return dt;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Imagenes_Empleado(string imageData, int empleado, string tipo)
    {
        string[] result = { "", "", "", "" };
        System.Data.SqlClient.SqlConnection conn = null;
        try
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(imageData);

                conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["local"].ConnectionString);
                conn.Open();
                SqlCommand Comando = new SqlCommand();
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Connection = conn;

                Comando.CommandText = "GESRH_SPT_Sistemas_GuardarImagenes";
                Comando.Parameters.Clear();
                Comando.Parameters.Add(new SqlParameter("@empleado", empleado));
                Comando.Parameters.Add(new SqlParameter("@tipo", tipo));
                Comando.Parameters.Add(new SqlParameter("@Imagen", imageBytes));
                int queryResult = Comando.ExecuteNonQuery();
                if (queryResult == 1)
                {
                    result[0] = "1";
                    result[1] = "La " + tipo + " ha sido guardada";
                }
            }
            catch (Exception ex)
            {
                result[0] = "0";
                result[1] = "Error al guardar la " + tipo;
            }
        }
        finally
        {
            if (conn != null)
                conn.Close();
        }
        return result;
    }

    private static byte[] ConvertToByte(string toEncode)
    {
        byte[] toEncodeAsBytes = System.Text.ASCIIEncoding.ASCII.GetBytes(toEncode);
        return toEncodeAsBytes;
    }

    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarArchivo(string nombre,string imageData)
    {
        string[] result = { "", "", "", "" };
        System.Data.SqlClient.SqlConnection conn = null;
        try
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(imageData);

                conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["Ejecutivo"].ConnectionString);
                conn.Open();
                SqlCommand Comando = new SqlCommand();
                Comando.CommandType = CommandType.StoredProcedure;
                Comando.Connection = conn;

                Comando.CommandText = "GESRH_SPT_Sistemas_GuardarArchivo";
                Comando.Parameters.Clear();
                Comando.Parameters.Add(new SqlParameter("@condicion", "40"));
                Comando.Parameters.Add(new SqlParameter("@tabla", "cat_nombra"));
                Comando.Parameters.Add(new SqlParameter("@nombre", nombre));
                Comando.Parameters.Add(new SqlParameter("@Imagen", imageBytes));
                int queryResult = Comando.ExecuteNonQuery();
                if (queryResult == 1)
                {
                    result[0] = "0";
                    result[1] = "El archivo ha sido guardado";
                }
            }
            catch (Exception ex)
            {
                result[0] = "1";
                result[1] = "Error al guardar el archivo ";
            }
        }
        finally
        {
            if (conn != null)
                conn.Close();
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] MostrarArchivo(string clave)
    {
        string[] result = { "", "" };        
        Utilerias lib = new Utilerias();        
        byte[] imagen = { 0 };        
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_MostrarArchivo " + clave);
        if (ds.Tables[0].Rows[0][0].ToString() != "")
        {                       
            result[0] = "0";
            imagen = (byte[])ds.Tables[0].Rows[0][0];         
            
            JavaScriptSerializer js = new JavaScriptSerializer();
            js.MaxJsonLength = 500000000;
            result[1] = js.Serialize(imagen);
        }
        else
        {
            result[0] = "1";
        }
        ds.Dispose();
        return result;
    }

}