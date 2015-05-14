jest.dontMock('../../constants/AppConstants');
jest.dontMock('../BoardStore');
jest.dontMock('object-assign');
jest.dontMock('react/lib/keyMirror');

describe('BoardStore', function() {

  let AppConstants = require('../../constants/AppConstants');
  let AppDispatcher;
  let BoardStore;
  let callback;

  let actionPlayPosition = {
    action : {
      type : AppConstants.ActionTypes.PLAY_POSITION,
      pos  : void 0
    }
  };

  let playPosition = function(x, y) {
    actionPlayPosition.action.pos = {x: x, y: y}; callback(actionPlayPosition);
  }

  beforeEach(function() {
    AppDispatcher = require('../../dispatchers/AppDispatcher');
    BoardStore = require('../BoardStore');
    callback = AppDispatcher.register.mock.calls[0][0];
  });

  it('registers a callback with the dispatcher', function() {
    expect(AppDispatcher.register.mock.calls.length).toBe(1);
  });

  it('should initialize with empty board', function() {
    let tiles = BoardStore.getTiles();
    let boardSize = BoardStore.getSize();
    expect(BoardStore.gameEnded()).toBe(false);
    expect(BoardStore.getWinner()).toBe(void 0);
    for(let x = 0; x < boardSize; x++) {
      for(let y = 0; y < boardSize; y++) {
        expect(tiles[x][y]).toBe(0);
      }
    }
  });

  it('should have player 1 as first player', function() {
    playPosition(1, 2);
    let tiles = BoardStore.getTiles();
    expect(tiles[1][2]).toBe(1);
  });

  it('should have player 2 as second player', function() {
    playPosition(0, 0);
    playPosition(1, 0);
    let tiles = BoardStore.getTiles();
    expect(tiles[1][0]).toBe(2);
  });

  describe('win', function() {

    it('should win when player 1 makes 3 tiles in vertical', function() {
      playPosition(0, 0); // player 1
      playPosition(1, 1); // player 2
      playPosition(0, 1); // player 1
      playPosition(1, 2); // player 2
      playPosition(0, 2); // player 1
      expect(BoardStore.getWinner()).toBe(1);
      expect(BoardStore.gameEnded()).toBe(true);
    });

    it('should win when player 1 makes 3 tiles in horizontal', function() {
      playPosition(0, 0); // player 1
      playPosition(1, 1); // player 2
      playPosition(1, 0); // player 1
      playPosition(1, 2); // player 2
      playPosition(2, 0); // player 1
      expect(BoardStore.getWinner()).toBe(1);
      expect(BoardStore.gameEnded()).toBe(true);
    });

    it('should win when player 1 makes the diagonal top-left to bottom-right', function() {
      playPosition(0, 0); // player 1
      playPosition(1, 0); // player 2
      playPosition(1, 1); // player 1
      playPosition(1, 2); // player 2
      playPosition(2, 2); // player 1
      expect(BoardStore.getWinner()).toBe(1);
      expect(BoardStore.gameEnded()).toBe(true);
    });

    it('should win when player 1 makes the diagonal top-right to bottom-left', function() {
      playPosition(2, 0); // player 1
      playPosition(1, 0); // player 2
      playPosition(1, 1); // player 1
      playPosition(1, 2); // player 2
      playPosition(0, 2); // player 1
      expect(BoardStore.getWinner()).toBe(1);
      expect(BoardStore.gameEnded()).toBe(true);
    });
  })

});
