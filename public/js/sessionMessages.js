//
// SESSION VARIABLES
//

var  sessionMessages = {
    
    init: function( sess ) {
        this.sess =sess;
    },

    // -----------------------------
    setMessage: function( key, value ) {
        this.sess[key] =value;
    },   

    setMessage: function( message  ) {
        if(message) {
            Object.assign( this.sess, message);
        }
    },   

    getMessage: function( key ) {
        return this.sess[key];
    },  

    clear: function( func ) {
        this.sess['error_message'] ='';
        this.sess['success_message'] ='';
        this.sess['info_message'] ='';
        this.sess['warning_message'] ='';
        //
        func( this.sess );
    }
};

module.exports =sessionMessages;