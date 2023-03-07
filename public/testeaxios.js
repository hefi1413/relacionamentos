//
// AXIOS TESTE
//

//var url = "https://jsonplaceholder.typicode.com/users/1";
var url = "/home/axios-teste";


// 
// resource
//
// /home/axios-teste
// https://jsonplaceholder.typicode.com/todos/2


//
// requisição http ajax
//
function axiosTeste() {

    console.log('axiosTeste()');
    
    var promise = axios.get(url);
    
    return promise;
}
    
function showHTMLPage (data) {
    // Mostra resultados
    
    console.log('showHTMLPage');
    
    //alert('data :'+ data);
    $('#html-sucess').html( data );
    $('#html-sucess').show();
    
}

function showError (data) {
    // Mostra errors

    console.log('showError');
    
    $('#html-error').html( data );
    $('#html-error').show();
    
}

function clearPage () {
// LIMPA DIVS

    console.log('clearPage');
    
    $('#html-sucess').hide();
    $('#html-sucess').html( '' );

    $('#html-error').hide();
    $('#html-error').html( '' );
}

/*
    axiosTeste()
    
        .then(function (result) {
            //var data = JSON.stringify(result.data,null,'\t');
            var data = result.data;
        
            showHTMLPage (data);
        
            })    

        .catch(function (error) {
            if(error) {
                //console.log('error:' + error);
            }
        });
*/

$('#call').click(function(){
    
    // chama página

    console.log('call');
    
    axiosTeste()
    
        .then(function (result) {
            //var data = JSON.stringify(result.data,null,'\t');
            var data = result.data;
        
            showHTMLPage(data);
        
            })    

        .catch(function (error) {
            if(error) {
                
                showError(data);
            }
        });
    
});

$('#clear').click(function(){
    
    // limpa divs
    
    console.log('clear');

    clearPage();
});