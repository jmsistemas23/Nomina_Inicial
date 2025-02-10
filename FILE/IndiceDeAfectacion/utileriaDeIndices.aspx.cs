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

public partial class FILE_DisenoDeIndices_utileriaDeIndices : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {        
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Consecutivo_Indices()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("select max(cve)+1 consecutivo from indices");        
        return ds.Tables[0].Rows[0][0].ToString();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string guardarIndice(string clave, string descripcion, string orden,string movimiento)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Insert_indiceDeAfectacion @clave='"+clave+"' ,@descripcion='"+descripcion+"',@orden='"+orden+"',@movimiento='"+movimiento+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["Error"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["Mensaje"].ToString();
            campo.tabla = "Indices";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCamposMovimientosParaIndices(string tabla)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Insert_indiceDeAfectacion");
        //DataTable dt = lib.ejecutarConsultaEnDataTable("select nom_camp as Clave, desc_camp as Descripcion from cat_campos where nomtabla = 'capmov' order by desc_camp asc");
        DataTable dt = lib.ejecutarConsultaEnDataTable("GESRH_SPT_Indices_ListaCamposIndice '"+tabla+"'");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = dt.Rows[i][1].ToString();
            campo.nombre = dt.Rows[i][2].ToString();
            campo.tabla = "Catalogo";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCamposPlazasParaIndices()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Insert_indiceDeAfectacion");
        //DataTable dt = lib.ejecutarConsultaEnDataTable("select nom_camp as Clave, desc_camp as Descripcion from cat_campos where nomtabla = 'plazas' order by desc_camp asc");
        DataTable dt = lib.ejecutarConsultaEnDataTable("GESRH_SPT_Indices_ListaCamposIndice 'plazas'");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = dt.Rows[i]["Clave"].ToString();
            campo.nombre = dt.Rows[i]["Descripcion"].ToString();
            campo.tabla = "Catalogo";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCamposEmpleadosParaIndices()
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        //DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SP_Insert_indiceDeAfectacion");
        //DataTable dt = lib.ejecutarConsultaEnDataTable("select nom_camp as Clave, desc_camp as Descripcion from cat_campos where nomtabla = 'empleados' order by desc_camp asc");
        DataTable dt = lib.ejecutarConsultaEnDataTable("GESRH_SPT_Indices_ListaCamposIndice 'empleados'");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = dt.Rows[i]["Clave"].ToString();
            campo.nombre = dt.Rows[i]["Descripcion"].ToString();
            campo.tabla = "Catalogo";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCamposPorIndiceYTipo(string clave, string indice)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Listar_ColumnasPorIndiceYTipo " + clave + ", " + indice + "");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["origen"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["destino"].ToString();
            campo.tabla = ds.Tables[0].Rows[i]["con"].ToString();
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] listarCamposPorIndiceYTipo_DG(string clave, string indice)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Listar_ColumnasDeIndice " + clave + ", " + indice + "");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);          
        }
        else { result[0] = "0"; }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarChecksPorIndice(string clave)
    {
        Utilerias lib = new Utilerias();
        List<checksDeIndice> lstChecks = new List<checksDeIndice>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Select_ChecksDeIndices " + clave);
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {            
            checksDeIndice campo = new checksDeIndice();
            campo.retro = ds.Tables[0].Rows[i]["retro"].ToString();
            campo.respo = ds.Tables[0].Rows[i]["respo"].ToString();
            campo.difer = ds.Tables[0].Rows[i]["difer"].ToString();

            campo.diasa = ds.Tables[0].Rows[i]["diasa"].ToString();
            campo.bajas = ds.Tables[0].Rows[i]["bajas"].ToString();
            campo.eliconceper = ds.Tables[0].Rows[i]["eliconceper"].ToString();
            campo.actuconceper = ds.Tables[0].Rows[i]["actuconceper"].ToString();
            campo.elipension = ds.Tables[0].Rows[i]["elipension"].ToString();
            campo.actuconceper2 = ds.Tables[0].Rows[i]["actuconceper2"].ToString();

            campo.bajafonac = ds.Tables[0].Rows[i]["bajafonac"].ToString();
            campo.actufonac = ds.Tables[0].Rows[i]["actufonac"].ToString();
            campo.cancpag = ds.Tables[0].Rows[i]["cancpag"].ToString();
            lstChecks.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstChecks);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarTipoModificacionIndicadores(string clave)
    {
        Utilerias lib = new Utilerias();
        List<checksDeIndice> lstChecks = new List<checksDeIndice>();
        string res = "{";
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Listar_TipoModificacionDeIndicadores '" + clave + "'");
        if (ds.Tables[0].Rows.Count > 0) {
            res += "\"oricadper\":\"" + ds.Tables[0].Rows[0]["oricadper"].ToString() + "\",";
            res += "\"oricadded\":\"" + ds.Tables[0].Rows[0]["oricadded"].ToString() + "\",";
            res += "\"oricadapo\":\"" + ds.Tables[0].Rows[0]["oricadapo"].ToString() + "\",";
            res += "\"descadper\":\"" + ds.Tables[0].Rows[0]["descadper"].ToString() + "\",";
            res += "\"descadded\":\"" + ds.Tables[0].Rows[0]["descadded"].ToString() + "\",";
            res += "\"descadapo\":\"" + ds.Tables[0].Rows[0]["descadapo"].ToString() + "\"";            
        }
        res += "}";
        /*JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstChecks);*/
        return res;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarIndicadoresExistentes(string tipo)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();
        string res = "{";
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Listar_indicadoresPorTipo '" + tipo + "'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["indcop"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["descop"].ToString();
            campo.tabla = "indices";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarIndicadoresPorIndiice(string clave)
    {       
        Utilerias lib = new Utilerias();
        List<checksDeIndice> lstChecks = new List<checksDeIndice>();
        string res = "{";
        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Listar_IndicadoresPorIndiceDeAfectacion '" + clave + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            res += "\"indoriper\":\"" + ds.Tables[0].Rows[0]["indoriper"].ToString() + "\",";
            res += "\"indorided\":\"" + ds.Tables[0].Rows[0]["indorided"].ToString() + "\",";
            res += "\"indoriapo\":\"" + ds.Tables[0].Rows[0]["indoriapo"].ToString() + "\",";
            res += "\"inddesper\":\"" + ds.Tables[0].Rows[0]["inddesper"].ToString() + "\",";
            res += "\"inddesded\":\"" + ds.Tables[0].Rows[0]["inddesded"].ToString() + "\",";
            res += "\"inddesapo\":\"" + ds.Tables[0].Rows[0]["inddesapo"].ToString() + "\"";
        }
        res += "}";
        /*JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstChecks);*/
        return res;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string grabarIndiceDeAfectacion(string resCampos, string indicamp, string modificadores, string checksDelIndice, string cveInd,string llaves)
    {
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        DataSet ds = lib.ejecutarConsultaEnDataSet("SPGES_Insert_IndiceDeAfectacion @cveIndicador='" + cveInd + "', @indCampos='" + indicamp + "', @modificadores='" + modificadores + "', @camposDelIndice='" + resCampos + "',@checksDelIndice='" + checksDelIndice + "',@llaves='"+llaves+"'");
        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campoDeCatalogoClaveString campo = new campoDeCatalogoClaveString();
            campo.clave = ds.Tables[0].Rows[i]["Error"].ToString();
            campo.nombre = ds.Tables[0].Rows[i]["Mensaje"].ToString();
            campo.tabla = "resultado";
            lstNominas.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstNominas);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string listarCamposCaptura(string tabla)
    {
        Utilerias lib = new Utilerias();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataTable dt = lib.ejecutarConsultaEnDataTable("GESRH_SPT_Indices_ListaCamposIndice '" + tabla + "'");
        for (int i = 0; i < dt.Rows.Count; i++)
        {
            //ClsCampos campo = new ClsCampos();
            //campo.clave = dt.Rows[i][1].ToString();
            //campo.nombre = dt.Rows[i][2].ToString();
            //campo.tabla = "Catalogo";
            //lstcampo.Add(campo);

            campo = new ClsCampos();
            campo.Id = i;
            campo.name = dt.Rows[i][1].ToString();
            campo.attributes = dt.Rows[i][1].ToString() + "," + dt.Rows[i][2].ToString();
            campo.text = dt.Rows[i][2].ToString();
            lstcampo.Add(campo);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lstcampo);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Indicadores(string tipoind)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();
        JavaScriptSerializer js = new JavaScriptSerializer();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        ClsCampos campo = new ClsCampos();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_LlenarIndicadores '" + tipoind + "',1,100,''");
        if (ds.Tables.Count > 0)
        {
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                campo = new ClsCampos();
                campo.Id = i;
                campo.name = ds.Tables[0].Rows[i][0].ToString();
                campo.text = ds.Tables[0].Rows[i][0].ToString()+'-'+ ds.Tables[0].Rows[i][1].ToString();
                lstcampo.Add(campo);
            }
            result[0] = js.Serialize(lstcampo);
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Grabar_Indicadores(string indicamp, string campo, string indicadores)
    {
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_IndiceAfectacion_Guardar_Indicadores_Indice @cveindice='" + indicamp + "', @campo='" + campo + "', @Indicadores='''" + indicadores + "'''");
        result[0] = ds.Tables[0].Rows[0][0].ToString();
        result[1] = ds.Tables[0].Rows[0][1].ToString();
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Indicadores_Seleccionados(string indicamp, string campo,string tipo)
    {
        string[] result = { "", "" };
        Utilerias lib = new Utilerias();
        List<campoDeCatalogoClaveString> lstNominas = new List<campoDeCatalogoClaveString>();

        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_IndiceAfectacion_Listar_Indicadores_Indice @cveindice='" + indicamp + "', @campo='" + campo + "',@tipo='"+tipo+"'");
        if (ds.Tables.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
        }
        else { result[0] = ""; }
        ds.Dispose();
        return result;
    }
}