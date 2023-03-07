//
// SRIPT CONTROLA MENU DO APP
//

// menuitem functions
function htmlContentUpdate( content ) {
    console.log('main.htmlContentUpdate');
    
    $('#html-content').html( content );
    $('#html-content').show();
}

// menuitem functions
function menuitemResponse(response) {
    console.log('menuitemResponse');

    htmlContentUpdate( response );
}

function menuitemError(response) {
    console.log('menuitemError');

    alert('data :'+ response );
}

// menuitem-login functions
function menuitemLoginResponse(response) {
    console.log('mmain.enuitemLoginResponse');

    htmlContentUpdate( response );
    
}
function menuitemLoginError(response) {
    console.log('menuitemLoginError');

    alert('data :'+ response );
}

// menuitem-prefer functions
function menuitemPreferResponse(response) {
    console.log('main.menuitemPreferResponse');

    htmlContentUpdate( response );
    //
    // trata fotos de modulo preferência
    //
    let imgs =document.getElementsByClassName("img-pointer");   // classe definida nos elementos img do modulo preferencias
    let len =imgs.length;

    for (let i =0; i < len; i++) {
        let url =imgs.item(i).getAttribute("src");
        let pos =url.lastIndexOf( '/') +1;
        let original =url.substr( pos );
        photos[i] ={ url: url ,img: null ,original: original ,upload: false ,removed: false };
    };
    //
    let photo1 =document.getElementById("photo1");
    let selecionada =parseInt(photo1.getAttribute('data-id')) + 1;
    $( "#photo" + selecionada ).dblclick();
    
}
function menuitemPreferError(response) {
    console.log('menuitemPreferError');

    alert('data :'+ response );
}

// menuitem-logout functions
function menuitemLogoutResponse(response) {
    console.log('main.menuitemLogoutResponse');

    // enable "login" menu
    $('#login').removeClass('disabled');

    // enable "minha conta" menu
    $('#navbar-account').addClass('disabled');
    
    // página inicial
    let itemInicio =document.getElementById("inicio");
    itemInicio.click();    
}

function menuitemLogoutError(response) {
    console.log('menuitemLogoutError');

    alert('data :'+ response );
}

// 
function routeUrl(page) {
    console.log('page:' +page);
    
    return '/home/' + page;
}

// menu
$(document).ready( function() {
    // liga rotas menuitem
    $(document).on( 'click' ,'.menuitem' ,function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        //
        // chama a página selecionada no menu 
        let page =$(this).attr('value');
        ajaxCall( routeUrl( page ) ,null ,menuitemResponse ,menuitemError );   
    });
    
    // liga rota menuitem-login
    $(document).on( 'click' ,'.menuitem-login' ,function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        //
        // chama a página selecionada no menu 
        let page =$(this).attr('value');
        ajaxCall( routeUrl( page ) ,null ,menuitemLoginResponse ,menuitemLoginError );   
    });

    // liga rota menuitem-prefer
    $(document).on( 'click' ,'.menuitem-prefer' ,function() {
        $('.active').removeClass('active');
        $(this).addClass('active');
        //
        // chama a página selecionada no menu 
        let page =$(this).attr('value');
        ajaxCall( routeUrl( page ) ,null ,menuitemPreferResponse ,menuitemPreferError );   
    });
    
    // liga rota menuitem-logout
    $(document).on( 'click' ,'.menuitem-logout' ,function() {
        //
        // chama a página selecionada no menu 
        let page =$(this).attr('value');
        ajaxCall( routeUrl( page ) ,null ,menuitemLogoutResponse ,menuitemLogoutError );   
    })
});
