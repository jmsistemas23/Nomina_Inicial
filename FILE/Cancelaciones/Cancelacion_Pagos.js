var checkedRows = [];
var error = "";
var valnomina = "";
var nominasel = "";
var contador = 0;
var quincena = "";
var fields = "";
$(document).ready(function () {    
   
    $('#btnNuevaCap').bind('click', function () {NUEVA_CAPTURA('#btnNuevaCap');});
    $('#btnRCaptura').bind('click', function () {
        $('#dmenu').show();
        $('#dcaptura').hide();
    });

    $('#btnEliModCap').bind('click', function () {
        $('#dmenu').hide();
        $('#dmoddoc').show();
        CARGAR_QUINCENAS("#cbomodquin");
        $('#dgdoc').datagrid('loadData', { "total": 0, "rows": [] });
    });
    $('#btnRModificarDoc').bind('click', function () {
        $('#dmenu').show();
        $('#dmoddoc').hide();

    });

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dg', '');
        CARGAR_CAMPOSBUSQUEDAS('#dg', '#cbocam', 'numemp');
        windows("#winemp", 779, 661,false, "Empleados");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#txtvaldoc').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_DOCUMENTO($("#cbocamdoc").combobox('getValue'), $("#cbocondoc").combobox('getValue'), $("#txtvaldoc").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnfiltrardoc').bind('click', function () { FORMAR_DOCUMENTO($("#cbocamdoc").combobox('getValue'), $("#cbocondoc").combobox('getValue'), $("#txtvaldoc").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#btnLBusqueda').bind('click', function () { LIMPIAR_DATOS_EMPLEADOS(); });

    $('#brnABusqueda').bind('click', function () { ACEPTAR_CANCELADOS('#brnABusqueda'); });

    $('#btnCancelar').bind('click', function () { APLICAR_CANCELACION('#btnCancelar','G'); });

    $('#btnEliminar').bind('click', function () {ELIMINAR_SELECCION('#btnEliminar'); });

    $('#btnEditarDoc').bind('click', function () {
        EDITAR_DOCUMENTO('#btnEditarDoc');
    });
    $('#btnEliminarDoc').bind('click', function () {
        ELIMINAR_DOCUMENTO('#btnEliminarDoc');
    });
    $('#btnRModificar').bind('click', function () {
        $('#dmoddoc').show();
        $('#dmodificar').hide();
        CARCAR_CAPTURA_QUINCENA(quincena);
    });
    $('#btnModificar').bind('click', function () {
        APLICAR_MODIFICACION('#btnModificar','M');
    });
    $('#btnEmodificar').bind('click', function () {
        APLICAR_MODIFICACION('#btnEmodificar', 'E');
    });
    $('#btnLimpiarDoc').bind('click', function () {
        if ($('#cbomodquin').combobox('getValue') == "x") { quincena = ""; } else { quincena = $('#cbomodquin').combobox('getValue'); }
        CARCAR_CAPTURA_QUINCENA(quincena);        
    });


    $('#cbomodquin').combobox({
        onSelect: function (rec) {
            if (rec.valor != 'x') {
                quincena = rec.valor;
                CARCAR_CAPTURA_QUINCENA(rec.valor);
            }
        }
    });


    FOCUS('#txtvaldoc', "#dgdoc");
    CARGAR_CAMPOSBUSQUEDAS('#dgdoc', '#cbocamdoc', 'numemp');
   
});
$(window).load(function () {
   // SACAR_NOMINAS();    
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Cancelacion';
    //parametros.tipomov = valnomina;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {

            if (data.d[0] == "Si") { $('#lblbloqueada').show(); }
            else { $('#lblbloqueada').hide(); }

            if (data.d[0] == "No") {
                $('#btnNuevaCap').linkbutton({ disabled: false });
                $('#btnEliModCap').linkbutton({ disabled: false });
            }
            else {
                $('#btnNuevaCap').linkbutton({ disabled: true });
                $('#btnEliModCap').linkbutton({ disabled: true });
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

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#lblnominas').hide();
                $('#dextras').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
                valnomina = '';
                nominasel = '';
            }

           // Listar_BloqueosDesbloqueos();

        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            //text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
        });

        tr = $(tr).append(
          $(td).append(btn)
        );
        table.append(tr);


        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: true,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
        }
    }
}


function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
            return
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].numplaza == row.numplaza) {
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
                if (checkedRows[i].numplaza == row.numplaza) {
                    dg.datagrid('checkRow', index);
                    return;
                }
            }
        })();
    }
}


function CARGAR_QUINCENAS(ddlobj) {
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Quincenas',
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

function CARGAR_DATOS(dgcontrol, condicion) {
    var quincena = "";
    if ($('#cboquin').combobox('getValue') == "x") { quincena = "Actual"; } else { quincena = $('#cboquin').combobox('getValue'); }
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + condicion+"&quincena="+quincena,
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onUncheck: onUncheck,
        pageSize: 20,
        width:"100%",        
        beforeSend: function () {
            $('#loading').show();
        },
        onCheckAll: function () {
            checkedRows = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {
            checkedRows = [];
        },
        //onClickRow: function () {
        //    rows = $(dgcontrol).datagrid('getSelected');
        //    if (rows) {
        //        rows = $(dgcontrol).datagrid('getSelected');
        //        valor = rows.numemp;
        //        LISTAR_EMPLEADOS();
        //        $("#winemp").window('close');
        //    }
        //},
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }   
    CARGAR_DATOS('#dg', condicion);
}

function FORMAR_DOCUMENTO(objcam, objcon, objval) {
    var condicion = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }  
    FILTRAR_DOCUMENTO(condicion);
}

function FILTRAR_DOCUMENTO(condicion)
{
    if ($('#cbomodquin').combobox('getValue') == "x") { quincena = ""; } else { quincena = $('#cbomodquin').combobox('getValue'); }
    var parametros = {};
    parametros.condicion = condicion;
    parametros.quincena = quincena
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Cancelaciones',
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
            }
            if (obj != undefined) {
                $('#dgdoc').datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    onClickRow: function () {
                       // fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
                        rows = $('#dgdoc').datagrid('getSelected');
                        if (rows) {
                            $('#btnEditarDoc').linkbutton('enable');
                            $('#btnEliminarDoc').linkbutton('enable');
                        }
                    },
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

function ELIMINAR_SELECCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var filas = $('#dgp').datagrid('getSelected');
        if (filas != null) {
            $.messager.confirm('Confirm', 'Seguro de eliminar la fila selccionada', function (r) {
                if (r) {
                    var rowIndex = $("#dgp").datagrid("getRowIndex", filas);
                    $('#dgp').datagrid('deleteRow', rowIndex);
                }
            })
        }
        else { $.messager.alert('Error', 'Falta seleccionar la fila a eliminar', 'error'); }
    }
}

function LIMPIAR_DATOS() {
    $('#cbmotivo').combobox('setValue', 'x');
    $('#cbestatus').combobox('setValue', 'x');
    $('#txtobservaciones').textbox('setValue', '');
   
    $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
}

function LIMPIAR_DATOS_EMPLEADOS() {
    $('#cbocam').combobox('setValue', 'numemp');
    $('#cbocon').combobox('setValue', 'like');
    $('#txtval').textbox('setValue', '');

    CARGAR_DATOS('#dg', '');
}

function LISTAR_EMPLEADOS() {
    var obj = "",objPL="",objpen="";
    var quincena = $('#cboquin').combobox('getValue');
    if (quincena == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }

    var parametros = {};
    parametros.empleado = valor;
    parametros.quincena = quincena;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Empleados',
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
                objPL = $.parseJSON(data.d[1]);
                objpen = $.parseJSON(data.d[2]);
                if (obj.length > 0) {                    
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtcurp').textbox('setValue', obj[0].curpemp);
                    $('#txtappaterno').textbox('setValue', obj[0].patemp);
                    $('#txtapmaterno').textbox('setValue', obj[0].matemp);
                    $('#txtnombres').textbox('setValue', obj[0].nomemp);
                    $('#txtsexo').textbox('setValue', obj[0].sexoemp);
                    $('#txtestadocivil').textbox('setValue', obj[0].edoemp);
                    $('#txtnacionalidad').textbox('setValue', obj[0].nacioemp);
                    $('#txtfechanacimiento').textbox('setValue', obj[0].fenacemp);
                    $('#txtestadonacimiento').textbox('setValue', obj[0].edonaemp);
                    $('#txtcalle').textbox('setValue', obj[0].calleemp);
                    $('#txtnoexterior').textbox('setValue', obj[0].noextemp);
                    $('#txtnointerior').textbox('setValue', obj[0].nointemp);
                    $('#txtcolonia').textbox('setValue', obj[0].colonemp);
                    $('#txtcp').textbox('setValue', obj[0].codpoemp);
                    $('#txttelefono').textbox('setValue', obj[0].teleemp);
                    $('#txtcelular').textbox('setValue', obj[0].celular);
                    $('#txtnivacademico').textbox('setValue', obj[0].nivacemp);
                    $('#txtmaestria').textbox('setValue', obj[0].maestria);
                    $('#txtfechagobfed').textbox('setValue', obj[0].fegobemp);
                    $('#txtdiaslabgobfed').textbox('setValue', obj[0].diaslabgob);
                    $('#txtfechasec').textbox('setValue', obj[0].fecingsec);
                    $('#txtdiaslabsecretaria').textbox('setValue', obj[0].diaslabsec);
                    $('#txtfechadep').textbox('setValue', obj[0].fedepemp);
                    $('#txtfechabaja').textbox('setValue', obj[0].febajemp);
                    $('#txtfechareingreso').textbox('setValue', obj[0].fereiemp);
                    $('#txtdiaslaborados').textbox('setValue', obj[0].cveforISRpl);
                    $('#txtantiguedad').textbox('setValue', obj[0].Antiguedad);
                    $('#txttiposangre').textbox('setValue', obj[0].tiposangre);
                    $('#txtalergias').textbox('setValue', obj[0].alergias);
                    $('#txtpadecimiento').textbox('setValue', obj[0].padecimientos);                    
                }
                
                if (objPL.length > 0) {
                    CARGAR_DG("#dgp", objPL);
                }
                if (objpen.length > 0) {
                    CARGAR_DG("#dgpn", objpen);
                }               
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

function CARGAR_QUINCENAS(ddlobj)
{   
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Quincenas', 
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

function ACEPTAR_CANCELADOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {

        if (total = $('#dgp').datagrid('getData').total > 0)
        { total = $('#dgp').datagrid('getData').total + 1; }
        else { total = 0; }

        for (var f = 0; f < checkedRows.length; f++) {          
            $('#dgp').datagrid('insertRow', {
                index: total,
                row: {
                    numplaza: checkedRows[f].numplaza,
                    numemp: checkedRows[f].numemp,
                    nomcom: checkedRows[f].nomcom,
                    cveads: checkedRows[f].cveads,
                    descads: checkedRows[f].descads,
                    tipopago: checkedRows[f].tipopago,
                    despago: checkedRows[f].despago,
                    cvebanor: checkedRows[f].cvebanor,
                    banco: checkedRows[f].banco,
                    Total_liquido: checkedRows[f].Total_liquido,
                    estpago: checkedRows[f].estpago,
                    cvequi: checkedRows[f].cvequi,
                    ano: checkedRows[f].ano,
                    tipo_nom: checkedRows[f].tipo_nom,
                }
            });
        }
        checkedRows = [];
        $("#winemp").window('close');
    }
}

function CARGAR_TIPO_CANCELACIONES(objddl,valor) {   
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_TiposCancelaciones",        
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            if (obj.length > 0) {
                $(objddl).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                    editable: false
                });
                $(objddl).combobox('setValue', valor);
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

function CARGAR_ESTATUS_CANCELACIONES(objddl,valor) {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Cargar_EstatusCancelaciones",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            if (obj.length > 0) {
                $(objddl).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                    editable: false
                });
                $(objddl).combobox('setValue', valor);
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

function APLICAR_CANCELACION(btnobj,movimiento)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var fields = "";
        var valor = ""; var cadena = "";
        var estatus=$('#cboestatus').combobox('getValue');
        var motivo=$('#cbmotivo').combobox('getValue');
        if (motivo == "x") { $.messager.alert('Error', 'Falta el motivo de la cancelación', 'error'); return 0; }
        else
            if (estatus == "x") { $.messager.alert('Error', 'Falta el estatus de cancelación', 'error'); return 0; }
        else
        {
            var rows = $('#dgp').datagrid('getRows');
            if (rows.length==0){$.messager.alert('Error', 'Faltan los registros del empleado a cancelar', 'error'); return 0;}
            else
            {
                var observaciones = $('#txtobservaciones').textbox('getValue');
                fields = $('#dgp').datagrid('getColumnFields', true).concat($('#dgp').datagrid('getColumnFields', false));
                //fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
                for (var r = 0; r < rows.length; r++)
                {
                    if ((rows[r][fields[8]] == 'P') && (estatus == 'R')) { $.messager.alert('Error', 'La Plaza ' + rows[r][fields[0]] + ' no se puede Reexpedir, aun no se ha pagado', 'error'); return 0; }
                    else {
                        quin = rows[r][fields[11]] + "_" + (rows[r][fields[13]] > 0 ? 'Ext' + rows[r][fields[13]] : rows[r][fields[13]]) + "_" + rows[r][fields[12]];
                        INSERTAR_REGISTRO(rows[r][fields[0]], rows[r][fields[1]], motivo, estatus, observaciones, movimiento,quin);
                    }
                    
                }
                $('#loading').hide(100);

                if (contador == rows.length)
                { $.messager.alert('Información', 'Cancelacion aplicada', 'info'); }               

                $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });               
            }
        }
    }
}

function INSERTAR_REGISTRO(plaza,empleado, motivo,estatus,  observaciones,movimiento,quin) {

    
    var quincena = "";
    if (movimiento == "G")
    { if ($('#cboquin').combobox('getValue') == "x") { quincena = quin; } else { quincena = $('#cboquin').combobox('getValue'); } }
    else { if ($('#cbomodquin').combobox('getValue') == "x") { quincena = quin; } else { quincena = $('#cbomodquin').combobox('getValue'); } }
    var parametros = {};
    parametros.plaza = plaza;
    parametros.empleado = empleado;
    parametros.quincancelada = quincena;
    parametros.motivo = motivo;
    parametros.estatus = estatus;       
    parametros.observaciones = observaciones;
    parametros.movimiento = movimiento;
    parametros.quinactual = quin;
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Guardar_CamposCapturaMovimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0")
            { contador++; }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function Listar_Quincenas_Bloquedas(btnobj, valor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var parametros = {};
        parametros.valor = valor;
        parametros.quin = quincena;
        parametros.tipo = "C";
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/BloquearDesbloquear_Quincena",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (valor == 1)
                { $.messager.alert('Información', 'La Quincena se ha Bloqueado', 'info'); }
                else { $.messager.alert('Información', 'La Quincena se ha Desbloqueado', 'info'); }
                CARGAR_FECHAS_HISTORIA();
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
}

function VALIDAR_MULTINOMINA(tipo) {
    //var valor=$.session.get('valnomina');
    if ((valnomina != undefined) && (valnomina != '')) {
        var parametros = {};
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Validacion_Multinomina",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") {
                    if (tipo == 'NC') { CAPTURAR_CANCELACION(); }
                    else
                        if (tipo == 'MC') { MODIFICAR_CANCELACION(''); }
                }
                else {                          
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');

                    SACAR_NOMINAS();
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
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a capturar', 'error'); }
}

function MODIFICAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //VALIDAR_MULTINOMINA('MC');
        MODIFICAR_CANCELACION('');
    }
}

function NUEVA_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //VALIDAR_MULTINOMINA('NC');
        CAPTURAR_CANCELACION();
    }
}

function CAPTURAR_CANCELACION()
{
    $('#dmenu').hide();
    $('#dcaptura').show();
    CARGAR_DG("#dgp", "");
    CARGAR_TIPO_CANCELACIONES('#cbmotivo','x');
    CARGAR_ESTATUS_CANCELACIONES('#cboestatus','x');
    CARGAR_QUINCENAS("#cboquin");
}

function MODIFICAR_CANCELACION(condicion)
{
    $('#dmenu').hide();
    $('#dmoddoc').show();
   
    CARGAR_QUINCENAS("#cbomodquin");
    //var obj;
    //var parametros = {};
    //parametros.condicion = condicion;
    //parametros.quincena = 'Actual'
    //$.ajax({
    //    type: "POST",
    //    url: 'funciones.aspx/Listar_Cancelaciones',
    //    data: JSON.stringify(parametros),
    //    dataType: "json",
    //    async: true,
    //    cache: true,
    //    contentType: "application/json; charset=utf-8",
    //    beforeSend: function () {
    //        $('#loading').show();
    //    },
    //    success: function (data) {
    //        if (data.d[0] != "") {
    //            obj = $.parseJSON(data.d[0]);              
    //        }
    //        if (obj != undefined) {
    //            $('#dgdoc').datagrid({
    //                data: obj,
    //                pagination: false,
    //                enableFilter: false,
    //                rownumbers: true,
    //                singleSelect: true,
    //                striped: true,
    //                onClickRow: function () {
    //                    var fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
    //                    rows = $('#dgdoc').datagrid('getSelected');
    //                    if (rows) {                                                    
    //                        $('#btnEditarDoc').linkbutton('enable');                         
    //                    }
    //                },
    //                beforeSend: function () {
    //                    $('#loading').show();
    //                },
    //                error: function (err) {
    //                    $('#loading').hide(100);
    //                    $.messager.alert('Error', err.statusText, 'error');
    //                },
    //                complete: function ()
    //                { $('#loading').hide(100); }
    //            });
    //            FOCUS('#txtvaldoc', "#dgdoc");
    //            $('#btnEditarDoc').linkbutton('disable');
    //            CARGAR_CAMPOSBUSQUEDAS('#dgdoc', '#cbocamdoc', 'plaza');

    //            CARGAR_QUINCENAS("#cbomodquin");
               
    //        }
    //    },
    //    error: function (err) {
    //        $('#loading').hide(100);
    //        $.messager.alert('Error', err.statusText, 'error');
    //    },
    //    complete: function () {
    //        $('#loading').hide(100);
    //    }
    //});
   
}

function APLICAR_MODIFICACION(btnobj, movimiento) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valor = ""; var cadena = "";
        var estatus = $('#cboestatuscan').combobox('getValue');
        var motivo = $('#cbomotivoscan').combobox('getValue');
        if (motivo == "x") { $.messager.alert('Error', 'Falta el motivo de la cancelación', 'error'); return 0; }
        else
            if (estatus == "x") { $.messager.alert('Error', 'Falta el estatus de cancelación', 'error'); return 0; }
            else
            {
                fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
                rows = $('#dgdoc').datagrid('getSelected');
                var observaciones = $('#txtobservacionescan').textbox('getValue');
                var fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));          

                var plaza = rows[fields[0]]
                var empleado = rows[fields[1]];
                quin = rows[fields[9]] + "_" + rows[fields[10]] + "_" + rows[fields[11]];
                INSERTAR_REGISTRO(plaza, empleado, motivo, estatus, observaciones, movimiento, quin);

                if (contador>0)
                { $.messager.alert('Información', 'Cancelacion aplicada', 'info'); }
            }
    }
}

function CARCAR_CAPTURA_QUINCENA(valor)
{
    var parametros = {};
    parametros.condicion = '';
    parametros.quincena = valor
  
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Cancelaciones',
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
            }
            if (obj != undefined) {
                $('#dgdoc').datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    onClickRow: function () {
                        
                        rows = $('#dgdoc').datagrid('getSelected');
                        if (rows) {
                            $('#btnEditarDoc').linkbutton('enable');
                            $('#btnEliminarDoc').linkbutton('enable');
                        }
                    },
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
                $('#btnEditarDoc').linkbutton('disable');
                $('#btnEliminarDoc').linkbutton('disable');                
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

function EDITAR_DOCUMENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmoddoc').hide();
        $('#dmodificar').show();
        $('#btnModificar').linkbutton({ disabled: false });
        $('#btnEmodificar').linkbutton({ disabled: true });

       // var fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
        var rows = $('#dgdoc').datagrid('getSelected');
        if (rows) {
            $('#txtplaza').textbox('setValue', rows.plaza);
            $('#txtempleado').textbox('setValue', rows.numemp);
            $('#txtnombre').textbox('setValue', rows.nomcom);

            CARGAR_TIPO_CANCELACIONES('#cbomotivoscan', rows.fkMotivo);

            CARGAR_ESTATUS_CANCELACIONES('#cboestatuscan', rows.Estatus);

            $("#txtobservacionescan").textbox("setValue", rows.Observaciones)
        }
    }
}

function ELIMINAR_DOCUMENTO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmoddoc').hide();
        $('#dmodificar').show();
        $('#btnModificar').linkbutton({ disabled: true });
        $('#btnEmodificar').linkbutton({ disabled: false });
       
        var rows = $('#dgdoc').datagrid('getSelected');
        if (rows) {
            $('#txtplaza').textbox('setValue', rows.plaza);
            $('#txtempleado').textbox('setValue', rows.numemp);
            $('#txtnombre').textbox('setValue', rows.nomcom);

            CARGAR_TIPO_CANCELACIONES('#cbomotivoscan', rows.fkMotivo);
            $("#cbomotivoscan").combobox({ disabled: true });

            CARGAR_ESTATUS_CANCELACIONES('#cboestatuscan', rows.Estatus);
            $("#cboestatuscan").combobox({ disabled: true });

            $("#txtobservacionescan").textbox("setValue", rows.Observaciones)
            $("#txtobservacionescan").combobox({ disabled: true });
        }
    }
}


