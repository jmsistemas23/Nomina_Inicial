using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;


/// <summary>
/// Summary description for ClsTblCostos
/// </summary>
public class ClsTblCostos
{
	public ClsTblCostos()
	{
		//
		// TODO: Add constructor logic here
		//
	}
    public string tiposcosto { get; set; }
    public DataSet dscostos { get; set; }   
}