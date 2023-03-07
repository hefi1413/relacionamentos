

const createError = require('http-errors');
const express = require('express');

var bodyParser= require('body-parser');
//var debug = require('debug')('app_listen_notify');
var listen = require('./listen-notify');

const app = express();
const port = 3000;

// Automatically parses form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

console.log('Testing %o', 'app_listen_notify' );
console.log('--------------------------');

app.get('/', (req, res) => {
    res.send('Hello, Wordl!')
});

console.log('Listening ... ');

listen.connect();

/*
app.listen(port, () => {
    
    //debug(req.method + ' ' + req.url);
    
    console.log(`App listening at http://localhost:${port}`);
    
    
})
*/