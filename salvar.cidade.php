<?php

//echo json_encode(print_r($_REQUEST, true));


$nome = "scripts/cidade_" . date("h") . date("i") . date("s") . ".pl";


$myfile = fopen($nome, "w") or die("Unable to open file!");
fwrite($myfile, json_encode($_REQUEST["script"]));
fclose($myfile);


//unlink(@$nome);
?>