import LoadMapState from '/js/state/LoadMapState.js';

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '',
{
    preload: preload,
    create: create,
    update: update,
    render: render
}, null, false);

let cursors;
let player;
let map;
let mouse;
let mapLayerGroup;
let pointer;

let numberOfTilesForLongDimension = 25;
let numberOfTilesForShortDimension = 15;

function preload() {

  game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
  game.scale.parentIsWindow = true;

  game.time.advancedTiming = true;
}

function create() {

  game.state.add("LoadMapState", new LoadMapState('map_7Soul'));
  game.state.start("LoadMapState");



  //game.scale.onSizeChange.add(onSizeChange);


  

}

function update() {


}

function render() {

}
