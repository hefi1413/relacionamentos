const express = require('express');

var path = require('path');
var debug = require('debug')('app');

var testeLoaderControll =require('./testeLoaderControll');

const app = express();
const port = 3000;

//  app static directory setup
app.use(express.static(path.join(__dirname, '../public')));
app.locals.basedir =path.join(__dirname, '../public');

//  app uses
app.get('/', testeLoaderControll.render );
app.get('/home/loader', testeLoaderControll.loader );

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

module.exports =app;