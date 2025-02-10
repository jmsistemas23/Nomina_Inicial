$(document).ready(function () {
    CARGAR_QUINCENAS("#cboquin");

    $('#btnBuscar').bind('click', function () {
        CARGAR_DATOS('#dg', '');
        CARGAR_CAMPOSBUSQUEDA('#dg', '#cbocam');
        windows("#winemp", 1000, 645,false, "Pensionadas");
        var text = $('#txtval');
        text.textbox('clear').textbox('textbox').focus();
    });

    $('#txtval').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); }
        }
    });

    $('#btnfiltrar').bind('click', function () { FORMAR_CONDICION($("#cbocam").combobox('getValue'), $("#cbocon").combobox('getValue'), $("#txtval").textbox('getValue')); });

    $('#btnLimpiar').bind('click', function () { LIMPIAR_DATOS(); });

    $('#cboquin').combobox({
        onSelect: function (rec) {
            //if (rec.valor != "x") {
                if ($('#txtempleado').textbox('getValue') != "") {
                    LIMPIAR_DATOS();
                    rows = $('#dg').datagrid('getSelected');
                    if (rows) {                      
                            LISTAR_PENSIONADAS(rows.id, rec.valor);                        
                    }
              //  }
//                else { $.messager.alert('Error', 'Falta seleccioanr el empleado', 'error'); }
            }
        },
    });
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

function CARGAR_DATOS(dgcontrol, condicion, quincena) {
    var colsort = "numemp asc";
    $(dgcontrol).datagrid({
        url: "Listar_Pension.aspx?busqueda=" + condicion + "&colord=" + colsort,
        pagination: true,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        multiSort: true,
        remoteSort: false,
        pageSize: 20,
        width: "100%",
        heigth: "100%",
        beforeSend: function () {
            $('#loading').show();
        },
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                rows = $(dgcontrol).datagrid('getSelected');
                var quin = $('#cboquin').combobox('getValue');                
                LISTAR_PENSIONADAS(rows.id, quin);
                $("#winemp").window('close');
            }
        },
        onSortColumn: function (sort, order) {
            colsort = "";
            colsort += sort + ' ' + order + "|";
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
    if (objval != "") {
        var vcampo = objcam;
        var vcondicion = objcon;
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + objval + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + objval + '\'\''; }
    }
    else { condicion = " "; }
    CARGAR_DATOS('#dg', condicion,'');
}

function LISTAR_PENSIONADAS(valor,quincena) {
    var obj = "";
    var parametros = {};
    parametros.valor = valor;
    parametros.quincena = quincena;
    $.ajax({
        type: "POST",
        url: 'funciones.aspx/Listar_Pensionadas',
        data: JSON.stringify(parametros),
        dataType: "json",
        async: false,
        cache: false,
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] != "") {
                obj = $.parseJSON(data.d[0]);
                if (obj.length > 0) {
                    $('#txtempleado').textbox('setValue', obj[0].numemp);
                    $('#txtrfc').textbox('setValue', obj[0].rfccom);
                    $('#txtnombreempleado   ').textbox('setValue', obj[0].nomemp);

                    $('#txtrfcpen').textbox('setValue', obj[0].rfcpen);
                    $('#txtcurppen').textbox('setValue', obj[0].curpen);
                    $('#txtappaternopen').textbox('setValue', obj[0].patpen);
                    $('#txtapmaternopen').textbox('setValue', obj[0].matpen);
                    $('#txtnompen').textbox('setValue', obj[0].nomspen);
                    $('#txtsexopen').textbox('setValue', obj[0].sexo);
                    $('#txtcallepen').textbox('setValue', obj[0].callepen);
                    $('#txtcoloniapen').textbox('setValue', obj[0].colonpen);
                    $('#txtestadopen').textbox('setValue', obj[0].edopen);
                    $('#txtifepen').textbox('setValue', obj[0].ifepen);
                    $('#txttelefonopen').textbox('setValue', obj[0].telefpen);
                    $('#txtnoexteriorpen').textbox('setValue', obj[0].numinpen);
                    $('#txtnointeriorpen').textbox('setValue', obj[0].numexpen);
                    $('#txtcppen').textbox('setValue', obj[0].codpopen);
                    $('#txtmunicipiopen').textbox('setValue', obj[0].munipen);
                    $('#txtlocalidadpen').textbox('setValue', obj[0].localipen);
                    $('#txtnooficio').textbox('setValue', obj[0].oficipen);
                    $('#txtnoexpendiente').textbox('setValue', obj[0].expedpen);                    
                    $('#txtjuzgado').textbox('setValue', obj[0].juzgapen);
                    $('#txtnombrejuez').textbox('setValue', obj[0].nomjupen);
                    $('#txtindicador').textbox('setValue', obj[0].indicador);                    
                    $('#txtporcentaje').textbox('setValue', obj[0].penimpor);                     
                    $('#txtdescripcion').textbox('setValue', obj[0].cvenetolegal);
                    $('#txtviginicial').textbox('setValue', obj[0].viginimv);
                    $('#txtvigfinal').textbox('setValue', obj[0].vigfinmv);
                    $('#txttipopago').textbox('setValue', obj[0].pagppen);
                    $('#txtcheque').textbox('setValue', obj[0].numcheque);
                    $('#txtimporte').textbox('setValue', obj[0].imppen01);
                    $('#txtbanco').textbox('setValue', obj[0].banco);
                    $('#txtcuenta').textbox('setValue', obj[0].cuepagpen);
                    $('#txtcuentaclabe').textbox('setValue', obj[0].ctacbepen);
                    $('#txtpagaduria').textbox('setValue', obj[0].pagaduria + " " + obj[0].desmun + "," + obj[0].desloc);


                }

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

function LIMPIAR_DATOS()
{
    //$('#cboquin').combobox('setValue','x');
    $('#txtempleado').textbox('setValue', '');
    $('#txtrfc').textbox('setValue', '');
    $('#txtnombreempleado   ').textbox('setValue', '');

    $('#txtrfcpen').textbox('setValue', '');
    $('#txtcurppen').textbox('setValue', '');
    $('#txtappaternopen').textbox('setValue', '');
    $('#txtapmaternopen').textbox('setValue', '');
    $('#txtnompen').textbox('setValue', '');
    $('#txtsexopen').textbox('setValue', '');
    $('#txtcallepen').textbox('setValue', '');
    $('#txtcoloniapen').textbox('setValue', '');
    $('#txtestadopen').textbox('setValue', '');
    $('#txtifepen').textbox('setValue', '');
    $('#txttelefonopen').textbox('setValue', '');
    $('#txtnoexteriorpen').textbox('setValue', '');
    $('#txtnointeriorpen').textbox('setValue', '');
    $('#txtcppen').textbox('setValue', '');
    $('#txtmunicipiopen').textbox('setValue', '');
    $('#txtlocalidadpen').textbox('setValue', '');
    $('#txtnooficio').textbox('setValue', '');
    $('#txtnoexpendiente').textbox('setValue', '');
    $('#txtjuzgado').textbox('setValue', '');
    $('#txtnombrejuez').textbox('setValue', '');
    $('#txtindicador').textbox('setValue', '');
    $('#txtporcentaje').textbox('setValue', '');
    $('#txtdescripcion').textbox('setValue', '');
    $('#txtviginicial').textbox('setValue', '');
    $('#txtvigfinal').textbox('setValue', '');
    $('#txttipopago').textbox('setValue', '');
    $('#txtcheque').textbox('setValue', '');
    $('#txtimporte').textbox('setValue', '');
    $('#txtbanco').textbox('setValue', '');
    $('#txtcuenta').textbox('setValue', '');
    $('#txtcuentaclabe').textbox('setValue', '');
    $('#txtpagaduria').textbox('setValue', '');
}
