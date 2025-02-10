var tipo, strtabla;
var dgobjeto = "";
var ArchivoDescarga = "";
var valnomina = "";
var nominasel = "";
$(document).ready(function () {
    //$.session.set("usuario", 'miguel');

    tipo = $_GET('tipo');
    if (tipo != undefined) { tipo = tipo; }
    else { tipo = ''; }

    //$("#husuario").val("Miguel.Sandoval");
    $("#htipocarga").val(tipo);
   

    if (tipo == 'I') { strtabla = 'procesp'; ArchivoDescarga = "ArchivoMuestra/ArchivoImportesFijos.xlsx"; dgobjeto = '#dglistaFI'; document.getElementById('lbltitulo').innerHTML = "importacion archivos importes fijos " ; }
    if (tipo == 'F') { strtabla = 'movcon_calc'; ArchivoDescarga = "ArchivoMuestra/ArchivoImportesFormula.xlsx"; dgobjeto = '#dglistaFO'; document.getElementById('lbltitulo').innerHTML = "importacion archivos por formula " ; }
    $(dgobjeto).show();

    $('#btnarchivo').click(function (e) {
        e.preventDefault();                
        window.location.href = ArchivoDescarga;      
    })
    
    $('#btnEliminar').click(function () { ELIMINAR_INDICADOR('#btnEliminar'); })

    CARGAR_REGISTROS(dgobjeto, 65, 30, '');
    CARGAR_INDICADORES('#cboindicadores');

    if ($.session.get("Validacion") != null) {
        CARGAR_REGISTROS(dgobjeto, 65, 30, '');
        CARGAR_INDICADORES('#cboindicadores');
    }

    $('#btnNomActual').bind('click', function () {
        VALOR_NOMINA_ACTUAL('#btnNomActual');
    });
    SACAR_NOMINAS();
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
                $('#dextras').show();
                $('#lblnominas').hide();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM,obj);
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
                valnomina = '';
                nominasel = '';
            }

            //if (obj[0].Tipo == 'Abierta') {
            //    $('#btnNomActual').linkbutton({ text: obj[0].Seleccion });
            //    $.session.set('valnomina', '');
            //    $('#lblnominas').hide();
            //    $.session.set('nominaAct', obj[0].Seleccion);
            //    $('#btnNomActual').linkbutton({ disabled: false });
            //    $('#btnNomActual').linkbutton('select');
            //    $('#btnNomActual').show();
            //}
            //else if (obj[0].Tipo == 'Cerrada') {
            //    $('#lblnominas').show();
            //    $.session.set('nominaAct', '');                
            //    //$('#btnNomActual').linkbutton({ text: obj[0].Cierre });
            //    //$('#btnNomActual').linkbutton({ disabled: true });
            //    //$('#btnNomActual').linkbutton('unselect');
            //    if (obj[0].Cierre == "") {
            //        if (objM.length == 0) {
            //            $('#lblnominas').show();
            //            $('#btncargar').hide();
            //            $('#btnexaminar').hide();
            //            $('#btnarchivo').hide();
            //            $('#btnEliminar').linkbutton({ disabled: true });
                        
            //        }
            //        else {
            //            $('#lblnominas').hide();
            //            $('#btncargar').show();
            //            $('#btnexaminar').show();
            //            $('#btnarchivo').show();
            //            $('#btnEliminar').linkbutton({ disabled: false });
            //        }
            //        $('#btnNomActual').hide();
            //    }

            //}
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
            VALIDAR_MULTINOMINA();
            $("#hmulti").val(this.name);
        });
        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            valnomina = btn[0].name;
            $("#hmulti").val(btn[0].name);
            VALIDAR_MULTINOMINA();
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        VALIDAR_MULTINOMINA();
        //$("#hmulti").val('');
        //$.session.set('valnomina', '');
        //document.getElementById('lblquin1').innerHTML = "";
        //document.getElementById('lblquin2').innerHTML = "";
        //document.getElementById('lblquin1').innerHTML = $.session.get('nominaAct');
        //document.getElementById('lblquin2').innerHTML = $.session.get('nominaAct');
    }
}


function CARGAR_REGISTROS(dgcontrol, ancho, alto, condicion) {  
    $(dgcontrol).datagrid({
        url: "Listar_Importacion.aspx?tipo=" + tipo + "&busqueda=" + condicion + "&multi=" + valnomina,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 10,
        width:  "100%",
        heigth: alto + "px"       
    });
   
}

function CARGAR_INDICADORES(objddl) {
    var parametros = {};
    parametros.strtipo = tipo;

    $.ajax({
        type: "POST",
        url: "funciones.aspx/Listar_Indicadores",
        data: JSON.stringify(parametros),
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
                    valueField: 'campo',
                    textField: 'descripcion',
                    editable: false,
                    onSelect: function (rec) {
                        if (rec.campo != "x") {
                            $('#btnEliminar').linkbutton('enable');
                            CARGAR_REGISTROS(dgobjeto, 65, 50, $('#cboindicadores').combobox('getValue'));
                        }
                        else
                        { $('#btnEliminar').linkbutton('disable'); }
                    }
                });
                $('#cboindicadores').combobox('enable');                
            }
            else { $('#cboindicadores').combobox('disable'); $('#btnEliminar').linkbutton('disable'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function datosValidacionPrueba(datos) {
    if (datos == "Si") {
        $.session.set('Validacion', datos);
        $('#loading').hide();
    }
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a cargar', 'error'); }
}

function ELIMINAR_INDICADOR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var parametros = {};
        parametros.strtipo = tipo;
        parametros.cveind = $('#cboindicadores').combobox('getValue');
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "funciones.aspx/Eliminar_Indicador",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1")
                {   $.messager.alert('Error', data.d[1], 'error'); }
                else
                {
                    CARGAR_REGISTROS(dgobjeto, 65, 50, '');
                    CARGAR_INDICADORES('#cboindicadores');
                    if (data.d[2] == "0")
                    {
                        $('#cboindicadores').combobox('disable');
                        $('#btnEliminar').linkbutton('disable');
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
    //if ($(dgcontrol).datagrid('getData').total == 0)
    //{
    //    $('#btnEliminar').linkbutton('disable');
    //    $('#cboindicadores').combobox('disable');
    //}
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



