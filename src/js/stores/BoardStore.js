const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

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
 * Whenever the game has ended or not. A game ends when there are no more
 * empty tiles or a player won.
 */
let _gameEnded;

const BOARD_SIZE = 3;

function isOwned(x, y) {
  return _data[x][y] !== 0;
}

function setOwner(x, y, ownerId) {
  _data[x][y] = ownerId;
}

function getOwner(x, y){
  return _data[x][y];
}

function getCurrentPlayer() {
  return _currentPlayer;
}

function switchPlayers() {
  _currentPlayer = _currentPlayer === 1 ? 2 : 1;
}

/**
 * A winner should have 3 tiles in horizontal, vertical or diagonal.
 */
function sameValueInArray(array) {
  let i = array.length;
  let value = array[0];
  while(i--) {
    if(array[i] !== value) return false;
  }
  return true;
}

function getWinnerFromLine(line) {
  let winnerInThisLine = line[0] !== 0 && sameValueInArray(line);
  if(winnerInThisLine) return line[0];
  return false;
}

function updateWinner() {
  if(_winner !== void 0) return;

  // Vertical check
  for(let i = 0; i < BOARD_SIZE; i++){
    let winnerFound = _winner !== void 0;
    if(winnerFound) return;
    let line = [getOwner(i, 0), getOwner(i, 1), getOwner(i, 2)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine !== false) _winner = line[0];
  }
  if(_winner !== void 0) return _winner;

  // Horizontal check
  for(let i = 0; i < BOARD_SIZE; i++){
    let winnerFound = _winner !== void 0;
    if(winnerFound) return;
    let line = [getOwner(0, i), getOwner(1, i), getOwner(2, i)];
    var winnerInLine = getWinnerFromLine(line);
    if(winnerInLine !== false) _winner = line[0];
  }
  if(_winner !== void 0) return _winner;

  // Diagonal check top-left to bottom-right
  let diag1 = [getOwner(0, 0), getOwner(1, 1), getOwner(2, 2)];
  let winnerInLine1 = getWinnerFromLine(diag1);
  if(winnerInLine1 !== false) _winner = diag1[0];
  if(_winner !== void 0) return _winner;

  // Diagonal check top-right to bottom-left
  let diag2 = [getOwner(2, 0), getOwner(1, 1), getOwner(0, 2)];
  let winnerInLine2 = getWinnerFromLine(diag2);
  if(winnerInLine2 !== false) _winner = diag2[0];
  if(_winner !== void 0) return _winner;
}

function hasAvailableTiles() {
  for(let x = 0; x < BOARD_SIZE; x++) {
    for(let y = 0; y < BOARD_SIZE; y++) {
      if(_data[x][y] === 0) return true;
    }
  }
}

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
  for(let x = 0; x < BOARD_SIZE; x++) {
    _data[x] = [];
    for(let y = 0; y < BOARD_SIZE; y++) {
      _data[x][y] = 0;
    }
  }
}
reset();

let BoardStore = assign({}, BaseStore, {

  getTiles() {
    return _data;
  },

  getSize() {
    return BOARD_SIZE;
  },

  getWinner() {
    return _winner;
  },

  gameEnded() {
    return _gameEnded;
  },

  getCurrentPlayer() {
    return getCurrentPlayer()
  },

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
    }
  })

});

module.exports = BoardStore;
