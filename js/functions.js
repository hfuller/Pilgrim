$(document).ready(function() { 

//now usually I don't do this but uh
var boardjson = '{ '
							+ '"width":6, '
							+ '"rows": ['
								+ '[ '
									+ '{"type": "water", "rank": 12},'
									+ '{"type": "water", "rank": 12},'
									+ '{"type": "water", "rank": 12},'
									+ '{"type": "water", "rank": 12}'
								+ '], '
								+ '[ '
									+ '{"type": "water", "rank": 12},'
									+ '{"type": "wood", "rank": 12}, '
									+ '{"type": "wood", "rank": 10}, '
									+ '{"type": "brick", "rank": 4}, '
									+ '{"type": "water", "rank": 12} '
								+ '], '
								+ '[ '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "wheat", "rank": 6}, '
									+ '{"type": "sheep", "rank": 8}, '
									+ '{"type": "sheep", "rank": 4}, '
									+ '{"type": "ore", "rank": 5}, '
									+ '{"type": "water", "rank": 12} '
								+ '], '
								+ '[ '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "wood", "rank": 11}, '
									+ '{"type": "brick", "rank": 2}, '
									+ '{"type": "brick", "rank": 8}, '
									+ '{"type": "wheat", "rank": 6}, '
									+ '{"type": "wheat", "rank": 9}, '
									+ '{"type": "water", "rank": 12}'
								+ '], '
								+ '['
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "sheep", "rank": 11},'
									+ '{"type": "wood", "rank": 5},'
									+ '{"type": "sheep", "rank": 9},'
									+ '{"type": "wood", "rank": 3},'
									+ '{"type": "water", "rank": 12}'
								+ '], '
								+ '[ '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "ore", "rank": 10}, '
									+ '{"type": "ore", "rank": 3}, '
									+ '{"type": "desert", "rank": 12}, '
									+ '{"type": "water", "rank": 12} '
								+ '], '
								+ '[ '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "water", "rank": 12}, '
									+ '{"type": "water", "rank": 12} '
								+ ']'
							+ '] }';
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