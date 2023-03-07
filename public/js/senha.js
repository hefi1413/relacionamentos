//
// SCRIPT PARA ALTERAÇÃO / CRIAÇÃO NOVA SENHAS
//

$(document).ready(function(){
    
    let mode =parseInt( document.getElementById('mode') ); 
    if( mode ==1 ) {
        // nova
        document.getElementById('div-email').getAttribute('style','display:block;');
        document.getElementById('div-senhas').getAttribute('style','display:none;');
    } else {
        // alterar
        document.getElementById('div-email').getAttribute('style','display:none;');
        document.getElementById('div-senhas').getAttribute('style','display:block;');
    }
});


$(document).on("submit" ,"#btnEnviarEmail" ,function(evt){
    console.log('senha.enviarEmail');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let email =$('#email').val();
    let postData ={ 'email': email, 'senha': senha };
    
    $.ajax({
            url: "/home/senha/email",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successEmail,
            error: errorEmail
        });
    
});

$(document).on("submit" ,"#btnEnviarSenhas" ,function(evt){
    console.log('senha.enviarSenhas');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let email =$('#email').val();
    let pws1 =$('#pws1').val();
    let pws2 =$('#pws1').val();
    let postData ={ 'email': email, 'pws1': pws1, 'pws2': pws2 };
    
    $.ajax({
            url: "/home/senha/nova",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successRecuperar,
            error: errorRecuperar
        });
    
});


function successEmail(result) {
    console.log("senha.successSubmit");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    // enable "minha conta" menu
    $('#navbar-minhaconta').removeClass('disabled');
    
    // disable "login" menu
    $('#login').addClass('disabled');
    
    // página preferências
    let itemPrefer =document.getElementById("prefer");
    itemPrefer.click();

    $('.active').removeClass('active');    
    
    //console.log( 'itemPrefer :', itemPrefer);
    
    //alert('login');
}
function errorEmail(result) {
    console.log('login.errorSubmit');

    Alerts.error( 'Erro !', result.messsage)
}

function successRecuperar(result) {
    console.log("senha.successRecuperar");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    // enable "minha conta" menu
    $('#navbar-minhaconta').removeClass('disabled');
    
    // disable "login" menu
    $('#login').addClass('disabled');
    
    // página preferências
    let itemPrefer =document.getElementById("prefer");
    itemPrefer.click();

    $('.active').removeClass('active');    
    
    //console.log( 'itemPrefer :', itemPrefer);
    
    //alert('login');
}
function errorRecuperar(result) {
    console.log('login.errorRecuperar');

    Alerts.error( 'Erro !', result.messsage)
}