//
// SCRIPT DO APP
//


//
// VARIÁVEIS DO APP
//
var $usuarios = new Usuarios;
//var $formRegistrar;
//var $formLogin;
//var $formContato;
var $formMain =undefined;


//
// EVENTOS MENU index.html
//
$('#btn-menu-iniciar').click( function() {
    console.log("app.btn-menu-iniciar");
    homeControll.index();
} );

$('#btn-menu-registrar').click( function() {
    console.log("app.btn-menu-registrar");
    
    homeControll.registrar();
} );

$('#btn-menu-login').click( function() {
    console.log("app.btn-menu-login");
    
    homeControll.login();
} );

$('#btn-menu-contato').click( function() {
    console.log("app.btn-menu-contato");
    
    homeControll.contato();
} );


// 
// MÉTODO MAIN DO APP
//
function createMain() {
    
    if($formMain===undefined) {
        
        console.log("app.createMain()");
    
        $formMain = new formMain();
        $formMain.render();
    }
}