var esProyeccion;
var temporizadorInfo;
var valnomina = "";
var nominasel = "";
var tipobloqueo = "";
$(document).ready(function () {
    //$(function () {
    //    if ($('#dgCalculo').datagrid('getData').total > 0) {
    //        setInterval(function () {
    //           cargaInformacionCalculo();
    //            $('#dgCalculo').datagrid('reload');
    //        }, 15000);
    //    }
    //});
  

    var esproy= $_GET('proy');
    if (esproy == "1") { esProyeccion = true; } else { esProyeccion = false; }

    document.getElementById('lbltitulo').innerHTML = 'EJECUCIÓN DE CÁLCULO' + ((esProyeccion) ? " PARA PROYECCION" : "");
   
        $('#btnPerfiles').bind('click', function () { cargaPerfiles(); });
        $('#btnEjecutar').bind('click', function () { ejecutarCalculo(); });
        $('#btnCancelar').bind('click', function () { cancelarCalculo(); });
        $('#btnActualizar').bind('click', function () {
           Listar_BloqueosDesbloqueos();
            cargaInformacionCalculo();
        });
        //$('#btnRegresar').bind('click', function () { alert('Saliendo de página...'); });


    $('#btnNomActual').bind('click', function () { VALOR_NOMINA_ACTUAL('#btnNomActual'); });
    


});
$(window).load(function () {
    Listar_BloqueosDesbloqueos();
    SACAR_NOMINAS();
});

//function grid_refresh() {  
//    cargaInformacionCalculo(); 
//    setTimeout(grid_refresh, 15000); // schedule next refresh after 15sec
//}


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
            tipobloqueo = data.d[0];
            if (data.d[0] == 'No') {
                $('#lblbloqueada').hide();
                $('#btnCancelar').show();
                $('#btnEjecutar').show();
                $('#btnPerfiles').show();
            }
            else {
                $('#lblbloqueada').show();
                $('#btnCancelar').hide();
                $('#btnEjecutar').hide();
                $('#btnPerfiles').hide();
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

function cargaInformacionCalculo() {
    //$('#dgCalculo').datagrid('loadData', { "total": 0, "rows": [] });
    var parametros = {};
    parametros.proyeccion = ((esProyeccion) ? "1" : "0");
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarInformacionCalculo",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgCalculo').datagrid({
                singleSelect: true,
                striped: true,
                rownumbers: true,               
                data: obj,
                columns: columnas       
            });
            $('#dgCalculo').show();            
            var rows = $('#dgCalculo').datagrid('getRows');
            if (rows.length <= 0) {
                cargaPerfiles();
            }
            else {
                var proceso = '', mensaje = '',procedimiento="";
                var tipo = '', perfil = $('#dgCalculo').datagrid('getRows')[0].Perfil;
                for (i = 0; i < rows.length; i++) {                    
                    tipo = $('#dgCalculo').datagrid('getRows')[i].Estado;
                    proceso = $('#dgCalculo').datagrid('getRows')[i].Descripcion;
                    mensaje = $('#dgCalculo').datagrid('getRows')[i].Mensaje;
                    procedimiento = $('#dgCalculo').datagrid('getRows')[i].Procedimiento;
                    if (tipo == 'En Ejecución' || tipo == 'Error' || tipo == 'Cancelado') { break; }
                }
                if (tipo == '') { document.getElementById('lblPerfil').innerHTML = "Seleccione Perfil A Ejecutar"; }

                if (tipo == 'Cancelado') {                    
                    $.messager.alert('Información', perfil + ' (Cancelado)', 'info');
                    $('#btnPerfiles').show();
                    $('#btnCancelar').hide();
                    document.getElementById('lblPerfil').innerHTML = "";                    
                    document.getElementById('lblerror').innerHTML = "";
                    document.getElementById('lblstore').innerHTML = "";
                    cargaPerfiles();
                }
                if (tipo == 'Error') {                
                    $.messager.alert('Información','(Terminado con errores) -- ' + procedimiento, 'info');                   
                    document.getElementById('lblPerfil').innerHTML = "";
                    document.getElementById('lblPerfil').innerHTML = perfil;
                    document.getElementById('lblstore').innerHTML = '(Terminado con errores) -- ' + procedimiento;
                    document.getElementById('lblerror').innerHTML = proceso + ' ' + mensaje;
                    $('#divProcedimientos').hide();
                    $('#divCalculo').hide();
                    $('#btnEjecutar').hide();
                    $('#divPerfiles').show();
                    $('#btnPerfiles').hide();
                    if (tipobloqueo == "No") {
                        cargaPerfiles();
                    }                  
                }
                if (tipo == 'En Ejecución') {
                    $('#btnCancelar').show();                    
                    document.getElementById('lblPerfil').innerHTML = "";
                    document.getElementById('lblPerfil').innerHTML = perfil;
                    document.getElementById('lblerror').innerHTML = "";
                    document.getElementById('lblstore').innerHTML = "";                                     
                    verificaProcesoEnEjecucion();

                    //grid_refresh();
                }
                if (tipo == 'Terminado') {
                    $('#divProcedimientos').hide();
                    $('#divCalculo').hide();
                    $('#btnEjecutar').hide();                
                    $('#divPerfiles').show();
                    

                    document.getElementById('lblPerfil').innerHTML = "";
                    document.getElementById('lblPerfil').innerHTML = "";
                    document.getElementById('lblerror').innerHTML = "";
                    document.getElementById('lblstore').innerHTML = "";
                   
                    $.messager.alert('Información', perfil + ' (Terminado Correctamente)', 'info');
                    if (tipobloqueo == "No") {                       
                        cargaPerfiles();
                    }                    
                }
            }
         
        },
        error: function (er) {            
            $.messager.alert('Error', er.responseText, 'error');
        }
        //complete: function () {
        //    $('dgCalculo').datagrid('reload'); // reload grid
        //}
    });
 
}

function cargaPerfiles() {            
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarPerfiles",
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
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
                    document.getElementById('lblstore').innerHTML = "";
                    document.getElementById('lblerror').innerHTML = "";
                    VALIDAR_MULTINOMINA();
                }
            });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
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
                $('#dextras').show();
                $('#lblnominas').hide();

                if (tipobloqueo == "No")
                { cargaInformacionCalculo(); }
               

                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);                
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').hide();
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

function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.session.set('valnomina', '');
        document.getElementById('lblquin1').innerHTML = "";
        document.getElementById('lblquin1').innerHTML = $.session.get('nominaAct');
    }
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

                    $('#dmenu').show();
                    $('#divPerfiles').hide();
                    $('#divCalculo').hide();
                    $('#btnActualizar').hide();
                    $('#btnEjecutar').show();
                    $('#divProcedimientos').show();
                    $('#btnCancelar').hide();
                    document.getElementById('lblPerfil').innerHTML = $('#dgPerfiles').datagrid('getSelected').Perfil;

                    document.getElementById('lblquin1').innerHTML = "";
                    document.getElementById('lblquin1').innerHTML = nominasel;


                    cargaProcedimientos();                   
                }
                else {                           
                    $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');
                    SACAR_NOMINAS();
                    $.session.set('nomina','');
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


function cargaProcedimientos() {  
    var parametros = {};
    parametros.clave = $('#dgPerfiles').datagrid('getSelected').Id;
    parametros.proyeccion = ((esProyeccion) ? "1" : "0");
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarProcedimientos",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        singleSelect: true,
        striped: true,
        rownumbers: true,
        autoLoad: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgProcedimientos').datagrid({
                singleSelect: true,
                striped: true,
                data: obj,
                columns: columnas
            });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }         
    });

}

function ejecutarCalculo() {
    $('#divPerfiles').hide();
    $('#divProcedimientos').hide();
    $('#btnEjecutar').hide();
    $('#btnPerfiles').hide();
    $('#btnActualizar').hide();
    $('#btnCancelar').show();
    $('#divCalculo').show();    
    var parametros = {};
    parametros.clave = $('#dgPerfiles').datagrid('getSelected').Id;
    parametros.proyeccion = ((esProyeccion) ? "1" : "0");
    parametros.multi = valnomina;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/EjecutarCalculo",
        data: JSON.stringify(parametros),
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d[0] == "0") {                
                cargaInformacionCalculo();
                $('#btnActualizar').show();
                //temporizadorInfo = setInterval(function () { cargaInformacionCalculo }, 10000);
            }
            else {
                //if (temporizadorInfo != null) { clearInterval(temporizadorInfo); }
                //alert(' Error al iniciar la ejecución de calculo');
                $.messager.alert('Error', data.d[1], 'error');
                cargaPerfiles();
                SACAR_NOMINAS();
            }
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }
    });
}

function verificaProcesoEnEjecucion() {
    $('#divPerfiles').hide();
    $('#divProcedimientos').hide();
    $('#btnEjecutar').hide();
    $('#btnPerfiles').hide();
    $('#btnRegresar').hide();  
    $('#btnActualizar').show();
    $('#divCalculo').show();
    cargaInformacionCalculo();
}

function cancelarCalculo() {
    //if (temporizadorInfo != null) { clearInterval(verificaProcesoEnEjecucion); }
    var parametros = {};
    parametros.proyeccion = ((esProyeccion) ? "1" : "0");
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CancelarCalculo",
        data: JSON.stringify(parametros),
        dataType: "json",       
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d == "0") {                
                $.messager.alert('Información', 'El calculo ha sido cancelado', 'info');
                verificaProcesoEnEjecucion();
            }
            else {  $.messager.alert('Error', 'Error al cancelar calculo', 'error'); }
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        }
    });
}

