<?php

require_once "app.php";



/*

//conta numero de registros

echo 'Obtendo número de linhas ...' . "<br />"; 

$sql    = 'SELECT Count(*) FROM Usuarios;';
$resultset = query($sql);

$linhas = $resultset->fetchColumn();

echo 'Total de Linhas: ' . $linhas .   "<br />";

*/


    

/*
// mostra as linhas do banco de dados

    //carrega tabela usuarios
    $.getJSON('consulta.php?opcao=usuarios', 

          function (dados){

            $option ='<thead><tr><th scope="col">#</th><th scope="col">Apelido</th></tr></thead>';
            $option +='<tbody>';
                  //<th scope="row">1</th>

            while ($row = $resultset->fetch(PDO::FETCH_ASSOC)) {
                $option +='<tr>';
                $option +="<td >{$row['id']}</td>";
                $option +="<td >{$row['apelido']}</td>";
                //$option +="<td >{$row['sexo']}</th>";
                //$option +="<td >{$row['email']}</th>";
                $option +='</tr>';
            }
            $option +='</tbody>';

            $data = $('.content #data');
            $data.html($option).show();
          }
        );

*/

?>