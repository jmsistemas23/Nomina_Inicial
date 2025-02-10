$(document).ready(function () {
     //$('#p').empty().html('<embed width="800" height="600" src=""></embed>')
    $('#p').hide();   
    $('#Pdf').filebox({
        buttonText: 'Examinar',
        prompt: 'Selecciona Archivo',
        accept: '*.pdf',        
        multiple: false,
        onChange: function (newValue, oldValue) {
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    //$("#previewHeadImage").html('<img src="' + evt.target.result + '"/>');                   
                    $('#p').empty().html('<embed id="epdf" width="800" height="600" src="' + evt.target.result + '"></embed>')
                    $('#btnVista').linkbutton({disabled:false});
                }
                reader.readAsDataURL(files[0]);
            }
        }
    });

    $('#btnGuardar').bind('click', function () {                
        GuardarArchivo();
    });

    $('#btnVista').bind('click', function () {
        if ($('#btnVista').linkbutton('options').disabled) { return false; }
        else {
            $('#pvista').show();
            $('#pvista').empty().html('<embed id="evista" width="100%" height="100%" src="' + document.getElementById("epdf").src + '"></embed>')
            windows("#wvista", 60, 60, true, "Vista Previa");
        }
    });

    var texts = $('#txtclave');
    texts.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            MOSTRAR_IMAGEN($('#txtclave').textbox('getValue'));
        }
    });
});

function GuardarArchivo() {
    var file = $('#Pdf').next().find('.textbox-value')[0];
    var nombre = $('#Pdf').next().find('input[type=file]')[0].files;
    if (file == null) { alert("Falta el Archivo"); return; }
    var fileName = file.value;
    var nombre = nombre[0].name;
    // var filetype = fileName.substring(fileName.lastIndexOf('.'), fileName.length);        

    var base64image = document.getElementById("epdf").src;
    base64image = base64image.replace('data:application/pdf;base64,', '');

    var obj = {};
    // obj.Archivo = fileName;
    obj.nombre = nombre;
    obj.imageData = base64image;

    $.ajax({
        type: "POST",
        url: "funciones.aspx/GuardarArchivo",
        data: JSON.stringify(obj),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d[0] == "0") { $.messager.alert('Informacion', data.d[1], 'info'); }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (jqXHR, textStatus, thrownError) {
            if (jqXHR.status == "409") {
                var data = jqXHR.responseJSON;
            }
            else {
                $.messager.alert('Error', jqXHR.responseJSON.Message, 'error');
            }
        }
    });

}

function MOSTRAR_IMAGEN(clave) {
    var parametros = {};
    parametros.clave = clave;
    var obj = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/MostrarArchivo',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                obj = jQuery.parseJSON(data.d[1]);
                var imagen = base64js.fromByteArray(obj);                
                var url = "data:application/pdf;base64," + imagen;
                $('#p').show();
                $('#p').empty().html('<embed id="epdf"  width="800" height="600" src="' + url+ '"></embed>')

                //var obj = document.createElement('object');
                //obj.style.width = '800';
                //obj.style.height = '600';
                //obj.type = 'application/pdf';
                //obj.data = 'data:application/pdf;base64,' + imagen;
                //document.body.appendChild(obj);
                //$('#p').appendChild(obj);
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
