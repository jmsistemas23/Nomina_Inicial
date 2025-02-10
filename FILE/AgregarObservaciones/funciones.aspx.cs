using System;
using System.Collections.Generic;
using System.Data;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;


public partial class FILE_AgregarObservaciones_funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Quincenas()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Cancelaciones_ListarQuincenas '',''");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Quincena";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][0].ToString();
            dlist.selected = false;
            dlist.descripcion = ds.Tables[0].Rows[i][0].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Actualizar_Observaciones(string quincena, string modulo, string cadena)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Observaciones_ModificarObservacionDoc '"+quincena+"','"+modulo+"','"+cadena+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
}