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

function loadingStart(text) {

	//alert("loadingStart");
	
	if ( loadingEl == null ) {
		loadingEl = $('<div id="loading"><div class="hex" id="spinner"></div><div id="loading-text">Loading</div></div>');
		loadingEl.appendTo("body");
	}

	$("#loading").show(250);
	
	if ( typeof text != 'undefined' ) {
		$("#loading-text").text(text);
	}
	
	//and actually kick off the spinner
	loadingInner();
	
}
function loadingInner() {

	$("#spinner").css('-webkit-transform','rotate('+loadDeg+'deg)');
	if ( loadDeg >= 60 ) {
		loadDeg = 0;
	} else {
		loadDeg += 10;
	}

	loadTimer = setTimeout(loadingInner,30);
	
}
function loadingFinish() {

	$("#loading-text").text("Done!");

	clearTimeout(loadTimer);
	//if the browser is getting laggy then the timeout doesn't seem to take the first time. maybe a Chrome only issue
	setTimeout(function() {
		clearTimeout(loadTimer);
	},100);
	
	setTimeout(function() {
		$("#loading").hide(250);
	},1000);
}
