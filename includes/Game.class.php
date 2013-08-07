<?php

class Game {
	
	private $id, $name, $timestamp, $p1id, $p2id, $p3id, $p4id, $active;
	
	public function getId() {
		return $this->id;
	}
	public function getName() {
		return $this->name;
	}
	public function getPlayerCount() {
		$count = 0;
		for ( $i = 1; $i <= 4; $i++ ) {
			if ( $this->getPlayer($i) != NULL ) $count++;
		}
		return $count;
	}
	public function getPlayer($num) {
		global $db;
		$x = 'p' . $num . 'id';
		return $db->getUserFromID($this->$x);
		// $this->$x is a "variable variable" - it will resolve to something like $this->p1id
		// no I am not kidding, duckduckgo "!php variable variables" if you don't believe me
	}
    
}