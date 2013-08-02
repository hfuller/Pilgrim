<?php
require_once("pilgrimlib.php");
$page = new Page("Lobby");
echo($page->getHeader($page->getTitle()));
?>

<body>
    
<div class="top-bar">
    <input type="text" id="search" placeholder="search for a game" />
</div>
    
<div class="results">
    
</div>
    
</body>