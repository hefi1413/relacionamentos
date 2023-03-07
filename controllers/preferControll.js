//class="navbar navbar-dark bg-dark

//
// SCRIPT CONTROLE PREFERENCIAS
//
const basedir =process.env.APP_BASEDIR;   
const imagepreview =process.env.APP_IMAGE_PREVIEW;
const imageuploads =process.env.APP_IMAGE_UPLOADS;
const imagedatabase =process.env.APP_IMAGE_DATABASE;

const path = require('path');
const bCrypt = require('bcrypt');
const saltRounds =10;

const winston =require('../config/winston');

const ejs =require('ejs');
const postData ={ user: null, photo: null, ufs: [], cidades: [] };

// database entities
const { Uf, Cidade, User, Foto } =require( '../sequelize/sequelize');


/* FUNCTIONS */
function createHash(password){
    winston.log('debug' ,'preferControll.createHash');
    
    let salt =bCrypt.genSaltSync(saltRounds);
    return bCrypt.hashSync(password ,salt);
}
function getPassword(password, hash){
    winston.log('debug' ,'preferControll.getPassword');

    return bCrypt.compareSync(password, hash);
}
function sendPageContent( res ) {
    winston.log('debug' ,'preferControll.sendPageContent');
    
    let fileName ='c:/nodejs/node-express4/views/preferencias.ejs';
    
    postData.message ='Preferências';
    
    ejs.renderFile(fileName ,postData ,null ,function(err, html) {
        if( err ){
            throw new Error( err.message ); //next( err );
            return
        };
        res.send( html );
    })
}
// move fotos do folder /uploads para folder /database
function photosMove( photos ){
    winston.log('debug', 'prefeerControll.photosMove()' );

    let user =sess.user;
    let _filename ='';
    let newPath  =path.join( basedir ,imagedatabase ,user.id + '/' );

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
                        //console.log(err);
                        winston.log('error', err.message );
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
                                winston.log('error', err.message);
                                return
                            };
                            winston.log('info', `removed filed: ${filename}` );
                        })
                    }
                }
            }
        })
    }catch( e ) {
        next( e )
    };
    return
};

const preferControll ={
    render: function(req, res, next) {
        let sess =req.session;

        Uf.findAll( { raw: true} )
            .then( ufs => {
                let _ufs =postData.ufs;

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
                            sendPageContent( res );
                        })
                        .catch( err => {
                            next( err );
                            return
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
                    sendPageContent( res )
                }
            })
            .catch( err => {
                next( err );
                return
            })
    },
    save: async function(req, res, next) {
        let sess =req.session;
        let _user ={};  // objetc to store user's data
        let _photo =[]; // array to store user's photos

        //console.log('req.body :', req.body );

        Object.assign( _user, req.body.user );
        Object.assign( _photo, req.body.photo );
    
        _user.id =sess.user.id;
        _user.senha =utils.createHash(_user.senha);
        
        // start transaction
        const t = await sequelize.transaction();
        try {
            // update user's preferencies
            await User.update( _user, { where: { 'id': _user.id} } )
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
            // este diretório esta contido na pasta estática ./public/database/users/photos
            let newPath  =imagedatabase.slice(8) + '/' + _user.id + '/';  

            _foto.idusuario =_user.id;
            _photo.forEach( function(photo, index){
                _url =photo.url;
                // verifica se é um arquivo novo (uploaded) e troca o path
                if( _url.search("uploads" )>-1 ) {
                    _filename =path.basename( _url );
                    _foto['foto' + ++index] =newPath + _filename;
                };
                //
                if( photo.removed ) {
                    _filename =path.basename( _url );
                    _foto['foto' + ++index] =imagepreview;
                }
            });
            // update user's photos
            await Foto.update( _foto, {where: { 'idusuario': _foto.idusuario}} );
            winston.log('info',`Preferencias do usuário ${_user.email} alteradas com sucesso!!`);
            
            await t.commit();
            
            res.send({ message:`Preferencias do usuário ${_user.email} alteradas com sucesso!!`, err: false});
        }
        catch( err ) {
            await t.rollback();
            next ( err )
        }
    }
};

module.exports =preferControll;