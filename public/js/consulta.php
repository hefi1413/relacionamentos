<?php

require_once "conexao.php";
require_once "funcoes.php";

$opcao = isset($_POST['opcao']) ? $_POST['opcao'] : '';
$result = array("result"=>'error', "data"=>'');

if (empty($opcao)) {
    
    $result[1] ='Erro chamando arquivo consulta.php !';
    
    return json_encode($result);
}

switch ($opcao)
{
    case 'usuarios':
        {
            echo getUsuarios();
            break;
        }
}

function getUsuarios(){

    $data =query('SELECT * FROM usuarios ORDER BY id;');
    
    $result["result"] ='sucesso';
    $result["data"] =$data;
    
    return json_encode($result);
    
}

?>