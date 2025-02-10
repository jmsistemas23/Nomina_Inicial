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

    $('#btnGenerar').bind('click', function () {          
        var Campos = $('#txtDescripcion').textbox('getValue') + "@" + $('#txtContribuyente').textbox('getValue') + "@" + $('#txtClave').textbox('getValue') + "@" + $('#txtCertificado').textbox('getValue') + "@" + $('#txtLlavePrivada').textbox('getValue')
        $.session.set('Campos', Campos);         
    });

    $('#btnGuardar').bind('click', function () { GUARDAR('#btnGuardar'); });

    $('#btnLCaptura').bind('click', function () {
        $('#txtDescripcion').textbox('setValue', '');
        $('#txtContribuyente').textbox('setValue', '');
        $('#txtClave').textbox('setValue','');
        $('#txtCertificado').textbox('setValue','');
        $('#txtLlavePrivada').textbox('setValue','');        
        $('#txtNoCertificado').textbox('setValue', '');       
        $('#dbfechacreacion').datebox('setValue', '');
        $('#dbfechavencimiento').datebox('setValue', '');
        $('#txtCertificado').textbox('setValue','');
        $('#txtLlavePrivada').textbox('setValue', '');
    });

    $('#btnRegresar').bind('click', function () {
        $('#dcaptura').hide();
        $('#dinicial').show();
        $('#btnGCaptura').linkbutton({ disabled: false });
        $('#btnEditar').linkbutton({ disabled: true });
        $('#btnEliminar').linkbutton({ disabled: true });
        if ($.session.get('valores') == null) {
            var rows = $('#dg').datagrid('getSelected');
            if (rows) {
                DESMARCAR_FILA_GRID('#dg');
            }
        }
        else { CARGAR_EMPRESAS(""); }
    });


    if ($.session.get('valores') != null) {
        $('#dcaptura').show();
        $('#dinicial').hide();

        $('#btnLCaptura').linkbutton({ disabled: false });
        $('#btnGuardar').linkbutton({ disabled: false });

        var campos = $.session.get('Campos').split('@');
        $('#txtDescripcion').textbox('setValue', campos[0]);
        $('#txtContribuyente').textbox('setValue', campos[1]);
        $('#txtClave').textbox('setValue', campos[2]);
        $('#txtCertificado').textbox('setValue', campos[3]);
        $('#txtLlavePrivada').textbox('setValue', campos[4]);                   

        $('#txtNoCertificado').textbox('setValue', localStorage.getItem('Nocertificado'));
        $('#dbfechacreacion').datebox('setValue', localStorage.getItem('fecha'));
        $('#dbfechavencimiento').datebox('setValue', localStorage.getItem('vigencia'));

        $('#txtCertificado').textbox('setValue', localStorage.getItem('nomcer'));
        $('#txtLlavePrivada').textbox('setValue', localStorage.getItem('nomkey'));   
    }
 
});

function Cargar_Respuesta(strError,Mensaje,Valores,nomcer,nomkey) {
    if (strError == "0") {      
        $('#loading').hide();
        $.session.set('valores', Valores);


       var  Datos = Valores.split('@');       
        localStorage.setItem('Nocertificado', Datos[0]);       
        localStorage.setItem('Sello', Datos[1]);
        localStorage.setItem('fecha', Datos[2]);
        localStorage.setItem('vigencia', Datos[3]);

        localStorage.setItem('nomcer', nomcer);
        localStorage.setItem('nomkey', nomkey);   
    }
    else { $.messager.alert('Error', Mensaje, 'error'); }
}

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
                        //$('#txtLlavePrivada').textbox('setValue', row.NomArchivoCer);
                        //$('#txtCertificado').textbox('setValue', row.NomArchivoKey)
                                  
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
            $('#btnGuardar').linkbutton({ disabled: false });
            $('#btnGCaptura').linkbutton({ text: 'Guardar', iconCls: 'icon-save' })

            $('#txtDescripcion').textbox({ readonly: false });
            $('#txtContribuyente').textbox({ readonly: false });
            $('#txtClave').textbox({ readonly: false });
           
            $('#txtNoCertificado').textbox({ readonly: true });
            $('#dbfechacreacion').datebox({ readonly: true });
            $('#dbfechavencimiento').datebox({ readonly: true });

            $('#txtDescripcion').textbox('setValue', rows.Descripcion);
            $('#txtContribuyente').textbox('setValue', rows.Contribuyente);

            $('#txtLlavePrivada').textbox('setValue', rows.NomArchivoCer);
            $('#txtCertificado').textbox('setValue', rows.NomArchivoKey)
           
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
            
            $('#txtNoCertificado').textbox({ readonly: true });
            $('#dbfechacreacion').datebox({ readonly: true });
            $('#dbfechavencimiento').datebox({ readonly: true });

            $('#txtDescripcion').textbox('setValue', rows.Descripcion);
            $('#txtContribuyente').textbox('setValue', rows.Contribuyente);
           
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
    var files = $("#FUExaminarCer").get(0).files;

    var data = new FormData();
    data.append('data', files[0]);

    $.ajax({
        type: "POST",
        url: "cat_Empresas.aspx/Generar_Sello",       
        data: data,
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


function GUARDAR(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {       
        var campos = $('#txtContribuyente').textbox('getValue') + "@" + $('#txtCertificado').textbox('getValue') + "@" + $('#txtNoCertificado').textbox('getValue') + "@" +
            $('#txtLlavePrivada').textbox('getValue') + "@" + $('#txtClave').textbox('getValue') + "@" + $('#dbfechacreacion').datebox('getValue') + "@" + $('#dbfechavencimiento').datebox('getValue');
        $.session.set('Campos', campos);

       var sello = localStorage.getItem('Sello');

        var parametros = {};
        parametros.rfc = $('#txtContribuyente').textbox('getValue');
        parametros.Certificado = $('#txtCertificado').textbox('getValue');
        parametros.NoCertificado = $('#txtNoCertificado').textbox('getValue');
        parametros.Certificado64 = sello;
        parametros.LlavePrivada = $('#txtLlavePrivada').textbox('getValue');
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
                    var valores = $.session.get('Campos').split('@');                                       
                    $('#txtNoCertificado').textbox('setValue', valores[2]);                  
                    $('#dbfechacreacion').datebox('setValue', valores[5]);
                    $('#dbfechavencimiento').datebox('setValue', valores[6]);                   

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