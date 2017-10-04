

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update
});

function preload() {


  game.load.image('Grasslands_A_image', 'assets/Tiles - Grasslands/Grasslands_A.png');
  game.load.tilemap('map_7Soul', null, null, Phaser.Tilemap.TILED_JSON);
}

function create() {

  var map = game.add.tilemap('map_7Soul', null, null, null, null);
  console.log(map);
  map.addTilesetImage('Grasslands_A', 'Grasslands_A_image');

  map.createLayer('Tile Layer 1');
}

function update() {
}
