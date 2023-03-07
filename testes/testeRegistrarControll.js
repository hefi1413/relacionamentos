//
// SCRIPT CONTROLE REGISTRAR
//

var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

var testeRegistrarControll = {

    // --------------------------
    render: function(req, res, next) {
        console.log("testeRegistrarControll.render");
        
        let fileName = 'c:/nodejs/node-express4/public/includes/registrar.html';
        
        res.set('Content-Type', "text/html; charset=utf-8");
        res.sendFile(fileName, null, function (err) {
            
            if (err) {
                console.log('erro: ',err);

                next(err);
                // 
                // end 500 Page error
                //
            }
        });
        
        return null;
    }
}


module.exports = testeRegistrarControll;