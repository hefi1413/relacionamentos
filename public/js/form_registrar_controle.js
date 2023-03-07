
//----------------------------- FORM CONTROLE FUNCTIONS
$(document).ready( function($){
    console.log("ready()");
    //
    
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


//----------------------------- REGISTRAR FUNCTIONS
$('#registrar').click( function(){
    console.log("form_usuario_controle.registrar()");

    var $usuario =getUsuario();

    //console.log("usuario ->" + JSON.stringify( $usuario ) ) ;
    
    if($usuario) {
    
        // chama script de consulta
        $.ajax({
            url: 'gravacao.php',
            method:'POST',
            data: $usuario,
            success: _registrar_sucesso,
            error: _registrar_error
        });
    }
});

function _registrar_sucesso($result) {
    console.log("form_usuario_controle._registrar_sucesso");

    //console.log("result ->" + $result);

    var $data;
    try {
        $data =JSON.parse($result);
    }
    catch(e) {
        var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
        alertas.show();
        
        return;
    }
    
    var $msg ='Registro realizado com sucesso.';
    if($data.result=='erro') {
        $msg ='Não foi possível registrar. ';
    }
    
    var alertas = new Alertas('inf', $msg + $data.data);
    alertas.show();
    
}

function _registrar_error(jqXHR, exception) {
    console.log("form_usuario_controle._registrar_error");
    
    __error(jqXHR, exception);
}


//----------------------------- LOGIN FUNCTIONS