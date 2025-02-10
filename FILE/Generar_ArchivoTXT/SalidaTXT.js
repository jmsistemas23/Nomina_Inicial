var archivo = "";
$(document).ready(function () {
    $('#btngenerar').bind('click', function () {
        if ($('#txtarchivos').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el nombrre del archivo a generar', 'error'); }
        else {
            archivo = $('#txtarchivos').textbox('getValue');
            GENERAR_ARCHIVO_TXT();
        }
    });

    $('#btndescargar').click(function (e) {                     
        window.open('Descargar.aspx?Fileid=' + archivo);
    });
   
    //document.getElementById('btndescargar').addEventListener('click', function () {
    //    window.location.href = "archivos/prueba.txt";
    //}, false);

});


function GENERAR_ARCHIVO_TXT() {
    var parametros = {};
    parametros.nombrearchivo = archivo;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/CREAR_ARCHIVO_TXT",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") { $.messager.alert('Error', 'No Existe informacion a generar', 'error'); }
            else
            if (data.d[0] == "E") { $.messager.alert('Error', data.d, 'error'); }
            else {
                $.messager.alert('Información', 'Archivo Generado', 'info');
                $('#btndescargar').linkbutton({ disabled: false });
               // archivo = data.d[2];
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


function DESCARGAR_ARCHIVO_TXT() {
    var parametros = {};
    parametros.nombrearchivo = archivo;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/DESCARGAR_ARCHIVO_TXT",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") { $.messager.alert('Información', 'No existen datos a generar', 'info'); }           
        },
        error: function (a, b, c) {
            $('#loading').hide(100);
            $.messager.alert('Error', a.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}


