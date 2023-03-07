<?PHP

$result = array("result"=>'error', "data"=>'');
    
echo teste();

function teste() {
    
    $result[1] ='Erro chamando arquivo consulta.php !';
    
    return json_encode($result);
}


?>