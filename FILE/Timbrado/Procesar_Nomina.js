var Quin = "";
var TipoNom = "";
$(document).ready(function () {
    var quin = $_GET('Quin');
    if (quin != undefined) { Quin = quin; }
    else { Quin = ''; }
    var tiponom = $_GET('TN');
    if (tiponom != undefined) { TipoNom = tiponom; }
    else { TipoNom = ''; }

    document.getElementById('lblquin').innerHTML = "Quincena " + Quin +" a Procesar"

    DISEÑO_GRID();

    $('#btnMaster').bind('click', function () {
        GENERAR_MASTER('#btnMaster');
    });

    $('#btnPlantillas').bind('click', function () {
        if ($('#btnPlantillas').linkbutton('options').disabled) { return false; }
        else {
            $('#loading').show();
            $('#btnDetener').linkbutton({ disabled: false });
            GENERAR_PLANTILLAS('#btnPlantillas');
        }
    });

    $('#btnDetener').bind('click', function () {
        DETENER_PLANTILLAS('#btnDetener');

    });

    $('#btnInicial').bind('click', function () {
        IR_PAGINA('Inicial_Timbrado.aspx', 'Quin=&TN=');
    });

    $('#btnRegresar').bind('click', function () {
        IR_PAGINA('Inicial_Timbrado.aspx', 'Quin='+Quin+'&TN=' + TipoNom);
    });
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


function DISEÑO_GRID() {
    $('#dgplantillas').datagrid({
        data: null,
    });
    $('#dgplantillas').datagrid({
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        columns: [[
            { field: 'contribuyente', title: 'Contribuyente', width: 120, align: 'center', halign: 'center' },
            { field: 'TotalRegistros', title: 'Total Registros', width: 110, align: 'center', halign: 'center' },
            { field: 'GeneradosCorrecto', title: 'Gen. Correctos', width: 100, align: 'center', halign: 'center' },
            { field: 'GeneradosIncorrecto', title: 'Gen. Incorrectos', width: 100, align: 'center', halign: 'center' },
            { field: 'NoGenerados', title: 'NoGenerados', width: 100, align: 'center', halign: 'center' }
        ]]
    });

    $('#dgtotales').datagrid({
        data: null,
    });
    $('#dgtotales').datagrid({
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        fitColumns: true,
        striped: true,
        data: null,
        columns: [[
            { field: 'Registros', title: 'Registros', width: 80, align: 'center', halign: 'center', fixed: true },
            {
                field: 'TotalPercepciones', title: 'Total Percepciones', width: 120, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.TotalPercepciones); }
            },
            {
                field: 'TotalDeducciones', title: 'Total Deducciones', width: 120, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.TotalDeducciones); }
            },
            {
                field: 'TotalGravadoPercepciones', title: 'Tot. Grabado Per.', width: 120, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.TotalGravadoPercepciones); }
            },
            {
                field: 'TotalExentoPercepciones', title: 'Tot. Exento Per.', width: 120, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.TotalExentoPercepciones); }
            },
            {
                field: 'TotalImpuestosRetenidos', title: 'Tot. Imp. Retenidos', width: 120, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.TotalImpuestosRetenidos); }
            },
            {
                field: 'SubsidioPagado', title: 'Subsidio Pagado', width: 100, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.SubsidioPagado); }
            },
            {
                field: 'Impuesto', title: 'Impuesto', width: 100, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.Impuesto); }
            },
            {
                field: 'O_999', title: 'O_999', width: 100, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.O_999); }
            },
            {
                field: 'PercepcionesNegativas', title: 'Per. Negativas', width: 100, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.PercepcionesNegativas); }
            },
            {
                field: 'PercepcionesBorradas', title: 'Per. Borradas', width: 100, align: 'right', halign: 'center', fixed: true,
                formatter: function (value, row) { return accounting.formatMoney(row.PercepcionesBorradas); }
            }
        ]],
    });
}

function GENERAR_MASTER(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $('#dgtotales').datagrid({
            data: null,
        });
        $('#dgplantillas').datagrid({
            data: null,
        });


        var quin = SELCCIONAR_NODO_TREE('#tquincenas');
        var parametros = {};
        parametros.Quincena = quin;
        $.ajax({
            type: "POST",
            url: 'Fun_Timbrado.aspx/Generar_Master',
            data: JSON.stringify(parametros),
            dataType: "json",
            async: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == '0') {
                    $('#btnMaster').linkbutton({ disabled: true });
                    $('#btnPlantillas').linkbutton({ disabled: false });
                    $.messager.alert('Información', 'La Master de la quincena ' + quin + ' ha sido creada', 'info');

                    CARGAR_TOTALES();
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }

            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    }
}

function CARGAR_TOTALES() {
    var quin = SELCCIONAR_NODO_TREE('#tquincenas');
    var parametros = {};
    parametros.Quincena = quin;
    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Cargar_Totales',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var objtotales = $.parseJSON(data.d[0]);

            if (objtotales.length == 0) {
                $('#btnMaster').linkbutton({ disabled: false });
            }
            else { $('#btnMaster').linkbutton({ disabled: true }); }

            $('#loading').hide(100);
            $('#dtotales').show();
            $('#dgtotales').datagrid({
                data: objtotales,
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function GENERAR_PLANTILLAS() {
    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Generar_Plantillas',
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            /* $('#loading').show();       */
        },
        success: function (data) {
            $('#loading').hide(100);
            if (data.d[0] == '0') {

                CONTROL_PLANTILLAS();
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
        },
        complete: function () {
            $('#loading').hide(100);

        }
    });

}

function CONTROL_PLANTILLAS() {
    var quin = SELCCIONAR_NODO_TREE('#tquincenas');
    var parametros = {};
    parametros.Quincena = quin;
    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Control_Plantillas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            // $('#loading').show();
        },
        success: function (data) {
            var objplantillas = $.parseJSON(data.d[0]);

            $('#loading').hide(100);
            $('#dplantillas').show();
            $('#dgplantillas').datagrid({
                data: objplantillas,
            });

            document.getElementById('lblquin').innerHTML = "Quincena " + quin + " " + data.d[2];

            if (objplantillas.length == 0) { $('#btnPlantillas').linkbutton({ disabled: true }); }
            else {
                if (data.d[3] == "F") {
                    $('#btnDetener').linkbutton({ disabled: true });
                    $('#btnPlantillas').linkbutton({ disabled: true });
                }
                if (data.d[3] == "EJ") {
                    $('#btnPlantillas').linkbutton({ disabled: true });
                    $('#btnDetener').linkbutton({ disabled: false });
                }
                if (data.d[3] == "ER") {
                    $('#btnDetener').linkbutton({ disabled: false });
                    $('#btnPlantillas').linkbutton({ disabled: false });
                }
                $('#btnPlantillas').linkbutton({ selected: false });

                CONTROL_PLANTILLAS();
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}

function DETENER_PLANTILLAS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $.ajax({
            type: "POST",
            url: 'Fun_Timbrado.aspx/Detener_Plantillas',
            dataType: "json",
            async: true,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', 'Proceso Cancelado', 'info');

                    $('#btnPlantillas').linkbutton({ disabled: false });
                    $('#btnPlantillas').linkbutton({ selected: false });

                    DISEÑO_GRID();

                    CARGAR_TOTALES();
                    CONTROL_PLANTILLAS();
                }
            },
            error: function (err) {
                $('#loading').hide(100);
                $.messager.alert('Error', err.responseText + ' ' + err.errorThrown + ' ' + err.textStatus, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });
    }
}