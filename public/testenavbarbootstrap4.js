
// Mostra resultados
function contentPage (response) {
    console.log('showHTMLPage');

    //alert('data :'+ response );
    
    $('#html-content').html( response );
    $('#html-content').show();
}

// Mostra errors
function alertsPage (response) {
    console.log('showHTMLError');

    alert('data :'+ response );
    
//    $('#html-alerts').html( response  );
//    $('#html-alerts').show();
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
        
        $('.active').removeClass('active');
        $(this).addClass('active');
        //
        var page =$(this).attr('value');
        // chama a página selecionada no menu 
        ajaxCall( routeUrl( page ), null, contentPage, alertsPage );   
    });
});