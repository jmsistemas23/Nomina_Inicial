using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Consultas_Empleados_Consulta_Empleados : System.Web.UI.Page
{
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
    [System.Web.Services.WebMethod]
    public static bool GetResponse()
    {
        return true;
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        //string myHostName = HttpContext.Current.Request.UserHostName;       
        //HiddenField1.Value = myHostName;


        //ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        //if (objusuario == null)
        //{
        //    Response.Redirect("../../../Login.aspx");
        //}
    }

}