<?php require_once("pilgrimlib.php");

$db = new Database();

if ( !array_key_exists('login',$_POST) ) { die("But how can you log in... with no login?"); }

$l = $_POST['login'];
$user = $db->getUserFromLogin($l);
if ( !$user ) {						//if there is no user found
	$user = $db->createUserFromLogin($l); 	//then make one
}
if ( !$user ) {							//if there is STILL no user
	die("Couldn't find or create the user...");	//things did not go well. bail
}

//ok well at this point we have a user
$app->setCurrentUser($user);

//and now that user is logged in
header("Location: lobby.php");
//maybe if we're mobile we'll go to landing.php instead

?>