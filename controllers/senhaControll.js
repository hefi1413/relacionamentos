//
// SCRIPT CONTROLE LOGIN
//
// database entities
var {Cidade} =require( '../sequelize/sequelize');

var photoControll = {

    // --------------------------
    upload: function(req, res, next) {
        //console.log("photoControll.upload");

        let sess =req.session;
        let status ='200';  // success
        let file =req.file;
        let _uid =sess.user_uid;

        if(! file ){
            status ='500';  // error    
        };

        // The network path after file uploaded.
        let url ='http://' + req.headers.host + '/imagens/uploads/' + _uid + '/' + file.filename;   /// app path => /imagens

        // send file back to client
        res.status(status);
        res.send( { 'url': url ,'original': file.originalname ,'zoom': true } );
    }
};

module.exports =photoControll;