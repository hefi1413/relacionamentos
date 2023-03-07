/*
    var text = '{"key1":"John", "key2":"1986-12-14", "key3":"function(){};"}';
    var obj = JSON.parse(text);
*/

var postmodel = {
    
    model: function( attr ) {

        var smodel = ´{ 
                "id": "integer",
                "nome": "string",  
                "email": "string",
                "sexo": "integer",
                "remover": "function(usuario) { return null };",
                "salvar": "function(usuario, fsucesso, ferror) { return null };",
                "findById": "function(id) { return null };"
                }´;

        return JSON.parse(smodel);
    }
};

module.exports = postmodel;