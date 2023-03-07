//
// SCRIPT CONTROLE INICIO
//

var path = require('path');
var cheerio = require('cheerio');
var loadAsync = require('../public/js/LoadAsyncFiles');
var files = [null];

var winston =require('../config/winston');

function sendPageContent( response ) {
    winston.log('debug','inicioControll.sendPageContent()')

    let content =cheerio.load( files[0], null, false).html();
    let html =content;

    //console.log('html : ', html);
    
    response.send( html );
};

var inicioControll = {

    // --------------------------
    inicio: function(req, res, next) {
        //console.log("inicioControll.inicio");
        
        //
        //  envia conteúdo da página inicial do sistema
        //
        let filesName = [ 'c:/nodejs/node-express4/public/includes/content.html' ];
            
        files[0] =loadAsync.getFiles( filesName[0] ).content;
        if ( ! files[0] ) {
            //console.log('erro: ',err);
            // 
            // send 500 Page error
            //
            //res.status(500).send( 'error 500:', err );
            
            next( new Error(`Page ${files[0]} not found in the server.`).code =500 );
            
            return
        };
        
        sendPageContent( res ); 
        return;
    }
}

module.exports =inicioControll;