
//----------------------------- FORM FUNCTIONS
$(document).ready( function($){
    console.log("ready()");
    //
    //consultar();
    // 
    /*
    $(document).on('click', '.clickable-row' , function() {
        console.log(".clickable-row click()");

        $(this).addClass( tableProperties.SELECTED_ROW_COLOR ).siblings().removeClass( tableProperties.SELECTED_ROW_COLOR );

    }); */
});

function __error(jqXHR, exception) {
    var msg = '';

    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    //
    var alertas = new Alertas('war',msg);
    alertas.show();
    
}

//retorna dados do formulario **REGISTRAR USUARIO**
function getUsuario(acao = 'update') {

    var usuario = new usuario();
    
    var fields = document.getElementsByTagName("input");
    usuario.preencher(fields);
    
    
    return usuario;
}
