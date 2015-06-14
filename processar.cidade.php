<?php
$nome = "uploads/" . $_REQUEST["arquivo"];
$conteudo = file_get_contents($nome);
unlink(@$nome);
echo $conteudo;
?>