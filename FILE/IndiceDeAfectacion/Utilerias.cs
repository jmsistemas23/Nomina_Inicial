using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.IO;
using System.Xml.Serialization;
using System.Xml;



    public class Utilerias
    {
        public  DataTable ejecutarConsultaEnDataTable(string query)
        {
            System.Data.SqlClient.SqlDataAdapter Adaptador;
            DataTable dt = new DataTable();           
            ConexionSQL conexionDePrueba = new ConexionSQL();
            Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionDePrueba.abrirConexion());
            Adaptador.SelectCommand.CommandType = CommandType.Text;
            //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@usuario", usuario));
            //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@password", contraseña));
            try
            {
                Adaptador.Fill(dt);
                return dt;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public  DataSet ejecutarConsultaEnDataSet(string query)
        {
            System.Data.SqlClient.SqlDataAdapter Adaptador;
            DataSet ds = new DataSet();
            ConexionSQL conexionDePrueba = new ConexionSQL();
            Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionDePrueba.abrirConexion());
            Adaptador.SelectCommand.CommandType = CommandType.Text;
            //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@usuario", usuario));
            //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@password", contraseña));
            try
            {
                Adaptador.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       

        //EJECUTA SENTENCIA DE SQL
        public static string EJECUTAR_SENTENCIA(string par_query)
        {
            string msg = "";
            try
            {
                ConexionSQL conexionDePrueba = new ConexionSQL();
                SqlConnection sqlcon = conexionDePrueba.abrirConexion();
                if (sqlcon.State.ToString() == "Open") { sqlcon.Close(); sqlcon.Open(); } else { sqlcon.Open(); }
                SqlCommand cmd;
                cmd = sqlcon.CreateCommand();
                cmd.CommandText = par_query;
                cmd.CommandTimeout = 1200;
                cmd.ExecuteNonQuery();
                cmd.Dispose();
                sqlcon.Close();
                msg = "Si";
            }
            catch (Exception ev)
            {
                msg = ev.ToString();
            }
            return msg;
        }

        public static string GUARDAR_CONSULTA(byte[] datos,string cveconsulta)
        {
            string msg = "";
            try
            {
                ConexionSQL conexionDePrueba = new ConexionSQL();
                SqlConnection sqlcon = conexionDePrueba.abrirConexion();
                if (sqlcon.State.ToString() == "Open") { sqlcon.Close(); sqlcon.Open(); } else { sqlcon.Open(); }
                using (SqlCommand cmd = new SqlCommand("update datosTer_DiseñoConsultas set diseño=@diseño where id=" + cveconsulta, sqlcon))
                {
                    cmd.Parameters.Add("@diseño", SqlDbType.VarBinary).Value = datos;
                    cmd.ExecuteNonQuery();

                }
                sqlcon.Close();
                msg = "La configuración de la consulta se ha guardado";
            }
            catch (Exception ev)
            {
                msg = "Error al guardar la consulta " + ev.ToString();
            }
            return msg;
        }

        public static byte[] SerializarObj(object obj)
        {
            byte[] bytes;
            IFormatter formatter = new BinaryFormatter();
            using (MemoryStream stream = new MemoryStream())
            {
                formatter.Serialize(stream, obj);
                bytes = stream.ToArray();
            }
            return bytes;
        }
        public DataTable ejecutarProcedimiento(string proc, List<SqlParameter> parametros)
        {
            System.Data.SqlClient.SqlDataAdapter Adaptador;
            DataTable ds = new DataTable();
            ConexionSQL conexionDePrueba = new ConexionSQL();
            Adaptador = new System.Data.SqlClient.SqlDataAdapter(proc, conexionDePrueba.abrirConexion());
            Adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;
            foreach (SqlParameter par in parametros)
            {
                Adaptador.SelectCommand.Parameters.Add(par);
            }
            try
            {
                Adaptador.Fill(ds);
                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }                           
    }