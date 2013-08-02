$(function () {
    $('.icon.icon-start,#start').click(function () {
        window.location = 'board.php';
    });
    $('.icon.icon-continue,#continue').on('click', function () {
        window.location = 'board.php';
    });
    $('.icon.icon-join,#join').on('click', function () {
        window.location = 'lobby.php';
    });
});
