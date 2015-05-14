var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  /**
   * @param  {Object} pos
   * @param  {Number} pos.x
   * @param  {Number} pos.y
   */
  playPosition: function(pos) {
    AppDispatcher.handleViewAction({
      type : Constants.ActionTypes.PLAY_POSITION,
      pos  : pos
    });
  },

  restartGame: function() {
    AppDispatcher.handleViewAction({
      type : Constants.ActionTypes.RESTART_GAME
    });
  },

};
