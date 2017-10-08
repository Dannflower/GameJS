

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
var gameScale = new PIXI.Point(6, 6);

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



  map = game.add.tilemap('map_7Soul', null, null, null, null);

  map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
  map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

  var gameGroup = game.add.group();
  gameGroup.scale = gameScale;

  var layer1 = map.createLayer('Tile Layer 1', null, null, gameGroup);
  var layer2 = map.createLayer('Tile Layer 2', null, null, gameGroup);
  var layer3 = map.createLayer('Tile Layer 3', null, null, gameGroup);

  player = game.add.sprite(200, 300, 'Player', null, gameGroup);

  game.camera.follow(player);

  map.currentLayer = layer1;

  game.world.setBounds(0, 0, map.widthInPixels * gameScale.x, map.heightInPixels * gameScale.y);
}

function update() {

  var moveRate = 4;

  if(mouse.leftButton.isDown) {

    console.log('x: ' + mouse.x + ', y: ' + mouse.y);

    var tileX = map.currentLayer.getTileX(getMouseWorldX() / gameScale.x);
    var tileY = map.currentLayer.getTileY(getMouseWorldY() / gameScale.y);
    console.log('Tile X: ' + tileX + ', Tile Y: ' + tileY);

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

function getMouseWorldX() {

  return mouse.x + game.camera.x;
}

function getMouseWorldY() {

  return mouse.y + game.camera.y;
}
