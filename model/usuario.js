//
// SCRIPT MODEL USUARIO
//

var Usuario = {

    preencher: function(fields) {
        
        set(this.fields.id,fields.id);
        set(this.fields.nome,fields.nome);
        set(this.fields.email,fields.email);
        set(this.fields.sexo,fields.sexo);
        set(this.fields.senha,fields.senha);
        set(this.fields.idcidade,fields.idcidade);
        set(this.fields.dist,fields.dist);
        set(this.fields.hist,fields.hist);
    },
    
    set: function(key, valor) {
        this.fields[key] = valor;
    }, 
    
    get: function(key) {
        return this.fields[key];
    }, 
    
    get: function() {
        let json =JSON.stringify(this.fields);
        
        return json;
    }
};

/*

        var obj1 = {'abc':'a','def':'b','ghf':'c'};
        var obj2 = {};
        
        obj2.a = 'aa';
        obj2.b = 'bb';

        for(var property in obj1) {

            var descriptor = Object.create(null); // não herdar propriedades
            // não enumerável, não configurável, não gravável por padrão
            descriptor.value =obj1[property]; 
            Object.defineProperty(obj2, property, descriptor);            
            
        };
        
        for(var property in obj1) {
        
            obj2[property] =obj1[property];
            
        };
        


console.log(obj2);

*/

module.exports = Usuario;