export default class MapManager {

  /**
   * Wrapper class for Phaser.Tilemap that provides high-level functions to
   * load assets required by the map and manipulate its Phaser.TilemapLayers.
   * @constructor
   * @param {Phaser.Game} game - The currently running game.
   * @param {Object} tilemapJson - The parsed JSON Object containing the map data.
   */
  constructor(game, mapName) {

    this.game = game;

    this.mapName = mapName;
  }

  /**
   * Queues the backing tilemap JSON object to be loaded as Phaser.Tilemap and
   * any assets required by the map to be loaded.
   */
  preloadMap() {

    // Read the previously parsed Tiled map JSON
    this.tilemapJson = this.game.cache.getJSON(this.mapName);

    // Load the Tiled map JSON as an actual Tilemap
    this.game.load.tilemap(this.mapName, null, this.tilemapJson, Phaser.Tilemap.TILED_JSON);

    // Load the tileset images
    this.loadTilesetImages();
  }

  /**
   * Queues all of the tileset images the map requires to be loaded by the game's Phaser.Loader.
   */
  loadTilesetImages() {

    // Load all the required tileset images
    for(let tilesetId in this.tilemapJson.tilesets) {

      let tilesetJson = this.tilemapJson.tilesets[tilesetId];
      let assetName = tilesetJson.name;
      let assetPath = 'assets/' + tilesetJson.image.substring(3);

      this.game.load.image(assetName, assetPath);
    }
  }
}
