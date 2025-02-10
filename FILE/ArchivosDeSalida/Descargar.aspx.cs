using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Generar_ArchivoTXT_Descargar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            if (Request.QueryString["Fileid"] != null)
            {
                string nombrearchivo = Request.QueryString["Fileid"].ToString();
                string extension = Request.QueryString["ext"].ToString();

                System.IO.FileStream fs = null;
                fs = System.IO.File.Open(Server.MapPath("Archivos/" + nombrearchivo + "." + extension), System.IO.FileMode.Open);
                byte[] txtbyte = new byte[fs.Length];
                fs.Read(txtbyte, 0, Convert.ToInt32(fs.Length));              
                fs.Dispose();
                Response.AddHeader("Content-disposition", "attachment; filename=" + nombrearchivo + "." + extension);
                Response.ContentType = "application/octet-stream";
                Response.BinaryWrite(txtbyte);
                Response.End();
            }

        }
    }
}