//
//
// array to store user's photos
var photos =new Array(4);
var photoShift =2;

$(document).on("submit" ,"#frmprefer" ,function(evt){
    console.log('preferencias.submit');
    
    // envia dados do formulário para o servidor
    //
    evt.preventDefault();
    
    let _user = {};
    let disturbios =new Array();
    let desenvolvimento =new Array();
    
    _user.nome = $('#nome').val();
    _user.email = $('#email').val();
    _user.senha = $('#senha').val();
    _user.sexo = $('#sexo').val();
    _user.estado_civil = $('#estado_civil').val();
    _user.idade = $('#idade').val();
    _user.iduf = $('#estados').val();
    _user.idcidade = $('#cidades').val();

    //console.log('_foto.foto1: ', _foto.foto1);
    //console.log('_user.idcidade: ', _user.idcidade);
    
    $('input[name="disturbios"]:checked').each(function(i, el) {
        disturbios.push( el.value );
    });    
    _user.disturbios =disturbios.toString();

    $('input[name="desenvolvimento"]:checked').each(function(i, el) {
        desenvolvimento.push( el.value );
    });    
    _user.desenvolvimento =desenvolvimento.toString();
    
    _user.forma_contato =$('input[name="forma_contato"]:checked', '#contatos').val();
    _user.historico =$('#historico').val().trim();

    let postData = {
            user: _user,
            photo: photos
        };
    
    $.ajax({
            url: "/minhaconta/prefer/save",
            method: "post",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(postData),
            success: success,
            error: error 
        });
    
});

function success(result) {
    console.log("preferencias.success()");
    
    Alerts.success( 'Sucesso !', 'As alterações foram salvas na base de dados.');
    
}

function error() {
    console.log('preferencias.error()');

    Alerts.error( 'Erro !', 'Não foi possível salvar as alterações na base de dados.')
    
}

$(document).on("click", "#photo-edit", function(){
    console.log( 'photo-edit.click()');
    
    let id =$('#photo1').attr('data-id');
    let src =$('#photo1').attr('src');

    // passa dados da foto atual (1) a ser editada
    $('#photo-adjst-repository').attr( 'data-id',id );
    $('#photo-adjst-repository').val( src );
    
    // exibe editor fotos
    $('#photo-adjst-modal').modal('show');
});

$(document).on("click", "#photo-shift", function(){
    console.log( 'photo-shift.click()');
    
    if(photoShift>4) {
        photoShift =2;
    }

    $( "#photo" + photoShift ).dblclick();

    photoShift ++;
});

$(document).on("click", "#photo-remove", function(){
    console.log( 'photo-remove.click()');

    $('#photo-adjst-modal').modal('show');
});

$(document).ready( function(){
    /*
    console.log( 'preferencias.ready()');
    //
    // trata fotos 
    //
    let imgs =document.getElementsByClassName("img-pointer");
    let len =4;

    console.log( 'imgs :', imgs  );
    
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
    
    console.log( 'photos :', photos );
    */
    
});
               
$(document).on("change", "#estados", function(){
    console.log( 'estados.change()');

    // carrega cidades do estado selecionado
    let _iduf =$("#estados").val();
    
    $.ajax({
        type: 'GET',
        data: { uf: _iduf },
        contentType: 'application/json',
        url: '/cidades/uf/' + _iduf,

        success: function ( result ) {
            $("#cidades").empty();

            let cidades =result.cidades;
            cidades.forEach( function( cidade ) {
                $("#cidades").append( '<option value=' + cidade.id + '>'  + cidade.desc + '</option>' );
            });
        },

        error: function (err) {
            // externa o erro
            throw err;

            return;
        }
    })
    
});

$(document).on("click", "input[name='forma_contato']", function(){
    
    let contato =parseInt( this.value );
    
    if( contato<9 ) {
        $("#contato_end_1").attr('style','display:block;');
        $("#contato_end_2").attr('style','display:none;');
    } else {
        $("#contato_end_1").attr('style','display:none;');
        $("#contato_end_2").attr('style','display:block;');
    }
});

$(document).on("dblclick" ,"#photo2" ,dblClickPhoto);

$(document).on("dblclick" ,"#photo3" ,dblClickPhoto);

$(document).on("dblclick" ,"#photo4" ,dblClickPhoto);

function dblClickPhoto() {
    console.log( 'dblClickPhoto()' );

    let src =$('#photo1').attr('src');
    let data =$('#photo1').attr('data-id');
    
    $('#photo1').attr( 'src' , $(this).attr('src') );
    $('#photo1').attr( 'data-id' , $(this).attr('data-id') );
    
    $(this).attr( 'src' ,src );
    $(this).attr( 'data-id' ,data );
    
}

function setPhotos( key, value) {
    console.log( 'setPhotos()' );

    //console.log( 'key :', key + '  ' + value );
    
    // indice do array de fotos a ser atualizado !
    let _id =parseInt( $('#photo-adjst-repository').attr('data-id') );
    
    let data =photos[ _id ];
    data[key] =value;
    
    return;
}

function displayPhoto( image ) {
    console.log( 'displayPhoto()' );
 
    // set img photo's property
    setPhotos( 'img' ,image);

    // set upload photo's property
    setPhotos( 'upload' ,true);
    
    // display photo
    $('#photo1').attr( 'src' ,image );
    
    return
}

function removePhoto() {
    console.log( 'preferencias.removePhoto()' );

    setPhotos( 'removed' ,true);
    
    return
}