
//
// PASSWORD CONTROLL SCRIPT
//

// database entities
var {User} =require( '../sequelize/sequelize');

var nodemailer =require('nodemailer');
var ejs =require('ejs');
var bCrypt =require('bcrypt');
var cheerio =require('cheerio');
var winston =require('../config/winston');

const fs = require('fs');
const path = require('path');

const utils = require('../controllers/utils');


const basedir =process.env.APP_BASEDIR;   
var sendData = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,    
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.senha);
}

function sendPageContent( res ) {
    winston.log('debug' ,'passwordControll.sendPageContent');

    let filename ='c:/nodejs/node-express4/views/pwdUpdate.ejs';

    // verify user's login 
    if(! sendData.user) {
        filename ='c:/nodejs/node-express4/views/pwdEmailValidation.ejs';
    }
    
    ejs.renderFile(filename ,sendData , null,function(err, html) {
        if( err ){
            throw new Error( err.message );
            return;
        };
        res.send( html );
    })
}

var passwordControll = {
    // --------------------------
    render: function(req, res, next) {
        //console.log("passwordControll.render");
        
        let sess =req.session;

        sendData.user =sess.user;
        
        // send view back to client
        sendPageContent( res );
        return;
    },
    emailValidation: function(req, res, next) {
        let sess =req.session;
        let email =req.body.email;

        // check in database if a user with the email exists
        User.findOne({ where: { 'email' : email } })
            .then(
                function(user) {
                    // If email does not exist, log the error send message back
                    if (!user){
                        winston.log('error', 'User Not Found with email:'+email);
                        sess.error_message ='Usuário não localizado.';
                        res.send( {'message':sess.error_message, 'err': true } );
                        return;
                    };
                    // email exists
                    // armazenamento das variaveis do usuário na sessão sera feito em verificationCode 
                    //sess.user =user;
                    //sess.success_message ='Usuário localizado';
                    
                    // grava codigo de verificação em >>cod_confirmacao  
                    let code = Math.floor(1000 + Math.random() * 9000); // jwt.sign( { email: user.email} , process.env.SECRET_KEY, { expiresIn: '1d' }  );
                    User.update( { 'cod_confirmacao': code }, { where: { 'id': user.id} } )
                    
                    // send **email verification** to client's email box
                    let _empresa =process.env.EMPRESA;
                    let _filename =path.resolve( process.env.APP_BASEDIR +'/mjml-templates/' ,'template1.ejs' );
                        sendData = {'nome': user.nome, 'empresa': _empresa, 'code': code};
                    
                    // render email verification file from /mjml-templates/template1.ejs
                    ejs.renderFile(_filename ,sendData ,null ,function(err, html) {
                        if( err ){
                            winston.log('error', err.message );
                            return
                        }
                        let html_message =html;
                        let from =process.env.EMAIL + '@gmail.com';
                        let mailOptions = {
                            from: { name: _empresa, 
                                   address: from
                                  },
                            to: email,
                            subject: 'Código De Verificação',
                            html: html_message,
                            attachments: [
                                    {
                                      filename: "image_email_header.jpg",
                                      path: process.env.APP_BASEDIR + "/public/imagens/image_email_header.jpg",
                                      cid: "image_email_header@gmail.com",
                                    },
                            ],
                        };
                        //
                        //send email
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                sess.error_message ='Houve algum erro enviando o email. ';
                                winston.log('error', sess.error_message + error.message );
                                res.send( {'message':sess.error_message, 'err': true, data: null } );
                                return;
                            };
                            winston.log('info', 'Sucesso.' + info.response);
                            sess.success_message ='sucesso';
                            //
                            // send view **verification Code** back to client
                            _filename =path.resolve( process.env.APP_BASEDIR +'/views/' ,'pwdVerificationCode.ejs' );
                            ejs.renderFile(_filename ,null ,null ,function(err, html) {
                                if( err ){
                                    winston.log('error', err.message );
                                    return;
                                }
                                res.send( {'message':sess.success_message, 'err': null, data: html } );
                            })
                        })
                    })
                })
            .catch( err => {
                if (err) {
                    sess.error_message =err.message;
                    sess.user =null;

                    // send message back to client
                    res.send( {'message':sess.error_message, 'err': true } );
                }
            });
        return
    },
    verificationCode: function(req, res, next) {
        let code =req.body.code;
        let sess =req.session;
        
        // check in database if code exists
        User.findOne({ where: { 'cod_confirmacao' : code } })
            .then(
                function(user) {
                    // If code does not exist, log the error and send message back
                    if(!user) {
                        winston.log('error', 'Code Not Found. '+code);
                        sess.error_message ='Codigo inválido ou expirado';
                        // send message back to client
                        res.send( {'message':sess.error_message, 'err': true } );
                        return;
                    };
                    // code exists
                    sess.user =user;
                    sess.success_message ='Codigo Verificado';
                    //
                    // send view **password update** back to client
                    let _filename =path.resolve( process.env.APP_BASEDIR +'/views/' ,'pwdUpdate.ejs' );
                        sendData = { 'email': user.email };
                    ejs.renderFile(_filename ,sendData ,null ,function(err, html) {
                        if( err ){
                            winston.log('error', err.message );
                            sess.error_message ='Error :'+ err.message;
                            // send error message back to client
                            res.send( {'message':sess.error_message, 'err': true } );
                            return;
                        }
                        // send view **password update** back to client
                        res.send( {'message':sess.success_message, 'err': null, data: html } );
                    })
                })
            .catch( err => {
                if (err) {
                    sess.error_message =err.message;
                    sess.user =null;

                    // send error message back to client
                    res.send( {'message':sess.error_message, 'err': true } );
                }
            });
    },
    update: function(req, res, next) {
        
        let sess =req.session;
        let user =sess.user;
        let pws1 =req.body.pws1;
        let pws2 =req.body.pws2;
        let pws3 =req.body.pws3;
        
        if (pws1 && !isValidPassword(user, pws1)){
            console.log('A senha atual não é compatível');
            sess.error_message ='A senha atual não é compatível';
            res.send( {'message':sess.error_message, 'err': true} );
            return;
        }
        if(pws2!=pws3) {
            console.log('A senha informada não confere');
            sess.error_message ='A senha informada não confere';
            res.send( {'message':sess.error_message, 'err': true} );
            return;
        }
        // update user's password
        User.update( { 'senha': utils.createHash(pws2) }, { where: { 'id': user.id} } )
            .then( function() {
                // send message back to client
                sess.success_message ='Senha alterada com sucesso';
                res.send( {'message':sess.success_message, 'err': null } );
            })
            .catch( err => {
                if (err) {
                    // send error message back to client
                    sess.error_message =err.message;
                    res.send( {'message':sess.error_message, 'err': true } );
                }
            });
        return
    }
};

module.exports =passwordControll;