var perfil = "";
var quincena = "";
$(document).ready(function () {  
    CARGAR_QUINCENAS("#cboquin");
    $('#lstperfiles').tree({
        onClick: function (node) {
            if (node.IdPadre != 0) {
                perfil = node.clave;
                $('#btnLInd').linkbutton('enable');
                $('#btnAInd').linkbutton('enable');
                $('#txtfolioanterior').textbox({ readonly: false });
                $('#txtfolioactual').textbox({ readonly: false });

                $('#btnLGrupo').linkbutton('enable');
                $('#btnAGrupo').linkbutton('enable');
                $('#txtfolioinicial').textbox({ readonly: false });
                $('#txtfoliofinal').textbox({ readonly: false });
                $('#txtFactual').textbox({ readonly: false });
            }           
        }
    });

    $("#cboquin").combobox({
        onSelect: function (rec) {            
            if (rec.valor == "x") { quincena = "Actual"; }
            else { quincena = rec.valor; }
            LISTAR_PERFILES('CH',quincena);            
        },
    });

    $('#btnLInd').bind('click', function () { LIMPIAR_INDIVIDUAL('#btnLInd'); });
    $('#btnLGrupo').bind('click', function () { LIMPIAR_GRUPAL('#btnLGrupo'); });

    $('#btnAInd').bind('click', function () { ACTUALIZAR_INDIVIDUAL('#btnLGrupo'); });
    $('#btnAGrupo').bind('click', function () { ACTUALIZAR_GRUPAL('#btnLGrupo'); });

    $('#btnGenerarReporte').bind('click', function () { GENERAR_REPORTES('#btnGenerarReporte'); });

    $('#opcNomina').bind('click', function () { LISTAR_PERFILES("CH"); });
    $('#opcPension').bind('click', function () { LISTAR_PERFILES("PN"); });

    
    LISTAR_PERFILES('CH', 'Actual');    
});

function CARGAR_QUINCENAS(ddlobj) {
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Quincenas',
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d != "") {
                obj = $.parseJSON(data.d);
                $(ddlobj).combobox({
                    data: obj,
                    valueField: 'valor',
                    textField: 'descripcion',
                });                
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

function LISTAR_PERFILES(tipo) {   
    var parametros = {};
    parametros.strtipo = tipo;
    parametros.strquin = quincena;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Perfiles',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = jQuery.parseJSON(data.d[0]);
            $('#lstperfiles').tree({
                data: obj
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', er.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function LIMPIAR_INDIVIDUAL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfolioanterior').textbox('setValue','');
        $('#txtfolioactual').textbox('setValue','');
    }
}

function LIMPIAR_GRUPAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#txtfolioinicial').textbox('setValue', '');
        $('#txtfoliofinal').textbox('setValue', '');
        $('#txtFactual').textbox('setValue', '');
    }
}

function ACTUALIZAR_INDIVIDUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var folioanterior = ""; folioactual = "";
        if ($('#txtfolioanterior').textbox('getValue') == "") { $.messager.alert('Error', "Falta el folio anterior", 'error'); return 0;}
        else
            if ($('#txtfolioactual').textbox('getValue') == "") { $.messager.alert('Error', "Falta el folio actual", 'error'); return 0; }
            else
            {
                var quincena = "";
                if ($('#cboquin').combobox('getText') == 'Actual')
                { quincena = 'Actual'; }
                else
                {
                    quincena = $('#cboquin').combobox('getValue');
                    if (quincena == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }
                }
                

                var tipo = "";
                if ($('#opcNomina').linkbutton('options').selected) { tipo = 'CH'; }
                if ($('#opcPension').linkbutton('options').selected) { tipo = 'PN'; }

                folioanterior = $('#txtfolioanterior').textbox('getValue');
                folioactual = $('#txtfolioactual').textbox('getValue');
                var parametros = {};
                parametros.tipoprod = tipo;
                parametros.tipoperfil = perfil.substr(3, 3);
                parametros.folioanterior = folioanterior;
                parametros.folioactual = folioactual;
                parametros.quincena = quincena;
                $.ajax({
                    type: "POST",
                    url: 'funciones.aspx/Actualiza_Folio_Individual',
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "1")
                        { $.messager.alert('Información', data.d[1], 'info'); }
                       else
                        { $.messager.alert('Error', data.d[1], 'error'); }
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', er.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); }
                });
            }
    }
}

function ACTUALIZAR_GRUPAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var folioinicial = ""; folioactual = ""; foliofinal = "";
        if ($('#txtfolioinicial').textbox('getValue') == "") { $.messager.alert('Error', "Falta el folio inicial", 'error'); return 0;}
        else
            if ($('#txtfoliofinal').textbox('getValue') == "") { $.messager.alert('Error', "Falta el folio final", 'error'); return 0; }
            else
                if ($('#txtFactual').textbox('getValue') == "") { $.messager.alert('Error', "Falta el folio actual", 'error'); return 0; }
                else
                {
                    var quincena = $('#cboquin').combobox('getValue');
                    if (quincena == "x") { quincena = ""; } else { quincena = $('#cboquin').combobox('getValue'); }

                    folioinicial = $('#txtfolioinicial').textbox('getValue');
                    foliofinal = $('#txtfoliofinal').textbox('getValue');
                    folioactual = $('#txtFactual').textbox('getValue');

                    var tipo = "";
                    if ($('#opcNomina').linkbutton('options').selected) { tipo = 'CH'; }
                    if ($('#opcPension').linkbutton('options').selected) { tipo = 'PN'; }

                    var parametros = {};
                    parametros.tipoprod = tipo;
                    parametros.tipoperfil = perfil.substr(3, 3);
                    parametros.folioinicial = folioinicial;
                    parametros.foliofinal = foliofinal;
                    parametros.folioactual = folioactual;
                    parametros.quincena = quincena;
                    $.ajax({
                        type: "POST",
                        url: 'funciones.aspx/Actualiza_Folio_Grupal',
                        data: JSON.stringify(parametros),
                        dataType: "json",
                        async: false,
                        cache: false,
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function () {
                            $('#loading').show();
                        },
                        success: function (data) {
                            if (data.d[0] == "1")
                            { $.messager.alert('Información', data.d[1], 'info'); }
                            else
                            { $.messager.alert('Error', data.d[1], 'error'); }
                        },
                        error: function (err) {
                            $('#loading').hide(100);
                            $.messager.alert('Error', er.statusText, 'error');
                        },
                        complete: function ()
                        { $('#loading').hide(100); }
                    });
                }
    }
}

function GENERAR_REPORTES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.ajax({
            type: "POST",
            url: 'Funciones.aspx/Generar_Reportes',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] != "0") {
                    $.messager.alert('Información', data.d[0], 'info');
                } else { $.messager.alert('Error', 'Error al generar la información de reportes', 'error'); }
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
}
