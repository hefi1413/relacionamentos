
//
// SCRIPT PARA ALTERAÇÃO / CRIAÇÃO NOVA SENHAS
//
$(document).on("submit" ,"#frmEmailValidation" ,function(evt){
    console.log('password.validarEmail');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();

    let email =$('#email').val();
    let postData ={ 'email': email };
    
    $.ajax({
            url: "/home/account/password/email",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successEmail,
            error: errorEmail
        });
    
});

$(document).on("submit" ,"#frmVerificationCode" ,function(evt){
    console.log('password.VerificationCode');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();

    let code =$('#code').val();
    let postData ={ 'code' : code };
    
    $.ajax({
            url: "/home/account/password/verificationCode",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successVerificationCode,
            error: errorVerificationCode
        });
    
});

$(document).on("submit" ,"#frmPwdUpdate" ,function(evt){
    console.log('password.update');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let email =$('#email').val();
    let pws1 =$('#pws1').val();     //senha atual
    let pws2 =$('#pws2').val();     //nova senha
    let pws3 =$('#pws3').val();     //confirmação da senha
    let postData ={ 'email': email, 
                   'pws1': (pws1!='' ? pws1 : null), 
                   'pws2': pws2, 
                   'pws3': pws3 };
    
    $.ajax({
            url: "/home/account/password/update",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: successUpdate,
            error: errorUpdate
        });
});

$(document).on("click" ,"#login-remember-password" ,function(evt){
    console.log('login.password');
    
    evt.preventDefault();

    // torna menuitem "Login" enabled
    $('.disabled').removeClass('disabled');
    
    // acessa elemento de menu definido no script >>main.html
    let itemPassword =document.getElementById("item-password");
    itemPassword.click();
    
});

// When the user starts to type something inside the password field
$(document).on("keyup" ,"#pws2" ,function(){
    
    let input2 = document.getElementById("pws2");
    
    let letter = document.getElementById("letter");
    let capital = document.getElementById("capital");
    let number = document.getElementById("number");
    let length = document.getElementById("length");
    
    // Validate lowercase letters
    let lowerCaseLetters = /[a-z]/g;
    if(input2.value.match(lowerCaseLetters)) {  
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    let upperCaseLetters = /[A-Z]/g;
    if(input2.value.match(upperCaseLetters)) {  
        capital.classList.remove("invalid");
        capital.classList.add("valid");
        } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    let numbers = /[0-9]/g;
    if(input2.value.match(numbers)) {  
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if(input2.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }

});

// When the user starts to type something inside the password confirm field
$(document).on("keyup" ,"#pws3" ,function(){
    
    let input2 = document.getElementById("pws2");
    let input3 = document.getElementById("pws3");
    
    let compativel = document.getElementById("compativel");

    console.info('input2 :', input2.value );
    console.info('input3 :', input3.value );
    
    // Validate compatible passwords
    if(input2.value==input3.value) {  
        compativel.classList.remove("invalid");
        compativel.classList.add("valid");
    } else {
        compativel.classList.remove("valid");
        compativel.classList.add("invalid");
    }
    
});

function successEmail(result) {
    console.log("password.successEmail");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    let content =result.data; 
    htmlContentUpdate( content );
    
}
function errorEmail(result) {
    console.log('password.errorMail');

    Alerts.error( 'Erro !', result.messsage)
}

function successVerificationCode(result) {
    console.log("password.successVerificationCode");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };

    let content =result.data; 
    htmlContentUpdate( content );
    
}
function errorVerificationCode(result) {
    console.log('password.errorVerificationCode');

    Alerts.error( 'Erro !', result.messsage)
}

function successUpdate(result){
    console.log("password.successUpdate");
    
    if( result.err ){
        Alerts.error( 'Erro !', result.message);
        return;
    };
    
    Alerts.success( 'Sucesso !', 'As aterações foram salvas no banco dados.');
}
function errorUpdate(result) {
    console.log('password.errorUpdate');

    Alerts.error( 'Erro !', result.messsage)
}
