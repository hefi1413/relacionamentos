//
// SCRIPT CONTROLE REGISTRAR
//

var bodyParser= require('body-parser');
var path = require('path');

var testeLoaderControll = {

    // --------------------------
    render: function(req, res, next) {
        
        var fileName = 'c:/nodejs/node-express4/testes/testeLoader.html';
        //var fileName = './testeLoader.html';

        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, null, 
                function (err) {
                    if (err) {
                        console.log('erro sending file:', err);
                    }
                });
        
    },
    loader: function(req, res, next) {
        
        var fileName = 'c:/nodejs/node-express4/public/includes/login.html';

        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, null, 
                function (err) {
                    if (err) {
                        console.log('erro sending file:', err);
                    }
                });
        
        //res.send("<span style='background-color: green;color: white;'> teste </span>");
    }
}

module.exports =testeLoaderControll;