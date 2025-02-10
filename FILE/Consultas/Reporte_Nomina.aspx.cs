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


public partial class FILE_Consultas_Reporte_Nomina : System.Web.UI.Page
{
    Utilerias lib = new Utilerias();
    string numplaza = "", quincena = "";

    [System.Web.Services.WebMethod]
    public static bool GetResponse()
    {
        return true;
    }

    protected void Page_Load(object sender, EventArgs e)
    {
        try
        {
            numplaza = Page.Request.QueryString.GetValues("numplaza")[0];
            quincena = Page.Request.QueryString.GetValues("quin")[0];
        }
        catch { }

        if (!IsPostBack)
        {
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");
            rvReportes.ProcessingMode = ProcessingMode.Remote;
            IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
            rvReportes.ServerReport.ReportServerCredentials = irsc;
            rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
            rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + ds.Tables[0].Rows[0]["reportenomina"].ToString();
            rvReportes.ServerReport.SetParameters(new ReportParameter("plaza", numplaza));
            rvReportes.ServerReport.SetParameters(new ReportParameter("quincena", quincena));
            rvReportes.ServerReport.Refresh();
            ds.Dispose();
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
}