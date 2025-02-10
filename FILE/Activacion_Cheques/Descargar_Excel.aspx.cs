using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data;
using ClosedXML.Excel;
using System.Configuration;
using System.Data.SqlClient;

public partial class FILE_Activacion_Cheques_Archivos_Descargar_Excel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            if (Request.QueryString["Fileid"] != null)
            {
                string nombrearchivo = Request.QueryString["Fileid"].ToString();

                System.IO.FileStream fs = null;
                fs = System.IO.File.Open(Server.MapPath("Archivos/" + nombrearchivo + ".xls"), System.IO.FileMode.Open);
                byte[] txtbyte = new byte[fs.Length];
                fs.Read(txtbyte, 0, Convert.ToInt32(fs.Length));
                fs.Close();
                Response.AddHeader("Content-disposition", "attachment; filename=" + nombrearchivo + ".xls");
                Response.ContentType = "application/octet-stream";
                Response.BinaryWrite(txtbyte);
                Response.End();
            }

        }
       
    }
}