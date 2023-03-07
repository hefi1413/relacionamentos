var LocalStrategy   = require('passport-local').Strategy;
var { User,Foto } = require('../sequelize/sequelize');
var bCrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.senha);
}

const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');


module.exports = function(passport){

	passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'senha',
            passReqToCallback : true
        },
        function(req, email, password, done){
            let sess =req.session;
            const basedir =process.env.APP_BASEDIR;   
            const imagepreview =process.env.APP_IMAGE_PREVIEW;
            const imageuploads =process.env.APP_IMAGE_UPLOADS;
            
            //console.log('email: '+email);
            //console.log('password: '+password);
         
            // check in database if a user with username exists or not
            User.findOne({ where: { 'email' : email } })
                .then(
                    function(user) {
                        // In case of any error, return using the done method
                        // Email does not exist, log the error and redirect back
                        if (!user){
                            console.log('User Not Found with email '+email);
                            
                            sess.error_message ='Usuário não localizado.';
                            
                            return done(null, false);                 
                        };
                        // User exists ,but wrong password
                        if (!isValidPassword(user, password)){
                            console.log('Invalid Password');
                            
                            sess.error_message ='Senha inválida.';
                            
                            return done(null, false ); // redirect back to login page
                        };
                        // User and password both match, return user from done method
                        // which will be treated like success
                        
                        sess.user =user;
                        sess.message ='usário logado';
                        sess.user_uid =uuidv1();
                        
                        delete user.senha;

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
                                // send response
                                return done(null, user);
                            })
                            .catch( err => {
                                sess.error_message =err.message;

                                return done(err, null);
                            })
                    } )
                .catch( err => {
                    if (err) {
                        sess.error_message =err.message;
                        
                        return done(err, null)
                    }
                });
        })
    )
};