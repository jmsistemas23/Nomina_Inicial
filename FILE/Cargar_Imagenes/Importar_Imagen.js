$(document).ready(function () {
    TXTFOCUS('#txtempleado');

   

    $('#btnLimpiar').bind('click', function () {
        $('#txtempleado').textbox('setValue', '');
        $('#txtrfc').textbox('setValue', '');
        $('#txtnombre').textbox('setValue', '');
        TXTFOCUS('#txtempleado');
        document.getElementById("ImgFoto").src = "";
        document.getElementById("ImgFirma").src = "";
    });

    $('#btnBuscar').bind('click', function () {
        BUSCAR_EMPLEADO('#dgempleados', '');
        CARGAR_CAMPOSBUSQUEDA('#dgempleados', '#cbocam');
        windows("#winemp", 750, 630, "Empleados");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    var texts = $('#txtempleado');
    texts.textbox('textbox').bind('keydown', function (e) {

        if (e.keyCode == 13) {
            BUSCAR_EMPLEADO('#dgempleados', "numemp=" + texts.textbox('getValue'));
            CARGAR_CAMPOSBUSQUEDA('#dgempleados', '#cbocam');
            windows("#winemp", 750, 630, "Empleados");
            var text = $('#txtval');
            text.textbox('clear').textbox('textbox').focus();
        }
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { });

});

function Resultado(resultado,mensaje,tipo) {
    if (resultado == "Si") {        
           $.messager.alert('Información', 'La '+tipo+' del empleado se ha guardado', 'info');
           $('#loading').hide();
           $("#btnEfoto").attr("disabled", true);
           $("#btnCfoto").attr("disabled", true);
           $("#btnEfirma").attr("disabled", true);
           $("#btnCfirma").attr("disabled", true);
    }
    else { $.messager.alert('Error', 'La '+tipo+' del empleado no se ha guardado '+mensaje, 'error'); }
}

function BUSCAR_EMPLEADO(dgcontrol, strconemp) {
    $(dgcontrol).datagrid({
        url: "Listar_Empleados.aspx?busqueda=" + strconemp,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "100%",
        heigth: "100%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $('#dgempleados').datagrid('getSelected');
            if (rows) {
                rows = $(dgcontrol).datagrid('getSelected');              
                $('#txtempleado').textbox('setValue', rows.numemp);
                $('#txtrfc').textbox('setValue', rows.rfccom);
                $('#txtnombre').textbox('setValue', rows.nomcom);
                $("#winemp").window('close');                                
                $("#hempleado").val(rows.numemp);
                MOSTRAR_IMAGEN(rows.numemp);
                $("#btnEfoto").attr("disabled", false);
                $("#btnCfoto").attr("disabled", false);
                $("#btnEfirma").attr("disabled", false);
                $("#btnCfirma").attr("disabled", false);
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        {
            $('#loading').hide(100);         
        }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var strconemp = "";
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { strconemp = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { strconemp = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { strconemp = " "; }
    BUSCAR_EMPLEADO('#dgempleados', strconemp);
}

function MOSTRAR_IMAGEN(empleado)
{
    var parametros = {};
    parametros.empleado = empleado;
    var obj = "";
    $.ajax({
        type: "POST",
        url: 'Funciones.aspx/Mostrar_Imagenes',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                obj = jQuery.parseJSON(data.d[1]);
                var imagen = base64js.fromByteArray(obj[0].Imagen);
                var frima = base64js.fromByteArray(obj[0].firma);
                document.getElementById("ImgFoto").src = "data:image/png;base64," + imagen;
                document.getElementById("ImgFirma").src = "data:image/png;base64," + frima;                   
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