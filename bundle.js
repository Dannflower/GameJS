(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
    console.log("We've got something working!");
}

},{}],2:[function(require,module,exports){
var testing = require('./GameMap.js');

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update,
    render: render
}, null, false);

var cursors;
var player;
var map;
var mapLayerGroup;
var pointer;

var numberOfTilesForLongDimension = 25;
var numberOfTilesForShortDimension = 15;

function preload() {

  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;

  game.time.advancedTiming = true;

  game.load.image('Grasslands_A_file', 'assets/Tiles - Grasslands/Grasslands_A.png');
  game.load.image('Grasslands_B_file', 'assets/Tiles - Grasslands/Grasslands_B.png');
  game.load.image('Blocked_Tile', 'assets/Objects/Blocked Tile.png');
  game.load.image('Player', 'assets/Sprites/Human (Front)/Full/player_01.png');
  game.load.tilemap('map_7Soul', null, null, Phaser.Tilemap.TILED_JSON);
}

function create() {

  cursors = game.input.keyboard.createCursorKeys();
  mouse = game.input.mousePointer;
  pointer = game.input.addPointer();

  game.scale.onSizeChange.add(onSizeChange);

  map = game.add.tilemap('map_7Soul', null, null, null, null);

  map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
  map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

  mapLayerGroup = game.add.group();

  var layer1 = map.createLayer('Tile Layer 1', null, null, mapLayerGroup);
  var layer2 = map.createLayer('Tile Layer 2', null, null, mapLayerGroup);
  var layer3 = map.createLayer('Tile Layer 3', null, null, mapLayerGroup);

  map.currentLayer = layer1;

  player = game.add.sprite(200, 300, 'Player');
  game.camera.follow(player);

  updateGameScale();

  testing();
}

function update() {

  var moveRate = 7;

  if(mouse.leftButton.isDown) {

    console.log('x: ' + mouse.x + ', y: ' + mouse.y);

    var tileX = map.currentLayer.getTileX(getMouseWorldX() / mapLayerGroup.scale.x);
    var tileY = map.currentLayer.getTileY(getMouseWorldY() / mapLayerGroup.scale.y);
    console.log('Tile X: ' + tileX + ', Tile Y: ' + tileY);

  }


  if(game.input.pointer1.isDown) {

    if(game.input.pointer1.x > player.worldPosition.x) {

      player.x += moveRate;

    } else if (game.input.pointer1.x < player.worldPosition.x) {

      player.x -= moveRate;
    }

    if(game.input.pointer1.y > player.worldPosition.y) {

      player.y += moveRate;

    } else if (game.input.pointer1.y < player.worldPosition.y) {

      player.y -= moveRate;
    }
  }

  if (cursors.up.isDown)
    {
        player.y -= moveRate;
    }
    else if (cursors.down.isDown)
    {
        player.y += moveRate;
    }

    if (cursors.left.isDown)
    {
        player.x -= moveRate;
    }
    else if (cursors.right.isDown)
    {
        player.x += moveRate;
    }
}

function render() {
    game.debug.pointer(game.input.pointer1);
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}

function onSizeChange(scaleManager, canvasWidth, canvasHeight) {

  updateGameScale();
}

function getMouseWorldX() {

  return mouse.x + game.camera.x;
}

function getMouseWorldY() {

  return mouse.y + game.camera.y;
}

function updateGameScale() {

  // Update game scale and world size to match
  mapLayerGroup.scale = new PIXI.Point(getScaleX(), getScaleY());
  player.scale = mapLayerGroup.scale;
  game.world.setBounds(0, 0, map.widthInPixels * mapLayerGroup.scale.x, map.heightInPixels * mapLayerGroup.scale.y);
  game.camera.setBoundsToWorld;

  for (var i = 0; i < mapLayerGroup.children.length; i++) {

    var layer = mapLayerGroup.children[i];

    layer.resize(game.world.width, game.world.height);
  }


}

function getScaleX() {

  var tileCount;

  if(game.camera.width >= game.camera.height) {

    tileCount = numberOfTilesForLongDimension;

  } else {

    tileCount = numberOfTilesForShortDimension;
  }

  return Math.max(1, game.camera.width / (map.tileWidth * tileCount));
}

function getScaleY() {

  var tileCount;

  if(game.camera.height >= game.camera.width) {

    tileCount = numberOfTilesForLongDimension;

  } else {

    tileCount = numberOfTilesForShortDimension;
  }

  return Math.max(1, game.camera.height / (map.tileHeight * tileCount));
}

},{"./GameMap.js":1}]},{},[2]);
