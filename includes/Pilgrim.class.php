<?php

//Pilgrim
//functions having to do with sessions, other global stuff

class Pilgrim {
	public function setCurrentUser($user) {
		$_SESSION["valid"] = true;
		$_SESSION["id"] = $user->getId();
		$_SESSION["user"] = $user;		
	}
    
	public function requireAuthenticatedUser() {
		if ( !(array_key_exists("valid",$_SESSION) && $_SESSION["valid"]) ) {
			die(header("Location: ."));
		}
	}

	public function requireUnauthenticatedUser($o) {
		if ( (array_key_exists("valid",$_SESSION) && $_SESSION["valid"]) ) {
			die(header("Location: " . $o));
		}
	}
	
}
