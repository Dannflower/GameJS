import PlayMapState from '/js/state/PlayMapState.js';

export default class LoadMapState extends Phaser.State {

  constructor(mapName) {

    super();

    this.mapName = mapName;
  }

  preload() {

    this.game.load.tilemap(this.mapName, null, null, Phaser.Tilemap.TILED_JSON);
  }

  create() {

    this.game.state.add("PlayMapState", new PlayMapState('map_7Soul'));
    this.game.state.start("PlayMapState");
  }
}
