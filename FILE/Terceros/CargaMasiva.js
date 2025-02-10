var valnomina = "";
var nominasel = "";

$(document).ready(function () {   
    $('#btnRegresar').bind('click', function () {
        //sessionStorage.removeItem('Validacion');
        $.session.set('Validacion','')
        $('#dvalidacion').hide();
        $('#dmenu').show();
        $("#hmulti").val('');
        SACAR_NOMINAS();
    });
    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_DG($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });
    $('#btnfiltrar').bind('click', function () { FILTRAR_DG($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });   
   
    if ( $.session.get('Validacion') != null) {
        $('#dvalidacion').show();
        $('#dmenu').hide();                
        $.session.set('filtro', "");
        CARGAR_DG("#dg", 'ValTerceroCarga', 70, 50);
        CARGAR_CAMPOSBUSQUEDA("#dg", "#cbocam");
    }

    //$('#btnNomActual').bind('click', function () { VALOR_NOMINA_ACTUAL('#btnNomActual'); });
   
});
$(window).load(function () {
    SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'TR';
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
            if (data.d[0] == 'C') {
                $('#lblbloqueada').hide();
                $('#dcarga').show();
            }
            else {
                $('#lblbloqueada').show();
                $('#dcarga').hide();
            }

            //if (data.d[0] == "C") {
            //    $('#btnNuevaCaptura').linkbutton({ disabled: false });
            //    $('#btnModificarCaptura').linkbutton({ disabled: false });
            //    $('#btnBajaTerceros').linkbutton({ disabled: false });
            //    $('#btnCambioTerceros').linkbutton({ disabled: false });
            //}
            //else {
            //    $('#btnNuevaCaptura').linkbutton({ disabled: true });
            //    $('#btnModificarCaptura').linkbutton({ disabled: true });
            //    $('#btnBajaTerceros').linkbutton({ disabled: true });
            //    $('#btnCambioTerceros').linkbutton({ disabled: true });
            //}
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
        url: "Funciones.aspx/ConsultaControl",
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
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
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
            width: 70 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
            VALIDAR_MULTINOMINA();
            $("#hmulti").val(valnomina);
        });
        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            $("#hmulti").val(valnomina);
            VALIDAR_MULTINOMINA();
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        //$.session.set('valnomina', '');
        VALIDAR_MULTINOMINA();
        $("#hmulti").val('');
        //document.getElementById('lblquinperfil').innerHTML = "";
        //document.getElementById('lblquinperfil').innerHTML = $.session.get('nominaAct');
        //document.getElementById('lblnuevacap').innerHTML = "";
        //document.getElementById('lblnuevacap').innerHTML = $.session.get('nominaAct');
        //document.getElementById('lblquindoc').innerHTML = "";
        //document.getElementById('lblquindoc').innerHTML = $.session.get('nominaAct');
        //document.getElementById('lblmodcap').innerHTML = "";
        //document.getElementById('lblmodcap').innerHTML = $.session.get('nominaAct');
    }
}

function datosValidacionPrueba(datos) {
    if (datos == "Si") {
        $.session.set('Validacion', datos);
        $('#loading').hide();
    }
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error'); }
}

function espera() {
    $('#loading').show();
}

function DISEÑO_DG(dgcontrol, strtabla) {
    var parametros = {};
    parametros.strtabla = strtabla;    

    var $datagrid = {};
    var columns = new Array();

    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Diseño_Cat",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var datos;
            if (data.d[0] != "") {
                var columnas = data.d[0].split('|');
                for (var col = 0; col < columnas.length; col++) {
                    datos = columnas[col].split(',');
                    var valor = datos[0];
                    var alinear = datos[1];
                    var titulo = datos[2];
                    var ancho = datos[3] + "px";

                    columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alinear });
                }
                $datagrid.columns = new Array(columns);
                $(dgcontrol).datagrid({ columns: "", url: "" });
                $(dgcontrol).datagrid($datagrid);

                if (data.d[1] != "")
                { anchodg = data.d[1]; }
                else { anchodg = 100; }

                if (data.d[2] != "")
                { altodg = data.d[2]; }
                else { altodg = 100; }

                $.session.set('filtro', "");               
                CARGAR_DG("#dg", strtabla, anchodg, altodg);
                CARGAR_CAMPOSBUSQUEDA("#dg", "#cbocam");
            }
            else { $.messager.alert('Error', 'Se requiere configurar la busqueda', 'error'); }
        }
    });
}
function CARGAR_DG(dgcontrol, strtabla, anchodg, altodg) {
    var con = "";
    if ($.session.get('filtro') != "") { con = $.session.get('filtro'); }
    $(dgcontrol).datagrid({
        url: "Listar_Datos.aspx?tabla=" + strtabla + "&busqueda=" + con+"&multi="+valnomina,
        pagination: true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,        
        striped: true,
        pageSize: 20,
        width: anchodg + "%",
        heigth: altodg + "%",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {                
                $('#txterror').textbox('setValue', rows.mensaje);
                windows("#dlg", 650, 150, "Error");
            }
        }
    });
}
function FILTRAR_DG(cbocampo, cbocondicion, txtvalor) {
    var condicion;
    if (txtvalor != "") {
        if (cbocondicion == 'like') { condicion = cbocampo + ' ' + cbocondicion + ' \'\'|' + txtvalor + '|\'\''; }
        else { condicion = cbocampo + ' ' + cbocondicion + ' \'\'' + txtvalor + '\'\''; }        
        $.session.set('filtro', condicion);
    }
    else { $.session.set('filtro',""); }
    CARGAR_DG("#dg", 'ValTerceroCarga', 70, 50);
}

function VALIDAR_MULTINOMINA() {   
    if ((valnomina != undefined) && (valnomina != '')) {
    var parametros = {};
    parametros.multi = valnomina;
    $.ajax({
        type: "POST",
        url: "funciones.aspx/Validacion_Multinomina",
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
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error'); }
}