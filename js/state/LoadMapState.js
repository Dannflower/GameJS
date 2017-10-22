import PlayMapState from '/js/state/PlayMapState.js';

export default class LoadMapState extends Phaser.State {

  constructor(mapName) {

    super();

    this.mapName = mapName;
  }

  preload() {

    let filePath = '/assets/maps/' + this.mapName + '.json';

    this.game.load.json(this.mapName, filePath);
  }

  create() {

    this.game.state.add("PlayMapState", new PlayMapState(this.mapName));
    this.game.state.start("PlayMapState");
  }
}
