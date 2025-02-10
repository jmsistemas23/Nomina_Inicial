using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_Reportes_Visor_Reportes : System.Web.UI.Page
{
    Utilerias u = new Utilerias();
    string nombreRpt = "Movimientos de Personal";
    //string nombreRpt = "";
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            try { nombreRpt = System.Convert.ToString(Page.Request.QueryString.GetValues("tipo")[0]); }
            catch { }

            DataSet ds = u.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");           
            rvReportes.ProcessingMode = ProcessingMode.Remote;
            IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
            rvReportes.ServerReport.ReportServerCredentials = irsc;
            rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
            rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + "/" + nombreRpt;
            rvReportes.ServerReport.Refresh();
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