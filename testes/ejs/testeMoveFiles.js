const express = require('express')
const session = require('express-session');
const utils = require('../../public/js/utils');

const env =require("dotenv");
const app = express()
const port = 3300

const bodyParser = require('body-parser');
const fs =require('fs');
const path = require('path');


// enviroment variables
env.config();

const basedir =process.env.APP_BASEDIR;   


//Handles post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(basedir, 'public')));


// move fotos do folder /uploads para folder /database
function movePhotos( photos ) {

    let _filename ='';
    let newPath  =path.join( basedir, '/database/users/photos/' + user.id + '/' );
    
    // create path
    try{
        // move photos
        if (! fs.existsSync(newPath)) {
            fs.mkdirSync( newPath, { recursive: true });
        }

        photos.forEach( function(photo, index){

            console.log('old path:', path.resolve( photo.url ));
            
            // verifica se algum arquivo foi uploaded
            if( photo.url.search("uploads" )>-1 ) {

                _filename = path.resolve(newPath,  path.basename(photo.url) );
                
                fs.writeFile(_filename, photo.img, function (err) {
                    if (err) {
                        console.log(err);
                        //throw new Error( err );
                    } else {
                        console.log('add file:', _filename);
                    }
                })
            }
            else {
                // verifica se algum arquivo foi excluído
                _filename =path.join(newPath,  'photo' + index + path.extname(photo.url) ); 
                if( fs.existsSync( _filename ) ) { 
                    fs.unlink(_filename , function(err) {
                        if (err) {
                            return console.log(err);
                        } else {
                            console.log('removed filed:',  _filename );
                        }
                    })
                }
            }
        });

        // remove uploads/_uid directory
        
        let _path =path.join(basedir, '/public/imagens/uploads/' + _uid );

        if ( fs.existsSync(_path) ) {
            
            // let uplPhotos =[ _path + '/photo1.*jpg', _path + '/photo2.jpg', _path + '/photo3.jpg', _path + '/photo4.jpg' ];
            _filename =path.resolve( _path + '/photo*.*' );

            if ( fs.existsSync(_filename) ) {

                fs.unlink(_filename , function(err) {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log('removed filed:',  _filename );
                    }
                })
            }
            //
            fs.rmdirSync(_path, { recursive: true } );
        }
    }catch( e ) {
        console.log( "error: ", e);
        callback(e ,null);
        return;
    }
    
};

var photos =new Array(4);
var user ={ id: 2021, nome: 'jshdsjhs', email: 'jshdsjhs@gmail.com' };
var _uid ='xxxxxx-yyyyyy-zzzzzz-hhhhhh';

photos[0] = {url:`c:/nodejs/node-express4/database/users/photos/${_uid}/photo0.png` , img: 'textoxxxxxx' };
photos[1] = {url:`c:/nodejs/node-express4/imagens/social-male.png` , img: 'textoyyyyyy' };
photos[3] = {url:`c:/nodejs/node-express4/database/users/photos/${_uid}/photo3.png` , img: 'textozzzzzz' };

session.user  =user;
session.user_id  =_uid;
sess =session;

if( sess === session ) {
    movePhotos( photos );
} else {
    console.log('sess != session');
}
