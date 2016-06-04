ResourcesEnum = {
  DESERT : 0,
  WOOD : 1,
  WOOL : 2,
  WHEAT : 3,
  BRICK : 4,
  ORE : 5,
  WATER : 6
};
function resourceNumToString(resourceNum) {
  switch(resourceNum) {
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


IntersectPosEnum = {
  TOP : 0,
  RIGHT : 1,
  BOTTOM : 2,
  LEFT : 3
};



$(document).ready(function() { 
  renderBoard();
  registerMenuHandlers();
});

// =============================
// SETUP: RENDER BOARD
// =============================

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


      }

    }
    $('.intersect').each(
      function (index){
        $(this).append(generateBorders($(this), index, boardobj));
      }
    );
    renderHand();
    setTimeout(loadingFinish,250);

  });
}

function generateBorders(intersection, index, boardobj){
  var topBorder = '<span class="border border-top"></span>',
      leftDownBorder = '<span class="border border-down-left"></span>',
      rightDownBorder = '<span class="border border-down-right"></span>',
      bottomBorder = '<span class="border border-bottom"></span>',
      leftUpBorder = '<span class="border border-up-left"></span>',
      rightUpBorder = '<span class="border border-up-right"></span>',

      shortestHexRowWidth = (boardobj.width + 1) / 2,
      middleRowIndex = shortestHexRowWidth - 1, //since we're zero-indexing
      orientationMode = (intersection.attr('data-a') < middleRowIndex) ? 0 : 1,

      bordersToAdd = {},
      addedBorders = '';

  //determine which borders we're using
  if(intersection.hasClass('bottom')){
    bordersToAdd = {
      verticalBorder: bottomBorder, 
      leftBorder: leftUpBorder, 
      rightBorder: rightUpBorder
    };
  } else if (intersection.hasClass('right')){
    bordersToAdd = {
      verticalBorder: topBorder,
      leftBorder: leftDownBorder,
      rightBorder: rightDownBorder
    };
  }

  //determine if we need to not add any borders (due to being on the edge of the board, for example)
  //see if we're on the top or bottom row AND our vertical border is pointing out of the map
  //(and remove it as necessary)
  if((intersection.attr('data-a') == 0 || intersection.attr('data-a') == boardobj.rows.length - 2) && intersection.attr('data-c') == (orientationMode == 0 ? 1 : 0)){
    delete bordersToAdd['verticalBorder'];
  }
  //see if we're on the left side AND our left border is pointing out of the map
  //(and remove it as necessary)
  //NOTE: the orientationMode thing fixes mirroring over the middle row
  if(intersection.attr('data-b') == 0 && intersection.attr('data-c') == orientationMode){
    delete bordersToAdd['leftBorder'];
  }
  //see if we're on the right side AND our right border is pointing out of the map
  //(and remove it as necessary)

  //NOTE: this shit is obtuse. basically, the formula for determining whether or not you're at the end of a row is:

  // index -- the index (data-b value) of the end intersection
  // row   -- the row (data-a value) of the row the end intersection is in
  // mRI   -- aka the "middle row index", the row (data-a value) of the middle row

  // index = row + mRI,		for above the middle 
  // index = row + mRI - (2(row - mRI) + 1), 	for below the middle
  // this works (or should, anyway) for all cases of any size of board.
  if(intersection.attr('data-b') == (parseInt(intersection.attr('data-a')) + middleRowIndex - (orientationMode * ((parseInt(intersection.attr('data-a')) - middleRowIndex) * 2 + 1))) && intersection.attr('data-c') == orientationMode){
    delete bordersToAdd['rightBorder'];
  }	
  //actually add the borders
  addedBorders += (bordersToAdd['verticalBorder'] != null) ? bordersToAdd['verticalBorder'] : '';
  addedBorders += (bordersToAdd['leftBorder'] != null) ? bordersToAdd['leftBorder'] : '';
  addedBorders += (bordersToAdd['rightBorder'] != null) ? bordersToAdd['rightBorder'] : '';
  return (addedBorders);
}

function renderHand(){
  $('#wood-count').children('span').text('2');
  $('#brick-count').children('span').text('3');
  $('#wheat-count').children('span').text('0');
  $('#sheep-count').children('span').text('1');
  $('#ore-count').children('span').text('2');
}


/* =============================
 * SETUP: MENU EVENT HANDLERS
 * ============================= */


// PURPOSE: 
// Registers event handlers to menu-like UI controls.
function registerMenuHandlers() {
  $('#actions,#their-stats').on('click', function () {
    // if the menu corresponding to the clicked button is already visible, then toggle every menu off.
    // (more specifically, if this button's first child with class 'top-menu' has an opacity of 1.0, then it is shown, and so toggle every menu off.
    if($($(this).children('.top-menu')[0]).css('opacity') > 0) menuToggle();
    // otherwise, toggle every menu off, and then toggle the menu corresponding to the clicked button on.
    // stopPropagation allows us to click out to exit a menu, but not cause every click on the page to exit a menu -- only ones that are not on a menu button.
    else {
      menuToggle(revealMenu, $(this));
      event.stopPropagation(); 
    }
  });
  // this lets us click out to exit a menu.
  $(document).on('click', function () {
    menuToggle(); 
  });
  $(document).on('keyup', function (e) {
    switch (e.which) {
      case 83: // s
        if($($('#their-stats').children('.top-menu')[0]).css('opacity') > 0) menuToggle();
        else menuToggle(revealMenu, $('#their-stats'));
        break;
      case 65: // a
        if($($('#actions').children('.top-menu')[0]).css('opacity') > 0) menuToggle();
        else menuToggle(revealMenu, $('#actions'));
        break;
      case 27: // esc
        menuToggle();
        break;
      default:
        break;
    }
  });
}

// PURPOSE:
// Toggle proper menus. Hides everything it needs to, then reveals a menu (revealMenu) if proper to do so.
function menuToggle(callback, m){
  var shown_top_menus = $('.top-menu').filter(function (index) {

    return $(this).css('opacity') > 0;
  });
  if(shown_top_menus.length > 0) {
    shown_top_menus.animate(
      { opacity: 0.0 }, 
      300, 
      function () { 
        $('.top-menu').css('display', 'none'); 
        if(typeof(callback) == 'function') 
          callback(m);
      } 
    );
  } else if (typeof(callback) == 'function') callback(m);
}

// PURPOSE:
// Displays a given button's associated menu.
function revealMenu(menu_btn){
  $(menu_btn).children('.top-menu').css('display', 'inline-block');
  $(menu_btn).children('.top-menu').animate({ opacity: 1.0 }, 300, function () { } );
}
