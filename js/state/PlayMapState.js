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

    this.mapManager.createMap();

    let player = this.game.add.sprite(200, 300, 'Player');

    let manager = this.mapManager;

    this.game.scale.onSizeChange.add(
      function(scaleManager, canvasWidth, canvasHeight) {

        manager.updateGameScale();
        console.log("calling...");
        
    });
  }

  update() {

  }

  render() {

      this.game.debug.pointer(this.game.input.pointer1);
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }
}
