var x = 'x';
var y = 'y';
var xy = 'xy';
var board;

var sceneSet = function(list) {
	for (i=0; i < list.length; i++) {
		for (j=0; j < list[i].length; j++) {
			//[blockClass, blockColor, attr1(name), attr2(type)]
			//Rock(  38,         10,     1,       1,      red,  'RockCover', 'Unlock', 'Right');
			ex = j, wy = i;
			//console.log(wy +',' +ex);
			make = list[wy][ex];
			rockClass = make[0], rockColor = make[1], rockName = make[2], rockType = make[3]; 
			//console.log(rockClass + ' ' + rockColor + ' ' + rockName + ' ' + rockType);
			if (rockClass == "00" || typeof rockClass == 'undefined') continue;
			//COPIED ROCK FUNCTION
			if (rockClass === undefined || rockClass === "") {
				if (rockName === 'Anti') {
					Crafty.e('TinyGround').at(ex + 0.15, wy + 0.7);
					Crafty.e('RockTB').at(ex + 0.15, wy);
					Crafty.e('RockLR').at(ex, wy + 0.13);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('RockCover').at(ex, wy).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (error && localError) {
							if (debug == false) Crafty.e('RockCover').at(ex, wy).color(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						} if (localError) {
							if (debug == false) Crafty.e('RockCover').at(ex, wy).addComponent('D' + rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						} else {
							if (debug == false) Crafty.e('RockCover').at(ex, wy).addComponent(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						}
					}
				} else {
					Crafty.e('TinyGround').at(ex + 0.15, wy);
					Crafty.e('RockTB').at(ex + 0.15, wy + 0.2);
					Crafty.e('RockLR').at(ex, wy + 0.33);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (error && localError) {
							if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
						} if (localError) {
							if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).addComponent('D' + rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});							
						} else {
							if (debug == false) Crafty.e('RockCover').at(ex, wy - 0.05).addComponent(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						}
					}
				}	
			} else if (rockClass === 'ColorCover') {
				if(rockName === 'ColorZone') {
					Crafty.e('TinyGround').at(ex + 0.15, wy);
					Crafty.e('RockTB').at(ex + 0.15, wy + 0.2);
					Crafty.e('RockLR').at(ex, wy + 0.33);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (error && localError) {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
						} if (localError) {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).addComponent('D' + rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						} else {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy - 0.05).addComponent(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						}
					}
				} else if (rockName === 'AntiColorZone') {
					Crafty.e('TinyGround').at(ex + 0.15, wy + 0.7);
					Crafty.e('RockTB').at(ex + 0.15, wy);
					Crafty.e('RockLR').at(ex, wy + 0.13);
					if (rockColor == 'clear') {
						if (debug == false) Crafty.e('ColorCover').at(ex, wy).removeComponent('Color').attr({name: rockName, type: rockType});
					} else {
						if (error && localError) {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy).color(rockColor).attr({name: rockName, type: rockType});
						} if (localError) {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy).addComponent('D' + rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});							
						} else {
							if (debug == false) Crafty.e('ColorCover').at(ex, wy).addComponent(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
						}
					}
				}
			} else if (rockClass == 'back') {
				if (error && localError) {
					Crafty.e('Background').at(ex, wy).color(rockColor);	
				} if (localError) {
					Crafty.e('Background').at(ex, wy).addComponent('D' + rockColor);	
				} else {
					Crafty.e('Background').at(ex, wy).addComponent(rockColor);	
				}
			} else if (rockClass == 'Door') {
				if (rockColor == 'clear') {
					Crafty.e(rockClass).at(ex, wy - 0.05).removeComponent('Color').attr({h:tileH*3, w: tileW, name: rockName, type: rockType});
				} else {
					if (error && localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					} if (localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent('D' + rockColor).attr({h:tileH*3, w: tileW, name: rockName, type: rockType});
					} else {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent(rockColor).attr({h:tileH*3, w: tileW, name: rockName, type: rockType});
					}
				}
			} else if (rockClass == 'Elevator') {
				if (rockColor == 'clear') {
					Crafty.e(rockClass).at(ex, wy - 0.05).removeComponent('Color').attr({w: tileW*2, h:tileH*4, name: rockName, type: rockType});
				} else {
					if (error && localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					} if (localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent('D' + rockColor).attr({w: tileW*2, h:tileH*4, name: rockName, type: rockType});
					} else {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent(rockColor).attr({w: tileW*2, h:tileH*4, name: rockName, type: rockType});
					}
				}
			} else if (rockClass == 'Wall') {
				if (rockColor == 'clear') {
					Crafty.e(rockClass).at(ex, wy - 0.05).removeComponent('Color').attr({h:tileH*5, w: tileW, name: rockName, type: rockType});
				} else {
					if (error && localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					} if (localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent('D' + rockColor).attr({h:tileH*5, w: tileW, name: rockName, type: rockType});	
					} else {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent(rockColor).attr({h:tileH*5, w: tileW, name: rockName, type: rockType});
					}
				}
			} else {
				if (rockColor == 'clear') {
					Crafty.e(rockClass).at(ex, wy - 0.05).removeComponent('Color').attr({name: rockName, type: rockType});
				} else {
					if (error && localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).color(rockColor).attr({name: rockName, type: rockType});
					} if (localError) {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent('D' + rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
					} else {
						Crafty.e(rockClass).at(ex, wy - 0.05).addComponent(rockColor).attr({w: tileW, h: tileH, name: rockName, type: rockType});
					}
				}
			}
			//END COPY
		}
	}
	//console.log('scene set done');
};

Crafty.scene('Onward', function(toPrint) {
	start();
	Crafty.e('RockCover').attr({x:0, y:100, w:800, h:100}).color('black');
	if (wipe() == 0) Message(130, 135, 400, 3, toPrint[0], '#FF0000', toPrint[1]);
	if (wipe() == 1) Message(130, 135, 400, 3, Welcome(), '#FF0000', 10000);
	if (wipe() == 0) {
		this.start_game = function() {
			trans++;
			Crafty.scene('Onward');
		}
	} else {
		this.start_game = function() {
			trans = 0;
			if (startPoint == -1) {
				Crafty.scene('LevelTest');	
			} else {
				Crafty.scene('Loader');
			}
		}
	}
	
	//Tile Sprite Test
	//Crafty.e('RockCover').at(1, 1).color('red').addComponent('gray');
	
	//Start Button
	var pauseBtn = Crafty.e('Blank').at(0, 0).bind('KeyDown', this.start_game);
});

Crafty.scene('LevelTest', function() {
	fresh = true;
	listX = specialSceneList.length-1, listY = specialSceneList[0].length;
	numbers = specialSceneList[listX][listY][3].split(','), ex = numbers[0], wy = numbers[1];
	checkPoint[0] = ex, checkPoint[1] = wy;
	
	if (debug) {
		//HorzLine
		for (i=0;i<Game.map_grid.height;i++) {
			Crafty.e('HorzLine').at(0,i);
		}
		//VertLine
		for (i=0;i<(Game.map_grid.width+1);i++) {
			Crafty.e('VertLine').at(i,0);
		}
	}	
	
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	//FALLUPFIX
	player.bind("CheckLanding", function(ground) {
		//console.log(ground);
		if (ground.ID == 'ground') { // allow landing, if player's feet are not above ground
			player.canLand = true;
		}
	});
	//END FIX	
	
	sceneSet(specialSceneList);
	console.log('Player Start point is: ' + checkPoint[0] + ',' + checkPoint[1]);
	player.at(checkPoint[0], checkPoint[1]);
	
});

Crafty.scene('Loader', function() {
	currentSceneList = Game.copyArr(myLevels[startPoint-1]);
	listX = currentSceneList.length-1, listY = currentSceneList[0].length;
	swatchNumbers = currentSceneList[listX][listY][5]
	//console.log(swatchNumbers)
	Game.swatchSetter(swatchNumbers);
});
	
Crafty.scene('Level', function() {
	if (fresh) {
		//currentSceneList = Game.copyArr(sceneList1);
		
		currentSceneList = Game.copyArr(myLevels[startPoint-1]);
		
		//currentSceneList = myLevels.slice(startPoint-1,startPoint)[0];
		//console.log("After: " + currentSceneList);
		numbers = currentSceneList[currentSceneList.length-1][currentSceneList[0].length][3].split(','), ex = numbers[0], wy = numbers[1];
		checkPoint[0] = ex, checkPoint[1] = wy;
		fresh = false;
	}

	listX = currentSceneList.length-1, listY = currentSceneList[0].length;
	//tilesize-Set
	tileNumbers = currentSceneList[listX][listY][2].split(','), tileW = parseInt(tileNumbers[0]), tileH = parseInt(tileNumbers[1]);
	Game.map_grid.tile.width = tileW, Game.map_grid.tile.height = tileH;
	//gridsize-Set
	gridNumbers = currentSceneList[listX][listY][1].split(','), gridW = parseInt(gridNumbers[0]), gridH = parseInt(gridNumbers[1]);
	Game.map_grid.width = gridW, Game.map_grid.height = gridH;
	
	console.log('Tiles: ' + tileW + ', ' + tileH);
	console.log('Grid: ' + gridW + ', ' + gridH);
	
	//Player
	var player = Crafty.e('Guy');
	start();
	Crafty.viewport.follow(player, -100, 100);
	
	if(debug) {
		//HorzLine
		for (i=0;i<Game.map_grid.height;i++) {
			Crafty.e('HorzLine').at(0,i);
		}
		//VertLine
		for (i=0;i<(Game.map_grid.width+1);i++) {
			Crafty.e('VertLine').at(i,0);
		}
	}
	

	

	sceneSet(currentSceneList);
	player.at(checkPoint[0], checkPoint[1]);
	
	//FALLUPFIX
	player.bind("CheckLanding", function(ground) {
		//console.log(ground);
		if (ground.ID == 'ground') { // allow landing, if player's feet are not above ground
			player.canLand = true;
		}
	});
	//END FIX
});
