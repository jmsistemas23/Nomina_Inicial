var index=null;
$(window).load(function () {
    SACAR_NOMINAS();    
});
$(document).ready(function () {
    Listar_BloqueosDesbloqueos();

    CARGAR_PERFILES('#dg', 100, 80);
    $('#btnBuscarperfil').bind('click', function () { BUSCAR_PERFIL('#btnBuscarperfil'); });

    $('#txtvalorperfil').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            CARGAR_PERFILES('#dg', 100, 80);
        }
    });

    $('#btnanterior').bind('click', function () {
        $('#dmenu').show();
        $('#dcargar').hide();        
        $('#dg').datagrid('unselectRow', index);        
    });
  
});


function Listar_BloqueosDesbloqueos() {
    var parametros = {};
    parametros.modulo = 'Captura';
    parametros.tipomov = 'PE';
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
            if (data.d[0] == "C") {
                $('#lblbloqueada').hide();
                $('#dperfil').show();
            }
            else {
                $('#lblbloqueada').show();
                $('#dperfil').hide();
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
        url: "Funciones.aspx/ConsultaControl",
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
                $('#dperfil').show();
                CREAR_BONONES_NOMINAS_ANTERIORES(objM, obj);
                Listar_BloqueosDesbloqueos();
            }
            else {
                $('#dextras').hide();
                $('#lblnominas').show();
                valnomina = '';
                nominasel = '';
                $('#dperfil').hide();
                $('#lblbloqueada').hide();
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
            // text: objm[b].nomquin,
            id: "btn" + objm[b].cvequica + objm[b].numext,
            name: objm[b].cvequica + "|" + objm[b].anoquica + "|" + objm[b].numext
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
        }).bind('click', function () {
            selnomina = this.text;
            valnomina = this.name;
            $("#hmulti").val(this.name);
        });
        if (objm.length == 1) {
            var btn = $('#btn' + objm[b].cvequica + objm[b].numext).linkbutton('select');
            selnomina = btn[0].text;
            valnomina = btn[0].name;
            $("#hmulti").val(btn[0].name);
        }
    }
}
function VALOR_NOMINA_ACTUAL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {

        document.getElementById('lblquinperfil').innerHTML = "";
        document.getElementById('lblquinperfil').innerHTML = nominasel;
        document.getElementById('lblnuevacap').innerHTML = "";
        document.getElementById('lblnuevacap').innerHTML = nominasel;
        document.getElementById('lblquindoc').innerHTML = "";
        document.getElementById('lblquindoc').innerHTML = nominasel;
        document.getElementById('lblquinter').innerHTML = "";
        document.getElementById('lblquinter').innerHTML = nominasel;


        $.session.set('valnomina', '');
    }
}

function CARGAR_PERFILES(dgcontrol, ancho, alto) {
    var condicion = "";
    if ($('#txtvalorperfil').textbox('getValue') != "") { condicion = $('#txtvalorperfil').textbox('getValue');}
    $(dgcontrol).datagrid({
        url: "Listar_Perfiles_Excel.aspx?&busqueda=" + condicion,
        pagination: false,
        rownumbers: true,
        scroll:true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: ancho + "%",
        heigth: alto + "%",
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                $('#dmenu').hide();
                $('#dcargar').show();
                index = $(dgcontrol).datagrid('getRowIndex', rows);
                document.getElementById('lblperfil').innerHTML = rows.descripcion;
                $("#hid").val(rows.fkProEsp);
            }
        }
    });
}

function BUSCAR_PERFIL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        CARGAR_PERFILES('#dg', 100, 100);
    }
}

function CargaRealizada(datos) {
    if (datos == "Si") {
        $.session.set('Carga', datos);
        $('#loading').hide();
    }
    else { $.messager.alert('Error', 'Falta seleccionar el archivo a cargar', 'error'); }
}
