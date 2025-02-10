var nominasel = '';
var valnomina = '';
$(document).ready(function () {
   // $.session.set('usuario', 'miguel');

    
    document.getElementById('lbltitulo').innerHTML = 'CONTROL DE QUINCENAS';
    document.getElementById('lbltitulo').innerHTML = 'Opciones De Control';
    cargaInformacion();
    
        $('#btnRegresar').bind('click', function () { document.location = "ControlQuincenas.aspx"; });
        $('#btnAperturaOrd').bind('click', function () { aperturaQuincena('#btnAperturaOrd'); });
        $('#btnAperturaExt').bind('click', function () { aperturaQuincena('#btnAperturaExt'); });
        $('#btnApExtAnterior').bind('click', function () { aperturaQuincena('#btnApExtAnterior'); });
        $('#btnApExtActual').bind('click', function () { aperturaQuincena('#btnApExtAnterior'); });
        $('#btnCierreQuincena').bind('click', function () { valnomina = ""; cierreQuincena(); });
});

function CREAR_BONONES_NOMINAS_ANTERIORES(objm)
{    
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++)
    {       
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = 'center';

        btn = $('<a />', {
            type: 'button',
            width: 70 + "%",
            //text: objm[b].CierreMulti,        
            id: "btn" +objm[b].cvequica+objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
        });

        tr = $(tr).append(                            
          $(td).append(btn)
        );
        table.append(tr);


        $('#btn' +objm[b].cvequica+objm[b].numext).linkbutton({
            //iconCls: 'icon-cerrar',
            size: 'large',
            width: 70 + "%",
           // iconAlign: 'left',
            plain: false,            
            text: objm[b].CierreMulti,
        }).bind('click', function () {           
            nominasel = this.text;
            valnomina = this.name;
            cierreQuincena();
        });
    }
}

function cargaInformacion() {
    /*$('#btnAperturaOrd').hide();
    $('#btnAperturaExt').hide();
    $('#btnCierreQuincena').hide();*/
    //$('#btnCierreQuincena').linkbutton('disable');
    //$('#btnAperturaOrd').linkbutton('disable');
    //$('#btnAperturaExt').linkbutton('disable');
    $.ajax({
        type: "POST",
        url: "ControlQuincenas.aspx/ConsultaControl",
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0)
            {
                $('#dextras').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM);
            }
            else {
                $('#dextras').hide();
                valnomina = '';
                nominasel = '';
            }
         
            $('#btnAperturaOrd').linkbutton({ text: obj[0].SigOrd, name: obj[0].SigOrdClave });
            $('#btnAperturaExt').linkbutton({ text: obj[0].SigExt, name: obj[0].SigExtClave });
            $('#btnApExtAnterior').linkbutton({ text: obj[0].AntExt, name: obj[0].AntExtClave });
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

function cierreQuincena() {
    //if ($('#btnCierreQuincena').linkbutton('options').disabled) { return false; }
    //else
    //{
        //var btntitulo = "";
        //if (nominasel != "") { btntitulo = nominasel; }
        //else { btntitulo = $('#btnCierreQuincena').linkbutton('options').text; }

        $.messager.confirm('Cierre De Nómina', '¿' + nominasel + '?', function (r) {
            if (r) {               
                var parametros = {};              
                parametros.multi = valnomina;
                $.ajax({
                    type: "POST",
                    url: "ControlQuincenas.aspx/CierreQuincena",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        var obj = $.parseJSON(data.d);
                        if (obj[0] == '0') {
                            $.messager.alert('Información', obj[1], 'info');
                            cargaInformacion();
                        }
                        else {
                            $.messager.alert('Error', 'Error de cierre, ' + obj[1], 'error');
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
        });
    //}
}

function aperturaQuincena(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.messager.confirm('Apertura De Nómina', '¿' + $(btnobj).linkbutton('options').text + '?', function (r) {
            if (r) {
                var parametros = {};
                parametros.tipo = $(btnobj).linkbutton('options').name;               
                $.ajax({
                    type: "POST",
                    url: "ControlQuincenas.aspx/AperturaQuincena",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        var obj = $.parseJSON(data.d);
                        if (obj[0] == '0') {
                            $.messager.alert('Información', obj[1], 'info');
                            cargaInformacion();
                        }
                        else {
                            $.messager.alert('Error', 'Error de apertura, ' + obj[1], 'error');
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
        });
    }
}

function VALIDAR_MULTINOMINA() {
    var parametros = {};
    parametros.multi = $.session.get('valnomina');
    $.ajax({
        type: "POST",
        url: "ControlQuincenas.aspx/Validacion_Multinomina",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                cierreQuincena();
            }
            else {
                var nomina = "";
                if ($.session.get('nomina') != undefined) { nomina = $.session.get('nomina'); }
                else { nomina = $.session.get('nominaAct'); }
                $.messager.alert('Error', 'La nomina ' + nomina + ' se encuentra cerrada', 'error');                
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


