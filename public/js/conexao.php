<?php

//
//CONSTANTES DE BANCO DE DADOS
//
$db_host ='localhost';
$db_dbname = 'postgres';
$db_user = 'postgres';
$db_password = 'testex';
$conn =NULL;

$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_CASE => PDO::CASE_NATURAL
];
//
// 
//
$conn = new PDO("pgsql:host=$db_host;dbname=$db_dbname", $db_user, $db_password, $options);


?>