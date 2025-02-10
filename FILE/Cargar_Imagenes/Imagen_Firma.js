var tmr;

var resetIsSupported = false;
var startBtn = null;


window.onload = function(){
    startBtn = document.getElementById("startBtn");

    if(IsSigWebInstalled()){
        resetIsSupported = GetResetSupported();
        if(!resetIsSupported){
            var sigweb_link = document.createElement("a");
            sigweb_link.href = "https://www.topazsystems.com/software/sigweb.exe";
            sigweb_link.innerHTML = "https://www.topazsystems.com/software/sigweb.exe";

            var note = document.getElementById("sigWebVrsnNote");
            note.innerHTML = "There is a newer version of SigWeb available here: ";
            note.appendChild(sigweb_link);
        }
    }
    else{
        alert("Unable to communicate with SigWeb. Please confirm that SigWeb is installed and running on this PC.");
    }
}

function GetResetSupported(){
    var minSigWebVersionResetSupport = "1.6.4.0";

    if(isOlderSigWebVersionInstalled(minSigWebVersionResetSupport)){
        console.log("Old SigWeb version installed.");
        return false;
    }
    return true;
}

function isOlderSigWebVersionInstalled(cmprVer){
    var sigWebVer = GetSigWebVersion();
    if(sigWebVer != ""){
        return isOlderVersion(cmprVer, sigWebVer);
    } else{
        return false;
    }
}

function isOlderVersion (oldVer, newVer) {
  const oldParts = oldVer.split('.')
  const newParts = newVer.split('.')
    for (var i = 0; i < newParts.length; i++) {
      const a = parseInt(newParts[i]) || 0
      const b = parseInt(oldParts[i]) || 0
        if (a < b) return true
        if (a > b) return false
    }
    return false;
}

function onSign()
{
    if(IsSigWebInstalled()){
        var ctx = document.getElementById('cnv').getContext('2d');
        SetDisplayXSize( 500 );
        SetDisplayYSize( 100 );
        SetTabletState(0, tmr);
        SetJustifyMode(0);
        ClearTablet();
        if(tmr == null)
        {
            tmr = SetTabletState(1, ctx, 50);
        }
        else
        {
            SetTabletState(0, tmr);
            tmr = null;
            tmr = SetTabletState(1, ctx, 50);
        }
        $('#btnGFirma').linkbutton({disabled:false});
        $('#btnLFirma').linkbutton({disabled:false});
    } else{
        alert("Unable to communicate with SigWeb. Please confirm that SigWeb is installed and running on this PC.");
    }
}

function onClear()
{
    ClearTablet();
    $('#cnv').show();
    $('#imgFirma').hide();
    $('#btnGFirma').linkbutton({disabled:true});
}

function onDone()
{
    if(NumberOfTabletPoints() == 0)
    {
                 
        $.messager.alert('Error', "Please sign before continuing", 'error'); 
    }
    else
    {                
        SetTabletState(0, tmr);

        //RETURN TOPAZ-FORMAT SIGSTRING
        //SetSigCompressionMode(1);

        var image = document.getElementById("cnv").toDataURL("image/jpeg");
        image = image.replace('data:image/jpeg;base64,', '');

        var parametros = {};               
        parametros.imageData = image;
        parametros.empleado= localStorage.getItem('emp');
        parametros.tipo='Firma';
        $.ajax({
            type: 'POST',
            async: true,
            url: 'funciones.aspx/Imagenes_Empleado',
            data: JSON.stringify(parametros),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.d[0] == "1") {
                    $.messager.alert('Información', data.d[1], 'info');                            
                }
                else { $.messager.alert('Error', data.d[1], 'error'); }                                        
            },
            error: function (er) {
                $('#loading').hide();
                $.messager.alert('Error', er.responseText, 'error');
            },
            complete: function () {
                $('#loading').hide(100);
            }
        });


        //document.FORM1.bioSigData.value= GetSigString();
        //document.FORM1.sigStringData.value = GetSigString();
        //this returns the signature in Topaz's own format, with biometric information


        //RETURN BMP BYTE ARRAY CONVERTED TO BASE64 STRING
        //SetImageXSize(500);
        //SetImageYSize(100);
        //SetImagePenWidth(5);
        // GetSigImageB64(SigImageCallback);                
    }
}

function SigImageCallback( str )
{
    document.FORM1.sigImageData.value = str;            
}

function endDemo()
{
    ClearTablet();
    SetTabletState(0, tmr);
}

function close(){
    if(resetIsSupported){
        Reset();
    } else{
        endDemo();
    }
}

//Perform the following actions on
//	1. Browser Closure
//	2. Tab Closure
//	3. Tab Refresh
window.onbeforeunload = function(evt){
    close();
    clearInterval(tmr);
    evt.preventDefault(); //For Firefox, needed for browser closure
};








