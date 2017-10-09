

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
var cameraScale = new PIXI.Point(1, 1);
var mapLayerGroup;

var numberOfTilesForLongDimension = 20;
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

  game.scale.onSizeChange.add(onSizeChange);

  map = game.add.tilemap('map_7Soul', null, null, null, null);

  map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
  map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

  mapLayerGroup = game.add.group();

  var layer1 = map.createLayer('Tile Layer 1', null, null, mapLayerGroup);
  var layer2 = map.createLayer('Tile Layer 2', null, null, mapLayerGroup);
  player = game.add.sprite(200, 300, 'Player');//, null, mapLayerGroup);
  var layer3 = map.createLayer('Tile Layer 3', null, null, mapLayerGroup);

  game.camera.follow(player);

  updateGameScale();
}

function update() {

  var moveRate = 4;

  if(mouse.leftButton.isDown) {

    //console.log('x: ' + mouse.x + ', y: ' + mouse.y);

    //var tileX = map.currentLayer.getTileX(getMouseWorldX() / cameraScale.x);
    //var tileY = map.currentLayer.getTileY(getMouseWorldY() / cameraScale.y);
    //console.log('Tile X: ' + tileX + ', Tile Y: ' + tileY);

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

    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
}

function onSizeChange(scaleManager, canvasWidth, canvasHeight) {

  //console.log('Width: ' + scaleManager.game.width + " Height: " + scaleManager.game.height);

  updateGameScale();
}

function getMouseWorldX() {

  return mouse.x + game.camera.x;
}

function getMouseWorldY() {

  return mouse.y + game.camera.y;
}

function updateGameScale() {

  game.camera.scale.set(getScaleX(), getScaleY());
  game.world.setBounds(0, 0, map.widthInPixels * game.camera.scale.x, map.heightInPixels * game.camera.scale.y);
  game.camera.setBoundsToWorld;

  console.log(game.world.bounds);
  console.log('camera bounds height:' + game.camera.bounds.height + ', width: ' + game.camera.bounds.width);
  console.log('world bounds height: ' + game.world.bounds.height + ', width: ' + game.world.bounds.width);
  console.log(game.camera.scale);

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

  return game.camera.width / (map.tileWidth * tileCount);
}

function getScaleY() {

  var tileCount;

  if(game.camera.height >= game.camera.width) {

    tileCount = numberOfTilesForLongDimension;

  } else {

    tileCount = numberOfTilesForShortDimension;
  }

  return game.camera.height / (map.tileHeight * tileCount);
}
