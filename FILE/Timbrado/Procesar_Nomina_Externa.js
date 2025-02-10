var Quin = "";
var TipoNom = "";
$(document).ready(function () {
    var quin = $_GET('Quin');
    if (quin != undefined) { Quin = quin; }
    else { Quin = ''; }
    var tiponom = $_GET('TN');
    if (tiponom != undefined) { TipoNom = tiponom; }
    else { TipoNom = ''; }

    document.getElementById('lblquin').innerHTML = "Quincena " + Quin + " a Procesar"

    $('#xlsNom').filebox({
        buttonText: 'Examinar',
        prompt: 'Seleccione el Archivo',
        accept: '*.xlsx,*.xls',
        multiple: false,
        onChange: function (newValue, oldValue) {
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var data = evt.target.result;

                    var NombreArchivo = files[0].name;
                    var NombreArchivo = NombreArchivo.replace('.xls', '');
                    var NombreArchivo = NombreArchivo.replace('.xlsx', '');
                    
                    var workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    workbook.SheetNames.forEach(sheet => {
                        let rowObject = XLSX.utils.sheet_to_row_object_array(
                            workbook.Sheets[sheet]
                        );
                        if (rowObject.length > 0) {
                            var jsonObject = JSON.stringify(rowObject);
                            sessionStorage.setItem('JsonDataNom', jsonObject);
                        }
                    });
                }               
                reader.readAsBinaryString(files[0]);
            }
        }
    });

    $('#xlsInd').filebox({
        buttonText: 'Examinar',
        prompt: 'Seleccione el Archivo',
        accept: '*.xlsx,*.xls',
        multiple: false,
        onChange: function (newValue, oldValue) {
            var files = $(this).next().find('input[type=file]')[0].files;
            if (files && files[0]) {
                var reader = new FileReader();
                reader.onload = function (evt) {
                    var data = evt.target.result;

                    var NombreArchivo = files[0].name;
                    var NombreArchivo = NombreArchivo.replace('.xls', '');
                    var NombreArchivo = NombreArchivo.replace('.xlsx', '');
                   
                    var workbook = XLSX.read(data, {
                        type: "binary"
                    });
                    workbook.SheetNames.forEach(sheet => {
                        let rowObject = XLSX.utils.sheet_to_row_object_array(
                            workbook.Sheets[sheet]
                        );
                        if (rowObject.length > 0) {
                            var jsonObject = JSON.stringify(rowObject);
                            sessionStorage.setItem('JsonDataInd', jsonObject);
                        }
                    });
                }
                reader.readAsBinaryString(files[0]);
            }
        }
    });

    $('#btnGuardar').bind('click', function () {       
        GUARDAR_ARCHIVO('#btnGuardar');
    });

    $('#btnInicial').bind('click', function () {
        IR_PAGINA('Inicial_Timbrado.aspx', 'Quin=' + Quin + '&TN=');
    });

    $('#btnRegresar').bind('click', function () {
        IR_PAGINA('Inicial_Timbrado.aspx', 'Quin=' + Quin + '&TN=' + TipoNom);
    });

    $('#btnLimpiar').bind('click', function () {
        LIMPIAR();
    }) ;

    Llenar_ComboBox("");

    CARGAR_GRID();
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

function GUARDAR_ARCHIVO(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else {     
        var fileNom = $('#xlsNom').next().find('.textbox-value')[0];
        var nombreNom = $('#xlsNom').next().find('input[type=file]')[0].files;

        var fileInd = $('#xlsInd').next().find('.textbox-value')[0];
        var nombreInd = $('#xlsInd').next().find('input[type=file]')[0].files;

        if ($('#cboorganismo').combobox('getValue') == "x") { $.messager.alert('Error', 'Falta Seleccionar el Organismo', 'error');  }
        else
            if ((fileNom == null) || (fileNom.files.length == 0))  {$.messager.alert('Error', 'Falta Seleccionar el Archivo de Nómina', 'error');  }
            else
                if ((nombreInd == null) || (fileInd.files.length == 0)) {  $.messager.alert('Error', 'Falta Seleccionar el Archivo de Indicadores', 'error');  }
            else {
                    $('#loading').show();
                   
                    var fileNom = fileNom.value;
                    var NomArcNomina = nombreNom[0].name;
                    var NomArcNomina = fileNom.replace('.xls', '');
                    var NomArcNomina = fileNom.replace('.xlsx', '');          

                    var fileInd = fileInd.value;
                    var NomArcInd = nombreInd[0].name;
                    var NomArcInd = fileInd.replace('.xls', '');
                    var NomArcInd = fileInd.replace('.xlsx', '');


            var data = {
                Obj: {   
                    Organismo: $('#cboorganismo').combobox('getValue'),
                    Quincena: Quin,
                    NomArcNomina: NomArcNomina,
                    DatosNom: sessionStorage.getItem('JsonDataNom'),
                    NomArcInd:NomArcInd,                                       
                    DatosInd: sessionStorage.getItem('JsonDataInd'),
                }
            }
            $.ajax({
                type: "POST",
                url: "Fun_Timbrado.aspx/Cargar_Nomina_Externa",
                data: JSON.stringify(data),
                async: true,
                cache: false,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "0") {
                        $.messager.alert('Información', data.d[1], 'info');

                        DISEÑO_GRID(data.d[2],"Si");
                    }
                    else { $.messager.alert('Error', data.d[1], 'error'); }
                },
                error: function (er) {
                    $('#loading').hide();
                    $.messager.alert('Error', er.responseJSON.Message, 'error');
                },
                complete: function () {
                    $('#loading').hide(100);
                }
            });
        }
    }
}

function CARGAR_GRID() {
    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Listar_Nominas_Externas_Cargadas',
       // data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d[0] != "1") {
                //var obj = $.parseJSON(data.d[2]);
                DISEÑO_GRID(data.d[2], "Si");

            }
            else {
                //$.messager.alert('Error', data.d[1], 'error');
                DISEÑO_GRID("", "Si");
            }
        },
        error: function (err) {
            $.messager.alert('Error', err.statusText, 'error');
        }
    });
}

function DISEÑO_GRID(DataObj,MostrarGrid) {  

    var obj = "";
    (DataObj!="")?obj = $.parseJSON(DataObj):obj=null;

    (MostrarGrid == "Si") ? $('#dtotales').show() : $('#dtotales').hide();    
    $('#dgtotales').datagrid({
        pagination: false,
        scroll: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        data: obj,
        columns: [[
            { field: 'tipo_nomina', title: 'Clave', width: 80, align: 'center', halign: 'center' },
            { field: 'descripcion', title: 'Descripción', width: 200, align: 'left', halign: 'center' },
            { field: 'contador', title: 'Contador', width: 80, align: 'center', halign: 'center' }          
        ]]
    });
}

function Llenar_ComboBox(strfiltro) {
    var parametros = {};
    parametros.tabla = 'Timbrado_cat_Tipo_Nomina';
    parametros.filtro = strfiltro;

    $.ajax({
        type: "POST",
        url: 'Fun_Timbrado.aspx/Listar_Nominas_Externas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: true,
        cache: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.d[0] != "1") {
                var obj = $.parseJSON(data.d[2]);
                $('#cboorganismo').combobox({
                    data: obj,
                    valueField: 'campo',
                    textField: 'descripcion',
                    editable: false
                });
            } else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {$.messager.alert('Error', err.statusText, 'error'); }
    });
}

function LIMPIAR() {
    $('#loading').show();
    $('#cboorganismo').combobox('setValue', 'x');
    $('#xlsNom').filebox('clear');
    $('#xlsInd').filebox('clear');
    $('#loading').hide();
}

