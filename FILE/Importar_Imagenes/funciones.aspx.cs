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

public partial class FILE_Importar_Imagenes_funciones : System.Web.UI.Page
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
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_MostrarImagenes " + empleado);
        if (ds.Tables[0].Rows[0][0].ToString() != "")
        {
            result[0] = "1";
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                ilist = new Imagen_Binaria();
                byte[] foto = (byte[])ds.Tables[0].Rows[i][0];
                byte[] firma = (byte[])ds.Tables[0].Rows[i][1];
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

}