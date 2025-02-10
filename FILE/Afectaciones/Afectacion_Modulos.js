var tblmov = "";
var tbldoc = "";
$(document).ready(function () {   
    $('#btnCMP').bind('click', function () { AFECTACION_COMPLETA('#btnCMP','MP'); });
    $('#btnCMC').bind('click', function () { AFECTACION_COMPLETA('#btnCMC','MC'); });
    $('#btnCME').bind('click', function () { AFECTACION_COMPLETA('#btnCME','ME'); });
    $('#btnCIL').bind('click', function () { AFECTACION_COMPLETA('#btnCIL','IL'); });
    $('#btnCDP').bind('click', function () { AFECTACION_COMPLETA('#btnCDP','DP'); });
    $('#btnCTR').bind('click', function () { AFECTACION_COMPLETA('#btnCTR','TR'); });
    $('#btnCRF').bind('click', function () { AFECTACION_COMPLETA('#btnCRF','RF'); });
});
$(window).load(function () {
    SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});


function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
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
                $('#btnCMP').linkbutton({ disabled: true });                
                $('#btnCMC').linkbutton({ disabled: true });                
                $('#btnCME').linkbutton({ disabled: true });                
                $('#btnCIL').linkbutton({ disabled: true });                
                $('#btnCDP').linkbutton({ disabled: true });                
                $('#btnCRF').linkbutton({ disabled: true });                
                $('#btnCTR').linkbutton({ disabled: true });                

                valnomina = '';
                nominasel = '';
            }

        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            //$('#loading').hide(100);
        }
    });
}

function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    // $('#dextras').append('<table cellpadding="2" id="tblm"></table>');
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
            width:100 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
        }).bind('click', function () {
            nominasel = this.text;
            valnomina = this.name;
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            $nominasel = btn[0].text;
            valnomina = btn[0].name;
        }
    }
}

function Listar_BloqueosDesbloqueos() {    
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/Listar_BloqueosDesbloqueos_Modulos",
       // data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);

            for (i = 0; i < obj.length; i++) {
                if (obj[i].Tipmov == "MP") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "MC"){
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "ME") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "IL") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "TR") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "DP") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
                }
                if (obj[i].Tipmov == "RF") {
                    if (obj[i].BloqueoAfectacion == "C") {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: false });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: false });
                    }
                    else {
                        $('#btnC' + obj[i].Tipmov).linkbutton({ disabled: true });
                        $('#btnP' + obj[i].Tipmov).linkbutton({ disabled: true });
                    }
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

function MOSTRAR_MENU_AFECTACION(tipomov) {
    tblmov = "rubmov" + tipomov;
    tbldoc = "AfeDoc" + tipomov;
        
}


function AFECTACION_COMPLETA(btnobj,tipmov) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {       
        if ((valnomina != undefined) && (valnomina != '')) {
            var parametros = {};
            parametros.multi = valnomina;
            $.ajax({
                type: "POST",
                url: "Afectacion_Funciones.aspx/Validacion_Multinomina",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1") {
                        AfectacionMovimientos(tipmov);
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
                   // $('#loading').hide(100);
                }
            });
        }
        else { $('#loading').hide(100); $.messager.alert('Error', 'Falta seleccionar la nomina a afectar', 'error'); }
    }
}

function AfectacionMovimientos(tipmov) {
    var parametros = {};
    parametros.tipoMov = tipmov;
    parametros.tipo = "C";
    parametros.valores = "";
    parametros.multi = valnomina;
    $.ajax({
        type: "POST",
        url: "Afectacion_Funciones.aspx/Afectacion",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
           // $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', "La afectación ha terminado", 'info');
               
                $('#derror').show();

                $('#dgcifra').datagrid('loadData', { "total": 0, "rows": [] });
                if (data.d[1] != "") {
                    var objcc = $.parseJSON(data.d[1]);
                    $('#dgcifra').datagrid({
                        pagination: false,
                        rownumbers: true,
                        pageSize: 10,
                        singleSelect: true,
                        striped: true,
                        width: "100%",
                        height: "100px",
                        data: objcc,
                        columns: [[
                            { field: 'Estado', title: 'Estado', width: 100, align: 'center' },
                            { field: 'Conteo', title: 'Conteo', width: 100, align: 'center' },
                        ]],
                    });
                }

                $('#dgerrores').datagrid('loadData', { "total": 0, "rows": [] });
                if (data.d[2] != "") {
                    var objdat = $.parseJSON(data.d[2]);
                    $('#dgerrores').datagrid({
                        pagination: false,
                        rownumbers: true,
                        pageSize: 10,
                        singleSelect: true,
                        striped: true,
                        width: "100%",
                        height: "200px",
                        data: objdat,
                        columns: [[
                            { field: 'documento', title: 'Documento', width: 150, align: 'center' },
                            { field: 'tipo', title: 'Tipo', width: 300, align: 'center' },
                            { field: 'documentosRelacionados', title: 'Doc. Relacionados', width: 500, align: 'left' },
                            { field: 'error', title: 'Error', width: 600, align: 'left' },
                        ]],
                    });
                }

                //$('#btnCMP').linkbutton({ selected: false });
                //$('#btnCMC').linkbutton({ selected: false });                
                //$('#btnCME').linkbutton({ selected: false });
                //$('#btnCIL').linkbutton({ selected: false });
                //$('#btnCDP').linkbutton({ selected: false });
                //$('#btnCRF').linkbutton({ selected: false });
                //$('#btnCTR').linkbutton({ selected: false });
            }
            else {
                $('#derror').hide();               
                $.messager.alert('Error', data.d[1], 'error');
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


