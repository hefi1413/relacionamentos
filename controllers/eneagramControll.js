
//
// SCRIP CONTROLE TESTE ENEAGRAM
//

// Top 10 Best Free Enneagram Tests -> https://millennial-grind.com/top-10-best-enneagram-tests/
// Artigo sobre eneagrama -> https://juliablanque.com.br/eneagrama-analise-de-perfil-comportamental/
// Video sobre eneagrama para casais -> https://www.youtube.com/watch?v=3OQx9xp_O1o
// Video sobre eneagrama para casais -> https://www.youtube.com/watch?v=Ori7xaCOa_c
//

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
const sendData ={};

const total_questions =25;
const questions_per_page =6;
const { Questions } =require('../model/database/EneagramQuestions ');

function sendPageContent( res ) {
    winston.log('debug' ,'personaTestControll.sendPageContent');

    let filename ='c:/nodejs/node-express4/views/eneagramTest1.ejs';

    ejs.renderFile(filename, sendData, null, function(err, html) {
        if( err ){
            throw new Error( err.message );
            return;
        };
        res.send( html );
    })
}

function cloneQuestions( position ) {
    let _data =[];
    let i = =position;
    for(; i < _position +questions_per_page ; i++ ) {
        _data.push( { 'type': Questions[i].type , 'question': Questions[i].question, 0} );
    };
    return _data;
}

const eneagramControll = {
    // -----------------------------
    render: function(req, res, next) {
        let sess = req.session;
        let user = sess.user;
        let imgs = ['zero','one','two','three','four','five','six', 'seven','eight','nine'];
        
        if(! user) {
            res.status(400).send( {'message': 'User not logged in.', 'err': true } );
            return;
        };
        
        let type =user.eneagrama || 0;
        
        sendData.desc =Enneagrams.getDescription( type ) || 'Você ainda não identificou seu código eneagrama.';
        sendData.img ='/imagens/numbers/number_' + imgs[type] + '.png';
        sendData.position =0;
        sendData.questions =cloneQuestions( sendData.position );
        
        // send view **personalidade test** back to client
        sendPageContent( res );
        return;
    },
    next: async function(req, res, next) {
        let sess =req.session;
        let user =sess.user;
        let _position =req.position;
        let _position =req.position;
        
        if(! user) {
            res.status(400).send( {'message': 'User not logged in.', 'err': true } );
            return;
        };
                
        if( _position < total_questions ) {
            _position += 1+ questions_per_page;
        };
        
        sendData.questions =cloneQuestions( _position );
        sendData.position =_position;
        //
        res.send( sendData );
        return;
    },
    finish: async function(req, res, next) {
        let sess = req.session;
        let user = sess.user;
    }
};

module.exports =eneagramControll;