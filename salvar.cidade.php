<?php
$nome = "scripts/cidade_" . date("h") . date("i") . date("s") . ".marcos";
$myfile = fopen($nome, "w") or die("Unable to open file!");
fwrite($myfile, json_encode($_REQUEST["script"]));
fclose($myfile);

echo $nome;
?>