var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  /**
   * @param  {Object} position
   * @param  {Number} position.x
   * @param  {Number} position.y
   */
  playPosition: function(position) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },

};
