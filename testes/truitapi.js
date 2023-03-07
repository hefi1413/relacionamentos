

$(document).ready( function() {
    console.log("truitapi.ready();");
    
    $(document).on( "click", "#btn" , function() {
        
        console.log("btn.click();");
        
        return call();
    })
    
});


function call() {
    console.log("call()");
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.talentinsights.com/v1/usage/thismonth",
      "method": "GET",
      "headers": {},
      "data": "{}",
    }

    $.ajax(settings).done(
        function (response) {
            console.log(response);
        }
    );
    return '';
}