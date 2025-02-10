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
using Newtonsoft.Json;
using System.Net;

public partial class FILE_Consultas_funciones : System.Web.UI.Page
{
    
    protected void Page_Load(object sender, EventArgs e)
    {
        
    }
   
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Poliza(string quincena)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        try
        {
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarNomina_Poliza '" + quincena + "'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
                result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
                result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
                result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
                // result[4] = lib.convertirDatatableEnJsonString(ds.Tables[4]);
            }
            ds.Dispose();
        }
        catch (Exception ex)
        {
            throw ex;
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Nomina(string plaza,int empleado, string quincena,string tipo)
    {       
        string[] result = { "", "", "","","","","","" };
        Utilerias lib = new Utilerias();
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        JavaScriptSerializer js = new JavaScriptSerializer();        
       
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        string usu = objusuario.Usuario;
        string usupc = objusuario.IpUsu;
        try
        {
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarNomina '" + plaza + "'," + empleado + ",'" + quincena + "','" + tipo + "','" + usu + "','"+ usupc+"'");

            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
            result[4] = lib.convertirDatatableEnJsonString(ds.Tables[4]);
            if (ds.Tables[5].Rows.Count > 0)
            {
                result[5] = ds.Tables[5].Rows[0][0].ToString();
            }
            else {result[5] = "";}
            if (ds.Tables[6].Rows.Count>0)
            { result[6] = lib.convertirDatatableEnJsonString(ds.Tables[6]); }
            else { result[6] = ""; }
           
            if (ds.Tables[7].Rows.Count > 0)
            {
                ClsCampos campo = new ClsCampos();                
                for (int i = 0; i < ds.Tables[7].Rows.Count; i++)
                {
                    campo = new ClsCampos();
                    campo.Id = i;
                    campo.name = ds.Tables[7].Rows[i][0].ToString();
                    campo.text = ds.Tables[7].Rows[i][0].ToString();                    
                    lstcampo.Add(campo);
                }
                result[7] = js.Serialize(lstcampo);
            }
            else { result[7] = ""; }
            ds.Dispose();
        }
        catch(Exception ex)
        {
            result[0] = "1";
            result[1] = ex.Message.ToString();
        }
        
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Plaza(string plaza)
    {
        string[] result = { "", "", "", "", "" };       
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarPlazas '" + plaza + "',''");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);           
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_HistoriaMovimientos(string tipo, string tipomov,string valor)
    {
        string[] result = { "", "", "", "", "","" };        
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarHistoriaMovimientos '" + tipo + "','" + tipomov + "','" + valor+"'");
        if (tipomov == "ME")
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
            result[4] = ds.Tables[4].Rows[0][0].ToString();
            result[5] = ds.Tables[4].Rows[0][1].ToString();

        }

        else
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = ds.Tables[3].Rows[0][0].ToString();
        }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_HistoriaPlazas(string valor, string tipo)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarHistoriaPlazas '" + valor + "','" + tipo + "'");
        //if (ds.Tables[0].Rows.Count > 0)
        //{
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);         
        //}
        ds.Dispose();
        return result;
    }


    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarDatosEmpleados(string strempleado)
    {        
        string[] result = { "", "", "", "", "","" };
        Utilerias lib = new Utilerias();        
        //string usupc = System.Net.Dns.GetHostName();

        

        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //string usu = objusuario.Usuario;
        //string usupc = objusuario.IpUsu;

        string usu = "ADmin";// objusuario.Usuario;
        string usupc = "::1"; ;// objusuario.IpUsu;


        //try
        //{
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarEmpleados '" + strempleado + "','" + usu + "','"+ usupc + "'");

        if (ds.Tables[0].Rows.Count > 0)
            {
                result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
                result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
                result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
                result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
                result[4] = lib.convertirDatatableEnJsonString(ds.Tables[4]);
                result[5] = lib.convertirDatatableEnJsonString(ds.Tables[5]);                  
            }
            ds.Dispose();

        //}
        //catch (Exception e)
        //{ result[4] = e.Message; }
        return result;
    }

    public static string GetComputerName(string clientIP)
    {
        try
        {
            var hostEntry = Dns.GetHostEntry(clientIP);
            return hostEntry.HostName;
        }
        catch (Exception ex)
        {
            return string.Empty;
        }
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Empleados_Imagenes(string empleado,string desde,string hasta)
    {       
        List<Imagen_Binaria> lstimagen = new List<Imagen_Binaria>();
        Imagen_Binaria ilist = new Imagen_Binaria();
        string[] result = { "","" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarEmpleados_Imagenes '" + empleado + "','" + desde + "','" + hasta + "'");

        if (ds.Tables[0].Rows.Count > 0)
        {           
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    ilist = new Imagen_Binaria();                  
                    byte[] myImage = (byte[])ds.Tables[0].Rows[i][2];
                    ilist.Imagen = myImage;
                    lstimagen.Add(ilist);
                }
                //JavaScriptSerializer js = new JavaScriptSerializer();
                //js.MaxJsonLength = 500000000;
                //result[0] = js.Serialize(lstimagen);
                using (StreamWriter sw = new StreamWriter(@"JsonImagenes\temp.json"))
                using (JsonWriter writer = new JsonTextWriter(sw))
                {
                    new JsonSerializer().Serialize(writer, lstimagen);

                }
                //result[0] = 
                result[1] = ds.Tables[1].Rows[0][0].ToString();           
        }
        else { result[0] = "0"; }

        ds.Dispose();
        return result;
    }
   
    static string BytesToStringConverted(byte[] bytes)
    {
        using (var stream = new MemoryStream(bytes))
        {
            using (var streamReader = new StreamReader(stream))
            {
                return streamReader.ReadToEnd();
            }
        }
    }
  
    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Pensionadas(string valor,string quincena)
    {
        string[] result = { ""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarPensionadas '" + valor + "','"+quincena+"'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);            
        }
        ds.Dispose();
        return result;
    }



    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Buscar_PagoEspecial(string plaza,string quincena)
    {
        string[] result = { "", "", "", "", "" };
        Utilerias lib = new Utilerias();        
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarPagoEspecial '" + plaza + "','" + quincena + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[2]);
            result[3] = lib.convertirDatatableEnJsonString(ds.Tables[3]);
            result[4] = lib.convertirDatatableEnJsonString(ds.Tables[4]);
        }
        ds.Dispose();
        return result;
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
                    dlist.Longitud = ds.Tables[1].Rows[i]["longitud"].ToString();
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ConfiguracionGrid(string strtabla)
    {
        string[] result = { "", "", "", "", "", "", "", "", "", "", "" };
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Catalogos_ConfiguracionGrid '" + strtabla + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            //descripcion
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            //ancho tabla
            result[1] = ds.Tables[0].Rows[0][1].ToString();
            //alto tabla
            result[2] = ds.Tables[0].Rows[0][2].ToString();
            //propiedades
            result[3] = ds.Tables[0].Rows[0][3].ToString();
            //columnas grid
            result[4] = ds.Tables[0].Rows[0][4].ToString();
            //columnas de bloqueo
            result[5] = ds.Tables[0].Rows[0][5].ToString();
            //tabla siguiente
            result[6] = ds.Tables[0].Rows[0][6].ToString();
            //tabla anterior
            result[7] = ds.Tables[0].Rows[0][7].ToString();
            //columna filtro tabla siguiente
            result[8] = ds.Tables[0].Rows[0][8].ToString();
            //Orden de Nivel
            result[9] = ds.Tables[0].Rows[0][9].ToString();
            //Pagina nivel
            result[10] = ds.Tables[0].Rows[0][10].ToString();
        }
        else { result[0] = "0"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Eliminar_Indicador(string documento,string indicador , string tipoind)
    {
        string[] result = { "", ""};
        Utilerias lib = new Utilerias();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_CapturaEspecial_Eliminar_Indicador '" + documento + "','" + indicador + "','" + tipoind + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = ds.Tables[0].Rows[0][0].ToString();
            result[1] = ds.Tables[0].Rows[0][1].ToString();        
        }
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
        dlist.valor = "Actual";
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Listar_Quincenastv(int empleado)
    {
        string[] result = { "" };
        Utilerias lib = new Utilerias();        
        List<ClsCampos> lstcampo = new List<ClsCampos>();
        JavaScriptSerializer js = new JavaScriptSerializer();
        ClsCampos campo = new ClsCampos();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarQuincenas_Pagos "+empleado);

        campo = new ClsCampos();
        campo.Id = -1;
        campo.name = "Actual";
        campo.text = "Actual";        
        lstcampo.Add(campo);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            campo = new ClsCampos();
            campo.Id = i;
            campo.name = ds.Tables[0].Rows[i][0].ToString();
            campo.text = ds.Tables[0].Rows[i][0].ToString();
            //campo.attributes = ds.Tables[0].Rows[i][3].ToString();
            lstcampo.Add(campo);
        }
        result[0] = js.Serialize(lstcampo);
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string Listar_Conceptos()
    {
        Utilerias lib = new Utilerias();
        List<ClsCatalogos> lista = new List<ClsCatalogos>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("Select * from GESRH_NOM_Tipo_Indicadores");

        ClsCatalogos dlist = new ClsCatalogos();
        dlist.valor = "x";
        dlist.selected = true;
        dlist.descripcion = "Todos";
        lista.Add(dlist);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            dlist = new ClsCatalogos();
            dlist.valor = ds.Tables[0].Rows[i][0].ToString();
            dlist.selected = false;
            dlist.descripcion = ds.Tables[0].Rows[i][0].ToString()+"-"+ds.Tables[0].Rows[i][1].ToString();
            lista.Add(dlist);
        }
        JavaScriptSerializer js = new JavaScriptSerializer();
        string datos = js.Serialize(lista);
        return datos;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] CamposHistoria(string modulo, string movimiento, string documento,string tipoquin)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        List<ClsCamposCaptura> lista = new List<ClsCamposCaptura>();
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Consulta_ListarCapturaHistoria '" + modulo + "','" + movimiento + "','" + documento + "','"+tipoquin+"'");
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
                    dlist.Longitud = ds.Tables[1].Rows[i]["longitud"].ToString();
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
    public static string[] Buscar_Expediente(string numempleado, string numimagen, string pagina, string conexion)
    {
        string[] result = { "", "", "" };
        Utilerias lib = new Utilerias();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        ClsImagen_Expediente img = new ClsImagen_Expediente();
        List<ClsImagen_Expediente> lstimg = new List<ClsImagen_Expediente>();

        DataSet ds = lib.ejecutarConsultaDataSetExpediente("spt_Digital_Listar_Expediente_Imagenes '" + numempleado + "',1," + numimagen + "," + pagina + ",'" + conexion + "'");
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);

            if (ds.Tables[1].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[1].Rows.Count; i++)
                {
                    if (ds.Tables[1].Rows[i][3].ToString() != "")
                    {
                        img = new ClsImagen_Expediente();
                        img.Id = Convert.ToInt32(ds.Tables[1].Rows[i][4].ToString());
                        img.Orden = Convert.ToInt32(ds.Tables[1].Rows[i][5].ToString());
                        img.Expediente = ds.Tables[1].Rows[i][1].ToString();
                        byte[] myImage = (byte[])ds.Tables[1].Rows[i][3];
                        img.Imagen = myImage;
                        lstimg.Add(img);
                    }
                }
                JavaScriptSerializer js = new JavaScriptSerializer();
                js.MaxJsonLength = 2147483644;
                result[2] = js.Serialize(lstimg);
                // result[3] = JsonConvert.SerializeObject(lstimg,Formatting.Indented);                
                ds.Dispose();
            }
            else { result[0] = "0"; }
        }
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] Buscar_ExpedienteEmpleado(string numempleado, string numimagen, string pagina, string conexion)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        ClsImagen_Expediente img = new ClsImagen_Expediente();
        List<ClsImagen_Expediente> lstimg = new List<ClsImagen_Expediente>();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];

        DataSet ds = lib.ejecutarConsultaDataSetExpediente("spt_Digital_Listar_Expediente_Empleado " + numempleado + ",1," + numimagen + "," + pagina + ",'" + conexion + "'");
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "1";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);
            result[2] = lib.convertirDatatableEnJsonString(ds.Tables[1]);
            ds.Dispose();
        }
        else { result[0] = "1"; }
        ds.Dispose();
        return result;
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static string[] ListarPermisosBotones(int strconsulta)
    {
        string[] result = { "", "", "", "" };
        Utilerias lib = new Utilerias();
        ClsImagen_Expediente img = new ClsImagen_Expediente();
        List<ClsImagen_Expediente> lstimg = new List<ClsImagen_Expediente>();
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        int idusu = 1;// objusuario.Id;
        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Sistemas_ListarPermisosPorconsultas " + idusu + "," + strconsulta);
        if (ds.Tables[0].Rows.Count > 0)
        {
            result[0] = "0";
            result[1] = lib.convertirDatatableEnJsonString(ds.Tables[0]);         
            ds.Dispose();
        }
        else { result[0] = "1"; }

        return result;
    }


}