
$(document).on( 'click',  '#btn', 

        function() {
            
            $.ajax({
                method: 'get',
                url: '/home/loader',
                beforeSend: function( xhr ){
                    $('#btn').html( '<i class="fa fa-circle-o-notch fa-spin"></i>Send' );
                },
                success: function( result ){
                    $('#result').html( result );
                },
                error: function( xhr ){
                    alert('erro !');
                },
                complete: function(){
                    $('#btn').html( 'Send' );
                }
            })
        }
);