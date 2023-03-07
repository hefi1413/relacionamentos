//
// SCRIPT CONTROLE INDEX
//
var fs =require('fs');
var path =require('path');
var morgan =require('morgan');
const util =require('util');

var cheerio =require('cheerio');
var loadAsync =require('../public/js/LoadAsyncFiles');
var _readyFiles =[ null , null];

var winston =require('../config/winston');

function sendPageContent( response ) {
    winston.log('debug','indexControll.sendPageContent()')
    
    let html ='';
    let content =cheerio.load( _readyFiles[0] , null, false).html();
    let index =cheerio.load( _readyFiles[1] );

    index('#html-content').html( content );

    html =index.html();

    // console.log('html : ', html);
    // 
    response.send( html );
};


var indexControll = {

    // --------------------------
    index: function(req, res, next) {
        //winston.log('debug','indexControll.index');
        //
        //  gerencia a página incial do sistema
        //
        let filesName = [ 'c:/nodejs/node-express4/public/includes/content.html',
                        'c:/nodejs/node-express4/public/includes/main.html' ];

        // verifica se os arquivos ja foram carregados
        let _Files = [null, null];
        _Files[0] =loadAsync.getFiles( filesName[0] );
        _Files[1] =loadAsync.getFiles( filesName[1] );

        if ( _Files[0] && _Files[1] ) {
            sendPageContent( res );
            return;
        };
        
        loadAsync.load( filesName ,function(err, readyFiles) {

            if( err ) {
                //winston.log('error 500 : ', err);
                
                //res.status(500).send( 'error 500 : ', err);

                next( err );
                
                return false;
            };

            _readyFiles[0] = readyFiles[0].content;
            _readyFiles[1] = readyFiles[1].content;

            sendPageContent( res );
            
            return
        })
    }
};

module.exports =indexControll;