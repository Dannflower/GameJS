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


    this.map = this.game.add.tilemap(this.mapName, null, null, null, null);
    console.log(this.map);

    // Add the tileset images to the map
    for(let tilesetId in this.map.tilesets) {

      let tileset = this.map.tilesets[tilesetId];
      console.log(tileset.name);
      this.map.addTilesetImage(tileset.name, tileset.name);
    }

    let mapLayerGroup = this.game.add.group();

    var layer1 = this.map.createLayer('Tile Layer 1', null, null, mapLayerGroup);
    var layer2 = this.map.createLayer('Tile Layer 2', null, null, mapLayerGroup);
    var layer3 = this.map.createLayer('Tile Layer 3', null, null, mapLayerGroup);

    let player = this.game.add.sprite(200, 300, 'Player');
    console.log(this.map.getLayerIndex('Tile Layer 1'));
  }

  update() {


  }

  preLoadTileset(tilesetJson) {


  }
}
