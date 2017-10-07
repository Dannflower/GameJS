

var game = new Phaser.Game(window.innerHeight, window.innerWidth, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update,
    render: render
});

var cursors;

function preload() {

  game.load.image('Grasslands_A_file', 'assets/Tiles - Grasslands/Grasslands_A.png');
  game.load.image('Grasslands_B_file', 'assets/Tiles - Grasslands/Grasslands_B.png');
  game.load.tilemap('map_7Soul', null, null, Phaser.Tilemap.TILED_JSON);


}

function create() {

  var mapGroup = game.add.group();

  var map = game.add.tilemap('map_7Soul', null, null, null, null);

  map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
  map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

  var layer1 = map.createLayer('Tile Layer 1')//, null, null, mapGroup);
  var layer2 = map.createLayer('Tile Layer 2')//, null, null, mapGroup);
  var layer3 = map.createLayer('Tile Layer 3')//, null, null, mapGroup);

  game.camera.height = 100;
  game.camera.width = 100;

  //layer1.fixedToCamera = false;
  //layer2.fixedToCamera = false;
  //layer3.fixedToCamera = false;

  //mapGroup.scale.set(5);



  var t = game.add.text(200, 500, "text is not fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
  t.fixedToCamera = true;

  cursors = game.input.keyboard.createCursorKeys();

  //game.camera.scale = 1;

}

function update() {

  if (cursors.up.isDown)
    {
        game.camera.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 4;
    }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }
}

function render() {

    game.debug.cameraInfo(game.camera, 32, 32);

}
