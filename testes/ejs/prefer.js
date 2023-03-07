
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
            
            rdata.forEach( function( rd ) {
                $("#cidades").append( '<option>' + rd.desc + '</option>' );
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
    
    $('#photo-adjst-modal').modal('show');
});

$(document).on("click", "#photo-remove", function(){
    console.log( 'photo-remove.click()');

    $('#photo-adjst-modal').modal('show');
});

$(document).on("click", "#photo-adjst-edit", function(){
    console.log( 'photo-adjst-edit.click()');
    
    // exibe file dialog selection
    $('#photo-input').trigger('click');  
    
});

$(document).on("click", "#photo-adjst-remove", function(){
    console.log( 'photo-adjst-remove.click()');

});
