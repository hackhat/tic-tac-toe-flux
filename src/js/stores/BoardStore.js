const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');
const _ = require('lodash');

/**
 * The data contains information about the board.
 * It's a nested array which contains a undefined value if not occupied
 * by any player. If player 1 owns a tile it will contain the number 1. The
 * same for player 2.
 *
 * If you have a 3 x 3 board and player 1 played on the top left tile then this array
 * will look like this:
 *
 *   [
 *     [1, 0, 0],
 *     [0, 0, 0],
 *     [0, 0, 0]
 *   ]
 *
 * @type {Array}
 */
let _data;

/**
 * We only have player 1 and player 2. After each turn players are switched.
 */
let _currentPlayer;

/**
 * Stores the winner if any. Undefined means that there is no winner yet.
 * If player 1 is winner the _winner has the value 1. Same for player 2.
 */
let _winner;

/**
 * Stores the tiles that lead to a winner.
 */
let _winnerTiles;

/**
 * Whenever the game has ended or not. A game ends when there are no more
 * empty tiles or a player won.
 */
let _gameEnded;

/**
 * The size of the board. You can't actually just change this and expect everything
 * to work. You need to make many more updates: view layer, logic layer...
 * @type {Number}
 */
const BOARD_SIZE = 3;

/**
 * Adds certain tiles to the winner tiles set. This is needed to show which tiles
 * lead to the winning state.
 * @param {Object[]} An array of objects that contains the x and y keys.
 */
function addWinnerTiles(tiles) {
  tiles.forEach(function(tile){
    var res = _.find(_winnerTiles, tile);
    if(!_.find(_winnerTiles, tile)){
      _winnerTiles.push(tile);
    }
  })
}

/**
 * Checks whenever the tile x, y is owned or not.
 * @param  {Number} x 
 * @param  {Number} y
 * @return {Boolean} True if owned, false if not.
 */
function isOwned(x, y) {
  return _data[x][y] !== 0;
}

/**
 * Sets a owner for a certain tile
 * @param {Number} x
 * @param {Number} y
 * @param {Number} ownerId
 */
function setOwner(x, y, ownerId) {
  _data[x][y] = ownerId;
}

/**
 * Gets the owned of a certain tile.
 * @param  {Number} x 
 * @param  {Number} y
 * @return {Number} Returns the owner id. If not owned returns 0.
 */
function getOwner(x, y){
  return _data[x][y];
}

/**
 * Returns the current player id.
 * @return {Number}
 */
function getCurrentPlayer() {
  return _currentPlayer;
}

/**
 * Switches the players.
 * @return {Number}
 */
function switchPlayers() {
  _currentPlayer = _currentPlayer === 1 ? 2 : 1;
}

/**
 * Checks whenver the values are the same. 
 * @param  {Number[]} array
 * @return {Boolean} True if all values are equal. False in other cases.
 */
function sameValueInArray(array) {
  let i = array.length;
  let value = array[0];
  while(i--) {
    if(array[i] !== value) return false;
  }
  return true;
}


/**
 * Returns the owner from a certain line. A line is an array of tiles.
 * @param  {Object[]} tile
 * @return {[type]}
 */
function getWinnerFromLine(line) {
  let winnerInThisLine = line[0] !== 0 && sameValueInArray(line);
  if(winnerInThisLine) return line[0];
  return false;
}

/**
 * Updates the current winner.
 */
function updateWinner() {
  if(_winner !== void 0) return;

  // For every check, if passes then the tiles are added to winner tiles. This is required
  // in order to be able to highlight the winning tiles.
  // Should not exit at the first passed check because need to find all winning tiles, for example
  // when you make a T match you win horizonatlly and vertically.

  // Vertical check
  for(let i = 0; i < BOARD_SIZE; i++){
    let line = [getOwner(i, 0), getOwner(i, 1), getOwner(i, 2)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine){
      _winner = line[0]
      addWinnerTiles([
        {x: i, y: 0},
        {x: i, y: 1},
        {x: i, y: 2},
      ]);
    };
  }

  // Horizontal check
  for(let i = 0; i < BOARD_SIZE; i++){
    let line = [getOwner(0, i), getOwner(1, i), getOwner(2, i)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine){
      _winner = line[0];
      addWinnerTiles([
        {x: 0, y: i},
        {x: 1, y: i},
        {x: 2, y: i},
      ]);
    }
  }

  // Diagonal check top-left to bottom-right
  let diag1 = [getOwner(0, 0), getOwner(1, 1), getOwner(2, 2)];
  let winnerInLine1 = getWinnerFromLine(diag1);
  if(winnerInLine1){
    _winner = diag1[0];
    addWinnerTiles([
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 2},
    ]);
  }

  // Diagonal check top-right to bottom-left
  let diag2 = [getOwner(2, 0), getOwner(1, 1), getOwner(0, 2)];
  let winnerInLine2 = getWinnerFromLine(diag2);
  if(winnerInLine2){
    _winner = diag2[0];
    addWinnerTiles([
      {x: 2, y: 0},
      {x: 1, y: 1},
      {x: 0, y: 2},
    ]);
  }
}

/**
 * @return {Boolean} Checks whenever has available tiles or not.
 */
function hasAvailableTiles() {
  for(let x = 0; x < BOARD_SIZE; x++) {
    for(let y = 0; y < BOARD_SIZE; y++) {
      if(_data[x][y] === 0) return true;
    }
  }
}

/**
 * Updates the game state, this sets the _gameEnded variable.
 */
function updateGameState() {
  if(_winner !== void 0 || !hasAvailableTiles()){
    _gameEnded = true;
  }
}

/**
 * Resets the board to a initial value.
 */
function reset() {
  _currentPlayer = 1;
  _data          = [];
  _gameEnded     = false;
  _winner        = void 0;
  _winnerTiles   = [];
  for(let x = 0; x < BOARD_SIZE; x++) {
    _data[x] = [];
    for(let y = 0; y < BOARD_SIZE; y++) {
      _data[x][y] = 0;
    }
  }
}
reset();

let BoardStore = assign({}, BaseStore, {

  /**
   * Returns all the tiles in a map. You can get the owner of the tile by
   * doing tiles[x][y].
   * @return {Array[]}
   */
  getTiles() {
    return _data;
  },

  /**
   * Returns an array with the tiles that lead to a winner. Empty if no one
   * won. Be careful that it can contain more than 3 tiles.
   * @return {Object[]} winer tiles;
   */
  getWinnerTiles() {
    return _winnerTiles;
  },

  /**
   * Checks whenever a certain tile is a winner tile.
   * @param  {Number} x
   * @param  {Number} y
   * @return {Boolean}
   */
  isWinnerTile(x, y) {
    return !!_.find(_winnerTiles, {x: x, y: y});
  },

  /**
   * Returns the size of the board.
   * @return {Number}
   */
  getSize() {
    return BOARD_SIZE;
  },

  /**
   * Returns the player id that won if any. If no player won then this value will be
   * undefined.
   * @return {Number|undefined}
   */
  getWinner() {
    return _winner;
  },

  /**
   * @return {Boolean} Returns true if game has ended and false if has not yet ended.
   */
  gameEnded() {
    return _gameEnded;
  },

  /**
   * @return {Number} Returns the current player id.
   */
  getCurrentPlayer() {
    return getCurrentPlayer()
  },

  /**
   * @return {Boolean} Returns true if is a draw game. This happens only
   *                   if there is no winner and the game ended.
   */
  isDrawGame() {
    return this.gameEnded() && this.getWinner() === void 0;
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.PLAY_POSITION:
        if(BoardStore.gameEnded()) return;
        let {x, y} = action.pos;
        if(x >= BoardStore.getSize() || x < 0) return;
        if(y >= BoardStore.getSize() || y < 0) return;
        if(isOwned(x, y)) return;
        // @todo: if game ended return;
        setOwner(x, y, getCurrentPlayer());
        switchPlayers();
        updateWinner();
        updateGameState();
        BoardStore.emitChange();
        break;
      case Constants.ActionTypes.RESTART_GAME:
        reset();
        BoardStore.emitChange();
        break;
    }
  })

});

module.exports = BoardStore;
