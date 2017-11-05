import MapManager from '/js/Map/MapManager.js';

export default class PlayMapState extends Phaser.State {

  constructor(mapName) {

    super();

    this.mapName = mapName;
  }

  preload() {

    this.game.load.image('Player', 'assets/tilesets/sprites/Human (Front)/Full/player_01.png');

    // Create a new MapManager using the parsed tilemap JSON object
    this.mapManager = new MapManager(this.game, this.mapName);

    // Preload the map
    this.mapManager.preloadMap();
  }

  create() {

    // Create input devices
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.mouse = this.game.input.mousePointer;
    this.pointer = this.game.input.addPointer();

    this.mapManager.createMap();

    this.player = this.mapManager.addPlayerToMap();

    this.game.camera.follow(this.player);

    // Update the game scale for the first time
    this.mapManager.updateGameScaleToMap();

    let manager = this.mapManager;

    this.game.scale.onSizeChange.add(
      function(scaleManager, canvasWidth, canvasHeight) {

        manager.updateGameScaleToMap();

    });
  }

  update() {

    let moveRate = 7;

    if(this.mouse.leftButton.isDown) {

      console.log('x: ' + this.mouse.x + ', y: ' + this.mouse.y);

      var tileX = this.mapManager.getTileX(this.getMouseWorldX());
      var tileY = this.mapManager.getTileY(this.getMouseWorldY());

      console.log('Tile X: ' + tileX + ', Tile Y: ' + tileY);

    }

    if(this.game.input.pointer1.isDown) {

      if(this.game.input.pointer1.x > player.worldPosition.x) {

        this.player.x += moveRate;

      } else if (this.game.input.pointer1.x < player.worldPosition.x) {

        this.player.x -= moveRate;
      }

      if(this.game.input.pointer1.y > player.worldPosition.y) {

        this.player.y += moveRate;

      } else if (this.game.input.pointer1.y < player.worldPosition.y) {

        this.player.y -= moveRate;
      }
    }

    if (this.cursors.up.isDown)
      {
          this.player.y -= moveRate;
      }
      else if (this.cursors.down.isDown)
      {
          this.player.y += moveRate;
      }

      if (this.cursors.left.isDown)
      {
          this.player.x -= moveRate;
      }
      else if (this.cursors.right.isDown)
      {
          this.player.x += moveRate;
      }
  }

  render() {

      this.game.debug.pointer(this.game.input.pointer1);
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }

  getMouseWorldX() {

    return this.mouse.x + this.game.camera.x;
  }

  getMouseWorldY() {

    return this.mouse.y + this.game.camera.y;
  }
}
