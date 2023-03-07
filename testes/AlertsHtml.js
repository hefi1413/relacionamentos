//
//  EXIBIÇÃO DE ALERTAS DO APP
//
// DANGER =0
// INFO =1
// SUCCESS =2

const HTML_ALERTS ='#html-alerts';

var Alerts = {
    
    start: function() {
        
        $finder =document.querySelector.bind(document);
        
        this.alerts =$finder(HTML_ALERTS);
        if(!this.alerts) {  //  
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        }
    },
    error: function(intro, msg ) {
        // danger message
        if(!this.alerts) {
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        };
        
        let html ='';
        html = `<div class='alert alert-danger container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts.innerHTML =html;
    },
    info: function(intro, msg ) {
        // info message
        if(!this.alerts) {
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        };
        
        let html ='';
        html = `<div class='alert alert-info container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts.innerHTML =html;
    },
    success: function(intro, msg ) {
        // success message
        if(!this.alerts) {  
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        };
        
        let html ='';
        html = `<div class='alert alert-success container-fluid'>`;
        html +=`<strong>${intro}</strong>`;
        html +=` ${msg}`;
        //
        this.alerts.innerHTML =html;
    },
    hide: function() {
        if(!this.alerts) {  
            throw new Error(`div ${HTML_ALERTS} não localizada na página !`);
        };
        this.alerts.style.display ='none';
        this.alerts.innerHTML = '';
    }
}