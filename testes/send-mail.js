

const env =require("dotenv");
var express =require('express');
var app = express();

const nodemailer =require('nodemailer');

//  view engine setup
var ejs =require('ejs');
const fs =require('fs');
const path =require('path');

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

//  app static directory setup
app.use(express.static(path.join(__dirname, '../public')));

//console.info( '__dirname :', __dirname);

let transporter =nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'qstk2615' + '@gmail.com',
        pass: 'H54z119WFf'
    }
});

let _nome ='hefi1413 de tau'
let _empresa ='-Depressão +Relacionamentos';
let sendData ={ 'nome': _nome, 'empresa': _empresa, token: 'xkljh123klg' };

let fileName ='C:/nodejs/node-express4/mjml-templates/template1.ejs';

    ejs.renderFile(fileName ,sendData ,null ,function(err, html) {
        
        if( err ){
            throw new Error( err.message );
            return
        };
        //
        let html_message = html;

        //console.info( 'html:', html_message );
        
        let mailOptions = {
            from: { name: _empresa, 
                   address: 'qstk2615@gmail.com'
                  },
            to: 'hefi1413@gmail.com',
            subject: 'Gerar Nova Senha',
            html: html_message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
        });        
        
    })
