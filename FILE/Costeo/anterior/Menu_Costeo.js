$(document).ready(function () {
    $('#btnCosteo').bind('click', function () {
        IR_PAGINA("Costeo.aspx", "");
    });
    $('#btnProyeccion').bind('click', function () {
        IR_PAGINA("Proyeccion.aspx", "");
    });
});