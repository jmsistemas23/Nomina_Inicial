using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class creacionDePlazas_UtileriasBD : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

   

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarNominasParaPlazas()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Listar_NominasParaTipoPlaza");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
             campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["cvetippl"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["destippl"].ToString();
            campo.tabla = "Nominas";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string TipoPlazas(string centcosto)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeTipoPlaza_mag 1,50,'" + centcosto + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["descripcion"].ToString();            
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string TipoVacantes()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("select * from estpla where cveesp in ('VA','VP')");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i][0].ToString();
            campo.nombre = ds.Tables[0].Rows[i][1].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarPuestos()
    {
        Utilerias lib = new Utilerias();
        List<puestos> lstPuestos = new List<puestos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("select cvepue as Clave, despue as Descripcion,isnull(codnivpu,'') as [Codigo_Nivel],cvepue as [Tipo_Puesto],cvejerpu as [Grupo_Jerarquico] from puesto order by despue");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            puestos puesto = new puestos();
            puesto.Clave = ds.Tables[0].Rows[i]["Clave"].ToString().Trim();
            puesto.Descripcion = ds.Tables[0].Rows[i]["Descripcion"].ToString().Trim();
            puesto.Codigo_Nivel = ds.Tables[0].Rows[i]["Codigo_Nivel"].ToString().Trim();
            puesto.Tipo_Puesto = ds.Tables[0].Rows[i]["Tipo_Puesto"].ToString().Trim();
            puesto.Grupo_Jerarquico = ds.Tables[0].Rows[i]["Grupo_Jerarquico"].ToString().Trim();
            lstPuestos.Add(puesto);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstPuestos);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCodigoDeNivSal()
    {
        Utilerias lib = new Utilerias();
        List<nivelesSalariales> lstNivSal = new List<nivelesSalariales>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("select codniv from nivsal where codniv is not null order by codniv");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            nivelesSalariales codniv = new nivelesSalariales();
            codniv.codNivSal = ds.Tables[0].Rows[i]["codniv"].ToString().Trim();
            lstNivSal.Add(codniv);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNivSal);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] listarSubNivSal(string codniv,string cvezon)
    {
        Utilerias lib = new Utilerias();
        string[] result = { "", "" };
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Plazas_ListarSubnivel '" + codniv + "','" + cvezon+"'");
        if (ds.Tables[0].Rows.Count == 1)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }

        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarPlazas(string tipoplaza, string numplazas, string plapadre, string fecvigini, string fecvigfin, string tiponomina, string tippag, string cvepuepl, string cvejerpl, string cvelabpl, string codnivpl, string cvenispl, string cveunirespl, string cvezonpag, string cvezonpl, string cvegmapl, string cvegrepl, string cveforisrpl,string estatus,string horas,string plazaant,string autorizacion)
    {
        string[] result = { "", "","" };
        Utilerias lib = new Utilerias();        
        List<SqlParameter> parametros = new List<SqlParameter>();
        parametros.Add(new SqlParameter("@tipoPlaza", tipoplaza));
        parametros.Add(new SqlParameter("@numPlazas", numplazas));
        parametros.Add(new SqlParameter("@plaPadre", plapadre));        
        parametros.Add(new SqlParameter("@fecVigIni", fecvigini));
        parametros.Add(new SqlParameter("@fecVigFin", fecvigfin));
        parametros.Add(new SqlParameter("@cvetpl", tiponomina));
        parametros.Add(new SqlParameter("@tippag", tippag));
        parametros.Add(new SqlParameter("@cvepuepl", cvepuepl));
        parametros.Add(new SqlParameter("@cveJerPl", cvejerpl));
        parametros.Add(new SqlParameter("@cvelabpl", cvelabpl));
        parametros.Add(new SqlParameter("@codnivpl", codnivpl));
        parametros.Add(new SqlParameter("@cvenispl", cvenispl));
        parametros.Add(new SqlParameter("@cveAdsPl", cveunirespl));
        parametros.Add(new SqlParameter("@cvezonpag", cvezonpag));
        parametros.Add(new SqlParameter("@cvezonpl", cvezonpl));                                                
        parametros.Add(new SqlParameter("@cvegmapl", cvegmapl));
        parametros.Add(new SqlParameter("@cvegrepl", cvegrepl));
        parametros.Add(new SqlParameter("@cveforISRpl", cveforisrpl));
        parametros.Add(new SqlParameter("@estatus", estatus));
        parametros.Add(new SqlParameter("@horas", horas));
        parametros.Add(new SqlParameter("@plazaant", plazaant));
        parametros.Add(new SqlParameter("@numaut", autorizacion));
        
        DataSet ds = lib.ejecutarProcedimiento("GESRH_SP_GrabarPlazaNuevaCreacion", parametros);
        result[0] = ds.Tables[0].Rows[0]["Error"].ToString().Trim();
        result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString().Trim();
        result[2] = ds.Tables[0].Rows[0]["PlazaInicial"].ToString().Trim();
        ds.Dispose();
        return result;        
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Mostrar_PlazaMadre(string plazamadre)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Plazas_ListarPlazas '" + plazamadre + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Cargar_ISR(string tipoplaza)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeForISR 1,20,'','" + tipoplaza + "'");
        if (ds.Tables[0].Rows.Count == 1)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = "0"; }
        return result;
    }
  
}