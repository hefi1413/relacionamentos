
$(document).on("change", "#estados", function(){
    console.log( 'estados.change()');

    let _uf =$("#estados").val();

    $.ajax({
        type: 'GET',
        data: { uf: _uf },
        contentType: 'application/json',
        url: '/cidades/uf/' + _uf,

        success: function ( rdata ) {
            //console.log('success: ', rdata);
            
            $("#cidades").empty();
            
            let cidades =rdata.cidades;
            cidades.forEach( function( cidade ) {
                    $("#cidades").append( '<option value=' + cidade.id + '>'  + cidade.desc + '</option>' );
            });
        },

        error: function (err) {
            console.log('error: ', err );
        }
    })
            
})

$(document).on("change", "#photo-input", function(){
    console.log( 'photo-input.change()');
    
});

$(document).on("click", "#photo-edit", function(){
    console.log( 'photo-edit.click()');
    
    $('#photo').val();
    
    $('#photo-adjst-modal').modal('show');
});

$(document).on("click", "#photo-remove", function(){
    console.log( 'photo-remove.click()');

    $('#photo-adjst-modal').modal('show');
});

