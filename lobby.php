<?php
require_once("pilgrimlib.php");
$page = new Page("Lobby");
echo($page->getHeader($page->getTitle()));
?>

<body>
    
<div class="pure-g-r" style="background: #c48; height: 200px;">
    <div class="pure-u-1-3" style="background: #8c4; height: 90px;">
        <p style="color: #fff;">WHITE TEXT</p>
    </div>
    <div class="pure-u-1-2" style="background: #48c; height: 90px;">
        <p style="color: #fff;">WHITE TEXT</p>
    </div>
</div>
    
</body>