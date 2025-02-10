var numplaza = "";
var quincena = "";
var empleado = "";
var ip= "";
$(document).ready(function () {

    numplaza = $_GET('numplaza');
    if (numplaza != undefined) { numplaza = numplaza; }
    else { numplaza = ''; }

    empleado = $_GET('empleado');
    if (empleado != undefined) { empleado = empleado; LISTAR_EMPLEADOS(); }
    else { empleado = ''; }
  
    OCULTAR_BOTONES();
    HABILITAR_BOTONES(135);
    
    //CARGAR_DG_PLAZASACTIVAS("#dgp", null);    
    //CARGAR_DG_PLAZASCANELADAS("#dgc", null);
    //CARGAR_DG("#dgpn", "");

    if (($.session.get("Mantener") == true) || ($.session.get("Mantener")!= undefined)) {
        document.getElementById('chkmantener').checked = true;
    } else { document.getElementById('chkmantener').checked = false; }

    $("#cboquin").combobox({
        onSelect: function (rec) {
            if (rec.valor == "x") { quincena = ""; }
            else { quincena = rec.valor; }
            if ((empleado != undefined) && (empleado != ""))
            { LISTAR_EMPLEADOS(); }
        }
    });

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dg', '');
        var mantener = $.session.get("Mantener");
        if ((mantener== false) || (mantener==undefined)){
            CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
            $("#cbocon").combobox('setValue', '=');

            $.session.set("Mantener", "");
            $.session.set("Campo", "");
            $.session.set("Condicion", "");
        }
        else {
            CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
            var campo = $.session.get("Campo");
            $("#cbocam").combobox('setValue', campo);
            $("#cbocon").combobox('setValue', $.session.get("Condicion"));                                               
        }       
            windows("#winemp", 750, 600, false, "Empleados");
            var text = $('#txtval');
            text.textbox('clear').textbox('textbox').focus();    
    });


    $('#chkmantener').bind('click', function () {
        if ($('#chkmantener').is(":checked") == false) {
            CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
            $("#cbocon").combobox('setValue', '=');

            $.session.set("Mantener","");
            $.session.set("Campo", "");
            $.session.set("Condicion", "");
        }
        $.session.set("Mantener", $('#chkmantener').is(":checked"));
        
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#btnhistmov').bind('click', function () {
        if ((empleado != undefined) && (empleado!=""))
        {           
            //document.location = "Historia_Movimientos_Empleados.aspx?tipomov=MP&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Movimientos_Empleados.aspx", "tipomov=MP&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistpagos').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        {          
            //document.location = "Historia_Pagos_Empleados.aspx?tipomov=MC&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Pagos_Empleados.aspx", "tipomov=MC&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistreffam').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        { document.location = "Historia_Referencias_Familiares.aspx?tipomov=RF&empleado=" + empleado + "&tipo=E"; }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistdatper').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        { document.location = "Historia_Datos_Personales.aspx?tipomov=DP&empleado=" + empleado + "&tipo=E"; }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistpagesp').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        {          
            //document.location = "Historia_Pagos_Especiales.aspx?tipomov=ME&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Pagos_Especiales.aspx", "tipomov=ME&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });


    $('#btnhistplaza').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        {           
            //document.location = "Historia_Plazas_Empleados.aspx?empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Plazas_Empleados.aspx", "empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistnomina').bind('click', function () {
        if ((empleado != undefined)  &&  (numplaza != ""))
        {           
           
           // alert("numplaza=" + numplaza + "&empleado=" + empleado + "&quin=" + quincena);
           // document.location = "Consulta_Nomina_Empleados.aspx?numplaza=" + numplaza + "&empleado=" + empleado + "&quin=" + quincena

            IR_PAGINA("Consulta_Nomina_Empleados.aspx", "numplaza=" + numplaza + "&empleado=" + empleado+"&quin="+quincena);
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado y plaza ", 'error'); }
    });

    $('#btnhistinc').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        {           
            //document.location = "Historia_Incidencias_Empleados.aspx?tipomov=IL&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Incidencias_Empleados.aspx", "tipomov=IL&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnhistter').bind('click', function () {
        if ((empleado != undefined) && (empleado != ""))
        {          
            //document.location = "Historia_Terceros_Empleados.aspx?tipomov=TR&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Terceros_Empleados.aspx", "tipomov=TR&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnImgExpediente').bind('click', function () {
        if ((empleado != undefined) && (empleado!=""))
        {            
            IR_PAGINA("../Consulta_Imagenes_Expedientes.aspx", "plaza=&empleado=" + empleado + "&tipo=E");
            //IR_PAGINA("../Imagenes_Expediente.aspx", "plaza=&empleado=" + empleado + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

      
});


function OCULTAR_BOTONES()
{
    $('#tbtnhistmov').hide();
    $('#tbtnhistpagos').hide();
    $('#tbtnhistdatper').hide();
    $('#tbtnhistreffam').hide();
    $('#tbtnhistpagesp').hide();
    $('#tbtnhistinc').hide();
    $('#tbtnhistter').hide();
    $('#tbtnhistplaza').hide();
    $('#tbtnhistnomina').hide();
    $('#tbtnImgExpediente').hide();
}

function HABILITAR_BOTONES(strconsulta)
{
    var parametros = {};
    parametros.strconsulta = strconsulta;
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/ListarPermisosBotones',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                obj = $.parseJSON(data.d[1]);              
                if (obj[0].HistMovPer == 1) { $('#tbtnhistmov').show(); }
                if (obj[0].HistMovCon == 1) { $('#tbtnhistpagos').show(); }
                if (obj[0].HistDatPer == 1) { $('#tbtnhistdatper').show(); }
                if (obj[0].HistFamRef == 1) { $('#tbtnhistreffam').show(); }
                if (obj[0].HistMovEsp == 1) { $('#tbtnhistpagesp').show(); }
                if (obj[0].HistIncLab == 1) { $('#tbtnhistinc').show(); }
                if (obj[0].HistCapTer == 1) { $('#tbtnhistter').show(); }
                if (obj[0].HistPlazas == 1) { $('#tbtnhistplaza').show(); }
                if (obj[0].HistDetNom == 1) { $('#tbtnhistnomina').show(); }
                if (obj[0].HistImgExp == 1) { $('#tbtnImgExpediente').show(); }
            }
        },       
        error: function (er) {
            $('#loading').hide(100);
            alert(er.responseText);
        },
        complete: function () {
            $('#loading').hide(100);
        },
    })
}

function IR_PAGINA(url, parametros) {
    var strpagina = "";
    if (parametros != "") { strpagina = url + "?" + parametros; } else { strpagina = url; }
    $.ajax({
        url: url + "/GetResponse",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == true) {
                window.location = strpagina;
            }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c +" Al llamar la nomina", 'error');
        }
    });
}


function Get_Empleado()
{
    var parametros = {};
    parametros.plaza = numplaza;
    parametros.empleado = empleado;
    $.ajax({
        type: "POST",
        url: "../funciones.aspx/GetSession",
        data: JSON.stringify(parametros),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (err) {           
            $.messager.alert('Error', err.responsetext, 'error');
        },
    });
}

function CARGAR_DATOS(dgcontrol, strconemp) {
    var colsort="numemp asc";
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + strconemp + "&colord=" + colsort,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,        
        pageSize: 20,
        width:"100%",
        heigth: "65%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {              
                empleado = rows.numemp;                               
                $("#winemp").window('close');
                LISTAR_EMPLEADOS();

                if ($('#chkmantener').is(":checked") == true) {
                  
                    var campo = $("#cbocam").combobox('getValue');
                    $.session.set("Campo", campo);
                    var con = $("#cbocon").combobox('getValue');
                    $.session.set("Condicion", con);
                }
            }
        },
        onSortColumn: function (sort, order) {
            colsort = "";
            colsort += sort +' '+order+"|";
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responsetext, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var strconemp = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            strconemp = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { strconemp = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strconemp = " "; }
    CARGAR_DATOS('#dg', strconemp);
}

function LIMPIAR_DATOS() {
    $('#txtempleado').textbox('setValue','');
    $('#txtrfc').textbox('setValue', '');
    $('#txtcurp').textbox('setValue', '');
    $('#txtestatus').textbox('setValue', '');   
    $('#txtnombre').textbox('setValue', '');
    $('#txtsexo').textbox('setValue', '');
    $('#txtestadocivil').textbox('setValue', '');
    $('#txtnacionalidad').textbox('setValue', '');
    $('#txtfechanacimiento').textbox('setValue', '');
    $('#txtestadonacimiento').textbox('setValue', '');
    $('#txtcalle').textbox('setValue', '');
    $('#txtnoexterior').textbox('setValue', '');
    $('#txtnointerior').textbox('setValue', '');
    $('#txtcolonia').textbox('setValue', '');
    $('#txtRazonSocial').textbox('setValue', '');
    $('#txtcp').textbox('setValue', '');
    $('#txtcpf').textbox('setValue', '');
    $('#txttelefono').textbox('setValue', '');
    $('#txtcelular').textbox('setValue', '');
    $('#txtnivacademico').textbox('setValue', '');
    $('#txtmaestria').textbox('setValue', '');
    $('#txtfechagobfed').textbox('setValue', '');
    $('#txtdiaslabgobfed').textbox('setValue', '');
    $('#txtfechasec').textbox('setValue', '');
    $('#txtdiaslabsecretaria').textbox('setValue', '');
    $('#txtfechabaja').textbox('setValue', '');
    $('#txtfechareingreso').textbox('setValue', '');
    $('#txtdiaslaborados').textbox('setValue', '');
    $('#txtantiguedad').textbox('setValue', '');
    $('#txttiposangre').textbox('setValue', '');
    $('#txtalergias').textbox('setValue', '');
    $('#txtpadecimiento').textbox('setValue', '');
    $('#txtestado').textbox('setValue', '');
    $('#txtmunicipio').textbox('setValue', '');

    $('#txtporcreg').textbox('setValue', '');
    $('#txtregvol').textbox('setValue', '');
    $('#txttiporegimen').textbox('setValue', '');
    
   

    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgc').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dgpn').datagrid('loadData', { "total": 0, "rows": [] });
    $('#dghistpago').datagrid('loadData', { "total": 0, "rows": [] });
    
}

function LISTAR_EMPLEADOS() {
    var obj = "", objPL = "", objpen = "",objPC="",objpago="",objrf="";   
    var parametros = {};
    parametros.strempleado = empleado;
   // parametros.usupc = document.getElementById('HiddenField1').value;
   
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/ListarDatosEmpleados',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            if (data.d[0] != "0") {
                obj = $.parseJSON(data.d[0]);
                objPL = $.parseJSON(data.d[1]);
                objPC = $.parseJSON(data.d[2]);
                objpen = $.parseJSON(data.d[3]);
                objpago = $.parseJSON(data.d[4]);
                objrf = $.parseJSON(data.d[5]);

                if (obj.length > 0) {                    
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtcurp').textbox('setValue', obj[0].curpemp);
                    $('#txtestatus').textbox('setValue', obj[0].Estatus);
                    //$('#txtapmaterno').textbox('setValue', obj[0].matemp);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);
                    $('#txtsexo').textbox('setValue', obj[0].sexemp);
                    $('#txtestadocivil').textbox('setValue', obj[0].edociemp);
                    $('#txtnacionalidad').textbox('setValue', obj[0].nacioemp);
                    $('#txtfechanacimiento').textbox('setValue', obj[0].fenacemp);
                    $('#txtestadonacimiento').textbox('setValue', obj[0].edonaemp);
                    $('#txtmunnacimiento').textbox('setValue', obj[0].munnaemp);
                    $('#txtcalle').textbox('setValue', obj[0].calleemp);
                    $('#txtnoexterior').textbox('setValue', obj[0].noextemp);
                    $('#txtnointerior').textbox('setValue', obj[0].nointemp);
                    $('#txtcolonia').textbox('setValue', obj[0].colonemp);
                    $('#txtRazonSocial').textbox('setValue', obj[0].razonsocfisc);
                    $('#txtcp').textbox('setValue', obj[0].codpoemp);
                    $('#txtcpf').textbox('setValue', obj[0].codpofisc);
                    $('#txttelefono').textbox('setValue', obj[0].teleemp);
                    $('#txtcelular').textbox('setValue', obj[0].celular);
                    $('#txtestado').textbox('setValue', obj[0].edoemp);
                    $('#txtmunicipio').textbox('setValue', obj[0].muniemp);
                    $('#txtlocalidad').textbox('setValue', obj[0].locaemp);
                    $('#txtnivacademico').textbox('setValue', obj[0].nivacademico);
                    $('#txtmaestria').textbox('setValue', obj[0].maestria);
                    $('#txtprofesion').textbox('setValue', obj[0].profesion);
                    $('#txtcedula').textbox('setValue', obj[0].ceduemp);
                    $('#txtfechagobfed').textbox('setValue', obj[0].fegobemp);
                    $('#txtdiaslabgobfed').textbox('setValue', obj[0].diaslabgob);
                    $('#txtdiaslabanos').textbox('setValue', obj[0].diaslabano);
                    $('#txtfechasec').textbox('setValue', obj[0].fecingsec);
                    $('#txtdiaslabsecretaria').textbox('setValue', obj[0].diaslabsec);
                    $('#txtfechadep').textbox('setValue', obj[0].fedepemp);
                    $('#txtfechabaja').textbox('setValue', obj[0].febajemp);
                    $('#txtfechareingreso').textbox('setValue', obj[0].fereiemp);
                    $('#txtdiaslaborados').textbox('setValue', obj[0].cveforISRpl);
                    $('#txtantiguedad').textbox('setValue', obj[0].Antiguedad);
                    $('#txttiposangre').textbox('setValue', obj[0].tiposangre);
                    $('#txtalergias').textbox('setValue', obj[0].alergias);
                    $('#txttiporegimen').textbox('setValue', obj[0].tiporegimen);
                    $('#txtporcreg').textbox('setValue', obj[0].porcret);
                    $('#txtregvol').textbox('setValue', obj[0].porcretvol);

                    $('#txtcorreopersonal').textbox('setValue', obj[0].emailemp);
                    $('#txtcorreoinst').textbox('setValue', obj[0].emailinst);

                    $('#txtpadecimientos').textbox('setValue', obj[0].padecimientos);
                }

                if (objpago.length > 0) {                  
                    CARGAR_DG_HISTORIAPAGOS('#dghistpago', objpago);
                }else { CARGAR_DG_HISTORIAPAGOS('#dghistpago', null); }

                    if (objPL.length > 0) {                        
                        CARGAR_DG_PLAZASACTIVAS("#dgp", objPL);
                    }else { CARGAR_DG_PLAZASACTIVAS("#dgp", null); }

                    if (objPC.length > 0) {                        
                        CARGAR_DG_PLAZASCANELADAS("#dgc", objPC);
                    }else { CARGAR_DG_PLAZASCANELADAS("#dgc", null); }

                    if (objpen.length > 0) {
                        CARGAR_DG("#dgpn", objpen);
                    } else { CARGAR_DG("#dgpn", null); }

                    if (objrf.length > 0) {                      
                        CARGAR_DG("#dgrf", objrf);
                    }
                    else { CARGAR_DG("#dgrf", null); }
            }
        },
        //error: function (jqXHR, textStatus, errorThrown) {
        //    $('#loading').hide(100);
        //    // $.messager.alert('Error', errorThrown, 'error');            
        //},
        error: function (er) {
            $('#loading').hide(100);
            alert(er.responseText);            
        },
        complete: function () {
            $('#loading').hide(100);
        },       
    })
        //.fail(function (jqXHR, textStatus, errorThrown) {
        //    if (jqXHR.status === 0) {

        //        alert('Not connect: Verify Network.');

        //    } else if (jqXHR.status == 404) {

        //        alert('Requested page not found [404]');

        //    } else if (jqXHR.status == 500) {

        //        alert('Internal Server Error [500].', +jqXHR.errorThrown + ' ' + jqXHR.textStatus);

        //    } else if (textStatus === 'parsererror') {

        //        alert('Requested JSON parse failed.');

        //    } else if (textStatus === 'timeout') {

        //        alert('Time out error.');

        //    } else if (textStatus === 'abort') {

        //        alert('Ajax request aborted.');

        //    } else {
        //        alert('Uncaught Error: ' + jqXHR.responseText);

        //    }
        //});
}

function CARGAR_QUINCENAS(ddlobj)
{   
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_Quincenas',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d != "") {
                obj = $.parseJSON(data.d);
                $(ddlobj).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',                                      
                });
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function CARGAR_DG(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,        
        singleSelect: true,
        striped: true,       
        pageSize: 10,
        customAttr:{
            tooltip:{
                enable: true
            }
        },
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            //if (dgcontrol == "#dghistpago")
            //{
            //    rows = $(dgcontrol).datagrid('getSelected');
            //    if (rows) {
            //        numplaza = rows.Plaza;
            //        empleado = rows.Empleado;
            //    }
            //}
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_DG_PLAZASACTIVAS(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        columns: [[
            { field: 'Estatus', title: 'Estatus', width: 80, align: 'Center', halign: 'center', hidden: false },
            { field: 'numplaza', title: 'Plaza', width: 70, align: 'center', halign: 'center' },
            { field: 'numplamag', title: 'Plaza Ant', width: 150, align: 'center', halign: 'center' },
            { field: 'cveesppl', title: 'Estatus Plaza', width: 100, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desesp + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'desesp', title: 'Des.Estatus Plaza', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvepuepl', title: 'Puesto', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despue + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despue', title: 'Des.Puesto', width: 300, align: 'center', halign: 'center', hidden: true},
            { field: 'cvenivpl', title: 'Nivel', width: 80, align: 'center', halign: 'center' },
            { field: 'vigini', title: 'Vig. Inicial', width: 80, align: 'center', halign: 'center' },
            { field: 'vigfin', title: 'Vig. Final', width: 80, align: 'center', halign: 'center' },
            { field: 'hrspla', title: 'Hrs.', width: 70, align: 'center', halign: 'center' },
            { field: 'cveadspl', title: 'Centro Costo', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.descentro + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'descentro', title: 'Des.Centro Costo', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvepagpl', title: 'Pagaduría', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despag + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despag', title: 'Des.Pagaduría', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvezonpl', title: 'Zona', width: 60, align: 'center', halign: 'center'},
            { field: 'cvebanor', title: 'Banco', width: 70, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.nomban + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'nomban', title: 'Nom. Banco', width: 300, align: 'left', halign: 'center', hidden: true },
            { field: 'cuepagor', title: 'Cuenta Banco', width: 130, align: 'center', halign: 'center', hidden: false },
            { field: 'pagplaor', title: 'Tipo Pago', width: 70, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despago + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despago', title: 'Des.Pago', width: 300, align: 'left', halign: 'center', hidden: true },
            { field: 'motspd', title: 'Tipo de Incremento', width: 150, align: 'Center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desmotivo + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'desmotivo', title: 'Des.Incremento', width: 300, align: 'left', halign: 'center', hidden: true },
            { field: 'catant', title: 'Puesto Ant.', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.descatant + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'descatant', title: 'Desc. Puesto Ant.', width: 80, align: 'center', halign: 'center', hidden: true },
            { field: 'anojub', title: 'Año de Jubilación', width: 150, align: 'center', halign: 'center', hidden: false },
            { field: 'porcjubpen', title: '% de Jubilación', width: 150, align: 'center', halign: 'center', hidden: false },
            { field: 'nombenef', title: 'Emp. Beneficiario', width: 300, align: 'left', halign: 'center', hidden: false },
        ]],       
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            //if (dgcontrol == "#dgp") {
            //    rows = $(dgcontrol).datagrid('getSelected');
            //    if (rows) {
            //        numplaza = rows.numplaza;
            //    }
            //}
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }       
    });
}

function CARGAR_DG_PLAZASCANELADAS(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        columns: [[
            { field: 'numplaza', title: 'Plaza', width: 70, align: 'center', halign: 'center' },
            { field: 'numplamag', title: 'Plaza Ant', width: 100, align: 'center', halign: 'center' },
            { field: 'cveesppl', title: 'Estatus Plaza', width: 100, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desesp + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'desesp', title: 'Des.Estatus Plaza', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvepuepl', title: 'Puesto', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despue + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despue', title: 'Des.Puesto', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvenivpl', title: 'Nivel', width: 80, align: 'center', halign: 'center' },
            { field: 'vigini', title: 'Vig. Inicial', width: 80, align: 'center', halign: 'center' },
            { field: 'vigfin', title: 'Vig. Final', width: 80, align: 'center', halign: 'center' },
            { field: 'hrspla', title: 'Hrs.', width: 70, align: 'center', halign: 'center' },
             { field: 'cveadspl', title: 'Centro Costo', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.descentro + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'descentro', title: 'Des.Centro Costo', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvepagpl', title: 'Pagaduría', width: 80, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despag + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despag', title: 'Des.Pagaduría', width: 300, align: 'center', halign: 'center', hidden: true },
            { field: 'cvezonpl', title: 'Zona', width: 60, align: 'center', halign: 'center' },
            { field: 'cvebanor', title: 'Banco', width: 70, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.nomban + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'nomban', title: 'Nom. Banco', width: 300, align: 'left', halign: 'center', hidden: true },
            { field: 'cuepagor', title: 'Cuenta Banco', width: 300, align: 'left', halign: 'center', hidden: false },
            { field: 'pagplaor', title: 'Tipo Pago', width: 70, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despago + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
            { field: 'despago', title: 'Des.Pago', width: 300, align: 'left', halign: 'center', hidden: true },             
            { field: 'Estatus', title: 'Estatus', width: 80, align: 'Center', halign: 'center', hidden: false },
        ]],
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            if (dgcontrol == "#dgp") {
                rows = $(dgcontrol).datagrid('getSelected');
                if (rows) {
                    numplaza = rows.numplaza;
                }
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CARGAR_DG_HISTORIAPAGOS(dgcontrol, objdato) {
    $(dgcontrol).datagrid({
        //columns: [[
        //    { field: 'Plaza', title: 'Plaza', width: 80, align: 'center', halign: 'center' },
        //    { field: 'Empleado', title: 'Empleado', width: 80, align: 'center', halign: 'center' },
        //    { field: 'Percepciones', title: 'Percepciones', width: 100, align: 'right', halign: 'center'},
        //    { field: 'Deducciones', title: 'Deducciones', width: 100, align: 'right', halign: 'center', hidden: false },
        //    { field: 'Neto', title: 'Neto', width: 70, align: 'right', halign: 'center' },
        //    { field: 'Periodo', title: 'Periodo', width: 100, align: 'center', halign: 'center' },
        //    { field: 'Quincena', title: 'Quincena', width: 100, align: 'center', halign: 'center' },
        //    { field: 'Estatus', title: 'Estatus', width: 80, align: 'center', halign: 'center' },            
        //    { field: 'CvePue', title: 'Puesto', width: 80, align: 'center', halign: 'center' },
        //    { field: 'DescPue', title: 'Des.Puesto', width: 300, align: 'Left', halign: 'center', hidden: false },            
        //]],
        data: objdato,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        //fitColumns:true,
        pageSize: 10,        
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            if (dgcontrol == "#dghistpago") {
                rows = $(dgcontrol).datagrid('getSelected');
                if (rows) {
                    numplaza = rows.Plaza;
                    empleado = rows.Empleado;
                    quincena = rows.Quincena;
                }
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

