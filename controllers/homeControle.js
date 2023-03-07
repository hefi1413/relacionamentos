
//
// SCRIPT CONTROLA O APP
//

var Usuario = require('../model/usuario');
var Usuarios = require('../model/usuarios');
var indexControll =require('../controllers/index');
    
var homeControll = {
 
    // --------------------------
    __error: function(jqXHR, exception) {
        var msg = '';

        if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
        } else if (jqXHR.status == 404) {
            msg = 'Requested page not found. [404]';
        } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error [500].';
        } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
        } else if (exception === 'timeout') {
            msg = 'Time out error.';
        } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
        } else {
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
        }
        //
        var alertas = new Alertas('war',msg);
        alertas.show();
    },
    
    _parse: function(data) {
        var $result;
        try {
            $result =JSON.parse(data);
        }
        catch(e) {
            var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
            alertas.show();

            return null;
        }
        return $result;
    },
    
    //---------------------------
    initialize: function() {
            
    },
    
    // --------------------------
    index: function(req, res, next) {
        console.log("homeControl.index");

        res.render('index', {} );
        //indexControll.onredy();
        
        return null;
    },

    // --------------------------
    registrar: function(req, res, next) {
        console.log("homeControl.registrar");
        
        res.render('registrar', {} );

        return null;
    },
    registrar_salvar: function () {
        console.log("homeControl.registrar_salvar");
        
        var data = formRegistrar.getDataForm(); // obtem dados do formulário **registrar**
        var usuario = new Usuario(data);
        
        Usuarios.salvar(usuario, registrar_sucesso, registrar_erro);
        
        return null;
    },
    registrar_sucesso: function (result) {
        console.log("homeControl.registrar_sucesso");

        var $msg ='Usuário adicionado com sucesso.';
        if($data.result=='erro') {
            $msg ='Não foi possível adicionar usuário. ';
        }
        
        var $data =parse(result);

        var alertas = new Alertas('inf', $msg + $data.data);
        alertas.show();
        
        return null;
    },
    registrar_erro: function (jqXHR, exception) {
        console.log("homeControl.registrar_error");

        __error(jqXHR, exception);
        return null;
    },
    

    // --------------------------
    login: function () {
        view = new view('login');
        return view.render();
    },
    login_entrar: function () {
        
        var $email = ('#email').val();
        var $senha = ('#senha').val();
        
        $usuarios.login( $email, $senha );
        
        return ;
    },

    // --------------------------
    contato: function () {
        view = new view('contato');
        return view.render();
    },
    contato_enviar: function () {
        var $email = ('#email').val();
        var $subject = ('#subject').val();
        var $mensagem = ('#mensagem').val();
        
        var $mensagens = new Mensagens();
        $mensagens.enviar( $email, $subject, $mensagem);
        
        return;
    }
};

module.exports = homeControll;