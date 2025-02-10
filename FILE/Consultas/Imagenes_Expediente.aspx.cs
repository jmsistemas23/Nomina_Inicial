using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script;
using System.Web.Script.Services;
using System.Web.Services;
using System.Data;
using System.Data.SqlClient;
using System.Text;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Web.Script.Serialization;
using System.IO;
using System.Data.OleDb;
using System.Data.Odbc;
using System.Web.UI;
//using Microsoft.JSInterop;



using Microsoft.Reporting.WebForms;

public partial class FILE_Consultas_Imagenes_Expediente : System.Web.UI.Page
{
    Utilerias lib = new Utilerias();
    string expediente = "";
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
         
        if (Request.Params["__EVENTTARGET"] == "CargarExpediente")
        {
            CargarExpediente();
        }
    }

    public class CustomReportCredentials : IReportServerCredentials
    {
        private string _UserName;
        private string _PassWord;
        private string _DomainName;

        public CustomReportCredentials(string UserName, string PassWord, string DomainName)
        {
            _UserName = UserName;
            _PassWord = PassWord;
            _DomainName = DomainName;
        }

        public System.Security.Principal.WindowsIdentity ImpersonationUser
        {
            get { return null; }
        }

        public System.Net.ICredentials NetworkCredentials
        {
            get { return new System.Net.NetworkCredential(_UserName, _PassWord, _DomainName); }
        }

        public bool GetFormsCredentials(out System.Net.Cookie authCookie, out string user,
         out string password, out string authority)
        {
            authCookie = null;
            user = password = authority = null;
            return false;
        }
    }


    //protected void Imagenes_Expediente_Click(object sender, EventArgs e)
    //{
    //    expediente = Request.Form["hfexpediente"].ToString();
    //      if (expediente != "")
    //      {             
    //          Utilerias lib = new Utilerias();

    //          DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");
    //          rvReportes.ProcessingMode = ProcessingMode.Remote;
    //          IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
    //          rvReportes.ServerReport.ReportServerCredentials = irsc;
    //          rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
    //          rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + "/ImagenesExpediente";
    //          rvReportes.ServerReport.SetParameters(new ReportParameter("expediente", expediente));
    //          rvReportes.KeepSessionAlive = false;
    //          rvReportes.AsyncRendering = false;
    //          rvReportes.ServerReport.Refresh();
    //          ds.Dispose();
    //      }
    //}

    protected void CargarExpediente()
    {
        
        if (expediente != "")
        {
            string[] valores = expediente.Split('|');

            Utilerias lib = new Utilerias();

            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");
            rvReportes.ProcessingMode = ProcessingMode.Remote;
            IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
            rvReportes.ServerReport.ReportServerCredentials = irsc;
            rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
            rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + "/ImagenesExpediente";
            rvReportes.ServerReport.SetParameters(new ReportParameter("expediente", valores[0]));
            rvReportes.ServerReport.SetParameters(new ReportParameter("desde", valores[1]));
            rvReportes.ServerReport.SetParameters(new ReportParameter("hasta", valores[2]));
            rvReportes.ServerReport.SetParameters(new ReportParameter("pagina", valores[3]));            
            rvReportes.ServerReport.SetParameters(new ReportParameter("conexion", "E"));
            rvReportes.KeepSessionAlive = false;
            rvReportes.AsyncRendering = false;
            rvReportes.ServerReport.Refresh();
            ds.Dispose();
        }
    }

    //[WebMethod()]
    //public static void Expediente(object sender, EventArgs e)
    //{
    //    expediente = Request.Form["hfexpediente"].ToString();
    //    if (expediente != "")
    //    {
    //        Utilerias lib = new Utilerias();

    //        DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");
    //        rvReportes.ProcessingMode = ProcessingMode.Remote;
    //        IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
    //        rvReportes.ServerReport.ReportServerCredentials = irsc;
    //        rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
    //        rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + "/ImagenesExpediente";
    //        rvReportes.ServerReport.SetParameters(new ReportParameter("expediente", expediente));
    //        rvReportes.KeepSessionAlive = false;
    //        rvReportes.AsyncRendering = false;
    //        rvReportes.ServerReport.Refresh();
    //        ds.Dispose();
    //    }
    //}
}