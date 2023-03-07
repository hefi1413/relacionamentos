

// Mostra resultados
function showHTMLPage (response) {
    console.log('showHTMLPage');

    //alert('data :'+ response );
    
    $('#html-sucess').html( response );
    $('#html-sucess').show();
    
}

// Mostra errors
function showHTMLError (response) {
    console.log('showHTMLError');

    //alert('data :'+ response );
    
    $('#html-error').html( response  );
    $('#html-error').show();
    
}

// monta rota url
function routeUrl(page) {
    console.log('page:' +page);
    
    return '/home/' + page;
}


// inicio
$(document).ready( function() {
    
    // liga itens menu as rotas
    $(document).on( 'click', 'a', function( event ) {
        
        //console.log('.nav-item.click()');
        
        $('.active').removeClass('active');
        $(this).addClass('active');
        
        var page =$(this).attr('value');

        // chama a página selecionada no menu 
        ajaxCall( routeUrl( page ), null, showHTMLPage, showHTMLError );   
        
    });
    
    // chama página inicial
    ajaxCall( '/home', null, showHTMLPage, showHTMLError );
    
});