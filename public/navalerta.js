
$(document).ready( function() {
    
    $(".nav-item").on("click", function(e) {
        
        //e.preventDefault();

        $(".active").removeClass("active");
        
        //$(this).addClass("active");
        
        alert(location.pathname);
        
        $('nav a[href^="/' + location.pathname.split("/")[0] + '"]').addClass('active');
        
        //});        

    });
});
