using AutoSproc;
using System.Data;
using System.Data.SqlClient;
using System;
using System.Xml;

public interface Interface : ISprocBase
{
    int insertaArchivo(string xml);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select();
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select(string cvepue);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select(string cvepue);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select(string cvepue, int parametro);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select(string cvepue, int parametro, string cveNivel_Educativo);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_select(int cvepuesto_equivalencia_detalle);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_alta(int cveNivel_educativo, string cvepue);
    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_alta(string cvepue, string cvepuesto_equivalencia);

    DataSet GESRH_SPT_ControlPlaza_simulacion_afectacion();

    int GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_elimina(int cvepuesto_equivalencia_detalle);
    int GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_elimina(int cvepuesto_equivalencia);
    int GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_elimina(int cvepuesto_equivalencia_detalle_nivel);

    int GESRH_Nom_ControlPlaza_Unificacion_Incidencias_alta(int cveRecurso_Vacante_unificado, string cveRecurso_Vacante_cancelado);


    int GESRH_SPT_ControlPlaza_Recurso_Ocupado_alta(
        string cveRecurso_Ocupado,
        string cveRecurso_Vacante,
        string cveNivel_Educativo,
        string Nombre,
        string cvepuesto_equivalencia_detalle,
        string FECHA_DESDE,
        string FECHA_HASTA,
        string OBSERVACIONES,
        string cveMunicipio,
        ref int cveRecurso_Movimiento,
        string cvepag,
        string cveniv,
        string hora_vacante,
        string hora_ocupado,
        string importe_vacante,
        string importe_ocupado,
        string folio_documento,
        string Plaza_Movimiento,
        string cveRecurso_Movimiento_tipo

        );



    int GESRH_SPT_ControlPlaza_Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante);
    int GESRH_SPT_ControlPlaza_Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante, int cveRecurso_Ocupado);
    DataSet GESRH_SPT_ControlPlaza_Recurso_Ocupado_select(int cveRecurso_Vacante);
    DataSet GESRH_SPT_ControlPlaza_Recurso_Ocupado_select(int cveRecurso_Vacante, int cveRecurso_Movimiento);

    int GESRH_SPT_ControlPlaza_Recurso_Vacante_alta(ref int cveRecurso_Vacante
, string Numero_Plaza
, string cveNivel_Educativo
, string Nombre
, string cvePuesto_Equivalencia
, string hora_disponible
, int cveMotivos_Baja
, string cvezona
, string Fecha_Baja
, string fecha_baja_hasta
, string Observaciones
, string fecha_captura
, ref int cveRecurso_Movimiento
, string fecha_modificacion
, int estatus
, string numdocmp
, string cvepagpl
, int cveRecurso_vacante_tipo
, string folio_documento
, int cveRecurso_Movimiento_tipo);


    DataSet GESRH_SPT_ControlPlaza_Recurso_Vacante_Movimiento_select(int cveRecurso_Movimiento);
    DataSet GESRH_SPT_ControlPlaza_Recurso_Vacante_select(string cveNivel_educativo, string Numero_Plaza, string baja_desde, string baja_hasta);
    DataSet GESRH_SPT_ControlPlaza_Recurso_Vacante_select();
    DataSet GESRH_SPT_ControlPlaza_Recurso_Vacante_select(string cveRecurso_Vacante);


    DataSet GESRH_SPT_ControlPlaza_Recurso_Movimiento_select(int cveRecurso_Movimiento, int cveRecurso_Movimiento_tipo);
    int GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(int cveRecurso_Movimiento);

    DataSet GESRH_SPT_ControlPlaza_validaefectos(string cveRecurso_Vacante, string desde, string hasta, string horas);
    DataSet GESRH_SPT_ControlPlaza_validaefectos(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta, string horas);

    DataSet GESRH_SPT_ControlPlaza_valida_efectos_horas_importe(string cveRecurso_Vacante, string desde, string hasta);
    DataSet GESRH_SPT_ControlPlaza_valida_efectos_horas_importe(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta);
    DataSet GESRH_SPT_ControlPlaza_plazas_diponibilidad(string cveRecurso_Vacante, string desde, string hasta);
    DataSet GESRH_SPT_ControlPlaza_plazas_diponibilidad(string cveRecurso_Vacante, string desde, string hasta, string cveRecurso_Movimiento);
    DataSet GESRH_SPT_ControlPlaza_plaza_select(string numplaza);
    DataSet GESRH_SPT_ControlPlaza_plaza_compactacion_select(string numplaza);
    DataSet GESRH_SPT_ControlPlaza_plaza_recategorizacion_select(string numplaza, string baja_desde, string baja_hasta);




    DataSet GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_alta(string cveNivel_educativo, int cvepuesto_equivalencia_detalle);
    DataSet GESRH_SPT_ControlPlaza_cat_Motivos_Baja_select();
    DataSet GESRH_SPT_Catalogo_ListarTablas(string tabla, string filtro);
    DataSet GESRH_SPT_BUSCAREMPLEADO(string where, string dato);



    DataSet GESRH_SPT_ControlPlaza_cat_nivsal_select(string cvezon, string codnivpu);
    DataSet GESRH_SPT_ControlPlaza_CalculoEquivalencias(string nivel_salarial);
    DataSet sp_Documentos_select(string folioDocumento);


}

public class DAL
{


    private Interface proc;
    private SqlConnection conn = null;
    ~DAL()
    {
        try
        {
            if (conn != null)
                conn.Dispose();
        }
        catch { }
    }
    public DAL()
    {
        try
        {
            proc = (Interface)SprocFactory.CreateInstance(typeof(Interface), DBProvider.SQLServer);
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    public Lista_cat_puesto_equivalencia sp_cat_puesto_equivalencia_select(int cveNivel_educativo)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select();
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return GeneraEntity(dsElementos);
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_cat_puesto_equivalencia_selectDS()
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select();
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public int GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(int cveRecurso_Movimiento)
    {
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            return proc.GESRH_SPT_ControlPlaza_Recurso_Movimiento_elimina(cveRecurso_Movimiento);
        }
        catch
        {
            throw;
        }

    }

    public int GESRH_Nom_ControlPlaza_Unificacion_Incidencias_alta(int cveRecurso_Vacante_unificado, string cveRecurso_Vacante_cancelado)
    {
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            return proc.GESRH_Nom_ControlPlaza_Unificacion_Incidencias_alta(cveRecurso_Vacante_unificado, cveRecurso_Vacante_cancelado);
        }
        catch
        {
            throw;
        }
    }

    public DataSet sp_cat_puesto_equivalencia_selectDS(string cvepue)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            if (cvepue.Replace("ED", "").Replace("ed", "") == "")
            {
                dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select();
            }
            else
            {


                dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_select("ED" + cvepue.Replace("ED", "").Replace("ed", ""));
            }
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_Recurso_Vacante_selectDS(string cveNivel_educativo, string Numero_Plaza, string baja_desde, string baja_hasta)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();

            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Vacante_select(cveNivel_educativo, Numero_Plaza, baja_desde, baja_hasta);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;
    }

    public DataSet sp_Recurso_Vacante_selectDS()
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();

            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Vacante_select();
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;
    }
   
    public Recurso_Vacante sp_Recurso_Vacante_selectDS(string cveRecurso_Vacante)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();

            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Vacante_select(cveRecurso_Vacante);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return Recurso_Vacante_GeneraEntity(dsElementos);
            }
        }
        catch
        {
            throw;
        }

        return null;
    }
    
    public DataSet sp_cat_Motivos_Baja_selectDS()
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_Motivos_Baja_select();
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_Recurso_Ocupado_selectDS(int cveRecurso_Vacante)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Ocupado_select(cveRecurso_Vacante);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_Recurso_Ocupado_selectDS(int cveRecurso_Vacante, int cveRecurso_Movimiento)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Ocupado_select(cveRecurso_Vacante, cveRecurso_Movimiento);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }
        return null;

    }
    
    public int Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante, int cveRecurso_Ocupado)
    {
        int resultado;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            resultado = proc.GESRH_SPT_ControlPlaza_Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado);
            return resultado;
        }
        catch
        {
            throw;
        }



    }
    
    public int Recurso_Ocupado_delete(int cveRecurso_Movimiento, int cveRecurso_Vacante)
    {
        int resultado;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            resultado = proc.GESRH_SPT_ControlPlaza_Recurso_Ocupado_delete(cveRecurso_Movimiento, cveRecurso_Vacante);
            return resultado;
        }
        catch
        {
            throw;
        }


    }

    public DataSet sp_Recurso_Movimiento_select(int cveRecurso_Movimiento, int cveRecurso_Movimiento_tipo)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Movimiento_select(cveRecurso_Movimiento, cveRecurso_Movimiento_tipo);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && (dsElementos.Tables.Count != 0 || dsElementos.Tables[1].Rows.Count != 0))
                if (cveRecurso_Movimiento_tipo == 2) //Agregar Movimientos Ocupado
                {
                    dsElementos.Tables.Remove("Table1");
                }
            if (cveRecurso_Movimiento_tipo == 1)//Agregar Movimientos Vacancia
            {
                dsElementos.Tables.Remove("Table");
                dsElementos.Tables[0].TableName = "Table";
            }

            return dsElementos;
        }
        catch
        {
            throw;
        }

    }
    
    public DataSet sp_Recurso_Vacante_Movimiento_select(int cveRecurso_Movimiento)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_Recurso_Vacante_Movimiento_select(cveRecurso_Movimiento);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_cat_puesto_equivalencia_detalle_selectDS(string clave)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();




            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select("ED" + clave.Replace("ED", "").Replace("ed", ""));
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch (Exception ex)
        {
            throw;
        }

        return null;

    }

    public DataSet sp_cat_puesto_equivalencia_detalle_selectDS(string clave, int parametro)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select(clave, parametro);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_cat_puesto_equivalencia_detalle_selectDS(string clave, int parametro, string cveNivel_Educativo)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_select(clave, parametro, cveNivel_Educativo);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_cat_puesto_equivalencia_detalle_nivel_select(int cvepuesto_equivalencia_detalle)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_select(cvepuesto_equivalencia_detalle);
            if (dsElementos != null && dsElementos.Tables != null && dsElementos.Tables.Count != 0 && dsElementos.Tables.Count != 0 && dsElementos.Tables[0].Rows.Count > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_cat_puesto_equivalencia_alta(int cveNivel_educativo, string cvepue)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_alta(cveNivel_educativo, cvepue);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public int sp_cat_puesto_equivalencia_elimina(int id)
    {

        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            return proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_elimina(id);

        }
        catch
        {
            throw;
        }
    }

    public DataSet sp_cat_puesto_equivalencia_detalle_alta(string cvepue, string cvepuesto_equivalencia)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_alta(cvepue, cvepuesto_equivalencia);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public int sp_Recurso_Ocupado_alta(ref Recurso_Ocupado Recurso_Ocupado)
    {
        int resultado;
        int cveRecurso_Movimiento = Recurso_Ocupado.cveRecurso_Movimiento == "" ? 0 : int.Parse(Recurso_Ocupado.cveRecurso_Movimiento);
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            resultado = proc.GESRH_SPT_ControlPlaza_Recurso_Ocupado_alta(Recurso_Ocupado.cveRecurso_Ocupado, Recurso_Ocupado.cveRecurso_Vacante, Recurso_Ocupado.cveNivel_Educativo, Recurso_Ocupado.Nombre, Recurso_Ocupado.cvepuesto_equivalencia_detalle, Recurso_Ocupado.FECHA_DESDE, Recurso_Ocupado.FECHA_HASTA, Recurso_Ocupado.OBSERVACIONES, Recurso_Ocupado.cveMunicipio, ref cveRecurso_Movimiento, Recurso_Ocupado.cvezon, Recurso_Ocupado.cvenisni_ocupado, Recurso_Ocupado.hora_vacante, Recurso_Ocupado.hora_ocupado, Recurso_Ocupado.importe_vacante, Recurso_Ocupado.importe_ocupado, Recurso_Ocupado.FolioDocumentoCIT, Recurso_Ocupado.Plaza_Movimiento, Recurso_Ocupado.cveRecurso_Movimiento_tipo);

            Recurso_Ocupado.cveRecurso_Movimiento = cveRecurso_Movimiento.ToString();
            return resultado;
        }
        catch
        {
            throw;
        }
    }
    
    public int sp_Recurso_Vacante_alta(ref Recurso_Vacante Recurso_Vacante)
    {
        int resultado;
        int cveRecurso_Movimiento = Recurso_Vacante.cveRecurso_Movimiento == "" ? 0 : int.Parse(Recurso_Vacante.cveRecurso_Movimiento);
        int cveRecurso_Vacante = Recurso_Vacante.cveRecurso_Vacante == "" ? 0 : int.Parse(Recurso_Vacante.cveRecurso_Vacante);

        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            resultado = proc.GESRH_SPT_ControlPlaza_Recurso_Vacante_alta(ref cveRecurso_Vacante
            , Recurso_Vacante.Numero_Plaza
            , Recurso_Vacante.cveNivel_Educativo
            , Recurso_Vacante.Nombre
            , Recurso_Vacante.cvePuesto_Equivalencia
            , Recurso_Vacante.hora_disponible
            , Recurso_Vacante.cveMotivos_Baja
            , Recurso_Vacante.cvezona
            , Recurso_Vacante.Fecha_Baja
            , Recurso_Vacante.fecha_baja_hasta
            , Recurso_Vacante.OBSERVACIONES
            , Recurso_Vacante.fecha_captura
            , ref cveRecurso_Movimiento
            , Recurso_Vacante.fecha_modificacion
            , Recurso_Vacante.estatus
            , Recurso_Vacante.numdocmp
            , Recurso_Vacante.cvepagpl
            , Recurso_Vacante.cveRecurso_vacante_tipo
            , Recurso_Vacante.FolioDocumentoCIT
            , Recurso_Vacante.cveRecurso_Movimiento_tipo);


            Recurso_Vacante.cveRecurso_Movimiento = cveRecurso_Movimiento.ToString();
            Recurso_Vacante.cveRecurso_Vacante = cveRecurso_Vacante.ToString();
            return resultado;
        }
        catch (Exception ex)
        {
            throw;
        }

        return 0;

    }
    
    public int sp_cat_puesto_equivalencia_detalle_elimina(int id)
    {
        int dsElementos = 0;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_elimina(id);
            if (dsElementos > 0)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return 0;

    }
    
    public DataSet sp_cat_puesto_equivalencia_detalle_nivel_alta(string cveNivel_educativo, int cvepuesto_equivalencia_detalle)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_alta(cveNivel_educativo, cvepuesto_equivalencia_detalle);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public int sp_cat_puesto_equivalencia_detalle_nivel_elimina(int cvepuesto_equivalencia_detalle_nivel)
    {
        int dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_puesto_equivalencia_detalle_nivel_elimina(cvepuesto_equivalencia_detalle_nivel);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return 0;

    }

    public DataSet sp_validaefectos(string cveRecurso_Vacante, string desde, string hasta, string horas)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_validaefectos(cveRecurso_Vacante, desde, hasta, horas);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet valida_efectos_horas_importe(string cveRecurso_Vacante, string desde, string hasta)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_valida_efectos_horas_importe(cveRecurso_Vacante, desde, hasta);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet valida_efectos_horas_importe(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_valida_efectos_horas_importe(cveRecurso_Ocupado, cveRecurso_Vacante, desde, hasta);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }
        return null;

    }
    
    public DataSet sp_plazas_diponibilidad(string cveRecurso_Vacante, string desde, string hasta)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_plazas_diponibilidad(cveRecurso_Vacante, desde, hasta);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;
    }

    public DataSet sp_plazas_diponibilidad(string cveRecurso_Vacante, string desde, string hasta, string cveRecurso_Movimiento)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_plazas_diponibilidad(cveRecurso_Vacante, desde, hasta, cveRecurso_Movimiento);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_plaza_select(string numplaza)
    {

        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_plaza_select(numplaza);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet sp_plaza_compactacion_select(string numplaza)
    {

        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_plaza_compactacion_select(numplaza);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_plaza_recategorizacion_select(string numplaza, string baja_desde, string baja_hasta)
    {

        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_plaza_recategorizacion_select(numplaza, baja_desde, baja_hasta);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet GESRH_SPT_Catalogo_ListarTablas(string tabla, string filtro)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_Catalogo_ListarTablas(tabla, filtro);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch (Exception ex)
        {
            throw;
        }

        return null;

    }
    
    public DataSet GESRH_SPT_BUSCAREMPLEADO(string where, string dato)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_BUSCAREMPLEADO(where, dato);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch (Exception ex)
        {
            throw;
        }

        return null;

    }
    
    public DataSet DocumentosCIT_selectStringJSON(string folio)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion_DocumentacionV2();
            dsElementos = proc.sp_Documentos_select(folio);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch (Exception ex)
        {
            throw;
        }

        return null;

    }

    public DataSet sp_cat_nivsal_select(string cvezon, string codnivpu)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_cat_nivsal_select(cvezon, codnivpu);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet sp_validaefectos(string cveRecurso_Ocupado, string cveRecurso_Vacante, string desde, string hasta, string horas)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_validaefectos(cveRecurso_Ocupado, cveRecurso_Vacante, desde, hasta, horas);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }

    public DataSet GESRH_SPT_ControlPlaza_CalculoEquivalencias(string nivel_salarial)
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_CalculoEquivalencias(nivel_salarial);
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    public DataSet GESRH_SPT_ControlPlaza_simulacion_afectacion()
    {
        DataSet dsElementos;
        try
        {
            proc.Connection = (SqlConnection)new ConexionSQL().abrirConexion();
            dsElementos = proc.GESRH_SPT_ControlPlaza_simulacion_afectacion();
            if (dsElementos != null)
            {
                return dsElementos;
            }
        }
        catch
        {
            throw;
        }

        return null;

    }
    
    private Recurso_Vacante Recurso_Vacante_GeneraEntity(DataSet DS)
    {
        Recurso_Vacante elemento;
        try
        {

            elemento = new Recurso_Vacante();

            elemento.cveRecurso_Vacante = DS.Tables[0].Rows[0]["cveRecurso_Vacante"].ToString();
            elemento.Numero_Plaza = DS.Tables[0].Rows[0]["Numero_Plaza"].ToString();
            elemento.cveNivel_Educativo = DS.Tables[0].Rows[0]["cveNivel_Educativo"].ToString();
            elemento.Nombre = DS.Tables[0].Rows[0]["Nombre"].ToString();
            elemento.cvePuesto_Equivalencia = DS.Tables[0].Rows[0]["cvePuesto_Equivalencia"].ToString();
            elemento.hora_disponible = DS.Tables[0].Rows[0]["hora_disponible"].ToString();
            elemento.cveMotivos_Baja = int.Parse(DS.Tables[0].Rows[0]["cveMotivos_Baja"].ToString());
            elemento.cvezona = DS.Tables[0].Rows[0]["cvezona"].ToString();
            elemento.Fecha_Baja = DS.Tables[0].Rows[0]["Fecha_Baja"].ToString();
            elemento.fecha_baja_hasta = DS.Tables[0].Rows[0]["fecha_baja_hasta"].ToString();
            elemento.OBSERVACIONES = DS.Tables[0].Rows[0]["OBSERVACIONES"].ToString();
            elemento.fecha_captura = DS.Tables[0].Rows[0]["fecha_captura"].ToString();
            elemento.cveRecurso_Movimiento = DS.Tables[0].Rows[0]["cveRecurso_Movimiento"].ToString();
            elemento.fecha_modificacion = DS.Tables[0].Rows[0]["fecha_modificacion"].ToString();
            elemento.estatus = int.Parse(DS.Tables[0].Rows[0]["estatus"].ToString());
            elemento.numdocmp = DS.Tables[0].Rows[0]["numdocmp"].ToString();
            elemento.cvepagpl = DS.Tables[0].Rows[0]["cvepagpl"].ToString();
            elemento.cveRecurso_vacante_tipo = int.Parse(DS.Tables[0].Rows[0]["cveRecurso_vacante_tipo"].ToString());

            return elemento;
        }
        catch
        {
            throw;
        }

    }
    
    private Lista_cat_puesto_equivalencia GeneraEntity(DataSet DS)
    {
        Puesto_Equivalencia elemento;
        Lista_cat_puesto_equivalencia lista_cat_puesto_equivalencia;

        try
        {
            lista_cat_puesto_equivalencia = new Lista_cat_puesto_equivalencia();
            foreach (DataRow ren in DS.Tables[0].Rows)
            {
                elemento = new Puesto_Equivalencia();
                elemento.cvepuesto_equivalencia = int.Parse(ren["cvepuesto_equivalencia"].ToString());
                elemento.cveNivel_educativo = int.Parse(ren["cveNivel_educativo"].ToString());
                elemento.cvepue = ren["cvepue"].ToString();
                elemento.despue = ren["despue"].ToString();
                elemento.despue = ren["horjorpu"].ToString();
                elemento.despue = ren["hrsequ"].ToString();


                lista_cat_puesto_equivalencia.Add(elemento);
            }

            return lista_cat_puesto_equivalencia;
        }
        catch
        {
            throw;
        }
        finally
        {


        }
    }


}

