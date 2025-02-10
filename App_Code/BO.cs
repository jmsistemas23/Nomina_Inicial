using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Xml;
using System.Configuration;
using System.Web;
using System.Web.UI;
using System.IO;
using ClosedXML.Excel;
using System.Collections;
using System.Web.Security;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.Data.SqlClient;


public class BO : Page
{
  
    public string sp_cat_puesto_equivalencia_selectStringJSON()
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_selectDS();
        return Utilerias_generarStringJSON(Ds);
    }

    public int GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(int cveRecurso_Movimiento)
    {
        return new DAL().GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(cveRecurso_Movimiento);
    }

    public string sp_cat_puesto_equivalencia_selectStringJSON(string cvepue)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_selectDS(cvepue);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_puesto_equivalencia_detalle_selectStringJSON(string clave)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_selectDS(clave);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_puesto_equivalencia_detalle_selectStringJSON(string clave, int parametro, string cveNivel_Educativo)
    {
        DataSet Ds;
        string[] partes = clave.Split('-');
        if (partes.Length >= 1)
        {
            clave = partes[0].Trim();
        }
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_selectDS(clave, parametro, cveNivel_Educativo);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_puesto_equivalencia_detalle_selectStringJSON(string clave, int parametro)
    {
        DataSet Ds;
        string[] partes = clave.Split('-');
        if (partes.Length >= 1)
        {
            clave = partes[0].Trim();
        }
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_selectDS(clave, parametro);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_puesto_equivalencia_detalle_nivel_selectStringJSON(int cvepuesto_equivalencia_detalle)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_nivel_select(cvepuesto_equivalencia_detalle);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_puesto_equivalencia_alta(int cveNivel_educativo, string cvepue)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_alta(cveNivel_educativo, cvepue);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_Recurso_Vacante_selectStringJSON(string CentroCosto, string Numero_Plaza, string desde, string hasta, string cvenisni_ocupado, string cveRecurso_Vacante, string opcion, string cvpuespu)
    {
        DataSet Ds;
        DataSet ds_nivel_salarial_ocupado;
        DataSet ds_nivel_salarial_vacante;
        decimal importe_ocupado = 0;
        decimal Importe_ocupadoAplicaPlaza = 0;

       
        DataSet ds_importes = new DataSet();

        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();

        decimal? Suma_vacante = 0;
        decimal? Suma_ocupado = 0;
        decimal hras_vacantes = 0;
  
        decimal importe_nivel_salarial_ocupado = decimal.MinValue;
        decimal importe_nivel_salarial_vacante = decimal.MinValue;

        int equivalencia = int.MinValue;
     
        int desglose_forma_interina = int.MinValue;

        
        if (opcion == "06" || opcion == "07")
        {
            Ds = new DAL().sp_Recurso_Vacante_selectDS();
        }
        else
        {
            if (CentroCosto != null && CentroCosto != "")
            {
                
                
                Ds = new DAL().sp_Recurso_Vacante_selectDS(null, null, desde, hasta);
            }
            else
            {
                Ds = new DAL().sp_Recurso_Vacante_selectDS(null, Numero_Plaza, desde, hasta);
            }
        }
        if (Utilerias_DataSetValido(Ds))
        {
            string expression = String.Empty;
            string expression02 = String.Empty;

            if (opcion == "07")
            {
                expression02 = "cveRecurso_vacante_tipo IS NOT NULL AND ";
            }

            if (cveRecurso_Vacante == null)
            {
                expression = expression02 + "(Nombre Like '%" + Numero_Plaza + "%' OR Numero_Plaza Like '" + Numero_Plaza + "%')";
            }
            else
            {
                expression = expression02 + "cveRecurso_Vacante = '" + cveRecurso_Vacante + "'  and (Nombre Like '%" + Numero_Plaza + "%' OR Numero_Plaza Like '" + Numero_Plaza + "%')";

            }
            DataRow[] foundRows = Ds.Tables[0].Select(expression);
            DataTable dtFiltrado = new DataTable();
            DataSet dsFiltrado = new DataSet();

            if (Ds.Tables[0].Columns.Count > 0)
            {
                dtFiltrado = Ds.Tables[0].Clone();
                foreach (var row in foundRows)
                {
                    dtFiltrado.ImportRow(row);
                }

                dsFiltrado.Tables.Add(dtFiltrado);

            }

            dsFiltrado.Tables[0].Columns.Add("Horas_Totales");
            dsFiltrado.Tables[0].Columns.Add("horjorpu_vacante");
            dsFiltrado.Tables[0].Columns.Add("horjorpu_ocupado");
            dsFiltrado.Tables[0].Columns.Add("cvpuespu");
            if (opcion != "06")
            {
                foreach (DataRow row in dsFiltrado.Tables[0].Rows)
                {
                    cveRecurso_Vacante = row["cveRecurso_Vacante"].ToString();
                    DataSet DS_disponibilidad = new DAL().sp_plazas_diponibilidad(cveRecurso_Vacante.ToString(), desde, hasta);
                    if (DS_disponibilidad != null && DS_disponibilidad.Tables != null && DS_disponibilidad.Tables[0].Rows.Count > 0)
                    {
                        int Horas_utilizadas = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["HRAS_ASIGNADAS"].ToString().Replace(".00",""));
                        ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(row["cvenivpl"].ToString()); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
                        ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO
                        if (ds_nivel_salarial_vacante != null && ds_nivel_salarial_vacante.Tables != null && ds_nivel_salarial_vacante.Tables[0].Rows.Count != 0)
                        {
                            if (ds_nivel_salarial_ocupado != null && ds_nivel_salarial_ocupado.Tables != null && ds_nivel_salarial_ocupado.Tables[0].Rows.Count != 0)
                            {
                                importe_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                                Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
                                row["hora_disponible"] = DS_disponibilidad.Tables[0].Rows[0]["HRAS_LIBRES"].ToString().Replace(".00", "");
                                row["Horas_Totales"] = DS_disponibilidad.Tables[0].Rows[0]["HRS_TOTALES"].ToString().Replace(".00", ""); ;
                                row["horjorpu_vacante"] = DS_disponibilidad.Tables[0].Rows[0]["horjorpu_vacante"];
                                row["horjorpu_ocupado"] = DS_disponibilidad.Tables[0].Rows[0]["horjorpu_ocupado"];
                                row["cvpuespu"] = DS_disponibilidad.Tables[0].Rows[0]["cvpuespu"];

                                equivalencia = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["equivalencia"].ToString() == "" ? "0" : DS_disponibilidad.Tables[0].Rows[0]["equivalencia"].ToString());

                                int HORAS_VACANTE_TOTAL;



                                Suma_vacante = decimal.Parse(DS_disponibilidad.Tables[0].Rows[0]["importe_vacante_total"].ToString()); //VALOR REAL DE LA PLAZA (RECURSO VACANTE)
                                Suma_ocupado = DS_disponibilidad.Tables[0].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });// VALOR DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                                hras_vacantes = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["hras_libres"].ToString().Replace(".00", ""));//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                                
                                importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                                Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
                                importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());
                                      
                                if (ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString() == "J" && ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString() == "H")
                                {
                                    //Horas_utilizadas = (int)DS_disponibilidad.Tables[0].AsEnumerable().Sum((b) => { return b.Field<decimal?>("HRAS_ASIGNADAS"); });
                                    Horas_utilizadas = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["HRAS_ASIGNADAS"].ToString().Replace(".00", ""));


                                    desglose_forma_interina = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["desglose_forma_interina"].ToString());
                                    int desglose_horas_totales = int.Parse(Math.Floor((double)((((decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"] + (decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["ImporteAplicaPlaza"]) - Importe_ocupadoAplicaPlaza) / importe_ocupado)).ToString());
                                    decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);//Se calcula el restante disponible del recurso vacante
                                    if (COSTO_VANCANTE_TOTAL <= 0)
                                    {
                                        HORAS_VACANTE_TOTAL = 0;
                                    
                                    }
                                    int hras_vacantes_real;
                                    if (cvpuespu == "IN")
                                    {
                                        HORAS_VACANTE_TOTAL = int.Parse((desglose_horas_totales > desglose_forma_interina ? desglose_forma_interina : desglose_horas_totales).ToString().Replace(".00", ""));
                                        hras_vacantes_real = int.Parse(Math.Floor((double)(COSTO_VANCANTE_TOTAL / importe_nivel_salarial_ocupado)).ToString());

                                        hras_vacantes_real = HORAS_VACANTE_TOTAL - Horas_utilizadas;
                                    }
                                    else
                                    {
                                        HORAS_VACANTE_TOTAL = int.Parse(desglose_horas_totales.ToString().Replace(".00", ""));
                                        hras_vacantes_real = int.Parse(Math.Floor((double)(COSTO_VANCANTE_TOTAL / importe_nivel_salarial_ocupado)).ToString());
                                    }
                           

                           

                                    //********************************************************************
                                    if (DS_disponibilidad.Tables[0].Rows[0]["horjorpu_ocupado"].ToString() == "J" && desglose_forma_interina > equivalencia + Horas_utilizadas)//Si existen movimientos de jornadas con los mismos efectos
                                    {
                                         //SE CAMBIO UNO POR OTRO
                                        //importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado == "" ? "0" : elementos.hora_ocupado) : 1);
                                        //importe_nuevo = importe_nivel_salarial_ocupado * (DS_disponibilidad.Tables[0].Rows[0]["horjorpu_ocupado"].ToString() == "H" ? int.Parse(DS_disponibilidad.Tables[0].Rows[0]["horjorpu_ocupado"].ToString() == "" ? "0" : DS_disponibilidad.Tables[0].Rows[0]["horjorpu_ocupado"].ToString()) : 1);
                                        COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);
                                        HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)((COSTO_VANCANTE_TOTAL - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                                        //importe_utilizado += COSTO_VANCANTE_TOTAL;
                                        //if (COSTO_VANCANTE_TOTAL < importe_nuevo)
                                        //{
                                        //    Respuesta_Entity.respuesta = false;
                                        //    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                                        //    list.Add(Respuesta_Entity);
                                        //    //return list;
                                        //}
                                    }

                                    //********************************************************************
                                    //SE MODIFICO PARA DESGLOSE EN HORAS DE MANERA INTERINA DE UNA PLAZA JORNADA

                                    if (HORAS_VACANTE_TOTAL > hras_vacantes_real)
                                    {
                                        
                                        row["hora_disponible"] = (hras_vacantes_real < 0 ? 0 : hras_vacantes_real).ToString().Replace(".00", "");
                                    }
                                    else
                                    {
                                        row["hora_disponible"] = (HORAS_VACANTE_TOTAL - Horas_utilizadas).ToString().Replace(".00", "");
                                    }



                                    row["Horas_Totales"] = HORAS_VACANTE_TOTAL.ToString().Replace(".00", "");

                                  




                                  
                                }
                            }
                        }


                        if (opcion == "05")
                        {
                            if (row["calpla"].ToString() == "1")
                            {  
                                row["hora_disponible"] = row["Horas_Totales"].ToString().Replace(".00", "");

                            }


                        }
                    }
                }
            }

            return Utilerias_generarStringJSON(dsFiltrado);
        }
        return "";
    }

    public string sp_cat_Motivos_Baja_selectStringJSON()
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_Motivos_Baja_selectDS();
        return Utilerias_generarStringJSON(Ds);
    }

    public DataSet sp_validaefectos(string cveRecurso_Vacante, string desde, string hasta, string horas)
    {
        return new DAL().sp_validaefectos(cveRecurso_Vacante, desde, hasta, horas);
    }

    public DataSet sp_validaefectos(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta, string horas)
    {
        return new DAL().sp_validaefectos(cveRecurso_Ocupado, cveRecurso_Vacante, desde, hasta, horas);
    }

    public DataSet luis_sp_valida_efectos_horas_importe(string cveRecurso_Vacante, string desde, string hasta)
    {
        return new DAL().valida_efectos_horas_importe(cveRecurso_Vacante, desde, hasta);
    }

    public DataSet luis_sp_valida_efectos_horas_importe(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta)
    {
        return new DAL().valida_efectos_horas_importe(cveRecurso_Ocupado, cveRecurso_Vacante, desde, hasta);
    }

    public List<Respuesta_Entity> sp_plaza_select(string numplaza)
    {
        DataSet Ds;
        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();

        Ds = new DAL().sp_plaza_select(numplaza);
        if (Utilerias_DataSetValido(Ds))
        {
            foreach (DataRow row in Ds.Tables[0].Rows)
            {
                if (row["cveesppl"].ToString() != "AO")
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede compactar esta plaza ya que tiene el estatus: " + row["desesp"].ToString();
                    list.Add(Respuesta_Entity);
                    return list;
                }

                if (row["horjorpu"].ToString() == "J")
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar este movimiento en plazas de Jornada";
                    list.Add(Respuesta_Entity);
                    return list;
                }
            }

        }
        else
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "No se encontro informacion para el numero de plaza proporcionado";
            list.Add(Respuesta_Entity);
            return list;
        }
        Respuesta_Entity.respuesta = true;
        Respuesta_Entity.mensaje = Utilerias_generarStringJSON(Ds);
        list.Add(Respuesta_Entity);
        return list;
    }

    public string sp_plaza_compactacion_select(string numplaza)
    {
        DataSet Ds;
        Ds = new DAL().sp_plaza_compactacion_select(numplaza);
        if (Utilerias_DataSetValido(Ds))
        {
            return Utilerias_generarStringJSON(Ds);
        }
        return "";
    }

    public string sp_plaza_recategorizacion_select(string filtro, string desde, string hasta)
    {
        DataSet Ds;
        Ds = new DAL().sp_plaza_recategorizacion_select(filtro, desde, hasta);
        if (Utilerias_DataSetValido(Ds))
        {
            return Utilerias_generarStringJSON(Ds);
        }
        return "";
    }

    public string sp_Recurso_Ocupado_selectStringJSON(int cveRecurso_Vacante)
    {
        DataSet Ds;
        Ds = new DAL().sp_Recurso_Ocupado_selectDS(cveRecurso_Vacante);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_Recurso_Ocupado_selectStringJSON(int cveRecurso_Vacante, int cveRecurso_Movimiento)
    {
        DataSet Ds;
        Ds = new DAL().sp_Recurso_Ocupado_selectDS(cveRecurso_Vacante, cveRecurso_Movimiento);
        return Utilerias_generarStringJSON(Ds);
    }

    public int sp_Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante, int cveRecurso_Ocupado)
    {
        return new DAL().Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado);
    }

    public int sp_Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante)
    {
        return new DAL().Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante);
    }

    public string sp_Recurso_Movimiento_selectStringJSON(int cveRecurso_Movimiento, int cveRecurso_Movimiento_tipo)
    {
        DataSet Ds;
        Ds = new DAL().sp_Recurso_Movimiento_select(cveRecurso_Movimiento, cveRecurso_Movimiento_tipo);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_Recurso_Vacante_Movimiento_selectStringJSON(int cveRecurso_Movimiento, string desde, string hasta, string cvenisni_ocupado, string opcion, string cvpuespu)
    {
        DataSet Ds;
        DataSet ds_nivel_salarial_ocupado;
        DataSet ds_nivel_salarial_vacante;
        string jorniv_vacante = "";
        string jorniv_ocupado = "";
        decimal importe_ocupado = 0;
        decimal importe_vacante = 0;
        decimal Importe_ocupadoAplicaPlaza = 0;

        Ds = new DAL().sp_Recurso_Vacante_Movimiento_select(cveRecurso_Movimiento);
        if (Utilerias_DataSetValido(Ds))
        {
            foreach (DataRow row in Ds.Tables[0].Rows)
            {
                int cveRecurso_Vacante = (int)row["cveRecurso_Vacante"];
                ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(row["cvenivpl"].ToString()); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
                ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO

                DataSet DS_disponibilidad = new DAL().sp_plazas_diponibilidad(cveRecurso_Vacante.ToString(), desde, hasta, cveRecurso_Movimiento.ToString());
                if (DS_disponibilidad != null && DS_disponibilidad.Tables != null && DS_disponibilidad.Tables[0].Rows.Count > 0)
                {
                    if (DS_disponibilidad.Tables[0].Rows[0]["horjorpu_vacante"].ToString() == "J" && ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString() == "H")
                    {
                        int Horas_utilizadas = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["HRAS_ASIGNADAS"].ToString().Replace(".00",""));
                        jorniv_vacante = ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString();
                        jorniv_ocupado = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString();
                        importe_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                        Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
                        if (ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString() == "J" && ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString() == "H")
                        {
                            int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)((((decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"] + (decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["ImporteAplicaPlaza"]) - Importe_ocupadoAplicaPlaza) / importe_ocupado)).ToString());
                            int desglose_forma_interina = int.Parse(DS_disponibilidad.Tables[0].Rows[0]["desglose_forma_interina"].ToString());
                            int desglose_horas_totales = int.Parse(Math.Floor((double)((((decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"] + (decimal)ds_nivel_salarial_vacante.Tables[0].Rows[0]["ImporteAplicaPlaza"]) - Importe_ocupadoAplicaPlaza) / importe_ocupado)).ToString());

                            //SI EL MOVIMIENTO ES UN INTERINATO SE TOPA AL MAXIMO EN DESGLOSE EN  HORAS DEL PUESTO
                            if (cvpuespu == "IN")
                            {
                                HORAS_VACANTE_TOTAL = desglose_horas_totales > desglose_forma_interina ? desglose_forma_interina : desglose_horas_totales;
                            }
                            else
                            {   
                                HORAS_VACANTE_TOTAL = desglose_horas_totales;
                            }

                            row["hora_disponible"] = (HORAS_VACANTE_TOTAL - Horas_utilizadas).ToString().Replace(".00", "");
                        }
                    }
                    else
                    {
                        row["hora_disponible"] = DS_disponibilidad.Tables[0].Rows[0]["HRAS_LIBRES"].ToString().Replace(".00", "");
                    }
                }

                if (opcion == "05")
                {
                    if (row["calpla"].ToString()=="1")
                    {
                        row["hora_disponible"] = row["Horas_Totales"].ToString().Replace(".00", "");
                    
                    }
                  

                }
            }
        } 
        return Utilerias_generarStringJSON(Ds);
    }

    public int sp_cat_puesto_equivalencia_elimina(int id)
    {
        return new DAL().sp_cat_puesto_equivalencia_elimina(id);
    }

    public string sp_cat_puesto_equivalencia_detalle_alta(string cvepue, string cvepuesto_equivalencia)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_alta(cvepue, cvepuesto_equivalencia);
        return Utilerias_generarStringJSON(Ds);
    }

    public int sp_Recurso_Ocupado_alta(ref List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        DataSet ds_nivel_salarial_vacante;
        DataSet ds_nivel_salarial_ocupado;
        string jorniv_vacante = "";
        string jorniv_ocupado = "";
        decimal importe_ocupado = 0;
        decimal importe_vacante = 0;
        int y = 0;
        string cveRecurso_Movimiento = "";

        foreach (Recurso_Ocupado elementos in Recurso_OcupadoEntity)
        {
            Recurso_Ocupado x = elementos;

            ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_vacante); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
            ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO

            jorniv_vacante = ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString();
            jorniv_ocupado = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString();

            importe_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado) : 1);
            importe_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_vacante == "H" ? int.Parse(elementos.hora_vacante.ToString().Replace(".00","")) : 1);

            x.importe_vacante = importe_vacante.ToString();
            x.importe_ocupado = importe_ocupado.ToString();
            if (cveRecurso_Movimiento != "")
            {
                x.cveRecurso_Movimiento = cveRecurso_Movimiento;
            }

            int resultado = new DAL().sp_Recurso_Ocupado_alta(ref x);
            y = int.Parse(x.cveRecurso_Movimiento);
            cveRecurso_Movimiento = x.cveRecurso_Movimiento;
        }
        return y;
    }

    public int sp_Recurso_Vacante_alta(ref Recurso_Vacante Recurso_VacanteEntity)
    {
        return new DAL().sp_Recurso_Vacante_alta(ref Recurso_VacanteEntity);
    }

    public int sp_cat_puesto_equivalencia_detalle_elimina(int id)
    {
        return new DAL().sp_cat_puesto_equivalencia_detalle_elimina(id);
    }

    public string sp_cat_puesto_equivalencia_detalle_nivel_alta(string cveNivel_educativo, int cvepuesto_equivalencia_detalle)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_puesto_equivalencia_detalle_nivel_alta(cveNivel_educativo, cvepuesto_equivalencia_detalle);
        return Utilerias_generarStringJSON(Ds);
    }

    public string GESRH_SPT_Catalogo_ListarTablasStringJSON(string tabla, string filtro)
    {
        DataSet Ds;

        Ds = new DAL().GESRH_SPT_Catalogo_ListarTablas(tabla, filtro.PadLeft(6, '0'));
        return Utilerias_generarStringJSON(Ds);
    }

    public string GESRH_SPT_BUSCAREMPLEADO_StringJSON(string where, string dato)
    {
        DataSet Ds;

        Ds = new DAL().GESRH_SPT_BUSCAREMPLEADO(where, dato);
        return Utilerias_generarStringJSON(Ds);
    }

    public string DocumentosCIT_selectStringJSON(string folio)
    {
        DataSet Ds;
        Ds = new DAL().DocumentosCIT_selectStringJSON(folio);
        return Utilerias_generarStringJSON(Ds);
    }

    public string sp_cat_nivsal_select(string cvezon, string codnivpu)
    {
        DataSet Ds;
        Ds = new DAL().sp_cat_nivsal_select(cvezon, codnivpu);
        return Utilerias_generarStringJSON(Ds);
    }
   
    public DataSet GESRH_SPT_ControlPlaza_simulacion_afectacion()
    {
        DataSet Ds;
        Ds = new DAL().GESRH_SPT_ControlPlaza_simulacion_afectacion();
        return Ds;
    }
    
    public DataSet GESRH_SPT_ControlPlaza_CalculoEquivalencias(string nivel_salarial)
    {
        //SE MODIFICA EL NIVEL SALARIAL PARA TOMAR SOLO EL NIVEL 01 SIN CARRERA MAGISTERIAL PARA EL COSTEO
        return new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(nivel_salarial.Substring(0, nivel_salarial.Length - 2) + "01");
    }

    public string Costeo_Plazas(List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        DataTable dt_costeo = new DataTable();
        DataSet ds_nivel_salarial_vacante = new DataSet();
        DataSet ds_nivel_salarial_ocupado = new DataSet();
        string jorniv_vacante = "";
        string jorniv_ocupado = "";
        decimal importe_ocupado = 0;
        decimal importe_vacante = 0;
        DataSet ds_importes = new DataSet();

        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();

        decimal? Suma_vacante = decimal.MinValue;
        decimal? Suma_ocupado = decimal.MinValue;
        decimal hras_vacantes = decimal.MinValue;
        decimal? hras_asignadas = decimal.MinValue;
        decimal importe_nivel_salarial_ocupado = decimal.MinValue;
        decimal Importe_ocupadoAplicaPlaza = decimal.MinValue;



        decimal importe_nivel_salarial_vacante = decimal.MinValue;
        int DIFERENCIA_COSTO_PLAZA_FALTANTE = 0;
        decimal importe_nuevo = 0;
        decimal? COSTO_VANCANTE_TOTAL_COMPLETO = 0;
        string hora_ocupado = "";

        foreach (Recurso_Ocupado elementos in Recurso_OcupadoEntity)
        {

            if (elementos.cveRecurso_Ocupado.ToString() != "0" && elementos.cveRecurso_Ocupado.ToString() != "")
            {
                ds_importes = new DAL().valida_efectos_horas_importe(elementos.cveRecurso_Ocupado, elementos.cveRecurso_Vacante, elementos.FECHA_DESDE, elementos.FECHA_HASTA);
            }
            else
            {
                ds_importes = new DAL().valida_efectos_horas_importe(elementos.cveRecurso_Vacante, elementos.FECHA_DESDE, elementos.FECHA_HASTA);
            }

            if (ds_importes == null || ds_importes.Tables == null)
            {
                return null;
            }
            if (!ds_importes.Tables[0].Columns.Contains("horas_utilizadas"))
            {

                ds_importes.Tables[0].Columns.Add("horas_utilizadas");
                ds_importes.Tables[0].Columns.Add("importe_utilizado");
                ds_importes.Tables[0].Columns.Add("importe_ocupado");
                ds_importes.Tables[0].Columns.Add("horas_ocupado");
                ds_importes.Tables[0].Columns.Add("puesto_ocupado");
                ds_importes.Tables[0].Columns.Add("costo_ocupado");


            }
            if (dt_costeo.Columns.Count == 0)
            {
                dt_costeo = ds_importes.Tables[0].Clone();
            }
            hora_ocupado = elementos.hora_ocupado;
            ds_importes.Tables[0].Rows[0]["puesto_ocupado"] = elementos.puesto_ocupado;
            ds_importes.Tables[0].Rows[0]["horas_ocupado"] = elementos.hora_ocupado;
            ds_importes.Tables[0].Rows[0]["horas_utilizadas"] = elementos.hora_vacante.ToString().Replace(".00","");


            ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_vacante); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
            ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO
            jorniv_vacante = ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString();
            jorniv_ocupado = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString();
            importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
            importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());
            Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());

            if (jorniv_vacante == "H")
            {
                ds_importes.Tables[0].Rows[0]["importe_utilizado"] = int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")) * (decimal)ds_importes.Tables[0].Rows[0]["importe_vacante"];
            }
            else
            {
                if (jorniv_ocupado == "J")
                {
                    ds_importes.Tables[0].Rows[0]["importe_utilizado"] = importe_nivel_salarial_vacante;
                }
                else
                {
                    decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);

                    int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)(((decimal)ds_importes.Tables[0].Rows[0]["importe_vacante"] - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                    if (HORAS_VACANTE_TOTAL < int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")))
                    {
                        Respuesta_Entity.respuesta = false;
                        Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                        list.Add(Respuesta_Entity);
                    }
                    ds_importes.Tables[0].Rows[0]["importe_utilizado"] = int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")) * importe_nivel_salarial_ocupado;
                }
            }
            ds_importes.Tables[0].Rows[0]["costo_ocupado"] = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString();
            if (ds_importes.Tables[1].Rows.Count > 0)//Si existen movimientos de horas con los mismos efectos
            {
                if (jorniv_ocupado == "J") //Si quiere asignar un movimiento de puesto de jornada pero esa plaza ya tiene ocupada parcialmente las horas
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que existen horas asignadas";
                    list.Add(Respuesta_Entity);
                }
                else
                {
                    Suma_vacante = decimal.Parse(ds_importes.Tables[1].Rows[0]["importe_vacante_total"].ToString()); //VALOR REAL DE LA PLAZA (RECURSO VACANTE)
                    Suma_ocupado = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });// VALOR DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                    hras_vacantes = int.Parse(ds_importes.Tables[1].Rows[0]["hras_vacantes"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                    hras_asignadas = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<int?>("hras_ocupadas"); });//HORAS DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)

                    importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                    importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());

                    //SE CAMBIO UNO POR OTRO
                    importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado == "" ? "0" : elementos.hora_ocupado) : 1);
                    Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());

                    ds_importes.Tables[0].Rows[0]["importe_ocupado"] = importe_nuevo;

                    if (jorniv_vacante == "H" && hras_vacantes < hras_asignadas + int.Parse(elementos.hora_vacante.ToString().Replace(".00","")))
                    {
                        Respuesta_Entity.respuesta = false;
                        Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                        list.Add(Respuesta_Entity);
                    }
                    else
                    {
                        Suma_vacante = int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")) * importe_nivel_salarial_ocupado;
                        decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);
                        int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)((COSTO_VANCANTE_TOTAL - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                        COSTO_VANCANTE_TOTAL_COMPLETO += int.TryParse(ConfigurationManager.AppSettings["DIFERENCIA_COSTO_PLAZA_FALTANTE"].ToString(), out DIFERENCIA_COSTO_PLAZA_FALTANTE) == true ? DIFERENCIA_COSTO_PLAZA_FALTANTE : 0;
                    }
                }
            }

            if (ds_nivel_salarial_vacante == null || ds_nivel_salarial_vacante.Tables == null || ds_nivel_salarial_vacante.Tables[0].Rows.Count == 0)
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso vacante";
                list.Add(Respuesta_Entity);
            }

            if (ds_nivel_salarial_ocupado == null || ds_nivel_salarial_ocupado.Tables == null || ds_nivel_salarial_ocupado.Tables[0].Rows.Count == 0)
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso ocupado";
                list.Add(Respuesta_Entity);
            }

            if (ds_importes.Tables[2].Rows.Count > 0)//Si existen movimientos de jornadas con los mismos efectos
            {
                Suma_vacante = decimal.Parse(ds_importes.Tables[2].Rows[0]["importe_vacante_total"].ToString()); //VALOR REAL DE LA PLAZA (RECURSO VACANTE)
                Suma_ocupado = ds_importes.Tables[2].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });// VALOR DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                hras_vacantes = int.Parse(ds_importes.Tables[2].Rows[0]["hras_vacantes"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                hras_asignadas = ds_importes.Tables[2].AsEnumerable().Sum((b) => { return b.Field<int?>("hras_ocupadas"); });//HORAS DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)

                importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
                importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());

                //SE CAMBIO UNO POR OTRO
                importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado == "" ? "0" : elementos.hora_ocupado) : 1);
                ds_importes.Tables[0].Rows[0]["importe_ocupado"] = importe_nuevo;
                decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);
                int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)((COSTO_VANCANTE_TOTAL - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                COSTO_VANCANTE_TOTAL += int.TryParse(ConfigurationManager.AppSettings["DIFERENCIA_COSTO_PLAZA_FALTANTE"].ToString(), out DIFERENCIA_COSTO_PLAZA_FALTANTE) == true ? DIFERENCIA_COSTO_PLAZA_FALTANTE : 0;

                if (COSTO_VANCANTE_TOTAL < importe_nuevo)
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                    list.Add(Respuesta_Entity);
                }
            }
            else
            {
                importe_nuevo = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado) : 1);
                importe_vacante += decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_vacante == "H" ? int.Parse(elementos.hora_vacante.ToString().Replace(".00","")) : 1);
            }
            ds_importes.Tables[0].Rows[0]["importe_ocupado"] = importe_nuevo;
            dt_costeo.ImportRow(ds_importes.Tables[0].Rows[0]);
        }
        importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(hora_ocupado == "" ? "0" : hora_ocupado) : 1);
        if (COSTO_VANCANTE_TOTAL_COMPLETO < importe_nuevo)
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
            list.Add(Respuesta_Entity);
        }
        importe_vacante += int.TryParse(ConfigurationManager.AppSettings["DIFERENCIA_COSTO_PLAZA_FALTANTE"].ToString(), out DIFERENCIA_COSTO_PLAZA_FALTANTE) == true ? DIFERENCIA_COSTO_PLAZA_FALTANTE : 0;
        DataSet ds = new DataSet();
        ds.Tables.Add(dt_costeo);
        return Utilerias_generarStringJSON(ds);
    }
    
    public List<Respuesta_Entity> UnificarValida(List<Recurso_Vacante> Recurso_VacanteEntity)
    {
        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();
        List<Recurso_Vacante> lista = new List<Recurso_Vacante>();
        int datediff = 0;
        DateTime desde = DateTime.MinValue;
        DateTime hasta = DateTime.MinValue;
        DateTime min = DateTime.MinValue;
        DateTime max = DateTime.MinValue;
        Recurso_VacanteEntity = Recurso_VacanteEntity.OrderBy(p => p.Fecha_Baja).ToList();
        Recurso_Vacante Recurso_Vacante_nuevo = new Recurso_Vacante();
        string _lista = "";
        string vacanteid = "";


        foreach (Recurso_Vacante Recurso_Vacante in Recurso_VacanteEntity)
        {
            if (min == DateTime.MinValue)
            {
                min = DateTime.Parse(Recurso_Vacante.Fecha_Baja);
            }
            else
            {
                if (min > DateTime.Parse(Recurso_Vacante.Fecha_Baja))
                {
                    min = DateTime.Parse(Recurso_Vacante.Fecha_Baja);
                }
            }
            if (desde != DateTime.MinValue)
            {               

                datediff = ((TimeSpan)(DateTime.Parse(Recurso_Vacante.Fecha_Baja) - hasta)).Days;
                if (Math.Abs(datediff) != 1)
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "Las incidencias a unificar deben ser consecutivas";
                    list.Add(Respuesta_Entity);
                    return list;
                }
            }

            desde = DateTime.Parse(Recurso_Vacante.Fecha_Baja);
            hasta = DateTime.Parse(Recurso_Vacante.fecha_baja_hasta);

            vacanteid = Recurso_Vacante.cveRecurso_Vacante;

            _lista += "|" + Recurso_Vacante.cveRecurso_Vacante;
        }

        Recurso_Vacante Recurso_incidencia = new DAL().sp_Recurso_Vacante_selectDS(vacanteid);      
        Recurso_Vacante_nuevo.cveRecurso_Vacante = "0";
        Recurso_Vacante_nuevo.Numero_Plaza = Recurso_incidencia.Numero_Plaza;
        Recurso_Vacante_nuevo.cveNivel_Educativo = Recurso_incidencia.cveNivel_Educativo;
        Recurso_Vacante_nuevo.Nombre = Recurso_incidencia.Nombre;
        Recurso_Vacante_nuevo.cvePuesto_Equivalencia = Recurso_incidencia.cvePuesto_Equivalencia;
        Recurso_Vacante_nuevo.hora_disponible = Recurso_incidencia.hora_disponible;
        Recurso_Vacante_nuevo.cveMotivos_Baja = Recurso_incidencia.cveMotivos_Baja;
        Recurso_Vacante_nuevo.cvezona = Recurso_incidencia.cvezona;
        Recurso_Vacante_nuevo.Fecha_Baja = Recurso_incidencia.Fecha_Baja;
        Recurso_Vacante_nuevo.fecha_baja_hasta = Recurso_incidencia.fecha_baja_hasta;
        Recurso_Vacante_nuevo.OBSERVACIONES = Recurso_incidencia.OBSERVACIONES;
        Recurso_Vacante_nuevo.fecha_captura = Recurso_incidencia.fecha_captura;
        Recurso_Vacante_nuevo.cveRecurso_Movimiento = Recurso_incidencia.cveRecurso_Movimiento;
        Recurso_Vacante_nuevo.fecha_modificacion = Recurso_incidencia.hora_disponible;
        Recurso_Vacante_nuevo.estatus = Recurso_incidencia.estatus;
        Recurso_Vacante_nuevo.numdocmp = Recurso_incidencia.numdocmp;
        Recurso_Vacante_nuevo.cvepagpl = Recurso_incidencia.cvepagpl;
        Recurso_Vacante_nuevo.cveRecurso_vacante_tipo = Recurso_incidencia.cveRecurso_vacante_tipo;
        desde = DateTime.Parse(Recurso_incidencia.Fecha_Baja);
        hasta = DateTime.Parse(Recurso_incidencia.fecha_baja_hasta);
        Recurso_Vacante_nuevo.Fecha_Baja = min.ToString();
        Recurso_Vacante_nuevo.fecha_baja_hasta = hasta.ToString();

        new DAL().sp_Recurso_Vacante_alta(ref Recurso_Vacante_nuevo);
        new DAL().GESRH_Nom_ControlPlaza_Unificacion_Incidencias_alta(int.Parse(Recurso_Vacante_nuevo.cveRecurso_Vacante), _lista);

        Respuesta_Entity.respuesta = true;
        Respuesta_Entity.mensaje = "";
        list.Add(Respuesta_Entity);
        return list;
    }

    public List<Respuesta_Entity> Valida(List<Recurso_Ocupado> Recurso_OcupadoEntity)
    {
        DataSet ds_nivel_salarial_vacante = new DataSet();
        DataSet ds_nivel_salarial_ocupado = new DataSet();
        string jorniv_vacante = "";
        string jorniv_ocupado = "";

        decimal importe_ocupado = 0;
        decimal importe_vacante = 0;
        DataSet ds_importes = new DataSet();

        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();

        decimal? Suma_vacante = 0;
        decimal? Suma_ocupado = 0;
        decimal hras_vacantes = 0;
        decimal? hras_asignadas = 0;
        decimal importe_nivel_salarial_ocupado = decimal.MinValue;
        decimal importe_nivel_salarial_vacante = decimal.MinValue;
        decimal Importe_ocupadoAplicaPlaza = decimal.MinValue;

        int DIFERENCIA_COSTO_PLAZA_FALTANTE = 0;
        decimal importe_nuevo;
        decimal? importe_utilizado = 0;
        int equivalencia = int.MinValue;
        int con_derecho_horas = int.MinValue;
        int compatibilidad_total_horas = int.MinValue;
        int desglose_forma_interina = int.MinValue;
        
        foreach (Recurso_Ocupado elementos in Recurso_OcupadoEntity)
        {
            if (elementos.cveRecurso_Ocupado.ToString() != "0" && elementos.cveRecurso_Ocupado.ToString() != "")
            {
                ds_importes = new DAL().valida_efectos_horas_importe(elementos.cveRecurso_Ocupado, elementos.cveRecurso_Vacante, elementos.FECHA_DESDE, elementos.FECHA_HASTA);
            }
            else
            {
                ds_importes = new DAL().valida_efectos_horas_importe(elementos.cveRecurso_Vacante, elementos.FECHA_DESDE, elementos.FECHA_HASTA);
            }

            if (ds_importes == null || ds_importes.Tables == null)
            {
                return null;
            }

            if (ds_importes.Tables[2].Rows.Count > 0)//Si existen movimientos de jornadas con los mismos efectos
            {
                equivalencia = int.Parse(ds_importes.Tables[2].Rows[0]["equivalencia"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                con_derecho_horas = int.Parse(ds_importes.Tables[2].Rows[0]["con_derecho_horas"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                compatibilidad_total_horas = int.Parse(ds_importes.Tables[2].Rows[0]["compatibilidad_total_horas"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                desglose_forma_interina = int.Parse(ds_importes.Tables[2].Rows[0]["desglose_forma_interina"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                if (equivalencia != 1)
                {
                     if (equivalencia + hras_asignadas > desglose_forma_interina)
                    {
                        Respuesta_Entity.respuesta = false;
                        Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                        list.Add(Respuesta_Entity);
                        return list;

                    }
                }

                //SE QUITO LA VALIDACION YA EQUE AHORA SE VALIDA LA EQUIVALENCIA EN HORAS

                //if (ds_importes.Tables[2].Rows[0]["cvepue_vacante"].ToString() != "EDJ02" && ds_importes.Tables[2].Rows[0]["cvepue_ocupado"].ToString() != "EDJAI18")
                //{
                //    Respuesta_Entity.respuesta = false;
                //    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que la plaza " + ds_importes.Tables[2].Rows[0]["Numero_Plaza"].ToString() + " tiene una jornada asignada en este rango de fechas";
                //    list.Add(Respuesta_Entity);
                //    return list;
                //}
            }

            ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_vacante); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
            ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(elementos.cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO
            if (ds_nivel_salarial_vacante == null || ds_nivel_salarial_vacante.Tables == null || ds_nivel_salarial_vacante.Tables[0].Rows.Count == 0)
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso vacante";
                list.Add(Respuesta_Entity);
                return list;
            }

            if (ds_nivel_salarial_ocupado == null || ds_nivel_salarial_ocupado.Tables == null || ds_nivel_salarial_ocupado.Tables[0].Rows.Count == 0)
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso ocupado";
                list.Add(Respuesta_Entity);
                return list;
            }
            jorniv_vacante = ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString();
            jorniv_ocupado = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString();

            importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
            importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());
            Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
            if (jorniv_vacante == "H")
            {
                importe_utilizado += int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")) * (decimal)ds_importes.Tables[0].Rows[0]["importe_vacante"];
            }
            else
            {
                if (jorniv_ocupado == "J")
                {
                    importe_utilizado += importe_nivel_salarial_vacante;

                }
                else
                {
                    decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);
                    int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)(((decimal)ds_importes.Tables[0].Rows[0]["importe_vacante"] - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                    int HORAS_OCUPADAS_TOTAL = int.Parse(Math.Floor((double)((Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                    importe_utilizado += int.Parse(elementos.hora_vacante.ToString().Replace(".00","") == "0" ? "1" : elementos.hora_vacante.ToString().Replace(".00","")) * importe_nivel_salarial_ocupado;
                }
            }

            if (ds_importes.Tables[1].Rows.Count > 0)//Si existen movimientos de horas con los mismos efectos
            {
                Suma_vacante = decimal.Parse(ds_importes.Tables[1].Rows[0]["importe_vacante_total"].ToString()); //VALOR REAL DE LA PLAZA (RECURSO VACANTE)
                Suma_ocupado = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });// VALOR DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                hras_vacantes = int.Parse(ds_importes.Tables[1].Rows[0]["hras_vacantes"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                hras_asignadas = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<int?>("hras_ocupadas"); });//HORAS DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado == "" ? "0" : elementos.hora_ocupado) : 1);

                equivalencia = int.Parse(ds_importes.Tables[1].Rows[0]["equivalencia"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                con_derecho_horas = int.Parse(ds_importes.Tables[1].Rows[0]["con_derecho_horas"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                compatibilidad_total_horas = int.Parse(ds_importes.Tables[1].Rows[0]["compatibilidad_total_horas"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                desglose_forma_interina = int.Parse(ds_importes.Tables[1].Rows[0]["desglose_forma_interina"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)

                if (jorniv_ocupado == "J") //Si quiere asignar un movimiento de puesto de jornada pero esa plaza ya tiene ocupada parcialmente las horas
                {
                    if(equivalencia != 1)
                    {
                        if (equivalencia + hras_asignadas > desglose_forma_interina)
                        {
                            Respuesta_Entity.respuesta = false;
                            Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                            //Respuesta_Entity.mensaje = "No puede realizar movimiento ya que la plaza " + ds_importes.Tables[1].Rows[0]["Numero_Plaza"].ToString() + " tiene una horas asignadas en este rango de fechas";
                            list.Add(Respuesta_Entity);
                            return list;

                        }
                    }

                }
                else
                {
                    //El nuevo movimiento es de horas
                    if (jorniv_vacante == "H" && hras_vacantes < hras_asignadas + int.Parse(elementos.hora_vacante.ToString().Replace(".00",""))) //Si las horas disponibles son insuficientes
                    {
                        if (elementos.cveRecurso_Movimiento_tipo != "5")
                        {
                            Respuesta_Entity.respuesta = false;
                            Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                            list.Add(Respuesta_Entity);
                            return list;
                        }

                    }
                    else
                    {
                        decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);//Se calcula el restante disponible del recurso vacante

                        if (jorniv_vacante == "J" && jorniv_ocupado == "H")//SI EL MOVIMIENTO ES DE HORAS Y LA VACANTE ES JORNADA
                        {
                            int hras_vacantes_real = int.Parse(Math.Floor((double)(COSTO_VANCANTE_TOTAL / importe_nivel_salarial_ocupado)).ToString());
                            if (hras_vacantes_real < int.Parse(elementos.hora_vacante.ToString().Replace(".00","")))
                            {
                                Respuesta_Entity.respuesta = false;
                                Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                                list.Add(Respuesta_Entity);
                                return list;
                            }
                        }

                        //aqui debemos calcular el costo por horas dela Costeo_Plazas de jornada
                        importe_vacante = int.Parse(elementos.hora_vacante.ToString().Replace(".00","")) * importe_nivel_salarial_ocupado;

                    }
                }
            }

            if (ds_importes.Tables[2].Rows.Count > 0 && desglose_forma_interina > equivalencia + hras_asignadas)//Si existen movimientos de jornadas con los mismos efectos
            {
                Suma_vacante = decimal.Parse(ds_importes.Tables[2].Rows[0]["importe_vacante_total"].ToString()); //VALOR REAL DE LA PLAZA (RECURSO VACANTE)
                Suma_ocupado = ds_importes.Tables[2].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });// VALOR DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                hras_vacantes = int.Parse(ds_importes.Tables[2].Rows[0]["hras_vacantes"].ToString());//HORAS REALES DE LA PLAZA (RECURSO VACANTE)
                hras_asignadas = ds_importes.Tables[2].AsEnumerable().Sum((b) => { return b.Field<int?>("hras_ocupadas"); });//HORAS DE LOS MOVIMIENTOS QUE ESTAN OCUPANDO LA PLAZA EN LOS EFECTOS PROPORCIONADOS (RECURSO_OCUPADO)
                importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());
                importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());
                //SE CAMBIO UNO POR OTRO
                importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado == "" ? "0" : elementos.hora_ocupado) : 1);              
                decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante == null ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);
                int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)((COSTO_VANCANTE_TOTAL - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());
                importe_utilizado += COSTO_VANCANTE_TOTAL;
                if (COSTO_VANCANTE_TOTAL < importe_nuevo)
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                    list.Add(Respuesta_Entity);
                    return list;
                }
            }

            importe_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_ocupado == "H" ? int.Parse(elementos.hora_ocupado) : 1);
            importe_vacante += decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString()) * (jorniv_vacante == "H" ? int.Parse(elementos.hora_vacante.ToString().Replace(".00","")) : 1);
   
        }
        importe_utilizado += int.TryParse(ConfigurationManager.AppSettings["DIFERENCIA_COSTO_PLAZA_FALTANTE"].ToString(), out DIFERENCIA_COSTO_PLAZA_FALTANTE) == true ? DIFERENCIA_COSTO_PLAZA_FALTANTE : 0;
        int DIFERENCIA_COSTO_PLAZA_EXCEDENTE = int.TryParse(ConfigurationManager.AppSettings["DIFERENCIA_COSTO_PLAZA_EXCEDENTE"].ToString(), out DIFERENCIA_COSTO_PLAZA_EXCEDENTE) == true ? DIFERENCIA_COSTO_PLAZA_EXCEDENTE : 0;
        if (importe_utilizado < importe_ocupado)//SE VALIDA QUE EL TOTAL DE LOS RECURSOS ALCANCE PARA CREAR EL NUEVO MOVIMIENTO
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "No puede realizar el movimiento ya que el recurso no es suficiente";
            list.Add(Respuesta_Entity);
            return list;
        }

        decimal? diferencia = (importe_utilizado - importe_ocupado);
        if (diferencia > ((importe_ocupado * DIFERENCIA_COSTO_PLAZA_EXCEDENTE) / 100))//SE VALIDA QUE EL TOTAL DE LOS RECURSOS NO SEA MAYOR AL PORCENTAJE ESPECICADO
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "El recurso necesario para el nuevo movimiento esta excedido por $" + diferencia.ToString();
            list.Add(Respuesta_Entity);
            return list;

        }
        Respuesta_Entity.respuesta = true;
        Respuesta_Entity.mensaje = "";

        list.Add(Respuesta_Entity);
        return list;
    }

    public List<Respuesta_Entity> Valida_Guardar_Recurso_Ocupado(Recurso_Ocupado Recurso_OcupadoEntity)
    {
        DataSet ds = new DataSet();
        DataSet ds_importes = new DataSet();
        DataSet ds_nivel_salarial_vacante = new DataSet();
        DataSet ds_nivel_salarial_ocupado = new DataSet();


        List<Respuesta_Entity> list = new List<Respuesta_Entity>();
        Respuesta_Entity Respuesta_Entity = new Respuesta_Entity();

        if (Recurso_OcupadoEntity.cveRecurso_Ocupado.ToString() != "0")
        {
            ds_importes = new DAL().valida_efectos_horas_importe(Recurso_OcupadoEntity.cveRecurso_Ocupado, Recurso_OcupadoEntity.cveRecurso_Vacante, Recurso_OcupadoEntity.FECHA_DESDE, Recurso_OcupadoEntity.FECHA_HASTA);
        }
        else
        {
            ds_importes = new DAL().valida_efectos_horas_importe(Recurso_OcupadoEntity.cveRecurso_Vacante, Recurso_OcupadoEntity.FECHA_DESDE, Recurso_OcupadoEntity.FECHA_HASTA);
        }
        //PLAZA ORIGEN ES DE JORNADA  ****    SE VALIDAN LOS SI EXISTEN HORAS O JORNADA ASIGNADA
        if (ds_importes == null || ds_importes.Tables == null)
        {
            return null;
        }

        decimal Suma_vacante = decimal.MinValue;
        decimal? Suma_ocupado = decimal.MinValue;
        decimal hras_vacantes = decimal.MinValue;
        decimal? hras_asignadas = decimal.MinValue;
        decimal importe_nivel_salarial_ocupado = decimal.MinValue;
        decimal Importe_ocupadoAplicaPlaza = decimal.MinValue;
        decimal importe_nivel_salarial_vacante = decimal.MinValue;
        string jorniv_vacante = "";
        string jorniv_ocupado = "";
        decimal importe_nuevo;

        ds_nivel_salarial_vacante = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(Recurso_OcupadoEntity.cvenisni_vacante); //OBTIENE NIVEL SALARIAL DEL RECURSO VACANTE (BASE)
        ds_nivel_salarial_ocupado = new DAL().GESRH_SPT_ControlPlaza_CalculoEquivalencias(Recurso_OcupadoEntity.cvenisni_ocupado); //OBTIENE NIVEL SALARIAL DEL NUEVO MOVIMIENTO
        if (ds_nivel_salarial_vacante == null || ds_nivel_salarial_vacante.Tables == null || ds_nivel_salarial_vacante.Tables[0].Rows.Count == 0)
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso vacante";
            list.Add(Respuesta_Entity);
            return list;
        }

        if (ds_nivel_salarial_ocupado == null || ds_nivel_salarial_ocupado.Tables == null || ds_nivel_salarial_ocupado.Tables[0].Rows.Count == 0)
        {
            Respuesta_Entity.respuesta = false;
            Respuesta_Entity.mensaje = "Problema con el nivel salarial del recurso ocupado";
            list.Add(Respuesta_Entity);
            return list;
        }

        jorniv_vacante = ds_nivel_salarial_vacante.Tables[0].Rows[0]["hojniv"].ToString();
        jorniv_ocupado = ds_nivel_salarial_ocupado.Tables[0].Rows[0]["hojniv"].ToString();

        if (ds_importes.Tables[1].Rows.Count > 0)//Si existen movimientos de horas con los mismos efectos
        {
            if (jorniv_ocupado == "J") //Si quiere asignar un movimiento de puesto de jornada pero esa plaza ya tiene ocupada parcialmente las horas
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "No puede realizar movimiento ya que la plaza " + ds_importes.Tables[1].Rows[0]["Numero_Plaza"].ToString() + " tiene una horas asignadas en este rango de fechas";
                list.Add(Respuesta_Entity);
                return list;
            }
            else
            {
                Suma_vacante = decimal.Parse(ds_importes.Tables[1].Rows[0]["importe_vacante_total"].ToString());
                Suma_ocupado = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<decimal?>("importe_ocupado_total"); });
                hras_vacantes = int.Parse(ds_importes.Tables[1].Rows[0]["hras_vacantes"].ToString());
                hras_asignadas = ds_importes.Tables[1].AsEnumerable().Sum((b) => { return b.Field<int?>("hras_ocupadas"); });

                importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());
                importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());
                Importe_ocupadoAplicaPlaza = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["ImporteAplicaPlaza"].ToString());

                //SE CAMBIO UNO POR OTRO
                importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(Recurso_OcupadoEntity.hora_ocupado == "" ? "0" : Recurso_OcupadoEntity.hora_ocupado) : 1);
                decimal? COSTO_VANCANTE_TOTAL = (Suma_vacante ==  decimal.MinValue ? 0 : Suma_vacante) - (Suma_ocupado == null ? 0 : Suma_ocupado);

                int HORAS_VACANTE_TOTAL = int.Parse(Math.Floor((double)(((decimal)ds_importes.Tables[0].Rows[0]["importe_vacante"] - Importe_ocupadoAplicaPlaza) / importe_nivel_salarial_ocupado)).ToString());

                if (HORAS_VACANTE_TOTAL < int.Parse(Recurso_OcupadoEntity.hora_vacante == "0" ? "1" : Recurso_OcupadoEntity.hora_vacante))
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                    list.Add(Respuesta_Entity);
                }

                if (hras_vacantes < hras_asignadas + int.Parse(Recurso_OcupadoEntity.hora_ocupado))
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                    list.Add(Respuesta_Entity);
                    return list;
                }
                else
                {
                    if (Suma_vacante < Suma_ocupado + importe_nuevo)
                    {
                        Respuesta_Entity.respuesta = false;
                        Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                        list.Add(Respuesta_Entity);
                        return list;
                    }
                }
            }

        }

        //if (ds_importes.Tables[2].Rows.Count > 0)//Si existen movimientos de jornadas con los mismos efectos
        //{
        //    Respuesta_Entity.respuesta = false;
        //    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que esta tiene una jornada asignada";
        //    list.Add(Respuesta_Entity);
        //    return list;
        //}

        if (ds_importes.Tables[0].Rows.Count > 0)
        {
            if (jorniv_vacante == "H" && jorniv_ocupado == "H")
            {
                if (decimal.Parse(ds_importes.Tables[0].Rows[0]["hras_vacantes"].ToString()) < (jorniv_ocupado == "H" ? int.Parse(Recurso_OcupadoEntity.hora_ocupado) : 0))
                {
                    Respuesta_Entity.respuesta = false;
                    Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede el numero de horas disponibles";
                    list.Add(Respuesta_Entity);
                    return list;
                }
            }
            importe_nivel_salarial_ocupado = decimal.Parse(ds_nivel_salarial_ocupado.Tables[0].Rows[0]["importe"].ToString());

            importe_nivel_salarial_vacante = decimal.Parse(ds_nivel_salarial_vacante.Tables[0].Rows[0]["importe"].ToString());


            //SE CAMBIO UNO POR OTRO
            importe_nuevo = importe_nivel_salarial_ocupado * (jorniv_ocupado == "H" ? int.Parse(Recurso_OcupadoEntity.hora_ocupado == "" ? "0" : Recurso_OcupadoEntity.hora_ocupado) : 1);
            if (decimal.Parse(ds_importes.Tables[0].Rows[0]["importe_vacante_total"].ToString()) < 04)
            {
                Respuesta_Entity.respuesta = false;
                Respuesta_Entity.mensaje = "No puede realizar movimiento ya que excede costo disponible de la plaza origen";
                list.Add(Respuesta_Entity);
                return list;
            }
        }

        Respuesta_Entity.respuesta = true;
        Respuesta_Entity.mensaje = "";
        list.Add(Respuesta_Entity);
        return list;
    }
    
    public int sp_cat_puesto_equivalencia_detalle_nivel_elimina(int id)
    {
        return new DAL().sp_cat_puesto_equivalencia_detalle_nivel_elimina(id);
    }

    public string Utilerias_generarStringJSON(DataSet xml)
    {

        if (Utilerias_DataSetValido(xml))
            return XmlToJSON(xml.GetXml());
        else
            return string.Empty;
    }
      
    public bool ExportToExcel(Page pPagina, DataTable dt, String nombreDelArchivo)
    {
        HttpResponse httpResponse = pPagina.Response;
        if (dt.Rows.Count > 0)
        {
            StringWriter tw = new StringWriter();
            HtmlTextWriter hw = new HtmlTextWriter(tw);
            DataGrid dgGrid = new DataGrid();
            dgGrid.DataSource = dt;
            dgGrid.DataBind();
            // Get the HTML for the control.
            dgGrid.RenderControl(hw);

            //httpResponse.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            //httpResponse.AddHeader("content-disposition", "attachment;filename=" + nombreDelArchivo + ".xlsx");

            httpResponse.ContentType = "application/xls";
            httpResponse.AppendHeader("Content-Disposition", "attachment; filename=" + nombreDelArchivo + "");
            httpResponse.Write(tw.ToString());
            httpResponse.End();
            return true;
        }
        else
        {
            return false;
        }

    }

    public void Utilerias_ExportExcel(Page pPagina, DataSet dataSet, string nombreArchivo)
    {
        var wb = new XLWorkbook();


        foreach (DataTable dt in dataSet.Tables)
        {
            wb.Worksheets.Add(dt); //Add a DataTable as a worksheet
        }

        HttpResponse httpResponse = pPagina.Response;

        //httpResponse.Response httpResponse = pPagina.Response.ou;
        httpResponse.Clear();
        httpResponse.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        httpResponse.AddHeader("content-disposition", "attachment;filename=\"" + nombreArchivo + ".xlsx\"");
        // Flush the workbook to the Response.OutputStream
        using (MemoryStream memoryStream = new MemoryStream())
        {
            wb.SaveAs(memoryStream);
            memoryStream.WriteTo(httpResponse.OutputStream);
            memoryStream.Close();
        }
        httpResponse.End();


    }
    
    public string XmlToJSON(string xml)
    {

        XmlDocument doc = new XmlDocument();
        doc.LoadXml(xml);

        return XmlToJSON(doc);
    }

    public static string XmlToJSON(XmlDocument xmlDoc)
    {
        StringBuilder sbJSON = new StringBuilder();
        XmlToJSONnode(sbJSON, xmlDoc.DocumentElement, false);
        sbJSON = sbJSON.Remove(sbJSON.Length - 2, 2);
        sbJSON = sbJSON.Remove(0, 2);
        return sbJSON.ToString();
    }
  
    public void Utilerias_Mensaje(Page pPagina, string sAviso)
    {
        //String codigoJs = "<script type='text/javascript'>alert('" + sAviso + "');</script>";
        //ScriptManager.RegisterStartupScript(pPagina, pPagina.GetType(), "tempJS", codigoJs, false);


        Page.ClientScript.RegisterStartupScript(pPagina.GetType(), "ErrorAlert", "alert('" + sAviso + "');", true);
    }
    
    private static void XmlToJSONnode(StringBuilder sbJSON, XmlElement node, bool showNodeName)
    {
        if (showNodeName)
            sbJSON.Append("\"" + SafeJSON(node.Name) + "\": ");
        sbJSON.Append("{");
        SortedList<string, object> childNodeNames = new SortedList<string, object>();
        if (node.Attributes != null)
            foreach (XmlAttribute attr in node.Attributes)
                StoreChildNode(childNodeNames, attr.Name, attr.InnerText);
        foreach (XmlNode cnode in node.ChildNodes)
        {
            if (cnode is XmlText)
                StoreChildNode(childNodeNames, "value", cnode.InnerText);
            else if (cnode is XmlElement)
                StoreChildNode(childNodeNames, cnode.Name, cnode);
        }
        foreach (string childname in childNodeNames.Keys)
        {
            List<object> alChild = (List<object>)childNodeNames[childname];
            if (alChild.Count == 1 && childname != "Table")
                OutputNode(childname, alChild[0], sbJSON, true);
            else
            {
                sbJSON.Append(" [ ");
                foreach (object Child in alChild)
                    OutputNode(childname, Child, sbJSON, false);
                sbJSON.Remove(sbJSON.Length - 2, 2);
                sbJSON.Append(" ], ");
            }
        }
        sbJSON.Remove(sbJSON.Length - 2, 2);
        sbJSON.Append(" }");
    }

    private static void StoreChildNode(SortedList<string, object> childNodeNames, string nodeName, object nodeValue)
    {
        if (nodeValue is XmlElement)
        {
            XmlNode cnode = (XmlNode)nodeValue;
            if (cnode.Attributes.Count == 0)
            {
                XmlNodeList children = cnode.ChildNodes;
                if (children.Count == 0)
                    nodeValue = null;
                else if (children.Count == 1 && (children[0] is XmlText))
                    nodeValue = ((XmlText)(children[0])).InnerText;
            }
        }
        List<object> ValuesAL;

        if (childNodeNames.ContainsKey(nodeName))
        {
            ValuesAL = (List<object>)childNodeNames[nodeName];
        }
        else
        {
            ValuesAL = new List<object>();
            childNodeNames[nodeName] = ValuesAL;
        }
        ValuesAL.Add(nodeValue);
    }

    private static void OutputNode(string childname, object alChild, StringBuilder sbJSON, bool showNodeName)
    {
        if (alChild == null)
        {
            if (showNodeName)
                sbJSON.Append("\"" + SafeJSON(childname) + "\": ");
            sbJSON.Append("null");
        }
        else if (alChild is string)
        {
            if (showNodeName)
                sbJSON.Append("\"" + SafeJSON(childname) + "\": ");
            string sChild = (string)alChild;
            sChild = sChild.Trim();
            sbJSON.Append("\"" + SafeJSON(sChild) + "\"");
        }
        else
            XmlToJSONnode(sbJSON, (XmlElement)alChild, showNodeName);
        sbJSON.Append(", ");
    }

    private static string SafeJSON(string sIn)
    {
        StringBuilder sbOut = new StringBuilder(sIn.Length);
        foreach (char ch in sIn)
        {
            if (Char.IsControl(ch) || ch == '\'')
            {
                int ich = (int)ch;
                sbOut.Append(@"\u" + ich.ToString("x4"));
                continue;
            }
            else if (ch == '\"' || ch == '\\' || ch == '/')
            {
                sbOut.Append('\\');
            }
            sbOut.Append(ch);
        }
        return sbOut.ToString();
    }
   
    internal bool Utilerias_DataSetValido(DataSet DS)
    {
        bool Respuesta = false;
        if (DS != null && DS.Tables.Count > 0)
        {
            foreach (DataTable dt in DS.Tables)
            {
                if (dt.Rows.Count > 0)
                {
                    Respuesta = true;
                }
            }
            return Respuesta;

        }
        else
        {
            return false;
        }
    }

}

