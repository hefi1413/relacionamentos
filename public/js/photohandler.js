//
// HANDLE PHOTO
//

const PREVIEW_URL = '/imagens/social-icon-male-user.jpg';
const MAX_FILESIZE = 1024*1000*3;

const CANVAS_WIDTH = 390;
const CANVAS_HEIGHT = 478;
const CANVAS_PADDING = 30;

var basic;

var createPreview = function( item ) {

    basic =new Croppie(item, {
        viewport: {
            width: PHOTO.CANVAS_WIDTH - PHOTO.CANVAS_PADDING,
            height: PHOTO.CANVAS_HEIGHT - PHOTO.CANVAS_PADDING
        },
        enableZoom: false
    });
    
}

var upload = function() {
    
    // bind the preview image to croppie
    basic.bind( {
        url: PHOTO.PREVIEW_URL,
        points: null, // : [30,370,400,739],
        orientation: 1 });
    
    basic.setZoom( 0.2 );
    
    console.log( 'basic :', basic );
    
};

var remover = function( ) {

    console.log( 'remover' );

    // bind the image to croppie
    basic.bind( {
        url: PHOTO.PREVIEW_URL,
        points: null,
        orientation: 1 });
    
}

var result = function() {
    
    //on button click
    let img_result =basic.result( {
        type: 'html',
        size: 'viewport'} );

    img_result
        .then( function(html) {
        
            return html;

        });
    
};

exports.createPreview =createPreview;
exports.upload =upload;
exports.remove =remover;
exports.result =result;