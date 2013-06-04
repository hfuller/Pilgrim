/*
var rotation = function (x){
	$(x).rotate({
		angle:0, 
		animateTo:360, 
		callback: rotation,
		easing: function (x,t,b,c,d){        // t: current time, b: begInnIng value, c: change In value, d: duration
		  return c*(t/d)+b;
		}
	});
};
*/

/*
function rotate(x) {
	$(x).animate({ opacity:0 }, {
		step: function(now,fx) {
		  $(this).css('-webkit-transform','rotate('+now+'deg)'); 
		},
		duration:'slow',
		complete: function() {
			$(this).css('opacity','60');
			rotate(this);
		}
	},'linear');
}
*/

//loading stuff
var loadDeg = 0; var loadTimer = null; var loadingEl = null;
function loading(text) {
	
	if ( loadingEl == null ) {
		loadingEl = $('<div id="loading"><div class="hex" id="spinner"></div><div id="loading-text">Loading</div></div>');
		loadingEl.appendTo("body");
	}

	$("#loading").show(250);
	
	if ( typeof text != 'undefined' ) {
		$("#loading-text").text(text);
	}
	
	$("#spinner").css('-webkit-transform','rotate('+loadDeg+'deg)');
	if ( loadDeg >= 60 ) {
		loadDeg = 0;
	} else {
		loadDeg += 10;
	}

	loadTimer = setTimeout(loading,30);

}
function doneLoading() {
	clearTimeout(loadTimer);
	loadTimer = null;
	
	$("#loading").hide(250);
}
