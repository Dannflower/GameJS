import LoadMapState from '/js/state/LoadMapState.js';

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update,
    render: render
}, null, false);

let cursors;
let player;
let map;
let mouse;
let mapLayerGroup;
let pointer;

let numberOfTilesForLongDimension = 25;
let numberOfTilesForShortDimension = 15;

function preload() {

  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;

  game.time.advancedTiming = true;


}

function create() {

  game.state.add("LoadMapState", new LoadMapState('map_7Soul'));
  game.state.start("LoadMapState");

  cursors = game.input.keyboard.createCursorKeys();
  mouse = game.input.mousePointer;
  pointer = game.input.addPointer();

  //game.scale.onSizeChange.add(onSizeChange);


  //game.camera.follow(player);

  //updateGameScale();

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
