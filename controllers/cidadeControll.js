//
// SCRIPT CONTROLE LOGIN
//
// database entities
var {Cidade} =require( '../sequelize/sequelize');

var cidadeControll = {

    // --------------------------
    select: function(req, res, next) {
        //console.log("cidadesControll.select");

        let uf =req.body.id;
        Cidade.findAll( {   where: { 'iduf': uf }, 
                            order: [ ['descricao','ASC'] ], 
                            raw: true} )
            .then( cidades => {

                let _cidades = [];

                cidades.forEach( cidade => { _cidades.push( { 'id': cidade.id, 
                                                             'desc': cidade.descricao } ) });

                res.send( { 'cidades': _cidades } );

                return; 
            })
            .catch( err => {
                //console.error( { 'error': err.message} );

                next( err );

                return
            });
    }
};

module.exports =cidadeControll;