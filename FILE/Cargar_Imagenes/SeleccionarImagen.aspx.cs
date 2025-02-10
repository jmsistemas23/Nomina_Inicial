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



public partial class FILE_Cargar_Imagenes_SeleccionarImagen : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void btnUpload_Click(object sender, EventArgs e)
    {
        // Code for Upload file to database
        //if (FUCargar.HasFile)
        //{
        //    HttpPostedFile file = FUCargar.PostedFile;
        //    BinaryReader br = new BinaryReader(file.InputStream);
        //    byte[] buffer = br.ReadBytes(file.ContentLength);
        //    SqlConnection conn = null;

        //    try
        //    {
        //        try
        //        {
        //            conn = new System.Data.SqlClient.SqlConnection(ConfigurationManager.ConnectionStrings["local"].ConnectionString);
        //            conn.Open();
        //            SqlCommand Comando = new SqlCommand();
        //            Comando.CommandType = CommandType.StoredProcedure;
        //            Comando.Connection = conn;
        //            string empleado = Request.Form["hempleado"].ToString();
        //            Comando.CommandText = "GESRH_SPT_Sistemas_GuardarImagenes";
        //            Comando.Parameters.Clear();
        //            Comando.Parameters.Add(new SqlParameter("@empleado", empleado));
        //            Comando.Parameters.Add(new SqlParameter("@tipo", "Foto"));
        //            Comando.Parameters.Add(new SqlParameter("@Imagen", buffer));
        //            int queryResult = Comando.ExecuteNonQuery();
        //            if (queryResult == 1)                      
        //                ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('Si','');", true);
        //        }
        //        catch (Exception ex)
        //        {
        //            ClientScript.RegisterStartupScript(GetType(), "Javascript", "javascript:Resultado('No'," + ex.Message + ");", true);
        //        }
        //    }
        //    finally
        //    {
        //        if (conn != null)
        //            conn.Close();
        //    }
        //}
    }

   
}