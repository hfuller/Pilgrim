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
        echo("<section id=\"" . $game->getId() . "\" class=\"game\">");
            echo("<h1 class=\"title\">" . $game->getName() . "</h1>");
			
			echo('<p>Players: ');
			for ( $i = 1; $i <= $game->getPlayerCount(); $i++ ) {
				echo('<span class="player player-' . $i . '">' . $game->getPlayer($i)->getLogin() . '</span>');
				if ( $i < $game->getPlayerCount() ) echo(',');
				echo(' ');
			}
			echo('</p>');
			
            echo("<p class=\"player-count\">" . $game->getPlayerCount() . "/4 players</p>");
        echo("</section>");
    }
    ?>
</div>
    
</body>