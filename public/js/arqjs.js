
$(document).ready( function() {
    
    $(".nav-item").on("click", function() {

       $(".active").removeClass("active");
       $(this).addClass("active");

    });
};
  
// mostrar alerta
alert("clicou!");