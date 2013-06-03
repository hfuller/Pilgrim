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
	case ResourcesEnum.DESERT:
	    return "desert";
	case ResourcesEnum.WOOD:
	    return "wood";
	case ResourcesEnum.WOOL:
	    return "wool";
	case ResourcesEnum.WHEAT:
	    return "wheat";
	case ResourcesEnum.BRICK:
	    return "brick";
	case ResourcesEnum.ORE:
	    return "ore";
	case ResourcesEnum.WATER:
	default:
	    return "water";
	}
    }
    //now usually I don't do this but uh
    $.getJSON('http://pixilic.com/apps/pilgrim/board_debug.php?callback=?')
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
		    var hexClasses = "hex " + resourceNumToString(boardobj.rows[i][j].type);
		    var rankClasses = "rank " + ((resourceNumToString(boardobj.rows[i][j].type) == "desert" || resourceNumToString(boardobj.rows[i][j].type) == "water") ? "no-show " : "");
			//add our hex
		    eRow.append('<div class="' + hexClasses+ '" data-x="' + i + '" data-y="' + j + '">'
									//add the rank of the hex (e.g. the number the roll of the dice will relate to)
									+ '<span class="' + rankClasses + '">' + boardobj.rows[i][j].rank + '</span>' 
									//then, if we're not on the bottom row, we'll add intersections
									+ ((i < boardobj.rows.length - 1) ? 
											(
												//if we're not on the right edge of the board, we'll add a bottom-right intersection (hence the "right" class)
												(j < oRow.length - 1) ?
													'<span class="intersect right ' + 
														(i%2 == 0 ?
															'blue'
															: 
															'red'
														) 
													+ '" data-a="' + i + '" data-b="' + j + '" data-c="1"></span>' 
												: 
												''
											) 
											//and either way, we'll add a bottom intersection.
											+ '<span class="intersect bottom ' + 
												(i%2 == 0 ?
												'blue' 
												: 
												'red'
												) 
											+ '" data-a="' + i + '" data-b="' + j + '" data-c="0"></span>' : '') 
							+ '</div>');

		}
	    }
	    
	});
    
});