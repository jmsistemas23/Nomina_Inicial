var esProyeccion = "";
var valnomina = "";
$(document).ready(function () {
    var esproy = $_GET('proy');
    if (esproy != undefined) {
        esProyeccion = esproy;
    }
    else { esproy = "0";}
    
    if (esproy == "1") { esProyeccion = true; } else { esProyeccion = false; }

    document.getElementById('lbltitulo').innerHTML = 'EJECUCIÓN DE CÁLCULO' + ((esProyeccion) ? " PARA PROYECCION" : "");

    $('#btnActualizar').bind('click', function () {
        Listar_BloqueosDesbloqueos();       
    });
});
$(window).load(function () {
    Listar_BloqueosDesbloqueos();
    
});

function IR_PAGINA(url, parametros) {
    var strpagina = "";
    if (parametros != "") { strpagina = url + "?" + parametros; } else { strpagina = url; }
    $.ajax({
        url: url + "/GetResponse",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == true) {
                window.location = strpagina;
            }
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', c, 'error');
        }
    });
}

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.tipomov = '';
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
            //tipobloqueo = data.d[0];
            if (data.d[0] == 'No') {
                $('#lblbloqueada').hide();
                $('#lblnominas').show();
                $('#dgPerfiles').hide();               

                SACAR_NOMINAS();
                $('#dmenu').hide();
            }
            else {
                $('#dgPerfiles').hide();
                $('#dextras').hide();
                
                $('#lblbloqueada').show();
                $('#lblnominas').show();
                $('#dmenu').show();
                document.getElementById('lblbloqueada').innerHTML = "Cálculo Bloqueado";
                              
                $.messager.alert('Error', 'Cálculo Bloqueado', 'error');
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
                if (data.d[0] == "1") {

                    var valores = {};
                    valores.IdPerfil = $('#dgPerfiles').datagrid('getSelected').Id;
                    valores.DesPerfil = $('#dgPerfiles').datagrid('getSelected').Perfil
                    valores.NominaSel = nominasel;
                    valores.NominaVal = valnomina
                    valores.Proyeccion = esProyeccion;
                    var jsonvalores = JSON.stringify(valores);

                    IR_PAGINA("Calculo.aspx", "data=" + jsonvalores);                   
                }
                else {
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                    SACAR_NOMINAS();
                    $.session.set('nomina', '');
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
    else { $.messager.alert('Error', 'Falta seleccionar la nomina a calcular', 'error'); }
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
                $('#dextras').show();
                $('#lblnominas').hide();                 

                cargaPerfiles();

                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);

            }
            else {
                $('#lblnominas').show();
                $('#dextras').hide();
                document.getElementById('lblnominas').innerHTML = "Nomina Cerrada";
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

function cargaPerfiles() {
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarPerfiles",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgPerfiles').datagrid({
                singleSelect: true,
                striped: true,
                rownumbers: true,
                autoLoad: true,
                data: obj,
                columns: columnas,
                onClickRow: function () {                  
                    VALIDAR_MULTINOMINA();
                }
            });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}
