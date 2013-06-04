<?php

//Hex
//defines one hex on a board

class Hex implements JsonSerializable {
	
	const Desert = 0;
	const Wood = 1;
	const Wool = 2;
	const Wheat = 3;
	const Brick = 4;
	const Ore = 5;
	const Water = 6;
	
	private $border = false;
	private $type = Hex::Water;
	private $rank = -1;
	private $robber = false;
	
	public function setBorder($b) {
		$this->border = $b;
	}
	public function isBorder() {
		return $this->border;
	}
	
	public function setType($t) {
		$this->type = $t;
	}
	public function getType() {
		return $this->type;
	}
	
	public function setRank($r) {
		$this->rank = $r;
	}
	
	public function hasRobber(){
		return $this->robber;
	}
	public function setRobber($rob){
		$this->robber = $rob;
	}
	
	public function jsonSerialize() {
		$json = [
			'type' => $this->type,
			'rank' => $this->rank
		];
  
		if($this->robber){
			$json = array_merge($json, ['robber' => $this->robber]);
		}
	
		return $json;
	}
}
	