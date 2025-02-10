
var modulo = "";
var quincena = "";
var condicion = "";
var checkedRows = [];
var chkRowsDoc = [];
var chkRowsDocDP = [];

$(document).ready(function () {
    $.extend($.fn.datagrid.methods, {
        getChecked: function (jq) {
            var rr = [];
            var rows = jq.datagrid('getRows');
            jq.datagrid('getPanel').find('div.datagrid-cell-check input:checked').each(function () {
                var index = $(this).parents('tr:first').attr('datagrid-row-index');
                rr.push(rows[index]);
            });
            return rr;
        }
    });

    CARGAR_QUINCENAS("#cboquin");
   
  
    $('#btnLimpiar').bind('click', function () {       
        $('#txtobservaciones').textbox('setValue', '');       
        $('#dgdoc').datagrid('loadData', { "total": 0, "rows": [] });
        $('#btnGuardar').linkbutton({ disabled: false });
        quincena = "";     
        CARGAR_DATOS('#dg' + modulo, '');
    });
    
    $('#btnLDoc').bind('click', function () {
        $('#cboquin').combobox('setValue', 'x');                      
        $('#txtval').textbox('setValue', '');
        $('#cbocon').combobox('setValue', 'like');
        $('#cbocam').combobox('setValue', 'nomcommp');
        quincena = "";
        CARGAR_DATOS('#dg' + modulo, '');
    });

    $('#btnMP').bind('click', function () {
        modulo = "MP";
        BUSCAR_DOCUMENTO('MP');
    });
    $('#btnMC').bind('click', function () {
        modulo = "MC";
        BUSCAR_DOCUMENTO('MC');
    });
    $('#btnME').bind('click', function () {
        modulo = "ME";
        BUSCAR_DOCUMENTO('ME');
    });
    $('#btnDP').bind('click', function () {
        modulo = "DP";
        BUSCAR_DOCUMENTO('DP');
    });

    $('#brnADoc').bind('click', function () {
        $('#txtobservaciones').textbox({ readonly: false });                    
        CARGAR_DOCUMENTOS_SELECCIONADOS('#dgdoc');
    });

    $("#cboquin").combobox({
        onSelect: function (rec) {
            if (rec.valor != "x") {
                //FORMAR_CONDICION($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
                quincena = rec.valor;
                CARGAR_DATOS('#dg' + modulo, '');             
            }
        },
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {                     
            FORMAR_CONDICION($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue'));
        }
    });
    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($('#cbocam').combobox('getValue'), $('#cbocon').combobox('getValue'), $('#txtval').textbox('getValue')); });

    $('#dgdoc').datagrid({      
        pagination: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,        
        width: "100%",
        onCheck: onCheckDoc,
        onUncheck: onUncheckDoc,       
        onClickRow: function (index, row) {
            $('#dgdoc').datagrid('checkRow', index);            
             $('#txtobservaciones').textbox('setValue', row.Obs) 
        },
        beforeSend: function () {
            $('#loading').show();
        },
        onCheckAll: function () {
            chkRowsDoc = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {
            chkRowsDoc = [];
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
    
    $('#btnActualizardocmp').bind('click', function () {              
        var filas = $('#dgdoc').datagrid('getSelected');
        if (filas != null) {
            var rowIndex = $("#dgdoc").datagrid("getRowIndex", filas);
            $('#dgdoc').datagrid('updateRow', {
                index: rowIndex,
                row: {Obs: $('#txtobservaciones').textbox('getValue')}
            });
            $('#dgdoc').datagrid('unselectRow', rowIndex);
            $('#dgdoc').datagrid('uncheckRow', rowIndex);
        }
        else
        {
          for (var j = 0; j < chkRowsDoc.length; j++) {   
            for (var i = 0; i < $('#dgdoc').datagrid('getData').total; i++) {                       
                    if (chkRowsDoc[j].Documento == $('#dgdoc').datagrid('getRows')[i].Documento)
                        $('#dgdoc').datagrid('updateRow', {
                            index: i,
                            row: { Obs: $('#txtobservaciones').textbox('getValue') }
                        });
                    $('#dgdoc').datagrid('unselectRow', i);                  
                }
            }       
       }
    });
  
    $('#btnquitarsel').bind('click', function () {
        var dg = $('#dgdoc');
        //var rows = dg.datagrid('getRows');
        ////var count = $('#dgdoc').datagrid('getSelections').length;
        //for (var j = 0; j <= rows.length-1; j++) {
        //    var index = dg.datagrid('getRowIndex', rows[j]);
        //    $('#dgdoc').datagrid('deleteRow', index);
        //}
        var filas = dg.datagrid('getSelected');
        if (filas != null) {
            var rowIndex = dg.datagrid("getRowIndex", filas);
            dg.datagrid('deleteRow', rowIndex);
        }
        else { dg.datagrid('loadData', { "total": 0, "rows": [] }); }
    });

    $('#btnGuardar').bind('click', function () {
        APLICAR_OBSERVACINES('#btnGuardar');
    });
});


function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (modulo == 'MP') {
            if (checkedRows[i].numdocmp == row.numdocmp) {
                return
            }
        }
        if (modulo == 'MC') {
            if (checkedRows[i].numdocmc == row.numdocmc) {
                return
            }
        }
        if (modulo == 'ME') {
            if (checkedRows[i].numdocme == row.numdocme) {
                return
            }
        }
        if (modulo == 'DP') {
            if (checkedRows[i].numdocdp == row.numdocdp) {
                return
            }
        }
    }
    checkedRows.push(row);
}
function onUncheck(index, row) {
    var dg = $(this);
    for (var i = 0; i < checkedRows.length; i++) {
        if (modulo == 'MP') {
            if (checkedRows[i].numdocmp == row.numdocmp) {
                checkedRows.splice(i, 1);
                dg.datagrid('unselectRow', index);
                return;
            }
        }
        if (modulo == 'MC') {
            if (checkedRows[i].numdocmc == row.numdocmc) {
                checkedRows.splice(i, 1);
                dg.datagrid('unselectRow', index);
                return;
            }
        }
        if (modulo == 'ME') {
            if (checkedRows[i].numdocme == row.numdocme) {
                checkedRows.splice(i, 1);
                dg.datagrid('unselectRow', index);
                return;
            }
        }
        if (modulo == 'DP') {
            if (checkedRows[i].numdocdp == row.numdocdp) {
                checkedRows.splice(i, 1);
                dg.datagrid('unselectRow', index);
                return;
            }
        }
    }
}
function onLoad(data) {
    var dg = $(this);
    var rows = data.rows;
    for (var i = 0; i < rows.length; i++) {
        var index = i;
        var row = rows[i];
        (function () {
            for (var i = 0; i < checkedRows.length; i++) {
                if (modulo == 'MP') {
                    if (checkedRows[i].numdocmp == row.numdocmp) {
                        dg.datagrid('checkRow', index);
                        return;
                    }
                }
                else {
                    if (checkedRows[i].numdocmc == row.numdocmc) {
                        dg.datagrid('checkRow', index);
                        return;
                    }
                }
            }
        })();
    }
}

function onCheckDoc(index, row) {
    for (var i = 0; i < chkRowsDoc.length; i++) {       
            if (chkRowsDoc[i].Documento == row.Documento) {
                return
            }        
    }
    chkRowsDoc.push(row);
}
function onUncheckDoc(index, row) {
    var dg = $(this);
    for (var i = 0; i < chkRowsDoc.length; i++) {       
        if (chkRowsDoc[i].Documento == row.Documento) {
                chkRowsDoc.splice(i, 1);
                dg.datagrid('unselectRow', index);
                return;
            }
    }
}

function BUSCAR_DOCUMENTO(modulo)
{          
    if (modulo == 'MP') {
        $('#divmp').show();
        $('#divmc').hide();
        $('#divdp').hide();
        $('#divme').hide();
    }    
        if (modulo == 'MC') {
            $('#divmc').show();
            $('#divmp').hide();
            $('#divdp').hide();
            $('#divme').hide();
    }
    if (modulo == 'ME') {
        $('#divme').show();
        $('#divmp').hide();
        $('#divdp').hide();
        $('#divdc').hide();
    }
            if (modulo == 'DP') {
                $('#divdp').show();
                $('#divmp').hide();
                $('#divmc').hide();
                $('#divme').hide();
        }

        CARGAR_DATOS('#dg' + modulo,'');
        CARGAR_CAMPOSBUSQUEDA_COL('#dg' + modulo, '#cbocam', 1);

        windows("#winemp", "100%", 500, false, "Movimientos");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus(); 
}

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

function CARGAR_DATOS(dgcontrol,condicion) {
    $(dgcontrol).datagrid({
        url: "Listar_Documentos.aspx?modulo=" + modulo + "&busqueda=" + condicion + "&quincena=" + quincena,
        pagination: true,
        rownumbers: true,
        singleSelect: false,
        striped: true,
        checkOnSelect: false,
        selectOnCheck: false,
        pageSize: 20,
        width: "100%",
        onCheck: onCheck,
        onUncheck: onUncheck,
        onLoadSuccess: onLoad,
        onClickRow: function (index, row) {
            $(dgcontrol).datagrid('checkRow', index);           
        },          
        beforeSend: function () {
            $('#loading').show();
        },
        onCheckAll: function () {
            checkedRows = $(this).datagrid('getRows');
        },
        onUncheckAll: function () {
            checkedRows = [];
        },        
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function FORMAR_CONDICION(objcam, objcon, objval) {
    var condicion = "";
    if (objval != '') {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    CARGAR_DATOS('#dg' + modulo, condicion);
}

function CARGAR_DOCUMENTOS_SELECCIONADOS(dgcontrol)
{
    $(dgcontrol).datagrid('loadData', { "total": 0, "rows": [] });
    for (var i = 0; i < checkedRows.length; i++) {
        if (modulo == 'MP')
        {
            $(dgcontrol).datagrid('insertRow', {
                index: i,
                row: {
                    id:i,
                    Documento: checkedRows[i].numdocmp,
                    quiact: checkedRows[i].quiactmp,
                    anoact: checkedRows[i].anoactmp,
                    Plaza: checkedRows[i].numplamp,
                    Empleado: checkedRows[i].numempmp,
                    Nombre: checkedRows[i].nomcommp,
                    CveMov: checkedRows[i].cvemovmp,
                    DesMov: checkedRows[i].desmovmp,
                    Obs: checkedRows[i].observmp,
                }
            });
        }        
        if (modulo == 'MC') 
        {
            $(dgcontrol).datagrid('insertRow', {
                index: i,
                row: {
                    id: i,
                    Documento: checkedRows[i].numdocmc,
                    quiact: checkedRows[i].quiactmc,
                    anoact: checkedRows[i].anoactmc,
                    Plaza: checkedRows[i].numplamc,
                    Empleado: checkedRows[i].numempmc,
                    Nombre: checkedRows[i].nomcommc,
                    CveMov: checkedRows[i].cvemovmc,
                    DesMov: checkedRows[i].desmovmc,
                    Obs: checkedRows[i].observamc,
                }
            });
        }
        if (modulo == 'ME') {
            $(dgcontrol).datagrid('insertRow', {
                index: i,
                row: {
                    id: i,
                    Documento: checkedRows[i].numdocme,
                    quiact: checkedRows[i].quiactme,
                    anoact: checkedRows[i].anoactme,
                    Plaza: checkedRows[i].numplame,
                    Empleado: checkedRows[i].numempme,
                    Nombre: checkedRows[i].nomcomme,                    
                    Obs: checkedRows[i].observa,
                }
            });
        }
        if (modulo == 'DP')
        {
            $(dgcontrol).datagrid('insertRow', {
                    index: i,
                    row: {
                        id: i,
                        Documento: checkedRows[i].numdoc,
                        quiact: checkedRows[i].quiactdp,
                        anoact: checkedRows[i].anoactdp,
                        Plaza: checkedRows[i].numpladp,
                        Empleado: checkedRows[i].numemp,
                        Nombre: checkedRows[i].nomcom,
                        CveMov: checkedRows[i].clamov,
                        DesMov: checkedRows[i].nombre,
                        Obs: checkedRows[i].observaciones,
                    }
                });
        }
    }
    checkedRows = [];
    condicion = " ";
    $(dgcontrol).datagrid('uncheckAll');
    $("#winemp").window('close');
    $('#btnGuardar').linkbutton({ disabled: false })
}

function APLICAR_OBSERVACINES(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var cadena = "", quincena="";
        var dg = $('#dgdoc');
        if ($('#cboquin').combobox('getValue') != "x") { quincena = $('#cboquin').combobox('getValue'); }

        if ($('#txtobservaciones').textbox('getValue') == "") { $.messager.alert('Error', 'falta la obsrvación', 'error'); }
        else {
            for (var j = 0; j < chkRowsDoc.length; j++) {
                if (chkRowsDoc[j].Documento != "") {
                    if (quincena == "") { cadena += chkRowsDoc[j].quiact + "_" + chkRowsDoc[j].anoact + ";" + chkRowsDoc[j].Documento + ";" + chkRowsDoc[j].Obs + "|"; }
                    else { cadena += quincena + ";" + chkRowsDoc[j].Documento + ";" + chkRowsDoc[j].Obs + "|"; }
                }
                else { cadena = ""; break; }
            }
            if (cadena != "") {
                cadena = cadena.substring(0, cadena.length - 1);

                var parametros = {};
                parametros.quincena = quincena;
                parametros.modulo = modulo;
                parametros.cadena = cadena;
                $.ajax({
                    type: "POST",
                    url: "Funciones.aspx/Actualizar_Observaciones",
                    data: JSON.stringify(parametros),
                    dataType: "json",
                    async: false,
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: function () {
                        $('#loading').show();
                    },
                    success: function (data) {
                        if (data.d[0] == "1") { $.messager.alert('Error', data.d[1], 'error'); }
                        else { $.messager.alert('Información', data.d[1], 'info'); }
                    },
                    error: function (er) {
                        $('#loading').hide();
                        $.messager.alert('Error', er.statusText, 'error');
                    },
                    complete: function () {
                        $('#loading').hide(100);
                    }
                });
            }
            else { $.messager.alert('Error', 'falta seleccionar el documento a cambiar modificacion', 'error'); }
        }
   }
}