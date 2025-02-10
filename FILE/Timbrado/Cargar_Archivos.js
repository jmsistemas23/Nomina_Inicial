$(document).ready(function () {
    
    $('#txtCertificado').filebox({
        buttonText: 'Examinar',
        prompt: 'Seleccione el Certificado',
        //accept: '.CER',
        multiple: false,
        icons: [{
            iconCls: 'icon-clear',
            handler: function (e) {
                $(e.data.target).filebox('clear');
            }
        }],
        onProgress: function (percent) {            
            $('#progressFile').progressbar('setValue', percent);
        },
        //onChange: function (nv, ov) {
        //    return $(this).files;
        //}  
        onChange: function (newValue, oldValue) {
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    localStorage.setItem('datos', evt.target.result); 
                }
                reader.readAsBinaryString(files[0]);  
               // render.readAsText(files[0]);
            }
            return $(this).files;
        },
        success: function (data) {            
            alert('succes');
        }     
    });
    $('#btnGCaptura').bind('click', function () { GENERAR(); });
});


function GENERAR() {
    var files = $('#txtCertificado').next().find('.textbox-value')[0];    
    var Certificado = $('#txtCertificado').next().find('input[type=file]')[0].files;    
   
    var parametros = {};
    parametros.Certificado = Certificado[0].name;   
    parametros.Data = localStorage.getItem('datos');
    
    $.ajax({
        type: "POST",
        url: "Fun_Timbrado.aspx/Generar_Sello",
        data: JSON.stringify(parametros),
        async: true,
        cache: false,
        contentType: false,
        processData: true,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseJSON.messager, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });   
}