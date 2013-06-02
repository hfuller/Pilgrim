<?php require_once("pilgrimlib.php");

echo("<pre>");

$board = new Board();
//die(var_dump($board));
die(json_encode($board));
