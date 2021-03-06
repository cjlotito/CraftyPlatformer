Crafty.scene('game', function () {
	i = 0;
	while (i < Game.map_grid.height) {
		for (j=0; j < Game.map_grid.width; j++) {
			if (error) {
				Crafty.e('Box').color(background).at(j, i);
			} else {
				Crafty.e('Box').addComponent(background).at(j, i);
			}
		}
		i++;
	}
	
//	i = 0;
//	while (i < sceneList.length) {
//		for (j=0; j < sceneList[i].length; j++) {
//			ex = j, wy = i;
//			make = sceneList[wy][ex];
//			make[4] = wy + ',' + ex;
//		}
//		i++;
//	}
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
	
	//Stops
	Crafty.e('Stop').at(-1,-1);
	Crafty.e('Stop').at(Game.map_grid.width,-1);
	
	Crafty.e('StopUp').at(0,-1);
	Crafty.e('StopUp').at(0,Game.map_grid.height);
	
	//HorzLine
	for (i=0;i<Game.map_grid.height;i++) {
		Crafty.e('HorzLine').at(0,i);
	}
	//VertLine
	for (i=0;i<(Game.map_grid.width+1);i++) {
		Crafty.e('VertLine').at(i,0);
	}
	//FiveMarker
	for (i=5;i<Game.map_grid.width;i+=5) {
		Crafty.e('FiveMarker').at(i,Game.map_grid.height-1);
	}
	//TenMarker
	for (i=10;i<Game.map_grid.width;i+=10) {
		Crafty.e('TenMarker').at(i,Game.map_grid.height-1);
	}
	
	//Crafty.viewport.scale(1.5);
	
});
