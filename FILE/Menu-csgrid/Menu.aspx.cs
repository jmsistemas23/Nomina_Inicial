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
using System.Text.RegularExpressions;

public partial class FILE_Sistema_Menu : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

  
    private const string consignos = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇ";
    private const string sinsignos = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";

    public static string removerSignosAcentos(String texto)
    {
        StringBuilder textoSinAcentos = new StringBuilder(texto.Length);
        int indexConAcento;
        foreach (char caracter in texto)
        {
            indexConAcento = consignos.IndexOf(caracter);
            if (indexConAcento > -1)
                textoSinAcentos.Append(sinsignos.Substring(indexConAcento, 1));
            else
                textoSinAcentos.Append(caracter);
        }
        return textoSinAcentos.ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CambiarPass(string usuario, string pass, string passNuevo)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ModificaPass '" + usuario + "','" + pass + "','" + passNuevo + "'");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();

        return result;
    }

   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Accesos_Usuarios(string idusuario, string fkaccesos)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_Guardar_Menu_AccesosDirectos " + idusuario + ",'" + fkaccesos + "'");       
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
        
        ds.Dispose();
        return result;
    }

}