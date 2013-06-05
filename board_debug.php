<?php require_once("pilgrimlib.php");

//fake delay for loader debugging
sleep(1);

$board = new Board();
//die(var_dump($board));
if ( !array_key_exists("callback",$_GET) ) {
	die(json_encode($board));
}

echo($_GET['callback'] . '(' . json_encode($board) . ')');
