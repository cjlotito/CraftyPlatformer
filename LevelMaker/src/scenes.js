Crafty.scene('game', function () {
	i = 0;
	while (i < Game.map_grid.height) {
		for (j=0; j < Game.map_grid.width; j++) {
			Crafty.e('Box').color(background).at(j, i).bind('Click', function(e) {this.colorChange();});
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
	var player = Crafty.e('Scroll').bind('Click', function() {playerColor = 'clear';console.log(playerColor);});
	start();
	Crafty.viewport.follow(player, 0, 0);
	
	//PAUSE BUTTON
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', function(e) {
		if(e.key == pauseKey) {
			player.playerPause(player);
		} else if(e.key == Crafty.keys.ADD) {
			player.playerHeightRef(player);
		}
	});
	
	Crafty.e('Stop').at(0,15).bind('Click', function(){this.setBackground();});
	Crafty.e('FiveMarker').at(5,15);
	Crafty.e('TenMarker').at(10,15);
	Crafty.e('FiveMarker').at(15,15);
	Crafty.e('TenMarker').at(20,15);
	Crafty.e('FiveMarker').at(25,15);
	Crafty.e('TenMarker').at(30,15);
	Crafty.e('FiveMarker').at(35,15);
	Crafty.e('TenMarker').at(40,15);
	Crafty.e('FiveMarker').at(45,15);
	Crafty.e('TenMarker').at(50,15);
	Crafty.e('FiveMarker').at(55,15);
	Crafty.e('TenMarker').at(60,15);
	Crafty.e('FiveMarker').at(65,15);
	Crafty.e('TenMarker').at(70,15);
	Crafty.e('FiveMarker').at(75,15);
	Crafty.e('TenMarker').at(80,15);
	Crafty.e('FiveMarker').at(85,15);
	Crafty.e('TenMarker').at(90,15);
	Crafty.e('FiveMarker').at(95,15);
	Crafty.e('Stop').at(99, 15);
	
	////TESTING
	Crafty.e('Test').at(5,5);
});