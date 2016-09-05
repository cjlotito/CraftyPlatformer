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
			.attr({x: 35, y: 300, w: tileW, h: tileH, z: 3, direction: 'left'})
			.color('red')
			.multiway(speed, keys)
			.onHit('Stop', function(object) {
				entity = object[0].obj;
				if (this.x > entity.x) {
					this.x = entity.x + entity.w;
				} else if (this.x < entity.x) {
					this.x = entity.x - this.w;
				}
			})
			.onHit('StopUp', function(object) {
				entity = object[0].obj;
				if (this.y > entity.y) {
					//alert("Hit the Bottom " + entity.y);
					this.y = entity.y + entity.h;
				} else if (this.y < entity.y) {
					//alert("Hit the Top " + entity.y);
					this.y = entity.y - this.h;
				}
        		 });
	}
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
		this.attr({x: 200, y: 100, w: tileW, h: tileH, z:10});
	}
});

//Gauge Height
Crafty.c('Height', {
	init: function() {		
		this.requires('Actor, Color, Reference');      
		this.attr({x: 200, y: 100, w: tileW, h: tileH, z:10});
	}
});
	
//Holder for Pause
Crafty.c('Blank', {
	init: function() {		
		this.requires('Actor, Keyboard');      
		this.attr({x: 200, y: 100, w: tileW, h: tileH, z:10});
	}
});
	
Crafty.c('Stop', {
	init: function() {		
		this.requires('Actor, Color, Collision, Mouse')     
			.attr({x: 35, y: 300, w: tileW, h: (tileH*Game.map_grid.height)+(tileH*2)})
			.color('gray');
	}
});
Crafty.c('StopUp', {
	init: function() {		
		this.requires('Actor, Color, Collision, Mouse')     
			.attr({x: 35, y: 300, w: tileW*Game.map_grid.width, h: tileH})
			.color('gray');
	}
});

Crafty.c('TenMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 35, y: 300, w: tileW, h: tileH})
			.color('blue');
	}
});

Crafty.c('FiveMarker', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 35, y: 300, w: tileW, h: tileH})
			.color('green');
	}
});

Crafty.c('HorzLine', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 0, y: 0, w: (Game.map_grid.width*Game.map_grid.tile.width), h: 2, z:10, alpha:0.3})
			.color('black');
	}
});

Crafty.c('VertLine', {
	init: function() {		
		this.requires('Actor, Color')     
			.attr({x: 0, y: 0, w: 2, h: (Game.map_grid.height*Game.map_grid.tile.height)-tileH, z:10, alpha:0.3})
			.color('black');
	}
});

//Click-able
Crafty.c('Box', {
	init: function() {
		this.requires('Actor, Mouse, Color, Solid, Keyboard')
			.attr({x: 0, y: 0, w: tileW, h: tileH})
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
			
			//TESTING SWATCHES
			if (error) {
				Crafty.e('Box').color(permBackground).at(oMex, oMwy);
			} else {
				Crafty.e('Box').addCompnent(permBackground).at(oMex, oMwy);
			}
			
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
				document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Real (' + this.x + ', ' + this.y + ')"';				
				//TESTING SWATCHES
				if (blockClass == 'Door') {
					if (error) {
						this.color(playerColor);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
					} else {
						this.addComponent(playerColor);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 2);
				
					}		
				} else if (blockClass == 'Elevator') {
					if (error) {
						this.color(playerColor);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 3);
						//Over
						Crafty.e('Box').color(playerColor).at(spwy + 1, spex);
						Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 1);
						Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 2);
						Crafty.e('Box').color(playerColor).at(spwy + 1, spex + 3);*/					
					} else {
						this.addComponent(playerColor);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 2);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 3);
						//Over
						Crafty.e('Box').addComponent(playerColor).at(spwy + 1, spex);
						Crafty.e('Box').addComponent(playerColor).at(spwy + 1, spex + 1);
						Crafty.e('Box').addComponent(playerColor).at(spwy + 1, spex + 2);
						Crafty.e('Box').addComponent(playerColor).at(spwy + 1, spex + 3);
					}
				} else if (blockClass == 'Wall') {
					if (error) {
						this.color(playerColor);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 2);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 3);
						Crafty.e('Box').color(playerColor).at(spwy, spex + 4);*/
					} else {
						this.addComponent(playerColor);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 1);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 2);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 3);
						Crafty.e('Box').addComponent(playerColor).at(spwy, spex + 4);
					}
				}else {
					if (error) {
						this.color(playerColor);
					} else {
					this.addComponent(playerColor);
					}
				}
				//END SWATCH TEST
			} else document.getElementById("console").value = 'Array is: ' + ' blockClass: "' + make[0] + '" blockColor: "' + make[1] + '" rockName: "' + make [2] + '" rockType: "' + make[3] + '" coords: "(' + wy + ', ' + ex + ') Pixel Value (' + this.x + ', ' + this.y + ')"';
		}
	}
});
