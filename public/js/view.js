
//
//
//

class View{
    constructor(){
        this.$selector = document.querySelector( formProperties.FORM1.NAME );
    }
    
    render(){
        throw new Error ('metodo render() deve ser implementado pelas classes que herdam View');
    }
}
