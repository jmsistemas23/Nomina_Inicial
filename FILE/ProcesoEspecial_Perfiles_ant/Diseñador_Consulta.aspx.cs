﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class FILE_ProcesoEspecial_Perfiles_Diseñador_Consulta : System.Web.UI.Page
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

    }
}