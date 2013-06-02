$(document).ready(function() { 

//now usually I don't do this but uh
var boardjson = '{ "width":6, "rows": [ [ {"type": "water"}, {"type": "water"}, {"type": "water"}, {"type": "water"} ], [ {"type": "water"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "water"} ], [ {"type": "water"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "water"} ], [ {"type": "water"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "water"} ], [ {"type": "water"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "water"} ], [ {"type": "water"}, {"type": "wood"}, {"type": "wood"}, {"type": "wood"}, {"type": "water"} ], [ {"type": "water"}, {"type": "water"}, {"type": "water"}, {"type": "water"} ] ] }';
//go head and break 'em off with a little preview of the remix
var boardobj = eval('(' + boardjson + ')');

//$("#board").append('<div class="hex-row"><div class="hex"></div></div>');

for ( var i = 0; i < boardobj.rows.length; i++ ) {
	
	if ( i%2 == 0 ) {
		var eRow = $('<div class="hex-row even"></div>');
	} else {
		var eRow = $('<div class="hex-row"></div>');
	}
	$("#board").append(eRow);
	
	oRow = boardobj.rows[i];
	for ( var j = 0; j < (boardobj.width-oRow.length)/2; j++ ) {
		eRow.append('<div class="hex padding"></div>');
	}
	for ( var j = 0; j < oRow.length; j++ ) {
		eRow.append('<div class="hex"></div>');
	}
	
}

});