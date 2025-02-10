using System;
using System.Collections.Generic;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Linq;
using System.Web;
using Microsoft.Reporting.WebForms;
using System.Data;
using System.Web.Script.Services;
using System.Web.Services;

public partial class FILE_EmpleadosEscalafon_ReporteEscalafonVacancia : System.Web.UI.Page
{
    //static DataTable dtActivo;
    //static DataSet ds;
    static DataTable dtVacante;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            if (dtVacante != null)
            { empleado(); }
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

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
    public void empleado()
    {
        Utilerias lib = new Utilerias();

        //ReportViewer1.ProcessingMode = ProcessingMode.Local;
        //ReportViewer1.LocalReport.ReportPath = Server.MapPath("~/FILE/EmpleadosEscalafon/REscalafonPrueba.rdl");
        //ReportViewer1.Visible = true;
        //ReportDataSource datasourceEA = new ReportDataSource("EscalafonActivos", ds.Tables[0]);
        //ReportDataSource datasourceEV = new ReportDataSource("EscalafonVacantes", ds.Tables[1]);
        //ReportViewer1.LocalReport.DataSources.Add(datasourceEA);
        //ReportViewer1.LocalReport.DataSources.Add(datasourceEV);
        ////ReportViewer1.LocalReport.SetParameters(parameter);
        //ReportViewer1.LocalReport.Refresh();
        //dtActivo.Dispose();
        //dtVacante.Dispose();
        //ds.Dispose();

        ReportParameter[] parameter = new ReportParameter[3];
        parameter[0] = new ReportParameter("fkEmpVacante", dtVacante.Rows[0]["NumEmpleado"].ToString());
        parameter[1] = new ReportParameter("NumEmpleado", dtVacante.Rows[0]["NumEmpleado"].ToString());
        parameter[2] = new ReportParameter("Puesto", dtVacante.Rows[0]["puesto"].ToString());

        ReportViewer1.ProcessingMode = ProcessingMode.Remote;
        IReportServerCredentials irsc = new CustomReportCredentials("rptEjecutivo", "rptEj3cutiv0", "");
        ReportViewer1.ServerReport.ReportServerCredentials = irsc;
        ReportViewer1.ServerReport.ReportServerUrl = new Uri("http://10.10.213.70/ReportServer");
        ReportViewer1.ServerReport.ReportPath = "/Ejecutivo/ReporteEscalafon";
        ReportViewer1.ServerReport.SetParameters(parameter);
        ReportViewer1.KeepSessionAlive = false;
        ReportViewer1.AsyncRendering = false;
        ReportViewer1.ServerReport.Refresh();
        dtVacante.Dispose();
    }

    [WebMethod(EnableSession = true)]
    [ScriptMethod]
     public static void CargarDatatable(List<EscalafonV> Vacanate)
    {
        dtVacante = new DataTable();
        dtVacante.Clear();
        dtVacante.Columns.Add("NumEmpleado", typeof(string));
        dtVacante.Columns.Add("puesto", typeof(string));
        DataRow row;

        try
        {
            foreach (var item in Vacanate)
            {
                row = dtVacante.NewRow();
                row["NumEmpleado"] = item.NumEmpleado;
                row["puesto"] = item.Puesto;
                dtVacante.Rows.Add(row);

            }
        }
        catch (Exception ex)
        {  }
    }



    
}