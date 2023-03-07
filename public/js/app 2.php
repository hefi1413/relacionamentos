<?php


require_once "conexao.php";
require_once "funcoes.php";

$result =query('SELECT * FROM usuarios');

echo "<br />";
echo "<br />";
echo "resultado";
echo "<br />";
echo "<br />";

while ($linha = $result->fetch(PDO::FETCH_ASSOC)) {
    echo "Id: {$linha['id']} - Nome: {$linha['nome']}<br />";
}

echo "<br />";


$.ajax({
    url: 'some_unknown_page.html',
    success: function (response) {
        $('#post').html(response.responseText);
    },
    error: function (jqXHR, exception) {
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
        $('#post').html(msg);
    },
});

?>