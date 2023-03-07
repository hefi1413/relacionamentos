//
//
//
const PREVIEW_URL = '/imagens/social-male.png';
const MAX_FILESIZE = 1024*1000*3;

const CANVAS_WIDTH = 390;
const CANVAS_HEIGHT = 478;
const CANVAS_PADDING = 30;

var basic;

function bind_photo( url, zoom ) {
    
    console.log( 'bind_photo: ', url);
    
    // bind the image
    basic.bind( {
        url: url,
        points: null,
        orientation: 1 })
            .then( function(){
                    if( zoom ){
                        console.log( 'zoom: ', basic);

                        basic.setZoom( 0.6 );
                    }
                });
}

function createPreview() {
    console.log( 'createPreview()' );

    let item =document.getElementById('demo');
    basic =new Croppie(item, {
        viewport: {
            width: CANVAS_WIDTH - CANVAS_PADDING,
            height: CANVAS_HEIGHT - CANVAS_PADDING
        },
        enableZoom: false
    });
    //
    bind_photo( PREVIEW_URL, false );
}

function upload_photo( data ) {
    console.log( 'upload_photo' );

    basic.destroy();
    basic =null;
    //
    let item =document.getElementById('demo');
    basic =new Croppie(item, {
        viewport: {
            width: CANVAS_WIDTH - CANVAS_PADDING,
            height: CANVAS_HEIGHT - CANVAS_PADDING
        },
        showZoomer: true,
    });
    
    bind_photo( data.filename, true );
};


function upload_error() {
    console.log( 'upload_error' );

}


$(document).ready( () => {
    
    // create preview photo
    createPreview();

    $(document).on('change', '#input-file', function(){
        console.log( 'input-file.change()' );
        
        let file =$("#input-file")[0];
        
        // Create a FormDate
        var formData =new FormData();
        
        // Append file information to it
        formData.append('input-file' ,file.files[0] );

        /*
        //
        // Use split to cut and get the format of the uploaded file
        //
        
        if( size > MAX_FILESIZE) {
            message = 'Tamanho do arquivo excede o limite máximo';

            console.log( 'Tamanho do arquivo excede o limite máximo');
        };

        //('#mensagem').text( ''  );
        */
        
        ajaxCall( "/imagens/foto/upload" ,
                formData,
                // { 'input-file': filename,  'filename': filename},
                upload_photo,
                upload_error,
                "post",
                "json");
    });
        
    
});

//
$('#btnCrop').click( function(){
    console.log( 'resultado' );

    //on button click
    let img_result =basic.result( { type: 'canvas' } );

    img_result
        .then( function(img) {
        
            console.log( 'canvas: ', img);
        
            $('#result' ).attr( 'src', img );

            return;
        });
});

$('#btnRemover').click( function(){
    console.log( 'remover');
    
    basic.destroy();
    basic =null;
    
    // create preview photo
    createPreview();
    
    $('#result' ).html( '' );
    
});


// https://www.codegrepper.com/code-examples/javascript/javascript+download+image+from+url
//
// https://stackoverflow.com/questions/13198131/how-to-save-an-html5-canvas-as-an-image-on-a-server

/*
    async function autoDownloadCanvas() {
      let link = document.getElementById('link');
      link.setAttribute('download', 'example.png');
      link.setAttribute('href', canvas.toDataURL("image/png"));
    }
*/