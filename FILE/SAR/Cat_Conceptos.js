var condicion = "";
var checkedRows = [];
var filaseleccionada = "";
var valores = "";

$(document).ready(function () {
    CARGAR_GRID("#dgconceptos");
    CARGAR_CAMPOSBUSQUEDA('#dgconceptos', '#cbcampos');

    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            SACAR_FILTRO("#dgconceptos");
        }
    });
    FOCUS('#txtvalor', "#dg");

    $('#btneditar').bind('click', function () { EDITAR_CAPTURA(); });
    $('#btnmodificar').bind('click', function () { MODIFICAR_CAPTURA(); });
    $('#btnregresar').bind('click', function () {
        $('#dcaptura').hide();
        $('#dlista').show();        
        //if (filaseleccionada != null)
        //{ $('#dgconceptos').datagrid('unselectRow', filaseleccionada); }
        CARGAR_GRID("#dgconceptos");
    });

    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });

    $('#btnbper').bind('click', function () { objtxt = '#txtper'; AGREGAR_INDICADOR('#btnbper', "P"); });
    $('#btnlper').bind('click', function () { LIMPIAR_INDICADOR('#btnlper', '#txtper'); });
    $('#btnbded').bind('click', function () { objtxt = '#txtded'; AGREGAR_INDICADOR('#btnbded', "D"); });
    $('#btnlded').bind('click', function () { LIMPIAR_INDICADOR('#btnlded', '#txtded'); });

    $('#dgind').datagrid({
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onLoadSuccess: onLoad,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $('#dgind').datagrid('checkRow', index);
        }
    });

    $('#ddlindicador').combobox({
        onSelect: function (rec) {
            if (rec.value != 'x') {
                var valor=$('#txtformula').textbox('getValue');
                $('#txtformula').textbox('setValue', valor+rec.value);
            }            
        }
    });

    $('#ddloperadores').combobox({
        onSelect: function (rec) {
            if (rec.value != 'x') {
                var valor = $('#txtformula').textbox('getValue');
                $('#txtformula').textbox('setValue', valor + rec.value);
            }
        }
    });

    $('#btnlformula').bind('click', function () {
        $('#txtformula').textbox('setValue', '');
        $('#ddlindicador').combobox('setValue', 'x');
        $('#ddloperadores').combobox('setValue', 'x');
    });

    $('#txtimpbase').numberbox('textbox').css('text-align', 'right');
    $('#txtimpmax').numberbox('textbox').css('text-align', 'right');
    $('#txtnoqnas').numberbox('textbox').css('text-align', 'right');
    $('#txtporpago').numberbox('textbox').css('text-align', 'right');    
});

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Clave == row.Clave) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].Clave == row.Clave) {
            checkedRows.splice(i, 1);
            return;
        }
    }
}
function onLoad(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (checkedRows[i].Clave == row.Clave) {
                    dg.datagrid('checkRow', index);
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }
}

function CARGAR_GRID(dgcontrol) {
    var con;

    if (sessionStorage.getItem('condicion') == null) { con = ""; } else { con = sessionStorage.getItem('condicion'); };
    $(dgcontrol).datagrid({
        url: 'Listar_Conceptos.aspx?busqueda=' + con,
        pagination: true,
        enableFilter: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,        
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                filaseleccionada=$(dgcontrol).datagrid('getRowIndex', rows);                
                $('#btneditar').linkbutton('enable');                
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

function SACAR_FILTRO(dgobjeto) {
    var niveles = {};    
    var vvalor = $('#txtvalor').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbcampos').combobox('getValue');
        var vcondicion = $('#cbcondicion').combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' ' + vvalor + ''; }          
        }
    }
    else {
        var valores = cveniveles[0];
        if (valores.length > 0) { condicion=valores.Valor }
        else { condicion=""; }
    }
    CARGAR_GRID(dgobjeto);
}

function EDITAR_CAPTURA() {            
    $('#dcaptura').show();
    $('#dlista').hide();

    var  rows = $('#dgconceptos').datagrid('getSelected');
    if (rows) {
        $('#txtclave').textbox('setValue', rows.Cvecon);
        $('#txtdescripcion').textbox('setValue', rows.Concepto);
        $('#txtper').textbox('setValue', rows.Percepciones);
        $('#txtded').textbox('setValue', rows.Deducciones);
        $('#txtformula').textbox('setValue', rows.Formula);
        $('#txtporpago').numberbox('setValue', rows.PoPago);
        $('#ddlquincenas').combobox('setValue', rows.TipoQnas);
        $('#txtnoqnas').numberbox('setValue', rows.noacum);
        $('#txtimpmax').numberbox('setValue', rows.TopeImportes);
        $('#txtimpbase').numberbox('setValue', rows.Tope_Base);

        document.getElementById('chkme').checked = false;
        document.getElementById('chkce').checked = false;
        document.getElementById('chkrp').checked = false;
        document.getElementById('chknm').checked = false;

        //document.getElementById('chkrc').checked = false;
        //document.getElementById('chkim').checked = false;
        //document.getElementById('chkme').checked = false;        
        //document.getElementById('chkip').checked = false;        
        //document.getElementById('chkte').checked = false;
        //document.getElementById('chkis').checked = false;
        //document.getElementById('chkpa').checked = false;
        //document.getElementById('chktg').checked = false;
        //document.getElementById('chklb').checked = false;
        //document.getElementById('chkpe').checked = false;
        LISTAR_DETALLE(rows.Cvecon);
    }
        
}

function LISTAR_DETALLE(idcon)
{
    var parametros = {};
    parametros.cvecon = idcon;
    $.ajax({
        type: "POST",
        url: "Funsiones.aspx/Listar_ConceptosDetalles",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {             
                var obj = $.parseJSON(data.d[1]);               
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].ClaveTipoMov == "CE")
                    { document.getElementById('chkce').checked = true; }
                    if (obj[i].ClaveTipoMov == "ME")
                    { document.getElementById('chkme').checked = true; }
                    if (obj[i].ClaveTipoMov == "NM")
                    { document.getElementById('chknm').checked = true; }
                    if (obj[i].ClaveTipoMov == "RP")
                    { document.getElementById('chkrp').checked = true; }

                    //if (obj[i].ClaveTipoMov == "MC")
                    //{ document.getElementById('chkmc').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "RC")
                    //{ document.getElementById('chkrc').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "IM")
                    //{ document.getElementById('chkim').checked = true; }                                                                                                 
                    //if (obj[i].ClaveTipoMov == "IP")
                    //{ document.getElementById('chkip').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "TE")
                    //{ document.getElementById('chkte').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "IS")
                    //{ document.getElementById('chkis').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "PA")
                    //{ document.getElementById('chkpa').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "TG")
                    //{ document.getElementById('chktg').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "LB")
                    //{ document.getElementById('chklb').checked = true; }                    
                    //if (obj[i].ClaveTipoMov == "PE")
                    //{ document.getElementById('chkpe').checked = true; }
                    
                }
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


function CARGAR_IND(dgcontrol, strtipo, condicion) {
    $(dgcontrol).datagrid({
        url: "ListarIndicadores.aspx?tipoind=" + strtipo + "&busqueda=" + condicion
    });
}

function AGREGAR_INDICADOR(btnobj, tipoind) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        sessionStorage.setItem('tipoind', tipoind);
        checkedRows = [];
        CARGAR_IND('#dgind', tipoind, '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 650, 660,false, 'Aportaciones');
    }
}

function LIMPIAR_INDICADOR(btnobj, objtxt) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $(objtxt).textbox('setValue', '');
    }
}

function LIMPIAR_IND_SEL() {
    CARGAR_IND('#dgind', sessionStorage.getItem('tipoind'), '');
    $('#txtvalorind').textbox('setValue', '');
    $('#txtvalorind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');

    tipoind = "";
    checkedRows = [];
}

function ACEPTAR_IND_SEL() {
    $('#dgind').datagrid('acceptChanges');
    $('#dgind').datagrid('loadData', { "total": 0, "rows": [] });
    var ind = "";
    for (var i = 0; i < checkedRows.length; i++) {
        ind += checkedRows[i].Clave + ",";        
    }
    ind = ind.substring(0, ind.length - 1);
    var valant = $(objtxt).textbox('getValue')+","+ind;
    $(objtxt).textbox('setValue', valant)
    tipoind = "";
    checkedRows = [];
    $("#wind").window('close');
   
}

function SACAR_DETALLE()
{
    valores = "";
    $("input[type=checkbox]:checked").each(function () {       
        valores += $(this).val() + ",";
    });
    valores = valores.substring(0, valores.length - 1);
}

function MODIFICAR_CAPTURA()
{    
    if ($('#txtclave').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la clave', 'error'); return 0; }
    else
        if ($('#txtdescripcion').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la descripción', 'error'); return 0; }
        else
        {
            SACAR_DETALLE();
            var parametros = {};
            parametros.clave = $('#txtclave').textbox('getValue');
            parametros.concepto = $('#txtdescripcion').textbox('getValue');
            parametros.percepciones = $('#txtper').textbox('getValue');
            parametros.deducciones = $('#txtded').textbox('getValue');
            parametros.formula = $('#txtformula').textbox('getValue');
            parametros.noacum = $('#txtnoqnas').numberbox('getValue');
            parametros.topeimportes = $('#txtimpmax').numberbox('getValue');
            parametros.popago = $('#txtporpago').numberbox('getValue');
            parametros.tipoqnas = $('#ddlquincenas').combobox('getValue');
            parametros.tope_base = $('#txtimpbase').numberbox('getValue');
            parametros.detalle = valores;
            $.ajax({
                type: "POST",
                url: "Funsiones.aspx/Guardar_Conceptos",
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
}

