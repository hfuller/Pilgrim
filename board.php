<?php
require_once("pilgrimlib.php");
$page = new Page("Board");
echo($page->getHeader($page->getTitle()));
?>
<body>

<div id="container">
	<div id="hand">
		<div id="resources">
 			<div id="wood-count" class="card wood">
				<span class="amt"></span>
			</div>   
			<div id="brick-count" class="card brick">
				<span class="amt"></span>
			</div>
			<div id="wheat-count" class="card wheat">
				<span class="amt"></span>
			</div>
			<div id="sheep-count" class="card sheep">
				<span class="amt"></span>
			</div>
			<div id="ore-count" class="card ore">
				<span class="amt"></span>
			</div>
		</div>
		<div id="stats">
			<div id="your-stats" class="stats">
				<div class="stats-container">
					<div class="points stat">
						<div class="icon points-flag"></div>
						<span class="amt">7</span>
					</div>
					<div class="rsrc-cards stat">
						<div class="icon cards"></div>
						<span class="amt">6</span>
					</div>
					<div class="dev-cards stat">
						<div class="icon dev-cards"></div>
						<span class="amt">2</span>
					</div>
					<div class="longest-road stat">
						<div class="icon road"></div>
						<span class="amt">5</span>
					</div>
					<div class="soldier-count stat">
						<div class="icon soldiers"></div>
						<span class="amt">3</span>
					</div>
				</div>
			</div>
			<div id="their-stats">
				<div class="name-container">
					<span class="name">Others' stats:</span>
				</div>
				<div class="stats-menu top-menu">
                    <div class="tooltip-conjunction"></div>
					<div class="stats p2-stats">
						<div class="name-container">
							<span class="name">javakat</span>
						</div>
						<div class="stats-container">
							<div class="points stat">
								<div class="icon points-flag"></div>
								<span class="amt">4</span>
							</div>
							<div class="rsrc-cards stat">
								<div class="icon cards"></div>
								<span class="amt">4</span>
							</div>
							<div class="dev-cards stat">
								<div class="icon dev-cards"></div>
								<span class="amt">2</span>
							</div>
							<div class="longest-road stat">
								<div class="icon road"></div>
								<span class="amt">9</span>
							</div>
							<div class="soldier-count stat">
								<div class="icon soldiers"></div>
								<span class="amt">8</span>
							</div>
						</div>
					</div>
					<div class="stats p3-stats">
						<div class="name-container">
							<span class="name">hfuller</span>
						</div>
						<div class="stats-container">
							<div class="points stat">
								<div class="icon points-flag"></div>
								<span class="amt">3</span>
							</div>
							<div class="rsrc-cards stat">
								<div class="icon cards"></div>
								<span class="amt">5</span>
							</div>
							<div class="dev-cards stat">
								<div class="icon dev-cards"></div>
								<span class="amt">7</span>
							</div>
							<div class="longest-road stat">
								<div class="icon road"></div>
								<span class="amt">11</span>
							</div>
							<div class="soldier-count stat">
								<div class="icon soldiers"></div>
								<span class="amt">6</span>
							</div>
						</div>
					</div>
					<div class="stats p4-stats">
						<div class="name-container">
							<span class="name">heymayday</span>
						</div>
						<div class="stats-container">
							<div class="points stat">
								<div class="icon points-flag"></div>
								<span class="amt">9</span>
							</div>
							<div class="rsrc-cards stat">
								<div class="icon cards"></div>
								<span class="amt">2</span>
							</div>
							<div class="dev-cards stat">
								<div class="icon dev-cards"></div>
								<span class="amt">0</span>
							</div>
							<div class="longest-road stat">
								<div class="icon road"></div>
								<span class="amt">9</span>
							</div>
							<div class="soldier-count stat">
								<div class="icon soldiers"></div>
								<span class="amt">1</span>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		<div id="menu">
			<div id="developments"></div>
			<div id="actions" class="btn">
				<div class="top-bar bar"></div>
				<div class="mid-bar bar"></div>
				<div class="bot-bar bar"></div>
				<div id="actions-menu" class="top-menu">
					<div class="tooltip-conjunction"></div>
					<div id="trade-btn" class="menu-btn btn"></div>	
				</div>
			</div>
		</div>
	</div>
	<div id="board">
	</div>
</div>

</body>
</html>
