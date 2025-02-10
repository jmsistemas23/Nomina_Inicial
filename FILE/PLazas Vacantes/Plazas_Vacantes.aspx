<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Plazas_Vacantes.aspx.cs" Inherits="FILE_CosteoPlazas_Plazas_Vacantes" %>
<!DOCTYPE html>



<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>


<script src="js/jquery-ui-1.8.17.custom.min.js"></script>
<link href="css/jquery-ui-1.8.1.custom.css" rel="stylesheet" />
<script src="js/jquery.quicksearch.js"></script>
<script src="js/jquery.mask.js"></script>

<style type="text/css">
    textarea[name=txtObservacionMultiple] {
        resize: none;
    }

    #dialog-message {
        margin: 5px;
    }

    #dialog-message_plazas {
        margin: 5px;
    }

    #dialog-puesto {
        margin: 5px;
    }

    #dialog-messageMovimiento {
        margin: 5px;
        z-index: 10;
    }

    #dialog-nivel {
        margin: 5px;
    }

    #dialog-plazas {
        margin: 5px;
    }

    #dialog-Plazas_Recursos {
        margin: 5px;
    }



    #dialog-ConsultaPlazasRecursos {
        margin: 5px;
    }

    #dialog-UnificarPlazasRecursos {
        margin: 5px;
    }

    #Div_Compactacion {
        margin: 5px;
    }

    #Div_DesCompactacion {
        margin: 5px;
    }

    #Div_Recategorizacion {
        margin: 5px;
    }




    body {
        height: 50%;
        margin: 0px;
        padding: 50px;
        text-align: left;
        font-weight: bold;
    }

    .row-gris-center {
        background-color: #A9F5A9 !important;
        color: #808080 !important;
        /*pointer-events: none;*/
        font-weight: bold !important;
    }

    .row-gris {
        color: #808080 !important;
        /*pointer-events: none;*/
        font-weight: bold !important;
    }

    .row-Verde {
        color: #808080 !important;
        /*pointer-events: none;*/
        font-weight: bold !important;
        /*background-color: #A9F5A9 !important;*/
        /*color: #808080 !important;*/
        /*font-weight: bold !important;*/
    }

    .row-Rojo {
        color: #DF0101 !important;
        font-weight: bold !important;
    }

    .row-Verde-center {
        color: #1C9E21;
        font-weight: bold !important;
        text-align: center;
    }

    .row-Azul {
        color: #0000FF !important;
        font-weight: bold !important;
        align-content: center !important;
    }
</style>

<style type="text/css">
    .button {
        background-color: none; /* Green */
        border: none;
        color: white;
        padding: 13px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        -webkit-transition-duration: 0.4s; /* Safari */
        transition-duration: 0.4s;
        cursor: pointer;
    }

    .button1 {
        background-color: white;
        color: #585858;
        border: 2px solid #008CBA;
        padding: 6px 22px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        font-weight: bold;
        border-radius: 10px;
    }

    .select1 {
        border: 1px solid #04467E;
        color: #2D4167;
        font-size: 18px;
    }

    .textbox1 {
        border: 1px solid #04467E;
        color: #2D4167;
        font-size: 18px;
    }

    .button1:hover {
        background-color: #008CBA;
        color: white;
    }

    .gridviewT {
        font-family: "arial";
        background-color: #FFFFFF;
        font-size: small;
        overflow: scroll;
    }

    .gridview {
        font-family: "arial";
        background-color: #FFFFFF;
        font-size: small;
    }

        .gridview th {
            background: #81BEF7;
            padding: 5px;
            font-size: small;
        }

            .gridview th a {
                color: #003300;
                text-decoration: none;
            }

                .gridview th a:hover {
                    color: #003300;
                    text-decoration: underline;
                }

        .gridview td {
            background: #FAFAF5;
            color: #333333;
            font: x-small "arial";
            padding: 4px;
        }

        .gridview tr.even td {
            background: #FFFFFF;
        }

        .gridview td a {
            color: #003300;
            font: bold small "arial";
            padding: 2px;
            text-decoration: none;
        }

            .gridview td a:hover {
                color: red;
                font-weight: bold;
                text-decoration: underline;
            }

    .gridviewT th {
        background: #81BEF7;
        padding: 5px;
        font-size: small;
    }

        .gridviewT th a {
            color: #003300;
            text-decoration: none;
        }

            .gridviewT th a:hover {
                color: #003300;
                text-decoration: underline;
            }

    .gridviewT td {
        background: #FAFAF5;
        color: #333333;
        font: small "arial";
        padding: 4px;
    }

    .gridviewT tr.even td {
        background: #FFFFFF;
    }

    .gridviewT td a {
        color: #003300;
        font: bold small "arial";
        padding: 2px;
        text-decoration: none;
    }

        .gridviewT td a:hover {
            color: red;
            font-weight: bold;
            text-decoration: underline;
        }

    .ColumnaOculta {
        display: none;
    }

    #placeholderBaja_Vacante {
        width: 160px;
    }
</style>

<style>
    .button {
        display: inline-block;
        padding: 5px 5px;
        font-size: 24px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #000000;
        background-color: #D8D8D8;
        border: none;
        border-radius: 5px;
        box-shadow: 0 9px #999;
    }

        .button:hover {
            background-color: #848484;
        }

        .button:active {
            background-color: #D8D8D8;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
        }
</style>

<style>
    #overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        filter: alpha(opacity=50);
    }

    #modal {
        position: absolute;
        background: url(tint20.png) 0 0 repeat;
        background: rgba(0,0,0,0.2);
        border-radius: 14px;
        padding: 8px;
    }

    #content {
        border-radius: 8px;
        background: #fff;
        padding: 20px;
    }

    #close {
        position: absolute;
        background: url(close.png) 0 0 no-repeat;
        width: 24px;
        height: 27px;
        display: block;
        text-indent: -9999px;
        top: -7px;
        right: -7px;
    }
</style>

<script>
    var modal = (function () {
        var
        method = {},
        $overlay,
        $modal,
        $content,
        $close,
        $regresar;

        // Center the modal in the viewport
        method.center = function () {
            var top, left;

            top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
            left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

            $modal.css({
                top: top + $(window).scrollTop(),
                left: left + $(window).scrollLeft()
            });
        };

        // Open the modal
        method.open = function (settings) {
            $content.append(settings.content);

            $modal.css({
                width: settings.width || 'auto',
                height: settings.height || 'auto'
            });

            method.center();
            $(window).bind('resize.modal', method.center);
            $modal.show();
            $overlay.show();

        };

        // Close the modal
        method.close = function () {
            //alert('aaaa');
            $modal.hide();
            $overlay.hide();


        };

        $overlay = $('<div id="overlay"></div>');
        $modal = $('<div id="modal"></div>');
        $content = $('<div id="content"></div>');
        $close = $('<a id="close" href="#">close</a>');
        $regresar = $("#btnRegresar");
        $regresar_Compactacion = $("#btnRegresar_Compactacion");
        $regresar_Descompactacion = $("#btnRegresar_Descompactacion");
        $modal.hide();
        $overlay.hide();
        $modal.append($content, $close);
        $(document).ready(function () {
            $('body').append($overlay, $modal);
        });
        $regresar.click(function (e) {
            method.close();
        });
        $regresar_Compactacion.click(function (e) {
            method.close();
        });
        $regresar_Descompactacion.click(function (e) {
            method.close();
        });

        $close.click(function (e) {
            e.preventDefault();
            method.close();
        });

        return method;
    }());

    $('#gridview_Plazas_Movimiento tbody tr').find('#btnEliminar').live('click', function () {
        var nTds = $('td', $(this));
        var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
        var cveRecurso_Vacante = $(this).parent().parent()[0].childNodes[0].innerText;
        var cveRecurso_Ocupado = $(this).parent().parent()[0].childNodes[11].innerText;
        var elementos = 0;
        if (cveRecurso_Ocupado == '') {
            $(this).closest('tr').remove();
        } else {
            ProcesoEliminarMovimiento(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, $(this));
        }
        $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
            elementos += 1;
        });
        if (elementos == 0) {
            $("#placeholderDesdeMultiple").prop("disabled", false);
            $("#placeholderHastaMultiple").prop("disabled", false);
        }
        return false;
    });


    $('#gridview_Plazas_Recursos tbody tr').find('#btnAgregar').live('click', function () {
        ValidaAgregarMovimientoMultiple($(this));
        return false;
    });

    function cargarnivel(clave, cveNivel_Educativo) {
        var codnivpu = '';

        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarPuesto_Vacante',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                if (Object.keys(s).length === 0) {
                    alert("No existe equivalencia de puesto para la clave de puesto de esta plaza");
                }
                else {
                    var myObject = eval('(' + s + ')');
                    for (i in myObject) {

                        if (myObject[i]["cvepuesto_equivalencia"] == $("#ddlPuesto_Pop").val()) {
                            codnivpu = myObject[i]["codnivpu"];
                        }
                    }
                    var cvezon = $('#HiddenField_cvezon').val();
                    ProcesoCargarNivelSalarial(cvezon, codnivpu);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlPuesto_Pop").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function consultarRecurso() {
        dialogConsultaPlazasRecursos.show();
        modal.open({ content: dialogConsultaPlazasRecursos });
    }

    function UnificarRecurso() {
        dialogUnificarPlazasRecursos.show();
        modal.open({ content: dialogUnificarPlazasRecursos });
    }



    function AgregarMovimiento() {
        $('#txtNombreMultiple').focus();
        document.getElementById("btnNuevoMovimiento").style.visibility = "";
        document.getElementById("btnEliminarMovimientos").style.visibility = "hidden";
        var divEncabezado = $("#gridviewT_Plazas_Movimiento").empty();
        divEncabezado.append(
        $("<tr>")
        .append($("<th align='center' Width='60px'>").html('# PLAZA'))
        .append($("<th align='center' Width='253px'>").html('NOMBRE'))
        .append($("<th align='center' Width='105px'>").html('HORAS TOTALES'))
        .append($("<th align='center' Width='105px'>").html('HORAS UTILIZADAS'))
        .append($("<th align='center' Width='105px'>").html('HORAS DISPONIBLES'))
        .append($("<th align='center' Width='150px'>").html('NIVEL'))
        .append($("<th align='center' Width='60px'>").html('PUESTO'))

        );
        var totalRows = $("#gridview_Plazas_Movimiento tr").length;
        dialogPlazas.hide();
        dialogVacante.hide();

        $('#ddlNivelSalarial').hide();
        dialogPlazas_Compactacion.hide();
        dialogPlazas_Descompactacion.hide();
        dialogAgregaPlazas.show();

        modal.open({ content: dialogAgregaPlazas });
        document.getElementById('txtFolioMovimiento').focus();
    }


    function AgregarNuevoMovimiento() {
        $('#lblTituloVacante').text("Agregar Recurso Vacante");
        LimpiarMovimiento_Pop();
        document.getElementById("ddlNivelSalarial_Vacante").style.visibility = "hidden";
        LlenarZonaEconomica();
        dialogVacante.show();
        modal.open({ content: dialogVacante });
        document.getElementById('txtFolioMovimiento_Vacante').focus();

    }
    function CompactarRecurso() {
        dialogPlazas_Compactacion.show();
        modal.open({ content: dialogPlazas_Compactacion });
        LimpiarMovimiento_Pop_Compactacion();
    }
    function DescompactarRecurso() {
        dialogPlazas_Descompactacion.show();
        modal.open({ content: dialogPlazas_Descompactacion });
        LimpiarMovimiento_Pop_Descompactacion();
    }

    function zeroFill(number, width) {
        width -= number.toString().length;
        if (width >= 0) {
            return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
        }
        return number + "";
    }

    function ProcesoEliminarMovimiento(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, linea) {
        var JSONObject = new Array();
        var PuestoMovimiento;
        var hiddenId;
        var cveNivel_Educativo;
        var clave;
        var nombre;
        var horas_totales;
        var horas_asignar;
        var cvenivpl;
        var horas_asignar_oculto;
        var todos_guardados = '';

        var JSONObject1 = new Array();

        $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
            var nTds = $('td', this);

            if ($(nTds[11]).text() == '') {
                todos_guardados += $(nTds[2]).text() + " ";
            }

        });
        if (todos_guardados == '') {

            $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
                var nTds = $('td', this);
                $('#HiddenField_puesto').attr('value', PuestoMovimiento);
                $('#HiddenField_cveRecurso_Vacante').attr('value', hiddenId);
                $('#HiddenField_cveNivel_Educativo').attr('value', cveNivel_Educativo);
                $('#HiddenField_cvenivpl').attr('value', cvenivpl);
                $("#txtPuesto_Pop").prop("disabled", true);
                $("#ddlNivelSalarial").prop("disabled", true);
                var desde = document.getElementById('placeholderDesdeMultiple').value;
                var hasta = document.getElementById('placeholderHastaMultiple').value;
                var Nombre = document.getElementById('txtNombreMultiple').value;

                var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Pop').value;
                var HoraJornada_vacante = $(this).find(".horas_asignadas").val();

                var cveNivel_Educativo = $(nTds[1]).text();
                var cveRecurso_Vacante = $(nTds[0]).text();

                var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
                var cvezon = document.getElementById('txtGrupoNominal').value;
                var HiddenField_cvenivpl = document.getElementById('HiddenField_cvenivpl').value;

                if ($('#txtGrupoNominal').val() == '0') {
                    alert("Dede proporcionar un grupo nominal")
                    document.getElementById('txtGrupoNominal').focus();
                    return;
                }

                if ($("#ddlNivelSalarial").val() == '0') {
                    alert('Debe seleccionar un nivel salarial');
                    document.getElementById('ddlNivelSalarial').focus();
                    return;
                }

                if ($("#HiddenField_cvepuesto_equivalencia").val() != '0') {

                    var codnivpu = '';
                    var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo').value;
                    var clave = $('#HiddenField_puesto').val();

                    var PUESTO = $('#txtPuestoDescripcion_Pop').val();
                    if (!existeFecha2(desde)) {
                        alert('La fecha desde es incorrecta');
                        document.getElementById('placeholderDesde').focus();
                        return;
                    }
                    if (hasta != "") {
                        if (!existeFecha2(hasta)) {
                            alert('La fecha hasta es incorrecta');
                            document.getElementById('placeholderHasta').focus();
                            return;
                        }
                    } else {
                        hasta = '01/01/9999'
                    }


                    if (compare_dates(desde, hasta)) {
                        alert('La fecha de inicio no puede ser mayor que la fecha fin');
                        document.getElementById('placeholderHastaMultiple').focus();
                        return;
                    }

                    if (cvezon.length <= 0) {
                        alert('Debe proporcionar un un grupo nominal');
                        document.getElementById('txtGrupoNominal').focus();
                        return;
                    }

                    if ($("#ddlNivelSalarial").val() == '0') {
                        alert('Debe seleccionar un nivel salarial');
                        document.getElementById('ddlNivelSalarial').focus();
                        return;
                    }

                    var fechaD = desde.split("/");
                    var fechaH = hasta.split("/");
                    var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];
                    var hasta_formateada = fechaH[0] + '/' + fechaH[1] + '/' + fechaH[2];

                    var obj = new Object();
                    obj.cveRecurso_Ocupado = cveRecurso_Ocupado;
                    obj.cveRecurso_Vacante = cveRecurso_Vacante;
                    obj.cveNivel_Educativo = cveNivel_Educativo;
                    obj.Nombre = Nombre;
                    obj.cvepuesto_equivalencia_detalle = $("#HiddenField_cvepuesto_equivalencia").val();
                    obj.cveMunicipio = $("#ddlMunicipioMultiple").val();
                    obj.hora_ocupado = HoraJornada_ocupado;
                    obj.hora_vacante = HoraJornada_vacante;
                    obj.FECHA_DESDE = desde_formateada;
                    obj.FECHA_HASTA = hasta_formateada;
                    obj.cveRecurso_Movimiento = cveRecurso_Movimiento;
                    obj.cvezon = cvezon;
                    obj.cvenisni_vacante = $(nTds[9]).text();
                    obj.cveRecurso_Ocupado = $(nTds[11]).text();
                    obj.cvenisni_ocupado = $("#ddlNivelSalarial").val();
                    if (cveRecurso_Ocupado != $(nTds[11]).text()) {
                        JSONObject1.push(obj);
                    }
                }

            });

            if (JSONObject1.length == 0) {
                alert('El movimiento debe tener al menos un registro');
                return false;
            } else {
                ValidaEliminar(JSONObject1, cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, linea);
            }
        } else {
            alert("Es necesario guardar antes el movimiento de la plaza: " + todos_guardados);

        }

        return false;

    }

    function Eliminar(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, linea) {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Ocupado_delete',
            contentType: 'application/json; charset=utf-8',


            data: "{cveRecurso_Movimiento:" + cveRecurso_Movimiento + ", cveRecurso_Vacante:" + cveRecurso_Vacante + ", cveRecurso_Ocupado:'" + cveRecurso_Ocupado + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se pudo eliminar el movimiento');
                    return false;
                }
                linea.closest('tr').remove();
                return false;
            }
        });
        return false;


    }

    function LlenarVacantesMovimiento(cveRecurso_Movimiento) {
        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;
        var NivelSalarial = $("#ddlNivelSalarial").val();
        var opcion = $("#Opcion option:selected").val();

        var cvpuespu = $('#HiddenField_cvpuespu').val();



        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }

        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Vacante_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", desde:'" + desde + "', hasta:'" + hasta + "', NivelSalarial:'" + NivelSalarial + "', opcion:'" + opcion + "', cvpuespu:'" + cvpuespu + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontro informacion');
                    return false;
                }
                var myObject = eval('(' + data.d + ')');
                var totalRows = $("#gridview_Plazas_Movimiento tr").length;
                var div = $("#gridview_Plazas_Movimiento");

                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }

                    d = " ";
                    var PUESTO = $('#txtPuestoDescripcion_Pop').val();

                    if (PUESTO == "JORNADA") {
                        if (myObject[i]["cvepue"].indexOf("JORNADA") > -1) {
                            d = " disabled ";
                        }
                    }

                    activo = "<a id='btnSeleccionar' href='' class='row-Azul' title='Clic para guardar un movimiento a esta plaza' >";
                    eliminar = "<a id='btnEliminar' href='' class='row-Azul' title='Clic para eliminar esta plaza del movimiento' >";

                    div.append($("<tr >")
                    .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))//1
                    .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))//2
                    .append($("<td align='center' " + clase + " Width='61px' !important >").html(myObject[i]["Numero_Plaza"]))//3
                    .append($("<td " + clase + " Width='255px' !important  >").html(myObject[i]["Nombre"]))//4
                    .append($("<td align='center' " + clase + " Width='108px' !important  >").html(myObject[i]["Horas_Totales"]))//5
                    .append($("<td align='center' " + clase + " Width='107px' !important  >").html(myObject[i]["hora_vacante"]))//6                  
                    .append($("<td align='center' Width='107px'>").html('').append($('<input type="text"  style="width:54px; text-align: center;" name="horas_asignadas" class="horas_asignadas" value="' + myObject[i]["hora_disponible"] + '" maxlength="2" size="1"' + d + '">').html('')))//7
                    .append($("<td " + clase + " Width='152px' !important  >").html(myObject[i]["Nivel_educativo"]))//8
                    .append($("<td align='center' " + clase + " Width='62px' !important  >").html(myObject[i]["cvepue"]))//9
                    //.append($("<td " + clase + " Width='152px' !important>").html(myObject[i]["descripcion"]))//10
                    .append($("<td >").html(myObject[i]["cvenivpl"]))//11
                    .append($("<td >").html(myObject[i]["hora_disponible"]))//12
                    .append($("<td >").html(myObject[i]["cveRecurso_Ocupado"]))//13
                    .append($("<td Width='50px'>").html('').append($(eliminar).html('Eliminar'))

                    ));

                    $('#gridview_Plazas_Movimiento td:nth-child(1)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(2)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(10)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(11)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(12)').hide();
                    //$('#gridview_Plazas_Movimiento td:nth-child(13)').hide();

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }

    function LlenarVacantesMovimiento_Compactacion(cveRecurso_Movimiento) {
        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;
        var NivelSalarial = $("#ddlNivelSalarial").val();

        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }

        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Vacante_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", desde:'" + desde + "', hasta:'" + hasta + "', NivelSalarial:'" + NivelSalarial + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontro informacion');
                    return false;
                }
                var myObject = eval('(' + data.d + ')');
                var totalRows = $("#gridview_Plazas_Movimiento tr").length;
                var div = $("#gridview_Plazas_Movimiento");

                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }

                    d = " ";
                    var PUESTO = $('#txtPuestoDescripcion_Pop').val();

                    if (PUESTO == "JORNADA") {
                        if (myObject[i]["cvepue"].indexOf("JORNADA") > -1) {
                            d = " disabled ";
                        }
                    }

                    activo = "<a id='btnSeleccionar' href='' class='row-Azul' title='Clic para guardar un movimiento a esta plaza' >";
                    eliminar = "<a id='btnEliminar' href='' class='row-Azul' title='Clic para eliminar esta plaza del movimiento' >";

                    div.append($("<tr >")
                    .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))//1
                    .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))//2
                    .append($("<td align='center' " + clase + " Width='61px' !important >").html(myObject[i]["Numero_Plaza"]))//3
                    .append($("<td " + clase + " Width='255px' !important  >").html(myObject[i]["Nombre"]))//4
                    .append($("<td align='center' " + clase + " Width='108px' !important  >").html(myObject[i]["Horas_Totales"]))//5
                    .append($("<td align='center' " + clase + " Width='107px' !important  >").html(myObject[i]["hora_vacante"]))//6                  
                    .append($("<td align='center' Width='107px'>").html('').append($('<input type="text"  style="width:54px; text-align: center;" name="horas_asignadas" class="horas_asignadas" value="' + myObject[i]["hora_disponible"] + '" maxlength="2" size="1"' + d + '">').html('')))//7
                    .append($("<td " + clase + " Width='152px' !important  >").html(myObject[i]["Nivel_educativo"]))//8
                    .append($("<td align='center' " + clase + " Width='62px' !important  >").html(myObject[i]["cvepue"]))//9
                    //.append($("<td " + clase + " Width='152px' !important>").html(myObject[i]["descripcion"]))//10
                    .append($("<td >").html(myObject[i]["cvenivpl"]))//11
                    .append($("<td >").html(myObject[i]["hora_disponible"]))//12
                    .append($("<td >").html(myObject[i]["cveRecurso_Ocupado"]))//13
                    .append($("<td Width='50px'>").html('').append($(eliminar).html('Eliminar'))

                    ));

                    $('#gridview_Plazas_Movimiento td:nth-child(1)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(2)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(10)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(11)').hide();
                    $('#gridview_Plazas_Movimiento td:nth-child(12)').hide();
                    //$('#gridview_Plazas_Movimiento td:nth-child(13)').hide();

                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaMovimientoCompactacion(cveRecurso_Movimiento) {
        var cveRecurso_Movimiento_tipo = 3;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", cveRecurso_Movimiento_tipo:" + cveRecurso_Movimiento_tipo + "}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimientoCompactacion").prop("disabled", false);
                    $("#txtFolioMovimientoCompactacion").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                var tipo_movimiento = myObject[0]["tipo_movimiento"];
                if (tipo_movimiento == 'ocupado') {
                    $('#Div_Movimiento').show();
                    $("#txtFolioMovimientoCompactacion").prop("disabled", true);
                    $("#txtNombre_Compactacion").val('');
                    $("#placeholderDesdeMultiple").val('');

                    var div = $("#gridview_Plazas_Compactacion").empty();
                    div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));
                    $('select option[value="0"]').attr("selected", true);
                    for (i in myObject) {



                        document.getElementById('txtPlaza_Compactacion').value = myObject[i]["Numero_Plaza"];
                        document.getElementById('txtNombre_Compactacion').value = myObject[i]["Nombre"];
                        var desde = new Date(myObject[i]["FECHA_DESDE"]);
                        var fecha = zeroFill(desde.getDate(), 2)
                        + '/' + zeroFill(1 + desde.getMonth(), 2)
                        + '/' + zeroFill(desde.getFullYear(), 2)

                        document.getElementById('placeholderBaja_Compactacion').value = myObject[i]["FECHA_DESDE"];
                        document.getElementById('txtFolioDocumentoCIT_Compactacion').value = myObject[i]["folio_documento"];



                        var hasta = new Date(myObject[i]["FECHA_HASTA"]);
                        document.getElementById('txtGrupoNominal').value = myObject[i]["cvepag_ocupado"];
                        var hora_ocupado = myObject[i]["hora_ocupado"];

                        //var GrupoNominal = document.getElementById('txtGrupoNominal').value;
                        //if (GrupoNominal != '') {
                        //    $("#txtGrupoNominalDescripcion").val('');
                        //    ConsultaGrupoNominal(GrupoNominal);
                        //}


                        document.getElementById('txtPuesto_Compactacion').value = myObject[i]["cvepue_ocupado"];
                        var Puesto = document.getElementById('txtPuesto_Compactacion').value;

                        //if (Puesto != '') {
                        //    $("#txtPuestoDescripcion_Compactacion").val('');
                        //    ConsultaPuesto(Puesto);
                        //}
                        document.getElementById('txtHoraJornada_Compactacion').value = hora_ocupado;
                    }

                    //$("#placeholderDesdeMultiple").prop("disabled", true);
                    //$("#placeholderHastaMultiple").prop("disabled", true);


                    //LlenarVacantesMovimiento(cveRecurso_Movimiento);
                } else {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento_Vacante").prop("disabled", false);
                    $("#txtFolioMovimiento_Vacante").focus();
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }



    function ConsultaMovimientoDescompactacion(cveRecurso_Movimiento) {
        var cveRecurso_Movimiento_tipo = 4;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", cveRecurso_Movimiento_tipo:" + cveRecurso_Movimiento_tipo + "}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento").prop("disabled", false);
                    $("#txtFolioMovimiento").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                var tipo_movimiento = myObject[0]["tipo_movimiento"];
                if (tipo_movimiento == 'ocupado') {
                    $('#Div_Movimiento').show();
                    $("#txtFolioMovimiento").prop("disabled", true);
                    $("#txtNombreMultiple").val('');
                    $("#placeholderDesdeMultiple").val('');
                    $("#placeholderHastaMultiple").val('');
                    var div = $("#gridview_Plazas_Movimiento").empty();
                    div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));
                    $('select option[value="0"]').attr("selected", true);
                    for (i in myObject) {

                        document.getElementById('txtNombreMultiple').value = myObject[i]["Nombre"];
                        var desde = new Date(myObject[i]["FECHA_DESDE"]);
                        var fecha = zeroFill(desde.getDate(), 2)
                        + '/' + zeroFill(1 + desde.getMonth(), 2)
                        + '/' + zeroFill(desde.getFullYear(), 2)

                        document.getElementById('placeholderDesdeMultiple').value = myObject[i]["FECHA_DESDE"];
                        document.getElementById('txtFolioDocumentoCIT').value = myObject[i]["folio_documento"];



                        var hasta = new Date(myObject[i]["FECHA_HASTA"]);
                        document.getElementById('txtGrupoNominal').value = myObject[i]["cvepag_ocupado"];
                        var hora_ocupado = myObject[i]["hora_ocupado"];
                        if (myObject[i]["FECHA_HASTA"] != "01/01/9999") {
                            document.getElementById('placeholderHastaMultiple').value = myObject[i]["FECHA_HASTA"];
                        }
                        else {
                            document.getElementById('placeholderHastaMultiple').value = '';
                        }
                        var GrupoNominal = document.getElementById('txtGrupoNominal').value;
                        if (GrupoNominal != '') {
                            $("#txtGrupoNominalDescripcion").val('');
                            ConsultaGrupoNominal(GrupoNominal);
                        }
                        document.getElementById('txtObservacionMultiple').value = myObject[i]["OBSERVACIONES"];

                        document.getElementById('txtPuesto_Pop').value = myObject[i]["cvepue_ocupado"];
                        var Puesto = document.getElementById('txtPuesto_Pop').value;

                        if (Puesto != '') {
                            $("#txtPuestoDescripcionPop").val('');
                            ConsultaPuesto(Puesto);
                        }
                        document.getElementById('txtHoraJornada_Pop').value = hora_ocupado;
                    }

                    //$("#placeholderDesdeMultiple").prop("disabled", true);
                    //$("#placeholderHastaMultiple").prop("disabled", true);


                    LlenarVacantesMovimiento(cveRecurso_Movimiento);
                } else {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento_Vacante").prop("disabled", false);
                    $("#txtFolioMovimiento_Vacante").focus();
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }




    function ConsultaMovimiento(cveRecurso_Movimiento) {
        var cveRecurso_Movimiento_tipo;

        if ($("#Opcion option:selected").val() != "05") {
            cveRecurso_Movimiento_tipo = 2;
        } else {
            $("#placeholderHastaMultiple").prop("disabled", true);
            cveRecurso_Movimiento_tipo = 5;
        }

        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", cveRecurso_Movimiento_tipo:" + cveRecurso_Movimiento_tipo + "}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento").prop("disabled", false);
                    $("#txtFolioMovimiento").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                var tipo_movimiento = myObject[0]["tipo_movimiento"];
                if (tipo_movimiento == 'ocupado') {
                    $('#Div_Movimiento').show();

                    document.getElementById("btnNuevoMovimiento").style.visibility = "hidden";
                    document.getElementById("btnEliminarMovimientos").style.visibility = "visible";
                    $("#txtFolioMovimiento").prop("disabled", true);
                    $("#txtNombreMultiple").val('');
                    $("#placeholderDesdeMultiple").val('');
                    $("#placeholderHastaMultiple").val('');
                    var div = $("#gridview_Plazas_Movimiento").empty();
                    div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));
                    $('select option[value="0"]').attr("selected", true);
                    for (i in myObject) {

                        document.getElementById('txtNombreMultiple').value = myObject[i]["Nombre"];
                        var desde = new Date(myObject[i]["FECHA_DESDE"]);
                        var fecha = zeroFill(desde.getDate(), 2)
                        + '/' + zeroFill(1 + desde.getMonth(), 2)
                        + '/' + zeroFill(desde.getFullYear(), 2)

                        document.getElementById('placeholderDesdeMultiple').value = myObject[i]["FECHA_DESDE"];
                        document.getElementById('txtFolioDocumentoCIT').value = myObject[i]["folio_documento"];



                        var hasta = new Date(myObject[i]["FECHA_HASTA"]);
                        document.getElementById('txtGrupoNominal').value = myObject[i]["cvepag_ocupado"];
                        var hora_ocupado = myObject[i]["hora_ocupado"];
                        if (myObject[i]["FECHA_HASTA"] != "01/01/9999") {
                            document.getElementById('placeholderHastaMultiple').value = myObject[i]["FECHA_HASTA"];
                        }
                        else {
                            document.getElementById('placeholderHastaMultiple').value = '';
                        }
                        var GrupoNominal = document.getElementById('txtGrupoNominal').value;
                        if (GrupoNominal != '') {
                            $("#txtGrupoNominalDescripcion").val('');
                            ConsultaGrupoNominal(GrupoNominal);
                        }
                        document.getElementById('txtObservacionMultiple').value = myObject[i]["OBSERVACIONES"];

                        document.getElementById('txtPuesto_Pop').value = myObject[i]["cvepue_ocupado"];
                        var Puesto = document.getElementById('txtPuesto_Pop').value;

                        if (Puesto != '') {
                            $("#txtPuestoDescripcionPop").val('');
                            ConsultaPuesto(Puesto);
                        }
                        document.getElementById('txtHoraJornada_Pop').value = hora_ocupado;
                    }

                    //$("#placeholderDesdeMultiple").prop("disabled", true);
                    //$("#placeholderHastaMultiple").prop("disabled", true);


                    LlenarVacantesMovimiento(cveRecurso_Movimiento);
                } else {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento_Vacante").prop("disabled", false);
                    $("#txtFolioMovimiento_Vacante").focus();
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaMovimiento_Vacante(cveRecurso_Movimiento) {
        var cveRecurso_Movimiento_tipo = 2;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/sp_Recurso_Movimiento_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + ", cveRecurso_Movimiento_tipo:" + cveRecurso_Movimiento_tipo + "}",
            //data: "{'cveRecurso_Movimiento':" + cveRecurso_Movimiento + "}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento_Vacante").prop("disabled", false);
                    $("#txtFolioMovimiento_Vacante").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval(s);

                var tipo_movimiento = myObject[0]["tipo_movimiento"];

                if (tipo_movimiento == 'vacante') {
                    $('#HiddenField_cveRecurso_Vacante').attr('value', myObject[0]["cveRecurso_Vacante"]);
                    document.getElementById('txtNombre_Vacante').value = myObject[0]["Nombre"];
                    $('#ddlZona_Economica').val(myObject[0]["cvezona"]);
                    document.getElementById('txtPuesto_Pop_Vacante').value = myObject[0]["cvepue_vacante"];
                    var Puesto = document.getElementById('txtPuesto_Pop_Vacante').value;

                    if (Puesto != '') {
                        $("#txtPuestoDescripcionPop_Vacante").val('');
                        ConsultaPuesto_Vacante(Puesto);
                    }

                    document.getElementById('txtHoraJornada_Pop_Vacante').value = myObject[0]["hora_disponible"];
                    document.getElementById('txtObservacion_Vacante').value = myObject[0]["OBSERVACIONES"];
                    //$("#placeholderDesdeMultiple").prop("disabled", true);
                    //$("#placeholderHastaMultiple").prop("disabled", true);


                } else {
                    alert('No se encontró información de este folio');
                    $("#txtFolioMovimiento_Vacante").prop("disabled", false);
                    $("#txtFolioMovimiento_Vacante").focus();
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }

    function ConsultaGrupoNominal(GrupoNominal) {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/GrupoNominal_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'GrupoNominal':'" + GrupoNominal + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este grupo nominal');
                    $("#txtGrupoNominal").val('');
                    $("#txtGrupoNominal").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    document.getElementById('txtGrupoNominalDescripcion').value = myObject[i]["despag"];
                    $("#txtGrupoNominal").val(myObject[i]["cvepag"]);
                    $('#HiddenField_cvezon').attr('value', myObject[i]["cvezon"]);
                }
                $("#ddlNivelSalarial").prop("disabled", false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaEmpleado(NumeroEmpleado) {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Empleado_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'NumeroEmpleado':'" + NumeroEmpleado + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este empleado');
                    $("#txtNumeroEmpleado").val('');
                    $("#txtNumeroEmpleado").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    document.getElementById('txtNombreMultiple').value = myObject[i]["nomcom"];
                    $("#txtNumeroEmpleado").val(myObject[i]["numemp"]);

                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaFolioDocumentoCIT(Folio) {
        var XX;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/DocumentosCIT_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'Folio':'" + Folio + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este folio de documento en el CIT');
                    $("#txtFolioDocumentoCIT").val('');
                    $("#txtFolioDocumentoCIT").focus();
                    return new Boolean(false);
                }
                //var s = data.d;
                //var myObject = eval('(' + s + ')');
                return new Boolean(true);

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                XX = false;
                debugger;
            }
        });

        return new Boolean(false);

    }

    function ConsultaGrupoNominal_Vacante(GrupoNominal) {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/GrupoNominal_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            data: "{'GrupoNominal':'" + GrupoNominal + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    alert('No se encontró información de este grupo nominal');
                    $("#txtGrupoNominal_Vacante").val('');
                    $("#txtGrupoNominal_Vacante").focus();
                    return false;
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    document.getElementById('txtGrupoNominalDescripcion_Vacante').value = myObject[i]["despag"];
                    $("#txtGrupoNominal_Vacante").val(myObject[i]["cvepag"]);
                    $('#HiddenField_cvezon').attr('value', myObject[i]["cvezon"]);
                }
                $("#ddlNivelSalarial_Vacante").prop("disabled", false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaPuesto(puesto) {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarPuesto_Vacante',
            contentType: 'application/json; charset=utf-8',
            data: "{'puesto':'" + puesto + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    $("#ddlNivelSalarial").prop("disabled", true);
                    alert('No se encontró información de este puesto');
                    $("#txtPuesto_Pop").val('');
                    $("#txtPuestoDescripcion_Pop").val('');
                    $('#HiddenField_cvepuesto_equivalencia').attr('value', '0');
                    $("#HiddenField_cvpuespu").attr('value', '0');
                    return false;
                }

                var s = data.d;
                var myObject = eval('(' + s + ')');


                var filas = 0;
                var cvpuespu = $('#HiddenField_cvpuespu').val();
                if (cvpuespu != '') {
                    $('#gridview_Plazas_Movimiento tbody tr').each(function () {
                        filas = filas + 1;
                    });
                    if (myObject[0]["cvpuespu"] == 'IN' && filas > 1) {
                        alert('No puede cambiar la clave del puesto ya que esta usando  mas de un recurso');
                        return;
                    }
                }


                for (i in myObject) {
                    $("#txtPuesto_Pop").val(myObject[i]["cvepue"]);
                    $("#txtPuestoDescripcion_Pop").val(myObject[i]["horjorpu"]);
                    $("#HiddenField_cvepuesto_equivalencia").val(myObject[i]["cvepuesto_equivalencia"]);
                    $("#HiddenField_cvpuespu").val(myObject[i]["cvpuespu"]);
                    codnivpu = myObject[i]["codnivpu"];
                    var cvezon = $('#HiddenField_cvezon').val();
                    if (cvezon != '' && codnivpu != '') {
                        ProcesoCargarNivelSalarial(cvezon, codnivpu);
                    }
                }

                if ($('#HiddenField_cvezon').val() == '0') {
                    alert("Dede proporcionar un grupo nominal")
                    document.getElementById('HiddenField_cvezon').focus();
                    return;
                }

                Cambia_Puesto_Multiple();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ConsultaPuesto_Vacante(puesto) {
        if ($("#ddlZona_Economica").val() == '0') {
            alert('Debe seleccionar la zona economica');
            document.getElementById('ddlZona_Economica').focus();
            return;
        }

        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarPuesto_Vacante',
            contentType: 'application/json; charset=utf-8',
            data: "{'puesto':'" + puesto + "'}",
            dataType: 'json',
            success: function (data) {
                if (data.d == "") {
                    $('#HiddenField_cvepuesto_equivalencia').attr('value', '0');
                    $("#HiddenField_cvpuespu").attr('value', '0');
                    $("#ddlNivelSalarial_Vacante").prop("disabled", true);
                    alert('No se encontró información de este puesto');
                    $("#txtPuesto_Pop_Vacante").val('');
                    $("#txtPuestoDescripcion_Pop_Vacante").val('');
                    return false;
                }

                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    $("#txtPuesto_Pop_Vacante").val(myObject[i]["cvepue"]);


                    $("#txtPuestoDescripcion_Pop_Vacante").val(myObject[i]["horjorpu"]);
                    $("#HiddenField_cvepuesto_equivalencia").val(myObject[i]["cvepuesto_equivalencia"]);
                    $("#HiddenField_cvpuespu").val(myObject[i]["cvpuespu"]);
                    codnivpu = myObject[i]["codnivpu"];
                    var cvezon = $("#ddlZona_Economica").val();
                    ProcesoCargarNivelSalarial(cvezon, codnivpu);
                    Cambia_Puesto_Vacante();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ValidaPlazaUnica(NumeroPlaza, horas, Puesto, cveRecurso_Vacante, desde, hasta, PuestoDescripcion_Pop) {
        var valida = true;
        var cont = 0;
        var filas = 0;


    
        var cvpuespu = $('#HiddenField_cvpuespu').val();
        $('#gridview_Plazas_Movimiento tbody tr').each(function () {
            filas = filas + 1;
   
            var plazagrid = $(this).find("td").eq(2).html();
            var plazaDesde = $(this).find("td").eq(11).html();
            var plazaHasta = $(this).find("td").eq(12).html();


            if (plazagrid == NumeroPlaza ) {
                valida = false;
            }
        });

        if (!valida) {
            alert('Ya a agregado este recurso');
            return;
        }


        if (cvpuespu == 'IN' && filas >= 1) {
            alert('No puede utilizar mas de un recurso para un movimiento de interinato');
            return;
        }
     
        if (Puesto.indexOf("HORAS") > -1) {
            if (parseInt(horas) <= 0) {
                cont = cont + 1;
            }
        }
        if (PuestoDescripcion_Pop.indexOf("HORAS") > -1) {
            if (parseInt(horas) <= 0) {
                cont = cont + 1;
            }
        }
   
        if (cont > 0) {
            
            if ($("#Opcion option:selected").val() != "05") {
                alert('La plaza no tiene recurso disponible');
            } else {
                ProcesoAgregar_NumeroPlaza(NumeroPlaza, cveRecurso_Vacante);
            }


        } else {
            //$("#placeholderDesdeMultiple").prop("disabled", true);
            //$("#placeholderHastaMultiple").prop("disabled", true);
            ProcesoAgregar_NumeroPlaza(NumeroPlaza, cveRecurso_Vacante);
        }
    }







    function Proceso_Consulta_Numero_Plaza(NumeroPlaza, desde, hasta, NivelSalarial, cveRecurso_Vacante) {
        var cvpuespu = $('#HiddenField_cvpuespu').val();

        var opcion = $("#Opcion option:selected").val();
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_Consulta_Numero_Plaza',
            contentType: 'application/json; charset=utf-8',
            data: "{NumeroPlaza:" + NumeroPlaza + ", desde:'" + desde + "', hasta:'" + hasta + "', NivelSalarial:'" + NivelSalarial + "', cveRecurso_Vacante:'" + cveRecurso_Vacante + "', opcion:'" + opcion + "', cvpuespu:'" + cvpuespu + "'}",
            dataType: 'json',
            success: function (data) {

                $("#Load_plaza").hide();
                var totalRows = $("#gridview_Plazas_Movimiento tr").length;

                var div = $("#gridview_Plazas_Movimiento");
                if (totalRows == 0) {
                    var div = $("#gridview_Plazas_Movimiento").empty();
                }
                var s = data.d;
                var myObject = eval('(' + s + ')');

                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }

                    clase_numero = " class='solo-numero' ";

                    d = " ";
                    var PUESTO = $('#txtPuestoDescripcion_Pop').val();

                    if (PUESTO == "JORNADA") {
                        //El movimiento que se quiere agregar es una jornada
                        if (myObject[i]["cvepue"].indexOf("JORNADA") > -1) {//si el recurso a agregar es jornada se bloquea el campo de captura de horas
                            d = " disabled ";
                        }

                    }
                    eliminar = "<a id='btnEliminar' href='' class='row-Azul' title='Clic para eliminar esta plaza del movimiento' >";
                    texto = "<input type='text' placeholder='Text input'>";
                    div.append($("<tr>")
                   .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))//1
                   .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))//2
                   .append($("<td align='center' " + clase + " Width='61px' !important >").html(myObject[i]["Numero_Plaza"]))//3
                   .append($("<td " + clase + " Width='255px' !important  >").html(myObject[i]["Nombre"]))//4
                   .append($("<td align='center' " + clase + " Width='108px' !important  >").html(myObject[i]["Horas_Totales"]))//5
                   .append($("<td align='center' " + clase + " Width='107px' !important  >").html(myObject[i]["hora_vacante"]))//6                  
                   .append($("<td align='center' Width='107px'>").html('').append($('<input type="text"  style="width:54px; text-align: center;" name="horas_asignadas" class="horas_asignadas" value="' + myObject[i]["hora_disponible"] + '" maxlength="2" size="1"' + d + '">').html('')))//7
                   .append($("<td " + clase + " Width='152px' !important  >").html(myObject[i]["Nivel_educativo"]))//8
                   .append($("<td align='center' " + clase + " Width='62px' !important  >").html(myObject[i]["cvepue"]))//9
                   //.append($("<td " + clase + " Width='152px' !important>").html(myObject[i]["descripcion"]))//10
                   .append($("<td >").html(myObject[i]["cvenivpl"]))//11
                   .append($("<td >").html(myObject[i]["hora_disponible"]))//12
                   .append($("<td >").html(""))//13--COLUMNA AGREGADA EN SUSTITUCION DEL CAMPO [cveRecurso_Ocupado] QUE ESTA VACION HASTA QUE SE GUARDA EL MOVIMIENTO
                   .append($("<td Width='50px'>").html('').append($(eliminar).html('Eliminar'))
                    ));
                }

                $('#gridview_Plazas_Movimiento td:nth-child(1)').hide();
                $('#gridview_Plazas_Movimiento td:nth-child(2)').hide();
                $('#gridview_Plazas_Movimiento td:nth-child(10)').hide();
                $('#gridview_Plazas_Movimiento td:nth-child(11)').hide();
                $('#gridview_Plazas_Movimiento td:nth-child(12)').hide();
                $("#Load_plaza").hide();
            },

            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ProcesoAgregar_NumeroPlaza(NumeroPlaza, cveRecurso_Vacante) {

        $("#Load_plaza").show();


        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;
        var NivelSalarial = $("#ddlNivelSalarial").val();

        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }

        Proceso_Consulta_Numero_Plaza(NumeroPlaza, desde, hasta, NivelSalarial, cveRecurso_Vacante);

    }

    function Proceso_Consulta_Movimiento(cveRecurso_Movimiento, pagina) {
        var hiddenId = pagina.parent()[0].childNodes[0].innerText;
        var cveRecurso_Movimiento = "";

        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{cveRecurso_Vacante:" + hiddenId + ", cveRecurso_Movimiento:'" + cveRecurso_Movimiento + "'}",

            url: "Plazas_Vacantes.aspx/Proceso_Consulta_Movimientos",
            dataType: "json",
            success: function (data) {


                var s = data.d;

                if (s == "") {
                    alert("No hay información de movimiento");
                    return;
                } else {
                    $('#lblTituloPrincipal_PlazaMovimiento').text("");
                    $('#test_detalle_ocupa_PlazaMovimiento').text("");

                    //No se modifica el movimiento
                    document.getElementById("btnGuardar").style.visibility = "hidden";
                    document.getElementById("btnEliminarMovimiento").style.visibility = "hidden";
                    $("#ddlPuesto").prop("disabled", true);
                    $("#txtHoraJornada").prop("disabled", true);

                    var cveNivel_Educativo = pagina.parent()[0].childNodes[1].innerText;
                    var clave = pagina.parent()[0].childNodes[2].innerText;
                    var nombre = pagina.parent()[0].childNodes[3].innerText;
                    var HJ = pagina.parent()[0].childNodes[4].innerText;
                    var Puesto = pagina.parent()[0].childNodes[6].innerText;
                    var fecha_baja = pagina.parent()[0].childNodes[7].innerText;

                    if (HJ != '	' && HJ != '') {
                        Hora_Jornada = " - " + HJ;
                    }
                    else {
                        Hora_Jornada = "";
                    }


                    $(".ui-dialog-titlebar").hide();

                    $('#lblTituloPrincipal_PlazaMovimiento').text("Plaza: " + clave + "     Nombre: " + nombre);
                    $('#test_detalle_ocupa_PlazaMovimiento').text("Puesto: " + Puesto + "  " + Hora_Jornada);

                    $('#HiddenField_puesto').attr('value', Puesto);
                    $('#HiddenField_cveRecurso_Vacante').attr('value', hiddenId);
                    $('#HiddenField_cveNivel_Educativo').attr('value', cveNivel_Educativo);


                    $overlay = $('<div id="overlay"></div>');
                    $modal = $('<div id="modal"></div>');
                    $content = $('<div id="content"></div>');
                    $close = $('<a id="close" href="#">close</a>');

                    dialogPlazas_Recursos.hide();

                    dialog_Plaza_movimientos.dialog("open");

                    //dialog_Plaza_movimientos.show();
                    //modal.open({ content: dialog_Plaza_movimientos });





                    var divEncabezado = $("#GridEncabezado_detalle").empty();
                    var div = $("#test_detalle").empty();
                    divEncabezado.append($("<tbody  style='width:814px;  display:block; position:relative;'>"));
                    divEncabezado.append(
                        $("<tr>")
                        .append($("<th Width='250px'>").html('Nombre'))
                        .append($("<th Width='70px'>").html('Hor/Jor'))
                        .append($("<th Width='101px'>").html('Desde'))
                        .append($("<th Width='101px'>").html('Hasta'))
                        .append($("<th Width='100px'>").html('Nivel'))
                        .append($("<th Width='50px'>").html('Puesto'))
                        .append($("<th Width='100px'>").html('Movimiento'))
                    );

                    div.append($("<tbody  style='height:200px; width:830px; overflow-y:scroll; display:block; position:relative;'>"));

                    var myObject = eval('(' + s + ')');
                    for (i in myObject) {
                        var fecha = "";



                        if (myObject[i]["FECHA_HASTA"] == "01/01/9999" || myObject[i]["FECHA_HASTA"] == "") {
                            clase = " class='row-Rojo' ";
                            //fecha = myObject[i]["FECHA_HASTA"];
                        } else {
                            clase = " class='row-gris' ";
                            fecha = myObject[i]["FECHA_HASTA"];
                        }


                        div.append($("<tr >")
                        .append($("<td " + clase + " Width='0px'>").html(myObject[i]["cveRecurso_Ocupado"]))
                        .append($("<td " + clase + " Width='0px'>").html(myObject[i]["cveRecurso_Vacante"]))

                        .append($("<td " + clase + " Width='251px'>").html(myObject[i]["Nombre"]))
                        .append($("<td " + clase + " Width='73px'>").html(myObject[i]["hora_vacante"]))
                        .append($("<td " + clase + " Width='102px'>").html(myObject[i]["FECHA_DESDE"]))
                        .append($("<td " + clase + " Width='101px'>").html(fecha))
                        .append($("<td " + clase + " Width='103px'>").html(myObject[i]["Nivel_educativo"]))
                        .append($("<td " + clase + " Width='53px'>").html(myObject[i]["cvepue"]))
                        //.append($("<td " + clase + " Width='0px'>").html(myObject[i]["cvepuesto_equivalencia_detalle"]))
                        .append($("<td " + clase + " Width='103px'>").html(myObject[i]["cveRecurso_Movimiento"]))
                        );
                        var X = $('#test_detalle_ocupa_PlazaMovimiento').text();
                    }
                    $('#test_detalle_ocupa_PlazaMovimiento').text("Baja: " + myObject[i]["fecha_baja"] + " - " + X);
                    $('#test_detalle td:nth-child(1)').hide();
                    $('#test_detalle td:nth-child(2)').hide();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function LlenarZonaEconomica() {

        $("#ddlZona_Economica").get(0).options.length = 0;
        $.ajax({
            type: "POST",
            url: 'Plazas_Vacantes.aspx/ZonaEconomica_selectStringJSON',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {

                var s = data.d;

                var myObject = eval('(' + s + ')');
                $("#ddlZona_Economica").get(0).options[$("#ddlZona_Economica").get(0).options.length] = new Option('SELECCIONAR', 0);
                for (i in myObject) {
                    $("#ddlZona_Economica").get(0).options[$("#ddlZona_Economica").get(0).options.length] = new Option(myObject[i]["cvezon"], myObject[i]["cvezon"]);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlZona_Economica").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }



    function LlenarPuesto_Vacante() {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarPuesto_Vacante',
            contentType: 'application/json; charset=utf-8',
            data: "{'puesto':'" + "" + "'}",
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                var myObject = eval('(' + s + ')');
                $("#ddlPuesto_Vacante").get(0).options[$("#ddlPuesto_Vacante").get(0).options.length] = new Option('SELECCIONAR', 0);
                for (i in myObject) {
                    $("#ddlPuesto_Vacante").get(0).options[$("#ddlPuesto_Vacante").get(0).options.length] = new Option(myObject[i]["ClaveCompuesta"], myObject[i]["cvepuesto_equivalencia"]);
                }
                document.getElementById("lblHoraJornada_Vacante").style.visibility = "hidden";
                document.getElementById("txtHoraJornada_Vacante").style.visibility = "hidden";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlPuesto_Vacante").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }





    function LlenarPuesto_Compactacion() {
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarPuesto_Vacante',
            contentType: 'application/json; charset=utf-8',
            data: "{'puesto':'" + "" + "'}",
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                var myObject = eval('(' + s + ')');
                $("#ddlPuesto_Compactacion").get(0).options[$("#ddlPuesto_Compactacion").get(0).options.length] = new Option('SELECCIONAR', 0);
                for (i in myObject) {
                    $("#ddlPuesto_Compactacion").get(0).options[$("#ddlPuesto_Compactacion").get(0).options.length] = new Option(myObject[i]["ClaveCompuesta"], myObject[i]["cvepuesto_equivalencia"]);
                }
                document.getElementById("lblHoraJornada_Vacante").style.visibility = "hidden";
                document.getElementById("txtHoraJornada_Vacante").style.visibility = "hidden";
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlPuesto_Compactacion").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }
    function LlenarMotivo_Vacante() {
        $("#ddlMotivo_Vacante").get(0).options.length = 0;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_LlenarMotivo_Vacante',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                var myObject = eval('(' + s + ')');
                $("#ddlMotivo_Vacante").get(0).options[$("#ddlMotivo_Vacante").get(0).options.length] = new Option('SELECCIONAR', 0);
                for (i in myObject) {
                    $("#ddlMotivo_Vacante").get(0).options[$("#ddlMotivo_Vacante").get(0).options.length] = new Option(myObject[i]["descripcion"], myObject[i]["cveMotivos_Baja"]);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlMotivo_Vacante").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }

    function LlenarMunicipio() {
        $("#ddlMunicipio").get(0).options.length = 0;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/GESRH_SPT_Catalogo_MunicipioStringJSON',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                var myObject = eval('(' + s + ')');
                $("#ddlMunicipio").get(0).options[$("#ddlMunicipio").get(0).options.length] = new Option('SELECCIONAR', "0");
                for (i in myObject) {
                    $("#ddlMunicipio").get(0).options[$("#ddlMunicipio").get(0).options.length] = new Option(myObject[i]["desmun"], myObject[i]["cvemun"]);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlMunicipio").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }

    function LimpiaHiddenField() {
        $('#HiddenField_puesto').attr('value', '');
        $('#HiddenField_cveRecurso_Vacante').attr('value', '0');
        $('#HiddenField_cveRecurso_Ocupado').attr('value', '0');
        $('#HiddenField_cveNivel_Educativo').attr('value', '0');
        $('#HiddenField_cveNivel_Educativo_Plaza').attr('value', '');
        $('#HiddenField_Horas_Plaza').attr('value', '');
        $('#HiddenField_codnivpu').attr('value', '0');
        $('#HiddenField_cvezon').attr('value', '0');
        $('#HiddenField_cvenivpl').attr('value', '0');
        $('#HiddenField_cvepuesto_equivalencia').attr('value', '0');
        $('#HiddenField_cvpuespu').attr('value', '0');

        $('#HiddenField_cvepuesto_equivalencia_compactacion').attr('value', '0');
        $('#HiddenField_codnivpu_compactacion').attr('value', '0');
        $('#HiddenField_cvepuesto_equivalencia_descompactacion').attr('value', '0');
        $('#HiddenField_codnivpu_descompactacion').attr('value', '0');



    }


    function NuevoMovimiento() {
        document.getElementById("ddlNivelSalarial").style.visibility = "hidden";
        document.getElementById("ddlNivelSalarial_Vacante").style.visibility = "hidden";
        document.getElementById("lblHoraJornada_Pop").style.visibility = "hidden";
        document.getElementById("txtHoraJornada_Pop").style.visibility = "hidden";
        $("#txtFolioMovimiento").prop("disabled", true);
        $("#txtFolioMovimiento").val('');
        $("#txtNombreMultiple").val('');
        $("#placeholderDesdeMultiple").val('');
        $("#placeholderHastaMultiple").val('');
        $("#txtPuesto_Pop").val('');
        $("#txtPuestoDescripcion_Pop").val('');
        $("#txtNumeroEmpleado").val('');
        $("#txtHoraJornada_Pop").val('');
        $("#txtGrupoNominal").val('');
        $("#txtFolioDocumentoCIT").val('');
        $("#txtGrupoNominalDescripcion").val('');
        $("#placeholderDesdeMultiple").prop("disabled", false);
        $("#placeholderHastaMultiple").prop("disabled", false);






        $("#txtNombreMultiple").prop("disabled", false);
        $("#txtPuesto_Pop").prop("disabled", false);
        $("#ddlMunicipioMultiple").prop("disabled", false);
        var div = $("#gridview_Plazas_Movimiento").empty();
        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));
        $('select option[value="0"]').attr("selected", true);
        LimpiaHiddenField();
        $("#txtNombreMultiple").focus();
    }

    function NuevoMovimiento_Pop() {
        $("#txtFolioMovimiento_Vacante").prop("disabled", true);
        $("#txtFolioMovimiento_Vacante").val('');
        $("#txtNombre_Vacante").val('');
        $("#txtGrupoNominal_Vacante").val('');
        $("#txtPuesto_Pop_Vacante").val('');
        $("#txtHoraJornada_Pop_Vacante").val('');
        $("#txtObservacion_Vacante").val('');
        $("#txtGrupoNominalDescripcion_Vacante").val('');
        $("#txtPuestoDescripcion_Pop_Vacante").val('');
        $("#txtGrupoNominal_Vacante").prop("disabled", false);
        document.getElementById("txtHoraJornada_Pop_Vacante").style.visibility = "hidden";
        document.getElementById("lblHoraJornada_Pop_Vacante").style.visibility = "hidden";
        $("#txtPuesto_Pop_Vacante").prop("disabled", false);
        $('select option[value="0"]').attr("selected", true);
        LimpiaHiddenField();
        $("#txtNombre_Vacante").focus();
    }

    function NuevoMovimiento_Compactacion() {

        $('#Div_compactacion').show();
        $("#txtFolioMovimientoCompactacion").prop("disabled", true);
        $("#txtFolioMovimientoCompactacion").val('');
        $("#txtPlaza_Compactacion").val('');
        $("#txtFolioDocumentoCIT_Compactacion").val('');

        $("#txtHoraJornada_Compactacion").val('');
        $("#txtPuestoDescripcion_Compactacion").val('');
        $("#txtPuesto_Compactacion").val('');
        $("#txtNombre_Compactacion").val('');




        var div = $("#gridview_Plazas_Compactacion").empty();
        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));


        LimpiaHiddenField();
        $("#txtPlaza_Compactacion").focus();
    }



    function NuevoMovimiento_Descompactacion() {

        $('#Div_descompactacion').show();
        $("#txtFolioMovimientoDescompactacion").prop("disabled", true);
        $("#txtFolioMovimientoDescompactacion").val('');
        $("#txtPlaza_Descompactacion").val('');
        $("#txtFolioDocumentoCIT_Descompactacion").val('');

        $("#txtHoraJornada_Descompactacion").val('');
        $("#txtPuestoDescripcion_Descompactacion").val('');
        $("#txtPuesto_Descompactacion").val('');
        $("#txtNombre_Descompactacion").val('');


        LimpiaHiddenField();
        $("#txtPlaza_Descompactacion").focus();
    }



    function NuevoMovimiento_Recategorizacion() {

        $('#Div_Recategorizacion').show();
        $("#txtFolioMovimientoRecategorizacion").prop("disabled", true);
        $("#txtFolioMovimientoRecategorizacion").val('');
        $("#txtPlaza_Recategorizacion").val('');
        $("#txtFolioDocumentoCIT_Recategorizacion").val('');

        $("#txtHoraJornada_Recategorizacion").val('');
        $("#txtPuestoDescripcion_Recategorizacion").val('');
        $("#txtPuesto_Recategorizacion").val('');
        $("#txtNombre_Recategorizacion").val('');


        LimpiaHiddenField();
        $("#txtPlaza_Recategorizacion").focus();
    }



    function LimpiarMovimiento() {
        $('#Div_Movimiento').hide();
        $("#ddlNivelSalarial").prop("disabled", true);

        $("#txtPuesto_Pop").prop("disabled", false);
        $("#txtFolioMovimiento").prop("disabled", false);
        $("#txtFolioMovimiento").val('');
        $("#txtNombreMultiple").val('');
        $("#txtGrupoNominal").val('');
        $("#txtGrupoNominalDescripcion").val('');
        $("#placeholderDesdeMultiple").val('');
        $("#placeholderHastaMultiple").val('');
        $("#txtPuesto_Pop").val('');
        $("#txtPuestoDescripcion_Pop").val('');
        $("#txtHoraJornada_Pop").val('');
        $("#txtGrupoNominal").val('');
        $("#txtNumeroEmpleado").val('');
        $("#txtGrupoNominalDescripcion").val('');
        $("#placeholderDesdeMultiple").prop("disabled", false);
        $("#placeholderHastaMultiple").prop("disabled", false);
        $("#txtNombreMultiple").prop("disabled", false);
        $("#ddlMunicipioMultiple").prop("disabled", false);
        $("#txtGrupoNominal").prop("disabled", false);

        document.getElementById("btnEliminarMovimientos").style.visibility = "hidden";
        document.getElementById("btnNuevoMovimiento").style.visibility = "visible";

        $("#txtObservacionMultiple").val('');
        $("#txtFolioDocumentoCIT").val('');
        $("#txtFolioMovimiento").val('');
        var div = $("#gridview_Plazas_Movimiento").empty();

        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));

        var div2 = $("#gridview_UnificarPlazasRecursos").empty();
        div2.append($("<tbody style='height: 150px; display:block; position:relative;'>"));

        $('select option[value="0"]').attr("selected", true);
        LimpiaHiddenField();
        $("#txtFolioMovimiento").focus();
    }

    function LimpiarDialog() {
        dialogPlazas_Compactacion.hide();
        dialogPlazas_Descompactacion.hide();
        dialogPlazas.hide();
        dialogAgregaPlazas.hide();
        dialogVacante.hide();
        dialogPlazas_Recursos.hide();
        dialogConsultaPlazasRecursos.hide();
        dialogUnificarPlazasRecursos.hide();

        //dialog.hide();
        //dialog_Plaza_movimientos.hide();
        //dialogPlazas.hide();
        //dialogPlazas_Compactacion.hide();
        //dialogPlazas_Descompactacion.hide();
        //dialogPlazas_Recategorizacion.hide();
        //dialogPlazas_Recursos.hide();
        //dialogConsultaPlazasRecursos.hide();
        //dialogPuesto.hide();
        //dialogMovimiento.hide();
        //dialogVacante.hide();
        //dialogAgregaPlazas.hide();




    }

    function LimpiarMovimiento_Pop() {
        $("#txtFolioMovimiento_Vacante").prop("disabled", false);
        $("#txtFolioMovimiento_Vacante").val('');
        $("#txtNombre_Vacante").val('');
        $("#txtGrupoNominal_Vacante").val('');
        $("#txtPuesto_Pop_Vacante").val('');
        $("#txtHoraJornada_Pop_Vacante").val('');
        $("#txtObservacion_Vacante").val('');
        $("#txtGrupoNominalDescripcion_Vacante").val('');
        $("#txtPuestoDescripcion_Pop_Vacante").val('');
        $("#txtGrupoNominal_Vacante").prop("disabled", false);
        document.getElementById("txtHoraJornada_Pop_Vacante").style.visibility = "hidden";
        document.getElementById("lblHoraJornada_Pop_Vacante").style.visibility = "hidden";
        $("#placeholderDesdeMultiple_Vacante").val('');
        $("#placeholderDesdeMultiple_Vacante").prop("disabled", false);

        $("#txtPuesto_Pop_Vacante").prop("disabled", false);
        $('select option[value="0"]').attr("selected", true);
        LimpiaHiddenField();
        $("#txtFolioMovimiento_Vacante").focus();
    }

    function LimpiarMovimiento_Pop_Compactacion() {

        $("#txtFolioMovimientoCompactacion").prop("disabled", false);
        $("#txtFolioMovimientoCompactacion").val('');
        $("#txtPlaza_Compactacion").val('');
        $("#txtFolioDocumentoCIT_Compactacion").val('');

        $("#txtHoraJornada_Compactacion").val('');
        $("#txtPuestoDescripcion_Compactacion").val('');
        $("#txtPuesto_Compactacion").val('');
        $("#txtNombre_Compactacion").val('');




        var div = $("#gridview_Plazas_Compactacion").empty();
        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));


        LimpiaHiddenField();
        $("#txtFolioMovimientoCompactacion").focus();

    }


    function LimpiarMovimiento_Pop_Descompactacion() {
        $('#Div_descompactacion').hide();
        $("#txtFolioMovimientoDescompactacion").prop("disabled", false);
        $("#txtFolioMovimientoDescompactacion").val('');
        $("#txtPlaza_Descompactacion").val('');
        $("#txtFolioDocumentoCIT_Descompactacion").val('');

        $("#txtHoraJornada_Descompactacion").val('');
        $("#txtPuestoDescripcion_Descompactacion").val('');
        $("#txtPuesto_Descompactacion").val('');
        $("#txtNombre_Descompactacion").val('');

        var div = $("#gridview_Plazas_Descompactacion").empty();
        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));


        LimpiaHiddenField();
        $("#txtFolioMovimientoDescompactacion").focus();

    }

    function LimpiarMovimiento_Pop_Recategorizacion() {
        //$('#Div_Recategorizacion').hide();
        $("#txtFolioMovimientoRecategorizacion").prop("disabled", false);
        $("#txtFolioMovimientoRecategorizacion").val('');
        $("#txtPlaza_Recategorizacion").val('');
        $("#txtFolioDocumentoCIT_Recategorizacion").val('');

        $("#txtHoraJornada_Recategorizacion").val('');
        $("#txtPuestoDescripcion_Recategorizacion").val('');
        $("#txtPuesto_Recategorizacion").val('');
        $("#txtNombre_Recategorizacion").val('');

        var div = $("#gridview_Plazas_Recategorizacion").empty();
        div.append($("<tbody style='height: 150px; display:block; position:relative;'>"));


        LimpiaHiddenField();
        $("#txtFolioMovimientoRecategorizacion").focus();

    }



    function LimpiarVacante() {
        $('#txtNombre_Vacante').val('');
        $('#placeholderBaja_Vacante').val('');
        $('#txtHoraJornada_Vacante').val('');
        $('select option[value="0"]').attr("selected", true);
        LimpiaHiddenField();
        $('#dialog-Vacantes').dialog('close');
    }

    function LlenarCentroCosto() {
        $("#ddlCentroCosto").get(0).options.length = 0;
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/GESRH_SPT_Catalogo_CentroCostoStringJSON',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                var s = data.d;
                var myObject = eval('(' + s + ')');
                $("#ddlCentroCosto").get(0).options[$("#ddlCentroCosto").get(0).options.length] = new Option('SELECCIONAR', "0");
                for (i in myObject) {
                    $("#ddlCentroCosto").get(0).options[$("#ddlCentroCosto").get(0).options.length] = new Option(myObject[i]["descentro"], myObject[i]["cvecentro"]);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#ddlCentroCosto").get(0).options.length = 0;
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }

    function stopRKey(evt) {
        var evt = (evt) ? evt : ((event) ? event : null);
        var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
        if ((evt.keyCode == 13) && (node.type == "text")) { return false; }
    }


    function ValidaHoras() {
        var cont = 0;
        $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
            var nTds = $('td', this);


            hiddenId = $(nTds[0]).text();
            cveNivel_Educativo = $(nTds[1]).text();
            clave = $(nTds[2]).text();
            nombre = $(nTds[3]).text();
            horas_totales = $(nTds[5]).text();
            horas_asignar = $(this).find(".horas_asignadas").val();

            PuestoMovimiento = $(nTds[8]).text();
            cvenivpl = $(nTds[11]).text();
            horas_asignar_oculto = $(nTds[10]).text();
            if (PuestoMovimiento.indexOf("HORAS") > -1) {

                if (horas_asignar == "" || horas_asignar == "0" || horas_asignar == "00") {
                    alert('Debe proporcionar el numero de horas de la plaza ' + clave);
                    $(this).find(".horas_asignadas").focus();
                    cont = cont + 1;
                }
            }
            if (parseInt(horas_asignar_oculto) < parseInt(horas_asignar)) {
                alert('Está excediendo las horas disponibles de la plaza ' + clave);
                $(this).find(".horas_asignadas").focus();
                cont = cont + 1;
            }
        });
        if (cont >= 1) {
            return false;
        } else {
            return true;
        }

    }


    function Costeo_plazas(obj) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_OcupadoEntity: obj }),
            url: "Plazas_Vacantes.aspx/Costeo_Plazas",
            dataType: "json",

            success: function (data) {
                var s = data.d;
                if (s == "") {
                    alert("No hay información para costeo");
                    return;
                }
                clase = " class='row-Gris' ";
                var divEncabezado = $("#GridEncabezado_detalle_ocupa").empty();
                var div = $("#test_detalle_ocupa").empty();
                divEncabezado.append($("<tbody  style='width:800px;  display:block; position:relative;'>"));
                divEncabezado.append(
                    $("<tr>")
                    .append($("<th Width='300px'>").html('NOMBRE'))
                    .append($("<th Width='100px'>").html('PUESTO'))
                    .append($("<th Width='100px'>").html('HORAS'))
                    .append($("<th Width='100px'>").html('COSTO UNITARIO'))
                    .append($("<th Width='100px'>").html('IMPORTE REQUERIDO'))

                );

                div.append($("<tbody  style='height:110px; width:800px; display:block; position:relative;'>"));
                var s = data.d;
                var myObject = eval('(' + s + ')');

                div.append($("<tr >")
                    .append($("<td " + clase + " Width='302px'>").html(document.getElementById('txtNombreMultiple').value))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[0]["puesto_ocupado"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[0]["horas_ocupado"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[0]["costo_ocupado"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[0]["importe_ocupado"]))

                    );
                var divEncabezado = $("#GridEncabezado_detalle_asigna").empty();
                var div = $("#test_detalle_asigna").empty();
                divEncabezado.append($("<tbody  style='width:830px;  display:block; position:relative;'>"));
                divEncabezado.append(
                    $("<tr>")
                    .append($("<th Width='100px'>").html('PLAZA'))
                    .append($("<th Width='250px'>").html('NOMBRE'))
                    .append($("<th Width='100px'>").html('PUESTO'))
                    .append($("<th Width='100px'>").html('HORAS'))
                    .append($("<th Width='100px'>").html('COSTO UNITARIO'))
                    .append($("<th Width='100px'>").html('IMPORTE UTILIZADO'))
                );

                div.append($("<tbody  style='height:150px; width:836px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                var myObject = eval('(' + s + ')');
                var importe_total = 0;
                for (i in myObject) {

                    div.append($("<tr >")
                    .append($("<td " + clase + " Width='102px'>").html(myObject[i]["Numero_Plaza"]))
                    .append($("<td " + clase + " Width='252px'>").html(myObject[i]["nombre_vacante"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[i]["cvepue_vacante"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[i]["horas_utilizadas"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[i]["importe_vacante"]))
                    .append($("<td " + clase + " Width='102px'>").html(myObject[i]["importe_utilizado"]))
                    );
                    importe_total += parseFloat(myObject[i]["importe_utilizado"]);
                }
                $('#lblImporteTotal').text("COSTO TOTAL DEL RECURSO A UTILIZAR: " + Math.floor(importe_total * 100) / 100) + " " + Math.floor(importe_total);
                dialog.dialog("open");
                $('#HiddenField_Horas_Plaza').attr('value', myObject[0]["hrspla"]);
                $('#HiddenField_cveNivel_Educativo_Plaza').attr('value', myObject[0]["cveNivel_Educativo"]);


                $('#ddlPuesto_Vacante').val(myObject[0]["cvepuesto_equivalencia"]);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ValidaGuardar(obj) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_OcupadoEntity: obj }),
            url: "Plazas_Vacantes.aspx/Valida_Guardar",
            dataType: "json",
            success: function (data) {
                $(data.d).each(function (index, item) {
                    if (item.respuesta) {
                        ProcesoGuardar(obj);
                    } else {

                        if (item.mensaje.match(/El recurso necesario para el nuevo movimiento esta excedido por.*/)) {
                            var mensaje;
                            var opcion = confirm(item.mensaje + " ¿Desea continuar de todas formas?");
                            if (opcion == true) {
                                ProcesoGuardar(obj);
                            }
                        }
                        else {
                            alert(item.mensaje);
                        }
                        return;
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ValidaEliminar(obj, cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, linea) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_OcupadoEntity: obj }),
            url: "Plazas_Vacantes.aspx/Valida_Guardar",
            dataType: "json",
            success: function (data) {
                $(data.d).each(function (index, item) {
                    if (item.respuesta) {
                        Eliminar(cveRecurso_Movimiento, cveRecurso_Vacante, cveRecurso_Ocupado, linea);
                        return false;
                    } else {
                        alert(item.mensaje);
                        return;
                    }
                });
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function existeFecha2(fecha) {
        var fechaf = fecha.split("/");
        var d = fechaf[0];
        var m = fechaf[1];
        var y = fechaf[2];
        return m > 0 && m < 13 && y > 0 && y > 2000 && y < 2100 && d > 0 && d <= (new Date(y, m, 0)).getDate();
    }

    function ValidaAgregarMovimientoMultiple(linea) {

        var Nombre = document.getElementById('txtNombreMultiple').value;
        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;
        var Puesto_Pop = document.getElementById('txtPuesto_Pop').value;
        var PuestoDescripcion_Pop = document.getElementById('txtPuestoDescripcion_Pop').value;

        

        var numplaza = linea.parent().parent()[0].childNodes[2].innerText;
        var horas = linea.parent().parent()[0].childNodes[4].innerText;

        var desdeRecurso = linea.parent().parent()[0].childNodes[7].innerText;
        var hastaRecurso = linea.parent().parent()[0].childNodes[8].innerText;

      


        var cveRecurso_Vacante = linea.parent().parent()[0].childNodes[0].innerText;


        var puesto = linea.parent().parent()[0].childNodes[6].innerText;


     

        if (Nombre.length <= 0) {
            alert('Debe proporcionar un nombre');
            document.getElementById('txtNombreMultiple').focus();
            return;
        }

        if (!existeFecha2(desde)) {
            alert('La fecha desde es incorrecta');
            document.getElementById('placeholderDesdeMultiple').focus();
            return;
        }
        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }

 	if (hastaRecurso == "") {
            if (!existeFecha2(hastaRecurso)) {
                hastaRecurso = '01/01/9999'
            }
        } 

        if (compare_dates(desde, hasta)) {
            alert('La fecha de inicio no puede ser mayor que la fecha fin');
            document.getElementById('placeholderHastaMultiple').focus();
            return;
        }

        if (compare_dates(desdeRecurso,desde)) {
            alert('El rango de fecha del movimiento que desea ingresar excede la del recurso vacante ');
           // document.getElementById('placeholderHastaMultiple').focus();
            return;
        }

        if (compare_dates(hasta,hastaRecurso)) {
            alert('El rango de fecha del movimiento que desea ingresar excede la del recurso vacante ');
            //document.getElementById('placeholderHastaMultiple').focus();
            return;
        }


        


        if (Puesto_Pop == "") {
            alert('Debe proporcionar una clave de puesto');
            document.getElementById('txtPuesto_Pop').focus();
            return;
        } else {
            var Puesto = document.getElementById('txtPuesto_Pop').value;
            if (Puesto != '') {
                $("#txtPuestoDescripcionPop").val('');
                ConsultaPuesto(Puesto);
            }
        }

        


        ValidaPlazaUnica(numplaza, horas, puesto, cveRecurso_Vacante, desde, hasta, PuestoDescripcion_Pop);
    }

    function compare_dates(fecha, fecha2) {
        var xMonth = fecha.substring(3, 5);
        var xDay = fecha.substring(0, 2);
        var xYear = fecha.substring(6, 10);
        var yMonth = fecha2.substring(3, 5);
        var yDay = fecha2.substring(0, 2);
        var yYear = fecha2.substring(6, 10);
        if (xYear > yYear) {
            return (true)
        }
        else {
            if (xYear == yYear) {
                if (xMonth > yMonth) {
                    return (true)
                }
                else {
                    if (xMonth == yMonth) {
                        if (xDay > yDay)
                            return (true);
                        else
                            return (false);
                    }
                    else
                        return (false);
                }
            }
            else
                return (false);
        }
    }

    function ProcesoConsultar_Recursos() {
        var opcion = $("#Opcion option:selected").val();

        var CentroCosto = "Todos";
        var filtro = $('#txtFiltro_Recursos').val();
        var NivelSalarial = $("#ddlNivelSalarial").val();
  

        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;

        var cvpuespu = $('#HiddenField_cvpuespu').val();

        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }


        var div = $("#gridview_Plazas_Recursos").empty();
        div.append($("<tbody style='height: 150px; overflow-y:scroll; display:block; position:relative;'>"));

        $("#Load_plaza").show();
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_Consulta_CentroCosto',
            contentType: "application/json",


            data: "{'CentroCosto':'" + CentroCosto + "', filtro:'" + filtro + "', NivelSalarial:'" + NivelSalarial + "', desde:'" + desde + "', hasta:'" + hasta + "', opcion:'" + opcion + "', cvpuespu:'" + cvpuespu + "'}",


            dataType: 'json',
            success: function (data) {
                $("#Load_plaza").hide();
                var divEncabezado = $("#gridviewT_Plazas_Recursos").empty();
                var div = $("#gridview_Plazas_Recursos").empty();
                divEncabezado.append(
                                        $("<tr>")
                                       .append($("<th align='center' Width='80px'>").html('# PLAZA'))
                                       .append($("<th align='center' Width='250px'>").html('NOMBRE'))
                                       .append($("<th align='center' Width='60px'>").html('HORAS DISPONIBLES'))
                                        .append($("<th align='center' Width='150px'>").html('NIVEL'))
                                        .append($("<th align='center' Width='100px'>").html('PUESTO'))
                                        .append($("<th align='center' Width='80px'>").html('DESDE'))
                                        .append($("<th align='center' Width='80px'>").html('HASTA'))
                                        //.append($("<th align='center' Width='150px'>").html('MOTIVO'))
                                        );
                div.append($("<tbody style='height: 200px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                if (s == "") {
                    alert("No hay información de esta plaza en los efectos seleccionados");
                    return;
                }
                var myObject = eval('(' + s + ')');

                if (opcion == "06") {
                    agregar = "";
                } else {
                    agregar = "<a id='btnAgregar' href='' class='row-Azul' title='Clic para utilizar esta plaza en el nuevo movimiento' >";
                }


                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }
                    var fecha_baja = "";
                    if (myObject[i]["fecha_baja"] == "01/01/9999" || myObject[i]["fecha_baja"] == "") {
                        fecha_baja = "";
                    } else {
                        fecha_baja = myObject[i]["fecha_baja"];
                    }

                    var fecha_baja_hasta = "";
                    if (myObject[i]["fecha_baja_hasta"] == "01/01/9999" || myObject[i]["fecha_baja_hasta"] == "") {
                        fecha_baja_hasta = "";
                    } else {
                        fecha_baja_hasta = myObject[i]["fecha_baja_hasta"];
                    }




                    div.append($("<tr >")
                   .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))
                   .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))
                   .append($("<td " + clase + "align='center' Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important >").html(myObject[i]["Numero_Plaza"]))
                   .append($("<td " + clase + " Width='252px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nombre"]))
                   .append($("<td " + clase + "align='center' Width='60px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["hora_disponible"]))

                   .append($("<td " + clase + " Width='152px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nivel_educativo"]))
                   .append($("<td " + clase + " Width='102px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["cvepue"]))

                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja))
                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja_hasta))


                   .append($("<td Width='50px'>").html('').append($(agregar).html('Agregar'))
                    ));
                }



                $('#gridview_Plazas_Recursos td:nth-child(1)').hide();
                $('#gridview_Plazas_Recursos td:nth-child(2)').hide();
                $("#Load_plaza").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ProcesoConsultar_Recursos_Busqueda() {
        var opcion = $("#Opcion option:selected").val();

        var CentroCosto = "Todos";
        var filtro = $('#txtFiltro_ConsultaPlazasRecursos').val();
        var NivelSalarial = "";
        var desde = "";

        var desde = "";
        var hasta = "";

        var cvpuespu = "";

        var div = $("#gridview_Plazas_Recursos").empty();
        div.append($("<tbody style='height: 150px; overflow-y:scroll; display:block; position:relative;'>"));

        $("#Load_plaza").show();
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_Consulta_CentroCosto',
            contentType: "application/json",


            data: "{'CentroCosto':'" + CentroCosto + "', filtro:'" + filtro + "', NivelSalarial:'" + NivelSalarial + "', desde:'" + desde + "', hasta:'" + hasta + "', opcion:'" + opcion + "', cvpuespu:'" + cvpuespu + "'}",


            dataType: 'json',
            success: function (data) {
                $("#Load_plaza").hide();
                var divEncabezado = $("#gridviewT_ConsultaPlazasRecursos").empty();
                var div = $("#gridview_ConsultaPlazasRecursos").empty();
                divEncabezado.append(
                                        $("<tr>")
                                       .append($("<th align='center' Width='80px'>").html('# PLAZA'))
                                       .append($("<th align='center' Width='250px'>").html('NOMBRE'))
                                       .append($("<th align='center' Width='60px'>").html('HORAS DISPONIBLES'))
                                        .append($("<th align='center' Width='150px'>").html('NIVEL'))
                                        .append($("<th align='center' Width='100px'>").html('PUESTO'))
                                        .append($("<th align='center' Width='80px'>").html('DESDE'))
                                        .append($("<th align='center' Width='80px'>").html('HASTA'))
                                        );
                div.append($("<tbody style='height: 200px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                if (s == "") {
                    alert("No hay información de esta plaza en los efectos seleccionados");
                    return;
                }
                var myObject = eval('(' + s + ')');

                if (opcion == "06") {
                    agregar = "";
                } else {
                    agregar = "<a id='btnAgregar' href='' class='row-Azul' title='Clic para utilizar esta plaza en el nuevo movimiento' >";
                }


                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }
                    var fecha_baja = "";
                    if (myObject[i]["fecha_baja"] == "01/01/9999" || myObject[i]["fecha_baja"] == "") {
                        fecha_baja = "";
                    } else {
                        fecha_baja = myObject[i]["fecha_baja"];
                    }

                    var fecha_baja_hasta = "";
                    if (myObject[i]["fecha_baja_hasta"] == "01/01/9999" || myObject[i]["fecha_baja_hasta"] == "") {
                        fecha_baja_hasta = "";
                    } else {
                        fecha_baja_hasta = myObject[i]["fecha_baja_hasta"];
                    }




                    div.append($("<tr >")
                   .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))
                   .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))
                   .append($("<td " + clase + "align='center' Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important >").html(myObject[i]["Numero_Plaza"]))
                   .append($("<td " + clase + " Width='252px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nombre"]))
                   .append($("<td " + clase + "align='center' Width='60px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["hora_disponible"]))

                   .append($("<td " + clase + " Width='152px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nivel_educativo"]))
                   .append($("<td " + clase + " Width='102px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["cvepue"]))

                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja))
                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja_hasta))


                   .append($("<td Width='50px'>").html('').append($(agregar).html('Agregar'))
                    ));
                }



                $('#gridview_ConsultaPlazasRecursos td:nth-child(1)').hide();
                $('#gridview_ConsultaPlazasRecursos td:nth-child(2)').hide();
                $("#Load_plaza").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }


    function ProcesoUnificar_Recursos_Busqueda() {
        var opcion = $("#Opcion option:selected").val();

        var CentroCosto = "Todos";
        var filtro = $('#txtFiltro_UnificarPlazasRecursos').val();
        var NivelSalarial = "";
        var desde = "";

        var desde = "";
        var hasta = "";

        var cvpuespu = "";

        var div = $("#gridview_Plazas_Recursos").empty();
        div.append($("<tbody style='height: 150px; overflow-y:scroll; display:block; position:relative;'>"));

        $("#Load_plaza").show();
        $.ajax({
            type: "POST",
            async: false,
            url: 'Plazas_Vacantes.aspx/Proceso_Consulta_CentroCosto',
            contentType: "application/json",


            data: "{'CentroCosto':'" + CentroCosto + "', filtro:'" + filtro + "', NivelSalarial:'" + NivelSalarial + "', desde:'" + desde + "', hasta:'" + hasta + "', opcion:'" + opcion + "', cvpuespu:'" + cvpuespu + "'}",


            dataType: 'json',
            success: function (data) {
                $("#Load_plaza").hide();
                var divEncabezado = $("#gridviewT_UnificarPlazasRecursos").empty();
                var div = $("#gridview_UnificarPlazasRecursos").empty();
                divEncabezado.append(
                                        $("<tr>")
                                       .append($("<th align='center' Width='80px'>").html('# PLAZA'))
                                       .append($("<th align='center' Width='250px'>").html('NOMBRE'))
                                       .append($("<th align='center' Width='60px'>").html('HORAS DISPONIBLES'))
                                        .append($("<th align='center' Width='150px'>").html('NIVEL'))
                                        .append($("<th align='center' Width='100px'>").html('PUESTO'))
                                        .append($("<th align='center' Width='80px'>").html('DESDE'))
                                        .append($("<th align='center' Width='80px'>").html('HASTA'))
                                        );
                div.append($("<tbody style='height: 200px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                if (s == "") {
                    alert("No hay información de esta plaza en los efectos seleccionados");
                    return;
                }
                var myObject = eval('(' + s + ')');

                if (opcion == "07") {

                    checado = checado = "";
                }


                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }
                    var fecha_baja = "";
                    if (myObject[i]["fecha_baja"] == "01/01/9999" || myObject[i]["fecha_baja"] == "") {
                        fecha_baja = "";
                    } else {
                        fecha_baja = myObject[i]["fecha_baja"];
                    }

                    var fecha_baja_hasta = "";
                    if (myObject[i]["fecha_baja_hasta"] == "01/01/9999" || myObject[i]["fecha_baja_hasta"] == "") {
                        fecha_baja_hasta = "";
                    } else {
                        fecha_baja_hasta = myObject[i]["fecha_baja_hasta"];
                    }




                    div.append($("<tr >")
                   .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))
                   .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))
                   .append($("<td " + clase + "align='center' Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important >").html(myObject[i]["Numero_Plaza"]))
                   .append($("<td " + clase + " Width='252px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nombre"]))
                   .append($("<td " + clase + "align='center' Width='60px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["hora_disponible"]))

                   .append($("<td " + clase + " Width='152px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nivel_educativo"]))
                   .append($("<td " + clase + " Width='102px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["cvepue"]))

                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja))
                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja_hasta))


                            .append($("<td Width='60px'  align='center'>").html('').append($('<input type="checkbox" id="myTextEditBox" ' + checado + '   >').html('SELECCIONAR'))

                   //.append($("<td Width='50px'>").html('').append($(agregar).html('Agregar'))
                    ));
                }



                $('#gridview_UnificarPlazasRecursos td:nth-child(1)').hide();
                $('#gridview_UnificarPlazasRecursos td:nth-child(2)').hide();
                $("#Load_plaza").hide();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#Load_plaza").hide();
                alert(XMLHttpRequest.responseText);
                alert(errorThrown);


                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var r = jQuery.parseJSON(XMLHttpRequest.responseText);
                    alert("Message: " + r.Message);
                }
                debugger;
            }
        });
    }



    function ConsultaDetallePlazasRecategorizacion() {

        var filtro = $('#txtFiltro_Recursos').val();


        var desde = document.getElementById('placeholderDesdeMultiple').value;
        var hasta = document.getElementById('placeholderHastaMultiple').value;


        if (hasta != "") {
            if (!existeFecha2(hasta)) {
                alert('La fecha hasta es incorrecta');
                document.getElementById('placeholderHastaMultiple').focus();
                return;
            }
        } else {
            hasta = '01/01/9999'
        }
       
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            //data: "{filtro :'" + filtro + "'}",
            data: "{filtro:'" + filtro + "', desde:'" + desde + "', hasta:'" + hasta + "'}",

            url: "Plazas_Vacantes.aspx/Proceso_Consulta_Plaza_Recategorizacion",
            dataType: "json",
            success: function (data) {

                $("#Load_plaza").hide();
                var divEncabezado = $("#gridviewT_Plazas_Recursos").empty();
                var div = $("#gridview_Plazas_Recursos").empty();
                divEncabezado.append(
                                        $("<tr>")
                                       .append($("<th align='center' Width='80px'>").html('# PLAZA'))
                                       .append($("<th align='center' Width='250px'>").html('NOMBRE'))
                                       .append($("<th align='center' Width='60px'>").html('HORAS DISPONIBLES'))
                                        .append($("<th align='center' Width='150px'>").html('NIVEL'))
                                        .append($("<th align='center' Width='100px'>").html('PUESTO'))
                                        .append($("<th align='center' Width='80px'>").html('DESDE'))
                                        .append($("<th align='center' Width='80px'>").html('HASTA'))


                                        //.append($("<th align='center' Width='150px'>").html('MOTIVO'))
                                        );
                div.append($("<tbody style='height: 200px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;

                if (s == "") {
                    alert("No hay información de esta plaza en los efectos seleccionados");
                    return;
                }

                var myObject = eval('(' + s + ')');
                agregar = "<a id='btnAgregar' href='' class='row-Azul' title='Clic para utilizar esta plaza en el nuevo movimiento' >";

                for (i in myObject) {
                    if (myObject[i]["SITUACION"] == "OCUPADA") {
                        clase = " class='row-Verde' ";
                    } else {
                        clase = " class='row-Gris' ";
                    }



                    var fecha_baja = "";
                    if (myObject[i]["fecha_baja"] == "01/01/9999" || myObject[i]["fecha_baja"] == "") {
                        fecha_baja = "";
                    } else {
                        fecha_baja = myObject[i]["fecha_baja"];
                    }

                   
                    var fecha_baja_hasta = "";
                    if (myObject[i]["fecha_baja_hasta"] == "01/01/9999" || myObject[i]["fecha_baja_hasta"] == "") {
                        fecha_baja_hasta = "";
                    } else {
                        fecha_baja_hasta = myObject[i]["fecha_baja_hasta"];
                    }

                   

                    div.append($("<tr >")
                   .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))
                   .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))
                   
                   .append($("<td " + clase + "align='center' Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important >").html(myObject[i]["Numero_Plaza"]))
                   .append($("<td " + clase + " Width='252px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nombre"]))
                   .append($("<td " + clase + "align='center' Width='60px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["hora_disponible"]))

                   .append($("<td " + clase + " Width='152px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["Nivel_educativo"]))
                   .append($("<td " + clase + " Width='102px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(myObject[i]["cvepue"]))

                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja))
                   .append($("<td " + clase + " Width='80px' title='Doble clic para visualizar el historial del movimientos de la plaza' !important  >").html(fecha_baja_hasta))


                   .append($("<td Width='50px'>").html('').append($(agregar).html('Agregar'))
                   
                    ));
                }
                $('#gridview_Plazas_Recursos td:nth-child(1)').hide();
                $('#gridview_Plazas_Recursos td:nth-child(2)').hide();


                $('#gridview_Plazas_Recursos td:nth-child(4)').attr("disabled", true);
                $('#gridview_Plazas_Recursos td:nth-child(5)').attr("disabled", true);
                $('#gridview_Plazas_Recursos td:nth-child(6)').attr("disabled", true);
                $('#gridview_Plazas_Recursos td:nth-child(7)').attr("disabled", true);
                $('#gridview_Plazas_Recursos td:nth-child(7)').attr("disabled", true);
                
                $("#Load_plaza").hide();


                //var divEncabezado = $("#gridviewT_Plazas_Compactacion").empty();
                //divEncabezado.append(
                //$("<tr>")
                //.append($("<th align='center' Width='63px'>").html('# PLAZA'))
                //.append($("<th align='center' Width='290px'>").html('NOMBRE'))
                //.append($("<th align='center' Width='68px'>").html('PUESTO'))
                //.append($("<th align='center' Width='40px'>").html('HORAS'))

                //);

                //var div = $("#gridview_Plazas_Compactacion").empty();
                //var s = data.d;



                //if (s == "") {
                //    alert("No hay informacion de esta plaza para compactar");
                //    return;
                //}

                //checado = "checked='checked')";

                //var myObject = eval('(' + s + ')');
                //for (i in myObject) {

                //    document.getElementById('txtHoraJornada_Compactacion').value = Number($('#txtHoraJornada_Compactacion').val()) + Number(myObject[i]["hrspla"]);


                //    var fecha = "";
                //    var clase = " class='row-gris' ";
                //    div.append($("<tr >")

                //    .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))//1
                //    .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))//2

                //    .append($("<td  align='center' " + clase + " Width='66px'>").html(myObject[i]["numplaza"]))
                //    .append($("<td " + clase + " Width='292px'>").html(myObject[i]["nomcompl"]))
                //    .append($("<td  align='center' " + clase + " Width='69px'>").html(myObject[i]["cvepue"]))
                //    .append($("<td  align='center' " + clase + " Width='49px'>").html(myObject[i]["hrspla"]))
                //    .append($("<td Width='20px'>").html('').append($('<input type="checkbox" id="myTextEditBox" ' + checado + '   >').html('SELECCIONAR')))


                //    .append($("<td >").html(myObject[i]["cvenivpl"]))//8                    
                //    .append($("<td >").html(myObject[i]["cveRecurso_Ocupado"]))//9


                //    );
                //    $('#gridview_Plazas_Compactacion td:nth-child(1)').hide();
                //    $('#gridview_Plazas_Compactacion td:nth-child(2)').hide();
                //    $('#gridview_Plazas_Compactacion td:nth-child(8)').hide();
                //    $('#gridview_Plazas_Compactacion td:nth-child(9)').hide();


                //}
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });


    }


    function ConsultaDetallePlazasCompactacion(numplaza) {
        var div = $("#gridview_Plazas_Recursos").empty();
        div.append($("<tbody style='height: 150px; overflow-y:scroll; display:block; position:relative;'>"));

        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{numplaza :'" + numplaza + "'}",

            url: "Plazas_Vacantes.aspx/Proceso_Consulta_Plaza_Compactacion",
            dataType: "json",
            success: function (data) {
                var divEncabezado = $("#gridviewT_Plazas_Compactacion").empty();
                divEncabezado.append(
                $("<tr>")
                .append($("<th align='center' Width='63px'>").html('# PLAZA'))
                .append($("<th align='center' Width='290px'>").html('NOMBRE'))
                .append($("<th align='center' Width='68px'>").html('PUESTO'))
                .append($("<th align='center' Width='40px'>").html('HORAS'))

                );

                var div = $("#gridview_Plazas_Compactacion").empty();
                var s = data.d;



                if (s == "") {
                    alert("No hay informacion de esta plaza para compactar");
                    return;
                }

                checado = "checked='checked')";

                var myObject = eval('(' + s + ')');
                for (i in myObject) {

                    document.getElementById('txtHoraJornada_Compactacion').value = Number($('#txtHoraJornada_Compactacion').val()) + Number(myObject[i]["hrspla"]);


                    var fecha = "";
                    var clase = " class='row-gris' ";
                    div.append($("<tr >")

                    .append($("<td >").html(myObject[i]["cveRecurso_Vacante"]))//1
                    .append($("<td >").html(myObject[i]["cveNivel_Educativo"]))//2

                    .append($("<td  align='center' " + clase + " Width='66px'>").html(myObject[i]["numplaza"]))
                    .append($("<td " + clase + " Width='292px'>").html(myObject[i]["nomcompl"]))
                    .append($("<td  align='center' " + clase + " Width='69px'>").html(myObject[i]["cvepue"]))
                    .append($("<td  align='center' " + clase + " Width='49px'>").html(myObject[i]["hrspla"]))
                    .append($("<td Width='20px'>").html('').append($('<input type="checkbox" id="myTextEditBox" ' + checado + '   >').html('SELECCIONAR')))


                    .append($("<td >").html(myObject[i]["cvenivpl"]))//8                    
                    .append($("<td >").html(myObject[i]["cveRecurso_Ocupado"]))//9


                    );
                    $('#gridview_Plazas_Compactacion td:nth-child(1)').hide();
                    $('#gridview_Plazas_Compactacion td:nth-child(2)').hide();
                    $('#gridview_Plazas_Compactacion td:nth-child(8)').hide();
                    $('#gridview_Plazas_Compactacion td:nth-child(9)').hide();


                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });


    }




    function Proceso_Consulta_Plaza(numplaza) {

        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{numplaza :'" + numplaza + "'}",

            url: "Plazas_Vacantes.aspx/Proceso_Consulta_Plaza",
            dataType: "json",
            success: function (data) {

                var s = data.d;

                if (s == "") {
                    alert("No hay información de esta plaza");
                    return;
                }

                $(data.d).each(function (index, item) {
                    if (item.respuesta) {
                        var myObject = eval('(' + item.mensaje + ')');
                        document.getElementById('txtNombre_Compactacion').value = myObject[0]["nomcompl"];
                        document.getElementById('txtHoraJornada_Compactacion').value = myObject[0]["hrspla"];

                        document.getElementById('txtPuesto_Compactacion').value = myObject[0]["cvepue"];
                        document.getElementById('txtPuestoDescripcion_Compactacion').value = myObject[0]["deshorjorpu"];
                        document.getElementById('HiddenField_cvepuesto_equivalencia_compactacion').value = myObject[0]["cvepuesto_equivalencia"];
                        document.getElementById('HiddenField_codnivpu_compactacion').value = myObject[0]["cvenivpl"];





                        document.getElementById("placeholderBaja_Compactacion").focus();
                        ConsultaDetallePlazasCompactacion(numplaza);
                    } else {
                        alert(item.mensaje);
                        return;
                    }
                });



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }


    function Proceso_Consulta_Plaza_Descompactacion(numplaza) {

        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{numplaza :'" + numplaza + "'}",

            url: "Plazas_Vacantes.aspx/Proceso_Consulta_Plaza",
            dataType: "json",
            success: function (data) {

                var s = data.d;

                if (s == "") {
                    alert("No hay información de esta plaza");
                    return;
                }

                $(data.d).each(function (index, item) {


                    if (item.respuesta) {
                        var myObject = eval('(' + item.mensaje + ')');
                        document.getElementById('txtNombre_Descompactacion').value = myObject[0]["nomcompl"];
                        document.getElementById('txtHoraJornada_Descompactacion').value = myObject[0]["hrspla"];


                        $('#txtPuesto_Descompactacion').val(myObject[0]["cvepue"]);
                        $('#txtPuestoDescripcion_Descompactacion').val(myObject[0]["deshorjorpu"]);




                        document.getElementById('HiddenField_cveRecurso_Vacante').value = myObject[0]["cveRecurso_Vacante"];

                        document.getElementById('HiddenField_codnivpu_descompactacion').value = myObject[0]["cvenivpl"];
                        document.getElementById('HiddenField_cvepuesto_equivalencia_descompactacion').value = myObject[0]["cvepuesto_equivalencia"];



                        //  $('#HiddenField_cvepuesto_equivalencia_Descompactacion').val(myObject[0]["cvepuesto_equivalencia"]);
                        //$('#HiddenField_codnivpu_Descompactacion').val(myObject[0]["cvenivpl"]);

                        //$('#HiddenField_codnivpu_Descompactacion').attr('value', myObject[0]["cvenivpl"]);

                        //var test = $("input[name=HiddenField_codnivpu_Descompactacion]:hidden");
                        //test.value = myObject[0]["cvenivpl"];

                        //var test2 = $("input[name=HiddenField_codnivpu_Descompactacion]:hidden");

                        //$('#HiddenField_codnivpu_descompactacion').attr('value', myObject[0]["cvenivpl"]);






                        $('#HiddenField_Horas_Plaza_Descompactacion').val(myObject[0]["hrspla"]);






                        document.getElementById("placeholderBaja_Descompactacion").focus();
                        //ConsultaDetallePlazasDescompactacion(numplaza);
                    } else {
                        alert(item.mensaje);
                        return;
                    }
                });



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoGuardar_Compactacion(obj, tipo) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_OcupadoEntity: obj }),
            url: "Plazas_Vacantes.aspx/Proceso_Guardar",
            dataType: "json",
            success: function (data) {

                if (data.d == "") {
                    alert('El proceso de guardado no se pudo realizar');
                    return false;
                }
                if (tipo == 3) {
                    $('#txtFolioMovimientoCompactacion').val(data.d);
                }
                if (tipo == 4) {
                    $('#txtFolioMovimientoDescompactacion').val(data.d);
                }
                alert("Movimiento realizado con éxito");
                return false;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }




    function ProcesoGuardar(obj) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_OcupadoEntity: obj }),
            url: "Plazas_Vacantes.aspx/Proceso_Guardar",
            dataType: "json",
            success: function (data) {

                if (data.d == "") {
                    alert('El proceso de guardado no se pudo realizar');
                    return false;
                }
                LimpiarMovimiento();
                $('#txtFolioMovimiento').val(data.d);

                alert("Movimiento realizado con éxito");
                $('#txtNombre').val('');
                $('#txtHoraJornada').val('');
                $('#placeholderDesde').val('');
                $('#placeholderHasta').val('');



                ConsultaMovimiento(data.d);
                $('#HiddenField_cveRecurso_Ocupado').val('');
                return false;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoEliminar(FolioMovimiento) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{'FolioMovimiento':'" + FolioMovimiento + "'}",
            url: "Plazas_Vacantes.aspx/Proceso_EliminarMovimiento",
            dataType: "json",
            success: function (data) {

                if (data.d == "") {
                    alert('El proceso de eliminado no se pudo realizar');
                    return false;
                }
                $("#txtFolioMovimiento_Vacante").val(data.d);

                alert("Registro cancelado con éxito ");
                return false;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoGuardar_Vacante(obj) {
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ Recurso_VacanteEntity: obj }),
            url: "Plazas_Vacantes.aspx/Proceso_Guardar_Vacante",
            dataType: "json",
            success: function (data) {

                if (data.d == "") {
                    alert('El proceso de guardado no se pudo realizar');
                    return false;
                }
                $("#txtFolioMovimiento_Vacante").val(data.d);

                alert("Registro almacenado con éxito ");
                return false;
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoCargarNivelSalarial(cvezon, codnivpu) {
        $("#ddlNivelSalarial").get(0).options.length = 0;
        $.ajax({
            type: "POST",
            async: false,
            contentType: "application/json",
            data: "{'cvezon':'" + cvezon + "', codnivpu:'" + codnivpu + "'}",
            url: "Plazas_Vacantes.aspx/sp_cat_nivsal_select",
            dataType: "json",
            success: function (data) {
                var s = data.d;
                if (s == "") {
                    alert("No hay información de nivel salarial");
                    return;
                } else {
                    var myObject = eval('(' + s + ')');

                    for (i in myObject) {
                        $("#ddlNivelSalarial").get(0).options[$("#ddlNivelSalarial  ").get(0).options.length] = new Option(myObject[i]["cvenisni"], myObject[i]["cveniv"]);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function Cambia_Puesto() {
        var PUESTO = $('#ddlPuesto :selected').text();
        if (PUESTO.indexOf("HORAS") > -1) {

            document.getElementById("lblHoraJornada_Vacante").style.visibility = "visible";
            document.getElementById("txtHoraJornada_Vacante").style.visibility = "visible";
        }
        if (PUESTO.indexOf("JORNADA") > -1) {
            document.getElementById("lblHoraJornada_Vacante").style.visibility = "hidden";
            document.getElementById("txtHoraJornada_Vacante").style.visibility = "hidden";
            $('#txtHoraJornada_Vacante').val('');

        }
    }

    function Cambia_Puesto_Vacante() {
        var PUESTO = document.getElementById('txtPuestoDescripcion_Pop_Vacante').value;
        if (PUESTO.indexOf("HORAS") > -1) {
            document.getElementById("lblHoraJornada_Pop_Vacante").style.visibility = "visible";
            document.getElementById("txtHoraJornada_Pop_Vacante").style.visibility = "visible";
        }
        if (PUESTO.indexOf("JORNADA") > -1) {
            document.getElementById("lblHoraJornada_Pop_Vacante").style.visibility = "hidden";
            document.getElementById("txtHoraJornada_Pop_Vacante").style.visibility = "hidden";

            $('#txtHoraJornada_Pop_Vacante').val('');
        }
    }

    function Cambia_Puesto_Multiple() {
        var codnivpu = '';
        var PUESTO = document.getElementById('txtPuestoDescripcion_Pop').value;
        if (PUESTO.indexOf("HORAS") > -1) {
            document.getElementById("lblHoraJornada_Pop").style.visibility = "visible";
            document.getElementById("txtHoraJornada_Pop").style.visibility = "visible";
            document.getElementById("txtHoraJornada_Pop").focus();
        }
        if (PUESTO.indexOf("JORNADA") > -1) {
            document.getElementById("lblHoraJornada_Pop").style.visibility = "hidden";
            document.getElementById("txtHoraJornada_Pop").style.visibility = "hidden";
            $('#txtHoraJornada_Pop').val('');
        }
    }

    document.onkeypress = stopRKey;

    $(document).ready(function () {

        $.get('ajax.html', function (data) {
            modal.open({ content: data });
        });

        LlenarCentroCosto();

        $('#Div_input').show();
        $('#Div_Button').hide();

        //$("#gridview_Plazas_Compactacion tbody tr input[type=checkbox]").live('click', function () {

        //    var value = $(this).val();
        //        var id = $(this).attr("id");
        //        $("#gridview_Plazas_Compactacion  input[type=checkbox]").each(function () {
        //            if ($(this).val() == value && $(this).attr("id") != id) {
        //                alert('suma');
        //                $(this).removeAttr("checked");
        //            }
        //        });
        //});

        $('#gridview_Plazas_Compactacion tbody tr').find('input:checkbox').live('change', function () {
            if ($(this).is(':checked')) {
             
                $('#txtHoraJornada_Compactacion').val( Number($('#txtHoraJornada_Compactacion').val()) + Number($(this).parent().parent()[0].childNodes[5].innerText));
            } else {
                 $('#txtHoraJornada_Compactacion').val(Number($('#txtHoraJornada_Compactacion').val()) - Number($(this).parent().parent()[0].childNodes[5].innerText));
            }
        });


        //$("#gridview_Plazas_Compactacion input[type=checkbox]").click(function () {
        //    alert('entra');
        //    var value = $(this).val();
        //    var id = $(this).attr("id");
        //    $(".gridview_Plazas_Compactacion input[type=checkbox]").each(function () {
        //        if ($(this).val() == value && $(this).attr("id") != id) {
        //            alert('suma');
        //            $(this).removeAttr("checked");
        //        }
        //    });
        //});


        $('#txtPlaza_Compactacion').keyup(function (e) {
            if (e.keyCode == 13) {
                var numplaza = document.getElementById('txtPlaza_Compactacion').value;
                Proceso_Consulta_Plaza(numplaza);
            }
        });



        $('#txtPlaza_Descompactacion').keyup(function (e) {
            if (e.keyCode == 13) {
                var numplaza = document.getElementById('txtPlaza_Descompactacion').value;
                Proceso_Consulta_Plaza_Descompactacion(numplaza);
            }
        });




        $('#txtNombreMultiple').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtFiltro').keyup(function (e) {

            if (e.keyCode == 13) { ProcesoConsultar(); }
        });

        $('#txtFiltro_Recursos').keyup(function (e) {


            if (e.keyCode == 13) {

                if ($("#Opcion option:selected").val() == "05") {

                    ConsultaDetallePlazasRecategorizacion();
                } else {
                    ProcesoConsultar_Recursos();
                }

            }
        });

        $('#txtFiltro_ConsultaPlazasRecursos').keyup(function (e) {
            if (e.keyCode == 13) {
                var txtFiltro_ConsultaPlazasRecursos = document.getElementById('txtFiltro_ConsultaPlazasRecursos').value;
                if (txtFiltro_ConsultaPlazasRecursos != "") {
                    ProcesoConsultar_Recursos_Busqueda();
                } else {
                    alert('Debe proporcionar un criterio de búsqueda');

                }
            }

        });


        $('#txtFiltro_UnificarPlazasRecursos').keyup(function (e) {
            var txtFiltro_UnificarPlazasRecursos = document.getElementById('txtFiltro_UnificarPlazasRecursos').value;
            if (e.keyCode == 13) {
                if (txtFiltro_UnificarPlazasRecursos != "") {
                    ProcesoUnificar_Recursos_Busqueda();
                } else {
                    alert('Debe proporcionar un criterio de búsqueda');

                }
            }
        });








        $('#placeholderBaja_Compactacion').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) {
                var desde = document.getElementById('placeholderBaja_Compactacion').value;

                if (!existeFecha2(desde)) {
                    alert('La fecha de compactacion es incorrecta');
                    document.getElementById('placeholderBaja_Compactacion').focus();
                    return;
                }
                $('[tabindex=' + tabindex + ']').focus();
            }

        });

        $('#placeholderDesdeMultiple_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) {
                var desde = document.getElementById('placeholderDesdeMultiple_Vacante').value;

                if (!existeFecha2(desde)) {
                    alert('La fecha de la creacion del recurso es incorrecta');
                    document.getElementById('placeholderDesdeMultiple_Vacante').focus();
                    return;
                }
                $('[tabindex=' + tabindex + ']').focus();
            }

        });



        $('#placeholderBaja_Descompactacion').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) {
                var desde = document.getElementById('placeholderBaja_Descompactacion').value;

                if (!existeFecha2(desde)) {
                    alert('La fecha de descompactacion es incorrecta');
                    document.getElementById('placeholderBaja_Descompactacion').focus();
                    return;
                }
                $('[tabindex=' + tabindex + ']').focus();
            }

        });


        $('#placeholderDesdeMultiple').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) {
                var desde = document.getElementById('placeholderDesdeMultiple').value;

                if (!existeFecha2(desde)) {
                    alert('La fecha desde es incorrecta');
                    document.getElementById('placeholderDesdeMultiple').focus();
                    return;
                }
                $('[tabindex=' + tabindex + ']').focus();
            }

        });
        $('#placeholderHastaMultiple').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) {
                var hasta = document.getElementById('placeholderHastaMultiple').value;

                if (hasta != "") {
                    if (!existeFecha2(hasta)) {
                        alert('La fecha hasta es incorrecta');
                        document.getElementById('placeholderHastaMultiple').focus();
                        return;
                    }
                } else {
                    hasta = '01/01/9999'
                }
                $('[tabindex=' + tabindex + ']').focus();
            }
        });
        $('#txtGrupoNominal').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });


        $('#ddlCentroCosto').change(function (e) {

            var tabindex = $(this).attr('tabindex');
            tabindex++;
            $('[tabindex=' + tabindex + ']').focus();
        });

        $('#Opcion').change(function (e) {

            if ($("#Opcion option:selected").val() == "08") {
                $('#Div_input').hide();
                $('#Div_Button').show();
            }
            else {
                $('#Div_input').show();
                $('#Div_Button').hide();
            }







        });

        $('#txtNombre_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtGrupoNominal_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtPuesto_Pop_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtHoraJornada_Pop_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtObservacion_Vacante').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtHoraJornada_Pop').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
            else
            {
                this.value = (this.value + '').replace(/[^0-9]/g, '');
            }
        });

        $('#txtObservacionMultiple').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });

        $('#txtFolioMovimiento').keyup(function (e) {
            if (e.keyCode == 13) {
                var Movimiento = document.getElementById('txtFolioMovimiento').value;
                if (Movimiento != '') {


                    ConsultaMovimiento(Movimiento);
                }
            }
        });

        $('#txtFolioMovimientoCompactacion').keyup(function (e) {
            if (e.keyCode == 13) {
                var Movimiento = document.getElementById('txtFolioMovimientoCompactacion').value;
                if (Movimiento != '') {
                    ConsultaMovimientoCompactacion(Movimiento);
                }
            }
        });

        $('#txtFolioMovimientoDescompactacion').keyup(function (e) {
            if (e.keyCode == 13) {
                var Movimiento = document.getElementById('txtFolioMovimientoDescompactacion').value;
                if (Movimiento != '') {
                    ConsultaMovimientoDescompactacion(Movimiento);
                }
            }
        });





        $('#txtFolioMovimiento_Vacante').keyup(function (e) {
            if (e.keyCode == 13) {
                var Movimiento = document.getElementById('txtFolioMovimiento_Vacante').value;
                if (Movimiento != '') {

                    $("#txtFolioMovimiento_Vacante").prop("disabled", true);
                    $("#txtNombreMultiple_Vacante").val('');
                    ConsultaMovimiento_Vacante(Movimiento);
                }
            }
        });

        $('#txtGrupoNominal').keyup(function (e) {
            if (e.keyCode == 13) {
                var GrupoNominal = document.getElementById('txtGrupoNominal').value;
                if (GrupoNominal != '') {
                    $("#txtGrupoNominalDescripcion").val('');
                    ConsultaGrupoNominal(GrupoNominal);
                    $("#txtPuesto_Pop").prop("disabled", false);
                    var tabindex = $(this).attr('tabindex');
                    tabindex++;
                    $('[tabindex=' + tabindex + ']').focus();
                }
            }
        });


        $('#txtNumeroEmpleado').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });


        $('#txtNumeroEmpleado').keyup(function (e) {
            if (e.keyCode == 13) {
                var NumeroEmpleado = document.getElementById('txtNumeroEmpleado').value;
                if (NumeroEmpleado != '') {
                    $("#txtNombreMultiple").val('');
                    ConsultaEmpleado(NumeroEmpleado);
                    //$("#txtPuesto_Pop").prop("disabled", false);
                    //var tabindex = $(this).attr('tabindex');
                    //tabindex++;
                    //$('[tabindex=' + tabindex + ']').focus();
                }
            }
        });



        $('#txtFolioDocumentoCIT').keyup(function (e) {
            var tabindex = $(this).attr('tabindex');
            tabindex++;
            if (e.keyCode == 13) { $('[tabindex=' + tabindex + ']').focus(); }
        });


        $('#txtFolioDocumentoCIT').keyup(function (e) {
            if (e.keyCode == 13) {
                var FolioDocumento = document.getElementById('txtFolioDocumentoCIT').value;
                if (txtFolioDocumentoCIT != '') {

                    ConsultaFolioDocumentoCIT(FolioDocumento);

                    //var tabindex = $(this).attr('tabindex');
                    //tabindex++;
                    //$('[tabindex=' + tabindex + ']').focus();
                }
            }
        });



        $('#txtPuesto_Pop').keyup(function (e) {

            if (e.keyCode == 13) {
                var Puesto = document.getElementById('txtPuesto_Pop').value;
                if (Puesto != '') {
                    $("#txtPuestoDescripcionPop").val('');
                    ConsultaPuesto(Puesto);
                }
            }
        });

        $('#txtGrupoNominal_Vacante').keyup(function (e) {
            if (e.keyCode == 13) {
                var GrupoNominal = document.getElementById('txtGrupoNominal_Vacante').value;
                if (GrupoNominal != '') {
                    $("#txtGrupoNominalDescripcion_Vacante").val('');
                    ConsultaGrupoNominal_Vacante(GrupoNominal);

                    $("#txtPuesto_Pop_Vacante").prop("disabled", false);

                }
            }
        });

        $('#txtPuesto_Pop_Vacante').keyup(function (e) {
            if (e.keyCode == 13) {
                var Puesto = document.getElementById('txtPuesto_Pop_Vacante').value;
                if (Puesto != '') {
                    $("#txtPuestoDescripcionPop_Vacante").val('');
                    ConsultaPuesto_Vacante(Puesto);
                }
            }
        });

        $('.solo-numero').keyup(function () {
            this.value = (this.value + '').replace(/[^0-9]/g, '');
        });

        $(".horas_asignadas").live('keyup', function (e) {
            this.value = (this.value + '').replace(/[^0-9]/g, '');
        });

        $(function ($) {
            $('#placeholderDesdeMultiple').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderHastaMultiple').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderDesde').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderHasta').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderBaja_Vacante').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderBaja_Compactacion').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderBaja_Descompactacion').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });
            $('#placeholderDesdeMultiple_Vacante').mask('00/00/0000', { 'translation': { 0: { pattern: /[0-9*]/ } } });


        });

        $("#ddlPuesto").change(function () {
            Cambia_Puesto();
        });

        $("#btnAgregarMovimiento").click(function () {
            $('#lblTituloMovimientos').text("Agregar Movimiento");
            dialogMovimiento.dialog("open");
            return false;
        });



        $("#btnAgregarVacante").click(function () {
            $('#Div_Movimiento').hide();
            LimpiarMovimiento();

            LimpiarDialog();

            if ($("#Opcion option:selected").val() == "01") {
                $('#lblTituloAgregarMultiple').text("Agregar Movimiento");
                AgregarMovimiento();
            }

            if ($("#Opcion option:selected").val() == "02") {
                AgregarNuevoMovimiento();
            }

            if ($("#Opcion option:selected").val() == "03") {
                CompactarRecurso();
            }

            if ($("#Opcion option:selected").val() == "04") {
                DescompactarRecurso();
            }
            if ($("#Opcion option:selected").val() == "05") {
                $('#lblTituloAgregarMultiple').text("Recategorizacion de Recurso");
                $("#placeholderHastaMultiple").prop("disabled", true);
                AgregarMovimiento();
            }
            if ($("#Opcion option:selected").val() == "06") {
                consultarRecurso();
            }

            if ($("#Opcion option:selected").val() == "07") {
                $("#UnificarIncidencias").prop("disabled", false);
                $("#gridview_UnificarPlazasRecursos").prop("disabled", false);
                UnificarRecurso();
            }

            //if ($("#Opcion option:selected").val() == "08") {
              
                

            //    UnificarRecurso();
            //}
            return false;
        });

        $("#btnBuscar_Recurso").click(function () {


            //dialogAgregaPlazas.hide();
            //dialogPlazas_Descompactacion.hide();
            //dialogPlazas.hide();
            //dialogAgregaPlazas.hide();
            //dialogVacante.hide();
            //dialogPlazas_Recursos.hide();
            //modal.close();

            //method.close();

            //method.close(); 

            //ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable
            //$(".ui-dialog").dialog('close');
            //$(".ui-dialog").dialog('open');

            $("#txtFiltro_Recursos").val('');
            var div = $("#gridview_Plazas_Recursos").empty();
            div.append($("<tbody style='height: 200px; display:block; position:relative;'>"));
            $('select option[value="0"]').attr("selected", true);
            dialogPlazas_Recursos.dialog("open");


            //dialogPlazas_Recursos.show();
            //modal.open({ content: dialogPlazas_Recursos });


            return false;
        });

        $("#btnNuevoMovimiento").click(function () {
            $('#Div_Movimiento').show();
            NuevoMovimiento();
        });

        $("#btnLimpiarMovimiento").click(function () {
            LimpiarMovimiento();
        });

        $("#btnLimpiarMovimiento_Pop_Vacante").click(function () {
            LimpiarMovimiento_Pop();
        });

        $("#btnLimpiarMovimiento_Pop_Compactacion").click(function () {
            LimpiarMovimiento_Pop_Compactacion();
        });

        $("#btnLimpiarMovimiento_Pop_Descompactacion").click(function () {
            LimpiarMovimiento_Pop_Descompactacion();
        });

        $("#btnNuevoMovimiento_Vacante").click(function () {
            NuevoMovimiento_Pop();
        });
        $("#btnNuevoMovimientoCompactacion").click(function () {
            NuevoMovimiento_Compactacion();
        });
        $("#btnNuevoMovimientoDescompactacion").click(function () {
            NuevoMovimiento_Descompactacion();
        });

        $("#btnNuevoMovimientoRecategorizacion").click(function () {
            NuevoMovimiento_Recategorizacion();
        });


        $("#btnRegresar").click(function () {
            modal.close();
        });

        $("#btnRegresar_Compactacion").click(function () {
            modal.close();
        });


        $("#btnRegresar_Descompactacion").click(function () {
            modal.close();
        });

        $("#btnRegresar_Vacante").click(function () {
            modal.close();
        });
        $("#Regresar_Busqueda").click(function () {
            modal.close();
        });
        $("#UnificarRegresar_Busqueda").click(function () {
            modal.close();
        });



        $("#UnificarIncidencias").click(function () {
            var JSONObject = new Array();
            var contadorElementos = 0;
            var contadorPlazas = 0;
            var contadorNombre = 0;
            var contadorHora_disponible = 0;
            var contadorcvepue = 0;
            var plaza = '';
            var Nombre = '';
            var hora_disponible = '';
            var cvepue = '';

            $("#gridview_UnificarPlazasRecursos tbody tr").each(function (index) {
                var nTds = $('td', this);
                var cb = $(this).find("input[type=checkbox]");
                if (cb.is(':checked')) {
                    contadorElementos++;
                    if (plaza != $(nTds[2]).text()) {
                        plaza = $(nTds[2]).text();
                        contadorPlazas++;
                    }
                    if (Nombre != $(nTds[3]).text()) {
                        Nombre = $(nTds[3]).text();
                        contadorNombre++;
                    }
                    if (hora_disponible != $(nTds[4]).text()) {
                        hora_disponible = $(nTds[4]).text();
                        contadorHora_disponible++;
                    }
                    if (cvepue != $(nTds[6]).text()) {
                        cvepue = $(nTds[6]).text();
                        contadorcvepue++;
                    }
                }
            })
            if (contadorElementos <= 1) {
                alert("Debe seleccionar al menos dos incidencias");
                return;
            }
            if (contadorPlazas > 1) {
                alert("Las incidencias a unificar deben pertenecer a la misma plaza");
                return;
            }
            if (contadorNombre > 1) {
                alert("Las incidencias a unificar deben pertenecer al mismo empleado");
                return;
            }
            if (contadorHora_disponible > 1) {
                alert("Las incidencias a unificar deben tener el mismo numero de horas");
                return;
            }
            if (contadorcvepue > 1) {
                alert("Las incidencias a unificar deben tener la misma clave de puesto");
                return;
            }

            $("#gridview_UnificarPlazasRecursos tbody tr").each(function (index) {
                var nTds = $('td', this);
                var cb = $(this).find("input[type=checkbox]");
                if (cb.is(':checked')) {
                    var nTds = $('td', this);
                    var obj = new Object();
                    obj.cveRecurso_Vacante = $(nTds[0]).text();
                    obj.cveNivel_Educativo = $(nTds[1]).text();
                    obj.Numero_Plaza = $(nTds[2]).text();
                    obj.Nombre = $(nTds[3]).text();
                    obj.hora_disponible = $(nTds[4]).text();
                    obj.Nivel_educativo = $(nTds[5]).text();
                    obj.cvepue = $(nTds[6]).text();
                    obj.fecha_baja = $(nTds[7]).text();
                    obj.fecha_baja_hasta = $(nTds[8]).text();
                    JSONObject.push(obj);
                }
            })

            UnificarGuardar(JSONObject);

        });


        function UnificarGuardar(obj) {
            $.ajax({
                type: "POST",
                async: false,
                contentType: "application/json",
                data: JSON.stringify({ Recurso_VacantedoEntity: obj }),
                url: "Plazas_Vacantes.aspx/UnificarGuardar",
                dataType: "json",
                success: function (data) {
                    $(data.d).each(function (index, item) {
                        if (item.respuesta) {
                            alert("Movimiento realizado con éxito");

                            var txtFiltro_UnificarPlazasRecursos = document.getElementById('txtFiltro_UnificarPlazasRecursos').value;
                            ProcesoUnificar_Recursos_Busqueda();
                                
                            $("#UnificarIncidencias").prop("disabled", true);
                            $("#gridview_UnificarPlazasRecursos").prop("disabled", true);

                        } else {
                            alert(item.mensaje);
                            return;
                        }
                    });
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    if (XMLHttpRequest.status == 401) {
                        alert('Su sesión ha expirado');
                        location.href = 'login.aspx';
                    } else {
                        var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                        alert($(responseTitle).text());
                    }
                    debugger;
                }
            });
        }




        $("#btnCosto").click(function () {
            var JSONObject = new Array();
            var PuestoMovimiento;
            var hiddenId;
            var cveNivel_Educativo;
            var clave;
            var nombre;
            var horas_totales;
            var horas_asignar;
            var cvenivpl;
            var horas_asignar_oculto;

            var JSONObject1 = new Array();

            var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Pop').value;
            if (parseInt(HoraJornada_ocupado) > 42) {
                alert('No puede asignar mas de 42 hras al nuevo movimiento ');
                document.getElementById('txtHoraJornada_Pop').focus();
                return false;
            }

            if (ValidaHoras()) {
                $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
                    var nTds = $('td', this);
                    $('#HiddenField_puesto').attr('value', PuestoMovimiento);
                    $('#HiddenField_cveRecurso_Vacante').attr('value', hiddenId);
                    $('#HiddenField_cveNivel_Educativo').attr('value', cveNivel_Educativo);
                    $('#HiddenField_cvenivpl').attr('value', cvenivpl);
                    $("#ddlNivelSalarial").prop("disabled", true);
                    //***************************************************
                    var desde = document.getElementById('placeholderDesdeMultiple').value;
                    var hasta = document.getElementById('placeholderHastaMultiple').value;

                    var Nombre = document.getElementById('txtNombreMultiple').value;

                    var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Pop').value;
                    var HoraJornada_vacante = $(this).find(".horas_asignadas").val();

                    var cveNivel_Educativo = $(nTds[1]).text();
                    var cveRecurso_Vacante = $(nTds[0]).text();
                    var cveRecurso_Ocupado = document.getElementById('HiddenField_cveRecurso_Ocupado').value;
                    var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
                    var cvezon = document.getElementById('txtGrupoNominal').value;
                    var HiddenField_cvenivpl = document.getElementById('HiddenField_cvenivpl').value;

                    if ($('#txtGrupoNominal').val() == '0') {
                        alert("Dede proporcionar un grupo nominal")
                        document.getElementById('txtGrupoNominal').focus();
                        return;
                    }
                    if ($("#txtlPuesto_Pop").val() == '') {
                        alert('Debe seleccionar un puesto');
                        document.getElementById('ddlPuesto_Pop').focus();
                        return;
                    }

                    if ($("#ddlNivelSalarial").val() == '0') {
                        alert('Debe seleccionar un nivel salarial');
                        document.getElementById('ddlNivelSalarial').focus();
                        return;
                    }

                    if ($("#HiddenField_cvepuesto_equivalencia").val() == '0') {
                        alert('Debe selecccionar un puesto');
                        document.getElementById('ddlPuesto_Pop').focus();
                        return;
                    }

                    if ($("#HiddenField_cvepuesto_equivalencia").val() != '0') {

                        var codnivpu = '';
                        var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo').value;
                        var clave = $('#HiddenField_puesto').val();

                        var PUESTO = $('#txtPuestoDescripcion_Pop').val();
                        if (PUESTO == "HORAS") {
                            if (HoraJornada_ocupado.length <= 0) {
                                alert('Debe proporcionar las horas del movimiento');
                                document.getElementById('txtHoraJornada_Pop').focus();
                                return;
                            }
                            if (HoraJornada_vacante == "" || HoraJornada_vacante == "0" || HoraJornada_vacante == "00") {
                                alert('Debe proporcionar el numero de horas');
                                document.getElementById('txtHoraJornadaMultiple').focus();
                                return;
                            }
                        }

                        if (!existeFecha2(desde)) {
                            alert('La fecha desde es incorrecta');
                            document.getElementById('placeholderDesde').focus();
                            return;
                        }
                        if (hasta != "") {
                            if (!existeFecha2(hasta)) {
                                alert('La fecha hasta es incorrecta');
                                document.getElementById('placeholderHasta').focus();
                                return;
                            }
                        } else {
                            hasta = '01/01/9999'
                        }


                        if (compare_dates(desde, hasta)) {
                            alert('La fecha de inicio no puede ser mayor que la fecha fin');
                            document.getElementById('placeholderHastaMultiple').focus();
                            return;
                        }

                        //if (Date.parse(desde) > Date.parse(hasta)) {
                        //    alert('La fecha de inicio puede ser mayor que la fecha fin');
                        //    document.getElementById('placeholderHasta').focus();
                        //    return;
                        //}

                        if (cvezon.length <= 0) {
                            alert('Debe proporcionar un un grupo nominal');
                            document.getElementById('txtGrupoNominal').focus();
                            return;
                        }

                        if ($("#ddlNivelSalarial").val() == '0') {
                            alert('Debe seleccionar un nivel salarial');
                            document.getElementById('ddlNivelSalarial').focus();
                            return;
                        }

                        var fechaD = desde.split("/");
                        var fechaH = hasta.split("/");
                        var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];
                        var hasta_formateada = fechaH[0] + '/' + fechaH[1] + '/' + fechaH[2];

                        var obj = new Object();
                        obj.cveRecurso_Ocupado = cveRecurso_Ocupado;
                        obj.cveRecurso_Vacante = cveRecurso_Vacante;
                        obj.cveNivel_Educativo = cveNivel_Educativo;
                        obj.Nombre = Nombre;
                        obj.cvepuesto_equivalencia_detalle = $("#HiddenField_cvepuesto_equivalencia").val();
                        obj.cveMunicipio = $("#ddlMunicipioMultiple").val();

                        obj.hora_ocupado = HoraJornada_ocupado;
                        obj.hora_vacante = HoraJornada_vacante;

                        obj.FECHA_DESDE = desde_formateada;
                        obj.FECHA_HASTA = hasta_formateada;
                        obj.cveRecurso_Movimiento = cveRecurso_Movimiento;

                        obj.puesto_ocupado = $("#txtPuesto_Pop").val();

                        obj.cvezon = cvezon;
                        obj.codniv = $("#ddlPuesto_Pop").val();

                        obj.cvenisni_vacante = $(nTds[9]).text();
                        obj.cveRecurso_Ocupado = $(nTds[11]).text();

                        obj.cvenisni_ocupado = $("#ddlNivelSalarial").val();
                        JSONObject1.push(obj);
                    }
                });

                if (JSONObject1.length == 0) {
                    alert('El movimiento debe tener al menos un registro');
                    return false;
                } else {
                    Costeo_plazas(JSONObject1);
                }
            }
        });

        $("#btnGuardarDescompactacion").click(function () {
            var JSONObject = new Array();
            var PuestoMovimiento;
            var hiddenId;
            var cveNivel_Educativo;
            var clave;
            var nombre;
            var horas_totales;
            var horas_asignar;
            var cvenivpl;
            var horas_asignar_oculto;
            var JSONObject1 = new Array();
            var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Descompactacion').value;

            var HoraJornada_vacante = document.getElementById('HiddenField_Horas_Plaza_Descompactacion').value;


            if (parseInt(HoraJornada_ocupado) > 42) {
                alert('No puede asignar mas de 42 hras al nuevo movimiento');
                document.getElementById('txtHoraJornada_Descompactacion').focus();
                return false;
            }
            var FolioDocumento = document.getElementById('txtFolioDocumentoCIT_Descompactacion').value;

            if (txtFolioDocumentoCIT != '') {
                var x = ConsultaFolioDocumentoCIT(FolioDocumento);

                if (ConsultaFolioDocumentoCIT) {
                    var desde = document.getElementById('placeholderBaja_Descompactacion').value;
                    var Nombre = document.getElementById('txtNombre_Descompactacion').value;

                    var observacion = "";
                    var cveNivel_Educativo = '';
                    var cveRecurso_Vacante = document.getElementById('HiddenField_cveRecurso_Vacante').value;
                    var cveRecurso_Ocupado = document.getElementById('HiddenField_cveRecurso_Ocupado').value;
                    var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
                    var cvezon = document.getElementById('txtGrupoNominal').value;
                    var FolioDocumentoCIT = document.getElementById('txtFolioDocumentoCIT_Descompactacion').value;
                    var Plaza_Movimiento = document.getElementById('txtPlaza_Descompactacion').value;

                    var codnivpu = document.getElementById('HiddenField_codnivpu_descompactacion').value;

                    var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo').value;
                    var clave = $('#HiddenField_puesto').val();
                    var PUESTO = $('#txtPuestoDescripcion_Descompactacion').val();
                    if (PUESTO == "HORAS") {
                        if (HoraJornada_ocupado.length <= 0) {
                            alert('Debe proporcionar las horas del movimiento');
                            document.getElementById('txtHoraJornada_Descompactacion').focus();
                            return;
                        }
                    }
                    if (!existeFecha2(desde)) {
                        alert('La fecha de la Descompactacion es incorrecta');
                        document.getElementById('placeholderDesde').focus();
                        return;
                    }
                    hasta = '01/01/9999'
                    var fechaD = desde.split("/");
                    var fechaH = hasta.split("/");
                    var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];
                    var hasta_formateada = fechaH[0] + '/' + fechaH[1] + '/' + fechaH[2];

                    var obj = new Object();
                    obj.cveRecurso_Ocupado = cveRecurso_Ocupado;
                    obj.cveRecurso_Vacante = cveRecurso_Vacante;
                    obj.cveNivel_Educativo = cveNivel_Educativo;
                    obj.Nombre = Nombre;
                    obj.cvepuesto_equivalencia_detalle = document.getElementById('HiddenField_cvepuesto_equivalencia_descompactacion').value;

                    obj.OBSERVACIONES = observacion;
                    obj.hora_ocupado = HoraJornada_ocupado;
                    obj.hora_vacante = HoraJornada_vacante;
                    obj.FolioDocumentoCIT = FolioDocumentoCIT;
                    obj.FECHA_DESDE = desde_formateada;
                    obj.FECHA_HASTA = hasta_formateada;
                    obj.cveRecurso_Movimiento = cveRecurso_Movimiento;
                    obj.cvezon = cvezon;
                    obj.codniv = codnivpu;
                    obj.cvenisni_vacante = codnivpu;
                    obj.cveRecurso_Ocupado = '';//$(nTds[8]).text();
                    obj.cvenisni_ocupado = codnivpu;
                    obj.Plaza_Movimiento = Plaza_Movimiento;
                    obj.cveRecurso_Movimiento_tipo = 4; //DesDescompactacion Recurso
                    JSONObject1.push(obj);
                    //    }
                    //});
                    if (JSONObject1.length == 0) {
                        alert('El movimiento debe tener al menos un registro');
                        return false;
                    } else {
                        ProcesoGuardar_Compactacion(JSONObject1, 4);
                    }

                }
            }
            else {
                alert("Dede proporcionar un folio de documento");
                document.getElementById('txtFolioDocumentoCIT_Descompactacion').focus();
                return;
            }
        });


        $("#btnGuardarCompactacion").click(function () {

            var JSONObject = new Array();
            var PuestoMovimiento;
            var hiddenId;
            var cveNivel_Educativo;
            var clave;
            var nombre;
            var horas_totales;
            var horas_asignar;
            var cvenivpl;
            var horas_asignar_oculto;
            var JSONObject1 = new Array();
            var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Compactacion').value;
            if (parseInt(HoraJornada_ocupado) > 42) {
                alert('No puede asignar mas de 42 hras al nuevo movimiento ');
                document.getElementById('txtHoraJornada_Compactacion').focus();
                return false;
            }
            var FolioDocumento = document.getElementById('txtFolioDocumentoCIT_Compactacion').value;
            if (txtFolioDocumentoCIT != '') {
                var x = ConsultaFolioDocumentoCIT(FolioDocumento);
                if (x) {
                    $('#gridview_Plazas_Compactacion tbody tr').find('input:checkbox').each(function (index) {
                        if ($(this).is(':checked')) {
                            var nTds = $('td', $(this).parent().parent()[0]);
                            var desde = document.getElementById('placeholderBaja_Compactacion').value;
                            var Nombre = document.getElementById('txtNombre_Compactacion').value;
                            var HoraJornada_vacante = $(nTds[5]).text();
                            if (parseInt(horas_asignar) > 42) {
                                $(this).find(".horas_asignadas").focus();
                                cont = cont + 1;
                                return false;
                            }
                            var observacion = "";
                            var cveNivel_Educativo = '';
                            var cveRecurso_Vacante = $(nTds[0]).text();
                            var cveRecurso_Ocupado = document.getElementById('HiddenField_cveRecurso_Ocupado').value;
                            var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
                            var cvezon = document.getElementById('txtGrupoNominal').value;
                            var FolioDocumentoCIT = document.getElementById('txtFolioDocumentoCIT_Compactacion').value;
                            var Plaza_Movimiento = document.getElementById('txtPlaza_Compactacion').value;
                            var HiddenField_cvenivpl = document.getElementById('HiddenField_cvenivpl').value;
                            var codnivpu = $(nTds[1]).text();
                            var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo').value;
                            var clave = $('#HiddenField_puesto').val();
                            var PUESTO = $('#txtPuestoDescripcion_Compactacion').val();
                            if (PUESTO == "HORAS") {
                                if (HoraJornada_ocupado.length <= 0) {
                                    alert('Debe proporcionar las horas del movimiento');
                                    document.getElementById('txtHoraJornada_Compactacion').focus();
                                    return;
                                }
                            }
                            if (!existeFecha2(desde)) {
                                alert('La fecha de la compactacion es incorrecta');
                                document.getElementById('placeholderDesde').focus();
                                return;
                            }
                            hasta = '01/01/9999'
                            var fechaD = desde.split("/");
                            var fechaH = hasta.split("/");
                            var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];
                            var hasta_formateada = fechaH[0] + '/' + fechaH[1] + '/' + fechaH[2];

                            var obj = new Object();
                            obj.cveRecurso_Ocupado = cveRecurso_Ocupado;
                            obj.cveRecurso_Vacante = cveRecurso_Vacante;
                            obj.cveNivel_Educativo = cveNivel_Educativo;
                            obj.Nombre = Nombre;
                            obj.cvepuesto_equivalencia_detalle = $("#HiddenField_cvepuesto_equivalencia_compactacion").val();
                            $("#HiddenField_codnivpu_compactacion").val();
                            obj.OBSERVACIONES = observacion;
                            obj.hora_ocupado = HoraJornada_ocupado;
                            obj.hora_vacante = HoraJornada_vacante;
                            obj.FolioDocumentoCIT = FolioDocumentoCIT;
                            obj.FECHA_DESDE = desde_formateada;
                            obj.FECHA_HASTA = hasta_formateada;
                            obj.cveRecurso_Movimiento = cveRecurso_Movimiento;
                            obj.cvezon = cvezon;
                            obj.codniv = $("#HiddenField_codnivpu_compactacion").val();
                            obj.cvenisni_vacante = $(nTds[7]).text();
                            obj.cveRecurso_Ocupado = $(nTds[8]).text();
                            obj.cvenisni_ocupado = $("#HiddenField_codnivpu_compactacion").val();
                            obj.Plaza_Movimiento = Plaza_Movimiento;
                            obj.cveRecurso_Movimiento_tipo = 3; //Compactacion Recurso
                            JSONObject1.push(obj);
                        }
                    });
                    if (JSONObject1.length == 0) {
                        alert('El movimiento debe tener al menos un registro');
                        return false;
                    } else {
                        ProcesoGuardar_Compactacion(JSONObject1, 3);
                    }

                }
            }
            else {
                alert("Dede proporcionar un folio de documento");
                document.getElementById('txtFolioDocumentoCIT_Compactacion').focus();
                return;
            }
        });

        $("#btnEliminarMovimientos").click(function () {
            var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;
            var opcion = confirm("¿Seguro que desea cancelar este movimiento?");
            if (opcion == true) {
                ProcesoEliminar(cveRecurso_Movimiento);
            }
        });





        $("#btnGuardarMovimientos").click(function () {
            var JSONObject = new Array();
            var PuestoMovimiento;
            var hiddenId;
            var cveNivel_Educativo;
            var clave;
            var nombre;
            var horas_totales;
            var horas_asignar;
            var cvenivpl;
            var horas_asignar_oculto;

            var JSONObject1 = new Array();

            var HoraJornada_ocupado = document.getElementById('txtHoraJornada_Pop').value;

            if (parseInt(HoraJornada_ocupado) > 42) {
                alert('No puede asignar mas de 42 hras al nuevo movimiento ');
                document.getElementById('txtHoraJornada_Pop').focus();
                return false;
            }

            var txtFolioDocumentoCIT = document.getElementById('txtFolioDocumentoCIT').value;


            if (txtFolioDocumentoCIT != '') {

                var x = ConsultaFolioDocumentoCIT(txtFolioDocumentoCIT);
                var txtFolioDocumentoCIT = document.getElementById('txtFolioDocumentoCIT').value;

                if (txtFolioDocumentoCIT == '') {
                    // alert("Dede proporcionar un folio de documento");
                    document.getElementById('txtFolioDocumentoCIT').focus();
                    return;
                }

                var desde = document.getElementById('placeholderDesdeMultiple').value;
                var hasta = document.getElementById('placeholderHastaMultiple').value;
                var Nombre = document.getElementById('txtNombreMultiple').value;
                if (!existeFecha2(desde)) {
                    alert('La fecha desde es incorrecta');
                    document.getElementById('placeholderDesde').focus();
                    return;
                }
                if (hasta != "") {
                    if (!existeFecha2(hasta)) {
                        alert('La fecha hasta es incorrecta');
                        document.getElementById('placeholderHasta').focus();
                        return;
                    }
                } else {
                    hasta = '01/01/9999'
                }


                if (compare_dates(desde, hasta)) {
                    alert('La fecha de inicio no puede ser mayor que la fecha fin');
                    document.getElementById('placeholderHastaMultiple').focus();
                    return;
                }

                //if (Date.parse(desde) > Date.parse(hasta)) {
                //    alert('La fecha de inicio puede ser mayor que la fecha fin');
                //    document.getElementById('placeholderHasta').focus();
                //    return;
                //}

                var cvezon = document.getElementById('txtGrupoNominal').value;

                if (cvezon.length <= 0) {
                    alert('Debe proporcionar un un grupo nominal');
                    document.getElementById('txtGrupoNominal').focus();
                    return;
                }

                if ($("#txtlPuesto_Pop").val() == '0') {
                    alert('Debe seleccionar un puesto');
                    document.getElementById('ddlPuesto_Pop').focus();
                    return;
                }

                if ($("#ddlNivelSalarial").val() == '0') {
                    alert('Debe seleccionar un nivel salarial');
                    document.getElementById('ddlNivelSalarial').focus();
                    return;
                }

                if (ValidaHoras()) {

                    $("#gridview_Plazas_Movimiento tbody tr").each(function (index) {
                        var nTds = $('td', this);
                        $('#HiddenField_puesto').attr('value', PuestoMovimiento);
                        $('#HiddenField_cveRecurso_Vacante').attr('value', hiddenId);
                        $('#HiddenField_cveNivel_Educativo').attr('value', cveNivel_Educativo);
                        $('#HiddenField_cvenivpl').attr('value', cvenivpl);
                        $("#ddlNivelSalarial").prop("disabled", true);


                        clave = $(nTds[2]).text();
                        var HoraJornada_vacante = $(this).find(".horas_asignadas").val();
                        if (parseInt(horas_asignar) > 42) {
                            $(this).find(".horas_asignadas").focus();
                            cont = cont + 1;
                            return false;
                        }
                        var observacion = document.getElementById('txtObservacionMultiple').value;
                        var cveNivel_Educativo = $(nTds[1]).text();
                        var cveRecurso_Vacante = $(nTds[0]).text();
                        var cveRecurso_Ocupado = document.getElementById('HiddenField_cveRecurso_Ocupado').value;
                        var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento').value;

                        var FolioDocumentoCIT = document.getElementById('txtFolioDocumentoCIT').value;

                        var HiddenField_cvenivpl = document.getElementById('HiddenField_cvenivpl').value;




                        if ($('#txtGrupoNominal').val() == '0') {
                            alert("Dede proporcionar un grupo nominal")
                            document.getElementById('txtGrupoNominal').focus();
                            return;
                        }

                        if ($("#ddlNivelSalarial").val() == '0') {
                            alert('Debe seleccionar un nivel salarial');
                            document.getElementById('ddlNivelSalarial').focus();
                            return;
                        }

                        if ($("#HiddenField_cvepuesto_equivalencia").val() != '') {

                            var codnivpu = '';
                            var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo').value;
                            var clave = $('#HiddenField_puesto').val();

                            var PUESTO = $('#txtPuestoDescripcion_Pop').val();
                            if (PUESTO == "HORAS") {
                                if (HoraJornada_ocupado.length <= 0) {
                                    alert('Debe proporcionar las horas del movimiento');
                                    document.getElementById('txtHoraJornada_Pop').focus();
                                    return;
                                }
                                if (HoraJornada_vacante == "" || HoraJornada_vacante == "0" || HoraJornada_vacante == "00") {
                                    alert('Debe proporcionar el numero de horas');
                                    document.getElementById('txtHoraJornadaMultiple').focus();
                                    return;
                                }
                            }



                            var fechaD = desde.split("/");
                            var fechaH = hasta.split("/");
                            var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];
                            var hasta_formateada = fechaH[0] + '/' + fechaH[1] + '/' + fechaH[2];

                            var obj = new Object();
                            obj.cveRecurso_Ocupado = cveRecurso_Ocupado;
                            obj.cveRecurso_Vacante = cveRecurso_Vacante;
                            obj.cveNivel_Educativo = cveNivel_Educativo;
                            obj.Nombre = Nombre;
                            obj.cvepuesto_equivalencia_detalle = $("#HiddenField_cvepuesto_equivalencia").val();
                            obj.cveMunicipio = $("#ddlMunicipioMultiple").val();
                            obj.OBSERVACIONES = observacion;

                            obj.hora_ocupado = HoraJornada_ocupado;
                            obj.hora_vacante = HoraJornada_vacante;

                            obj.FolioDocumentoCIT = FolioDocumentoCIT;

                            obj.FECHA_DESDE = desde_formateada;
                            obj.FECHA_HASTA = hasta_formateada;
                            obj.cveRecurso_Movimiento = cveRecurso_Movimiento;

                            obj.cvezon = cvezon;
                            obj.codniv = $("#ddlPuesto_Pop").val();
                            obj.cvenisni_vacante = $(nTds[9]).text();
                            obj.cveRecurso_Ocupado = $(nTds[11]).text();
                            obj.cvenisni_ocupado = $("#ddlNivelSalarial").val();

                            if ($("#Opcion option:selected").val() != "05") {
                                obj.cveRecurso_Movimiento_tipo = 2; //Movimiento Recurso
                            } else {
                                obj.cveRecurso_Movimiento_tipo = 5; //Movimiento Recategorizar
                            }


                            JSONObject1.push(obj);

                        }
                    });
                    if (JSONObject1.length == 0) {
                        alert('El movimiento debe tener al menos un registro');
                        return false;
                    } else {


                        ValidaGuardar(JSONObject1);
                    }
                }

            }
            else {
                alert("Dede proporcionar un folio de documento");
                document.getElementById('txtFolioDocumentoCIT').focus();
                return;
            }


        });


        $("#btnGuardarVacante").click(function () {

            var desde = document.getElementById('placeholderDesdeMultiple_Vacante').value;

            if (!existeFecha2(desde)) {
                alert('La fecha de la creacion del recurso es incorrecta');
                document.getElementById('placeholderDesdeMultiple_Vacante').focus();
                return;
            }

            var fechaD = desde.split("/");
            var desde_formateada = fechaD[0] + '/' + fechaD[1] + '/' + fechaD[2];


            var Puesto = document.getElementById('txtPuesto_Pop_Vacante').value;
            if (Puesto != '') {
                $("#txtPuestoDescripcionPop_Vacante").val('');
                ConsultaPuesto_Vacante(Puesto);
            }



            var Nombre = document.getElementById('txtNombre_Vacante').value;
            var observacion = document.getElementById('txtObservacion_Vacante').value;
            var HoraJornada = document.getElementById('txtHoraJornada_Pop_Vacante').value;
            var cveNivel_Educativo = document.getElementById('HiddenField_cveNivel_Educativo_Plaza').value;
            var horas_plaza = document.getElementById('HiddenField_Horas_Plaza').value;
            var cveRecurso_Movimiento = document.getElementById('txtFolioMovimiento_Vacante').value;
            var cvepuesto_equivalencia = $("#HiddenField_cvepuesto_equivalencia").val();
            var zona_economica = $('#ddlZona_Economica :selected').text();
            var obj = new Object();
            var JSONObject1 = new Array();

            obj.cveRecurso_Vacante = document.getElementById('HiddenField_cveRecurso_Vacante').value;
            obj.Numero_Plaza = "";
            obj.cveNivel_Educativo = cveNivel_Educativo;
            obj.Nombre = Nombre;
            obj.cvePuesto_Equivalencia = cvepuesto_equivalencia;
            obj.hora_disponible = HoraJornada;
            obj.OBSERVACIONES = observacion;
            obj.zona_economica = zona_economica;
            obj.cveRecurso_Movimiento = cveRecurso_Movimiento;
            obj.cveRecurso_Movimiento_tipo = 1; //Nuevo Recurso
            obj.Fecha_Baja = desde_formateada;

            JSONObject1.push(obj);

            if (JSONObject1.length == 0) {
                return false;
            } else {
                ProcesoGuardar_Vacante(JSONObject1);
            }

        });

        $('#gridview_Plazas tr td').live('click', function (event) {
            Proceso_Consulta_Movimiento("", $(this));
            return false;
        });

        $('#gridview_Plazas_Recursos tr td').live('dblclick', function (event) {
            Proceso_Consulta_Movimiento("", $(this));


            return false;
        });

        $('#test_detalle_ocupa tr td').live('dblclick', function (event) {

            return false;
        });




        $('#gridview_ConsultaPlazasRecursos tr td').live('dblclick', function (event) {
            Proceso_Consulta_Movimiento("", $(this));


            return false;
        });

        dialog = $("#dialog-message").dialog({
            autoOpen: false,
            width: 900,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {


                    $('#txtNombre_Vacante').val('');
                    $('#txtHoraJornada_Vacante').val('');
                    $('#placeholderBaja_Vacante').val('');
                    $(this).dialog("close");
                }

            }
        });


        dialog_Plaza_movimientos = $("#dialog-message_plazas").dialog({
            autoOpen: false,
            width: 900,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    dialogPlazas_Recursos.show();
                    $('#txtNombre_Vacante').val('');
                    $('#txtHoraJornada_Vacante').val('');
                    $('#placeholderBaja_Vacante').val('');
                    $(this).dialog("close");
                }

            }
        });


        dialogPlazas = $("#dialog-plazas").dialog({
            autoOpen: false,
            width: 1100,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });



        dialogPlazas_Compactacion = $("#Div_Compactacion").dialog({
            autoOpen: false,
            width: 1100,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });


        dialogPlazas_Descompactacion = $("#Div_Descompactacion").dialog({
            autoOpen: false,
            width: 1100,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });



        dialogPlazas_Recategorizacion = $("#Div_Recategorizacion").dialog({
            autoOpen: false,
            width: 1100,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });








        dialogPlazas_Recursos = $("#dialog-Plazas_Recursos").dialog({
            autoOpen: false,
            width: 960,
            resizable: false,
            modal: true,
            position: {
                my: 'Centered', at: 'Centered'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });









        dialogConsultaPlazasRecursos = $("#dialog-ConsultaPlazasRecursos").dialog({
            autoOpen: false,
            width: 960,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });

        dialogUnificarPlazasRecursos = $("#dialog-UnificarPlazasRecursos").dialog({
            autoOpen: false,
            width: 960,
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });





        dialogPuesto = $("#dialog-Puesto").dialog({
            autoOpen: false,
            width: 600,
            height: 400,
            title: "",
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {

                    $(this).dialog("close");
                }

            }
        });

        dialogMovimiento = $("#dialog-messageMovimiento").dialog({
            autoOpen: false,
            width: 800,
            title: "",
            resizable: false,
            modal: true,
            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $('#txtNombre').val('');
                    $('#txtHoraJornada').val('');
                    $('#placeholderDesde').val('');
                    $('#placeholderHasta').val('');
                    $('#HiddenField_cveRecurso_Ocupado').val('');
                    $(this).dialog("close");
                }
            }
        });


        dialogVacante = $("#dialog-Vacantes").dialog({
            autoOpen: false,
            width: 800,
            title: "",
            resizable: false,
            modal: true,
            position: {
                my: 'top',
                at: 'top'
            },
            buttons: {
                Regresar: function () {
                    $('#txtNombre_Vacante').val('');
                    $('#placeholderBaja_Vacante').val('');
                    $('#txtHoraJornada_Vacante').val('');
                    $('#HiddenField_cveNivel_Educativo_Plaza').val('');
                    $('#HiddenField_Horas_Plaza').val('');

                    $(this).dialog("close");
                }
            }
        });

        dialogAgregaPlazas = $("#dialog-AgregarMultiple").dialog({
            autoOpen: false,
            width: 800,
            title: "",
            resizable: false,
            modal: true,
            show: "blind",
            hide: "explode",
            modal: true,
            //display: 'block',

            position: {
                my: 'center', at: 'center'
            },
            buttons: {
                Regresar: function () {
                    $('#txtNombre').val('');
                    $('#txtHoraJornada').val('');
                    $('#placeholderDesde').val('');
                    $('#placeholderHasta').val('');
                    $('#HiddenField_cveRecurso_Ocupado').val('');
                    $(this).dialog("close");
                }

            }
        });

        $(".ui-dialog-titlebar").hide();

    });
</script>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>

<body>


    <form id="form1" runat="server">

        <div class="container_12">
            <h1 class="title">VALIDACION DE MOVIMIENTO DE PLAZAS</h1>
        </div>

        <select id="Opcion" class="select1">
            <option value="01">AGREGAR MOVIMIENTO</option>
            <option value="02">AGREGAR NUEVO RECURSO </option>
            <option value="03">COMPACTAR RECURSOS </option>
            <option value="04">DESCOMPACTAR RECURSO </option>
            <option value="05">RECATEGORIZAR RECURSO </option>
            <option value="06">CONSULTA RECURSO </option>
            <option value="07">UNIFICAR PERIODOS DE INCIDENCIAS</option>
            <option value="08">SIMULACION DE AFECTACION </option>
            <%--<option value="03">VER PLAZAS</option>--%>
        </select>

        <br />



        <br />
        <div id="Div_input" style="text-align: left; right: 50%; height: auto; position: static; font-weight: 700;">
            <input type="button" class="button1" id="btnAgregarVacante" value="Continuar" />
        </div>

        <div id="Div_Button" style="text-align: left; right: 50%; height: auto; position: static; font-weight: 700;">
            <asp:Button ID="btnSimulacionAfectacion" CssClass="button1" runat="server" Text="Generar Excel" OnClick="btnSimulacionAfectacion_Click" />
        </div>


        <%--<input type="button" class="button1" id="" value="Continuar" runat="server" />--%>

        <div id="dialog-plazas" style="text-align: left; right: 50%; height: auto; position: static; font-weight: 700;">


            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTitulo_Plazas" runat="server"></asp:Label>
            </h3>
            <br />
            &nbsp;

            <asp:Label ID="lblCentroCosto" runat="server" Width="60px" Text="Nivel:"></asp:Label>
            <asp:DropDownList ID="ddlCentroCosto" runat="server" class="select1" Width="350px" TabIndex="100"></asp:DropDownList>
            <br />
            <br />
            &nbsp;
            Filtro:&nbsp;&nbsp;&nbsp;&nbsp;
            <asp:TextBox CssClass="textbox1" ID="txtFiltro" MaxLength="100" Width="400px" runat="server" TabIndex="101"></asp:TextBox>
            <br />
            <br />


            <table id="gridviewT_Plazas" class="gridviewT" style="width: 665px; font-size: 10px" cellspacing="0" rules="all" border="1">
            </table>
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all" style="margin: 0px; padding: 0px; border: 1px solid rgb(170, 170, 170); outline: 0px; line-height: 1.3; text-decoration: none; font-size: 17.6px; list-style: none; display: block; cursor: pointer; background: url(&quot;images/ui-bg_highlight-soft_75_cccccc_1x100.png&quot;) 50% 50% repeat-x rgb(204, 204, 204); color: rgb(34, 34, 34); font-weight: bold; border-radius: 4px; font-family: Verdana, Arial, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: center; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; height: 25px;"><span id="lblTitulo0">DETALLE DE RECURSO UTILIZADO</span></h3>
            <table id="gridview_Plazas" class="gridview" style="width: 685px; height: 400px; font-size: 10px;" cellspacing="0" rules="all" border="1">
            </table>
            <div id="Load_plaza" style="background-color: white; filter: alpha(opacity=10); opacity: 0.80; width: 100%; top: 0px; left: 0px; position: static; height: 10px; display: none">
                <div style="text-align: center; background-color: transparent; position: absolute; top: 40%; right: 50%; width: auto; height: auto;">
                    <table>
                        <tr>
                            <td>
                                <asp:Image ID="Image1" runat="server" ImageUrl="~/Imagenes/ajax-loader.gif" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label1" runat="server" Text="Cargando Informacion" Font-Size="X-Large" Style="color: #00a2e8;"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div id="dialog-message_plazas" style="text-align: center; right: 50%; width: 800px; position: static; height: auto;">

            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTituloPrincipal_PlazaMovimiento" runat="server"></asp:Label>

            </h3>

            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="test_detalle_ocupa_PlazaMovimiento" runat="server"></asp:Label>
            </h3>

            <table id="GridEncabezado_detalle" class="gridviewT" style="width: 720px; font-size: 10px" cellspacing="0" rules="all" border="0">
            </table>
            <table id="test_detalle" class="gridview" style="width: 700px; font-size: 10px;" cellspacing="0" rules="all" border="0">
            </table>

            &nbsp;
            &nbsp;
            &nbsp;

             
        </div>

        <div id="dialog-Plazas_Recursos" style="text-align: left; font-size: 22px; right: 50%; height: auto; position: static; font-weight: 900;">


            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTitulo_Plazas_Recursos" Text="BUSQUEDA DE RECURSO" runat="server"></asp:Label>
            </h3>
            <br />
            Criterio de busqueda:&nbsp;&nbsp;&nbsp;&nbsp;<br />

            <asp:TextBox CssClass="textbox1" ID="txtFiltro_Recursos" MaxLength="100" Width="400px" runat="server" TabIndex="101"></asp:TextBox>
            <br />
            <br />


            <table id="gridviewT_Plazas_Recursos" class="gridviewT" style="width: 825px; font-size: 10px" cellspacing="0" rules="all" border="1">
            </table>

            <table id="gridview_Plazas_Recursos" class="gridview" style="width: 910px; height: 200px; font-size: 10px;" cellspacing="0" rules="all" border="1">
            </table>
            <div id="Div2" style="background-color: white; filter: alpha(opacity=10); opacity: 0.80; width: 100%; top: 0px; left: 0px; position: static; height: 10px; display: none">
                <div style="text-align: center; background-color: transparent; position: absolute; top: 40%; right: 50%; width: auto; height: auto;">
                    <table>
                        <tr>
                            <td>
                                <asp:Image ID="Image2" runat="server" ImageUrl="~/Imagenes/ajax-loader.gif" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label5" runat="server" Text="Cargando Informacion" Font-Size="X-Large" Style="color: #00a2e8;"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <div id="dialog-ConsultaPlazasRecursos" style="text-align: left; right: 50%; height: auto; position: static; font-weight: 700;">


            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTitulo_ConsultaPlazasRecursos" Text="BUSQUEDA DE RECURSO" runat="server"></asp:Label>
            </h3>
            <br />
            Criterio de busqueda:&nbsp;&nbsp;&nbsp;&nbsp;<br />

            <asp:TextBox CssClass="textbox1" ID="txtFiltro_ConsultaPlazasRecursos" MaxLength="100" Width="400px" runat="server" TabIndex="101"></asp:TextBox>
            <br />
            <br />


            <table id="gridviewT_ConsultaPlazasRecursos" class="gridviewT" style="width: 825px; font-size: 10px" cellspacing="0" rules="all" border="1">
            </table>

            <table id="gridview_ConsultaPlazasRecursos" class="gridview" style="width: 910px; height: 200px; font-size: 10px;" cellspacing="0" rules="all" border="1">
            </table>
            <div id="Div7" style="background-color: white; filter: alpha(opacity=10); opacity: 0.80; width: 100%; top: 0px; left: 0px; position: static; height: 10px; display: none">
                <div style="text-align: center; background-color: transparent; position: absolute; top: 40%; right: 50%; width: auto; height: auto;">
                    <table>
                        <tr>
                            <td>
                                <asp:Image ID="Image3" runat="server" ImageUrl="~/Imagenes/ajax-loader.gif" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label29" runat="server" Text="Cargando Informacion" Font-Size="X-Large" Style="color: #00a2e8;"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <input type="button" id="Regresar_Busqueda" class="button1" value="Regresar" />
        </div>

        <div id="dialog-UnificarPlazasRecursos" style="text-align: left; right: 50%; height: auto; position: static; font-weight: 700;">


            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTitulo_UnificarPlazasRecursos" Text="UNIFICAR PERIODOS DE INCIDENCIAS" runat="server"></asp:Label>
            </h3>
            <br />
            Criterio de busqueda:&nbsp;&nbsp;&nbsp;&nbsp;<br />

            <asp:TextBox CssClass="textbox1" ID="txtFiltro_UnificarPlazasRecursos" MaxLength="100" Width="400px" runat="server" TabIndex="101"></asp:TextBox>
            <br />
            <br />


            <table id="gridviewT_UnificarPlazasRecursos" class="gridviewT" style="width: 825px; font-size: 10px" cellspacing="0" rules="all" border="1">
            </table>

            <table id="gridview_UnificarPlazasRecursos" class="gridview" style="width: 910px; height: 200px; font-size: 10px;" cellspacing="0" rules="all" border="1">
            </table>
            <div id="Div8" style="background-color: white; filter: alpha(opacity=10); opacity: 0.80; width: 100%; top: 0px; left: 0px; position: static; height: 10px; display: none">
                <div style="text-align: center; background-color: transparent; position: absolute; top: 40%; right: 50%; width: auto; height: auto;">
                    <table>
                        <tr>
                            <td>
                                <asp:Image ID="Image4" runat="server" ImageUrl="~/Imagenes/ajax-loader.gif" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <asp:Label ID="Label30" runat="server" Text="Cargando Informacion" Font-Size="X-Large" Style="color: #00a2e8;"></asp:Label>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <input type="button" id="UnificarIncidencias" class="button1" value="Unificar" />
            <input type="button" id="UnificarRegresar_Busqueda" class="button1" value="Regresar" />
        </div>


        <div id="dialog-message" style="text-align: center; right: 50%; width: 600px; position: static; height: auto;">

            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTituloPrincipal" Text="NUEVO MOVIMIENTO" runat="server"></asp:Label>

            </h3>

            <table id="GridEncabezado_detalle_ocupa" class="gridviewT" style="width: 800px; font-size: 10px" cellspacing="0" rules="all" border="0">
            </table>
            <table id="test_detalle_ocupa" class="gridview" style="width: 800px; font-size: 10px;" cellspacing="0" rules="all" border="0">
            </table>



            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTitulo" Text="DETALLE DE RECURSO UTILIZADO" runat="server"></asp:Label>
            </h3>

            <table id="GridEncabezado_detalle_asigna" class="gridviewT" style="width: 800px; font-size: 10px" cellspacing="0" rules="all" border="0">
            </table>
            <table id="test_detalle_asigna" class="gridview" style="width: 800px; font-size: 10px;" cellspacing="0" rules="all" border="0">
            </table>

            &nbsp;
                &nbsp;
                &nbsp;
            <asp:Label ID="lblImporteTotal" runat="server" Text="Label"></asp:Label>

            &nbsp;
        </div>

        <div id="dialog-Vacantes" style="text-align: left; position: static; right: 50%; width: 800px; height: auto;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTituloVacante" runat="server"></asp:Label>
            </h3>
            &nbsp;
            <br />
            &nbsp;

                <asp:Label ID="Label12" runat="server" Width="150px" Text="Folio Movimiento:"></asp:Label>
            <br />
            &nbsp;

                <asp:TextBox ID="txtFolioMovimiento_Vacante" Width="100px" MaxLength="8" runat="server" class="solo-numero textbox1" TabIndex="1"></asp:TextBox>
            <input type="button" id="btnNuevoMovimiento_Vacante" class="button1" value="Nuevo Movimiento" tabindex="2" /><br />
            &nbsp;
                <asp:Label ID="Label2" runat="server" Width="150px" Text="Nombre:"></asp:Label>
            <br />
            &nbsp;
                <asp:TextBox CssClass="textbox1" ID="txtNombre_Vacante" Width="400px" runat="server" TabIndex="1"></asp:TextBox>
            <br />
            &nbsp;
                <asp:Label ID="lblHoraJornadaMultiple_Vacante" runat="server" Text="Zona Economica:" Width="154px"></asp:Label>
            <br />
            &nbsp;&nbsp;<asp:DropDownList ID="ddlZona_Economica" runat="server" class="select1" Width="180px"></asp:DropDownList>
            &nbsp;
            <br />
            &nbsp;
           
 
                        <asp:Label ID="Label21" runat="server" Width="230px" Text="Puesto:"></asp:Label>
            <asp:Label ID="lblHoraJornada_Pop_Vacante" runat="server" Width="60px" Text="Horas:"></asp:Label>


            <br />

            &nbsp;
            <asp:TextBox CssClass="textbox1" ID="txtPuesto_Pop_Vacante" Width="70px" MaxLength="7" runat="server" TabIndex="3"></asp:TextBox>
            <asp:TextBox CssClass="textbox1" ID="txtPuestoDescripcion_Pop_Vacante" Width="146px" MaxLength="500" runat="server" TabIndex="3" disabled="disabled"></asp:TextBox>
            &nbsp;<input class="textbox1" type="text" id="txtHoraJornada_Pop_Vacante" style="width: 50px" maxlength="2" value="" tabindex="4">

            <asp:DropDownList ID="ddlNivelSalarial_Vacante" runat="server" Width="80px" TabIndex="9"></asp:DropDownList>

            <br />
            &nbsp;



                        <asp:Label ID="lblPuestoMultiple2" runat="server" Width="150px" Text="Desde:"></asp:Label>
            <br />
            &nbsp;

                        <input class="textbox1 placeholder" type="text" id="placeholderDesdeMultiple_Vacante" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="4"><br />
            &nbsp;
                <asp:Label ID="Label7" runat="server" Width="150px" Text="Observaciones:"></asp:Label>
            <br />
            &nbsp;
                <textarea id="txtObservacion_Vacante" runat="server" cols="65" rows="5" class="textbox1" maxlength="250" tabindex="5"> </textarea>
            <br />
            &nbsp;
            <br />
            &nbsp;
                <input type="button" id="btnGuardarVacante" class="button1" value="Guardar Vacante" tabindex="6" />

            <input type="button" id="btnLimpiarMovimiento_Pop_Vacante" class="button1" value="Limpiar" />
            <input type="button" id="btnRegresar_Vacante" class="button1" value="Regresar" /><br />
            &nbsp;
            <br />

        </div>

        <div id="dialog-AgregarMultiple" style="text-align: left; position: static; right: 50%; width: 1060px; height: auto;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTituloAgregarMultiple" runat="server"></asp:Label>
            </h3>
            <div style="margin-left: 20px;">
                <br />

                <asp:Label ID="Label4" runat="server" Width="150px" Text="Folio Movimiento:"></asp:Label>
                <br />

                <asp:TextBox ID="txtFolioMovimiento" Width="100px" MaxLength="8" runat="server" class="solo-numero textbox1" TabIndex="1"></asp:TextBox>
                &nbsp;<input type="button" id="btnNuevoMovimiento" class="button1" value="Nuevo Movimiento" tabindex="2" />&nbsp;

                <br />



                <div id="Div1" style="height: 490px;">
                    <div id="Div_Movimiento">
                        <asp:Label ID="lblNombreMultiple" runat="server" Width="531px" Text="Nombre:"></asp:Label>
                        <asp:Label ID="lblNombreMultiple0" runat="server" Width="150px" Text="# Empleado:"></asp:Label>
                        <br />


                        <asp:TextBox CssClass="textbox1" ID="txtNombreMultiple" Style="width: 525px" MaxLength="500" runat="server" TabIndex="2"></asp:TextBox>
                        &nbsp;<input type="text" id="txtNumeroEmpleado" style="width: 70px" maxlength="6" class="textbox1 solo-numero" tabindex="3"><br />



                        <asp:Label ID="lblPuestoMultiple" runat="server" Width="150px" Text="Desde:"></asp:Label>
                        &nbsp;&nbsp;&nbsp;
                        <asp:Label ID="lblFechaDesdeMultiple" runat="server" Width="180px" Text="Hasta:"></asp:Label>



                        <asp:Label ID="lblPuestoMultiple0" runat="server" Width="150px" Text="Folio CIT:"></asp:Label>
                        <br />

                        <input class="textbox1 placeholder" type="text" id="placeholderDesdeMultiple" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="4">
                        &nbsp;                
                        <input class="textbox1 placeholder" type="text" id="placeholderHastaMultiple" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="5">&nbsp;&nbsp;&nbsp;<asp:TextBox CssClass="textbox1" ID="txtFolioDocumentoCIT" Width="146px" MaxLength="20" runat="server" TabIndex="6"></asp:TextBox>

                        <br />


                        <asp:Label ID="lblHoraJornadaMultiple" runat="server" Width="154px" Text="Grupo Nominal:"></asp:Label>

                        <br />


                        <input type="text" id="txtGrupoNominal" style="width: 70px" maxlength="6" class="textbox1 solo-numero" tabindex="7">&nbsp;

                        <input class="textbox1" type="text" id="txtGrupoNominalDescripcion" style="width: 525px" readonly="true" maxlength="400" tabindex="99" disabled="disabled">
                        <br />
                        <asp:Label ID="Label11" runat="server" Width="228px" Text="Puesto:"></asp:Label>&nbsp;
                        <asp:Label ID="lblHoraJornada_Pop" runat="server" Width="60px" Text="Horas:"></asp:Label>

                        <br />

                        <asp:TextBox CssClass="textbox1" ID="txtPuesto_Pop" Width="70px" MaxLength="7" runat="server" TabIndex="8"></asp:TextBox>
                        &nbsp;<asp:TextBox CssClass="textbox1" ID="txtPuestoDescripcion_Pop" Width="146px" MaxLength="500" runat="server" TabIndex="3" disabled="disabled"></asp:TextBox>
                        &nbsp;<input class="textbox1" type="text" id="txtHoraJornada_Pop" style="width: 50px" maxlength="2" value="" tabindex="9">

                        <asp:DropDownList ID="ddlNivelSalarial" runat="server" Width="80px" TabIndex="9"></asp:DropDownList>


                        <br />

                        <input type="button" id="btnBuscar_Recurso" class="button1" value="Buscar Recurso" tabindex="11" />&nbsp;
                        &nbsp;<table id="gridviewT_Plazas_Movimiento" border="1" cellspacing="0" class="gridviewT" rules="all">
                        </table>
                        <table id="gridview_Plazas_Movimiento" border="1" style="height: 150px; width: 1000px; overflow-y: scroll; display: block; position: relative;" cellspacing="0" class="gridview" rules="all">
                        </table>
                        <input type="button" id="btnCosto" class="button1" value="Visualizar Costos" /><br />
                        <asp:Label ID="lblObservacionesMultiple" runat="server" Width="150px" Text="Observaciones:"></asp:Label>
                        <br />

                        <textarea id="txtObservacionMultiple" class="textbox1" runat="server" cols="80" rows="2" maxlength="250" name="S1" tabindex="16"> </textarea><br />
                    </div>
                </div>
                <br />
                <br />

                <input type="button" id="btnGuardarMovimientos" class="button1" value="Guardar" />&nbsp;
                <input type="button" id="btnLimpiarMovimiento" class="button1" value="Limpiar" />&nbsp;

                <input type="button" id="btnRegresar" class="button1" value="Regresar" />&nbsp;

                <input type="button" id="btnEliminarMovimientos" class="button1" value="Cancelar Movimiento" /><br />


            </div>

        </div>

        <div id="dialog-messageMovimiento" role="dialog" style="text-align: left; right: 50%; width: 700px; height: auto; position: static;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="lblTituloMovimientos" runat="server"></asp:Label>

            </h3>
            &nbsp;             
                <br />
            &nbsp;
                <asp:Label ID="lblNombre" runat="server" Width="150px" Text="Nombre:"></asp:Label>
            <br />
            &nbsp;
                <asp:TextBox CssClass="textbox1" ID="txtNombre" Width="400px" MaxLength="500" Enabled="false" runat="server" TabIndex="1"></asp:TextBox>
            <br />
            &nbsp;
                <br />
            &nbsp;
                <asp:Label ID="lblPuesto" runat="server" Width="243px" Text="Puesto:"></asp:Label>
            <asp:Label ID="lblHoraJornada" runat="server" Width="60px" Text="Horas:"></asp:Label>
            &nbsp;&nbsp;&nbsp;
                <asp:Label ID="lblHoraJornada0" runat="server" Width="60px" Text="Municipio:"></asp:Label>
            <br />
            &nbsp;

                <asp:DropDownList ID="ddlPuesto" runat="server" Width="230px" TabIndex="2"></asp:DropDownList>
            &nbsp;
                <input type="text" id="txtHoraJornada" style="width: 50px" maxlength="2" value="" class="solo-numero" tabindex="4">
            &nbsp;
                &nbsp;
                &nbsp;
                <asp:DropDownList ID="ddlMunicipio" Enabled="false" runat="server" Width="250px" TabIndex="5"></asp:DropDownList>
            <br />
            &nbsp;
                <br />
            &nbsp;
                <asp:Label ID="lblPuesto0" runat="server" Width="243px" Text="Desde:"></asp:Label>
            <asp:Label ID="lblFechaDesde" runat="server" Width="150px" Text="Hasta:"></asp:Label>
            <br />
            &nbsp;
                <input type="text" class="placeholder" disabled id="placeholderDesde" placeholder="DD/MM/AAAA" maxlength="10" tabindex="6">
            &nbsp;                
                <input type="text" class="placeholder" disabled id="placeholderHasta" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="7">
            &nbsp;&nbsp;
                <br />
            &nbsp;
                <br />
            &nbsp;
                <asp:Label ID="lblObservaciones" runat="server" Width="150px" Text="Observaciones:"></asp:Label>
            <br />
            &nbsp;
                <textarea id="txtObservacion" runat="server" disabled cols="65" rows="5" maxlength="250" tabindex="8"> </textarea>
            <br />
            &nbsp;
                <br />
            &nbsp;
                <input type="button" id="btnGuardar" class="button1" value="Modificar Movimiento" />
            &nbsp;
                <input type="button" id="btnEliminarMovimiento" class="button1" value="Eliminar Movimiento" />

            <br />
            &nbsp;<br />
        </div>

        <div id="Div_Compactacion" style="text-align: left; position: static; right: 50%; width: 700px; height: auto;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="Label3" Text="COMPACTAR PLAZAS" runat="server"></asp:Label>
            </h3>
            &nbsp;<br />
            &nbsp;

                <asp:Label ID="Label14" runat="server" Width="150px" Text="Folio Movimiento:"></asp:Label>
            <br />
            &nbsp;

                <asp:TextBox ID="txtFolioMovimientoCompactacion" Width="100px" MaxLength="8" runat="server" class="solo-numero textbox1" TabIndex="1"></asp:TextBox>
            &nbsp;<input type="button" id="btnNuevoMovimientoCompactacion" class="button1" value="Nuevo Movimiento" tabindex="2" /><br />
            <br />



            <div id="Div3" style="height: 450px;">
                <div id="Div4">
                    &nbsp;
                    &nbsp;
                <asp:Label ID="Label8" runat="server" Width="111px" Text="# Plaza:"></asp:Label>
                    <asp:Label ID="Label6" runat="server" Width="150px" Text="Nombre:"></asp:Label>
                    <br />
                    &nbsp;

       



                <asp:TextBox CssClass="textbox1" ID="txtPlaza_Compactacion" Width="100px" MaxLength="5" runat="server" class="solo-numero"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtNombre_Compactacion" Enabled="false" Width="400px" runat="server" TabIndex="1"></asp:TextBox>
                    <br />
                    &nbsp;<br />
                    &nbsp;
                        <asp:Label ID="Label13" runat="server" Width="228px" Text="Puesto:"></asp:Label>
                    &nbsp;&nbsp;<asp:Label ID="lblHoraJornada_Compactacion" runat="server" Width="70px" Text="Horas:"></asp:Label>
                    <br />
                    &nbsp;

                        <asp:TextBox CssClass="textbox1" ID="txtPuesto_Compactacion" Width="70px" MaxLength="7" runat="server" TabIndex="8" disabled="disabled"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtPuestoDescripcion_Compactacion" Width="146px" MaxLength="500" runat="server" TabIndex="3" disabled="disabled"></asp:TextBox>
                    &nbsp;<input type="text" id="txtHoraJornada_Compactacion" style="width: 50px" maxlength="2" value="" class="textbox1" tabindex="4" disabled="disabled"><br />
                    &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <br />
                    &nbsp;
                <asp:Label ID="Label10" runat="server" Width="165px" Text="Fecha Movimiento:"></asp:Label>



                    <asp:Label ID="lblPuestoMultiple1" runat="server" Width="150px" Text="Folio CIT:"></asp:Label>
                    <br />
                    &nbsp;
                <input class="textbox1 placeholder" type="text" id="placeholderBaja_Compactacion" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="4">
                    &nbsp;
                        <asp:TextBox CssClass="textbox1" ID="txtFolioDocumentoCIT_Compactacion" Width="146px" MaxLength="20" runat="server" TabIndex="6"></asp:TextBox>

                    <br />
                    &nbsp;&nbsp;
            <table id="gridviewT_Plazas_Compactacion" border="1" cellspacing="0" class="gridviewT" rules="all" style="font-size: 10px">
            </table>
                    <table id="gridview_Plazas_Compactacion" border="1" style="height: 200px; width: 560px; overflow-y: scroll; display: block; position: relative;" cellspacing="0" class="gridview" rules="all">
                    </table>
                    <br />
                </div>
            </div>
            &nbsp;
            <input type="button" id="btnGuardarCompactacion" class="button1" value="Guardar Compactacion" />

            <input type="button" id="btnLimpiarMovimiento_Pop_Compactacion" class="button1" value="Limpiar" />
            <input type="button" id="btnRegresar_Compactacion" class="button1" value="Regresar" /><br />
            &nbsp;
                <br />

        </div>

        <div id="Div_Descompactacion" style="text-align: left; position: static; right: 50%; width: 700px; height: auto;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="Label9" Text="DESCOMPACTAR PLAZA" runat="server"></asp:Label>
            </h3>
            &nbsp;<br />
            &nbsp;

                <asp:Label ID="Label15" runat="server" Width="150px" Text="Folio Movimiento:"></asp:Label>
            <br />
            &nbsp;

                <asp:TextBox ID="txtFolioMovimientoDescompactacion" Width="100px" MaxLength="8" runat="server" class="solo-numero textbox1" TabIndex="1"></asp:TextBox>
            &nbsp;<input type="button" id="btnNuevoMovimientoDescompactacion" class="button1" value="Nuevo Movimiento" tabindex="2" /><br />
            <br />



            <div id="Div5" style="height: 230px;">
                <div id="Div6">
                    &nbsp;
                    &nbsp;
                <asp:Label ID="Label16" runat="server" Width="111px" Text="# Plaza:"></asp:Label>
                    <asp:Label ID="Label17" runat="server" Width="150px" Text="Nombre:"></asp:Label>
                    <br />
                    &nbsp;

       

                <asp:TextBox CssClass="textbox1" ID="txtPlaza_Descompactacion" Width="100px" MaxLength="5" runat="server" class="solo-numero"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtNombre_Descompactacion" Enabled="false" Width="400px" runat="server" TabIndex="1"></asp:TextBox>
                    <br />
                    &nbsp;<br />
                    &nbsp;
                        <asp:Label ID="Label18" runat="server" Width="228px" Text="Puesto:"></asp:Label>
                    &nbsp;&nbsp;<asp:Label ID="lblHoraJornada_Descompactacion" runat="server" Width="70px" Text="Horas:"></asp:Label>
                    <br />
                    &nbsp;

                        <asp:TextBox CssClass="textbox1" ID="txtPuesto_Descompactacion" Width="70px" MaxLength="7" runat="server" TabIndex="8" disabled="disabled"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtPuestoDescripcion_Descompactacion" Width="146px" MaxLength="500" runat="server" TabIndex="3" disabled="disabled"></asp:TextBox>
                    &nbsp;<input type="text" id="txtHoraJornada_Descompactacion" style="width: 50px" maxlength="2" value="" class="textbox1" tabindex="4"><br />
                    &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <br />
                    &nbsp;
                <asp:Label ID="Label19" runat="server" Width="165px" Text="Fecha Movimiento:"></asp:Label>



                    <asp:Label ID="Label20" runat="server" Width="150px" Text="Folio CIT:"></asp:Label>
                    <br />
                    &nbsp;
                <input class="textbox1 placeholder" type="text" id="placeholderBaja_Descompactacion" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="4">
                    &nbsp;
                        <asp:TextBox CssClass="textbox1" ID="txtFolioDocumentoCIT_Descompactacion" Width="146px" MaxLength="20" runat="server" TabIndex="6"></asp:TextBox>

                    <br />

                </div>
            </div>
            &nbsp;
            <input type="button" id="btnGuardarDescompactacion" class="button1" value="Guardar Descompactacion" />

            <input type="button" id="btnLimpiarMovimiento_Pop_Descompactacion" class="button1" value="Limpiar" />
            <input type="button" id="btnRegresar_Descompactacion" class="button1" value="Regresar" /><br />
            &nbsp;
                <br />

        </div>

        <div id="Div_Recategorizacion" style="text-align: left; position: static; right: 50%; width: 700px; height: auto;">
            <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                style="height: 25px;">
                <asp:Label ID="Label22" Text="RECATEGORIZAR PLAZA" runat="server"></asp:Label>
            </h3>
            &nbsp;<br />
            &nbsp;

                <asp:Label ID="Label23" runat="server" Width="150px" Text="Folio Movimiento:"></asp:Label>
            <br />
            &nbsp;

                <asp:TextBox ID="txtFolioMovimientoRecategorizacion" Width="100px" MaxLength="8" runat="server" class="solo-numero textbox1" TabIndex="1"></asp:TextBox>
            &nbsp;<input type="button" id="btnNuevoMovimientoRecategorizacion" class="button1" value="Nuevo Movimiento" tabindex="2" /><br />
            <br />



            <div id="Div9" style="height: 230px;">
                <div id="Div10">
                    &nbsp;
                    &nbsp;
                <asp:Label ID="Label24" runat="server" Width="111px" Text="# Plaza:"></asp:Label>
                    <asp:Label ID="Label25" runat="server" Width="150px" Text="Nombre:"></asp:Label>
                    <br />
                    &nbsp;

       

                <asp:TextBox CssClass="textbox1" ID="txtPlaza_Recategorizacion" Width="100px" MaxLength="5" runat="server" class="solo-numero"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtNombre_Recategorizacion" Enabled="false" Width="400px" runat="server" TabIndex="1"></asp:TextBox>
                    <br />
                    &nbsp;<br />
                    &nbsp;
                        <asp:Label ID="Label26" runat="server" Width="228px" Text="Puesto:"></asp:Label>
                    &nbsp;&nbsp;<asp:Label ID="lblHoraJornada_Recategorizacion" runat="server" Width="70px" Text="Horas:"></asp:Label>
                    <br />
                    &nbsp;

                        <asp:TextBox CssClass="textbox1" ID="txtPuesto_Recategorizacion" Width="70px" MaxLength="7" runat="server" TabIndex="8" disabled="disabled"></asp:TextBox>
                    &nbsp;<asp:TextBox CssClass="textbox1" ID="txtPuestoDescripcion_Recategorizacion" Width="146px" MaxLength="500" runat="server" TabIndex="3" disabled="disabled"></asp:TextBox>
                    &nbsp;<input type="text" id="txtHoraJornada_Recategorizacion" style="width: 50px" maxlength="2" value="" class="textbox1" tabindex="4"><br />
                    &nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                <br />
                    &nbsp;
                <asp:Label ID="Label27" runat="server" Width="165px" Text="Fecha Movimiento:"></asp:Label>



                    <asp:Label ID="Label28" runat="server" Width="150px" Text="Folio CIT:"></asp:Label>
                    <br />
                    &nbsp;
                <input class="textbox1 placeholder" type="text" id="placeholderBaja_Recategorizacion" style="width: 150px" placeholder="DD/MM/AAAA" maxlength="10" tabindex="4">
                    &nbsp;
                        <asp:TextBox CssClass="textbox1" ID="txtFolioDocumentoCIT_Recategorizacion" Width="146px" MaxLength="20" runat="server" TabIndex="6"></asp:TextBox>

                    <br />

                </div>
            </div>
            &nbsp;
            <input type="button" id="btnGuardarRecategorizacion" class="button1" value="Guardar Recategorizacion" />

            <input type="button" id="btnLimpiarMovimiento_Pop_Recategorizacion" class="button1" value="Limpiar" />
            <input type="button" id="btnRegresar_Recategorizacion" class="button1" value="Regresar" /><br />
            &nbsp;
                <br />

        </div>




        <asp:HiddenField ID="HiddenField_puesto" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cveRecurso_Vacante" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cveRecurso_Ocupado" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cveNivel_Educativo" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cveNivel_Educativo_Plaza" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_Horas_Plaza" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_codnivpu" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvezon" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvenivpl" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvepuesto_equivalencia" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvepuesto_equivalencia_compactacion" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_codnivpu_compactacion" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvepuesto_equivalencia_descompactacion" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_cvpuespu" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_Horas_Plaza_Descompactacion" runat="server"></asp:HiddenField>
        <asp:HiddenField ID="HiddenField_codnivpu_descompactacion" runat="server"></asp:HiddenField>

    </form>
</body>
</html>
