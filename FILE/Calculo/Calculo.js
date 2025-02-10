var stridperfil = "";
var strperfil = "";
var strnomina = "";
var strproy = "";
var objvalores;
$(document).ready(function () {    
   // var valores = '{ "IdPerfil": "7", "DesPerfil": "Cálculo De Nómina Gobierno Del Estado", "NominaSel": "Nómina Ordinaria (11), 1ra. de Junio 2022 ", "NominaVal": "11|2022|0", "Proyeccion": false }';
    var valores = $_GET('data');
    if (valores != undefined) {
        var obj = $.parseJSON(valores);
        objvalores = obj;
    }
    else { objvalores = ""; }
    
    document.getElementById('lbltitulo').innerHTML = "";
    document.getElementById('lbltitulo').innerHTML = objvalores.DesPerfil;
    document.getElementById('lblquin').innerHTML = "";
    document.getElementById('lblquin').innerHTML = objvalores.NominaSel;

    cargaProcedimientos();

    $('#btnRPerfiles').bind('click', function () { IR_PAGINA("Menu_Calculo.aspx", ""); });
    $('#btnRListaPerfil').bind('click', function () {       
        $('#divProcedimientos').show();
        $('#divCalculo').hide();
        $('#btnEjecutar').show();
        $('#btnActualizar').hide();
        $('#btnRListaPerfil').hide();
        $('#divError').hide();        
        $('#btnCancelar').hide();
        cargaProcedimientos();
    });
    $('#btnEjecutar').bind('click', function () {        
        ejecutarCalculo();        
    });
    $('#btnActualizar').bind('click', function () {
        cargaInformacionCalculo();
    });
    $('#btnCancelar').bind('click', function () {
        cancelarCalculo();
    });
});

function grid_refresh() {  
    cargaInformacionCalculo(); 
    setTimeout(grid_refresh, 10000); // schedule next refresh after 15sec
}

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

function cargaProcedimientos() {
    var parametros = {};
    parametros.clave = objvalores.IdPerfil;
    parametros.proyeccion = ((objvalores.Proyeccion) ? "1" : "0");
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarProcedimientos",
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        beforeSend: function () {
            $('#loading').show();
        },
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgProcedimientos').datagrid({
                singleSelect: true,
                striped: true,              
                rownumbers: true,
                autoLoad: true,
                data: obj,
                columns: columnas
            });
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });

}

function ejecutarCalculo() {   
    var parametros = {};
    parametros.clave = objvalores.IdPerfil;
    parametros.proyeccion = ((objvalores.Proyeccion) ? "1" : "0");
    parametros.multi = objvalores.NominaVal;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/EjecutarCalculo",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: true,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                $('#loading').hide(100);
                $.messager.alert('Error', data.d[1], 'error');
            }
            else {               
                $('#divProcedimientos').hide();
                $('#btnEjecutar').hide();
                $('#divCalculo').show();
                $('#btnRListaPerfil').show();
                $('#btnRPerfiles').show();                
                $('#btnActualizar').show();
                $('#btnCancelar').show();
            }
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
            cargaInformacionCalculo();
        }
    });
}

function cargaInformacionCalculo() {   
    var parametros = {};
    parametros.proyeccion = ((objvalores.Proyeccion) ? "1" : "0");
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CargarInformacionCalculo",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        //beforeSend: function () {
        //    $('#loading').show();
        //},
        success: function (data) {
            //var columnas = jQuery.parseJSON(data.d[1]);
            var obj = $.parseJSON(data.d[0]);
            $('#dgCalculo').datagrid('loadData', { "total": 0, "rows": [] });

            $('#dgCalculo').datagrid({
                singleSelect: true,
                striped: true,
                rownumbers: true,
                //loadMsg:"Ejecutandose",
                data: obj
                //columns: columnas
            });
            $('#dgCalculo').show();
            //$('#dgCalculo').datagrid('loading');          

            var proceso = '', mensaje = '', procedimiento = ""; tipo = ''; fila = 0;
            var perfil = $('#dgCalculo').datagrid('getRows')[0].Perfil;
            var rows = $('#dgCalculo').datagrid('getRows');
            for (i = 0; i < rows.length; i++) {
                fila = i;
                tipo = $('#dgCalculo').datagrid('getRows')[i].Estado;
                proceso = $('#dgCalculo').datagrid('getRows')[i].Descripcion;
                mensaje = $('#dgCalculo').datagrid('getRows')[i].Mensaje;
                procedimiento = $('#dgCalculo').datagrid('getRows')[i].Procedimiento;
                if (tipo == 'En Ejecución' || tipo == 'Error' || tipo == 'Cancelado') { break; }
            }

            if (tipo == 'Cancelado') {
                //$.messager.alert('Información', perfil + ' (Cancelado)', 'info');
                $('#btnCancelar').hide();
                $('#btnActualizar').hide();
                // $('#dgCalculo').datagrid('loaded');

            }
            if (tipo == 'Error') {
                //$('#dgCalculo').datagrid('loaded');
                document.getElementById('lblproceso').innerHTML = "";
                document.getElementById('lblporciento').innerHTML = "";
                document.getElementById('lblPerfil').innerHTML = "";
                document.getElementById('lblPerfil').innerHTML = perfil;
                document.getElementById('lblstore').innerHTML = '(Terminado con errores) -- ' + procedimiento;
                document.getElementById('lblerror').innerHTML = proceso + ' ' + mensaje;
                $('#divProcedimientos').hide();
                $('#divCalculo').hide();
                $('#divError').show();
                $('#divCalculo').hide();
                $('#btnActualizar').hide();
                $('#btnCancelar').hide();
            }
            if (tipo == 'En Ejecución') {
                document.getElementById('lblproceso').innerHTML = "";
                document.getElementById('lblporciento').innerHTML = "";
                fila = fila + 1;             
                var porciento = numeral(fila / rows.length).format('0%');
                document.getElementById('lblporciento').innerHTML = '(En Proceso) -- ' + porciento  + ' / ' + fila + ' de ' + rows.length;
                document.getElementById('lblproceso').innerHTML = '(En Ejecución) -- ' + proceso + ' / ' + procedimiento;
                    cargaInformacionCalculo();
                }
            if (tipo == 'Terminado') {
                   // $('#dgCalculo').datagrid('loaded');
                    $.messager.alert('Información', objvalores.DesPerfil + ' (Terminado Correctamente)', 'info');
                    IR_PAGINA("Menu_Calculo.aspx", "");
            }
            if (tipo == 'Pendiente De Ejecución') {              
                cargaInformacionCalculo();
            }
        },
        error: function (er) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
            if (tipo == 'Cancelado') {
                $.messager.alert('Información', perfil + ' (Cancelado)', 'info');
            }
        }
    });

}

function cancelarCalculo() {    
    var parametros = {};
    parametros.proyeccion = ((objvalores.Proyeccion) ? "1" : "0");
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
            if (data.d == "1") {
                $.messager.alert('Error', 'Error al cancelar cálculo', 'error');
            }
            else { cargaInformacionCalculo(); }
        },
        error: function (er) {
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
           
        }
    });
}
