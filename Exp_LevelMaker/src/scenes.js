Crafty.scene('game', function () {
	i = 0;
	while (i < Game.map_grid.height) {
		for (j=0; j < Game.map_grid.width; j++) {
			Crafty.e('Box').color(background).at(j, i);
		}
		i++;
	}
	
	i = 0;
	while (i < sceneList.length) {
		for (j=0; j < sceneList[i].length; j++) {
			ex = j, wy = i;
			make = sceneList[wy][ex];
			make[4] = wy + ',' + ex;
		}
		i++;
	}
	//Player
	var player = Crafty.e('Scroll').bind('KeyDown', function(e) {
		if(e.key == Crafty.keys.SPACE) {
			console.log(player.direction);
			if(player.direction == 'left') {
				player.multiway(7, {UP_ARROW: -90, DOWN_ARROW: 90});
				player.direction = 'up';
			} else if(player.direction == 'up') {
				player.multiway(7, {RIGHT_ARROW: 0, LEFT_ARROW: 180});
				player.direction = 'left';
			}
		}
	});
	start();
	Crafty.viewport.follow(player, 0, 0);
	
	//PAUSE BUTTON
	//var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		//if(e.key == pauseKey) {
			//player.playerPause(player);
		//} else if(e.key == Crafty.keys.ADD) {
			//player.playerHeightRef(player);
		//}
	//});
	
	
	
	//Stops
	Crafty.e('Stop').at(0,15);
	Crafty.e('Stop').at(99,15);
	
	Crafty.e('StopUp').at(0,0);
	Crafty.e('StopUp').at(0,15);
	
	//HorzLine
	for (i=0;i<16;i++) {
		Crafty.e('HorzLine').at(0,i);
	}
	//VertLine
	for (i=0;i<101;i++) {
		Crafty.e('VertLine').at(i,0);
	}
	//FiveMarker
	for (i=5;i<100;i+=5) {
		Crafty.e('FiveMarker').at(i,15);
	}
	//TenMarker
	for (i=10;i<100;i+=10) {
		Crafty.e('TenMarker').at(i,15);
	}
	
	//Crafty.viewport.scale(1.5);
	
});
