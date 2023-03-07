//
//
//
const CANVAS_WIDTH =330;
const CANVAS_HEIGHT =330;
const CANVAS_PADDING =30;

var basic;

function bind_photo( url, zoom ) {
    console.log( 'bind_photo: ', url);
    console.log( 'zoom: ', zoom);
    
    // bind the image
    basic.bind( {
        url: url,
        points: null,
        orientation: 1 })
            .then( function(){
                    if( zoom ){
                        basic.setZoom( 0.6 );
                    }
                });
}

function upload_photo( data ) {
    console.log( 'upload_photo' );

    if(basic) {
        basic.destroy();
        basic =null;
    }
    //
    let item =document.getElementById('photo-adjst-frame');

    let url =data.url;
    let original =data.original;
    let zoom =data.zoom;
    
    basic =new Croppie(item, {
        viewport: {
            width: CANVAS_WIDTH - CANVAS_PADDING,
            height: CANVAS_HEIGHT - CANVAS_PADDING
        },
        boundary: {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT
        },
        showZoomer: zoom,
    });
    // show photo for adjust
    bind_photo( url, zoom );
    
    // set uploaded filename to photo's arrays
    setPhotos( 'url' ,url );
    setPhotos( 'original' ,original );
    
};

function upload_error( jqXHR, textStatus, errorThrown ){
    console.log( 'upload_error' );
    
}

function remover_photo( data ) {
    console.log( 'remover_photo' );

    //removePhoto();
    setPhotos( 'removed' ,true);    
    
    // obtem id da foto sendo editada
    //let photo_id =$("#photo-adjst-repository").attr('data-id');

    //
    let url =data.url;
    upload_photo( { 'url': url } );
    
}

function remove_error( jqXHR, textStatus, errorThrown ){
    console.log( 'remove_error' );
    
}

$(document).ready( function(){
    $("#photo-adjst-modal").on("show.bs.modal", function(){
        
        // obtem dados da foto a ser editada
        let url =$("#photo-adjst-repository").val();
        
        // create photo
        upload_photo( { url: url } );
        
    });
    
    $("#photo-input").on("change", function(){
        console.log( 'photo-input.change()' );

        // obtem id da foto sendo editada
        let photo_id =$("#photo-adjst-repository").attr('data-id');
        
        let file =$("#photo-input")[0];
        
        // Create a FormDate
        let formData =new FormData();
        
        // Append file informations
        formData.append('photo_id' ,photo_id );
        formData.append('photo-input' ,file.files[0] );

        $.ajax({
            url: "/imagens/photo/upload",
            data: formData,
            success: upload_photo,
            error: upload_error,
            method: "post",
            dataType: "json",

            contentType: false,
            processData: false
        });
    });
});

$('#photo-adjst-edit').click( function(){
    console.log( 'photo-adjst-edit.click()');

    $('#photo-input').val( '' );
    
    // show file dialog for upload
    $('#photo-input').click();  
    
});

$('#photo-adjst-remove').click( function(){
    console.log( 'remover');
    
    if (! confirm('Você quer realmente remover esta foto ?')){
        return;
    }

    // obtem id da foto sendo editada
    let photo_id =$("#photo-adjst-repository").attr('data-id');
    
    let _photo ={};
    _photo.fotoid =photo_id;
    
    // Create a FormDate
    let formData =new FormData();

    // Append file informations
    formData.append('photo' ,_photo );
    
    $.ajax({
        url: "/imagens/photo/remove",
        data: formData,
        success: remover_photo,
        error: upload_error,
        dataType: "json",

        contentType: false,
        processData: false
    })
});

//
$('#photo-adjst-conf').click( function(){
    console.log( 'photo-adjst-conf' );

    //on confirmar button click
    let result =basic.result( { type: 'canvas' } );

    result
        .then( function(img){
            displayPhoto( img );
        
            // hide the edit photo form
            $('#photo-adjst-modal').modal('hide');

            return;
        });
});
