var LocalStrategy   = require('passport-local').Strategy;
var { User } = require('../sequelize/sequelize');
var bCrypt = require('bcrypt');
var messages =require('../public/js/sessionMessages');

var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.senha);
}

module.exports = function(passport){

    // htttp://www.stackoverflow?passport local strategy not getting called
    
	passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) {
        
            // check in database if a user with username exists or not
            User.findOne({ where: { 'email' : email } })
                .then(
                    function(user) {
                        // In case of any error, return using the done method
                        // Email does not exist, log the error and redirect back
                        if (!user){
                            console.log('User Not Found with email '+email);
                            
                            //messages.setMessage('error_message', 'Usuário não localizado.');
                            req.session.error_message ='Usuário não localizado.';
                            
                            //console.log( 'messages.getMessage', messages.getMessage('error_message') );
                            
                            return done(null, false);                 
                        };
                        // User exists but wrong password, log the error 
                        if (!isValidPassword(user, password)){
                            console.log('Invalid Password');
                            
                            //messages.setMessage('error_message', 'Senha inválida.');
                            req.session.error_message ='Senha inválida.';
                            
                            return done(null, false ); // redirect back to login page
                        };
                        // User and password both match, return user from done method
                        // which will be treated like success
                        
                        // limpa mensagens de erro da sessão
                        req.session.error_message ='';
                        
                        // 
                        return done(null, user);
                    } )
                .catch( err => {
                    if (err) {
                        console.log('Error: '+err);
                        
                        //messages.setMessage('error_message', err.message);
                        req.session.error_message =err.message;
                        
                        return done(err, null);
                    }
                });
        })
    )
};

