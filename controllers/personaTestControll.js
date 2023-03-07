

/*

Oi, Elieldo.

Para identificar cada tipo é relativamente fácil.
Basta somar a pontuação referente a cada tipo e ver qual foi a maior.
Uma das formas de fazer isso é colocar cada soma em uma posição de um vetor de 9 elementos e percorrê-lo, procurando o maior valor (exercício básico de 1o ano de faculdade).
O índice onde estiver esse maior valor é o tipo... ;-)

Espero ter ajudado.

*/

//
// PASSWORD CONTROLL SCRIPT
//

// database entities
const {User} =require( '../sequelize/sequelize');
const Enneagrams =require( '../model/enneagram.js');

const ejs =require('ejs');
const winston =require('../config/winston');

const fs = require('fs');
const path = require('path');

const basedir =process.env.APP_BASEDIR;   
const sendData = {};


function sendPageContent( res ) {
    winston.log('debug' ,'personaTestControll.sendPageContent');

    let filename ='c:/nodejs/node-express4/views/personaTest1.ejs';

    ejs.renderFile(filename ,sendData , null,function(err, html) {
        if( err ){
            throw new Error( err.message );
        };
        res.send( html );
    })
}

const personaTestControll = {
    // -----------------------------
    render: function(req, res, next) {
        let sess = req.session;
        let user = sess.user;
        let imgs = ['zero','one','two','three','four','five','six', 'seven','eight','nine','ten'];
        
        if(! user) {
            res.status(500).send("User not logged in.");
            return;
        };
        
        let type =user.eneagrama;
        
        sendData.desc =Enneagrams.getDescription( type ) || 'Você ainda não identificou seu código eneagrama.';
        sendData.img ='/imagens/numbers/number_' + imgs[type] + '.png';
        
        // send view **personalidade test** back to client
        sendPageContent( res );
        return;
    },
    save: async function(req, res, next) {
        let sess = req.session;
        let user = sess.user;
    }
};

module.exports =personaTestControll;