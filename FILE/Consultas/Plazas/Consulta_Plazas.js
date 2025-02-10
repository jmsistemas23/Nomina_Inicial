var plaza = "";
var numemppl="";
var vcondicion = "";
var filtroAlerta = "";
var contadorNivel = 0;
var filtroavanzado = "";
var strconplaza = "";
var tipo = 'Y';
$(document).ready(function () {   
    $.extend($.fn.datagrid.methods, {
        resetSort: function (jq, param) {
            return jq.each(function () {
                var state = $.data(this, 'datagrid');
                var opts = state.options;
                var dc = state.dc;
                var header = dc.header1.add(dc.header2);
                header.find('div.datagrid-cell').removeClass('datagrid-sort-asc datagrid-sort-desc');
                param = param || {};
                opts.sortName = param.sortName;
                opts.sortOrder = param.sortOrder || 'asc';
                if (opts.sortName) {
                    var names = opts.sortName.split(',');
                    var orders = opts.sortOrder.split(',');
                    for (var i = 0; i < names.length; i++) {
                        var col = $(this).datagrid('getColumnOption', names[i]);
                        header.find('div.' + col.cellClass).addClass('datagrid-sort-' + orders[i]);
                    }
                }
            })
        }
    })
 
   var vplaza = $_GET('plaza');
    if (vplaza != undefined) { plaza = vplaza; }
    else { plaza = ''; }
    var vnumemppl = $_GET('numemppl');
    if (vnumemppl != undefined) { numemppl = vnumemppl; }
    else { numemppl = ''; }
 
    OCULTAR_BOTONES();
    HABILITAR_BOTONES(122);

    if (plaza != "") { LISTAR_NOMINA(); }
    
    $('#btnBuscar').bind('click', function () {       
        CARGAR_PLAZAS('#dgplaza', 100, 200);
        if ($('#chkmantener').is(":checked") == false) {
            CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'numplaza');
            $("#cbocon").combobox('setValue', '=');
        }
        windows("#winemp", 820, 600,false, "Busqueda de Plazas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });
    
    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#btnLFiltro').bind('click', function () { LIMPIAR_FILTRO(); });

    $('#btnhistmov').bind('click', function () {
        if (plaza != "")
        {
            //document.location = "Historia_Movimientos_Plazas.aspx?tipomov=MP&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Historia_Movimientos_Plazas.aspx", "tipomov=MP&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistpagos').bind('click', function () {
        if (plaza != "")
        {
            //document.location = "Historia_Pagos_Plazas.aspx?tipomov=MC&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Historia_Pagos_Plazas.aspx", "tipomov=MC&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistpagesp').bind('click', function () {
        if (plaza != "")
        {
            //document.location = "Historia_Pagos_Especiales_Plazas.aspx?tipomov=ME&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Historia_Pagos_Especiales_Plazas.aspx", "tipomov=ME&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistplaza').bind('click', function () {
        if (plaza != "")
        {
            //document.location = "Historia_Plazas.aspx?plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Historia_Plazas.aspx", "plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistnomina').bind('click', function () {
        if (plaza != "")
        {
            //document.location = "Consulta_Nomina_Plazas.aspx?plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Consulta_Nomina_Plazas.aspx", "plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistinc').bind('click', function () {
        if (plaza != "")
        {
           // document.location = "Historia_Incidencias_Plazas.aspx?tipomov=IL&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P";
            IR_PAGINA("Historia_Incidencias_Plazas.aspx", "tipomov=IL&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });

    $('#btnhistter').bind('click', function () {
        if (plaza != "") {
            //document.location = "Historia_Terceros_Empleados.aspx?tipomov=TR&empleado=" + empleado + "&tipo=E";
            IR_PAGINA("Historia_Terceros_Plazas.aspx", "tipomov=TR&plaza=" + plaza + "&numemppl=" + numemppl + "&tipo=E");
        }
        else { $.messager.alert('Error', "Falta seleccionar el empleado", 'error'); }
    });

    $('#btnImgExpediente').bind('click', function () {
        if (plaza != "")
        {            
            IR_PAGINA("../Consulta_Imagenes_Expedientes.aspx", "plaza=" + plaza + "&empleado=" + numemppl + "&tipo=P");
        }
        else { $.messager.alert('Error', "Falta seleccionar la plaza", 'error'); }
    });
    
    $('#indicadores').accordion('select', 4);
   
    $('#btnBFiltroAvanzado').bind('click', function () { FILTRO_AVANZADO('#btnBFiltroAvanzado'); });
    $('#btnAgregarFiltro').bind('click', function () { agregaFiltro(); });
    $('#btnConsultar').bind('click', function () { formaFiltro(); });
    $('#opcY').bind('click', function () { tipo = 'Y'; });
    $('#opcO').bind('click', function () { tipo = 'O'; });

    $('#divParent, #divParent div')
    $("button").click(function () {
        $("#id").clone().attr('id', 'id' + cloneCount++).insertAfter("#id");
    });

    $('#txtfval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            agregaFiltro();
            $('#txtfval').textbox('setValue', '');
        }
    });

    $('#winfiltro').window({
        onBeforeClose: function () {
            //$.messager.confirm('Confirm', 'Seguro de cerrar los filtros?', function (r) {
            //    if (r) {
            condicion = "";
           if (contadorNivel==0){
           filtroavanzado='';
            CARGAR_DATOS('#dgplaza', 100, 200);
            }
            return true;                    
                //}
                //else { return false; }
            //});
        }
    });

    $('#winemp').window({
        onBeforeClose: function () {                          
            condicion = "";
            return true;            
        }
    });
    $('#chkmantener').bind('click', function () {
        if ($('#chkmantener').is(":checked") == false) {
            CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
            $("#cbocon").combobox('setValue', '=');
        }
    });

});


function OCULTAR_BOTONES() {
    $('#tbtnhistmov').hide();
    $('#tbtnhistpagos').hide();
    //$('#tbtnhistdatper').hide();
    //$('#tbtnhistreffam').hide();
    $('#tbtnhistpagesp').hide();
    $('#tbtnhistinc').hide();
    $('#tbtnhistter').hide();
    $('#tbtnhistplaza').hide();
    $('#tbtnhistnomina').hide();
    //$('#tbtnImgExpediente').hide();
}

function HABILITAR_BOTONES(strconsulta) {
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
                //if (obj[0].HistDatPer == 1) { $('#tbtnhistdatper').show(); }
                //if (obj[0].HistFamRef == 1) { $('#tbtnhistreffam').show(); }
                if (obj[0].HistMovEsp == 1) { $('#tbtnhistpagesp').show(); }
                if (obj[0].HistIncLab == 1) { $('#tbtnhistinc').show(); }
                if (obj[0].HistCapTer == 1) { $('#tbtnhistter').show(); }
                if (obj[0].HistPlazas == 1) { $('#tbtnhistplaza').show(); }
                if (obj[0].HistDetNom == 1) { $('#tbtnhistnomina').show(); }
                // if (obj[0].HistImgExp == 1) { $('#tbtnImgExpediente').show(); }
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
            $.messager.alert('Error', c, 'error');
        }
    });
}

function CARGAR_DATOS(dgcontrol, ancho, alto) {
   
    var filtro = "";
    if (strconplaza != '') {
        if (filtroavanzado != "")
        { filtro = strconplaza + " and " + filtroavanzado; }
        else { filtro = strconplaza; }
    }
    else { filtro = filtroavanzado; }
   
    
    $(dgcontrol).datagrid({       
    url: "Listar_Plazas.aspx?busqueda=" + filtro,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "px",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            var rows = $(dgcontrol).datagrid('getSelected');           
            if (rows) {               
                plaza = rows.numplaza;
                numemppl = rows.numemppl;                
                LISTAR_NOMINA();
                $("#winemp").window('close');
                condicion = "";
                //sessionStorage.setItem("condicion", '');
            }
        },
       
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responsetext, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


function CARGAR_PLAZAS(dgcontrol, ancho, alto) {
   // $(dgcontrol).datagrid('loadData', { "total": 0, "rows": [] });
    var filtro = "";
    if (strconplaza != '') {
        if (filtroavanzado != "")
        { filtro = strconplaza + " and " + filtroavanzado; }
        else { filtro = strconplaza; }
    }
    else { filtro = filtroavanzado; }

    var colsort = "numplaza asc";
    $(dgcontrol).datagrid({
        url: "Listar_Plazas.aspx?busqueda=" + filtro + "&colord=" + colsort,
        pagination: true,
        scroll:true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,
       // width: ancho + "%",
        //heigth: alto + "px",
        //columns: [[
        //    { field: 'numplaza', title: 'Plaza', width: 70, align: 'center', halign: 'center' },
        //    { field: 'numemppl', title: 'Empleado', width: 70, align: 'center', halign: 'center' },
        //    { field: 'rfccompl', title: 'Rfc', width: 110, align: 'center', halign: 'center'},
        //    { field: 'nomcompl', title: 'Nombre', width: 300, align: 'left', halign: 'center'},
        //    { field: 'hrspla', title: 'Horas', width: 60, align: 'center', halign: 'center' },
        //    { field: 'cveesppl', title: 'Estatus', width: 60, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desesp + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
        //    { field: 'desesp', title: 'Des.Estatus', width: 300, align: 'center', halign: 'center', hidden: true },
        //    { field: 'cvepuepl', title: 'Puesto', width: 70, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despue + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
        //    { field: 'despue', title: 'Des.Puesto', width: 300, align: 'center', halign: 'center', hidden: true },
        //    { field: 'cvepagpl', title: 'Pagaduría', width: 90, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.despag + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
        //    { field: 'despag', title: 'Des.Pagaduria', width: 300, align: 'center', halign: 'center', hidden: true },
        //    { field: 'cveadspl', title: 'Adscripción', width: 120, align: 'center', halign: 'center', formatter: function (value, row, index) { return '<span title=\"' + row.desads + '\" class=\"easyui-tooltip\">' + value + '</span>' } },
        //    { field: 'desads', title: 'Des.Adscripcion', width: 300, align: 'center', halign: 'center', hidden: true },
        //    { field: 'cvenivpl', title: 'Nivel', width: 90, align: 'center', halign: 'center' },
        //    { field: 'pagplaor', title: 'Pago', width: 90, align: 'center', halign: 'center' },
        //    { field: 'nombanpapl', title: 'Banco', width: 90, align: 'center', halign: 'center' },
        //    { field: 'movvigini', title: 'Vig. Ini. Mov.', width: 100, align: 'center', halign: 'center' },
        //    { field: 'movvigfin', title: 'Vig. Fin. Mov.', width: 100, align: 'center', halign: 'center' }            
        //]],
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            var rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                plaza = rows.numplaza;
                numemppl = rows.numemppl;
                LISTAR_NOMINA();
                $("#winemp").window('close');                
                strconplaza = "";
            }
        },
        onSortColumn: function (sort, order) {
            colsort = "";
            colsort += sort + ' ' + order + "|";
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LISTAR_EMPLEADOS()
{
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,       
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            //rows = $(dgcontrol).datagrid('getSelected');
            //if (rows) {
            //    rows = $(dgcontrol).datagrid('getSelected');
            //    LISTAR_NOMINA(rows.numplaza);
            //    $("#winemp").window('close');
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

function FORMAR_CONDICION(objcam, objcon, objval) {      
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') {
            objval = objval.replace(/ /g, '|');
            strconplaza = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\'';
        }
        else { strconplaza = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strconplaza = " "; }
    //CARGAR_DATOS('#dgplaza', 100, 200);
    CARGAR_PLAZAS('#dgplaza', 100, 200);

    //CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'rfccompl');
}

function LISTAR_NOMINA() {
    var obj = "";
    var objP = "";
    var objD = "";
    var objA = "";
    var objInd = "";
   
    var parametros = {};
    parametros.plaza = plaza; 
    $.ajax({
        type: "POST",
        url: '../funciones.aspx/Listar_Plaza',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {           
            if (data.d[0] != "") {
                obj = $.parseJSON(data.d[0]);
                objInd = $.parseJSON(data.d[1]);
                objE = $.parseJSON(data.d[2]);                
                if (obj.length > 0) {                   
                    $('#txtplaza').textbox('setValue', obj[0].numplaza);
                    $('#txtempleado').textbox('setValue', obj[0].numemppl);
                    //$('#txtrfc').textbox('setValue', obj[0].rfccompl);                               
                    $('#txtnombre').textbox('setValue', obj[0].nomcompl);

                    $('#txtviginicial').textbox('setValue', obj[0].vigini);
                    $('#txtvigfinal').textbox('setValue', obj[0].vigfin);

                    $('#txtviginicialum').textbox('setValue', obj[0].movvigini);
                    $('#txtvigfinalum').textbox('setValue', obj[0].movvigfin);

                    $('#txtestatus').textbox('setValue', obj[0].cveesppl);
                    $('#txttipoplaza').textbox('setValue', obj[0].cvetpl);
                    $('#txtestprog').textbox('setValue', obj[0].ur);
                    $('#txtadscripcion').textbox('setValue', obj[0].cveads);
                    $('#txtpagaduria').textbox('setValue', obj[0].cvepag);
                    $('#txtpuesto').textbox('setValue', obj[0].cvepue);
                    $('#txtpuestoant').textbox('setValue', obj[0].cvepueant);

                    $('#txtnivel').textbox('setValue', obj[0].cvenivpl);
                    $('#txtgpojer').textbox('setValue', obj[0].cvejerpl);
                    $('#txttipoinc').textbox('setValue', obj[0].tipoincremento);

                    $('#txttippago').textbox('setValue', obj[0].pagplaor);
                    $('#txtbanco').textbox('setValue', obj[0].cvebanor);
                    $('#txtcuenta').textbox('setValue', obj[0].cuepagor);
                    $('#txtquinquenio').textbox('setValue', obj[0].quinque);                    
                    $('#txtzona').textbox('setValue', obj[0].cvezonpl);
                    $('#txtdiaspago').textbox('setValue', obj[0].diaspag);                                        
                    $('#txtporjub').textbox('setValue', obj[0].porcjubpen);
                    $('#txtanojub').textbox('setValue', obj[0].anojub);
                    $('#txtbenef').textbox('setValue', obj[0].nombenef);
                  

                    
                    

                    $('#txtIndPPer').textbox('setValue', objInd[0].cadperper);
                    $('#txtIndDPer').textbox('setValue', objInd[0].caddedper);
                    $('#txtIndAPer').textbox('setValue', objInd[0].cadaportper);

                    $('#txtIndPNiv').textbox('setValue', objInd[0].cadpernipl);
                    $('#txtIndDNiv').textbox('setValue', objInd[0].caddednipl);
                    $('#txtIndANiv').textbox('setValue', objInd[0].cadapniv);

                    $('#txtIndPPl').textbox('setValue', objInd[0].cadperpl);
                    $('#txtIndDPl').textbox('setValue', objInd[0].caddedpl);
                    $('#txtIndAPl').textbox('setValue', objInd[0].cadapoper);

                    $('#txtIndPAds').textbox('setValue', objInd[0].cadperadpl);
                    $('#txtIndDAds').textbox('setValue', objInd[0].caddedadpl);
                    $('#txtIndAAds').textbox('setValue', objInd[0].cadapads);

                }

                if (objE.length > 0) {                 
                    CARGAR_DG("#dgemp", objE);
                }              
            }
        },
        error: function (er) {
            $('#loading').hide(100);
            alert(er.responseText);
            //$.messager.alert('Error', err.responseText, 'error');           
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function LIMPIAR_DATOS() {
    $('#txtplaza').textbox('setValue', '');
    $('#txtempleado').textbox('setValue', '');
    $('#txtrfc').textbox('setValue', '');
    //$('#txtcurp').textbox('setValue', '');
    $('#txtnombre').textbox('setValue', '');
    $('#txtadscripcion').textbox('setValue', '');
    $('#txtpagaduria').textbox('setValue', '');
    $('#txtestprog').textbox('setValue', '');
    $('#txtpuesto').textbox('setValue', '');
    $('#txtzona').textbox('setValue', '');
    $('#txtestatus').textbox('setValue', '');
    $('#txthrplaza').textbox('setValue', '');
    $('#txtquinquenio').textbox('setValue', '');
    $('#txtnivsal').textbox('setValue', '');
   // $('#txttipopue').textbox('setValue', '');
    $('#txtnivant').textbox('setValue', '');
    $('#txttippago').textbox('setValue', '');
    $('#txtbanco').textbox('setValue', '');
    $('#txtcuenta').textbox('setValue', '');
    $('#txttipocta').textbox('setValue', '');
    $('#txttipoplaza').textbox('setValue', '');
    //$('#txtsucursal').textbox('setValue', '');
    //$('#txtctaclabe').textbox('setValue', '');
    $('#txtdiaspago').textbox('setValue', '');
    $('#txtdiasretro').textbox('setValue', '');
    $('#txtrecibo').textbox('setValue', '');
    $('#txtcheque').textbox('setValue', '');
    //$('#txtbasegrab').textbox('setValue', '');
    //$('#txtnss').textbox('setValue', '');
    $('#txtgpojer').textbox('setValue', '');
    $('#txtestatuspag').textbox('setValue', '');
    $('#txtperpag').textbox('setValue', '');
    $('#txtperret').textbox('setValue', '');
    $('#txtisr').textbox('setValue', '');

    $('#txtviginicial').textbox('setValue', '');
    $('#txtvigfinal').textbox('setValue','');

    $('#txtIndPPer').textbox('setValue', '');
    $('#txtIndDPer').textbox('setValue', '');
    $('#txtIndAPer').textbox('setValue', '');

    $('#txtIndPNiv').textbox('setValue', '');
    $('#txtIndDNiv').textbox('setValue', '');
    $('#txtIndANiv').textbox('setValue', '');

    $('#txtIndPPl').textbox('setValue', '');
    $('#txtIndDPl').textbox('setValue', '');
    $('#txtIndAPl').textbox('setValue', '');

    $('#txtIndPAds').textbox('setValue', '');
    $('#txtIndDAds').textbox('setValue', '');
    $('#txtIndAAds').textbox('setValue', '');

    $('#dgemp').datagrid('loadData', { "total": 0, "rows": [] });

    $('#indicadores').accordion('select', 4);
}

function CARGAR_QUINCENAS(ddlobj) {
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
        pageSize: 20,        
        beforeSend: function () {
            $('#loading').show();
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function FILTRO_AVANZADO(objbtn) {
    if ($(objbtn).linkbutton('options').disabled) { return false; }
    else
    {
        CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbofcam', 'numplaza');
        windows("#winfiltro", 730, 400,false, 'Busqueda Avanzada');

        $('#cb').hide();
        $('#dt').hide();
        $('#txt').show();
    }
}

function agregaFiltro() {
    var condicion = "";   
    if ($('#cbofcam').combobox('getValue') != 'x' && $('#txtfval').textbox('getValue') != '') {

        var txt = '[' + $('#cbofcam').combobox('getText') + '] ' + $('#cbofcon').combobox('getText') + ' [' + $('#txtfval').textbox('getValue') + ']';
        if ($('#cbofcon').combobox('getValue') == 'like') {
            condicion = $('#cbofcam').combobox('getValue') + ' ' + $('#cbofcon').combobox('getValue') + ' |i|' + $('#txtfval').textbox('getValue') + '|d|';
        } else {
            condicion = $('#cbofcam').combobox('getValue') + ' ' + $('#cbofcon').combobox('getValue') + ' ||' + $('#txtfval').textbox('getValue') + '||';
        }

        contadorNivel++;
        var nuevaFila = document.all("tblCondicion").insertRow();
        var celda = nuevaFila.insertCell();        
        celda.innerHTML = "<input type='text' id='cond" + contadorNivel + "' style='width:550px;'>";
        celda = nuevaFila.insertCell();        
        celda.innerHTML = "<input type='text' id='yo" + contadorNivel + "' style='width:20px;'>";
        celda = nuevaFila.insertCell();
        celda.innerHTML = "<input id=btn" + contadorNivel + " type='button' value='Eliminar' onclick='eliminaFiltro(this);'/>";

        $('#cond' + contadorNivel).textbox({
            value: condicion,
            readonly: true
        });
        $('#cond' + contadorNivel).textbox('setText', txt);

        $('#yo' + contadorNivel).textbox({
            value: ((tipo == 'Y') ? 'And' : 'Or'),
            readonly: true
        });
        $('#yo' + contadorNivel).textbox('setText', tipo);

        $('#btn' + contadorNivel).linkbutton({
            width: 90 + "px",
            height: 25 + "px"
        });
    }
}

function formaFiltro() {
    var tmp;
    var condicion = "";
    for (i = 1; i <= contadorNivel; i++) {
        var V=document.getElementById('cond' + i)
        if (document.getElementById('cond' + i) != null) {
            tmp = document.getElementById('cond' + i).value + '  ' + document.getElementById('yo' + i).value + ' ';
            if (tmp.indexOf('||') > -1) { tmp = tmp.replace('||', '\'\''); tmp = tmp.replace('||', '\'\''); }
            else { tmp = tmp.replace('|i|', '\'\'|'); tmp = tmp.replace('|d|', '|\'\''); }
            condicion += tmp;
        }
    }    
  
    if (condicion.length > 0) {
        condicion = condicion.substring(0, condicion.length - 5);
        filtroavanzado=condicion;
        CARGAR_DATOS('#dgplaza', 100, 200);
        $("#winfiltro").window('close');
    }
    else
    {
        filtroavanzado='';
        CARGAR_DATOS('#dgplaza', 100, 200);
        $("#winfiltro").window('close');
    }
}

function eliminaFiltro(src) {
    var oRow = src.parentElement.parentElement;
    document.all("tblCondicion").deleteRow(oRow.rowIndex);
    contadorNivel -= 1;
}

function LIMPIAR_FILTRO()
{
    $("#cbocon").combobox('setValue','like');
    $("#txtval").textbox('setValue', '');
    CARGAR_CAMPOSBUSQUEDAS('#dgplaza', '#cbocam', 'rfccompl');
    FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue'));

    //limpiar el orden de columnas
    //$('#dg').datagrid('resetSort');

}

