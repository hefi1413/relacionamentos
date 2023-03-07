var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//var dbConfig = require('./db');
//var mongoose = require('mongoose');
// Connect to DB
//mongoose.connect(dbConfig.url);

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, '/'));
//app.set('view engine', 'pug');

// Automatically parses form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
//
app.use(express.static(path.join(__dirname, '../public')));
app.locals.basedir =path.join(__dirname, '../public');

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');

// TODO - Why Do we need this key ?
// https://stackoverflow.com/questions/28839532/node-js-session-error-express-session-deprecated/34744627

app.use(expressSession({
    secret: 'mySecretKey',
    resave: true,
    saveUninitialized: true
}));

//app.use(passport.initialize());
//app.use(passport.session());

// Initialize Passport
//var initPassport = require('./passportInit');
//initPassport(passport);

// session messages
// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
//var sessionMessages = require('connect-flash');
//app.use(flash());

/*
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
*/

// routes
var routes = require('./passport/passportIndex')(passport);
//var routes = require('./passportIndex')(passport);
app.use('/', routes);

module.exports = app;