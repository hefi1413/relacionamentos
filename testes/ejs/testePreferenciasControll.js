//
// SCRIPT CONTROLE PREFERENCIAS
//

var Usuario = require('../model/usuario');
var Usuarios = require('../model/usuarios');

var path = require('path');
var cheerio = require('cheerio');
var loadAsync = require('../public/js/LoadAsyncFiles');
var fContent;

var pageAlerts = require('../public/js/PageAlerts');
var messages =require('../public/js/sessionMessages');

function alerts( req ) {
    //
    let err =req.session.error_message;
    if(err) {
        pageAlerts.errorMessage('Erro --- ', err);
    }
}

function compileContent() {
    let fpug =pug.compile( fContent.filename );
    
}

function sendPreferContent( response ) {
    let html =fContent.html();
    
    response.set('Content-Type', "text/html; charset=utf-8");
    response.send( html );
};

var preferControll = {

    // --------------------------
    render: function(req, res, next) {
        console.log("testePreferControll.render");
        //
        //  envia conteúdo da página
        //
        let fileNames = [ 'c:/nodejs/node-express4/public/includes/preferencias.html' ];
            
        let _fContent =loadAsync.getFiles( fileNames[0] );

        if ( _fContent ) {
            alerts( req );
            sendPreferContent( res );
            return;
        };
        
        loadAsync.load(  fileNames, function(err, readyFiles) {

            if( err ) {
                console.log('error 500 : ', err);
                
                res.status(500).send( 'error 500 : ', err);

                return false;
            };
            //
            let file =readyFiles.find( function(file) { 
                                        return file.name === fileNames[0] } );
            fContent =cheerio.load( file.content );
            
            try  {
                pageAlerts.init( fContent );
                sendPreferContent( res );
            } catch( err ) {
                console.log('error 500 : ', err);
                
                res.status(500).send( 'error 500 : ', err);

                return false;
            };
            return;
        });
        return;
    },
    salvar: function(req, res, next) {
        console.log("testePreferControll.entrar");
        
        return null;
    },
    sucesso: function (result) {
        console.log("testePreferControll.sucesso");

    },
    erro: function (jqXHR, exception) {
        console.log("testePreferControll.error");

        __error(jqXHR, exception);
        return null;
    }
};

module.exports = preferControll;