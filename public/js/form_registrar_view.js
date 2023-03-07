//
// VIEW REGISTRO USUARIOS
//

//----------------------------- FORM FUNCTIONS
$(document).ready( function($){
    console.log("ready()");
    //
    var $html = view();
    
    $('form').html($html).show();
    
});


function view() {
    var $html =`<div class="form-group w-25 p-3'"> 
                    <label for="nome">Nome</label>
                    <input class="form-control" type="text" name="nome" id="nome" aria-describedby="apelidoHelp" placeholder="apelido" required >
                </div>

                <div class="form-group w-75 p-3'">
                    <label for="email">Endereço de e-mail:</label>
                    <input class="form-control" type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Enter email" required>
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>

                <label class="form-check-label" for="sexo">Você é:</label><br/>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="sexo1" value="1" checked>
                    <label class="form-check-label" for="sexo">Homem</label>
                </div>

                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="sexo" id="sexo2" value="0">
                    <label class="form-check-label" for="sexo">Mulher</label>
                </div>

                <br>

                <button type="button" id="adicionar" class="btn btn-secondary" style="">REGISTRAR</button>`;

    return $html;
}