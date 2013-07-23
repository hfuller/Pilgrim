<?php

//Database
//abstracts away the database

class Database {

	private $pdo;

	//put dbconfig.php in app root
	//looks like this:
	//<?php
	//const host = "localhost";
	//const user = "Pilgrim";
	//const pass = "whateverthepasswordis";
	//const name = "Pilgrim";
	require_once("../dbconfig.php");
	
	public function __construct() {
	
		global $app;
	
		try {
			$this->pdo = new PDO('mysql:host=' . Database::host . ';dbname=' . Database::name,
				Database::user, Database::pass,
				array(
					PDO::ATTR_PERSISTENT => true,
					PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
				)
			);
		} catch (Exception $e) {
			die("The database failed to connect for some reason. I'm not going to tell you anything about it, though. Creep.");
		}
		
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
		$query = 'SELECT * FROM games';
		if ( !$all ) $query .= ' WHERE active=1';
		$this->pdo->prepare($query);
		$q->execute();
		return $q->fetchAll(PDO::FETCH_OBJ);
	}
		
}