//
// SCRIPT MODEL USUARIOS
//

var Usuarios = {
    
    initialize: function() {
        this.lista = new Array();
    },
    
    adicionar: function(usuario) {
        this.lista.push(usuario);
    },
    
    update: function(usuario) {
        console.log("usuarios.update()");
    },
        
    remover: function(usuario) {
        this.lista.pop(usuario);
    },
    
    buscaPorId: function(id) {
        var a;
        
        a =this.lista.find(usuario => usuario.id = id);
        
        if(a === undefined) {
            a =null;
        }
        return a;
    },
    
    buscaPorNome: function(nome) {
        var a;
        
        a =this.lista.find(usuario => usuario.nome = nome);
        
        if(a === undefined) {
            a =null;
        }
        return a;
    },
    
    salvar: function(usuario, fsucesso, ferror) {
        console.log("usuarios.salvar()");

        // chama script
        $.ajax({
            url: 'gravacao.php',
            method:'POST',
            data: usuario,
            success: fsucesso,
            error: ferror
        });
    },
    
    login: function(usuario, fsucesso, ferror) {
        console.log("usuarios.login()");
        
        return null;
/*
        // chama script
        $.ajax({
            url: '.php',
            method:'GET',
            data: usuario,
            success: fsucesso,
            error: ferror
        });
  
  */
        
    },
    
    logout: function(usuario, fsucesso, ferror) {
        console.log("usuarios.logout()");
        
        fsucesso({});
        
        return null;
        
/*
        // chama script
        $.ajax({
            url: '.php',
            method:'GET',
            data: usuario,
            success: fsucesso,
            error: ferror
        });

*/

    }
}

module.exports = Usuarios;