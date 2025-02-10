//var tipo = '';
//var filtro = '';
//var conceptos = '';
//var canceladas = '';
var contplazas = 0;
$(document).ready(function () {
    var tipo = "", filtro = "", canceladas = "", conceptos = "", btntipo="";
    if ($_GET('tipo') != null) {
        tipo = $_GET('tipo');
    } else { tipo = ''; }
    if ($_GET('filtro') != null) {
        filtro = $_GET('filtro');
    } else { filtro = '' }//cvetpl:ADMON|cvepuepl:BAA3001|
    if ($_GET('conceptos') != null) {
        conceptos = $_GET('conceptos');
    } else { conceptos = '' }

    if ($_GET('canceladas') != null) {
        canceladas = $_GET('canceladas');
    } else { canceladas = '' }
    if ($_GET('btntipo') != null) {
        btntipo = $_GET('btntipo');
    } else { btntipo = '' }


    $('#btnExcel').bind('click', function () {
        if (tipo == 'Proyeccion') { $('#dgcosto').datagrid('toExcel', 'Proyeccion.xls'); }
        else {
            $('#dgcosto').datagrid('toExcel', 'Costo.xls');
        }
    });

    //$('#dgcosto').datagrid({
    //   url: "ListarProceso.aspx?tipo=" + tipo + "&filtro=" + filtro + "&conceptos=" + conceptos+ "&canceladas=" + canceladas
    //});

    $('#btnExcel').linkbutton({ disabled: false });

    $('#btnRegresar').bind('click', function () {
        if (tipo == 'Proyeccion')
        { IR_PAGINA("proyeccion.aspx", "filtro="+filtro+"&btntipo=" + btntipo); }
        else {
            IR_PAGINA("costeo.aspx", "btntipo=" + btntipo);
            //window.location("costeo.aspx?btntipo=" + btntipo)            
        }
    });

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
                $('#dgdatos').datagrid({
                    data: obj1,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    autoRowHeight: false,
                    striped: true,
                    pageSize: 50,
                    onClickRow: function () {
                        if (contplazas != "1")
                            var fields = $('#dgdatos').datagrid('getColumnFields', true).concat($('#dgdatos').datagrid('getColumnFields', false));
                            rows = $('#dgdatos').datagrid('getSelected');
                            if (rows) {
                                var filobj2 = jQuery.grep(obj2, function (Calendario, i) {
                                    return Calendario.Plaza == rows[fields[0]];
                                });
                                var filobj3 = jQuery.grep(obj3, function (Costo, i) {
                                    return Costo.Plaza == rows[fields[0]];
                                });
                                cargar_detalle(filobj2, filobj3);
                            }
                      }
                });
                if (contplazas == "1")
                 {cargar_detalle(obj2, obj3);}
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
});

function cargar_detalle(obj2, obj3)
{
    $('#dgcalendario').datagrid({
        data: obj2,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 50
    });
    $('#dgcosto').datagrid({
        data: obj3,
        pagination: false,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        autoRowHeight: false,
        striped: true,
        pageSize: 50
    });
   
}



