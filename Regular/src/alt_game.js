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

var spriteW = 35;
var spriteH = 20;

var DebugTextOn = function() {return ['Debug Mode Active', 99999];};
var DebugTextOff = function() {return ['Debug Mode Inactive', 99999];};

var assetsObj = {
    "sprites": {
        "swatch.png": {
            "tile": spriteW,
            "tileh": spriteH,
            "map": { "orange": [0,0], "blue":[1,0], "red":[2,0], "yellow": [3,0], "indigo": [4,0], "black": [5,0], "green": [6,0], "violet": [7,0], "white": [8,0], "gray": [0,1]},
			"paddingX": 1,
            "paddingY": 1,
            "paddingAroundBorder": 1
        }
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
		//console.log(playerColor);
	},
	swatchSetter: function(sN) {
		//Crafty.sprite(spriteW, spriteH, "e.target.result", {red:[redW,redH], green:[greenW,greenH]}, paddX, paddY, bord);
		console.log('swatchSetter: ' + sN[0]);
		Crafty.sprite(sN[4], sN[5], sN[0], {orange: [sN[6], sN[7]], blue:[sN[8], sN[9]], red:[sN[10], sN[11]], yellow:[sN[12], sN[13]], indigo:[sN[14], sN[15]], black:[sN[16], sN[17]], green:[sN[18], sN[19]], violet:[sN[20], sN[21]], white:[sN[22], sN[23]]}, sN[2], sN[3], sN[1]);
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
			}
		);
	}
}
