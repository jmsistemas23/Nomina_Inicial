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

public partial class FILE_Pensionadas_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposNuevaCaptura(string modulo, string movimiento, string documento)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ListarCampos_NuevaCaptura '" + modulo + "','" + movimiento + "','" + documento + "',''");
        if (ds.Tables[0].Rows[0][0].ToString() == "0")
        {
            result[0] = "0";
            for (int t = 1; t < ds.Tables.Count; t++)
            {
                lista = new List<ClsCamposCaptura>();
                for (int i = 0; i < ds.Tables[t].Rows.Count; i++)
                {
                   
                    ClsCamposCaptura dlist = new ClsCamposCaptura();
                    dlist.Movimiento = ds.Tables[t].Rows[i]["movimiento"].ToString();
                    dlist.Campo = ds.Tables[t].Rows[i]["campo"].ToString();
                    dlist.Sololectura = Convert.ToInt16(ds.Tables[t].Rows[i]["Sololectura"]);
                    dlist.ValidaNulos = Convert.ToInt16(ds.Tables[t].Rows[i]["validaNulo"]);
                    dlist.Descripcion = ds.Tables[t].Rows[i]["descripcioncampo"].ToString();
                    dlist.Orden = ds.Tables[t].Rows[i]["orden"].ToString();
                    dlist.TipoDato = ds.Tables[t].Rows[i]["tipodato"].ToString();
                    dlist.Tamaño = ds.Tables[t].Rows[i]["tamaño"].ToString();
                    dlist.Longitud = ds.Tables[t].Rows[i]["longitud"].ToString();
                    dlist.CatalogoSeleccion = ds.Tables[t].Rows[i]["catalogoseleccion"].ToString();
                    dlist.CatalogoValor = ds.Tables[t].Rows[i]["catalogoseleccionvalor"].ToString();
                    dlist.CatalogoTexto = ds.Tables[t].Rows[i]["catalogoselecciontexto"].ToString();
                    dlist.CatalogoFiltro = ds.Tables[t].Rows[i]["catalogoseleccionfiltro"].ToString();
                    dlist.CamposRelacion = ds.Tables[t].Rows[i]["CampoRelacion"].ToString();
                    dlist.CamposFiltros = ds.Tables[t].Rows[i]["Campofiltro"].ToString();
                    dlist.HabilitarBusqueda = Convert.ToInt16(ds.Tables[t].Rows[i]["habilitarbusqueda"]);
                    dlist.CampoDescriptivo = ds.Tables[t].Rows[i]["CampoDescriptivo"].ToString();
                    dlist.CampoOrigen = Convert.ToBoolean(ds.Tables[t].Rows[i]["CampoOrigen"].ToString());
                    dlist.ConsultaBusqueda_Tabla = ds.Tables[t].Rows[i]["ConsultaBusqueda_Tabla"].ToString();
                    dlist.ConsultaBusqueda_Columnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_Columnas"].ToString();
                    dlist.ConsultaBusqueda_AliasColumnas = ds.Tables[t].Rows[i]["ConsultaBusqueda_AliasColumnas"].ToString();
                    dlist.ConsultaBusqueda_Condicion = ds.Tables[t].Rows[i]["ConsultaBusqueda_Condicion"].ToString();
                    dlist.ConsultaBusqueda_Orden = ds.Tables[t].Rows[i]["ConsultaBusqueda_Orden"].ToString();
                    dlist.ConsultaBusqueda_LongColumnas = ds.Tables[t].Rows[i]["consultaBusqueda_LongitudColumnas"].ToString();
                    dlist.ConsultaBusqueda_RelacionCaptura = ds.Tables[t].Rows[i]["consultaBusqueda_CamposCaptura"].ToString();
                    dlist.valorPredeterminado = ds.Tables[t].Rows[i]["valorPredeterminado"].ToString();
                    dlist.ConsultaBusqueda_BusquedaDirecta = ds.Tables[t].Rows[i]["consultaBusqueda_BusquedaDirecta"].ToString();
                    dlist.Configuracion_CamposCaptura = ds.Tables[t].Rows[i]["configuracioncamposcaptura"].ToString();
                    lista.Add(dlist);
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                result[t] = js.Serialize(lista);
            }
            //if (ds.Tables[4].Rows.Count > 0)
            //{
            //result[4] = "";//DataTableToJsonObj(ds.Tables[4]); 
            //}
            //else { result[4] = "0"; }
        }
        else { result[0] = ds.Tables[0].Rows[0][0].ToString(); result[1] = ds.Tables[0].Rows[0][1].ToString(); }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string LlenarCatalogos(string obj, string tabla, string cve, string des, string qry, string camrel)
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        if (qry == "") { qry = "select * from " + tabla + " order by " + cve; }
        DataSet ds = lib.ejecutarConsultaEnDataSet(qry);

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Seleccione una Opción";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][cve].ToString();
            dlist.selected = false;
            dlist.descripcion = ds.Tables[0].Rows[i][des].ToString();
            if (qry != "")
            { dlist.qry = qry; }
            else { dlist.qry = ""; }
            dlist.ddlobj = obj;
            dlist.relacion = camrel;
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    //[WebMethod(EnableSession = true)]
    //[ScriptMethod]
    //public static string[] Diseño_Catalogos(string strtabla, string strcampo, string strmov)
    //{
    //    string[] result = { "", "", "", "", "" };
    //    Utilerias lib = new Utilerias();
    //    DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ConfiguracionGrid '" + strtabla + "','" + strcampo + "','" + strmov + "'");
    //    if (ds.Tables[0].Rows.Count > 0)
    //    {
    //        //TABLA
    //        result[0] = ds.Tables[0].Rows[0][0].ToString();
    //        //COLUMNAS
    //        result[1] = ds.Tables[0].Rows[0][1].ToString();
    //        //orden
    //        result[2] = ds.Tables[0].Rows[0][2].ToString();
    //        //longitud columnas
    //        result[3] = ds.Tables[0].Rows[0][3].ToString();
    //        //relacion columnas
    //        result[4] = ds.Tables[0].Rows[0][4].ToString();
    //    }
    //    else { result[0] = "0"; }
    //    ds.Dispose();
    //    return result;
    //}

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Diseño_Catalogos(string strtipo, string strcampo, string strmov)
    {
        string[] result = { "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_ConfiguracionGrid '" + strtipo + "','" + strcampo + "','" + strmov + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //longitud columnas
            result[0] = ds.Tables[0].Rows[0][3].ToString();
            result[1] = ds.Tables[0].Rows[0][5].ToString();

            //lista de campos para la busqueda
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);

        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Captura(string tipmov, string strtipo, string strmov, string strcamposO, string strcamposD, string strcamposS, string condicion)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string usu = objusuario.Usuario;
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_GuardarMovimientos '" + tipmov + "','" + strtipo + "','" + usu + "','" + strmov + "','" + strcamposO + "','" + strcamposD + "','" + strcamposS + "','" + condicion + "',''");

        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] EliminarDocumento(string strmodulo, string strdocumento)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Capturas_EliminarDocumentos '" + strmodulo + "','" + strdocumento + "'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }
    
}