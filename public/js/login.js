//
//
//
$(document).on("submit" ,"#frmlogin" ,function(evt){
    console.log('login.submit');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let email =$('#email').val();
    let senha =$('#senha').val();
    let postData ={ 'email': email, 'senha': senha };
    
    console.info('email: ', email);
    console.info('senha: ', senha);
    
    $.ajax({
            url: "/home/login/entrar",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successSubmit,
            error: errorSubmit
        });
    
});
function successSubmit(result) {
    console.log("login.successSubmit");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    // enable "acccount" menu
    $('#navbar-account').removeClass('disabled');
    
    // disable "login" menu
    $('#login').addClass('disabled');
    
    // página preferências
    let itemPrefer =document.getElementById("prefer");
    itemPrefer.click();

    $('.active').removeClass('active');    
}
function errorSubmit(result) {
    console.log('login.errorSubmit');

    Alerts.error( 'Erro !', result.messsage)
}

$(document).on("submit" ,'#logout' ,function(evt){
    console.log('login.logout');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    $.ajax({
            url: "/home/logout",
            method: "post",
            contentType: "application/json; charset=utf-8",
            //data: JSON.stringify(postData),
            success: successLogout,
            error: errorLogout 
        });
});
function successLogout(result) {
    console.log("login.successLogout");
    
    if( result.err ) {
        Alerts.error( 'Erro !' ,result.message);
        return;
    };

    // torna menuitem "Login" enabled
    $('.disabled').removeClass('disabled');
    
    //$('a[name*="login"]').html('Logout');

    let itemInicio =document.getElementById("inicio");
    itemInicio.click();
    
}
function errorLogout(result) {
    console.log('login.errorLogout');

    Alerts.error( 'Erro !', result.messsage)
    
}