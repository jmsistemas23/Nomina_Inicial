var alto;
var ancho;
var tabla

$(document).ready(function () {
    tabla = $_GET('tabla');
    if (tabla == undefined) {
        tabla = '';
    }

        DISEÑO_DOC('#dg', tabla);

        $('#txtval').textbox('textbox').bind('keydown', function (e) {
            if (e.keyCode == 13) {
                FILTRO_DOC("#dg", "#cbocam", "#cbocon", "#txtval");
            }
        });

        $('#btnfiltrar').bind('click', function () { FILTRO_DOC("#dg", "#cbocam", "#cbocon", "#txtval"); });
        $('#btnNuevo').bind('click', function () { NUEVO(); });
        $('#btnEditar').bind('click', function () { EDITAR(); });
        $('#btnEliminar').bind('click', function () { ELIMINAR(); });
        $('#btnDiseño').bind('click', function () { DISEÑO(); });
        $('#btnRegresarCap').bind('click', function () { REGRESAR_CAPTURA(); });
        $('#btnGuardarCap').bind('click', function () { GUARDAR_CAPTURA(); });
        $('#btnRegresarInd').bind('click', function () { REGRESAR_INDICES(); });
        $('#btnGuardarInd').bind('click', function () { GUARDAR_INDICES(); });
        $('#btnLimpiarInd').bind('click', function () { LIMPIAR_CAPTURA(); });
        $('#btnLimpiarInd').bind('click', function () { LIMPIAR_INDICES(); });
});

function DISEÑO_DOC(dgcontrol, strtabla) {
    var parametros = {};
    parametros.strtabla = strtabla;

    $.ajax({
        type: "POST",
        url: "DIndicesMC.aspx/ConfiguracionGrid",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {
                if (data.d[1] != "")
                { ancho = data.d[1]; }
                else { ancho = 100; }

                if (data.d[2] != "")
                { alto = data.d[2]; }
                else { alto = 100; }

                CARGAR_DOC("#dg", strtabla, ancho, alto);
                CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
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
function CARGAR_DOC(dgcontrol, strtabla) {
    var con;
    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Datos.aspx?tabla=' + strtabla + '&busqueda=' + con,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                sessionStorage.setItem('cveind', rows[fields[0]]);
                document.getElementById('lblnivel').innerHTML = "Indice: " + rows[fields[0]] + "-" + rows[fields[1]];
                document.getElementById('lblindice').innerHTML = "Indice: " + rows[fields[0]] + "-" + rows[fields[1]];
                $('#txtdescripcion').textbox('setValue', rows[fields[1]]);
                $('#txtorden').textbox('setValue', rows[fields[2]]);

                $('#btnEditar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');
                $('#btnDiseño').linkbutton('enable');
              }
          }        
    });
}
function FILTRO_DOC(dgcontrol, cbocampo, cbcondicion, txtvalor) {
    var vvalor = $(txtvalor).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(cbocampo).combobox('getValue');
        var vcondicion = $(cbcondicion).combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            sessionStorage.setItem('condicion', condicion);
        }
        else { sessionStorage.setItem('condicion', ""); }
    }
    else { sessionStorage.setItem('condicion', ""); }
    CARGAR_DOC(dgcontrol, tabla);
}

function NUEVO() {
    document.getElementById('lblnivel').innerHTML = "";
    sessionStorage.setItem('cveind', "0");
    $('#dmenu').hide();
    $('#dcaptura').show();
    $('#txtdescripcion').textbox('clear').textbox('textbox').focus();
    $('#txtorden').textbox('clear');
}
function EDITAR() {
    $('#dmenu').hide();
    $('#dcaptura').show();  

    $('#txtdescripcion').textbox({ readonly: false });        
    $('#txtorden').textbox({ readonly: false });    
}
function ELIMINAR() {
    //$('#dmenu').hide();
    //$('#dcaptura').show();
        
    //$('#txtdescripcion').textbox({ readonly: true });        
    //$('#txtorden').textbox({ readonly: true });    
    $.messager.confirm('Confirm', 'Seguro de eliminar el índice' + sessionStorage.getItem('cveind'), function (r) {
        if (r) {
            ELIMINAR_DOCUMENTO(sessionStorage.getItem('cveind'));
        }
        else {
            $("#dgdoc").datagrid('unselectAll');
            $('#btnEditar').linkbutton('disable');
            $('#btnEliminar').linkbutton('disable');
            $('#btnDiseño').linkbutton('disable');
        }
    });
}
function DISEÑO() {
    $('#dmenu').hide();
    $('#ddiseño').show();
    CARGAR_DISEÑO_INDICES();
}

function REGRESAR_CAPTURA() {
    $('#dmenu').show();
    $('#dcaptura').hide();
    $('#dg').datagrid('unselectAll');   
    $('#txtval').textbox('clear')
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    sessionStorage.setItem('condicion', "");
    CARGAR_DOC('#dg', tabla);
}
function REGRESAR_INDICES() {
    $('#dmenu').show();
    $('#ddiseño').hide();
    $('#btnEditar').linkbutton('disable');
    $('#btnEliminar').linkbutton('disable');
    $('#btnDiseño').linkbutton('disable');
    $('#dg').datagrid('unselectAll');
}

function LIMPIAR_CAPTURA() {
    $('#txtdescripcion').textbox('setValue', '');
    $('#txtorden').textbox('setValue', '');
    $('#txtdescripcion').textbox('clear').textbox('textbox').focus();
}
function LIMPIAR_INDICES() {
    $('#cbMovimiento').combobox('setValue', 'x');
    $('#cbTipo').combobox('setValue', 'x');
    $('#cbCalculo').combobox('setValue', 'x');
    $('#cbAfectacion').combobox('setValue', 'x');
    $('#apliemp').attr("checked", false);
}

function CARGAR_DISEÑO_INDICES() {
    var parametros = {};
    parametros.strcveind = sessionStorage.getItem('cveind')    
    $.ajax({
        type: "POST",
        url: "DIndicesMC.aspx/CargarIndices",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {            
            var obj = $.parseJSON(data.d[0]);           
                              
            if (obj.rows[0].perprocespIMP == 'on') { $('#cbMovimiento').combobox('setValue', "perprocespIMP"); }
            else if (obj.rows[0].perprocespFRM == 'on') { $('#cbMovimiento').combobox('setValue', "perprocespFRM"); }
            else if (obj.rows[0].cadperFRM == 'on') { $('#cbMovimiento').combobox('setValue', "cadperFRM"); }
            else if (obj.rows[0].cadperIMP == 'on') { $('#cbMovimiento').combobox('setValue', "cadperIMP"); }
            else if (obj.rows[0].dedprocespIMP == 'on') { $('#cbMovimiento').combobox('setValue', "dedprocespIMP"); }
            else if (obj.rows[0].dedprocespFRM == 'on') { $('#cbMovimiento').combobox('setValue', "dedprocespFRM"); }
            else if (obj.rows[0].caddedFRM == 'on') { $('#cbMovimiento').combobox('setValue', "caddedFRM"); }
            else if (obj.rows[0].caddedIMP == 'on') { $('#cbMovimiento').combobox('setValue', "caddedIMP"); }
            else if (obj.rows[0].apoprocespIMP == 'on') { $('#cbMovimiento').combobox('setValue', "apoprocespIMP"); }
            else if (obj.rows[0].apoprocespFRM == 'on') { $('#cbMovimiento').combobox('setValue', "apoprocespFRM"); }
            else if (obj.rows[0].aportaciones == 'on') { $('#cbMovimiento').combobox('setValue', "aportaciones"); }
            else if (obj.rows[0].cadapoIMP == 'on') { $('#cbMovimiento').combobox('setValue', "cadapoIMP"); }
            else if (obj.rows[0].quinque == 'on') { $('#cbMovimiento').combobox('setValue', "quinque"); }
            else if (obj.rows[0].licenci == 'on') { $('#cbMovimiento').combobox('setValue', "licenci"); }
            else if (obj.rows[0].titula == 'on') { $('#cbMovimiento').combobox('setValue', "titula"); }
            else if (obj.rows[0].estantjub == 'on') { $('#cbMovimiento').combobox('setValue', "estantjub"); }
            else if (obj.rows[0].primaant == 'on') { $('#cbMovimiento').combobox('setValue', "primaant"); }

            else { $('#cbMovimiento').combobox('setValue', "x"); }

            if (obj.rows[0].tipmov == 'a') { $('#cbTipo').combobox('setValue', "a"); }
            else if (obj.rows[0].tipmov == 'b') { $('#cbTipo').combobox('setValue', "b"); }
            else if (obj.rows[0].tipmov == 'c') { $('#cbTipo').combobox('setValue', "c"); }
            else { $('#cbTipo').combobox('setValue', "x"); }

            if (obj.rows[0].retro == 'on') { $('#cbCalculo').combobox('setValue', "retro"); }
            else if (obj.rows[0].respo == 'on') { $('#cbCalculo').combobox('setValue', "respo"); }
            else if (obj.rows[0].difer == 'on') { $('#cbCalculo').combobox('setValue', "difer"); }
            else { $('#cbCalculo').combobox('setValue', "x"); }
            
            if (obj.rows[0].afeplaemp == 'on') { $('#cbAfectacion').combobox('setValue', "1"); }            
            else { $('#cbAfectacion').combobox('setValue', "0"); }

            if (obj.rows[0].apliemp == '0') { $('#apliemp').attr("checked", true); } else { $('#apliemp').attr("checked", false); }
            
        },
        error: function (er) { $.messager.alert('Error', er.responseText, 'error'); }
    });
}

function ELIMINAR_INDICRE(valor) {
    var parametros = {};   
    parametros.strcveind = valor;
    $.ajax({
        type: "POST",
        url: "DindicesMC.aspx/EliminarIndice",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d == "0") {
                $("#dg").datagrid('reload');
                $('#btnEditar').linkbutton('disable');
                $('#btnEliminar').linkbutton('disable');
                $('#btnDiseño').linkbutton('disable');
            }
            else {
                $.messager.show({ title: 'Error', msg: result.msg });
            }
        }
    });
}

function GUARDAR_DATOS(strtipo) {
    var parametros = {};
    parametros.strtipo = strtipo;
    parametros.strcampos = sessionStorage.getItem('campos');           
    $.ajax({
        type: "POST",
        url: "DIndicesMC.aspx/Guardar_Indices",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
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

function GUARDAR_CAPTURA() {
    var orden;
    if ($('#txtorden').textbox('getValue') == "") { orden = 0; } else { orden = $('#txtorden').textbox('getValue'); }
    var valores = "cve:" + sessionStorage.getItem('cveind') + "|des:" + $('#txtdescripcion').textbox('getValue').toUpperCase(); + "|ord:" + orden;
    sessionStorage.setItem('campos', valores);
    GUARDAR_DATOS('Captura');    
    REGRESAR_CAPTURA();    
}

function GUARDAR_INDICES() {
    var mov;
    var tipomov = "";
    var afecta = "";
    var apliemp;
    var calculo = "";

    if ($('#cbMovimiento').combobox('getValue') == "x") { $.messager.alert('Error', "Falta el movimiento", 'error'); }
    else
        if ($('#cbTipo').combobox('getValue') == "x") { $.messager.alert('Error', "Falta el tipo de Movimiento", 'error'); }
        else
            if ($('#cbAfectacion').combobox('getValue') == "x") { $.messager.alert('Error', "Falta el tipo de Afectación", 'error'); }
            else
            {
                if ($('#cbMovimiento').combobox('getValue') == 'perprocespIMP') { mov = "perprocespIMP:on"; }
                else
                    if ($('#cbMovimiento').combobox('getValue') == 'perprocespFRM') { mov = "perprocespFRM:on"; }
                    else
                        if ($('#cbMovimiento').combobox('getValue') == 'cadperIMP') { mov = "cadperIMP:on"; }
                        else
                            if ($('#cbMovimiento').combobox('getValue') == 'cadperFRM') { mov = "cadperFRM:on"; }
                            else
                                if ($('#cbMovimiento').combobox('getValue') == 'dedprocespIMP') { mov = "dedprocespIMP:on"; }
                                else
                                    if ($('#cbMovimiento').combobox('getValue') == 'dedprocespFRM') { mov = "dedprocespFRM:on"; }
                                    else
                                        if ($('#cbMovimiento').combobox('getValue') == 'caddedIMP') { mov = "caddedIMP:on"; }
                                        else
                                            if ($('#cbMovimiento').combobox('getValue') == 'caddedFRM') { mov = "caddedFRM:on"; }
                                            else
                                                if ($('#cbMovimiento').combobox('getValue') == 'apoprocespIMP') { mov = "apoprocespIMP:on"; }
                                                else
                                                    if ($('#cbMovimiento').combobox('getValue') == 'apoprocespFRM') { mov = "apoprocespFRM:on"; }
                                                    else
                                                        if ($('#cbMovimiento').combobox('getValue') == 'aportaciones') { mov = "aportaciones:on"; }
                                                        else
                                                            if ($('#cbMovimiento').combobox('getValue') == 'cadapoIMP') { mov = "cadapoIMP:on"; }
                                                            else
                                                                if ($('#cbMovimiento').combobox('getValue') == 'quinque') { mov = "quinque:on"; }
                                                                else
                                                                    if ($('#cbMovimiento').combobox('getValue') == 'licenci') { mov = "licenci:on"; }
                                                                    else
                                                                        if ($('#cbMovimiento').combobox('getValue') == 'titula') { mov = "titula:on"; }
                                                                        else
                                                                            if ($('#cbMovimiento').combobox('getValue') == 'estantjub') { mov = "estantjub:on"; }
                                                                            else
                                                                                if ($('#cbMovimiento').combobox('getValue') == 'primaant') { mov = "primaant:on"; }

                if ($('#cbTipo').combobox('getValue') == "a")
                { tipomov = 'a'; }
                else
                    if ($('#cbTipo').combobox('getValue') == "b")
                    { tipomov = 'c'; }
                    else
                        if ($('#cbTipo').combobox('getValue') == "c")
                        { tipomov = 'c'; }

                if ($('#cbCalculo').combobox('getValue') == "retro") { calculo = "|retro:on"; }
                else if ($('#cbCalculo').combobox('getValue') == "respo") { calculo = "|respo:on"; }
                else if ($('#cbCalculo').combobox('getValue') == "difer") { calculo = "|difer:on"; }

                if ($('#cbAfectacion').combobox('getValue') == "0") { afecta = "on"; }

                if ($('#apliemp').is(":checked") == true) { apliemp = "1"; } else { apliemp = "0"; }

                valores = "cve:" + sessionStorage.getItem('cveind') + "|"+mov + "|tipmov:" + tipomov + calculo + "|afeplaemp:" + afecta + "|apliemp:" + apliemp;

                sessionStorage.setItem('campos', valores);
                GUARDAR_DATOS('Indice');
            }   
}