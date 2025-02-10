var datoscer = 0;
var datoskey = 0;
$(document).ready(function () {
    CARGAR_EMPRESAS("");

    var text = $('#txtvalor');
    text.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var valor = text.val();
            CARGAR_EMPRESAS(valor);
        }
    });
  
    $('#btnBempleado').bind('click', function () { CARGAR_EMPRESAS($('#txtvalor').textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_LISTA(); });

    $('#btnEditar').bind('click', function () { Editar('#btnEditar'); });

    $('#btnEliminar').bind('click', function () { Eliminar('#btnEliminar'); });

    $('#btnGenerar').bind('click', function () { GENERAR(); });

    $('#btnGuardar').bind('click', function () { GUARDAR('#btnGuardar'); });

    $('#btnRegresar').bind('click', function () {
        $('#dcaptura').hide();
        $('#dinicial').show();
        $('#btnGCaptura').linkbutton({ disabled: false });   
        $('#btnEditar').linkbutton({ disabled: true });
        $('#btnEliminar').linkbutton({ disabled: true });   
        var rows = $('#dg').datagrid('getSelected');
        if (rows) {
            DESMARCAR_FILA_GRID('#dg');
        }       
    });

    $('#txtCertificado').filebox({
        buttonText: 'Examinar',
        prompt: 'Seleccione el Certificado',
        accept: '.CER',
        multiple: false,
        onChange: function (newValue, oldValue) {
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById("cer").src = evt.target.result;
                }
                reader.readAsBinaryString(files[0]);               
                //reader.readAsDataURL(files[0]);
            }
        }
    });
   
    $('#txtLlavePrivada').filebox({
        buttonText: 'Examinar',
        prompt: 'Seleccione la Llave',
        accept: '.KEY',
        multiple: false,
        onChange: function (newValue, oldValue) {
           
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    document.getElementById("key").src = evt.target.result;      
                }
                reader.readAsBinaryString(files[0]);  
                //reader.readAsText(files[0]);
                //reader.readAsDataURL(files[0]);
            }
        }
    });
});

function CARGAR_EMPRESAS(filtro) {   
        //if (filtro != "") { $('#txtvalor').textbox('setValue', filtro); }
        //else { filtro = $('#txtvalor').textbox('getValue'); }

        //if (filtro == undefined) { filtro = ""; }

   
    var parametros = {};
    parametros.Filtro = filtro;

    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Cargar_Empresas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                var obj = jQuery.parseJSON(data.d[2]);

                $('#dg').datagrid({
                    data: obj,
                    pagination: true,
                    enableFilter: true,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    scroll: true,
                    pageSize: 20,
                    showPageList: false,
                    onClickRow: function () {
                        
                      
                        $('#btnEditar').linkbutton({ disabled: false });
                        $('#btnEliminar').linkbutton({ disabled: false });

                        //var row = $('#dg').datagrid('getSelected');
                        //$('#txtempleado').textbox('setValue', row.numemp);
                        //$('#txtrfc').textbox('setValue', row.rfccom);
                        //$('#txtcurp').textbox('setValue', row.curpemp);
                        //$('#txtpaterno').textbox('setValue', row.patemp);
                        //$('#txtmaterno').textbox('setValue', row.matemp);
                        //$('#txtnombres').textbox('setValue', row.nomemp);
                        //$('#txtcvecat').textbox('setValue', row.cvepuepl);
                        //$('#txtdescat').textbox('setValue', row.despue);
                        //$('#txtcveads').textbox('setValue', row.cveadspl);
                        //$('#txtdesads').textbox('setValue', row.descentro);
                        //$('#txtcvepag').textbox('setValue', row.cvepagpl);
                        //$('#txtdespag').textbox('setValue', row.despag);                   
                    }
                });
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function () { $('#loading').hide(100); }
    });
}

function LIMPIAR_LISTA() {
    $('#txtvalor').textbox('setValue', '');   
    $('#btnEditar').linkbutton({ disabled: true });
    $('#btnEliminar').linkbutton({ disabled: true });   
    var rows = $('#dg').datagrid('getSelected');
    if (rows) {
        DESMARCAR_FILA_GRID('#dg');
    }
    else { CARGAR_EMPRESAS(""); }  
}

function Editar(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var rows = $('#dg').datagrid('getSelected');
        if (rows) {
            $('#dcaptura').show();
            $('#dinicial').hide();
            $('#btnLCaptura').linkbutton({ disabled: false }); 
            $('#btnGuardar').linkbutton({ disabled: true });
            $('#btnGCaptura').linkbutton({ text: 'Guardar', iconCls: 'icon-save' })

            $('#txtDescripcion').textbox({ readonly: false });
            $('#txtContribuyente').textbox({ readonly: false });
            $('#txtClave').textbox({ readonly: false });
            $('#txtCertificado').filebox({ readonly: false });
            $('#txtLlavePrivada').filebox({ readonly: false });
            $('#txtNoCertificado').textbox({ readonly: true });
            $('#dbfechacreacion').datebox({ readonly: true });
            $('#dbfechavencimiento').datebox({ readonly: true });

            $('#txtDescripcion').textbox('setValue', rows.Descripcion);  
            $('#txtContribuyente').textbox('setValue', rows.Contribuyente);  
            $('#txtCertificado').filebox('setValue', rows.CerBase); 
            $('#txtLlavePrivada').filebox('setValue', rows.KeyBase); 
            $('#txtClave').textbox('setValue', rows.Clave);          
            $('#txtNoCertificado').textbox('setValue', rows.NoCertificado);
            $('#dbfechacreacion').datebox('setValue', rows.FechaCreacion);
            $('#dbfechavencimiento').datebox('setValue', rows.Vigencia);

        }
        else {
            $.messager.alert('Error', 'Falta seleccionar un organismo', 'error'); 
        }
    }
}

function Eliminar(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var rows = $('#dg').datagrid('getSelected');
        if (rows) {
            $('#dcaptura').show();
            $('#dinicial').hide();
            $('#btnLCaptura').linkbutton({ disabled: true });   
           $('#btnGuardar').linkbutton({ disabled: false });
            $('#btnGuardar').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' })

            $('#txtDescripcion').textbox({ readonly: true });
            $('#txtContribuyente').textbox({ readonly: true });  
            $('#txtClave').textbox({ readonly: true });
            $('#txtCertificado').filebox({ readonly: true });
            $('#txtLlavePrivada').filebox({ readonly: true });
            $('#txtNoCertificado').textbox({ readonly: true });
            $('#dbfechacreacion').datebox({ readonly: true });
            $('#dbfechavencimiento').datebox({ readonly: true });

            $('#txtDescripcion').textbox('setValue', rows.Descripcion);
            $('#txtContribuyente').textbox('setValue', rows.Contribuyente);
            $('#txtCertificado').filebox('setValue', rows.CerBase);
            $('#txtLlavePrivada').filebox('setValue', rows.KeyBase);
            $('#txtClave').textbox('setValue', rows.Clave);
            $('#txtNoCertificado').textbox('setValue', rows.NoCertificado);
            $('#dbfechacreacion').datebox('setValue', rows.FechaCreacion);
            $('#dbfechavencimiento').datebox('setValue', rows.Vigencia);
        }
        else {
            $.messager.alert('Error', 'Falta seleccionar un organismo', 'error');
        }
    }
}

function GENERAR() {
    var tcertificado = $('#txtCertificado').next().find('.textbox-value')[0];
    var tLlavePrivada = $('#txtLlavePrivada').next().find('.textbox-value')[0];
    
    if (tcertificado == null) { $.messager.alert('Error', 'Falta Seleccionar el Certificado', 'error'); return; }
    else
        if (tLlavePrivada == null) { $.messager.alert('Error', 'Falta Seleccionar la Llave Privada', 'error'); return; }
        else
            if ($('#txtClave').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la Clave', 'error'); return; }
           else {
                var Certificado = $('#txtCertificado').next().find('input[type=file]')[0].files;
                var LlavePrivada = $('#txtLlavePrivada').next().find('input[type=file]')[0].files;


                var Certificado = Certificado[0].name;
               // var ss = Certificado.split('.');
               // var nCertificado = ss[0];
               
                var LlavePrivada = LlavePrivada[0].name;
                //var ss = LlavePrivada.split('.');
                //var nLlavePrivada = ss[0];
              
               var parametros = {};
                parametros.Certificado = Certificado;             
                parametros.FDCertificado = tcertificado.value;
                parametros.LlavePrivada = LlavePrivada;              
                parametros.FDLlavePrivada = tLlavePrivada.value;
                parametros.Clave = $('#txtClave').textbox('getValue');

               $.ajax({
            type: "POST",
            url: "Fun_Timbrado.aspx/Generar_LLavePrivada",
            data: JSON.stringify(parametros),
            async: true,
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $('#btnGuardar').linkbutton({ disabled: false }); 

                    $('#txtNoCertificado').textbox('setValue', data.d[2]);
                    localStorage.setItem('certificado64', data.d[3]);
                    $('#dbfechacreacion').datebox('setValue', data.d[4]);
                    $('#dbfechavencimiento').datebox('setValue', data.d[5]);

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
}

function GUARDAR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        var Certificado = $('#txtCertificado').next().find('input[type=file]')[0].files;
        var LlavePrivada = $('#txtLlavePrivada').next().find('input[type=file]')[0].files;

        //var rows = $('#dg').datagrid('getSelected');
        
        var parametros = {};
        parametros.rfc = $('#txtContribuyente').textbox('getValue');
        parametros.Certificado = Certificado[0].name;
        parametros.NoCertificado = $('#txtNoCertificado').textbox('getValue');
        parametros.Certificado64 = localStorage.getItem('certificado64');
        parametros.LlavePrivada = LlavePrivada[0].name;
        parametros.Clave = $('#txtClave').textbox('getValue');
        parametros.FechaCreacion = $('#dbfechacreacion').datebox('getValue');
        parametros.Vigencia = $('#dbfechavencimiento').datebox('getValue');

        $.ajax({
            type: "POST",
            url: "Fun_Timbrado.aspx/Guardar_Datos",
            data: JSON.stringify(parametros),
            async: true,
            cache: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {                                      
                    $('#txtNoCertificado').textbox('setValue', data.d[2]);
                    localStorage.setItem('certificado', data.d[3]);
                    $('#dbfechacreacion').datebox('setValue', data.d[4]);
                    $('#dbfechavencimiento').datebox('setValue', data.d[5]);
                   
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
}