var login = require('./passportLogin');
var signup = require('./passportSignup');
var { User } = require('../sequelize/sequelize');

module.exports = function(passport){

    //console.info( 'its a function' );
    
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');
        //console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({ where: { 'id' :  id } })
                .then(  function(user) {        
                            //console.log('deserializing user: ',user);
                            done(null, user);
                        })
                .catch( function(err){ 
                            done(err, null);
                        });

    });
    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);
};