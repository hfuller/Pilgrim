<?php require_once("pilgrimlib.php");

$board = new Board();
//die(var_dump($board));
if ( !array_key_exists("callback",$_GET) ) {
	die(json_encode($board));
}

echo($_GET['callback'] . '(' . json_encode($board) . ')');
