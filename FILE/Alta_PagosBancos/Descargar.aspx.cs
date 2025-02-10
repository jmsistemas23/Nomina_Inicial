using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Alta_Pagos_Bancos_Descargar : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Page.IsPostBack)
        {
            if (Request.QueryString["Fileid"] != null)
            {
                string nombrearchivo = Request.QueryString["Fileid"].ToString();

                System.IO.FileStream fs = null;
                fs = System.IO.File.Open(Server.MapPath("Archivos/" + nombrearchivo + ".txt"), System.IO.FileMode.Open);
                byte[] txtbyte = new byte[fs.Length];
                fs.Read(txtbyte, 0, Convert.ToInt32(fs.Length));
                fs.Dispose();
                Response.AddHeader("Content-disposition", "attachment; filename=" + nombrearchivo + ".txt");
                Response.ContentType = "application/octet-stream";
                Response.BinaryWrite(txtbyte);
                Response.End();
            }

        }
    }
}