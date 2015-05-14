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
let _data = [];
const BOARD_SIZE = 3;

function setOwner(x, y, ownerId) {
  _data[x][y] = ownerId;
}

/**
 * Resets the board to a initial value.
 */
function reset() {
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
        debugger;
        // @todo: setOwner
        return;
        let text = action.text.trim();
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addItem(text);
          BoardStore.emitChange();
        }
        break;

      // add more cases for other actionTypes...
    }
  })

});

module.exports = BoardStore;
