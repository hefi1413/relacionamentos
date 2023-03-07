//
// SCRIPT ROTEIA APP
//
var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

var winston =require('../config/winston');

var indexControll =require('../controllers/indexControll');
var inicioControll =require('../controllers/inicioControll');
var registrarControll =require('../controllers/registrarControll');
var loginControll =require('../controllers/loginControll');
var contatoControll =require('../controllers/contatoControll');
var preferControll =require('../controllers/preferControll');
var cidadeControll =require('../controllers/cidadeControll');
var photoControll =require('../controllers/photoControll');
var passwordControll =require('../controllers/passwordControll');
var personaTestControll =require('../controllers/personaTestControll');

module.exports =function(passport) {
    //  router index
    router.get('/' ,indexControll.index );
    //  router inicio
    router.get('/inicio' ,inicioControll.inicio );
    //  router registrar
    router.get('/signup' ,registrarControll.registrar );
    router.post('/signup/save' ,registrarControll.save );
    //  router login
    router.get('/login' ,loginControll.login );
    router.post('/login/entrar' ,function(req, res, next) {
        passport.authenticate('login' ,  
            function(err, user, info) {
                if (err) {
                    winston.log('error', 'Houve algum erro acessando o servidor.' + err.message );
                    res.send( { 'message': 'Houve algum erro acessando o servidor.' ,'err' : err } );
                    return; 
                }
                if (!user) {
                    winston.log('error', 'Usuário/senha não foi identificado' );
                    res.send( { 'message': 'Usuário/senha não foi identificado.' ,'err' : true } );
                    return; 
                }
                req.logIn(user, function(err) {
                    if (err) {
                        winston.log('error', 'Não foi possível autenticar. '+ err.message );
                        res.send( { 'message': 'Não foi possível autenticar.' ,'err': err } );
                        return
                    };
                    //
                    winston.log( 'info', `Usuário ${user.email} autenticado com sucesso.`);
                    res.send( { 'message': `Usuário ${user.email} autenticado com sucesso.` ,'err' : false } );
                    return
                });
            })(req, res, next);
    });
    
    router.get('/logout' ,function (req, res){
        // https://stackoverflow.com/questions/13758207/why-is-passportjs-in-node-not-removing-session-on-logout
        console.log("loginControll.logout");
        
        const basedir =process.env.APP_BASEDIR;   
        const imageuploads =process.env.APP_IMAGE_UPLOADS;   
        let sess =req.session;
        let user =req.session.user;

        //if(user) {
            let _uid =sess.user_uid;
            console.log("_uid: ", _uid); 
            // remove uploads/_uid directory
            let _path =path.join(basedir ,imageuploads ,_uid );
            try{
                if( fs.existsSync(_path) ){
                    // let uplPhotos =[ _path + '/photo1.*jpg', _path + '/photo2.jpg', _path + '/photo3.jpg', _path + '/photo4.jpg' ];
                    // exclui arquivos de /uploads
                    _filename =path.join( _path + '/photo*.*' );

                    //console.log( '_filename :', _filename);

                    if( fs.existsSync(_filename) ){
                        fs.unlink(_filename , function(err) {
                                                if (err) {
                                                    return console.log(err);
                                                };
                                                winston.log( 'info', `removed file: ${_filename}`);
                        })
                    }
                    fs.rmdirSync(_path, { recursive: true } );
                }
                //
                req.logout();

                req.session.destroy(function (err) {
                    winston.log('info', `Autenticação do usuário ${user.email} desconfirmada.`);

                    sess =null;
                    postData ={ user: null ,photo: null ,ufs: [] ,cidades: [] };

                    // redireciona para página inicial
                    res.send( { 'message': `Autenticação do usuário ${user.email} desconfirmada.` ,'err' : null } );
                    //res.redirect('/');
                });
            }catch( e ) {
                next( e );
                return
            }
        //};
    });
    
    //  router contato
    router.get('/contato' ,contatoControll.contato );
    router.post('/contato/enviar' ,contatoControll.enviar );
    //  router minha conta
    router.get('/account/config' ,function(){} );
    //
    router.get('/account/prefer' ,preferControll.render );
    router.put('/account/prefer/save' ,preferControll.save );
    //
    router.get('/account/password' ,passwordControll.render );
    router.post('/account/password/email' ,passwordControll.emailValidation );
    router.post('/account/password/verificationCode' ,passwordControll.verificationCode );
    router.post('/account/password/update' ,passwordControll.update );
    // eneagram test
    router.get('/account/eneagram-test' ,personaTestControll.render );
    router.get('/account/eneagram-test/begin' ,personaTestControll.render );
    router.get('/account/eneagram-test/next' ,personaTestControll.render );
    router.get('/account/eneagram-test/finish' ,personaTestControll.render );
    //  router cidades
    router.get('/cidades/uf/:id' ,cidadeControll.select );
    //  router photo
    router.get('/imagens/photo/upload' ,photoControll.upload );
    
    return router;
};