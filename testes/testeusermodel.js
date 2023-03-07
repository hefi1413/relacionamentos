var User =require("../model/usermodel");

var testeusermodel = {
    teste: function(req, res, next) {
        
        var id = User.id;
        var nome = User.nome;
        var email = User.email;

        res.send('id: '+ id + '<br>' + 'nome: ' + nome + '<br>' + 'email: ' + email );
        
    },
    save: function(req, res, next) {
        
        User.connect( 
            function() {
                
                res.send('sucesso na conexão. ' );
                
            },
            function() {
                
                res.send('falha na conexão. ' );

            } );

        res.send('<br> <br> ' );

        var id = User.id;
        var nome = User.nome;
        var email = User.email;

        User.save(  function( err ) {
            
            res.send('houve algum problema ao registrar. ' );
            
            return false;
            
        } );
        
        res.send('registro salvo com sucesso!! ' );
        
    }
};

module.exports =testeusermodel;