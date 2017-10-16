export default class GameMap {

  constructor(game, mapName) {

    this.game = game;

    this.mapName = mapName;

    loadMap();
  }

  loadMap() {

    this.game.load.tilemap('map_7Soul', null, null, Phaser.Tilemap.TILED_JSON);
    

  }

  loadMapAssets() {


  }
}
