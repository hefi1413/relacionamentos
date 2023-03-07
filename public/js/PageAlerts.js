//
//  EXIBIÇÃO DE ALERTAS DO APP
//

const HTML_ALERTS ='#html-alerts';

var pageAlerts = {

    // verifica se o elemento HTML_ALERTS existe no $documento
    init: function( $doc ) {
        console.log( 'PageAlerts.init ');
        //
        if( ! $doc( HTML_ALERTS ) ) {
            return new Error('<div id="html-alerts"> não localizada na página !');
        }
        this.alerts =$doc;
    },
    errorMessage: function(intro, msg ) {
        
        console.log( 'PageAlerts.errorMessage ');
        
        // error message
        
        let html ='';
        html = `<strong>${intro}</strong> ${msg}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>`;
        //
        this.alerts( HTML_ALERTS ).html( html );
        this.alerts( HTML_ALERTS ).attr('style','display: block;');
    },
    infoMessage: function(intro, msg ) {
        // info message
        
        let html ='';
        html = `<div class='alert alert-danger container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts( HTML_ALERTS ).html( html );
        this.alerts( HTML_ALERTS ).attr('style','display: block;');
    },
    successMessage: function(intro, msg ) {
        // success message
        
        let html ='';
        html = `<div class='alert alert-danger container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts( HTML_ALERTS ).html( html );
        this.alerts( HTML_ALERTS ).attr('style','display: block;');
    },
    hide: function() {
        this.alerts( HTML_ALERTS ).attr('style','display: none;');
        this.alerts( HTML_ALERTS ).html( '' );
    }
    
};

module.exports = pageAlerts;