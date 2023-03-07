//
// SCRIPT CONTROLE REGISTRAR
//

var Mensagem = require('../model/mensagem');
var bodyParser= require('body-parser');

var contatoControll = {

    contato: function(req, res, next) {
        let fileName = 'c:/nodejs/node-express4/public/includes/contato.html';

        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, null, function (err) {

            if (err) {
                //console.log('erro: ',err);

                next(err);
                // 
                // Send 404 Page error
                //
            }
        });
    },
    enviar: function(req, res, next) {
        //wiston.log('debug' ,'contatoControll.enviar');
        
        let $email = req.body.email;
        let $subject = req.body.subject;
        let $mensag = req.body.mensagem;

        /*
        var $mensagem = new Mensagem();
        $mensagem.setEmail($email);
        $mensagem.setMotivo($subject);
        $mensagem.setMensagem($mensag);
        $mensagem.enviar();
        */
        
        return null;
    }
};

module.exports =contatoControll;