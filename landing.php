<?php
require_once("pilgrimlib.php");
$page = new Page("Landing");
echo($page->getHeader($page->getTitle()));
?>

<body>
    <div class="pure-g-r">
        <div id="start" class="pure-u-1-3">
            <a class="icon icon-start"></a>
        </div>
        <div id="continue" class="pure-u-1-3">
            <div class="icon icon-continue"> </div>
        </div>
        <div id="join" class="pure-u-1-3">
            <div class="icon icon-join"> </div>
        </div>
    </div>
    <div class="pure-g-r">
        <div class="pure-u-1-3">
            <p class="desc">start anew</p>
        </div>
        <div class="pure-u-1-3">
            <p class="desc">continue</p>
        </div>
        <div class="pure-u-1-3">
            <p class="desc">join</p>
        </div>
    </div>
</body>