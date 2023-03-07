const express = require('express')
const session = require('express-session');

const env =require("dotenv");
const app = express()
const port = 3300

const nodemailer =require('nodemailer');

//  view engine setup
var ejs =require('ejs');

const bodyParser = require('body-parser');
const fs =require('fs');
const path = require('path');
const fileSize =1024 * 1000 * 2; //2MB

// enviroment variables
env.config();

const basedir =process.env.APP_BASEDIR;   
const imagepreview =process.env.APP_IMAGE_PREVIEW;
const imageuploads =process.env.APP_IMAGE_UPLOADS;
const imagedatabase =process.env.APP_IMAGE_DATABASE;


//Handles post requests
app.use(express.json({limit: fileSize * 5}));
app.use(express.urlencoded({extended: false, limit: fileSize * 5}));
app.use(session({secret: 'ssshhhhh', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(basedir, 'public')));

var sess =null;
var postData ={ user: null, photo: null, ufs: [], cidades: [] };

const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


//  view engine setup
app.set('views', path.join(basedir, '/'));
app.set('view engine', 'ejs');


// database entities
var { Uf, Cidade, User, Foto } =require( basedir + '/sequelize/sequelize');


// upload photos files
var multer =require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        console.log('multer.diskStorage');
        
        sess =req.session;
        
        let _uid =sess.user_uid;
        let _path =path.join(basedir, imageuploads, _uid + '/' );

        callback(null, _path );
    },
    filename: function (req, file, callback) {

        //console.log('req.body :', req.body);
        //console.log('req.body.photo_id :', req.body.photo_id);
        const __filename ='photo';
        let photo_id =req.body.photo_id; 
        let _filename = __filename + photo_id + path.extname(file.originalname);

        //console.log('_filename :', _filename);
        
        callback(null, _filename )
    }
})
var upload =multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        let ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return callback( new Error('Only (.png|.jpg|.jpeg) are allowed.'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: fileSize
    }
});


// ***********************************************
// LOCAL FUNCTIONS
// ***********************************************
function sendIndexPage( res ) {
                        
    //let sess =session;
    let fileName ='c:/nodejs/node-express4/views/preferencias.ejs';
    
    postData.message ='Preferências';
    
    ejs.renderFile(fileName, postData, null, function(err, html) {

        if( err ){
            console.log( 'error :', err);
            return
        };
        res.send( html );
    })
}

// move fotos do folder /uploads para folder /database
function photosMove( photos ) {
    console.log('photosMove()' );

    let user =sess.user;
    let _filename ='';
    let newPath  =path.join( basedir, imagedatabase,  user.id + '/' );

    //console.log( 'fs.existsSync :' , fs.existsSync( "c:\\nodejs\\node-express4\\public\\database\\users\\photos\\5\\photo0.jpg" ) );
    
    try{
        // move photos
        if (! fs.existsSync(newPath)) {
            fs.mkdirSync( newPath, { recursive: true });
        }
        
        // le todos arquivos do diretorio /database
        let filesToRemove =fs.readdirSync(newPath);

        photos.forEach( function(photo, index){
            // verifica se arquivo foi uploaded
            if( photo.url.search("uploads" )>-1 ) {
                _filename =path.resolve(newPath ,path.basename(photo.url) );
                // retira url prefix = data:image/png;base64,
                const data =photo.img.slice( "data:image/png;base64,".length );
                const buf =Buffer.from(data, "base64");
                // grava arquivo no diretorio /database
                fs.writeFile(_filename, buf, 'base64', function (err) {
                    if (err) {
                        console.log(err);
                        return
                    }
                })
            }
            else {
                // verifica se arquivo ja gravado foi excluído pelo usuário
                //if( photo.url.search( imagepreview )>-1) {
                if( photo.removed ) {
                    const result =filesToRemove.find( function (_fln) {
                                                        if( path.parse(_fln).name === 'photo' + index ) {
                                                            return _fln;
                                                        }
                                                    });
                    console.log( 'original :' ,photo.original);
                    
                    if( result ) {
                        _filename =path.join(newPath ,result );
                        fs.unlink( _filename ,function(err) {
                            if (err) {
                                console.log(err);
                                return
                            };
                            console.log('removed filed:' ,_filename );
                        })
                    }
                }
            }
        })
    }catch( e ) {
        console.error( "error: ", e);
    };
    return
};


// ***********************************************
// APP's METHODS
// ***********************************************
app.get('/', (req, res, next) => {
    console.log( req.method + '  ' + req.url )
    
    sess =req.session;
    
    Uf.findAll( { raw: true} )
        .then( ufs => {
        
            let _ufs = postData.ufs;
        
            ufs.forEach( uf => { 
                _ufs.push( { 'id': uf.id, 'desc': uf.descricao } ) 
            });
        
            // verifica se usuario esta logado
            if ( sess.user ){

                // inicialização
                postData.photo =sess.photo;
                postData.user =sess.user;
                //console.log( 'sess.photo :', sess.photo);
                
                //
                let _iduf =sess.user.iduf;
                
                // carrega entidade cidades e renderiza página
                Cidade.findAll( { where: { 'iduf': _iduf }, order: [ ['descricao','ASC'] ], raw: true} )
                    .then( cidades => {
                        let _cidades =postData.cidades;

                        cidades.forEach( cidade => { 
                            _cidades.push( { 'id': cidade.id, 'desc': cidade.descricao } ) 
                        });
                        sendIndexPage( res );
                    })
                    .catch( err => {
                        console.log( 'error: ', err);
                        
                        res.send( { 'error': err} );
                        
                        return;
                    })
            } else {
                // inicializa photos
                let _photo ={};
                _photo.foto1 =imagepreview;
                _photo.foto2 =imagepreview;
                _photo.foto3 =imagepreview;
                _photo.foto4 =imagepreview;
                
                postData.photo =_photo;
                
                //console.log( 'postData.photo :', postData.photo );
                
                // renderiza página
                sendIndexPage( res )
            }
        })
        .catch( err => {
            console.log( 'erro: ', err);

            res.send( { 'error': err} );

            return;
        })
})

app.get('/cidades/uf/:id', (req, res, next) => {
    console.log( req.method + '' + req.url )
    
    let uf =req.params.id;
    Cidade.findAll( {   where: { 'iduf': uf }, 
                        order: [ ['descricao','ASC'] ], 
                        raw: true} )
        .then( cidades => {
        
            let _cidades = [];
        
            cidades.forEach( cidade => { _cidades.push( { 'id': cidade.id, 
                                                         'desc': cidade.descricao } ) });

            res.send( { 'cidades': _cidades } );

            return; 
        })
        .catch( err => {
            console.log( { 'error': err.message} );
        
            next( err );

            return;
        });
});


app.post('/imagens/photo/upload', upload.single('photo-input'), function(req, res) {  //url => /imagens
    console.log( req.method + ' ' + req.url )
    
    sess =req.session;
    let status ='200';  // success
    let file =req.file;
    let _uid =sess.user_uid;
    
    if(! file ){
        status ='500';  // error    
    };
    
    // The network path after file uploaded.
    let url ='http://' + req.headers.host + '/imagens/uploads/' + _uid + '/' + file.filename;   /// app path => /imagens
    
    // send file back to client
    res.status(status);
    res.send( { 'url': url ,'original': file.originalname ,'zoom': true } );
    
});


app.get('/imagens/photo/remove', (req, res, next) => {
    console.log( req.method + ' ' + req.url )
    
    let status ='200';  // success
    let url = 'http://' + req.headers.host + '/' + imagepreview;
            
    // send image preview back to client
    res.status(status);
    res.send( { 'url': url, zoom: false } );
    
});


app.get('/home/login/email/:email', (req, res, next) => {
    
    /****
        SIMULA LOGIN DO USUÁRIO
        
        https://codeforgeek.com/manage-session-using-node-js-express-4/
     ****/
    
    sess =req.session;
    
    let _email = req.params.email;
    let _senha = 'senha5';
    
    // busca usuario pelo email digitado
    User.findOne( { where: { 'email': _email }, raw: true} )
        .then( user => {
        
            // verifica se usuario existe
            if(! user) {
                console.log( 'Usuário não localizado.' );

                sess.message ='Usuário não localizado.';
                
                res.redirect('/');
                
                return;
            };
        
            // verifica se senha é valida
            if( ! utils.getPassword( _senha, user.senha) ) {
                console.log( 'Senha inválida' );

                sess.message ='Senha inválida';
                
                res.redirect('/');
                
                return;
            };
            user.senha =_senha;
        
            console.log( 'usário logado :', user.email );
        
            sess.message ='usário logado';
            sess.user =user;
            sess.user_uid =uuidv1();
        
            let _uid =sess.user_uid;
            let _path =path.join(basedir, imageuploads, _uid );

            // create folder
            if (! fs.existsSync(_path)) {
                fs.mkdirSync( _path, { recursive: true });
            }
        
            // carrega entidade fotos do usuario
            Foto.findOne( { where: { 'idusuario': user.id }, raw: true} )
                .then( foto => {

                    sess.photo =foto;
                    //
                    // verifica se existe fotos no album e seleciona a primeira
                    // o valor informado é o indice do array preferencias.photos.
                    if( foto.foto1 != imagepreview ){
                        sess.photo.selecionada =0;
                    } else 
                    if( foto.foto2 != imagepreview ){
                        sess.photo.selecionada =1;
                    } else 
                    if( foto.foto3 != imagepreview  ){
                        sess.photo.selecionada =2;
                    } else
                    if( foto.foto4 != imagepreview  ){
                        sess.photo.selecionada =3;
                    };
                
                    //console.table( foto );
                
                    // direciona pagina principal
                    res.redirect('/');
                })
                .catch( err => {
                    console.error('erro: ', err);

                    sess.message = err.message;

                    next( err );

                });
                
        })
        .catch( err => {
            console.error('erro: ', err);
        
            sess.message = err.message;

            next( err );

        });
});


app.post('/minhaconta/prefer/salvar', (req, res, next) => {
    console.log( req.method + '' + req.url );

    sess =req.session;
    
    let _user ={};  // objetc to store user's data
    let _photo =[]; // array to store user's photos

    //console.log('req.body :', req.body );
    
    Object.assign( _user, req.body.user );
    Object.assign( _photo, req.body.photo );
    
    _user.id =sess.user.id;
    _user.senha =utils.createHash(_user.senha);
    
    // update user's preferencies
    User.update( _user, { where: { 'id': _user.id} } )
        .then( function() {
                //
                // se sucesso, move fotos do folder /uploads para folder /database
                //
                photosMove( _photo );
        
                // se sucesso, atualiza entidade foto.
                let _foto ={};
                let _url ='';
                let _filename ='';
        
                // diretorio do banco de dados de fotos
                // newPath = diretorio onde as fotos serão armazenadas
                // este diretório esta contido na pasta estática do app /public/database/users/photos
                let newPath  =imagedatabase.slice(8) + '/' + _user.id + '/';  
        
                _foto.idusuario =_user.id;
                _photo.forEach( function(photo, index){
                    _url =photo.url;
                    
                    // verifica se é um arquivo novo (uploaded) e troca o path
                    if( _url.search("uploads" )>-1 ) {

                        _filename =path.basename( _url );

                        //console.log('index :', index);

                        _foto['foto' + ++index] =newPath + _filename;

                        //console.log('_foto[index] :', _foto['foto' + index]);
                    };
                    //
                    if( photo.removed ) {

                        _filename =path.basename( _url );

                        //console.log('index :', index);

                        _foto['foto' + ++index] =imagepreview;

                        //console.log('_foto[index] :' ,_foto['foto' + index]);
                    }
                });
                
                // update user's photos
                Foto.update( _foto, {where: { 'idusuario': _foto.idusuario}} )
                    .then( function() {
                        console.log(`Preferencias do usuário ${_user.email} alteradas com sucesso!!`);

                        res.send(`Preferencias do usuário ${_user.email} alteradas com sucesso!!`);
                    })
                    .catch( err => {
                        console.log( 'erro:', err );

                        next ( err );
                    });
        
        })
        .catch( err => {
            console.log( 'erro: ', err );

            next ( err );
        });
    
});


app.get('/home/logout', (req, res, next) => {

    sess =req.session;
    let user =sess.user;
    
    if(user) {
        let _uid =sess.user_uid;

        // remove uploads/_uid directory
        let _path =path.join(basedir ,imageuploads ,_uid );

        try{
            if ( fs.existsSync(_path) ) {
                // let uplPhotos =[ _path + '/photo1.*jpg', _path + '/photo2.jpg', _path + '/photo3.jpg', _path + '/photo4.jpg' ];
                // exclui arquivos de /uploads
                _filename =path.join( _path + '/photo*.*' );

                if ( fs.existsSync(_filename) ) {

                    fs.unlink(_filename , function(err) {
                        if (err) {
                            return console.log(err);
                        };
                        console.log('removed file:',  _filename )
                    })
                }
                //
                fs.rmdirSync(_path, { recursive: true } );
            }
        }catch( e ) {
            console.log( "error: ", e);
            //
            return;
        }
        
        sess.user =null;
        sess.photo =null;
        sess.user_uid =null;
        postData ={ user: null, photo: null, ufs: [], cidades: [] };
        
        console.log( `usuário ${user.email} saiu !`);
        
        // redireciona para página inicial
        res.redirect('/');
    }
    
    sess.message =null;
    
});

app.get('/sendmail', (req, res, next) => {
    console.log( req.method + '  ' + req.url );
    
    sess =req.session;
    
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
    let _empresa ='-depressão +relacionamentos';
    let sendData ={ 'nome': _nome, 'empresa': _empresa };
    let fileName ='c:/nodejs/node-express4/views/password_message.ejs';

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
            subject: 'Nova Senha',
            html: html_message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error.message);
            }
            console.log('success');
            
            res.send(html_message);
        });

    })
    
})


app.listen(port, () => {
    
  console.log(`Example app listening at http://localhost:${port}`)
    
})