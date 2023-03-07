var express = require('express');
var router = express.Router();

//var testeLoginControll = require('./testeLoginControll');
//var testePreferControll = require('./testePreferenciasControll');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated()) {
		return next();
    }
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}


module.exports = function(passport){

    /* GET login page. */
	router.get('/', function(req, res, next) {
        // clear session messages
        //
        //messages.init( req.session );
        
        //testeLoginControll.login(req, res, next);
	});

        /* GET login page. */
	router.get('/inicio', function(req, res, next) {
    	// Display the Login page with any flash message, if any
        
       // testeLoginControll.login(req, res, next);
	});

	/* Handle Login POST */
	router.post('/login',         
        passport.authenticate('login', { 
                    successRedirect: '/home', 
                    failureRedirect:  '/', 
                    failureFlash : true }) );
 
/*
        passport.authenticate('login', { 
                    successRedirect: '/home', 
                    failureRedirect:  '/', 
                    failureFlash : true }) );

*/
    /*
    
	GET Registration Page 
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	Handle Registration POST 
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

    */
    
	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res, next){
		//res.render('home', { user: req.user });
        
        //testePreferControll.render(req, res, next);
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}