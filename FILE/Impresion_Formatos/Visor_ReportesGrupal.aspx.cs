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


public partial class FILE_Impresion_Formatos_Visor_ReportesGrupal : System.Web.UI.Page
{

    string nomreporte = ""; string sruta = ""; string usu = "",pwd="",servidor;
    FILE_Impresion_Formatos_Visor_ReportesGrupal rw;
    IReportServerCredentials irsc;
    protected void Page_Load(object sender, EventArgs e)
    {        
        //if (IsPostBack)
        //{
                        
        //}        
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

    public void VISOR(string nomreporte, string usureporte, string pasreporte, string rutareporte, string serreporte)
    {
        usu = usureporte;
        pwd = pasreporte;
        servidor = serreporte;

        rw = new FILE_Impresion_Formatos_Visor_ReportesGrupal();
        rw.rvReportes.ProcessingMode = ProcessingMode.Remote;  
        irsc = new CustomReportCredentials(usu,pwd,"");        
        rw.rvReportes.ServerReport.ReportServerCredentials = irsc;
        rw.rvReportes.ServerReport.ReportServerUrl = new Uri(servidor);
        rw.rvReportes.ServerReport.ReportPath = "/" + rutareporte + "/" + nomreporte;
        rw.rvReportes.ServerReport.Refresh();                
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public static void Cargar_Reportes(string nomreporte)
    {
        Utilerias u = new Utilerias();
        DataSet ds = u.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");        
        FILE_Impresion_Formatos_Visor_ReportesGrupal c = new FILE_Impresion_Formatos_Visor_ReportesGrupal();
        c.VISOR(nomreporte, ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), ds.Tables[0].Rows[0]["rutaReportes"].ToString(), ds.Tables[0].Rows[0]["servidorReportes"].ToString());
        ds.Dispose();
    }
   
}