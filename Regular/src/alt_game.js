var startPoint = 1;
var Lev = function() {return 'Level' + startPoint;}
var Welcome =  function() {return 'Press to Start ' + Lev() + '!';}
var WelcomeLevelText = function() {return ['Welcome', 99999];};
var RedoLevelText = function() {return ['Redo!', 1000];};
var BetweenLevelText = function() {return ['Victory!', 1000];};
var FailLevelText = function() {return ['Fail!', 1000];};
var EndLevelText = function() {return ['The End!', 1000];};
var totalLevels = 3;
var trans = 0;
var wipe = function() {return trans;};
var red = ['red'], green = ['green'], blue = ['blue'], yellow = ['yellow'], black = ['black'], gray = ['gray'], orange = ['orange'], white = ['white'];
var playerColor = 'yellow'; 
var clicked = false;
var rise = false;
var color_default = ['blue'];
var debug = false;
var specialSceneList = [];
//var pauseKey = Crafty.keys.Q;
//Key Color RED BLUE GREEN ORANGE BLACK INDIGO VIOLET WHITE YELLOW
var Keys = [[0], [0], [0],  [0],   [0],  [0],  [0],   [0],  [0]];
var points = 0;
var lives = 3;
var checkPoint = [5,6];
var currentSceneList = undefined;
var fresh = true;
var wide = 4.1;
var high = 1.5;
var scaled = 1;
var length = 600;
var width = 480;
var start = function() {Crafty.init(length, width);Crafty.viewport.init(length, width);};
var tileW = 35;
var tileH = 20;
var gridW = 100;
var gridH = 16;
var error = false;
var localError = false;
var playerError = false;

var spriteW = 35;
var spriteH = 20;

var DebugTextOn = function() {return ['Debug Mode Active', 99999];};
var DebugTextOff = function() {return ['Debug Mode Inactive', 99999];};

var assetsObj = {
    "sprites": {
        "swatch.png": {
            "tile": spriteW,
            "tileh": spriteH,
            "map": { "Dorange": [0,0], "Dblue":[1,0], "Dred":[2,0], "Dyellow": [3,0], "Dindigo": [4,0], "Dblack": [5,0], "Dgreen": [6,0], "Dviolet": [7,0], "Dwhite": [8,0], "Dgray": [0,1]},
			"paddingX": 1,
            "paddingY": 1,
            "paddingAroundBorder": 1
        },
        "Chars/stickFigures.png": {
            "tile": 159,
            "tileh": 254,
            "map": { "regularGuy": [1,1], "regularGirl":[2,1], "youngGuy":[1,2], "youngGirl": [2,2], "businessGuy": [0,2], "musicGuy": [0,1], "baseballGuy": [0,0], "chefGuy": [1,0], "dancerGirl": [2,0]},
            "paddingX": 1,
            "paddingY": 1,
            "paddingAroundBorder": 1
        },
    },
};

Game = {
	Res: {
		width: 1600,
		height: 600
	},
	// This defines the size of each tile
	map_grid: {
		width: gridW, 
		height: gridH, 
		tile: {
			width: tileW, 
			height: tileH
		}
	},
	copyArr: function(arr){ //Got From Online
		var new_arr = arr.slice(0);
		for(var i = new_arr.length; i--;)
			if(new_arr[i] instanceof Array)
				new_arr[i] = this.copyArr(new_arr[i]);
		return new_arr;
	},
	setBackground: function(hold) {
		list = JSON.parse(hold);
		specialSceneList = list;
		
		listX = specialSceneList.length-1, listY = specialSceneList[0].length;
		//tilesize-Set
		tileNumbers = specialSceneList[listX][listY][2].split(','), tileW = parseInt(tileNumbers[0]), tileH = parseInt(tileNumbers[1]);
		console.log('Tiles: ' + tileW + ', ' + tileH);
	
		//gridsize-Set
		gridNumbers = specialSceneList[listX][listY][1].split(','), gridW = parseInt(gridNumbers[0]), gridH = parseInt(gridNumbers[1]);
		Game.map_grid.width = gridW, Game.map_grid.height = gridH;
		console.log('Grid: ' + gridW + ', ' + gridH);
		console.log('Game W/H: ' + Game.map_grid.width + ',' + Game.map_grid.height);
		startPoint = -1;
		Game.setGrid(gridW, gridH, tileW, tileH);
		//Game.start('Onward');
	},
	toggleVisibility: function(id) {
		var e = document.getElementById(id);
		if(e.style.display == 'block') {
			e.style.display = 'none';
			document.getElementById("UserCode").value = "";
		} else {
			e.style.display = 'block';
		}
	},
	checkBox: function() {
		if (debug) {
			var checkbox = document.createElement('input');
			checkbox.type = "checkbox";
			checkbox.onchange = toggleVisibility('debug');
			checkbox.id = 'saveMode';
			return checkbox;
		}
	},
	playerStats: function(fail, win) {
		if (fail) {
			if (lives == 0) {
				this.playerScore(points*-1);
				Keys = [[0], [0], [0],  [0],   [0],  [0],  [0],   [0],  [0]];
				//currentSceneList = sceneList1.slice(0);
				startPoint = 1;
				currentSceneList = this.copyArr(myLevels[startPoint-1]);

				fresh = true;
				this.playerLives(3);
			} else this.playerLives(-1);
			Crafty.scene('Onward', FailLevelText());
		} else {
			if (win) {
				fresh = true;
				Crafty.scene('Onward', EndLevelText());
			} else {
				fresh = true;
				Crafty.scene('Onward', BetweenLevelText());
			}
		}
	},
	kill: function(entity) {
		spwy = Math.round(entity.x/Game.map_grid.tile.width), spex = Math.round(entity.y/Game.map_grid.tile.height);
		make = currentSceneList[spex][spwy];
		make[0] = '00'
	},
	playerScore: function(add) {
		if (typeof add != 'number') add = 0;
		points = points + add;
		console.log(typeof points);
		document.getElementById("score").innerHTML = points;
	},
	playerLives: function(life) {
		if (typeof life != 'number') life = 0;
		lives = lives + life;
		console.log(typeof lives);
		document.getElementById("Lives").innerHTML = lives;
	},
	playerKeys: function(key, s) {
		if (typeof key != 'number') key = 0;
		if (s == 'p') {
			Keys[key]++;
		} else if (s == 'm') {
			Keys[key]--;
		}
		console.log(typeof points);
		document.getElementById(key).innerHTML = Keys[key];
	},
	playerMove: function(buttonID) {
		//console.log(buttonID, 'clicked');
		key = {key: Crafty.keys[buttonID]};	
		if (key) {
			Crafty.trigger("KeyDown", key);
		}
/* 		if (buttonID == 'right') rightSet = true;
		if (buttonID == 'left') leftSet = true;
		if (buttonID == 'up') upSet = true;
		if (buttonID == 'down') downSet = true; */
	},
	playerRelease: function(buttonID) {
		//console.log(buttonID, 'released');
		key = {key: Crafty.keys[buttonID]};
		if (key) {
			Crafty.trigger("KeyUp", key);
		}
/* 		if (buttonID == 'right') rightSet = false;
		if (buttonID == 'left') leftSet = false;
		if (buttonID == 'up') upSet = false;
		if (buttonID == 'down') downSet = false; */
	},
	setGrid: function(x,y, tx, ty) {
		gridW = x, gridH = y, Game.map_grid.width = x, Game.map_grid.height = y;
		tileW = tx, tileH = ty, Game.map_grid.tile.width = tx, Game.map_grid.tile.height = ty;
		console.log("setgrid started. Received: " + Game.map_grid.tile.width + ", " + Game.map_grid.tile.height + ", " + Game.map_grid.width + ", " + Game.map_grid.height);
		//Game.start('Onward');
		Game.reload();
	},
	checkDebug: function() {
		if (document.getElementById('debugCheck').checked) {
			debug = true;
		} else {
			debug = false;
		}
	},
	reload: function() {
		Game.checkDebug();
		Crafty.viewport.reload();
		if (document.getElementById('debugCheck').checked) {
			Crafty.scene('Onward', DebugTextOn());
		} else if (!document.getElementById('debugCheck').checked) {
			Crafty.scene('Onward', DebugTextOff());
		}
	},
	playC: function(sel) {
		playerColor = sel;
	        //player.addComponent(sel);
	        //console.log(playerColor);
	        Game.playerSprite(sel);
    	},
	playerSprite: function(color) {
		console.log(playerColor);
		if (playerColor == 'orange') {
		    player.removeComponent('regularGuy');
		} else if (playerColor == 'blue') {
		    player.removeComponent('regularGirl');
		} else if (playerColor == 'red') {
		    player.removeComponent('businessGuy');
		} else if (playerColor == 'yellow') {
		    player.removeComponent('musicGuy');
		}else if (playerColor == 'indigo') {
		    player.removeComponent('youngGuy');
		}else if (playerColor == 'black') {
		    player.removeComponent('youngGirl');
		}else if (playerColor == 'green') {
		    player.removeComponent('chefGuy');
		}else if (playerColor == 'violet') {
		    player.removeComponent('baseballGuy');
		}else if (playerColor == 'white') {
		    player.removeComponent('dancerGirl');
		}
		
		if (color == 'orange') {
		    player.addComponent('regularGuy');
		} else if (color == 'blue') {
		    player.addComponent('regularGirl');
		} else if (color == 'red') {
		    player.addComponent('businessGuy');
		} else if (color == 'yellow') {
		    player.addComponent('musicGuy');
		}else if (color == 'indigo') {
		    player.addComponent('youngGuy');
		}else if (color == 'black') {
		    player.addComponent('youngGirl');
		}else if (color == 'green') {
		    player.addComponent('chefGuy');
		}else if (color == 'violet') {
		    player.addComponent('baseballGuy');
		}else if (color == 'white') {
		    player.addComponent('dancerGirl');
		}
		player.attr({w: tileW/2, h: tileH*2})
	},
	swatchSetter: function(sN) {
		//Working Version
		//Crafty.sprite(spriteW, spriteH, "e.target.result", {red:[redW,redH], green:[greenW,greenH]}, paddX, paddY, bord);
		//console.log('swatchSetter: ' + sN[0]);
		//Crafty.sprite(sN[4], sN[5], sN[0], {orange: [sN[6], sN[7]], blue:[sN[8], sN[9]], red:[sN[10], sN[11]], yellow:[sN[12], sN[13]], indigo:[sN[14], sN[15]], black:[sN[16], sN[17]], green:[sN[18], sN[19]], violet:[sN[20], sN[21]], white:[sN[22], sN[23]]}, sN[2], sN[3], sN[1]);
		
		//Attempted New Loader with error support
	        localError = false;
	        swatchName = sN[0];
	        console.log(swatchName);
	        //cannot use var in url spot i.e colors.jpg
	        document.getElementById('superSecret').value = '{"sprites": {' + '"' + swatchName + '"' + ':{"tile": ' + sN[4] + ',"tileh": ' + sN[5] + ',"map": { "orange": [' + sN[6] + ', ' + sN[7] + '], "blue":[' + sN[8] + ', ' + sN[9] + '], "red":[' + sN[10] + ', ' + sN[11] + '], "yellow": [' + sN[12] + ', ' + sN[13] + '], "indigo": [' + sN[14] + ', ' + sN[15] + '], "black": [' + sN[16] + ', ' + sN[17] + '], "green": [' + sN[18] + ', ' + sN[19] + '], "violet": [' + sN[20] + ', ' + sN[21] + '], "white": [' + sN[22] +', ' + sN[23] +']},"paddingX": ' + sN[2] + ',"paddingY": ' + sN[3] +',"paddingAroundBorder": ' + sN[1] + '}}}';
	        var change = document.getElementById('superSecret').value;
	        //var change = document.getElementById('superSecret').value;
	        /*var newAssetsObj = {
	            "sprites": {
	                swatchName: {
	                    "tile": sN[4],
	                    "tileh": sN[5],
	                    "map": { "orange": [sN[6], sN[7]], "blue":[sN[8], sN[9]], "red":[sN[10], sN[11]], "yellow": [sN[12], sN[13]], "indigo": [sN[14], sN[15]], "black": [sN[16], sN[17]], "green": [sN[18], sN[19]], "violet": [sN[20], sN[21]], "white": [sN[22], sN[23]], "gray": [sN[24], sN[25]]},
	                    "paddingX": sN[2],
	                    "paddingY": sN[3],
	                    "paddingAroundBorder": sN[1]
	                }
	            },
	        };*/
	        Crafty.load(change, // preload assets
			function() { //when loaded
				console.log('completed');
				Crafty.scene('Level');
			},

			function(e) { //progress
			},

			function(e) { //uh oh, error loading
				localError = true;
				console.log('localError = ' + localError);
				console.log('Error! Level Spritesheet not found!');
			}
		);
	},
	start: function(goScene) {
		Crafty.init(length, width, document.getElementById('cr-stage')); //Start
		//Crafty.timer.steptype('variable', 1);
		Crafty.multitouch(true);
		Crafty.pixelart(false);
		Crafty.timer.steptype("variable");
		Crafty.timer.FPS(30);
		Crafty.background('cadetblue');
		Base = Crafty.e('Basics');
		Message = Base.message;
		
		//Debug Mode
		Game.checkDebug();
		
		Crafty.paths({images: "lvl/" });
		
		Crafty.load(assetsObj, // preload assets
			function() { //when loaded
				Crafty.scene(goScene, WelcomeLevelText());
			},

			function(e) { //progress
			},

			function(e) { //uh oh, error loading
			problem = e.src;
				list = problem.split('/');
				//console.log(list);
				for (i=0; i<list.length; i++) {
					if (list[i] == 'stickFigures.png') {
						playerError = true;
						console.log('player sprite not found');
					}
				}
				error = true;
				console.log('error = ' + error);
				console.log('Error! Main Spritesheet not found!');
			}
		);
	}
}
