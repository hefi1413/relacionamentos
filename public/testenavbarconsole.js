

// Mostra resultados
function showHTMLPage (response) {
    console.log('showHTMLPage');

    //alert('data :'+ response );
    
    $('#html-content').html( response );
    $('#html-content').show();
    
}

// Mostra errors
function showHTMLError (response) {
    console.log('showHTMLError');

    //alert('data :'+ response );
    
    $('#html-alerts').html( response  );
    $('#html-alerts').show();
    
}

// monta rota url
function routeUrl(page) {
    console.log('page:' +page);
    
    return '/home/' + page;
}


// inicio
$(document).ready( function() {

    // simula chamada página inicial
    //ajaxCall( '/', null, showHTMLPage, showHTMLError );
    
    // liga itens menu as rotas
    $(document).on( 'click', 'a', function( event ) {
        
        $('.active').removeClass('active');
        $(this).addClass('active');
        
        var page =$(this).attr('value');

        // chama a página selecionada no menu 
        ajaxCall( routeUrl( page ), null, showHTMLPage, showHTMLError );   
        
    });
    
});