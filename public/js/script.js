//
//ARQUIVOS DE CONTROLE DE EVENTOS
//

//----------------------------- FORM FUNCTIONS
$(document).ready( function($){
    console.log("ready()");
    //
    consultar();
    // 
    $(document).on('click', '.clickable-row' , function() {
        console.log(".clickable-row click()");

        $(this).addClass( tableProperties.SELECTED_ROW_COLOR ).siblings().removeClass( tableProperties.SELECTED_ROW_COLOR );

    });
});

function __error(jqXHR, exception) {
    var msg = '';

    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status == 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status == 500) {
        msg = 'Internal Server Error [500].';
    } else if (exception === 'parsererror') {
        msg = 'Requested JSON parse failed.';
    } else if (exception === 'timeout') {
        msg = 'Time out error.';
    } else if (exception === 'abort') {
        msg = 'Ajax request aborted.';
    } else {
        msg = 'Uncaught Error.\n' + jqXHR.responseText;
    }
    //
    var alertas = new Alertas('war',msg);
    alertas.show();
    
}

function getRandonString() {
    
    var $arr = ['a','b','c','d','e','f','g','h','i'];
    
    var $i =Math.floor(Math.random() * 9);
    
    return $arr[$i];
}

function getTable() {
    return document.querySelector( '#'+tableProperties.NAME );
}

function getSelectedRow() {
    var $table = getTable();
    var $row = $table.querySelector( '.' + tableProperties.SELECTED_ROW_COLOR );
    return $row;
}



    /* 
    $_POST[];
    $_POST[];
    $_POST[];
    $id = if( isset($_POST['id']) , $_POST['id'], '' );

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $sexo = $_POST['sexo'];
    $idcidade = $_POST['idcidade'];
    $dist = $_POST['dist'];
    $hist = $_POST['hist'];
    */

//retorna um usuario
function getUsuario(acao = 'update') {
    
    var $usuario =null;
    var $id = '';
    var $nome = '';
    var $email = '';

    //
    for (i = 0; i < 6; i++) {
        $nome += getRandonString();
    }

    $email += $nome + '@gmail.com';
    
    if(acao!='adicionar') {
        
        $row =getSelectedRow();
        
        if($row) {
            var $index =$row.rowIndex;
        
            if($index==-1) {
                alert('selecione uma linha !!');
                return null;
            }
            $id = $row.cells[0].innerHTML;
        }
    }

    $nome = $id + $nome;
    $email = $id + $email;

    $usuario = { opcao:'usuarios' ,acao:acao, nome:$nome ,email:$email ,sexo:0 ,senha:"xxx" ,idcidade:0 ,hist:"testetestetestet" ,dist:0 };

    if(acao!='adicionar') { 
    
        $usuario.id= $id;
        
    } 
    
    return $usuario;
}

/*

//******************************************************************
//*** ESTAS FUNÇÕES DEVEM SER IMPLEMENTADAS NO FORM_EDITAR_USUARIO
//******************************************************************

$('#adicionar').click( function(){
    console.log("script.adicionar()");

    //chama formulario adicionar usuario
    let $usuario = {acao:'adicionar'};
    
    $.ajax({
        url: 'form_editar_usuario.php',
        data: params
    });
    
});

$('#editar').click( function($table){
    console.log("script.editar()");

    //chama formulario adicionar usuario
    let $usuario = getUsuario();
    $usuario.acao = 'editar';
    
    $.ajax({
        url: 'form_editar_usuario.php',
        data: {$usuario}
    });
    
});

$('#excluir').click( function($table){
    console.log("script.excluir()");

    var $usuario = getUsuario();    

    if(confirm(`você realmente quer excluir o usuário ${$usuario.nome} ?`)) {
        
        //tenta alterar um registro no banco de dados
        $params ={ opcao:'usuarios', id:$usuario.id};
        
        //chama script de consulta
        $.ajax({
            url: 'gravacao.php',
            data: $params,
            success: _excluir_sucesso,
            error: _excluir_error
        });
            
    }    
});

*/

//----------------------------- CONSULTAR FUNCTIONS
function consultar() {
    console.log("app.consultar()");
        
    // chama script de consulta
    $.ajax({
        url: 'consulta.php',
        method:'POST',
        data: {opcao: 'usuarios', acao:'consultar'},
        success: _consultar_sucesso,
        error: _consultar_error
    });
};

function _consultar_sucesso($result) {
    console.log('script._consultar_sucesso');
    
    //console.log("result ->" + $result);
    
    try {
        $data =JSON.parse($result);
    }
    catch(e) {
        var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
        alertas.show();
        
        return;
    }

    if($data.result=='erro') {
        var alertas = new Alertas('inf', 'Não foi possível realizar a consulta.' + $data.data);
        alertas.show();

        return;
    }
    
    
    $usuarios =$data.data;
    
    var $option = '';
    $usuarios.forEach( usuario => {

        $option += '<tr class="clickable-row">';
        $option += '<td>' + usuario.id + '</td>';
        $option += '<td>' + usuario.nome + '</td>';
        $option += '<td>' + usuario.email + '</td>';
        $option += '</tr>';

    } );

    // mostrar dados na tabela
    $('#' + tableProperties.NAME +' tbody').html($option).show();
}

function _consultar_error(jqXHR, exception) {
    console.log("script._consultar_error");
    
    __error(jqXHR, exception);
}

//----------------------------- ADICIONAR FUNCTIONS
$('#adicionar').click( function(){
    console.log("script.adicionar()");
    //
    var $usuario =getUsuario('adicionar');
    
    //console.log("usuario ->" + $usuario);
    
    // chama script de consulta
    $.ajax({
        url: 'gravacao.php',
        method:'POST',
        data: $usuario,
        success: _adicionar_sucesso,
        error: _adicionar_error
    });
    
});

function _adicionar_sucesso($result) {
    console.log("script._adicionar_sucesso");

    //console.log("result ->" + $result);

    var $data;
    try {
        $data =JSON.parse($result);
    }
    catch(e) {
        var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
        alertas.show();
        
        return;
    }
    
    var $msg ='Usuário adicionado com sucesso.';
    if($data.result=='erro') {
        $msg ='Não foi possível adicionar usuário. ';
    }
    
    var alertas = new Alertas('inf', $msg + $data.data);
    alertas.show();
    
}

function _adicionar_error(jqXHR, exception) {
    console.log("script._adicionar_error");

    __error(jqXHR, exception);
}

//----------------------------- EDITAR FUNCTIONS
$('#editar').click( function(){
    console.log("script.editar()");

    var $usuario =getUsuario();

    //console.log("usuario ->" + JSON.stringify( $usuario ) ) ;
    
    if($usuario) {
    
        // chama script de consulta
        $.ajax({
            url: 'gravacao.php',
            method:'POST',
            data: $usuario,
            success: _editar_sucesso,
            error: _editar_error
        });
    }
});

function _editar_sucesso($result) {
    console.log("script._editar_sucesso");

    //console.log("result ->" + $result);

    var $data;
    try {
        $data =JSON.parse($result);
    }
    catch(e) {
        var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
        alertas.show();
        
        return;
    }
    
    var $msg ='Alteração realizada com sucesso.';
    if($data.result=='erro') {
        $msg ='Não foi possível realizar alteração. ';
    }
    
    var alertas = new Alertas('inf', $msg + $data.data);
    alertas.show();
    
}

function _editar_error(jqXHR, exception) {
    console.log("script._editar_error");

    __error(jqXHR, exception);
}
//----------------------------- EXCLUIR FUNCTIONS
$('#excluir').click( function(){
    console.log("script.deletar()");

    var $row =getSelectedRow(); // obtem a linha selecionada da tabela
    var $usuario =getUsuario('delete'); // obtem dados do usuario 

    //console.log("usuario ->" + JSON.stringify( $usuario ) ) ;
    
    if($usuario) {
        
        var $nome ='';
        if($row) {
           $nome = $row.cells[1].innerHTML;
        }
        
        if(confirm('Confirma exclusão do usuário ' + $nome )) {
    
            // chama script de consulta
            $.ajax({
                url: 'gravacao.php',
                method:'POST',
                data: $usuario,
                success: _editar_sucesso,
                error: _editar_error
            });
        }
    }
});

function _deletar_sucesso($result) {
    console.log("script._deletar_sucesso");

    //console.log("result ->" + $result);

    var $data;
    try {
        $data =JSON.parse($result);
    }
    catch(e) {
        var alertas = new Alertas('dan', 'Ocorreu algum problema acessando o banco de dados.');
        alertas.show();
        
        return;
    }
    
    //var $table =getTable();
    //var $row =getSelectedRow();
    //$table.deleteRow($row.rowIndex);
    
    var $msg ='Usuário excluído com sucesso.';
    if($data.result=='erro') {
        $msg ='Não foi possível excluir o usuário ';
    }
    
    var alertas = new Alertas('inf', $msg + $data.data);
    alertas.show();
}

function _editar_error(jqXHR, exception) {
    console.log("script._deletar_error");

    __error(jqXHR, exception);
}