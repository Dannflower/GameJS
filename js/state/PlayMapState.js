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
  }

  update() {

  }

  render() {
    
      this.game.debug.pointer(this.game.input.pointer1);
      this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.text(this.game.time.fps || '--', 2, 14, "#00ff00");
  }

  updateGameScale() {

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
}
