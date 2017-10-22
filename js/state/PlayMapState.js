export default class PlayMapState extends Phaser.State {

  constructor(mapName) {

    super();

    this.mapName = mapName;
  }

  preload() {

    this.game.load.image('Grasslands_A_file', 'assets/Tiles - Grasslands/Grasslands_A.png');
    this.game.load.image('Grasslands_B_file', 'assets/Tiles - Grasslands/Grasslands_B.png');
    this.game.load.image('Blocked_Tile', 'assets/Objects/Blocked Tile.png');
    this.game.load.image('Player', 'assets/Sprites/Human (Front)/Full/player_01.png');


  }

  create() {


    this.map = this.game.add.tilemap(this.mapName, null, null, null, null);

    this.map.addTilesetImage('Grasslands_A', 'Grasslands_A_file');
    this.map.addTilesetImage('Grasslands_B', 'Grasslands_B_file');

    let mapLayerGroup = this.game.add.group();

    var layer1 = this.map.createLayer('Tile Layer 1', null, null, mapLayerGroup);
    var layer2 = this.map.createLayer('Tile Layer 2', null, null, mapLayerGroup);
    var layer3 = this.map.createLayer('Tile Layer 3', null, null, mapLayerGroup);

    let player = this.game.add.sprite(200, 300, 'Player');

  }

  update() {


  }
}
