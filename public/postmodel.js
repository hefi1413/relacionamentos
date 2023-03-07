var Pool = require('pg').pool;

/*
    var text = '{"key1":"John", "key2":"1986-12-14", "key3":"function(){};"}';
    var obj = JSON.parse(text);
*/

var postgre-model = {
    model: function( obj ) {
        if(obj) {
            for(var prop in obj) {
                this[prop] =obj[prop];
            }
        };
        return this;
    },
    remove: function() { 
        return null;
    },
    salve: function(fsucesso, ferror) { 
        return null;
    },
    findById: function(teste) { 
        return teste; 
    },
    connec( func ){
        
    }
};

module.exports = postmodel;