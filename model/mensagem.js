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

module.exports = Usuario;