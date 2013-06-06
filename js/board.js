ResourcesEnum = {
	DESERT : 0,
	WOOD : 1,
	WOOL : 2,
	WHEAT : 3,
	BRICK : 4,
	ORE : 5,
	WATER : 6
};
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

function renderBoard() {

	loadingStart("Generating board");

    //now usually I don't do this but uh
    $.getJSON('http://pixilic.com/apps/pilgrim/board_debug.php?callback=?')
	.done( function(boardobj) {
	
		loadingStart("Rendering board");
	    
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
		    
		    //add our hex
		    var hexHTML = '<div class="hex ' + resourceNumToString(boardobj.rows[i][j].type);
		    hexHTML += '" data-x="' + i + '" data-y="' + j + '">';
			if(boardobj.rows[i][j].robber){
			hexHTML += '<div class="robber"><div class="robber-middle ' + resourceNumToString(boardobj.rows[i][j].type) + '"><div class="robber-inner"></div></div></div>';
			}
			hexHTML += '</div>';
		    //the reason I use .appendTo() is so the hex var contains the hex element that is created.
		    //if I did eRow.append(hexHTML) then jQuery would attempt to chain it, and eRow would be stored into hex var.
		    var hex = $(hexHTML).appendTo(eRow);
		    
		    //do we need to add a rank?
		    if ( [ 'desert', 'water' ].indexOf( resourceNumToString(boardobj.rows[i][j].type) ) == -1 ) {
			//well, it's not desert or water, so let's add one
			hex.append('<span class="rank">' + boardobj.rows[i][j].rank + '</span>');
		    }
		
			
			
		    
		    //just a demo to add some intersections (if we're not on the bottom row)
		    if ( i < boardobj.rows.length - 1) {
			
			//if we're not on the right edge of the board, we'll add a bottom-right intersection (hence the "right" class)
			if (j < oRow.length - 1) {
			    hex.append('<span class="intersect right ' + 
				       (i%2 == 0 ? 'blue' : 'red') +
				       '" data-a="' + i + '" data-b="' + j + '" data-c="1"></span>');
			}
			
			//and we'll add a bottom intersection for the .
			if(i < 3 || j > 0 && j < oRow.length - 1) {
			    hex.append('<span class="intersect bottom ' + 
				       (i%2 == 0 ? 'blue' : 'red') +
				       '" data-a="' + i + '" data-b="' + j + '" data-c="0"></span>');
			}		
		    }
		    $('.intersect').forEach(function (element, index, array){
			if(element.hasClass('right'){
			    if(index <= (boardobj.rows.length * boardobj.width)/2){
				if(index < boardobj.rows[1].length){
					element.append('<span class="border left" data-endpoint="'
					+ (element.attr('data-x') - 1) 
					+ '-' 
					+ element.attr('data-y') 
					+ '"></span>'
					+ '<span class="border right" data-endpoint="' 
					+ (element.attr('data-x') - 1) 
					+ '-' 
					+ element.attr('data-y') 
					+ '"></span>');
				}
				element.append('<span class="border "')
			    }
			}
		    });
		    
		}
	    }
	    
		setTimeout(loadingFinish,250);
		
	});
}
IntersectPosEnum{
	TOP_LEFT : 0,
	TOP : 1,
	TOP_RIGHT : 2,
	MID_LEFT : 3,
	MID : 4,
	MID_RIGHT : 5,
	BOT_LEFT : 6,
	BOT : 7,
	BOT_RIGHT : 8
};
function generateBorders(intersection, posType){
	var topBorder = '<span class="border border-top"></span>';
	var leftDownBorder = '<span class="border border-down-left"></span>';
	var rightDownBorder = '<span class="border border-down-right"></span>';
	var bottomBorder = '<span class="border border-bottom"></span>';
	var leftUpBorder = '<span class="border border-up-left"></span>';
	var rightUpBorder = '<span class="border border-up-right"></span>';
	if(intersection.hasClass('bottom'){
		switch(type){
			case IntersectPosEnum.TOP_LEFT:
			case IntersectPosEnum.MID_LEFT:
				intersection.append(bottomBorder).append(rightUpBorder);
				break;
			case IntersectPosEnum.TOP_RIGHT:
			case IntersectPosEnum.MID_RIGHT:
				intersection.append(bottomBorder).append(leftUpBorder);
				break;
			case IntersectPosEnum.BOT:
				intersection.append(rightUpBorder).append(leftUpBorder);
				break;
			default:
				intersection.append(bottomBorder).append(rightUpBorder).append(leftUpBorder);
				break;
		}	
	} else if (intersection.hasClass('right') {
		switch(type){
			case IntersectPosEnum.TOP:
				intersection.append(leftDownBorder).append(rightDownBorder);
				break;
			case IntersectPosEnum.
		}
	} else {
		intersection.append('<span class="warning">Something bad happened in generateBorders().</span>');
	}
}

$(document).ready(function() { 
    
	renderBoard();
    
});
