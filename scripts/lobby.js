// ===== ON READY =====

$(function () {
    
    // ===== EVENT BINDINGS =====
    
    $('input#search').on('keyup', function () {
        $('section.game').filter(function () {
            $(this).css('display', 'block');
            return $(this).children('h1')[0].innerText.toLowerCase().indexOf($('input#search').val().toLowerCase()) == -1;
        }).css('display', 'none');
    });
    
    $('section.game').on('click', function () {
        //needs more work. should probably give some confirmation first.
        window.location = "games/" + $(this).attr('id');
    });
});