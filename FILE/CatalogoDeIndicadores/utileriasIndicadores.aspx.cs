using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class catalogoDeIndicadores_utileriasIndicadores : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarEstatusParaPlazas()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_EstatusDePlazas ");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "Estatus";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCapitulos()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_Capitulos");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "Capitulos";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarTipoClaveSAT()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_TipoClaveSAT");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "Capitulos";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarClaveSAT(string tipo)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_ClaveSAT '" + tipo + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "Capitulos";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarTipoExcento()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_TipoExcento");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "exetip";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarClasificacionPresupuestal_Mag(string capitulo,string tipo)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Listar_ClasificacionPresupuestal " + capitulo+",'"+tipo+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "ClasificacionPresupuestal";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarClasificacionPresupuestal(string capitulo, string tipo)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_ClasificacionPresupuestal " + capitulo + ",'" + tipo + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "ClasificacionPresupuestal";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarFamiliaDeIndicadores()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_FamiliaDeIndicadores");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
             campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre =ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "familiaDeIndicadores";
            if (i == 0) { campo.selected = true; }
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarFuenteDeFinanciamiento()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_FuenteDeFinanciamiento ");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "fuenteDeFinanciamiento";           
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCatlisFormula()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_CatlisFormula ");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "catLisFormula";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCatlisCampoDeFormula(string idLis)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_CatlisCampoDeFormula " + idLis);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
             campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "CatlisCampoDeFormula";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarTipoDeExencion()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "x";
        campo.nombre = "Seleccione una Opción";
        campo.selected = true;
        lstNominas.Add(campo);

        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Listar_tipoDeExcencion");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
             campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["clave"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["nombre"].ToString();
            campo.tabla = "CatlisCampoDeFormula";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string recuperarIndicador(string indcop, string tipo)
    {
        Utilerias lib = new Utilerias();
        List<indicador> lstNominas = new List<indicador>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("exec GESRH_SP_Recuperar_Indicador '" + indcop + "', '" + tipo + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {          
            indicador campo = new indicador();
            campo.clavpe = ds.Tables[0].Rows[i]["clavpe"].ToString();
            campo.indant = ds.Tables[0].Rows[i]["indant"].ToString();
            campo.descpe = ds.Tables[0].Rows[i]["descpe"].ToString();
            campo.descop = ds.Tables[0].Rows[i]["descop"].ToString();
            campo.vigini = ds.Tables[0].Rows[i]["vigini"].ToString();
            campo.capitulo = ds.Tables[0].Rows[i]["capitulo"].ToString();
            campo.parprepe = ds.Tables[0].Rows[i]["parprepe"].ToString();
            campo.topeMinimo = ds.Tables[0].Rows[i]["topeMinimo"].ToString();
            campo.topeMaximo = ds.Tables[0].Rows[i]["topeMaximo"].ToString();
            campo.nomCampo = ds.Tables[0].Rows[i]["nomCampo"].ToString();
            campo.tipoPago = ds.Tables[0].Rows[i]["tipoPago"].ToString();
            campo.cvefamind = ds.Tables[0].Rows[i]["cvefamind"].ToString();
            campo.cvefuentefin = ds.Tables[0].Rows[i]["cvefuentefin"].ToString();
            campo.apliimp = ds.Tables[0].Rows[i]["apliimp"].ToString();
            campo.sinpromen = ds.Tables[0].Rows[i]["sinpromen"].ToString();
            campo.exeimp = ds.Tables[0].Rows[i]["exeimp"].ToString();
            campo.exetip = ds.Tables[0].Rows[i]["exetip"].ToString();
            campo.apliplp = ds.Tables[0].Rows[i]["apliplp"].ToString();
            campo.propret = ds.Tables[0].Rows[i]["propret"].ToString();
            campo.Prevision_Soc = ds.Tables[0].Rows[i]["Prevision_Soc"].ToString();
            campo.acumtot = ds.Tables[0].Rows[i]["acumtot"].ToString();
            campo.acumissste = ds.Tables[0].Rows[i]["acumissste"].ToString();
            campo.acum2nom = ds.Tables[0].Rows[i]["acum2nom"].ToString();
            campo.reintegro = ds.Tables[0].Rows[i]["reintegro"].ToString();
            campo.calcret = ds.Tables[0].Rows[i]["calcret"].ToString();
            campo.apli1plaza = ds.Tables[0].Rows[i]["apli1plaza"].ToString();
            campo.calcbimestre = ds.Tables[0].Rows[i]["calcbimestre"].ToString();
            campo.bono = ds.Tables[0].Rows[i]["bono"].ToString();
            campo.ppto = ds.Tables[0].Rows[i]["ppto"].ToString();
            campo.appper = ds.Tables[0].Rows[i]["appper"].ToString();
            campo.tipoFormula = ds.Tables[0].Rows[i]["tipoFormula"].ToString();
            campo.frmper = ds.Tables[0].Rows[i]["frmper"].ToString();
            campo.clvfrm = ds.Tables[0].Rows[i]["clvfrm"].ToString();
            campo.pensal = ds.Tables[0].Rows[i]["pensal"].ToString();
            campo.apliterceros = ds.Tables[0].Rows[i]["apliterceros"].ToString();
            campo.descinstitucional = ds.Tables[0].Rows[i]["descinstitucional"].ToString();
            campo.tipcvesat = ds.Tables[0].Rows[i]["tipcvesat"].ToString();
            campo.cvesat = ds.Tables[0].Rows[i]["cvesat"].ToString();
            //campo.apliimpNM = ds.Tables[0].Rows[i]["apliimpNM"].ToString();
            //campo.exeimpNM = ds.Tables[0].Rows[i]["exeimpNM"].ToString();
            //campo.exevalNM = ds.Tables[0].Rows[i]["exevalNM"].ToString();
            //campo.exetipNM = ds.Tables[0].Rows[i]["exetipNM"].ToString();
            campo.importe = ds.Tables[0].Rows[i]["importePredeterminado"].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Guardar_Indicador(string clavPe, string clvfrm, string descpe, string descop, string indant, string parprepe, string vigini, string capitulo, string topeminimo, string topemaximo, string nomcampo, string tipopago, string cvefamind, string cvefuentefin, string apliimp, string appper, string sinpromen, string exeimp, string exetip, string numdias, string apliplp, string propret, string prevision_soc, string acumtot, string acumissste, string acum2nom, string reintegro, string calcret, string apli1plaza, string calcBimestre, string bono, string cadtippl, string ppto, string apliterceros, string descinstitucional, string qnaproyec, string tipoFormula, string frmper, string tipoind, string cvetiposat, string cvesat, string apliimpNM, string exeimpNM, string exevalNM, string exetipNM,string importe)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Insert_Indicadores '" + clavPe + "','" + clvfrm + "','" + descpe + "','" + descop + "','" + indant + "','" + parprepe + "','" + vigini + "','" + capitulo + "','" + topeminimo + "','" + topemaximo + "','" + nomcampo + "','" + tipopago + "','" + cvefamind + "','" + cvefuentefin + "','" + apliimp + "','" + appper + "','" + sinpromen + "','" + exeimp + "','" + exetip + "','" + numdias + "','" + apliplp + "','" + propret + "','" + prevision_soc + "','" + acumtot + "','" + acumissste + "','" + acum2nom + "','" + reintegro + "','" + calcret + "','" + apli1plaza + "','" + calcBimestre + "','" + bono + "','" + cadtippl + "','" + ppto + "','" + apliterceros + "','" + descinstitucional + "','" + qnaproyec + "','" + tipoFormula + "','" + frmper + "','" + tipoind + "','" + cvetiposat + "','" + cvesat + "','" + apliimpNM + "'," + exeimpNM + "," + exevalNM+ ",'" + exetipNM + "','"+importe+"'");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarNominasParaPlazas()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
       
        campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
        campo.clave = "Todas";
        campo.nombre = "Todas";
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
}