using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Timbrado_Inicial_Timbrado : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //SesionDto objusuario = (SesionDto)HttpContext.Current.Session["Sesion"];

        //if (objusuario == null)
        //{
        //    Response.Redirect("../../Login.aspx");
        //}
    }
    [System.Web.Services.WebMethod]
    public static bool GetResponse()
    {
        return true;
    }
}