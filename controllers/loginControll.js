//
// SCRIPT CONTROLE LOGIN
//
const fs =require( 'fs' );

// database entities
const { Uf, Cidade, User, Foto } =require( '../sequelize/sequelize');
const responseData = { message: null, err: false};
const winston =require('../config/winston');

const loginControll = {
    // --------------------------
    login: async function(req, res, next) {
        //let sess =req.session;
        //let user =sess.user;
        const fileName = 'c:/nodejs/node-express4/public/includes/login.html';

        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, 
                     null, 
                    function (err) {
                        if (err) {
                            next(err)
                        }
                    }
        );
    },

    logout: async function(req, res, next) {
        const basedir =process.env.APP_BASEDIR;   
        const imageuploads =process.env.APP_IMAGE_UPLOADS;   
        
        let sess =req.session;
        let user =sess.user;
        let _uid =sess.user_uid;

        let _path =path.join(basedir ,imageuploads ,_uid );

        try{
            if ( fs.existsSync(_path) ) {
                _filename =path.join( _path + '/photo*.*' );

                if ( fs.existsSync(_filename) ) {
                    fs.unlink(_filename , function(err) {
                        if (err) {
                            return console.log(err);
                        };
                        winston.log('info', `removed file: ${_filename}`);
                    })
                }
                //
                fs.rmdirSync(_path, { recursive: true } );
            }
        }catch( e ) {
            next(e);
            //
            return;
        };
        sess.user =null;
        sess.photo =null;
        sess.user_uid =null;
        postData ={ user: null, photo: null, ufs: [], cidades: [] };

        // redireciona para página inicial
        res.redirect('/');
        
        sess.message =null;
    }
};

module.exports =loginControll;
