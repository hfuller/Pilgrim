<?php

//Database
//abstracts away the database

class Database {

	private $pdo;
	
	const host = "";
	const user = "";
	const pass = "";
	const name = "";

	public function __construct() {
	
		global $app;
		
		//put DatabaseInfo.class.php in includes/
		//looks like this:
		//<?php
		//class DatabaseInfo {
		//	const host = "localhost";
		//	const user = "Pilgrim";
		//	const pass = "whateverthepasswordis";
		//	const name = "Pilgrim";
		//}
		
		try {
			$this->pdo = new PDO('mysql:host=' . DatabaseInfo::host . ';dbname=' . DatabaseInfo::name,
				DatabaseInfo::user, DatabaseInfo::pass,
				array(
					PDO::ATTR_PERSISTENT => true,
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
				)
			);
		} catch (Exception $e) {
			die("The database failed to connect for some reason. I'm not going to tell you anything about it, though. Creep.");
		}
		
	}
	
    public function getUserFromID($id) {
        $q = $this->pdo->prepare('SELECT * FROM users WHERE id = ?');
		$q->bindParam(1,$id);
		$q->execute();
		return $q->fetchObject("User");  
    }
    
	public function getUserFromLogin($login) {
		$q = $this->pdo->prepare('SELECT * FROM users WHERE login = ?');
		$q->bindParam(1,$login);
		$q->execute();
		return $q->fetchObject("User");
	}
	
	public function createUserFromLogin($login) {
		$q = $this->pdo->prepare('INSERT INTO users(login) VALUES (?)');
		$q->bindParam(1,$login);
		$q->execute();
		return $this->getUserFromLogin($login);
	}
	
	public function getGames($all) {
		$q = 'SELECT * FROM games';
		if ( !$all ) $q .= ' WHERE active=1';
		$q = $this->pdo->prepare($q);
		$q->execute();
		return $q->fetchAll(PDO::FETCH_OBJ);
	}
		
}