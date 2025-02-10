<%@ Page Language="C#" AutoEventWireup="true" CodeFile="puestos_equivalencia.aspx.cs" Inherits="FILE_CosteoPlazas_puestos_equivalencia" %>
<script src="js/jquery-1.7.1.min.js"></script>
<script src="js/jquery-ui-1.8.17.custom.min.js"></script>
<link href="css/jquery-ui-1.8.1.custom.css" rel="stylesheet" />
<script src="js/jquery.quicksearch.js"></script>

<style type="text/css">
    #dialog-message {
        margin: 25px;
    }

    #dialog-nivel {
        margin: 25px;
    }

    body {
        height: 50%;
        margin: 0px;
        padding: 50px;
        text-align: left;
    }

    .row-gris-center {
        color: #808080;
        pointer-events: none;
        font-weight: bold !important;
        text-align: center;
    }

    .row-gris {
        color: #808080;
        pointer-events: none;
        font-weight: bold !important;
    }

    .row-Verde {
        color: #1C9E21 !important;
        font-weight: bold !important;
    }

    .row-Verde-center {
        color: #1C9E21 !important;
        font-weight: bold !important;
        text-align: center;
    }

    .row-Azul {
        color: #0000FF !important;
        font-weight: bold !important;
        align-content: center !important;
    }
</style>

<style type="text/css">
.gridviewT {
font-family: "arial";
background-color: #FFFFFF;
font-size: small;
overflow: scroll;
}

.gridview {   
font-family: "arial";
background-color: #FFFFFF;
font-size: small;
}

.gridview th {
background: #81BEF7;
padding: 5px;
font-size: small;
}

.gridview th a {
color: #003300;
text-decoration: none;
}

.gridview th a:hover {
color: #003300;
text-decoration: underline;
}

.gridview td {
background: #FAFAF5;
color: #333333;
font: x-small "arial";
padding: 4px;
}

.gridview tr.even td {
background: #FFFFFF;
}

.gridview td a {
color: #003300;
font: bold small "arial";
padding: 2px;
text-decoration: none;
}

.gridview td a:hover {
color: red;
font-weight: bold;
text-decoration: underline;
}

.gridviewT th {
background: #81BEF7;
padding: 5px;
font-size: small;
}

.gridviewT th a {
color: #003300;
text-decoration: none;
}

.gridviewT th a:hover {
color: #003300;
text-decoration: underline;
}

.gridviewT td {
background: #FAFAF5;
color: #333333;
font: small "arial";
padding: 4px;
}

.gridviewT tr.even td {
background: #FFFFFF;
}

.gridviewT td a {
color: #003300;
font: bold small "arial";
padding: 2px;
text-decoration: none;
}

.gridviewT td a:hover {
color: red;
font-weight: bold;
text-decoration: underline;
}

.ColumnaOculta {
display: none;
}

#placeholderBaja_Vacante {
width: 160px;
}
</style>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
</head>
<script type="text/javascript">

    function ProcesoConsultar() {
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "puestos_equivalencia.aspx/Proceso_Consulta",

            dataType: "json",
            success: function (data) {
                var divEncabezado = $("#GridEncabezado").empty();

                var div = $("#test").empty();
                divEncabezado.append($("<tbody  style='width:700px;  display:block; position:relative;'>"));
                divEncabezado.append(
                                        $("<tr>")
                                       .append($("<th Width='100px'>").html('PUESTO'))
                                       .append($("<th Width='200px'>").html('DESCRIPCION'))
                                       .append($("<th Width='100px'>").html('HOR/JOR'))
                                       .append($("<th Width='150px'>").html('EQ. HORAS'))
                                       .append($("<th Width='150px'>").html('')));

                div.append($("<tbody  style=' Width:720px; height:400px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                var myObject = eval('(' + s + ')');

                for (i in myObject) {
                    
                    clase = " class='row-gris' ";
                    clasecenter = " class='row-Gris-center' ";

                    checado = "checked='checked');";
                    activo = "Enabled = 'false'";
                    activo = "<a id='btnSeleccionar' href='' class='row-Azul' title='Clic agregar equivalencias' >";
                

                    div.append($("<tr >")
                            //.append($("<td Width='20px'>").html('').append($('<input type="checkbox" id="mycheckbox" ' + checado + '   >').html('SELECCIONAR')))
                            //.append($("<td >").html(myObject[i]["cvepuesto_equivalencia"]))
                            .append($("<td " + clase + ">").html(myObject[i]["cvepuesto_equivalencia"]))
                            .append($("<td " + clase + " Width='105px' >").html(myObject[i]["cvepue"]))
                            .append($("<td " + clase + " Width='200px' >").html(myObject[i]["despue"]))
                            .append($("<td " + clase + " Width='100px' >").html(myObject[i]["horjorpu"]))
                            .append($("<td " + clasecenter + " Width='150px' >").html(myObject[i]["hrsequ"]))
                           .append($("<td Width='150px'>").html('').append($(activo).html('Agregar Equivalencia'))));
                }
                $('#test td:nth-child(1)').hide();



                var txtFiltro = '#' + '<%=txtFiltro.ClientID %>';
                var grid = '#' + 'test';
                $(txtFiltro).quicksearch(grid + ' tbody tr');



            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(errorThrown);
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }




    function Proceso_Consulta_Detalle(clave) {
     
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{clave :'" + clave + "'}",
            url: "puestos_equivalencia.aspx/Proceso_Consulta_Detalle",
            dataType: "json",
            success: function (data) {
                var divEncabezado = $("#GridEncabezado_detalle").empty();
                var div = $("#test_detalle").empty();
                divEncabezado.append($("<tbody  style='width:740px;  display:block; position:relative;'>"));
                divEncabezado.append(
                                           $("<tr>")
                                       .append($("<th Width='20px'>").html(''))
                                       .append($("<th Width='70px'>").html('PUESTO'))
                                       .append($("<th Width='300px'>").html('DESCRIPCION'))
                                       .append($("<th Width='100px'>").html('HOR/JOR'))
                                       .append($("<th Width='100px'>").html('EQ. HORAS'))
                                       .append($("<th Width='150px'>").html('')));
                $('#GridEncabezado_detalle td:nth-child(2)').hide();
                $('#GridEncabezado_detalle td:nth-child(3)').hide();
                div.append($("<tbody  style='height:400px; width:755px; overflow-y:scroll; display:block; position:relative;'>"));
                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    if (myObject[i]["cvepuesto_equivalencia_detalle"] > 0) {

                        clase = " class='row-Verde' ";
                        clasecenter = " class='row-Verde-center' ";
                        checado = "checked='checked')";
                        activo = "Enabled = 'false'";
                        activo = "<a id='btnSeleccionar' href='' class='row-Azul' title='Clic agregar equivalencias' >";
                    } else {
                        clase = " class='row-gris' ";
                        clasecenter = " class='row-gris-center' ";
                        checado = "";
                        activo = "<label class='row-gris'></label>";
                    }

          

                    div.append($("<tr >")
                            .append($("<td Width='20px'>").html('').append($('<input type="checkbox" id="myTextEditBox" ' + checado + '   >').html('SELECCIONAR')))
                            .append($("<td >").html(myObject[i]["cvepuesto_equivalencia_detalle"]))
                            .append($("<td >").html(myObject[i]["cvepuesto_equivalencias"]))
                            .append($("<td " + clase + " Width='80px'>").html(myObject[i]["cvepue"]))
                            .append($("<td " + clase + " Width='310px'>").html(myObject[i]["despue"]))
                            .append($("<td " + clase + " Width='110px'>").html(myObject[i]["horjorpu"]))
                            .append($("<td " + clasecenter + " Width='120px' >").html(myObject[i]["hrsequ"]))
                    .append($("<td Width='150px'>").html('').append($(activo).html('Agregar Nivel'))));
                }
                $('#test_detalle td:nth-child(2)').hide();
                $('#test_detalle td:nth-child(3)').hide();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }


    function ProcesoAgregarPuesto_Detalle(obj) {
    
        var id = obj.parent().parent()[0].childNodes[1].innerText;
        var cvepuesto_equivalencia = obj.parent().parent()[0].childNodes[2].innerText;
        var clave = obj.parent().parent()[0].childNodes[3].innerText;



        alert("aaaa");



        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{id:" + id + ", clave:'" + clave + "', cvepuesto_equivalencia:'" + cvepuesto_equivalencia + "'}",

            url: "puestos_equivalencia.aspx/Proceso_AgregarPuesto_Detalle",
            dataType: "json",
            success: function (data) {

                var s = data.d;
                var myObject = eval('(' + s + ')');

                obj.parent().parent().find("td:eq(2)").removeClass();
                obj.parent().parent().find("td:eq(3)").removeClass();
                obj.parent().parent().find("td:eq(4)").removeClass();
                obj.parent().parent().find("td:eq(5)").removeClass();
                obj.parent().parent().find("td:eq(6)").removeClass();


                obj.parent().parent()[0].childNodes[1].innerText = myObject[0]["cvepuesto_equivalencia_detalle"];
                obj.parent().parent()[0].childNodes[2].innerText = myObject[0]["cvepuesto_equivalencia"];
                obj.parent().parent().find("td:eq(2)").addClass('row-Verde');
                obj.parent().parent().find("td:eq(3)").addClass('row-Verde');
                obj.parent().parent().find("td:eq(4)").addClass('row-Verde');
                obj.parent().parent().find("td:eq(5)").addClass('row-Verde');
                obj.parent().parent().find("td:eq(6)").addClass('row-Verde-center');

                obj.parent().parent().find("td:eq(7)").remove();

                activo = "<a id='btnSeleccionar' href='' class='row-Azul' title='Clic agregar equivalencias' >";
                obj.parent().parent().append($("<td Width='150px'>").html('').append($(activo).html('Agregar Nivel')));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoEliminarPuesto_Detalle(obj) {

        var id = obj.parent().parent()[0].childNodes[1].innerText;

        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{id:" + id + "}",

            url: "puestos_equivalencia.aspx/Proceso_EliminarPuesto_Detalle",
            dataType: "json",
            success: function (data) {
                obj.parent().parent()[0].childNodes[1].innerText = 0;

                obj.parent().parent().find("td:eq(2)").removeClass();
                obj.parent().parent().find("td:eq(3)").removeClass();
                obj.parent().parent().find("td:eq(4)").removeClass();
                obj.parent().parent().find("td:eq(5)").removeClass();
                obj.parent().parent().find("td:eq(6)").removeClass();


                obj.parent().parent().find("td:eq(2)").addClass('row-gris');
                obj.parent().parent().find("td:eq(3)").addClass('row-gris');
                obj.parent().parent().find("td:eq(4)").addClass('row-gris');
                obj.parent().parent().find("td:eq(5)").addClass('row-gris');
                obj.parent().parent().find("td:eq(6)").addClass('row-gris-center');

                obj.parent().parent().find("td:eq(7)").remove();
                activo = "<label class='row-gris'></label>";
                obj.parent().parent().append($("<td Width='150px'>").html('').append($(activo).html('Agregar Nivel')));

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }



    function Proceso_Consulta_Nivel(id) {


        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{id :" + id + "}",
            url: "puestos_equivalencia.aspx/Proceso_Consulta_Nivel",
            dataType: "json",
            success: function (data) {
                var divEncabezado = $("#GridEncabezado_nivel").empty();
                var div = $("#test_nivel").empty();
                divEncabezado.append($("<tbody  style='width:350px;  display:block; position:relative;'>"));
                divEncabezado.append(
                                           $("<tr>")
                                       .append($("<th Width='20px'>").html(''))
                                       .append($("<th Width='320px'>").html('Descripcion de Nivel'))
                                      );
                div.append($("<tbody  style='height:150px; width:350px; overflow-y:none; display:block; position:relative;'>"));
                var s = data.d;
                var myObject = eval('(' + s + ')');
                for (i in myObject) {
                    if (myObject[i]["cvepuesto_equivalencia_detalle_nivel"] > 0) {
                        clase = " class='row-Verde' ";
                        checado = "checked='checked');"
                    } else {
                        clase = " class='row-gris' ";
                        checado = "";
                    }
                    div.append($("<tr >")
                            .append($("<td Width='20px'>").html('').append($('<input type="checkbox" id="myTextEditBox" ' + checado + '   >').html('SELECCIONAR')))
                            .append($("<td Width='0px'>").html(myObject[i]["cvepuesto_equivalencia_detalle_nivel"]))
                            .append($("<td Width='0px'>").html(myObject[i]["cvepuesto_equivalencia_detalle"]))
                            .append($("<td Width='0px'>").html(myObject[i]["cveNivel_educativo"]))
                            .append($("<td " + clase + " Width='320px' >").html(myObject[i]["descripcion"]))


         );
                }
                $('#test_nivel td:nth-child(2)').hide();
                $('#test_nivel td:nth-child(3)').hide();
                $('#test_nivel td:nth-child(4)').hide();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }





    function ProcesoAgregarPuesto_Nivel(obj) {




        var id = obj.parent().parent()[0].childNodes[1].innerText;

        var cvepuesto_equivalencia_detalle = obj.parent().parent()[0].childNodes[2].innerText;
        var cveNivel_educativo = obj.parent().parent()[0].childNodes[3].innerText;


       
        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{cveNivel_educativo:'" + cveNivel_educativo + "', cvepuesto_equivalencia_detalle:" + cvepuesto_equivalencia_detalle + "}",




            url: "puestos_equivalencia.aspx/Proceso_AgregarPuesto_Nivel",
            dataType: "json",
            success: function (data) {

                var s = data.d;
                var myObject = eval('(' + s + ')');

                obj.parent().parent().find("td:eq(2)").removeClass();
                obj.parent().parent().find("td:eq(3)").removeClass();
                obj.parent().parent().find("td:eq(4)").removeClass();





                obj.parent().parent()[0].childNodes[1].innerText = myObject[0]["cvepuesto_equivalencia_detalle_nivel"];
                obj.parent().parent().find("td:eq(2)").addClass('row-Verde');
                obj.parent().parent().find("td:eq(3)").addClass('row-Verde');

                obj.parent().parent().find("td:eq(4)").addClass('row-Verde');

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }

    function ProcesoEliminarPuesto_Nivel(obj) {

        var id = obj.parent().parent()[0].childNodes[1].innerText;


        $.ajax({
            type: "POST",
            contentType: "application/json",
            data: "{id:" + id + "}",

            url: "puestos_equivalencia.aspx/Proceso_EliminarPuesto_Nivel",
            dataType: "json",
            success: function (data) {
                obj.parent().parent()[0].childNodes[1].innerText = 0;

                obj.parent().parent().find("td:eq(2)").removeClass();
                obj.parent().parent().find("td:eq(3)").removeClass();
                obj.parent().parent().find("td:eq(4)").removeClass();



                obj.parent().parent().find("td:eq(2)").addClass('row-gris');
                obj.parent().parent().find("td:eq(3)").addClass('row-gris');
                obj.parent().parent().find("td:eq(4)").addClass('row-gris');




            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    alert('Su sesión ha expirado');
                    location.href = 'login.aspx';
                } else {
                    var responseTitle = $(XMLHttpRequest.responseText).filter('title').get(0);
                    alert($(responseTitle).text());
                }
                debugger;
            }
        });
    }



    $(document).ready(function () {

      

        ProcesoConsultar();
        $(".test input[type=checkbox]").click(function () {
            var value = $(this).val();
            var id = $(this).attr("id");
            $(".test input[type=checkbox]").each(function () {
                if ($(this).val() == value && $(this).attr("id") != id) {
                    $(this).removeAttr("checked");
                }
            });
        });

        dialog = $("#dialog-message").dialog({
            autoOpen: false,
            width: 850,
            resizable: false,
            modal: true,
            position: {
                my: 'top',
                at: 'top'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });

        dialog2 = $("#dialog-nivel").dialog({
            autoOpen: false,
            width: 400,
            resizable: false,
            modal: true,
            position: {
                my: 'top',
                at: 'top'
            },
            buttons: {
                Regresar: function () {
                    $(this).dialog("close");
                }
            }
        });





        $('div#dialog-message').on('dialogclose', function (event) {
            var divEncabezado = $("#GridEncabezado_detalle").empty();
            var div = $("#test_detalle").empty();
        });


        //hacer que check box funcione como radio button
        //$("#test tbody tr input[type=checkbox]").live('click', function () {        
        //    $('#test input:checkbox').removeAttr('checked');
        //    $(this).attr('checked', true);
        //});

        //$('#test tbody tr').find('input:checkbox').live('change', function () {

        //    if ($(this).is(':checked')) {
        //        ProcesoAgregarPuesto($(this));
        //    } else {
        //        ProcesoEliminarPuesto($(this));
        //    }
        //});

        $('#test_detalle tbody tr').find('input:checkbox').live('change', function () {
            if ($(this).is(':checked')) {
                ProcesoAgregarPuesto_Detalle($(this));
            } else {
                ProcesoEliminarPuesto_Detalle($(this));
            }
        });

        $('#test_nivel tbody tr').find('input:checkbox').live('change', function () {
            if ($(this).is(':checked')) {
                ProcesoAgregarPuesto_Nivel($(this));
            } else {
                ProcesoEliminarPuesto_Nivel($(this));
            }
        });


        $('#test tbody tr').find('#btnSeleccionar').live('click', function () {
            var clave = $(this).parent().parent()[0].childNodes[1].innerText;

            $('#lblTitulo').text("Clave Puesto: " + clave);
            Proceso_Consulta_Detalle(clave);
            dialog.dialog("open");
            $(".ui-dialog-titlebar").hide();
            return false;

        });


        $('#test_detalle tbody tr').find('#btnSeleccionar').live('click', function () {

            var clave = $(this).parent().parent()[0].childNodes[3].innerText;

            var id = $(this).parent().parent()[0].childNodes[1].innerText;




            $('#lblTitulo2').text("Clave Puesto: " + clave);
            Proceso_Consulta_Nivel(id);
            dialog2.dialog("open");
            $(".ui-dialog-titlebar").hide();
            return false;

        });
    });


</script>
<body>
    <form id="form1" runat="server">
        <div>
            <div class="container_12">
                <h1 class="title">CATALOGO DE PUESTO EQUIVALENCIAS</h1>

            </div>
             Filtrar:
            <asp:TextBox ID="txtFiltro" MaxLength="100" Width="400px" runat="server"></asp:TextBox>
            <br />
            <br />
         

                <div style="width: 100%; height: 90%; z-index: 0; position: relative;">

                
                <table id="GridEncabezado" Class="gridviewT" style="font-size: 10px" cellspacing="0" rules="all" border="0">
                </table>
                <table id="test" Class="gridview"  style="font-size: 10px;" cellspacing="0" rules="all" border="0">
                </table>
            </div>


            <div id="dialog-message" style="text-align: center; right: 50%; width: 800px; height: auto;">

                <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                    style="height: 25px;">
                    <asp:Label ID="lblTitulo" runat="server"></asp:Label>
                </h3>

                <table id="GridEncabezado_detalle" Class="gridviewT" style=" font-size: 10px" cellspacing="0" rules="all" border="0">
                </table>
                <table id="test_detalle"  Class="gridview"  style=" font-size: 10px;"   cellspacing="0" rules="all" border="0">
                </table>
                &nbsp;
            </div>


            <div id="dialog-nivel" style="text-align: center; right: 50%; width: 250px; height: 200px;">

                <h3 class="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"
                    style="height: 25px;">
                    <asp:Label ID="lblTitulo2" runat="server"></asp:Label>
                </h3>

                <table id="GridEncabezado_nivel" class="minimal-style" style="width: 250px; font-size: 10px"
                    cellspacing="0" rules="all" border="0">
                </table>
                <table id="test_nivel" class="minimal-style" style="width: 250px; font-size: 10px;"
                    cellspacing="0" rules="all" border="0">
                </table>
                &nbsp;
            </div>

        </div>
    </form>
</body>
</html>
