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

public partial class FILE_Reposicion_de_Cheques_Funciones : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Perfiles(string strtipo,string strquin)
    {
        string[] result = { "" };
        List<clsModulos> lstperfil = new List<clsModulos>();
        Utilerias lib = new Utilerias();
        clsModulos clsperfil = new clsModulos();
        JavaScriptSerializer js = new JavaScriptSerializer();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_ListarPerfiles '" + strtipo + "','"+strquin+"'");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                clsperfil = new clsModulos();
                clsperfil.clave = ds.Tables[0].Rows[i]["cveconsulta"].ToString()+ds.Tables[0].Rows[i]["cveperfil"].ToString();
                clsperfil.text = ds.Tables[0].Rows[i]["nomperfil"].ToString();
                
                lstperfil.Add(clsperfil);
            }
            result[0] = js.Serialize(lstperfil);
        }
        return result;
    }

    private static List<ClsGruposUsuarios> GetModuloTree(List<ClsGruposUsuarios> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsGruposUsuarios()
        {
            Id = x.Id,
            text = x.text,
            target = x.target,
            clave = x.clave,
            IdPadre = x.IdPadre,
            state = x.state,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

    
     [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Actualiza_Folio_Individual(string tipoprod, string tipoperfil,string folioanterior, string folioactual,string quincena)        
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Reposicion_Individual '"+tipoprod+"','"+tipoperfil+"','"+folioanterior + "','" + folioactual + "','"+quincena+"'");
         if (ds.Tables.Count > 0)
         {
             result[0] = ds.Tables[0].Rows[0][0].ToString();
             result[1] = ds.Tables[0].Rows[0][1].ToString();
         }
         ds.Dispose();
         return result;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod]
     public static string[] Actualiza_Folio_Grupal(string tipoprod, string tipoperfil, string folioinicial, string foliofinal, string folioactual, string quincena)
     {
         string[] result = { "","" };
         Utilerias lib = new Utilerias();
         DataSet ds = new DataSet();
         if (quincena == "")
         { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Reposicion_Grupos '" + tipoprod + "','" + tipoperfil + "','" + folioinicial + "','" + foliofinal + "','" + folioactual + "'"); }
         else { ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_NOM_Produccion_Reposicion_Grupos_hist '" + tipoprod + "','" + tipoperfil + "','" + folioinicial + "','" + foliofinal + "','" + folioactual + "','"+quincena+"'"); }
         if (ds.Tables.Count > 0)
         {
             result[0] = ds.Tables[0].Rows[0][0].ToString();
             result[1] = ds.Tables[0].Rows[0][1].ToString();
         }
         ds.Dispose();
         return result;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod]
     public static string[] Generar_Reportes()
     {
         string[] result = { "", "" };
         Utilerias lib = new Utilerias();
         DataSet ds = new DataSet();

         ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Calculo_Lineal");

         result[0] = "Información de Reportes Actualizada";

         ds.Dispose();
         return result;
     }

     [WebMethod(EnableSession = true)]
     [ScriptMethod]
     public static string Listar_Quincenas()
     {
         Utilerias lib = new Utilerias();
         List<ClsCatalogos> lista = new List<ClsCatalogos>();
         DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarQuincenas ''");

         ClsCatalogos dlist = new ClsCatalogos();
         dlist.valor = "x";
         dlist.selected = true;
         dlist.descripcion = "Actual";
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


   
}