var tipoPlazaSeleccionada = "";
var hrspadre = "";
var asignahoras="False";

$(document).ready(function () {
   

    $('#aNormal').bind('click', function () { PLAZA_NORMAL('N','PLAZA NORMAL'); });
    $('#aSustituta').bind('click', function () { tipoPlazaSeleccionada = "S"; mostrarBuscadorDePlazas('PLAZAS SUSTITUTAS'); });
    $('#aHonorarios').bind('click', function () { PLAZA_NORMAL('A', 'PLAZAS DE ASIMILADOS Y SALARIOS'); });
    $('#btnLimpiar').bind('click', function () { limpiar(); });
    $('#btnguardar').bind('click', function () { evaluarCreacionDePlaza(); });
    $('#btnBuscar').bind('click', function () {
        $('#txtvalor').textbox('setValue', "");
        CARGAR_GRID('');               
        $('#modalBuscarPlaza').window('open');       
    });

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            CARGAR_GRID('');
        }
    });
    $('#btnBplaza').bind('click', function () {
        CARGAR_GRID('');       
    });

    $('#btnRmenu').bind('click', function () { REGRESAR_MENU(); });
    $('#btnSiguiente').bind('click', function () { CONTINUAR_PLAZA_NORMAL(); });
   
   
    $('#dtpVigIni').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#dtpVigFin').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });

    $('#txtBusquedaPuesto').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarPuestos($('#txtBusquedaPuesto').textbox('getValue')); }
        }
    });
    $('#txtBusquedaForSubNivel').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarForSubNivel($('#txtBusquedaForSubNivel').textbox('getValue')); }
        }
    });
    $('#txtBusquedaCentroCosto').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarCentroCosto($('#txtBusquedaCentroCosto').textbox('getValue')); }
        }
    });
    $('#txtBusquedaTipoPlaza').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarTipoPlaza($('#txtBusquedaTipoPlaza').textbox('getValue')); }
        }
    });
    $('#txtBusquedaPagaduria').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarPagaduria($('#txtBusquedaPagaduria').textbox('getValue')); }
        }
    });
    $('#txtBusquedaGpoMando').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarGpoMando($('#txtBusquedaGpoMando').textbox('getValue')); }
        }
    });
    $('#txtBusquedaNivRes').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarNivRes($('#txtBusquedaNivRes').textbox('getValue')); }
        }
    });
    $('#txtBusquedaForISR').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { listarForISR($('#txtBusquedaForISR').textbox('getValue')); }
        }
    });
    //$('#txtBusquedaPlaza').textbox('textbox').bind('keydown', function (e) {
    //    if (e.keyCode == 13) {
    //        { listarPlaza($('#txtBusquedaPlaza').textbox('getValue')); }
    //    }
    //});

    
    Cargar_Combo('#cbovacancia', "UtileriasBD.aspx/TipoVacantes");

    var txtcveur = $('#txtcveur');
    txtcveur.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            if ($('#cboTipoPlaza').combobox('getValue') == "X") { $.messager.alert('Error', 'Falta seleccionar el tipo de plaza', 'error'); return 0 }
            else
            {
               // var cvesur = $('#txtcveur').text('getValue');
                listarCentroCosto(txtcveur.val());
                $('#modalBuscarCentroCosto').window('open');
            }
        }
    });

    var txtcvepuesto = $('#txtcvepuesto');
    txtcvepuesto.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarPuestos(txtcvepuesto.val());
            $('#modalBuscarPuesto').window('open');
        }
    });

    var txtcvepagad = $('#txtcvepagad');
    txtcvepagad.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            listarPagaduria(txtcvepagad.val());
            $('#modalBuscarPagaduria').window('open');
        }
    });
   
});

function PLAZA_NORMAL(tipo, titulo) {
    tipoPlazaSeleccionada = tipo;
    cargarForISR();
    $('#btnBuscar').hide();   
            $('#dmenu').hide();
            $('#dinicial').show();
            sessionStorage.setItem('PlazaPadre','');
            document.getElementById('lblplazas').innerHTML = titulo;
            
            $('#dtpVigIni').textbox('setValue', localStorage.getItem("vigini"));
}
function REGRESAR_MENU()
{
    limpiar();
    $('#lblPlazaOrigenEnSustituta').html('');
    $('#dmenu').show();
    $('#dinicial').hide();
    document.getElementById('lblplazas').innerHTML = '';
}


function Regresar_Inicio() {
    limpiar();
    $('#dmenu').show();
    $('#dinicial').hide();    
    $('#dplazascreadas').hide();
}


function limpiar() {
    $("#txtNoPlazas").numberbox('clear');
    $("#txtNoAutorizacion").textbox('setValue', '');
    $("#dtpVigIni").textbox('setValue', '');
    $("#dtpVigFin").textbox('setValue', '');
    //$("#cboTipoPlaza").combobox('setValue', 'x');
    $('#cboTipoPlaza').combobox('clear');
    var cc = $('#cboTipoPlaza');
    cc.combobox('loadData', []);

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
    $('#txtcveur').textbox('setValue', '');
    $('#txtdesur').textbox('setValue', '');
    $('#txtcvetippl').textbox('setValue', '');
    $('#txtdestippl').textbox('setValue', '');
    $('#txtcvepagad').textbox('setValue', '');
    $('#txtdespagad').textbox('setValue', '');
    $('#txtzona').textbox('setValue', '');
    $('#txtcvegrupoman').textbox('setValue', '');
    $('#txtdesgrupoman').textbox('setValue', '');
    $('#txtcvenivelresp').textbox('setValue', '');
    $('#txtdesnivelresp').textbox('setValue', '');
    //$('#txtcveforisr').textbox('setValue', '');
    //$('#txtdesforisr').textbox('setValue', '');
    $('#txtnivel').textbox('setValue', '');
    $('#txthoras').textbox('setValue', '');
    $('#txtPlazaAnt').textbox('setValue', '');   
}

function LimpiarValores(tipo) {
    if (tipo == 'pue') {
        $('#txtcvepuesto').textbox('setValue', '');
        $('#txtdespuesto').textbox('setValue', '');
        $('#txtcvetippue').textbox('setValue', '');
        $('#txthora').textbox('setValue', '');
        $('#txthoras').textbox('setValue', '');        
        $('#txtcvegpoman').textbox('setValue', '');
        $('#txtcvegpojer').textbox('setValue', '');
        $('#txtdesgpojer').textbox('setValue', '');
        $('#txtdesgpoman').textbox('setValue', '');
        $('#txtcvegpolab').textbox('setValue', '');
        $('#txtdesgpolab').textbox('setValue', '');
        $('#txtcodniv').textbox('setValue', '');
        $('#cboSubnivel').combobox('setValue', '');
        $('#txtnivel').textbox('setValue', '');        
        $('#txtcvegrupoman').textbox('setValue', '');
        $('#txtdesgrupoman').textbox('setValue', '');
        $('#txtcvenivelresp').textbox('setValue', '');
        $('#txtdesnivelresp').textbox('setValue', '');
        $('#txtsubniv').textbox('setValue', '');
        $('#txtdessubniv').textbox('setValue', '');
    }
    if (tipo == 'ur') {
        $('#txtcveur').textbox('setValue', '');
        $('#txtdesur').textbox('setValue', '');       
        $('#cboTipoPlaza').combobox('clear');        
    }
    if (tipo == 'tp') {
        $('#txtcvetippl').textbox('setValue', '');
        $('#txtdestippl').textbox('setValue', '');
    }
    if (tipo == 'zp') {
        $('#txtcvepagad').textbox('setValue', '');
        $('#txtdespagad').textbox('setValue', '');
        $('#txtzona').textbox('setValue', '');
        $('#txtcveur').textbox('setValue', '');
        $('#txtdesur').textbox('setValue', '');
        $('#cboTipoPlaza').combobox('clear');
    }
    if (tipo == 'gm') {
        $('#txtcvegrupoman').textbox('setValue', '');
        $('#txtdesgrupoman').textbox('setValue', '');
    }
    if (tipo == 'nr') {
        $('#txtcvenivelresp').textbox('setValue', '');
        $('#txtdesnivelresp').textbox('setValue', '');
    }
    if (tipo == 'isr') {
        $('#txtcveforisr').textbox('setValue', '');
        $('#txtdesforisr').textbox('setValue', '');
    }
}


function mostrarBuscadorDePuesto() {
    var text = $('#txtBusquedaPuesto');
    text.textbox('clear').textbox('textbox').focus();
    listarPuestos("");
    $('#modalBuscarPuesto').window('open');
}
function listarPuestos(filtro) {
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
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDePuestos').datagrid('getSelected');            
            if (row.Codigo_Nivel.trim() == "") {
                $.messager.alert('Error', "Debe configurar el código de nivel para el puesto", 'error'); return 0;                
            } else {
                $('#txtcvepuesto').textbox('setValue', row.Clave);
                $('#txtdespuesto').textbox('setValue', row.Descripcion);
                $('#txtcvetippue').textbox('setValue', row.Tipo_Puesto);
                asignahoras=row.asignahoras;
                if (row.asignahoras == "False") {
                    $('#txthoras').textbox({ readonly: true });
                    $('#txthora').textbox('setValue', row.Tipo_Jornada);
                    $('#txthoras').textbox('setValue', 0);
                }
                else {
                    $('#txthoras').textbox({ readonly: false });
                    $('#txthora').textbox('setValue', row.Tipo_Jornada);
                }
                $('#txtcvegpojer').textbox('setValue', row.Grupo_Jerarquico);
                $('#txtdesgpojer').textbox('setValue', row.Des_Jerarquico);
                $('#txtcvegpolab').textbox('setValue', row.Grupo_Laboral);
                $('#txtdesgpolab').textbox('setValue', row.Des_Laboral);
                $('#txtcodniv').textbox('setValue', row.Codigo_Nivel);

                $('#txtnivel').textbox('setValue', '');
                $('#txtcvegrupoman').textbox('setValue', '');
                $('#txtdesgrupoman').textbox('setValue', '');
                $('#txtcvenivelresp').textbox('setValue', '');
                $('#txtdesnivelresp').textbox('setValue', '');
                $('#txtsubniv').textbox('setValue', '');
                $('#txtdessubniv').textbox('setValue', '');

                listarSubNivSal();
                $('#modalBuscarPuesto').window('close');
            }
        }
    });    
}

function listarSubNivSal() {
    var niv = $('#txtcodniv').textbox('getValue');
    if (niv == '') return;
    var zon = $('#txtzona').textbox('getValue');
    if (zon == '') return;

    var parametros = {};
    parametros.codniv = niv,
    parametros.cvezon= zon
    $.ajax({
        type: "POST",
        url: "UtileriasBD.aspx/listarSubNivSal",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                var obj = $.parseJSON(data.d[1]);         
                $('#txtnivel').textbox('setValue', obj[0].cveniv);
                $('#txtcvegrupoman').textbox('setValue', obj[0].cvegmani);
                $('#txtdesgrupoman').textbox('setValue', obj[0].desgma);
                $('#txtcvenivelresp').textbox('setValue', obj[0].cvegreni);
                $('#txtdesnivelresp').textbox('setValue', obj[0].desgre);
                $('#txtsubniv').textbox('setValue', obj[0].cvenisni);
                $('#txtdessubniv').textbox('setValue', obj[0].desnis);
            }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function mostrarSubnivel() {
    if ($('#txtcodniv').textbox("getValue") == '') { $.messager.alert('Error', 'Falta el código del nivel', 'error'); return 0 }
    else
        if ($('#txtzona').textbox("getValue") == '') { $.messager.alert('Error', 'Falta la zona ligada a la pagaduría', 'error'); return 0 }
        else
        {
            var text = $('#txtBusquedaForSubNivel');
            text.textbox('clear').textbox('textbox').focus();

            listarForSubNivel();
            $('#modalBuscarSubNivel').window('open');
        }
}
function listarForSubNivel() {   
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
            showPageList: false,
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

function mostrarBuscadorDeCentroCosto() {
    var text = $('#txtBusquedaCentroCosto');
    text.textbox('clear').textbox('textbox').focus();
    var filas = $('#tblBusquedaDePagaduria').datagrid('getSelected');
    if (filas != null) {
        listarCentroCosto(filas.Centcosto);
    }
    $('#modalBuscarCentroCosto').window('open');
}
function listarCentroCosto(filtro) {
    //var tipoplaza = "";
    //if ($('#cboTipoPlaza').combobox('getValue') != 'x')
    //{ tipoplaza = $('#cboTipoPlaza').combobox('getValue'); }
    //else { tipoplaza = ""; }

    if (filtro != "") { $('#txtBusquedaCentroCosto').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaCentroCosto').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

    //document.getElementById('txtBusquedaCentroCosto').value
    //var filas = $('#tblBusquedaDePagaduria').datagrid('getSelected');
    //if (filas != null) {
        $('#tblBusquedaDeCentroCosto').datagrid({
            url: 'listarUnidadResponsable.aspx?busqueda=' + filtro,
            pagination: true,
            enableFilter: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            pageSize: 10,
            showPageList: false,
            onClickRow: function () {
                var row = $('#tblBusquedaDeCentroCosto').datagrid('getSelected');
                $('#txtcveur').textbox('setValue', row.Clave);
                $('#txtdesur').textbox('setValue', row.Descripcion);
                //listarTipoPlaza(row.Clave);
                TIPOPLAZA('#cboTipoPlaza', "UtileriasBD.aspx/TipoPlazas", row.Clave,"");
                $('#modalBuscarCentroCosto').window('close');
            }
        });
    //}
}

function mostrarBuscadorDeTipoPlaza() {
    var text = $('#txtBusquedaTipoPlaza');
    text.textbox('clear').textbox('textbox').focus();
    var filas = $('#tblBusquedaDePagaduria').datagrid('getSelected');
    if (filas != null) {
        listarTipoPlaza(row.Clave);
    }
    $('#modalBuscarTipoPlaza').window('open');
}
function listarTipoPlaza(valor) {  
    $('#tblBusquedaDeTipoPlaza').datagrid({
        url: 'listarTipoPlaza.aspx?busqueda=' + valor,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDeTipoPlaza').datagrid('getSelected');
            $('#txtcvetippl').textbox('setValue', row.Clave);
            $('#txtdestippl').textbox('setValue', row.Descripcion);
            $('#modalBuscarTipoPlaza').window('close');
        }
    });
}

function mostrarBuscadorDeEstPro() {
    $('#txtBusquedaEstPro').val("");
    listarEstPro();
    $('#modalBuscarEstPro').window('open');
}

function mostrarBuscadorDePagaduria() {
    var text = $('#txtBusquedaPagaduria');
    text.textbox('clear').textbox('textbox').focus();

    listarPagaduria("");
    $('#modalBuscarPagaduria').window('open');
}
function listarPagaduria(filtro) {
    if (!$('#divTableDatosDePagaduria').is(':hidden'))
        $('#divTableDatosDePagaduria').toggle(1000);

    if (filtro != "") { $('#txtBusquedaPagaduria').textbox('setValue', filtro); }
    else { filtro = $('#txtBusquedaPagaduria').textbox('getValue'); }

    if (filtro == undefined) { filtro = ""; }

   // document.getElementById('txtBusquedaPagaduria').value=valor;
    $('#tblBusquedaDePagaduria').datagrid({
        url: 'listarPagadurias.aspx?busqueda=' + filtro,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDePagaduria').datagrid('getSelected');
            $('#txtcvepagad').textbox('setValue', row.Clave);
            $('#txtdespagad').textbox('setValue', row.Descripcion);
            $('#txtzona').textbox('setValue', row.Zona);
            $('#txtcveur').textbox('setValue', row.Centcosto);
            $('#txtdesur').textbox('setValue', row.Descentro);
            //listarTipoPlaza(row.Clave);
            TIPOPLAZA('#cboTipoPlaza', "UtileriasBD.aspx/TipoPlazas", row.Centcosto,"");
            $('#modalBuscarPagaduria').window('close');
            $('#divTableDatosDePagaduria').toggle(300);         
        }
    });
}

function mostrarBuscadorDeGpoMando() {
    if ($('#txtcodniv').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el código del nivel', 'error'); return 0 }
    else
        if ($('#txtzona').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la zona ligada a la pagaduría', 'error'); return 0 }
    {
        var text = $('#txtBusquedaGpoMando');
        text.textbox('clear').textbox('textbox').focus();
        listarGpoMando();
        $('#modalBuscarGpoMando').window('open');
    }
}
function listarGpoMando() {
    if (!$('#divTableDatosDeGpoMando').is(':hidden'))
        $('#divTableDatosDeGpoMando').toggle(1000);

    
    $('#tblBusquedaDeGpoMando').datagrid({
        url: 'listarGpoMando.aspx?busqueda=' + document.getElementById('txtBusquedaGpoMando').value + '&codniv=' + $('#txtcodniv').textbox('getValue') + '&zona=' + $('#txtzona').textbox('getValue'),
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDeGpoMando').datagrid('getSelected');
            $('#txtcvegrupoman').textbox('setValue', row.Clave);
            $('#txtdesgrupoman').textbox('setValue', row.Descripcion);
            $('#modalBuscarGpoMando').window('close');
            $('#divTableDatosDeGpoMando').toggle(300);
        }
    });
}

function mostrarBuscadorDeNivRes() {
    var text = $('#txtBusquedaNivRes');
    text.textbox('clear').textbox('textbox').focus();

    listarNivRes();
    $('#modalBuscarNivRes').window('open');
}
function listarNivRes() {
    if (!$('#divTableDatosDeNivRes').is(':hidden'))
        $('#divTableDatosDeNivRes').toggle(1000);

   
    $('#tblBusquedaDeNivRes').datagrid({
        url: 'listarNivRes.aspx?busqueda=' + document.getElementById('txtBusquedaNivRes').value,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDeNivRes').datagrid('getSelected');
            $('#txtcvenivelresp').textbox('setValue', row.Clave);
            $('#txtdesnivelresp').textbox('setValue', row.Descripcion);
            $('#modalBuscarNivRes').window('close');
            $('#divTableDatosDeNivRes').toggle(300);
        }
    });
}

function mostrarBuscadorDeForISR() {
    var text = $('#txtBusquedaForISR');
    text.textbox('clear').textbox('textbox').focus();

    listarForISR();
    $('#modalBuscarForISR').window('open');
}
function listarForISR() {
    if (!$('#divTableDatosDeForISR').is(':hidden'))
        $('#divTableDatosDeForISR').toggle(1000);

    
    $('#tblBusquedaDeForISR').datagrid({
        url: 'listarForISR.aspx?busqueda=' + document.getElementById('txtBusquedaForISR').value+'&tipo='+tipoPlazaSeleccionada,
        pagination: false,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        showPageList: false,
        onClickRow: function () {
            var row = $('#tblBusquedaDeForISR').datagrid('getSelected');
            $('#txtcveforisr').textbox('setValue', row.Clave);
            $('#txtdesforisr').textbox('setValue', row.Descripcion);
            $('#modalBuscarForISR').window('close');
            $('#divTableDatosDeForISR').toggle(300);
        }
    });
}
function cargarForISR()
{
    var parametros = {};
    parametros.tipoplaza = tipoPlazaSeleccionada;
    $.ajax({
        type: "POST",
        url: "UtileriasBD.aspx/Cargar_ISR",
        dataType: "json",
        data: JSON.stringify(parametros),
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                var obj = $.parseJSON(data.d[1]);
                $('#txtcveforisr').textbox('setValue', obj[0].Clave);
                $('#txtdesforisr').textbox('setValue', obj[0].Descripcion);
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

function mostrarBuscadorDePlazas(titulo) {
    cargarForISR();
    $('#txtvalor').textbox('setValue', "");
    $('#btnBuscar').show();    
    $('#dmenu').hide();
    $('#dinicial').show();
    document.getElementById('lblplazas').innerHTML = titulo;
    
    $('#dtpVigIni').textbox('setValue', localStorage.getItem("vigini"));
   
    //listarPlaza();
    CARGAR_GRID('');  
    $('#modalBuscarPlaza').window('open');
    var text = $('#txtvalor');
    text.textbox('clear').textbox('textbox').focus();
}

function CARGAR_GRID() {
    var condicion = "";    
    var vvalor = $('#txtvalor').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbcampos').combobox('getValue');
        var vcondicion = $('#cbcondicion').combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
        }
        else { condicion = "";}    
    }
    else { condicion = ""; }

    listarPlaza(condicion);   
}

function listarPlaza(condicion) {
   
    $('#tblBusquedaDePlaza').datagrid({
        url: 'listarPlazas.aspx?busqueda=' + condicion, //document.getElementById('txtBusquedaPlaza').value,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,       
        pageSize: 20,        
        onClickRow: function () {
            var row = $('#tblBusquedaDePlaza').datagrid('getSelected');
            //$('#hidPlazaPadre').val(row.Clave);
            sessionStorage.setItem('PlazaPadre', row.numplaza);
            //document.getElementById('lblPlazaOrigenEnSustituta').innerHTML = 'Plaza Padre: ' + row.Clave + ', Nombre: ' + row.Descripcion + ' (NumEmp: ' + row.Zona + ')';
            $('#lblPlazaOrigenEnSustituta').html('Plaza Madre: ' + row.numplaza + ', Horas: ' + row.hrspla + ' (Empleado: ' + row.numemppl + ')');
            hrspadre=row.Descripcion;
            /*document.getElementById('lblZonaAds').innerHTML = row.Zona;*/
            $('#modalBuscarPlaza').window('close');

            MOSTRAR_DATOS_PLAZAMADRE(row.numplaza);
        }
    });
    //var pager = $('#tblBusquedaDePlaza').datagrid('getPager');
    //pager.pagination({ showPageList: false });
    CARGAR_CAMPOSBUSQUEDA('#tblBusquedaDePlaza', '#cbcampos');  
}

function Cargar_Combo(objddl,url) {
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

function TIPOPLAZA(objddl, url, parametro,tipoplaza) {
    var parametros = {};
    parametros.centcosto = parametro,
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(parametros),
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
            if (tipoplaza != "")
            { $('#cboTipoPlaza').combobox('setValue', tipoplaza); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function evaluarCreacionDePlaza() {
    if ($('#txtNoPlazas').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el número de plaza a crear", 'error'); return 0; }
    else
    if ($('#txtcvepuesto').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar el puesto", 'error'); return 0; }
    else
        if ($('#txtsubniv').textbox("getValue") == '') { $.messager.alert('Error', "Debe seleccionar el subnivel del puesto para el trabajador", 'error'); return 0; }
        else
            if ($('#txtcveur').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar la unidad responsble", 'error'); return 0; }
            else
                if ($('#txtcvepagad').textbox("getValue") == '') { $.messager.alert('Error', "Debe especificar la pagaduria", 'error'); return 0; }
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
                                       if ((asignahoras=="True") && ($('#txthoras').textbox('getValue')<=0))
                                          { $.messager.alert('Error', "El puesto seleccionado requiere horas", 'error'); return 0; }
                                         else
                                          {crearPlaza();}
}

function VALIDAR_FECHA(fecha, tipofecha)
{   
    if (isDate(fecha))
        alert('Valid Date');
    else $.messager.alert('Error', 'La fecha de la vigencia '+tipofecha+' esta incorrecta ', 'error'); return 0
}

function crearPlaza() {
    var plapadre = ""; var vigfin = "",vigini="";
    if (sessionStorage.getItem('PlazaPadre') == "") { plapadre = ""; } else { plapadre = sessionStorage.getItem('PlazaPadre'); }    

    if ($("#dtpVigIni").textbox('getValue') == 'dd/mm/aaaa') { $.messager.alert('Error', 'Falta la Vigencia Inicial', 'error'); return 0}
    else {
        if (!Validar_Fecha($("#dtpVigIni").textbox('getValue')))
        { $.messager.alert('Error', 'La fecha de la Vigencia Inicial esta incorrecta ', 'error'); return 0 }
        else {vigini = $("#dtpVigIni").textbox('getValue');}
    }

    if (($("#dtpVigFin").textbox('getValue') == 'dd/mm/aaaa') || ($("#dtpVigFin").textbox('getValue') == '')) { vigfin = ""; }
    else {
        if (!Validar_Fecha($("#dtpVigFin").textbox('getValue')))
        { $.messager.alert('Error', 'La fecha de la Vigencia Final esta incorrecta ', 'error'); return 0 }
        else
        { vigfin = $("#dtpVigFin").textbox('getValue'); }
    }

     
    var parametros = {};
    parametros.tipoplaza = tipoPlazaSeleccionada;
    parametros.numplazas = $("#txtNoPlazas").val();
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

    parametros.cveunirespl = $("#txtcveur").textbox('getValue');
    parametros.cvezonpag = $("#txtcvepagad").textbox('getValue');
    parametros.cvezonpl = $("#txtzona").textbox('getValue');
    parametros.cvegmapl = $("#txtcvegrupoman").textbox('getValue');
    parametros.cvegrepl = $("#txtcvenivelresp").textbox('getValue');
    parametros.cveforisrpl = $("#txtcveforisr").textbox('getValue');
    parametros.estatus = $('#cbovacancia').combobox("getValue");
    parametros.horas = $('#txthoras').textbox("getValue");
    parametros.plazaant = $('#txtPlazaAnt').textbox("getValue");
    parametros.autorizacion = $('#txtNoAutorizacion').textbox("getValue");

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
                limpiar();
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
                $.messager.alert({ title: 'Información', msg: '<div style="height:100%">Plaza Creada (s) <br><h3><b>'+data.d[2]+'<b><h3></div>', icon: 'info', width: 15 + "%" });
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function MOSTRAR_LISTA_PLAZAS(plazainicial) {
    $('#dgplazas').datagrid({
        url: 'listarPlazasCreadas.aspx?plazainicial=' + plazainicial + '&busqueda=',
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        showPageList: false,
        width: "80%",
        heigth: "90%"
    });
}

function MOSTRAR_DATOS_PLAZAMADRE(plazamadre)
{
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
            
            TIPOPLAZA('#cboTipoPlaza', "UtileriasBD.aspx/TipoPlazas", obj[0].cveadspl, obj[0].cvetpl);
           
            $('#txtcveur').textbox('setValue', obj[0].cveadspl);
            $('#txtdesur').textbox('setValue', obj[0].descentro);            
            $('#txtcvepagad').textbox('setValue', obj[0].cvepagpl);
            $('#txtdespagad').textbox('setValue', obj[0].despag);
            $('#txtcvepuesto').textbox('setValue', obj[0].cvepuepl);
            $('#txtdespuesto').textbox('setValue', obj[0].despue);
            $('#txtcvetippue').textbox('setValue', obj[0].codpue);
            $('#txthora').textbox('setValue', obj[0].destip);
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
        complete: function ()
        {
            
            $('#loading').hide(100);
        }
    });   
}



