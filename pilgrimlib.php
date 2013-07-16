<?php

//complain loudly about errors
error_reporting(-1); ini_set("display_errors","TRUE");

//automatically include undefined objects 
spl_autoload_register(function ($class) {
    require_once 'includes/' . $class . '.class.php';
});

$app = new Pilgrim();
