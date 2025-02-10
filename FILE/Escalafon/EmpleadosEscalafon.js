$(document).ready(function () {
    $('#btnRegresar').hide();
    $('#wReporte').window('close');

    $('#btnRegresar').bind('click', function () {
        $('#btnPDF').hide();
        $('#btnVacante').show();
        $('#btnRegresar').hide();
        
        $('#escalafonVacancias').show();
        $('#escalafonActivos').hide();
        $('#divReport').hide();
        $('#btnProceso').hide();

        $('#dgvEscalafonActivos').datagrid('loadData', []);
    });

    var txtEscalafonVacantes = $('#IpBuscar');
    txtEscalafonVacantes.textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13 && txtEscalafonVacantes.val() != '') {
            CARGAR_DATOS_EMPLEADOS_VACANCIAS('#dgveEscalafonVacancias', txtEscalafonVacantes.val());
        }
    });

    $('#btnBuscar').bind('click', function () {
        if (document.getElementById('IpBuscar').value != '')
        { CARGAR_DATOS_EMPLEADOS_VACANCIAS('#dgveEscalafonVacancias', document.getElementById('IpBuscar').value ); }
    });

    $('#dgveEscalafonVacancias').datagrid({
        onDblClickRow: function () {
            var row = $('#dgveEscalafonVacancias').datagrid('getSelected');
            if (row != null) {
                CARGAR_DATOS_EMPLEADOS_ACTIVOS('#dgvEscalafonActivos', row.Adscripcion + "'" + ', ' + "'" + row.Puesto + "'" + ', ' + "'" + row.Descripcion_De_Puesto);
                $('#btnVacante').hide();
                $('#btnPDF').show();
                $('#escalafonVacancias').hide();
                $('#escalafonActivos').show();
                $('#btnRegresar').show();
                $('#btnProceso').show();
            }
        }
    });

    $('#btnPDF').bind('click', function () {
        if ($('#dgvEscalafonActivos').datagrid('getRows').length > 0) {
            acceptit();
            $('#divReport').show();
        }
        $('#wReporte').window('open');
    });

    $('#btnProceso').bind('click', function () {
        Procesar();
    });
});


function Procesar()
{
    $.messager.confirm({
        title: 'Procesar',
        msg: 'Procesar a los Empleados',
        ok: 'Si',
        cancel: 'No',
        fn: function (r) {
            if (r) {
                ProcesarEmpleados();
                //alert('confirmed: ' + r);
            }
        }
    });
}

function ProcesarEmpleados()
{
    var Vacanate = "";
    var rowVacancia = $('#dgveEscalafonVacancias').datagrid('getSelected');
    Vacanate = rowVacancia.Empleado;

    $.ajax({
        type: "POST",
        url: 'funciones.aspx/ProcesarEmpleados',
        data: JSON.stringify({ condicion: Vacanate }),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            $.messager.alert({
                title: 'Proceso',
                msg: data.d,
                ok: 'Ok',
            });
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

function CARGAR_DATOS_EMPLEADOS_VACANCIAS(dgcontrol, condicion) {
    var parametros = {};
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Datos_Empleados_Vacancias',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                obj = $.parseJSON(data.d[0]);
            }
            if (obj != undefined) {
                $(dgcontrol).datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    onClickRow: function () {
                        // fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
                        //rows = $(dgcontrol).datagrid('getSelected');
                        //if (rows) {
                        //    $('#btnRegresar').hide();
                        //    $('#escalafonVacancias').show();
                        //    $('#escalafonActivos').hide();
                        //    //$('#btnEliminarDoc').linkbutton('enable');
                        //}
                    },
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    { $('#loading').hide(100); }
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

function CARGAR_DATOS_EMPLEADOS_ACTIVOS(dgcontrol, condicion) {
    var parametros = {};
    parametros.condicion = condicion;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Datos_Empleados_Activos',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: true,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                obj = $.parseJSON(data.d[0]);
            }
            if (obj != undefined) {
                $(dgcontrol).datagrid({
                    data: obj,
                    pagination: false,
                    enableFilter: false,
                    rownumbers: true,
                    singleSelect: true,
                    striped: true,
                    //onClickRow: function () {
                    //    // fields = $('#dgdoc').datagrid('getColumnFields', true).concat($('#dgdoc').datagrid('getColumnFields', false));
                    //    rows = $(dgcontrol).datagrid('getSelected');
                    //    if (rows) {
                    //        $('#btnRegresar').show();
                    //        //$('#btnVacante').show();
                    //        $('#escalafonVacancias').show();
                    //        $('#escalafonActivos').hide();
                    //        //$('#btnEliminarDoc').linkbutton('enable');
                    //    }
                    //},
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    error: function (err) {
                        $('#loading').hide(100);
                        $.messager.alert('Error', err.statusText, 'error');
                    },
                    complete: function ()
                    {
                        //MODIFICAR_DATAGRID();
                        $('#loading').hide(100);
                    }
                });
            }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            //MODIFICAR_DATAGRID();
            $('#loading').hide(100);
           
        }
    });
}

function CARGAR_REPORTE()
{
    if ($('#dgvEscalafonActivos').datagrid('getRows').length > 0) {
        if (endEditing()) {
            $('#dgvEscalafonActivos').datagrid('acceptChanges');
        }
    }
    var Vacanate = [];
    var rowVacancia = $('#dgveEscalafonVacancias').datagrid('getSelected');

    Vacanate.push({
        NumEmpleado: rowVacancia.Empleado,
        puesto: rowVacancia.Puesto
    });

    $.ajax({
        type: "POST",
        url: 'ReporteEscalafonVacancia.aspx/CargarDatatable',
        data: JSON.stringify({ Vacanate: Vacanate }),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            console.log(data);
            $('.mensaje').html(data);
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
    
    var src = "ReporteEscalafonVacancia.aspx" + "";
     
    var iframe = '<iframe id="reportFrame" width="100%" height="100%" frameborder="0" src="' + src + '" allowfullscreen></iframe>';
    $("#divReport").html(iframe);
}

var editIndex = undefined;

function endEditing() {
    if (editIndex == undefined) { return true }
    if ($('#dgvEscalafonActivos').datagrid('validateRow', editIndex)) {
        $('#dgvEscalafonActivos').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function onClickCell(index, field) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#dgvEscalafonActivos').datagrid('selectRow', index)
                    .datagrid('beginEdit', index);
            var ed = $('#dgvEscalafonActivos').datagrid('getEditor', { index: index, field: field });
            if (ed) {
                ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
            }
            editIndex = index;
        } else {
            setTimeout(function () {
                $('#dgvEscalafonActivos').datagrid('selectRow', editIndex);
            }, 0);
        }
    }
    
}

var puesto = ""
function onEndEdit(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'Nombre'
    });
    if (row.Puesto != puesto) {
        puesto = row.Puesto;
        return 'background-color:#6293BB;color:#fff;font-weight:bold;';
    }
    if (row.length - 1)
    { puesto = "" }
    //row.productname = $(ed.target).combobox('getText');
}

function acceptit() {
    if ($('#dgvEscalafonActivos').datagrid('getRows').length > 0) {
        if (endEditing()) {
            $('#dgvEscalafonActivos').datagrid('acceptChanges');
        }
    }

    var parametros = [];
    var Vacanate = [];
    var des = null;
    var Preferencia = 0;

    var puestoAnt = "";
    var puestoNue = "";

    var row = $('#dgvEscalafonActivos').datagrid('getRows');
    var rowVacancia = $('#dgveEscalafonVacancias').datagrid('getSelected');

    puestoAnt = row[0]['Puesto'];
    puestoNue = rowVacancia.Puesto;

    for (var i = 0; i < row.length; i++) {

        if (row[i]['Descripcion'] == "")
        { des = null }
        else
        { des = row[i]['Descripcion'] }

        if ( i == 0)
        { Preferencia = 1; }
        else if (row[i]['Puesto'] != row[i - 1]['Puesto'])
        { Preferencia = 1; }
        else
        { Preferencia = 0; }

        parametros.push({
            fkNumEmpleadoVacante: rowVacancia.Empleado,
            fkNumEmpleadosActivo: row[i]["Empleado"],
            Nombre: row[i]['Nombre'],
            Rfc: row[i]['Rfc'],
            Plaza: row[i]['Plaza'],
            Puesto: row[i]['Puesto'],
            Descripcion_De_Puesto: row[i]['Descripcion_De_Puesto'],
            Adscripcion: row[i]['Adscripcion'],
            Descripcion_De_Adscripcion: row[i]['Descripcion_de_Adscripcion'],
            Pagaduria: row[i]['Pagaduria'],
            Descripcion_De_Pagaduria: row[i]['Descripcion_De_Pagaduria'],
            Vigencia_inicial: row[i]['Vigencia_Inicial'],
            Estatus: row[i]['Estatus'],
            Fecha_Ingreso: row[i]['FechaIngreso'],
            Situacion: row[i]['Situacion'],
            Años: row[i]['Años'],
            Meses: row[i]['Meses'],
            Dias: row[i]['Dias'],
            Descripcion: des,
            Preferencia: Preferencia,
            PuestoNue: puestoNue,
            Titulacion: row[i]['Titulacion'],
            Proceso: true
        });

        if (i < row.length - 1) {
            if (row[i]['Puesto'] != row[i + 1]['Puesto']) {
                //puestoAnt = row[i]['Puesto'];
                puestoNue = row[i]['Puesto'];
            }
        }
    }
    
    Vacanate.push({
        numeroEmpleado: rowVacancia.Empleado,
        nombre: rowVacancia.Nombre,
        rfc: rowVacancia.rfc,
        puesto: rowVacancia.Puesto,
        plaza: rowVacancia.Plaza,
        descripcionDelPuesto: rowVacancia.Descripcion_De_Puesto,
        adscripcion: rowVacancia.Adscripcion,
        descripcionDeAdscripcion: rowVacancia.Descripcion_de_Adscripcion,
        pagaduria: rowVacancia.Pagaduria,
        descripcionDePagaduria: rowVacancia.Descripcion_De_Pagaduria,
        dias: rowVacancia.Dia,
        meses: rowVacancia.Mes,
        años: rowVacancia.Año
    });

    $.ajax({
        type: "POST",
        url: 'funciones.aspx/EmpleadosEscalafonVacantes',
        data: JSON.stringify({ Activos: parametros, Vacanate: Vacanate }),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            console.log(data);
            $('.mensaje').html(data);
        },

        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
            CARGAR_REPORTE();
        }
    });
}

function onLoadSuccess(){
    $(this).datagrid('enableDnd');
}

function rowStyler(index, row) {

    if (row.Puesto != puesto) {
        puesto = row.Puesto;
        return 'background-color:#6293BB;color:#fff;font-weight:bold;';
    }
    if(row.length - 1)
    { puesto = "" }
}

function groupFormatter(value, rows) {
    return value + ' - ' + rows.length + ' Item(s)';
}
