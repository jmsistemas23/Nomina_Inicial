var PlazaPadre = "", vigini = "", tipoPlazaSeleccionada = "", hrspadre = "";

$(document).ready(function () {
    $('#potras').hide();

    $('#aNormal').bind('click', function () { CREAR_PLAZA('PN', 'PLAZA NORMAL'); });
    $('#aSustituta').bind('click', function () { BUSCAR_PLAZAS(); });
    $('#aOtras').bind('click', function () {
        $('#pinicial').hide();
        $('#potras').show();
    });
    $('#aHonorarios').bind('click', function () { CREAR_PLAZA('H', 'PLAZA DE HONORARIOS'); });
    $('#aInterinos').bind('click', function () { CREAR_PLAZA('I', 'PLAZA DE INTERINOS'); });
    $('#aPasantes').bind('click', function () { CREAR_PLAZA('P', 'PLAZA DE PASANTES'); });
    $('#aResidentes').bind('click', function () { CREAR_PLAZA('R', 'PLAZA DE RESIDENTES'); });
    //$('#aContratos').bind('click', function () { CREAR_PLAZA('C', 'PLAZA DE CONTRATOS'); });
    //$('#aNoEmpleados').bind('click', function () { CREAR_PLAZA('NE', 'PLAZA DE NO EMPLEADOS'); });
    $('#aSuplencias').bind('click', function () { CREAR_PLAZA('S', 'PLAZA DE SUPLENCIAS'); });

    $('#aRegresar').bind('click', function () {
        $('#pinicial').show();
        $('#potras').hide();
    });



    $('#btnRmenu').bind('click', function () { REGRESAR_MENU(); });
    $('#btnLimpiar').bind('click', function () { LIMPIAR(); });
    $('#btnguardar').bind('click', function () { VALIDAR_DATOS(); });


    Cargar_Combo('#cbovacancia', "UtileriasBD.aspx/TipoVacantes");
    Cargar_Combo('#cboTipoPlaza', "UtileriasBD.aspx/TipoPlazas");
   

    $('#dtpVigIni').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#dtpVigFin').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });   
    

    $('#txtvalplaza').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            CARGAR_GRID('');
        }
    });
    $('#btnBplaza').bind('click', function () {
        CARGAR_GRID('');
    });
   
    $('#txtprograma').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_PROGRAMA($('#txtprograma').textbox('getValue'));
            $('#modalBuscarPrograma').window('open');
        }
    });
    $('#txtBusquedaPrograma').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_PROGRAMA($('#txtBusquedaPrograma').textbox('getValue')); }
        }
    });
    $('#btnBPrograma').bind('click', function () { LISTAR_PROGRAMA(''); });
    $('#btnBuscarprograma').bind('click', function () { MOSTAR_PROGRAMA(); });
    $('#btnLimpiarprograma').bind('click', function () { LIMPIAR_VALORES('prog'); });

    $('#txtcveads').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {                           
            LISTAR_ADSCRIPCION($('#txtcveads').textbox('getValue'));
            $('#modalBuscarAdscripcion').window('open');           
        }
    });
    $('#txtBusquedaAdscripcion').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_ADSCRIPCION($('#txtBusquedaAdscripcion').textbox('getValue')); }
        }
    });
    $('#btnBAdscripcion').bind('click', function () { LISTAR_ADSCRIPCION(''); });
    $('#btnBuscarads').bind('click', function () { MOSTAR_ADSCRIPCION(); });
    $('#btnLimpiarads').bind('click', function () { LIMPIAR_VALORES('ads'); });
   
    $('#txtcveetp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_ESTRUC_PROG($('#txtcveetp').textbox('getValue'));
            $('#modalBuscarEstruProg').window('open');
        }
    });
    $('#txtBuscarEstruProg').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_ESTRUC_PROG($('#txtBuscarEstruProg').textbox('getValue')); }
        }
    });
    $('#btnBEstrucprog').bind('click', function () { LISTAR_ESTRUC_PROG(''); });
    $('#btnBuscaretp').bind('click', function () { MOSTAR_ESTRUC_PROG(); });
    $('#btnLimpiaretp').bind('click', function () { LIMPIAR_VALORES('etp'); });

    $('#txtcvezp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_PAGADURIA($('#txtcvezp').textbox('getValue'));
            $('#modalBuscarPagaduria').window('open');
        }
    });
    $('#txtBuscarPagaduria').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_PAGADURIA($('#txtBuscarPagaduria').textbox('getValue')); }
        }
    });
    $('#btnBPagaduria').bind('click', function () { LISTAR_PAGADURIA(''); });
    $('#btnBuscarzp').bind('click', function () { MOSTRAR_PAGADURIA(); });
    $('#btnLimpiarzp').bind('click', function () { LIMPIAR_VALORES('zp'); });

    $('#txtcvepuesto').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_PUESTO($('#txtcvepuesto').textbox('getValue'));
            $('#modalBuscarPuesto').window('open');
        }
    });
    $('#txtBusquedaPuesto').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_PUESTO($('#txtBusquedaPuesto').textbox('getValue')); }
        }
    });
    $('#btnBPuesto').bind('click', function () { LISTAR_PUESTO(''); });
    $('#btnBuscarpuesto').bind('click', function () { MOSTRAR_PUESTO(); });
    $('#btnLimpiarpuesto').bind('click', function () { LIMPIAR_VALORES('pu'); });

    //$('#txtnivel').textbox('textbox').bind('keydown', function (e) {
    //    if (e.keyCode == 13) {
    //        LISTAR_PUESTO($('#txtnivel').textbox('getValue'));
    //        $('#modalBuscarSubNivel').window('open');
    //    }
    //});
    //$('#txtBusquedaForSubNivel').textbox('textbox').bind('keydown', function (e) {
    //    if (e.keyCode == 13) {
    //        { LISTAR_PUESTO($('#txtBusquedaForSubNivel').textbox('getValue')); }
    //    }
    //});
    //$('#btnBNivel').bind('click', function () { LISTAR_NIVEL(''); });
    //$('#btnBuscarnivel').bind('click', function () { MOSTRAR_NIVEL(); });
    //$('#btnLimpiarnivel').bind('click', function () { LIMPIAR_VALORES('nr'); });

    $('#txtcvegrupoman').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_GRUPOMANDO($('#txtcvegrupoman').textbox('getValue'));
            $('#modalBuscarGpoMando').window('open');
        }
    });
    $('#txtBusquedaPrograma').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_GRUPOMANDO($('#txtBusquedaGpoMando').textbox('getValue')); }
        }
    });
    $('#btnBGpoMan').bind('click', function () { LISTAR_GRUPOMANDO(''); });
    $('#btnBgpoman').bind('click', function () { MOSTAR_GRUPOMANDO(); });
    $('#btnLgpoman').bind('click', function () { LIMPIAR_VALORES('gm'); });

    $('#txtcvenivelresp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_NIVRESP($('#txtcvenivelresp').textbox('getValue'));
            $('#modalBuscarNivRes').window('open');
        }
    });
    $('#txtBusquedaNivRes').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_NIVRESP($('#txtBusquedaNivRes').textbox('getValue')); }
        }
    });
    $('#btnBNivRes').bind('click', function () { LISTAR_NIVRESP(''); });
    $('#btnBnivelresp').bind('click', function () { MOSTAR_NIVRESP(); });
    $('#btnLnivelresp').bind('click', function () { LIMPIAR_VALORES('nr'); });

    $('#txtsubniv').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_SUBNIVEL($('#txtsubniv').textbox('getValue'));
            $('#modalSubNivel').window('open');
        }
    });
    $('#txtBuscarCveSubNivel').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_SUBNIVEL($('#txtBuscarCveSubNivel').textbox('getValue')); }
        }
    });
    $('#btnBSubNivel').bind('click', function () { LISTAR_SUBNIVEL(''); });
    $('#btnBsubnivel').bind('click', function () { MOSTAR_SUBNIVEL(); });
    $('#btnLsubnivel').bind('click', function () { LIMPIAR_VALORES('sn'); });

    $('#txtcveforisr').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_ISR($('#txtcveforisr').textbox('getValue'));
            $('#modalBuscarForISR').window('open');
        }
    });
    $('#txtBusquedaForISR').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_ISR($('#txtBusquedaForISR').textbox('getValue')); }
        }
    });
    $('#btnBisr').bind('click', function () { LISTAR_ISR(''); });
    $('#btnbforisr').bind('click', function () { MOSTRAR_ISR(); });
    $('#btnlforisr').bind('click', function () { LIMPIAR_VALORES('isr'); });


    $('#txtcodniv').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            LISTAR_CODIGONIVEL($('#txtcodniv').textbox('getValue'));
            $('#ModalBuscarCodigoNivel').window('open');
        }
    });
    $('#txtBusquedaCodNiv').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { LISTAR_CODIGONIVEL($('#txtBusquedaCodNiv').textbox('getValue')); }
        }
    });
    $('#btnBconNiv').bind('click', function () { MOSTAR_CODIGONIVEL(); });
    $('#btnLconNiv').bind('click', function () { LIMPIAR_VALORES('cn'); });

 
    if (tipoPlazaSeleccionada == "H") {
        $('#btnBconNiv').show();
        $('#btnLconNiv').show();               
    }
    else {
        $('#btnBconNiv').hide();
        $('#btnLconNiv').hide();
    }

        $('#cboTipoPlaza').combobox({
            onSelect: function (rec) {
                if (rec.clave != "x") {
                    if ((rec.clave == "H") && (tipoPlazaSeleccionada == "H")) {
                        $('#btnBconNiv').show();
                        $('#btnLconNiv').show();
                    }
                    else {
                        $('#btnBconNiv').hide();
                        $('#btnLconNiv').hide();
                    }
                }
                else {
                    $('#btnBconNiv').hide();
                    $('#btnLconNiv').hide();
                }
            },
        });
});

function Cargar_Combo(objddl, url) {

    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'clave',
                textField: 'nombre',
                editable: false
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CREAR_PLAZA(tipo,descripcion) {
    $('#btnBuscar').hide();
    tipoPlazaSeleccionada = tipo;
    $('#dmenu').hide();
    $('#dinicial').show();    
    document.getElementById('lblplazas').innerHTML = descripcion;
    plazapadre = "";
    $('#dtpVigIni').textbox('setValue', vigini);
}

function BUSCAR_PLAZAS() {
    $('#txtvalplaza').textbox('setValue', "");
    $('#btnBuscar').show();
    tipoPlazaSeleccionada = "S";
    $('#dmenu').hide();
    $('#dinicial').show();
    document.getElementById('lblplazas').innerHTML = 'PLAZA SUSTITUTA';

    $('#dtpVigIni').textbox('setValue', vigini);
    
    CARGAR_GRID('');

    $('#modalBuscarPlaza').window('open');
    var text = $('#txtvalplaza');
    text.textbox('clear').textbox('textbox').focus();
}

function REGRESAR_MENU() {
    LIMPIAR();
    $('#lblPlazaOrigenEnSustituta').html('');
    $('#dmenu').show();
    $('#dinicial').hide();
    document.getElementById('lblplazas').innerHTML = '';
}

function CARGAR_GRID() {
    var condicion = "";
    var vvalor = $('#txtvalplaza').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbocampl').combobox('getValue');
        var vcondicion = $('#cboconpl').combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
        }
        else { condicion = ""; }
    }
    else { condicion = ""; }

    LISTAR_PLAZAS(condicion);
}

function LISTAR_PLAZAS(condicion) {

    $('#tblBusquedaDePlaza').datagrid({
        url: 'listarPlazas.aspx?busqueda=' + condicion,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDePlaza').datagrid('getSelected');            
            PlazaPadre = row.numplaza;
            $('#cboTipoPlaza').combobox('setValue', row.cvetpl);           
            $('#lblPlazaOrigenEnSustituta').html('Plaza Madre: ' + row.numplaza + ' (Empleado: ' + row.numemppl + ')');            
            $('#modalBuscarPlaza').window('close');
           // $('#cboTipoPlaza').combobox({ readonly: true });

            MOSTRAR_DATOS_PLAZAMADRE(row.numplaza);
        }
    });
    CARGAR_CAMPOSBUSQUEDA('#tblBusquedaDePlaza', '#cbocampl');
}

function MOSTRAR_DATOS_PLAZAMADRE(plazamadre) {
    var obj = "";
    var parametros = {};
    parametros.plazamadre = plazamadre;
    $.ajax({
        type: "POST",
        url: "UtileriasBD.aspx/Mostrar_PlazaMadre",
        dataType: "json",
        data: JSON.stringify(parametros),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            obj = $.parseJSON(data.d[1]);

            
            $('#txtPlazaAnt').textbox('setValue', obj[0].numplamag);

            $('#txtcveads').textbox('setValue', obj[0].cveadspl);
            $('#txtdesads').textbox('setValue', obj[0].desads);

            $('#txtcveetp').textbox('setValue', obj[0].estrucprog);
            $('#txtdesetp').textbox('setValue', obj[0].desestpr);

            $('#txtprograma').textbox('setValue', obj[0].nocontrato);
            $('#txtdesprograma').textbox('setValue', obj[0].descontrato);

            $('#txtcvezp').textbox('setValue', obj[0].cvepagpl);
            $('#txtdeszp').textbox('setValue', obj[0].despag);

            $('#txtcvepuesto').textbox('setValue', obj[0].cvepuepl);
            $('#txtdespuesto').textbox('setValue', obj[0].despue);

            $('#txtcvetippue').textbox('setValue', obj[0].codpue);
            //$('#txthora').textbox('setValue', obj[0].destip);
            $('#txthoras').textbox('setValue', obj[0].hrspla);
            $('#txtcvegpojer').textbox('setValue', obj[0].cvejerpl);
            $('#txtdesgpojer').textbox('setValue', obj[0].desjer);
            $('#txtcvegpolab').textbox('setValue', obj[0].cvelabpl);
            $('#txtdesgpolab').textbox('setValue', obj[0].deslab);
            $('#txtcodniv').textbox('setValue', obj[0].codnivpl);
            $('#txtnivel').textbox('setValue', obj[0].cvenivpl);
            $('#txtzona').textbox('setValue', obj[0].cvezonpl);

            $('#txtsubniv').textbox('setValue', obj[0].cvenispl);
            $('#txtdessubniv').textbox('setValue', obj[0].desnis);

            $('#txtcvegrupoman').textbox('setValue', obj[0].cvegmapl);
            $('#txtdesgrupoman').textbox('setValue', obj[0].desgma);

            $('#txtcvenivelresp').textbox('setValue', obj[0].cvegrepl);
            $('#txtdesnivelresp').textbox('setValue', obj[0].desgre);

            $('#txtcveforisr').textbox('setValue', obj[0].cveforISRpl);
            $('#txtdesforisr').textbox('setValue', obj[0].desforISR);

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

function LIMPIAR() {
    $("#txtNoPlazas").numberbox('clear');
    $("#txtNoAutorizacion").textbox('setValue', '');
    $("#dtpVigIni").textbox('setValue', '');
    $("#dtpVigFin").textbox('setValue', '');
    $("#cboTipoPlaza").combobox('setValue', 'x');
    $("#cboTipoPago").combobox('setValue', 'Q');
    $("#txtsueldo").textbox('setValue', '');
    $("#txtObservaciones").textbox('setValue', '');
    //limpiar valores puesto
    $('#txtcvepuesto').textbox('setValue', '');
    $('#txtdespuesto').textbox('setValue', '');
    $('#txtcvetippue').textbox('setValue', '');
    $('#txthora').textbox('setValue', '');
    $('#txtcvegpojer').textbox('setValue', '');
    $('#txtdesgpojer').textbox('setValue', '');
    $('#txtcvegpolab').textbox('setValue', '');
    $('#txtdesgpolab').textbox('setValue', '');
    $('#txtcodniv').textbox('setValue', '');
    $('#txtsubniv').textbox('setValue', '');
    $('#txtdessubniv').textbox('setValue', '');
    //limpiar valores detalle
    
    $('#txtprograma').textbox('setValue', '');
    $('#txtdesprograma').textbox('setValue', '');
    $('#txtcveads').textbox('setValue', '');
    $('#txtdesads').textbox('setValue', ''); 
    $('#txtcvezp').textbox('setValue', '');
    $('#txtdeszp').textbox('setValue', '');
    $('#txtcveetp').textbox('setValue', '');
    $('#txtdesetp').textbox('setValue', '');
    $('#txtzona').textbox('setValue', '');
    $('#txtcvegrupoman').textbox('setValue', '');
    $('#txtdesgrupoman').textbox('setValue', '');
    $('#txtcvenivelresp').textbox('setValue', '');
    $('#txtdesnivelresp').textbox('setValue', '');
    $('#txtcveforisr').textbox('setValue', '');
    $('#txtdesforisr').textbox('setValue', '');
   // $('#txtnivel').textbox('setValue', '');
    $('#txthoras').textbox('setValue', '');
    $('#txtSueldoPer').textbox('setValue', '');
    $('#txtPlazaAnt').textbox('setValue', '');
}

function LIMPIAR_VALORES(tipo) {
    if (tipo == 'pue') {
        $('#txtcvepuesto').textbox('setValue', '');
        $('#txtdespuesto').textbox('setValue', '');
        $('#txtcvetippue').textbox('setValue', '');
        //$('#txthora').textbox('setValue', '');
        $('#txtcvegpoman').textbox('setValue', '');
        $('#txtcvegpojer').textbox('setValue', '');
        $('#txtdesgpojer').textbox('setValue', '');
        $('#txtdesgpoman').textbox('setValue', '');
        $('#txtcvegpolab').textbox('setValue', '');
        $('#txtdesgpolab').textbox('setValue', '');
        $('#txtcodniv').textbox('setValue', '');
        $('#cboSubnivel').combobox('setValue', '');
    }
    if (tipo == 'prog') {
        $('#txtprograma').textbox('setValue', '');
        $('#txtdesprograma').textbox('setValue', '');
    }
    if (tipo == 'ads') {
        $('#txtcveads').textbox('setValue', '');
        $('#txtdesads').textbox('setValue', '');
        $('#txtzona').textbox('setValue', '');
    }
    if (tipo == 'etp') {
        $('#txtcveetp').textbox('setValue', '');
        $('#txtdesetp').textbox('setValue', '');
    }
    if (tipo == 'pu') {
        $('#txtcvepuesto').textbox('setValue', '');
        $('#txtdespuesto').textbox('setValue', '');
    }
    if (tipo == 'zp') {
        $('#txtcvezp').textbox('setValue', '');
        $('#txtdeszp').textbox('setValue', '');
        $('#txtzona').textbox('setValue', '');
    }
    if (tipo == 'gm') {
        $('#txtcvegrupoman').textbox('setValue', '');
        $('#txtdesgrupoman').textbox('setValue', '');
    }
    if (tipo == 'nr') {
        $('#txtcvenivelresp').textbox('setValue', '');
        $('#txtdesnivelresp').textbox('setValue', '');
    }
    if (tipo == 'sn') {
        $('#txtsubniv').textbox('setValue', '');
        $('#txtdessubniv').textbox('setValue', '');
    }
    if (tipo == 'isr') {
        $('#txtcveforisr').textbox('setValue', '');
        $('#txtdesforisr').textbox('setValue', '');
    }
    if (tipo == 'cn') {
        $('#txtcodniv').textbox('setValue', '');
    }
}

function MOSTAR_CODIGONIVEL() {
    var text = $('#txtBusquedaCodNiv');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_CODIGONIVEL('');
    $('#ModalBuscarCodigoNivel').window('open');
}
function LISTAR_CODIGONIVEL(filtro) {
    if (filtro != "") { $('#txtBusquedaCodNiv').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaCodNiv').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }


    $('#tblBuscarCodNiv').datagrid({
        url: 'ListarCodigoNivel.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBuscarCodNiv').datagrid('getSelected');
            $('#txtcodniv').textbox('setValue', row.Clave);            
            $('#ModalBuscarCodigoNivel').window('close');
        }
    });
}

function MOSTAR_PROGRAMA() {
    var text = $('#txtBusquedaPrograma');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_PROGRAMA('');
    $('#modalBuscarPrograma').window('open');
}
function LISTAR_PROGRAMA(filtro) {
    if (filtro != "") { $('#txtBusquedaPrograma').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaPrograma').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }


    $('#tblBusquedaDePrograma').datagrid({
        url: 'listarPrograma.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDePrograma').datagrid('getSelected');
            $('#txtprograma').textbox('setValue', row.Clave);
            $('#txtdesprograma').textbox('setValue', row.Descripcion);
            $('#modalBuscarPrograma').window('close');
        }
    });
}

function MOSTAR_ADSCRIPCION() {
    var text = $('#txtBusquedaAdscripcion');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_ADSCRIPCION('');
    $('#modalBuscarAdscripcion').window('open');
}
function LISTAR_ADSCRIPCION(filtro) {    
    if (filtro != "") { $('#txtBusquedaAdscripcion').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaAdscripcion').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

   
    $('#tblBusquedaDeAdscripcion').datagrid({
        url: 'listarAdscripcion.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeAdscripcion').datagrid('getSelected');
            $('#txtcveads').textbox('setValue', row.Clave);
            $('#txtdesads').textbox('setValue', row.Descripcion);
            $('#txtzona').textbox('setValue', row.Zona);
            $('#modalBuscarAdscripcion').window('close');
        }
    });
}

function MOSTAR_ESTRUC_PROG() {
    var text = $('#txtBuscarEstruProg');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_ESTRUC_PROG('');
    $('#modalBuscarEstruProg').window('open');
}
function LISTAR_ESTRUC_PROG(filtro) {
    if (filtro != "") { $('#txtBuscarEstruProg').textbox('setValue', filtro); }
    else { filtro = $('#txtBuscarEstruProg').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }


    $('#tblBusquedaDeEstrucProg').datagrid({
        url: 'listarEstPro.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeEstrucProg').datagrid('getSelected');
            $('#txtcveetp').textbox('setValue', row.Clave);
            $('#txtdesetp').textbox('setValue', row.Descripcion);
            $('#modalBuscarEstruProg').window('close');
        }
    });
}

function MOSTRAR_PAGADURIA() {
    var text = $('#txtBuscarPagaduria');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_PAGADURIA('');
    $('#modalBuscarPagaduria').window('open');
}
function LISTAR_PAGADURIA(filtro) {
    if (filtro != "") { $('#txtBuscarPagaduria').textbox('setValue', filtro); }
    else { filtro = $('#txtBuscarPagaduria').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

    $('#tblBusquedaDePagaduria').datagrid({
        url: 'listarPagadurias.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDePagaduria').datagrid('getSelected');
            $('#txtcvezp').textbox('setValue', row.Clave);
            $('#txtdeszp').textbox('setValue', row.Descripcion);
            $('#modalBuscarPagaduria').window('close');
        }
    });
}

function MOSTRAR_PUESTO() {
    var text = $('#txtBusquedaPuesto');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_PUESTO('');
    $('#modalBuscarPuesto').window('open');
}
function LISTAR_PUESTO(filtro) {
    if (filtro != "") { $('#txtBusquedaPuesto').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaPuesto').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

    $('#tblBusquedaDePuestos').datagrid({
        url: 'listarPuestos.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDePuestos').datagrid('getSelected');
            $('#txtcvepuesto').textbox('setValue', row.Clave);
            $('#txtdespuesto').textbox('setValue', row.Descripcion);
            $('#txtcvetippue').textbox('setValue', row.Tipo_Puesto);
            $('#txtcodniv').textbox('setValue', row.Codigo_Nivel);
            $('#txtcvegpojer').textbox('setValue', row.Grupo_Jerarquico);
            $('#txtdesgpojer').textbox('setValue', row.Des_Jerarquico);            
            $('#txtcvegpolab').textbox('setValue', row.Grupo_Laboral);
            $('#txtdesgpolab').textbox('setValue', row.Des_Laboral);            
            $('#modalBuscarPuesto').window('close');
        }
    });
}

function MOSTRAR_NIVEL() {
    if ($('#txtcodniv').textbox("getValue") == '') { $.messager.alert('Error', 'Falta el código del nivel', 'error'); return 0 }
    else
        if ($('#txtzona').textbox("getValue") == '') { $.messager.alert('Error', 'Falta la zona ligada a la adscripción', 'error'); return 0 }
        else
        {
            var text = $('#txtBusquedaForSubNivel');
            text.textbox('clear').textbox('textbox').focus();

            LISTAR_NIVEL();
            $('#modalBuscarSubNivel').window('open');
        }
}
function LISTAR_NIVEL() {
    //if ($('#txtcodniv').textbox("getValue") != null && $('#txtcodniv').textbox("getValue").trim() != '') {
    var cols = $('#hidColumnasDeSubNivel').val();
    $('#tblBusquedaDeForSubNivel').datagrid({
        url: 'listarForSubNivel.aspx?nivel=' + $('#txtcodniv').textbox("getValue") + '&zona=' + $('#txtzona').textbox("getValue") + '&columnas=' + cols,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeForSubNivel').datagrid('getSelected');
            $('#txtsubniv').textbox("setValue", row.cvenisni);
            $('#txtzona').textbox("setValue", row.cvezonns);
            $('#txtcvegrupoman').textbox("setValue", row.cvegmani);
            $('#txtdesgrupoman').textbox("setValue", row.desgma);
            $('#txtcvenivelresp').textbox("setValue", row.cvegreni);
            $('#txtdesnivelresp').textbox("setValue", row.desgre);
            $('#txtsubniv').textbox("setValue", row.cvenisni);
            $('#txtdessubniv').textbox("setValue", row.desnis);
            $('#txtnivel').textbox("setValue", row.cveniv);

            $('#modalBuscarSubNivel').window('close');
        }
    });
    //}
}

function MOSTRAR_ISR() {
    var text = $('#txtBusquedaForISR');
    text.textbox('clear').textbox('textbox').focus();

    LISTAR_ISR();
    $('#modalBuscarForISR').window('open');
}
function LISTAR_ISR() {
    if (!$('#divTableDatosDeForISR').is(':hidden'))
        $('#divTableDatosDeForISR').toggle(1000);


    $('#tblBusquedaDeForISR').datagrid({
        url: 'listarForISR.aspx?busqueda=' + document.getElementById('txtBusquedaForISR').value,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        onClickRow: function () {
            var row = $('#tblBusquedaDeForISR').datagrid('getSelected');
            $('#txtcveforisr').textbox('setValue', row.Clave);
            $('#txtdesforisr').textbox('setValue', row.Descripcion);
            $('#modalBuscarForISR').window('close');
            $('#divTableDatosDeForISR').toggle(300);
        }
    });
}

function MOSTAR_GRUPOMANDO() {
    var text = $('#txtBusquedaGpoMando');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_GRUPOMANDO('');
    $('#modalBuscarGpoMando').window('open');
}
function LISTAR_GRUPOMANDO(filtro) {
    if (filtro != "") { $('#txtBusquedaGpoMando').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaGpoMando').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }


    $('#tblBusquedaDeGpoMando').datagrid({
        url: 'listarGpoMando.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeGpoMando').datagrid('getSelected');
            $('#txtcvegrupoman').textbox('setValue', row.Clave);
            $('#txtdesgrupoman').textbox('setValue', row.Descripcion);
            $('#modalBuscarGpoMando').window('close');
        }
    });
}

function MOSTAR_NIVRESP() {
    var text = $('#txtBusquedaGpoMando');
    text.textbox('clear').textbox('textbox').focus();
    LISTAR_NIVRESP('');
    $('#modalBuscarNivRes').window('open');
}
function LISTAR_NIVRESP(filtro) {
    if (filtro != "") { $('#txtBusquedaNivRes').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaNivRes').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }


    $('#tblBusquedaDeNivRes').datagrid({
        url: 'listarNivRes.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBusquedaDeNivRes').datagrid('getSelected');
            $('#txtcvenivelresp').textbox('setValue', row.Clave);
            $('#txtdesnivelresp').textbox('setValue', row.Descripcion);
            $('#modalBuscarNivRes').window('close');
        }
    });
}


function MOSTAR_SUBNIVEL(filtro) {
    if (filtro != "") { $('#txtsubniv').textbox('setValue', filtro); }
    else { filtro = $('#txtsubniv').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }
  
    LISTAR_SUBNIVEL('');
    $('#modalSubNivel').window('open');
}
function LISTAR_SUBNIVEL(filtro) {
    if (filtro != "") { $('#txtBuscarCveSubNivel').textbox('setValue', filtro); }
    else { filtro = $('#txtBuscarCveSubNivel').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }
   
    $('#tblBuscarSubNivel').datagrid({
        url: 'ListarSubNivel.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        onClickRow: function () {
            var row = $('#tblBuscarSubNivel').datagrid('getSelected');
            $('#txtsubniv').textbox("setValue", row.Clave);
            $('#txtdessubniv').textbox("setValue", row.Descripcion);
            $('#modalSubNivel').window('close');
        }
    });
}

//function MOSTAR_SUBNIVEL() {
//    var text = $('#txtBusquedaForSubNivel');
//    text.textbox('clear').textbox('textbox').focus();

//    if ($('#txtcodniv').textbox("getValue") == '') { $.messager.alert('Error', 'Falta el código del nivel', 'error'); return 0 }
//    else
//        if ($('#txtzona').textbox("getValue") == '') { $.messager.alert('Error', 'Falta la zona ligada a la adscripción', 'error'); return 0 }
//        else
//    {
//        LISTAR_SUBNIVEL('');
//        $('#modalBuscarSubNivel').window('open');
//    }
//}
//function LISTAR_SUBNIVEL(filtro) {
//    if (filtro != "") { $('#txtBusquedaForSubNivel').textbox('setValue', filtro); }
//    else { filtro = $('#txtBusquedaForSubNivel').textbox('getValue'); }

//    if (filtro == undefined) { filtro = ""; }

//    var cols = $('#hidColumnasDeSubNivel').val();
//    $('#tblBusquedaDeForSubNivel').datagrid({       
//        url: 'listarForSubNivel.aspx?nivel=' + $('#txtcodniv').textbox("getValue") + '&zona=' + $('#txtzona').textbox("getValue") + '&columnas=' + cols,
//        pagination: true,
//        enableFilter: true,
//        rownumbers: true,
//        singleSelect: true,
//        striped: true,
//        pageSize: 20,
//        onClickRow: function () {
//            var row = $('#tblBusquedaDeForSubNivel').datagrid('getSelected');
//            $('#txtsubniv').textbox("setValue", row.cvenisni);
//            $('#txtzona').textbox("setValue", row.cvezonns);
//            $('#txtcvegrupoman').textbox("setValue", row.cvegmani);
//            $('#txtdesgrupoman').textbox("setValue", row.desgma);
//            $('#txtcvenivelresp').textbox("setValue", row.cvegreni);
//            $('#txtdesnivelresp').textbox("setValue", row.desgre);
//            $('#txtsubniv').textbox("setValue", row.cvenisni);
//            $('#txtdessubniv').textbox("setValue", row.desnis);
//           // $('#txtnivel').textbox("setValue", row.cveniv);
//            $('#modalBuscarSubNivel').window('close');
//        }
//    });
//}


function VALIDAR_DATOS() {
    if ($('#txtNoPlazas').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el número de plaza a crear", 'error'); return 0; }
    else
        if ($('#txtcvepuesto').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el puesto", 'error'); return 0; }
        else
            if ($('#txtsubniv').textbox("getValue") == '') { $.messager.alert('Error', "Debe seleccionar el subnivel del puesto para el trabajador", 'error'); return 0; }
            else
                if ($('#txtcveads').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar la unidad responsble", 'error'); return 0; }
                else
                    if ($('#txtcvezp').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar la pagaduria", 'error'); return 0; }
                    else
                        if ($('#txtcvegpojer').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el grupo jerarquico", 'error'); return 0; }
                        else
                            if ($('#txtcvegpolab').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el grupo laboral", 'error'); return 0; }
                            else
                                if ($('#txtcvegrupoman').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el grupo de mando", 'error'); return 0; }
                                else
                                    if ($('#txtcvenivelresp').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el nivel de responsabilidad", 'error'); return 0; }
                                    else
                                        if ($('#cbovacancia').combobox("getValue") == 'x') { $.messager.alert('Error', "Debe especificar el estatus inicial", 'error'); return 0; }
                                        else
                                            if ($('#cboTipoPlaza').combobox("getValue") == 'x') { $.messager.alert('Error', "Debe especificar el tipo de plaza", 'error'); return 0; }
                                            else
                                                if ($('#txtcveforisr').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar la formula de isr", 'error'); return 0; }
                                                else
                                                    if ($("#txtcveetp").textbox('getValue') == "") { $.messager.alert('Error', 'Falta la Estructura Programatica', 'error'); return 0 }
                                                    else
                                                        if ($("#dtpVigIni").textbox('getValue') == 'dd/mm/aaaa') { $.messager.alert('Error', 'Falta la Vigencia Inicial', 'error'); return 0 }
                                                        else                                                         
                                                            if ($('#txthoras').textbox('getValue') <= 0)
                                                            { $.messager.alert('Error', "Faltan las horas de la plaza", 'error'); return 0; }
                                                        else
                                                            { GUARDAR_PLAZA(); }
}

function VALIDAR_FECHA(fecha, tipofecha) {
    if (isDate(fecha))
        alert('Valid Date');
    else $.messager.alert('Error', 'La fecha de la vigencia ' + tipofecha + ' esta incorrecta ', 'error'); return 0
}

function GUARDAR_PLAZA() {
    var plapadre = ""; var vigfin = "", vigini = "";
    var sueldo = 0.00,horas=0.00;
    if (PlazaPadre == "") { plapadre = ""; } else { plapadre = PlazaPadre; }

         
        if (!Validar_Fecha($("#dtpVigIni").textbox('getValue')))
        { $.messager.alert('Error', 'La fecha de la Vigencia Inicial esta incorrecta ', 'error'); return 0 }
        else { vigini = $("#dtpVigIni").textbox('getValue'); }   

    if (($("#dtpVigFin").textbox('getValue') == 'dd/mm/aaaa') || ($("#dtpVigFin").textbox('getValue') == '')) { vigfin = ""; }
    else {
        if (!Validar_Fecha($("#dtpVigFin").textbox('getValue')))
        { $.messager.alert('Error', 'La fecha de la Vigencia Final esta incorrecta ', 'error'); return 0 }
        else
        { vigfin = $("#dtpVigFin").textbox('getValue'); }
    }
            
    if (($('#txtSueldoPer').numberbox("getValue") == "") || ($('#txtSueldoPer').numberbox("getValue") == 0.00)) { sueldo = 0.00; }
    else { sueldo = $('#txtSueldoPer').numberbox("getValue"); }
         
            var parametros = {};
            parametros.tipoplaza = tipoPlazaSeleccionada;
            parametros.numplazas = $("#txtNoPlazas").numberbox('getValue');
            parametros.plapadre = plapadre;
            parametros.fecvigini = vigini;
            parametros.fecvigfin = vigfin;
            parametros.tiponomina = $("#cboTipoPlaza").combobox('getValue');
            parametros.tippag = $("#cboTipoPago").combobox('getValue');
            parametros.cvepuepl = $("#txtcvepuesto").textbox('getValue');
            parametros.cvejerpl = $("#txtcvegpojer").textbox('getValue');
            parametros.cvelabpl = $("#txtcvegpolab").textbox('getValue');
            parametros.codnivpl = $("#txtcodniv").textbox('getValue');
            parametros.cvenispl = $("#txtsubniv").textbox('getValue');
            parametros.estruProg = $("#txtcveetp").textbox('getValue');
            parametros.cveAdsPl = $("#txtcveads").textbox('getValue');
            parametros.cvezonpag = $("#txtcvezp").textbox('getValue');
            parametros.cvezonpl = $("#txtzona").textbox('getValue');
            parametros.cvegmapl = $("#txtcvegrupoman").textbox('getValue');
            parametros.cvegrepl = $("#txtcvenivelresp").textbox('getValue');
            parametros.cveforISRpl = $("#txtcveforisr").textbox('getValue');
            parametros.estatus = $('#cbovacancia').combobox("getValue");
            parametros.horas = $('#txthoras').numberbox("getValue");
            parametros.plazaant = $('#txtPlazaAnt').textbox("getValue");
            parametros.autorizacion = $('#txtNoAutorizacion').textbox("getValue");
            parametros.sueldoper = sueldo;
            parametros.programa = $("#txtprograma").textbox('getValue');

            $.ajax({
                type: "POST",
                url: "UtileriasBD.aspx/GuardarPlazas",
                dataType: "json",
                data: JSON.stringify(parametros),
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        // $.messager.alert('Información', data.d[1], 'Info');
                        LIMPIAR();
                        //if (tipoPlazaSeleccionada != 'S') {                    
                        //    $('#dmenu').show();
                        //    $('#dinicial').hide();
                        //   // $('#dplazascreadas').show();
                        //}
                        //else {
                        //    $('#dmenu').show();
                        //    $('#dinicial').hide();
                        //}
                        // MOSTRAR_LISTA_PLAZAS(data.d[2]);
                        //$.messager.alert('Información', 'Plazas creada (s) ' + data.d[2], 'info');
                        $.messager.alert({ title: 'Información', msg: '<div style="height:100%">Plaza Creada (s) <br><h3><b>' + data.d[2] + '<b><h3></div>', icon: 'info', width: 15 + "%" });
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
                },
                error: function (er) {
                    $('#loading').hide();
                    $.messager.alert('Error', er.responseJSON.Message, 'error');
                },
                complete: function () {
                    $('#loading').hide(100);
                }
            });
     
}




