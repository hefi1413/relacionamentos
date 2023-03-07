//
//  FUNCÕES  UTILS PROJETO
//

function ajaxCall(url, data, success, error, method = "GET", dataType = "HTML" ) {
    console.log(`utils.ajaxCall(${url})`);
    
    $.ajax({
            url: url,
            method: method,
            data: data,
            dataType: dataType,

            contentType: false,
            processData: false,            

            success: success,
            error: error 
        });
}
