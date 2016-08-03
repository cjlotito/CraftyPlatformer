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
		clicked = false;
		speed = 7;
		keys = {RIGHT_ARROW: 0, LEFT_ARROW: 180};
		this.requires('Actor, Color, Multiway, Collision, Mouse')
			.attr({x: 35, y: 300, w: Game.tileW, h: Game.tileH, z: 3})
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
			//text = 'Color changed to: ' + playerColor;
			//document.getElementById("console").value = text;
			if (erase) {
			} else {
				clicked = true;
				this.multiway({});
				//BG
				Crafty.e('Menu').at((first_entity.x/Game.map_grid.tile.width), (4)).bind('KeyDown', function(e){
					if (e.key == Crafty.keys.O) {
						player.color('orange'); playerColor = 'orange'; tempColor = 'orange';
					} else if (e.key == Crafty.keys.Y) {
						player.color('yellow'); playerColor = 'yellow'; tempColor = 'yellow';
					} else if (e.key == Crafty.keys.G) {
						player.color('green'); playerColor = 'green'; tempColor = 'green';
					} else if (e.key == Crafty.keys.B) {
						player.color('blue'); playerColor = 'blue'; tempColor = 'blue';
					} else if (e.key == Crafty.keys.I) {
						player.color('indigo'); playerColor = 'indigo'; tempColor = 'indigo';
					} else if (e.key == Crafty.keys.V) {
						player.color('violet'); playerColor = 'violet'; tempColor = 'violet';
					} else if (e.key == Crafty.keys.R) {
						player.color('red'); playerColor = 'red'; tempColor = 'red';
					} else if (e.key == Crafty.keys.L) {
						player.color('black'); playerColor = 'black'; tempColor = 'black';
					} else if (e.key == Crafty.keys.W) {
						player.color('white'); playerColor = 'white'; tempColor = 'white';
					} 

				});
				//RIGHT
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (5)).color('orange').bind('Click', function(){player.color(this.color()); playerColor = 'orange'; tempColor = 'orange'; background = 'orange';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (7)).color('yellow').bind('Click', function(){player.color(this.color()); playerColor = 'yellow'; tempColor = 'yellow'; background = 'yellow';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 1, (9)).color('green').bind('Click', function(){player.color(this.color()); playerColor = 'green'; tempColor = 'green'; background = 'green';});
				//MIDDLE
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (5)).color('blue').bind('Click', function(){player.color(this.color()); playerColor = 'blue'; tempColor = 'blue'; background = 'blue';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (7)).color('indigo').bind('Click', function(){player.color(this.color()); playerColor = 'indigo'; tempColor = 'indigo'; background = 'indigo';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 3, (9)).color('violet').bind('Click', function(){player.color(this.color());  playerColor = 'violet'; tempColor = 'violet'; background = 'violet';});
				//LEFT
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (5)).color('red').bind('Click', function(){player.color(this.color()); playerColor = 'red'; tempColor = 'red'; background = 'red';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (7)).color('black').bind('Click', function(){player.color(this.color()); playerColor = 'black'; tempColor = 'black'; background = 'black';});
				Crafty.e('Icon').at((first_entity.x/Game.map_grid.tile.width) + 5, (9)).color('white').bind('Click', function(){player.color(this.color());  playerColor = 'white'; tempColor = 'white'; background = 'white';});
			}
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

//Click-able Costume
Crafty.c('Icon', {
	init: function() {		
		this.requires('Actor, Menu, Mouse');      
		this.attr({x: 200, y: 100, w: Game.tileW, h: Game.tileH, z:10});
	}
});

//Gauge Height
Crafty.c('Height', {
	init: function() {		
		this.requires('Actor, Color, Reference');      
		this.attr({x: 200, y: 100, w: 0, h: 0, z:10});
	}
});
	
//Holder for Pause
Crafty.c('Blank', {
	init: function() {		
		this.requires('Actor, Keyboard');      
		this.attr({x: 200, y: 100, w: 0, h: 0, z:10});
	}
});
	
Crafty.c('Stop', {
	init: function() {		
		this.requires('Actor, Color, Collision, Mouse')     
			.attr({x: 120, y: 300, w: Game.tileW, h: Game.tileH})
			.color('gray');
	}
});

Crafty.c('TenMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 120, y: 300, w: Game.tileW, h: Game.tileH})
			.color('blue');
	}
});

Crafty.c('FiveMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 120, y: 300, w: Game.tileW, h: Game.tileH})
			.color('green');
	}
});

Crafty.c('HorzLine', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 0, y: 0, w: 3500, h: 2, z:10, alpha:0.3})
			.color('black');
	}
});

Crafty.c('VertLine', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 0, y: 0, w: 2, h: 3500, z:10, alpha:0.3})
			.color('black');
	}
});

//Click-able
Crafty.c('Box', {
	init: function() {
		this.requires('Actor, Mouse, Color, Solid, Keyboard')
			.color('red')
			.bind('MouseDown', function(e) {
				hold = false;
				if (attr1 == 'Door' || attr1 == 'WallChange' || attr1 == 'Elevator' || colorSwitch || paste || clear) {
					!hold;
				} else {
					//Undo
						spex = this.x/Game.map_grid.tile.width, spwy = this.y/Game.map_grid.tile.height;
						//console.log(spex +',' + spwy);
						//console.log(this);
						make = sceneList[spwy][spex];
						//console.log('Undo make: ' + make);
						numbers = make[4].split(',');
						ex = numbers[1], wy = numbers[0];
						exx = ex.toString(), wyy = wy.toString();
						coords = exx+','+wyy;
						//console.log(make);
						setUndo = [make[0],make[1],make[2],make[3],coords];
						text = 'setUndo = ' + ' blockClass: "' + setUndo[0] + '" blockColor: "' + setUndo[1] + '" rockName: "' + setUndo [2] + '" rockType: "' + setUndo[3] + '" coords: "(' + setUndo[4] + ')"';
						document.getElementById("console").value = text;
					//Clear Timer
					clearTimeout(this.downTimer);
					//Start Timer
					this.downTimer = setTimeout(function() {
						hold = true;
					}, 200);
				}
			})
			.bind('MouseUp', function(e) {
				bexx = this.x/Game.map_grid.tile.width, bwyy = this.y/Game.map_grid.tile.height;
				extraRelease[0] = bexx, extraRelease[1] = bwyy;
				if (hold) { 
					hold = false;
					Game.process(bexx, bwyy);
				} else {
					this.colorChange();
				}
				clearTimeout(this.downTimer);
			});
	},
	
	colorChange: function(e) {
		spwy = this.x/Game.map_grid.tile.width, spex = this.y/Game.map_grid.tile.height;
		make = sceneList[spex][spwy];
		numbers = make[4].split(',');
		ex = parseInt(numbers[0]), wy = parseInt(numbers[1]);
		if (setStart) {
			//console.log('Set STart!');
			this.color(playerColor);
			make = sceneList[14][100];
			oMCoords = make[3].split(',');
			oMex = oMCoords[0], oMwy = oMCoords[1];
			//console.log('Previous start: ' + oMex + ',' + oMwy);
			otherMake = sceneList[oMex][oMwy]
			//console.log(otherMake);
			otherMake[0] = '00', otherMake[1] = 0; otherMake[2] = 0; otherMake[3] = 0;
			Crafty.e('Box').color(permBackground).at(oMex, oMwy);
			make[0] = '00', make[1] = 0; make[2] = 0; make[3] = spwy + ',' + spex;
			console.log('New Start set to: ' + make[3]);
			document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Real (' + this.x + ', ' + this.y + ')"';		} else if (clear) {
			this.color(permBackground);
			make[0] = '00', make[1] = 0; make[2] = 0; make[3] = 0;
			document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Real (' + this.x + ', ' + this.y + ')"';		} else {
			if (!colorSwitch) {
				//[blockClass, blockColor, attr1, attr2]
				make[0] = blockClass;
				if (blockClass == 'Door') {
					make[2] = 'Door';
				} else if (blockClass == 'Wall') {
					make[2] = 'WallChange';
				} else if (blockClass == 'Elevator') {
					make[2] = 'Elevator';
				} else if (blockClass == 'Eraser Tool') {
					make[1] = permBackground;
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
				document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Real (' + this.x + ', ' + this.y + ')"';				if (blockClass == 'Door') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
				} else if (blockClass == 'Elevator') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 3);
					//Over
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex);
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 1);
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 2);
					Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 3);
				} else if (blockClass == 'Wall') {
					this.color(playerColor);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 3);
					Crafty.e('Box').color(playerColor).at(spwy, spex + 4);
				}else {
					this.color(playerColor);
				}
			} else document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Real (' + this.x + ', ' + this.y + ')"';
		}
	}
});
