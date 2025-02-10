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

public partial class FILE_Cargar_Imagenes_Importar_Imagen : System.Web.UI.Page
{
    string tipo = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        btnEfoto.Attributes.Add("onclick", "document.getElementById('" + FUFoto.ClientID + "').click(); return false;");
        btnCfoto.Attributes.Add("onclick", "$('#loading').show(); return true;");

        btnEfirma.Attributes.Add("onclick", "document.getElementById('" + FUFirma.ClientID + "').click(); return false;");
        btnCfirma.Attributes.Add("onclick", "$('#loading').show(); return true;");
    }

    private byte[] ConvertImageToByteArray(System.Drawing.Image imageToConvert,System.Drawing.Imaging.ImageFormat formatOfImage)
    {
        byte[] Ret;
        try
        {
            using (MemoryStream ms = new MemoryStream())
            {
                imageToConvert.Save(ms, formatOfImage);
                Ret = ms.ToArray();
            }
        }
        catch (Exception) { throw; }
        return Ret;
    }

    protected void btnCargarFoto_Click(object sender, EventArgs e)
    {
        if (FUFoto.HasFile)
        {
            System.Drawing.Image imag = System.Drawing.Image.FromStream(FUFoto.PostedFile.InputStream);
            System.Data.SqlClient.SqlConnection conn = null;

            try
            {
                try
                {
                    conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["local"].ConnectionString);
                    conn.Open();
                    SqlCommand Comando = new SqlCommand();
                    Comando.CommandType = CommandType.StoredProcedure;
                    Comando.Connection = conn;
                    string empleado = Request.Form["hempleado"].ToString();                   
                    Comando.CommandText = "GESRH_SPT_Sistemas_GuardarImagenes";
                    Comando.Parameters.Clear();
                    Comando.Parameters.Add(new SqlParameter("@empleado", empleado));
                    Comando.Parameters.Add(new SqlParameter("@tipo", "Foto"));
                    Comando.Parameters.Add(new SqlParameter("@Imagen", ConvertImageToByteArray(imag, System.Drawing.Imaging.ImageFormat.Jpeg)));
                    int queryResult = Comando.ExecuteNonQuery();
                    if (queryResult == 1)
                        CargarFoto(sender, e);
                        ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('Si','','Foto');", true);
                }
                catch (Exception ex)
                {
                    ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('No'," + ex.Message + ",'" + tipo + "');", true);
                }
            }
            finally
            {
                if (conn != null)
                    conn.Close();
            }

        }
    }

    protected void btnCargarFirma_Click(object sender, EventArgs e)
    {
        if (FUFirma.HasFile)
        {
            System.Drawing.Image imag = System.Drawing.Image.FromStream(FUFirma.PostedFile.InputStream);
            System.Data.SqlClient.SqlConnection conn = null;

            try
            {
                try
                {
                    conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["local"].ConnectionString);
                    conn.Open();
                    SqlCommand Comando = new SqlCommand();
                    Comando.CommandType = CommandType.StoredProcedure;
                    Comando.Connection = conn;
                    string empleado = Request.Form["hempleado"].ToString();
                  
                    Comando.CommandText = "GESRH_SPT_Sistemas_GuardarImagenes";
                    Comando.Parameters.Clear();
                    Comando.Parameters.Add(new SqlParameter("@empleado", empleado));
                    Comando.Parameters.Add(new SqlParameter("@tipo", "Firma"));
                    Comando.Parameters.Add(new SqlParameter("@Imagen", ConvertImageToByteArray(imag, System.Drawing.Imaging.ImageFormat.Jpeg)));
                    int queryResult = Comando.ExecuteNonQuery();
                    if (queryResult == 1)
                        CargarFirma(sender, e);
                        ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('Si','','Firma');", true);
                }
                catch (Exception ex)
                {
                    ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('No'," + ex.Message + ",'"+tipo+"');", true);
                }
            }
            finally
            {
                if (conn != null)
                    conn.Close();
            }

        }
    }

    protected void CargarFoto(object sender, EventArgs e)
    {
        string empleado = Request.Form["hempleado"].ToString();
        byte[] bytes = (byte[])GetData("SELECT foto FROM empleados WHERE numemp =" + empleado).Rows[0]["foto"];
        string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);            
        ImgFoto.ImageUrl = "data:image/png;base64," + base64String;        
    }

    protected void CargarFirma(object sender, EventArgs e)
    {
        string empleado = Request.Form["hempleado"].ToString();
        byte[] bytes = (byte[])GetData("SELECT firma FROM empleados WHERE numemp =" + empleado).Rows[0]["firma"];
        string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);
        ImgFirma.ImageUrl = "data:image/png;base64," + base64String;
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


}