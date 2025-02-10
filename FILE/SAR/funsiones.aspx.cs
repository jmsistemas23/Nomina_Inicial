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

public partial class FILE_SAR_funsiones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_ConceptosDetalles(string cvecon)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_SAR_ListarConceptosDetalle '" + cvecon + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Conceptos(string clave,string concepto,string percepciones,string deducciones,string formula,string noacum,string topeimportes,string popago,string tipoqnas,string tope_base,string detalle)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_SAR_ActualizarConceptosDetalle '"+clave+"','"+concepto+"','"+percepciones+"','"+deducciones+"','"+formula+"',"+noacum+","+topeimportes+","+popago+",'"+tipoqnas+"',"+tope_base+",'"+detalle+"'");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {
            result[0] = "0";
            result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString();
        }
        else {
            result[0] = "1";
            result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString();
        }
        ds.Dispose();
        return result;
    }
}