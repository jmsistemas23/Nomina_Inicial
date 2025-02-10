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





public partial class FILE_Impresion_Formatos_Reporteador : System.Web.UI.Page
{
    Utilerias lib = new Utilerias();
    string idusuario = "";
    protected override void OnInit(EventArgs e)
    {
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetNoStore();
        Response.Cache.SetExpires(DateTime.MinValue);

        base.OnInit(e);
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        ClsLogin objusuario = (ClsLogin)HttpContext.Current.Session["Usuario"];
        if (objusuario == null)
        {
            Response.Redirect("../../Login.aspx");
        }

        try
        {
            idusuario = System.Convert.ToString(Page.Request.QueryString.GetValues("Idusuario")[0]);
        }
        catch { }

        if (!IsPostBack)
        {
            Listar_Reportes(treportes, "exec GESRH_SPT_Sistemas_ListarReportesPermisos " + objusuario.Id);
            //Listar_Reportes(treportes, "exec GESRH_SPT_Sistemas_ListarReportesPermisos 1");
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
   

    public void Listar_Reportes(TreeView objeto, string query)
    {        
        Utilerias lib = new Utilerias();
        List<ClsPermisosMenus> lstmenu = new List<ClsPermisosMenus>();
        ClsPermisosMenus menu = new ClsPermisosMenus();
        JavaScriptSerializer js = new JavaScriptSerializer();
        DataSet ds = lib.ejecutarConsultaEnDataSet(query);

        for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
        {
            menu = new ClsPermisosMenus();
            menu.Id = Convert.ToInt32(ds.Tables[0].Rows[i]["Id"].ToString());
            menu.text = ds.Tables[0].Rows[i]["nombre"].ToString();
            menu.target = ds.Tables[0].Rows[i]["nomreporte"].ToString();
            menu.IdPadre = ds.Tables[0].Rows[i]["propietario"] != DBNull.Value ? Convert.ToInt32(ds.Tables[0].Rows[i]["propietario"]) : (int?)null;
            menu.visible = Convert.ToBoolean(ds.Tables[0].Rows[i]["visible"].ToString());
            lstmenu.Add(menu);
        }
        List<ClsPermisosMenus> menutree = GetModuloTree(lstmenu, 0);
       
        TreeNode padre = new TreeNode();
        TreeNode child = new TreeNode();
        for (int m = 0; m < menutree.Count; m++)
        {
            padre = new TreeNode();
            padre.Text = menutree[m].text;
            padre.Value = menutree[m].Id.ToString();
            objeto.Nodes.Add(padre);

            if (menutree[m].children.Count > 0)
            {
                for (int sm = 0; sm < menutree[m].children.Count; sm++)
                {
                    child = new TreeNode();
                    child.Value = menutree[m].children[sm].Id.ToString();
                    child.Text = menutree[m].children[sm].text;
                    child.Target = menutree[m].children[sm].target;
                    padre.ChildNodes.Add(child);

                    if (menutree[m].children[sm].children.Count > 0)
                    {
                        for (int smm = 0; smm < menutree[m].children[sm].children.Count; smm++)
                        {
                            child = new TreeNode();
                            child.Value = menutree[m].children[sm].children[smm].Id.ToString();
                            child.Text = menutree[m].children[sm].children[smm].text;
                            child.Target = menutree[m].children[sm].children[smm].target;
                            padre.ChildNodes[sm].ChildNodes.Add(child);
                        }
                    }
                }
            }
        }
        ds.Dispose();
        padre.ExpandAll();           
    }

    //private void AGREGAR_PADRE_TREE(TreeView objeto,List<ClsPermisosMenus> lista)
    //{
    //    TreeNode padre = new TreeNode();
    //    TreeNode child = new TreeNode();
    //    for (int m = 0; m < lista.Count; m++)
    //    {
    //        padre = new TreeNode();
    //        padre.Text = lista[m].text;
    //        padre.Value = lista[m].Id.ToString();
    //        objeto.Nodes.Add(padre);

    //        if (lista[m].children.Count > 0)
    //        {
    //            AGREGAR_HIJO_TREE(objeto, padre,lista,m);
    //        }
    //    }
    //    padre.ExpandAll();   
    //}
    //private void AGREGAR_HIJO_TREE(TreeView objeto,TreeNode nodo,List<ClsPermisosMenus> lista,int m)
    //{
    //    TreeNode child = new TreeNode();
    //    for (int sm = 0; sm < lista[m].children.Count; sm++)
    //    {
    //        child = new TreeNode();
    //        child.Value = lista[m].children[sm].Id.ToString();
    //        child.Text = lista[m].children[sm].text;
    //        child.Target = lista[m].children[sm].target;            
    //        nodo.ChildNodes.Add(child);

    //        if (lista[m].children[sm].children.Count > 0)
    //        {
    //            AGREGAR_HIJO_TREE(objeto, child, lista,sm);
    //        }
    //    }
    //}

    private static List<ClsPermisosMenus> GetModuloTree(List<ClsPermisosMenus> list, int? IdPadre)
    {
        return list.Where(x => x.IdPadre == IdPadre).Select(x => new ClsPermisosMenus()
        {
            Id = x.Id,
            text = x.text,
            IdPadre = x.IdPadre,
            target=x.target,
            visible = x.visible,
            children = GetModuloTree(list, x.Id)
        }).ToList();
    }

 
    protected void treportes_SelectedNodeChanged(object sender, EventArgs e)
    {
        if (treportes.SelectedNode.ChildNodes.Count == 0)
        {
            string nomreporte = treportes.SelectedNode.Target;
            DataSet ds = lib.ejecutarConsultaEnDataSet("GESRH_SPT_Reportes_Configuracion");
            rvReportes.ProcessingMode = ProcessingMode.Remote;
            IReportServerCredentials irsc = new CustomReportCredentials(ds.Tables[0].Rows[0]["usrReportes"].ToString(), ds.Tables[0].Rows[0]["pwdReportes"].ToString(), "");
            rvReportes.ServerReport.ReportServerCredentials = irsc;
            rvReportes.ServerReport.ReportServerUrl = new Uri(ds.Tables[0].Rows[0]["servidorReportes"].ToString());
            rvReportes.ServerReport.ReportPath = "/" + ds.Tables[0].Rows[0]["rutaReportes"].ToString() + "/" + nomreporte;
            rvReportes.KeepSessionAlive = false;
            rvReportes.AsyncRendering = false;
            rvReportes.ServerReport.Refresh();
            ds.Dispose();
        }
    }

   
}