<?php

//echo json_encode(print_r($_REQUEST, true));

$nome = "scripts/script_" . date("h") . date("i") . date("s") . ".pl";

$planejador = file_get_contents("scripts/planejador.pl");


$myfile = fopen($nome, "w") or die("Unable to open file!");
fwrite($myfile, $planejador);
fwrite($myfile, "\n");
fwrite($myfile, $_REQUEST["script"]);
fclose($myfile);

$cmd = '"C:/Program Files/swipl/bin/swipl.exe" -f "C:/wamp/trabalho_v3.pl" -g teste12,halt  2>&1';
//exec($cmd, $output);
//echo json_encode($output);

$output = shell_exec($cmd);
echo json_encode($output);

unlink(@$nome);
?>