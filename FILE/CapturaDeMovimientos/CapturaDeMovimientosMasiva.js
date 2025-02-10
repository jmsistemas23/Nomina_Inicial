var valnomina = "";
var nominasel = "";
var strtipo = "";
var cvemov = "";
var cvedoc = "";

$(document).ready(function () {
  

    var tipo = $_GET('tipo');
    if (tipo != undefined) { strtipo = tipo; }
    else { strtipo = 'MP'; }

   
    $("#htipo").val(strtipo);

    SACAR_NOMINAS();
  
    if (strtipo == 'MC') { document.getElementById('lbltitulo').innerHTML = "PAGOS Y DESCUENTOS DIVERSOS"; }
    if (strtipo == 'MP') { document.getElementById('lbltitulo').innerHTML = "MOVIMIENTOS DE PERSONAL"; }
    if (strtipo == 'DP') { document.getElementById('lbltitulo').innerHTML = "DATOS PERSONALES"; }
    if (strtipo == 'IL') { document.getElementById('lbltitulo').innerHTML = "INCIDENCIAS LABORALES"; }
      
    $('#btnExportarArchivo').bind('click', function () {
        $('#dexportar').show();
        $('#dmenu').hide();
        $('#cboopciones').combobox('setValue', 'Des');
        $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
       
       CARGAR_MOVIMIENTOS('#lstmod');
    });

    $('#btnImportarArchivo').bind('click', function () {
        $('#dimportar').show();
        $('#dmenu').hide();
        $('#cbocammov').combobox('setValue', 'Des');
        $('#txtvalmov').textbox('clear').textbox('textbox').focus();             
    });

    $('#btnRexportar').bind('click', function () { BTN_REGRESAR_EXPORTAR(); });
    $('#btnRimportar').bind('click', function () { BTN_REGRESAR_IMPORTAR(); });

   
    $('#btnexaminar').click(function (e) {      
         $("#cargaArchivo").click(); 
    });
           
    //seleccion del nodo en el arbol de movimientos
    $('#lstmod').tree({
        onClick: function (node) {
            if (node.children.length <= 0) {
                cvemov = node.nombre;
                $("#hmov").val(node.nombre);
            }
        }
    });

    $('#lstmov').tree({
        onClick: function (node) {
            if (node.children.length <= 0) {
                cvemov = node.nombre;
                $("#hmov").val(node.nombre);
            }
        }
    });

  
    FILTRAR_TREE_TXT('#txtmovimiento', '#lstmod');  
    FILTRAR_TREE_TXT('#txtvalmov', '#lstmov');

    if ($.session.get("Validacion") != null) {
        
    }

   
});


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
            $("#hmulti").val(this.name);
            VALIDAR_MULTINOMINA();         
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            $("#hmulti").val(this.name);
            VALIDAR_MULTINOMINA();
        }
    }
}

function BUSCAR_MOVIMIENTO(txtdoc) {
    if (txtdoc != '') {
        var parametros = {};
        parametros.modulo = strtipo;
        parametros.movimiento = txtdoc;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/BuscarMovimiento",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "0") {
                    cvemov = data.d[0];                    
                    cvedoc = '';                  
                }
                else {
                    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
                    $.messager.alert('Error', data.d[1], 'error');
                }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', er.statusText, 'error');
            },
            complete: function ()
            { $('#loading').hide(100); }
        });
    }
    else { $.messager.alert('Advertencia', "Falta el documento a buscar", 'warning'); }
}

function CARGAR_MOVIMIENTOS(lstobj) {
    var parametros = {};
  
    parametros.strtipo = strtipo;
    parametros.strclave = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Listar_Movimientos',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "0") {               
                    var obj = $.parseJSON(data.d[1]);
                    $(lstobj).tree({
                        data: obj,
                        formatter: function (node) {
                            return '<span title=\'' + node.nombre + "-" + node.text + '\' class=\'easyui-tooltip\'>' + node.text + '</span>';
                        },
                    });
                    $(lstobj).tree('collapseAll');
                    $('#btnexaminar').linkbutton({ disabled: false });
                    $('#btncargar').linkbutton({ disabled: false });
            }
            else { $.messager.alert('Error', "No se tiene permisos del módulo " + document.getElementById('lbltitulo').innerHTML, 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function VALIDAR_MULTINOMINA() {   
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
                if (data.d[0] == "0") {
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');

                    SACAR_NOMINAS();
                }
                CARGAR_MOVIMIENTOS('#lstmov');             
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

function BTN_REGRESAR_EXPORTAR() {
    $('#dexportar').hide();  
    $('#dmenu').show();
    $('#cboopciones').combobox('setValue', 'Des');
    $('#txtmovimiento').textbox('clear').textbox('textbox').focus();
    $('#lstmod').tree('doFilter', '');
    $('#lstmod').tree('collapseAll');
    nominasel = '';
    valnomina = '';
    SACAR_NOMINAS();
}

function BTN_REGRESAR_IMPORTAR() {   
    $('#dimportar').hide();
    $('#dmenu').show();
    $('#cbocammov').combobox('setValue', 'Des');
    $('#txtvalmov').textbox('clear').textbox('textbox').focus();
    $('#lstmov').tree('doFilter', '');
    $('#lstmov').tree('collapseAll');
    nominasel = '';
    valnomina = '';
    SACAR_NOMINAS();
}

function datosValidacionPrueba(datos) {
    if (datos == "Si") {
        //$.session.set('Validacion', datos);
        //$('#loading').hide();
        cvemov = $("#hmov").val();
        window.location.href = "PlantillasMovimientos/plantilla_Mov_" + cvemov + ".xls";
    }
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error'); }
}





