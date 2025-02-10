$(document).ready(function () {
    $('#txtfecha').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#txtvigencia').textbox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#txtperiodo').textbox('textbox').mask("99/99/9999--99/99/9999", { placeholder: "dd/mm/aaaa--dd/mm/aaaa" });

    $('#txtfecha').datebox({
        onSelect: function (date) {
            if (!date) { return ' '; }
            var y = date.getFullYear();
            var m = date.getMonth() + 3;
            var d = date.getDate();
            var fecha = (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
            $('#txtvigencia').datebox('setValue', fecha);
        },
    });

    $('#btnGenerar').bind('click', function () { GENERAR_PRODUCCION('#btnGenerar'); });

    $('#btnLimpiarProd').bind('click', function () { LIMPIAR_PRODUCCION('#btnLimpiarProd'); });
});


function GENERAR_PRODUCCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        if ($('#txtcheque').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el Número de Cheque', 'error'); }
        else
            if (($('#txtfecha').datebox('getValue') == "") || ($('#txtfecha').datebox('getValue') == "dd/mm/aaaa")) { $.messager.alert('Error', 'Falta la Fecha de Págo', 'error'); }
        else {

            var Periodo = $('#txtperiodo').textbox('getValue');
            if ((Periodo == "") || (Periodo == 'dd/mm/aaaa--dd/mm/aaaa')) { Periodo = ""; }

                var Fecha = $('#txtfecha').datebox('getValue');
            
                var Vigencia = $('#txtvigencia').datebox('getValue');
                if ((Vigencia == "") || (Vigencia == "dd/mm/aaaa")) { Vigencia = ""; }

            var parametros = {};
            parametros.cheque = $('#txtcheque').textbox('getValue');
            parametros.periodo = Periodo;
            parametros.fechapago = Fecha;
            parametros.vigencia = Vigencia;
            parametros.leyenda = $('#txtleyenda').textbox('getValue');
            $.ajax({
                type: "POST",
                url: 'Fun_Foseg.aspx/Generar_Produccion',
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');
                        LIMPIAR_PRODUCCION('#btnLimpiarProd'); 
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
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
   
}

function LIMPIAR_PRODUCCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {
        $('#txtcheque').textbox('setValue','');
        $('#txtperiodo').textbox('setValue', '');
        $('#txtfecha').datebox('setValue', '');
        $('#txtvigencia').datebox('setValue', '');
        $('#txtleyenda').textbox('setValue', '');
    }
}