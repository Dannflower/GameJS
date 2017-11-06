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
    this.numberOfTilesForLongDimension = 25;
    this.numberOfTilesForShortDimension = 15;

  }

  /**
   * Queues the backing tilemap JSON object to be loaded as Phaser.Tilemap and
   * any assets required by the map to be loaded.
   * Should be called in a preload method separate from and before the preload method
   * in which loadTilesetImages is invoked.
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
   * Should be called in a preload method separate from and after the preload in which
   * preloadMap was invoked.
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

  createMap() {

    this.tilemap = this.game.add.tilemap(this.mapName, null, null, null, null);
    console.log(this.tilemap);
    // Add the tileset images to the map
    for(let tilesetId in this.tilemap.tilesets) {

      let tileset = this.tilemap.tilesets[tilesetId];
      console.log(tileset.name);
      this.tilemap.addTilesetImage(tileset.name, tileset.name);
    }

    // Create the main group of layers
    this.layersGroup = this.game.add.group(undefined, 'layers');

    // Create the layers
    for(let layerId in this.tilemap.layers) {

      let layer = this.tilemap.layers[layerId];
      console.log(layer.name);
      this.tilemap.createLayer(layer.name, null, null, this.layersGroup);
    }

    // Set something to the current layer
    this.tilemap.currentLayer = this.layersGroup.getAt(0);
  }

  updateGameScaleToMap() {

    // Update game scale
    this.layersGroup.scale = new PIXI.Point(this.getScaleX(), this.getScaleY());
    this.player.scale = this.layersGroup.scale;

    // Update the world size to match
    this.game.world.setBounds(0, 0, this.tilemap.widthInPixels * this.layersGroup.scale.x, this.tilemap.heightInPixels * this.layersGroup.scale.y);

    // Update the camera bounds to the new world size
    this.game.camera.setBoundsToWorld;

    // Resize all of the layer so they know how much to draw
    // If you don't do this, each layer's canvas will be to
    // small when the scale of the map is increased
    for (var i = 0; i < this.layersGroup.children.length; i++) {

      var layer = this.layersGroup.children[i];

      layer.resize(this.game.world.width, this.game.world.height);
    }
  }

  addPlayerToMap(spriteKey) {

    return this.player = this.game.add.sprite(200, 300, spriteKey);
  }

  getScaleX() {

    let tileCount;

    if(this.game.camera.width >= this.game.camera.height) {

      tileCount = this.numberOfTilesForLongDimension;

    } else {

      tileCount = this.numberOfTilesForShortDimension;
    }

    return Math.max(1, this.game.camera.width / (this.tilemap.tileWidth * tileCount));
  }

  getScaleY() {

    let tileCount;

    if(this.game.camera.height >= this.game.camera.width) {

      tileCount = this.numberOfTilesForLongDimension;

    } else {

      tileCount = this.numberOfTilesForShortDimension;
    }

    return Math.max(1, this.game.camera.height / (this.tilemap.tileHeight * tileCount));
  }

  getTileX(worldX) {

    return this.tilemap.currentLayer.getTileX(worldX / this.layersGroup.scale.x);

  }

  getTileY(worldY) {

    return this.tilemap.currentLayer.getTileY(worldY / this.layersGroup.scale.y);
  }
}
