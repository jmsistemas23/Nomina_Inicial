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
    public static string TipoPlazas()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_SelectParaPaginacionDeTipoPlaza 1,50,''");
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
    public static string listarSubNivSal(string codniv)
    {
        Utilerias lib = new Utilerias();
        List<nivelesSalariales> lstNivSal = new List<nivelesSalariales>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("select cvenisni from nivsal where codniv =" + codniv);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            nivelesSalariales codsubniv = new nivelesSalariales();
            codsubniv.codNivSal = ds.Tables[0].Rows[i]["cvenisni"].ToString().Trim();
            lstNivSal.Add(codsubniv);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNivSal);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] GuardarPlazas(string tipoplaza, int numplazas, string plapadre, string fecvigini, string fecvigfin, string tiponomina,
        string tippag, string cvepuepl, string cvejerpl, string cvelabpl, string codnivpl, string cvenispl, string estruProg, string cveAdsPl, string cvezonpag,
        string cvezonpl, string cvegmapl, string cvegrepl, string cveforISRpl, string estatus, string horas, string plazaant, string autorizacion, string sueldoper,string programa)
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

        parametros.Add(new SqlParameter("@estruProg", estruProg));
        parametros.Add(new SqlParameter("@cveAdsPl", cveAdsPl));
        parametros.Add(new SqlParameter("@cvezonpag", cvezonpag));
        parametros.Add(new SqlParameter("@cvezonpl", cvezonpl));
        parametros.Add(new SqlParameter("@cvegmapl", cvegmapl));
        parametros.Add(new SqlParameter("@cvegrepl", cvegrepl));
        parametros.Add(new SqlParameter("@cveforISRpl", cveforISRpl));
        parametros.Add(new SqlParameter("@estatus", estatus));       
       
        SqlParameter phoras = new SqlParameter("@horas", SqlDbType.Decimal, 10);
        phoras.Value = horas;
        parametros.Add(phoras);

        parametros.Add(new SqlParameter("@plazaAnt", plazaant));
        parametros.Add(new SqlParameter("@numAut", autorizacion));

        SqlParameter psueldoper = new SqlParameter("@sueldoper", SqlDbType.Decimal, 150);
        psueldoper.Value = sueldoper;
        parametros.Add(psueldoper);

        parametros.Add(new SqlParameter("@programa", programa));
        
        DataSet ds = lib.ejecutarProcedimiento("GESRH_SP_GrabarPlazaNuevaCreacion", parametros);
        result[0] = ds.Tables[0].Rows[0]["Error"].ToString().Trim();
        result[1] = ds.Tables[0].Rows[0]["Mensaje"].ToString().Trim();
        result[2] = ds.Tables[0].Rows[0]["PlazaInicial"].ToString().Trim();
        ds.Dispose();
          //ConexionSQL conexionDePrueba = new ConexionSQL();          
          //try
          //{
          //    SqlCommand cmd = new SqlCommand("GESRH_SP_GrabarPlazaNuevaCreacion", conexionDePrueba.abrirConexion());
          //    cmd.CommandType = CommandType.StoredProcedure;

          //    cmd.Parameters.Add("@tipoPlaza", SqlDbType.NVarChar).Value = tipoplaza;
          //    cmd.Parameters.Add("@numPlazas", SqlDbType.Int).Value = numplazas;
          //    cmd.Parameters.Add("@plaPadre", SqlDbType.NVarChar).Value = plapadre;
          //    cmd.Parameters.Add("@fecVigIni", SqlDbType.NVarChar).Value = fecvigini;
          //    cmd.Parameters.Add("@fecVigFin", SqlDbType.NVarChar).Value = fecvigfin;
          //    cmd.Parameters.Add("@cvetpl", SqlDbType.NVarChar).Value = tiponomina;
          //    cmd.Parameters.Add("@tippag", SqlDbType.NVarChar).Value = tippag;

          //    cmd.Parameters.Add("@cvepuepl", SqlDbType.NVarChar).Value = cvepuepl;
          //    cmd.Parameters.Add("@cveJerPl", SqlDbType.NVarChar).Value = cvejerpl;
          //    cmd.Parameters.Add("@cvelabpl", SqlDbType.NVarChar).Value = cvelabpl;
          //    cmd.Parameters.Add("@codnivpl", SqlDbType.NVarChar).Value = codnivpl;
          //    cmd.Parameters.Add("@cvenispl", SqlDbType.NVarChar).Value = cvenispl;

          //    cmd.Parameters.Add("@estruProg", SqlDbType.NVarChar).Value = estruProg;
          //    cmd.Parameters.Add("@cveAdsPl", SqlDbType.NVarChar).Value = cveAdsPl;
          //    cmd.Parameters.Add("@cvezonpag", SqlDbType.NVarChar).Value = cvezonpag;
          //    cmd.Parameters.Add("@cvezonpl", SqlDbType.NVarChar).Value = cvezonpl;
          //    cmd.Parameters.Add("@cvegmapl", SqlDbType.NVarChar).Value = cvegmapl;
          //    cmd.Parameters.Add("@cvegrepl", SqlDbType.NVarChar).Value = cvegrepl;
          //    cmd.Parameters.Add("@cveforISRpl", SqlDbType.NVarChar).Value = cveforISRpl;
          //    cmd.Parameters.Add("@estatus", SqlDbType.NVarChar).Value = estatus;
          //    cmd.Parameters.Add("@horas", SqlDbType.NVarChar).Value = horas;
          //    cmd.Parameters.Add("@plazaAnt", SqlDbType.NVarChar).Value = plazaant;
          //    cmd.Parameters.Add("@numAut", SqlDbType.NVarChar).Value = autorizacion;
          //    cmd.Parameters.Add("@sueldoper", SqlDbType.Decimal).Value = sueldoper;

          //    conexionDePrueba.cerrarConexion();
          //    cmd.ExecuteNonQuery();                    
          //    conexionDePrueba.cerrarConexion();
          //}
          //catch (Exception ex)
          //{
          //    // 
          //}
       
              
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
  
}