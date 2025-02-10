var tipo ="";
var filtro = '';
var conceptos = '';
var canceladas = '';
var contplazas = 0;
$(document).ready(function () {

    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = 'Costo'; }
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = 'numemppl:27881,21581' }//cvetpl:ADMON|cvepuepl:BAA3001|
    if ($_GET('conceptos') != null) {
        conceptos = $_GET('conceptos');
    } else { conceptos = '' }

    if ($_GET('canceladas') != null) {
        canceladas = $_GET('canceladas');
    } else { canceladas = '' }
    if ($_GET('btntipo') != null) {
        btntipo = $_GET('btntipo');
    } else { btntipo = '' }

    $('#btnExcel').linkbutton({ disabled: false });

    $('#btnRegresar').bind('click', function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", "filtro=" + filtro + "&btntipo=" + btntipo); }
        else {
            IR_PAGINA("costeo.aspx", "btntipo=" + btntipo);
            //window.location("costeo.aspx?btntipo=" + btntipo)            
        }
    });

    $('#btnExcel').bind('click', function () {
        $("#dgcosto").jqxGrid('exportview', 'xlsx', 'jqxGrid');
    });

    CARGAR_DATOS();
});

function CARGAR_DATOS() {
    var parametros = {};
    parametros.tipocosto = tipo;
    parametros.filtro = filtro,
    parametros.conceptos = conceptos,
    parametros.canceladas = canceladas
    $.ajax({
        type: "POST",
        url: "funsiones.aspx/proceso_costeo",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(parametros),
        cache: "false",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "1") {
                obj1 = $.parseJSON(data.d[0]);
                obj2 = $.parseJSON(data.d[1]);
                obj3 = $.parseJSON(data.d[2]);
                contplazas = data.d[3];

                var source =
                   {
                    localdata: obj3,
                    datatype: "json",                
                 };
                var dataAdapter = new $.jqx.dataAdapter(source);
                $('#dgcosto').jqxGrid({
                    source: dataAdapter,
                    width: "90%",
                    height:"600px",
                    altrows: true,
                    sortable: true,
                    groups: ['Plaza'],
                    groupable: true,
                    columns: [
                        { text: 'Plaza', datafield: 'Plaza', width: 90, cellsalign: 'center', align: 'center' },
                        { text: 'Nombre', datafield: 'Nombre', width: 300, cellsalign: 'left', align: 'center'  },
                        { text: 'Tipo', datafield: 'Tipo', width: 50, cellsalign: 'center', align: 'center' },
                        { text: 'Concepto', datafield: 'Concepto', width: 80, cellsalign: 'center', align: 'center' },
                        { text: 'Gasto', datafield: 'Gasto', width: 70, cellsalign: 'center', align: 'center' },
                        { text: 'Descripcion', datafield: 'Descripcion', width: 250, cellsalign: 'left', align: 'center', },
                        { text: 'Costo Anual', datafield: 'CostoAnual', width: 150, cellsalign: 'right', align: 'center', cellsformat: 'c2' },
                        { text: 'TipoPago', datafield: 'TipoPago', width: 150, cellsalign: 'center', align: 'center' },                        
                        { text: 'Quincena de Aplicación', datafield: 'QnaAplica', width: 180, align: 'center', cellsalign: 'center' },
                    ]
                });
            }
            else { $.messager.alert('Error', "No existen datos a costear", 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {

            alert('Not connect: Verify Network.');

        } else if (jqXHR.status == 404) {

            alert('Requested page not found [404]');

        } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500].');

        } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

        } else if (textStatus === 'timeout') {

            alert('Time out error.');

        } else if (textStatus === 'abort') {

            alert('Ajax request aborted.');

        } else {

            alert('Uncaught Error: ' + jqXHR.responseText);

        }
    });
}