$(document).ready(function() { 

	ResourcesEnum = {
		DESERT : 0,
		WOOD : 1,
		WOOL : 2,
		WHEAT : 3,
		BRICK : 4,
		ORE : 5,
		WATER : 6
	}
	function resourceNumToString(resourceNum){
		switch(resourceNum){
			case DESERT:
				return "desert";
			case WOOD:
				return "wood";
			case WOOL:
				return "wool";
			case WHEAT:
				return "wheat";
			case BRICK:
				return "brick";
			case ORE:
				return "ore";
			case WATER:
			default:
				return "water";
		}
	}
	
	var boardobj = $.getJSON('board_debug.php')
	.done( function(boardobj) {
		
		for ( var i = 0; i < boardobj.rows.length; i++ ) {
			
			if ( i%2 == 0 ) {
				var eRow = $('<div class="hex-row even"></div>');
			} else {
				var eRow = $('<div class="hex-row"></div>');
			}
			$("#board").append(eRow);
			
			oRow = boardobj.rows[i];
			for ( var j = 0; j < (boardobj.width-1 - oRow.length)/2; j++ ) {
				eRow.append('<div class="hex padding"></div>');
			}
			for ( var j = 0; j < oRow.length; j++ ) {
				var hexClasses = "hex " + boardobj.rows[i][j].type;
				var rankClasses = "rank " + ((boardobj.rows[i][j].type == "desert" || boardobj.rows[i][j].type == "water") ? "no-show " : "");
				/*var rankDotClasses = "dots " + ((boardobj.rows[i][j].rank == "6" || boardobj.rows[i][j].rank == "8") ? "five-dot" : "")
							   + ((boardobj.rows[i][j].rank == "5" || boardobj.rows[i][j].rank == "9") ? "four-dot" : "")
							   + ((boardobj.rows[i][j].rank == "4" || boardobj.rows[i][j].rank == "10") ? "three-dot" : "")
							   + ((boardobj.rows[i][j].rank == "3" || boardobj.rows[i][j].rank == "11") ? "two-dot" : "")
							   + ((boardobj.rows[i][j].rank == "2" || boardobj.rows[i][j].rank == "12") ? "one-dot" : "");*/
				eRow.append('<div class="' + hexClasses+ '" data-x="' + i + '" data-y="' + j + '"><span class="' + rankClasses + '">' + boardobj.rows[i][j].rank + '</span></div>');
			}
		}
	});
});