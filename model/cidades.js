//
// SCRIPT MODEL USUARIOS
//

var { Cidade } =require("../sequelize/sequelize");

var Cidades = {
    
    findById: function( req, res, next ) {
        
        debug( 'Cidades.findById()' );

        let _id = req.params.id;
        let result =Cidade.findOne( { where: { 'id': _id }, raw: true} );

        result
            .then( cidade => {
                    res.send( { 'cidade': cidade} );
            })
            .catch( err => {
            
                res.send( { 'error': err} );
            
                return;
            });
    },
    findByUf: function( req, res, next ) {

        debug( 'Cidades.findByUf()' );
        
        let _id = req.params.iduf;
        let results =Cidade.findAll( { where: { 'idUF': _id }, raw: true} );

        results
            .then( cidades => {
            
                res.send( { 'cidades': cidades} );
            
                return; 
            })
            .catch( err => {
            
                res.send( { 'error': err} );
            
                return;
            });
        
    },
    all: function( req, res, next ) {
        
        debug( 'Cidades.all()' );

        let results =Cidade.findAll();

        results
            .then( cidades => {
            
                res.send( { 'cidades': cidades} );
            
                return; 
                })
            .catch( err => {
            
                res.send( { 'error': err} );
            
                return;
            });
        
    },
    save: function( req, res, next ) {
        
        debug( 'Cidades.save()' );

        let _req ={};
        let result =null;

        Object.assign( _req, req.body );

        _req.senha =createHash(_req.senha);

        if(_req.id==0) {        // insert

            delete _req.id; 

            result =User.create( _req );

        } else {                // update

            result =User.update( _req, {where: { 'id': _req.id} } );

        };

        result
            .then( res.send( { 'cidades': cidades}  ) )
            .catch( err => { res.send( { 'error': err}  ) });

        return;
    }
};

module.exports = Cidades;