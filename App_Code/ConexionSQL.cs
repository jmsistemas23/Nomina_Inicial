using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Data;


    public class ConexionSQL
    {
        SqlConnection Conexion;
        SqlConnection Conexion_DocumentacionV2;
        SqlConnection Conexion_Expediente;

        public ConexionSQL()
        {
            Conexion = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["Local"].ToString());
            //Conexion_DocumentacionV2 = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["connectionString_DocumentacionV2"].ToString());
            //Conexion_Expediente = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["Expedientes"].ToString());          
        }

        ~ConexionSQL()
        {
            if (Conexion != null)
            {
                if (Conexion.State != ConnectionState.Closed)
                {
                    Conexion.Close();
                }
            }

            if (Conexion_DocumentacionV2 != null)
            {
                if (Conexion_DocumentacionV2.State != ConnectionState.Closed)
                {
                    Conexion_DocumentacionV2.Close();
                }
            }
        }
        public SqlConnection abrirConexionExpediente()
        {
            try
            {
                if (Conexion_Expediente.State == ConnectionState.Closed)
                {
                    Conexion_Expediente.Open();
                }
                else
                {
                    cerrarConexionExpediente();
                    abrirConexionExpediente();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return Conexion_Expediente;
        }

        public void cerrarConexionExpediente()
        {
            if (Conexion_Expediente != null)
            {
                if (Conexion_Expediente.State != ConnectionState.Closed)
                {
                    Conexion_Expediente.Close();
                }
            }
        }

        public SqlConnection abrirConexion()
        {
            try
            {
                if (Conexion.State == ConnectionState.Closed)
                {
                    Conexion.Open();
                }
                else
                {
                    cerrarConexion();
                    abrirConexion();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return Conexion;
        }
     
        public void cerrarConexion()
        {
            if (Conexion != null)
            {
                if (Conexion.State != ConnectionState.Closed)
                {
                    Conexion.Close();
                }
            }
        }

     

        public SqlConnection abrirConexion_DocumentacionV2()
        {
            try
            {
                if (Conexion_DocumentacionV2.State == ConnectionState.Closed)
                {
                    Conexion_DocumentacionV2.Open();
                }
                else
                {
                    cerrarConexion();
                    abrirConexion_DocumentacionV2();
                }
            }
            catch (Exception ex)
            {
                return null;
            }
            return Conexion_DocumentacionV2;
        }
      
    }