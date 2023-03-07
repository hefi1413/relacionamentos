
class formRegistrar extends View {

    constructor() {
        super();
        //this.$seletor.innerHTML = this.render();
    }

    getDataForm() {
        var fields = document.getElementsByName('fields');
        return fields;
    }

    _render() {

        var $html =

            `<div class="col-9 my-auto mx-auto">
                    <br>
                    <br>
                    <h1 class="text-center">REGISTRAR</h1>
                    <br>
                    
                    <span>Informe seus dados neste formulário</span>
                    
                    <form class="form-container" >
                        <div class="form-group ">
                            <input class="form-control" type="text" name="fields" id="nome" aria-describedby="nomeHelp" placeholder="Informe um nome" required >
                        </div>
                        <div class="form-group mx-auto">
                            <input class="form-control" type="email" name="fields" id="email" aria-describedby="emailHelp" placeholder="Informe um email" required>
                        </div>
                        <div class="form-group mx-auto">
                            <input class="form-control" type="password" name="fields" id="senha" aria-describedby="senhaHelp" placeholder="Informe uma senha" required>
                        </div>
                        <div class="form-group mx-auto">
                            <button type="button" class="btn btn-secondary btn-block" value="Enviar">REGISTRE</button>
                        </div>
                    </form>                    
                </div>`
            ;
        return $html;
    }
    
    render() {
        this.$selector.innerHTML = this._render();
    }
    
}