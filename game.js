

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update,
    render: render
}, null, false);

var cursors;
var player;

function preload() {

  game.time.advancedTiming = true;

  game.load.image('Grasslands_A_file', 'assets/Tiles - Grasslands/Grasslands_A.png');
  game.load.image('Grasslands_B_file', 'assets/Tiles - Grasslands/Grasslands_B.png');
  game.load.image('Blocked_Tile', 'assets/Objects/Blocked Tile.png');
  game.load.image('Player', 'assets/Sprites/Human (Front)/Full/player_01.png');
  game.load.tilemap('map_7Soul', null, null, Phaser.Tilemap.TILED_JSON);
}

function create() {

  game.world.setBounds(0, 0, 2000, 2000);

  var map = game.add.tilemap('map_7Soul', null, null, null, null);

  map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
  map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

  var layer1 = map.createLayer('Tile Layer 1', null, null, mapGroup);
  var layer2 = map.createLayer('Tile Layer 2', null, null, mapGroup);
  var layer3 = map.createLayer('Tile Layer 3', null, null, mapGroup);

  player = game.add.sprite(200, 300, 'Player');

  game.world.scale.set(5);

  game.camera.follow(player);

  var mapGroup = game.add.group();

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

  var moveRate = 5;

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
