<?php
require_once("pilgrimlib.php");
$page = new Page("Lobby");
echo($page->getHeader($page->getTitle()));
$db = new Database();
$games = $db->getGames(true);
?>

<body>
    
<div class="top-bar">
    <input type="text" id="search" placeholder="search for a game" />
    <!-- Put an icon here that is clickable and triggers search properly. -->
</div>
    
<div id="results">
    <!-- This needs to grab a list of database entries and print each one. -->
    <?php 
    foreach($games as $game) {
        echo("<section id=\"" . $game->id . "\" class=\"game\">");
            echo("<h1 class=\"title\">" . $game->name . "</h1>");
            $numPlayers = 0;
            if($game->p1id) { /*echo("<p class=\"player player-1\">" . $db->getUserFromID($game->p1id)->getLogin() . "</p>");*/ $numPlayers = $numPlayers + 1; }
            if($game->p2id) { /*echo("<p class=\"player player4-2\">" . $db->getUserFromID($game->p2id)->getLogin() . "</p>");*/ $numPlayers = $numPlayers + 1; }
            if($game->p3id) { /*echo("<p class=\"player player-3\">" . $db->getUserFromID($game->p3id)->getLogin() . "</p>");*/ $numPlayers = $numPlayers + 1; }
            if($game->p4id) { /*echo("<p class=\"player player-4\">" . $db->getUserFromID($game->p4id)->getLogin() . "</p>");*/ $numPlayers = $numPlayers + 1; }
            echo("<p class=\"player-count\">" . $numPlayers . "/4 players</p>");
        echo("</section>");
    }
    ?>
</div>
    
</body>