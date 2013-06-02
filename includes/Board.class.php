<?php

//Board
//defines a board. can have children to represent other game types.

class Board implements JsonSerializable {

	private $RANKS	= array(2,3,3,4,4,5,5,6,6,8,8,9,9,10,10,11,11,12);
	private $TYPES	= array(Hex::Wood, Hex::Wood, Hex::Wood, Hex::Wood, 
								Hex::Wool, Hex::Wool, Hex::Wool, Hex::Wool, 
								Hex::Wheat, Hex::Wheat, Hex::Wheat, Hex::Wheat, 
								Hex::Brick, Hex::Brick, Hex::Brick, 
								Hex::Ore, Hex::Ore, Hex::Ore, 
								Hex::Desert);
	const Size = 7;				//cross section of board at widest point
	private $hexes;
	
	public function __construct() {
		$this->generate();
	}
	private function generate() {
	
		$side	= ceil(Board::Size/2);	//size of one side
	
		//first we are gonna make an array full of dicks
		$crs = $side; //current row size. row 0 should be as big as one side
		$halfwaydone = false;
		$this->hexes = array();
		for ( $cr = 0; $cr < Board::Size; $cr++ ) {
			$r = array();
			
			//fill up this row of size $crs
			for ( $cc = 0; $cc < $crs; $cc++ ) {
				$hex = new Hex();
				if ( ($cc == 0 or $cc == ($crs-1)) or ($cr == 0 or $cr == Board::Size-1) ) {
					//if we are on the left side, right side, top, or bottom
					$hex->setBorder(true);
				}
				array_push($r,$hex);
			}
			//we just finished a row, so
			if ( $crs >= Board::Size ) { //if we just finished the middle row
				$halfwaydone = true;
			}
			if ( !$halfwaydone ) { //if we are still above the middle row
				$crs++; //then we need the next row to be bigger
			} else { //else we need it to be smaller
				$crs--;
			}
			
			//done with the row.
			array_push($this->hexes,$r);
		}
		
		//now we assign types and stuff
		
		$rs = $this->RANKS; $ts = $this->TYPES;
		shuffle($rs) and shuffle($ts) or die("Failed to shuffle stuff");
		
		$rsi = 0; //ranks index
		$tsi = 0; //types index
		
		foreach ( $this->hexes as $r ) {
			foreach ( $r as $hex ) {
				if ( $hex->isBorder() ) {
					$hex->setType(Hex::Water);
				} else {
					$hex->setType($ts[$tsi]);
					$tsi++;
					if ( $hex->getType() != Hex::Desert ) {
						$hex->setRank($rs[$rsi]);
						$rsi++;
					}
				}
			}
		}
		
		//lol whoops
		return $this->hexes;
	}
	
	public function getHexes() {
		return $this->hexes;
	}
	
	
	public function jsonSerialize() {
		return [
			'width' => Board::Size,
			'rows' => $this->hexes
		];
	}
	
}