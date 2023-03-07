/*


//***********************************************************************
//*** NÃO SERÁ NECESSÁRIO IMPLEMENTAR ESTE FORM NO PROJETO DE TESTE
//***********************************************************************


//-----------------------------ADICIONAR FUNCTIONS
$('#adicionar').click( function(){
    console.log("adicionar()");
    //var textAdd = $('#inpudAdd').val();
   
    //
    var $usuario  = getUsuario();
    
    // chama script de consulta
    $.ajax({
        url: 'gravacao.php',
        data: $usuario,
        success: _adicionar_sucesso,
        error: _adicionar_error
    });
    
});

function _adicionar_sucesso($result) {
    alert('sucesso !!');
}

function _adicionar_error(jqXHR, exception) {
    console.log("_adicionar_error");

    __error(jqXHR, exception);
}


//-----------------------------EDITAR FUNCTIONS
$('#editar').click( function($table){
    console.log("editar()");

    var $index =getTable().rowIndex;
    var $row =$table.rows[index];
    
    var $id = $row.cells[0];
    
    var $nome = $id;  //$row.cells[1];
    for (i = 0; i < 6; i++) {    
        $nome += getRandonString();
    }
    
    var $email = $id;  //$row.cells[1];
    
    for (i = 0; i < 6; i++) {    
        $email += getRandonString();
    }
    email += '@gmail.com';
    
    //
    //var $usuario  = getusuario();

    //chama script de consulta
    $.ajax({
        url: 'gravacao.php',
        data: {opcao:'usuarios',acao:'update', id:$id, nome:$nome, email:$email},
        success: _editar_sucesso,
        error: _editar_error
    });
    
});

function _editar_sucesso($result) {
    alert('sucesso !!');
}

function _editar_error(jqXHR, exception) {
    console.log("_editar_error");

    __error(jqXHR, exception);
}



//----------------------------- EXCLUIR FUNCTIONS
$('#excluir').click( function($table){
    console.log("excluir()");

    var $usuario = getUsuario();    

    if(confirm("voce realmente quer excluir este usuário?")) {
        
        //tenta alterar um registro no banco de dados
        $params ={ opcao:'usuarios', id:$id};
        
        // chama script de consulta
        $.ajax({
            url: 'gravacao.php',
            data: $params,
            success: _excluir_sucesso,
            error: _excluir_error
        });
            
    }    
});

function _excluir_sucesso($result) {
    console.log("_excluir_sucesso");
    
    var $index =getTable().rowIndex;
    
    $('table_data').deleteRow($index);
    
}

function _excluir_error(jqXHR, exception) {
    console.log("_excluir_error");

    __error(jqXHR, exception);
}

*/