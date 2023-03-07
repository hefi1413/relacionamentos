
var fs =  require('fs');
var path = require('path');
var express = require('express');
var pug = require('pug');

//  app
var app = express();

app.locals.basedir =path.join('c:/node/node-express4', 'public');

var htmlFn = pug.compileFile('c:/node/node-express4/views/layout.pug', { basedir: app.locals.basedir } );

console.log( htmlFn({}) );
