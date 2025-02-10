using System;
using System.Text;
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
using System.Security.Cryptography;



public class Utilerias
{
    private string key = "ABCDEFGHIJKLMÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz";

    public static int ContadorBulk;

    public DataTable ejecutarConsultaEnDataTable(string query)
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
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
    }

    public DataSet ejecutarConsultaEnDataSet(string query)
    {
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        DataSet ds = new DataSet();
        ConexionSQL conexionDePrueba = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandTimeout = 0;
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
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
    }

    public DataSet ejecutarConsultaDataSetExpediente(string query)
    {
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        DataSet ds = new DataSet();
        ConexionSQL conexionExpediente = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionExpediente.abrirConexionExpediente());
        Adaptador.SelectCommand.CommandTimeout = 0;
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
        finally
        {
            conexionExpediente.cerrarConexionExpediente();
        }
    }


    //EJECUTA SENTENCIA DE SQL
    public string EJECUTAR_SENTENCIA(string par_query)
    {
        string msg = "";
        ConexionSQL conexionDePrueba = new ConexionSQL();
        try
        {
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
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
        return msg;
    }

    public static string GUARDAR_CONSULTA(byte[] datos, string cveconsulta)
    {
        string msg = "";
        ConexionSQL conexionDePrueba = new ConexionSQL();
        try
        {
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
        finally
        {
            conexionDePrueba.cerrarConexion();
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

    public DataSet ejecutarProcedimiento(string proc, List<SqlParameter> parametros)
    {
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        DataSet ds = new DataSet();
        ConexionSQL conexionDePrueba = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter(proc, conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandType = CommandType.StoredProcedure;

        if (parametros != null)
        {
            Adaptador.SelectCommand.Parameters.AddRange(parametros.ToArray());
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
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
        //foreach (SqlParameter par in parametros)
        //{
        //    Adaptador.SelectCommand.Parameters.Add(par);
        //}
        //try
        //{
        //    Adaptador.Fill(ds);
        //    return ds;
        //}
        //catch (Exception ex)
        //{
        //    throw ex;
        //}
        //finally
        //{
        //    conexionDePrueba.cerrarConexion();
        //}
    }

    public List<object> bulkCopyDinamico(DataTable tbOrigen, string tbDestino, string tbMapeo)
    {
        ContadorBulk = 1;
        List<object> r = new List<object>();
        //DataTable drTmp = tbOrigen.Clone();            
        ConexionSQL conexionDePrueba = new ConexionSQL();
        try
        {

            using (SqlBulkCopy bulkCopy = new SqlBulkCopy(conexionDePrueba.abrirConexion()))
            {
                bulkCopy.DestinationTableName = "dbo." + tbDestino;
                bulkCopy.BulkCopyTimeout = 0;
                string[] mapeo = tbMapeo.Split('|');
                string[] mapeoCols;
                foreach (string cols in mapeo)
                {
                    mapeoCols = cols.Split(',');
                    bulkCopy.ColumnMappings.Add(mapeoCols[0], mapeoCols[1]);
                }

                bulkCopy.SqlRowsCopied += new SqlRowsCopiedEventHandler(OnSqlRowsCopied);
                bulkCopy.NotifyAfter = 1;
                bulkCopy.WriteToServer(tbOrigen);
            }
            r.Add(true);
            return r;
        }
        catch (Exception ex)
        {
            r.Add(false);
            r.Add("Linea " + ContadorBulk.ToString() + ", " + ex.Message.Replace("colid", "columna").Replace("cliente bcp", "archivo origen"));
            return r;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
    }

    private static void OnSqlRowsCopied(object sender, SqlRowsCopiedEventArgs e)
    {
        ContadorBulk++;
    }

    /// <summary>
    /// Cifrar una cadena utilizando el método de cifrado. Regresa un texto de cifrado.
    /// </summary>
    /// <param name="texto">cadena de caracteres que se va a encriptar</param>
    /// <returns></returns>
    /// 
    public string Encriptar(string texto)
    {
        //arreglo de bytes donde guardaremos la llave
        byte[] keyArray;
        //arreglo de bytes donde guardaremos el texto que vamos a encriptar
        byte[] Arreglo_a_Cifrar = UTF8Encoding.UTF8.GetBytes(texto);

        //se utilizan las clases de encriptacion proveidas por el Framework
        //Algritmo MD5
        MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
        //se guarda la llave para que se le realice hashing
        keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
        hashmd5.Clear();

        //Algoritmo 3DAS
        TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
        tdes.Key = keyArray;
        tdes.Mode = CipherMode.ECB;
        tdes.Padding = PaddingMode.PKCS7;

        //se empieza con la transformaion de la cadena
        ICryptoTransform cTransform = tdes.CreateEncryptor();

        //arreglo de bytes donde se guarda la cadena cifrada
        byte[] ArrayResultado = cTransform.TransformFinalBlock(Arreglo_a_Cifrar, 0, Arreglo_a_Cifrar.Length);
        tdes.Clear();
        //se regresa el resultado en forma de una cadena
        return Convert.ToBase64String(ArrayResultado, 0, ArrayResultado.Length);
    }

    /// <summary>
    /// Desencripta un texto usando el metodo de deble cadena Regresa una cadena desencriptada. 
    /// </summary>
    /// <param name="cipherString">cadena encriptada</param>
    /// <param name="useHashing">Puedes usar el Hasing para encriptar estos datos? pasa true si la respuesta es si</param>
    /// <param name="keyToDecrypt">El nombre de la clave en el archivo app.config para desencriptar</param>
    /// <returns>the decrypted string</returns>
    public string Desencriptar(string textoEncriptado)
    {
        byte[] keyArray;
        //convierte el texto en una secuencia de bytes
        byte[] Array_a_Descifrar = Convert.FromBase64String(textoEncriptado);

        //se llama a las clases ke tienen los algoritmos de encriptacion
        //se le aplica hashing
        MD5CryptoServiceProvider hashmd5 = new MD5CryptoServiceProvider();
        keyArray = hashmd5.ComputeHash(UTF8Encoding.UTF8.GetBytes(key));
        hashmd5.Clear();

        TripleDESCryptoServiceProvider tdes = new TripleDESCryptoServiceProvider();
        tdes.Key = keyArray;
        tdes.Mode = CipherMode.ECB;
        tdes.Padding = PaddingMode.PKCS7;

        ICryptoTransform cTransform = tdes.CreateDecryptor();
        byte[] resultArray = cTransform.TransformFinalBlock(Array_a_Descifrar, 0, Array_a_Descifrar.Length);

        tdes.Clear();
        string res = UTF8Encoding.UTF8.GetString(resultArray);
        return res;
    }

    public string convertirDatatableEnJsonString(DataTable dt)
    {
        System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        var dato = "";
        foreach (System.Data.DataRow dr in dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (System.Data.DataColumn col in dt.Columns)
            {
                if ((dr[col].ToString() != "True") && (dr[col].ToString() != "False"))
                { dato = dr[col].ToString(); }
                else
                if (dr[col].ToString() == "True") { dato = "1"; } else { dato = "0"; }

                row.Add(col.ColumnName, dato);
            }
            rows.Add(row);
        }
        //js.MaxJsonLength = 51282000;
        js.MaxJsonLength = int.MaxValue;
        return js.Serialize(rows);
    }

    //Metodo de escalafon
    public string RegresarString(string query)
    {
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        ConexionSQL conexionDePrueba = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandTimeout = 0;
        Adaptador.SelectCommand.CommandType = CommandType.Text;
        SqlDataReader dr = Adaptador.SelectCommand.ExecuteReader();
        try
        {
            if (dr.Read())
            {

                string Proceso = "P: " + dr.GetInt32(0).ToString();
                dr.Close();
                return Proceso;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
        return "";
    }

    public string Quincena_SuperNumerico(string query)
    {
        string quincenas = "";
        System.Data.SqlClient.SqlDataAdapter Adaptador;
        ConexionSQL conexionDePrueba = new ConexionSQL();
        Adaptador = new System.Data.SqlClient.SqlDataAdapter(query, conexionDePrueba.abrirConexion());
        Adaptador.SelectCommand.CommandTimeout = 0;
        Adaptador.SelectCommand.CommandType = CommandType.Text;
        SqlDataReader dr = Adaptador.SelectCommand.ExecuteReader();
        //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@usuario", usuario));
        //Adaptador.SelectCommand.Parameters.Add(new SqlParameter("@password", contraseña));
        try
        {
            if (dr.Read())
            {
                quincenas = dr.GetInt32(0).ToString();
                dr.Close();
                return quincenas;
            }
        }
        catch (Exception ex)
        {
            throw ex;
        }
        finally
        {
            conexionDePrueba.cerrarConexion();
        }
        return null;
    }
}