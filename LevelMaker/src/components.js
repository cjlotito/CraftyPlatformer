Crafty.c('Grid', {
	init: function() {
		this.attr({w: Game.map_grid.tile.width, h: Game.map_grid.tile.height})
	},
  
	at: function(x, y) {
		if (x === undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
			return this;
		}
	}
});
	
Crafty.c('Actor', { //Basic Element
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});
	
Crafty.c('Scroll', {
	init: function() {
		player = this; 
		speed = 7;
		keys = {RIGHT_ARROW: 0, LEFT_ARROW: 180};
		this.requires('Actor, Color, Multiway, Collision, Mouse')
			.attr({x: 35, y: 300, w: 35, h: 20, z: 3})
			.color('red')
			.multiway(speed, keys)
			.onHit('Stop', function(object) {
				entity = object[0].obj;
				if (this.x > entity.x) {
					this.x = entity.x + entity.w;
				} else if (this.x < entity.x) {
					this.x = entity.x - this.w;
				}
			});
	},
	playerPause: function(first_entity) {
		if (clicked == false) {
			text = 'Color changed to: ' + playerColor;
			document.getElementById("console").value = text;
			clicked = true;
			this.multiway({});
			//BG
			Crafty.e('Menu').at((first_entity.x/Game.map_grid.tile.width), (4)).bind('KeyDown', function(e){
				if (e.key == Crafty.keys.O) {
					player.color('orange'); playerColor = 'orange';
				} else if (e.key == Crafty.keys.Y) {
					player.color('yellow'); playerColor = 'yellow';
				} else if (e.key == Crafty.keys.G) {
					player.color('green'); playerColor = 'green';
				} else if (e.key == Crafty.keys.B) {
					player.color('blue'); playerColor = 'blue';
				} else if (e.key == Crafty.keys.I) {
					player.color('indigo'); playerColor = 'indigo';
				} else if (e.key == Crafty.keys.V) {
					player.color('violet'); playerColor = 'violet';
				} else if (e.key == Crafty.keys.R) {
					player.color('red'); playerColor = 'red';
				} else if (e.key == Crafty.keys.L) {
					player.color('black'); playerColor = 'black';
				} else if (e.key == Crafty.keys.W) {
					player.color('white'); playerColor = 'white';
				} 

			});
			//RIGHT
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (5)).color('orange').bind('Click', function(){player.color(this.color()); playerColor = 'orange'; background = 'orange';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (7)).color('yellow').bind('Click', function(){player.color(this.color()); playerColor = 'yellow';background = 'yellow';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (9)).color('green').bind('Click', function(){player.color(this.color()); playerColor = 'green';background = 'green';});
			//MIDDLE
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (5)).color('blue').bind('Click', function(){player.color(this.color()); playerColor = 'blue';background = 'blue';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (7)).color('indigo').bind('Click', function(){player.color(this.color()); playerColor = 'indigo';background = 'indigo';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (9)).color('violet').bind('Click', function(){player.color(this.color());  playerColor = 'violet';background = 'violet';});
			//LEFT
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (5)).color('red').bind('Click', function(){player.color(this.color()); playerColor = 'red';background = 'red';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (7)).color('black').bind('Click', function(){player.color(this.color()); playerColor = 'black';background = 'black';});
			Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (9)).color('white').bind('Click', function(){player.color(this.color());  playerColor = 'white';background = 'white';});
		} else if (clicked == true) {
			clicked = false;
			Crafty("Menu").destroy();
			player.multiway(speed, keys);
		}
	},
	
	playerHeightRef: function(first_entity) {
		if (Ref == false) {
			Ref = true;
			ex = (first_entity.x/Game.map_grid.tile.width)
			Crafty.e('Height').at(ex, 0).color('orange');
			Crafty.e('Height').at(ex, 2).color('orange');
			Crafty.e('Height').at(ex, 4).color('orange');
			Crafty.e('Height').at(ex, 6).color('orange');
			Crafty.e('Height').at(ex, 8).color('orange');
			Crafty.e('Height').at(ex, 10).color('orange');
			Crafty.e('Height').at(ex, 12).color('orange');
			Crafty.e('Height').at(ex, 14).color('orange');
		} else if (Ref == true) {
			Ref = false;
			Crafty("Reference").destroy();
		}
	},
});

//Costume/Pause Menu
Crafty.c('Menu', {
	init: function() {
		this.requires('Actor, Color, Menu');
		this.attr({x: 0, y: 0, w: 245, h: 140, z: 1})
			.color('gray');
	}
});

//Click-able Box/Costume
Crafty.c('Icon', {
	init: function() {		
		this.requires('Actor, Menu, Mouse');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10});
	}
});

//Box
Crafty.c('Height', {
	init: function() {		
		this.requires('Actor, Color, Reference');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10});
	}
});
	
//Holder for Pause
Crafty.c('Blank', {
	init: function() {		
		this.requires('Actor, Keyboard');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10});
	}
});
	
Crafty.c('Stop', {
	init: function() {		
		this.requires('Actor, Color, Collision, Mouse')     
			.attr({x: 120, y: 300, w: 35, h: 20})
			.color('gray');
	},
	
	setBackground: function () {
		text = 'SetBackground to: ' + background;
		document.getElementById("console").value = text;
		setBack = "Crafty.background('" + background + "');";
		specialList.push(setBack);
		permBackground = background;
		i = 0;
		while (i < Game.map_grid.height - 1) {
			for (j=0; j < Game.map_grid.width; j++) {
				Crafty.e('Box').color(background).at(j, i).bind('Click', function(e) {
					this.colorChange();
				});
			}
			i++;
		}
	}
});

Crafty.c('TenMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 120, y: 300, w: 35, h: 20})
			.color('blue');
	}
});

Crafty.c('FiveMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 120, y: 300, w: 35, h: 20})
			.color('green');
	}
});

Crafty.c('Box', {
	init: function() {
		this.requires('Actor, Color, Solid, Mouse')
			.color('red')
	},
		
	colorChange: function() {
		spwy = this.x/Game.map_grid.tile.width, spex = this.y/Game.map_grid.tile.height;
		make = sceneList[spex][spwy];
		numbers = make[4].split(',');
		ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
		if (paste) {
			rockClass = setUndo[0], rockColor = setUndo[1], rockName = setUndo[2], rockType = setUndo[3];
			make[0] = rockClass;
			make[1] = rockColor;
			make[2] = rockName;
			make[3] = rockType;
			if (rockColor == 0) rockColor = permBackground;
			this.color(rockColor);
		}
		setUndo = [make[0],make[1],make[2],make[3],make[4]];
		text = 'setUndo = ' + ' blockClass: "' + setUndo[0] + '" blockColor: "' + setUndo[1] + '" rockName: "' + setUndo [2] + '" rockType: "' + setUndo[3] + '" coords: "(' + setUndo[4] + ')"';
		document.getElementById("console").value = text;
		if (clear) {
			this.color('white');
			make[0] = '00', make[1] = 0; make[2] = 0; make[3] = 0;
		} else if (paste) {
		} else {
			if (!colorSwitch) {
				//[blockClass, blockColor, attr1, attr2]
				make[0] = blockClass;
				if (blockClass == 'Door') {
					make[2] = 'Door';
				} else if (blockClass == 'Wall') {
					make[2] = 'WallChange';
				} else if (blockClass == 'Elevator') {
					make[2] = 'Elevator';
				}
				if (invisible) {
					make[1] = 'clear';
				} else {
					make[1] = playerColor;
				}
				make[2] = attr1;
				if (make[2] == 'ColorZone' || make[2] == 'AntiColorZone' || make[2] == 'Key' || make[2] == 'Door') {
					make[3] = playerColor;
				} else if (make[2] =='Elevator' || make[2] == 'ColorChange0' || make[2] == 'ColorChange1' || make[2] == 'Portal' ||  make[2] == 'Pit' || make[2] == 'WallChange') {
					make[3] = Special;
				} else if (make[2] == 'CheckPoint') {
					make[3] = (spwy-2) + ',' + spex;
				} else if (make[2] == 'PopUp' || make[2] == 'Message') {
					specialList.push(Special);
				} else {
					make[3] = attr2;
				}
				//END ATTR1
				document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ')"';
				if (blockClass == 'Door') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2).bind('Click', function(e) {this.colorChange();});
				} else if (blockClass == 'Elevator') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 3).bind('Click', function(e) {this.colorChange();});
					//Over
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 1).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 2).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 3).bind('Click', function(e) {this.colorChange();});
				} else if (blockClass == 'Wall') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 3).bind('Click', function(e) {this.colorChange();});
					Crafty.e('Box').color(playerColor).at(spwy, spex + 4).bind('Click', function(e) {this.colorChange();});
				}else {
					this.color(playerColor);
				}
			} else document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ')"';
		}
	}
});


/////TESTINGGGG
//Click-able Box/Costume
Crafty.c('Test', {
	init: function() {		
		this.requires('Actor, Mouse, Color');      
		this.attr({x: 200, y: 100, w: 35, h: 20, z:10})
			.color('red')
			.bind('MouseDown', this.copy)
			.bind('MouseUp', this.paste);
	},
	
	copy: function(e) {
		spwy = parseInt(e.x/Game.map_grid.tile.width), spex = parseInt(e.y/Game.map_grid.tile.height);
		console.log('Clicked at: ' + spwy + ',' + spex);
		make = sceneList[spex][spwy];
		setUndo = [make[0],make[1],make[2],make[3],make[4]];
	},
	
	paste: function(e) {
		spwy = parseInt(e.x/Game.map_grid.tile.width), spex = parseInt(e.y/Game.map_grid.tile.height);
		console.log('Released at: ' + spwy + ',' + spex);
		make = sceneList[spex][spwy];
		numbers = make[4].split(',');
		ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
		rockClass = setUndo[0], rockColor = setUndo[1], rockName = setUndo[2], rockType = setUndo[3];
		make[0] = rockClass;
		make[1] = rockColor;
		make[2] = rockName;
		make[3] = rockType;
		if (rockColor == 0) rockColor = permBackground;
		Crafty.e('Box').color(rockColor).at(ex, wy).bind('Click', function(e) {this.colorChange();});
	}
});