//
// https://developpaper.com/ajax-cooperates-with-node-js-multer-to-realize-file-upload-function/
//

var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app =express();
var port =3000;
// 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
//
app.use(express.static(path.join(__dirname, '../public')));

var multer =require('multer');

/*
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
*/

var upload =multer( {dest: 'c:/nodejs/node-express4/public/imagens/uploads/'} );

app.get( '/', function(req, res) {

    let filename ='c:/nodejs/node-express4/test/testeCroppie.html';
    
    res.sendFile( filename, null, function(err){
        
        if(err) {
            console.log( err );
        }
    })
});

app.post( '/imagens/foto/upload', upload.single('input-file'), function(req, res) {
    console.log( req.body, req.file);

    let size =req.file.size;
    let file =req.file.path;
    
    // The network path after file uploaded.
    var url = 'http://' + req.headers.host + '/imagens/uploads/' + req.file.filename;
    
    // send file back to client
    res.send( { 'filename': url } );
    
});

app.post( '/salvar', function(req, res) {
    
});

app.listen(port, () => {

  console.log(`Croppie Test App:listening at http://localhost:${port}`)
  
})

module.exports = app;