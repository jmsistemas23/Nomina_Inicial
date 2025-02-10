var tabla = "";
var condicion = "";
var indice = null;
var objtbl = "";
var vcarga = "";
var objcampos = "", error = "", objgrid="",ccat="";
var anchovista = "", altovista = "", registros = "", paginacion = "", Descripcion = "",modulo="";
var Clave = "", campollave = "", tipomov, vcat = "", NivelInicial = "", hist = "";
var FiltroCatalogos = "";
var FiltroVista = "", FiltroSeleccionado = "", RowSelecct = "";
var NivelSeleccionado = "", btncampo="";
var NumNivel = "", objNiveles = "", DesNivel = "", GenerarClave = "", CamposGenerar = "", CamposCaptura = "", ctrltbl = "", Campos = "", CondicionGuardar = "", titulosniveles = "", camponivel="";
$(document).ready(function () {
    $.extend($.fn.validatebox.methods, {
        required: function (jq, required) {
            return jq.each(function () {
                var opts = $(this).validatebox('options');
                opts.required = required != undefined ? required : true;
                $(this).validatebox('validate');
            })
        }
    })    

    if ($_GET('idtabla') != null) {
        tabla = $_GET('idtabla');
    } else { tabla = ''; }
    if ($_GET('mod') != null) {
        modulo = $_GET('mod');
    } else { modulo = ''; }
    if ($_GET('tabla') != null) {
        destabla = $_GET('tabla');
    } else { destabla = ''; }
    if ($_GET('hist') != null) {
        hist = $_GET('hist');
    } else { hist = ''; }
    if ($_GET('ccat') != null) {
        ccat = $_GET('ccat');
    } else { ccat = ''; }
    
   
    $('#btnANivel').hide();
    $('#btnSNivel').hide();
    $('#btnhistoria').hide();
    $('#btnreportes').hide();
    
    if (modulo.toUpperCase() == "CON") {
        $('#btnagregar').hide();
        $('#btneditar').hide();
        $('#btneliminar').hide();
        $('#btnreportes').hide();
        $('#btnRvista').hide();
    }
    else {
        $('#btnagregar').show();
        $('#btneditar').show();
        $('#btneliminar').show();
        $('#btnreportes').show();
        $('#btnRvista').show();
    }
    
    LISTAR_NIVELES();
    CARGAR_CONFIGURACION("#dg");
    
   
      
    $('#txtvalor').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_VISTA("#dg");
        }
    });  
    FOCUS('#txtvalor', "#dg");
    $('#btnbuscar').bind('click', function () { FILTRAR_VISTA("#dg"); });

    $('#txtvalcat').textbox('textbox').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            FILTRAR_CAT("#dgcat");
        }
    });
    FOCUS('#txtvalcat', "#dgcat");
    $('#btnfiltrarcat').bind('click', function () { FILTRAR_CAT("#dgcat"); });

        $('#btnagregar').bind('click', function () { NUEVA_CAPTURA(); });
        $('#btneditar').bind('click', function () { EDITAR_CAPTURA(); });
        $('#btnregresar').bind('click', function () { REGRESAR(); });
        $('#btnguardar').bind('click', function () { GUARDAR_CAPTURA(); });
        $('#btnlimpiar').bind('click', function () {   LIMPIAR_OBJCAPTURA("tbl", "campos", "ban");  });
        $('#btneliminar').bind('click', function () { ELIMINAR_CAPTURA(); });
        
        $('#btnLvista').bind('click', function () { LIMPIAR_VISTA('#btnLvista'); });

        if (modulo == "") { $('#btnRvista').hide(); }
        else
         {            
            if (modulo == "Mcat")
            { $('#btnRvista').bind('click', function () {  document.location = "Catalogos_Menu.aspx?idtabla=" + tabla + "&mod=Mcat"; }); }
            else { $('#btnRvista').bind('click', function () {  document.location = "Catalogos_configuracion.aspx?idtabla=" + tabla + "&tabla=" + destabla + "&mod=Mcat"; }); }
        }
                
        $('#btnANivel').bind('click', function () { ANTERIOR_NIVEL('#btnANivel'); });
        $('#btnSNivel').bind('click', function () { SIGUIENTE_NIVEL('#btnSNivel'); });
        $('#btnhistoria').bind('click', function () { CARGAR_HISTORIA('#btnhistoria'); });
});

function SACAR_DISEÑO_CAMPOS() {
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strcampo = "";
    $.ajax({
        type: "POST",
        url: "Funsiones_catgen.aspx/CamposNuevaCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                error = data.d[1];
                $.messager.alert('Error', data.d[1], 'error');                
                CamposGenerar = "";
                $('#btnLvista').hide();
                $('#btnagregar').hide();
                $('#btneditar').hide();
                $('#btneliminar').hide();
                $('#btnreportes').hide();
            }
            else {
                objcampos = $.parseJSON(data.d[0]);
                CamposGenerar=data.d[1];                            
                $('#btnLvista').show();
                $('#btnagregar').show();
                $('#btneditar').show();
                $('#btneliminar').show();
                $('#btnreportes').hide();
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

function LISTAR_NIVELES()
{      
        var parametros = {};
        parametros.strtabla = tabla;
        $.ajax({
            type: "POST",
            url: "Funsiones_catgen.aspx/Listar_Niveles",
            data: JSON.stringify(parametros),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                objNiveles = jQuery.parseJSON(data.d[0]);
                if (objNiveles.length > 0) {
                    if (objNiveles[0].CatHistoria == 1) { $('#btnSNivel').hide(); }
                    else {
                        $('#btnSNivel').show();
                    }                                          

                    var NivelesArray = jQuery.grep(objNiveles, function (Niveles, i) {
                            return Niveles.CatNivelAct == tabla;
                        });
                        if (NivelesArray.length > 0) {
                            if (NivelesArray[0].NumNivelAnt == 0) {                                                    
                                NumNivel = NivelesArray[0].NumNivel;
                                cveniveles.push(new Niveles(NivelesArray[0].NumNivel, NivelesArray[0].NumNivelAnt, NivelesArray[0].CatNivelAct, NivelesArray[0].CveNivelAct, NivelesArray[0].CatNivelSig, '', '', NivelesArray[0].CatHistoria));                                
                                NivelSeleccionado=JSON.stringify(cveniveles);
                            }
                        }                       
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

function CARGAR_CONFIGURACION(dgcontrol) {
    var paginacion = true; var registros = ""; var Clave = 0,Descripcion="";
    var parametros = {};
    parametros.strtabla = tabla;          
    $.ajax({
        type: "POST",
        url: "Funsiones_catgen.aspx/ConfiguracionVista",
        data: JSON.stringify(parametros),
        dataType: "json",        
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {            
            objtbl = jQuery.parseJSON(data.d[0]);
            objgrid = jQuery.parseJSON(data.d[1]);
          
            if (objtbl.length > 0) {
                if (objtbl[0].GenerarClave == 1)
                {GenerarClave=objtbl[0].GenerarClave}
                else{ GenerarClave="";}

                 if (objtbl[0].CatAncho != "")
                { anchovista = objtbl[0].CatAncho + "%"; }
                else { anchovista = "100%"; }

                if (objtbl[0].CatAlto != "")
                { altovista = objtbl[0].CatAlto + "%"; }
                else { altovista = "100%"; }

                if (objtbl[0].CatRegistros != "")
                { registros = objtbl[0].CatRegistros; paginacion = true; }
                else { paginacion = false; }

                if (objtbl[0].Descripcion != "")
                { Descripcion = objtbl[0].Descripcion; }

                if (objtbl[0].Clave != "")
                { Clave = objtbl[0].Clave; }

                if (objtbl[0].CampoLlave != "")
                { campollave = objtbl[0].CampoLlave; }

                if (modulo.toUpperCase() != "CON") {
                    if ((objtbl[0].CamposCaptura != undefined) && (objtbl[0].CamposCaptura != "")) {
                        $('#dmenu').show();
                        if (objtbl[0].CatAgregar == true) { $('#btnagregar').show(); } else { $('#btnagregar').hide(); }
                        if (objtbl[0].CatModificar == true) { $('#btneditar').show(); } else { $('#btneditar').hide(); }
                        if (objtbl[0].CatEliminar == true) { $('#btneliminar').show(); } else { $('#btneliminar').hide(); }
                        if (objtbl[0].CatHistoria == true) { $('#btnhistoria').show(); } else { $('#btnhistoria').hide(); }
                        if (objtbl[0].CatReportes == true) { $('#btnreportes').show(); } else { $('#btnreportes').hide(); }

                        $('#btneditar').linkbutton({ disabled: true });
                        $('#btneliminar').linkbutton({ disabled: true });
                        $('#btnhistoria').linkbutton({ disabled: true });
                        $('#btnreportes').linkbutton({ disabled: true });

                        SACAR_DISEÑO_CAMPOS();
                    }
                    else {
                        if (modulo == "") { $('#dmenu').hide(); }
                        else
                        {
                            $('#dmenu').show();
                            $('#btnagregar').hide();
                            $('#btneditar').hide();
                            $('#btneliminar').hide();
                            $('#btnhistoria').hide();
                            $('#btnreportes').hide();
                            if ((modulo == "cat") || (modulo == "con")) {
                                $('#btnRvista').show();
                            }
                            else { $('#btnRvista').hide(); }
                        }

                    }
                }
                DISEÑO_GRID(dgcontrol,objgrid);
                CARGAR_VISTA(dgcontrol,objtbl,objtbl[0].CatTitulo, paginacion, registros, Clave, Descripcion);
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

function DISEÑO_GRID(dgcontrol,objgrid)
{
    var $datagrid = {};
    var columns = new Array();
    var frozen = new Array();

    var columnas = objgrid[0].Columnas.split('|');
    for (var col = 0; col < columnas.length; col++) {
        datos = columnas[col].split(',');
        var valor = datos[0];
        var alineardato = datos[1];
        var titulo = datos[2];
        var alineartitulo = datos[3];
        var ancho = datos[4];
        var visible = $.parseJSON(datos[5]);
       
        columns.push({ "field": valor, "title": titulo, "width": ancho, "align": alineardato, "halign": alineartitulo, "hidden": visible });
    }
    if (objgrid[0].BloqueoColumnas != "") {
        var frozenColumns = objgrid[0].BloqueoColumnas.split('|');
        for (var col = 0; col < frozenColumns.length; col++) {
            datos = frozenColumns[col].split(',');
            var valor = datos[0];
            var alineardato = datos[1];
            var titulo = datos[2];
            var alineartitulo = datos[3];
            var ancho = datos[4];
            var visible = $.parseJSON(datos[5]);

            frozen.push({ "field": valor, "title": titulo, "width": ancho, "align": alineardato, "halign": alineartitulo, "hidden": visible });
        }
    }
    $datagrid.columns = new Array(columns);
    $datagrid.frozenColumns = new Array(frozen);
    $(dgcontrol).datagrid({ columns: "",frozenColumns:"", url: "" });
    $(dgcontrol).datagrid($datagrid);    
}

function CARGAR_VISTA(dgcontrol,objtbl, titulo, paginacion, registros, clave, descripcion)
{       
   var campofiltro = "";  
    $(dgcontrol).datagrid({
        url: 'Listar_DatosVista.aspx?tabla=' + tabla + '&busqueda=' + FiltroVista + '&hist=' + hist,
        pagination: paginacion,    
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: registros,
        width: anchovista,
        heigth: altovista,
        onClickRow: function () {
            var fields = $(dgcontrol).datagrid('getColumnFields', true).concat($(dgcontrol).datagrid('getColumnFields', false));
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {                
                $('#btnguardar').linkbutton({ text: 'Modificar', iconCls: 'icon-save' });
                tipomov = 'Modificar';
                document.getElementById('lblsubtitulo').innerHTML = "Modificar";

                if (modulo.toUpperCase() != "CON") {
                    if (objtbl[0].CatModificar == true)
                    { $('#btneditar').linkbutton('enable'); }
                    if (objtbl[0].CatEliminar == true)
                    { $('#btneliminar').linkbutton('enable'); }
                    if (objtbl[0].CatHistoria == true)
                    { $('#btnhistoria').linkbutton('enable'); }
                    if (objtbl[0].CatReportes == true)
                    { $('#btnreportes').linkbutton('enable'); }
                }
                
                if (objNiveles != undefined) {
                    if (modulo != 'Con') {
                        if (objNiveles.length > 0) {
                            $('#btnSNivel').linkbutton({ disabled: false });
                            if (NumNivel > 0) {
                                $('#btnANivel').linkbutton({ disabled: false });
                            }
                            else { $('#btnANivel').linkbutton({ disabled: true }); }
                        }
                        else { $('#btnSNivel').hide(); $('#btnSNivel').linkbutton({ disabled: true }); }
                    }

                    var NivelesArray = jQuery.grep(objNiveles, function (Niveles, i) {
                        return Niveles.CatNivelAct.toUpperCase() == tabla.toUpperCase();
                    });
                    if (NivelesArray.length > 0) {
                        if (NivelesArray[0].CatHistoria == true) {
                            DesNivel = titulo + " = " + rows[fields[descripcion]] + "(" + rows[fields[clave]] + ") / ";
                            var camposAct = NivelesArray[0].CveNivelAct.split(',');                            
                            RowSelecct = camposAct[c] + "= ''" + rows[camposAct[c]] + "''";
                        }
                        else
                        {
                            DesNivel = titulo + " = " + rows[fields[descripcion]] + "(" + rows[fields[clave]] + ") / ";
                            var camposAct = NivelesArray[0].CveNivelAct.split(',');
                            campofiltro = NivelesArray[0].CveNivelSig.split(',');                            
                            RowSelecct = campofiltro[c] + "= ''" + rows[camposAct[c]] + "''";
                        }
                    }

                    //var condicion = "";
                    //var NivelesArray = jQuery.grep(objNiveles, function (Niveles, i) {
                    //    return Niveles.CatNivelAct == tabla;
                    //});
                    //if (NivelesArray.length > 0) {
                    //    if (NivelesArray[0].CatHistoria == true) {
                    //        DesNivel = titulo + " = " + rows[fields[descripcion]] + "(" + rows[fields[clave]] + ") / ";

                    //       var camposAct = NivelesArray[0].CveNivelAct.split(',');
                    //        for (var c = 0; c < camposAct.length; c++) {
                    //            condicion += camposAct[c] + "= ''" + rows[camposAct[c]] + "'' and ";
                    //        }
                    //    }
                    //    else {
                    //        DesNivel = titulo + " = " + rows[fields[descripcion]] + "(" + rows[fields[clave]] + ") / ";

                    //        var camposAct = NivelesArray[0].CveNivelAct.split(',');
                    //        campofiltro = NivelesArray[0].CveNivelSig.split(',');
                    //        for (var c = 0; c < camposAct.length; c++) {
                    //            condicion += campofiltro[c] + "= ''" + rows[camposAct[c]] + "'' and ";
                    //        }                            
                    //    }
                    //}                   
                    //FiltroSeleccionado = condicion.substring(0, condicion.length - 4);                                        
                }                                            
            }
        },
        error: function (er) {         
           $.messager.alert('Error', er.statusText, 'error');
        }
    });

    CARGAR_CAMPOSBUSQUEDA(dgcontrol, '#cbcampos');
     
    if (modulo.toUpperCase() != "CON") {
        if (NumNivel != "") {
            if (NumNivel == 1) {
                document.getElementById('lblnivel').innerHTML = "";
                $('#btnANivel').hide();
                $('#btnSNivel').linkbutton({ disabled: true });
            }
            else {
                $('#btnANivel').show();


                if ((NivelSeleccionado != undefined) || (NivelSeleccionado != "")) {
                    var vniveles = jQuery.parseJSON(NivelSeleccionado);
                    titulosniveles = "";
                    for (var c = 0; c < vniveles.length; c++) {
                        titulosniveles += vniveles[c].Titulo;
                    }

                    document.getElementById('lblnivel').innerHTML = "";
                    document.getElementById('lblnivel').innerHTML = titulosniveles.substring(0, titulosniveles.length - 2);
                }
            }
        }

        if (hist == 1) {
            $('#btnANivel').show();
            $('#btnSNivel').hide();
            $('#btnhistoria').hide();
        }
        if (NivelSeleccionado != "") {
            var objniveles = jQuery.parseJSON(NivelSeleccionado);
            var NivelesArray = jQuery.grep(objniveles, function (Niveles, i) {
                return Niveles.CatAct.toUpperCase() == tabla.toUpperCase();
            });

            if (NivelesArray[0].CatAnt == "") {
                $('#btnSNivel').hide();
            } else {
                $('#btnSNivel').show();
                $('#btnSNivel').linkbutton({ disabled: true });
            }
        }
    }
   
}



function FILTRAR_VISTA(dgobjeto) {  
    var condicion = "";
    var vvalor = $('#txtvalor').textbox('getValue');
    if (vvalor != "") {
        var vcampo = $('#cbcampos').combobox('getValue');
        var vcondicion = $('#cbcondicion').combobox('getValue');
        if (vcondicion == 'like') { condicion = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
        else { condicion = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }

        if (FiltroSeleccionado != "") { FiltroVista = FiltroSeleccionado + " and " + condicion; }
        else { FiltroVista = condicion; }
    }
    else {
        if (FiltroSeleccionado != "") { FiltroVista = FiltroSeleccionado }
        else { FiltroVista = ''; }
    }
   

    CARGAR_CONFIGURACION(dgobjeto);
}

function CARGAR_CAMPOSBUSQUEDA(dgobjeto, cbobjeto) {
    var columna;    
    var Campos=[];
    var obj;
     
    var fields = $(dgobjeto).datagrid('getColumnFields', true).concat($(dgobjeto).datagrid('getColumnFields', false));
    for (var col=0;col<fields.length;col++)
    {
        obj = {};
        columna = $(dgobjeto).datagrid('getColumnOption', fields[col]);        
        obj["Clave"] = columna.field;
        obj["Descripcion"] = columna.title;
        if (col == 0) { obj["selected"] = true; }
        else { obj["Select"] = false; }
        Campos.push(obj);
    }        
    $(cbobjeto).combobox({
        data: Campos,
        valueField: "Clave",
        textField: "Descripcion",
        editable: false
    });
}

function LIMPIAR_VISTA()
{
    $('#txtvalor').textbox('setValue', '');    
    $('#cbcondicion').combobox('setValue', '=');          
    if (FiltroVista == "") { RowSelecct = ""; }
    //CARGAR_CONFIGURACION("#dg");
    FILTRAR_VISTA("#dg");
}

function REGRESAR() {       
    document.getElementById('lblsubtitulo').innerHTML = "";
    $('#pcaptura').hide();
    $('#pinicial').show();
    $('#btneditar').linkbutton('disable');
    $('#btneliminar').linkbutton('disable');    
    $('#cbcondicion').combobox('setValue', '=');
    $('#txtvalor').textbox('setValue', '');    
    if (FiltroVista == "") { RowSelecct = ""; }
    
    CARGAR_CONFIGURACION("#dg");
}

function LIMPIAR_OBJCAPTURA(objtbl,  ban) { 
    if (objtbl != null) {
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;
            var nulo = objcampos[i].ValidarNulo;            
                    
                if ((tipodato == "t") || (tipodato == "tm")) {                  
                     $('#' + campos).textbox('setValue', ''); 
                }

                if (tipodato == "n") {                    
                     $('#' + campos).numberbox('setValue', 0); 
                }

                if ((tipodato == "r") || (tipodato == "c")) {
                    var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                    for (var c = 0; c < ctrol.length; c++) {
                        var alias = ctrol[c].split(",");
                        $('#' + alias[1] + campos).prop('checked', false);
                    }
                }

                if (tipodato == "f") {                    
                    $('#' + campos).datebox('setText') == "";
                }

                if (tipodato == "s") {                    
                    $('#' + campos).combobox('setValue', 'x'); 
                }           
        }
    }

}

function DESHABILITAR_OBJ(lectura) {
    for (var i = 0; i < objcampos.length; i++) {
        var tipodato = objcampos[i].TipoDato;
        if ((tipodato == "t") || (tipodato == "n") || (tipodato == "tm")) {
            if (objcampos[i].SoloLectura == true)
            { $('#' + objcampos[i].Campo).textbox({ enabled: true }); }
            else
            { $('#' + objcampos[i].Campo).textbox({ enabled: lectura }); }
        }
        if ((tipodato == "c") || (tipodato == "r")) {
            if (objcampos[i].SoloLectura == true)
            { $('#' + objcampos[i].Campo).attr("disabled", true); }
            else
            { $('#' + objcampos[i].Campo).attr("disabled", lectura); }
        }
        if (tipodato == "f") {
            if (objcampos[i].SoloLectura == true)
            { $('#' + objcampos[i].Campo).datebox({ enabled: true }); }
            else
            { $('#' + objcampos[i].Campo).datebox({ enabled: lectura }); }
        }
        if (tipodato == "s") {
            if (objcampos[i].SoloLectura == true)
            { $('#' + objcampos[i].Campo).combobox({ enabled: true }); }
            else
            { $('#' + objcampos[i].Campo).combobox({ enabled: lectura }); }
        }
    }
}


function GUARDAR_DATOS(dgcontrol) {
    var parametros = {};
    parametros.strcampos = Campos;
    parametros.strtabla = tabla;
    parametros.strmov = tipomov;
    parametros.strcondicion = CondicionGuardar;
    $.ajax({
        type: "POST",
        url: "Funsiones_catgen.aspx/Movimientos_Catalogos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "1") {
                $.messager.alert('Información', data.d[1], 'info');
                CARGAR_CONFIGURACION("#dg");
                FiltroEliminar = '';
               // document.getElementById('lblsubtitulo').innerHTML = "";
                //$('#pcaptura').hide();
                //$('#pinicial').show();
                $('#btneditar').linkbutton('disable');
                $('#btneliminar').linkbutton('disable');
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
            CARGAR_CONFIGURACION('#dg');
            $('#loading').hide(100);
        }
    });
}

function SACAR_VALORES_GUARDAR() {
    var valores = '';
    var values = {};
    var control = "";
    var valor;   
    var cont = 0;
    var error = 0;
    $('#Dcaptura td input').each(function () {
        var campo = $(this).attr('name');
      
        if (campo != undefined) {            
            var index = campo.indexOf('-')
            var tipodato = campo.substring(0, index);
            var nomcampo = campo.substring(index + 1, campo.length);

            if ((tipodato == "r")) {
                valor = $('#' + tipodato + "-" + nomcampo).is(":checked");
                if (valor == true) { valor = alias[1]; return false; }
                else if (val == false) { valor = alias[1]; }
            }
            else
            if ((tipodato == "c")) {
                valor = $('#' +nomcampo).is(":checked");                               
                if (valor == true)
                { valor = "1"; }
                else
                { valor = "0"; }
            }
            else
                if (tipodato == 't') {
                    valor = $('#' + nomcampo).textbox('getValue').toUpperCase();                    
                }
                else
                    if (tipodato == 'tm') {
                        valor = $('#' + nomcampo).textbox('getValue').toUpperCase();
                    }
                    else
                   if ((tipodato == 'n') ||  (tipodato == 'd')) {
                            valor = $('#' + nomcampo).numberbox('getValue');
                        }
                        else
                            if (tipodato == 'f') {
                                if ($('#' + nomcampo).datebox('getText') == "") {
                                    valor = $('#' + nomcampo).datebox('getText');
                                }
                                else { valor = $('#' + nomcampo).datebox('getValue'); }
                            }
                            else
                                if (tipodato == 's') {
                                    valor = $('#' + nomcampo).combobox('getValue');
                                    if (valor == "x") {
                                        valor = "";
                                        //$.messager.alert('Error', 'Falta el valor del campo ' + nomcampo, 'error'); error = 1; return false;
                                    }
                                }
            //if (valor == "") { $.messager.alert('Error', 'Falta el valor del campo ' + nomcampo, 'error'); error = 1; return false; }
            //else
            //{                 
              valores += nomcampo + ':' + valor + '|'; 
                cont++;
            //}
        }
    });
    
    if (error == 0)
    {
        if (camponivel != "") { valores = valores+camponivel; }        
        
        Campos = valores.substring(0, valores.length - 1);
        if (tipomov != 'Guardar') {
            var makesArray = jQuery.grep(objtbl, function (objtabla, i) {
                return objtabla.Tablaconsultas.toUpperCase() == tabla.toUpperCase();
            });
            if (makesArray.length > 0) {
                if (makesArray[0].CampoLlave != "") {
                    if ($('#' + makesArray[0].CampoLlave).textbox('getValue') != "")
                    { CondicionGuardar = makesArray[0].CampoLlave + "=''" + $('#' + makesArray[0].CampoLlave).textbox('getValue').toUpperCase() + "''"; }
                    else { CondicionGuardar = ""; }
                }
            }
        }
    }    
}


function SACAR_CAPTURA() {
    var valores = '';   
    var valor = "";

    //var obj = $.parseJSON(objcampos);

    for (var i = 0; i < objcampos.length; i++) {
        var campos = objcampos[i].Campo;
        var tipodato = objcampos[i].TipoDato;

            //if (campos == "observmp")
            //{ var v = campos; }

            var oculto = document.getElementById(campos);
            var nulo = objcampos[i].ValidaNulos;

            if ((tipodato == "t") || (tipodato == "n") || (tipodato == "tm")) {              
                 valor = $('#' + campos).textbox('getValue'); 
            }

            if (tipodato == "c") {
                valor = $('#' + campos).is(":checked");
                if (valor == true)
                { valor = "1"; }
                else
                { valor = "0"; }
            }
            else
            if ((tipodato == "r")) {
                var ctrol = objcampos[i].CampoOpciones.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var alias = ctrol[c].split(",");
                    var val = $('#' + alias[0] + campos).is(":checked");

                    if (val == true) { valor = alias[1]; break; }
                    else if (val == false) { valor = alias[1]; }
                }
            }
            if (tipodato == "f") {

                if ($('#' + campos).datebox('getText') == "") {
                    valor = $('#' + campos).datebox('getText');
                }
                else { valor = $('#' + campos).datebox('getValue'); }

            }
            if (tipodato == "s") {               
                    valor = $('#' + campos).combobox('getValue');
                    if ((valor == "x") || (valor == "")) { valor = ""; }                                   
            }
            valores += campos + ':' + valor.toUpperCase() + '|';
        }
    //valores.substring(0, valores.length - 1);

    if (camponivel != "") { valores = valores + camponivel; }

    Campos = valores.substring(0, valores.length - 1);
    if (tipomov != 'Guardar') {
        var makesArray = jQuery.grep(objtbl, function (objtabla, i) {
            return objtabla.Tablaconsultas.toUpperCase() == tabla.toUpperCase();
        });
        if (makesArray.length > 0) {
            if (makesArray[0].CampoLlave != "") {
                if ($('#' + makesArray[0].CampoLlave).textbox('getValue') != "")
                { CondicionGuardar = makesArray[0].CampoLlave + "=''" + $('#' + makesArray[0].CampoLlave).textbox('getValue').toUpperCase() + "''"; }
                else { CondicionGuardar = ""; }
            }
        }
    }
    
}


function VALIDAR_CAPTURA(objtbl, objcampos, ban) {
    //if (objtbl == 'tbl')
    //{ objcampos = $.parseJSON(sessionStorage.getItem('objcampos')); }

    if (objtbl != null) {
        for (var i = 0; i < objcampos.length; i++) {
            var campos = objcampos[i].Campo;
            var tipodato = objcampos[i].TipoDato;
            var nulo = objcampos[i].ValidarNulo;
            //var origen = objcampos[i].CampoOrigen;

            //if (campos == 'vigfinmv')
            //{ var v = campos; }

           // if (origen == false) {
                if ((tipodato == "t") || (tipodato == "n") || (tipodato == "d")) {
                    valor = $('#' + campos).textbox('getValue');
                    if ((valor == "") && (nulo == true)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else { sessionStorage.setItem(ban, false); }
                }

                if ((tipodato == "r") || (tipodato == "c")) {
                    var ctrol = objcampos[i].CatalogoSeleccion.split("|");
                    for (var c = 0; c < ctrol.length; c++) {
                        var alias = ctrol[c].split(",");
                        var val = $('#' + alias[0] + campos).is(":checked");

                        if (val == true) { valor = alias[1]; break; }
                        else if (val == false) { valor = alias[1]; }
                    }
                }

                if (tipodato == "f") {
                    if ($('#' + campos).textbox('getText') == "") { valor = $('#' + campos).textbox('getText'); }
                    else { valor = $('#' + campos).textbox('getValue'); }

                    if ((valor == "") && (nulo == true)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else { sessionStorage.setItem(ban, false); }

                    if (valor == "") {
                        if (!Validar_Fecha(valor)) {
                            sessionStorage.setItem(ban, true);
                            $.messager.alert('Error', 'La fecha de la ' + objcampos[i].Descripcion + ' esta incorrecta ', 'error'); break;
                        }
                    }
                }

                if (tipodato == "s") {
                    valor = $('#' + campos).combobox('getValue');
                    if (((valor == "x") || (valor == "")) && (nulo == true)) { $.messager.alert('Información', 'Falta el valor ' + objcampos[i].Descripcion, 'info'); sessionStorage.setItem(ban, true); return 0; }
                    else {
                        if (((valor == "x") || (valor == "")) && (nulo == false))
                        { valor = ""; sessionStorage.setItem(ban, false); }
                    }
                }
           // }
        }
    }
}

function GUARDAR_CAPTURA() {
    VALIDAR_CAPTURA("tbl", "campos", "ban");
    //SACAR_VALORES_GUARDAR();
    SACAR_CAPTURA();
        if (tipomov != 'Guardar') {
           // SACAR_VALORES_ELIMINAR('#dg');

            if (indice != null)
            { $('#dg').datagrid('unselectRow', indice); }
        }

        GUARDAR_DATOS('#dg');        
}


function EDITAR_CAPTURA() {
    if (error == "0") {
        $.messager.alert('Error', error, 'error');
    }
    else {       
        var rows = $('#dg').datagrid('getSelected');
        if (rows) {
            if (objcampos.length > 0) {
                CREAR_CAPTURA(objcampos, "", '#Dcaptura', 'tbl');                
                CamposCaptura = objtbl[0].CamposCaptura + "@" + objgrid[0].ColSeleccion;
                SACAR_DATOS_BUSQUEDA(rows);
            }
        }
       
       // $('#' + campollave).textbox({ readonly: true });

    }
}

function ELIMINAR_CAPTURA() {
    $('#btnguardar').linkbutton({ text: 'Eliminar', iconCls: 'icon-cancel' })

    tipomov = 'Eliminar';
    document.getElementById('lblsubtitulo').innerHTML = "Eliminar";
    $('#pcaptura').show();
    $('#pinicial').hide();
    $('#btnguardar').linkbutton('enable');
    $('#btnlimpiar').hide();
        
    var rows = $('#dg').datagrid('getSelected');
    if (rows) {
        if (objcampos.length > 0) {
            CREAR_CAPTURA(objcampos, "", '#Dcaptura', 'tbl');
            CamposCaptura = objtbl[0].CamposCaptura + "@" + objgrid[0].ColSeleccion;
            SACAR_DATOS_BUSQUEDA(rows);
        }
    }
    //DESHABILITAR_OBJ(false);
}

function NUEVA_CAPTURA() {
   
    if (error == "0") {        
        $.messager.alert('Error', error, 'error');
    }
    else {
        $('#btnguardar').linkbutton({ text: 'Guardar', iconCls: 'icon-save' });
        tipomov = 'Guardar';
        CondicionGuardar = "";
        document.getElementById('lblsubtitulo').innerHTML = "Agregar";
        $('#btnguardar').linkbutton('enable');
        $('#btnlimpiar').show();
        $('#btnlimpiar').linkbutton('enable');
        $('#pinicial').hide();
        $('#pcaptura').show();

        //$('#' + campollave).textbox({ readonly: false });
        //DESHABILITAR_OBJ(false);

        if (objcampos.length > 0) {
            CREAR_CAPTURA(objcampos, "", '#Dcaptura', 'tbl');            
        }
    }
}


function CARGAR_COMBOBOX(objcampos, campo, valor) {
    var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
        return ocampos.Campo == campo;
    });
    if (makesArray.length > 0) {
      //  if (!makesArray[0].Campo) {
            var n = makesArray[0].Catalogo_Consulta.indexOf("@");
            if (n == -1) {
                Cargarddl(makesArray[0].Campo, makesArray[0].Catalogo_Tabla, makesArray[0].Catalogo_Valor, makesArray[0].Catalogo_Texto, makesArray[0].Catalogo_Consulta, makesArray[0].CampoRelacion, valor);
            }
            else {
                var qryrelacion = $('#' + makesArray[0].Campo).data("valor");
                var valores = qryrelacion.split("|");
                var camposfiltro = valores[2].split(",");
                var rquery = valores[0];
                for (var j = 0; j < camposfiltro.length; j++) {
                    var strcampo = camposfiltro[j];
                    var strvalor = $('#' + strcampo).combobox('getValue');
                    rquery = rquery.replace("@" + strcampo, "'" + strvalor + "'");
                }
                Cargarddl(makesArray[0].Campo, makesArray[0].Catalogo_Tabla, makesArray[0].Catalogo_Valor, makesArray[0].Catalogo_Texto, rquery, makesArray[0].CampoRelacion, valor);
            }
            //if (valor != "")
            //{ $('#' + makesArray[0].Campo).combobox("setValue", valor); }
            //else { $('#' + makesArray[0].Campo).combobox("setValue", "x"); }
       // }
        //else {
        //    document.getElementById(makesArray[0].Campo).setAttribute('value', valor);
        //}
    }
}
function BUSCAR_CAMPO(objcampos, objtbl) {
    var datos = CamposCaptura.split("@");
    var controles = datos[0].split("|");
    if (controles != "") {
        var columnas = datos[1].split(',');
        for (var i = 0; i < controles.length; i++) {
            var valores = controles[i].split("/");
            var campos = valores[0];
            var objetos = valores[1].split(",");
            var tipodato = objetos[0];
            var control = objetos[1];


            if (tipodato == "r") {
                var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                    return ocampos.Campo == campos;
                });
                var ctrol = makesArray[0].CampoOpciones.split("|");
                for (var c = 0; c < ctrol.length; c++) {
                    var valor = ctrol[c].split(",");
                    if (document.getElementById(valor[0] + control) == null) {
                        ban = true;
                        $.messager.alert('Error', ' El campo ' + valores[1] + ' no existe', 'error');
                    }
                }
            }
            else {
                //var campos = valores[1].split('-');
                // for (var j = 0; j < controles.length; j++) {
                if (document.getElementById(control) == null) {
                    ban = true;
                    $.messager.alert('Error', ' El campo ' + campos + ' no existe', 'error');
                }
                //}
            }
        }
    }
    else { $.messager.alert('Error', 'Falta la configuración de la captura', 'error'); return 0; }
}
function SACAR_DATOS_BUSQUEDA(registro) {
    ban = false;    

    var datos = CamposCaptura.split("@");
    var controles = datos[0].split("|");
    if (controles != "")
    {        
        $('#pcaptura').show();
        $('#pinicial').hide();
        $('#btnguardar').linkbutton('enable');
        $('#btnlimpiar').show();
        $('#btnlimpiar').linkbutton('enable');

        //DESHABILITAR_OBJ(false);

            if (!ban) {              

                BUSCAR_CAMPO(objcampos);

                var datos = CamposCaptura.split("@");
                var controles = datos[0].split("|");
                //var columnas = datos[1].split(',');
       
                for (var i = 0; i < controles.length; i++) {
                    var valores = controles[i].split("/");
                    var clave = valores[0];
                    var des = valores[1];
                    var objetos = valores[1].split(",");
                    var tipodato = objetos[0];
                    var control = objetos[1];
                    var valor = registro[clave];
                    //var texto = registro[des];

                    //if (campos == 'hrspue')
                    //{
                    //    var v = campos;
                    //}

                    var simbolo = ""; var valorant = "";
                    if ((tipodato == "t") || (tipodato == "n") || (tipodato == "d") || (tipodato == "tm")) {                        
                        var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                            return ocampos.Campo == control;
                        });
                        if (makesArray[0].Consulta_CamposConcatenar == 1) {

                            if (control.indexOf('ded') != -1) { simbolo = '-'; }
                            if ((control.indexOf('per') != -1) || (control.indexOf('apo') != -1)) { simbolo = '+'; }

                            if (($('#' + control).textbox('getValue') == "") && (valor == "")) { valorant = ""; }
                            else
                                if (($('#' + control).textbox('getValue') == "") && (valor != "")) {
                                    var n = valor.indexOf(simbolo);
                                    if (n != -1)
                                    { valorant = valor; } else { valorant = valor + simbolo; }
                                }
                                else { valorant = $('#' + control).textbox('getValue') + valor+simbolo; }

                            $('#' + control).textbox('setValue', valorant);
                        }
                        else { $('#' + control).textbox('setValue', valor); }

                    }
                    if (tipodato == "c") {
                        if ((valor == true) || (valor == 1)) { $('#' + control).prop("checked", true); }
                        else { $('#' + control).prop("checked", false); }
                    }
                    if (tipodato == "r") {
                        var makesArray = jQuery.grep(objcampos, function (ocampos, i) {
                            return ocampos.Campo == control;
                        });
                        var ctrol = makesArray[0].CampoOpciones.split("|");
                        for (var c = 0; c < ctrol.length; c++) {
                            var alias = ctrol[c].split(",");
                            if (valor == alias[1]) { $('#' + alias[0] + control).prop("checked", true); }
                            else { $('#' + alias[0] + control).prop("checked", false); }
                        }
                    }
                    if (tipodato == "f") {
                        $('#' + control).datebox('setValue', valor);
                    }
                    if (tipodato == "s") {
                        CARGAR_COMBOBOX(objcampos, control, valor);
                    }
                }
            }
        }
    else
    { $.messager.alert('Error', 'Falta la configuración de la captura', 'error'); return 0; }
}

function DISEÑO_CAT(dgcontrol, strdescripcion, objcampo, objtbl) {
    var parametros = {};
    parametros.strtabla = tabla;
    parametros.strcampo = btncampo;
   
    var $datagrid = {};
    var columns = new Array();

    $.ajax({
        type: "POST",
        url: "Funsiones_catgen.aspx/CamposNuevaCaptura",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.d[0] == "0") {
                $.messager.alert('Error', data.d[1], 'error');
            }
            else {
                var objcampos = $.parseJSON(data.d[0]);                
                if (objcampos[0].Consulta_LongitudColumnas != "") {
                    var columnas = objcampos[0].Consulta_LongitudColumnas.split('|');
                    for (var col = 0; col < columnas.length; col++) {
                        var datos = columnas[col].split(',');
                        var dato = datos[0];
                        var alineardato = datos[1];
                        var titulo = datos[2];
                        var alineartitulo = datos[3];                        
                        var ancho = datos[4] + "px";
                        var visible = JSON.parse(datos[5]);

                        columns.push({ "field": dato, "title": titulo, "width": ancho, "align": alineardato, "halign": alineartitulo, "hidden": visible });
                    }                    
                    $datagrid.columns = new Array(columns);
                    $(dgcontrol).datagrid({ columns: "", url: "" });
                    $(dgcontrol).datagrid($datagrid);
                   
                    CARGAR_CAMPOSBUSQUEDA("#dgcat", objcampo);

                    var campo = sessionStorage.getItem('nomcampo');
                    if (campo != "No") {                   
                        var condicion = campo + "=" + $('#' + btncampo).textbox('getValue');
                        sessionStorage.setItem('concat', condicion);
                        $("#txtvalcat").textbox('setValue', $('#' + btncampo).textbox('getValue'));
                        FILTRAR_CAT("#dgcat", "#txtvalcat", "#cbocamcat", "#cboconcat");
                    }
                    else {
                        sessionStorage.setItem('concat', '')                        
                        CARGAR_CAT("#dgcat",  objtbl);
                        FOCUS('#txtvalcat', "#dgcat");
                    }

                    windows("#wincat", 800, 626, strdescripcion);
                }
                else { $.messager.alert('Error', 'Se requiere configurar la busqueda', 'error'); }
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
function CARGAR_CAT(dgcontrol, objtbl) {       
    $(dgcontrol).datagrid({
        url: "Listar_Catalogo.aspx?tabla=" + tabla + "&campo=" + btncampo + "&busqueda=" + FiltroCatalogos,
        pagination: true,
        enableFilter: false,
        rownumbers: true,
        singleSelect: true,
        striped: true,
        pageSize: 20,
        width: "100%",
        heigth: 600+"px",
        onClickRow: function () {
            rows = $(dgcontrol).datagrid('getSelected');
            if (rows) {
                SACAR_DATOS_BUSQUEDA(rows, objtbl);
                $("#wincat").window('close');
                sessionStorage.setItem('nomcampo', "No");
            }
        }
    });
}
function FILTRAR_CAT(dgobjeto) {
    var vvalor = $("#txtvalcat").textbox('getValue');
    if (vvalor != "") {
        var vcampo = $("#cbocamcat").combobox('getValue');
        var vcondicion = $("#cboconcat").combobox('getValue');
        if (vvalor != "") {
            if (vcondicion == 'like') { FiltroCatalogos = vcampo + ' ' + vcondicion + ' \'\'|' + vvalor + '|\'\''; }
            else { FiltroCatalogos = vcampo + ' ' + vcondicion + ' \'\'' + vvalor + '\'\''; }
           
        }
        else {FiltroCatalogos= ""; }
    }
    else { FiltroCatalogos=""; }
    CARGAR_CAT(dgobjeto, objtbl);
}
function Cargarddl(ddlobj, tabla, cve, des, query, camporelacion, valor) {
    var parametros = {};
    parametros.obj = ddlobj;
    parametros.tabla = tabla;
    parametros.cve = cve;
    parametros.des = des;
    parametros.qry = query;
    parametros.camrel = camporelacion;

    var makesArray = [];
    $.ajax({
        type: "POST",
        url: "funsiones_catgen.aspx/LlenarCatalogos",
        data: JSON.stringify(parametros),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            var obj = $.parseJSON(data.d);
            $('#' + ddlobj).combobox({
                data: obj,
                valueField: 'valor',
                textField: 'descripcion',
                editable: false              
                //onSelect: function (rec) {
                //    if (rec.valor != "x") {
                //        if (rec.relacion != "") {
                //            var qryrelacion = $('#' + rec.relacion).data("valor");
                //            var valores = qryrelacion.split("|");
                //            var camposfiltro = valores[2].split(",");
                //            var rquery = valores[0];
                //            for (var j = 0; j < camposfiltro.length; j++) {
                //                rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                //            }
                //            Cargarddl(rec.relacion, obj[valores[1]].CatalogoSeleccion, obj[valores[1]].CatalogoValor, obj[valores[1]].CatalogoTexto, rquery, obj[valores[1]].CamposRelacion,valor);
                //        }
                //    }
                //},
            });
            if ((valor != "") && (valor!= undefined)) {              
                   $('#' + ddlobj).combobox("setValue", valor);                   
            }
            else { $('#' + ddlobj).combobox("setValue", "x"); }
        },
        error: function (err) {
            $('#loading').hide(100);
            $.messager.alert('Error', err.statusText, 'error');
        },
        complete: function ()
        { $('#loading').hide(100); }
    });
}


function CREAR_CAPTURA(obj, objdat, objdiv, objtbl) {
    var ctrl;
    var Ocultar;
    var valor;
    var ctrlbl;
    var tabla = "";
    var titulo = "";
    var sololectura;
    var longctrl;
    var nulo = "";
    var campollave;

    $(objdiv).empty();
    $(objtbl).empty();
    $(objdiv).append('<table cellpadding="2" id="' + objtbl + '"></table>');
    table = $(objdiv).children();

    for (var i = 0; i < obj.length; i++) {
        var tr = document.createElement('TR');
        td = document.createElement('TD');
       
        if (obj[i].ValidarNulo == true) { nulo = true; }
        else { nulo = false; }

        if (obj[i].SoloLectura == true) { sololectura = true; }
        else { sololectura = false; }

        if (obj[i].Longitud != null) { longctrl = obj[i].Longitud; }
        else { longctrl = 1000; }

        //if (obj[i].Campo == 'hrspue') {
        //    var campo = '';
        //}

        if (obj[i].TipoDato == "r") {
            var arr = obj[i].CampoOpciones.split('|')
            td2 = document.createElement('TD');
            for (var j = 0; j < arr.length; j++) {
                var tipoval = arr[j].split(',');
                var label = tipoval[0];

                ctrl = $('<input/>').attr({ type: 'radio', name: +obj[i].TipoDato + "-" + obj[i].Campo, value: 0, id: tipoval[0] + obj[i].Campo });
                ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                $(td2).append(document.createTextNode(label));
                td2 = $(td2).append(ctrl);
            }
            tr = $(tr).append(
                 $(td).append(ctrlbl),
                 $(td2)
            );
            table.append(tr);

            for (var c = 0; c < arr.length; c++) {
                var alias = arr[c].split(",");
                if (valor == alias[1]) { $('#' + obj[i].TipoDato + obj[i].Campo).prop("checked", true); break }
                else { $('#' + obj[i].TipoDato + obj[i].Campo).prop("checked", false); }
            }
        }
        else
            if (obj[i].TipoDato == "c") {
                //var arr = obj[i].Catalogo_Tabla.split('|')
                td2 = document.createElement('TD');
                //for (var j = 0; j < arr.length; j++) {
                //    var tipoval = arr[j].split(',');
                //    var label = valor[0];

                    ctrl = $('<input/>').attr({ type: 'checkbox', name: obj[i].TipoDato + "-" + obj[i].Campo, value: 0, id: obj[i].Campo });
                    ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");
                    
                tr = $(tr).append(
                     $(td).append(ctrlbl),
                     $(td2).append(ctrl)                    
                );
                table.append(tr);
            }
            else
                if (obj[i].TipoDato == "f") {
                    td2 = document.createElement('TD');
                    ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text");
                    ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                    tr = $(tr).append(
                          $(td).append(ctrlbl),
                          $(td2).append(ctrl)
                          );
                    table.append(tr);
                                    
                    $('#' + obj[i].Campo).datebox({
                            width: obj[i].Tamaño,                            
                            formatter: myformatter,
                            readonly: sololectura,                          
                            required: nulo,
                            parser: myparser,
                            onSelect: function (date) {
                                var y = date.getFullYear();
                                var m = date.getMonth() + 1;
                                var d = date.getDate();
                                return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y
                           }
                    }).datebox('textbox').mask("99/99/9999", { placeholder: "dd/mm/aaaa" });                    
                }
                else
                    if ((obj[i].TipoDato == "t") || (obj[i].TipoDato == "tm") || (obj[i].TipoDato == "n") || (obj[i].TipoDato == "d")) {
                        td2 = document.createElement('TD');
                        ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text");                        
                        ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");
                       
                        if (obj[i].CampoLLave == true)
                        {
                            btng = $('<a />', {
                                type: 'button',
                                text: "Generar",
                                id: "btn" + obj[i].Campo,
                                target: CamposGenerar,
                                title: "Generar Clave"
                            });
                            btnLg = $('<a />', {
                                type: 'button',
                                text: "Limpiar",
                                id: "btnL" + obj[i].Campo
                            });
                            tr = $(tr).append(
                              $(td).append(ctrlbl),
                              $(td2).append(ctrl),
                              $(td2).append(btng),
                              $(td2).append(btnLg)
                              );
                        }
                       else
                        if (obj[i].HabilitarBusqueda == true) {
                            btn = $('<a />', {
                                type: 'button',
                                text: "Buscar",
                                id: "btn" + obj[i].Campo,                                
                                target: obj[i].ConfiguracionCamposCaptura + "@" + obj[i].Consulta_Columnas,
                                title: "Buscar " + obj[i].Descripcion
                            });
                            btnL = $('<a />', {
                                type: 'button',
                                text: "Limpiar",
                                id: "btnL" + obj[i].Campo                                
                            });
                            tr = $(tr).append(
                              $(td).append(ctrlbl),
                              $(td2).append(ctrl),
                              $(td2).append(btn),
                              $(td2).append(btnL)
                              );
                        }
                        else {                          
                            tr = $(tr).append(
                                $(td).append(ctrlbl),
                                $(td2).append(ctrl)
                           );                            
                        }
                        table.append(tr);
                        var Clave = "";
                       // var campo = "";
                        //poner boton de busqueda si esta configurado para que se muestre en el campo
                        if (obj[i].CampoLLave == true)
                        {
                            $('#btn' + obj[i].Campo).linkbutton({
                                iconCls: 'GenerarKey',
                                plain: true,
                                text: 'Generar'
                            }).bind('click', function () {
                                btncampo = this.id.substring(3, this.id.length);
                                strcampos = this.target.split('|');                              
                                for (var x = 0; x < strcampos.length; x++)
                                {
                                    strtipo=strcampos[x].split(',');
                                    if (strtipo[0] == 't')
                                    { Clave += $('#' + strtipo[1]).textbox('getValue'); }
                                    if (strtipo[0] == 'n')
                                    { Clave += $('#' + strtipo[1]).numberbox('getValue'); }
                                    if (strtipo[0] == 's')
                                    { Clave += $('#' + strtipo[1]).combobox('getValue'); }
                                }
                                $('#' + btncampo).textbox('setValue', Clave);
                            });
                            $('#btnL' + obj[i].Campo).linkbutton({
                                iconCls: 'limpiar',
                                plain: true,
                                text: 'Limpiar'
                            }).bind('click', function () {
                                btncampo = this.id.substring(4, this.id.length);
                                Clave = "";
                                $('#' + btncampo).textbox('setValue', '');
                            });
                        }
                       else
                        if (obj[i].HabilitarBusqueda == true) {
                            $('#btn' + obj[i].Campo).linkbutton({
                                iconCls: 'icon-search',
                                plain: true,
                                text: 'Buscar'
                            }).bind('click', function () {
                                btncampo = this.id.substring(3, this.id.length);
                                var ctrl = "ctrl" + objtbl;
                                CamposCaptura = this.target;
                                sessionStorage.setItem('nomcampo', "No");                                
                                DISEÑO_CAT('#dgcat',  this.title, '#cbocamcat', objtbl);                                
                            });
                            $('#btnL' + obj[i].Campo).linkbutton({
                                iconCls: 'limpiar',
                                plain: true,
                                text: 'Limpiar'
                            }).bind('click', function () {
                                btncampo = this.id.substring(4, this.id.length);
                                $('#' + btncampo).textbox('setValue', '');
                            });
                        }

                        var sololectura = false;
                        if (obj[i].SoloLectura == true) { sololectura = true; }


                        if (obj[i].TipoDato == "t") {
                            //if (obj[i].valorPredeterminado != "")
                            //{ valor = obj[i].valorPredeterminado; }

                            $('#' + obj[i].Campo).textbox({
                                width: obj[i].Tamaño,
                                value: valor,
                                readonly: sololectura,
                                required: nulo,
                                inputEvents: $.extend({}, $.fn.textbox.defaults.inputEvents, {
                                    keyup: function (e) {
                                        if (e.keyCode == 13) {
                                            var t = $(e.data.target);
                                            var id = t.attr('id');
                                            if ($('#btn' + id).is(':visible')) {
                                                var btn = $('#btn' + id);
                                                var ctrl = "ctrl" + objtbl;
                                                ctrltbl = btn[0].target;
                                                //sessionStorage.setItem('ctrl' + objtbl, btn[0].target);
                                                //sessionStorage.setItem('tipoctl', objtbl);
                                                var tabla = btn[0].name.split('|');
                                                sessionStorage.setItem('nomcampo', tabla[0]);
                                                btncampo=id;
                                                DISEÑO_CAT('#dgcat', btn[0].title, '#cbocamcat', objtbl);
                                            }
                                        }
                                    }
                                })
                            });
                        }
                        else
                            if (obj[i].TipoDato == "tm") {
                                $('#' + obj[i].Campo).textbox({
                                    width: obj[i].Tamaño,
                                    height: 9 * 10,
                                    value: valor,
                                    readonly: sololectura,
                                    multiline: true,
                                    required: nulo,
                                    //validType: 'length[0,' + longctrl + ']'
                                });
                            }
                            else
                                if (obj[i].TipoDato == "n") {
                                    //if (obj[i].valorPredeterminado != "")
                                    //{ valor = obj[i].valorPredeterminado; }
                                    $('#' + obj[i].Campo).numberbox({
                                        width: obj[i].Tamaño,
                                        value: 0.00,
                                        readonly: sololectura,
                                        //min: 0,
                                        precision: 2,
                                        required: nulo,
                                        //validType: 'length[0,' + longctrl + ']'
                                    });
                                }
                                else
                                    if (obj[i].TipoDato == "d") {
                                        //if (obj[i].valorPredeterminado != "")
                                        //{ valor = obj[i].valorPredeterminado; }
                                        $('#' + obj[i].Campo).numberbox({
                                            width: obj[i].Tamaño,
                                            value: 0.00,
                                            readonly: sololectura,
                                            //min: 0,
                                            precision: 2,
                                            required: nulo,
                                            //validType: 'length[0,' + longctrl + ']'
                                        });
                                    }
                    }
                    else
                        if (obj[i].TipoDato == "s") {
                            td2 = document.createElement('TD');                           
                            ctrl = $('<input/>').attr({ type: 'text', name: obj[i].TipoDato + "-" + obj[i].Campo, id: obj[i].Campo }).addClass("text");                            
                            ctrlbl = $("<span class=\"LetraChicaNegrita\"/>", { id: 'lbl' + obj[i].Campo }).html(obj[i].Descripcion + ": ");

                            $(ctrl).data("valor", obj[i].Catalogo_Consulta + "|" + i + "|" + obj[i].CampoRelacion);
                            tr = $(tr).append(
                                  $(td).append(ctrlbl),
                                  $(td2).append(ctrl)
                                  );
                            table.append(tr);

                            if (obj[i].TipoDato == "s") {
                                $('#' + obj[i].Campo).combobox({
                                    width: obj[i].Tamaño,
                                    required: nulo,
                                    onSelect: function (rec) {
                                        if (rec.valor != "x") {
                                            if (rec.relacion != "") {
                                                var qryrelacion = $('#' + rec.relacion).data("valor");
                                                var valores = qryrelacion.split("|");
                                                var camposfiltro = valores[2].split(",");
                                                var rquery = valores[0];
                                                for (var j = 0; j < camposfiltro.length; j++) {
                                                    rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                                                }
                                                Cargarddl(rec.relacion, obj[valores[1]].Catalogo_Tabla, obj[valores[1]].Catalogo_Valor, obj[valores[1]].Catalogo_Texto, rquery, obj[valores[1]].CampoFiltro, valor);
                                            }
                                        }
                                    },
                                });
                            }

                            var n = obj[i].Catalogo_Consulta.indexOf("@");
                            if (n == -1) {
                                Cargarddl(obj[i].Campo, obj[i].Catalogo_Tabla, obj[i].Catalogo_Valor, obj[i].Catalogo_Texto, obj[i].Catalogo_Consulta, obj[i].CampoFiltro, valor);                               
                            }
                            else {
                                var qryrelacion = $('#' + obj[i].Campo).data("valor");
                                var valores = qryrelacion.split("|");
                                var camposfiltro = valores[2].split(",");
                                var rquery = valores[0];
                                for (var j = 0; j < camposfiltro.length; j++) {
                                    rquery = rquery.replace("@" + camposfiltro[j], "'" + $('#' + camposfiltro[j]).combobox('getValue') + "'");
                                }
                                Cargarddl(obj[valores[1]].Campo, obj[valores[1]].Catalogo_Tabla, obj[valores[1]].Catalogo_Valor, obj[valores[1]].Catalogo_Texto, rquery, obj[valores[1]].CampoFiltro, valor);                                
                            }
                            //if (valor != "") {
                            //    $('#' + obj[i].Campo).combobox("setValue", valor);
                            //}
                            //else { $('#' + obj[i].Campo).combobox("setValue", "x"); }
                        }

       }  
}


function CARGAR_HISTORIA(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
               
        var NivAct = NumNivel;
        if (NivelSeleccionado != undefined) {
            var cveniveles = jQuery.parseJSON(NivelSeleccionado);
            var NivelesArray = jQuery.grep(cveniveles, function (Niveles, i) {
                return Niveles.Nivel == NumNivel;
            });

            if (NivelesArray.length > 0) {
                var nivhist = parseInt(NumNivel) + 1;                
                NumNivel = nivhist;
                tabla = NivelesArray[0].CatAct;
                CveAct = NivelesArray[0].CveAct;
                //FiltroVista = FiltroSeleccionado;

                cveniveles.push(new Niveles(nivhist, parseInt(NivAct), tabla + "_htabu", CveAct, tabla, FiltroVista, DesNivel, 1));
                NivelSeleccionado = JSON.stringify(cveniveles);
                hist = 1;
                document.getElementById('lblnivel').innerHTML = "";
                CARGAR_CONFIGURACION("#dg");
            }
        }
    }
}
function SIGUIENTE_NIVEL(btnobj) {
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        var CatAct = "", CveAct = "", CatSig = "";
        var condicion = "";
        var rows = $("#dg").datagrid('getSelected');
        if (rows) {
            var NivelesArray = jQuery.grep(objNiveles, function (Niveles, i) {
                return Niveles.CatNivelAct == tabla;
            });
            if (NivelesArray.length > 0) {
                if (NivelesArray[0].CatHistoria == true) {
                    var camposAct = NivelesArray[0].CveNivelAct.split(',');
                    for (var c = 0; c < camposAct.length; c++) {
                        condicion += camposAct[c] + "= ''" + rows[camposAct[c]] + "'' and ";
                    }
                }
                else {
                    var camposAct = NivelesArray[0].CveNivelAct.split(',');
                    campofiltro = NivelesArray[0].CveNivelSig.split(',');
                    for (var c = 0; c < camposAct.length; c++) {
                        condicion += campofiltro[c] + "= ''" + rows[camposAct[c]] + "'' and ";
                        camponivel += campofiltro[c] + ":" + rows[camposAct[c]] + "|";
                    }
                }
            }
            FiltroVista = condicion.substring(0, condicion.length - 4);

            var NivelesArray = jQuery.grep(objNiveles, function (Niveles, i) {
                return Niveles.NumNivelAnt == NumNivel;
            });

            if (NivelesArray.length > 0) {
                if (NivelSeleccionado != undefined)
                { cveniveles = jQuery.parseJSON(NivelSeleccionado); }

                NumNivel = NivelesArray[0].NumNivel;

                tabla = NivelesArray[0].CatNivelAct;
                CveAct = NivelesArray[0].CveNivelAct;
                CatSig = NivelesArray[0].CatNivelSig;
                //FiltroVista = FiltroSeleccionado;

                cveniveles.push(new Niveles(NivelesArray[0].NumNivel, NivelesArray[0].NumNivelAnt, tabla, CveAct, CatSig, FiltroVista, DesNivel, NivelesArray[0].CatHistoria));

                NivelSeleccionado = JSON.stringify(cveniveles);
                document.getElementById('lblnivel').innerHTML = "";
                CARGAR_CONFIGURACION("#dg");
            }
        }
        else { $.messager.alert('Error','Falta seleccionar el registro', 'error'); }
    }
}
function ANTERIOR_NIVEL(btnobj)
{
    if ($(btnobj).linkbutton('options').disabled) { return false; }
    else
    {
        camponivel = "";
        var cveniveles = [];     
      
        var cveniveles = jQuery.parseJSON(NivelSeleccionado);      
        var NivelesArray = jQuery.grep(cveniveles, function (Niveles, i) {
            return Niveles.Nivel == NumNivel;
        });

        if (NivelesArray.length > 0)
        {                        
            var Array = jQuery.grep(cveniveles, function (nivel, i) {
                    return nivel.Nivel == NivelesArray[0].NivelAct;
                });
                if (Array.length > 0) {                    
                    if (Array[0].Valor != "")
                    { FiltroVista = Array[0].Valor; }
                    else { FiltroVista = ''; }

                    cveniveles = $.grep(cveniveles, function (valor) {
                        return valor.Nivel != NumNivel;
                    });

                    NumNivel = Array[0].Nivel;                   
                    NivelSeleccionado = JSON.stringify(cveniveles);
                    tabla = Array[0].CatAct;
                    FiltroVista = Array[0].Valor;
                }
                else { tabla = NivelesArray[0].CatAct; }             
                hist = "";
                DesNivel = "";
                document.getElementById('lblnivel').innerHTML = "";
                FiltroSeleccionado = "";
                CARGAR_CONFIGURACION("#dg");
        }                  
    }
}

