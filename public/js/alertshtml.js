//
//  EXIBIÇÃO DE ALERTAS DO APP
//
// DANGER =0
// INFO =1
// SUCCESS =2

const HTML_ALERTS ='#html-alerts';

var Alerts = {
    
    start: function() {
        this.alerts =document.querySelector(HTML_ALERTS);
        if(!this.alerts) {  //  
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        }
    },
    error: function(intro, msg ) {
        // danger message
        this.start();
        
        let html ='';
        html = `<div class='alert alert-danger container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html += msg;
        html += `</div>`;
        //
        this.alerts.innerHTML =html;
    },
    info: function(intro, msg ) {
        // info message
        this.start();
        
        let html ='';
        html = `<div class='alert alert-info container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts.innerHTML =html;
    },
    success: function(intro, msg ) {
        // success message
        this.start();
        
        let html ='';
        html = `<div class='alert alert-success container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts.innerHTML =html;
    },
    hide: function() {
        //
        this.start();
        
        this.alerts.style.display ='none';
        this.alerts.innerHTML = '';
    }
}