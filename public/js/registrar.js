//
//
//
$(document).on("submit" ,"#frmRegistrar" ,function(evt){
    console.log('signin.submit');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let nome =$('#nome').val();
    let email =$('#email').val();
    let senha =$('#senha').val();
    let postData ={ 'nome':nome, 'email': email, 'senha': senha };
    
    $.ajax({
            url: "/home/signup/save",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successSubmit,
            error: errorSubmit
        });
    
});
function successSubmit(result) {
    console.log("signup.successSubmit");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    Alerts.success( 'Sucesso !', result.message);

}
function errorSubmit(result) {
    console.log('signup.errorSubmit');

    Alerts.error( 'Erro !', result.messsage)
}
