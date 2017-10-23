export default class PlayMapState extends Phaser.State {

  constructor(mapName) {

    super();

    this.mapName = mapName;
  }

  preload() {

    this.game.load.image('Player', 'assets/tilesets/sprites/Human (Front)/Full/player_01.png');

    // Read the previously parsed Tiled map JSON
    let tilemapJson = this.game.cache.getJSON(this.mapName);

    // Load all the required tileset images
    for(let tilesetId in tilemapJson.tilesets) {

      let tilesetJson = tilemapJson.tilesets[tilesetId];
      let assetName = tilesetJson.name;
      let assetPath = 'assets/' + tilesetJson.image.substring(3);
      
      this.game.load.image(assetName, assetPath);
    }

    // Load the Tiled map JSON as an actual Tilemap
    this.game.load.tilemap(this.mapName, null, tilemapJson, Phaser.Tilemap.TILED_JSON);
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

  }

  update() {


  }

  preLoadTileset(tilesetJson) {


  }
}
