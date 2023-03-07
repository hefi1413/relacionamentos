
//
//  CLASSE DE EXIBIÇÃO DE ALERTAS DO APP
//
class infsys() {

    /*



    */    
    constructor(type, msg, exception ) {
        this.type = type;
        this.msg = msg;
        this.e = exception;
        //
        this.element = NULL;

/*        
        $RESULT_ACTION = 0;
        $RESULT_MSG = null;
*/
      
    }
    
    getMsg() {
    }
    
    getError() {
    }
    
    getErrorMessage() {
    }
    
    showAlert() {
        
        var html = '';
        var _msg = this.msg;
        
        if(_msg==NULL) {
            if(e!=NULL) {
                _msg =this.e.description;
            }
        }
        
        html =`<div `;        
        if(type=='succ') {
            html =`class="alert alert-success">`;
        } else
        if(type=='war') {
            html =`class="alert alert-warning">`;
        } else
        if(type=='inf') {
            html =`class="alert alert-info">`;
        } else
        if(type=='dang') {
            html =`class="alert alert-danger">`;
        }
        html +=`<strong>${_msg}</strong></div>`;
        //
        
    }
    
    
}


    
