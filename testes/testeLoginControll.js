//
// SCRIPT CONTROLE LOGIN
//

var Usuario = require('../model/usuario');
var Usuarios = require('../model/usuarios');
var logged = false;

var path = require('path');
var cheerio = require('cheerio');
var loadAsync = require('../public/js/LoadAsyncFiles');
var fContent;

var pageAlerts = require('../public/js/PageAlerts');
var messages =require('../public/js/sessionMessages');

function alerts( req ) {
    
    let err =req.session.error_message;
    
    if(err) {
        pageAlerts.errorMessage('Erro no Login -- ', err);
        
        console.log( 'html-alerts: ', fContent( '#html-alerts' ).html() );
    }
}

function sendLoginContent( response ) {
    let html =fContent.html();
    
    response.set('Content-Type', "text/html; charset=utf-8");
    response.send( html );
};

var testeLoginControll = {

    // --------------------------
    login: function(req, res, next) {
        console.log("testeLoginControll.login");
        //
        //  envia conteúdo da página login
        //
        let filesName = [ 'c:/nodejs/node-express4/test/testeLogin3.html' ];
            
        let _fContent =loadAsync.getFiles( filesName[0] );

        if ( _fContent ) {
            alerts( req );
            sendLoginContent( res );
            return;
        };
        
        loadAsync.load(  filesName, function(err, readyFiles) {

            //console.log('readyFiles: ', readyFiles);

            if( err ) {
                console.log('error 500 : ', err);
                
                res.status(500).send( 'error 500 : ', err);

                return false;
            };
            fContent =cheerio.load( readyFiles[0].content );
            //
            try  {
                
                pageAlerts.init( fContent );
                alerts( req );
                sendLoginContent( res ); 
                
            } catch( err ) {
                console.log('error 500 : ', err);
                
                res.status(500).send( 'error 500 : ', err);

                return false;
            };
            return;
        });
        return;
    },
    login_entrar: function(passport, req, res, next) {
        console.log("loginControll.login_entrar");
        
        console.log('email: ', $email);
        console.log('senha: ', $senha);
        
        Usuarios.login($email, $senha, this.login_sucesso, this.login_erro);

        var itemsLogin =document.getElementsByName("login");
        
        itemsLogin[0].innerHTML = 'Logout';
        itemsLogin[1].innerHTML = 'Logout';

        document.getElementById("conta").disabled =false;
        
        logged = true;
        
        return null;
    },
    login_sucesso: function (result) {
        console.log("loginControll.login_sucesso");

    },
    login_erro: function (jqXHR, exception) {
        console.log("loginControll.login_error");

        __error(jqXHR, exception);
        return null;
    }
};

module.exports = testeLoginControll;