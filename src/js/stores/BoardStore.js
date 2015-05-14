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
const BOARD_SIZE = 3;

function isOwned(x, y) {
  return _data[x][y] !== 0;
}

function setOwner(x, y, ownerId) {
  _data[x][y] = ownerId;
}

function getCurrentPlayer() {
  return _currentPlayer;
}

function switchPlayers() {
  _currentPlayer = _currentPlayer === 1 ? 2 : 1;
}

/**
 * Resets the board to a initial value.
 */
function reset() {
  _currentPlayer = 1;
  _data = [];
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

  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;

    switch(action.type) {
      case Constants.ActionTypes.PLAY_POSITION:
        let {x, y} = action.pos;
        if(isOwned(x, y)) return;
        setOwner(x, y, getCurrentPlayer());
        switchPlayers();
        BoardStore.emitChange();
        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = BoardStore;
