var editIndex = undefined;
var Indicadores;
var cont = 0;
var tipomov = "";
var numdoc = "";
var cvemov = "";
var checkedRows = [];
var tipoind = "";
var valnomina = "";
var nominasel = "";
var fechas = "";
var tipobloqueo = "";

var fechainicial = "",fechafinal="";
$(document).ready(function () {
   
   
    $('#btnNuevaCap').bind('click', function () { tipomov = "G"; VALIDAR_MULTINOMINA('#btnNuevaCap', 'NC'); });
    $('#btnEliModCap').bind('click', function () {  VALIDAR_MULTINOMINA('#btnEliModCap', 'MC'); });
    $('#btnRegresarModEli').bind('click', function () { REGRESAR_MODELI('#btnRegresarModEli'); });
    $('#btnlimpiarModEli').bind('click', function () { LIMPIAR_MODELI('#btnlimpiarModEli'); });
    $('#btnRegresarCap').bind('click', function () { REGRESAR_CAPTURA('#btnRegresarCap'); });
    $('#btnLimpiarCap').bind('click', function () { LIMPIAR_CAPTURA('#btnLimpiarCap'); });
    //$('#btnGuardarCap').bind('click', function () { GUARDAR_CAPTURA('#btnGuardarCap'); });
    $('#btnGuardarCap').bind('click', function () {
        if (tipomov == "G")
        {
           INCREMENTO_CONTADOR();
        }

        GUARDAR_CAPTURA_INSERT('#btnGuardarCap');
    });
    $('#btnModificar').bind('click', function () { tipomov = "M"; MODIFICAR_MOVIMIENTOS('#btnModificar') });
    $('#btnEliminar').bind('click', function () { tipomov = "E"; ELIMINAR_MOVIMIENTOS('#btnEliminar') });

    $('#btnCancelaDoc').bind('click', function () { $("#winEliminar").window('close'); $('#dgmov').datagrid('unselectAll'); });
    $('#btnDocumento').bind('click', function () { ELIMINAR('#btnDocumento', 'D'); });
    $('#btnFolio').bind('click', function () { ELIMINAR('#btnFolio', 'I'); });


    $('#btnAGIndP').bind('click', function () { AGREGAR_PERCEPCION('#btnAGIndP'); });
    $('#btnACIndP').bind('click', function () { ACEPTAR_PERCEPCION('#btnACIndP'); });
    $('#btnEIndP').bind('click', function () { ELIMINAR_PERCEPCION('#btnEIndP'); });

    $('#btnAGIndD').bind('click', function () { AGREGAR_DEDUCCIONES('#btnAGIndD'); });
    $('#btnACIndD').bind('click', function () { ACEPTAR_DEDUCCIONES('#btnACIndD'); });
    $('#btnEIndD').bind('click', function () { ELIMINAR_DEDUCCIONES('#btnEIndD'); });

    $('#btnAGIndA').bind('click', function () { AGREGAR_APORTACIONES('#btnAGIndA'); });
    $('#btnACIndA').bind('click', function () { ACEPTAR_APORTACIONES('#btnACIndA'); });
    $('#btnEIndA').bind('click', function () { ELIMINAR_APORTACIONES('#btnEIndA'); });

    $('#btnLSelInd').bind('click', function () { LIMPIAR_IND_SEL(); });
    $('#btnASelInd').bind('click', function () { ACEPTAR_IND_SEL(); });
    
    $('#txtvalplaza').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalplaza').textbox('getValue');
            if (vvalor != "") {
                    var vcampo = $('#cbocamplaza').combobox('getValue');
                    var vcondicion = $('#cboconplaza').combobox('getValue');
                    if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
                    else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
                }
                else { condicion = " "; }
            if (vcondicion == 'like') {
                sessionStorage.setItem('tipobusqueda', 'P');
                sessionStorage.setItem('vcampo', vcampo);
                sessionStorage.setItem('vcondicion', vcondicion);
                var text = $('#txtval');
                text.textbox('clear').textbox('textbox').focus();
                BUSCAR_DATOS('#btnBuscarPlaza', 'P', vcampo, condicion, vcondicion, vvalor);                
            }
            else { BUSCAR_EMPLEADO('P', condicion); }
            }        
    });
    $('#txtvalemp').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalemp').textbox('getValue');
            if (vvalor != "") {
                var vcampo = $('#cbocamemp').combobox('getValue');
                var vcondicion = $('#cboconemp').combobox('getValue');
                if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
                else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
            }
            else { condicion = " "; }

            if (vcondicion == 'like') {
                sessionStorage.setItem('tipobusqueda', 'E');
                sessionStorage.setItem('vcampo', vcampo);
                sessionStorage.setItem('vcondicion', vcondicion);
                var text = $('#txtval');
                text.textbox('clear').textbox('textbox').focus();
                BUSCAR_DATOS('#btnBuscarEmpleado', 'E', vcampo, condicion, vcondicion, vvalor);
            }
            else { BUSCAR_EMPLEADO('E', condicion); }
        }
    });

    $('#btnBuscarPlaza').bind('click', function () {
        sessionStorage.setItem('tipobusqueda', 'P');       
        BUSCAR_DATOS('#btnBuscarPlaza', 'P', '', '', '', '');
    });

   
    $('#btnBuscarEmpleado').bind('click', function () {
        sessionStorage.setItem('tipobusqueda', 'E');        
        BUSCAR_DATOS('#btnBuscarEmpleado', 'E', '', '', '', '');
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FORMAR_CONDICION('#cbocam', '#cbocon', '#txtval');

            if (sessionStorage.getItem('tipobusqueda') == "P") {                
                BUSCAR_DATOS('#btnBuscarPlaza', sessionStorage.getItem('tipobusqueda'), sessionStorage.getItem('vcampo'), sessionStorage.getItem('condicion'), sessionStorage.getItem('vcondicion'), $('#txtval').textbox('getValue'))}
            else { BUSCAR_DATOS('#btnBuscarEmpleado', sessionStorage.getItem('tipobusqueda'), sessionStorage.getItem('vcampo'), sessionStorage.getItem('condicion'), sessionStorage.getItem('vcondicion'), $('#txtval').textbox('getValue'))}
        }
    });
    $('#btnbuscar').bind('click', function () {
        FORMAR_CONDICION('#cbocam', '#cbocon', '#txtval');

        if (sessionStorage.getItem('tipobusqueda') == "P")
        { BUSCAR_DATOS('#btnBuscarPlaza', sessionStorage.getItem('tipobusqueda'), sessionStorage.getItem('vcampo'), sessionStorage.getItem('condicion'), sessionStorage.getItem('vcondicion'), $('#txtval').textbox('getValue')); }
        else { BUSCAR_DATOS('#btnBuscarEmpleado', sessionStorage.getItem('tipobusqueda'), sessionStorage.getItem('vcampo'), sessionStorage.getItem('condicion'), sessionStorage.getItem('vcondicion'), $('#txtval').textbox('getValue'));}
    });



    $('#cbobancos').combobox({        
        onSelect: function (rec) {
            if (rec.campo != "0") {
                DDLLISTACAMPOS('#cbocucursal', 'sucursal', rec.campo);
            }
        },
    });

    $('#txtvalorind').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalorind').textbox('getValue');
            if (vvalor != "") {               
                 condicion = vvalor;
            }
            sessionStorage.setItem('conind', condicion);
            BUSCAR_INDICADORES(condicion);
        }
    });
    $('#btnbusarind').bind('click', function () { BUSCAR_INDICADORES(sessionStorage.getItem('conind')); });
    
    $('#btnadscri').bind('click', function () {
        sessionStorage.setItem('tipotbl', 'centrocosto');
        SELECCIONAR_CATALOGO('centrocosto', '');
    });
    $('#txtadscri').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            sessionStorage.setItem('tipotbl', 'centrocosto');
            $('#txtvalcat').textbox('setValue', $('#txtadscri').textbox('getValue'));
            SELECCIONAR_CATALOGO('centrocosto', $('#txtadscri').textbox('getValue'));
        }
    });

    $('#btnzonpag').bind('click', function () {
        sessionStorage.setItem('tipotbl', 'zonpag');
        SELECCIONAR_CATALOGO('zonpag','');
    });
    $('#txtpag').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            sessionStorage.setItem('tipotbl', 'zonpag');
            $('#txtvalcat').textbox('setValue', $('#txtpag').textbox('getValue'));
            SELECCIONAR_CATALOGO('zonpag', $('#txtpag').textbox('getValue'));
        }
    });


    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            var condicion = "";
            var vvalor = $('#txtvalcat').textbox('getValue');
            if (vvalor != "") {
                condicion = vvalor;
            }          
            SELECCIONAR_CATALOGO(sessionStorage.getItem('tipotbl'),condicion);
        }
    });

    $('#btnbuscarcat').bind('click', function () {
        var condicion = "";
        var vvalor = $('#txtvalcat').textbox('getValue');
        if (vvalor != "") {
            condicion = vvalor;
        }
        SELECCIONAR_CATALOGO(sessionStorage.getItem('tipotbl'), condicion);
    });

    $('#txtvalmov').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FORMAR_CONDICION('#cbocammov', '#cboconmov', '#txtvalmov');
            CARGAR_MOVIMIENTOS('#dgmov', 80, 500, sessionStorage.getItem('condicion'));
        }
    });

    $('#btnBuscarMov').bind('click', function () {
        FORMAR_CONDICION('#cbocammov', '#cboconmov', '#txtvalmov');
        CARGAR_MOVIMIENTOS('#dgmov', 80, 500, sessionStorage.getItem('condicion'));
    });
     
    $('#dvigenciainicial').datebox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });
    $('#dvigenciafinal').datebox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });


   
    $('#dgind').datagrid({              
        checkOnSelect: false,
        selectOnCheck: false,
        onCheck: onCheck,
        onUncheck: onUncheck,
        onLoadSuccess: onLoad,
        onEndEdit: onEndEdit,
        onBeforeEdit: function (index, row) {
            row.editing = true;
            $('#dgind').datagrid('checkRow', index);
        }
    });
    $('#dgind').datagrid('enableCellEditing').datagrid('gotoCell', {
        index: 1,
        field: 'id',
    });
   
    //$('#btnNomActual').bind('click', function () {
    //    VALOR_NOMINA_ACTUAL('#btnNomActual');
    //});  
});
$(window).load(function () {    
   SACAR_NOMINAS();
    Listar_BloqueosDesbloqueos();
});

function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'ME';
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Listar_BloqueosDesbloqueos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            if (data.d[0] == 'C') {$('#lblbloqueada').hide();}
            else { $('#lblbloqueada').show(); }

            if (data.d[0] == "C") {
                $('#btnNuevaCap').linkbutton({ disabled: false });
                $('#btnEliModCap').linkbutton({ disabled: false });
            }
            else {
                $('#btnNuevaCap').linkbutton({ disabled: true });
                $('#btnEliModCap').linkbutton({ disabled: true });
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

function SACAR_NOMINAS() {
    $.ajax({
        type: "POST",
        url: "funciones.aspx/ConsultaControl",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d[0]);
            var objM = $.parseJSON(data.d[1]);

            if (objM.length > 0) {
                $('#lblnominas').hide();
                $('#dextras').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);               
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();                
                valnomina = '';
                nominasel = '';
            }
           
        },
        error: function (er) {
            $('#loading').hide();
            $.messager.alert('Error', er.responseText, 'error');
        },
        complete: function () {
            $('#loading').hide(100);
        }
    });
}
function CREAR_BONONES_NOMINAS_ANTERIORES(objm, obj) {
    $('#dextras').empty();
    $('#dextras').append('<table cellpadding="2" id="tblm" style="width: 100%;"></table>');
    table = $('#dextras').children();

    for (var b = 0; b < objm.length; b++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
        td.align = "center";

        btn = $('<a />', {
            type: 'button',
            //text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext+";"+objm[b].iniqui+"|"+objm[b].finqui
        });

        tr = $(tr).append(
          $(td).append(btn)
        );
        table.append(tr);


        $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton({
            iconCls: 'icon_Calendario',
            size: 'large',
            width: 70 + "%",
            iconAlign: 'left',
            toggle: true,
            group: 'gf',
            plain: false,
            text: objm[b].nomquin,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext + ";" + objm[b].iniqui + "|" + objm[b].finqui
        }).bind('click', function () {
            nominasel = this.text;
            var nomina = this.name.split(';');
            valnomina = nomina[0];
            fechas = nomina[1].split('|');
            $('#dvigenciainicial').datebox('setValue', fechas[0]);         
            $('#dvigenciafinal').datebox('setValue', fechas[1]);
            fechainicial = fechas[0];
            fechafinal = fechas[1];
        });

        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            nominasel = btn[0].text;
            var nomina = btn[0].name.split(';');
            valnomina = nomina[0];
            fechas = nomina[1].split('|');
            $('#dvigenciainicial').datebox('setValue', fechas[0]);
            $('#dvigenciafinal').datebox('setValue', fechas[1]);
            fechainicial = fechas[0];
            fechafinal = fechas[1];
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.session.set('valnomina', '');
        document.getElementById('lblquin1').innerHTML = "";
        document.getElementById('lblquin2').innerHTML = "";
        document.getElementById('lblquin1').innerHTML = $.session.get('nominaAct');
        document.getElementById('lblquin2').innerHTML = $.session.get('nominaAct');
    }
}

function onCheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].clave == row.clave) {
            return
        }
    }   
    row.importe = row.importe;
    checkedRows.push(row);
}
function onUncheck(index, row) {
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].campo == row.campo) {
            checkedRows.splice(i, 1);
            return;
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
                if (checkedRows[i].clave == row.clave) {
                    dg.datagrid('checkRow', index);
                    row.importe = checkedRows[i].importe;
                    dg.datagrid('beginEdit', index);
                    dg.datagrid('endEdit', index);
                    return;
                }
            }
        })();
    }  
}

function onEndEdit(index, row) {
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'importe'
    });
    if (ed != null)
    { row.importe = $(ed.target).numberbox('getText'); }
}


function NUEVA_CAPTURA() {
    
        sessionStorage.setItem('boton', 'Nuevo');       

        DDLLISTACAMPOS('#cbotipopago', 'tippago', '');
        DDLLISTACAMPOS('#cbobancos', 'bancos', '');
      
        $('#dmenu').hide();
        $('#dmodeli').hide();
        $('#dcaptura').show();

        $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
        $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
        $('#dga').datagrid('loadData', { "total": 0, "rows": [] });

        $('#dgp').datagrid('enableCellEditing').datagrid('gotoCell', {
            index: 1,
            field: 'id',
        });

        $('#dgd').datagrid('enableCellEditing').datagrid('gotoCell', {
            index: 1,
            field: 'id',
        });

        $('#dga').datagrid('enableCellEditing').datagrid('gotoCell', {
            index: 1,
            field: 'id',
        });
   
}

function REGRESAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (tipomov == 'G')
        {
            $('#dmenu').show();
            $('#dcaptura').hide();
            $('#dmodeli').hide();

            SACAR_NOMINAS();
            $('#btnModificar').linkbutton({ disabled: true });
            $('#btnEliminar').linkbutton({ disabled: true });
        }
        else
        {
            $('#dmenu').hide();
            $('#dcaptura').hide();
            $('#dmodeli').show();

            CARGAR_MOVIMIENTOS('#dgmov', 80, 500, '');
            FOCUS('#txtvalmov', "#dgmov");
            $('#cboconmov').combobox("setValue", "=");

            //var bandera = DESMARCAR_FILA_GRID('#dgmov');
            //if (bandera == false)
            //{ CARGAR_MOVIMIENTOS('#dgmov', 80, 500, ''); }                     
        }                 
    }
}


function LIMPIAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {        
        $('#cbotipopago').combobox('setValue', '0');
        $('#cbobancos').combobox('setValue', '0');
        $('#cbosucursal').combobox('setValue', '');
        $('#txtcuenta').textbox('setValue', '');
        $('#dvigenciainicial').datebox('setValue', '');
        $('#dvigenciafinal').datebox('setValue', '');

        $('#cbocamemp').combobox('setValue', 'numemp');
        $('#cboconemp').combobox('setValue', '=');
        
        $('#txtplaza').textbox('setValue', '');
        $('#txtestatus').textbox('setValue', '');
        $('#txtvigenciaini').textbox('setValue', '');
        $('#txtvigenciafin').textbox('setValue', '');
        $('#txthrplaza').textbox('setValue', '');
        $('#txtzonaeco').textbox('setValue', '');
        $('#txtpuesto').textbox('setValue', '');
        $('#txtnivel').textbox('setValue', '');
        $('#txtadscri').textbox('setValue', '');
        $('#txtpag').textbox('setValue', '');
        $('#txtestp').textbox('setValue', '');

        $('#txtempleado').textbox('setValue', '');
        $('#txtrfc').textbox('setValue', '');
        $('#txtnombre').textbox('setValue', '');
        $('#txtsexo').textbox('setValue', '');

        $('#txtvalplaza').textbox('setValue', '');
        $('#txtvalemp').textbox('setValue', '');
        
        $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
        $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
        $('#dga').datagrid('loadData', { "total": 0, "rows": [] });

        $('#txtobservaciones').textbox('setValue', '');
        
        $('#btnGuardarCap').linkbutton('disable');
    }
}

function LIMPIAR_MODELI(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#btnModificar').linkbutton('disable');
        $('#btnEliminar').linkbutton('disable');                
        $('#dgmov').datagrid('unselectRow');

        var bandera = DESMARCAR_FILA_GRID('#dgmov');
        if (bandera == false)
        { CARGAR_MOVIMIENTOS('#dgmov', 80, 500, ''); }
        CARGAR_CAMPOSBUSQUEDA('#dgmov', '#cbocammov');
        FOCUS('#txtvalmov', "#dgmov");
        $('#cboconmov').combobox("setValue", "like");        
    }
}

function formatDetail(value, row) {       
    return '<center><a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:"icon-search" id="btnBPInd">Buscar</a></center>';
}

function quickPrint(value, row) {
    var url = 'print.php?id=' + row.id;
    //return '<a target="_blank" href="#"><button>Print</button></a>';
    return '<a target="_blank" href="#"><a href="#" class="easyui-linkbutton" data-options="plain:true,iconCls:"icon-search" id="btnBPInd">Buscar</a></a>';
}

function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#dgp').datagrid('validateRow', editIndex)){
         $('#dgp').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
        } else {
        return false;
       }
 }


function onClickCell(index, field){
    if (editIndex != index){
        if (endEditing()){
            $(this).datagrid('selectRow', index)
            .datagrid('beginEdit', index);
            var ed = $(this).datagrid('getEditor', { index: index, field: field });
             if (ed){
                 ($(ed.target).data('textbox') ? $(ed.target).textbox('textbox') : $(ed.target)).focus();
                 //$(ed.target).focus().select().bind('keyup', function (e) {
                 //    var code = e.keyCode || e.which;
                 //    if (code == 13) {
                 //    }
                 //});
              }
            editIndex = index;
             } else {
            setTimeout(function(){
                $('#dgp').datagrid('selectRow', editIndex);
                },0);
             }
        }
}

function onEndEdit(index, row){
    var ed = $(this).datagrid('getEditor', {
        index: index,
        field: 'importe'
});
    row.importe = $(ed.target).numberbox('getText');    
}

function BUSCAR_DATOS(btnobj,tipobusqueda,vcampo,condicion,vcondicion,vvalor) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {              
        if (tipobusqueda == "P")
        {            
            $('#dplazas').show();
            $('#dempleados').hide();
           
            CARGAR_DATOS('#dgplaza', 800, 600, tipobusqueda, condicion);            
            CARGAR_CAMPOSBUSQUEDA('#dgplaza', '#cbocam');
            windows("#winemp", 820, 630,false, "Buscar Plazas");
        }
        else
        {
            $('#dplazas').hide();
            $('#dempleados').show();
            
            CARGAR_DATOS('#dgempleados', 643, 600, tipobusqueda, condicion);            
            CARGAR_CAMPOSBUSQUEDA('#dgempleados', '#cbocam');
            windows("#winemp", 665, 630,false,"Buscar Empleados");
        }
        if (vcondicion == 'like') {

            $('#cbocam').combobox('setValue', vcampo);
            $('#cbocon').combobox('setValue', 'like');
            $('#txtval').textbox('setValue', vvalor);
        }
       
    }
}

function AGREGAR_PERCEPCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        checkedRows = [];
        var rows = $('#dgp').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            checkedRows.push(rows[i]);
        }

        tipoind="P";
        CARGAR_IND('#dgind', 'P', '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 650, 660,false, 'Percepciones');
    }
}
function ACEPTAR_PERCEPCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (endEditing()) {
            $('#dgp').datagrid('acceptChanges');
        }

    }
}
function ELIMINAR_PERCEPCION(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dgp').datagrid('acceptChanges');
        var dg = $('#dgp');
        var cell = dg.datagrid('cell');
        if (cell!=null) {            
            if (numdoc != "")
            {
                var rows = $('#dgp').datagrid('getRows');
                ELIMINAR_INDICADOR(numdoc, rows[cell.index].clave, 'P');
            }
            $('#dgp').datagrid('cancelEdit', cell.index)
              .datagrid('deleteRow', cell.index);            
        }
        if ($('#dgp').datagrid('getData').total == 0 && $('#dgd').datagrid('getData').total == 0 && $('#dga').datagrid('getData').total == 0) { $('#btnGuardarCap').linkbutton({ disabled: true }) }
        else  { $('#btnGuardarCap').linkbutton({ disabled: false })  }
    }
}

function AGREGAR_DEDUCCIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        checkedRows = [];
        var rows = $('#dgd').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            checkedRows.push(rows[i]);
        }
        tipoind = "D";
        CARGAR_IND('#dgind', 'D', '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind", 650, 660,false, 'Deducciones');
    }
}
function ACEPTAR_DEDUCCIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (endEditing()) {
            $('#dgd').datagrid('acceptChanges');
        }

    }
}
function ELIMINAR_DEDUCCIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dgd').datagrid('acceptChanges');
        var dg = $('#dgd');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            if (numdoc != "")
            { ELIMINAR_INDICADOR(numdoc, rows.clave, 'D'); }
            $('#dgd').datagrid('cancelEdit', cell.index)
              .datagrid('deleteRow', cell.index);
        }

        if ($('#dgp').datagrid('getData').total == 0 && $('#dgd').datagrid('getData').total == 0 && $('#dga').datagrid('getData').total == 0) { $('#btnGuardarCap').linkbutton({ disabled: true }) }
        else { $('#btnGuardarCap').linkbutton({ disabled: false }) }
    }
}

function AGREGAR_APORTACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        checkedRows = [];
        var rows = $('#dga').datagrid('getRows');
        for (var i = 0; i < rows.length; i++) {
            checkedRows.push(rows[i]);
        }
        tipoind = "A";
        CARGAR_IND('#dgind', 'A', '');
        FOCUS('#txtvalorind', "#dgind");
        windows("#wind",650, 660,false, 'Aportaciones');
    }
}
function ACEPTAR_APORTACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        if (endEditing()) {
            $('#dga').datagrid('acceptChanges');
        }

    }
}
function ELIMINAR_APORTACIONES(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dga').datagrid('acceptChanges');
        var dg = $('#dga');
        var cell = dg.datagrid('cell');
        if (cell != null) {
            if (numdoc != "")
            { ELIMINAR_INDICADOR(numdoc, rows.clave, 'A'); }
            $('#dga').datagrid('cancelEdit', cell.index)
              .datagrid('deleteRow', cell.index);
        }
        if ($('#dgp').datagrid('getData').total == 0 && $('#dgd').datagrid('getData').total == 0 && $('#dga').datagrid('getData').total == 0) { $('#btnGuardarCap').linkbutton({ disabled: true }) }
        else { $('#btnGuardarCap').linkbutton({ disabled: false }) }
    }
}

function BUSCAR_INDICADORES(condicion) {
    if (tipoind== 'P')
    { CARGAR_IND('#dgind','P', condicion); }
    else
        if (tipoind == 'D')
        { CARGAR_IND('#dgind',  'D', condicion); }
        else
            if (tipoind == 'A')
            { CARGAR_IND('#dgind', 'A', condicion); }
   // FOCUS('#txtvalorind', "#dgind");
}

function LIMPIAR_IND_SEL() {
    CARGAR_IND('#dgind', sessionStorage.getItem('tipoind'),'');  
    $('#txtvalorind').textbox('setValue', '');
    $('#txtvalorind').textbox('clear').textbox('textbox').focus();
    $('#dgind').datagrid('uncheckAll');
    
    tipoind = "";
    checkedRows = [];
}
function ACEPTAR_IND_SEL() {
    var dgind="";
    if (tipoind == "P") { dgind = "#dgp"; }
    else
        if (tipoind == "D") { dgind = "#dgd"; }
        else
         if (tipoind == "A") { dgind = "#dga"; }

    $(dgind).datagrid('acceptChanges');
    $(dgind).datagrid('loadData', { "total": 0, "rows": [] });  
    for (var i = 0; i < checkedRows.length; i++) {
        if (checkedRows[i].importe != "") {
            $(dgind).datagrid('insertRow', {
                index: i,
                row: {
                    clave: checkedRows[i].clave,
                    descripcion: checkedRows[i].descripcion,
                    importe: checkedRows[i].importe,
                    tip_acumula: checkedRows[i].tip_acumula,
                }
            });
        }
    }
    //$('#btnEIndicador').linkbutton({ disabled: false });  
    tipoind = "";
    checkedRows = [];
    $("#wind").window('close');
    $('#btnGuardarCap').linkbutton({ disabled: false })
}



function DDLLISTACAMPOS(objddl,tabla,condicion) {
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strcondicion = condicion;

    $.ajax({
        type: "POST",
        url: 'funciones.aspx/LlenarDropList',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $(objddl).combobox({
                data: obj,
                valueField: 'campo',
                textField: 'descripcion'                
            });
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function CREAR_GRID(dgobj) {
    $(dgobj).datagrid({        
        pagination: true,
        rownumbers: true,
        pageSize: 10,
        singleSelect: true,
        rownumbers: true,      
        columns: [[
            { field: 'clave', title: 'Indicador', width: 70, align: 'center' },
            { field: 'descripcion', title: 'Descripción', width: 300, align: 'left' },
            { field: 'importe', title: 'Importe', width: 75, align: 'right', editor: { type: 'numberbox', options: { precision: 1 } }} ,
            { field: 'tip_acumula', title: 'Tipo', width: 70, align: 'center' }
        ]],
        data:null
    });
}

function CARGAR_IND(dgcontrol,strtipo,condicion) {     
    $(dgcontrol).datagrid({
        url: "ListaIndicadores.aspx?tipotbl='" + strtipo + "'&busqueda=" + condicion
        //width: "100%",
        //heigth: "100%"       
        //onClickRow: function () {
        //    rows = $(dgcontrol).datagrid('getSelected');
        //    if (rows) {
        //        var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
        //        var tot = $(dgind).datagrid('getRows');

        //        $(dgind).datagrid('loadData', { "total": 0, "rows": [] });
        //        $(dgind).datagrid('insertRow', {
        //            index: tot.length + 1,	// index start with 0
        //            row: {
        //                clave: rows[fields[0]],
        //                descripcion: rows[fields[1]],
        //            }
        //        });          
        //        $("#wind").window('close');
        //        $('#btnGuardarCap').linkbutton('enable');
        //    }
        //}
    });
}

function CARGAR_DATOS(dgcontrol, ancho, alto,tipobusqueda, condicion) {
    $(dgcontrol).datagrid({
        url: "Buscar_Datos.aspx?tipocon=" + tipobusqueda + "&busqueda=" + condicion,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "px",
        heigth: alto +"px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                rows = $(dgcontrol).datagrid('getSelected');
                if (rows) {
                    if (tipobusqueda == "E") {
                        $('#txtempleado').textbox('setValue', rows[fields[0]]);
                        $('#txtrfc').textbox('setValue', rows[fields[1]]);
                        $('#txtnombre').textbox('setValue', rows[fields[2]]);
                        $('#txtsexo').textbox('setValue', rows[fields[3]]);
                    }
                    else {
                        $('#txtplaza').textbox('setValue', rows[fields[0]]);
                        $('#txtestatus').textbox('setValue', rows[fields[2]]);
                        $('#txtvigenciaini').textbox('setValue',rows[fields[8]]);
                        $('#txtvigenciafin').textbox('setValue',rows[fields[9]]);
                        $('#txthrplaza').textbox('setValue', rows[fields[3]]);
                        $('#txtzonaeco').textbox('setValue', rows[fields[6]]);
                        $('#txtpuesto').textbox('setValue', rows[fields[1]]);
                        $('#txtnivel').textbox('setValue', rows[fields[7]]);
                        $('#txtadscri').textbox('setValue', rows[fields[10]]);                                               
                        $('#txtpag').textbox('setValue', rows[fields[11]]);                                               
                        $('#txtestp').textbox('setValue', rows[fields[12]]);                                                
                    }
                    $("#winemp").window('close');
                    //$('#btnGuardarCap').linkbutton('enable');
                }
            }
        }
    });
}

function FORMAR_CONDICION(objcam,objcon,objval) {
    var condicion = "";
    var vvalor = $(objval).textbox('getValue');
    if (vvalor != "") {
        var vcampo = $(objcam).combobox('getValue');
        var vcondicion = $(objcon).combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }                           
    }
    else { condicion = " "; }
    sessionStorage.setItem('condicion', condicion);
}

function BUSCAR_EMPLEADO(tipobusqueda,condicion) {
    var parametros = {};
    parametros.strtipocond = tipobusqueda;
    parametros.strcondicion = condicion;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/ListarDatosEmpleado',
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {           
            if (data.d[0] == '1') {
                var obj = $.parseJSON(data.d[2]);
                if (tipobusqueda == "E") {
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombre').textbox('setValue', obj[0].nomcom);
                    $('#txtsexo').textbox('setValue', obj[0].sexemp);
                }
                else {
                    $('#txtplaza').textbox('setValue', obj[0].numplaza);
                    $('#txtestatus').textbox('setValue', obj[0].cveesppl);
                    $('#txtvigenciaini').textbox('setValue', obj[0].vigini);
                    $('#txtvigenciafin').textbox('setValue', obj[0].vigfin);
                    $('#txthrplaza').textbox('setValue', obj[0].hrspla);
                    $('#txtzonaeco').textbox('setValue', obj[0].cvezonpl);
                    $('#txtpuesto').textbox('setValue', obj[0].cvepuepl);
                    $('#txtnivel').textbox('setValue', obj[0].cvenivpl);
                    $('#txtadscri').textbox('setValue', obj[0].cveadspl);
                    $('#htxtadscri').val(obj[0].cveadspl);
                    $('#txtpag').textbox('setValue', obj[0].cvepagpl);
                    $('#htxtpag').val(obj[0].cvepagpl);
                    $('#txtestp').textbox('setValue', obj[0].estrucprog);
                    $('#htxtestp').val(obj[0].estrucprog);
                }
            }
            else { $.messager.alert('Error', data.d[1], 'error'); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}

function SELECCIONAR_CATALOGO(strcat,condicion) {
    if (strcat == 'centrocosto') {
        $('#dzonpag').hide();
        $('#dadscri').show();
        CARGAR_CATALOGO('#btnadscri', 750, 630, 'txtadscri', '#dgadscri', 'centrocosto', condicion);
        FOCUS('#txtvalcat', "#dgadscri");
        windows("#wincat", 775, 635,false, 'Catálogo de Centro de Trabajo');
    }
    else
    {
        $('#dzonpag').show();
        $('#dadscri').hide();
        CARGAR_CATALOGO('#btnzonpag', 590, 220, 'txtpag', '#dgzonpag', 'zonpag', condicion);
        FOCUS('#txtvalcat', "#dgzonpag");
        windows("#wincat", 615, 630,false, 'Catálogo de Pagaduría');
    }
}

function CARGAR_CATALOGO(btnobj,ancho,alto, txtobj, dgcontrol,strtipo,condicion) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $(dgcontrol).datagrid({
            url: "ListarCatalogos.aspx?strtipo='" + strtipo + "'&busqueda=" + condicion,
            pagination: true,
            rownumbers: true,
            singleSelect: true,
            striped: true,
            pageSize: 20,
            width: ancho + "px",
            heigth: alto + "px",
            onClickRow: function () {
                rows = $(dgcontrol).datagrid('getSelected');
                if (rows) {
                    var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                    $(txtobj).textbox('setValue', '');
                    $('#' + txtobj).textbox('setValue', rows[fields[0]]);                                        
                  }             
              $("#wincat").window('close');                                  
            }
        });
    }
}

function GUARDAR_CAPTURA(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = '', percepciones = "",deducciones="",aportaciones="";
        var sucursal = "", plaza = "", empleado = "", vigini = "", vigfin = "", tipopago = "", cvebanco = "", desbanco = "", cuenta = "", cveads = "",hcveads="", cvepag = "",hcvepag="", cveestruc = "",hcveestruc="", obs = "";

        if ($('#cbosucursal').combobox('getValue') == "") { sucursal = ''; } else { sucursal = $('#cbosucursal').combobox('getValue'); }

        numplaza = $('#txtplaza').textbox('getValue');
        empleado = $('#txtempleado').textbox('getValue');
        vigini = $('#dvigenciainicial').datebox('getValue');
        vigfin = $('#dvigenciafinal').datebox('getValue');
        tipopago = $('#cbotipopago').combobox('getValue');
        cvebanco = $('#cbobancos').combobox('getValue');
        desbanco = $('#cbobancos').combobox('getText');
        cuenta = $('#txtcuenta').textbox('getValue');
        cveads = $('#txtadscri').textbox('getValue');
        hcveads = $('#htxtadscri').val();       
        cvepag = $('#txtpag').textbox('getValue');
        hcvepag = $('#htxtpag').val();       
        cveestruc = $('#txtestp').textbox('getValue');
        hcveestruc = $('#htxtestp').val();        
        obs=$('#txtobservaciones').textbox('getValue');

        valores = 'numplame:' + numplaza + '|numempme:' + empleado + '|viginime:' + vigini + '|vigfinme:' + vigfin +
                  '|tipopagme:' + tipopago + '|cvebanme:' + cvebanco + '|desbanme:' + desbanco + '|cvesucme:' + sucursal +
                  '|noctame:' + cuenta + '|cveadsme:' + cveads + '|cvepagme:' + cvepag + '|estruprome:' + cveestruc +
                  '|observa:' + obs + '|cvepag0me:' + hcvepag + '|cveads0me:' + hcveads + '|estrupro0me:' + hcveestruc;

        sessionStorage.setItem('valores', valores);
        var tdgp=$('#dgp').datagrid('getData').total;
        for (var p = 0; p < tdgp; p++)
        {
            var clave = $('#dgp').datagrid('getRows')[p].clave;           
            var importe = $('#dgp').datagrid('getRows')[p].importe;
            var tipo = $('#dgp').datagrid('getRows')[p].tipo_acumula;
            if (importe != "") {
                percepciones += 'indICAME:' + clave + '|perdedme:' + tipo + '|importme:' + importe + '|';
            }
            else { $.messager.alert('Error', 'Faltan importes de los indicadores de percepción', 'error'); break; }
        }
        percepciones = percepciones.substring(0, percepciones.length - 1);
        sessionStorage.setItem('percepciones', percepciones );

        var tdgd = $('#dgd').datagrid('getData').total;
        for (var d = 0; d < tdgd; d++) {
            var clave = $('#dgd').datagrid('getRows')[d].clave;
            var importe = $('#dgd').datagrid('getRows')[d].importe;
            var tipo = $('#dgd').datagrid('getRows')[p].tipo_acumula;

            if (importe != "") {
                deducciones += 'indicame:' + clave + '|perdedme:' + tipo + '|importme:' + importe + '|';
            }
            else { $.messager.alert('Error', 'Faltan importes de los indicadores de deducción', 'error'); break; }
        }
        deducciones = deducciones.substring(0, deducciones.length - 1);
        sessionStorage.setItem('deducciones', deducciones);

        var tdga = $('#dga').datagrid('getData').total;
        for (var a = 0; a < tdga; a++) {
            var clave = $('#dga').datagrid('getRows')[a].clave;
            var importe = $('#dga').datagrid('getRows')[a].importe;
            var tipo = $('#dga').datagrid('getRows')[p].tipo_acumula;

            if (importe != "") {
                aportaciones += 'indicame:' + clave + '|perdedme:' + tipo + '|importme:' + importe + '|';
            }
            else { $.messager.alert('Error', 'Faltan importes de los indicadores de aportaciones', 'error'); break; }
        }
        aportaciones = aportaciones.substring(0, aportaciones.length - 1);
        sessionStorage.setItem('aportaciones', aportaciones);

        var condicion = "";
        if (tipomov == 'Guardar')
        {
            GUARDAR_DOCUMENTO('G', '');            
        }
        else {
            GUARDAR_DOCUMENTO('M',numdoc);                      
        }
        
    }
}

function GUARDAR_DOCUMENTO(strmov,condicion) {
    var parametros = {};
    parametros.strmodulo = 'ME';
    parametros.strmov = strmov;
    parametros.strcondicion = condicion;
    //parametros.strusuario = $.session.set("usuario");
    parametros.strvalores = sessionStorage.getItem('valores');
    parametros.strper = sessionStorage.getItem('percepciones');
    parametros.strded = sessionStorage.getItem('deducciones');
    parametros.strapo = sessionStorage.getItem('aportaciones');
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Guardar_Captura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                var doc = "";
                if (data.d[2] != undefined)
                { var doc = data.d[2]; }
                $.messager.alert({ title: 'Información', msg: '<div style="height:100%">' + data.d[1] + ' <br><h3><b>' + doc + '<b><h3></div>', icon: 'info', width: 25 + "%" });

               
            }
            else {
                $.messager.alert('Error', data.d[1], 'error');
            }
            CARGAR_MOVIMIENTOS('#dgmov', 80, 500, "");
            $('#dcaptura').hide();
            $('#dmodeli').show();
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


function REGRESAR_MODELI(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $('#dmenu').show();
        $('#dcaptura').hide();
        $('#dmodeli').hide();
        valnomina = '';
        nominasel = '';
        SACAR_NOMINAS();
    }
}

function CARGAR_MOVIMIENTOS(dgcontrol,ancho,alto, condicion)
{
    $(dgcontrol).datagrid({
        url: "ListarMovimientos.aspx?busqueda=" + condicion+"&multi="+valnomina,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
                cvemov = fields[0] + "= ''" + rows[fields[0]] + "''";
                var condicion = fields[0] + "= ''" + rows[fields[0]] + "'' and " + fields[4] + " = ''" + rows[fields[4]] + "'' and " + fields[5] + "= ''" + rows[fields[5]]+"''"
                sessionStorage.setItem('condicion', condicion);                
                $('#btnModificar').linkbutton('enable');
                $('#btnEliminar').linkbutton('enable');

                $('#dgp').datagrid('loadData', { "total": 0, "rows": [] });
                $('#dgd').datagrid('loadData', { "total": 0, "rows": [] });
                $('#dga').datagrid('loadData', { "total": 0, "rows": [] });

                $('#dgp').datagrid('enableCellEditing').datagrid('gotoCell', {
                    index: 1,
                    field: 'id',
                });

                $('#dgd').datagrid('enableCellEditing').datagrid('gotoCell', {
                    index: 1,
                    field: 'id',
                });

                $('#dga').datagrid('enableCellEditing').datagrid('gotoCell', {
                    index: 1,
                    field: 'id',
                });
            }
        }
    });
    if ($(dgcontrol).datagrid('getData').total==0)
    { $('#btnEliminar').linkbutton('disable'); $('#btnModificar').linkbutton('disable'); }
}

function MODELI_CAPTURA() {
    
        $('#dmenu').hide();
        $('#dcaptura').hide();
        $('#dmodeli').show();
        
        CARGAR_MOVIMIENTOS('#dgmov', 80, 500, '');
        CARGAR_CAMPOSBUSQUEDA('#dgmov', '#cbocammov');
        FOCUS('#txtvalmov', "#dgmov");    
}

function MODIFICAR_MOVIMIENTOS(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        sessionStorage.setItem('boton', 'Modificar');
        var rows;
        try { rows = $('#dgmov').datagrid('getSelected'); }
        catch (err) { rows = null; }
        if (rows) {
            var fields = $('#dgmov').datagrid('getColumnFields', true).concat($('#dgmov').datagrid('getColumnFields', false));
           // document.getElementById('lbldoc').innerHTML = "Documento: " + rows[fields[0]];
            numdoc=rows[fields[0]];

            CARGAR_DATOS_MOVIMIENTOS(rows[fields[0]]);

            var obj = $.parseJSON(sessionStorage.getItem("obj"));
            if (obj.length > 0) {
                DDLLISTACAMPOS('#cbotipopago', 'tippago', '');                
                DDLLISTACAMPOS('#cbobancos', 'bancos', '');                

                $('#txtempleado').textbox('setValue', obj[0].numempme);
                $('#txtrfc').textbox('setValue', obj[0].rfccom);
                $('#txtnombre').textbox('setValue', obj[0].nomcom);
                $('#txtsexo').textbox('setValue', obj[0].sexemp);
                $('#txtplaza').textbox('setValue', obj[0].numplame);
                $('#txtestatus').textbox('setValue', obj[0].cveesppl);
                if (obj[0].tipopagme != null)
                { $('#cbotipopago').combobox('setValue', obj[0].tipopagme); }
                else { $('#cbotipopago').combobox('setValue', 0); }
                $('#cbobancos').combobox('setValue', obj[0].cvebanme);
                $('#cbosucursal').combobox('setValue', obj[0].cvesucme);
                $('#txtcuenta').textbox('setValue', obj[0].noctame);
                $('#dvigenciainicial').datebox('setValue', obj[0].viginime);
                $('#dvigenciafinal').datebox('setValue', obj[0].vigfinme);
                $('#txthrplaza').textbox('setValue', obj[0].hrspla);
                $('#txtzonaeco').textbox('setValue', obj[0].cvezonpl);
                $('#txtpuesto').textbox('setValue', obj[0].cvepuepl);
                $('#txtnivel').textbox('setValue', obj[0].cvenivpl);
                $('#txtadscri').textbox('setValue', obj[0].cveadsme);
                $('#txtpag').textbox('setValue', obj[0].cvepagme);
                $('#txtestp').textbox('setValue', obj[0].estruprome);
                $('#txtobservaciones').textbox('setValue', obj[0].observa);

                
                CARGAR_INDICADORES("#dgp", "ListarIndicadores.aspx?tipoind=P&numdoc=" + numdoc);
                CARGAR_INDICADORES("#dgd", "ListarIndicadores.aspx?tipoind=D&numdoc=" + numdoc);
                CARGAR_INDICADORES("#dga", "ListarIndicadores.aspx?tipoind=A&numdoc=" + numdoc);
                       
            }           
            $('#dmenu').hide();
            $('#dmodeli').hide();
            $('#dcaptura').show();
            $('#btnGuardarCap').linkbutton('enable');
            if (tipomov == "Guardar") { $('#btnGuardarCap').linkbutton({ text: 'Guardar', iconCls: 'icon-save' }); }
            else { $('#btnGuardarCap').linkbutton({ text: 'Modificar', iconCls: 'icon-save' }); }
        }                    
    }
}

function CARGAR_DATOS_MOVIMIENTOS(numdoc)
{   
    var parametros = {};
    parametros.numdoc =numdoc ;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Modificar_Documento',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {          
            sessionStorage.setItem("obj", data.d[0]);
            //var objp = $.parseJSON(data.d[1]);
            //CARGAR_DG_IND('#dgp',objp);
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()               
        {           
            $('#loading').hide(100);
        }
    });        
}

function ELIMINAR_MOVIMIENTOS(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        $.messager.confirm('Información', 'Desea eliminar el documento', function (r) {
            if (r) {
                ELIMINAR_DOCUMENTO();
            }
        });
    }
}

function ELIMINAR(btnobj,tipo)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var condicion = "";
        if (tipo == "D") { condicion = sessionStorage.getItem('cvemov'); }
        else { condicion = sessionStorage.getItem('condicion'); }

        var parametros = {};
        parametros.strtipo = tipo;
        parametros.strcondicion = condicion;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Eliminar_Captura",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "0") {
                    $.messager.alert('Información', data.d[1], 'info');                    
                }
                else {
                    $.messager.alert('Error', data.d[1], 'error');
                }
                CARGAR_MOVIMIENTOS('#dgmov', 80, 500, "");
                $("#winEliminar").window('close');
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
}

function GUARDAR_CAPTURA_INSERT(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var valores = '', percepciones = "", deducciones = "", aportaciones = "";
        var sucursal = "", plaza = "", empleado = "", vigini = "", vigfin = "", tipopago = "", cvebanco = "", desbanco = "", cuenta = "", cveads = "", hcveads = "", cvepag = "", hcvepag = "", cveestruc = "", hcveestruc = "", obs = "",nomcom="";

        $('#dgp').datagrid('acceptChanges');
        $('#dgd').datagrid('acceptChanges');
        $('#dga').datagrid('acceptChanges');

        if ($('#txtplaza').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el número de plaza', 'error'); return 0; }
        else
            if ($('#txtempleado').textbox('getValue') == "") { $.messager.alert('Error', 'Falta el número de empleado', 'error'); return 0; }
            else
                if ($('#cbotipopago').textbox('getValue') == "0") { $.messager.alert('Error', 'Falta el tipo de pago', 'error'); return 0; }
                else
                    if ($('#cbobancos').textbox('getValue') == "0") { $.messager.alert('Error', 'Falta el tipo de banco', 'error'); return 0; }
                    else
                        if ($('#txtadscri').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la clave de la adscripción', 'error'); return 0; }
                        else
                            if ($('#txtpag').textbox('getValue') == "") { $.messager.alert('Error', 'Falta la clave de la pagaduría', 'error'); return 0; }
                            else
                            {
                                if ($('#cbosucursal').combobox('getValue') == "") { sucursal = ''; } else { sucursal = $('#cbosucursal').combobox('getValue'); }
                               // var folio = sessionStorage.getItem('foliomov');
                               
                                numplaza = $('#txtplaza').textbox('getValue');
                                empleado = $('#txtempleado').textbox('getValue');
                                
                                if (!Validar_Fecha($('#dvigenciainicial').datebox('getValue')))
                                   { $.messager.alert('Error', 'La fecha de la Vigencia Inicial esta incorrecta ', 'error'); return 0; }
                                  else { vigini = $('#dvigenciainicial').datebox('getValue'); }                                
                                
                                var fecha=$('#dvigenciafinal').datebox('getValue');
                                if (fecha != '') {
                                    if (!Validar_Fecha($('#dvigenciafinal').datebox('getValue')))
                                    { $.messager.alert('Error', 'La fecha de la Vigencia Final esta incorrecta ', 'error'); return 0; }
                                    else { vigfin = $('#dvigenciafinal').datebox('getValue'); }
                                }
                                else { vigfin = ""; }

                                tipopago = $('#cbotipopago').combobox('getValue');
                                cvebanco = $('#cbobancos').combobox('getValue');
                                desbanco = $('#cbobancos').combobox('getText');
                                cuenta = $('#txtcuenta').textbox('getValue');
                                cveads = $('#txtadscri').textbox('getValue');
                                hcveads = $('#htxtadscri').val();
                                cvepag = $('#txtpag').textbox('getValue');
                                hcvepag = $('#htxtpag').val();
                                cveestruc = $('#txtestp').textbox('getValue');
                                hcveestruc = $('#htxtestp').val();
                                obs = $('#txtobservaciones').textbox('getValue');
                                nomcom = $('#txtnombre').textbox('getValue').toUpperCase();
                                
                              
                                ELIMINAR_DOCUMENTO();

                               // var tdgp = $('#dgp').datagrid('getData').total;
                                var tdgp = $('#dgp').datagrid('getRows');
                                var query = "";
                                for (var p = 0; p < tdgp.length; p++) {
                                    var clave = $('#dgp').datagrid('getRows')[p].clave;
                                    var importe = $('#dgp').datagrid('getRows')[p].importe;
                                    var tipacumula = $('#dgp').datagrid('getRows')[p].tip_acumula;
                                    if (importe != "") {
                                        query = "''" + numplaza + "'',''" + empleado + "'',''" + vigini + "'',''" + vigfin + "'',''" + tipopago + "'',''" + cvebanco + "'',''" + desbanco + "'',''" + cuenta + "'',''" + cveads + "'',''" + cvepag + "'',''" + cveestruc + "'',''" + obs + "'',''" + clave + "'',''" + tipacumula + "''," + importe + ",''" + nomcom+ "''"
                                        INSERTAR_CAPTURA(tipomov, query, 'P', numdoc);
                                    }
                                    else { $.messager.alert('Error', 'Faltan importes de los indicadores de percepción', 'error'); break; }
                                }

                                //var tdgd = $('#dgd').datagrid('getData').total;
                                var tdgd = $('#dgd').datagrid('getRows');
                                for (var d = 0; d < tdgd.length; d++) {
                                    var clave = $('#dgd').datagrid('getRows')[d].clave;
                                    var importe = $('#dgd').datagrid('getRows')[d].importe;
                                    var tipacumula = $('#dgd').datagrid('getRows')[d].tip_acumula;

                                    if (importe != "") {
                                        query = "''" + numplaza + "'',''" + empleado + "'',''" + vigini + "'',''" + vigfin + "'',''" + tipopago + "'',''" + cvebanco + "'',''" + desbanco + "'',''" + cuenta + "'',''" + cveads + "'',''" + cvepag + "'',''" + cveestruc + "'',''" + obs + "'',''" + clave + "'',''" + tipacumula + "''," + importe + ",''" + nomcom + "''"
                                        INSERTAR_CAPTURA(tipomov, query, 'D', numdoc);
                                    }
                                    else { $.messager.alert('Error', 'Faltan importes de los indicadores de deducción', 'error'); break; }
                                }

                                //var tdga = $('#dga').datagrid('getData').total;
                                var tdga = $('#dga').datagrid('getRows');
                                for (var a = 0; a < tdga.length; a++) {
                                    var clave = $('#dga').datagrid('getRows')[a].clave;
                                    var importe = $('#dga').datagrid('getRows')[a].importe;
                                    var tipacumula = $('#dga').datagrid('getRows')[a].tip_acumula;

                                    if (importe != "") {
                                        query = "''" + numplaza + "'',''" + empleado + "'',''" + vigini + "'',''" + vigfin + "'',''" + tipopago + "'',''" + cvebanco + "'',''" + desbanco + "'',''" + cuenta + "'',''" + cveads + "'',''" + cvepag + "'',''" + cveestruc + "'',''" + obs + "'',''" + clave + "'',''" + tipacumula + "''," + importe + ",''" + nomcom + "''"
                                        INSERTAR_CAPTURA(tipomov, query, 'A', numdoc);
                                    }
                                    else { $.messager.alert('Error', 'Faltan importes de los indicadores de aportaciones', 'error'); break; }
                                }

                                var titulo = "";
                                if (tipomov == "G") { titulo = "Movimiento Generado Correctamente<br><h3><b>" + numdoc + "</b></h3>"; LIMPIAR_CAPTURA('#btnLimpiarCap'); }
                                if (tipomov == "M") { titulo = "Documento<h3><b> " + numdoc + "</b></h3> Modificado Correctamente"; LIMPIAR_CAPTURA('#btnLimpiarCap'); }

                                if ((sessionStorage.getItem('P') == "0") && (sessionStorage.getItem('D') == null) && (sessionStorage.getItem('A') == null))
                                {                                    
                                    $.messager.alert({ title: 'Información', msg: '<div style="height:100%" align="center">'+titulo+'</div>', icon: 'info', width: 20 + "%" });
                                }
                                else
                                    if ((sessionStorage.getItem('P') == "0") && (sessionStorage.getItem('D') == "0") && (sessionStorage.getItem('A') == null))
                                    {                                        
                                        $.messager.alert({ title: 'Información', msg: '<div style="height:100%" align="center">' + titulo + '</div>', icon: 'info', width: 20 + "%" });
                                    }
                                    else
                                        if ((sessionStorage.getItem('P') == "0") && (sessionStorage.getItem('D') == "0") && (sessionStorage.getItem('A') == "0"))
                                        {                                     
                                            $.messager.alert({ title: 'Información', msg: '<div style="height:100%" align="center">' + titulo + '</div>', icon: 'info', width: 20 + "%" });
                                        }

                                $('#dvigenciainicial').datebox('setValue', fechainicial);
                                $('#dvigenciafinal').datebox('setValue', fechafinal);
                                
                            }
    }
}

function INSERTAR_CAPTURA(strmov,query,tipo,folio)
{              
        var parametros = {};        
        parametros.strmov = strmov;        
        //parametros.strusuario = $.session.get("usuario");
        parametros.strvalores = query;
        parametros.strfolio = folio;
        parametros.multi = valnomina;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Insertar_Captura",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                sessionStorage.setItem(tipo, data.d[0]);                                                                            
                //if (data.d[0] == "1")
                //{ $.messager.alert('Error', data.d[1], 'error'); }
                //else
                //{
                //    $.messager.alert('Información', data.d[1], 'info');
                //}
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

function INCREMENTO_CONTADOR()
{
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Incremento_Contador",      
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {           
            numdoc= data.d;            
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

function CARGAR_INDICADORES(dgcontrol, url) { 
    $(dgcontrol).datagrid({
        url: url        
    });   
}

function CARGAR_DG_IND(dgcontrol,obj)
{   
    $(dgcontrol).datagrid('loadData', { "total": 0, "rows": [] });
    
    $(dgcontrol).datagrid({
        pagination: true,
        rownumbers: true,
        striped: true,
        pageSize: 10,
        singleSelect: true,
        rownumbers: true,
        columns: [[
            { field: 'clave', title: 'Indicador', width: 70, align: 'center' },
            { field: 'descripcion', title: 'Descripción', width: 300, align: 'left' },
            { field: 'importe', title: 'Importe', width: 75, align: 'right', editor: { type: 'numberbox', options: { precision: 1 } } }
        ]],
        data: obj
    });
    //for (var i = 0; i < obj.length; i++) {      
    //    $(dgcontrol).datagrid('insertRow', {
    //            index: i,
    //            row: {
    //                clave: obj[i].clave,
    //                descripcion: obj[i].descripcion,
    //                importe: obj[i].importe
    //            }
    //        });        
    //}
    //dg.datagrid('beginEdit', index);
    //dg.datagrid('endEdit', index);
}

function ELIMINAR_INDICADOR(doc,indicador,tipoind)
{
    var parametros = {};
    parametros.documento = doc;
    parametros.indicador = indicador;
    parametros.tipoind = tipoind;
    $.ajax({
        type: "POST",
        url: "Funciones.aspx/Eliminar_Indicador",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Información', data.d[1], 'info');
            }
            else {
                $.messager.alert('Error', data.d[1], 'error');
            }           
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

function ELIMINAR_DOCUMENTO() {
       
    if (cvemov != "") {
        var parametros = {};
        parametros.condicion = cvemov;
        $.ajax({
            type: "POST",
            url: "Funciones.aspx/Eliminar_Documento",
            data: JSON.stringify(parametros),
            dataType: "json",
            async: false,
            cache: false,
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (tipomov == "E") {
                    $.messager.alert('Información', data.d[1], 'info');
                    CARGAR_MOVIMIENTOS('#dgmov', 80, 500, "");
                }
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
}

function VALIDAR_MULTINOMINA(btnobj, tipo) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {       
        if ((valnomina != undefined) && (valnomina != '')) {
            var parametros = {};
            parametros.multi = valnomina;
            $.ajax({
                type: "POST",
                url: "Funciones.aspx/Validacion_Multinomina",
                data: JSON.stringify(parametros),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $('#loading').show();
                },
                success: function (data) {
                    if (data.d[0] == "1") {                        
                        document.getElementById('lblquin1').innerHTML = "";
                        document.getElementById('lblquin1').innerHTML = nominasel;
                        document.getElementById('lblquin2').innerHTML = "";
                        document.getElementById('lblquin2').innerHTML = nominasel;

                        if (tipo == 'NC') { NUEVA_CAPTURA(); }
                        else
                            if (tipo == 'MC') { MODELI_CAPTURA(); }
                    }
                    else {                        
                        $.messager.alert('Error', 'La nomina ' + nominasel + ' se encuentra cerrada', 'error');

                        SACAR_NOMINAS();
                    }
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
        else { $.messager.alert('Error', 'Falta seleccionar la nomina a capturar', 'error'); }
    }
}



