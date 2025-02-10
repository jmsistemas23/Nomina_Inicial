
$('#btnnuevo').linkbutton({
    iconCls: 'icon-add',
    width:'160px'
});

$('#btnelimod').linkbutton({
    iconCls: 'icon-remove',
    width: '160px'
});


//<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" style="width:160px">Modificar/Eliminar</a>
function CargarBusqueda(div) {
    var btnnuevo = $('<a id="btnnuevo" class="easyui-linkbutton"  href="#">Nuevo Documento</a>');
    $(div).append(btnnuevo);
    var btnelimod = $('<a id="btnelimod" class="easyui-linkbutton" href="#">Modificar/Eliminar</a>');
    $(div).append(btnelimod);
}